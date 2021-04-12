import React, { useState } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import autoQuery from '../../helpers/autoQuery';



export default function TreeExample(props) {
  const { tree } = props;
  const [cursor, setCursor] = useState(false);
  const [data, setData] = useState(tree);


  const customHeader = (props) => {
    let argString = ''
    const args = props.node.attributes ? Object.entries(props.node.attributes) : '';
    if(typeof args === 'object') {
      args.forEach(arg => {
        argString += `(${arg[0]} : ${arg[1]})`;
      })
    }
    return (
      <div style={{"display": "inline-block", "verticalAlign": "middle",}}>
        {`${props.node.name} ${argString}`}
      </div>
    )
  }

  const customToggle = (props) => {
    return (
      <div style={{"display": "inline-block", "verticalAlign": "middle", "marginRight" : '5px'}}>
        <svg width="10" height="10" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" fill="#a8cfc5"/></svg>
      </div>
    )
  }

  decorators.Header = customHeader;
  decorators.Toggle = customToggle;

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
  else return <Treebeard data={tree} onToggle={onToggle} decorators={decorators}/>;
}
