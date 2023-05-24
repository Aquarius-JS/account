const express = require("express");
const router = express.Router();
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");
const checkTokenMiddleware = require("../../middlewares/checkTokenMiddleware");

//记账本的列表
router.get("/account", checkTokenMiddleware, function (req, res) {
	let accounts = AccountModel.find()
		.sort({ time: -1 })
		.exec((err, data) => {
			if (err) {
				res.json({
					code: "1001",
					msg: "读取失败",
					data: null,
				});
				return;
			} else {
				res.json({
					code: "0000",
					msg: "读取成功",
					data: data,
				});
			}
		});
});

//添加记录按钮
router.get("/account/create", checkTokenMiddleware, function (req, res) {
	res.render("create");
});

//新增记录
router.post("/account", checkTokenMiddleware, (req, res) => {
	AccountModel.create(
		{
			...req.body,
			time: moment(req.body.time).toDate(),
		},
		(err, data) => {
			if (err) {
				res.json({
					code: "1002",
					msg: "添加失败",
					data: null,
				});
				return;
			} else {
				res.json({
					code: "0000",
					msg: "添加成功",
					data: data,
				});
			}
		}
	);
});

//删除记录
router.delete("/account/:id", checkTokenMiddleware, (req, res) => {
	let id = req.params.id;
	AccountModel.deleteOne({ _id: id }, (err, data) => {
		if (err) {
			res.json({
				code: "1003",
				msg: "删除失败",
				data: null,
			});
		} else {
			res.json({
				code: "0000",
				msg: "删除成功",
				data: data,
			});
		}
	});
});

//获取单个账单信息
router.get("/account/:id", checkTokenMiddleware, (req, res) => {
	let id = req.params.id;
	AccountModel.findOne({ _id: id }, (err, data) => {
		if (err) {
			res.json({
				code: "1004",
				msg: "查询失败",
				data: null,
			});
		} else {
			res.json({
				code: "0000",
				msg: "查询成功",
				data: data,
			});
		}
	});
});

//更新账单接口
router.patch("/account/:id", checkTokenMiddleware, (req, res) => {
	let { id } = req.params;
	AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
		if (err) {
			res.json({
				code: "1005",
				msg: "更新失败",
				data: null,
			});
		} else {
			AccountModel.findOne({ _id: id }, (err, data) => {
				res.json({
					code: "0000",
					msg: "更新成功",
					data: data,
				});
			});
		}
	});
});

module.exports = router;
