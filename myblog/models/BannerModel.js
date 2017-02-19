var connPool = require("./ConnPool");

module.exports = {
	addBanner: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var addSql = "insert into blogbanner (img, link) values (?,?)";
			var arrs = req.body["arr"];

			for(var i = 0; i < arrs.length; i++) {
				var params = [arrs[i].img, arrs[i].link];

				conn.query(addSql, params, function(err, rs) {
					if(err) {
						res.send("数据库错误,错误原因:" + err.message);
					}

				});
			}
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