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
    // Expose VITE_-prefixed env vars to the build so firebase.js can read them.
    // All sensitive keys live in .env (VITE_FIREBASE_* / VITE_GOOGLE_*)
    'process.env': {},
  },
  resolve: {
    alias: [
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: path.resolve(__dirname, 'src/shims/codegenNativeComponent.js'),
      },
      // Stub out native-only packages so Vite never tries to parse their
      // Flow type annotations. The Platform.OS === 'web' guard in AuthContext
      // ensures these stubs are never actually called at runtime.
      {
        find: '@react-native-google-signin/google-signin',
        replacement: path.resolve(__dirname, 'src/shims/googleSignin.js'),
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
  // Vite automatically reads .env files. Keys prefixed VITE_ are exposed to
  // client code via import.meta.env.VITE_*
  envPrefix: 'VITE_',
});
