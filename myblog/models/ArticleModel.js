var connPool = require("./ConnPool");
var fs = require("fs");
var async = require("async");

module.exports = {
	addArticle: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			if(req.body["btnspe"]) {
				var speSql = "insert into spearticle (title, author, pre, content, times) value (?,?,?,?,?)";
				var speparams = [req.body["title"], req.body["author"], req.body["pre"], req.body["content"], req.body["times"]];

				conn.query(speSql, speparams, function(err, rs) {
					if(err) {
						res.send("获取连接错误,错误原因:" + err.message);
						return;
					}

					res.json({
						messages: "创建文章成功"
					});
				});
			}
			conn.release();
		});
	},
	showArticle: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			if(req.body["indexbig"]) {
				var selectspeSql = "select title, author, pre, times from spearticle";
				var params = [];

				//获取对象
				var titleArr = [];

				conn.query(selectspeSql, params, function(err, rs) {
					if(err) {
						res.send("获取连接错误,错误原因:" + err.message);
						return;
					}

					for(var i = 0; i < rs.length; i++) {
						titleArr.push({
							"title": rs[i].title,
							"author": rs[i].author,
							"pre": rs[i].pre,
							"times": rs[i].times,
							"len": (Math.floor((rs.length - 1) / req.body["num"]) + 1)
						});
					}
					res.json({
						titleArr: titleArr
					});
				});
				conn.release();
			}
		});
	}
}