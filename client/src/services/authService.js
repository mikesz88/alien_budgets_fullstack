/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';
import adultService from './adultService';
import studentService from './studentService';
import User from './userService';

const creator = (differentTypesOfUsers, basicUser) =>
  basicUser(differentTypesOfUsers);
const extender = (...parts) => parts.reduce(creator, User);

class AuthService extends extender(adultService, studentService) {
  constructor() {
    super();
  }

  resetUser() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.lastInitial = '';
    this.username = '';
    this.avatarURL = '';
    this.avatarColor = '';
    this.forgotPasswordQuestion = '';
    this.forgotPasswordAnswer = '';
    this.role = '';
    this.setIsLoggedIn(false);
    this.email = '';
    this.password = '';
    this.gradeLevel = [];
    this.adultRegisterPart1 = false;
    this.studentRegisterPart1 = false;
    this.classroomCode = '';
    this.game = '';
    this.score = '';
    this.previousGames = [];
    this.setAuthToken('');
    this.setBearerHeader('');
  }

  setForgotQuestionList(list) {
    const renamedList = [];
    list.forEach((question) => {
      renamedList.push({
        id: question._id,
        question: question.question,
        createdAt: question.createdAt,
      });
    });
    return renamedList;
  }

  async getAllForgotQuestions() {
    try {
      const { data: response } = await axios.get(
        Endpoints.getAllForgotQuestions
      );
      return this.setForgotQuestionList(response.data);
    } catch (error) {
      throw error;
    }
  }

  async getOneForgotQuestion(questionId) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getOneForgotQuestion}/${questionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateForgotQuestionAnswer(body) {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.put(
        Endpoints.updateForgotQuestionAnswer,
        body,
        headers
      );
      this.forgotPasswordQuestion = response.forgotQuestion;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registerStudent(userData) {
    this.registerStudentPart2(userData);
    const body = this.getStudentData();
    body.password = userData.password;
    body.forgotPasswordAnswer = this.forgotPasswordAnswer;
    try {
      const { data: response } = await axios.post(
        Endpoints.registerStudent,
        body
      );
      this.setAuthToken(response.token);
      this.setBearerHeader(response.token);
      localStorage.setItem('token', response.token);
      this.setIsLoggedIn(true);
      await this.getUser();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registerAdult(userData) {
    this.registerAdultPart2(userData);
    const body = this.getAdultData();
    body.password = this.password;
    body.forgotPasswordAnswer = this.forgotPasswordAnswer;
    try {
      const { data: response } = await axios.post(
        Endpoints.registerAdult,
        body
      );
      this.setAuthToken(response.token);
      this.setBearerHeader(response.token);
      localStorage.setItem('token', response.token);
      this.setIsLoggedIn(true);
      await this.getUser();
    } catch (error) {
      throw error;
    }
  }

  async retrieveForgotQuestionFromUser(user) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.retrieveForgotQuestionFromUser}/${user}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async validateForgotPassword(email, username, forgotPasswordAnswer) {
    const body = { email, username, forgotPasswordAnswer };
    try {
      const { data: response } = await axios.post(
        `${Endpoints.validateForgotPassword}`,
        body
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(resetToken, password) {
    const body = { password };
    try {
      const { data: response } = await axios.put(
        `${Endpoints.resetPassword}/${resetToken}`,
        body
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async foundUser(token) {
    this.setBearerHeader(token);
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.get(Endpoints.getLoggedInUser, {
        headers,
      });
      if (response.data.role === 'student') {
        this.setStudentData(response.data);
      } else {
        this.setAdultData(response.data);
      }
      this.getUser();
      this.setAuthToken(token);
      this.setIsLoggedIn(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.get(Endpoints.getLoggedInUser, {
        headers,
      });
      this.forgotPasswordAnswer = '';
      this.password = '';
      if (response.data.role === 'student') {
        this.setStudentData(response.data);
      } else {
        this.setAdultData(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(values) {
    const body = values;
    try {
      const { data: response } = await axios.post(Endpoints.login, body);
      this.setAuthToken(response.token);
      this.setBearerHeader(response.token);
      localStorage.setItem('token', response.token);
      this.setIsLoggedIn(true);
      this.getUser();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.get(Endpoints.logout, headers);
      localStorage.removeItem('token');
      this.resetUser();
      return response.message;
    } catch (error) {
      throw error;
    }
  }

  async updateAdultProfile(body) {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.put(
        Endpoints.updateAdultProfile,
        body,
        headers
      );
      this.setAdultData(response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateStudentProfile(body) {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.put(
        Endpoints.updateStudentProfile,
        body,
        headers
      );
      this.setStudentData(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAvatar(body) {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.put(
        Endpoints.updateAvatar,
        body,
        headers
      );
      this.avatarColor = response.data.avatarColor;
      this.avatarURL = response.data.avatarURL;
      this.username = response.data.username ? response.data.username : '';
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(currentPassword, newPassword) {
    const headers = this.getBearerHeader();
    try {
      await axios.put(
        Endpoints.updatePassword,
        { currentPassword, newPassword },
        headers
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteSelf() {
    const headers = this.getBearerHeader();
    try {
      const { data: response } = await axios.put(Endpoints.deleteSelf, headers);
      localStorage.removeItem('token');
      this.resetUser();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteSelectedStudents(students) {
    const headers = this.getBearerHeader();
    const body = students;
    try {
      const { data: response } = await axios.put(
        Endpoints.deleteSelectedStudents,
        body,
        headers
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
