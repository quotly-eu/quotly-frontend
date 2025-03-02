import React from 'react';
import { CommentType } from './Comment.type';
import styled, { css, useTheme } from 'styled-components';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import { useTranslation } from 'react-i18next';

const Style_CommentContainer = styled.div`
  display: grid;
  grid-template-areas:
    'avatar author'
    'guidance comment'
    'guidance actions'
    'guidance sub';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  ${({ theme }) => css`
    background: linear-gradient(135deg, ${theme.colors.accent_white_0}, transparent 50px);
    padding: ${theme.spacing.xxs.rem};
    border-radius: ${theme.spacing.m.rem};
    row-gap: ${theme.spacing.xs.rem};
    column-gap: ${theme.spacing.s.rem};
  `}
`;

const Style_Avatar = styled.div`
  display: flex;
  grid-area: avatar;
  align-items: center;
`;

const Style_Author = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: author;
  ${({ theme }) => css`
    color: ${theme.colors.text.gray};
  `}
  justify-content: center;
`;

const Style_Comment = styled.div`
  grid-area: comment;
  overflow-wrap: anywhere;
`;

const Style_SubComments = styled.div`
  position: relative;
  grid-area: sub;
`;

const Style_Guidance = styled.div`
  ${({ theme }) => css`
    border-left: 1px solid ${theme.colors.transparency.black(0.2)};
    margin-bottom: ${theme.spacing.xs.rem};
  `}
  width: 1px;
  grid-area: guidance;
  justify-self: center;
`;

const Style_GuidanceCorner = styled.div`
  grid-area: avatar;
  position: absolute;
  ${({ theme }) => css`
    width: ${theme.spacing.m.em};
    height: ${theme.spacing.s.em};
    margin-top: ${theme.spacing.xxs.em};
    left: calc(-${theme.spacing.l.em});
    border-bottom: solid;
    border-left: solid;
    border-width: 1px;
    border-color: ${theme.colors.transparency.black(0.2)};
    border-radius: 0 0 0 ${theme.spacing.s.em};
  `}
`;

/**
 * Display a Quote's comment with their possible sub comments
 */
const QuoteComment = ({ author, avatarUrl, comment, dated, level, children }: CommentType) => {
  const { i18n: { language } } = useTranslation();
  const theme = useTheme();

  return (
    <Style_CommentContainer>
      {level && <Style_GuidanceCorner />}
      <Style_Avatar>
        <ProfileButton
          src={avatarUrl}
          size={theme.spacing.l.rem}
        />
      </Style_Avatar>
      <Style_Author>
        <span>{author}</span>
        <span>
          {dated.toLocaleDateString(language, {
            dateStyle: 'long'
          })}
        </span>
      </Style_Author>
      <Style_Comment>
        {comment}
      </Style_Comment>
      {children &&
        <>
          <Style_Guidance />
          <Style_SubComments>
            {children.map(child => <QuoteComment level={(level || 0) + 1} {...child} />)}
          </Style_SubComments>
        </>
      }
    </Style_CommentContainer>
  );
};

export default QuoteComment;