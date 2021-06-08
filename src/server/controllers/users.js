import { user } from '../../models';

const UnexpectedError = require('../lib/unexpected-error');
const Promise = require('bluebird');

function create(req, res) {}

function retrieve(req, res) {
  return user
    .findById(req.params.userId)
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}

function self(req, res) {
  return user
    .findById(req.uid, {
      include: [],
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}
function update(req, res) {
  return user
    .update(...req.body, {
      where: { id: req.params.userId },
    })
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error));
}

export default {
  create,
  self,
  update,
  retrieve,
};
