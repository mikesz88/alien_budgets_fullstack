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
    this.score = 0;
    this.bonusOrFine = 0;
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

  resetBonusFine() {
    this.bonusOrFine = 0;
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

  getScore() {
    return this.score;
  }

  getBonusOrFine() {
    return this.bonusOrFine;
  }

  nextMonth() {
    // this.month += 1;
    this.month += 12;

    // if (this.month = 12) {
    //   // add end of game here.
    // }
  }

  getMathFactScore(mathFactResult) {
    let total;
    if (mathFactResult === 100) {
      total += 500;
    } else if (mathFactResult >= 90 && mathFactResult < 100) {
      total += 250;
    } else if (mathFactResult >= 80 && mathFactResult < 90) {
      total += 100;
    } else if (mathFactResult >= 60 && mathFactResult < 70) {
      total += -100;
    } else if (mathFactResult >= 50 && mathFactResult < 60) {
      total += -250;
    } else if (mathFactResult <= 49) {
      total += -500;
    }
    return total;
  }

  updateMathFactScore(mathFactResult) {
    if (mathFactResult === 100) {
      this.score += 500;
      this.bonusOrFine += 500;
    } else if (mathFactResult >= 90 && mathFactResult < 100) {
      this.score += 250;
      this.bonusOrFine += 250;
    } else if (mathFactResult >= 80 && mathFactResult < 90) {
      this.score += 100;
      this.bonusOrFine += 100;
    } else if (mathFactResult >= 60 && mathFactResult < 70) {
      this.score -= 100;
      this.bonusOrFine -= 100;
    } else if (mathFactResult >= 50 && mathFactResult < 60) {
      this.score -= 250;
      this.bonusOrFine -= 250;
    } else if (mathFactResult <= 49) {
      this.score -= 500;
      this.bonusOrFine -= 500;
    }
  }

  updateBattleshipScore(battleshipResult) {
    this.score += battleshipResult * 1000;
    this.bonusOrFine += battleshipResult * 1000;
  }

  updateBudgetScore() {
    this.score += 1000;
  }

  updateScoreFromSavings(amount) {
    this.score += amount * 10;
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
