module.exports = {
  getLookupId: async (queryInterface, lookupValue) => {
    return (await queryInterface.sequelize.query(
      `select id from lookups where value = '${lookupValue}';`
    ))[0][0].id;
  },

  getLookupOptionsByLookupId: async (queryInterface, lookupId) => {
    return (await queryInterface.sequelize.query(
      `select id,value from lookup_options where lookup_id = ${lookupId};`
    ))[0];
  },

  getExerciseByMoxieuserIdName: async (queryInterface, moxieuserId, name) => {
    return (await queryInterface.sequelize.query(
      `SELECT id, post_id FROM exercises where moxieuser_id = '${moxieuserId}' and name = '${name}';`
    ))[0][0];
  },

  getWorkoutByMoxieuserIdName: async (queryInterface, moxieuserId, name) => {
    return (await queryInterface.sequelize.query(
      `SELECT id, post_id FROM workouts where moxieuser_id = '${moxieuserId}' and name = '${name}';`
    ))[0][0];
  },

  getPostIdNameById: async (queryInterface, id) => {
    return (await queryInterface.sequelize.query(
      `SELECT id, media FROM posts where id = '${id}';`
    ))[0][0];
  },

  getWorkoutByMoxieuserIdName: async (queryInterface, moxieuserId, name) => {
    return (await queryInterface.sequelize.query(
      `SELECT id, post_id FROM workouts where moxieuser_id = '${moxieuserId}' and name = '${name}';`
    ))[0][0];
  },

  getMoxieuserIdByUsername: async (queryInterface, username) => {
    return (await queryInterface.sequelize.query(
      `select id from moxieusers where username = '${username}';`
    ))[0][0].id;
  },

  insertPostReturnPostId: async (queryInterface, Sequelize, media, content) => {
    return await queryInterface.bulkInsert(
      'posts',
      [
        {
          media: media || [],
          content: content || 'no description',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
      { media: { type: new Sequelize.JSON() } }
    );
  },

  insertWorkoutReturnId: async (
    queryInterface,
    name,
    difficultyId,
    moxieuserId,
    postId
  ) => {
    return await queryInterface.bulkInsert(
      'workouts',
      [
        {
          name: name,
          moxieuser_id: moxieuserId,
          difficulty_id: difficultyId,
          post_id: postId,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  insertRoutineReturnId: async (
    queryInterface,
    name,
    goalId,
    moxieuserId,
    postId,
    isPublic = true,
    price = 0.0
  ) => {
    return await queryInterface.bulkInsert(
      'routines',
      [
        {
          name: name,
          moxieuser_id: moxieuserId,
          goal_id: goalId,
          post_id: postId,
          is_public: isPublic,
          price: price,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
