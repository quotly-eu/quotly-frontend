import React from 'react';

import styled, { css } from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import Markdown, { ExtraProps } from 'react-markdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitle from 'components/PageTitle/PageTitle';
import { HashLink } from 'react-router-hash-link';

import Button from 'components/Button/Button';

import { MarkdownPageType } from './MarkdownPage.type';

const Style_MarkdownPage = styled.div`
  width: 100%;
  max-width: 1000px;
  ${({ theme }) => `
    padding: ${theme.spacing.xl.rem};
  `}
  scroll-behavior: smooth;
  place-self: center;
`;

const CSS_HeadingFirst = css`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.xxs.em};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.1)};
    margin-block: ${theme.spacing.s.em} ${theme.spacing.xxs.em};
    &:first-child {
      margin-block-start: 0;
    }
  `}
`;

const CSS_HeadingSecond = css`
  ${CSS_HeadingFirst}
  border-bottom: none;
  padding-bottom: 0;
`;

const Style_HeadingFirst = styled.h1`
  ${CSS_HeadingFirst}
`;

const Style_HeadingSecond = styled.h3`
  ${CSS_HeadingSecond}
`;

const Style_HeadingH4 = styled.h4`
  ${CSS_HeadingSecond}
`;

const Style_TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Style_Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CSS_TableCell = css`
  ${({ theme }) => css`
    padding: ${theme.spacing.xxs.em};
    border-left: 1px solid ${theme.colors.transparency.black(0.1)};
    &:first-child {
      border-left: none;
    }
  `}
`;

const Style_TableTH = styled.th`
  ${CSS_TableCell}
`;

const Style_TableTD = styled.td`
  ${CSS_TableCell}
`;

const Style_TableTBody = styled.tbody`
  ${({ theme }) => css`
    tr {
      border-top: 1px solid ${theme.colors.transparency.black(0.1)};
    }
  `}
`;

const Style_Link = styled(HashLink)`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    text-decoration: none;
  `}
`;

const Style_P = styled.p`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.xxs.em};
  `}
`;

const Style_UL = styled(Style_P).attrs({as: 'ul'})`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.xxs.em};
  `}
`;

const Style_HR = styled.hr`
  border:none;
  ${({ theme }) => css`
    margin-block: ${theme.spacing.xxs.em};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.1)}; 
  `}
`;

/**
 * Build a Page that only consists of Markdown.
 */
const MarkdownPage = ({children, childrenPre, childrenSuf, title, maxDepth= 3, ...rest}: MarkdownPageType) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const returnOnClick = () => navigate(-1);

  const HeadingRenderer = ({node, children}: React.JSX.IntrinsicElements['h1' | 'h2' | 'h3'] & ExtraProps) => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const id = children?.toString()
      .toLowerCase()
      .replace(/[^\w\säöü-]/g, "")
      .replace(/\s+/g, "-");
    const Heading = 
      node?.tagName =='h3' ? 
      <Style_HeadingSecond id={id}>{children}</Style_HeadingSecond> : 
      <Style_HeadingFirst as={node?.tagName} id={id}>{children}</Style_HeadingFirst>;

    return Heading;
  };

  const TableRenderer = ({children}: React.JSX.IntrinsicElements['table'] & ExtraProps) => {
    return (
      <Style_TableContainer>
        <Style_Table>
          {children}
        </Style_Table>
      </Style_TableContainer>
    );
  };

  const AnchorRenderer = ({children, href}: React.JSX.IntrinsicElements['a'] & ExtraProps) => {
    const to = decodeURIComponent(href || '');
    const replace = to.startsWith('#');
    return <Style_Link to={to} replace={replace}>{children}</Style_Link>;
  };

  return (
    <Style_MarkdownPage>
      <PageTitle title={title} />
      <Button isIconButton onClick={returnOnClick}><FontAwesomeIcon icon='arrow-left' /></Button>
      {childrenPre}
      <Markdown 
        {...rest} 
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: Style_HeadingH4,
          table: TableRenderer,
          tbody: Style_TableTBody,
          th: Style_TableTH,
          td: Style_TableTD,
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
              maxDepth: maxDepth,
              heading: t('markdown.table_of_contents'),
            }
          ]
        ]}
      >
        {children}
      </Markdown>
      {childrenSuf}
    </Style_MarkdownPage>
  );
};

export default MarkdownPage;
