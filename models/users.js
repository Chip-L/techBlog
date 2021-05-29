const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  // add encryption
  // async hashPassword(userData) {
  //   userData.password = await bcrypt.hash(userData.password, 12);
  //   return userData;
  // }

  checkPasswords(loginPw) {
    return bcrypt.compare(loginPw, this.password);
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
        console.log("before create");
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      beforeUpdate: async (userData) => {
        console.log("before update");
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
