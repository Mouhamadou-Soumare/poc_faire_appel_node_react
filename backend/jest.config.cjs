module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.cjs'], // Rename to .js for consistency
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
