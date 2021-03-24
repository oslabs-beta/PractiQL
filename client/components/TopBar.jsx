import React from 'react'

export default function TopBar(props) {
  const { input } = props;
  const handleClick = () => {
    console.log(input);
  }
  return (
    <div className='top-bar'>
      <button className='run queries' onClick={handleClick}>Run</button>
    </div>
  )
}
