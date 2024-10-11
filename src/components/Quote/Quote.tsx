import React from 'react';
import styled, { useTheme } from 'styled-components';

import Markdown from 'react-markdown';
import { Icon } from '@iconify/react';

import Button from 'components/Button/Button';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
import ButtonPalette from 'components/ButtonPalette/ButtonPalette';
import Badge from 'components/Badge/Badge';

import { PlaceOrientation } from 'types/placeOrientation.type';
import { ButtonStyles } from 'components/Button/Button.type';
import { DropDownItem } from 'components/FloatDropDown/FloatDropDown.type';
import { BadgeStyles } from 'components/Badge/Badge.type';
import { QuoteType } from './Quote.type';
import { Link } from 'react-router-dom';


// Styles
const Style_Badge = styled(Badge)`
  font-size: ${({theme}) => theme.font.sizes.xxs.rem};
  @media (max-width: ${({theme}) => theme.breakpoints.md}) {
    font-size: ${({theme}) => theme.font.sizes.xxxs.rem};
  }
`;

const QuoteContainer = styled.div`
  display:grid;
  grid-template-areas:
    "text actions"
    "author actions";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;

  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_0};
    color: ${theme.colors.text.dark};

    padding: ${theme.spacing.m.rem};
    gap: ${theme.spacing.s.rem};
    
    font-size: ${theme.font.sizes.s.rem};
    border-radius: ${theme.spacing.s.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xs.rem};
      padding: ${theme.spacing.xs.rem};
    }
  `}

  text-decoration: none;
  text-align: center;
`;

const Style_Markdown = styled(Link)`
  display: flex;
  grid-area: text;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => `
    color: ${theme.colors.text.dark};

    padding: ${theme.spacing.s.rem};
    border-radius: ${theme.spacing.xxs.rem};

    &:hover {backdrop-filter: brightness(1.05);}
    transition: backdrop-filter ${theme.transition.times.s} ease-in-out;
  `}

  text-wrap: balance;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

const Author = styled(Link)`
  display: flex;
  grid-area: author;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => `
    color: ${theme.colors.text.gray};

    padding: ${theme.spacing.xxs.rem} ${theme.spacing.xs.rem};
    gap: ${theme.spacing.xxxs.rem};
    border-radius: ${theme.spacing.xxs.rem};
    font-size: ${theme.font.sizes.xxs.rem};

    &:hover {backdrop-filter: brightness(1.05);}
    transition: backdrop-filter ${theme.transition.times.s} ease-in-out;

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xxxs.rem};
    }
  `}

  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  height: 2em;

  border-radius: 100vmax;
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: flex-end;
  align-items: flex-start;

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: column;
      gap: ${theme.spacing.xxs.rem};
      justify-content: flex-start;
    }
  `}
`;
const Style_Icon = styled(Icon)`
  width: 80%;
  height: 80%;
`;

const Style_Button = styled(Button)<{$hasReacted?:boolean, $style?: ButtonStyles}>`
  position:relative;
  
  ${({$hasReacted, $style, theme}) => $style == ButtonStyles.default && ($hasReacted !== undefined && !$hasReacted && `
    backdrop-filter: brightness(0.925) blur(5px);

    box-shadow: inset ${theme.shadows.default};
  `)}

  ${({ theme }) => `
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.xxxs.rem};
      width: ${theme.spacing.xl.rem};
      height: ${theme.spacing.xl.rem};
    }
  `}
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
    label: (<><i className="fas fa-share"></i> Share</>),
    onClick: () => {
      console.log('Share');
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
const Quote = ({quote, author, reactions, isLast=false}:QuoteType) => {
  const theme = useTheme();
  const greatestReactedIcon = reactions?.icons.concat().sort((a, b) => (b.count ?? 0) - (a.count ?? 0))[0].icon;
  const sumOfReactions = reactions?.icons.reduce((acc, reaction) => acc + (reaction.count || 0), 0);
  
  const abbreviateNumber = (value: number) => {
    let newValue = value;
    let suffix = "";
    if (value >= 1000) {
      suffix = "K";
      newValue = value / 1000;
    } 
    if (value >= 1000000) {
      suffix = "M";
      newValue = value / 1000000;
    } 
    if (value >= 1000000000) {
      suffix = "B";
      newValue = value / 1000000000;
    } 
    if (value >= 1000000000000) {
      suffix = "T";
      newValue = value / 1000000000000;
    }
    return newValue.toFixed(0) + suffix;
  };

  const renderText = () => {
    return (
      <Style_Markdown to={quote.url} children={<Markdown children={quote.text} />} />
    );
  };

  const renderAuthor = () => {
    return (
      <Author to={author.url}>
        <Avatar src={author.avatarUrl} />
        {author.name} • {quote.dated.toLocaleDateString(undefined, {dateStyle: 'long'})}
      </Author>
    );
  };

  const renderReaction = (reaction:{icon?:string, counter?:number}) => {
    return (
      <>
        <Style_Icon icon={"fluent-emoji:" + reaction.icon} />
        {reaction.counter && 
          <Style_Badge 
            children={abbreviateNumber(reaction.counter)} 
            place={{
              place: PlaceOrientation.Bottom,
              margin: "-100%"
            }} 
            style={BadgeStyles.transparent}
          />
        }
      </>
    );
  };

  const renderButtonPalette = (place?:PlaceOrientation, startMargin?:string) => {
    return (<ButtonPalette 
      triggerElement={
        <Style_Button 
          isIconButton={true} 
          $hasReacted={reactions?.reactedIcon ? true : false}
          children={renderReaction({
            icon: reactions?.reactedIcon || greatestReactedIcon,
            counter: sumOfReactions
          })}
          $style={ButtonStyles.default}
        />
      } 
      buttons={
        reactions?.icons.map((reaction, index) => (
          <Style_Button 
            key={index} 
            isIconButton={true} 
            style={ButtonStyles.transparent}
            children={renderReaction({
              icon: reaction.icon,
              counter: reaction.count
            })}
          />
        )) || []
      }
      place={place}
      startMargin={startMargin}
    />);
  };


  const renderActions = () => {
    return (
      <Actions>
        <FloatDropDown
          triggerElement={
            <Style_Button isIconButton={true} style={ButtonStyles.transparent}>
              <i className="fas fa-ellipsis"></i>
            </Style_Button>
          }
          dropDownItems={quoteOptions}
          place={isLast ? PlaceOrientation.InsetBottomRight : PlaceOrientation.InsetTopRight}
          margin={"0px"}
        />
        {renderButtonPalette(PlaceOrientation.InsetRight, theme.spacing.xs.rem)}
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