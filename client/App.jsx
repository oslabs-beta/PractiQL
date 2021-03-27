import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import TopBar from './components/TopBar';
import Input from './components/Input';

export default function App() {
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState('');
  const [results, setResults] = useState('');
  const [querySubjects, setQuerySubjects] = useState('');

  const editors = [];
  for (let i = 0; i < querySubjects.length; i++){
    editors.push(<Editor key={i} id={i} language='javascript' value={results[querySubjects[i]]} />)
  }


/*
query {
  continents {
    name
  }
}

query {
  countries {
    name
  }
}

query {
  languages {
    name
  }
}
*/


  return (
    <div className="main-container">
      <TopBar input={input} selection={selection} setResults={setResults} setQuerySubjects={setQuerySubjects} />
      <div className="content-container">
        <Input
          value={input}
          onChange={setInput}
          selection={selection}
          onSelectionChange={setSelection}
        />
        <div className="query-results">

          {editors}

        </div>
      </div>
    </div>
  );
}
