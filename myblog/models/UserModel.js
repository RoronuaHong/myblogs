var connPool = require("./ConnPool");
var LoginBean = require("../jsbean/LoginBean");

module.exports = {
	login: function(req, res) {
		pool = connPool();

		//从pool中获取连接(异步，取到后回调)
		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}
			if(req.body["num"] == 1) {
				var userSql = "select id,name,password from phoneadmin where phonename=? and password=?";
				var param = [req.body["phonen"], req.body["phonep"]];
			} else if(req.body["num"] == 2) {
				var userSql = "select id,name,password from webadmin where webname=? and password=?";
				var param = [req.body["webn"], req.body["webp"]];
			}

			conn.query(userSql, param, function(err, rs) {
				if(err) {
					res.send("数据库错误，错误原因" + err.message);
				}

				//判断登录是否成功
				if(rs.length > 0) {
					loginbean = new LoginBean();
					loginbean.id = rs[0].id;
					loginbean.nicheng = rs[0].name;
					req.session.loginbean = loginbean;
					res.json({
						result: "1"
					});
				} else {
					res.json({
						result: "0",
						message: "账号或密码错误,请重新输入"
					});
				}
			});
			conn.release();
		});
	}
}