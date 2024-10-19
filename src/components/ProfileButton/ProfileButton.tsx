import React from 'react';
import styled from 'styled-components';
import { ProfileButtonType } from './ProfileButton.type';

// Styles
const ProfileImage = styled.img`
  background-color: ${props => props.theme.colors.transparency.black(0.05)};
  -webkit-tap-highlight-color: transparent;
  
  width: ${props => props.theme.spacing.xxl.rem};
  height: ${props => props.theme.spacing.xxl.rem};

  border-radius: 100vmax;

  cursor:pointer;
`;

/**
 * Profile Button Component
 * @example
 * <ProfileButton src={src} alt={alt} onClick={onClick} />
 */
const ProfileButton = ({src, alt, onClick}:ProfileButtonType) => {
  const propagateClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if(typeof navigator.vibrate === 'function') navigator.vibrate(20);
    if(onClick) onClick(event);
  };
  return (
    <ProfileImage src={src} alt={alt} onClick={propagateClick} />
  );
};

export default ProfileButton;