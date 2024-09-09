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

// Styles
const AppContainer = styled.div`
  display: grid;

  min-height: inherit;
  grid-template-areas:
    "navbar-left navbar-top"
    "navbar-left route";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
`;
const RouteContainer = styled.div`
  grid-area: route;
  background-color: ${props => props.theme.colors.transparency.black(0.075)};
  
  padding: ${props => props.theme.spacing.s.rem} 0 0 ${props => props.theme.spacing.s.rem};
  border-top-left-radius: ${props => props.theme.spacing.l.rem};

`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle />
        <NavbarTop />
        <NavbarLeft />
        <RouteContainer>
          <BrowserRouter>
            <Routes>
              <Route index element={<Main />} />
            </Routes>
          </BrowserRouter>
        </RouteContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
