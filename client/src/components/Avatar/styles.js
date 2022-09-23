import styled from 'styled-components';

const StyledAvatarImg = styled.img`
  border-radius: 25%;
  transition: ease-in-out 0.3s;
  width: 100%;
  padding: 0.25rem;
  background-color: ${({ avatarColor }) => avatarColor};
  max-width: ${({ size }) => {
    let maxWidth = '';
    switch (size) {
      case 'large':
        maxWidth = '100px';
        break;
      case 'medium':
        maxWidth = '50px';
        break;
      case 'small':
        maxWidth = '25px';
        break;
      default:
        maxWidth = '50px';
        break;
    }
    return maxWidth;
  }};
`;

export default StyledAvatarImg;
