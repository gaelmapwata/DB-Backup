const express = require('express');
const User = require('../models/User');

export default {
  index: async (req, res) => {
    try {
      const utilisateurs = await User.getAll();
      res.json(utilisateurs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des utilisateurs.');
    }
  },

  store: async (req, res) => {
    try {
      await User.create({ nom, email });
      res.status(201).send('Utilisateur créé avec succès.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création de l\'utilisateur.');
    }
  }
};


