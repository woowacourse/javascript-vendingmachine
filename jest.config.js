module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['<rootDir>/src/__test__/**/*.test.(js|ts)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress/'],
};
