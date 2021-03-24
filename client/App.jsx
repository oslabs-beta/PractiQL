import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Input from './components/Input';

export default function App() {
  const [text, setText] = useState('');

  return (
    <div className='main-container'>
      <TopBar />
      <div className='content-container'>
        <Input value={text} onChange={setText} />
        <Input value={text} onChange={setText} />
        {/* <textarea></textarea>
        <textarea></textarea> */}
      </div>
    </div>
  );
}
