import React from 'react';
import styled, { useTheme } from 'styled-components';

import Markdown from 'react-markdown';
import { Icon } from '@iconify/react';

import Button from 'components/Button/Button';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
import ButtonPalette from 'components/ButtonPalette/ButtonPalette';
import Switcher from 'components/Switcher/Switcher';
import Badge from 'components/Badge/Badge';

import { PlaceOrientation } from 'types/placeOrientation.type';
import { ButtonStyles } from 'components/Button/Button.type';
import { DropDownItem } from 'components/FloatDropDown/FloatDropDown.type';
import { BadgeStyles } from 'components/Badge/Badge.type';


// Styles
const Style_Badge = styled(Badge)`
  transition: opacity 0.3s;
`;

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

  text-decoration: none;
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

const Style_Button = styled(Button)`
  position:relative;
  
  &:hover {
    ${Style_Badge} {
      opacity: 1;
    }
  }
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

/**
 * Quote Component, the main component for the Quotly page
 * 
 */
const Quote = ({quote, author, reactions}:{
  quote: {
    id: string;
    text: string;
    url: string;
    dated: string;
  }
  author: {
    name: string;
    avatarUrl: string;
    url: string;
  },
  reactions?: {
    current?: {
      activeIcon?: string;
      totalCount?: number;
    },
    icons: {
      icon: string;
      count?: number;
    }[]
  }
}) => {
  const theme = useTheme();

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
      <Style_Markdown children={quote.text} />
    );
  };

  const renderAuthor = () => {
    return (
      <Author href={author.url}>
        <Avatar src={author.avatarUrl} />
        {author.name} • {quote.dated}
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
            fontSize={theme.font.sizes.xxs}
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
          style={ButtonStyles.default}
          children={renderReaction({
            icon: reactions?.current?.activeIcon,
            counter: reactions?.current?.totalCount
          })}
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
          desktop={renderButtonPalette(PlaceOrientation.InsetRight, theme.spacing.xs.rem)}
          mobile={renderButtonPalette(PlaceOrientation.InsetTopRight)}
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