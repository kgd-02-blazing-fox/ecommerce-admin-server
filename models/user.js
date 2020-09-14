'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Format field nya harus email'
        },
        notEmpty: {
          args: true,
          msg: 'User email is required'
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 16],
          msg: 'Password length more than 3 and less than 16'
        },
        notEmpty: {
          args: true,
          msg: 'User password is required'
        },
        notNull: {
          msg: 'Please enter your password'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user) {
        user.role = 'user',
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};