const mongoose = require("mongoose");

const dailyExpenseSchema = new mongoose.Schema({
        date:{
            type:Date,
            required:true,
        },
        salary:{
            type:Number,
            required:true,
        },
        tea:{
            type:Number,
            required:true,
        },
        electricity:{
            type:Number,
            required:true,
        },
        internet:{
            type:Number,
            required:true,
        },
        fuel:{
            type:Number,
            required:true,
        },
});

module.exports = mongoose.model("DailyExpense",dailyExpenseSchema);