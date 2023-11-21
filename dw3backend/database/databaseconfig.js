const Pool = require('pg').Pool
//@ Eu posso substituir as configurações abaixo por valores do arquivo .env
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projeto2',
  password: 'postdba',
  port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
  };