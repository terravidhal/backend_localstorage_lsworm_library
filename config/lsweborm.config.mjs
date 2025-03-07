export const initDb = (schemaParam) => {
    const db = LsWebORM.getInstance(
      "myDatabase",
      localStorage,
      schemaParam
    );
    return db;
  };