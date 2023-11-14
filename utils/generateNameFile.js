const fs = require('fs');
const path = require('path');
const moment = require('moment');
const archiver = require('archiver');
const knexConfig = require('../knexfile');
const { exec } = require('child_process');

const dateToDay = moment().format('YYYY-MM-DD');

const generateNameFile = async (folderBackup, compress) => {
  let numberIncrement = 1;
  while (true) {
    const fileName = `${dateToDay}-${numberIncrement}.sql`;
    const pathFile = path.join(folderBackup, fileName);

    const commande = `mysqldump --host=${knexConfig.development.connection.host} --user=${knexConfig.development.connection.user} --password=${knexConfig.development.connection.password} ${knexConfig.development.connection.database} > ${pathFile}`;
    exec(commande, (erreur, stdout, stderr) => {
      if (erreur) {
      console.error(`Erreur lors de la sauvegarde : ${erreur}`);
      } else {
      console.log('Sauvegarde réussie.');
      }
    });

    if (!fs.existsSync(pathFile)) {
      if (compress) {

        await new Promise(resolve => setTimeout(resolve, 1000));
        const zipFileName = `${dateToDay}-${numberIncrement}.zip`;
        const zipFilePath = path.join(folderBackup, zipFileName);

        // Créez un fichier ZIP à partir du fichier de sauvegarde.
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);
        archive.file(pathFile, { name: `${dateToDay}-${numberIncrement}.sql` });
        
        await archive.finalize();
        await new Promise(resolve => output.on('close', resolve));
        const filesInZip = archive.pointer();
        if (filesInZip > 0) {
          fs.unlinkSync(pathFile);
        }

        return zipFilePath;
      } else {
        return pathFile;
      }
    }

    numberIncrement++;
  }
}

module.exports = { generateNameFile };








