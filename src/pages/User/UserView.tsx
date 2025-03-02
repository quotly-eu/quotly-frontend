import React, { useContext, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import useFetch from 'hooks/useFetch';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import Quote from 'components/Quote/Quote';
import { ApiResponse } from 'types/ApiResponse.type';
import { QuoteType } from 'types/Quote.type';
import { Role } from 'types/Role.type';
import { User } from 'types/User.type';
import { useCookies } from 'react-cookie';
import PageTitle from '../../components/PageTitle/PageTitle';

type UserViewProps = {
  userRoles?: ApiResponse<Role[]>;
  userResponse?: ApiResponse<User>;
};

const UserViewContainer = styled.div`
  display: grid;
  grid-template-areas: 
    // 'users users'
      'quotes feeds';
  grid-template-columns: 3fr 1fr;

  ${({ theme }) => css`
    gap: ${theme.spacing.s.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-areas: 
        'feeds'
        'quotes';
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

const FeedsContainer = styled.div`
  ${Container};
  grid-area: feeds;
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.md}) {
      position: sticky;
      top: 0;
      align-self: start;
    }
  `}
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    padding: ${theme.spacing.m.rem};
    border-radius: ${theme.spacing.s.rem};
    background-color: ${theme.colors.accent_white_0};
    box-shadow: ${theme.shadows.default};
    margin-bottom: ${theme.spacing.s.rem};
  `}
`;

const FeedRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.xs.rem};
    font-size: ${theme.font.sizes.xs.rem};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.1)};

    &:first-of-type {
      margin-top: ${theme.spacing.s.rem};
    }

    &:last-child {
      border-bottom: 0;
    }
  `}
`;
const FeedItem = styled.div`
  text-align: center;
`;

/**
 * User Page
 */
const UserView = ({ userRoles, userResponse }: UserViewProps) => {
  const { t, i18n: { language } } = useTranslation();
  const { id } = useParams();
  const { routes } = useContext(ApiContext);
  const [ cookies ] = useCookies([ 'token' ]);
  const { runFetch: fetchUser, response: user } = useFetch<User>(routes.users.construct(Number(id)));
  const {
    runFetch: fetchQuotes,
    response: quotes
  } = useFetch<QuoteType[]>(`${routes.users.sub?.quotes(Number(id))}?token=${cookies.token}`);

  const userAvatarUrl = useMemo(() => `https://cdn.discordapp.com/avatars/${user?.data.discordId}/${user?.data.avatarUrl}`, [ user ]);

  useEffect(() => {
    if (!id) return;
    fetchUser();
    fetchQuotes();
  }, [ id ]);

  return (
    <UserViewContainer>
      <PageTitle title={user?.data.displayName} />
      <QuotesContainer>
        {quotes?.data && quotes.data.map(quote => (
          <Quote
            {...quote}
            userRoles={userRoles}
            userResponse={userResponse}
          />
        ))}
      </QuotesContainer>
      <FeedsContainer>
        <FeedContainer>
          <ProfileButton src={userAvatarUrl} size="10rem" />
          <FeedRow>
            <FeedItem><strong>{user?.data.displayName}</strong></FeedItem>
          </FeedRow>
          <FeedRow>
            <FeedItem>{t('user.joined')} {user && new Date(user.data.createdAt).toLocaleDateString(language, { dateStyle: 'long' })}</FeedItem>
          </FeedRow>
        </FeedContainer>
      </FeedsContainer>
    </UserViewContainer>
  );
};

export default UserView;