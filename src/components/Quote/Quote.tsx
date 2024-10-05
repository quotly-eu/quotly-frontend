import React, { ReactElement } from 'react';
import styled, { useTheme } from 'styled-components';

import Button from 'components/Button/Button';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
import Markdown from 'react-markdown';
import { Icon } from '@iconify/react';

import { ButtonStyles } from 'components/Button/Button.type';
import { DropDownItem } from 'components/FloatDropDown/FloatDropDown.type';
import ButtonPalette from 'components/ButtonPalette/ButtonPalette';
import { PlaceOrientation } from 'types/placeOrientation.type';
import Switcher from 'components/Switcher/Switcher';


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

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xs};
      padding: ${theme.spacing.s.rem};
    }
  `}

  text-align: center;
`;

const Style_Markdown = styled(Markdown)`
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

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xxxs};
    }
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
  gap: ${({ theme }) => theme.spacing.xxs.rem};
`;

const Style_Icon = styled(Icon)`
  width: 80%;
  height: 80%;
`;

/* CONSTANTS */
const quoteOptions: DropDownItem[] = [
  {
    label: (<><i className='far fa-bookmark'></i> Save</>),
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

const buttonOptions: ReactElement<typeof Button>[] = [
  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Style_Icon icon="fluent-emoji:red-heart" />} />,
  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Style_Icon icon="fluent-emoji:thumbs-up" />} />,
  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Style_Icon icon="fluent-emoji:face-with-tears-of-joy" />} />,
  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Style_Icon icon="fluent-emoji:melting-face" />} />,
  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Style_Icon icon="fluent-emoji:skull" />} />,
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

  const renderText = () => {
    return (
      <Style_Markdown children={text} />
    );
  };

  const renderAuthor = () => {
    return (
      <Author href={authorUrl}>
        <Avatar src={authorAvatarUrl} />
        {authorName} • {dated}
      </Author>
    );
  };

  const renderActions = () => {
    return (
      <Actions>
        <FloatDropDown
          triggerElement={
            <Button isIconButton={true} style={ButtonStyles.transparent}>
              <i className="fas fa-ellipsis"></i>
            </Button>
          }
          dropDownItems={quoteOptions}
          place={PlaceOrientation.InsetTopRight}
          margin={"-"+theme.spacing.xxxs.rem}
        />
        <Switcher 
          breakpoint={theme.breakpoints.md}
          desktop={
            <ButtonPalette 
              triggerElement={
                <Button isIconButton={true} style={ButtonStyles.default}>
                  <Style_Icon icon="fluent-emoji:thumbs-up" />
                </Button>
              } 
              buttons={buttonOptions}
              place={PlaceOrientation.InsetRight}
              startMargin={theme.spacing.xs.rem}
            />
          }
          mobile={
            <ButtonPalette 
              triggerElement={
                <Button isIconButton={true} style={ButtonStyles.default}>
                  <Icon icon="fluent-emoji:thumbs-up" />
                </Button>
              } 
              buttons={buttonOptions}
              place={PlaceOrientation.InsetTopRight}
            />
          }
        />
      </Actions>
    );
  };
  
  return (
    <QuoteContainer>
      {renderText()}
      {renderAuthor()}
      {renderActions()}
    </QuoteContainer>
  );
};

export default Quote;