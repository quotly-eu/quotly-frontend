import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ProfileButtonType } from './ProfileButton.type';
import ProfilePlaceholder from 'assets/img/profile-picture.jpg';

// Types
interface ProfileImageProps {
  $size: string;
}

// Styles
const ProfileImage = styled.img<ProfileImageProps>`
-webkit-tap-highlight-color: transparent;

  ${({ theme, $size }) => `
    background-color: ${theme.colors.transparency.black(0.05)};
    width: ${$size};
    height: ${$size};
  `}

  border-radius: 100vmax;

  cursor:pointer;
`;

/**
 * Profile Button Component
 * @example
 * <ProfileButton src={src} alt={alt} onClick={onClick} />
 */
const ProfileButton = ({src=ProfilePlaceholder, alt, size, onClick}:ProfileButtonType) => {
  const theme = useTheme();
  const propagateClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if(typeof navigator.vibrate === 'function') navigator.vibrate(20);
    if(onClick) onClick(event);
  };

  return (
    <ProfileImage src={src} alt={alt} $size={size || theme.spacing.xl.em} onClick={propagateClick} />
  );
};

export default ProfileButton;