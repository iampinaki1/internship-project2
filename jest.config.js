module.exports = {
  preset: '@react-native/jest-preset',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-screens)/)',
  ],
  moduleNameMapper: {
    '^firebase/app$': '<rootDir>/src/mocks/firebaseMock.js',
    '^firebase/auth$': '<rootDir>/src/mocks/firebaseMock.js',
    '^firebase/firestore$': '<rootDir>/src/mocks/firebaseMock.js',
  },
};
