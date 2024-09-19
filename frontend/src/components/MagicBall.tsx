import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Moon, Sun, Palette, Sparkles } from 'lucide-react';
import { getMagic8BallResponse } from '../api/answer';
import { themes } from '../constants/theme';
import { flavours } from '../constants/flavour';

function clipResponse(text: string, delimiter: string, wordLimit: number) {
  // Check if the delimiter is present
  const delimiterIndex = text.indexOf(delimiter);
  let clippedText;

  if (delimiterIndex !== -1) {
    // If delimiter is found, clip the text at the delimiter
    clippedText = text.substring(0, delimiterIndex).trim();
  } else {
    // If delimiter is not found, clip the text at word limit
    const words = text.split(/\s+/); // Split text by whitespace
    clippedText = words.slice(0, wordLimit).join(' '); // Join the first `wordLimit` words
  }

  return clippedText;
}

export default function Magic8Ball() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<
    { question: string; answer: string }[]
  >([]);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [currentFlavour, setCurrentFlavour] = useState(flavours[0]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isFlavourMenuOpen, setIsFlavourMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const flavourMenuRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === '') {
      setError('Please ask a question.');
      return;
    }
    if (question.length > 100) {
      setError(
        'Your question is too long. Please keep it under 100 characters.'
      );
      return;
    }
    setError('');
    setIsShaking(true);
    setIsLoading(true);
    setAnswer('');

    try {
      const startTime = Date.now();
      // Commented out API call
      // const data = await getMagic8BallResponse(question);
      // Use dummy response instead
      const data = await getMagic8BallResponse(question, currentFlavour.name); // Use the API function

      // Function to clip text at a specific delimiter or word limit
      const magicAnswer = clipResponse(data.response, '---', 50);

      // const dummyResponse =
      //   dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      // Ensure a minimum delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      setAnswer(magicAnswer);
      setHistory((prev) => [{ question, answer: magicAnswer }, ...prev]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('There was an error fetching the response. Please try again.');
    } finally {
      setIsShaking(false);
      setIsLoading(false);
      setQuestion('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
      if (
        flavourMenuRef.current &&
        !flavourMenuRef.current.contains(event.target as Node)
      ) {
        setIsFlavourMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const toggleFlavourMenu = () => {
    setIsFlavourMenuOpen(!isFlavourMenuOpen);
  };

  const selectTheme = (theme) => {
    setCurrentTheme(theme);
    setIsThemeMenuOpen(false);
  };

  const selectFlavour = (flavour) => {
    setCurrentFlavour(flavour);
    setIsFlavourMenuOpen(false);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${
        isDarkMode ? currentTheme.bgDark : currentTheme.bgLight
      } ${
        isDarkMode ? 'text-gray-100' : 'text-gray-900'
      } flex flex-col items-center relative overflow-hidden`}
    >
      {/* Flavour pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className={`w-full h-full text-${currentFlavour.color}-500`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
          }}
        >
          {currentFlavour.pattern}
        </motion.div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center justify-between min-h-screen py-10 px-4 relative z-10">
        <div className="w-full flex justify-between mb-8">
          <div className="flex space-x-2">
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={toggleThemeMenu}
                className={`p-2 rounded-full ${
                  currentTheme.primary.bg500
                } text-${
                  isDarkMode ? 'gray-200' : 'gray-800'
                } hover:bg-opacity-80 transition-colors`}
                aria-label="Open theme menu"
              >
                <Palette size={24} />
              </button>
              {isThemeMenuOpen && (
                <div
                  className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } ring-1 ring-black ring-opacity-5 z-10`}
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => selectTheme(theme)}
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        } w-full text-left ${
                          currentTheme.name === theme.name
                            ? `bg-${theme.primary}-${
                                isDarkMode ? '700' : '200'
                              } font-bold`
                            : ''
                        }`}
                        role="menuitem"
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${currentTheme.primary.bg500} text-${
                isDarkMode ? 'gray-200' : 'gray-800'
              } hover:bg-opacity-80 transition-colors`}
              aria-label={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <div className="relative" ref={flavourMenuRef}>
            <button
              onClick={toggleFlavourMenu}
              className={`p-2 rounded-full ${currentTheme.primary.bg500} text-${
                isDarkMode ? 'gray-200' : 'gray-800'
              } hover:bg-opacity-80 transition-colors`}
              aria-label="Open flavour menu"
            >
              <Sparkles size={24} />
            </button>
            {isFlavourMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } ring-1 ring-black ring-opacity-5 z-10`}
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {flavours.map((flavour) => (
                    <button
                      key={flavour.name}
                      onClick={() => selectFlavour(flavour)}
                      className={`block px-4 py-2 text-sm ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      } w-full text-left ${
                        currentFlavour.name === flavour.name
                          ? `bg-${flavour.color}-${
                              isDarkMode ? '700' : '200'
                            } font-bold`
                          : ''
                      }`}
                      role="menuitem"
                    >
                      {flavour.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center w-full mb-8">
          <motion.div
            className={`w-[350px] h-[350px] rounded-full flex items-center justify-center relative overflow-hidden mb-10`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000)',
              boxShadow: `0 0 50px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.5)`,
            }}
            animate={
              isShaking
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              repeat: isShaking ? Infinity : 0,
              repeatDelay: 0.1,
            }}
          >
            <motion.div
              className={`w-[250px] h-[250px] rounded-full flex items-center justify-center relative z-10`}
              style={{
                background: `radial-gradient(circle at 40% 40%, ${
                  isDarkMode ? '#4a4a4a' : '#6a6a6a'
                }, ${isDarkMode ? '#2a2a2a' : '#4a4a4a'})`,
                boxShadow: `0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5)`,
              }}
              animate={isShaking ? { scale: [1, 0.9, 1, 0.9, 1] } : {}}
              transition={{
                duration: 0.5,
                repeat: isShaking ? Infinity : 0,
                repeatDelay: 0.1,
              }}
            >
              <AnimatePresence mode="wait">
                {isShaking ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Loader2 className="animate-spin text-gray-300 w-12 h-12" />
                  </motion.div>
                ) : answer ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-center p-4"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-lg font-bold text-gray-100"
                    >
                      {answer.split('').map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.05,
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="eight"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-6xl font-bold text-gray-100"
                  >
                    8
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-50 rounded-full pointer-events-none" />
          </motion.div>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                ref={inputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-grow px-4 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-100 border-gray-700'
                    : 'bg-white text-gray-900 border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-${
                  currentTheme.primary
                }-500 transition-colors`}
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                className={`px-6 py-2 ${currentTheme.primary.bg600} rounded-md hover:${currentTheme.primary.bg700} transition-colors focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-500 focus:ring-opacity-50 text-gray-100 font-semibold disabled:opacity-50`}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? 'Asking...' : 'Ask'}
              </motion.button>
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </form>
        </div>
      </div>

      {history.length > 0 && (
        <div className="w-full max-w-md px-4 pb-10">
          <h2
            className={`text-xl font-bold mb-4 ${
              isDarkMode
                ? `${currentTheme.primary.text500}`
                : `${currentTheme.primary.text700}`
            }`}
          >
            History
          </h2>
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${
                  isDarkMode
                    ? `bg-${currentTheme.secondary}-900/50`
                    : `bg-${currentTheme.secondary}-100/50`
                } backdrop-blur-sm p-4 rounded-md`}
              >
                <p
                  className={`font-semibold ${
                    isDarkMode
                      ? `${currentTheme.secondary.text500}`
                      : `${currentTheme.secondary.text700}`
                  }`}
                >
                  {item.question}
                </p>
                <p className={`${currentTheme.primary.text500} italic`}>
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
