const fs = require('fs');
const { faker } = require('@faker-js/faker');

const forgotPasswordQuestions = JSON.parse(
  fs.readFileSync(`${__dirname}/ForgotQuestionList.json`)
);

const avatarList = JSON.parse(fs.readFileSync(`${__dirname}/Avatar.json`));

const generateBgColor = () =>
  '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

const selectAvatar = () => faker.helpers.arrayElement(avatarList);

const create10Adults = (classes) => {
  const adults = [];

  for (let index = 0; index < 10; index++) {
    console.log('adult number =>', index);
    const { avatarURL } = selectAvatar();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = 'AlienBudgets123!';
    const avatarColor = generateBgColor();
    const gradeLevel = faker.helpers.arrayElements(['4th', '5th', '6th']);
    const forgotPasswordQuestion = faker.helpers.arrayElement(
      forgotPasswordQuestions
    );
    const forgotPasswordAnswer = 'AlienBudgets123!';
    const classrooms = [classes[index]];

    adults.push({
      firstName,
      lastName,
      email,
      password,
      avatarURL,
      avatarColor,
      gradeLevel,
      forgotPasswordQuestion,
      forgotPasswordAnswer,
      classrooms,
    });
  }

  return adults;
};

module.exports = create10Adults;
