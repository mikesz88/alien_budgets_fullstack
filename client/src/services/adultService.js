/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import Endpoints from '../common/endpoints';
// import User from './userService';

function adultService(User) {
  class AdultService extends User {
    constructor() {
      super();
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.gradeLevel = '';
      this.classrooms = [];
      this.adultRegisterPart1 = false;
    }

    registerAdultPart1({
      firstName,
      lastName,
      password,
      email,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
    }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.email = email;
      this.forgotPasswordQuestion = forgotPasswordQuestion;
      this.forgotPasswordAnswer = forgotPasswordAnswer;
      this.adultRegisterPart1 = true;
    }

    registerAdultPart2({ gradeLevel, avatarURL, avatarColor }) {
      this.gradeLevel = gradeLevel;
      this.avatarURL = avatarURL;
      this.avatarColor = avatarColor;
    }

    setAdultData({
      _id,
      firstName,
      lastName,
      forgotPasswordQuestion,
      gradeLevel,
      email,
      avatarURL,
      avatarColor,
      role,
      classrooms,
    }) {
      this.id = _id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.forgotPasswordQuestion = forgotPasswordQuestion;
      this.gradeLevel = gradeLevel;
      this.email = email;
      this.avatarURL = avatarURL;
      this.avatarColor = avatarColor;
      this.role = role;
      this.classrooms = classrooms;
    }

    getAdultData() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        forgotPasswordQuestion: this.forgotPasswordQuestion,
        gradeLevel: this.gradeLevel,
        email: this.email,
        avatarURL: this.avatarURL,
        avatarColor: this.avatarColor,
      };
    }

    async resetStudentPassword(studentId) {
      const headers = this.getBearerHeader();
      try {
        const { data: response } = await axios.put(
          `${Endpoints.resetStudentPassword}/${studentId}`,
          headers
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async updateStudentByAdult(studentId, body) {
      const headers = this.getBearerHeader();
      try {
        const { data: response } = await axios.put(
          `${Endpoints.updateStudentByAdult}/${studentId}`,
          body,
          headers
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async resetPasswordByEmail(email) {
      const body = { email };
      try {
        const { data: response } = await axios.post(
          Endpoints.resetPasswordByEmail,
          body
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }

    async resetPasswordByToken(resetToken, password) {
      const body = { password };
      try {
        const { data: response } = await axios.put(
          `${Endpoints.resetPasswordByToken}/${resetToken}`,
          body
        );
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
  return AdultService;
}

export default adultService;
