const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const { exec } = require('child_process');


// Commande de sauvegarde avec mysqldump
const commandeSauvegarde = `mysqldump --host=${knexConfig.development.connection.host} --user=${knexConfig.development.connection.user} --password=${knexConfig.development.connection.password} ${knexConfig.development.connection.database} > backup.sql`;

exec(commandeSauvegarde, (erreur, stdout, stderr) => {
  if (erreur) {
    console.error(`Erreur lors de la sauvegarde : ${erreur}`);
  } else {
    console.log('Sauvegarde réussie.');
  }
});
