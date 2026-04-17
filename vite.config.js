import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const copyToDist = (source, target = source) => {
  cpSync(resolve(__dirname, source), resolve(__dirname, 'dist', target), {
    recursive: true,
  });
};

export default defineConfig({
  plugins: [
    react(),
    {
      closeBundle() {
        copyToDist('manifest.json');
      },
    },
  ],
});
