export default function createTree(schema) {
  // const cache = {};
  const myTree = {
    name: schema._queryType.name,
    children: [],
  };

  const mainFields = Object.values(schema._queryType._fields);
  // console.log(mainFields);

  mainFields.forEach((field, index) => {
    const typeDef = {};
    const attributes = {};
    const children = [];

    for (let i = 0; i < field.args.length; i++) {
      attributes[field.args[i].name] = findType(field.args[i].type).name;
    }

    const autoQuery =
      !attributes.filter && Object.keys(attributes).length !== 0
        ? field.name +
          '(' +
          Object.keys(attributes)[0] +
          `:"INSERT_${attributes[Object.keys(attributes)[0]]}_HERE"` +
          ')'
        : field.name;

    console.log('createTree.js: ' + autoQuery);

    const innerChildren = Object.values(findSubFields(field.type));

    for (let i = 0; i < innerChildren.length; i++) {
      children.push(getChildren(innerChildren[i], autoQuery));
    }

    typeDef.name = field.name;
    typeDef.autoQuery = [autoQuery];
    typeDef.attributes = attributes;
    typeDef.children = children;

    myTree.children.push(typeDef);
  });

  // console.log('TREE: ', myTree)
  function findType(type) {
    if (type.name) return { name: type.name, description: type.description };
    // console.log(type.ofType);
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
      autoQuery: [parentName, child.name],
      scalar: true,
      attributes: { description: innerChild.description },
    });

    typeDef.name = child.name;
    typeDef.autoQuery = [parentName, child.name];
    typeDef.attributes = attributes;
    typeDef.children = children;

    // console.log(typeDef.name, ' : ', innerChildren);

    // cache[child.name] = typeDef
    return typeDef;
  }
  console.log(myTree);
  return myTree;
}
