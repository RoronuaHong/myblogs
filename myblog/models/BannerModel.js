var connPool = require("./ConnPool");
var fs = require("fs");
var async = require("async");

module.exports = {
	changeBanner: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var oldSql = "update blogbanner set img=?, link=? where id=?";
			var newSql = "insert into blogbanner (img, link) values (?,?)";
			var oldarrs = req.body["oldarr"];
			var newarrs = req.body["newarr"];

			//随机生成6位的随机数
			var oldimg = [];
			var newimg = [];

			//设置转换后的图片位置
			var imgData = [];
			var imgDatas = [];

			// for(var i = 0; i < oldarrs.length; i++) {
			// 	var ransSum = parseInt(Math.random() * 1000000);
			// 	if(/image\/\w+/.test(oldarrs[i].img)) {
			// 		imgData[i] = (oldarrs[i].img).replace(/^data:image\/\w+;base64,/, "");
			// 		oldimg[i] = new Buffer(imgData[i], "base64");
			// 		oldarrs[i].img = "public/images/" + new Date().getTime() + ransSum +".png";

			// 		//写入文件
			// 		fs.writeFile(oldarrs[i].img, oldimg[i], function(err) {
			// 			if(err) {
			// 				console.log("写入成功");
			// 			} else {
			// 				console.log("写入成功");
			// 			}
			// 		});
			// 	}

			// 	var oldparams = [(oldarrs[i].img).replace(/public/gi, ""), oldarrs[i].link, oldarrs[i].id];

			// 	conn.query(oldSql, oldparams, function(err, rs) {
			// 		if(err) {
			// 			res.send("获取连接错误,错误原因:" + err.message);
			// 			return;
			// 		}
			// 	});
			// }
			// conn.release();
			async.series({
				one: function(callback) {
					var rss = [];
					for(var i = 0; i < oldarrs.length; i++) {
						var ransSum = parseInt(Math.random() * 1000000);
						if(/image\/\w+/.test(oldarrs[i].img)) {
							imgData[i] = (oldarrs[i].img).replace(/^data:image\/\w+;base64,/, "");
							oldimg[i] = new Buffer(imgData[i], "base64");
							oldarrs[i].img = "public/images/" + new Date().getTime() + ransSum +".png";

							//写入文件
							fs.writeFile(oldarrs[i].img, oldimg[i], function(err) {
								if(err) {
									console.log("写入成功");
								} else {
									console.log("写入成功");
								}
							});
						}

						var oldparams = [(oldarrs[i].img).replace(/public/gi, ""), oldarrs[i].link, oldarrs[i].id];

						conn.query(oldSql, oldparams, function(err, rs) {
							if(err) {
								res.send("获取连接错误,错误原因:" + err.message);
								return;
							}
							rss.push(rs);
						});
					}
					callback(null, rss);
				},
				two: function(callback) {
					var rss2 = [];
					for(var i = 0; i < newarrs.length; i++) {
						var ransSum = parseInt(Math.random() * 1000000);
						if(/image\/\w+/.test(newarrs[i].img)) {
							imgDatas[i] = (newarrs[i].img).replace(/^data:image\/\w+;base64,/, "");
							newimg[i] = new Buffer(imgDatas[i], "base64");
							newarrs[i].img = "public/images/" + new Date().getTime() + ransSum +".png";

							//写入文件
							fs.writeFile(newarrs[i].img, newimg[i], function(err) {
								if(err) {
									console.log("写入成功");
								} else {
									console.log("写入成功");
								}
							});
						}

						var newparams = [(newarrs[i].img).replace(/public/gi, ""), newarrs[i].link, newarrs[i].id];

						conn.query(newSql, newparams, function(err, rs) {
							if(err) {
								res.send("获取连接错误,错误原因:" + err.message);
								return;
							}
							rss2.push(rs);
						});
					}
					callback(null, rss2);
				}
			}, function(err, results) {
				res.json({
					message: "添加成功"
				});
			});
			conn.release();
		});
	},
	showBanner: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var selectSql = "select id, img, link from blogbanner";

			var params = [];

			//banner对象
			var imgarr = [];

			conn.query(selectSql, params, function(err, rs) {
				if(err) {
					res.send("数据库错误,错误原因:" + err.message);
				}

				for(var i = 0; i < rs.length; i++) {
					imgarr.push({
						"id": rs[i].id,
						"img": rs[i].img,
						"link":rs[i].link
					});
				}
				res.json({
					arr: imgarr
				});
			});
			conn.release();
		});
	},
	delBanner: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var delSql = "delete from blogbanner where id=?";
			var params = [req.body["ids"]];

			conn.query(delSql, params, function(err, rs) {
				if(err) {
					res.send("数据库错误,错误原因:" + err.message);
				}
				res.json({
					result: 1
				});
			});
			conn.release();
		});
	}
}