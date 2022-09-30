class User {
  constructor() {
    this.id = '';
    this.firstName = '';
    this.avatarURL = '';
    this.avatarColor = '';
    this.forgotPasswordQuestion = '';
    this.forgotPasswordAnswer = '';
    this.role = '';
    this.isLoggedIn = false;
    this.authToken = '';
    this.bearerHeader = {};
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  getBearerHeader() {
    return this.bearerHeader;
  }

  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setBasicUserData(userData) {
    const { _id, firstName, avatarURL, avatarColor, forgotPasswordQuestion } =
      userData;

    this.id = _id;
    this.firstName = firstName;
    this.avatarURL = avatarURL;
    this.avatarColor = avatarColor;
    this.forgotPasswordQuestion = forgotPasswordQuestion;
  }

  resetForgotPassword() {
    this.forgotPasswordAnswer = '';
  }
}

export default User;
