/**
 * @param {database} db
 * @param {string} name
 * @param {string} description
 * @param {number} teacherId
 */
export const createOneCourse = (db, name, description, teacherId) => {
  db.insert("courses", {
    enrolled: false,
    name,
    description,
    teacherId,
    studentIds: [],
  });
};

/**
 * @param  {...(string[])} coursesData
 * @param  {database} db
 */
export const createManyCourses = (db, ...coursesData) => {
  const coursesToInsert = coursesData.map((courseData) => {
    const [name, description, teacherId] = courseData;
    return {
      enrolled: false,
      name,
      description,
      teacherId,
      studentIds: [],
    };
  });
  db.insertMany("courses", coursesToInsert);
};


/**
 * @param {database} db
 */
export const getAllCourses = (db) => {
  const allCourses = db.select("courses");
  return allCourses;
};

/**
 * @param {database} db
 * @param {number} idCourse
 * @param {boolean} statusEnroll
 */
export const updateStatusEnrollCourse = (db, idCourse, statusEnroll) => { // ne sert plus
    db.update("courses", { _id: idCourse }, { enrolled: statusEnroll });
};


/**
 * @param {database} db
 * @param {number} studentId
 * @param {number} courseId
 */
export const registerCourses = (db, studentId, courseId) => {
  const studentOne = db.selectOne("users", { _id: studentId }, false); 
  const courseOne = db.selectOne("courses", { _id: courseId }, false); 

  const newArrayCourseIds = studentOne.courseIds || [];
  const newArrayStudentIds = courseOne.studentIds || [];

  if (!newArrayCourseIds.includes(courseId)) {
    newArrayCourseIds.push(courseId);
  }

  if (!newArrayStudentIds.includes(studentId)) {
      newArrayStudentIds.push(studentId);
  }

 // updateStatusEnrollCourse(db, courseId, true);
  db.update("users", { _id: studentId }, { courseIds: newArrayCourseIds });
  db.update("courses", { _id: courseId }, { studentIds: newArrayStudentIds });
};


/**
 * @param {database} db
 * @param {number} studentId
 * @param {number} courseId
 */
export const unregisterCourses = (db, studentId, courseId) => {
  const oneStudent = db.selectOne("users", { _id: studentId }, false);
  const oneCourse = db.selectOne("courses", { _id: courseId }, false);

  const newArrayCourseIds = oneStudent.courseIds || [];
  const newArrayStudentIds = oneCourse.studentIds || [];

  const indexCourseId = newArrayCourseIds.indexOf(courseId);  
  const indexStudentId = newArrayStudentIds.indexOf(studentId); 

  if (indexCourseId !== -1) { 
    newArrayCourseIds.splice(indexCourseId, 1);
  }

  if (indexStudentId !== -1) { 
    newArrayStudentIds.splice(indexStudentId, 1);
  }

 // updateStatusEnrollCourse(db, courseId, false);
  db.update("users", { _id: studentId }, { courseIds: newArrayCourseIds });     
  db.update("courses", { _id: courseId }, { studentIds: newArrayStudentIds }); 
};


export const getCoursesRegisterForUser = (db, studentId) => {
  const student = db.selectOne("users", { _id: studentId }, false);
  const courseIds = student.courseIds || [];

  const courses = courseIds.map((courseId) => {
    return db.selectOne("courses", { _id: courseId }, false);
  });

  return courses;
};

export const getStudentsRegisterForCourse = (db, courseId) => {
  const course = db.selectOne("courses", { _id: courseId }, false);
  const studentIds = course.studentIds || [];

  const students = studentIds.map((studentId) => {
    return db.selectOne("users", { _id: studentId }, false);
  });

  return students;
};




