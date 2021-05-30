const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {
  // add encryption
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT, // large sized content area (65,535 bytes)
      allowNull: true, // they can enter only a title
    },
    // date_created: {}, -- let timestamp deal with this as createAt/updatedAt
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, // ensure timestamps exist
    mode: "post",
  }
);

module.exports = Post;
