import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputType } from './Input.type';

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
  width: 100%;
  
  ${({ theme }) => `
    background-color: ${theme.colors.transparency.white(0.5)};
    color: ${theme.colors.text.dark};
    font-size: ${theme.font.sizes.xs.rem};
    border-radius: ${theme.spacing.m.rem};
    box-shadow: ${theme.shadows.default};
  `}

  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 999;
`;

const Style_Input = styled.input`
  color: inherit;
  background-color: transparent;

  width: 100%;
  ${({ theme }) => `
    padding: 
    ${theme.spacing.xs.rem} 
    ${theme.spacing.s.rem};  
  `}

  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;

  resize: none;

  border: 0;
  &:focus {
    outline: none;
  }
`;


/**
 * Input Component with Icon
 */
const Input = forwardRef<React.HTMLProps<HTMLInputElement>, InputType & Omit<Partial<React.HTMLProps<HTMLInputElement>>, 'onChange'>>(
  ({ id, name, placeholder, icon, as='input', required, testing, onChange, ...rest }, ref) => {
    return (
      <InputContainer data-testid={testing && 'label'}>
        {icon && <Style_FontAwesomeIcon icon={icon} />}
        <Style_Input 
          as={as}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange && onChange(ev.target.value)}
          ref={ref}
          {...rest} 
        />
      </InputContainer>
    );
  }
);

export default Input;