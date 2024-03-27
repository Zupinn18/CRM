const DailyExpense = require("../models/DailyExpense.js");

// create a expense entry
exports.createExpense = async(req,res)=>{
    try {
        const {
            date,
            salary,
            tea,
            electricity,
            internet,
            fuel,
        } = req.body;

        if(!date || !salary || !tea || !electricity || !internet || !fuel){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        const expenses = await DailyExpense.create({
            date,
            salary,
            tea,
            electricity,
            internet,
            fuel,
        });

        return res.status(200).json({
            success:true,
            message:'Expense data uploaded successfully',
            data:expenses,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't upload expense due to ${error.message}`
        });
    }
}

// get all expense
exports.getExpenses = async(req,res)=>{
    try {
        const allExpenses = await DailyExpense.find({});

        if(!allExpenses){
            return res.status(403).json({
                success:false,
                message:'Not Expense data available',
            });
        }

        return res.status(200).json({
            success:true,
            message:'Expenses data Fetched Successfully',
            data:allExpenses,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Can't fetch all Expenses due to ${error.message} `,
        });
    }
}