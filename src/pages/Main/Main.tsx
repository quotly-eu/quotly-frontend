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
    count: 5
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
    count: 1
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
          url: '/',
          dated: 'vor 2 Tagen'
        }}
        author={{
          name: 'Daniel',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
          url: '/'
        }}
        reactions={{
          current: {
            activeIcon: 'red-heart',
            totalCount: 5
          },
          icons: defaultIcons
        }}
      />
      <Quote 
        quote={{
          id: '1',
          text: `**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`,
          url: '/',
          dated: 'vor 2 Tagen'
        }}
        author={{
          name: 'Daniel',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
          url: '/'
        }}
        reactions={{
          current: {
            totalCount: 5
          },
          icons: defaultIcons
        }}
      />
      <Quote 
        quote={{
          id: '1',
          text: `**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`,
          url: '/',
          dated: 'vor 2 Tagen'
        }}
        author={{
          name: 'Daniel',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
          url: '/'
        }}
        reactions={{
          current: {
            activeIcon: 'thumbs-up',
            totalCount: 5
          },
          icons: defaultIcons
        }}
      />
      <Quote 
        quote={{
          id: '1',
          text: `**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`,
          url: '/',
          dated: 'vor 2 Tagen'
        }}
        author={{
          name: 'Daniel',
          avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male',
          url: '/'
        }}
        reactions={{
          current: {
            activeIcon: 'skull',
            totalCount: 5
          },
          icons: defaultIcons
        }}
      />
    </MainContainer>
  );
};

export default Main;