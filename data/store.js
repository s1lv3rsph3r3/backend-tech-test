// For this basic API, we have data in .json file
const data = require('./d/data.json');
const { filterWrapper } = require('../utility/filter');
const { formatFunctionName } = require('../utility/format');
const logger = require('../logger');

// persistent resource: store
/**
 * Class handles all actions directly related
 * to modification and access of a store resource
 */
class Store {
  constructor() {
    const { name } = Store;
    this.listStores = this.listStores.bind(this);
    this.clazzName = name;
  }

  /**
   * Retrieves a list of store resources given a filtering description
   * @param description {{comparator: string, value: *, key: string}}
   * @return {*[]}
   */
  listStores(description) {
    logger.info(`${this.clazzName}@${formatFunctionName(this.listStores.name)}`, {description});
    const stores = [];
    data.embedded.stores.forEach((element) => {
      if (filterWrapper(description, element)) {
        stores.push(element);
      }
    });
    return typeof stores === 'undefined' ? [] : stores;
  }
}
module.exports = new Store();
