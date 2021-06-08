/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let post = sequelize.define(
    'post',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      media: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(1000),
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
      tableName: 'posts',
      timestamps: true,
      paranoid: true,
      underscored: true,
      instanceMethods: {
        getItem: () => {
          return this[
            'get' +
              this.get('postable')
                .substr(0, 1)
                .toUpperCase() +
              this.get('postable').substr(1)
          ]();
        },
      },
    }
  );

  post.associate = function(models) {
    post.hasMany(models.comment);
    post.hasMany(models.rating, {
      sourceKey: 'id',
      foreignKey: 'ratable_id',
      as: 'ratings',
    });
  };

  return post;
};
