
import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import FreeTierBanner from '../components/common/FreeTierBanner';

// Preset dimensions for common use cases
const PRESETS = [
  { label: 'Passport', width: 200, height: 200 },
  { label: 'Instagram', width: 1080, height: 1080 },
  { label: 'LinkedIn', width: 400, height: 400 },
  { label: 'Facebook', width: 1200, height: 630 },
  { label: 'Twitter', width: 800, height: 418 },
  { label: 'YouTube Thumbnail', width: 1280, height: 720 },
];

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maxKB, setMaxKB] = useState('');
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState('image/jpeg');
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    setOriginalImage(file);
    setResizedImage(null);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Load image to get dimensions
    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setAspectRatio(img.width / img.height);
      imgRef.current = img;
    };
    img.src = url;
    
    toast.success(`Loaded: ${file.name}`);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setResizedImage(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
        imgRef.current = img;
      };
      img.src = url;
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // Lock aspect ratio
  const handleWidthChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setWidth(val);
    if (lockAspect && val > 0) {
      setHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setHeight(val);
    if (lockAspect && val > 0) {
      setWidth(Math.round(val * aspectRatio));
    }
  };

  // Apply preset
  const applyPreset = (preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setAspectRatio(preset.width / preset.height);
  };

  // Resize image
  const handleResize = async () => {
    if (!originalImage) {
      toast.error('Please upload an image first');
      return;
    }
    
    if (!width || !height || width < 1 || height < 1) {
      toast.error('Please enter valid dimensions');
      return;
    }
    
    try {
      setIsProcessing(true);
      toast.loading('Resizing image...', { id: 'resize' });
      
      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Draw resized image
      const img = imgRef.current;
      if (!img) {
        // Load image again
        const img2 = new Image();
        img2.onload = () => {
          ctx.drawImage(img2, 0, 0, width, height);
          finishResize(canvas);
        };
        img2.src = previewUrl;
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      finishResize(canvas);
      
    } catch (error) {
      console.error('Resize error:', error);
      toast.error('Failed to resize image', { id: 'resize' });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const finishResize = (canvas) => {
    // Get blob with quality
    let qualityValue = quality / 100;
    let blob;
    
    // Try to meet maxKB if specified
    if (maxKB && maxKB > 0) {
      let q = qualityValue;
      let attempts = 0;
      do {
        blob = dataURLToBlob(canvas.toDataURL(format, q));
        if (blob.size <= maxKB * 1024) break;
        q -= 0.05;
        attempts++;
      } while (q > 0.1 && attempts < 20);
      
      // Update quality slider to match
      setQuality(Math.round(q * 100));
    } else {
      blob = dataURLToBlob(canvas.toDataURL(format, qualityValue));
    }
    
    const url = URL.createObjectURL(blob);
    setResizedImage({ url, blob, size: blob.size });
    
    const sizeKB = (blob.size / 1024).toFixed(1);
    toast.success(`✅ Resized! ${sizeKB} KB`, { id: 'resize' });
  };
  
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Download resized image
  const handleDownload = () => {
    if (!resizedImage) return;
    const a = document.createElement('a');
    const ext = format.split('/')[1];
    a.href = resizedImage.url;
    a.download = `resized.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Clear everything
  const handleClear = () => {
    setOriginalImage(null);
    setPreviewUrl(null);
    setResizedImage(null);
    setWidth('');
    setHeight('');
    setMaxKB('');
    setQuality(85);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Get file size display
  const getFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <>
      <Helmet>
        <title>Free Image Resizer - Resize Images to Exact Pixels | BriefTube</title>
        <meta name="description" content="Resize images to exact pixel dimensions and KB size for passport, ID cards, social media & more. Free online image resizer tool." />
        <meta property="og:title" content="Free Image Resizer - Resize Images to Exact Pixels" />
        <meta property="og:description" content="Resize images to exact pixel dimensions and KB size for forms, passport, social media. Free online tool." />
        <meta property="og:url" content="https://brieftube.co/pdf-compressor/image-resizer" />
        <meta name="keywords" content="image resizer, resize image, photo resizer, passport photo, ID photo" />
        <link rel="canonical" href="https://brieftube.co/pdf-compressor/image-resizer" />
      </Helmet>

      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-white to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-4xl text-center px-4">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
              📐 Free • Fast • Privacy Focused
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Image Resizer
              <span className="block text-blue-600 dark:text-blue-400">Perfect Size for Any Form</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-gray-300">
              Resize images to exact pixels and KB for passport, ID cards, social media & more.
              <br />
              Everything stays in your browser. 🔒
            </p>
          </div>
        </div>

        {/* Free Tier Banner */}
        <FreeTierBanner />

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Upload Area */}
          {!originalImage ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition-all duration-200 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-800"
            >
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-blue-100 p-5 dark:bg-blue-950/50">
                  <span className="text-5xl">📐</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Upload Image
              </h2>
              <p className="mt-3 text-slate-500 dark:text-gray-400">
                Drag & drop or click to browse
              </p>
              <p className="mt-2 text-xs text-slate-400 dark:text-gray-500">
                Supports: JPG, PNG, WebP • Max 50MB
              </p>
              <div className="mt-8">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Choose Image
                </label>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left: Preview */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-gray-300">Preview</h3>
                    <button
                      onClick={handleClear}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      ✕ Change Image
                    </button>
                  </div>
                  <div className="relative flex min-h-[200px] items-center justify-center rounded-lg bg-slate-50 dark:bg-gray-700">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-[300px] max-w-full rounded-lg object-contain"
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-slate-500 dark:text-gray-400">
                    <span>Original: {originalImage.name}</span>
                    <span>{getFileSize(originalImage.size)}</span>
                  </div>
                </div>
                
                {resizedImage && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800/30 dark:bg-green-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">✅ Resized</p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          {getFileSize(resizedImage.size)}
                        </p>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                      >
                        📥 Download
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Controls */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Resize Settings</h3>
                  
                  {/* Presets */}
                  <div className="mt-4">
                    <p className="text-sm text-slate-600 dark:text-gray-400">Quick Presets</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => applyPreset(preset)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs transition hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-blue-900/30"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-600 dark:text-gray-400">Width (px)</label>
                      <input
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600 dark:text-gray-400">Height (px)</label>
                      <input
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={lockAspect}
                      onChange={() => setLockAspect(!lockAspect)}
                      id="lock-aspect"
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <label htmlFor="lock-aspect" className="text-sm text-slate-600 dark:text-gray-400">
                      Maintain Aspect Ratio
                    </label>
                  </div>

                  {/* Target KB */}
                  <div className="mt-4">
                    <label className="text-sm text-slate-600 dark:text-gray-400">Max Size (KB)</label>
                    <input
                      type="number"
                      value={maxKB}
                      onChange={(e) => setMaxKB(parseInt(e.target.value) || '')}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., 100"
                      min="1"
                    />
                  </div>

                  {/* Format & Quality */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-600 dark:text-gray-400">Format</label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="image/jpeg">JPG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-600 dark:text-gray-400">Quality: {quality}%</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value))}
                        className="mt-1 w-full cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleResize}
                    disabled={isProcessing}
                    className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      '🔄 Resize Image'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}