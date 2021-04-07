const createTree = require('../../helpers/createTree');

test('createTree() returns custom error object when number is passed.', () => {
  expect(createTree(7)).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});
test('createTree() returns custom error object when string is passed.', () => {
  expect(createTree('string')).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});
test('createTree() returns custom error object when array is passed.', () => {
  expect(createTree([])).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});
test('createTree() returns custom error object when non-schema object is passed.', () => {
  expect(createTree({})).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});
test('createTree() returns custom error object when schema._queryType.name does not exist.', () => {
  expect(
    createTree({ _queryType: { testProperty: 'this is not a name' } })
  ).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});
test('createTree() returns custom error object when schema._queryType.name is not a string.', () => {
  expect(createTree({ _queryType: { name: 7 } })).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});
test('createTree() returns custom error object when schema._queryType.fields does not exist.', () => {
  expect(createTree({ _queryType: 'test' })).toStrictEqual({
    error: 'Sorry, something went wrong',
  });
});

test('createTree() returns tree object when schema object is passed.', () => {
  expect(
    createTree({
      _queryType: { name: 'Test Schema', _fields: {} },
    })
  ).toStrictEqual({
    name: 'Test Schema',
    children: [],
    toggled: true,
  });
});
