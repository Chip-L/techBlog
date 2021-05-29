const { Posts } = require("../models");

const postData = [
  {
    title: "Test post 1 for user 1",
    content: "Content for post 1",
    user_id: 1,
  },
  {
    title: "Test post 2 for user 1",
    content: "Content for post 2",
    user_id: 1,
  },
  {
    title: "Test post 1 for user 2",
    content: "Content for post 2",
    user_id: 2,
  },
  {
    title: "Test post 2 for user 2",
    content: "Content for post 2",
    user_id: 2,
  },
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;
