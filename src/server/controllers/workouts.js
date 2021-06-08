import {
  workout,
  exercise,
  exercise_workout,
  Sequelize,
  post,
  moxieuser,
} from '../../models';

const Op = Sequelize.Op;

const create = async (req, res) => {
  console.log(req.body);
  return workout
    .create({
      ...req.body,
    })
    .then(async workout => {
      let pos = -1;
      let pivot = req.body.workout_exercises || [];
      let exerciseWorkouts = pivot.map(ew => {
        pos++;
        return {
          workout_id: workout.id,
          exercise_id: ew.exercise.id,
          pos: pos,
          sets: ew.sets,
          reps: ew.reps,
          duration_secs: ew.duration_secs,
          weight: ew.weight,
        };
      });
      if (exerciseWorkouts && exerciseWorkouts.length > 0) {
        await exercise_workout.bulkCreate(exerciseWorkouts);
      }
      return res.status(201).send(workout);
    })
    .catch(error => res.status(400).send(error));
};

const retrieve = async (req, res) => {
  try {
    let workoutItem = await workout.findByPk(req.params.id, {
      include: workout.defaultInclude,
    });
    return res.status(200).send(workoutItem);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const list = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.uid);

    let take = parseInt(req.body.take) || 15;
    let offset = parseInt(req.body.offset) || 0;
    let sortBy = req.body.sortBy || 'WorkoutsSort.name';
    let onlyMine = (req.body.onlyMine || 'false') == 'true';
    let orderDescAsc = req.body.order || 'asc';

    if (sortBy == 'WorkoutsSort.name') {
      sortBy = Sequelize.literal('name');
    } else if (sortBy == 'WorkoutsSort.exercise_count') {
      sortBy = Sequelize.literal('exercises_count');
      orderDescAsc = 'desc';
    }

    const userWhereOr = [
      { moxieuser_id: req.uid },
      { moxieuser_id: onlyMine ? req.uid : 'Moxie_Fitness_Id' },
    ];

    let workouts = await workout.findAll({
      attributes: Object.keys(workout.attributes).concat([
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM exercise_workouts WHERE exercise_workouts.workout_id = workout.id)'
          ),
          'exercises_count',
        ],
      ]),
      include: workout.defaultInclude,
      where: {
        [Op.or]: userWhereOr,
      },
      order: [[sortBy, orderDescAsc]],
      limit: take,
      offset: offset,
    });
    return res.status(200).send(workouts);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  retrieve,
  list,
};
