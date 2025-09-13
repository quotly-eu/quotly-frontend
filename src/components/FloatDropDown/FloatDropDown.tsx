import React, { useEffect, useRef } from 'react';
import styled, { css, useTheme } from 'styled-components';

import { DropDownItem, DropDownItemType } from './FloatDropDown.type';
import { PlaceOrientation, PlaceOrientationProps } from 'types/placeOrientation.type';
import { placeOrientation } from 'utils/placeOrientation';
import { Link } from 'react-router-dom';

interface FloatDropDownProps extends PlaceOrientationProps {
  $active?: boolean;
  $hasParentWidth?: boolean;
}

interface FloatDropDownItemProps {
  $active?: boolean;
}

const FloatDropDownContainer = styled.div`
  position: relative;
`;

const FloatDropDownMenu = styled.div<FloatDropDownProps>`
  position: absolute;

  ${({ theme, $hasParentWidth }) => css`
    border-radius: ${theme.spacing.xs.rem};
    box-shadow: ${theme.shadows.default};
    transition: all ${theme.transition.times.m} ease-in-out;
    ${$hasParentWidth ? css`
    width: 100%;
    justify-content: center;
  ` : css`
    width: max-content;
  `}
  `}

  ${placeOrientation}

  ${({ $active }: FloatDropDownProps) => $active ? css`
    opacity: 1;
    pointer-events: all;
    ` : css`
    opacity: 0;
    pointer-events: none;
    scale: 1 0.9;
  `}

  backdrop-filter: brightness(1.075) blur(25px);
  overflow: hidden;
  z-index: 10000;
`;

const FloatDropDownItem = css<FloatDropDownItemProps>`
  display: flex;
  -webkit-tap-highlight-color: transparent;

  ${({ theme, $active }) => css`
    ${$active ? css`
      color: ${theme.colors.primary};
      font-weight: bold;
    ` : css`
      color: ${theme.colors.text.dark};
    `}

    padding: ${theme.spacing.xs.rem};
    gap: ${theme.spacing.xxs.rem};

    font-size: ${theme.font.sizes.ss.rem};
    transition: background-color ${theme.transition.times.s} ease-in-out;

    &:hover {
      background-color: ${theme.colors.transparency.black(0.05)};
    }
  `}

  text-decoration: none;
  align-items: center;
  cursor: pointer;

  .svg-inline--fa {
    width: 1.5em;
    text-align: center;
  }
`;

const FloatDropDownAnchorItem = styled.a<FloatDropDownItemProps>`
  ${FloatDropDownItem}
`;

const FloatDropDownLinkItem = styled(Link) <FloatDropDownItemProps>`
  ${FloatDropDownItem}
`;

/**
 *
 */
const FloatDropDown = ({
  triggerElement,
  place = PlaceOrientation.TopLeft,
  dropDownItems,
  margin,
  startMargin,
  'data-testid': dataTestId,
  hasParentWidth = false
}: {
  triggerElement: React.ReactElement,
  place?: PlaceOrientation
  dropDownItems: DropDownItem[],
  margin?: string,
  startMargin?: string,
  'data-testid'?: string
  hasParentWidth?: boolean
}) => {
  const theme = useTheme();
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
      if (isOpen && dropDownTarget && !dropDownTarget.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', toggleOutside);

    return () => {
      document.removeEventListener('click', toggleOutside);
    };
  });

  return (
    <FloatDropDownContainer ref={dropDownRef}>
      {cloneTriggerElement}
      <FloatDropDownMenu
        $placeOrientation={place}
        $margin={(isOpen ? margin : startMargin) || margin || theme.spacing.l.rem}
        $active={isOpen}
        $hasParentWidth={hasParentWidth}
        data-testid={dataTestId}
      >
        {dropDownItems.map((dropDownItem, index) => {
          const propagateClick = (event: React.MouseEvent) => {
            event.stopPropagation();
            if (typeof navigator.vibrate === 'function') navigator.vibrate(20);
            if (dropDownItem.onClick) dropDownItem.onClick(event);
            toggleDropDownMenu();
          };

          if (dropDownItem.type && dropDownItem.type === DropDownItemType.LINK) {
            return (
              <FloatDropDownLinkItem
                to={dropDownItem.href || ''}
                onClick={propagateClick}
                $active={dropDownItem.active}
                key={index}
              >
                {dropDownItem.label}
              </FloatDropDownLinkItem>
            );
          }

          return (
            <FloatDropDownAnchorItem
              href={dropDownItem.href}
              onClick={propagateClick}
              $active={dropDownItem.active}
              key={index}
            >
              {dropDownItem.label}
            </FloatDropDownAnchorItem>
          );
        })}
      </FloatDropDownMenu>
    </FloatDropDownContainer>
  );
};

export default FloatDropDown;