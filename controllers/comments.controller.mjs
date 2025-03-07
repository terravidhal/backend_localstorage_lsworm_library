import { notificationsComments } from "./notificationsComments.controller.mjs";

/**
 * @param {database} db
 * @param {string} content
 * @param {number} teacherIdOrstudentId
 * @param {number} postId
 */
export const createOneComment = (db, content, teacherIdOrstudentId, postId) => {
  const comment = db.insert("comments", {
    content,
    status: "nosolved",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postId: postId,
    teacherIdOrstudentId,
  });

  const allComments = db.select("comments");
  const commentss = allComments[allComments.length - 1];
  if (commentss) {
    const commentIds = commentss._id;
    notificationsComments(db, commentIds, teacherIdOrstudentId, postId);
  }
};

/**
 * @param {database} db
 * @param {number} idComment
 */
export const changeStatusComments = (db, idComment) => {
  db.update(
    "comments",
    { _id: idComment },
    {
      status: "resolved",
    }
  );
};

/**
 * @param {database} db
 * @param {number} idComment
 */
export const deleteOneComment = (db, idComment) => {
  db.delete("comments", { _id: idComment });
};
