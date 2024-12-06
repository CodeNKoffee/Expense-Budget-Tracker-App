module.exports = {
  OS: 'ios', // or 'android' if needed
  select: jest.fn().mockImplementation((platforms) => platforms.ios),
};
