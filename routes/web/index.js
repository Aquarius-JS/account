const express = require("express");
const router = express.Router();
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");
//导入中间件检测登录
const checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");

router.get("/", (req, res) => {
	res.redirect("/account");
});

//记账本的列表
router.get("/account", checkLoginMiddleware, function (req, res, next) {
	let accounts = AccountModel.find()
		.sort({ time: -1 })
		.exec((err, data) => {
			if (err) {
				console.log("读取失败");
				return;
			} else {
				console.log(accounts);

				res.render("list", { accounts: data, moment });
			}
		});
});

//添加记录按钮
router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
	res.render("create");
});

//新增记录
router.post("/account", checkLoginMiddleware, (req, res) => {
	AccountModel.create(
		{
			...req.body,
			time: moment(req.body.time).toDate(),
		},
		(err, data) => {
			if (err) {
				console.log("插入失败");
				res.status(500).send("插入失败");
				// res.render('')
				return;
			} else {
				console.log();
				res.render("success", { msg: "添加成功le", url: "/account" });
			}
		}
	);
});

//删除记录
router.get("/account/:id", checkLoginMiddleware, (req, res) => {
	let id = req.params.id;
	AccountModel.deleteOne({ _id: id }, (err, data) => {
		if (err) {
			console.log("删除失败");
			res.status(500).send("删除失败");
		} else {
			// res.send('删除成功');
			res.render("success", { msg: "删除成功", url: "/account" });
		}
	});
});

module.exports = router;
