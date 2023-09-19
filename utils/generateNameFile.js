const fs = require('fs');
const path = require('path');
const moment = require('moment');
const archiver = require('archiver');

const dateToDay = moment().format('YYYY-MM-DD');

const generateNameFile = async (folderBackup, compress) => {
  let numberIncrement = 1;
  while (true) {
    const fileName = `${dateToDay}-${numberIncrement}.sql`;
    const pathFile = path.join(folderBackup, fileName);

    if (!fs.existsSync(pathFile)) {
      if (compress) {
        const zipFileName = `${dateToDay}-${numberIncrement}.zip`;
        const zipFilePath = path.join(folderBackup, zipFileName);

        // Créez un fichier ZIP à partir du fichier de sauvegarde.
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);
        archive.file(pathFile, { name: `${dateToDay}-${numberIncrement}.sql` });
        await archive.finalize();

        return zipFilePath;
      } else {
        return pathFile;
      }
    }

    numberIncrement++;
  }
}

module.exports = { generateNameFile };
