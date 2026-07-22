
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
import { toast } from 'react-hot-toast';
import FreeTierBanner from '../components/common/FreeTierBanner';
import ToolInfo from '../components/common/ToolInfo';
import ToolFAQ from '../components/common/ToolFAQ';

const qrContent = {
  title: "📱 QR Code Generator",
  description: "Generate QR codes for any text, URL, or data instantly. Perfect for sharing links, contact info, Wi-Fi passwords, and more.",
  features: [
    "Generate QR codes for any text or URL",
    "Download as PNG image",
    "Customize size",
    "No uploads — everything stays in your browser",
    "100% free with no limits",
  ],
  useCases: [
    "Share website links quickly",
    "Create QR codes for Wi-Fi passwords",
    "Generate contact info QR codes",
    "Share social media profiles",
    "Create QR codes for events and promotions",
  ],
  faqs: [
    {
      question: "What is a QR code?",
      answer: "QR (Quick Response) codes are two-dimensional barcodes that can store text, URLs, contact info, and more. They can be scanned by smartphones to instantly access the encoded information."
    },
    {
      question: "What can I encode in a QR code?",
      answer: "You can encode any text, URL, phone number, email address, contact info, Wi-Fi credentials, or any other text data."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! Everything happens in your browser. No data is sent to any server."
    },
    {
      question: "What formats can I download?",
      answer: "You can download QR codes as PNG images, which work on any device."
    }
  ]
};

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [size, setSize] = useState(300);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter some text or URL');
      toast.error('Please enter some text or URL');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      
      setQrDataUrl(url);
      toast.success('QR Code generated!');
    } catch {
      setError('Failed to generate QR code');
      toast.error('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `qrcode_${Date.now()}.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  const handleClear = () => {
    setText('');
    setQrDataUrl(null);
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>Free QR Code Generator - Create QR Codes Online | BriefTube</title>
        <meta name="description" content="Generate QR codes for free. Create QR codes for URLs, text, Wi-Fi, contacts, and more. Download as PNG instantly." />
        <meta property="og:title" content="Free QR Code Generator - Create QR Codes Online" />
        <meta property="og:description" content="Generate QR codes for free. Create QR codes for URLs, text, Wi-Fi, contacts, and more." />
        <meta property="og:url" content="https://brieftube.co/pdf-compressor/qr-generator" />
        <meta name="keywords" content="qr code generator, create qr code, qr code maker, qr generator" />
        <link rel="canonical" href="https://brieftube.co/pdf-compressor/qr-generator" />
      </Helmet>

      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-4xl text-center px-4">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
              📱 Free • Fast • Privacy Focused
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              QR Code Generator
              <span className="block text-blue-600 dark:text-blue-400">Create QR Codes Instantly</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-gray-300">
              Generate QR codes for any text, URL, or data in seconds.
              <br />
              Everything stays in your browser. 🔒
            </p>
          </div>
        </div>

        <FreeTierBanner />

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: Input */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Enter Your Data
                </h3>
                
                <div>
                  <label className="text-sm text-slate-600 dark:text-gray-400">
                    Text or URL
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text, URL, or any data..."
                    className="mt-1 h-32 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-600 dark:text-gray-400">
                    Size: {size}px
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="50"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="mt-1 w-full cursor-pointer"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={generateQR}
                    disabled={isGenerating}
                    className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    {isGenerating ? 'Generating...' : '📱 Generate QR Code'}
                  </button>
                  
                  <button
                    onClick={handleClear}
                    className="rounded-xl border border-red-300 px-4 py-3 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    ✕ Clear
                  </button>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                  </div>
                )}
              </div>

              {/* Right: QR Code Display */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-600 dark:bg-gray-700">
                <h4 className="mb-4 text-sm font-medium text-slate-600 dark:text-gray-400">
                  Your QR Code
                </h4>
                
                <div className="flex h-64 w-64 items-center justify-center rounded-xl bg-white p-4 dark:bg-gray-800">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-slate-400 dark:text-gray-500">
                      <span className="text-6xl">📱</span>
                      <p className="mt-2 text-sm">QR code will appear here</p>
                    </div>
                  )}
                </div>

                {qrDataUrl && (
                  <button
                    onClick={handleDownload}
                    className="mt-4 w-full rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    📥 Download QR Code
                  </button>
                )}
              </div>
            </div>

            {/* Examples */}
            <div className="mt-6 border-t border-slate-200 pt-4 dark:border-gray-700">
              <p className="text-sm text-slate-600 dark:text-gray-400">
                💡 Try these examples:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { label: 'Website', value: 'https://brieftube.co' },
                  { label: 'Google', value: 'https://google.com' },
                  { label: 'YouTube', value: 'https://youtube.com' },
                  { label: 'Hello World', value: 'Hello World!' },
                ].map((example) => (
                  <button
                    key={example.label}
                    onClick={() => setText(example.value)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-blue-900/30"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tool Info & FAQ */}
        <ToolInfo 
          title={qrContent.title}
          description={qrContent.description}
          features={qrContent.features}
          useCases={qrContent.useCases}
        />

        <ToolFAQ 
          faqs={qrContent.faqs}
          title="Frequently Asked Questions"
        />
      </div>
    </>
  );
}