import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { CSS_Link } from 'utils/stylingTemplates';

import { GuideLinksType } from './GuideLinks.type';

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

const Style_GuideLink = styled(Link)`
  ${CSS_Link}
`;

const Style_GuideText = styled.p`
  ${CSS_Link}
`;

/**
 * GuideLinks component for e.g. displaying custom links for privacy policy or terms of service.
 * 
 */
const GuideLinks = ({links, textAlign='left'}:GuideLinksType) => {
  return (
    <Style_GuideLinksContainer $textAlign={textAlign}>
      {links.map((link, index) => {
        const { url, label } = link;

        if (url) return <Style_GuideLink key={index} to={url}>{label}</Style_GuideLink>;
        else return <Style_GuideText key={index}>{label}</Style_GuideText>;
      })}
    </Style_GuideLinksContainer>
  );
};

export default GuideLinks;