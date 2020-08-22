'use strict';

const bcrypt = require("bcryptjs")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Name cannot be empty"
        }
      }
    },
    email: {type:DataTypes.STRING,
      unique:{
        args:true,
        msg:"Preferred email has been taken"
      },
      validate:{
        isEmail:{
          args:true,
          msg:"Please enter the right email format"
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    if (instance.role === "") instance.role = "customer"
    const salt = bcrypt.genSaltSync(5)
    if (instance.password) instance.password = bcrypt.hashSync(instance.password,salt)
  })
  return User;
};