import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type PageTitleProps = {
  title?: string;
  altTitle?: string;
  icon?: IconProp;
  prefix?: string;
  isVisual?: boolean;
};

const PageTitleContainer = styled.h1`
  display: flex;

  ${({ theme }) => css`
    color: ${theme.colors.text.dark};
    background: ${theme.colors.accent_white_0};
    gap: ${theme.spacing.xs.rem};
    padding: ${theme.spacing.m.rem};
    border-radius: ${theme.spacing.s.rem};
    box-shadow: ${theme.shadows.default};
    align-items: center;
    @media (max-width: ${theme.breakpoints.md}) {
      justify-content: center;
    }
  `}
`;

/**
 * Allow to easily change the current document title with a component
 * @param title
 * @param altTitle - Alternative title for visual representation
 * @param icon - Icon to display in front of the title
 * @param prefix
 * @param isVisual
 */
const PageTitle = ({ title, altTitle, icon, prefix, isVisual = false }: PageTitleProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${prefix ?? t('quotly')}${title ? (' - ' + title) : ''}`;
  }, [location, prefix, t, title]);

  return isVisual ? (
    <PageTitleContainer>
      <FontAwesomeIcon icon={icon || 'home'} />{altTitle || title}
    </PageTitleContainer>
  ) : <></>;
};

export default PageTitle;