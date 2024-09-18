import 'styled-components';
import theme from '../assets/themes/default';

type CustomTheme = typeof theme;

declare module "styled-components" {
  /**
   * Theme extension for styled-components
   * @example
   * const Container = styled.div`
   *  padding: ${props => props.theme.spacing.m.rem};
   * `;
   */
  export type DefaultTheme = CustomTheme
}