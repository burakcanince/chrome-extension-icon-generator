import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

function UploadArea({ onImageUpload }) {
  const fileInputRef = useRef(null);
  const [highlight, setHighlight] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      onImageUpload(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <div className="mb-4">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-5 py-8 text-center transition-all duration-300 ${
          highlight
            ? 'border-blue-500 bg-blue-50'
            : 'border-blue-400 bg-gray-50 hover:bg-blue-50/60'
        }`}
      >
        <UploadCloud
          className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.75}
        />
        <p className="font-medium text-blue-500">Upload file</p>
        <p className="text-sm text-gray-400">
          click or drag and drop your file here
        </p>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </div>
    </div>
  );
}

export default UploadArea;
