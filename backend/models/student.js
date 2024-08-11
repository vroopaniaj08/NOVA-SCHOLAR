'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student.belongsTo(models.Course,{foreignKey:"course_id",as:"course_info"})
    }
  }
  student.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fathername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mothername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cast: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mobile1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile2: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    LeadSource: {
      type: DataTypes.STRING,
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
    modelName: 'student',
  });
  return student;
};