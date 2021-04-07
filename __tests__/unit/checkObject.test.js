const validateObject = require('../../helpers/validateObject');

test('validateObject() returns error if array is passed.', () => {
  expect(validateObject([])).toBeFalsy();
});
test('validateObject() returns error if number is passed.', () => {
  expect(validateObject(7)).toBeFalsy();
});
test('validateObject() returns error if string is passed.', () => {
  expect(validateObject('test')).toBeFalsy();
});
test('validateObject() returns error if map is passed.', () => {
  expect(validateObject(new Map())).toBeFalsy();
});
test('validateObject() returns error if set is passed.', () => {
  expect(validateObject(new Set())).toBeFalsy();
});
test('validateObject() returns true if empty object is passed.', () => {
  expect(validateObject({})).toBeTruthy();
});
test('validateObject() returns true if object is passed.', () => {
  expect(validateObject({ a: 1, b: 2, c: 3 })).toBeTruthy();
});
