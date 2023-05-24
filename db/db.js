/**
 *
 * @param {*} success 数据库连接成功的回调
 * @param {*} error   数据库连接失败的回调
 */
const config = require("../config/config");
module.exports = function (
	success,
	error = () => {
		console.log("连接失败");
	}
) {
	const mongoose = require("mongoose");
	// mongoose.set("strictQuery", false);
	mongoose.connect(`mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`);
	mongoose.connection.once("open", () => {
		console.log("数据库连接成功");
		success();
	});

	mongoose.connection.on("error", () => {
		console.log("连接失败");
		error();
	});
	mongoose.connection.on("close", () => {
		console.log("断开连接");
	});
};
