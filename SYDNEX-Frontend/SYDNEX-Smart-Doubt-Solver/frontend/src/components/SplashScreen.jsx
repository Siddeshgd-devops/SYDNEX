import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen = ({ visible, onFinish }) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onFinish?.(), 3000);
    return () => clearTimeout(timer);
  }, [visible, onFinish]);

  const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
            animate={{
              background: [
                'linear-gradient(45deg, #1e1b4b, #581c87, #be185d)',
                'linear-gradient(135deg, #312e81, #7c3aed, #ec4899)',
                'linear-gradient(225deg, #1e1b4b, #581c87, #be185d)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating particles */}
          {floatingParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Center content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            {/* Logo container with enhanced animations */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', type: 'spring', stiffness: 100 }}
              className="relative"
            >
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{ width: '200px', height: '200px', left: '-50px', top: '-50px' }}
              />
              
              {/* Main logo */}
              <div className="relative rounded-full p-2 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
                <div className="rounded-full p-12 bg-gradient-to-br from-white/10 to-white/5">
                  <motion.span 
                    className="text-5xl md:text-7xl font-black tracking-wider bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl"
                    animate={{ 
                      textShadow: [
                        '0 0 20px rgba(255,255,255,0.5)',
                        '0 0 40px rgba(147,197,253,0.8)',
                        '0 0 20px rgba(255,255,255,0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    SYDNEX
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Subtitle with typewriter effect */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8"
            >
              <motion.p
                className="text-xl md:text-2xl text-white/90 font-light tracking-wide"
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
              >
                Smart Doubt Solver
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mt-2"
              />
            </motion.div>

            {/* Enhanced loading section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-12 flex flex-col items-center"
            >
              <div className="relative w-64 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: '0%', x: '-100%' }}
                  animate={{ width: '100%', x: '0%' }}
                  transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-lg"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                className="mt-4 text-white/70 text-sm tracking-widest"
              >
                LOADING...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


