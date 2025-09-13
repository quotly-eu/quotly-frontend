import React from 'react';
import styled from 'styled-components';
import { PlaceOrientationProps } from 'types/placeOrientation.type';
import { placeOrientation } from 'utils/placeOrientation';
import { BadgeStyles, BadgeType } from './Badge.type';
import { CustomTheme } from 'types/declarations/styled-components';

// TYPES
interface BadgeProps extends PlaceOrientationProps {
  $style?: string,
  $color?: string,
  $fontSize?: CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']][
    keyof CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']]
  ],
}

// STYLES
const BadgeContainer = styled.div<BadgeProps>`
  ${({$placeOrientation}) => $placeOrientation && `position:absolute;`}

  ${placeOrientation}

  ${({$fontSize, theme}) => `
    color: ${theme.colors.text.light};

    font-size: ${$fontSize || theme.font.sizes.xxxs.em};
    padding: ${theme.spacing.xxxs.rem} ${theme.spacing.xxs.rem};
    gap: ${theme.spacing.xxxs.rem};

    border-radius: 100vmax;

  `}
  ${({$style, $color, theme}) => {
    switch($style) {
      case BadgeStyles.transparent: { 
        const outlineWidth = '0px';
        const outlineRadius = '1.25px';
        const color = theme.colors.text.dark;
        return `
          text-shadow: ${color} ${outlineWidth} ${outlineWidth} ${outlineRadius},
                       ${color} -${outlineWidth} ${outlineWidth} ${outlineRadius},
                       ${color} ${outlineWidth} -${outlineWidth} ${outlineRadius},
                       ${color} -${outlineWidth} -${outlineWidth} ${outlineRadius},
                       ${color} ${outlineWidth} ${outlineWidth} ${outlineRadius},
                       ${color} -${outlineWidth} ${outlineWidth} ${outlineRadius},
                       ${color} ${outlineWidth} -${outlineWidth} ${outlineRadius},
                       ${color} -${outlineWidth} -${outlineWidth} ${outlineRadius}
          ;
        `; 
      }
      case BadgeStyles.secondary:
        return `
          background-color: ${theme.colors.secondary};
        `;
      case BadgeStyles.success:
        return `
          background-color: ${theme.colors.success};
        `;
      case BadgeStyles.info:
        return `
          background-color: ${theme.colors.info};
        `;
      case BadgeStyles.warning:
        return `
          background-color: ${theme.colors.warning};
        `;
      case BadgeStyles.danger:
        return `
          background-color: ${theme.colors.danger};
        `;
      case BadgeStyles.custom:
        return $color && `
          color: ${$color};
        `;
      case BadgeStyles.primary:
      case BadgeStyles.default:
      default:
        return `
          background-color: ${theme.colors.primary};
        `;
    }
  }}

  font-weight: 800;
  border-radius: 100vmax;

  align-items:center;
  justify-content:center;
  user-select:none;
`;

/**
 * 
 * @returns 
 */
const Badge = ({children, place, badgeStyle=BadgeStyles.default, color, fontSize, ...rest}:BadgeType) => {
  return (
    <BadgeContainer $placeOrientation={place?.place} $margin={place?.margin || '0px'} $style={badgeStyle} $color={color} $fontSize={fontSize} {...rest}>
      {children}
    </BadgeContainer>
  );
};

export default Badge;
