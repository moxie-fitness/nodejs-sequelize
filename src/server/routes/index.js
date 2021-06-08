import {
  moxieusers,
  exercises,
  posts,
  lookup_options,
  workouts,
  feeds,
  routines,
  completes,
  exercise_logs,
  routine_subscriptions,
  ratings,
  comments,
} from '../controllers';

export default app => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Moxie Fitness API',
    })
  );

  /*
   * Moxieusers
   */
  app.get('/moxieuser', moxieusers.retrieveCurrent);
  app.get('/moxieusers/:id', moxieusers.retrieve);
  app.post('/moxieusers/save-details', moxieusers.saveDetails);

  /*
   * Exercises
   */
  app.get('/exercises/:id', exercises.retrieve);
  app.post('/exercises', exercises.create);
  app.post('/exercises/list', exercises.list);

  /*
   * Workouts
   */
  app.post('/workouts', workouts.create);
  app.get('/workouts/:id', workouts.retrieve);
  app.post('/workouts/list', workouts.list);

  /*
   * Routines
   */
  app.get('/routines/:id', routines.retrieve);
  app.post('/routines', routines.create);
  app.post('/routines/list', routines.list);
  app.post('/routines/start/:id', routines.startRoutine);

  /*
   * Posts
   */
  app.post('/posts', posts.create);
  app.put('/posts/:id', posts.update);

  /*
   * Ratings
   */
  app.post('/ratings', ratings.create);
  app.put('/ratings/:id', ratings.update);

  /*
   * Comments
   */
  app.post('/comments', comments.create);
  app.put('/comments/:id', comments.update);
  app.post('/comments/:postId/list', comments.list);

  /*
   * LookupOptions
   */
  app.get(
    '/lookup_options/lookup/:lookupValue',
    lookup_options.retrieveByLookupValue
  );

  /*
   * Feeds
   */
  app.get('/feeds/:id', feeds.retrieve);
  app.post('/feeds', feeds.create);
  app.post('/feeds/list', feeds.list);

  /*
   * Completes
   */
  app.get('/completes/:id', completes.retrieve);
  app.post('/completes', completes.upsert);
  app.post('/completes/list-rwus-date', completes.listRWUsDate);
  app.post('/completes/list-rwus', completes.listRWUs);

  /*
   * Exercise Logs
   */
  app.post('/exercise_logs', exercise_logs.create);
  app.post('/exercise_logs/for-exercise/:exercise_id', exercise_logs.list);

  /*
   * Routine Subscriptions
   */
  app.get('/routine_subscriptions/:id', routine_subscriptions.retrieve);
  app.post(
    '/routine_subscriptions/check-subscription/:routine_id',
    routine_subscriptions.checkSub
  );
  app.post('/routine_subscriptions', routine_subscriptions.create);
  app.post(
    '/routine_subscriptions/list',
    routine_subscriptions.listSubbedIdsForUser
  );
};
