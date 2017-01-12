var express = require("express");
var router = express.Router();
var userModel = require("../models/UserModel");

/* GET users listing. */
router.all('/', function(req, res, next) {
	res.render("./back/admin");
});

router.all('/index', function(req, res) {
	userModel.login(req,res);
});

/*首页*/
router.get('/indexs', function(req, res) {
	res.render("./back/indexs");
});

router.post('/indexs', function(req, res) {
	loginbean = req.session.loginbean;
	if(!req.body["num"]) {
		res.json({
			name: loginbean.nicheng
		});
	}

	//用户录入
	userModel.register(req,res);
});

/*注销session*/
router.all('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.redirect("/users");
	});
});

module.exports = router;
