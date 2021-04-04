import React, { useState, useEffect } from 'react';
import {
  getIntrospectionQuery,
  buildClientSchema,
  parse,
  buildASTSchema,
  buildSchema,
  printSchema,
} from 'graphql';
import Output from './components/Output';
import TopBar from './components/TopBar';
import Input from './components/Input';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/nord.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror-graphql/results/mode';
import Tree from './components/Tree.jsx';
import createTree from '../helpers/createTree.js';

export default function App(props) {
  const { theme, endpoint } = props;
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState('');
  const [myTheme, setMyTheme] = useState(theme);
  const [results, setResults] = useState(false);
  const [querySubjects, setQuerySubjects] = useState([]);
  const [schema, setSchema] = useState('');
  const [treeObj, setTreeObj] = useState({});
  const [stateEndpoint, setStateEndpoint] = useState(endpoint);
  const [sideBarWidth, setSideBarWidth] = useState({
    width: '0rem',
  });

  // Sends introspection query to endpoint and sets results as schema
  useEffect(() => {
    console.log('App.jsx: useEffect invoked');
    fetch(stateEndpoint, {
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
        setSchema(buildClientSchema(schemaJSON.data));
      });
  }, [stateEndpoint]);

  // Uses schema to build tree
  useEffect(() => {
    if (schema) {
      // const validSchema = buildSchema(printSchema(schema));
      // const allTypes = validSchema.getTypeMap();
      // const allTypesAst = Object.keys(allTypes).map(key => allTypes[key].astNode);
      // console.log(allTypesAst);
      // console.log(schema._typeMap);
      // console.log(createTree(schema));
      console.log(JSON.stringify(schema));
      console.log(schema);
      setTreeObj(createTree(schema));
      console.log(treeObj);
      for (let key in treeObj) {
        console.log(key);
      }
    }
  }, [schema]);

  // Sets new endpoints
  const handleBtnClick = (newEndpoint) => {
    // Sets new endpoint
    setStateEndpoint(newEndpoint);
    setQuerySubjects([]);
  };

  const handleAutoQuery = (query) => {
    setInput(query);
  };

  const handleSchemaRequest = () => {
    console.log('App.jsx: handleSchemaRequest detected');
    setSideBarWidth({ width: '18rem' });
    setTreeObj(createTree(schema));
  };

  return (
    <div className="main-container">
      <div className="content-wrap">
        <div className="top-bar-wrap">
          <TopBar
            handleBtnClick={handleBtnClick}
            endpoint={stateEndpoint}
            input={input}
            selection={selection}
            setResults={setResults}
            setQuerySubjects={setQuerySubjects}
          />
        </div>
        <div className="io-container">
          <div className="input-container-wrapper">
            <Input
              theme={myTheme}
              value={input}
              onChange={setInput}
              selection={selection}
              onSelectionChange={setSelection}
              schema={schema}
            />
            <div className={'bottom-bar'}>
              <span onClick={handleSchemaRequest} className="bottom-bar-schema">
                Schema
              </span>
            </div>
          </div>

          <div className="output-container-outer output-container-outer--nord">
            <Output
              language="javascript"
              results={results ? results : undefined}
              numOfQueries={querySubjects.length}
              theme={myTheme}
            />
          </div>

          <div style={sideBarWidth} className="outter-tree-wrap">
            <div className="inner-tree-wrap">
              <Tree handleAutoQuery={handleAutoQuery} tree={treeObj} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
