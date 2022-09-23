const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const create10Adults = require('./_data/Adult');
const create150Students = require('./_data/Student');

// load the environment variables
dotenv.config({ path: './config/config.env'});

// load models
const Adult = require('./models/Adult');
const Student = require('./models/Student');
const Avatar = require('./models/Avatar');
const ForgotQuestion = require('./models/ForgotQuestion');

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

// Read JSON
const avatars = JSON.parse(fs.readFileSync(`${__dirname}/_data/Avatar.json`))
const forgotQuestionList = JSON.parse(fs.readFileSync(`${__dirname}/_data/ForgotQuestionList.json`))

// Faker JS
const adults = create10Adults();
const students = create150Students();


// import into DB
const importAdults = async () => {
  try {
    await ForgotQuestion.create(forgotQuestionList);
    // await Avatar.create(avatars);
    // await Adult.create(adults);
    // await Student.create(students);
    console.log('data imported...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// delete data from DB
const deleteAdults = async () => {
  try {
    await ForgotQuestion.deleteMany();
    // await Avatar.deleteMany();
    // await Adult.deleteMany();
    // await Student.deleteMany();
    console.log('data deleted...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

if (process.argv[2] === '-i') {
  importAdults();
} else if (process.argv[2] === '-d') {
  deleteAdults();
}