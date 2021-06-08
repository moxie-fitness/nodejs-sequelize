import {
  sequelize,
  post,
  feed,
  rating,
  comment,
  moxieuser,
} from '../../models';

const Op = sequelize.Op;

const create = async (req, res) => {
  try {
    let result = await sequelize.transaction(async t => {
      // insert feed
      return await feed.create(
        {
          moxieuser_id: req.body.moxieuser_id,
          post_id: req.body.post.id,
        },
        { transaction: t }
      );
    });

    return res.status(201).send(result);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const retrieve = async (req, res) => {
  return feed
    .findById(req.params.id)
    .then(async feed => {
      return res.status(201).send(feed);
    })
    .catch(error => res.status(400).send(error));
};

const list = async (req, res) => {
  try {
    console.log(req.body);
    let feeds = await feed.findAll({
      include: [
        {
          model: post,
          attributes: ['id', 'media', 'content', 'updated_at'],
          include: [
            {
              model: rating,
              attributes: ['id', 'moxieuser_id', 'ratable_id', 'value'],
              as: 'ratings',
            },
            {
              model: comment,
              include: [
                {
                  model: rating,
                  attributes: [
                    'id',
                    'moxieuser_id',
                    'ratable_id',
                    'value',
                    'updated_at',
                  ],
                  as: 'ratings',
                },
                {
                  model: moxieuser,
                  attributes: ['id', 'username', 'is_public', 'media'],
                },
              ],
            },
          ],
        },
        {
          model: moxieuser,
          attributes: ['id', 'username', 'is_public', 'media'],
        },
      ],
      order: [['updated_at', 'DESC']],
    });

    return res.status(201).send(feeds);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  create,
  retrieve,
  list,
};
