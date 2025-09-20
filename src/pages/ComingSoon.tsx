import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench, Clock, Star } from 'lucide-react';

const ComingSoon = () => {
  const upcomingTools = [
    {
      title: 'PDF Processor',
      description: 'Advanced PDF manipulation, merging, splitting, and optimization tools.',
      eta: 'Q2 2024',
      features: ['Merge & Split PDFs', 'Compression', 'Watermarking', 'Form Processing'],
    },
    {
      title: 'Data Converter',
      description: 'Convert between various data formats including JSON, XML, CSV, and more.',
      eta: 'Q2 2024',
      features: ['Multi-format Support', 'Batch Processing', 'Custom Mapping', 'Validation'],
    },
    {
      title: 'Image Optimizer',
      description: 'Compress, resize, and optimize images for web and print.',
      eta: 'Q3 2024',
      features: ['Batch Processing', 'Format Conversion', 'Quality Control', 'Metadata Management'],
    },
    {
      title: 'Text Utilities',
      description: 'Collection of text processing tools for developers and content creators.',
      eta: 'Q3 2024',
      features: ['Regex Testing', 'Case Conversion', 'Word Count', 'Hash Generation'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center">
            <Wrench className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
            More Tools Coming Soon
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We're constantly expanding our toolkit with new professional utilities. 
          Here's what's in development for the Loki Tools suite.
        </p>
      </div>

      {/* Back Button */}
      <div className="mb-8">
        <Link 
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Upcoming Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {upcomingTools.map((tool, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-red-900/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{tool.title}</h3>
              <div className="flex items-center px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {tool.eta}
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">{tool.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {tool.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex}
                    className="text-sm text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-red-900/20 to-black rounded-2xl p-8 border border-red-900/30 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-6">
          Be the first to know when new tools are released. We'll notify you about updates and new features.
        </p>
        
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
          />
          <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors duration-300">
            Notify Me
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mt-4">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;