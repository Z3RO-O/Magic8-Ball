import { motion } from 'framer-motion';
import { Trash2, XCircle } from 'lucide-react';

import { deleteAllResponses, deleteResponse } from '../api/delete';

interface HistoryProps {
  history: { question: string; answer: string }[];
  isDarkMode: boolean;
  currentTheme: any;
  setHistory: (history: any) => void;
}

const History: React.FC<HistoryProps> = ({
  history,
  isDarkMode,
  currentTheme,
  setHistory,
}) => {
  const deleteHistoryItem = async (id: number) => {
    try {
      const result = await deleteResponse(id); // Call the API to delete the specific response
      console.log(result); // Log success message
      setHistory((prev) => prev.filter((item) => item.id !== id)); // Update local state
    } catch (error) {
      console.error('Failed to delete history item:', error.message); // Log error message
      // You can show a notification or alert to the user here if needed
    }
  };

  const clearAllHistory = async () => {
    try {
      const result = await deleteAllResponses(); // Call the API to delete all responses
      console.log(result); // Log success message
      setHistory([]); // Clear local state
    } catch (error) {
      console.error('Failed to clear all history:', error.message); // Log error message
      // You can show a notification or alert to the user here if needed
    }
  };

  return (
    <div>
      {history.length > 0 && (
        <div className="w-full max-w-lg px-4 pb-10">
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode
                  ? `${currentTheme.primary.text500}`
                  : `${currentTheme.primary.text700}`
              }`}
            >
              History
            </h2>
            <button
              onClick={clearAllHistory}
              className={`p-2 rounded-full bg-${currentTheme.primary}-600 text-gray-100 hover:bg-${currentTheme.primary}-700 transition-colors focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-500 focus:ring-opacity-50`}
              aria-label="Clear all history"
            >
              <Trash2 size={20} />
            </button>
          </div>
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
                <button
                  onClick={() => deleteHistoryItem(item.id)}
                  className={`absolute top-2 right-2 p-1 rounded-full bg-${currentTheme.primary}-600 text-gray-100 hover:bg-${currentTheme.primary}-700 transition-colors focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-500 focus:ring-opacity-50`}
                  aria-label="Delete this history item"
                >
                  <XCircle size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
