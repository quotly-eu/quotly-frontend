import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as Logo } from 'assets/img/quotly.svg';
import Button, { ButtonStyles } from '../Button/Button';
import ProfileButton from '../ProfileButton/ProfileButton';
import Switcher from '../Switcher/Switcher';
import FloatDropDown, { DropDownItem, PlaceOrientation } from '../FloatDropDown/FloatDropDown';

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
    label: (<><i className="fa-solid fa-home"></i> Home</>),
    href: '/',
  },
  {
    label: (<><i className="fa-solid fa-fire"></i> Trends</>)
  }
];

const ProfileDropDownItems: DropDownItem[] = [
  {
    label: (<><i className="fa-solid fa-user"></i> Profile</>),
    href: '/profile',
  },
  {
    label: (<><i className="fa-solid fa-cog"></i> Settings</>),
    href: '/settings',
  },
  {
    label: (<><i className="fa-solid fa-sign-out"></i> Logout</>),
    href: '/logout',
  }
];

/**
 * NavbarLeft Component
 */
const NavbarLeft = () => {
  const theme = useTheme();

  return (
    <NavbarLeftContainer>
      <LogoBrand href='/' title='Quotly'>
        <Logo />
      </LogoBrand>
      <Top $type='mobile'>
        <FloatDropDown
          place={PlaceOrientation.TopLeft}
          triggerElement={<Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bars"></i></Button>}
          dropDownItems={DropDownItems}
        />
      </Top>
      <Center>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={<></>}
          desktop={
            <FloatDropDown
              place={PlaceOrientation.Right}
              triggerElement={<Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-bars"></i></Button>}
              dropDownItems={DropDownItems}
            />
          }
        />
        <Button style={ButtonStyles.primary} isIconButton={true}><i className="fa-solid fa-plus"></i></Button>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={<></>}
          desktop={<Button style={ButtonStyles.transparent} isIconButton={true}><i className="fa-solid fa-fire"></i></Button>}
        />
      </Center>
      <Bottom>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={
            <FloatDropDown
              place={PlaceOrientation.TopRight}
              triggerElement={<ProfileButton />}
              dropDownItems={ProfileDropDownItems}
            />
          }
          desktop={
            <FloatDropDown
              place={PlaceOrientation.RightInlineBottom}
              triggerElement={<ProfileButton />}
              dropDownItems={ProfileDropDownItems}
            />
          } />
      </Bottom>
    </NavbarLeftContainer>
  );
};

export default NavbarLeft;