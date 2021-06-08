/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let exercise_equipment = sequelize.define(
    'exercise_equipment',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      exercise_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      equipment_id: {
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
      tableName: 'exercise_equipments',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  exercise_equipment.associate = function(models) {
    exercise_equipment.belongsTo(models.exercise);
    exercise_equipment.belongsTo(models.lookup_option, {
      foreignKey: 'equipment_id',
      as: 'equipment',
    });
  };

  return exercise_equipment;
};
