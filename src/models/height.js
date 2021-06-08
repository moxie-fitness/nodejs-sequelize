/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let height = sequelize.define(
    'height',
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
      tableName: 'heights',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  height.associate = function(models) {
    height.belongsTo(models.moxieuser);
  };
  return height;
};
