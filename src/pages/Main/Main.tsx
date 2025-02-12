import React, { useContext, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
/*
import Markdown from 'react-markdown';

import Feed from 'components/Feed/Feed';
import Switcher from 'components/Switcher/Switcher';
import GuideLinks from 'components/GuideLinks/GuideLinks';
import Badge from 'components/Badge/Badge';
import ProfileButton from 'components/ProfileButton/ProfileButton'; */
import PageTitle from 'components/PageTitle/PageTitle';
import Quote from 'components/Quote/Quote';

import { QuoteType } from 'types/Quote.type';
// import { BadgeStyles } from 'components/Badge/Badge.type';

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

/* const FeedsContainer = styled.div`
  position: sticky;
  max-width: 400px;
  ${Container}
  grid-area: feeds;
  top: 0;
  place-self: start;
`; */

/**
 * Main Page for Quotly
 */
const Main = () => {
  // const theme = useTheme();
  // const { t } = useTranslation();
  const { routes } = useContext(ApiContext);
  const { runFetch, response } = useFetch<QuoteType[]>(routes.quotes.construct());

  useEffect(() => runFetch(), []);

  return (
    <MainContainer>
      <PageTitle />
      <QuotesContainer>
        {response?.data && response.data.map((quote, index) => (
          <Quote {...quote} key={quote.quoteId} isLast={response.data.length == (index+1)} />
        ))}
      </QuotesContainer>
      
    </MainContainer>
  );

  /*
  <Switcher
        breakpoint={theme.breakpoints.lg}
        desktop={
          <FeedsContainer>
            <Feed title={t('feeds.top_quotes')} items={
              quotes.slice(0, 3).map((quote, index) => {
                const colors = [theme.colors.gold, theme.colors.silver, theme.colors.bronze];

                return {
                  item: (
                    <React.Fragment>
                      <Badge 
                        style={BadgeStyles.custom}
                        color={colors[index]}
                        fontSize={theme.font.sizes.xs.rem}
                        children={(index + 1).toString() as '1' | '2' | '3'} 
                      /> 
                      <Markdown children={quote.quote.text} />
                    </React.Fragment>
                  ),
                  url: quote.quote.url
                };
              })
            }/>
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
            <GuideLinks
              links={[
                { label: t('guides.privacy_policy'), url: '/privacy' },
                { label: t('guides.terms_of_service'), url: '/tos' },
                { label: t('guides.cookies'), url: '/cookies' }
              ]}
            />
          </FeedsContainer>
        }
        mobile={<></>}
      />
      */
};

export default Main;