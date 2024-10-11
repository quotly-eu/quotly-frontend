import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../assets/themes/default';
import { BrowserRouter } from 'react-router-dom';

/**
 * Custom render method that wraps the component in a ThemeProvider
 * Override the default render method from @testing-library/react
 */
const customRender = (ui: React.ReactElement, options = {}) => {
  return render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  </ThemeProvider>, 
  options);
};
export * from '@testing-library/react';
export { customRender as render };
