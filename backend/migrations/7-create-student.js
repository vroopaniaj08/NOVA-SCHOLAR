'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference:{
          model:"Courses",
          key:"id"
        }
      },
      firstname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      fathername: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      mothername: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      cast: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        required: true,
        allowNull: false,
      },
      mobile1: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      mobile2: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING,
        required: true,
      },
      gender: {
        type: Sequelize.STRING,
        required: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      LeadSource: {
        type: Sequelize.STRING,
        // allowNull: false,
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
    await queryInterface.dropTable('students');
  }
};