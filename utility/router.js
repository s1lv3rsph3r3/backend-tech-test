const express = require('express');
const brandModel = require('../data/brand');
const productModel = require('../data/product');

/**
 * Helper function to build the correct param validation
 * for any router required across the application
 * (Prevents duplicate declaration of code)
 * @return {Router}
 */
const buildRouter = () => {
  const router = express.Router();
  router.param('brandId', (req, res, next) => {
    const brand = brandModel.retrieveBrand({
      key: 'id',
      comparator: 'equals',
      value: req.params.brandId,
    });
    if (brand === null) {
      return res.status(404).json(`Cannot find brand ${req.params.brandId}`);
    }
    return next();
  });
  router.param('productId', (req, res, next) => {
    const product = productModel.retrieveProduct({
      key: 'id',
      comparator: 'equals',
      value: req.params.productId,
    });
    if (product === null) {
      return res
        .status(404)
        .json(`Cannot find product ${req.params.productId}`);
    }
    return next();
  });
  return router;
};

module.exports = { buildRouter };
