const express = require('express');
const router = express.Router();
const {userRegistration,loginUser,getTeamData,getTeamForSpecificMatch} = require('../controller/controller');
const {userValidations} = require('../middleware/userValidation');
const {userAuthentication} = require('../middleware/auth');

// Api's-----------
router.post('/userRegistration', userValidations,userRegistration);
router.post('/loginUser', loginUser);
router.get('/viewTeamData',userAuthentication,getTeamData);
router.get('/viewDataForSpecificMatch',userAuthentication,getTeamForSpecificMatch)

module.exports = router;