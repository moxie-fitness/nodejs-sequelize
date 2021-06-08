import { rating } from '../../models';

const create = async (req, res) => {
  return upsert(rating, req.body, {
    moxieuser_id: req.body.moxieuser_id,
    ratable_id: req.body.ratable_id,
    ratable: req.body.ratable,
  })
    .then(rating => res.status(201).send(rating))
    .catch(error => res.status(400).send(error));
};

const update = async (req, res) => {
  return rating
    .update(
      {
        value: req.body.value,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    )
    .then(async updatedRating => {
      updatedRating = await rating.findById(req.params.id);
      return res.status(201).send(updatedRating);
    })
    .catch(error => res.status(400).send(error));
};

const upsert = (model, values, condition) => {
  return model.findOne({ where: condition }).then(function(obj) {
    if (obj) {
      return obj.update(values);
    } else {
      return model.create(values);
    }
  });
};

export default {
  create,
  update,
};
