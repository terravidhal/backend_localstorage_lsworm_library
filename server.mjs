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
    return db;
  };

 