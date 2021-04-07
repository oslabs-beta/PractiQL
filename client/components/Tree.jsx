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
      const queryToAdd = autoQuery(node.autoQueryChain);
      props.handleAutoQuery(queryToAdd);
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
