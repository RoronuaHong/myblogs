var express = require("express");
var router = express.Router();
var userModel = require("../models/UserModel");
var PageListModel = require("../models/PageListModel");

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
	if(!req.body["num"] && !req.body["pagenum"]) {
		res.json({
			name: loginbean.nicheng
		});
	}

	//用户录入
	if(req.body["num"]) {
		userModel.register(req, res);
	}

	//获取分页信息
	if(req.body["pagenum"]) {
		PageListModel.pageLists(req, res);
	}
});

router.post('indexs#/userlist', function(req, res) {
	res.json({
		result: 1
	});
});

/*注销session*/
router.all('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.redirect("/users");
	});
});

module.exports = router;
