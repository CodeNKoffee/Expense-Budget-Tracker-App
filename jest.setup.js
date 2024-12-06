import 'react-native-gesture-handler/jestSetup';
// Add this if you use `jest-native` matchers
import '@testing-library/jest-native/extend-expect';

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */

global.__DEV__ = true;

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return {
    ...RN,
    NativeModules: {
      ...RN.NativeModules,
      __fbBatchedBridgeConfig: {
        remoteModuleConfig: [], // Mock as an empty array or provide the required structure
      },
    },
    // Explicitly mock components with their displayName and return directly
    ActivityIndicator: jest.fn().mockImplementation((props) => <RN.View {...props} />),
    Button: jest.fn().mockImplementation((props) => <RN.View {...props} />),
    View: jest.fn().mockImplementation((props) => <RN.View {...props} />),
    Text: jest.fn().mockImplementation((props) => <RN.Text {...props} />),
    Platform: {
      ...RN.Platform,
      OS: 'ios', // Default to iOS for testing
      select: jest.fn((obj) => obj.ios),
    },
  };
});
