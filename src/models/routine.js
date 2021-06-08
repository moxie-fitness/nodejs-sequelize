/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let routine = sequelize.define(
    'routine',
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
      goal_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'lookup_options',
          key: 'id',
        },
      },
      price: {
        type: 'DOUBLE',
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
      tableName: 'routines',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  routine.associate = function(models) {
    routine.belongsTo(models.moxieuser);

    routine.belongsTo(models.lookup_option, {
      foreignKey: 'goal_id',
      as: 'goal',
    });

    routine.hasMany(models.workout_routine, {
      as: 'routine_workouts',
    });

    // routine.belongsToMany(models.workout, {
    //   through: "workout_routines"
    // });

    routine.belongsTo(models.post);

    routine.hasMany(models.rating, {
      foreignKey: 'ratable_id',
      constraints: false,
      scope: {
        ratable: 'routine',
      },
    });

    // Polymorphic for Completable
    routine.hasMany(models.complete, {
      foreignKey: 'completable_id',
      constraints: false,
      scope: {
        completable: 'routine',
      },
    });

    // Defaults
    routine.defaultInclude = [
      {
        model: models.post,
        attributes: ['id', 'media', 'content'],
      },
      {
        model: models.workout_routine,
        as: 'routine_workouts',
        attributes: ['id', 'routine_id', 'workout_id', 'pos', 'week'],
        include: [
          {
            model: models.workout,
            attributes: ['id', 'name', 'moxieuser_id', 'post_id'],
            include: [
              {
                model: models.post,
                attributes: ['id', 'media', 'content'],
              },
            ],
          },
        ],
      },
    ];
  };

  return routine;
};
