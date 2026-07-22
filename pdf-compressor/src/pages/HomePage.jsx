
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

      const result = await compressPdf(
        selectedFile, 
        compressionLevel,
        targetSize ? targetSize * 1024 * 1024 : null
      );
      
      if (result.success) {
        setCompressionResult(result);
        const sizeInMB = (result.compressedSize / 1024 / 1024).toFixed(2);
        const originalSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        const saved = ((1 - result.compressedSize / selectedFile.size) * 100).toFixed(0);
        
        showToast('success', `✅ PDF compressed! ${originalSizeMB}MB → ${sizeInMB}MB (${saved}% saved)`);
        
        if (result.downloadUrl) {
          // Build the full download URL
          let downloadLink;
          if (result.downloadUrl.startsWith('http')) {
            downloadLink = result.downloadUrl;
          } else {
            downloadLink = `${API_ROOT_URL}${result.downloadUrl}`;
          }
          setDownloadUrl(downloadLink);
          console.log('✅ Download URL:', downloadLink);
        }
      } else {
        showToast('error', result.message || 'Compression failed');
      }

    } catch (err) {
      console.error('❌ Compression error:', err);
      showToast('error', err.message || 'Compression failed');
    } finally {
      setIsCompressing(false);
    }
  }, [selectedFile, compressionLevel, targetSize, showToast]);

  const handleDownload = useCallback(async () => {
    if (!downloadUrl) return;

    try {
      console.log('📥 Downloading from:', downloadUrl);
      
      // Try fetch with credentials
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      // Get the blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from URL
      const filename = downloadUrl.split('/').pop() || 'compressed.pdf';
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      showToast('success', '✅ Download started!');
      
    } catch (error) {
      console.error('❌ Download error:', error);
      showToast('error', 'Failed to download. Please try again.');
    }
  }, [downloadUrl, showToast]);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
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
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              >
                📥 Download Compressed PDF
              </button>
            </div>
          )}

          {compressionResult && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center transition-colors duration-300 dark:bg-blue-950/30">
              <p className="text-sm text-slate-600 transition-colors duration-300 dark:text-gray-300">
                Original: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB → 
                Compressed: {(compressionResult.compressedSize / 1024 / 1024).toFixed(2)} MB
                <span className="ml-2 font-bold text-green-600 dark:text-green-400">
                  ({((1 - compressionResult.compressedSize / selectedFile.size) * 100).toFixed(0)}% smaller)
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
