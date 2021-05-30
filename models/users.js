const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPwd) {
    return bcrypt.compare(loginPwd, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      beforeUpdate: async (userData) => {
        if (userData.password) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }
        return userData;
      },
    },

    sequelize,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
