// set up the postgre server
const pg = require('pg');

const postgreUrl = 'postgres://localhost/Wizard-news';

const client = new pg.Client(postgreUrl);

// connecting to that server
client.connect();

// export it so that it can be availabe as a Node module
module.exports = client;