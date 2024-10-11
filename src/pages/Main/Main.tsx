import React from 'react';
import Quote from '../../components/Quote/Quote';
import styled from 'styled-components';

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

/**
 * Main Page for Quotly
 */
const Main = () => {
  return (
    <MainContainer>
      <Quote 
        quote={{
          id: '1',
          text: `**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`,
          url: '/test',
          dated: '07/04/2024'
        }}
        author={{
          name: 'Daniel',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
          url: '/'
        }}
        reactions={{
          icons: defaultIcons
        }}
      />
      <Quote 
        quote={{
          id: '1',
          text: `**Domi:** "Das ist der einzige Weg, Geld zu verkaufen!"`,
          url: '/test',
          dated: '05/24/2024'
        }}
        author={{
          name: 'Jordan',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
          url: '/'
        }}
        reactions={{
          reactedIcon: 'face-with-tears-of-joy',
          icons: defaultIcons
        }}
      />
      <Quote 
        quote={{
          id: '1',
          text: `**Dominic:** "Wie viel hat deine Grafikkarte geteuert?"`,
          url: '/test',
          dated: '01/26/2024'
        }}
        author={{
          name: 'Rubinschwein47',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=2',
          url: '/'
        }}
        reactions={{
          icons: defaultIcons
        }}
      />
      <Quote 
        quote={{
          id: '1',
          text: `**Daniel:** "Du könntest das Kabel vom Geld reinstecken"`,
          url: '/test',
          dated: '01/15/2024'
        }}
        author={{
          name: 'Daniel',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
          url: '/'
        }}
        reactions={{
          icons: defaultIcons
        }}
      />
    </MainContainer>
  );
};

export default Main;