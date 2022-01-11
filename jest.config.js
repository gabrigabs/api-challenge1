/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/__tests__/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  coveragePathIgnorePatterns: ['./src/infra/migrations/*']
};
