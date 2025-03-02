import React, { useEffect, useState } from 'react';
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
import { NavbarLeftProps } from './NavbarLeft.type';

import { ReactComponent as Logo } from 'assets/img/quotly.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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

const LogoBrand = styled(Link)`
  grid-area: top;
  width: ${props => props.theme.spacing.xxxl.rem};
  height: ${props => props.theme.spacing.xxxl.rem};

  font-size: 1.5rem;
  font-weight: 700;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const Top = styled.div<{ $type: string }>`
  grid-area: top;

  ${({ $type }) => $type === 'mobile' ? `display: none;` : ``};
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: center;
  justify-content: space-between;
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
const PreparedProfileButton = styled(ProfileButton).attrs(({ theme }) => ({
  size: theme.spacing.xxl.em
}))``;

/**
 * NavbarLeft Component
 */
const NavbarLeft = ({ toggleDialog, userResponse }: NavbarLeftProps) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [ cookies ] = useCookies([ 'token' ]);
  const [ avatarUrl, setAvatarUrl ] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, [ cookies.token ]);

  useEffect(() => {
    if (!userResponse) return;
    if (userResponse.status === 200) {
      const user = userResponse.data;
      setAvatarUrl(`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatarUrl}`);
    } else {
      navigate('/logout');
    }
  }, [ userResponse ]);

  const dropDownItems: DropDownItem[] = [
    {
      label: (<><FontAwesomeIcon icon="home" /> {t('home')}</>),
      href: '/',
      type: DropDownItemType.LINK,
      active: pathname === '/',
    },
    {
      label: (<><FontAwesomeIcon icon="fire" /> {t('trends')}</>),
      href: '/top',
      type: DropDownItemType.LINK,
      active: pathname.includes('/top'),
    }
  ];

  const ProfileDropDownItems: DropDownItem[] = [
    {
      label: (<><FontAwesomeIcon icon="user" /> {userResponse?.data.displayName || t('profile')}</>),
      href: `/user/${userResponse?.data.userId}`,
      type: DropDownItemType.LINK,
      active: pathname.includes(`/user/${userResponse?.data.userId}`)
    },
    {
      label: (<><FontAwesomeIcon icon={[ 'fas', 'bookmark' ]} /> {t('saved_quotes')}</>),
      href: '/saved',
      type: DropDownItemType.LINK,
      active: pathname.includes('/saved')
    },
    {
      label: (<><FontAwesomeIcon icon="cog" /> {t('settings')}</>),
      href: '/settings',
      type: DropDownItemType.LINK,
      active: pathname.includes('/settings')
    },
    {
      label: (<><FontAwesomeIcon icon="sign-out" /> {t('logout')}</>),
      href: '/logout',
      type: DropDownItemType.LINK,
      active: pathname.includes('/logout')
    }
  ];

  const renderProfileButton = (place: PlaceOrientation) => (
    <FloatDropDown
      place={place}
      triggerElement={<PreparedProfileButton src={avatarUrl} />}
      dropDownItems={ProfileDropDownItems}
      startMargin={theme.spacing.m.rem}
    />
  );

  const renderTop = () => (
    <Top $type="mobile">
      <FloatDropDown
        place={PlaceOrientation.TopLeft}
        triggerElement={<Button
          btnStyle={ButtonStyles.transparent}
          isIconButton
        ><FontAwesomeIcon icon="bars" /></Button>}
        dropDownItems={dropDownItems}
        startMargin={theme.spacing.m.rem}
      />
    </Top>
  );

  const renderCenter = () => (
    <Center>
      <Switcher
        desktop={
          <FloatDropDown
            place={PlaceOrientation.Right}
            triggerElement={<Button
              btnStyle={ButtonStyles.transparent}
              isIconButton
            ><FontAwesomeIcon icon="bars" /></Button>}
            dropDownItems={dropDownItems}
            startMargin={theme.spacing.m.rem}
          />
        }
      />

      <Button
        btnStyle={ButtonStyles.primary}
        onClick={toggleDialog}
        isIconButton
      >
        <FontAwesomeIcon icon="quote-right" />
      </Button>

      <Switcher
        desktop={
          <Button
            btnStyle={pathname.includes('/top') ? ButtonStyles.default : ButtonStyles.transparent}
            onClick={() => navigate('/top')}
            isIconButton
          >
            <FontAwesomeIcon icon="fire" />
          </Button>
        }
      />
    </Center>
  );

  const renderBottom = () => (
    <Bottom>
      <Switcher
        mobile={renderProfileButton(PlaceOrientation.TopRight)}
        desktop={renderProfileButton(PlaceOrientation.RightInlineBottom)}
      />
    </Bottom>
  );

  return (
    <NavbarLeftContainer>
      <LogoBrand to="/" title={t('quotly')}><Logo /></LogoBrand>
      {renderTop()}
      {renderCenter()}
      {renderBottom()}
    </NavbarLeftContainer>
  );
};

export default NavbarLeft;