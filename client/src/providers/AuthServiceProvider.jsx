/* eslint-disable no-undef */
import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import Endpoints from '../common/endpoints';

const AuthServiceContext = createContext({});

export const AuthServiceProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    avatarURL: '',
    avatarColor: '',
    forgotPasswordQuestion: '',
    forgotPasswordAnswer: '',
    role: '',
    isLoggedIn: false,
    authToken: '',
    bearerHeader: {},
    lastInitial: '',
    username: '',
    classroomCode: '',
    studentRegisterPart1: false,
    game: '',
    score: '',
    previousGames: [],
    lastName: '',
    email: '',
    password: '',
    gradeLevel: '',
    classrooms: [],
    adultRegisterPart1: false,
  });

  // User
  const setAuthToken = (token) =>
    setUser((prevState) => ({ ...prevState, authToken: token }));

  // User
  const setBearerHeader = (token) =>
    setUser((prevState) => ({
      ...prevState,
      bearerHeader: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }));

  // User
  const getBearerHeader = () => user.bearerHeader;

  // User
  const setIsLoggedIn = (loggedIn) =>
    setUser((prevState) => ({ ...prevState, isLoggedIn: loggedIn }));

  // User
  const resetForgotPassword = () =>
    setUser((prevState) => ({ ...prevState, forgotPasswordAnswer: '' }));

  // User
  const clearPassword = () =>
    setUser((prevState) => ({ ...prevState, password: '' }));

  // Student
  const setGame = (game) => setUser((prevState) => ({ ...prevState, game }));

  // Student
  const setScore = (score) => setUser((prevState) => ({ ...prevState, score }));

  // Student
  const setPreviousGames = (previousGames) =>
    setUser((prevState) => ({ ...prevState, previousGames }));

  // Student
  const setStudentData = ({
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
  }) =>
    setUser((prevState) => ({
      ...prevState,
      id: _id,
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
    }));

  // Adult
  const setAdultData = ({
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
  }) =>
    setUser((prevState) => ({
      ...prevState,
      id: _id,
      firstName,
      lastName,
      forgotPasswordQuestion,
      gradeLevel,
      email,
      avatarURL,
      avatarColor,
      role,
      classrooms,
    }));

  // Student
  const registerStudentPart1 = ({
    firstName,
    lastInitial,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
    classroomCode,
  }) =>
    setUser((prevState) => ({
      ...prevState,
      firstName,
      lastInitial,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
      classroomCode,
      studentRegisterPart1: true,
    }));

  // Student
  const registerStudentPart2 = ({ username, avatarURL, avatarColor }) =>
    setUser((prevState) => ({
      ...prevState,
      username,
      avatarURL,
      avatarColor,
    }));

  // Student
  const getStudentData = () => ({
    firstName: user.firstName,
    lastInitial: user.lastInitial,
    forgotPasswordQuestion: user.forgotPasswordQuestion,
    classroomCode: user.classroomCode,
    username: user.username,
    avatarURL: user.avatarURL,
    avatarColor: user.avatarColor,
    score: user.score,
    game: user.game,
    previousGames: user.previousGames,
  });

  // Student
  const getStudentInfo = async (studentId) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.get(
      `${Endpoints.getStudentInfo}/${studentId}`,
      headers
    );
    return response.data;
  };

  // Student
  const addGame = async (gameId) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      `${Endpoints.studentGame}/${gameId}`,
      headers
    );
    setGame(response.data.game);
    return response.data;
  };

  // Student
  const deleteGame = async () => {
    const headers = getBearerHeader();
    const { data: response } = await axios.delete(
      `${Endpoints.studentGame}`,
      headers
    );
    setStudentData(response.data);
    return response.data;
  };

  // Student
  const addScore = async (score) => {
    const headers = getBearerHeader();
    const body = { score };
    const { data: response } = await axios.put(
      `${Endpoints.addScoreToStudent}`,
      body,
      headers
    );
    setScore(response.data.score);
    return response.data;
  };

  // Student
  const addResultsToStudentsHistory = async ({
    job,
    dwelling,
    salary,
    score,
    mathFactScore,
    battleshipScore,
  }) => {
    const headers = getBearerHeader();
    const body = {
      job,
      dwelling,
      salary,
      score,
      mathFactScore,
      battleshipScore,
    };
    const { data: response } = await axios.put(
      `${Endpoints.addResultsToStudentsHistory}`,
      body,
      headers
    );
    setPreviousGames(response.data.previousGames);
    return response.data;
  };

  // Adult
  const registerAdultPart1 = ({
    firstName,
    lastName,
    password,
    email,
    forgotPasswordQuestion,
    forgotPasswordAnswer,
  }) =>
    setUser((prevState) => ({
      ...prevState,
      firstName,
      lastName,
      password,
      email,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
      adultRegisterPart1: true,
    }));

  // Adult
  const registerAdultPart2 = ({ gradeLevel, avatarURL, avatarColor }) =>
    setUser((prevState) => ({
      ...prevState,
      gradeLevel,
      avatarURL,
      avatarColor,
    }));

  // Adult
  const getAdultData = () => ({
    firstName: user.firstName,
    lastName: user.lastName,
    forgotPasswordQuestion: user.forgotPasswordQuestion,
    gradeLevel: user.gradeLevel,
    email: user.email,
    avatarURL: user.avatarURL,
    avatarColor: user.avatarColor,
  });

  // Adult
  const resetStudentPassword = async (studentId) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      `${Endpoints.resetStudentPassword}/${studentId}`,
      headers
    );
    return response.data;
  };

  // Adult
  const updateStudentByAdult = async (studentId, body) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      `${Endpoints.updateStudentByAdult}/${studentId}`,
      body,
      headers
    );
    return response.data;
  };

  // Adult
  const resetPasswordByEmail = async (email) => {
    const body = { email };
    const { data: response } = await axios.post(
      Endpoints.resetPasswordByEmail,
      body
    );
    return response.data;
  };

  // Adult
  const resetPasswordByToken = async (resetToken, password) => {
    const body = { password };
    const { data: response } = await axios.put(
      `${Endpoints.resetPasswordByToken}/${resetToken}`,
      body
    );
    return response;
  };

  // Adult
  const validateEmail = async (email) => {
    const { data: response } = await axios.get(
      `${Endpoints.validateEmail}/${email}`
    );
    return response.data;
  };

  // Auth
  const resetUser = () => {
    setUser((prevState) => ({
      ...prevState,
      id: '',
      firstName: '',
      lastName: '',
      lastInitial: '',
      username: '',
      avatarURL: '',
      avatarColor: '',
      forgotPasswordQuestion: '',
      forgotPasswordAnswer: '',
      role: '',
      email: '',
      password: '',
      gradeLevel: [],
      adultRegisterPart1: false,
      studentRegisterPart1: false,
      classroomCode: '',
      game: '',
      score: '',
      previousGames: [],
    }));
    setIsLoggedIn(false);
    setAuthToken('');
    setBearerHeader('');
  };

  // Auth
  const setForgotQuestionList = (list) => {
    const renamedList = [];
    list.forEach((question) => {
      renamedList.push({
        id: question._id,
        question: question.question,
        createdAt: question.createdAt,
      });
    });
    return renamedList;
  };

  // Auth
  const getAllForgotQuestions = async () => {
    const { data: response } = await axios.get(Endpoints.getAllForgotQuestions);
    return setForgotQuestionList(response.data);
  };

  // Auth
  const getOneForgotQuestion = async (questionId) => {
    const { data: response } = await axios.get(
      `${Endpoints.getOneForgotQuestion}/${questionId}`
    );
    return response.data;
  };

  // Auth
  const updateForgotQuestionAnswer = async (body) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      Endpoints.updateForgotQuestionAnswer,
      body,
      headers
    );
    setUser((prevState) => ({
      ...prevState,
      forgotPasswordQuestion: response.forgotQuestion,
    }));
    return response;
  };

  // Auth
  const registerStudent = async (userData) => {
    registerStudentPart2(userData);
    const body = getStudentData();
    body.password = userData.password;
    body.forgotPasswordAnswer = user.forgotPasswordAnswer;
    const { data: response } = await axios.post(
      Endpoints.registerStudent,
      body
    );
    setAuthToken(response.token);
    setBearerHeader(response.token);
    localStorage.setItem('token', response.token);
    setIsLoggedIn(true);
    await getUser();
    return response;
  };

  // Auth
  const registerAdult = async (userData) => {
    registerAdultPart2(userData);
    const body = getAdultData();
    body.password = user.password;
    body.forgotPasswordAnswer = user.forgotPasswordAnswer;
    const { data: response } = await axios.post(Endpoints.registerAdult, body);
    setAuthToken(response.token);
    setBearerHeader(response.token);
    localStorage.setItem('token', response.token);
    setIsLoggedIn(true);
    await getUser();
    return response;
  };

  // Auth
  const retrieveForgotQuestionFromUser = async (person) => {
    const { data: response } = await axios.get(
      `${Endpoints.retrieveForgotQuestionFromUser}/${person}`
    );
    return response.data;
  };

  // Auth
  const validateForgotPassword = async (
    email,
    username,
    forgotPasswordAnswer
  ) => {
    const body = { email, username, forgotPasswordAnswer };
    const { data: response } = await axios.post(
      `${Endpoints.validateForgotPassword}`,
      body
    );
    return response.data;
  };

  // Auth
  const resetPassword = async (resetToken, password) => {
    const body = { password };
    const { data: response } = await axios.put(
      `${Endpoints.resetPassword}/${resetToken}`,
      body
    );
    return response;
  };

  // Auth
  const foundUser = async (token) => {
    setBearerHeader(token);
    const headers = getBearerHeader();
    const { data: response } = await axios.get(Endpoints.getLoggedInUser, {
      headers,
    });
    if (response.data.role === 'student') {
      setStudentData(response.data);
    } else {
      setAdultData(response.data);
    }
    await getUser();
    setAuthToken(token);
    setIsLoggedIn(true);
    return response.data;
  };

  // Auth
  const getUser = async () => {
    const headers = getBearerHeader();
    const { data: response } = await axios.get(Endpoints.getLoggedInUser, {
      headers,
    });
    resetForgotPassword();
    clearPassword();
    if (response.data.role === 'student') {
      setStudentData(response.data);
    } else {
      setAdultData(response.data);
    }
    return response.data;
  };

  // Auth
  const login = async (values) => {
    const body = values;
    const { data: response } = await axios.post(Endpoints.login, body);
    setAuthToken(response.token);
    setBearerHeader(response.token);
    localStorage.setItem('token', response.token);
    setIsLoggedIn(true);
  };

  // Auth
  const logout = async () => {
    const headers = getBearerHeader();
    const { data: response } = await axios.get(Endpoints.logout, headers);
    localStorage.removeItem('token');
    resetUser();
    return response.message;
  };

  // Auth
  const updateAdultProfile = async (body) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      Endpoints.updateAdultProfile,
      body,
      headers
    );
    setAdultData(response.data);
  };

  // Auth
  const updateStudentProfile = async (body) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      Endpoints.updateStudentProfile,
      body,
      headers
    );
    setStudentData(response.data);
    return response.data;
  };

  // Auth
  const updateAvatar = async (body) => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(
      Endpoints.updateAvatar,
      body,
      headers
    );
    setUser((prevState) => ({
      ...prevState,
      avatarColor: response.data.avatarColor,
      avatarURL: response.data.avatarURL,
      username: response.data.username ? response.data.username : '',
    }));
    return response;
  };

  // Auth
  const updatePassword = async (currentPassword, newPassword) => {
    const headers = getBearerHeader();
    await axios.put(
      Endpoints.updatePassword,
      { currentPassword, newPassword },
      headers
    );
  };

  // Auth
  const deleteSelf = async () => {
    const headers = getBearerHeader();
    const { data: response } = await axios.put(Endpoints.deleteSelf, headers);
    localStorage.removeItem('token');
    resetUser();
    return response;
  };

  // Auth
  const deleteSelectedStudents = async (students) => {
    const headers = getBearerHeader();
    const body = students;
    const { data: response } = await axios.put(
      Endpoints.deleteSelectedStudents,
      body,
      headers
    );
    return response;
  };

  return (
    <AuthServiceContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        setUser,
        login,
        getBearerHeader,
        getUser,
        registerStudentPart1,
        registerStudentPart2,
        getStudentData,
        getStudentInfo,
        addGame,
        deleteGame,
        addScore,
        addResultsToStudentsHistory,
        registerAdultPart1,
        registerAdultPart2,
        getAdultData,
        resetStudentPassword,
        updateStudentByAdult,
        resetPasswordByEmail,
        resetPasswordByToken,
        validateEmail,
        resetUser,
        setForgotQuestionList,
        getAllForgotQuestions,
        getOneForgotQuestion,
        updateForgotQuestionAnswer,
        registerStudent,
        registerAdult,
        retrieveForgotQuestionFromUser,
        validateForgotPassword,
        resetPassword,
        foundUser,
        logout,
        updateAdultProfile,
        updateStudentProfile,
        updateAvatar,
        updatePassword,
        deleteSelf,
        deleteSelectedStudents,
      }}
    >
      {children}
    </AuthServiceContext.Provider>
  );
};

export const useAuthServiceProvider = () => useContext(AuthServiceContext);
