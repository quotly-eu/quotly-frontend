import React, { useEffect, useState } from 'react';
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
import { Reaction } from 'types/Reaction.type';
import { useAppData } from '../../contexts/AppData/AppData';
import { $api } from 'utils/api';
import useGetToken from 'hooks/useGetToken';


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
  flex-direction: column;
  grid-area: text;
  -webkit-tap-highlight-color: transparent;

  ${({ theme }) => css`
    color: ${theme.colors.text.dark};

    padding: ${theme.spacing.s.rem};
    gap: ${theme.spacing.s.rem};
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

const Style_Button = styled(Button) <{ $hasReacted?: boolean, $style?: ButtonStyles }>`
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
  reactions,
  isSaved,
  reaction: reactedReaction,
  isLast
}: QuoteType & {
  isLast?: boolean;
}) => {
  const { t, i18n: { language } } = useTranslation();
  const [{ user: authUser, roles }] = useAppData();
  const { origin } = window.location;
  const token = useGetToken();
  const [saved, setSaved] = useState(isSaved);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [reactionName, setReactionName] = useState<Reaction['reactionName']>('');
  const [newReaction, setNewReaction] = useState<typeof reactedReaction>(reactedReaction);
  const {
    mutate: mutatePostSave,
    data: postSaved
  } = $api.useMutation('post', '/v1/quotes/{id}/toggleSave');
  const {
    mutate: mutatePostReact,
    data: postReacted
  } = $api.useMutation('post', '/v1/quotes/{id}/toggleReact')/* useFetch<boolean>(`${routes.quotes.sub?.toggleReact(quoteId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token,
      reaction_name: reactionName
    })
  });*/
  const {
    mutate: mutatePostDelete,
    data: postDelete
  } = $api.useMutation('delete', '/v1/quotes/{id}/delete')/* useFetch<boolean>(`${routes.quotes.sub?.delete(quoteId)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token
    })
  }); */

  const quoteUrl = `/quote/${quoteId}`;
  const userUrl = `/user/${user?.userId}`;
  const userAvatarUrl = `https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatarUrl}`;

  const isAdmin = roles && roles.find(role => role.name === 'admin');
  const isAuthor = authUser && authUser.userId === user?.userId;
  const greatestReaction = reactions?.concat().sort((a, b) => (b.count ?? 0) - (a.count ?? 0))[0]?.reactionName;
  const sumOfReactions = reactions?.reduce((acc, reaction) => acc + (reaction.count || 0), 0);

  const quoteOptions = [
    {
      id: 'save',
      label: (<>
        <FontAwesomeIcon icon={[saved ? 'fas' : 'far', 'bookmark']} />{saved ? t('quote.saved') : t('quote.save')}
      </>),
      onClick: () => {
        mutatePostSave({ params: { path: { id: quoteId } }, body: { token: token! } });
      }
    },
    {
      id: 'share',
      label: (<><FontAwesomeIcon icon="share" /> {t('quote.share')}</>),
      onClick: () => {
        const url = `${origin}/quote/${quoteId}`;
        if (navigator.share) {
          void navigator.share({
            title: 'Quotly',
            text: quote,
            url
          }).then();
        }
      }
    },
    {
      id: 'delete',
      label: (<><FontAwesomeIcon icon="trash" /> {t('quote.delete')}</>),
      onClick: () => {
        mutatePostDelete({ params: { path: { id: quoteId } }, body: { token: token! } });
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
  }, [isSaved]);

  useEffect(() => {
    if (postSaved === undefined) return;
    setSaved(postSaved);
  }, [postSaved]);

  /**
   * Redirect to the main page after deleting the quote
   */
  useEffect(() => {
    if (!postDelete) return;
    window.location.pathname = '/';
  }, [postDelete]);

  /**
   * Toggle the reaction on the quote
   */
  useEffect(() => {
    if (!reactionName) return;
    setIsPaletteOpen(false);
    mutatePostReact({ params: { path: { id: quoteId } }, body: { token: token!, reaction_name: reactionName as "skull" | "thumbs-up" | "red-heart" | "face-with-tears-of-joy" | "melting-face" } });
  }, [mutatePostReact, quoteId, reactionName, token]);

  /**
   * Update the reaction state
   */
  useEffect(() => {
    if (!postReacted) return;
    setNewReaction(newReaction !== reactionName && reactionName !== '' ? reactionName : '');
    setReactionName('');
  }, [newReaction, postReacted, reactionName]);

  const renderText = () => (
    <Style_Markdown to={quoteUrl}><Markdown>{quote}</Markdown></Style_Markdown>
  );

  const renderAuthor = () => (
    <Author to={userUrl}>
      {user?.avatarUrl && <Avatar src={userAvatarUrl} alt={user.displayName} />}
      {user?.displayName} • {new Date(createdAt).toLocaleDateString(language, { dateStyle: 'long' })}
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
          place={{
            place: PlaceOrientation.Bottom,
            margin: '-75%'
          }}
          badgeStyle={BadgeStyles.transparent}
        >{abbreviateNumber(
          reaction.count + (
            isNewReactionEmpty && isReactedReaction ? -1 :
              isSameReaction && isReactedReaction ? 0 :
                newReaction !== undefined && isReactedReaction && !isSameReaction ? -1 :
                  isSameReaction && !isNewReactionEmpty ? 1 :
                    isNewReactionEmpty && isReactedReaction ? -1 : 0
          )
        )}</Style_Badge>
      </>
    );
  };

  const renderButtonPalette = (place?: PlaceOrientation, startMargin?: string) => {
    const count = (sumOfReactions || 0) + (newReaction && reactedReaction && newReaction !== reactedReaction ? -1 : 0);
    return (
      <ButtonPalette
        triggerElement={
          <Style_Button
            $hasReacted={Boolean((newReaction || reactedReaction) && newReaction !== '')}
            $style={ButtonStyles.default}
            isIconButton
          >{renderReaction({
            reactionName: (
              newReaction !== '' ? newReaction || reactedReaction || greatestReaction || 'red-heart' :
                greatestReaction || 'red-heart'
            ),
            count
          })}</Style_Button>
        }
        buttons={
          reactions?.map((reaction, index) => (
            <Style_Button
              key={index}
              btnStyle={ButtonStyles.transparent}
              onClick={() => {
                setReactionName('');
                setReactionName(reaction.reactionName);
              }}
              isIconButton
            >{renderReaction(reaction)}</Style_Button>
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