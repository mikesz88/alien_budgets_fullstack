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
  }
  return AdultService;
}

export default adultService;
