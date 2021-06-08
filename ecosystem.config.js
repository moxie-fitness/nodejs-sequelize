module.exports = {
  apps: [
    {
      name: 'Moxie Fitness API',
      script: 'app.js',
      env: {
        APP_ENV: 'development',
      },
      env_production: {
        APP_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: '54.210.100.244',
      ref: 'origin/master',
      repo: 'git@gitlab.com:moxie-fitness-dev/moxiefitness-backend-node.git',
      path: '/home/ubuntu/node',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
