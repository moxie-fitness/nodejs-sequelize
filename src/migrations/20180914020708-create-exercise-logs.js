'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercise_logs', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      moxieuser_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: 'moxieusers',
          key: 'id',
        },
      },
      exercise_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      complete_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'completes',
          key: 'id',
        },
      },
      sets: {
        type: Sequelize.INTEGER(4),
        allowNull: true,
      },
      reps: {
        type: Sequelize.INTEGER(4),
        allowNull: true,
      },
      duration_secs: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      weight: {
        type: 'DOUBLE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('exercise_logs');
  },
};
