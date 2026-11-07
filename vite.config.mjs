import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensions = [
  '.web.js',
  '.web.jsx',
  '.web.ts',
  '.web.tsx',
  '.mjs',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
];

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    __DEV__: JSON.stringify(true),
    'process.env': {},
  },
  resolve: {
    alias: [
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: path.resolve(__dirname, 'src/mocks/codegenNativeComponent.js'),
      },
      {
        find: /^react-native$/,
        replacement: 'react-native-web',
      },
    ],
    extensions,
  },
  server: {
    port: 5173,
    host: true,
  },
});
