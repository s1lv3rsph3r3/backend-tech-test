/**
 * Custom helper function which takes a description
 * and determines if the given element matches the description
 * @param description
 * @param element
 * @return {boolean}
 */
const filterWrapper = (description, element) => {
  let match;
  if (description.comparator === 'equals') {
    match = element[`${description.key}`] === description.value;
  } else if (description.comparator === 'includes') {
    match = description.value.includes(element[`${description.key}`]);
  } else {
    match = false;
  }
  return match;
};

module.exports = { filterWrapper };
