'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'moxieusers',
      [
        {
          id: 'Moxie_Fitness_Id',
          username: 'Moxie_Fitness',
          is_public: true,
          created_at: '2018-09-16 18:40:06',
        },
        {
          id: 'lvBh8RqLFrMMVXaajg1OgaWBGU92', 
          username: 'alannegrete',
          email: 'alan_negrete@hotmail.com',
          is_public: true,
          gender: false,
          unit: true,
          created_at: '2018-09-16 18:40:06',
        },
        {
          id: 'SJa0QcfNykVW8mGU0T1f1ke0nLd2',
          username: 'Juan Negrete',
          email: 'juan.negrete09@gmail.com',
          is_public: true,
          gender: false,
          unit: true,
          created_at: '2019-04-03 03:41:13',
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('moxieusers', null, {});
  },
};
