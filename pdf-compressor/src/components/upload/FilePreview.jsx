
import { useState } from 'react';
import { FileText, X, Eye } from 'lucide-react';
import Button from '../ui/Button';
import PDFPreview from './PDFPreview';

export default function FilePreview({ file, onRemove }) {
  const [showPreview, setShowPreview] = useState(false);

  if (!file) return null;

  const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);

  return (
    <>
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="text-red-500 transition-colors duration-300 dark:text-red-400" size={28} />
            <div>
              <p className="font-medium text-slate-900 transition-colors duration-300 dark:text-white">
                {file.name}
              </p>
              <p className="text-sm text-slate-500 transition-colors duration-300 dark:text-gray-400">
                {fileSizeMB} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1"
            >
              <Eye size={16} />
              Preview
            </Button>

            <Button variant="ghost" size="sm" onClick={onRemove}>
              <X size={18} />
            </Button>
          </div>
        </div>
      </div>

      {showPreview && (
        <PDFPreview
          file={file}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
