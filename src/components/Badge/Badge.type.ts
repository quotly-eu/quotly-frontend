import { PlaceOrientation } from "types/placeOrientation.type";
import { CustomTheme } from "types/styled-components";

/**
 * BadgeStyles
 * @example
 * import Button from 'components/Button/Button';
 * import { ButtonStyles } from 'types/Button.type';
 * 
 * <Badge style={ButtonStyles.primary}>Primary</Badge>
 */
export enum BadgeStyles {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  custom = 'custom',
  transparent = 'transparent',
}

/**
 * BadgeType
 * @example
 * import Badge from 'components/Badge/Badge';
 * 
 * <Badge>Badge</Badge>
 */
export type BadgeType = {
  children?: React.ReactNode
  place?: {
    place: PlaceOrientation,
    margin?: string
  }
  margin?: string
  style?: BadgeStyles
  color?: string
  fontSize?: CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']][
    keyof CustomTheme['font']['sizes'][keyof CustomTheme['font']['sizes']]
  ]
  [rest: string]: unknown;
};