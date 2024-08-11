'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transportation.init({
    city: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fee:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    is_active: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transportation',
  });
  return Transportation;
};