const { usersArray } = require("../external-dependencies/database");

function getAllUserDetails() {
  return usersArray;
}

function getSingleUserDetails(userId) {
  const itemIdx = usersArray.findIndex((user) => user.id === userId);

  if (itemIdx > -1) {
    return usersArray[itemIdx];
  } else {
    throw new Error("no-matching-item-found");
  }
}

function addUser(userObj) {
  // You can do DB Operations
  usersArray.push(userObj);

  return userObj;
}

function updateUser(userId, name) {
  const itemIdx = usersArray.findIndex((user) => user.id === userId);

  if (itemIdx > -1) {
    // Update inside an array of objects
    usersArray[itemIdx].name = name;
    return usersArray[itemIdx];
  } else {
    throw new Error("no-matching-item-found");
  }
}

function deleteUser(userId) {
  const itemIdx = usersArray.findIndex((user) => user.id === userId);

  if (itemIdx > -1) {
    usersArray.splice(itemIdx, 1);
  } else {
    throw new Error("no-matching-item-found");
  }
}

module.exports = {
  getAllUserDetails,
  getSingleUserDetails,
  addUser,
  updateUser,
  deleteUser,
};
