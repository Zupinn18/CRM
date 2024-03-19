const express = require("express");
const router = express.Router();

const {
    createSale,
    updateSale,
    getAllSales,
} = require("../Controllers/Sale.js");

router.post("/create-sale",createSale);
router.put("/update-sale",updateSale);
router.get("/get-sale",getAllSales);

module.exports = router;