/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let exercise = sequelize.define(
    'exercise',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
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
      youtube_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      muscle_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'lookup_options',
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
      tableName: 'exercises',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  exercise.associate = function(models) {
    exercise.belongsTo(models.lookup_option, {
      foreignKey: 'muscle_id',
      as: 'muscle',
    });

    exercise.belongsTo(models.post, {
      foreignKey: 'post_id',
      as: 'post',
    });

    exercise.belongsTo(models.moxieuser);

    exercise.belongsToMany(models.lookup_option, {
      through: 'exercise_equipments',
      foreignKey: 'exercise_id',
      otherKey: 'equipment_id',
      as: 'equipment',
    });

    exercise.belongsToMany(models.workout, {
      through: 'exercise_workouts',
      foreignKey: 'exercise_id',
      otherKey: 'workout_id',
    });

    exercise.fullInclude = [
      {
        model: models.lookup_option,
        attributes: ['id', 'value', 'opt'],
        as: 'muscle',
      },
      {
        model: models.post,
        attributes: ['id', 'media', 'content'],
        as: 'post',
      },
      {
        model: models.lookup_option,
        attributes: ['id', 'value', 'opt'],
        as: 'equipment',
      },
    ];
  };

  return exercise;
};
