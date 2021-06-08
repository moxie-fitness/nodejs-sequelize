/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let complete = sequelize.define(
    'complete',
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
      comment: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      completable_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
      },
      completable: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      completed: {
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
      tableName: 'completes',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  // Polymorphically get Workout or Routine
  complete.prototype.getItem = function(options) {
    return this[
      'get' +
        this.get('completable')
          .substr(0, 1)
          .toUpperCase() +
        this.get('completable').substr(1)
    ](options);
  };

  complete.associate = function(models) {
    complete.belongsTo(models.moxieuser);

    complete.belongsTo(models.rating, {
      foreignKey: 'completable_id',
      constraints: false,
      scope: {
        ratable: 'exercise',
      },
    });

    complete.belongsTo(models.rating, {
      foreignKey: 'completable_id',
      constraints: false,
      scope: {
        ratable: 'workout',
      },
    });

    complete.belongsTo(models.rating, {
      foreignKey: 'completable_id',
      constraints: false,
      scope: {
        ratable: 'routine',
      },
    });

    // Polymorphic for Workout & Routines
    complete.belongsTo(models.workout, {
      foreignKey: 'completable_id',
      constraints: false,
      as: 'workout',
    });

    complete.belongsTo(models.routine, {
      foreignKey: 'completable_id',
      constraints: false,
      as: 'routine',
    });

    complete.belongsTo(models.routine_workout_user, {
      foreignKey: 'completable_id',
      constraints: false,
      as: 'routine_workout_user',
    });
  };

  return complete;
};
