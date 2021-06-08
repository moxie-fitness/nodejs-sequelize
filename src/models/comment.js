/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let comment = sequelize.define(
    'comment',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      media: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      post_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
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
      tableName: 'comments',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  comment.associate = function(models) {
    comment.belongsTo(models.moxieuser);

    comment.belongsTo(models.post, {
      foreignKey: 'post_id',
      as: 'post',
    });

    comment.hasMany(models.rating, {
      sourceKey: 'id',
      foreignKey: 'ratable_id',
      as: 'ratings',
    });
  };

  return comment;
};
