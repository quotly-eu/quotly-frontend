import React, { useEffect } from 'react';
import styled, { css, useTheme } from 'styled-components';

import Switcher from 'components/Switcher/Switcher';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import { QuoteType } from 'types/Quote.type';

import useFetch from 'hooks/useFetch';
import { useApiContext } from 'contexts/ApiContext/ApiContext';
import Feeds from 'components/Feeds/Feeds';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// Styles
const TopQuotesContainer = styled.div`
  display: grid;
  grid-template-areas: 
    // 'users users'
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
  ${Container};
  grid-area: quotes;
`;

/**
 * Main Page for Quotly
 */
const TopQuotes = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { routes } = useApiContext();
  const [ cookies ] = useCookies([ 'token' ]);
  const {
    runFetch: fetchQuotes,
    response: quotes
  } = useFetch<QuoteType[]>(`${routes.quotes.sub?.top()}?token=${cookies.token}&limit=50`);

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <TopQuotesContainer>
      <QuotesContainer>
        <PageTitle title={t('trends')} icon="fire" isVisual />
        {quotes && quotes.data.map((quote, index) => (
          <Quote
            {...quote}
            isLast={quotes.data.length !== 1 && quotes.data.length == (index + 1)}
            key={quote.quoteId}
          />
        ))}
      </QuotesContainer>
      <Switcher breakpoint={theme.breakpoints.lg} desktop={<Feeds />} />
    </TopQuotesContainer>
  );
};

export default TopQuotes;