import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  },
  resolve: {
    alias: [
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: path.resolve(__dirname, 'src/mocks/codegenNativeComponent.js'),
      },
      {
        find: 'react-native',
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
