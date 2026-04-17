import React from 'react';
import { Download, Trash2 } from 'lucide-react';

const PREVIEW_SIZES = [128, 48, 32, 16];

function PreviewSection({ canvasesRef, onDownload, onClear, hasImage }) {
  return (
    <section className="mt-3 border-t border-gray-200 pt-3">
      <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
        Preview
      </h2>

      <div className="flex flex-wrap justify-center gap-5 mb-5">
        {PREVIEW_SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <canvas
              ref={(el) => {
                canvasesRef.current[size] = el;
              }}
              width={size}
              height={size}
              className="cursor-pointer rounded border border-gray-200 bg-gray-50 shadow-sm"
            />
            <div className="text-xs text-gray-400">{size}x{size}</div>
          </div>
        ))}
      </div>

      <div className="flex mx-auto max-w-[70%] gap-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!hasImage}
          className="flex flex-1 items-center justify-center gap-2 rounded bg-blue-600 py-3 text-white text-sm disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Download
          <Download size={16} />
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasImage}
          className="flex flex-1 items-center justify-center gap-2 rounded bg-red-500 py-3 text-white text-sm disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Clear
          <Trash2 size={16} />
        </button>
      </div>
    </section>
  );
}

export default PreviewSection;
