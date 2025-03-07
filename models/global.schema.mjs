export const initSchema = () => {
  const schema = {
    users: {
      table: "users",
      attributes: {
        id: { type: "number" },
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        role: { type: "string" },
        registrationDate: { type: "string" },
        bio: { type: "string" },
        courseIds: { type: "array" },
        notificationReceiveds: { type: "array" },
      },
      relationships: [
        {
          type: "one-to-many",
          relatedTable: "courses",
          foreignKey: "teacherId",
        },
        {
          type: "one-to-many",
          relatedTable: "posts",
          foreignKey: "teacherIdOrstudentId",
        },
        {
          type: "one-to-many",
          relatedTable: "comments",
          foreignKey: "teacherIdOrstudentId",
        },
        {
          type: "one-to-many",
          relatedTable: "notifications",
          foreignKey: "teacherIdOrstudentIdCreated",
        },
      ],
      autoIncrement: true,
    },

    courses: {
      table: "courses",
      attributes: {
        id: { type: "number" },
        enrolled: { type: "boolean" },
        name: { type: "string" },
        description: { type: "string" },
        teacherId: { type: "number" },
        studentIds: { type: "array" },
      },
      relationships: [
        {
          type: "many-to-one",
          relatedTable: "users",
          foreignKey: "teacherId",
        },
        {
          type: "one-to-many",
          relatedTable: "posts",
          foreignKey: "courseId",
        },
        {
          type: "one-to-many",
          relatedTable: "comments",
          foreignKey: "courseId",
        },
      ],
      autoIncrement: true,
    },

    posts: {
      table: "posts",
      attributes: {
        id: { type: "number" },
        moduleCourse: { type: "string" },
        postTitle: { type: "string" },
        content: { type: "string" },
        status: { type: "string" },
        PostImage: { type: "string" },
        createdAt: { type: "string" },
        lastUpdated: { type: "string" },
        courseId: { type: "number" },
        teacherIdOrstudentId: { type: "number" },
      },
      relationships: [
        {
          type: "many-to-one",
          relatedTable: "courses",
          foreignKey: "courseId",
        },
        {
          type: "many-to-one",
          relatedTable: "user",
          foreignKey: "teacherIdOrstudentId",
        },
        {
          type: "one-to-many",
          relatedTable: "comments",
          foreignKey: "postId",
        },
        {
          type: "one-to-one",
          relatedTable: "notifications",
          foreignKey: "postId",
        },
      ],
      autoIncrement: true,
    },

    comments: {
      table: "comments",
      attributes: {
        id: { type: "number" },
        content: { type: "string" },
        status: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        postId: { type: "number" },
        teacherIdOrstudentId: { type: "number" },
      },
      relationships: [
        {
          type: "many-to-one",
          relatedTable: "posts",
          foreignKey: "postId",
        },
        {
          type: "many-to-one",
          relatedTable: "users",
          foreignKey: "teacherIdOrstudentId",
        },
        {
          type: "one-to-one",
          relatedTable: "notifications",
          foreignKey: "commentsId",
        },
      ],
      autoIncrement: true,
    },

    notifications: {
      table: "notifications",
      attributes: {
        id: { type: "string" },
        contentMessage: { type: "string" },
        createdAt: { type: "string" },
        typeNotificat: { type: "string" },
        postIdOrCommentsId: { type: "number" },
        teacherIdOrstudentIdCreated: { type: "number" },
        teacherIdOrstudentIdReceiveds: { type: "array" },
      },
      relationships: [
        {
          type: "many-to-one",
          relatedTable: "users",
          foreignKey: "teacherIdOrstudentIdCreated",
        },
      ],
      autoIncrement: true,
    },
  };

  return schema;
};
