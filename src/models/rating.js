/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let rating = sequelize.define(
    'rating',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      moxieuser_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'moxieusers',
          key: 'id',
        },
      },
      value: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      ratable_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      ratable: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: 'ratings',
      timestamps: true,
      paranoid: true,
      underscored: true,
      instanceMethods: {
        getItem: () => {
          return this[
            'get' +
              this.get('ratable')
                .substr(0, 1)
                .toUpperCase() +
              this.get('ratable').substr(1)
          ]();
        },
      },
    }
  );

  rating.associate = function(models) {
    rating.belongsTo(models.moxieuser);

    rating.belongsTo(models.post, {
      foreignKey: 'ratable_id',
      constraints: false,
      as: 'post',
    });
  };
  return rating;
};
