import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../assets/themes/default';

/**
 * Custom render method that wraps the component in a ThemeProvider
 * Override the default render method from @testing-library/react
 */
const customRender = (ui: React.ReactElement, options = {}) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
};
export * from '@testing-library/react';
export { customRender as render };
