import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Markdown from 'react-markdown';
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button/Button';
import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
import ButtonPalette from 'components/ButtonPalette/ButtonPalette';
import Badge from 'components/Badge/Badge';

import { PlaceOrientation } from 'types/placeOrientation.type';
import { ButtonStyles } from 'components/Button/Button.type';
import { BadgeStyles } from 'components/Badge/Badge.type';
import { QuoteType } from 'types/Quote.type';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useFetch from 'hooks/useFetch';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import { useCookies } from 'react-cookie';
import { ApiResponse } from 'types/ApiResponse.type';
import { Role } from 'types/Role.type';
import { User } from 'types/User.type';
import { Reaction } from 'types/Reaction.type';


// Styles
const Style_Badge = styled(Badge)`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxs.rem};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xxxs.rem};
    }
  `}
`;

const QuoteContainer = styled.div`
  display: grid;
  grid-template-areas:
    'text actions'
    'author actions';
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;

  ${({ theme }) => css`
    background-color: ${theme.colors.accent_white_0};
    color: ${theme.colors.text.dark};

    padding: ${theme.spacing.m.rem};
    gap: ${theme.spacing.s.rem};

    font-size: ${theme.font.sizes.s.rem};
    border-radius: ${theme.spacing.s.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xs.rem};
      padding: ${theme.spacing.xs.rem};
    }
  `}

  text-decoration: none;
  text-align: center;
`;

const Style_Markdown = styled(Link)`
  display: flex;
  grid-area: text;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => css`
    color: ${theme.colors.text.dark};

    padding: ${theme.spacing.s.rem};
    border-radius: ${theme.spacing.xxs.rem};

    &:hover {
      backdrop-filter: brightness(1.05);
    }

    transition: backdrop-filter ${theme.transition.times.s} ease-in-out;
  `}

  text-wrap: balance;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

const Author = styled(Link)`
  display: flex;
  grid-area: author;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => css`
    color: ${theme.colors.text.gray};

    padding: ${theme.spacing.xxs.rem} ${theme.spacing.xs.rem};
    gap: ${theme.spacing.xxxs.rem};
    border-radius: ${theme.spacing.xxs.rem};
    font-size: ${theme.font.sizes.xxs.rem};

    &:hover {
      backdrop-filter: brightness(1.05);
    }

    transition: backdrop-filter ${theme.transition.times.s} ease-in-out;

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xxxs.rem};
    }
  `}

  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  height: 2em;

  border-radius: 100vmax;
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: flex-end;
  align-items: flex-start;

  ${({ theme }) => css`
    gap: ${theme.spacing.xxs.rem};
    @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: column;
      justify-content: flex-start;
    }
  `}
`;

const Style_Icon = styled(Icon).attrs({ mode: 'bg', width: '80%', height: '80%' })``;

const Style_Button = styled(Button)<{ $hasReacted?: boolean, $style?: ButtonStyles }>`
  position: relative;

  ${({
    $hasReacted,
    $style,
    theme
  }) => $style == ButtonStyles.default && ($hasReacted !== undefined && !$hasReacted && css`
    backdrop-filter: brightness(0.925) blur(5px);

    box-shadow: inset ${theme.shadows.default};
  `)}

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.xxs.rem};
      width: ${theme.spacing.xl.rem};
      height: ${theme.spacing.xl.rem};
    }
  `}
