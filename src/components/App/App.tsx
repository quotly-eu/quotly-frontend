import React, { BaseSyntheticEvent, useState } from 'react';

// Pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import NotFound from '../../pages/NotFound/NotFound';

// Components
import NavbarTop from '../NavbarTop/NavbarTop';
import NavbarLeft from '../NavbarLeft/NavbarLeft';

// Theme
import styled from 'styled-components';
import GlobalStyle from '../../assets/themes/GlobalStyle';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// FontAwesome library
library.add(fas, far, fab);

// Styles
const AppContainer = styled.div`
  display: grid;

  height: inherit;
  grid-template-areas:
    'navbar-left navbar-top'
    'navbar-left route';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-areas:
      'navbar-top'
      'route'
      'navbar-left';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const PagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${({ theme }) => `
    background-color: ${theme.colors.transparency.black(0.075)};
  
    padding: ${theme.spacing.s.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      border-radius: ${theme.spacing.l.rem};
    }

    @media (min-width: ${theme.breakpoints.md}) {
      border-top-left-radius: ${theme.spacing.l.rem};
      overflow-y: auto;
    }
  `}
`;

const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: route;

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.md}) {
      border-radius: 0 0 ${theme.spacing.l.rem} ${theme.spacing.l.rem};
    }
  `}

  overflow-y: auto;
`;

/**
 * App Component with BrowserRouter and Routes
 */
function App() {
  const [mobileCurrentTop, setMobileCurrentTop] = useState(0);

  // Prevent right-click context menu on production for user experience
  const onContextMenu = (e: BaseSyntheticEvent) => {
    if(process.env.NODE_ENV === 'production') e.preventDefault();
  };

  // Prevent touch move for iOS user experience
  const onTouchMove = (e: BaseSyntheticEvent) => e.stopPropagation();
  
  const mobileScroll = (e:BaseSyntheticEvent) => {
    const target: HTMLDivElement = e.target;
    setMobileCurrentTop(target.scrollTop);
    const currentTop = target.scrollTop;
    const diff = currentTop - mobileCurrentTop;
    const navbarTop = target.firstChild as HTMLDivElement;

    navbarTop.style.translate = diff > 0 ? `0 -100%` : `0 0`;
  };

  return (
    <AppContainer onContextMenu={onContextMenu} onTouchMove={onTouchMove}>
      <BrowserRouter>
        <GlobalStyle />
        <RouteContainer onScroll={mobileScroll}>
          <NavbarTop />
          <PagesContainer>
            <Routes>
              <Route index element={<Main />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </PagesContainer>
        </RouteContainer>
        <NavbarLeft />
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
