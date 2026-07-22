
import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/hero/Hero';
import UploadArea from '../components/upload/UploadArea';
import { CompressionOptions, CompressButton } from '../components/compression';
import useFilePicker from '../hooks/useFilePicker';
import { compressPdf } from '../services/pdf.service';
import { API_ROOT_URL } from '../services/api';
import { toast } from 'react-hot-toast';
import FreeTierBanner from '../components/common/FreeTierBanner';

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

    const fileSizeMB = selectedFile.size / 1024 / 1024;
    if (fileSizeMB > 20) {
      toast('⏳ Large file detected. This may take 1-2 minutes.', {
        duration: 5000,
      });
    }

    try {
      setIsCompressing(true);
      showToast('info', 'Compressing your PDF...');

      const result = await compressPdf(
        selectedFile, 
        compressionLevel,
        targetSize ? targetSize * 1024 * 1024 : null
      );
      
      console.log('Compression result:', result);
      
      if (result.success) {
        setCompressionResult(result);
        const sizeInMB = (result.compressedSize / 1024 / 1024).toFixed(2);
        const originalSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        const saved = ((1 - result.compressedSize / selectedFile.size) * 100).toFixed(0);
        
        showToast('success', `✅ PDF compressed! ${originalSizeMB}MB → ${sizeInMB}MB (${saved}% saved)`);
        
        if (result.downloadUrl) {
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

  return (
    <>
      <Helmet>
        <title>Free PDF Compressor - Reduce PDF Size Online | BriefTube</title>
        <meta name="description" content="Compress PDF files online for free. Reduce PDF size without losing quality. No sign-up, no watermarks, files auto-deleted after 2 minutes." />
        <meta property="og:title" content="Free PDF Compressor - Reduce PDF Size Online" />
        <meta property="og:description" content="Compress PDF files online for free. Reduce PDF size without losing quality. No sign-up, no watermarks." />
        <meta property="og:url" content="https://brieftube.co/pdf-compressor" />
        <meta name="keywords" content="pdf compressor, compress pdf, reduce pdf size, pdf optimizer, pdf compression" />
        <link rel="canonical" href="https://brieftube.co/pdf-compressor" />
      </Helmet>

      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        <Hero />
        
        <FreeTierBanner />

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
            {selectedFile.size / 1024 / 1024 > 20 && (
              <div className="mb-4 rounded-lg bg-yellow-50 p-3 text-center text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                ⏳ Large file ({selectedFile.size / 1024 / 1024 / 1024}MB). 
                Compression may take 1-2 minutes.
              </div>
            )}

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
              fileSize={selectedFile?.size}
            />

            {downloadUrl && (
              <div className="mt-6 text-center">
                <a
                  href={downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  📥 Download Compressed PDF
                </a>
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
    </>
  );
}