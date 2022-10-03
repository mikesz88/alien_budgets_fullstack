const Classroom = require('../models/Classroom');
const Student = require('../models/Student');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all Classrooms
// @route GET /api/v1/classrooms
// @access PUBLIC
exports.getAllClassrooms = asyncHandler(async (req, res, next) => {
  const classrooms = await Classroom.find().select('classroomCode');
  if (!classrooms) {
    return next(new ErrorResponse(`There aren't any classrooms.`, 404));
  }
  res.status(200).json({ success: true, data: classrooms });
});

// @desc Get all Classes of specific adult
// @route GET /api/v1/classrooms/:adultId
// @access PRIVATE
exports.getAllClassroomsOfAdult = asyncHandler(async (req, res, next) => {
  const classrooms = await Classroom.find({ adult: req.params.adultid });

  if (!classrooms) {
    return next(
      new ErrorResponse(
        `Adult with id ${req.params.classid} does not have any classrooms`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: classrooms });
});

// @desc Get specific Class
// @route GET /api/v1/classrooms/single/:classId
// @access PRIVATE
exports.getSingleClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findOne({ _id: req.params.classid });

  if (!classroom) {
    return next(
      new ErrorResponse(`There is no class with id ${req.params.classid}`, 404)
    );
  }

  res.status(200).json({ success: true, data: classroom });
});

// @desc Update student in class
// @route PUT /api/v1/classrooms/updateStudent
// @access PRIVATE
exports.updateStudentData = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findOne({
    classroomCode: req.body.classroomCode,
  });

  if (!classroom) {
    return next(
      new ErrorResponse(
        `There is no class with id ${req.body.classroomCode}`,
        404
      )
    );
  }

  const findStudentIndex = classroom.students.findIndex(
    (student) => student._id.toString() === req.body._id
  );

  classroom.students[findStudentIndex] = {
    _id: req.body._id,
    score: req.body.score,
    firstName: req.body.firstName,
    lastInitial: req.body.lastInitial,
    username: req.body.username,
    avatarURL: req.body.avatarURL,
    avatarColor: req.body.avatarColor,
  };

  classroom.updatedOn = Date.now();

  await classroom.save();

  res.status(200).json({ success: true, data: classroom });
});

// @desc Create Classroom
// @route POST /api/v1/classrooms
// @access PRIVATE
exports.createClassroom = asyncHandler(async (req, res, next) => {
  const { classroomCode, gradeLevel, students, adult } = req.body;

  const registeredStudents = await Student.create(students);

  const classroom = await Classroom.create({
    adult,
    classroomCode,
    gradeLevel,
    students: registeredStudents,
  });

  res.status(200).json({
    success: true,
    data: {
      id: classroom._id,
      adult,
      classroomCode,
      students,
    },
  });
});

// @desc Add new student to Classroom
// @route PUT /api/v1/classrooms/addstudent
// @access PUBLIC
exports.addStudentToClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findOne({
    classroomCode: req.body.classroomCode,
  });

  if (!classroom) {
    return next(
      new ErrorResponse(
        `There is no class with id ${req.body.classroomCode}`,
        404
      )
    );
  }

  classroom.students.push({
    _id: req.body._id,
    score: req.body.score,
    firstName: req.body.firstName,
    lastInitial: req.body.lastInitial,
    username: req.body.username,
    avatarURL: req.body.avatarURL,
    avatarColor: req.body.avatarColor,
  });

  classroom.updatedOn = Date.now();

  await classroom.save();

  res.status(200).json({ success: true, data: classroom });
});
