// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '__mocks__/window';
import '__mocks__/iconify-react';

jest.mock('react-markdown');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, 
    i18n: {
      language: undefined
    } 
  }),
}));
jest.mock('@fortawesome/react-fontawesome');