import { lookup, lookup_option } from '../../models';
import Result from '../lib/result';

const retrieveByLookupValue = async (req, res) => {
  return lookup_option
    .findAll({
      include: {
        model: lookup,
        where: {
          value: req.params.lookupValue,
        },
      },
    })
    .then(lookupOptions => res.status(201).send(lookupOptions))
    .catch(error => res.status(400).send(error));
};

export default {
  retrieveByLookupValue,
};
