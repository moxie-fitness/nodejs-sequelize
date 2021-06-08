import { Moxieuser } from '../controllers/moxieusers';

export const guard = (firebaseAdmin, req, res, next) => {
  try {
    firebaseAdmin
      .auth()
      .verifyIdToken(req.token)
      .then(async token => {
        req.uid = token.uid;
        console.log({ token });
        console.log('Validated user id: ' + req.uid);
        var validated = await Moxieuser.validateExists(token.uid);
        if (validated) {
          console.log('Validated user exists');
          next();
        } else {
          var created = await Moxieuser.create(token);
          if (created) {
            console.log('Created new user');
            next();
          } else {
            res.status(400).send('Could not find and create user.');
          }
        }
      })
      .catch(error => {
        console.error(error);
        res.status(401).send(error);
      });
  } catch (err) {
    // log error
    console.log(err + ' invalid token.');

    // Respond with 401
    res.status(401).send({
      error: 'Invalid Token',
      message: 'This API requires authentication.',
    });
  }
};

export default {
  guard,
};
