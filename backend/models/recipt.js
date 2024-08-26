'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipt.belongsTo(models.student,{foreignKey:"student_id",as:"student_fee_recipt"})
    }
  }
  Recipt.init({
    date: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    amount: {
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
    modelName: 'Recipt',
  });
  return Recipt;
};