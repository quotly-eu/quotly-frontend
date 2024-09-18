import React from 'react';
import styled from 'styled-components';

import preview from '../../assets/img/a.jpg';

// Styles
const ProfileContainer = styled.div`

`;

const ProfileImage = styled.img`
  background-color: ${props => props.theme.colors.transparency.black(0.05)};
  width: ${props => props.theme.spacing.xxl.rem};
  height: ${props => props.theme.spacing.xxl.rem};

  border-radius: 100vmax;

  cursor:pointer;
`;

/**
 * Profile Button Component
 */
const ProfileButton = () => {
  return (
    <ProfileContainer>
      <ProfileImage src={preview} alt='' />
    </ProfileContainer>
  )
}

export default ProfileButton