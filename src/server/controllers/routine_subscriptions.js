import { routine_subscription, routine, Sequelize } from '../../models';

const Op = Sequelize.Op;

const create = async (req, res) => {
  try {
    const result = await routine_subscription.create(
      {
        ...req.body,
      }
      // {
      //   include: [
      //     {
      //       model: routine,
      //       include: routine.defaultInclude,
      //     },
      //   ],
      // }
    );
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const retrieve = async (req, res) => {
  try {
    const retrieved = await routine_subscription.findByPk(req.params.id);
    return res.status(201).send(retrieved);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const checkSub = async (req, res) => {
  try {
    const fetched = await routine_subscription.findOne({
      attributes: ['id'],
      where: {
        routine_id: req.params.routine_id,
        subscriber_moxieuser_id: req.uid,
      },
    });
    return res.status(201).send({
      subbed: fetched ? true : false,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const listSubbedIdsForUser = async (req, res) => {
  try {
    const idList = await routine_subscription.findAll({
      attributes: ['id'],
      where: {
        subscriber_moxieuser_id: req.uid,
      },
    });
    return res.status(200).send(idList);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  retrieve,
  listSubbedIdsForUser,
  checkSub,
};
