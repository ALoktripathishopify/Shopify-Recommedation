const express = require('express');
const request = require('request');
const apiKey = "d92db8f1e05f62fefa8ba3e1a928303e";
const password = "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";
const baseUrl = "https://aloktest2024.myshopify.com/admin/api/2022-07";
const axios = require('axios');
const app = express();
const PORT = 4000;

const fetchRecommendedProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products.json`, {
      auth: {
        username: apiKey,
        password: password
      },
      params: {
        limit:5  // Limiting to 5 products for recommendations
      }
    });
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    throw error;
  }
};

app.get('/api/recommendations', async (req, res) => {
  try {
    const recommendedProducts = await fetchRecommendedProducts();
    res.json({
      success: true,
      data: recommendedProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommended products'
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});