/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let workout_routine = sequelize.define(
    'workout_routine',
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
      routine_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'routines',
          key: 'id',
        },
      },
      pos: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
      week: {
        type: DataTypes.INTEGER(4),
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
      tableName: 'workout_routines',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  workout_routine.associate = function(models) {
    workout_routine.belongsTo(models.workout);
    workout_routine.belongsTo(models.routine);
  };

  return workout_routine;
};
