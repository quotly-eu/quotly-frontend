import React, { useContext, useEffect } from 'react';
import styled, { css, useTheme } from 'styled-components';

import Switcher from 'components/Switcher/Switcher';
// import ProfileButton from 'components/ProfileButton/ProfileButton';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import { QuoteType } from 'types/Quote.type';

import useFetch from 'hooks/useFetch';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import { Role } from 'types/Role.type';
import { ApiResponse } from 'types/ApiResponse.type';
import { User } from 'types/User.type';
import Feeds from 'components/Feeds/Feeds';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

type SavedQuotesProps = {
  userRoles?: ApiResponse<Role[]>;
  userResponse?: ApiResponse<User>;
};

// Styles
const SavedQuotesContainer = styled.div`
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
const SavedQuotes = ({ userRoles, userResponse }: SavedQuotesProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { routes } = useContext(ApiContext);
  const [ cookies ] = useCookies(['token']);
  const { runFetch: fetchQuotes, response: quotes } = useFetch<QuoteType[]>(`${routes.users.sub?.savedQuotes(userResponse?.data.userId || 0)}?token=${cookies.token}`);

  useEffect(() => {
    if(!userResponse) return;
    fetchQuotes();
  }, [userResponse]);

  return (
    <SavedQuotesContainer>
      <PageTitle title={t('saved_quotes')} />
      <QuotesContainer>
        {quotes && quotes.data.map((quote, index) => (
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
    </SavedQuotesContainer>
  );
};

export default SavedQuotes;