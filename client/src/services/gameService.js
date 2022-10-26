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
    this.liveInHousehold = 0;
    this.house = '';
    this.utilitiesPercentage = 0;
    this.savings = 0;
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

  setHouseholdMembers(members) {
    this.liveInHousehold = members;
  }

  setUtilities(amount) {
    this.utilitiesPercentage = amount;
  }

  setSalary(salary) {
    this.salary = salary;
  }

  setSavings(amount) {
    this.savings = amount;
  }

  getSavings() {
    return this.savings;
  }

  getSalary() {
    return this.salary;
  }

  getUtilities() {
    return this.utilitiesPercentage;
  }

  getHouseMembers() {
    return this.liveInHousehold;
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

  getMonth() {
    return this.month;
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
