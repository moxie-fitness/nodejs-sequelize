import { _model_, Sequelize } from '../../models';

const Op = Sequelize.Op;

const create = async (req, res) => {
  try {
    const created = await _model_.create({
      ...req.body,
    });
    return res.status(201).send(created);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const retrieve = async (req, res) => {
  try {
    const retrieved = await _model_.findByPk(req.params.id);
    return res.status(201).send(retrieved);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const list = async (req, res) => {
  try {
    return res.status(201).send('Unimplemented');
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  retrieve,
  list,
};
