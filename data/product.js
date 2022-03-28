// For this basic API, we have data in .json file
const data = require('./d/data.json');
const { filterWrapper } = require('../utility/filter');
const { formatFunctionName } = require('../utility/format');
const logger = require('../logger');

// persistent resource: product
/**
 * Class handles all actions directly related
 * to modification and access of a product resource
 */
class Product {
  constructor() {
    const { name } = Product;
    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.listProducts = this.listProducts.bind(this);
    this.clazzName = name;
  }

  /**
   * Retrieves a single product given a filtering description
   * @param description {{comparator: string, value: *, key: string}}
   * @return {null}
   */
  retrieveProduct(description) {
    logger.info(`${this.clazzName}@${formatFunctionName(this.retrieveProduct.name)}`, {description});
    const brand = data.embedded.products.find((element) => {
      return filterWrapper(description, element);
    });
    return typeof brand === 'undefined' ? null : brand;
  }

  /**
   * Retrieves a list of product resources given a filtering description
   * @param description {{comparator: string, value: *, key: string}}
   * @return {*[]}
   */
  listProducts(description) {
    logger.info(`${this.clazzName}@${formatFunctionName(this.listProducts.name)}`, {description});
    const products = [];
    data.embedded.products.forEach((element) => {
      if (filterWrapper(description, element)) {
        products.push(element);
      }
    });
    return typeof products === 'undefined' ? [] : products;
  }
}
module.exports = new Product();
