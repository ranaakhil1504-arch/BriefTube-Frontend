
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOOLS = [
  { 
    name: 'PDF Compressor', 
    path: '/', 
    emoji: '📄',
    keywords: ['pdf', 'compress pdf', 'reduce pdf', 'pdf size', 'compress']
  },
  { 
    name: 'Image Compressor', 
    path: '/image-compressor', 
    emoji: '🖼️',
    keywords: ['image', 'compress image', 'reduce image', 'jpg', 'png', 'webp', 'photo']
  },
  { 
    name: 'PDF Merger', 
    path: '/pdf-merger', 
    emoji: '📎',
    keywords: ['merge', 'combine pdf', 'join pdf', 'pdf merge', 'multiple pdf']
  },
  { 
    name: 'Image Resizer', 
    path: '/image-resizer', 
    emoji: '📐',
    keywords: ['resize', 'resize image', 'pixel', 'dimension', 'passport', 'width', 'height']
  },
  { 
    name: 'QR Generator', 
    path: '/qr-generator', 
    emoji: '📱',
    keywords: ['qr', 'qrcode', 'qr code', 'barcode', 'scan']
  },
];

export default function SimpleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hi! I'm your assistant. How can I help you?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    const lowerInput = input.toLowerCase();
    let botResponse = "I can help you with:\n• 📄 PDF Compressor\n• 🖼️ Image Compressor\n• 📎 PDF Merger\n• 📐 Image Resizer\n• 📱 QR Generator\n\nTell me what you want to do!";

    if (lowerInput.includes('qr') || lowerInput.includes('qrcode') || lowerInput.includes('code')) {
      botResponse = "📱 Opening QR Generator for you... It creates QR codes from any text or URL.";
      setTimeout(() => navigateTo('/qr-generator'), 800);
    } else if (lowerInput.includes('resize') || lowerInput.includes('pixel') || lowerInput.includes('dimension')) {
      botResponse = "📐 Opening Image Resizer for you... It resizes images to exact pixels and KB.";
      setTimeout(() => navigateTo('/image-resizer'), 800);
    } else if (lowerInput.includes('compress image') || lowerInput.includes('reduce image') || lowerInput.includes('photo')) {
      botResponse = "🖼️ Opening Image Compressor for you... It reduces image file size without losing quality.";
      setTimeout(() => navigateTo('/image-compressor'), 800);
    } else if (lowerInput.includes('compress pdf') || lowerInput.includes('reduce pdf')) {
      botResponse = "📄 Opening PDF Compressor for you... It reduces PDF file size with custom options.";
      setTimeout(() => navigateTo('/'), 800);
    } else if (lowerInput.includes('merge') || lowerInput.includes('combine') || lowerInput.includes('join')) {
      botResponse = "📎 Opening PDF Merger for you... It combines multiple PDFs into one file.";
      setTimeout(() => navigateTo('/pdf-merger'), 800);
    } else if (lowerInput.includes('help') || lowerInput.includes('what') || lowerInput.includes('can you')) {
      botResponse = "Here are all my tools:\n\n📄 PDF Compressor — Reduce PDF size\n🖼️ Image Compressor — Compress images\n📎 PDF Merger — Combine PDFs\n📐 Image Resizer — Resize images\n📱 QR Generator — Create QR codes\n\nJust tell me what you want to do!";
    } else {
      const matchedTool = TOOLS.find(tool => 
        tool.keywords.some(keyword => lowerInput.includes(keyword))
      );
      if (matchedTool) {
        botResponse = `${matchedTool.emoji} Opening ${matchedTool.name} for you...`;
        setTimeout(() => navigateTo(matchedTool.path), 800);
      } else {
        botResponse = "I'm not sure what you want. Try saying:\n• 'Compress PDF'\n• 'Compress Image'\n• 'Merge PDFs'\n• 'Resize Image'\n• 'Generate QR'\n\nOr click the buttons below!";
      }
    }

    setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] rounded-2xl shadow-2xl transition-all duration-300 sm:w-[400px]">
          <div className="rounded-2xl bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <span className="font-semibold text-white">Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">✕</button>
            </div>

            <div className="h-[300px] overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-200 px-4 py-3 dark:border-gray-700">
              {TOOLS.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => {
                    setMessages(prev => [...prev, { 
                      text: `Opening ${tool.name}...`, 
                      sender: 'bot' 
                    }]);
                    setTimeout(() => navigateTo(tool.path), 500);
                  }}
                  className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                >
                  {tool.emoji} {tool.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-gray-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={handleSend}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}