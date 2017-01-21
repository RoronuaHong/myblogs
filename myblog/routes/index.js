var express = require('express');
var router = express.Router();
var skillmodel = require("../models/SkillModel.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*获取数据*/
router.post('/', function(req, res, next) {
	skillmodel.myskillShow(req, res);
});

module.exports = router;
