import React, { HTMLProps, useRef } from 'react';
import styled, { css, useTheme } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import { ButtonStyles } from 'components/Button/Button.type';
import Switcher from 'components/Switcher/Switcher';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
import { PlaceOrientation } from 'types/placeOrientation.type';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Styles
const cssNavbarTop = css`
  display: grid;
  grid-area: navbar-top;

  padding: ${props => props.theme.spacing.s.rem};
  gap: ${props => props.theme.spacing.s.rem};
  grid-template-areas: 'center right';
  grid-template-columns: 1fr auto;

  align-items: center;
  justify-items: center;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding-left: 0;
  }
`;

const NavbarTopContainer = styled.div`
  ${cssNavbarTop}
`;

const MobileNavbarTopContainer = styled.div`
  position: sticky;
  top: 0;

  ${({ theme }) => css`
    background: linear-gradient(to top, transparent, ${theme.colors.accent_white_0} 30%);
    border-radius: 0 0 ${theme.spacing.m.rem} ${theme.spacing.m.rem};
  `}

  ${cssNavbarTop}

  transition: translate 0.3s;
  z-index: 1000;
`;

/* const Left = styled.div`
  grid-area: left;
  width:100%;
`; */

const Center = styled.form`
  grid-area: center;
  width: min(25rem, 100%);
`;

const Right = styled.div`
  grid-area: right;
  width: 100%;
`;

/**
 * NavbarTop Component
 */
const NavbarTop = ({ ...props }): React.ReactElement => {
  const theme = useTheme();
  const [ searchParams ] = useSearchParams();
  const [ searchValue, setSearchValue ] = React.useState(searchParams.get('query') || '');
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLProps<HTMLInputElement>>(null);
  const { t, i18n: { language, languages, changeLanguage } } = useTranslation();

  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const searchInput = searchInputRef.current;
    if (searchInput) {
      const searchValue = searchInput.value;
      navigate(`/search/?query=${searchValue}`);
    }
  };

  const renderContent = () => (
    <>
      <Center onSubmit={onSubmit}>
        <Input
          ref={searchInputRef}
          id="search-input"
          icon="magnifying-glass"
          type="search"
          value={searchValue}
          onChange={setSearchValue}
          required
        />
      </Center>
      <Right>
        <FloatDropDown
          place={PlaceOrientation.BottomRight}
          triggerElement={
            <Button btnStyle={ButtonStyles.transparent} isIconButton><FontAwesomeIcon icon="globe" /></Button>
          }
          startMargin="0"
          margin={theme.spacing.xs.rem}
          dropDownItems={languages.map((key) => ({
            label: t(`languages.${key}`),
            active: language === key,
            onClick: () => changeLanguage(key)
          }))}
        />
      </Right>
    </>
  );

  return (
    <Switcher
      breakpoint={theme.breakpoints.md}
      desktop={
        <NavbarTopContainer {...props}>
          {renderContent()}
        </NavbarTopContainer>
      }
      mobile={
        <MobileNavbarTopContainer {...props}>
          {renderContent()}
        </MobileNavbarTopContainer>
      }
    />
  );
};

export default NavbarTop;