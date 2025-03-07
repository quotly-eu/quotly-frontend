// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '__mocks__/window';
import '__mocks__/iconify-react';

import '__mocks__/remark-gfm';
import '__mocks__/remark-toc';

jest.mock('react-markdown');
jest.mock('usehooks-ts', () => ({
  useLocalStorage: (key: string, init: string) => ([ init, jest.fn(), jest.fn ]),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: undefined,
      languages: [],
      changeLanguage: jest.fn()
    }
  }),
  Trans: ({ children }: { i18nKey: string; children: React.ReactNode }) => children
}));
jest.mock('@fortawesome/react-fontawesome');