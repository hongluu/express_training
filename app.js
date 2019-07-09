const { config} = require('./src/config/config');
const app = require('./src/config/express');
require('./src/config/mongoose');

app.listen(config.port, () => {
  console.log(`server started on port ${config.port} (${config.env})`);
});

module.exports = app;