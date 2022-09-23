const fs = require('fs');
const { faker } = require('@faker-js/faker');

const forgotPasswordQuestions = JSON
  .parse(
    fs.readFileSync(
      `${__dirname}/ForgotQuestionList.json`
    ));

const avatarList = JSON
  .parse(
    fs.readFileSync(
      `${__dirname}/Avatar.json`
    ));

const the5Classes = () => {
  const classes = [];

  for (let index = 0; index < 5; index++) {
    classes.push(faker.random.alphaNumeric(6))
  }

  return classes;
}

const generateBgColor = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

const selectAvatar = () => faker.helpers.arrayElement(avatarList);

const selectUsernameNumbers = length => length < 5 
  ? faker.random.numeric(8 - length) 
  : faker.random.numeric(3);

const create150Students = () => {
  const classes = the5Classes();
  const students = [];
  
  for (let index = 0; index < 150; index++) {
    const { title: animal, avatarURL } = selectAvatar();
    const firstName = faker.name.firstName();
    const lastInitial = faker.random.alpha();
    const username = `${faker.word.adjective()}_${animal}${selectUsernameNumbers(animal.length)}`;
    const password = faker.internet.password(8, false, /[a-zA-Z0-9-#$^+_!*()@%&]/);
    const avatarColor = generateBgColor();
    const classroomCode = faker.helpers.arrayElement(classes);
    const forgotPasswordQuestion = faker.helpers.arrayElement(forgotPasswordQuestions);
    const forgotPasswordAnswer = faker.lorem.word();

    students.push({
      firstName,
      lastInitial,
      username,
      password,
      avatarURL,
      avatarColor,
      classroomCode,
      forgotPasswordQuestion,
      forgotPasswordAnswer
    })
  }


  return students;
}

module.exports = create150Students;