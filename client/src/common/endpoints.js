/* eslint-disable no-unused-vars */
// const BASE_URL = process.env.REACT_APP_BACKEND_API_ENDPOINT;
const BASE_URL = '/api/v1';
// const BASE_URL = 'http://localhost:5000/api/v1';
const URL_AUTH = `${BASE_URL}/auth`;
const URL_STUDENT = `${BASE_URL}/students`;
const URL_ADULT = `${BASE_URL}/adults`;
const URL_AVATAR = `${BASE_URL}/avatars`;
const URL_FORGOT_QUESTION = `${BASE_URL}/forgotquestions`;

const Endpoints = {
  getAvatars: URL_AVATAR,
  getAvatarAdjective: `${URL_AVATAR}/adjective`,
  getAllClassCodes: `${URL_ADULT}/classcodelist`,
  getAllForgotQuestions: URL_FORGOT_QUESTION,
  getOneForgotQuestion: `${URL_FORGOT_QUESTION}/:id`,
  registerStudent: `${URL_AUTH}/register/student`,
  registerAdult: `${URL_AUTH}/register/adult`,
  getLoggedInUser: `${URL_AUTH}/me`,
  login: `${URL_AUTH}/login`,
};

export default Endpoints;
