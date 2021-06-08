/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let lookup_option = sequelize.define(
    'lookup_option',
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
      },
      opt: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      lookup_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'lookups',
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
      tableName: 'lookup_options',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  lookup_option.associate = function(models) {
    lookup_option.belongsTo(models.lookup);
  };

  return lookup_option;
};
