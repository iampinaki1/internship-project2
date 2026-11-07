/**
 * Web shim for react-native/Libraries/Utilities/codegenNativeComponent
 *
 * react-native-screens and react-native-safe-area-context reference this
 * internal RN module. It uses native code that doesn't exist in the browser,
 * so Vite needs this stub to avoid a parse/build error.
 *
 * This file is only used during the Vite (web) build — Metro ignores it
 * because the alias is defined in vite.config.mjs, not metro.config.js.
 */
import { View } from 'react-native';

export default function codegenNativeComponent() {
  return View;
}
