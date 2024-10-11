import React from 'react';
import Quote from '../../components/Quote/Quote';
import styled from 'styled-components';
import { QuoteType } from 'components/Quote/Quote.type';

const MainContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.s.rem};
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
  return (
    <MainContainer>
      {quotes.map((quote, index) => (
        <Quote {...quote} key={index} isLast={quotes.length == (index+1)} />
      ))}
    </MainContainer>
  );
};

export default Main;