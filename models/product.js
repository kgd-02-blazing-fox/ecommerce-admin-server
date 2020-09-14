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
        notEmpty: {
          args: true,
          msg: 'Product name is required'
        }
      }

    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product Image Url is required'
        }
      }

    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        notEmpty: {
          args: true,
          msg: 'Product price is required'
        }
      }

    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        notEmpty: {
          args: true,
          msg: 'Product stock is required'
        }
      }

    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};