import React, { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { UserContext } from '../../App';
import StyledAvatarImg from './styles';

const Avatar = ({ avatar, size }) => {
  const { authService } = useContext(UserContext);
  const { avatarName, avatarColor } = avatar;

  return (
    <StyledAvatarImg
      src={avatarName || authService.avatarName}
      avatarColor={avatarColor || authService.avatarColor}
      size={size}
    />
  );
};

export default Avatar;
