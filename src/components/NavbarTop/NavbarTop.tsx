import React from 'react'
import styled from 'styled-components';
import Button, { ButtonStyles } from '../Button/Button';

// Styles
const NavbarTopContainer = styled.div`
  display: grid;
  grid-area: navbar-top;

  padding: ${props => props.theme.spacing.m.rem};
  gap: ${props => props.theme.spacing.s.rem};
  grid-template-areas: "left center right";
  grid-template-columns: auto 1fr auto;

  align-items: center;
`;

const NavbarTop = () => {
  return (
    <NavbarTopContainer>
      <Button href='/' style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bell"></i></Button>
    </NavbarTopContainer>
  )
}

export default NavbarTop;