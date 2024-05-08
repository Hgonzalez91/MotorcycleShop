const app = require ("./app");
require('dotenv').config();
require('./database')

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
