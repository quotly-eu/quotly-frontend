import React, { useContext, useEffect, useRef, useState } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main/Main';
import NotFound from 'pages/NotFound/NotFound';

import NavbarTop from '../NavbarTop/NavbarTop';
import NavbarLeft from '../NavbarLeft/NavbarLeft';

import styled, { css } from 'styled-components';
import GlobalStyle from 'assets/themes/GlobalStyle';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import QuoteDialog from 'components/QuoteDialog/QuoteDialog';
import Login from 'pages/Login/Login';
import OAuth from 'pages/OAuth/OAuth';
import PrivacyPolicy from 'pages/PrivacyPolicy/PrivacyPolicy';
import Cookies from 'pages/Cookies/Cookies';
import TermsOfService from 'pages/TermsOfService/TermsOfService';
import QuoteView from 'pages/QuoteView/QuoteView';
import Logout from 'pages/Logout/Logout';
import useFetch from 'hooks/useFetch';
import { User } from 'types/User.type';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import { useCookies } from 'react-cookie';
import { Role } from 'types/Role.type';
import TopQuotes from 'pages/TopQuotes/TopQuotesView';
import UserView from 'pages/User/UserView';
import SavedQuotes from 'pages/SavedQuotes/SavedQuotes';

// FontAwesome library
library.add(fas, far, fab);

// Styles
const AppContainer = styled.div`
  display: grid;

  height: 100dvh;
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

  ${({ theme }) => css`
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

  ${({ theme }) => css`
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
  const { routes } = useContext(ApiContext);
  const [ cookies ] = useCookies([ 'token' ]);
  const quoteDialogRef = useRef<HTMLDialogElement>(null);
  const [ mobileCurrentTop, setMobileCurrentTop ] = useState(0);
  const [ isQuoteDialogActive, setIsQuoteDialogActive ] = useState(false);
  const {
    runFetch: fetchMe,
    response: userResponse
  } = useFetch<User>(`${routes.users.sub?.me()}?token=${cookies.token}`);
  const {
    runFetch: fetchRoles,
    response: rolesResponse
  } = useFetch<Role[]>(`${routes.users.sub?.roles(userResponse?.data.userId || 0)}`);

  useEffect(() => {
    if (!cookies.token) return;
    fetchMe();
  }, [ cookies.token ]);

  useEffect(() => {
    if (userResponse && userResponse.status === 200) {
      fetchRoles();
    }
  }, [ userResponse ]);

  // Prevent right-click context menu on production for user experience
  const onContextMenu = (e: React.MouseEvent) => {
    if (process.env.NODE_ENV === 'production') e.preventDefault();
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
      setIsQuoteDialogActive(false);
    } else {
      dialog.showModal();
      setIsQuoteDialogActive(true);
    }
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="oauth" element={<OAuth />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="tos" element={<TermsOfService />} />
        <Route
          path="*" element={
          <AppContainer onContextMenu={onContextMenu}>
            <>
              <RouteContainer onScroll={mobileScroll}>
                <NavbarTop />
                <PagesContainer>
                  <Routes>
                    <Route index element={<Main userRoles={rolesResponse} userResponse={userResponse} />} />
                    <Route
                      path="quote/:id"
                      element={
                        <QuoteView
                          userRoles={rolesResponse}
                          userResponse={userResponse}
                        />
                      }
                    />
                    <Route
                      path="user/:id"
                      element={<UserView userRoles={rolesResponse} userResponse={userResponse} />}
                    />
                    <Route
                      path="saved"
                      element={<SavedQuotes userRoles={rolesResponse} userResponse={userResponse} />}
                    />
                    <Route path="top" element={<TopQuotes userRoles={rolesResponse} userResponse={userResponse} />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                  </Routes>
                </PagesContainer>
              </RouteContainer>

              <NavbarLeft userResponse={userResponse} toggleDialog={toggleDialog} />

              <QuoteDialog ref={quoteDialogRef} toggleDialog={toggleDialog} isActive={isQuoteDialogActive} />
            </>
          </AppContainer>
        }
        />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
