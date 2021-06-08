'use strict';
var utils = require('../legacy/utils.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertedPostId = await utils.insertPostReturnPostId(
      queryInterface,
      Sequelize,
      [],
      'Wohoo! The very first post!'
    );
    console.log('insertedPostId', insertedPostId);

    return await queryInterface.bulkInsert(
      'feeds',
      [
        {
          post_id: insertedPostId,
          moxieuser_id: await utils.getMoxieuserIdByUsername(
            queryInterface,
            'Moxie_Fitness'
          ),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('lookup_options', null, {});
  },
};
