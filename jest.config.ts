module.exports = {
  testRegex: '.*\\.spec\\.ts$', // Ensure that spec files with .ts extension are matched
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transpile TypeScript files for testing
  },
  rootDir: './src',
  moduleNameMapper: {
    '^@calculator/(.*)$': '<rootDir>/calculator/$1',
  },
};
