var connPool = require("./ConnPool");

module.exports = {
	skillAdd: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}
			var selectskilltitleSql = "select name from t_skilltitle where name=?";

			var skilltitleSql = "insert into t_skilltitle (name, process, content) values (?,?,?)";

			var conparams = req.body["repeatdata"];
			var conallparams = "";

			for(var i = 0; i < conparams.length; i++) {
				conallparams += (i + 1) + "." + conparams[i] + ";";
			}
			var params = req.body["skilltitle"];
			var titparams = [req.body["skilltitle"], req.body["skillpro"] + "%", conallparams];

			conn.query(selectskilltitleSql, params, function(err, rs) {
				if(err) {
					res.send("数据库错误,错误原因:" + err.message);
					return;
				}

				if(rs.length > 0) {
					res.json({
						result: 0,
						message: "已存在该技能名称"
					});
				} else {
					if(req.body["skillpro"]) {

						//添加技能名称和掌握程度
						conn.query(skilltitleSql, titparams, function(err, rs) {
							if(err) {
								res.send("数据库错误,错误原因:" + err.message);
								return;
							}

							res.json({
								result: 1,
								message: "添加技能成功"
							});
						});
					} else {
						res.json({
							result: 0,
							message: "输入的技能掌握程度0-100之间"
						});
					}
				}
			});
			conn.release();
		});
	},
	myskillShow: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}

			var selectskillSql = "select id, name, process, content from t_skilltitle";
			var params = [];

			//技能数组
			var skillarrs = [];

			//技能对象
			var skillarr = {};

			conn.query(selectskillSql, params, function(err, rs) {
				if(err) {
					res.send("数据库错误,错误原因:" + err.message);
				}

				for(var i = 0; i < rs.length; i++) {
					skillarrs.push({
						"id": rs[i].id,
						"name": rs[i].name,
						"pro": rs[i].process,
						"cons":rs[i].content
					});
				}

				res.json({
					arr: skillarrs
				});
			});
		});
	},
	skillDel: function(req, res) {
		pool = connPool();

		pool.getConnection(function(err, conn) {
			if(err) {
				res.send("获取连接错误,错误原因:" + err.message);
				return;
			}
			var delskillSql = "delete from t_skilltitle where id=?";
			var params = req.body["ids"];

			conn.query(delskillSql, params, function(err, rs) {
				if(err) {
					res.send("数据库错误,错误原因:" + err.message);
				}
				res.json({
					result: 1
				})
			});
			conn.release();
		});
	}
}