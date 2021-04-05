const createTree = require('../helpers/createTree');

describe('createTree...', () => {
  test('...returns an object', () => {
    expect(createTree({})).toBe({});
  });
});
