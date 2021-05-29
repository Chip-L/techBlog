const { User } = require("../models");

const userData = [
  {
    name: "user_1",
    password: "pass1234",
  },
  {
    name: "user_2",
    password: "pass1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
