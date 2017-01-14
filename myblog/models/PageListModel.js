var connPool = require("./ConnPool");
var async = require("async");

module.exports = {
	pageLists: function(req, res) {
		pool = connPool();

		//从pool中获取连接(异步, 取到后回调)
		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var pageSize = 5;
			var page = req.body["pagenum"];

			//开始的页面数
			var pointStart = (page - 1) * pageSize;

			var countSql = "select count(*) from phoneadmin";
			var countsSql = "select count(*) from webadmin";

			var userlistSql = "select id,name,phonename,password from phoneadmin limit ?, ?";
			var params = [pointStart, pageSize];

			var userslistSql = "select id,name,webname,password from webadmin limit ?,?";
			var param = [pointStart, pageSize];

			async.series({
				one: function(callback) {
					if(req.body["gets"] == 1) {
						conn.query(countSql, [], function(err, rs) {
							if(err) {
								res.send("数据库错误，错误原因" + err.message);
								return;
							}
							callback(null, rs);
						});
					} else if(req.body["gets"] == 2) {
						conn.query(countSql, [], function(err, rs) {
							if(err) {
								res.send("数据库错误，错误原因" + err.message);
								return;
							}
							callback(null, rs);
						});
					}
				},
				two: function(callback) {
					if(req.body["gets"] == 1) {
						conn.query(userlistSql, params, function(err, rs) {
							if(err) {
								res.send("数据库错误，错误原因" + err.message);
								return;
							}
							res.json({
								result: rs
							});
							callback(null, rs);
						});
					} else if(req.body["gets"] == 2) {
						conn.query(userslistSql, param, function(err, rs) {
							if(err) {
								res.send("数据库错误，错误原因" + err.message);
								return;
							}
							res.json({
								result: rs
							});
							callback(null, rs);
						});
					}
				}
			}, function(err, results) {
				console.log(results);
			});

			// if(req.body["gets"] == 1) {
			// 	conn.query(userlistSql, params, function(err, rs) {
			// 		if(err) {
			// 			res.send("数据库错误，错误原因" + err.message);
			// 			return;
			// 		}
			// 		res.json({
			// 			result: rs
			// 		});
			// 	});
			// } else if(req.body["gets"] == 2) {
			// 	conn.query(userslistSql, param, function(err, rs) {
			// 		if(err) {
			// 			res.send("数据库错误，错误原因" + err.message);
			// 			return;
			// 		}
			// 		res.json({
			// 			result: rs
			// 		});
			// 	});
			// }
			conn.release();
		});
	}
}