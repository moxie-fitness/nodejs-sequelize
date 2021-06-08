/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let exercise_log = sequelize.define(
    'exercise_log',
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
      exercise_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      complete_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: 'completes',
          key: 'id',
        },
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
      tableName: 'exercise_logs',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  exercise_log.associate = function(models) {
    exercise_log.belongsTo(models.moxieuser);
    exercise_log.belongsTo(models.exercise);
    exercise_log.belongsTo(models.complete);
  };

  return exercise_log;
};
