const nodeCron = require('node-cron');

nodeCron.schedule('* * * * *', () => {
  console.log('Running!');
});
