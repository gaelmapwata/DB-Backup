const express = require('express');
const dotenv = require('dotenv');
const router =  require('./router')
const cron = require('node-cron');
const { exec } = require('child_process');



const heureSauvegarde = '*/1 * * * *';


// Planifiez la tâche de sauvegarde à l'heure spécifiée.
cron.schedule(heureSauvegarde, () => {

  const backupProcess = exec('node ./utils/backup.js');

  backupProcess.stdout.on('data', (data) => {
    console.log(data);
  });

  backupProcess.stderr.on('data', (data) => {
    console.error(data);
  });

})


dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
})