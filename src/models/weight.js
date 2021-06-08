/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let weight = sequelize.define(
    'weight',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: 'DOUBLE',
        allowNull: false,
      },
      moxieuser_id: {
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
      tableName: 'weights',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  weight.associate = function(models) {
    weight.belongsTo(models.moxieuser);
  };
  return weight;
};
