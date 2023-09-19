const express = require('express');
const UserController = require('../controllers/UserController'); 

const router =  express.Router();


router.get('/users',UserController.index);
router.post('/users', UserController.store);


module.exports = router;
