// each user can have many posts. each post can only have 1 user
const User = require("./users");
const Post = require("./posts");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User);

module.exports = { User, Post };
