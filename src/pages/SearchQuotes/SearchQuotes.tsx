import React, { useEffect } from 'react';
import styled, { css, useTheme } from 'styled-components';

import Switcher from 'components/Switcher/Switcher';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import Feeds from 'components/Feeds/Feeds';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGetToken from 'hooks/useGetToken';
import { $api } from 'utils/api';

// Styles
const SearchQuotesContainer = styled.div`
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
const SearchQuotes = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = useGetToken();
  const search = searchParams.get('query') || '';
  const {
    data: quotes
  } = $api.useQuery('get', '/v1/quotes', {
    params: {
      query: {
        search,
        token
      }
    }
  }, { enabled: !!search });

  useEffect(() => {
    if (search) return;
    navigate('/404', { replace: true });
  }, [navigate, search]);

  return (
    <SearchQuotesContainer>
      <QuotesContainer>
        <PageTitle title={`${t('results_for')} '${search}'`} icon="magnifying-glass" isVisual />
        {quotes && quotes.map((quote, index) => (
          <Quote
            {...quote}
            isLast={quotes.length !== 1 && quotes.length == (index + 1)}
            key={quote.quoteId}
          />
        ))}
      </QuotesContainer>
      <Switcher breakpoint={theme.breakpoints.lg} desktop={<Feeds />} />
    </SearchQuotesContainer>
  );
};

export default SearchQuotes;