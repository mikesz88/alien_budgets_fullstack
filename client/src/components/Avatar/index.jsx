import React from 'react';
import StyledAvatarImg from './styles';
import { useAuthServiceProvider } from '../../services/AuthServiceProvider';

const Avatar = ({ avatar, size }) => {
  const { user } = useAuthServiceProvider();
  const { avatarName, avatarColor } = avatar;

  return (
    <StyledAvatarImg
      src={avatarName || user.avatarName}
      avatarColor={avatarColor || user.avatarColor}
      size={size}
    />
  );
};

export default Avatar;
