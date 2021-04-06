const autoQuery = require('../helpers/autoQuery');

describe('autoQuery()...', () => {
  test('...returns error if array is not passed.', () => {
    expect(autoQuery(7)).toEqual('');
  });
  test('...returns string representing a query when an array is passed', () => {
    expect(autoQuery(['parent', 'child'])).toEqual(
      '{\n  parent{\n    child\n  }\n}'
    );
  });
});
