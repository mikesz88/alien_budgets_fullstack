/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class GameService {
  constructor() {
    this.mathFactResults = [];
    this.battleshipResults = [];
    this.month = 0;
    this.job = '';
    this.salary = 0;
    this.liveInHouseHold = 0;
    this.house = '';
    this.utilities = '';
  }

  setPushMathFactResult(score) {
    this.mathFactResults.push(score);
  }

  setJob(job) {
    this.job = job;
  }

  setHouse(house) {
    this.house = house;
  }

  getHouse() {
    return this.house;
  }

  getJob() {
    return this.job;
  }

  getMathFactResults() {
    return this.mathFactResults;
  }

  setPushBattleshipResult(score) {
    this.battleshipResults.push(score);
  }

  getBattleshipResults() {
    return this.battleshipResults;
  }

  nextMonth() {
    this.month += 1;

    // if (this.month = 12) {
    //   // add end of game here.
    // }
  }

  async getRandomJob() {
    try {
      const { data: response } = await axios.get(Endpoints.getJob);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllDwellings() {
    try {
      const { data: response } = await axios.get(Endpoints.getDwellings);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getDwellingById(dwellingId) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getDwellings}/${dwellingId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default GameService;
