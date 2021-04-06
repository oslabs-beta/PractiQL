const autoQuery = require('../../helpers/autoQuery');

test('autoQuery() returns error if array is not passed.', () => {
  expect(autoQuery(7)).toEqual('');
});
test('autoQuery() returns string representing a query when an array is passed', () => {
  expect(autoQuery(['parent', 'child'])).toEqual(
    '{\n  parent{\n    child\n  }\n}'
  );
});
