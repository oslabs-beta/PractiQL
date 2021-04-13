import React from 'react';

  const customToggle = (props) => {
    return (
      <div style={{"display": "inline-block", "verticalAlign": "middle", "marginRight" : '5px'}}>
        <svg width="10" height="10" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" fill="#a8cfc5"/></svg>
      </div>
    )
  }

  export default customToggle;