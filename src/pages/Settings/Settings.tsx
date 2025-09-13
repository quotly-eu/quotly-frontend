import React, { useRef } from 'react';
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
import Dialog from '../../components/Dialog/Dialog';
import { $api } from 'utils/api';
import useGetToken from 'hooks/useGetToken';
import { components } from 'types/api';

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

const DialogContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  ${({ theme }) => css`
    padding: ${theme.spacing.m.rem};
    gap: ${theme.spacing.m.rem};
  `}
`;

/**
 * User Settings Page for Quotly
 */
const Settings = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { discordWebhook } = useApiContext();
  const [, setCookie] = useCookies(['token', 'state']);
  const token = useGetToken()!;
  const [currentTheme, setCurrentTheme] = useLocalStorage<keyof typeof themes>('theme', 'light');

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { refetch: fetchWebhooks, data: webhooks } = $api.useQuery('get', '/v1/users/me/webhooks', {
    params: {
      query: {
        token
      }
    }
  });
  const { mutate: mutateDeleteWebhook } = $api.useMutation('delete', '/v1/users/webhook', {
    onSuccess: () => fetchWebhooks()
  });
  const { mutate: mutateDeleteAccount } = $api.useMutation('delete', '/v1/users/me/delete', {
    onSuccess: () => { window.location.pathname = '/' }
  });

  const themeItems: DropDownItem[] = [
    {
      id: 'light',
      label: (<><FontAwesomeIcon icon="sun" /> {t('light')}</>),
      onClick: () => setCurrentTheme('light')
    },
    {
      id: 'dark',
      label: <><FontAwesomeIcon icon="moon" /> {t('dark')}</>,
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

  const onDeleteWebhookClick = (id: components['schemas']['Webhook']['id']) => {
    mutateDeleteWebhook({ body: { token, id: id! } });
  }
  const onDeleteAccountClick = () => {
    mutateDeleteAccount({ body: { token } });
  }

  const toggleDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
    }
  };

  return (
    <SettingsContainer>
      <PageTitle title={t('settings')} icon="cog" isVisual />
      <OptionsContainer>
        <OptionText>
          <FontAwesomeIcon icon="palette" /> {t('theme')}
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
          <FontAwesomeIcon icon={['fab', 'discord']} /> {t('webhook')}
        </OptionText>
        <OptionComponents>
          {webhooks && (webhooks.length > 0 ? webhooks.map(webhook => (<>
            <Input value={`https://discord.com/api/v10/webhooks/${webhook.webhookId}/${webhook.webhookToken}`} readOnly />
            <Button width='0' btnStyle={ButtonStyles.transparent} onClick={() => onDeleteWebhookClick(webhook.id)}>
              <FontAwesomeIcon icon='trash' />
            </Button>
          </>)) : <Button width="100%" onClick={onClick}>
            {t('create_webhook')}
          </Button>)
          }
        </OptionComponents>
        <OptionText>
          <FontAwesomeIcon icon="warning" /> {t('delete_account')}
        </OptionText>
        <OptionComponents>
          <Button width="100%" btnStyle={ButtonStyles.danger} onClick={toggleDialog}>
            {t('quote.delete')}
          </Button>
          <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
            <DialogContainer>
              <Button onClick={toggleDialog}>
                <FontAwesomeIcon icon='xmark' /> {t('quote.cancel')}
              </Button>
              <Button btnStyle={ButtonStyles.danger} onClick={onDeleteAccountClick}>
                <FontAwesomeIcon icon='trash' /> {t('quote.delete')}
              </Button>
            </DialogContainer>
          </Dialog>
        </OptionComponents>
      </OptionsContainer>
    </SettingsContainer>
  );
};

export default Settings;