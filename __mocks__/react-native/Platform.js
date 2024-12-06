module.exports = {
  OS: 'ios', // Or 'android', depending on the test
  select: jest.fn().mockImplementation((platforms) => platforms.ios),
};
