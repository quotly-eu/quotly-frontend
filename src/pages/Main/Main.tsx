import React, { useContext, useEffect } from 'react';
import styled, { css, useTheme } from 'styled-components';

import Switcher from 'components/Switcher/Switcher';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import { QuoteType } from 'types/Quote.type';

import useFetch from 'hooks/useFetch';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import { Role } from 'types/Role.type';
import { ApiResponse } from 'types/ApiResponse.type';
import { User } from 'types/User.type';
import Feeds from 'components/Feeds/Feeds';
import { useCookies } from 'react-cookie';

type MainProps = {
  userRoles?: ApiResponse<Role[]>;
  userResponse?: ApiResponse<User>;
};

// Styles
const MainContainer = styled.div`
  display: grid;
  grid-template-areas: 
    // 'users users'
    'quotes feeds';
  grid-template-columns: 1fr auto;

  ${({ theme }) => `
    gap: ${theme.spacing.s.rem};

    @media (max-width: ${theme.breakpoints.lg}) {
      grid-template-areas: 'quotes';
      grid-template-columns: 1fr;
    }
  `}
`;

const Container = css`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

const QuotesContainer = styled.div`
  ${Container}
  grid-area: quotes;
`;

/**
 * Main Page for Quotly
 */
const Main = ({ userRoles, userResponse }: MainProps) => {
  const theme = useTheme();
  const { routes } = useContext(ApiContext);
  const [ cookies ] = useCookies(['token']);
  const { runFetch: fetchQuotes, response: quotes } = useFetch<QuoteType[]>(`${routes.quotes.construct()}?token=${cookies.token}`);

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <MainContainer>
      <PageTitle />
      <QuotesContainer>
        {quotes?.data && quotes.data.map((quote, index) => (
          <Quote 
            {...quote}
            userRoles={userRoles}
            userResponse={userResponse}
            isLast={quotes.data.length !== 1 && quotes.data.length == (index+1)} 
            key={quote.quoteId}
          />
        ))}
      </QuotesContainer>
      <Switcher breakpoint={theme.breakpoints.lg} desktop={<Feeds />} />
    </MainContainer>
  );
};

export default Main;