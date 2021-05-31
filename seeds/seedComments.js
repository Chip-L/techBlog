const { Comment } = require("../models");

const commentData = [
  {
    comment: "Test comment 2 for post 1",
    created_at: new Date(2021, 4, 27, 15, 05, 12, 0),
    updated_at: new Date(2021, 4, 30, 9, 15, 12, 0),
    user_id: 1,
    post_id: 1,
  },
  {
    comment: "Test comment 3 for post 1",
    user_id: 1,
    post_id: 1,
  },
  {
    comment: "Test comment 2 for past",
    created_at: new Date(2021, 4, 28, 14, 05, 12, 0),
    user_id: 1,
    post_id: 2,
  },
  {
    comment: "Test comment 2 for updated",
    created_at: new Date(2021, 4, 28, 15, 05, 12, 0),
    updated_at: new Date(2021, 4, 31, 9, 15, 12, 0),
    user_id: 2,
    post_id: 2,
  },
  {
    comment:
      "How long is a string of 255 bytes? I know that it is not necessarily 255 characters because not every character is exactly 1 byte. Although it appears that most ASCII characters are only 1 byte. Emojis take more bytes because they aren't ASCII and are a part of 16-UTF, so I estimate they would take 2 bytes each. However, this string is well over 255 bytes, as per https://mothereff.in/byte-counter, this is 419 bytes.",
    user_id: 1,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
