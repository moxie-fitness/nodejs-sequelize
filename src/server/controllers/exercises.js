import { exercise, Sequelize, workout } from '../../models';

const Op = Sequelize.Op;

const create = async (req, res) => {
  return exercise
    .create({
      ...req.body,
    })
    .then(async exercise => {
      await exercise.setEquipment(req.body.equipment.map(e => e.equipment_id));
      return res.status(201).send(exercise);
    })
    .catch(error => res.status(400).send(error));
};

const retrieve = async (req, res) => {
  return exercise
    .findById(req.params.id, {
      include: exercise.fullInclude,
    })
    .then(async exercise => {
      return res.status(200).send(exercise);
    })
    .catch(error => res.status(400).send(error));
};

const list = async (req, res) => {
  try {
    let take = parseInt(req.body.take) || 15;
    let offset = parseInt(req.body.offset) || 0;
    let sortBy = parseInt(req.body.sortBy) || 'name';
    let onlyMine = (req.body.onlyMine || 'false') == 'true';
    let muscleFilter = JSON.parse(req.body.musclesFilter) || [];

    let ascOrDesc = 'asc';
    if (sortBy == 'ExercisesSort.name') {
      sortBy = 'name';
    } else if (sortBy == 'ExercisesSort.nameReverse') {
      sortBy = 'name';
      ascOrDesc = 'desc';
    }

    const userWhereOr = [
      { moxieuser_id: req.uid },
      { moxieuser_id: onlyMine ? req.uid : 'Moxie_Fitness_Id' },
    ];

    let whereFilter =
      muscleFilter.length > 0
        ? {
            [Op.or]: userWhereOr,
            muscle_id: {
              [Op.in]: muscleFilter,
            },
          }
        : {
            [Op.or]: userWhereOr,
          };

    let exercises = await exercise.findAll({
      include: exercise.fullInclude.concat([
        {
          model: workout,
        },
      ]),
      where: whereFilter,
      order: [[sortBy, ascOrDesc]],
      limit: take,
      offset: offset,
    });
    return res.status(200).send(exercises);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  retrieve,
  list,
};
