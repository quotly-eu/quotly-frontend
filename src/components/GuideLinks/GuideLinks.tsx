import React from 'react';
import { GuideLinksType } from './GuideLinks.type';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GuideLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({theme}) => `
    gap: ${theme.spacing.xs.rem};
    padding-inline: ${theme.spacing.xs.rem};
  `}
`;

const GuideLink = styled(Link)`
  ${({theme}) => `
    color: ${theme.colors.text.gray};
  `}
  text-decoration: none;
  cursor: pointer;
`;

/**
 * GuideLinks component for e.g. displaying custom links for privacy policy or terms of service.
 * 
 */
const GuideLinks = ({links}:GuideLinksType) => {
  return (
    <GuideLinksContainer>
      {links.map((link, index) => (
        <GuideLink key={index} to={link.url}>{link.label}</GuideLink>
      ))}
    </GuideLinksContainer>
  );
};

export default GuideLinks;