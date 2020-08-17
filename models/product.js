'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Name is required"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNotMinus(price){
          if(price <= 0){
            throw new Error("Price cannot be minus value")
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNotMinus(price){
          if(price <= 0){
            throw new Error("Stock cannot be minus value")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};