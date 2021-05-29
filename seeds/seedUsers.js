const { User } = require("../models");
const bcrypt = require("bcrypt");

// const getUserData = async (numToCreate) => {
//   const newUsers = [];
//   for (let i = 1; i <= numToCreate; i++) {
//     const hashedPwd = bcrypt.hashSync(`pass000${i}`, 10);
//     newUsers.push({
//       name: `user${i}`,
//       password: hashedPwd,
//     });
//   }
//   // console.log("newUsers:", newUsers);
//   return newUsers;
// };

const getUserData = [
  {
    name: "user1",
    password: "pass0001",
  },
  {
    name: "user2",
    password: "pass0002",
  },
];

const seedUsers = () => getUserData; //(3);

module.exports = seedUsers;
