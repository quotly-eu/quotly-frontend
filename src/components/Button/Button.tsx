import React from 'react';
import styled from 'styled-components';

import { ButtonStyles, ButtonType } from './Button.type';

// Types
interface ButtonProps {
  $style?: ButtonStyles,
  $padding?: string,
  $gap?: string,
  $width?: string,
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
          }
        `;
      case ButtonStyles.secondary:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.secondary};
          
          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_secondary_0};
          }
        `;
      case ButtonStyles.success:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.success};

          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_success_0};
          }
        `;
      case ButtonStyles.info:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.info};

          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_info_0};
          }
        `;
      case ButtonStyles.warning:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.warning};

          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_warning_0};
          }
        `;
      case ButtonStyles.danger:
        return `
          color: ${theme.colors.text.light};
          background-color: ${theme.colors.danger};

          box-shadow: ${theme.shadows.default};
          &:active {
            background-color: ${theme.colors.accent_danger_0};
          }
        `;
      case ButtonStyles.transparent:
        return `
          color: ${theme.colors.text.dark};
          background-color: transparent;

          &:active {
            background-color: ${theme.colors.transparency.black(0.1)};
          }
        `;
      case ButtonStyles.default:
      default:
        return `
          background-color: transparent;
          color: ${theme.colors.text.dark};
          box-shadow: ${theme.shadows.default}, inset ${theme.shadows.default};

          backdrop-filter: brightness(1.075);
          &:active {
            background-color: ${theme.colors.transparency.black(0.05)};
          }
        `;
    }
  }}
  ${({$isIconButton, $padding, $width, theme}) => 
    $isIconButton ? 
      `
        flex-direction: column;

        padding: ${$padding || theme.spacing.xxs.em};
        width: ${$width || theme.spacing.xxl.rem};
        height: ${$width || theme.spacing.xxl.rem};

      ` : `
        ${$width ? `width: ${$width};` : ``}
        padding: ${$padding || `${theme.spacing.xxxs.em} ${theme.spacing.s.em}`};
      `
  }
  ${({$gap, theme}) => `
    font-size: ${theme.font.sizes.s.rem};
    font-family: ${theme.font.family.default};
    gap: ${$gap || theme.spacing.xxs.rem};
    transition-duration: ${theme.transition.times.s};
  `}
  border-radius: 100vmax;
  border: none;

  font-weight: 500;

  transition-property: background-color, color;
  transition-timing-function: ease-in-out;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

/**
 * Button and Icon Button Component
 */
const Button = ({
  children, 
  href=undefined,
  as='button',
  type='button',
  isIconButton=false, 
  btnStyle=ButtonStyles.default, 
  padding, 
  gap, 
  width, 
  title, 
  onClick,
  ...rest
}:ButtonType & React.HTMLProps<HTMLButtonElement>) => {
  const propagateClick = (event: React.MouseEvent) => {
    if(typeof navigator.vibrate === 'function') navigator.vibrate(20);
    if(onClick) onClick(event);
  };

  return (
    <ButtonContainer
      as={as}
      href={href} 
      type={type}
      $style={btnStyle}
      $padding={padding}
      $gap={gap}
      $width={width}
      $isIconButton={isIconButton}
      onClick={propagateClick}
      title={title}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;