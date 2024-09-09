import React from 'react'
import styled from 'styled-components';

// Styles
const InputContainer = styled.div`
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
  }
  input {
    color: inherit;
    background-color: transparent;

    width: 100%;
    padding: ${props => props.theme.spacing.xs.rem};
    padding-left: ${props => props.theme.spacing.xxl.rem};
    border-radius: 100vmax;

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;

    border: 0;
    &::placeholder {
      color: transparent;
    }
    &:focus {
      outline: none;
    }
  }
`;

const Input = ({
  id=undefined,
  name=undefined
}:{
  id?: string,
  name?: string
}) => {
  return (
    <InputContainer>
      <label htmlFor={id}><i className="fa-solid fa-search"></i></label>
      <input id={id} name={name} placeholder='Search' />
    </InputContainer>
  )
}

export default Input