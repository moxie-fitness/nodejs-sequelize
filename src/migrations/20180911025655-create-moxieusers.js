'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('moxieusers', {
      id: {
        type: Sequelize.STRING(48),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      firebase_fcm_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      stripe_user_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      media: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      gender: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
      },
      unit: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
      },
      is_public: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: '0',
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
    return queryInterface.dropTable('moxieusers');
  },
};
