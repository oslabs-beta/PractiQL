import React, { useState, useEffect } from 'react';
import { getIntrospectionQuery, buildClientSchema } from 'graphql';
import Output from './components/Output';
import TopBar from './components/TopBar';
import Input from './components/Input';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
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
  const [editor, setEditor] = useState('');
  const [input, setInput] = useState('');
  const [myTheme, setMyTheme] = useState(theme);
  const [querySubjects, setQuerySubjects] = useState([]);
  const [results, setResults] = useState(false);
  const [schema, setSchema] = useState('');
  const [selection, setSelection] = useState('');
  const [sideBarWidth, setSideBarWidth] = useState({
    width: '0rem',
  });
  const [stateEndpoint, setStateEndpoint] = useState(endpoint);
  const [treeObj, setTreeObj] = useState({});

  // Sends introspection query to endpoint and sets results as schema
  useEffect(() => {
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
      setTreeObj(createTree(schema));
    }
  }, [schema]);

  // Sets new endpoints
  const handleBtnClick = (newEndpoint) => {
    // Sets new endpoint
    setStateEndpoint(newEndpoint);
    setQuerySubjects([]);
    // if sidebar is open, closes sidebar and removes tree from state
    if (sideBarWidth.width !== '0rem') {
      handleCloseSideBar();
    }
  };

  // Generates autoQueries
  const handleAutoQuery = (query) => {
    setInput(query);
  };

  // Constructs new tree diagram
  const handleSchemaRequest = () => {
    const widthToSet = sideBarWidth.width === '0rem' ? '18rem' : '0rem';
    setSideBarWidth({ width: widthToSet });
    setTreeObj(createTree(schema));
  };

  // Close sidebar
  const handleCloseSideBar = () => {
    setSideBarWidth({ width: '0rem' });
    setTreeObj('');
  };

  // Sets new editor for keyboard shortcuts
  const setNewEditor = (newEditor) => {
    setEditor(newEditor);
  };

  return (
    <div className="main-container">
      <div className="content-wrap">
        <div className="top-bar-wrap">
          <TopBar
            editor={editor}
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
              setNewEditor={setNewEditor}
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

          <div style={sideBarWidth} className="outer-tree-wrap">
            <div className="close-tree-wrapper">
              <span onClick={handleCloseSideBar} className="close-tree-btn">
                X
              </span>
            </div>
            <div className="inner-tree-wrap">
              <Tree handleAutoQuery={handleAutoQuery} tree={treeObj} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
