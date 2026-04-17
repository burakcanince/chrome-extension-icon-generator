import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const MANIFEST_SNIPPET = `"icons": {
  "16": "images/icon16.png",
  "32": "images/icon32.png",
  "48": "images/icon48.png",
  "128": "images/icon128.png"
}`;

function InstallationSection() {
  const [copied, setCopied] = useState(false);

  const copyManifestCode = async () => {
    try {
      await navigator.clipboard.writeText(MANIFEST_SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy manifest snippet:', err);
    }
  };

  return (
    <section className="mt-3 border-t border-gray-200 pt-3">
      <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
        Installation
      </h2>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          It will create 16px, 32px, 48px, and 128px icons from the image you upload.
        </p>
        <p className="text-sm text-gray-600">
          It will then give you the code to add to your manifest.json file:
        </p>
      </div>

      <div className="relative rounded bg-[#282a36] mt-4 p-4">
        <pre className="text-[13px] text-white">
          <code>{MANIFEST_SNIPPET}</code>
        </pre>
        <button
          type="button"
          onClick={copyManifestCode}
          className="absolute right-3 top-3"
        >
          {copied ? (
            <Check className="text-green-400" size={16} />
          ) : (
            <Copy className="text-white" size={16} />
          )}
        </button>
      </div>
    </section>
  );
}

export default InstallationSection;
