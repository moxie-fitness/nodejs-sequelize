import {
  workout,
  routine,
  workout_routine,
  routine_workout_user,
  complete,
  Sequelize,
  sequelize,
  post,
} from '../../models';

const Op = Sequelize.Op;

const create = async (req, res) => {
  return routine
    .create({
      ...req.body,
    })
    .then(async routine => {
      let pivot = req.body.routine_workouts || [];
      let routineWorkouts = pivot.map(wr => {
        return {
          workout_id: wr.workout_id,
          routine_id: routine.id,
          pos: wr.pos,
          week: wr.week,
        };
      });
      if (routineWorkouts && routineWorkouts.length > 0) {
        await workout_routine.bulkCreate(routineWorkouts);
      }
      return res.status(201).send(routine);
    })
    .catch(error => res.status(400).send(error));
};

const retrieve = async (req, res) => {
  try {
    let routineWithRelations = await routine.findOne({
      where: { id: req.params.id },
      include: routine.defaultInclude,
    });
    return res.status(201).send(routineWithRelations);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const list = async (req, res) => {
  try {
    console.log(req.body);
    let take = parseInt(req.body.take) || 15;
    let offset = parseInt(req.body.offset) || 0;
    let sortBy = req.body.sortBy || 'RoutinesSort.name';
    let onlyMine = (req.body.onlyMine || 'false') == 'true';
    let orderDescAsc = req.body.order || 'asc';
    let attributes = {};
    let whereClause = {};
    const searchText = req.body.searchText;

    if (sortBy == 'RoutinesSort.name') {
      sortBy = Sequelize.literal('name');
    } else if (sortBy == 'RoutinesSort.workout_count') {
      sortBy = Sequelize.literal('workout_count');
      orderDescAsc = 'desc';
      attributes = Object.keys(routine.attributes).concat([
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM workout_routines WHERE workout_routines.routine_id = routine.id)`
          ),
          'workout_count',
        ],
      ]);
    } else if (sortBy == 'RoutinesSort.price') {
      sortBy = Sequelize.literal('price');
    } else if (sortBy == 'RoutinesSort.rating') {
      sortBy = Sequelize.literal('rating');
      attributes = Object.keys(routine.attributes).concat([
        [
          Sequelize.literal(
            `(
              SELECT AVG(ratings.value) 
              FROM ratings
              WHERE ratings.ratable_id = routine.id
            )`
          ),
          'rating',
        ],
      ]);
    }

    whereClause = onlyMine
      ? {
          [Op.or]: [
            { moxieuser_id: req.uid },
            { moxieuser_id: 'Moxie_Fitness_Id' },
          ],
        }
      : {};

    // Only occurs from Search Routines page, which ignores onlyMine.
    if (searchText) {
      whereClause = {
        name: { [Op.like]: `%${searchText}%` },
      };
    }

    let routines = await routine.findAll({
      attributes: attributes,
      include: routine.defaultInclude,
      where: whereClause,
      order: [[sortBy, orderDescAsc]],
      limit: take,
      offset: offset,
    });
    return res.status(201).send(routines);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const _endRoutine = async moxieuserId => {
  try {
    console.log('ending routine', moxieuserId);
    let transaction = await sequelize.transaction();

    // Destroy Routine Completable
    await complete.destroy(
      {
        where: {
          moxieuser_id: moxieuserId,
          completable: 'routine',
          completed: false,
        },
      },
      { transaction: transaction }
    );

    // Remove any unfinished completes & routine_workout_user
    const routineUserWorkCompletesToDelete = await complete.findAll(
      {
        where: {
          moxieuser_id: moxieuserId,
          completable: 'routine_workout_user',
          completed: false,
        },
      },
      {
        transaction: transaction,
      }
    );

    const routineUserWorkoutIdsFromCompletes = routineUserWorkCompletesToDelete.map(
      wc => wc.completable_id
    );

    const completesIdsToDelete = routineUserWorkCompletesToDelete.map(
      wc => wc.id
    );

    const rwus = await routine_workout_user.destroy(
      {
        where: {
          id: routineUserWorkoutIdsFromCompletes,
        },
      },
      {
        transaction: transaction,
      }
    );

    await complete.destroy(
      {
        where: {
          id: completesIdsToDelete,
        },
      },
      { transaction: transaction }
    );

    transaction.commit();
    return true;
  } catch (err) {
    transaction.rollback();
    return false;
  }
};

const startRoutine = async (req, res) => {
  // const moxieuser_id = 'lvBh8RqLFrMMVXaajg1OgaWBGU92';
  const moxieuser_id = req.uid;
  const routine_id = parseInt(req.params.id);
  const endPrevious = req.body.endPrevious;

  if (endPrevious) {
    const success = await _endRoutine(moxieuser_id);
    if (!success) {
      return res.send({
        error: true,
        message: 'Unable to remove existing active routine.',
      });
    }
  } else {
    const existingActiveRoutine = await complete.findOne({
      where: {
        moxieuser_id: moxieuser_id,
        completable: 'routine',
        completed: false,
      },
    });

    if (existingActiveRoutine) {
      return res.send({
        error: true,
        message: 'Existing active routine.',
      });
    }
  }

  try {
    let transaction = await sequelize.transaction();

    const routineWithRelations = await routine.findOne(
      {
        where: { id: routine_id },
        include: routine.defaultInclude,
      },
      {
        transaction: transaction,
      }
    );

    // Create initial complete for Routine
    const routineCompletable = await complete.create(
      {
        moxieuser_id: moxieuser_id,
        completable_id: routine_id,
        completable: 'routine',
      },
      {
        transaction: transaction,
      }
    );

    let completesToCreate = [];
    let routineWorkoutUsersToCreate = [];
    const routineWorkouts = routineWithRelations.routine_workouts;

    // Create a complete & routine_workout_user for each workout.
    if (routineWorkouts) {
      routineWorkouts.sort((a, b) => {
        const weekDiff = a.week - b.week;
        if (weekDiff === 0) {
          return a.pos - b.pos;
        }
        return weekDiff;
      });

      // Note: {week} in routineWorkouts starts at 0, and {pos} starts at 0.
      const startDate = new Date(); // Dates are in UTC
      for (let i = 0; i < routineWorkouts.length; i++) {
        const workoutRoutine = routineWorkouts[i];
        const daysToAdd = workoutRoutine.week * 7 + workoutRoutine.pos;
        const date = new Date();
        date.setDate(startDate.getDate() + daysToAdd);
        routineWorkoutUsersToCreate.push({
          routine_id: workoutRoutine.routine_id,
          workout_id: workoutRoutine.workout_id,
          moxieuser_id: moxieuser_id,
          completable_routine_id: routineCompletable.id,
          day: date,
        });
      }
      const routineWorkoutUsers = await routine_workout_user.bulkCreate(
        routineWorkoutUsersToCreate,
        {
          transaction: transaction,
        }
      );

      for (let i = 0; i < routineWorkoutUsers.length; i++) {
        const routineWorkoutUser = routineWorkoutUsers[i];
        completesToCreate.push({
          moxieuser_id: moxieuser_id,
          completable_id: routineWorkoutUser.id,
          completable: 'routine_workout_user',
        });
      }

      let completesCreated = await complete.bulkCreate(completesToCreate, {
        transaction: transaction,
      });

      // completesCreated.forEach(function(part, index) {
      //   part.dataValues['routine_workout_user'] = routineWorkoutUsers.find(
      //     rwu => rwu.id == part.completable_id
      //   );
      // });

      transaction.commit();
      return res.status(200).send(routineCompletable);
    }
    return res.status(200).send({ error: true });
  } catch (error) {
    transaction.rollback();
    return res.status(400).send(error);
  }
};

export default {
  create,
  retrieve,
  list,
  startRoutine,
};
