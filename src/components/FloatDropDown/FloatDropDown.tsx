import React, { useEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components'

export type DropDownItem = {
  label: React.ReactNode,
  href?: string
  onClick?: () => void
}

export enum PlaceOrientation {
  TopLeft,
  Top,
  TopRight,

  Left,
  Center,
  Right,
  LeftInlineTop,
  LeftInlineBottom,
  RightInlineTop,
  RightInlineBottom,

  BottomLeft,
  Bottom,
  BottomRight,
}

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
  background-color: ${props => props.theme.colors.accent_white_0};

  width: max-content;

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

  border-radius: ${props => props.theme.spacing.xs.em};

  overflow:hidden;
  box-shadow: ${props => props.theme.shadows.default};
  
  ${({$active}:FloatDropDownProps) => $active ? `
    opacity: 1;
    pointer-events: all;
    ` : `
    opacity: 0;
    pointer-events: none;
  `}
  transition: all ${props => props.theme.transition.times.m} ease-in-out;
`;

const FloatDropDownItem = styled.a`
  display:block;
  color: ${props => props.theme.colors.text.dark};

  padding: ${props => props.theme.spacing.s.rem};

  font-size: ${props => props.theme.font.sizes.ss};

  text-decoration: none;
  cursor: pointer;
  transition: background-color ${props => props.theme.transition.times.s} ease-in-out;
  &:hover {
    background-color: ${props => props.theme.colors.transparency.black(0.05)};
  }
`;

const FloatDropDown = ({
  triggerElement,
  place=PlaceOrientation.TopLeft, 
  dropDownItems,
  margin
}:{
  triggerElement: React.ReactNode,
  place?: PlaceOrientation
  dropDownItems: DropDownItem[],
  margin?: string
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropDownMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const toggleOutside = (event: MouseEvent) => {
      const dropDownTarget = dropDownRef.current;

      if(dropDownTarget && !dropDownTarget.contains(event.target as Node)) 
        setIsOpen(false);
    }
    document.addEventListener('click', toggleOutside);

    return () => {document.removeEventListener('click', toggleOutside)};
  }, [])
  const theme = useTheme();

  return (
    <FloatDropDownContainer ref={dropDownRef}>
      <div onClick={toggleDropDownMenu}>
        {triggerElement}
      </div>
      <FloatDropDownMenu $placeOrientation={place} $margin={margin || theme.spacing.xl.rem} $active={isOpen}>
        {dropDownItems.map((dropDownItem, index) => (
          <FloatDropDownItem href={dropDownItem.href} onClick={dropDownItem.onClick} key={index}>
            {dropDownItem.label}
          </FloatDropDownItem>
        ))}
      </FloatDropDownMenu>
    </FloatDropDownContainer>
  );
}

export default FloatDropDown