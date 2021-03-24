import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Input from './components/Input';

export default function App() {
  const [input, setInput] = useState('');

  return (
    <div className='main-container'>
      <TopBar />
      <div className='content-container'>
        <Input value={input} onChange={setInput} />
        <Input value={input} onChange={setInput} />
      </div>
    </div>
  );
}
