// For this basic API, we have data in .json file
const data = require('./d/data.json');
const { filterWrapper } = require('../utility/filter');
const { formatFunctionName } = require('../utility/format');
const logger = require('../logger');

// persistent resource: brand
/**
 * Class handles all actions directly related
 * to modification and access of a brand resource
 */
class Brand {
  constructor() {
    const { name } = Brand;
    this.retrieveBrand = this.retrieveBrand.bind(this);
    this.listBrands = this.listBrands.bind(this);
    this.clazzName = name;
  }

  /**
   * Retrieves a single brand given a filtering description
   * @param description {{comparator: string, value: *, key: string}}
   * @return {null}
   */
  retrieveBrand(description) {
    logger.info(`${this.clazzName}@${formatFunctionName(this.retrieveBrand.name)}`, {description});
    const brand = data.data.find((element) => {
      return filterWrapper(description, element);
    });
    return typeof brand === 'undefined' ? null : brand;
  }

  /**
   * Retrieves a list of brand resources given a filtering description
   * @param description {{comparator: string, value: *, key: string}}
   * @return {*[]}
   */
  listBrands(description) {
    logger.info(`${this.clazzName}@${formatFunctionName(this.listBrands.name)}`, {description});
    const brands = [];
    data.data.forEach((element) => {
      if (filterWrapper(description, element)) {
        brands.push(element);
      }
    });
    return typeof brands === 'undefined' ? [] : brands;
  }
}

module.exports = new Brand();
