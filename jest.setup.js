/* eslint-disable no-underscore-dangle */

// jest.setup.js
global.__DEV__ = true; // Set it to `false` if you want to simulate production mode

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios', // or 'android' based on your testing needs
  select: jest.fn().mockImplementation((platforms) => platforms.ios), // mock select behavior
}));
