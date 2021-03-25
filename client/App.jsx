import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import TopBar from './components/TopBar';
import Input from './components/Input';

const resultsObject = {
  persons: {
    person1: {
      name: 'john',
      age: 23,
    },
    person2: {
      name: 'mary',
      age: 28,
    },
    person3: {
      name: 'alex',
      age: 32,
    },
  },
};

const resultsObjectB = {
  persons: {
    person1: {
      name: 'daniel',
      age: 23,
    },
  },
};

const resultsObjectC = {
  persons: {
    person1: {
      name: 'mary',
      age: 28,
    },
    person2: {
      name: 'jackie',
      age: 21,
    },
    person3: {
      name: 'chris',
      age: 38,
    },
    person4: {
      name: 'charlie',
      age: 4000,
    },
    person5: {
      name: 'larry',
      age: 220,
    },
    person6: {
      name: 'mark',
      age: 25,
    },
    person7: {
      name: 'lee',
      age: 28,
    },
    person8: {
      name: 'peter',
      age: 32,
    },
  },
};

export default function App() {
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState('');

  return (
    <div className="main-container">
      <TopBar input={input} selection={selection} />
      <div className="content-container">
        <Input
          value={input}
          onChange={setInput}
          selection={selection}
          onSelectionChange={setSelection}
        />
        <div className="query-results">
          <Editor
            id="query1"
            language="javascript"
            displayName="Query Results"
            value={resultsObject}
          />
          <Editor
            id="query2"
            language="javascript"
            displayName="Query Results"
            value={resultsObjectB}
          />
          <Editor
            id="query3"
            language="javascript"
            displayName="Query Results"
            value={resultsObjectC}
          />
        </div>
      </div>
    </div>
  );
}
