const knex = require('../knexfile');

class User {
  static async create({ nom, email }) {
    return knex('users').insert({ nom, email });
  }

  static async getAll() {
    return knex('users').select('*');
  }
}

module.exports = User;
