/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let moxieuser = sequelize.define(
    'moxieuser',
    {
      id: {
        type: DataTypes.STRING(48),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      firebase_fcm_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      stripe_user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      media: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      unit: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      tableName: 'moxieusers',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  moxieuser.associate = function(models) {
    moxieuser.hasMany(models.height, { as: 'heights' });
    moxieuser.hasMany(models.weight, { as: 'weights' });
    moxieuser.hasMany(models.exercise, { as: 'exercises' });
    moxieuser.hasMany(models.workout, { as: 'workouts' });
    moxieuser.hasMany(models.routine, { as: 'routines' });
    moxieuser.hasMany(models.routine_workout_user, {
      as: 'activeRoutineWorkouts',
    });
    moxieuser.belongsToMany(models.routine_subscription, {
      through: 'routine_subscription',
      foreignKey: 'subscriber_moxieuser_id',
      as: 'routineSubscriptions',
    });
    moxieuser.hasMany(models.exercise_log, { as: 'exerciseLogs' });
  };
  return moxieuser;
};
