const axios = require('axios');

const API_URL='https://api.exchangeratesapi.io/v1/'
const API_KEY = process.env.API_KEY 


const fetchExchangeRates = async (base) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        base,
        access_key: API_KEY,
      },
    });

    if (!response.data || !response.data.rates) {
      throw new Error('Invalid API response');
    }

    return response.data.rates;
  } catch (error) {
    throw new Error('External API is unavailable. Please try again later.');
  }
};


const validateCurrencyCode = (currency, rates) => {
  if (!rates[currency]) {
    throw new Error(`Invalid currency code: "${currency}" is not supported.`);
  }
};


const calculateConvertedAmount = (amount, rate) => {
  return parseFloat((amount * rate).toFixed(2));
};

module.exports = {
  fetchExchangeRates,
  validateCurrencyCode,
  calculateConvertedAmount,
};
