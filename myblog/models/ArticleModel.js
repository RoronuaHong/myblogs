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
					if(req.body["btnsel"] == "JavaScript") {
						var insertSql = "insert into jsarticle (title, author, pre, content, times) value (?,?,?,?,?)";
					} else if(req.body["btnsel"] == "NodeJS") {
						var insertSql = "insert into nodearticle (title, author, pre, content, times) value (?,?,?,?,?)";
					} else if(req.body["btnsel"] == "Web框架") {
						var insertSql = "insert into webarticle (title, author, pre, content, times) value (?,?,?,?,?)";
					}

					conn.query(insertSql, params, function(err, rs) {
						if(err) {
							res.send("获取连接错误,错误原因:" + err.message);
							return;
						}

						callback(null, rs);
					});
				}
			}, function(err, results) {
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
				var selectspeSql = "select id, title, author, pre, times from spearticle limit ?,?";
				var specountSql = "select count(*) from spearticle";
			}

			if(req.body["jsindex"]) {
				var selectspeSql = "select id, title, author, pre, times from jsarticle limit ?,?";
				var specountSql = "select count(*) from jsarticle";
			}

			if(req.body["nodeindex"]) {
				var selectspeSql = "select id, author, pre, times from nodearticle limit ?,?";
				var specountSql = "select count(*) from nodearticle";
			}

			if(req.body["webindex"]) {
				var selectspeSql = "select id, title, author, pre, times from webarticle limit ?,?";
				var specountSql = "select count(*) from webarticle";
			}

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
								"id": rs[i].id,
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
			});
			conn.release();
		});
	},
	showallArticle: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var totalArr = [];

			if(req.body["contentid"]) {
				var showallSql = "select title, author, pre, times, content from spearticle where id=?";
				var params = [req.body["contentid"]];
			}

			if(req.body["jscontentid"]) {
				var showallSql = "select title, author, pre, times, content from jsarticle where id=?";
				var params = [req.body["jscontentid"]];
			}

			if(req.body["nodecontentid"]) {
				var showallSql = "select title, author, pre, times, content from nodearticle where id=?";
				var params = [req.body["nodecontentid"]];
			}

			if(req.body["webcontentid"]) {
				var showallSql = "select title, author, pre, times, content from webarticle where id=?";
				var params = [req.body["webcontentid"]];
			}

			totalArr.splice(0, totalArr.length);

			conn.query(showallSql, params, function(err, rs) {
				if(err) {
					res.send("获取连接错误,错误原因:" + err.message);
					return;
				}

				totalArr.push({
					title: rs[0].title,
					author: rs[0].author,
					pre: rs[0].pre,
					times: rs[0].times,
					content: rs[0].content
				});

				res.json({
					totalArr: totalArr
				});
			});
			conn.release();
		});
	},
	showArtList: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var artlistArr = [];

			if(req.body["artalls"] === 1) {
				var artSql = "select id, title, author, pre, times from spearticle";
			}

			if(req.body["artalls"] === 2) {
				var artSql = "select id, title, author, pre, times from jsarticle";
			}

			if(req.body["artalls"] === 3) {
				var artSql = "select id, title, author, pre, times from nodearticle";
			}

			if(req.body["artalls"] === 4) {
				var artSql = "select id, title, author, pre, times from webarticle";
			}

			conn.query(artSql, [], function(err, rs) {
				if(err) {
					res.send("获取连接错误,错误原因:" + err.message);
					return;
				}

				artlistArr.splice(0, artlistArr.length);

				for(var i = 0; i < rs.length; i++) {
					artlistArr.push({
						id: rs[i].id,
						title: rs[i].title,
						author: rs[i].author,
						pre: rs[i].pre,
						times: rs[i].times
					});
				}

				res.json({
					artlistArr: artlistArr
				});
			});
			conn.release();
		});
	},
	delArtList: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			if(req.body["delnums"] === 1) {
				var delSql = "delete from spearticle where id=?";
			}

			if(req.body["delnums"] === 2) {
				var delSql = "delete from jsarticle where id=?";
			}

			if(req.body["delnums"] === 3) {
				var delSql = "delete from nodearticle where id=?";
			}

			if(req.body["delnums"] === 4) {
				var delSql = "delete from webarticle where id=?";
			}

			var params = [req.body["artdel"]];
			var detailart = [];

			conn.query(delSql, params, function(err, rs) {
				if(err) {
					res.send("获取连接错误,错误原因:" + err.message);
					return;
				}

				res.json({
					result: 1
				});
			});
			conn.release();
		});
	}
}