import React from 'react';
import styled, { useTheme } from 'styled-components';

import Button from 'components/Button/Button';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
import Markdown from 'react-markdown';

import { ButtonStyles } from 'types/Button.type';
import { DropDownItem, PlaceOrientation } from 'types/FloatDropDown.type';


// Styles
const QuoteContainer = styled.div`
  display:grid;
  grid-template-areas:
    "text actions"
    "author actions";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;

  gap: ${({ theme }) => theme.spacing.s.rem};
  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_0};
    color: ${theme.colors.text.dark};
    font-size: ${theme.font.sizes.m};
    padding: ${theme.spacing.m.rem};

    border-radius: ${theme.spacing.s.rem};
  `}

  text-align: center;
`;

const Text = styled(Markdown)`
  grid-area: text;
  text-wrap: balance;
  place-self: center;
`;

const Author = styled.a`
  display: flex;
  grid-area: author;

  ${({ theme }) => `
    color: ${theme.colors.text.gray};
    gap: ${theme.spacing.xxxs.rem};
    font-size: ${theme.font.sizes.xxs};
  `}

  text-decoration: none;
  place-self: center;
  align-items: center;
`;

const Avatar = styled.img`
  height: 2em;

  border-radius: 100vmax;
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: column;
`;

const quoteOptions: DropDownItem[] = [
  {
    label: (<><i className='fas fa-bookmark'></i> Save</>),
    onClick: () => {
      console.log('Save');
    }
  },
  {
    label: (<><i className="fas fa-pencil"></i> Edit</>),
    onClick: () => {
      console.log('Edit');
    }
  },
  {
    label: (<><i className="fas fa-trash"></i> Delete</>),
    onClick: () => {
      console.log('Delete');
    }
  }
];

/**
 * Quote Component, the main component for the Quotly page
 * 
 */
const Quote = ({text, authorAvatarUrl, authorName, authorUrl, dated}:{
  text: string;
  authorAvatarUrl: string;
  authorName: string;
  authorUrl: string;
  dated: string;
}) => {
  const theme = useTheme();
  
  return (
    <QuoteContainer>
      <Text children={text} />
      <Author href={authorUrl}>
        <Avatar src={authorAvatarUrl} />
        {authorName} • {dated}
      </Author>
      <Actions>
        <Button isIconButton={true} style={ButtonStyles.transparent}>
          <i className="far fa-heart"></i>
        </Button>
        <FloatDropDown
          triggerElement={<Button isIconButton={true} style={ButtonStyles.transparent}><i className="fas fa-ellipsis-vertical"></i></Button>}
          dropDownItems={quoteOptions}
          place={PlaceOrientation.Bottom}
          margin={theme.spacing.xxxs.rem}
        />
      </Actions>
    </QuoteContainer>
  );
};

export default Quote;