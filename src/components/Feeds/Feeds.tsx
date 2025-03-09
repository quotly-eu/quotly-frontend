import React, { useEffect } from 'react';

import styled, { css, useTheme } from 'styled-components';
import Markdown from 'react-markdown';

import useFetch from 'hooks/useFetch';
import { useApiContext } from 'contexts/ApiContext/ApiContext';
import Badge from 'components/Badge/Badge';

import { QuoteType } from 'types/Quote.type';
import { BadgeStyles } from 'components/Badge/Badge.type';
import Feed from 'components/Feed/Feed';
import GuideLinks from 'components/GuideLinks/GuideLinks';
import { useTranslation } from 'react-i18next';

const Container = css`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

const FeedsContainer = styled.div`
  position: sticky;
  max-width: 400px;
  ${Container};
  grid-area: feeds;
  top: 0;
  place-self: start;
`;


/**
 * Fetched Feeds
 */
const Feeds = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { routes } = useApiContext();
  const {
    runFetch: fetchTopQuotes,
    response: topQuotes
  } = useFetch<QuoteType[]>(`${routes.quotes.sub?.top()}?limit=3`);

  useEffect(() => {
    fetchTopQuotes();
  }, []);

  const formattedTopQuotes = topQuotes?.data.map((quote, index) => {
    const colors = [ theme.colors.gold, theme.colors.silver, theme.colors.bronze ];

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
    <FeedsContainer>
      {formattedTopQuotes && <Feed
        title={t('trends')}
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

export default Feeds;