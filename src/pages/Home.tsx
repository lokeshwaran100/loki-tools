import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Wrench, ArrowRight } from 'lucide-react';

const Home = () => {
  const tools = [
    {
      path: '/invoice-updater',
      title: 'Invoice Updater',
      description: 'Transform ACT Fibernet invoices with automated value replacement and PDF conversion.',
      icon: FileText,
      status: 'available',
    },
    {
      path: '/coming-soon',
      title: 'PDF Processor',
      description: 'Advanced PDF manipulation and processing tools.',
      icon: Wrench,
      status: 'coming-soon',
    },
    {
      path: '/coming-soon',
      title: 'Data Converter',
      description: 'Convert between various data formats with ease.',
      icon: Wrench,
      status: 'coming-soon',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
            Loki Tools
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A professional utility suite designed for power users. Transform documents, process data, 
          and streamline your workflow with our collection of specialized tools.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-red-900/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-2"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-600/10 rounded-xl">
                  <tool.icon className="h-8 w-8 text-red-500" />
                </div>
                {tool.status === 'available' && (
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">{tool.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tool.status === 'available' 
                    ? 'bg-green-600/20 text-green-400' 
                    : 'bg-orange-600/20 text-orange-400'
                }`}>
                  {tool.status === 'available' ? 'Available' : 'Coming Soon'}
                </span>
                
                {tool.status === 'available' && (
                  <span className="text-sm text-red-500 group-hover:text-red-400 font-medium">
                    Launch Tool →
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Why Choose Loki Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Optimized for speed and efficiency in every operation.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">All processing happens locally in your browser.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Purpose-Built</h3>
            <p className="text-gray-400">Each tool is crafted for specific professional needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;