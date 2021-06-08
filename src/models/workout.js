'use strict';

module.exports = function(sequelize, DataTypes) {
  var workout = sequelize.define(
    'workout',
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
      post_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      difficulty_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'lookup_options',
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
      tableName: 'workouts',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  workout.associate = function(models) {
    workout.belongsTo(models.moxieuser);

    workout.belongsTo(models.post);

    workout.belongsToMany(models.routine, {
      through: models.workout_routine,
      foreignKey: 'workout_id',
      otherKey: 'routine_id',
      as: 'routine',
      onDelete: 'CASCADE',
    });

    workout.hasMany(models.exercise_workout, {
      as: 'workout_exercises',
    });

    workout.belongsToMany(models.exercise, {
      through: 'exercise_workouts',
      as: 'exercises',
    });

    workout.belongsTo(models.lookup_option, {
      foreignKey: 'difficulty_id',
      as: 'goal',
    });

    // Polymorphic for Completable
    workout.hasMany(models.complete, {
      foreignKey: 'completable_id',
      constraints: false,
      scope: {
        completable: 'workout',
      },
    });

    // Defaults
    workout.defaultInclude = [
      {
        model: models.post,
        attributes: ['id', 'media', 'content'],
      },
      {
        model: models.exercise_workout,
        as: 'workout_exercises',
        include: [
          {
            model: models.exercise,
            include: models.exercise.fullInclude,
          },
        ],
      },
      {
        model: models.moxieuser,
      },
      {
        model: models.lookup_option,
        as: 'goal',
      },
    ];
  };

  return workout;
};
