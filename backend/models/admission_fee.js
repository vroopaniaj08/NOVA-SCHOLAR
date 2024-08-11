'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admission_fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admission_fee.belongsTo(models.Course,{foreignKey:"course_id",as:"course_info"})
    }
  }
  Admission_fee.init({
    fee:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    description: DataTypes.STRING,
    is_active: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Admission_fee',
  });
  return Admission_fee;
};