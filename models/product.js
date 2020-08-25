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
      Product.belongsToMany(models.User, {through: models.Cart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        isStringType(product) {
          if (typeof product !== 'string') {
            throw new Error("Only string input type allowed")
          }
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image is required"
        },
        isStringType(url) {
          if (typeof url !== 'string') {
            throw new Error("Only string input type allowed")
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        isNotMinus(price) {
          if (price <= 0) {
            throw new Error("Price cannot be minus value")
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        isNotMinus(price) {
          if (price <= 0) {
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