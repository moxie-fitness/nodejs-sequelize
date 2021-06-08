import { sequelize, exercise_log } from '../../models';

const Op = sequelize.Op;

const create = async (req, res) => {
  return exercise_log
    .create({
      ...req.body,
    })
    .then(exercise_log => {
      return res.status(201).send(exercise_log);
    })
    .catch(error => res.status(400).send(error));
};

const list = async (req, res) => {
  try {
    console.log(req.body);
    let take = parseInt(req.body.take) || 15;
    let offset = parseInt(req.body.offset) || 0;
    let logs = await exercise_log.findAll({
      where: {
        [Op.and]: [
          { moxieuser_id: req.uid, exercise_id: req.params.exercise_id },
        ],
      },
      order: [['updated_at', 'DESC']],
      limit: take,
      offset: offset,
    });

    return res.status(201).send(logs);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  list,
};
