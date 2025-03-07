import { notificationsPosts } from "./notificationsPosts.controller.mjs";

/**
 * @param {database} db
 * @param {string} postTitle
 * @param {string} content
 * @param {string} PostImage
 * @param {number} courseId
 * @param {number} teacherIdOrstudentId
 */
export const createOnePosts = (
  db,
  moduleCourse,
  postTitle,
  content,
  PostImage,
  courseId,
  teacherIdOrstudentId
) => {
  const post = db.insert("posts", {
    moduleCourse,
    postTitle,
    content,
    status: "pending",
    PostImage,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    courseId,
    teacherIdOrstudentId,
  });

  const allPosts = db.select("posts");
  const postss = allPosts[allPosts.length - 1];
  if (postss) {
    const postId = postss._id;
    notificationsPosts(db, postId, teacherIdOrstudentId, courseId);
  }
};

/**
 * @param {database} db
 * @param {number} idPosts
 */
export const changeStatusPosts = (db, idPosts) => {
  db.update(
    "posts",
    { _id: idPosts },
    {
      status: "close",
    }
  );
};

/**
 * @param {database} db
 * @param {number} idPosts
 * @param {string} postTitle
 * @param {string} content
 */
export const updateOnePosts = (db, idPosts, postTitle, content) => {
  db.update(
    "posts",
    { _id: idPosts },
    {
      moduleCourse,
      postTitle,
      content,
      PostImage,
      lastUpdated: new Date().toISOString(),
    }
  );
};

/**
 * @param {database} db
 * @param {number} idPosts
 */
export const deleteOnePosts = (db, idPosts) => {
  db.delete("posts", { _id: idPosts });
};
