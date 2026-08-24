import { Brain, Users, Zap, Heart } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI-Powered Learning",
      description: "Advanced Gemini AI provides detailed, step-by-step explanations for any question"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Driven",
      description: "Connect with students and teachers worldwide in a collaborative learning environment"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Instant Answers",
      description: "Get immediate responses to your doubts with voice input and image upload support"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Gamified Experience",
      description: "Earn XP, unlock badges, and climb leaderboards while learning"
    }
  ];

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              About SYDNEX
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SYDNEX is a revolutionary Smart Doubt Solver platform designed to transform 
              the way students and teachers interact with knowledge through AI-powered learning.
            </p>
          </div>

          {/* Mission Section */}
          <div className="glass-card p-8 mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                To democratize education by providing instant, accurate, and personalized learning 
                experiences through cutting-edge AI technology. We believe every student deserves 
                access to quality education and immediate doubt resolution, regardless of their 
                location or background.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Technology Stack */}
          <div className="glass-card p-8 mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Built with Modern Technology
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-gray-800">Frontend</h4>
                <p className="text-sm text-gray-600">React + Vite</p>
                <p className="text-sm text-gray-600">TailwindCSS</p>
                <p className="text-sm text-gray-600">Framer Motion</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">AI & Backend</h4>
                <p className="text-sm text-gray-600">Gemini AI</p>
                <p className="text-sm text-gray-600">Node.js</p>
                <p className="text-sm text-gray-600">Express.js</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Authentication</h4>
                <p className="text-sm text-gray-600">Firebase Auth</p>
                <p className="text-sm text-gray-600">Google OAuth</p>
                <p className="text-sm text-gray-600">JWT Tokens</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Features</h4>
                <p className="text-sm text-gray-600">Voice Input</p>
                <p className="text-sm text-gray-600">Image Upload</p>
                <p className="text-sm text-gray-600">EmailJS</p>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Developed with ❤️ Mr. SIDDESH G D
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              SYDNEX is crafted by passionate developers who believe in the power of 
              education and technology to change lives.
            </p>
            <p className="text-gray-600">
              Built for students, by students. Empowering the next generation of learners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};