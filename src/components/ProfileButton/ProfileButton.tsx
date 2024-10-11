import React from 'react';
import styled from 'styled-components';

// Styles
const ProfileContainer = styled.div``;

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
 */
const ProfileButton = ({src, alt, onClick}:{
  src: string,
  alt?: string,
  onClick?: (event?:React.MouseEvent) => void
}) => {
  const propagateClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.vibrate(20);
    if(onClick) onClick(event);
  };
  return (
    <ProfileContainer onClick={propagateClick}>
      <ProfileImage src={src} alt={alt} />
    </ProfileContainer>
  );
};

export default ProfileButton;