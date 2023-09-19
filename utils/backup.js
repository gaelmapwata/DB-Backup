const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const { exec } = require('child_process');
const generateName = require ('./generateNameFile');


// Commande de sauvegarde avec mysqldump
const mysqldump = 'C:\\laragon\\bin\\mysql\\mysql-8.0.30-winx64\\bin\\mysqldump'
const commandeSauvegarde = `${mysqldump} --host=${knexConfig.development.connection.host} --user=${knexConfig.development.connection.user} --password=${knexConfig.development.connection.password} ${knexConfig.development.connection.database} > ${generateName.generateNameFile('./backup-Sql')}`;

exec(commandeSauvegarde, (erreur, stdout, stderr) => {
  if (erreur) {
    console.error(`Erreur lors de la sauvegarde : ${erreur}`);
  } else {
    console.log('Sauvegarde réussie.');
  }
});
