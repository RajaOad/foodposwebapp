module.exports = {
  apps: [
    {
      name: 'pos-system-frontend',
      script: 'npm',
      args: 'run preview',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        VITE_SERVER_URL: 'http://64.23.138.208/'
      },
    },
  ],
};

