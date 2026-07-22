
import { useState, useCallback } from 'react';
import Hero from '../components/hero/Hero';
import UploadArea from '../components/upload/UploadArea';
import { CompressionOptions, CompressButton } from '../components/compression';
import useFilePicker from '../hooks/useFilePicker';
import { compressPdf } from '../services/pdf.service';
import { API_ROOT_URL } from '../services/api';
import { toast } from 'react-hot-toast';

export default function HomePage() {
  const [compressionLevel, setCompressionLevel] = useState('recommended');
  const [isCompressing, setIsCompressing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [targetSize, setTargetSize] = useState(null);
  const [compressionResult, setCompressionResult] = useState(null);

  const {
    selectedFile,
    error,
    loading,
    progress,
    selectFile,
    clearFile,
  } = useFilePicker({
    accept: ['application/pdf'],
    maxSize: 50 * 1024 * 1024,
  });

  const showToast = useCallback((type, message) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile) {
      showToast('error', 'Please select a file first');
      return;
    }

    try {
      setIsCompressing(true);
      showToast('info', 'Compressing your PDF...');

      // Pass target size to backend
      const result = await compressPdf(
        selectedFile, 
        compressionLevel,
        targetSize ? targetSize * 1024 * 1024 : null // Convert MB to bytes
      );
      
      if (result.success) {
        setCompressionResult(result);
        const sizeInMB = (result.size / 1024 / 1024).toFixed(2);
        const originalSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        const saved = ((1 - result.size / selectedFile.size) * 100).toFixed(0);
        
        showToast('success', `✅ PDF compressed! ${originalSizeMB}MB → ${sizeInMB}MB (${saved}% saved)`);
        
        if (result.downloadUrl) {
          setDownloadUrl(result.downloadUrl);
        }
      } else {
        showToast('error', result.message || 'Compression failed');
      }

    } catch (err) {
      showToast('error', err.message || 'Compression failed');
    } finally {
      setIsCompressing(false);
    }
  }, [selectedFile, compressionLevel, targetSize, showToast]);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <UploadArea
        selectedFile={selectedFile}
        error={error}
        loading={loading}
        progress={progress}
        onFileSelect={selectFile}
        onRemove={clearFile}
      />

      {selectedFile && !error && (
        <div className="mx-auto max-w-5xl px-4">
          <CompressionOptions
            selected={compressionLevel}
            onChange={setCompressionLevel}
            originalSize={selectedFile.size}
            onTargetSizeChange={setTargetSize}
          />

          <CompressButton
            disabled={isCompressing}
            loading={isCompressing}
            onClick={handleCompress}
          />

          {downloadUrl && (
            <div className="mt-6 text-center">
              <a
                href={downloadUrl.startsWith('http') ? downloadUrl : `${API_ROOT_URL}${downloadUrl}`}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
              >
                📥 Download Compressed PDF
              </a>
            </div>
          )}

          {compressionResult && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-sm text-slate-600">
                Original: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB → 
                Compressed: {(compressionResult.size / 1024 / 1024).toFixed(2)} MB
                <span className="ml-2 font-bold text-green-600">
                  ({((1 - compressionResult.size / selectedFile.size) * 100).toFixed(0)}% smaller)
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
