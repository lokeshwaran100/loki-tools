import React, { useState, useCallback } from 'react';
import { Upload, Download, ExternalLink, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const InvoiceUpdater = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const replacementData = [
    ['883.82', '1398.30'],
    ['1,001.82', '1,556.51'],
    ['67.41', '106.65'],
    ['749', '1185'],
    ['134.82', '213.30'],
    ['Premium', 'Storm'],
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/html') {
      setFile(droppedFile);
      setStatus('idle');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/html') {
      setFile(selectedFile);
      setStatus('idle');
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setStatus('idle');

    try {
      const content = await file.text();
      let processedHtml = content;

      // Apply replacements
      replacementData.forEach(([oldValue, newValue]) => {
        const regex = new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        processedHtml = processedHtml.replace(regex, newValue);
      });

      setProcessedContent(processedHtml);
      setStatus('success');
    } catch (error) {
      console.error('Error processing file:', error);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessedFile = () => {
    if (!processedContent || !file) return;

    const blob = new Blob([processedContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openPdfConverter = () => {
    window.open('https://www.sejda.com/html-to-pdf', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
            Invoice Updater
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Transform your ACT Fibernet invoices with automated value replacement and seamless PDF conversion.
        </p>
      </div>

      <div className="space-y-8">
        {/* File Upload Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Upload className="h-6 w-6 text-red-500 mr-3" />
            Upload HTML Invoice
          </h2>

          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragOver 
                ? 'border-red-500 bg-red-600/5' 
                : file 
                  ? 'border-green-500 bg-green-600/5' 
                  : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".html"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                file ? 'bg-green-600/20' : 'bg-gray-600/20'
              }`}>
                <FileText className={`h-8 w-8 ${file ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              
              <div>
                <p className="text-lg font-medium text-white mb-2">
                  {file ? file.name : 'Drop your HTML invoice here'}
                </p>
                <p className="text-gray-400">
                  {file ? 'File ready for processing' : 'or click to browse files'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Replacement Preview */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Value Replacements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {replacementData.map(([from, to], index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300 font-mono">{from}</span>
                <span className="text-red-500 mx-3">→</span>
                <span className="text-green-400 font-mono">{to}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={processFile}
              disabled={!file || isProcessing}
              className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                !file || isProcessing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 hover:shadow-red-500/25'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3" />
                  Process Invoice
                </div>
              )}
            </button>

            <button
              onClick={downloadProcessedFile}
              disabled={!processedContent}
              className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                !processedContent
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/25 hover:shadow-green-500/25'
              }`}
            >
              <Download className="h-5 w-5 mr-3" />
              Download HTML
            </button>

            <button
              onClick={openPdfConverter}
              disabled={!processedContent}
              className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                !processedContent
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/25'
              }`}
            >
              <ExternalLink className="h-5 w-5 mr-3" />
              Convert to PDF
            </button>
          </div>
        </div>

        {/* Status Message */}
        {status !== 'idle' && (
          <div className={`p-4 rounded-xl flex items-center ${
            status === 'success' 
              ? 'bg-green-600/10 border border-green-600/30' 
              : 'bg-red-600/10 border border-red-600/30'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            )}
            <span className={status === 'success' ? 'text-green-400' : 'text-red-400'}>
              {status === 'success' 
                ? 'Invoice processed successfully! You can now download the updated HTML or convert to PDF.'
                : 'An error occurred while processing the file. Please try again.'
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceUpdater;