import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, useTheme } from 'styled-components';

import Markdown from 'react-markdown';

import Quote from 'components/Quote/Quote';
import Feed from 'components/Feed/Feed';
import Switcher from 'components/Switcher/Switcher';
import GuideLinks from 'components/GuideLinks/GuideLinks';
import Badge from 'components/Badge/Badge';
import ProfileButton from 'components/ProfileButton/ProfileButton';

import { QuoteType } from 'components/Quote/Quote.type';
import { BadgeStyles } from 'components/Badge/Badge.type';

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

// TODO: Default Icons for the Quotes, replace it in the future
const defaultIcons = [
  {
    icon: 'red-heart',
    count: 259000
  },
  {
    icon: 'thumbs-up',
    count: 3
  },
  {
    icon: 'face-with-tears-of-joy',
    count: 2
  },
  {
    icon: 'melting-face',
    count: 1
  },
  {
    icon: 'skull',
    count: 259001
  }
];

const quotes: QuoteType[] = [
  {
    quote: {
      id: '1',
      text: `**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`,
      url: '/test',
      dated: new Date(2024,4,7)
    },
    author: {
      name: 'Daniel',
      avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
      url: '/'
    },
    reactions: {
      icons: defaultIcons
    }
  },
  {
    quote: {
      id: '1',
      text: `**Domi:** "Das ist der einzige Weg, Geld zu verkaufen!"`,
      url: '/test',
      dated: new Date(2024,5,24)
    },
    author: {
      name: 'Jordan',
      avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
      url: '/'
    },
    reactions: {
      reactedIcon: 'face-with-tears-of-joy',
      icons: defaultIcons
    }
  },
  {
    quote: {
      id: '1',
      text: `**Dominic:** "Wie viel hat deine Grafikkarte geteuert?"`,
      url: '/test',
      dated: new Date(2024,1,26)
    },
    author: {
      name: 'Rubinschwein47',
      avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=2',
      url: '/'
    },
    reactions: {
      icons: defaultIcons
    }
  },
  {
    quote:{
      id: '1',
      text: `**Daniel:** "Du könntest das Kabel vom Geld reinstecken"`,
      url: '/test',
      dated: new Date(2024,1,15)
    },
    author: {
      name: 'Daniel',
      avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
      url: '/'
    },
    reactions: {
      icons: defaultIcons
    }
  }
];

/**
 * Main Page for Quotly
 */
const Main = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MainContainer>
      <QuotesContainer>
        {quotes.map((quote, index) => (
          <Quote {...quote} key={index} isLast={quotes.length == (index+1)} />
        ))}
      </QuotesContainer>
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
    </MainContainer>
  );
};

export default Main;