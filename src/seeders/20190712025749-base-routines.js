'use strict';
var legacy = require('../legacy/legacy.js');
var utils = require('../legacy/utils.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const moxieuserId = await utils.getMoxieuserIdByUsername(
      queryInterface,
      'Moxie_Fitness'
    );
    console.log('moxieuserId', moxieuserId);

    const goalsLoId = await utils.getLookupId(queryInterface, 'goals');
    const goalsLookupOptions = await utils.getLookupOptionsByLookupId(
      queryInterface,
      goalsLoId
    );
    console.log('goalsLookupOptions', goalsLookupOptions);

    for (let i = 0; i < legacy.BASE_ROUTINES.length; i++) {
      const routine = legacy.BASE_ROUTINES[i];
      console.log('routine', routine);

      if (routine.media.length === 0) {
        for (let i = 0; i < routine.workoutsRoutine.length; i++) {
          if (routine.media.length < 5) {
            const workout = await utils.getWorkoutByMoxieuserIdName(
              queryInterface,
              moxieuserId,
              routine.workoutsRoutine[i].workoutName
            );
            console.log('workout', workout);

            const post = await utils.getPostIdNameById(
              queryInterface,
              workout.post_id
            );
            console.log('post', post);

            routine.media.push(post.media[0]);
          }
        }
      }

      const insertedPostId = await utils.insertPostReturnPostId(
        queryInterface,
        Sequelize,
        routine.media,
        routine.content
      );

      const goalId = goalsLookupOptions.find(
        lo => lo.value === `${routine.goal}`
      ).id;
      delete routine.goal;

      const insertedRoutineId = await utils.insertRoutineReturnId(
        queryInterface,
        routine.name,
        goalId,
        moxieuserId,
        insertedPostId,
        routine.is_public,
        routine.price
      );
      console.log('insertedRoutineId', insertedRoutineId);

      for (let i = 0; i < routine.workoutsRoutine.length; i++) {
        routine.workoutsRoutine[i]['pos'] = i;
        routine.workoutsRoutine[i]['routine_id'] = insertedRoutineId;
        const workout = await utils.getWorkoutByMoxieuserIdName(
          queryInterface,
          moxieuserId,
          routine.workoutsRoutine[i].workoutName
        );
        routine.workoutsRoutine[i]['workout_id'] = workout.id;
        routine.workoutsRoutine[i]['created_at'] = new Date();
        routine.workoutsRoutine[i]['updated_at'] = new Date();
        delete routine.workoutsRoutine[i].workoutName;
      }

      await queryInterface.bulkInsert(
        'workout_routines',
        routine.workoutsRoutine,
        {}
      );
    }

    return queryInterface.sequelize.query('select count(*) from routines;');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('workout_routines', null, {});
    return queryInterface.bulkDelete('routines', null, {});
  },
};
