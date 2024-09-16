import React from 'react'
import styled, { useTheme } from 'styled-components';
import Logo from '../../assets/img/quotly.svg';
import Button, { ButtonStyles } from '../Button/Button';
import Profile from '../Profile/Profile';
import Switcher from '../Switcher/Switcher';
import FloatDropDown, { DropDownItem } from '../FloatDropDown/FloatDropDown';

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

const Top = styled.div<{$type:string}>`
  grid-area: top;

  ${({$type}) => $type === 'mobile' ? `display: none;` : ``}
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: center;
  gap: ${props => props.theme.spacing.xxl.rem};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${props => props.theme.spacing.l.rem};
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing.xxxs.rem};
  }
`;
const Bottom = styled.div`
  grid-area: bottom;
`;

const DropDownItems: DropDownItem[] = [
  {
    label: (<><i className="fa-solid fa-home"></i> Home</>)
  },
  {
    label: (<><i className="fa-solid fa-fire"></i> Trends</>)
  }
]

const NavbarLeft = () => {
  const theme = useTheme();

  return (
    <NavbarLeftContainer>
      <LogoBrand href='/' title='Quotly' />
      <Top $type='mobile'>
        <FloatDropDown
          triggerElement={<Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bars"></i></Button>}
          dropDownItems={DropDownItems}
        />
      </Top>
      <Center>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={<></>}
          desktop={<Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bars"></i></Button>}
        />
        <Button style={ButtonStyles.primary} isIconButton={true}><i className="fa-solid fa-plus"></i></Button>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={<></>}
          desktop={<Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-fire"></i></Button>}
        />
      </Center>
      <Bottom>
        <Profile />
      </Bottom>
    </NavbarLeftContainer>
  )
}

export default NavbarLeft