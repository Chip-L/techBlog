const { Post } = require("../models");
const { update } = require("../models/users");

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
  {
    title: "How long of a post can it be?",
    content:
      "How long is a string of 255 bytes? I know that it is not necessarily 255 characters because not every character is exactly 1 byte. Although it appears that most ASCII characters are only 1 byte. Emojis take more bytes because they aren't ASCII and are a part of 16-UTF, so I estimate they would take 2 bytes each. However, this string is well over 255 bytes, as per https://mothereff.in/byte-counter, this is 419 bytes.",
    user_id: 1,
    created_at: new Date(2021, 4, 28, 14, 05, 12, 0),
    updated_at: new Date(2021, 4, 31, 15, 05, 12, 0),
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
