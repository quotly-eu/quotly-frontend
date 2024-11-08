import React, { useRef, useState } from 'react';

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
import QuoteDialog from 'components/QuoteDialog/QuoteDialog';
import Login from 'pages/Login/Login';

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
const App = () => {
  const quoteDialogRef = useRef<HTMLDialogElement>(null);
  const [mobileCurrentTop, setMobileCurrentTop] = useState(0);

  // Prevent right-click context menu on production for user experience
  const onContextMenu = (e: React.MouseEvent) => {
    if(process.env.NODE_ENV === 'production') e.preventDefault();
  };
  
  // On mobile devices, hide or show top navbar relatively.
  const mobileScroll = (e: React.UIEvent) => {
    const target = e.currentTarget;
    setMobileCurrentTop(target.scrollTop);
    const currentTop = target.scrollTop;
    const diff = currentTop - mobileCurrentTop;
    const navbarTop = target.firstChild as HTMLDivElement;

    navbarTop.style.translate = diff > 0 ? `0 -100%` : `0 0`;
  };

  // Toggle the Quote Dialog (Modal)
  const toggleDialog = () => {
    const dialog = quoteDialogRef.current;
    if (!dialog) return;

    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
    }
  };

  return (
    <AppContainer onContextMenu={onContextMenu}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={
            <>
              <RouteContainer onScroll={mobileScroll}>
                <NavbarTop />
                <PagesContainer>
                  <Routes>
                    <Route index element={<Main />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </PagesContainer>
              </RouteContainer>

              <NavbarLeft toggleDialog={toggleDialog} />

              <QuoteDialog ref={quoteDialogRef} toggleDialog={toggleDialog} />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
