import React, { useState, useEffect } from 'react';
import Output from './components/Output';
import TopBar from './components/TopBar';
import Input from './components/Input';
import { getIntrospectionQuery, buildClientSchema } from 'graphql';

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
  const [results, setResults] = useState([
    resultsObject,
    resultsObjectB,
    resultsObjectC,
    resultsObject,
    resultsObjectB,
    resultsObjectC,
    resultsObject,
    resultsObjectB,
    resultsObjectC,
  ]);
  const [mappedResults, setMappedResults] = useState([]);
  const [schema, setSchema] = useState('');

  useEffect(() => {
    // 'https://graphql-pokemon2.vercel.app'
    fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    })
      .then((res) => res.json())
      .then((schemaJSON) => {
        console.log(schemaJSON);
        setSchema(buildClientSchema(schemaJSON.data));
        console.log(buildClientSchema(schemaJSON.data));
      });
  }, []);

  useEffect(() => {
    // get results
    // iterate through results to create array of Editor components
    // Array of components becomes/changes mappedResults state
    // mappedResults state updates Editor components

    const map = results.map((result, index) => {
      const outputInstance = (
        <Output
          key={`outputKey${index}`}
          id={`output${index}`}
          language="graphql"
          value={result}
        />
      );
      return outputInstance;
    });

    setMappedResults(() => map);
  }, []);

  useEffect(() => {
    // get results
    // iterate through results to create array of Editor components
    // Array of components becomes/changes mappedResults state
    // mappedResults state updates Editor components

    const map = results.map((result, index) => {
      const outputInstance = (
        <Output
          key={`outputKey${index}`}
          id={`output${index}`}
          language="graphql"
          value={result}
        />
      );
      return outputInstance;
    });

    setMappedResults(() => map);
  }, [results]);

  return (
    <div className="main-container">
      <TopBar input={input} selection={selection} setResults={setResults} />

      <div className="io-container">
        <Input
          value={input}
          onChange={setInput}
          selection={selection}
          onSelectionChange={setSelection}
          schema={schema}
        />
        <div className="output-container-outer">{mappedResults}</div>
      </div>
    </div>
  );
}
