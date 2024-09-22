import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Palette, Sparkles } from 'lucide-react';

import { getMagic8BallResponse } from '../api/answer';
import { themes } from '../constants/theme';
import { flavours } from '../constants/flavour';
import { clipResponse } from '../constants/helpers';
import History from './History';
import MagicBallAnimation from './MagicBallAnimation';

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
      const data = await getMagic8BallResponse(question, currentFlavour.name); // Use the API function

      const magicAnswer = clipResponse(data.response, '---', 50);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      // Ensure a minimum delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      setAnswer(magicAnswer);
      setHistory((prev) => [
        { question, answer: magicAnswer, id: data.id },
        ...prev,
      ]);
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

      <div className="w-full max-w-md flex flex-col items-center justify-between min-h-screen py-10 px-4 relative z-20">
        <div className="w-full flex justify-between mb-8">
          <div className="flex z-20 space-x-2">
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

          <div className="relative z-20" ref={flavourMenuRef}>
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
                  className="py-1 z-20"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {flavours.map((flavour) => (
                    <button
                      key={flavour.name}
                      onClick={() => selectFlavour(flavour)}
                      className={`block z-20 px-4 py-2 text-sm ${
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

        <MagicBallAnimation
          isShaking={isShaking}
          answer={answer}
          isDarkMode={isDarkMode}
        />

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

      <History
        history={history}
        isDarkMode={isDarkMode}
        currentTheme={currentTheme}
        setHistory={setHistory}
      />
    </div>
  );
}
