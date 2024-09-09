import 'styled-components';
import theme from '../assets/themes/default';

type CustomTheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}