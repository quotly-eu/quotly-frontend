import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import styled, { css, useTheme } from 'styled-components';
import Button from '../../components/Button/Button';
import { ButtonStyles } from '../../components/Button/Button.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FloatDropDown from '../../components/FloatDropDown/FloatDropDown';
import { PlaceOrientation } from '../../types/placeOrientation.type';
import Input from '../../components/Input/Input';
import { useLocalStorage } from 'usehooks-ts';
import { themes } from '../../assets/themes/default';
import { useApiContext } from '../../contexts/ApiContext/ApiContext';
import { generateToken } from '../../utils/generateToken';
import { useCookies } from 'react-cookie';
import { DropDownItem } from '../../components/FloatDropDown/FloatDropDown.type';

const SettingsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${({ theme }) => css`
    gap: ${theme.spacing.s.rem};
  `}
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  flex: 1;
  place-content: center;
  align-items: center;
  ${({ theme }) => css`
    background-color: ${theme.colors.accent_white_0};
    padding: ${theme.spacing.m.rem};
    gap: ${theme.spacing.m.rem};
    border-radius: ${theme.spacing.s.rem};
    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: auto;
      grid-template-rows: auto auto;
      gap: ${theme.spacing.xxs.rem};
    }
  `}
`;

const OptionText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.gray};
    font-size: ${theme.font.sizes.s.rem};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xs.rem};
    }
  `}
`;

const OptionComponents = styled.div`
  display: flex;
  > *:first-child {
    flex: 1;
  }
  ${({ theme }) => css`
    gap: ${theme.spacing.s.rem};
    @media (max-width: ${theme.breakpoints.md}) {
      padding-bottom: ${theme.spacing.m.rem};
    }
  `}
`;

/**
 * User Settings Page for Quotly
 */
const Settings = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { discordWebhook } = useApiContext();
  const [, setCookie] = useCookies(['state']);
  const [currentTheme, setCurrentTheme] = useLocalStorage<keyof typeof themes>('theme', 'light');
  const hasWebhook = true;

  const themeItems: DropDownItem[] = [
    {
      id: 'light',
      label: (<><FontAwesomeIcon icon="sun" /> Hell</>),
      onClick: () => setCurrentTheme('light')
    },
    {
      id: 'dark',
      label: <><FontAwesomeIcon icon="moon" /> Dunkel</>,
      onClick: () => setCurrentTheme('dark')
    }
  ];

  const onClick = () => {
    const stateToken = generateToken(32);
    setCookie('state', stateToken, {
      path: '/',
      sameSite: 'strict',
      secure: true
    });
    window.location.href = `${discordWebhook}&state=${stateToken}`;
  };

  return (
    <SettingsContainer>
      <PageTitle title={t('settings')} icon="cog" isVisual />
      <OptionsContainer>
        <OptionText>
          <FontAwesomeIcon icon="palette" /> {t('Theme')}
        </OptionText>
        <OptionComponents>
          <FloatDropDown
            triggerElement={
              <Button width="100%">
                {themeItems.find(item => item.id === currentTheme)?.label}
              </Button>
            }
            dropDownItems={themeItems}
            place={PlaceOrientation.Bottom}
            margin={theme.spacing.xxs.rem}
            hasParentWidth
          />
        </OptionComponents>
        <OptionText>
          <FontAwesomeIcon icon={['fab', 'discord']} /> {t('Webhook')}
        </OptionText>
        <OptionComponents>
          {hasWebhook ? <Button width="100%" onClick={onClick}>
            {t('Webhook anlegen')}
          </Button> : <>
            <Input value='https://www.example.com/1234567890/abcdefghijklmnopqrstuvwxyz' readOnly />
            <Button width='0' btnStyle={ButtonStyles.transparent}>
              <FontAwesomeIcon icon='trash' />
            </Button>
          </>
          }
        </OptionComponents>
        <OptionText>
          <FontAwesomeIcon icon="warning" /> {t('Account löschen')}
        </OptionText>
        <OptionComponents>
          <Button width="100%" btnStyle={ButtonStyles.danger}>
            {t('quote.delete')}
          </Button>
        </OptionComponents>
      </OptionsContainer>
    </SettingsContainer>
  );
};

export default Settings;