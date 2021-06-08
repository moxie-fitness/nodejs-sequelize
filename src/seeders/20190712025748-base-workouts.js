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

    const diffLOId = await utils.getLookupId(queryInterface, 'difficulty');

    const difficultyLookupOptions = await utils.getLookupOptionsByLookupId(
      queryInterface,
      diffLOId
    );
    console.log('difficultyLookupOptions', difficultyLookupOptions);

    for (let i = 0; i < legacy.BASE_WORKOUTS.length; i++) {
      const workout = legacy.BASE_WORKOUTS[i];
      console.log('workout', workout);

      if (workout.media.length === 0) {
        for (let i = 0; i < workout.exercisesWorkout.length; i++) {
          if (workout.media.length < 5) {
            const exercise = await utils.getExerciseByMoxieuserIdName(
              queryInterface,
              moxieuserId,
              workout.exercisesWorkout[i].exerciseName
            );
            console.log('exercise', exercise);

            const post = await utils.getPostIdNameById(
              queryInterface,
              exercise.post_id
            );
            console.log('post', post);

            workout.media.push(post.media[0]);
          }
        }
      }

      const insertedPostId = await utils.insertPostReturnPostId(
        queryInterface,
        Sequelize,
        workout.media,
        workout.content
      );

      const diffId = difficultyLookupOptions.find(
        lo => lo.value === `${workout.difficulty}`
      ).id;
      delete workout.difficulty;

      const insertedWorkoutId = await utils.insertWorkoutReturnId(
        queryInterface,
        workout.name,
        diffId,
        moxieuserId,
        insertedPostId
      );
      console.log('insertedWorkoutId', insertedWorkoutId);

      for (let i = 0; i < workout.exercisesWorkout.length; i++) {
        workout.exercisesWorkout[i]['pos'] = i;
        workout.exercisesWorkout[i]['workout_id'] = insertedWorkoutId;
        const exercise = await utils.getExerciseByMoxieuserIdName(
          queryInterface,
          moxieuserId,
          workout.exercisesWorkout[i].exerciseName
        );
        workout.exercisesWorkout[i]['exercise_id'] = exercise.id;
        workout.exercisesWorkout[i]['created_at'] = new Date();
        workout.exercisesWorkout[i]['updated_at'] = new Date();
        delete workout.exercisesWorkout[i].exerciseName;
      }

      await queryInterface.bulkInsert(
        'exercise_workouts',
        workout.exercisesWorkout,
        {}
      );
    }

    return queryInterface.sequelize.query('select count(*) from workouts;');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exercise_workouts', null, {});
    return queryInterface.bulkDelete('workouts', null, {});
  },
};
