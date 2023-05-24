const mongoose = require('mongoose');
let AccountSchema = new mongoose.Schema({
    title:String,
    time:Date,
    type:{
        type:Number,
        default:-1,
    },
    account:{
        type:Number,
        required:true
    },
    remarks:{
        type:String
    }
})
let AccountModel = mongoose.model('account',AccountSchema);
module.exports = AccountModel;