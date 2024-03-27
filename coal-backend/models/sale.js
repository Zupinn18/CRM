const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
        ownerName:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            required:true,
        },
        vNumber:{
            type:Number,
            required:true,
        },
        load:{
            type:Number,
            required:true,
        },
        vLoad:{
            type:Number,
            required:true,
        },
        netWeight:{
            type:Number,
            required:true,
        },
        material:{
            type:String,
            required:true,
        },
        paymentMode:{
            type:String,
            required:true,
        },
        advanceAmount:{
            type:Number,
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        },
        LastUpdatedBy:{
            type:String
        },
        LastUpdatedAt:{
            type:Date
        }
});

module.exports = mongoose.model("Sale",saleSchema);