import '@testing-library/jest-dom';

// Suppress warnings and errors
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.warn.mockRestore();
    console.error.mockRestore();
});