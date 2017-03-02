var express = require('express');
var router = express.Router();
var skillmodel = require("../models/SkillModel.js");
var bannerModel = require("../models/BannerModel.js");
var articleModel = require("../models/ArticleModel.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*获取数据*/
router.post('/', function(req, res, next) {
	skillmodel.myskillShow(req, res);
});

/*跳转微博首页*/
router.get("/blogindex", function(req, res, next) {
	res.render("blogindex");
});

router.post("/blogindex", function(req, res, next) {
	if(req.body["bannerget"]) {

		//获取banner内容
		bannerModel.showBanner(req, res);
	} else if(req.body["indexbig"]) {

		//显示精选文章
		articleModel.showArticle(req, res);
	} else if(req.body["jsindex"]) {

		//显示JavaScript文章
		articleModel.showArticle(req, res);
	} else if(req.body["nodeindex"]) {

		//显示Node文章
		articleModel.showArticle(req, res);
	} else if(req.body["webindex"]) {

		//显示web文章
		articleModel.showArticle(req, res);
	} else if(req.body["content"]) {

		//显示文章内容
		articleModel.showallArticle(req, res);
	}
});

module.exports = router;
