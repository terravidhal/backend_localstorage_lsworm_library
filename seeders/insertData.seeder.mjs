import { createManyUsers } from "../controllers/auth.controller.mjs";
import { createManyCourses } from "../controllers/courses.controller.mjs";

export const initData = (db) =>{
    const usersData = [
        ["admin", "admin@gmail.com", "adming24", "admin", "hello i am admin"],
        [
          "thomas",
          "thomas@gmail.com",
          "thomasg24",
          "student",
          "hello i am thomas",
        ],
        ["simon", "simon@gmail.com", "simong24", "student", "hello i am simon"],
        ["lea", "lea@gmail.com", "leap24", "student", "hello i am lea"],
      ];
      createManyUsers(db, ...usersData); 
  
      const coursesData = [
        ["Mathématiques", "Cours de mathématiques", 1],
        ["Physique", "Cours de physique", 2],
        ["Informatique", "Cours d'informatique", 3],
      ];
      
      createManyCourses(db, ...coursesData);
}