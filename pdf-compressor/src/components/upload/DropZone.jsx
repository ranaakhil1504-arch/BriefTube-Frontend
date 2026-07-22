
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import BrowseButton from "./BrowseButton";

export default function DropZone({ onFileSelect, accept }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleChange}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
          dragging
            ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30"
            : "border-slate-300 bg-white dark:border-gray-600 dark:bg-gray-800"
        }`}
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-100 p-5 transition-colors duration-300 dark:bg-blue-950/50">
            <Upload
              size={42}
              className="text-blue-600 transition-colors duration-300 dark:text-blue-400"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold transition-colors duration-300 dark:text-white sm:text-3xl">
          Drag & Drop Files
        </h2>

        <p className="mt-3 text-slate-500 transition-colors duration-300 dark:text-gray-400">
          <span className="sm:hidden">Tap below to choose a file from your device</span>
          <span className="hidden sm:inline">or choose a file from your device</span>
        </p>

        <div className="mt-8">
          <BrowseButton onClick={() => inputRef.current.click()} />
        </div>
      </div>
    </>
  );
}