function createTree(schema) {
  // createTree() takes a GraphQL schema object and creates a tree for a Treebeard component

  // creates custom error object and error message
  const errorObject = { error: 'Sorry, something went wrong' };
  const createTreeError = new Error('Schema not valid object');

  // Validates schema argument
  if (
    !(schema !== null && typeof schema === 'object') ||
    !schema._queryType ||
    !schema._queryType.name ||
    !(typeof schema._queryType.name !== 'String') ||
    !schema._queryType._fields
  ) {
    console.log(createTreeError);
    return errorObject;
  }

  const myTree = {
    name: schema._queryType.name,
    children: [],
    toggled: true,
  };

  const mainFields = Object.values(schema._queryType._fields);

  mainFields.forEach((field) => {
    const typeDef = {};
    const attributes = {};
    const children = [];

    for (let i = 0; i < field.args.length; i++) {
      attributes[field.args[i].name] = findType(field.args[i].type).name;
    }

    const innerChildren = Object.values(findSubFields(field.type));

    for (let i = 0; i < innerChildren.length; i++) {
      children.push(getChildren(innerChildren[i], field.name));
    }

    typeDef.name = field.name;
    typeDef.autoQueryChain = [field.name];
    typeDef.attributes = attributes;
    typeDef.children = children;

    myTree.children.push(typeDef);
  });

  function findType(type) {
    if (type.name) return { name: type.name, description: type.description };
    return findType(type.ofType);
  }

  function findSubFields(type) {
    if (type.name) return type._fields;
    return findSubFields(type.ofType);
  }

  function getChildren(child, parentName) {
    const typeDef = {};
    const attributes = {};
    const children = [];

    for (let i = 0; i < child.args.length; i++) {
      attributes[child.args[i].name] = findType(child.args[i].type).name;
    }

    const innerChild = findType(child.type);
    children.push({
      name: innerChild.name,
      autoQueryChain: [parentName, child.name],
      id: innerChild.name + parentName + child.name,
      added: false,
      scalar: true,
      attributes: { description: innerChild.description },
    });

    typeDef.name = child.name;
    typeDef.autoQueryChain = [parentName, child.name];
    typeDef.attributes = attributes;
    typeDef.children = children;

    return typeDef;
  }
  console.log(myTree);
  return myTree;
}

module.exports = createTree;
