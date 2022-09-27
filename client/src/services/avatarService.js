/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class AvatarService {
  async getAvatarList(page, limit = 10) {
    const currentPage = page || 1;
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getAvatars}?limit=${limit}&page=${currentPage}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getRandomAvatar() {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getAvatars}?limit=100`
      );
      const findRandomIndex = Math.floor(Math.random() * 100);

      return response.data[findRandomIndex];
    } catch (error) {
      throw error;
    }
  }

  async getRandomAdjective() {
    try {
      const { data: response } = await axios.get(Endpoints.getAvatarAdjective);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AvatarService;
