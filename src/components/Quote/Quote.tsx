import React from 'react';
import Button, { ButtonStyles } from 'components/Button/Button';
import styled from 'styled-components';
import AvatarImage from 'assets/img/a.jpg';

// Styles
const QuoteContainer = styled.div`
  display:grid;
  grid-template-areas:
    "text actions"
    "author actions";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_0};
    color: ${theme.colors.text.dark};
    font-size: ${theme.font.sizes.m};
    padding: ${theme.spacing.m.rem};

    border-radius: ${theme.spacing.s.rem};
  `}
  text-align: center;
`;

const Text = styled.p`
  grid-area: text;
  font-weight: lighter;
  text-wrap: balance;
  place-self: center;
`;

const Author = styled.span`
  display: flex;
  grid-area: author;

  ${({ theme }) => `
    color: ${theme.colors.text.gray};
    gap: ${theme.spacing.xxxs.rem};
    font-size: ${theme.font.sizes.xs};
  `}

  align-items: center;
  justify-content: center;
`;

const AuthorName = styled.span`

`;

const Avatar = styled.img`
  height: 1.75em;

  border-radius: 100vmax;
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: column;
`;

/**
 * Quote Component, the main component for the Quotly page
 * 
 */
const Quote = () => {
  return (
    <QuoteContainer>
      <Text>
        Daniel: "ich kann gerade nicht, meine Hände liegen da drüben"
      </Text>
      <Author>
        <Avatar src={AvatarImage} />
        <AuthorName>Jordan</AuthorName> 
        •
        vor 2 Wochen
      </Author>
      <Actions>
        <Button isIconButton={true} style={ButtonStyles.transparent}>
          <i className="far fa-heart"></i>
        </Button>
        <Button isIconButton={true} style={ButtonStyles.transparent}>
          <i className="fas fa-ellipsis-vertical"></i>
        </Button>
      </Actions>
    </QuoteContainer>
  );
};

export default Quote;