import React from 'react'
import styled from 'styled-components';

// Types
export enum ButtonStyles {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  transparent = 'transparent',
}

interface ButtonProps {
  $style?: ButtonStyles,
  $isIconButton?: boolean,
}

// Styles
const ButtonContainer = styled.a<ButtonProps>`
  display:flex;
  grid-area: right;

  -webkit-tap-highlight-color: transparent;
  ${({$style, theme}) => {
    switch($style) {
      case ButtonStyles.primary:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};

          box-shadow: ${theme.shadows.default};

          &:active {
            background-color: ${theme.colors.accent_primary_0};
            border-color: ${theme.colors.accent_primary_0};
          }
        `;
      case ButtonStyles.secondary:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.secondary};
          border-color: ${theme.colors.secondary};
          
          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_secondary_0};
            border-color: ${theme.colors.accent_secondary_0};
          }
        `;
      case ButtonStyles.transparent:
        return `
          color: ${theme.colors.text.dark};
          border-color: transparent;

          &:active {
            background-color: ${theme.colors.transparency.black(0.1)};
          }
        `;
      case ButtonStyles.default:
      default:
        return `
          color: ${theme.colors.text.dark};
          border-color: ${theme.colors.white};
          box-shadow: inset ${theme.shadows.default},${theme.shadows.default};

          &:active {
            background-color: ${theme.colors.transparency.black(0.1)};
          }
        `;
    }
  }}
  ${({$isIconButton, theme}) => {
    if($isIconButton) {
      return `
        padding: ${theme.spacing.xxs.rem};
        width: ${theme.spacing.xxl.rem};
        height: ${theme.spacing.xxl.rem};
      `;
    } else {
      return `
        padding: ${theme.spacing.xxs.rem} ${theme.spacing.m.rem};
      `;
    }
  }}
  gap: ${props => props.theme.spacing.xxs.rem};
  border-radius: 100vmax;

  font-size: ${props => props.theme.font.sizes.s};
  font-weight: 500;
  
  border-width: ${props => props.theme.spacing.xxxs.rem};
  border-style: solid;

  transition-property: background-color, border-color, color;
  transition-duration: ${props => props.theme.transition.times.s};
  transition-timing-function: ease-in-out;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Button = ({
  children,
  href=undefined,
  isIconButton=false,
  style=ButtonStyles.default,
}:{
  children?: React.ReactNode,
  href?: string,
  isIconButton?: boolean,
  style?: ButtonStyles,
}) => {
  return (
    <ButtonContainer href={href} $style={style} $isIconButton={isIconButton}>{children}</ButtonContainer>
  )
}

export default Button