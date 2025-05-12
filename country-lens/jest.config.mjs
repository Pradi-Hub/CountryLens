// jest.config.mjs
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: [resolve(__dirname, 'src/setupTests.js')],
  moduleNameMapper: {
    '^react-router-dom$': resolve(__dirname, 'node_modules/react-router-dom'),
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
