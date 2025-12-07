import React, { useState } from 'react';

const QrGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    // Using a public API for demo purposes. In production, could use a JS library like 'qrcode'.
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&bgcolor=1e293b&color=f8fafc&margin=10`;
    setGeneratedUrl(url);
  };

  const handleDownload = async () => {
    if (!generatedUrl) return;
    try {
      const response = await fetch(generatedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-blue-400">qr_code_2</span>
            QR Code Generator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Convert any text or URL into a QR code.</p>
        </div>

        <div className="p-8 flex flex-col items-center space-y-8">
            <form onSubmit={handleGenerate} className="w-full space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Content (Text or URL)</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
                >
                    Generate QR Code
                </button>
            </form>

            {generatedUrl && (
                <div className="flex flex-col items-center animate-fade-in space-y-6 bg-slate-900 p-6 rounded-xl border border-slate-700 w-full">
                    <div className="bg-slate-800 p-2 rounded-lg border border-slate-600">
                         <img src={generatedUrl} alt="QR Code" className="w-48 h-48 rounded" />
                    </div>
                    
                    <button
                        onClick={handleDownload}
                        className="flex items-center space-x-2 text-slate-300 hover:text-white transition px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700"
                    >
                        <span className="material-icons text-sm">download</span>
                        <span>Download PNG</span>
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;