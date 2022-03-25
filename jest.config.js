module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@Display/(.*)$': '<rootDir>/src/es/Display/$1',
    '^@Store/(.*)$': '<rootDir>/src/es/Store/$1',
    '^@Utils/(.*)$': '<rootDir>/src/es/utils/$1',
    '^@Constants/(.*)$': '<rootDir>/src/es/constants/$1',
  },
  testMatch: ['<rootDir>/**/*.test.(js|ts)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
