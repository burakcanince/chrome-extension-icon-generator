import React, { useState, useRef, useEffect } from 'react';
import UploadArea from './components/UploadArea';
import PreviewSection from './components/PreviewSection';
import InstallationSection from './components/InstallationSection';

const ICON_SIZES = [16, 32, 48, 128];

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const canvasesRef = useRef({});

  useEffect(() => {
    if (!uploadedImage) return;

    ICON_SIZES.forEach((size) => {
      const canvas = canvasesRef.current[size];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(uploadedImage, 0, 0, size, size);
    });
  }, [uploadedImage]);

  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      setUploadedImage(img);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const downloadIcons = () => {
    ICON_SIZES.forEach((size) => {
      const canvas = canvasesRef.current[size];
      if (!canvas) return;

      chrome.downloads.download({
        url: canvas.toDataURL('image/png'),
        filename: `icon${size}.png`,
        saveAs: false,
      });
    });
  };

  const clearAll = () => {
    ICON_SIZES.forEach((size) => {
      const canvas = canvasesRef.current[size];
      if (canvas) {
        canvas.getContext('2d').clearRect(0, 0, size, size);
      }
    });

    setUploadedImage(null);
  };

  return (
    <div className="p-5">
      <h1 className="mb-2 text-center text-2xl font-semibold text-gray-800">
        Chrome Extension Icon Generator
      </h1>

      <p className="mb-4 text-center text-sm text-gray-500">
        This extension takes any image and generates all the necessary sizes for
        Chrome extensions automatically
      </p>

      <UploadArea onImageUpload={handleImageUpload} />

      <PreviewSection
        canvasesRef={canvasesRef}
        onDownload={downloadIcons}
        onClear={clearAll}
        hasImage={!!uploadedImage}
      />

      <InstallationSection />
    </div>
  );
}

export default App;
