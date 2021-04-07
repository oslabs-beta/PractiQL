function validateObject(value) {
  // validates value is object. To be used with createTree.js and any other function needing an object
  return (
    !Array.isArray(value) &&
    !(value instanceof Map) &&
    !(value instanceof Set) &&
    value !== null &&
    typeof value === 'object'
  );
}

module.exports = validateObject;
