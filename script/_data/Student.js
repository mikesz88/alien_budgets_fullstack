const fs = require('fs');
const { faker } = require('@faker-js/faker');

const forgotPasswordQuestions = JSON.parse(
  fs.readFileSync(`${__dirname}/ForgotQuestionList.json`)
);

const avatarList = JSON.parse(fs.readFileSync(`${__dirname}/Avatar.json`));

const generateBgColor = () =>
  '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

const selectAvatar = () => faker.helpers.arrayElement(avatarList);

const selectUsernameNumbers = (length) =>
  length < 5 ? faker.random.numeric(8 - length) : faker.random.numeric(3);

const create250Students = (classes) => {
  const students = [];

  for (let index = 0; index < 250; index++) {
    console.log('student number =>', index);
    const { title: animal, avatarURL } = selectAvatar();
    const firstName = faker.name.firstName();
    const lastInitial = faker.random.alpha();
    const username = `${faker.word.adjective()}_${animal}${selectUsernameNumbers(
      animal.length
    )}`;
    const password = 'AlienBudgets123!';
    const avatarColor = generateBgColor();
    const classroomCode = faker.helpers.arrayElement(classes);
    const forgotPasswordQuestion = faker.helpers.arrayElement(
      forgotPasswordQuestions
    );
    const forgotPasswordAnswer = 'AlienBudgets123';
    // const score = faker.datatype.number({ max: 100000, min: 0 });

    students.push({
      firstName,
      lastInitial,
      username,
      password,
      avatarURL,
      avatarColor,
      classroomCode,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
      // score,
    });
  }

  return students;
};

module.exports = create250Students;
