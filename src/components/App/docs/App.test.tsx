import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { ThemeProvider } from 'styled-components';
import theme from 'assets/themes/default';
import ApiContextProvider from 'contexts/ApiContext/ApiContext';

describe('App', () => {
  it('renders', () => {
    const result = render(
      <ThemeProvider theme={theme}>
        <ApiContextProvider>
          <App />
        </ApiContextProvider>
      </ThemeProvider>
    );
    expect(result).not.toBeNull();
  });
});
