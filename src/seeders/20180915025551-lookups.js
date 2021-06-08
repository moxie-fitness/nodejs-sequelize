'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'lookups',
      [
        {
          value: 'machine.or.equipment',
        },
        {
          value: 'muscles',
        },
        {
          value: 'goals',
        },
        {
          value: 'difficulty',
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lookups', null, {});
  },
};
