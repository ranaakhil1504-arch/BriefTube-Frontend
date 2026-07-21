
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PDFPreview({ file, onClose }) {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!file) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 p-2"
      onClick={onClose}
    >
      <div 
        className="relative flex h-full w-full flex-col rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 whitespace-nowrap">📄 PDF Preview</h3>
            <span className="text-sm text-slate-500 truncate">
              {file?.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-slate-100 p-4 overflow-hidden min-h-0">
          {fileUrl ? (
            <iframe
              src={fileUrl}
              className="w-full h-full rounded-lg shadow-lg border-0"
              title="PDF Preview"
              style={{ minHeight: '400px' }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-slate-500">Loading PDF...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 text-center text-sm text-slate-500 flex-shrink-0">
          Press ESC or click ✕ to close
        </div>
      </div>
    </div>
  );
}