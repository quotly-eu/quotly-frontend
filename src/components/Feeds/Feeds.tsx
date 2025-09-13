import React from 'react';

import styled, { css, useTheme } from 'styled-components';
import Markdown from 'react-markdown';
import Badge from 'components/Badge/Badge';
import { BadgeStyles } from 'components/Badge/Badge.type';
import Feed from 'components/Feed/Feed';
import GuideLinks from 'components/GuideLinks/GuideLinks';
import { useTranslation } from 'react-i18next';
import { $api } from 'utils/api';

const Style_Container = css`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

const Style_FeedsContainer = styled.div`
  position: sticky;
  max-width: 400px;
  ${Style_Container};
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
  const {
    data: topQuotes
  } = $api.useQuery('get', '/v1/quotes/top', {params: {query: {limit: 3}}});

  const formattedTopQuotes = topQuotes?.map((quote, index) => {
    const colors = [theme.colors.gold, theme.colors.silver, theme.colors.bronze];

    return {
      item: (
        <React.Fragment>
          <Badge
            badgeStyle={BadgeStyles.custom}
            color={colors[index]}
            fontSize={theme.font.sizes.xs.rem}
          >{(index + 1).toString()}</Badge>
          <div><Markdown>{quote.quote}</Markdown></div>
        </React.Fragment>
      ),
      url: `/quote/${quote.quoteId}`
    };
  });

  return (
    <Style_FeedsContainer>
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
    </Style_FeedsContainer>
  );
};

export default Feeds;