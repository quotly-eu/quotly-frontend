/**
 * ProfileButtonType for ProfileButton Component
 * @example
 * import ProfileButton from 'components/ProfileButton/ProfileButton';
 * 
 * <ProfileButton src='profile.jpg' alt='Profile' onClick={handleClick} />
 */
export type ProfileButtonType = {
  src?: string;
  alt?: string;
  size?: string;
  onClick?: (event?:React.SyntheticEvent) => void;
};