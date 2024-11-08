import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ApiContext } from 'contexts/ApiContext/ApiContext';

import Button from 'components/Button/Button';
import { ButtonStyles } from 'components/Button/Button.type';
import GuideLinks from 'components/GuideLinks/GuideLinks';

const Style_PageContainer = styled.div`
display: grid;
grid-area: route;
grid-template-rows: 1fr auto;
`;
const Style_LoginContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto auto;

  ${({ theme }) => `
    padding: ${theme.spacing.m.rem};
    gap: ${theme.spacing.xl.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      grid-auto-flow: row;
      grid-template-columns: none;
      grid-template-rows: 1fr auto auto;
    }
  `}

  place-self: center;
`;

const Style_LinksContainer = styled.div`
  text-align: center;
  place-items: center;
`;

const Style_LeftContainer = styled.div`
  max-width: 800px;
  text-align:center;
`;

const Style_Separator = styled.div`
  width: 1px;
  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_1};

    @media (max-width: ${theme.breakpoints.md}) {
      width: unset;
      height: 1px;
    }
  `}
`;

const Style_RightContainer = styled.div`
  max-width: 400px;

  ${({ theme }) => `
    // border-left: 2px solid ${theme.colors.transparency.black(0.1)};
    border-radius: ${theme.spacing.m.rem};
  `}
  text-align:center;
  place-self: center;
`;

const Style_Title = styled.h1`
  ${({ theme }) => `
    font-size: ${theme.font.sizes.xxxl.rem};

    @media (max-width: ${theme.breakpoints.lg}) {
      font-size: ${theme.font.sizes.xl.rem};
    }
  `}
  font-weight: 400;
  letter-spacing: 1.5vw;
`;

const Style_Description = styled.h2`
  text-wrap: pretty;
  font-weight: 400;
`;

/**
 * Login page / Landing page for Quotly.
 */
const Login = () => {
  const { discordAuth } = useContext(ApiContext);
  const { t } = useTranslation();

  return (
    <Style_PageContainer>
    <Style_LoginContainer>
      <Style_LeftContainer>
        <Style_Title>Quotly</Style_Title>
        <br />
      </Style_LeftContainer>
      <Style_Separator />
      <Style_RightContainer>
        <Style_Description>A simple web app that allows you to create and share funny quotes.</Style_Description>
        <br />
        <Button href={discordAuth} style={ButtonStyles.default}>
          <FontAwesomeIcon icon={['fab', 'discord']} />
          {t('login.discord_btn')}
        </Button>
      </Style_RightContainer>
    </Style_LoginContainer>
    <Style_LinksContainer>
      <GuideLinks links={[{
        label: 'Test',
        url: ''
      }]} />
    </Style_LinksContainer>
    </Style_PageContainer>
  );
};

export default Login;
