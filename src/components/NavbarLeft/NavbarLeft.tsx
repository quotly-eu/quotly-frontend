import React from 'react'
import styled from 'styled-components';
import Logo from '../../assets/img/quotly.svg';
import Button, { ButtonStyles } from '../Button/Button';

// Styles
const NavbarLeftContainer = styled.div`
  display: grid;
  grid-area: navbar-left;

  padding: ${props => props.theme.spacing.m.rem};
  gap: ${props => props.theme.spacing.s.rem};
  grid-template-areas: 
    "top"
    "center"
    "bottom";
  grid-template-rows: auto 1fr auto;

  align-items: center;
  justify-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-areas: 
      "top center bottom";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: none;
  }
`;

const LogoBrand = styled.a`
  grid-area: top;
  background-image: url(${Logo});
  width: ${props => props.theme.spacing.xxxl.rem};
  height: ${props => props.theme.spacing.xxxl.rem};

  font-size: 1.5rem;
  font-weight: 700;

  filter: drop-shadow(${props => props.theme.shadows.accent_default("#245d6059")});

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const Top = styled.div`
  grid-area: top;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: center;
  gap: ${props => props.theme.spacing.xxl.rem};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${props => props.theme.spacing.xxl.rem};
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.m.rem};
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: ${props => props.theme.spacing.xxxs.rem};
  }
`;
const Bottom = styled.div`
  grid-area: bottom;
`;

const NavbarLeft = () => {
  return (
    <NavbarLeftContainer>
      <LogoBrand href='/' title='Quotly' />
      <Top>

      </Top>
      <Center>
        <Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-home"></i></Button>
        <Button style={ButtonStyles.primary} isIconButton={true}><i className="fa-solid fa-plus"></i></Button>
        <Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bars"></i></Button>
      </Center>
      <Bottom>
        
      </Bottom>
    </NavbarLeftContainer>
  )
}

export default NavbarLeft