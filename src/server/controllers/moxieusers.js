import { moxieuser, height, weight } from '../../models';
import Result from '../lib/result';

export var ActiveMoxieUser;

export class MoxieUser {
  async create(token) {
    console.log('Creating new user.');
    ActiveMoxieUser = await moxieuser.create({
      id: token.uid,
      username: token.name.replace(/ /g, '.'),
      email: token.email || '',
    });
    console.log(ActiveMoxieUser);

    return ActiveMoxieUser != null;
  }

  async validateExists(uid) {
    ActiveMoxieUser = await moxieuser.findById(uid, {});
    return ActiveMoxieUser != null;
  }
}
export const Moxieuser = new MoxieUser();

const saveDetails = async (req, res) => {
  try {
    let updated = await moxieuser.findById(req.uid);

    await moxieuser.update(
      {
        ...req.body,
      },
      {
        where: { id: req.uid },
      }
    );

    let initHeight = {
      ...req.body.heights[0],
      moxieuser_id: req.uid,
    };
    let initWeight = {
      ...req.body.weights[0],
      moxieuser_id: req.uid,
    };

    let h = await height.create({ ...initHeight });
    let w = await weight.create({ ...initWeight });
    return res.status(201).send(new Result(true, updated));
  } catch (e) {
    return res.status(400).send(e);
  }
};

const retrieve = async (req, res) => {
  try {
    let retrieveMoxieuser = await moxieuser.findById(req.params.id, {
      include: [
        {
          model: height,
          as: 'heights',
          limit: 1,
          order: [['updated_at', 'DESC']],
        },
        {
          model: weight,
          as: 'weights',
          limit: 1,
          order: [['updated_at', 'DESC']],
        },
      ],
    });
    return res.status(200).send(retrieveMoxieuser);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const retrieveCurrent = async (req, res) => {
  req.params.id = req.uid;
  return retrieve(req, res);
};

export default {
  MoxieUser,
  saveDetails,
  retrieve,
  retrieveCurrent,
};
