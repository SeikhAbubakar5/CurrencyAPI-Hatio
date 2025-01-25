const { fetchExchangeRates, validateCurrencyCode, calculateConvertedAmount } = require('../services/currencyservice');

// GET /api/rates
const getExchangeRates = async (req, res) => {
  const base = req.query.base || 'USD';

  try {
    const rates = await fetchExchangeRates(base);
    res.status(200).json({ base, rates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/convert
const convertCurrency = async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount) {
    return res.status(400).json({
      error: 'Missing required fields: "from", "to", and "amount" are mandatory.',
    });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      error: '"amount" should be a positive number.',
    });
  }

  try {
    const rates = await fetchExchangeRates(from);

    // Validate currency codes
    validateCurrencyCode(to, rates);

    //converted amount
    const convertedAmount = calculateConvertedAmount(amount, rates[to]);

    res.status(200).json({
      from,
      to,
      amount,
      convertedAmount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExchangeRates,
  convertCurrency,
};
