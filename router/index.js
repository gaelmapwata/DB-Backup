const express = require('express');
const UserController = require('../controllers/UserController'); 

const router =  express.router();


router.get('/users',UserController.index);
router.post('/users', UserController.store);


export default router;
