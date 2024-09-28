import React from 'react';
import Quote from '../../components/Quote/Quote';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.s.rem};
`;

/**
 * Main Page for Quotly
 */
const Main = () => {
  return (
    <MainContainer>
      <Quote 
        text={`**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`}
        authorName="Daniel"
        authorUrl="/"
        authorAvatarUrl='https://xsgames.co/randomusers/avatar.php?g=male'
        dated="vor 2 Tagen"
      />
      <Quote 
        text={`**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`}
        authorName="Daniel"
        authorUrl="/"
        authorAvatarUrl='https://xsgames.co/randomusers/avatar.php?g=male'
        dated="vor 2 Wochen"
      />
      <Quote 
        text={`**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`}
        authorName="Daniel"
        authorUrl="/"
        authorAvatarUrl='https://xsgames.co/randomusers/avatar.php?g=male'
        dated="vor 2 Wochen"
      />
      <Quote 
        text={`**Daniel zu domi:** "ich kann gerade nicht, meine Hände liegen da drüben"`}
        authorName="Daniel"
        authorUrl="/"
        authorAvatarUrl='https://xsgames.co/randomusers/avatar.php?g=male'
        dated="vor 2 Wochen"
      />
    </MainContainer>
  );
};

export default Main;