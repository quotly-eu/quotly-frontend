import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button/Button';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import Switcher from 'components/Switcher/Switcher';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';

import { ButtonStyles } from 'components/Button/Button.type';
import { DropDownItem, DropDownItemType } from 'components/FloatDropDown/FloatDropDown.type';
import { PlaceOrientation } from 'types/placeOrientation.type';
import { NavbarLeftType } from './NavbarLeft.type';

import { ReactComponent as Logo } from 'assets/img/quotly.svg';

// Styles
const NavbarLeftContainer = styled.div`
  display: grid;
  grid-area: navbar-left;

  padding: ${props => props.theme.spacing.s.rem};
  gap: ${props => props.theme.spacing.s.rem};
  grid-template-areas: 
    'top'
    'center'
    'bottom';
  grid-template-rows: auto 1fr auto;

  align-items: center;
  justify-items: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-areas: 
      'top center bottom';
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

  filter: drop-shadow(${props => props.theme.shadows.accent_default('#245d6059')});

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
  justify-content:space-between;
  height: min(20rem, 100%);

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
const PreparedProfileButton = styled(ProfileButton).attrs(({theme}) => ({
  size: theme.spacing.xxl.em
}))``;

/**
 * NavbarLeft Component
 */
const NavbarLeft = ({toggleDialog}:NavbarLeftType) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const DropDownItems: DropDownItem[] = [
    {
      label: (<><FontAwesomeIcon icon='home' /> {t('home')}</>),
      href: '/',
      type: DropDownItemType.LINK,
    },
    {
      label: (<><FontAwesomeIcon icon='fire' /> {t('trends')}</>)
    }
  ];
  
  const ProfileDropDownItems: DropDownItem[] = [
    {
      label: (<><FontAwesomeIcon icon='user' /> {t('profile')}</>),
      href: '/profile',
      type: DropDownItemType.LINK,
    },
    {
      label: (<><FontAwesomeIcon icon='cog' /> {t('settings')}</>),
      href: '/settings',
      type: DropDownItemType.LINK,
    },
    {
      label: (<><FontAwesomeIcon icon='sign-out' /> {t('logout')}</>),
      href: '/logout',
      type: DropDownItemType.LINK,
    }
  ];

  return (
    <NavbarLeftContainer>
      <LogoBrand href='/' title={t('quotly')}>
        <Logo />
      </LogoBrand>
      <Top $type='mobile'>
        <FloatDropDown
          place={PlaceOrientation.TopLeft}
          triggerElement={<Button style={ButtonStyles.transparent} isIconButton={true}><FontAwesomeIcon icon='bars' /></Button>}
          dropDownItems={DropDownItems}
          startMargin={theme.spacing.m.rem}
        />
      </Top>
      <Center>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={<></>}
          desktop={
            <FloatDropDown
              place={PlaceOrientation.Right}
              triggerElement={<Button style={ButtonStyles.transparent} isIconButton={true}><FontAwesomeIcon icon='bars' /></Button>}
              dropDownItems={DropDownItems}
              startMargin={theme.spacing.m.rem}
            />
          }
        />
        <Button style={ButtonStyles.primary} isIconButton={true} onClick={toggleDialog}><FontAwesomeIcon icon='quote-right' /></Button>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={<></>}
          desktop={<Button style={ButtonStyles.transparent} isIconButton={true}><FontAwesomeIcon icon='fire' /></Button>}
        />
      </Center>
      <Bottom>
        <Switcher
          breakpoint={theme.breakpoints.md}
          mobile={
            <FloatDropDown
              place={PlaceOrientation.TopRight}
              triggerElement={<PreparedProfileButton />}
              dropDownItems={ProfileDropDownItems}
              startMargin={theme.spacing.m.rem}
            />
          }
          desktop={
            <FloatDropDown
              place={PlaceOrientation.RightInlineBottom}
              triggerElement={<PreparedProfileButton />}
              dropDownItems={ProfileDropDownItems}
              startMargin={theme.spacing.m.rem}
            />
          }
        />
      </Bottom>
    </NavbarLeftContainer>
  );
};

export default NavbarLeft;