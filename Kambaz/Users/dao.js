import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export default function UsersDao(db) {
  let { users } = db;

  const usersFile = path.join(process.cwd(), "Kambaz", "Database", "users.js");

  function saveUsers() {
    try {
      const content = "export default" + JSON.stringify(users, null, 2) + "\n";
      fs.writeFileSync(usersFile, content, { encoding: "utf8" });
      console.log("[Users.dao] saved users to", usersFile);
    } catch (e) {
      console.error("[Users.dao] failed to save users:", e);
    }
  }

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    console.log("[Users.dao] createUser: added", newUser.username, newUser._id);
    saveUsers();
    return newUser;
  };

  const findAllUsers = () => users;

  const findUserById = (userId) => users.find((user) => user._id === userId);

  const findUserByUsername = (username) => users.find((user) => user.username === username);

  const findUserByCredentials = (username, password) => {
    console.log(`[Users.dao] findUserByCredentials called for: ${username}`);
    const found = users.find((user) => user.username === username && user.password === password);
    console.log(`[Users.dao] findUserByCredentials result: ${found ? found._id : 'not found'}. usersCount=${users.length}`);
    return found;
  };

  const updateUser = (userId, user) => {
    users = users.map((u) => (u._id === userId ? user : u));
    saveUsers();
    return users.find((u) => u._id === userId);
  };

  const deleteUser = (userId) => {
    users = users.filter((u) => u._id !== userId);
    saveUsers();
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}