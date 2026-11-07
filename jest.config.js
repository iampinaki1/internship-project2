module.exports = {
  preset: '@react-native/jest-preset',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-screens)/)',
  ],
  moduleNameMapper: {
    '^@react-native-google-signin/google-signin$': '<rootDir>/src/shims/googleSignin.js',
    '^firebase/app$': '<rootDir>/__mocks__/firebaseMock.js',
    '^firebase/auth$': '<rootDir>/__mocks__/firebaseMock.js',
    '^firebase/firestore$': '<rootDir>/__mocks__/firebaseMock.js',
  },
};
