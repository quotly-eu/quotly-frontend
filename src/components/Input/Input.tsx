import React from 'react'
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

  font-size: ${props => props.theme.font.sizes.s};
  font-weight: 500;

  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.default};
  label {
    position: absolute;
    display: flex;
    
    left: ${props => props.theme.spacing.m.rem};

    border-radius: 100vmax;
    align-items: center;
  }
  input {
    color: inherit;
    background-color: transparent;

    width: 100%;
    padding: 
      ${props => props.theme.spacing.xxs.rem} 
      ${props => props.theme.spacing.s.rem} 
      ${props => props.theme.spacing.xs.rem};
    ${({$hasIcon, theme}) => $hasIcon && `padding-left: ${theme.spacing.xxl.rem}`};

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;

    border: 0;
    &:focus {
      outline: none;
    }
  }
`;

const Input = ({
  id,
  name,
  placeholder,
  iconClass,
}:{
  id?: string,
  name?: string
  placeholder?: string
  iconClass?: string
}) => {
  return (
    <InputContainer $hasIcon={iconClass !== undefined}>
      {iconClass && <label htmlFor={id}><i className={iconClass}></i></label>}
      <input id={id} name={name} placeholder={placeholder}  />
    </InputContainer>
  )
}

export default Input