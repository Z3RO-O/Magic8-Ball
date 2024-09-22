import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface MagicBallAnimationProps {
  isShaking: boolean;
  isDarkMode: boolean;
  answer: any;
}

export default function MagicBallAnimation({
  isShaking,
  isDarkMode,
  answer,
}: MagicBallAnimationProps): React.ReactElement {
  return (
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
  );
}
