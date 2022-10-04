/* eslint-disable no-unused-vars */
// const BASE_URL = process.env.REACT_APP_BACKEND_API_ENDPOINT;
const BASE_URL = '/api/v1';
// const BASE_URL = 'http://localhost:5000/api/v1';
const URL_AUTH = `${BASE_URL}/auth`;
const URL_STUDENT = `${BASE_URL}/students`;
const URL_ADULT = `${BASE_URL}/adults`;
const URL_AVATAR = `${BASE_URL}/avatars`;
const URL_CLASSROOMS = `${BASE_URL}/classrooms`;
const URL_FORGOT_QUESTION = `${BASE_URL}/forgotquestions`;

const Endpoints = {
  getAvatars: URL_AVATAR,
  getAvatarAdjective: `${URL_AVATAR}/adjective`,
  getAllForgotQuestions: URL_FORGOT_QUESTION,
  getOneForgotQuestion: `${URL_FORGOT_QUESTION}`,
  updateForgotQuestionAnswer: `${URL_AUTH}/updateforgot`,
  registerStudent: `${URL_AUTH}/register/student`,
  registerAdult: `${URL_AUTH}/register/adult`,
  getLoggedInUser: `${URL_AUTH}/me`,
  login: `${URL_AUTH}/login`,
  logout: `${URL_AUTH}/logout`,
  updateAdultProfile: `${URL_AUTH}/adult/updatedetails`,
  updateStudentProfile: `${URL_AUTH}/student/updatedetails`,
  updatePassword: `${URL_AUTH}/updatepassword`,
  deleteSelf: `${URL_AUTH}/deleteaccount`,
  updateAvatar: `${URL_AUTH}/updateavatar`,
  getClassrooms: URL_CLASSROOMS,
  getSpecificClassroom: `${URL_CLASSROOMS}/single`,
  resetStudentPassword: URL_ADULT,
  getStudentInfo: URL_STUDENT,
  updateStudentByAdult: `${URL_ADULT}/updatestudent`,
  updateStudentInClassroom: `${URL_CLASSROOMS}/updateStudent`,
  addStudentToClassroom: `${URL_CLASSROOMS}/addstudent`,
  deleteAllClassroomsByTeacher: `${URL_CLASSROOMS}/deleteteacher`,
  deleteSelectedStudents: `${URL_AUTH}/deletestudents`,
  deleteSingleStudent: `${URL_CLASSROOMS}/deletestudent`,
  transferStudentToDifferentClass: `${URL_CLASSROOMS}/transferstudent`,
  deleteSingleClassroomByTeacher: `${URL_CLASSROOMS}/delete`,
  createNewStudentInClassroom: `${URL_CLASSROOMS}/createstudent`,
};

export default Endpoints;
