import React from 'react';

// Pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/Main';

// Components
import NavbarTop from '../NavbarTop/NavbarTop';

// Theme
import theme from '../../assets/themes/default';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../assets/themes/GlobalStyle';
import NavbarLeft from '../NavbarLeft/NavbarLeft';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NotFound from '../../pages/NotFound/NotFound';

// Styles
const AppContainer = styled.div`
  display: grid;

  height: inherit;
  grid-template-areas:
    "navbar-left navbar-top"
    "navbar-left route";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-areas:
      "navbar-top"
      "route"
      "navbar-left";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;
const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: route;

  ${({ theme }) => `
    background-color: ${theme.colors.transparency.black(0.075)};
  
    padding: ${theme.spacing.s.rem};
    border-top-left-radius: ${theme.spacing.l.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      border-top-right-radius: ${theme.spacing.l.rem};
      border-bottom-left-radius: ${theme.spacing.l.rem};
      border-bottom-right-radius: ${theme.spacing.l.rem};
    }

    overflow-y: auto;
  `}
`;

/**
 * App Component with BrowserRouter and Routes
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer onContextMenu={() => false}>
        <BrowserRouter>
          <GlobalStyle />
          <NavbarTop />
          <NavbarLeft />
          <RouteContainer>
            <Routes>
              <Route index element={<Main />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteContainer>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
