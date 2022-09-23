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
