import React from 'react';
import styled from 'styled-components';
import { FeedType } from './Feed.type';
import { Link } from 'react-router-dom';

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => `
    gap: ${theme.spacing.xxs.rem};
    padding: ${theme.spacing.m.rem};
    border-radius: ${theme.spacing.s.rem};
    background-color: ${theme.colors.accent_white_0};
  `}
`;

const FeedItem = styled(Link)`
  display: flex;
  ${({ theme }) => `
    color: ${theme.colors.text.gray};
    gap: ${theme.spacing.xs.rem};
    padding: ${theme.spacing.xs.rem};

    border-radius: ${theme.spacing.xs.rem};

    transition: backdrop-filter ${theme.transition.times.m};
  `}
  * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    backdrop-filter: brightness(1.075);
  }
`;

/**
 * Feed component for e.g. displaying top posts or random users.
 */
const Feed = ({title, items}:FeedType) => {
  return (
    <FeedContainer>
      {title && <h2>{title}</h2>}
      {items.map((item, index) => (
        <FeedItem key={index} to={item.url}>
          {item.item}
        </FeedItem>
      ))}
    </FeedContainer>
  );
};

export default Feed;