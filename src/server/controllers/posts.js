import { post } from '../../models';

const create = async (req, res) => {
  return post
    .create({
      ...req.body,
    })
    .then(post => res.status(201).send(post))
    .catch(error => res.status(400).send(error));
};

const update = async (req, res) => {
  return post
    .update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    )
    .then(async post => {
      let updatedPost = await post.findById(req.params.id);
      return res.status(201).send(updatedPost);
    })
    .catch(error => res.status(400).send(error));
};

export default {
  create,
  update,
};
