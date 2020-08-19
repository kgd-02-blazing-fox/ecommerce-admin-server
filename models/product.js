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
    name: {type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Please fill in the product name"
        }
      }
    },
    image_url: {type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Please fill in the product image"
        }
      }
    },
    price: {type:DataTypes.INTEGER,
      validate:{
        invalidValue(value) {
          if(!value) throw new Error("Please fill in the product price")
        },
        negativeValue(value) {
          if (value<0) throw new Error("Please fill in the right price format")
        }
      }
    },
    stock: {type:DataTypes.INTEGER,
      validate:{
        negativeValue(value) {
          if (value<0) throw new Error("Please fill in the right stock format")
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};