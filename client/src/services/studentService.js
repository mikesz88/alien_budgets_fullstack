/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import Endpoints from '../common/endpoints';
// import User from './userService';

function studentService(User) {
  class StudentService extends User {
    constructor() {
      super();
      this.lastInitial = '';
      this.username = '';
      this.classroomCode = '';
      this.studentRegisterPart1 = false;
      this.game = '';
      this.score = '';
      this.previousGames = [];
    }

    registerStudentPart1({
      firstName,
      lastInitial,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
      classroomCode,
    }) {
      this.firstName = firstName;
      this.lastInitial = lastInitial;
      this.forgotPasswordQuestion = forgotPasswordQuestion;
      this.forgotPasswordAnswer = forgotPasswordAnswer;
      this.classroomCode = classroomCode;
      this.studentRegisterPart1 = true;
    }

    registerStudentPart2({ username, avatarURL, avatarColor }) {
      this.username = username;
      this.avatarURL = avatarURL;
      this.avatarColor = avatarColor;
    }

    setStudentData({
      _id,
      firstName,
      lastInitial,
      forgotPasswordQuestion,
      classroomCode,
      username,
      avatarURL,
      avatarColor,
      role,
      score,
      game,
      previousGames,
    }) {
      this.id = _id;
      this.firstName = firstName;
      this.lastInitial = lastInitial;
      this.forgotPasswordQuestion = forgotPasswordQuestion;
      this.classroomCode = classroomCode;
      this.username = username;
      this.avatarURL = avatarURL;
      this.avatarColor = avatarColor;
      this.role = role;
      this.score = score;
      this.game = game;
      this.previousGames = previousGames;
    }

    getStudentData() {
      return {
        firstName: this.firstName,
        lastInitial: this.lastInitial,
        forgotPasswordQuestion: this.forgotPasswordQuestion,
        classroomCode: this.classroomCode,
        username: this.username,
        avatarURL: this.avatarURL,
        avatarColor: this.avatarColor,
        score: this.score,
        game: this.game,
        previousGames: this.previousGames,
      };
    }

    setGuestUser({ username, avatarURL, avatarColor, gradeLevel }) {
      this.username = username;
      this.avatarURL = avatarURL;
      this.avatarColor = avatarColor;
      this.classroomCode = gradeLevel;
    }

    async getStudentInfo(studentId) {
      const headers = this.getBearerHeader();
      try {
        const { data: response } = await axios.get(
          `${Endpoints.getStudentInfo}/${studentId}`,
          headers
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async addGame(gameId) {
      const headers = this.getBearerHeader();
      try {
        const { data: response } = await axios.put(
          `${Endpoints.studentGame}/${gameId}`,
          headers
        );
        this.game = response.data.game;
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async deleteGame() {
      const headers = this.getBearerHeader();
      try {
        const { data: response } = await axios.delete(
          `${Endpoints.studentGame}`,
          headers
        );
        this.setStudentData(response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async addScore(score) {
      const headers = this.getBearerHeader();
      const body = { score };
      try {
        const { data: response } = await axios.put(
          `${Endpoints.addScoreToStudent}`,
          body,
          headers
        );
        this.score = response.data.score;
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async addResultsToStudentsHistory({
      job,
      dwelling,
      salary,
      score,
      mathFactScore,
      battleshipScore,
    }) {
      const headers = this.getBearerHeader();
      const body = {
        job,
        dwelling,
        salary,
        score,
        mathFactScore,
        battleshipScore,
      };
      try {
        const { data: response } = await axios.put(
          `${Endpoints.addResultsToStudentsHistory}`,
          body,
          headers
        );
        this.previousGames = response.data.previousGames;
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
  return StudentService;
}

export default studentService;
