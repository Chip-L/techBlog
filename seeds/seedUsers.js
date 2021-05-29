const { User } = require("../models");
const bcrypt = require("bcrypt");

const getUserData = async (numToCreate) => {
  const newUsers = [];
  for (let i = 1; i <= numToCreate; i++) {
    const hashedPwd = bcrypt.hashSync(`pass000${i}`, 10);
    newUsers.push({
      name: `user${i}`,
      password: hashedPwd,
    });
  }
  // console.log("newUsers:", newUsers);
  return newUsers;
};

const seedUsers = () => getUserData(3);

module.exports = seedUsers;
