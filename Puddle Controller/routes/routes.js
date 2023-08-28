const express = require('express');


const {findActiveFiler,findActiveTranscoder} = require('../controllers/nodeController');
const {getNonce,verify}=require("../controllers/authController")



const router = express.Router();

router.route('/active-transcoders').post(findActiveTranscoder);
router.route('/get-nonce').get(getNonce);
router.route('/verify').post(verify);


module.exports = router;