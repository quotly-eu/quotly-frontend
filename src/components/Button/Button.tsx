import React from 'react';
import styled from 'styled-components';

import { ButtonStyles } from './Button.type';

// Types
interface ButtonProps {
  $style?: ButtonStyles,
  $isIconButton?: boolean,
}

// Styles
const ButtonContainer = styled.a<ButtonProps>`
  display:flex;
  -webkit-tap-highlight-color: transparent;
  ${({$style, theme}) => {
    switch($style) {
      case ButtonStyles.primary:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.primary};

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
          
          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_secondary_0};
            border-color: ${theme.colors.accent_secondary_0};
          }
        `;
      case ButtonStyles.transparent:
        return `
          color: ${theme.colors.text.dark};

          &:active {
            background-color: ${theme.colors.transparency.black(0.1)};
          }
        `;
      case ButtonStyles.default:
      default:
        return `
          color: ${theme.colors.text.dark};
          box-shadow: ${theme.shadows.default}, inset ${theme.shadows.default};

          backdrop-filter: brightness(1.075);
          &:active {
            background-color: ${theme.colors.transparency.black(0.05)};
          }
        `;
    }
  }}
  ${({$isIconButton, theme}) => 
    $isIconButton ? 
      `
        padding: ${theme.spacing.xs.rem};
        width: ${theme.spacing.xxl.rem};
        height: ${theme.spacing.xxl.rem};
      ` : `
        padding: ${theme.spacing.xxs.rem} ${theme.spacing.m.rem};
      `
  }
  gap: ${props => props.theme.spacing.xxs.rem};
  border-radius: 100vmax;

  font-size: ${props => props.theme.font.sizes.s};
  font-weight: 500;

  transition-property: background-color, border-color, color;
  transition-duration: ${props => props.theme.transition.times.s};
  transition-timing-function: ease-in-out;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

/**
 * Button and Icon Button Component
 */
const Button = ({children, href=undefined, onClick, isIconButton=false, style=ButtonStyles.default }:{
  children?: React.ReactNode,
  href?: string,
  onClick?: () => void,
  isIconButton?: boolean,
  style?: ButtonStyles,
}) => {
  return (
    <ButtonContainer href={href} $style={style} $isIconButton={isIconButton} onClick={onClick}>{children}</ButtonContainer>
  );
};

export default Button;