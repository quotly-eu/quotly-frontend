import React from 'react';
import styled from 'styled-components';

// Styles
const InputContainer = styled.div<{$hasIcon:boolean}>`
  position: relative;
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.text.dark};
  background-color: ${props => props.theme.colors.accent_white_0};
  
  gap: ${props => props.theme.spacing.s.rem};

  border-radius: 100vmax;

  font-size: ${props => props.theme.font.sizes.xs};

  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.default};
  overflow: hidden;
  label {
    position: absolute;
    display: flex;
    
    left: ${props => props.theme.spacing.s.rem};
    font-size: 1.4em;

    border-radius: 100vmax;
    align-items: center;
  }
  input {
    color: inherit;
    background-color: transparent;

    width: 100%;
    padding: 
      ${props => props.theme.spacing.xs.rem} 
      ${props => props.theme.spacing.s.rem};
    ${({$hasIcon, theme}) => $hasIcon && `padding-left: ${theme.spacing.xl.em}`};

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;

    border: 0;
    &:focus {
      outline: none;
    }
  }
`;

/**
 * Input Component with Icon
 */
const Input = ({ id, name, placeholder, iconClass, testing }:{
  id?: string,
  name?: string
  placeholder?: string
  iconClass?: string,
  testing?: boolean
}) => {
  return (
    <InputContainer $hasIcon={iconClass !== undefined}>
      {iconClass && <label htmlFor={id} data-testid={testing && "label"}><i className={iconClass} data-testid={testing && "icon"}></i></label>}
      <input id={id} name={name} placeholder={placeholder}  />
    </InputContainer>
  );
};

export default Input;