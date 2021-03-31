import React from 'react';
import Tree from 'react-d3-tree';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.

// const orgChart = {
//   name: 'Query',
//   children: [
//     {
//       name: 'Continent',
//       attributes: {
//        args: '(code: ID!)',
//        type: 'GraphQLObjectType',
//       },
//       children: [
//         {
//           name: 'code',
//           attributes: {
//             Type: 'GraphQLScalarType',
//             name: 'ID',
//             description: `The 'ID' scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as "4") or integer (such as 4) input value will be accepted as an ID.`
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

export default function OrgChartTree(props) {
  const { data } = props
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '50em', height: '50em' }}>
      <Tree data={data} orientation={'vertical'} />
    </div>
  );
}