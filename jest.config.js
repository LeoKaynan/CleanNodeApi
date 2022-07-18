/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: '@shelf/jest-mongodb',
//   preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: tsjPreset.transform,
};