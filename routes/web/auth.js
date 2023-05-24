var express = require("express");
var router = express.Router();
const moment = require("moment");

const AccountModel = require("../../models/AccountModel");
const UserModel = require("../../models/UserModel");
const md5 = require("md5");

router.get("/reg", (req, res) => {
	//响应html
	res.render("reg");
});
router.post("/reg", (req, res) => {
	UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
		if (err) {
			res.status(500).send("注册失败");
			return;
		} else {
			res.render("success", { msg: "注册成功", url: "/login" });
		}
	});
});
router.get("/login", (req, res) => {
	res.render("login");
});
router.post("/login", (req, res) => {
	let { username, password } = req.body;
	UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
		if (err) {
			res.status(500).send("登录失败");
			return;
		} else {
			console.log(data);
			if (!data) {
				res.send("账号或密码错误");
				return;
			} else {
				req.session.username = data.username;
				req.session._id = data._id;
				res.render("success", { msg: "登录成功", url: "/account" });
				return;
			}
		}
	});
});

router.post("/logout", (req, res) => {
	req.session.destroy(()=>{
		res.render('success',{msg:'退出成功',url:'/login'});
	})
});
module.exports = router;
