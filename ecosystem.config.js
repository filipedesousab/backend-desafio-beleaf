module.exports = {
  apps : [{
    name: 'app',
    script: 'index.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
