/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import StyledButton from '../../../components/PrimaryButton';
import { UserContext } from '../../../App';

const DeleteAccount = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    authService
      .deleteSelf()
      .then((res) => {
        notification.success({ message: 'Success', description: res.message });
        navigate('/deleted');
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: 'There was a connection error',
        });
        console.error(error);
      });
  };

  return (
    <>
      <h1>Deleting Account</h1>
      <div>
        There is no going back from this. You will need to create a new account
        in order to access Alien Budgets.
      </div>
      <StyledButton type="primary" onClick={handleDelete}>
        Confirm Deletion
      </StyledButton>
    </>
  );
};

export default DeleteAccount;
