import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, Users, Trophy } from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Answers",
      description: "Get instant, detailed explanations powered by Gemini AI"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "OCR Text Extraction",
      description: "Upload images of questions and automatically extract text using advanced OCR"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Learning",
      description: "Connect with students and teachers worldwide"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamification",
      description: "Earn XP, badges, and climb the leaderboard"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold gradient-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              SYDNEX
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Smart Doubt Solver - Get instant AI-powered answers to your questions with OCR image processing and gamified learning experience
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/ask" className="glass-button text-lg px-8 py-4 inline-block">
                Ask Your Doubt Now
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute -top-10 -left-10 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 -right-10 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-56 h-56 bg-indigo-300 rounded-full opacity-20 blur-3xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose SYDNEX?</h2>
            <p className="text-xl text-gray-600">Experience the future of learning with our advanced features</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="glass-card p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of students already using SYDNEX to solve their doubts</p>
            <Link to="/ask" className="glass-button text-lg px-8 py-4 inline-block">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};