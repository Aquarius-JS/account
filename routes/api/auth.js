var express = require("express");
var router = express.Router();
const moment = require("moment");

const AccountModel = require("../../models/AccountModel");
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const config = require('../../config/config');

router.post("/login", (req, res) => {
	let username = req.body.user;
	let password = req.body.password;
	UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
		console.log(data);
		if (err) {
			res.json({
				code: "2001",
				msg: "数据库读取失败",
				data: null,
			});
			return;
		} else {
			if (!data) {
				res.json({
					code: "2002",
					msg: "用户名或密码错误~~~",
					data: null,
				});
				return;
			} else {
				let token = jwt.sign(
					{
						username: data.username,
						_id: data._id,
					},
					config.secret,
					{
						expiresIn: 60 * 60 * 24 * 7,
					}
				);
				res.json({
					code: "0000",
					msg: "登陆成功",
					data: token,
				});
				return;
			}
		}
	});
});

router.post("/logout", (req, res) => {
	req.session.destroy(() => {
		res.render("success", { msg: "推出成功", url: "/login" });
	});
});
module.exports = router;
