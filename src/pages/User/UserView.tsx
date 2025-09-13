import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import Quote from 'components/Quote/Quote';
import PageTitle from '../../components/PageTitle/PageTitle';
import Switcher from '../../components/Switcher/Switcher';
import useGetToken from 'hooks/useGetToken';
import { $api } from 'utils/api';

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
const UserView = () => {
  const { t, i18n: { language } } = useTranslation();
  const { id } = useParams();
  const token = useGetToken()!;
  const { data: user } = $api.useQuery('get', '/v1/users/{id}', {
    params: {
      path: {
        id: Number(id)
      }
    }
  }, { enabled: !!id });
  const {
    data: quotes
  } = $api.useQuery('get', '/v1/users/{id}/quotes', {
    params: {
      path: {
        id: Number(id)
      },
      query: {
        token
      }
    }
  }, { enabled: !!id });

  const userAvatarUrl = useMemo(() => `https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatarUrl}`, [user]);

  return (
    <UserViewContainer>
      <QuotesContainer>
        <Switcher
          desktop={<PageTitle title={user?.displayName} icon="user" isVisual />}
          mobile={<PageTitle title={user?.displayName} />}
        />
        {quotes && quotes.map((quote, index) => (
          <Quote
            {...quote}
            key={quote.quoteId}
            isLast={quotes.length !== 1 && quotes.length == (index + 1)}
          />
        ))}
      </QuotesContainer>
      <FeedsContainer>
        <FeedContainer>
          <ProfileButton src={userAvatarUrl} size="10rem" />
          <FeedRow>
            <FeedItem><strong>{user?.displayName}</strong></FeedItem>
          </FeedRow>
          <FeedRow>
            <FeedItem>{t('user.joined')} {user && new Date(user.createdAt).toLocaleDateString(language, { dateStyle: 'long' })}</FeedItem>
          </FeedRow>
        </FeedContainer>
      </FeedsContainer>
    </UserViewContainer>
  );
};

export default UserView;