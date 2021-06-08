import { role as Role } from '../../models';

export function create(req, res) {
  return Role.create({
    name: req.body.name,
    level: req.body.level,
  })
    .then(Role => res.status(201).send(Role))
    .catch(error => res.status(400).send(error));
}
