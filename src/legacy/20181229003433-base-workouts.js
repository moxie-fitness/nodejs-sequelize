// 'use strict';
// var legacy = require('./legacy.js');

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const machineOrEquipmentLId = await queryInterface.sequelize.query(
//       "select id from lookups where value = 'machine.or.equipment';"
//     );
//     const musclesLId = await queryInterface.sequelize.query(
//       "select id from lookups where value = 'muscles';"
//     );
//     const goalsLId = await queryInterface.sequelize.query(
//       "select id from lookups where value = 'goals';"
//     );

//     const moxieuserId = await queryInterface.sequelize.query(
//       "select id from moxieusers where username = 'Moxie_Fitness';"
//     );

//     const machineOrEquipmentLookupOptions = await queryInterface.sequelize.query(
//       `select * from lookup_options where lookup_id = ${machineOrEquipmentLId};`
//     );

//     const muscleLookupOptions = await queryInterface.sequelize.query(
//       `select * from lookup_options where lookup_id = ${musclesLId};`
//     );

//     const goalsLookupOptions = await queryInterface.sequelize.query(
//       `select * from lookup_options where lookup_id = ${goalsLId};`
//     );

//     for (let i = 0; i < legacy.BASE_WORKOUTS.length; i++) {
//       const workout = legacy.BASE_WORKOUTS[i];
//       const insertedPostId = (await queryInterface.bulkInsert(
//         'posts',
//         [
//           {
//             media: workout.media,
//             content: workout.content,
//           },
//         ],
//         {}
//       ))[0];

//       const insertedWorkoutId = (await queryInterface.bulkInsert(
//         'workouts',
//         [
//           {
//             name: workout.name,
//             moxieuser_id: moxieuserId,
//             post_id: insertedPostId,
//           },
//         ],
//         {}
//       ))[0];

//       workout.exerciseWorkouts.forEach(function(part, index) {
//         part.dataValues['workout_id'] = insertedWorkoutId;
//       });

//       await queryInterface.bulkInsert(
//         'exercise_workouts',
//         workout.exerciseWorkouts,
//         {}
//       );
//     }

//     return queryInterface.sequelize.query('select count(*) from workouts;');
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('exercise_workouts', null, {});
//     return queryInterface.bulkDelete('workouts', null, {});
//   },
// };
