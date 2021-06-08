/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let routine_workout_user = sequelize.define(
    'routine_workout_user',
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
      completable_routine_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'completables',
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
      day: {
        type: DataTypes.DATE,
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
      tableName: 'routine_workout_users',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  routine_workout_user.associate = function(models) {
    routine_workout_user.belongsTo(models.workout, {
      foreignKey: 'workout_id',
      as: 'workout',
    });

    routine_workout_user.belongsTo(models.routine, {
      foreignKey: 'routine_id',
      as: 'routine',
    });

    routine_workout_user.belongsTo(models.moxieuser, {
      foreignKey: 'moxieuser_id',
      as: 'moxieuser',
    });

    routine_workout_user.belongsTo(models.complete, {
      foreignKey: 'completable_routine_id',
      as: 'completable_routine',
    });

    // // Polymorphic for Completable
    // routine_workout_user.belongsTo(models.complete, {
    //   foreignKey: 'completable_id',
    //   constraints: false,
    //   scope: {
    //     completable: 'routine_user_workout',
    //   },
    // });
  };

  return routine_workout_user;
};
