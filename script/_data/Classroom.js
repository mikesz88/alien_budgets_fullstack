const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');

const Adult = require('../../server/models/Adult');
const Student = require('../../server/models/Student');
const Classroom = require('../../server/models/Classroom');

// load the environment variables
// dotenv.config({ path: '../../.env' });

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const createClassrooms = async () => {
  try {
    // Connect DB
    // console.log('connected');
    const adults = await Adult.find().select('_id classrooms');
    for (const adult of adults) {
      const gradeLevel = faker.helpers.arrayElement(['4th', '5th', '6th']);
      console.log('new Classroom =>', adult.classrooms);
      const students = await Student.find({
        classroomCode: adult.classrooms[0],
      }).select(
        '_id firstName lastInitial username avatarURL avatarColor score'
      );
      console.log(students);
      const newClassroom = {
        classroomCode: adult.classrooms[0],
        adult: adult,
        students,
        gradeLevel,
      };
      await Classroom.create(newClassroom);
      console.log('success');
    }
    // console.log(students);
    // console.log(students.length);
    // console.log(adult);
    // console.log(adult.length);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('exit');
    process.exit();
  }
};

module.exports = createClassrooms;
