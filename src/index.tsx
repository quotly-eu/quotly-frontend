import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { themes } from 'assets/themes/default';

import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import App from 'components/App/App';
import ApiContextProvider from 'contexts/ApiContext/ApiContext';
import { BrowserRouter } from 'react-router-dom';
import AppDataProvider from './contexts/AppData/AppData';
import { useLocalStorage } from 'usehooks-ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Index = () => {
  const [currentTheme] = useLocalStorage<keyof typeof themes>('theme', 'light');
  const queryClient = new QueryClient();
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={themes[currentTheme]}>
        <QueryClientProvider client={queryClient}>
          <ApiContextProvider>
            <AppDataProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AppDataProvider>
          </ApiContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
