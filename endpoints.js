const { buildRouter } = require('./utility/router');
const logger = require('./logger');
const brandModel = require('./data/brand');
const productModel = require('./data/product');
const storeModel = require('./data/store');

const router = buildRouter();

/**
 * GET {{host}}/brand/:brandId
 * Returns a single brand resource
 */
router.get('/brand/:brandId', (req, res) => {
  const brand = brandModel.retrieveBrand({
    key: 'id',
    comparator: 'equals',
    value: req.params.brandId,
  });
  logger.info(req.originalUrl, {status: 200});
  return res.status(200).json(brand);
});

/**
 * GET {{host}}/brand/:brandId/product
 * Returns an array of all products for a given brand (includes consolidated products)
 */
router.get('/brand/:brandId/product', (req, res) => {
  const brand = brandModel.retrieveBrand({
    key: 'id',
    comparator: 'equals',
    value: req.params.brandId,
  });
  // This includes all consolidate products as well
  const uuidArr = [...brand.products, ...brand.consolidated_products];
  const products = productModel.listProducts({
    key: 'id',
    comparator: 'includes',
    value: uuidArr,
  });
  logger.info(req.originalUrl, {status: 200});
  return res.status(200).json(products);
});

/**
 * GET {{host}}/brand/:brandId/store
 * Returns all stores associated with a particular brand
 */
router.get('/brand/:brandId/store', (req, res) => {
  const brand = brandModel.retrieveBrand({
    key: 'id',
    comparator: 'equals',
    value: req.params.brandId,
  });
  const uuidArr = brand.stores;
  const stores = storeModel.listStores({
    key: 'id',
    comparator: 'includes',
    value: uuidArr,
  });
  logger.info(req.originalUrl, {status: 200});
  return res.status(200).json(stores);
});

/**
 * GET {{host}}/product/:productId/store
 * Returns all stores that host a particular product (includes consolidated products)
 */
router.get('/product/:productId/store', (req, res) => {
  // Which product am I getting?
  // Which brands does this product belong to?
  // Which stores supply brands which supply this product?
  const product = productModel.retrieveProduct({
    key: 'id',
    comparator: 'equals',
    value: req.params.productId,
  });
  // Find brands based on a product
  const productsUuidArr = brandModel
    .listBrands({ key: 'products', comparator: 'includes', value: product.id })
    .map((o) => o.id);
  const consolidatedProductsUuidArr = brandModel
    .listBrands({
      key: 'consolidated_products',
      comparator: 'includes',
      value: product.id,
    })
    .map((o) => o.id);
  const uuidArr = [...productsUuidArr, ...consolidatedProductsUuidArr];
  // Pass the list of uuids into storeModel
  const stores = storeModel.listStores({
    key: 'brand_id',
    comparator: 'includes',
    value: uuidArr,
  });
  logger.info(req.originalUrl, {status: 200});
  return res.status(200).json(stores);
});

module.exports = { router };
