/**
 * @param {database} db
 * @param {number} newNotifId
 * @param {number} teacherIdOrstudentIdCreated
 * @param {number} postId
 */
export const sendNotifsComment = (
  db,
  newNotifId,
  teacherIdOrstudentIdCreated,
  postId
) => {
  const teacher = db.selectOne("users", { role: "admin" }, false);
  const post = db.selectOne("posts", { _id: postId }, false);

  if (
    post.teacherIdOrstudentId !== teacherIdOrstudentIdCreated &&
    post.teacherIdOrstudentId !== teacher._id
  ) {
    const userCreatedPost = db.selectOne(
      "users",
      { _id: post.teacherIdOrstudentId },
      false
    );

    const newuserNotifs = userCreatedPost.notificationReceiveds || [];
    newuserNotifs.push(newNotifId);
    db.update(
      "users",
      { _id: post.teacherIdOrstudentId },
      { notificationReceiveds: newuserNotifs }
    );
  }

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
 * @param {number} teacherIdOrstudentIdCreated
 * @param {number} postId
 */
export const teacherIdOrstudentIdReceivedsComments = (
  db,
  teacherIdOrstudentIdCreated,
  postId
) => {
  const teacher = db.selectOne("users", { role: "admin" }, false);
  const post = db.selectOne("posts", { _id: postId }, false);
  let finalArray = [];

  if (
    post.teacherIdOrstudentId !== teacherIdOrstudentIdCreated &&
    post.teacherIdOrstudentId !== teacher._id
  ) {
    const userCreatedPost = db.selectOne(
      "users",
      { _id: post.teacherIdOrstudentId },
      false
    );
    finalArray.push(userCreatedPost._id);
  }
  finalArray.push(teacher._id);
  return finalArray;
};

/**
 * @param {database} db
 * @param {number} postIdOrCommentsId
 * @param {number} teacherIdOrstudentIdCreated
 * @param {number} postId
 */
export const notificationsComments = (
  db,
  postIdOrCommentsId,
  teacherIdOrstudentIdCreated,
  postId
) => {
  const student = db.selectOne(
    "users",
    { _id: teacherIdOrstudentIdCreated },
    false
  );
  const post = db.selectOne("posts", { _id: postId }, false);
  const message = `the ${student.role} ${student.username} has just created a new comment in the "${post.postTitle}" post  : ${post.content}`;

  const arrIdReceiveds = teacherIdOrstudentIdReceivedsComments(
    db,
    teacherIdOrstudentIdCreated,
    postId
  );

  const newNotif = db.insert("notifications", {
    contentMessage: message,
    createdAt: new Date().toISOString(),
    typeNotificat: "Comments",
    postIdOrCommentsId,
    teacherIdOrstudentIdCreated,
    teacherIdOrstudentIdReceiveds: arrIdReceiveds,
  });

  const allNotifs = db.select("notifications");
  const notifss = allNotifs[allNotifs.length - 1];

  if (notifss) {
    const newNotifId = notifss._id;
    sendNotifsComment(db, newNotifId, teacherIdOrstudentIdCreated, postId);
  }
};
