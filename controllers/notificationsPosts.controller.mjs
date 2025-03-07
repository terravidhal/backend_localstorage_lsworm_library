/**
 * @param {database} db
 * @param {number} courseId
 * @param {number} teacherIdOrstudentIdCreated
 */
export const teacherIdOrstudentIdReceivedsPosts = (
  db,
  courseId,
  teacherIdOrstudentIdCreated
) => {
  const students = db.select("users");
  const studentRegisterCourses = students.filter(
    (user) =>
      user.courseIds &&
      user.courseIds.includes(courseId) &&
      user._id !== teacherIdOrstudentIdCreated
  );

  const teacherId = db.selectOne("users", { role: "admin" }, false)._id;

  const finalArray = studentRegisterCourses.map((student) => student._id);
  finalArray.push(teacherId);

  return finalArray;
};

/**
 * @param {database} db
 * @param {number} courseId
 * @param {number} newNotifId
 * @param {number} teacherIdOrstudentIdCreated
 */
export const sendNotifsPost = (
  db,
  courseId,
  newNotifId,
  teacherIdOrstudentIdCreated
) => {
  const students = db.select("users");
  const studentRegisterCourses = students.filter(
    (user) =>
      user.courseIds &&
      user.courseIds.includes(courseId) &&
      user._id !== teacherIdOrstudentIdCreated
  );

  const teacher = db.selectOne("users", { role: "admin" }, false);

  studentRegisterCourses.forEach((student) => {
    const newStudNotifs = student.notificationReceiveds || [];
    newStudNotifs.push(newNotifId);
    db.update(
      "users",
      { _id: student._id },
      { notificationReceiveds: newStudNotifs }
    );
  });

  const newTeachNotifs = teacher.notificationReceiveds || [];
  newTeachNotifs.push(newNotifId);
  db.update(
    "users",
    { role: "admin" },
    { notificationReceiveds: newTeachNotifs }
  );
};

/**
 * @param {database} db
 * @param {number} postIdOrCommentsId
 * @param {number} teacherIdOrstudentIdCreated
 * @param {number[]} teacherIdOrstudentIdReceiveds
 */
export const notificationsPosts = (
  db,
  postIdOrCommentsId,
  teacherIdOrstudentIdCreated,
  courseId
) => {
  const student = db.selectOne(
    "users",
    { _id: teacherIdOrstudentIdCreated },
    false
  );
  const posts = db.selectOne("posts", { _id: postIdOrCommentsId }, false);
  const course = db.selectOne("courses", { _id: courseId }, false);
  const message = `the ${student.role} ${student.username} has just created a new post in the "${course.name}" course : ${posts.content}`;

  const arrIdReceiveds = teacherIdOrstudentIdReceivedsPosts(
    db,
    courseId,
    teacherIdOrstudentIdCreated
  );

  const newNotif = db.insert("notifications", {
    contentMessage: message,
    createdAt: new Date().toISOString(),
    typeNotificat: "Posts",
    postIdOrCommentsId,
    teacherIdOrstudentIdCreated,
    teacherIdOrstudentIdReceiveds: arrIdReceiveds,
  });

  const allNotifs = db.select("notifications");
  const notifss = allNotifs[allNotifs.length - 1];

  if (notifss) {
    const newNotifId = notifss._id;
    sendNotifsPost(db, courseId, newNotifId, teacherIdOrstudentIdCreated);
  }
};

/**
 * @param {database} db
 * @param {number} userId
 */
export const getUsersNotifs = (db, userId) => {
  const notifUser = db.selectOne("users", { _id: userId }, false);
  const notifReceivedsId = notifUser.notificationReceiveds || [];

  const notifReceiveds = notifReceivedsId.map((elt) => {
    return db.selectOne("notifications", { _id: elt }, false);
  });

  return notifReceiveds;
};
