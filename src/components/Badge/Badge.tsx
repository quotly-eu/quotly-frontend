import React from 'react';
import styled from 'styled-components';
import { PlaceOrientation, PlaceOrientationProps } from 'types/placeOrientation.type';
import { placeOrientation } from 'utils/placeOrientation';
import { BadgeStyles } from './Badge.type';
import { CustomTheme } from 'types/styled-components';

// TYPES
interface BadgeProps {
  $style?: string,
  $fontSize?: CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']],
}

// STYLES
const BadgeContainer = styled.div<PlaceOrientationProps & BadgeProps>`
  ${({$placeOrientation}) => $placeOrientation && `position:absolute;`}

  ${placeOrientation}

  ${({$style, theme}) => {
    switch($style) {
      case BadgeStyles.transparent:
        return `
          text-shadow: black 0px 0px 5px;
        `;
      case BadgeStyles.default:
      default:
        return `
          background-color: ${theme.colors.primary};
        `;
    }
  }}
  ${({$fontSize, theme}) => `
    color: ${theme.colors.text.light};

    font-size: ${$fontSize || theme.font.sizes.xxxs};
    padding: ${theme.spacing.xxxs.rem} ${theme.spacing.xxs.rem};
    gap: ${theme.spacing.xxxs.rem};

    border-radius: 100vmax;

  `}

  font-weight: 800;
  border-radius:  100vmax;

  align-items:center;
  justify-content:center;
`;

/**
 * 
 * @returns 
 */
const Badge = ({children, className, place, style=BadgeStyles.default, fontSize}: {
  children?: React.ReactNode
  className?: string
  place?: {
    place: PlaceOrientation,
    margin?: string
  }
  margin?: string
  style?: BadgeStyles
  fontSize?: CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']]
}) => {
  return (
    <BadgeContainer className={className} $placeOrientation={place?.place} $margin={place?.margin || "0px"} $style={style} $fontSize={fontSize}>
      {children}
    </BadgeContainer>
  );
};

export default Badge;
