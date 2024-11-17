import React from 'react';
import { MarkdownPageType } from './MarkdownPage.type';
import Markdown, { ExtraProps } from 'react-markdown';
import styled from 'styled-components';
import PageTitle from 'components/PageTitle/PageTitle';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';

const Style_MarkdownPage = styled.div`
  grid-area: route;
  max-width: 1000px;
  ${({ theme }) => `
    padding: ${theme.spacing.xl.rem};
  `}
  scroll-behavior: smooth;
  place-self: center;
`;

const Style_HeadingFirst = styled.h1`
  ${({ theme }) => `
    padding-bottom: ${theme.spacing.xxs.em};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.1)};
    margin-block: ${theme.spacing.s.em} ${theme.spacing.xxs.em};
    &:first-child {
      margin-block-start: 0;
    }
  `}
`;

const Style_HeadingSecond = styled(Style_HeadingFirst).attrs({as: 'h3'})`
  border-bottom: none;
  padding-bottom: 0;
`;

const Style_HeadingH4 = styled(Style_HeadingSecond).attrs({as: 'h4'})``;

const Style_Link = styled(HashLink)`
  ${({ theme }) => `
    color: ${theme.colors.primary};
    text-decoration: none;
  `}
`;

const Style_P = styled.p`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing.xxs.em};
  `}
`;

const Style_UL = styled(Style_P).attrs({as: 'ul'})`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing.xxs.em};
  `}
`;

const Style_HR = styled.hr`
  border:none;
  ${({ theme }) => `
    margin-block: ${theme.spacing.xxs.em};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.1)}; 
  `}
`;

/**
 * Build a Page that only consists of Markdown.
 */
const MarkdownPage = ({children, title, ...rest}: MarkdownPageType) => {
  const { t } = useTranslation();

  const HeadingRenderer = ({node, children}: JSX.IntrinsicElements['h1' | 'h2' | 'h3'] & ExtraProps) => {
    const id = children?.toString()
      .toLowerCase()
      .replace(/[^\w\säöü-]/g, "")
      .replace(/\s+/g, "-");
    const Heading = 
      node?.tagName =='h3' ? 
      <Style_HeadingSecond id={id} children={children} /> : 
      <Style_HeadingFirst as={node?.tagName} id={id} children={children} />;

    return Heading;
  };

  const AnchorRenderer = ({children, href}: JSX.IntrinsicElements['a'] & ExtraProps) => {
    const to = decodeURIComponent(href || '');
    return <Style_Link children={children} to={to} replace />;
  };

  return (
    <Style_MarkdownPage>
      <PageTitle title={title} />
      <Markdown 
        children={children} {...rest} 
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: Style_HeadingH4,
          p: Style_P,
          a: AnchorRenderer,
          ul: Style_UL,
          hr: Style_HR
        }}
        remarkPlugins={[
          [remarkGfm],
          [
            remarkToc, 
            {
              tight: true,
              maxDepth: 3, 
              heading: t('markdown.table_of_contents'),
            }
          ]
        ]}
      />
    </Style_MarkdownPage>
  );
};

export default MarkdownPage;
