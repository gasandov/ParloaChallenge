module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testRegex: '/*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: [
    "node_modules"
  ]
}