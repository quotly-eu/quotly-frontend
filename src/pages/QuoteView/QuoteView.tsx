import React, { useContext, useEffect, useState } from 'react';
import QuoteComment from 'components/Comment/Comment';
import { CommentType } from 'components/Comment/Comment.type';
import Quote from 'components/Quote/Quote';
import { QuoteType } from 'types/Quote.type';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from 'hooks/useFetch';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import { Comment } from 'types/Comment.type';
import Button from 'components/Button/Button';
import { ButtonStyles } from 'components/Button/Button.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'components/Input/Input';

const Style_QuoteView = styled.div`
  display: flex;
  flex-direction: column;
`;

const Style_Comments = styled.div`
  ${({ theme }) => `
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
  ${({ theme }) => `
    gap: ${theme.spacing.s.rem};
    padding-bottom: ${theme.spacing.s.rem};
    margin-bottom: ${theme.spacing.s.rem};
    border-bottom: 1px solid ${theme.colors.transparency.black(0.1)};
  `}
`;

const Style_Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => `
    gap: ${theme.spacing.s.rem};
  `}
`;

const mockedComments: CommentType[] = [
  {
    id: 1,
    author: 'Jordan',
    avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
    dated: new Date(2024, 11, 21),
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
  },
  {
    id: 2,
    author: 'Jordan',
    avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
    dated: new Date(2024, 11, 21),
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
  }
];

/**
 * Page to view a specific Quote with their comments.
 */
const QuoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { routes } = useContext(ApiContext);
  const { runFetch: fetchQuote, response: quote } = useFetch<QuoteType>(routes.quotes.construct(id));
  const { runFetch: fetchComments, response: comments } = useFetch<Comment[]>(`${routes.quotes.sub?.comments(id || '')}`);
  const [ isFormActive, setIsFormActive ] = useState(false);
  const [ commentText, setCommentText ] = useState('');

  if (!id) navigate('/');
  
  useEffect(() => {
    fetchQuote();
    fetchComments();
  }, []);

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
  
  return (
    <Style_QuoteView>
      {quote?.data && <Quote {...quote.data} key={quote.data.quoteId} />}
      <Style_Comments>
        <Style_Form>
          <Input 
            as='textarea'
            placeholder='Comment...'
            name='comment'
            id='comment'
            onFocus={onFocus}
            value={commentText}
            onChange={setCommentText}
            required
          />
          {isFormActive && <Style_Actions>
            <Button 
              type='reset' 
              btnStyle={ButtonStyles.transparent}
              onClick={onCancelClick}
            >
              <FontAwesomeIcon icon='xmark' /> Cancel
            </Button>
            <Button 
              type='submit'
              btnStyle={ButtonStyles.primary}
            >
              <FontAwesomeIcon icon='plus' /> Post
            </Button>
          </Style_Actions>}
        </Style_Form>
        {mockedComments.map(comment => <QuoteComment {...comment} key={comment.id} />)}
      </Style_Comments>
    </Style_QuoteView>
  );
};

export default QuoteView;