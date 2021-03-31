export default function createTree(schema) {
  const cache = {};
  const myTree = {
    name: schema._queryType.name,
    children: []
  }

  const mainFields = Object.values(schema._queryType._fields);
  console.log(mainFields);

  mainFields.forEach((field) => {
    const typeDef = {};
    const attributes = {};
    const children = [];

    for (let i = 0; i < field.args.length; i++) {
      attributes[field.args[i].name] = findType(field.args[i].type).name;
    }

    const innerChildren = Object.values(findSubFields(field.type));

    for (let i = 0; i < innerChildren.length; i++) {
      children.push(getChildren(innerChildren[i]));
    }

    typeDef.name = field.name;
    typeDef.attributes = attributes;
    typeDef.children = children;

    console.log(typeDef.name, ' : ', innerChildren);

    cache[field.name] = typeDef
    myTree.children.push(typeDef);
  });

  // console.log('TREE: ', myTree)
  function findType(type) {
    if (type.name) return {name: type.name, description: type.description};
    // console.log(type.ofType);
    return findType(type.ofType);
  }

  function findSubFields(type) {
    if (type.name) return type._fields;
    return findSubFields(type.ofType);
  }

  function getChildren(child) {
    if(cache[child.name]) {
      console.log(cache);
      return cache[child.name];
    }
    const typeDef = {};
    const attributes = {};
    const children = [];

    for(let i = 0; i < child.args.length; i++) {
      attributes[child.args[i].name] = findType(child.args[i].type).name;
    }

    // console.log(attributes);

    // const subFields = findSubFields(child.type);
    // if (subFields) {
    //   const innerChildren = Object.values(subFields);
    //   for (let i = 0; i < innerChildren.length; i++) {
    //     children.push(getChildren(innerChildren[i]));
    //   }
    // }

    const innerChild = findType(child.type);
    children.push({name: innerChild.name, attributes: {description: innerChild.description}});

    

    typeDef.name = child.name;
    typeDef.attributes = attributes;
    typeDef.children = children;


    // console.log(typeDef.name, ' : ', innerChildren);

    cache[child.name] = typeDef
    return typeDef;
  }

  return myTree
}