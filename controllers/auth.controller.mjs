/**
 * @param {database} db
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {'student' | 'admin'} role
 * @param {string} bio
 */
export const register = (db, username, email, password) => {
  db.insert("users", {
    username,
    email,
    password,
    role: "student",
    registrationDate: new Date().toISOString(),
    bio: "hello !!",
    courseIds: [],
    notificationReceiveds: [],
  });

  const allUsers = db.select("users");
  const newUserCreated = allUsers[allUsers.length - 1];
  return { userId: newUserCreated._id };
};

/**
 * @param {database} db
 * @param {object} userBodyForm
 */
export const login = (db, userBodyForm) => {
  const user = db.selectOne("users", { email: userBodyForm.email }, true);
  if (user === null) {
    return { errorUser: "user is not exist" };
  }
  if (user.password !== userBodyForm.password) {
    return { errorPassword: "incorrect Password!!!" };
  }

  return { userId: user._id };
};

/*export const logout = () => {
  localStorage.removeItem("userSessionId");
  alert("logout success!!!");
};*/

/**
 * @param  {...(string[])} usersData
 * @param  {database} db
 */
export const createManyUsers = (db, ...usersData) => {
  const usersToInsert = usersData.map((userData) => {
    const [username, email, password, role = "student", bio] = userData;
    return {
      username,
      email,
      password,
      role,
      registrationDate: new Date().toISOString(),
      bio,
      courseIds: [],
      notificationReceiveds: [],
    };
  });
  db.insertMany("users", usersToInsert);
};


/**
 * @param  {database} db
 * @param  {number} userId
 */
export const selectOneUser = (db, userId) =>{
  const user = db.selectOne("users", { _id: userId }, false);
  return user;
}
