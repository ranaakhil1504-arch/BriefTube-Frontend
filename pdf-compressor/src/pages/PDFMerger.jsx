
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'react-hot-toast';
import FreeTierBanner from '../components/common/FreeTierBanner';

export default function PDFMerger() {
  const [files, setFiles] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;
    
    const invalidFiles = selectedFiles.filter(f => f.type !== 'application/pdf');
    if (invalidFiles.length > 0) {
      toast.error('Please select only PDF files');
      return;
    }
    
    setFiles(prev => [...prev, ...selectedFiles]);
    setMergedPdf(null);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setMergedPdf(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files');
      return;
    }

    try {
      setIsMerging(true);
      toast.loading('Merging PDFs...', { id: 'merge' });

      // Create a new PDF document
      const mergedDoc = await PDFDocument.create();
      
      // Loop through each file
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedDoc.addPage(page));
      }
      
      // Save the merged PDF
      const mergedPdfBytes = await mergedDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setMergedPdf(url);
      toast.success(`✅ Merged ${files.length} PDFs successfully!`, { id: 'merge' });
      
    } catch (error) {
      console.error('Merge error:', error);
      toast.error('Failed to merge PDFs. Please try again.', { id: 'merge' });
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdf) return;
    const a = document.createElement('a');
    a.href = mergedPdf;
    a.download = 'merged.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setMergedPdf(null);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
            📎 Free • Fast • Privacy Focused
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Merge PDF Files
            <span className="block text-blue-600 dark:text-blue-400">Combine Multiple PDFs</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-gray-300">
            Upload multiple PDFs and merge them into a single file.
            <br />
            No uploads. Everything stays in your browser. 🔒
          </p>
        </div>
      </div>

      {/* Free Tier Banner */}
      <FreeTierBanner />

      {/* Upload Area */}
      <div className="mx-auto max-w-5xl px-4 mt-8">
        <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition-all duration-200 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-800">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-100 p-5 dark:bg-blue-950/50">
              <span className="text-4xl">📎</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Upload PDF Files
          </h2>
          <p className="mt-3 text-slate-500 dark:text-gray-400">
            Select multiple PDF files to merge
          </p>
          <p className="mt-2 text-xs text-slate-400 dark:text-gray-500">
            Supports: PDF • Max 50MB each
          </p>
          <div className="mt-8">
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Choose PDFs
            </label>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mx-auto max-w-5xl px-4 mt-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Files to Merge ({files.length})
              </h3>
              <button
                onClick={handleRemoveAll}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove All
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-gray-700">
                  <span className="text-sm text-slate-700 dark:text-gray-300">
                    {index + 1}. {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleMerge}
              disabled={isMerging}
              className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isMerging ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Merging...
                </span>
              ) : (
                '📎 Merge PDFs'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Result - Download Merged PDF */}
      {mergedPdf && (
        <div className="mx-auto max-w-5xl px-4 mt-8 mb-16">
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800/30 dark:bg-green-900/20">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
              ✅ Merge Complete!
            </h3>
            <p className="mt-2 text-sm text-green-700 dark:text-green-400">
              {files.length} PDF files merged successfully.
            </p>
            <button
              onClick={handleDownload}
              className="mt-4 w-full rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            >
              📥 Download Merged PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
