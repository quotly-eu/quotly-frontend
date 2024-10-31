import { WebTarget } from "styled-components";

/**
 * ButtonStyles for the Button component.
 * @example
 * import Button from 'components/Button/Button';
 * import { ButtonStyles } from 'types/Button.type';
 * 
 * <Button style={ButtonStyles.primary}>Primary</Button>
 */
export enum ButtonStyles {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  transparent = 'transparent',
}

/**
 * ButtonType for the Button component.
 * @example
 * import Button from 'components/Button/Button';
 * 
 * <Button>Click Me</Button>
 */
export type ButtonType = {
  children?: React.ReactNode,
  className?: string,
  href?: string,
  as?: void | WebTarget,
  type?: 'button' | 'submit' | 'reset',
  style?: ButtonStyles,
  padding?: string,
  gap?: string,
  width?: string
  isIconButton?: boolean,
  title?: string,
  onClick?: (event: React.MouseEvent) => void,
};