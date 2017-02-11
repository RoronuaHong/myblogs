var express = require("express");
var router = express.Router();
var userModel = require("../models/UserModel");
var PageListModel = require("../models/PageListModel");
var skillModel = require("../models/SkillModel.js");

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

	//用户录入
	if(req.body["num"]) {
		userModel.register(req, res);
	} else if(req.body["pagenum"]) {

		//获取分页信息
		PageListModel.pageLists(req, res);
	} else if(req.body["del"]) {

		//删除用户功能
		PageListModel.pagelistDel(req, res);
	} else if(req.body["addskill"]) {

		//获取技能和内容
		skillModel.skillAdd(req, res);
	} else if(req.body["showskill"]) {

		//展示技能内容
		skillModel.myskillShow(req, res);
	} else if(req.body["skidel"]) {

		//删除技能内容
		skillModel.skillDel(req, res);
	} else if(req.body["reviseskill"]) {

		//修改技能内容
		skillModel.skillRevise(req, res);
	} else {

		//获取名字
		loginbean = req.session.loginbean;
		res.json({
			name: loginbean.nicheng
		});
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
