import {
  complete,
  workout,
  routine,
  Sequelize,
  routine_workout_user,
} from '../../models';
import { workouts as workoutController } from '../controllers';
import { start } from 'repl';

const Op = Sequelize.Op;

const _attachPolymorphic = async item => {
  if (item.completable === 'workout') {
    item.dataValues[item.completable] = await workout.findByPk(
      item.completable_id,
      {
        include: workout.defaultInclude,
      }
    );
  } else if (item.completable === 'routine') {
    item.dataValues[item.completable] = await routine.findByPk(
      item.completable_id,
      {
        include: routine.defaultInclude,
      }
    );
  } else if (item.completable === 'routine_workout_user') {
    item.dataValues[item.completable] = await routine_workout_user.findByPk(
      item.completable_id,
      {
        include: [
          {
            model: workout,
            as: 'workout',
            include: workout.defaultInclude,
          },
        ],
      }
    );
  }
  return item;
};

const upsert = async (req, res) => {
  try {
    let created;
    if (req.body.id) {
      created = await complete.findByPk(req.body.id);
      await created.update({
        ...req.body,
      });
    } else {
      created = await complete.create({
        ...req.body,
      });
    }

    created = await _attachPolymorphic(created);
    return res.status(201).send(created);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const retrieve = async (req, res) => {
  try {
    let completableItem = await complete.findByPk(req.params.id);
    let retrieved = await _attachPolymorphic(completableItem);
    return res.status(200).send(retrieved);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const listRWUsDate = async (req, res) => {
  try {
    const startDate = req.body.from;
    const endDate = req.body.to;
    const moxieuser_id = req.uid;
    // const moxieuser_id = 'lvBh8RqLFrMMVXaajg1OgaWBGU92';

    if (startDate && endDate) {
      let completes = await complete.findAll({
        where: {
          updated_at: {
            [Op.between]: [startDate, endDate],
          },
          completable: 'routine_workout_user',
          moxieuser_id: moxieuser_id,
          deleted_at: null,
        },
        include: {
          model: routine_workout_user,
          as: 'routine_workout_user',
          include: [
            {
              model: workout,
              as: 'workout',
              include: workout.defaultInclude,
            },
          ],
        },
      });

      return res.status(200).send(completes);
    } else {
      throw Error('Missing or invalid startDate or endDate');
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

const listRWUs = async (req, res) => {
  try {
    const moxieuser_id = req.uid;

    let completes = await complete.findAll({
      where: {
        completed: false,
        completable: 'routine_workout_user',
        moxieuser_id: moxieuser_id,
        deleted_at: null,
      },
      include: {
        model: routine_workout_user,
        as: 'routine_workout_user',
        include: [
          {
            model: workout,
            as: 'workout',
            include: workout.defaultInclude,
          },
        ],
      },
    });

    return res.status(200).send(completes);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  upsert,
  retrieve,
  listRWUsDate,
  listRWUs,
};
