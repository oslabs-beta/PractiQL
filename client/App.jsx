import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Input from './components/Input';

export default function App() {
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState('');

  return (
    <div className='main-container'>
      <TopBar input={input} selection={selection}/>
      <div className='content-container'>
        <Input value={input} onChange={setInput} selection={selection} onSelectionChange={setSelection}/>
        <Input value={input} onChange={setInput} />
      </div>
    </div>
  );
}
