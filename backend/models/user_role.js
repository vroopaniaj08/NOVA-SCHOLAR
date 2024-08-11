'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_role.belongsTo(models.User,{foreignKey:"user_id",as:"user_info"})
      User_role.belongsTo(models.Role,{foreignKey:"role_id",as:"role_info"})
    }
  }
  User_role.init({
    is_active: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_role',
  });
  return User_role;
};