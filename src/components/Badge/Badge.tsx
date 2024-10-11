import React from 'react';
import styled from 'styled-components';
import { PlaceOrientation, PlaceOrientationProps } from 'types/placeOrientation.type';
import { placeOrientation } from 'utils/placeOrientation';
import { BadgeStyles } from './Badge.type';
import { CustomTheme } from 'types/styled-components';

// TYPES
interface BadgeProps extends PlaceOrientationProps {
  $style?: string,
  $fontSize?: CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']][
    keyof CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']]
  ],
}

// STYLES
const BadgeContainer = styled.div<BadgeProps>`
  ${({$placeOrientation}) => $placeOrientation && `position:absolute;`}

  ${placeOrientation}

  ${({$style, theme}) => {
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
      case BadgeStyles.primary:
        return `
          background-color: ${theme.colors.primary};
        `;
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
      case BadgeStyles.default:
      default:
        return `
          background-color: ${theme.colors.primary};
        `;
    }
  }}
  ${({$fontSize, theme}) => `
    color: ${theme.colors.text.light};

    font-size: ${$fontSize || theme.font.sizes.xxxs.em};
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
  fontSize?: CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']][
    keyof CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']]
  ]
}) => {
  return (
    <BadgeContainer className={className} $placeOrientation={place?.place} $margin={place?.margin || "0px"} $style={style} $fontSize={fontSize}>
      {children}
    </BadgeContainer>
  );
};

export default Badge;
