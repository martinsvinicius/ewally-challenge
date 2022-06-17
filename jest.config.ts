export default {
  bail: true,

  clearMocks: true,

  // collectCoverage: true,

  // coverageDirectory: 'coverage',

  // coverageProvider: 'v8',

  preset: 'ts-jest',

  testMatch: [
    '**/__tests__/**/*.(spec|test).[jt]s',
    '**/?(*.)+(spec|test).[tj]s',
  ],

  testPathIgnorePatterns: ['/node_modules/'],
}
