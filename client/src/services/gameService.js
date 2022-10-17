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
}

export default GameService;
