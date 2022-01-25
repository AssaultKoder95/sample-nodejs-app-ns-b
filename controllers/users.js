// const { usersArray } = require("../external-dependencies/database");

const { findOne } = require("../schemas/user");
const UserModel = require("../schemas/user");

// function getAllUserDetails() {
//   return usersArray;
// }

async function getAllUserDetails() {
  try {
    const items = await UserModel.find({});
    console.log(items);

    return items;
  } catch (error) {
    throw error;
  }
}

// function getSingleUserDetails(userId) {
//   const itemIdx = usersArray.findIndex((user) => user.id === userId);

//   if (itemIdx > -1) {
//     return usersArray[itemIdx];
//   } else {
//     throw new Error("no-matching-item-found");
//   }
// }

async function getSingleUserDetails(userId) {
  try {
    const item = await UserModel.findById(userId);

    // (findById) => findOne({ _id: ObjectId(id) });

    console.log(item);

    return item;
  } catch (err) {
    throw err;
  }
}

async function addUser(userObj) {
  try {
    console.log("ORG DATA", userObj);

    const user = new UserModel(userObj);

    await user.save(function (err, data) {
      if (err) {
        console.log(err);
      }

      console.log(data);
    });

    return userObj;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userId, name) {
  try {
    const item = await UserModel.findByIdAndUpdate(userId, { name });

    // (findById) => findOne({ _id: ObjectId(id) });

    console.log(item);

    return item;
  } catch (err) {
    throw err;
  }
}

async function deleteUser(userId) {
  try {
    const item = await UserModel.findByIdAndDelete(userId);

    // (findById) => findOne({ _id: ObjectId(id) });

    console.log(item);

    return item;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllUserDetails,
  getSingleUserDetails,
  addUser,
  updateUser,
  deleteUser,
};
