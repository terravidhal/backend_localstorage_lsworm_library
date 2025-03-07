import { initDb } from "./config/lsweborm.config.mjs";
import { initSchema } from "./models/global.schema.mjs";
import { initData } from "./seeders/insertData.seeder.mjs";



 export const initServer = () => {
    // init schema
    const schema = initSchema();
    // init db
    const db = initDb(schema);
    // log
    console.log("db+++++++", db);
    // init data
   // initData(db);
   // delete enrollements
   // localStorage.removeItem("userEnrollments")
   // logout
  // localStorage.removeItem("userSessionId");
   // delete database
  //  localStorage.removeItem("myDatabase")



   // updateStatusEnrollCourse(db, 1, true)
   // const t = db.update("courses", { _id: 1 }, { enrolled: true });
   // console.log("t+++++++", db.selectOne("users", { _id: 2 }, false));
   // console.log("t+++++++", db.selectOne("users", { _id: 2 }, false).courseIds);

    return db;
  };

 