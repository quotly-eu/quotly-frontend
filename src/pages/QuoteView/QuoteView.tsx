import QuoteComment from 'components/Comment/Comment';
import { CommentType } from 'components/Comment/Comment.type';
import Quote from 'components/Quote/Quote';
import { QuoteType } from 'components/Quote/Quote.type';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const quote: QuoteType = {
  quote: {
    id: '1',
    text: '**Hello World:** Test 123',
    url: '/',
    dated: new Date(2024, 11, 21)
  },
  author: {
    name: 'Jordan',
    avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
    url: '/'
  }
};

const comments: CommentType[] = [
  {
    author: 'Jordan',
    avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
    dated: new Date(2024, 11, 21),
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
    children: [
      {
        author: 'Jordan',
        avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
        dated: new Date(2024, 11, 21),
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
      },
      {
        author: 'Daniel',
        avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=1',
        dated: new Date(2024, 11, 21),
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
        children: [
          {
            author: 'Daniel',
            avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=1',
            dated: new Date(2024, 11, 21),
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
          }
        ]
      }
    ]
  },
  {
    author: 'Jordan',
    avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
    dated: new Date(2024, 11, 21),
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
    children: [
      {
        author: 'Jordan',
        avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=female&seed=1',
        dated: new Date(2024, 11, 21),
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
      },
      {
        author: 'Daniel',
        avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male&seed=1',
        dated: new Date(2024, 11, 21),
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis corporis libero soluta numquam possimus.',
      }
    ]
  }
];

/**
 * Page to view a specific Quote with their comments.
 */
const QuoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) navigate('/');

  return (
    <Style_QuoteView>
      <Quote {...quote} />
      <Style_Comments>
        {comments.map(comment => <QuoteComment {...comment} />)}
      </Style_Comments>
    </Style_QuoteView>
  );
};

export default QuoteView;