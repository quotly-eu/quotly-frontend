import React from 'react';
import { CommentType } from './Comment.type';
import styled, { useTheme } from 'styled-components';
import ProfileButton from 'components/ProfileButton/ProfileButton';
import { useTranslation } from 'react-i18next';

const Style_CommentContainer = styled.div`
  display: grid;
  grid-template-areas:
    'avatar author'
    '_ comment'
    '_ actions'
    '_ sub';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  ${({ theme }) => `
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
  ${({ theme }) => `
    color: ${theme.colors.text.gray};
  `}
  justify-content: center;
`;

const Style_Comment = styled.div`
  grid-area: comment;
`;

const Style_SubComments = styled.div`
  grid-area: sub;
`;

/**
 * Display a Quote's comment with their possible sub comments
 */
const QuoteComment = ({author, avatarUrl, comment, dated, level, children}:CommentType) => {
  const { i18n: { language } } = useTranslation();
  const theme = useTheme();

  return (
    <Style_CommentContainer>
      <Style_Avatar>
        <ProfileButton
          src={avatarUrl}
          size={theme.spacing.l.rem}
        />
      </Style_Avatar>
      <Style_Author>
        <span>{author}</span>
        <span>{dated.toLocaleDateString(language, {
          dateStyle: 'long'
        })}</span>
      </Style_Author>
      <Style_Comment>
        {comment}
      </Style_Comment>
      {children && 
        <Style_SubComments>
          {children.map(child => <QuoteComment level={(level || 0) + 1} {...child} />)}
        </Style_SubComments>
      }
    </Style_CommentContainer>
  );
};

export default QuoteComment;