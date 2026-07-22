
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-hot-toast';
import FreeTierBanner from '../components/common/FreeTierBanner';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(70);
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginalImage(file);
      setCompressedImage(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setCompressedImage(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCompress = async () => {
    if (!originalImage) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setIsCompressing(true);
      toast.loading('Compressing image...', { id: 'compress' });

      const options = {
        maxSizeMB: compressionLevel / 100,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: originalImage.type,
      };

      const compressedFile = await imageCompression(originalImage, options);
      setCompressedImage(compressedFile);

      const originalSize = (originalImage.size / 1024 / 1024).toFixed(2);
      const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
      const saved = ((1 - compressedFile.size / originalImage.size) * 100).toFixed(0);

      toast.success(
        `✅ ${originalSize}MB → ${compressedSize}MB (${saved}% saved)`,
        { id: 'compress' }
      );
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Compression failed. Please try again.', { id: 'compress' });
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const url = URL.createObjectURL(compressedImage);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${originalImage.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemove = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
            🖼️ Free • Fast • Privacy Focused
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Compress Images
            <span className="block text-blue-600 dark:text-blue-400">Without Losing Quality</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-gray-300">
            Reduce image size for web, email, and social media.
            <br />
            No uploads. Everything stays in your browser. 🔒
          </p>
        </div>
      </div>

      {/* Free Tier Banner */}
      <FreeTierBanner />

      {/* Upload Area */}
      <div className="mx-auto max-w-5xl px-4 mt-8">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition-all duration-200 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-800"
        >
          {!previewUrl ? (
            <>
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-blue-100 p-5 dark:bg-blue-950/50">
                  <span className="text-4xl">🖼️</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Drag & Drop Images
              </h2>
              <p className="mt-3 text-slate-500 dark:text-gray-400">
                or click to browse
              </p>
              <p className="mt-2 text-xs text-slate-400 dark:text-gray-500">
                Supports: JPG, PNG, WebP • Max 50MB
              </p>
              <div className="mt-8">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Choose Image
                </label>
              </div>
            </>
          ) : (
            <div>
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto max-h-64 rounded-lg object-contain"
                />
              </div>
              <p className="font-medium text-slate-900 dark:text-white">
                {originalImage.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                {(originalImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleRemove}
                  className="rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  ✕ Remove
                </button>
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer rounded-lg border border-blue-300 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  📁 Change
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compression Options */}
      {originalImage && (
        <div className="mx-auto max-w-5xl px-4 mt-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Compression Settings
            </h3>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-gray-400">Quality</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {compressionLevel}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                className="mt-2 w-full cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400 dark:text-gray-500">
                <span>Smaller</span>
                <span>Quality</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {isCompressing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Compressing...
                  </span>
                ) : (
                  '🔽 Compress Image'
                )}
              </button>
            </div>

            {isCompressing && (
              <div className="mt-4">
                <div className="mx-auto h-2 max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-gray-700">
                  <div
                    className="h-full w-full animate-pulse rounded-full bg-blue-600"
                    style={{
                      width: '100%',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                </div>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-gray-400">
                  ⏳ Processing image... Please wait
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Result */}
      {compressedImage && (
        <div className="mx-auto max-w-5xl px-4 mt-8 mb-16">
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800/30 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
              ✅ Compression Complete!
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600 dark:text-gray-400">Original</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {(originalImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div>
                <p className="text-slate-600 dark:text-gray-400">Compressed</p>
                <p className="font-medium text-green-700 dark:text-green-300">
                  {(compressedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="mt-4 w-full rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            >
              📥 Download Compressed Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}