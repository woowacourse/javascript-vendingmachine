module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/test/jest/*.test.(js|ts)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
