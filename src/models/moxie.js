/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let moxie = sequelize.define(
    'moxie',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      from_moxieuser_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'moxieusers',
          key: 'id',
        },
      },
      to_moxieuser_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'moxieusers',
          key: 'id',
        },
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
      tableName: 'moxies',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  moxie.associate = function(models) {
    moxie.belongsTo(models.moxieuser, {
      foreignKey: 'from_moxieuser_id',
      as: 'from',
    });

    moxie.belongsTo(models.moxieuser, {
      foreignKey: 'to_moxieuser_id',
      as: 'to',
    });
  };

  return moxie;
};
