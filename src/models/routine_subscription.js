/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let routine_subscription = sequelize.define(
    'routine_subscription',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      routine_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'routines',
          key: 'id',
        },
      },
      subscriber_moxieuser_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'moxieusers',
          key: 'id',
        },
      },
      payout_batch_id: {
        type: DataTypes.STRING(255),
        allowNull: true, // TEMPORARILY EVERYTHING IS FREE
      },
      payout_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'routine_subscriptions',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  routine_subscription.associate = function(models) {
    routine_subscription.belongsTo(models.routine);
    routine_subscription.belongsTo(models.moxieuser, {
      foreignKey: 'subscriber_moxieuser_id',
      as: 'moxieuser',
    });
  };

  return routine_subscription;
};
