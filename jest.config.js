module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'], // Add Jest-native assertions for cleaner tests
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|formik|uuid)',
  ],
  testEnvironment: 'jsdom', // Ensures compatibility with DOM APIs for certain libraries
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Supports alias paths
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
