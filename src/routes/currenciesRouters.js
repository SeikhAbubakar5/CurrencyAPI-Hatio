const express = require("express");

const { getExchangeRates, convertCurrency } = require("../controllers/controller");

const router = express.Router();


router.get("/rates", getExchangeRates);
router.post("/convert", convertCurrency);

module.exports = router;

