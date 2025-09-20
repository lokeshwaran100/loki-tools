import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, FileText, Wrench, Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/invoice-updater', label: 'Invoice Updater', icon: FileText },
    { path: '/coming-soon', label: 'More Tools', icon: Wrench },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
            <div className="relative">
              <Flame className="h-8 w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Loki Tools
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Slide-out Menu */}
      <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-black/95 backdrop-blur-lg border-l border-red-900/30 transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Wrench className="h-5 w-5 text-red-500 mr-2" />
            Tools
          </h2>
          
          <div className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  location.pathname === path
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {location.pathname === path && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg border border-red-900/30">
              <p className="text-sm text-gray-300 mb-2">More tools coming soon!</p>
              <p className="text-xs text-gray-400">Stay tuned for updates.</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;