`;

/**
 * Quote Component, the main component for the Quotly page
 */
const Quote = ({
  quote,
  quoteId,
  createdAt,
  user,
  userRoles,
  userResponse,
  reactions,
  isSaved,
  reaction: reactedReaction,
  isLast
}: QuoteType & {
  isLast?: boolean;
  userRoles?: ApiResponse<Role[]>;
  userResponse?: ApiResponse<User>;
}) => {
  const { t, i18n: { language } } = useTranslation();
  const { routes } = useContext(ApiContext);
  const [ cookies ] = useCookies([ 'token' ]);
  const [ saved, setSaved ] = useState(isSaved);
  const [ isPaletteOpen, setIsPaletteOpen ] = useState(false);
  const [ reactionName, setReactionName ] = useState<Reaction['reactionName'] | ''>('');
  const [ newReaction, setNewReaction ] = useState<typeof reactedReaction | ''>(reactedReaction);
  const {
    runFetch: fetchPostSave,
    response: postSaved
  } = useFetch<boolean>(`${routes.quotes.sub?.toggleSave(quoteId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token: cookies.token
    })
  });
  const {
    runFetch: fetchPostReact,
    response: postReacted
  } = useFetch<boolean>(`${routes.quotes.sub?.toggleReact(quoteId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token: cookies.token,
      reaction_name: reactionName
    })
  });
  const {
    runFetch: fetchPostDelete,
    response: postDelete
  } = useFetch<boolean>(`${routes.quotes.sub?.delete(quoteId)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token: cookies.token
    })
  });

  const quoteUrl = `/quote/${quoteId}`;
  const userUrl = `/user/${user.userId}`;
  const userAvatarUrl = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatarUrl}`;

  const isAdmin = userRoles && userRoles.data.find(role => role.name === 'admin');
  const isAuthor = userResponse && userResponse.data.userId === user.userId;
  const greatestReaction = reactions?.concat().sort((a, b) => (b.count ?? 0) - (a.count ?? 0))[0].reactionName;
  const sumOfReactions = reactions?.reduce((acc, reaction) => acc + (reaction.count || 0), 0);

  const quoteOptions = [
    {
      id: 'save',
      label: (<>
        <FontAwesomeIcon icon={[ saved ? 'fas' : 'far', 'bookmark' ]} />{saved ? t('quote.saved') : t('quote.save')}
      </>),
      onClick: () => {
        fetchPostSave();
      }
    },
    {
      id: 'share',
      label: (<><FontAwesomeIcon icon="share" /> {t('quote.share')}</>),
      onClick: () => {
        console.log(t('quote.share'));
      }
    },
    {
      id: 'delete',
      label: (<><FontAwesomeIcon icon="trash" /> {t('quote.delete')}</>),
      onClick: () => {
        fetchPostDelete();
      }
    }
  ];

  const abbreviateNumber = (value: number) => {
    let newValue = value;
    let suffix = '';
    if (value >= 1000) {
      suffix = 'K';
      newValue = value / 1000;
    }
    if (value >= 1000000) {
      suffix = 'M';
      newValue = value / 1000000;
    }
    if (value >= 1000000000) {
      suffix = 'B';
      newValue = value / 1000000000;
    }
    if (value >= 1000000000000) {
      suffix = 'T';
      newValue = value / 1000000000000;
    }
    return newValue.toFixed(0) + suffix;
  };

  /**
   * Update the saved state
   */
  useEffect(() => {
    if (!isSaved) return;
    setSaved(isSaved);
  }, [ isSaved ]);

  useEffect(() => {
    if (!postSaved) return;
    setSaved(postSaved.data);
  }, [ postSaved ]);

  useEffect(() => {
    quoteOptions[quoteOptions.findIndex(item => item.id === 'save')].label = (<>
      <FontAwesomeIcon icon={[ saved ? 'fas' : 'far', 'bookmark' ]} /> {saved ? t('quote.saved') : t('quote.save')}
    </>);
  }, [ saved ]);

  /**
   * Redirect to the main page after deleting the quote
   */
  useEffect(() => {
    if (!postDelete) return;
    window.location.pathname = '/';
  }, [ postDelete ]);

  /**
   * Toggle the reaction on the quote
   */
  useEffect(() => {
    if (!reactionName) return;
    setIsPaletteOpen(false);
    fetchPostReact();
  }, [ reactionName ]);

  /**
   * Update the reaction state
   */
  useEffect(() => {
    if (!postReacted) return;
    setNewReaction(newReaction !== reactionName && reactionName !== '' ? reactionName : '');
    setReactionName('');
  }, [ postReacted ]);

  const renderText = () => (
    <Style_Markdown to={quoteUrl} children={<Markdown children={quote} />} />
  );

  const renderAuthor = () => (
    <Author to={userUrl}>
      {user.avatarUrl && <Avatar src={userAvatarUrl} alt={user.displayName} />}
      {user.displayName} • {new Date(createdAt).toLocaleDateString(language, { dateStyle: 'long' })}
    </Author>
  );

  const renderReaction = (reaction: Reaction) => {
    const isSameReaction = newReaction === reaction.reactionName;
    const isNewReactionEmpty = newReaction === '';
    const isReactedReaction = reactedReaction === reaction.reactionName;
    return (
      <>
        <Style_Icon icon={'fluent-emoji:' + reaction.reactionName} />
        <Style_Badge
          children={abbreviateNumber(
            reaction.count + (
              isNewReactionEmpty && isReactedReaction ? -1 :
                isSameReaction && isReactedReaction ? 0 :
                  newReaction !== undefined && isReactedReaction && !isSameReaction ? -1 :
                    isSameReaction && !isNewReactionEmpty ? 1 :
                      isNewReactionEmpty && isReactedReaction ? -1 : 0
            )
          )}
          place={{
            place: PlaceOrientation.Bottom,
            margin: '-75%'
          }}
          badgeStyle={BadgeStyles.transparent}
        />
      </>
    );
  };

  const renderButtonPalette = (place?: PlaceOrientation, startMargin?: string) => {
    const count = (sumOfReactions || 0) + (newReaction && reactedReaction && newReaction !== reactedReaction ? -1 : 0);
    console.log(count, newReaction);
    return (
      <ButtonPalette
        triggerElement={
          <Style_Button
            $hasReacted={(newReaction || reactedReaction) && newReaction !== ''}
            children={renderReaction({
              reactionName: (
                newReaction !== '' ? newReaction || reactedReaction || greatestReaction || 'red-heart' :
                  greatestReaction || 'red-heart'
              ),
              count
            })}
            $style={ButtonStyles.default}
            isIconButton
          />
        }
        buttons={
          reactions?.map((reaction, index) => (
            <Style_Button
              key={index}
              btnStyle={ButtonStyles.transparent}
              children={renderReaction(reaction)}
              onClick={() => {
                setReactionName('');
                setReactionName(reaction.reactionName);
              }}
              isIconButton
            />
          )) || []
        }
        isOpen={isPaletteOpen}
        setIsOpen={setIsPaletteOpen}
        place={place}
        startMargin={startMargin}
      />
    );
  };


  const renderActions = () => (
    <Actions>
      <FloatDropDown
        triggerElement={
          <Style_Button isIconButton btnStyle={ButtonStyles.transparent}>
            <FontAwesomeIcon icon="ellipsis" />
          </Style_Button>
        }
        dropDownItems={quoteOptions.filter(option => {
          if (option.id === 'delete') return isAdmin || isAuthor;
          return true;
        })}
        place={isLast ? PlaceOrientation.InsetBottomRight : PlaceOrientation.InsetTopRight}
        margin={'0px'}
      />
      {renderButtonPalette(PlaceOrientation.InsetRight, '25px')}
    </Actions>
  );

  return (
    <QuoteContainer>
      {renderText()}
      {renderAuthor()}
      {renderActions()}
    </QuoteContainer>
  );
};

export default Quote;