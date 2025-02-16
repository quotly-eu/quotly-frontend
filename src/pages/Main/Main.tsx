import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, useTheme } from 'styled-components';

import Markdown from 'react-markdown';

import Feed from 'components/Feed/Feed';
import Switcher from 'components/Switcher/Switcher';
import GuideLinks from 'components/GuideLinks/GuideLinks';
import Badge from 'components/Badge/Badge';
// import ProfileButton from 'components/ProfileButton/ProfileButton';
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import { QuoteType } from 'types/Quote.type';
import { BadgeStyles } from 'components/Badge/Badge.type';

import useFetch from 'hooks/useFetch';
import { ApiContext } from 'contexts/ApiContext/ApiContext';

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

const FeedsContainer = styled.div`
  position: sticky;
  max-width: 400px;
  ${Container}
  grid-area: feeds;
  top: 0;
  place-self: start;
`;

/**
 * Main Page for Quotly
 */
const Main = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { routes } = useContext(ApiContext);
  const { runFetch: fetchQuotes, response: quotes } = useFetch<QuoteType[]>(routes.quotes.construct());
  const { runFetch: fetchTopQuotes, response: topQuotes } = useFetch<QuoteType[]>(`${routes.quotes.sub?.top()}?limit=3`);

  useEffect(() => {
    fetchQuotes();
    fetchTopQuotes();
  }, []);

  const formattedTopQuotes = topQuotes?.data.map((quote, index) => {
    const colors = [theme.colors.gold, theme.colors.silver, theme.colors.bronze];

    return {
      item: (
        <React.Fragment>
          <Badge 
            badgeStyle={BadgeStyles.custom}
            color={colors[index]}
            fontSize={theme.font.sizes.xs.rem}
            children={(index + 1).toString() as '1' | '2' | '3'} 
          /> 
          <Markdown children={quote.quote} />
        </React.Fragment>
      ),
      url: `/quote/${quote.quoteId}`
    };
  });

  return (
    <MainContainer>
      <PageTitle />
      <QuotesContainer>
        {quotes?.data && quotes.data.map((quote, index) => (
          <Quote {...quote} key={quote.quoteId} isLast={quotes.data.length == (index+1)} />
        ))}
      </QuotesContainer>
      <Switcher
        breakpoint={theme.breakpoints.lg}
        mobile={<></>}
        desktop={
          <FeedsContainer>
            {formattedTopQuotes && <Feed 
              title={t('feeds.top_quotes')} 
              items={formattedTopQuotes}
            />}
            <GuideLinks
              links={[
                { label: t('guides.privacy_policy'), url: '/privacy' },
                { label: t('guides.terms_of_service'), url: '/tos' },
                { label: t('guides.cookies'), url: '/cookies' }
              ]}
            />
          </FeedsContainer>
        }
      />
    </MainContainer>
  );

  /*
    <Feed title={t('feeds.suggested_profiles')} items={
      [
        {
          item: (<><ProfileButton src={quotes[0].author.avatarUrl} /> Daniel</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[2].author.avatarUrl} /> Domi</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[2].author.avatarUrl} /> Rubinschwein47</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[1].author.avatarUrl} /> Jordan</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[0].author.avatarUrl} /> Daniel</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[2].author.avatarUrl} /> Domi</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[2].author.avatarUrl} /> Rubinschwein47</>),
          url: '/'
        },
        {
          item: (<><ProfileButton src={quotes[1].author.avatarUrl} /> Jordan</>),
          url: '/'
        },
      ].slice(0, 5)
    } />
  */
};

export default Main;