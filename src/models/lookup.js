/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let lookup = sequelize.define(
    'lookup',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'valueIX',
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
      tableName: 'lookups',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  lookup.associate = function(models) {};

  return lookup;
};
