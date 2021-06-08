/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let exercise_workout = sequelize.define(
    'exercise_workout',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      workout_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'workouts',
          key: 'id',
        },
      },
      exercise_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      pos: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
      sets: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      reps: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      duration_secs: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      weight: {
        type: 'DOUBLE',
        allowNull: true,
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
      tableName: 'exercise_workouts',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  exercise_workout.associate = function(models) {
    exercise_workout.belongsTo(models.workout);
    exercise_workout.belongsTo(models.exercise);
  };

  return exercise_workout;
};
