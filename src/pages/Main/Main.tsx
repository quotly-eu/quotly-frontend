import React from 'react';
import styled, { css, useTheme } from 'styled-components';

import Switcher from 'components/Switcher/Switcher';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import Feeds from 'components/Feeds/Feeds';
import useGetToken from 'hooks/useGetToken';
import { $api } from 'utils/api';

// Styles
const MainContainer = styled.div`
  display: grid;
  grid-template-areas: 
    'quotes feeds';
  grid-template-columns: 1fr auto;

  ${({ theme }) => css`
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
  grid-area: quotes;
  ${Container}
`;

/**
 * Main Page for Quotly
 */
const Main = () => {
  const theme = useTheme();
  const token = useGetToken();
  const { data: quotes } = $api.useQuery('get', '/v1/quotes', { params: { query: { token } } });

  return (
    <MainContainer>
      <PageTitle />
      <QuotesContainer>
        {quotes && quotes.map((quote, index) => (
          <Quote
            {...quote}
            isLast={quotes.length !== 1 && quotes.length == (index + 1)}
            key={quote.quoteId}
          />
        ))}
      </QuotesContainer>
      <Switcher breakpoint={theme.breakpoints.lg} desktop={<Feeds />} />
    </MainContainer>
  );
};

export default Main;