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
			var params = [req.body["title"], req.body["author"], req.body["pre"], req.body["content"], req.body["times"]];
			async.series({
				one: function(callback) {
					if(req.body["btnspe"]) {
						var speSql = "insert into spearticle (title, author, pre, content, times) value (?,?,?,?,?)";

						conn.query(speSql, params, function(err, rs) {
							if(err) {
								res.send("获取连接错误,错误原因:" + err.message);
								return;
							}

							callback(null, rs);
						});
					} else {
						callback(null);
					}
				},
				two: function(callback) {
					console.log(req.body["btnsel"])
					if(req.body["btnsel"] == "JavaScript") {
						var insertSql = "insert into jsarticle (title, author, pre, content, times) value (?,?,?,?,?)";
					} else if(req.body["btnsel"] == "NodeJS") {
						var insertSql = "insert into nodearticle (title, author, pre, content, times) value (?,?,?,?,?)";
					} else if(req.body["btnsel"] == "Web框架") {
						var insertSql = "insert into webarticle (title, author, pre, content, times) value (?,?,?,?,?)";
					}

					console.log(params);
					conn.query(insertSql, params, function(err, rs) {
						if(err) {
							res.send("获取连接错误,错误原因:" + err.message);
							return;
						}

						callback(null, rs);
					});
				}
			}, function(err, results) {
				console.log(results);
				res.json({
					messages: "创建文章成功"
				});
			});
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
				var selectspeSql = "select title, author, pre, times from spearticle limit ?,?";
				var specountSql = "select count(*) from spearticle";

				var pageSize = req.body["pagesize"];
				var page = req.body["pagenum"];

				//开始的页面数
				var pointStart = (page - 1) * pageSize;
				var params = [pointStart, pageSize];

				//获取对象
				var titleArr = [];

				async.series({
					one: function(callback) {
						conn.query(specountSql, [], function(err, rs) {
							if(err) {
								res.send("获取连接错误,错误原因:" + err.message);
								return;
							}

							callback(null, rs);
						});
					},
					two: function(callback) {
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
									"times": rs[i].times
								});
							}
							callback(null, rs);
						});
					}
				}, function(err, results) {
					res.json({
						titleArr: titleArr,
						result: Math.ceil(results.one[0]["count(*)"] / pageSize)
					});
					console.log(Math.ceil(results.one[0]["count(*)"] / pageSize))
				});
				conn.release();
			}
		});
	}
}