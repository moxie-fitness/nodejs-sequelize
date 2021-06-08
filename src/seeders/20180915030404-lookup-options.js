'use strict';
var utils = require('../legacy/utils.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const machineOrEquipmentLookupId = await utils.getLookupId(
      queryInterface,
      'machine.or.equipment'
    );
    const musclesLookupId = await utils.getLookupId(queryInterface, 'muscles');
    const goalsLookupId = await utils.getLookupId(queryInterface, 'goals');
    const difficultyId = await utils.getLookupId(queryInterface, 'difficulty');

    return await queryInterface.bulkInsert(
      'lookup_options',
      [
        { value: 'Dumbbells', lookup_id: machineOrEquipmentLookupId },
        { value: 'Barbell', lookup_id: machineOrEquipmentLookupId },
        { value: 'Cables', lookup_id: machineOrEquipmentLookupId },
        { value: 'Cable Machine', lookup_id: machineOrEquipmentLookupId },
        { value: 'Machine', lookup_id: machineOrEquipmentLookupId },
        { value: 'Bench', lookup_id: machineOrEquipmentLookupId },
        { value: 'Plates', lookup_id: machineOrEquipmentLookupId },
        { value: 'Chain', lookup_id: machineOrEquipmentLookupId },
        { value: 'Medicine Ball', lookup_id: machineOrEquipmentLookupId },
        { value: 'Kettlebells', lookup_id: machineOrEquipmentLookupId },
        { value: 'Bands', lookup_id: machineOrEquipmentLookupId },
        { value: 'Rope', lookup_id: machineOrEquipmentLookupId },
        { value: 'EZ Bar', lookup_id: machineOrEquipmentLookupId },
        { value: 'Mat', lookup_id: machineOrEquipmentLookupId },
        { value: 'Other', lookup_id: machineOrEquipmentLookupId },

        { value: 'Abs', lookup_id: musclesLookupId },
        { value: 'Back', lookup_id: musclesLookupId },
        { value: 'Biceps', lookup_id: musclesLookupId },
        { value: 'Cardiovascular', lookup_id: musclesLookupId },
        { value: 'Calves', lookup_id: musclesLookupId },
        { value: 'Chest', lookup_id: musclesLookupId },
        { value: 'Forearms', lookup_id: musclesLookupId },
        { value: 'Glutes', lookup_id: musclesLookupId },
        { value: 'Legs', lookup_id: musclesLookupId },
        { value: 'Neck', lookup_id: musclesLookupId },
        { value: 'Shoulders', lookup_id: musclesLookupId },
        { value: 'Traps', lookup_id: musclesLookupId },
        { value: 'Triceps', lookup_id: musclesLookupId },

        { value: 'Bodybuilding', lookup_id: goalsLookupId },
        { value: 'Strength', lookup_id: goalsLookupId },
        { value: 'Get Lean', lookup_id: goalsLookupId },
        { value: 'Endurance', lookup_id: goalsLookupId },
        { value: 'Weight Loss', lookup_id: goalsLookupId },
        { value: 'Overall Health', lookup_id: goalsLookupId },

        { value: 'Beginner', lookup_id: difficultyId },
        { value: 'Intermediate', lookup_id: difficultyId },
        { value: 'Advanced', lookup_id: difficultyId },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('lookup_options', null, {});
  },
};
