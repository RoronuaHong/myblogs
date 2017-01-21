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

			var skilltitleSql = "insert into t_skilltitle (name,process) values (?,?)";

			var skillconsSql = "insert into t_skillcon (name) values (?)";

			var params = req.body["skilltitle"];
			var titparams = [req.body["skilltitle"], req.body["skillpro"] + "%"];
			var conparams = req.body["repeatdata"];

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
					console.log(req.body["skillpro"])
					if(req.body["skillpro"]) {

						//添加技能名称和掌握程度
						conn.query(skilltitleSql, titparams, function(err, rs) {
							if(err) {
								res.send("数据库错误,错误原因:" + err.message);
								return;
							}

							for(var i = 0; i < conparams.length; i++) {

								//添加技能内容
								conn.query(skillconsSql, conparams[i], function(err, rs) {
									if(err) {
										res.send("数据库错误,错误原因:" + err.message);
										return;
									}
								});
							}
							res.json({
								result: 1,
								message: "添加技能成功"
							});
						});
					} else {
						res.json({
							result: 0,
							message: "输入的技能掌握程度数据错误"
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

			var selectskillSql = "select id, name, process from t_skilltitle";
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
						"pro": rs[i].process
					})
				}

				res.json({
					arr: skillarrs
				});
			});
		});
	}
}