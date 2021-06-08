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
//     for (let i = 0; i < legacy.BASE_ROUTINES.length; i++) {
//       const routine = legacy.BASE_ROUTINES[i];
//       const insertedPostId = (await queryInterface.bulkInsert(
//         'posts',
//         [
//           {
//             media: routine.media,
//             content: routine.content,
//           },
//         ],
//         {}
//       ))[0];

//       const insertedRoutine = await queryInterface.bulkInsert(
//         'routines',
//         [
//           {
//             name: routine.name,
//             moxieuser_id: moxieuserId,
//             post_id: insertedPostId,
//             goal_id: goalsLookupOptions.find(
//               lo => lo.value === `${routine.goal}`
//             ).id,
//           },
//         ],
//         {}
//       );
//     }
//     return queryInterface.sequelize.query('select count(*) from routines;');
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('workout_routines', null, {});
//     return queryInterface.bulkDelete('routines', null, {});
//   },
// };
