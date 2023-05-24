let jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports = (req, res, next) => {
	let token = req.get("token");
	if (!token) {
		return res.json({
			code: "2003",
			msg: "缺少token",
			data: null,
		});
	}
	jwt.verify(token, config.secret, (err, data) => {
		if (err) {
			return res.json({
				code: "2004",
				msg: "token校验失败",
				data: null,
			});
		} else {
            req.user = data;
			next();
		}
	});
};
