const express = require('express');


const {getAllBet} = require('../controllers/Controller');



const router = express.Router();

router.route('/get-all-bets').get(getAllBet);

module.exports = router;