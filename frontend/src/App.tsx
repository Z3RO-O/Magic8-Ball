import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { getMagic8BallResponse } from './api/answer';

export default function Magic8Ball() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [history, setHistory] = useState<
    { question: string; answer: string }[]
  >([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
    setAnswer('');

    try {
      const data = await getMagic8BallResponse(question); // Use the API function
      setAnswer(data.response); // Set the answer from the API
      setHistory((prev) => [{ question, answer: data.response }, ...prev]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('There was an error fetching the response. Please try again.');
    }

    setIsShaking(false);
    setQuestion('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col items-center justify-between min-h-screen py-10 px-4">
        <div className="flex-grow flex flex-col items-center justify-center w-full mb-8">
          <motion.div
            className="w-[300px] h-[300px] rounded-full flex items-center justify-center relative overflow-hidden mb-10"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #1a1a2e, #000)',
              boxShadow:
                '0 0 50px rgba(26, 26, 46, 0.5), inset 0 0 30px rgba(26, 26, 46, 0.5)',
            }}
            animate={
              isShaking
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5, repeat: isShaking ? 5 : 0 }}
          >
            <motion.div
              className="w-[100px] h-[100px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center relative z-10"
              animate={isShaking ? { scale: [1, 0.9, 1, 0.9, 1] } : {}}
              transition={{ duration: 0.5, repeat: isShaking ? 5 : 0 }}
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
                    <Loader2 className="animate-spin text-gray-100 w-8 h-8" />
                  </motion.div>
                ) : answer ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center text-center"
                  >
                    <p className="text-xs font-bold text-gray-100 italic px-2">
                      {answer}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="eight"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-4xl font-bold text-gray-100"
                  >
                    8
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-900 opacity-50 rounded-full pointer-events-none" />
          </motion.div>
        </div>

        <div className="w-full backdrop-blur-sm bg-gray-800/50 rounded-lg p-4">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                ref={inputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow px-4 py-2 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400 text-gray-100"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-gray-100 font-semibold"
              >
                Ask
              </button>
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </form>
        </div>
      </div>

      {history.length > 0 && (
        <div className="w-full max-w-md px-4 pb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-300">History</h2>
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-md border border-gray-700/50"
              >
                <p className="font-semibold text-gray-300">{item.question}</p>
                <p className="text-blue-400 italic">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
