import React, { useContext, createContext } from 'react';
import axios from 'axios';
import Endpoints from '../common/endpoints';

const AvatarServiceContext = createContext({});

export const AvatarServiceProvider = ({ children }) => {
  const getAvatarList = async (page, limit = 10) => {
    const currentPage = page || 1;
    const { data: response } = await axios.get(
      `${Endpoints.getAvatars}?limit=${limit}&page=${currentPage}`
    );
    return response;
  };

  const getRandomAvatar = async () => {
    const { data: response } = await axios.get(
      `${Endpoints.getAvatars}?limit=100`
    );
    const findRandomIndex = Math.floor(Math.random() * 100);
    return response.data[findRandomIndex];
  };

  const getRandomAdjective = async () => {
    const { data: response } = await axios.get(Endpoints.getAvatarAdjective);
    return response.data;
  };

  return (
    <AvatarServiceContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ getAvatarList, getRandomAvatar, getRandomAdjective }}
    >
      {children}
    </AvatarServiceContext.Provider>
  );
};

export const useAvatarServiceProvider = () => useContext(AvatarServiceContext);
