/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let feed = sequelize.define(
    'feed',
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
      post_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'posts',
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
      tableName: 'feeds',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  feed.associate = function(models) {
    feed.belongsTo(models.post);

    feed.belongsTo(models.moxieuser);
  };

  return feed;
};
