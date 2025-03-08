# Student Forum - Backend

## Description
This project is the backend of a student forum, built in JavaScript using the library [LsWebORM](https://www.npmjs.com/package/ls-weborm). The application manages users, courses, posts, comments, and notifications through `localStorage`.

LsWebORM allows the creation of a backend based on `localStorage`, while remaining fully native with HTML, CSS, and JavaScript.

## Technologies Used
- **JavaScript (ES6+)**
- **LsWebORM**: ORM for `localStorage`

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install ls-weborm
   ```

You can also use one of the CDN links directly on your page:

```html
<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/ls-weborm/dist/LsWebORM.js"></script>

<!-- OR -->

<!-- UNPKG -->
<script src="https://unpkg.com/ls-weborm/dist/LsWebORM.js"></script>
```

Or download the `LsWebORM.js` file and place it in an `api` folder, as done in this project.

## Project Structure

### Using the CDN
```
/backend
│── config/
│   ├── lsweborm.config.mjs  # Database configuration
│── controllers/
│   ├── auth.controller.mjs   # User management (registration, login...)
│── models/
│   ├── global.schema.mjs     # Database schema definition
│── seeders/
│   ├── insertData.seeder.mjs # Initial data insertion
│── server.mjs               # Server initialization
│── README.md                # Documentation
```

### Without the CDN (using a local `LsWebORM.js` file)
```
/backend
│── api/
│   ├── LsWebORM.js          # Library downloaded from the CDN
│── config/
│   ├── lsweborm.config.mjs  # Database configuration
│── controllers/
│   ├── auth.controller.mjs   # User management (registration, login...)
│── models/
│   ├── global.schema.mjs     # Database schema definition
│── seeders/
│   ├── insertData.seeder.mjs # Initial data insertion
│── server.mjs               # Server initialization
│── README.md                # Documentation
```

## Features

### User Authentication
- **register(db, username, email, password)**: Registers a user (default role: "student").
- **login(db, userBodyForm)**: Logs in a user.
- **selectOneUser(db, userId)**: Retrieves user information.

### Data Management
- **initSchema()**: Defines the database structure.
- **initDb(schemaParam)**: Initializes the database.
- **initData(db)**: Inserts sample users and courses.

## Example Usage

```js
import { initServer } from "./server.mjs";

const db = initServer();

// Registering a new user
db.insert("users", {
  username: "johnDoe",
  email: "john@example.com",
  password: "securepass",
  role: "student",
  bio: "Hi, I'm John!",
});
```

## Note
LsWebORM uses `localStorage`, meaning data is stored locally and will be lost if the user clears their storage.

## Author
[Vidhal Elame](https://www.linkedin.com/in/marsile-vidhal-elame-0543b5178/)

