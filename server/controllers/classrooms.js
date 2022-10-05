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

// @desc Get specific Class by classroom code
// @route GET /api/v1/classrooms/student/:classroomcode
// @access PRIVATE
exports.getClassroomFromStudent = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findOne({
    classroomCode: req.params.classroomcode,
  });

  if (!classroom) {
    return next(
      new ErrorResponse(
        `There is no class with code ${req.params.classroomcode}`,
        404
      )
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

// @desc delete student from Classroom
// @route PUT /api/v1/classrooms/delete/studentinclass
// @access PRIVATE
exports.deleteStudentFromClass = asyncHandler(async (req, res, next) => {
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

  classroom.students = classroom.students.filter(
    (student) => student._id.toString() !== req.body.id
  );

  classroom.updatedOn = Date.now();

  await classroom.save();

  res.status(200).json({ success: true, data: classroom });
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

// @desc delete all classrooms based on adult id
// @route PUT /api/v1/classrooms/deleteteacher/:adultid
// @access PRIVATE
exports.deleteAllClassroomsByTeacher = asyncHandler(async (req, res, next) => {
  const classrooms = await Classroom.find({ adult: req.params.adultid });

  if (!classrooms) {
    return next(
      new ErrorResponse(`There is no class with id ${req.params.adultid}`, 404)
    );
  }

  const students = [];
  classrooms
    .map((classroom) => classroom.students)
    .forEach((classroom) =>
      classroom.forEach((student) => students.push(student._id))
    );
  await Classroom.deleteMany({ adult: req.params.adultid });

  res.status(200).json({
    success: true,
    message: `The classrooms with the adult id ${req.params.adultid} have been deleted.`,
    students,
  });
});

// @desc delete all classrooms based on adult id
// @route DELETE /api/v1/classrooms/delete/:classroomid
// @access PRIVATE
exports.deleteSingleClassroomByTeacher = asyncHandler(
  async (req, res, next) => {
    const classroom = await Classroom.findById(req.params.classroomid);

    if (!classroom) {
      return next(
        new ErrorResponse(
          `There is no class with classroomid ${req.params.classroomid}`,
          404
        )
      );
    }

    const students = [];
    classroom.students.forEach((student) => students.push(student._id));
    await Classroom.deleteOne({ _id: req.params.classroomid });

    res.status(200).json({
      success: true,
      message: `The classrooms with the classroom code ${req.params.classroomid} have been deleted.`,
      students,
    });
  }
);

// @desc move student to another classroom
// @route PUT /api/v1/classrooms/transferstudent
// @access PRIVATE
exports.transferStudentToDifferentClassroom = asyncHandler(
  async (req, res, next) => {
    const currentClassroom = await Classroom.findOne({
      classroomCode: req.body.currentClassroomCode,
    });
    const newClassroom = await Classroom.findOne({
      classroomCode: req.body.newClassroomCode,
    });

    if (!currentClassroom) {
      return next(
        new ErrorResponse(
          `There is no class with id ${req.body.currentClassroomCode}`,
          404
        )
      );
    }

    if (!newClassroom) {
      return next(
        new ErrorResponse(
          `There is no class with id ${req.body.newClassroomCode}`,
          404
        )
      );
    }

    currentClassroom.students = currentClassroom.students.filter(
      (student) => student._id.toString() !== req.body.id
    );

    newClassroom.students.push({
      _id: req.body._id,
      score: req.body.score,
      firstName: req.body.firstName,
      lastInitial: req.body.lastInitial,
      username: req.body.username,
      avatarURL: req.body.avatarURL,
      avatarColor: req.body.avatarColor,
    });

    currentClassroom.updatedOn = Date.now();
    newClassroom.updatedOn = Date.now();

    await currentClassroom.save();
    await newClassroom.save();

    res.status(200).json({
      success: true,
      data: { oldClassroom: currentClassroom, newClassroom },
    });
  }
);

// @desc Create New Student & auto assign to Classroom
// @route PUT /api/v1/classrooms/createstudent
// @access PRIVATE
exports.createNewStudentInClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.body.classId);

  if (!classroom) {
    return next(
      new ErrorResponse(`There is no class with id ${req.body.classId}`, 404)
    );
  }

  const students = await Student.create(req.body.students);
  students.forEach((student) => classroom.students.push(student));
  classroom.updatedOn = Date.now();
  await classroom.save();

  res.status(200).json({
    success: true,
    data: { classroom, students: req.body.students },
  });
});

// @desc Delete Student & remove from Classroom
// @route PUT /api/v1/classrooms/delete/student
// @access PRIVATE
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.body.studentId);
  const classroom = await Classroom.findOne({
    classroomCode: req.body.classroomCode,
  });

  if (!student) {
    return next(
      new ErrorResponse(
        `There is no student with id ${req.body.studentId}`,
        404
      )
    );
  }

  if (!classroom) {
    return next(
      new ErrorResponse(
        `There is no class with code ${req.body.classroomCode}`,
        404
      )
    );
  }

  classroom.students = classroom.students.filter(
    (student) => student._id.toString() !== req.body.studentId
  );
  classroom.updatedOn = Date.now();
  await classroom.save();

  res.status(200).json({
    success: true,
    data: classroom,
  });
});
