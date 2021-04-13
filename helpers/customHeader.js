import React, { useState } from 'react';

const customHeader = (props) => {
  const [nodeStyle, setNodeStyle] = useState({ base: props.style.base });
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState('absolute')

  let argString = ''
  const args = props.node.attributes ? Object.entries(props.node.attributes) : '';
  if(typeof args === 'object') {
    args.forEach(arg => {
      if(arg[0] === 'description') argString = arg[1];
      else argString += `(${arg[0]} : ${arg[1]})`;
    })
  }

  const onMouseOver = node => {
    if (node) {
      setNodeStyle(() => ({
        base: { ...props.style.base, ...{ color: "#a8cfc5" } }
      }));
      // setHover(true);
      Object.keys(node.attributes).length === 0 ? setHover(false) : setHover(true);
      if(node.attributes.description) setPosition('relative');
    }
  };

  const onMouseLeave = node => {
    if (node) {
      setNodeStyle(() => ({ base: props.style.base }));
      setHover(false);
    }
  };

  return (
    <div style={props.style.base}>
      <div style={nodeStyle.base} onMouseOver={() => onMouseOver(props.node)} onMouseLeave={() => onMouseLeave(props.node)}>
        {`${props.node.name} `}
      </div>
    </div>
  )
}

export default customHeader;