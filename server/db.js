const Pool = require('pg').Pool;

const pool = new Pool({
  user: "USERNAME",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

// If you have password, please put password inside pool object

module.exports = pool;
