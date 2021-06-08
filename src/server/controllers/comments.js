import { comment } from '../../models';

const create = async (req, res) => {
  return comment
    .create({
      ...req.body,
    })
    .then(comment => res.status(201).send(comment))
    .catch(error => res.status(400).send(error));
};

const update = async (req, res) => {
  return comment
    .update(
      {
        content: req.body.content,
        media: req.body.media,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    )
    .then(async updatedComment => {
      updatedComment = await comment.findByPk(req.params.id);
      return res.status(201).send(updatedComment);
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

const list = async (req, res) => {
  try {
    console.log(req.body);
    let comments = await comment.findAll({
      include: [
        {
          model: ratings,
          attributes: ['id', 'moxieuser_id', 'ratable_id', 'value'],
          as: 'ratings',
        },
        {
          model: moxieuser,
          attributes: ['id', 'username', 'is_public'],
        },
      ],
      order: [['updated_at', 'DESC']],
    });

    return res.status(201).send(comments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  update,
  list,
};
