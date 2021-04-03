import React, {useState} from 'react';
import {Treebeard} from 'react-treebeard';

export default function TreeExample(props) {
  const { tree } = props
  const [cursor, setCursor] = useState(false);
  const [data, setData] = useState(tree);
    
    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))
    }
    
    return (
       <Treebeard data={tree} onToggle={onToggle}/>
    )
}
