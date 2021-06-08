'use strict';
var legacy = require('../legacy/legacy.js');
var utils = require('../legacy/utils.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const machineOrEquipmentLId = await utils.getLookupId(
      queryInterface,
      'machine.or.equipment'
    );
    console.log('machineOrEquipmentLId', machineOrEquipmentLId);

    const musclesLOId = await utils.getLookupId(queryInterface, 'muscles');
    console.log('musclesLOId', musclesLOId);

    const moxieuserId = await utils.getMoxieuserIdByUsername(
      queryInterface,
      'Moxie_Fitness'
    );
    console.log('moxieuserId', moxieuserId);

    const muscleLookupOptions = await utils.getLookupOptionsByLookupId(
      queryInterface,
      musclesLOId
    );
    console.log('muscleLookupOptions', muscleLookupOptions);

    let updatedExercises = [];
    for (let i = 0; i < legacy.BASE_EXERCISES.length; i++) {
      const exercise = legacy.BASE_EXERCISES[i];
      console.log('Inserting Exercise: ', exercise);
      const insertedPostId = await utils.insertPostReturnPostId(
        queryInterface,
        Sequelize,
        exercise.media,
        exercise.content
      );
      console.log('Inserted post:', { insertedPostId });

      let updatedExercise = {
        post_id: insertedPostId,
        moxieuser_id: moxieuserId,
        name: exercise.name,
        youtube_url: exercise.youtube_url,
        created_at: new Date(),
        updated_at: new Date(),
      };

      updatedExercise.muscle_id = muscleLookupOptions.find(
        lo => lo.value === `${exercise.muscle}`
      ).id;

      console.log('updatedExercise:', updatedExercise);
      updatedExercises.push(updatedExercise);
    }
    await queryInterface.bulkInsert('exercises', updatedExercises, {});

    return queryInterface.sequelize.query('select count(*) from exercises;');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('exercises', null, {});
  },
};
