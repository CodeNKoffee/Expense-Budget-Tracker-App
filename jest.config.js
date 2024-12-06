module.exports = {
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Transform JavaScript and TypeScript files with babel-jest
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-redux)/', // Handle react-redux module transformation
  ],
  moduleNameMapper: {
    '^react-native/Libraries/Utilities/Platform$': '<rootDir>/__mocks__/react-native/Platform.js', // Mock Platform module
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'ios.js', 'android.js'],
};
