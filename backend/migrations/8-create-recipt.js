'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        reference:{
          model:"students",
          key:"id"
        }
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipts');
  }
};