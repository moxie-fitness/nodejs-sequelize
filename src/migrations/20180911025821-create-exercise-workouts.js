'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercise_workouts', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      workout_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'workouts',
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
      pos: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
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
    return queryInterface.dropTable('exercise_workouts');
  },
};
