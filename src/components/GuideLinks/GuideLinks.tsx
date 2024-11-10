import React from 'react';
import { GuideLinksType } from './GuideLinks.type';
import styled from 'styled-components';
import { Style_Link } from 'utils/stylingTemplates';

interface GuideLinksContainerProps {
  $textAlign: 'left' | 'center' | 'right';
}

const Style_GuideLinksContainer = styled.div<GuideLinksContainerProps>`
  display: flex;
  flex-wrap: wrap;
  ${({theme, $textAlign}) => `
    column-gap: ${theme.spacing.xs.rem};
    padding-inline: ${theme.spacing.xs.rem};
    justify-content: ${$textAlign};
  `}
`;

const Style_GuideLink = styled.a`
  ${Style_Link}
`;

/**
 * GuideLinks component for e.g. displaying custom links for privacy policy or terms of service.
 * 
 */
const GuideLinks = ({links, textAlign='left'}:GuideLinksType) => {
  return (
    <Style_GuideLinksContainer $textAlign={textAlign}>
      {links.map((link, index) => (
          <Style_GuideLink key={index} href={link.url}>{link.label}</Style_GuideLink>
        ))}
    </Style_GuideLinksContainer>
  );
};

export default GuideLinks;