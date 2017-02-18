var connPool = require("./ConnPool");

module.exports = {
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
				})
			});
		});
	}
}