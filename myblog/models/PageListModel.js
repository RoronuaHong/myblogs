var connPool = require("./ConnPool");

module.exports = {
	pageLists: function(req, res) {
		pool = connPool();

		//从pool中获取连接(异步, 取到后回调)
		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var userlistSql = "select id,name,phonename,password from phoneadmin";
			var params = [];
			var userslistSql = "select id,name,webname,password from webadmin";
			var param = [];

			if(req.body["gets"] == 1) {
				conn.query(userlistSql, params, function(err, rs) {
					if(err) {
						res.send("数据库错误，错误原因" + err.message);
						return;
					}
					res.json({
						result: rs
					})
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
				});
			}
			conn.release();
		});
	}
}