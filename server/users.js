const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) {
    return { error: "User already taken" };
  }

  const user = { id, name, room };
  users.push(user);
  //user is returing as a object, so that can be destructured
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(exits, 1)[0];
  }
};

//getuser returns a whole user obj
const getUser = (id) => users.find((user) => user.id === id);

//get user who is in the specific room
const getUserInRoom = () => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserInRoom };
