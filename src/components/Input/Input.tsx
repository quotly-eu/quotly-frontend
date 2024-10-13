import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Styles
const Style_FontAwesomeIcon = styled(FontAwesomeIcon)`
  ${({ theme }) => `
    padding-left: ${theme.spacing.s.rem}; 
  `}
  font-size: 1.4em;
`;

const InputContainer = styled.label`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.text.dark};
  background-color: ${props => props.theme.colors.accent_white_0};

  border-radius: 100vmax;

  font-size: ${props => props.theme.font.sizes.xs.rem};

  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.default};
  overflow: hidden;
  input {
    color: inherit;
    background-color: transparent;

    width: 100%;
    padding: 
      ${props => props.theme.spacing.xs.rem} 
      ${props => props.theme.spacing.s.rem};

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
const Input = ({ id, name, placeholder, icon, testing }:{
  id?: string,
  name?: string
  placeholder?: string
  icon?: IconProp,
  testing?: boolean
}) => {
  return (
    <InputContainer data-testid={testing && 'label'}>
      {icon && <Style_FontAwesomeIcon icon={icon} />}
      <input id={id} name={name} placeholder={placeholder}  />
    </InputContainer>
  );
};

export default Input;