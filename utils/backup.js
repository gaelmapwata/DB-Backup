const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const { exec } = require('child_process');
const generateName = require ('./generateNameFile');
const {FILE_PATH , TO_ARCHIVE} = require ('../utils/utilities')


// const filePath = process.env.FILE_PATH


// // Commande de sauvegarde avec mysqldump
// const commandeSauvegarde = `mysqldump --host=${knexConfig.development.connection.host} --user=${knexConfig.development.connection.user} --password=${knexConfig.development.connection.password} ${knexConfig.development.connection.database} > ${generateName.generateNameFile(FILE_PATH, TO_ARCHIVE)}`;

// exec(commandeSauvegarde, (erreur, stdout, stderr) => {
//   if (erreur) {
//     console.error(`Erreur lors de la sauvegarde : ${erreur}`);
//   } else {
//     console.log('Sauvegarde réussie.');
//   }
// });

const backupCommand = async () => {
  try {
    const pathDirectory = await generateName.generateNameFile(FILE_PATH, TO_ARCHIVE);
    const commande = `mysqldump --host=${knexConfig.development.connection.host} --user=${knexConfig.development.connection.user} --password=${knexConfig.development.connection.password} ${knexConfig.development.connection.database} > ${pathDirectory}`;
    exec(commande, (erreur, stdout, stderr) => {
    if (erreur) {
    console.error(`Erreur lors de la sauvegarde : ${erreur}`);
    } else {
    console.log('Sauvegarde réussie.');
    }
  });
  } catch (erreur) {
    console.error('Erreur lors de la sauvegarde', erreur);
  }
};

backupCommand();

