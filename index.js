const express = require('express');
const dotenv = require('dotenv');
const router =  require('./router')


dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
})