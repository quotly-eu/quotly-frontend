import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

import { PlaceOrientation, DropDownItem } from './FloatDropDown.type';

interface FloatDropDownProps {
  $placeOrientation?: PlaceOrientation,
  $margin?: string,
  $active?: boolean
}

const FloatDropDownContainer = styled.div`
  position:relative;
`;

const FloatDropDownMenu = styled.div<FloatDropDownProps>`
  position:absolute;

  width: max-content;

  ${({ theme }) => `
    // background-color: ${theme.colors.accent_white_0};

    border-radius: ${theme.spacing.xs.rem};
    box-shadow: ${theme.shadows.default};

    transition: all ${theme.transition.times.m} ease-in-out;
  `}

  ${({$placeOrientation, $margin}:FloatDropDownProps) => {
    switch($placeOrientation) {
      case PlaceOrientation.TopLeft: 
        return `
          bottom: calc(100% + ${$margin});
          left: 0;
        `;
      case PlaceOrientation.Top: 
        return `
          bottom: calc(100% + ${$margin});
          left: 50%;
          translate: -50% 0;
        `;
      case PlaceOrientation.TopRight: 
        return `
          bottom: calc(100% + ${$margin});
          right: 0;
        `;
      case PlaceOrientation.Left: 
        return `
          bottom: 50%;
          right: calc(100% + ${$margin});
          translate: 0 50%;
        `;
      case PlaceOrientation.Center:
        return `
          bottom: 50%;
          left: calc(50% + ${$margin});
          translate: -50% 50%;
        `;
      case PlaceOrientation.Right:
        return `
          bottom: 50%;
          left: calc(100% + ${$margin});
          translate: 0 50%;
        `;
      case PlaceOrientation.LeftInlineTop:
        return `
          top: 0;
          right: calc(100% + ${$margin});
        `;
      case PlaceOrientation.LeftInlineBottom:
        return `
          bottom: 0;
          right: calc(100% + ${$margin});
        `;
      case PlaceOrientation.RightInlineTop:
        return `
          top: 0;
          left: calc(100% + ${$margin});
        `;
      case PlaceOrientation.RightInlineBottom:
        return `
          bottom: 0;
          left: calc(100% + ${$margin});
        `;
      case PlaceOrientation.BottomLeft:
        return `
          top: calc(100% + ${$margin});
          left:0;
        `;
      case PlaceOrientation.Bottom:
        return `
          top: calc(100% + ${$margin});
          left: 50%;
          translate: -50% 0;
        `;
      case PlaceOrientation.BottomRight:
        return `
          top: calc(100% + ${$margin});
          right: 0;
        `;
      default:
        return ``;
    }
  }}

  backdrop-filter: brightness(1.075) blur(15px);
  overflow:hidden;
  
  ${({$active}:FloatDropDownProps) => $active ? `
    opacity: 1;
    pointer-events: all;
    ` : `
    opacity: 0;
    pointer-events: none;
  `}
  z-index: 1;
`;

const FloatDropDownItem = styled.a`
  display:flex;

  ${({ theme }) => `
    color: ${theme.colors.text.dark};

    padding: ${theme.spacing.s.rem};
    gap: ${theme.spacing.xxs.rem};

    font-size: ${theme.font.sizes.ss};
    transition: background-color ${theme.transition.times.s} ease-in-out;

    &:hover {
      background-color: ${theme.colors.transparency.black(0.05)};
    }
  `}

  text-decoration: none;
  align-items: center;
  cursor: pointer;
  i {
    width: 1.5em;
    text-align: center;
  }
`;

/**
 *
 */
const FloatDropDown = ({
  triggerElement,
  place=PlaceOrientation.TopLeft, 
  dropDownItems,
  margin,
  "data-testid": dataTestId
}:{
  triggerElement: React.ReactElement,
  place?: PlaceOrientation
  dropDownItems: DropDownItem[],
  margin?: string,
  'data-testid'?: string
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropDownMenu = () => {
    setIsOpen(!isOpen);
  };

  const cloneTriggerElement = React.cloneElement(triggerElement, {
    onClick: toggleDropDownMenu
  });

  useEffect(() => {
    const toggleOutside = (event: MouseEvent) => {
      const dropDownTarget = dropDownRef.current;

      if(dropDownTarget && !dropDownTarget.contains(event.target as Node)) 
        setIsOpen(false);
    };
    document.addEventListener('click', toggleOutside);

    return () => {document.removeEventListener('click', toggleOutside);};
  }, []);
  const theme = useTheme();

  return (
    <FloatDropDownContainer ref={dropDownRef}>
      {cloneTriggerElement}
      <FloatDropDownMenu $placeOrientation={place} $margin={margin || theme.spacing.xl.rem} $active={isOpen} data-testid={dataTestId}>
        {dropDownItems.map((dropDownItem, index) => (
          <FloatDropDownItem href={dropDownItem.href} onClick={dropDownItem.onClick} key={index}>
            {dropDownItem.label}
          </FloatDropDownItem>
        ))}
      </FloatDropDownMenu>
    </FloatDropDownContainer>
  );
};

export default FloatDropDown;