const express = require ('express');
router = express.Router();
const userController = require('../controllers/userContoller');


//route to get all users
router.get('/users', movieControllers.getAllUsers);
//Route to serach ID
router.get('/users/:id', movieControllers.getUserById);
//Route to serach genre
router.get('/users/:genre', movieControllers.getUserByGenre);


//Route to create new user
router.post('/users', movieControllers.createUser);
router.put('/users', movieControllers.updateUser);


//router delete user


router.delete('/users', movieControllers.deleteUser);
module.exports=router;
