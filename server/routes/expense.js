const express = require('express');
const {createExpense} = require('../controller/expense');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route('/create-expense').post(authenticate,createExpense);

module.exports = router;