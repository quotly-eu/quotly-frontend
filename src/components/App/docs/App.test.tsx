import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { ThemeProvider } from 'styled-components';
import theme from 'assets/themes/default';

describe('App', () => {
  it('renders', () => {
    expect(render(<ThemeProvider theme={theme}><App /></ThemeProvider>)).not.toBeNull();
  });
});
