const fs = require('fs');
const path = require('path');
const moment = require('moment');


const dateToDay = moment().format('YYYY-MM-DD');

const generateNameFile = (folderBackup) => {
  let numberIncrement = 1;
  while (true) {
    const fileName = `${dateToDay}-${numberIncrement}.sql`;
    const pathFile = path.join(folderBackup, fileName);

    if (!fs.existsSync(pathFile)) {
      return pathFile;
    }

    numberIncrement++;
  }
}

module.exports =  { generateNameFile };