const mongoose = require("mongoose");

const dailyExpenseSchema = new mongoose.Schema({
        date:{
            type:Date,
            required:true,
        },
        munshiSalary:{
            type:Number,
            required:true,
        },
        plantDumper:{
            type:Number,
            required:true,
        },
        electricity:{
            type:Number,
            required:true,
        },
        rent:{
            type:Number,
            required:true,
        },
        diesel:{
            type:Number,
            required:true,
        },
        plantExpense:{
            type:Number,
            required:true,
        },
        plantJCB:{
            type:Number,
            required:true,
        },
        plantHM:{
            type:Number,
            required:true,
        },
        plantTractor:{
            type:Number,
            required:true,
        },
        formen:{
            type:Number,
            required:true,
        },
        royalty:{
            type:Number,
            required:true,
        },
});

module.exports = mongoose.model("DailyExpense",dailyExpenseSchema);