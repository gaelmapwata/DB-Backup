const User = require('../models/User');

const index = async (req, res) => {
  try {
    const utilisateurs = await User.getAll();
    res.json(utilisateurs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs.');
  }
};

const store = async (req, res) => {
  const { name, email } = req.body; 
  try {
    await User.create({ name, email });
    res.status(201).send('Utilisateur créé avec succès.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création de l\'utilisateur.');
  }
};

module.exports = { index, store }; 
