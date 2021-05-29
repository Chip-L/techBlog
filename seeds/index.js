const sequelize = require("../config/connection");
const seedUsers = require("./seedUsers");
const seedPosts = require("./seedPosts");
const { User, Post } = require("../models");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await seedUsers();
  await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });
  await seedPosts();

  process.exit(0);
};

seedAll();
