const fs = require('fs');
const { faker } = require('@faker-js/faker');

const forgotPasswordQuestions = [
  "What is your mother's maiden name?",
  'What is the name of your first pet?',
  'What was your first car?',
  'What elementary school did you attend?',
  'What high school did you attend?',
  'What college did you attend?',
  'What is the name of the town where you were born?',
  'What Is your favorite book?',
  'What is the name of the road you grew up on?',
  'What was the first company that you worked for?',
  'Where did you meet your spouse?',
];

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
    const password = 'AlienBudgets123';
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
