import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import useFetch from 'hooks/useFetch';
import { useApiContext } from 'contexts/ApiContext/ApiContext';

import QuoteComment from 'components/Comment/Comment';
import Quote from 'components/Quote/Quote';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';

import { Comment } from 'types/Comment.type';
import { ButtonStyles } from 'components/Button/Button.type';
import { CommentType } from 'components/Comment/Comment.type';
import { QuoteType } from 'types/Quote.type';
import PageTitle from 'components/PageTitle/PageTitle';

const Style_QuoteView = styled.div`
  display: flex;
  flex-direction: column;
`;

const Style_Comments = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.transparency.white(0.5)};
    padding: ${theme.spacing.s.rem};
    margin-inline: ${theme.spacing.s.rem};
    border-radius: 0 0 ${theme.spacing.s.em} ${theme.spacing.s.em};
    box-shadow: inset 0 10px 5px -5px ${theme.colors.accent_success_0}2c;
  `}
`;

const Style_Form = styled.form`
  display: flex;
  flex-direction: column;
  ${({ theme }) => css`
    gap: ${theme.spacing.s.rem};
    padding-bottom: ${theme.spacing.s.rem};
    margin-bottom: ${theme.spacing.s.rem};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.075)};
  `}
`;

const Style_Actions = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  ${({ theme }) => css`
    gap: ${theme.spacing.s.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      justify-content: space-evenly;
    }
  `}
`;

const Style_Button = styled(Button)`
  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xs.rem};
    }
  `}
`;

/**
 * Page to view a specific Quote with their comments.
 */
const QuoteView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { routes } = useApiContext();
  const [ cookies ] = useCookies([ 'token' ]);
  const navigate = useNavigate();

  const [ isFormActive, setIsFormActive ] = useState(false);
  const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(false);
  const [ commentText, setCommentText ] = useState('');
  const constructorQuote = !cookies.token ?
    routes.quotes.construct(id || '') :
    `${routes.quotes.construct(id || '')}?token=${cookies.token}`;

  const { runFetch: fetchQuote, response: quote } = useFetch<QuoteType>(constructorQuote);
  const {
    runFetch: fetchComments,
    response: comments
  } = useFetch<Comment[]>(`${routes.quotes.sub?.comments(id || '')}`);
  const { runFetch: fetchPostComment, response } = useFetch<Comment>(`${routes.quotes.sub?.createComment(id || '')}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      comment: commentText,
      token: cookies.token
    })
  });

  if (!id) navigate('/');
  if (quote?.status === 404) navigate('/404', { replace: true });

  useEffect(() => {
    fetchQuote();
    fetchComments();
  }, []);

  useEffect(() => {
    if (!response) return;
    fetchComments();

    setIsFormActive(false);
    setCommentText('');
    setIsSubmitDisabled(false);
  }, [ response ]);

  const formattedComments: CommentType[] = comments?.data.map(({ commentId, comment, createdAt, user }) => {
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatarUrl}`;

    return {
      id: commentId,
      author: user.displayName,
      avatarUrl,
      dated: new Date(createdAt),
      comment
    };
  }) || [];

  const onFocus = () => setIsFormActive(true);

  const onCancelClick = () => {
    setCommentText('');
    setIsFormActive(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    fetchPostComment();
  };

  return (
    <Style_QuoteView>
      {quote?.data && <PageTitle title={quote.data.quote} />}
      {quote?.data && <Quote
        {...quote.data}
        key={quote.data.quoteId}
      />}
      <Style_Comments>
        <Style_Form onSubmit={onSubmit}>
          <Input
            as="textarea"
            placeholder={`${t('quote.comment')}...`}
            name="comment"
            id="comment"
            onFocus={onFocus}
            value={commentText}
            onChange={setCommentText}
            maxLength={1024}
            required
          />
          {isFormActive && <Style_Actions>
            <Style_Button
              type="reset"
              btnStyle={ButtonStyles.transparent}
              onClick={onCancelClick}
            >
              <FontAwesomeIcon icon="xmark" /> {t('quote.cancel')}
            </Style_Button>
            <Style_Button
              type="submit"
              btnStyle={ButtonStyles.primary}
              disabled={isSubmitDisabled}
            >
              <FontAwesomeIcon icon="comment" /> {t('quote.comment')}
            </Style_Button>
          </Style_Actions>}
        </Style_Form>
        {formattedComments.map(comment => <QuoteComment {...comment} key={comment.id} />)}
      </Style_Comments>
    </Style_QuoteView>
  );
};

export default QuoteView;