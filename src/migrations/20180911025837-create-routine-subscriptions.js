'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('routine_subscriptions', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      routine_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'routines',
          key: 'id',
        },
      },
      subscriber_moxieuser_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: 'moxieusers',
          key: 'id',
        },
      },
      payout_batch_id: {
        type: Sequelize.STRING(255),
        allowNull: true, // TEMPORARILY EVERYTHING IS FREE
      },
      payout_time: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('routine_subscriptions');
  },
};
