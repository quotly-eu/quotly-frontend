import React, { useEffect } from 'react';
import styled, { css, useTheme } from 'styled-components';

import Switcher from 'components/Switcher/Switcher';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import Feeds from 'components/Feeds/Feeds';
import { useTranslation } from 'react-i18next';
import { $api } from 'utils/api';
import useGetToken from 'hooks/useGetToken';

// Styles
const TopQuotesContainer = styled.div`
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
  ${Container};
  grid-area: quotes;
`;

/**
 * Main Page for Quotly
 */
const TopQuotes = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const token = useGetToken();
  const {data: quotes} = $api.useQuery('get', '/v1/quotes/top', {params: {query: {token, limit: 50}}});

  return (
    <TopQuotesContainer>
      <QuotesContainer>
        <PageTitle title={t('trends')} icon="fire" isVisual />
        {quotes && quotes.map((quote, index) => (
          <Quote
            {...quote}
            isLast={quotes.length !== 1 && quotes.length == (index + 1)}
            key={quote.quoteId}
          />
        ))}
      </QuotesContainer>
      <Switcher breakpoint={theme.breakpoints.lg} desktop={<Feeds />} />
    </TopQuotesContainer>
  );
};

export default TopQuotes;