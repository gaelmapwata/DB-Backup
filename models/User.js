const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

class User {
  static async create({ name, email }) {
    return db('users').insert({ name, email });
  }

  static async getAll() {
    return db('users').select('*');
  }
}

module.exports = User;
