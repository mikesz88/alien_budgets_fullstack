/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class GameService {
  constructor() {
    this.mathFactResults = [];
    this.battleshipResults = [];
    this.month = 1;
    this.job = '';
    this.salary = 0;
    this.liveInHouseHold = 0;
    this.house = '';
    this.utilities = '';
  }

  setPushMathFactResult(score) {
    this.mathFactResults.push(score);
  }

  getMathFactResults() {
    return this.mathFactResults;
  }
}

export default GameService;
