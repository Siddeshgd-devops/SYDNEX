import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SYDNEX</h3>
            <p className="text-blue-100">Smart Doubt Solver for Students and Teachers</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/ask" className="hover:text-white transition-colors">Ask Doubt</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-blue-100">Built with ❤️ for education</p>
          </div>
        </div>
        <div className="border-t border-blue-400 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2024 SYDNEX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};