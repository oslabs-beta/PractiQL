import React, { useState } from 'react';
import { Treebeard } from 'react-treebeard';
import autoQuery from '../../helpers/autoQuery';

export default function TreeExample(props) {
  const { tree } = props;
  const [cursor, setCursor] = useState(false);
  const [data, setData] = useState(tree);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }

    // Checks if clicked node in tree diagram is a scalar value.
    if (node.scalar) {
      // If true, generates query for input instance.
      node.added = !node.added;
      if (node.added) {
        console.log('Tree.jsx: adding node');
        const queryToAdd = autoQuery(node.autoQueryChain);
        // add queryToAdd to cache under node.id
        props.handleQueryCacheAdd(node.id, queryToAdd);
      } else {
        console.log('Tree.jsx: removing node');
        props.handleQueryCacheRemove(node.id);
      }
    }

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));
  };

  if (tree.error)
    return (
      <>
        <span className="error-message">{tree.error}</span>
      </>
    );
  else return <Treebeard data={tree} onToggle={onToggle} />;
}
