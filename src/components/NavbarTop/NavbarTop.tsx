import React from 'react'
import styled from 'styled-components';
import Button, { ButtonStyles } from '../Button/Button';
import Input from '../Input/Input';

// Styles
const NavbarTopContainer = styled.div`
  display: grid;
  grid-area: navbar-top;

  padding: ${props => props.theme.spacing.m.rem};
  gap: ${props => props.theme.spacing.s.rem};
  grid-template-areas: "left center right";
  grid-template-columns: auto 1fr auto;

  align-items: center;
  justify-items: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding-left: 0;
  }
`;

const Left = styled.div`
  grid-area: left;
  width:100%;
`;

const Center = styled.div`
  grid-area: center;
  width:min(25rem, 100%);
`;

const Right = styled.div`
  grid-area: right;
  width:100%;
`;

const NavbarTop = () => {
  return (
    <NavbarTopContainer>
      <Left>
      </Left>
      <Center>
        <Input id='search-input'/>
      </Center>
      <Right>
        <Button href='/' style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bell"></i></Button>
      </Right>

    </NavbarTopContainer>
  )
}

export default NavbarTop;