const generateName = require ('./generateNameFile');
const {FILE_PATH , TO_ARCHIVE} = require ('../utils/utilities')


const backupCommand = async () => {
  try {
  await generateName.generateNameFile(FILE_PATH, TO_ARCHIVE);
  } catch (erreur) {
    console.error('Erreur lors de la sauvegarde', erreur);
  }
};

backupCommand();

