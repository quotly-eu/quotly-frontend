import React from 'react';
import { GuideLinksType } from './GuideLinks.type';
import styled from 'styled-components';

const GuideLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({theme}) => `
    gap: ${theme.spacing.xs.rem};
    padding-inline: ${theme.spacing.xs.rem};
  `}
`;

const GuideLink = styled.a`
  ${({theme}) => `
    color: ${theme.colors.text.gray};
    transition: color ${theme.transition.times.m};
    &[href] {
      cursor: pointer;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
  text-decoration: none;
`;

/**
 * GuideLinks component for e.g. displaying custom links for privacy policy or terms of service.
 * 
 */
const GuideLinks = ({links}:GuideLinksType) => {
  return (
    <GuideLinksContainer>
      {links.map((link, index) => (
          <GuideLink key={index} href={link.url}>{link.label}</GuideLink>
        ))}
    </GuideLinksContainer>
  );
};

export default GuideLinks;