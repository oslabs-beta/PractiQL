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
    padding: '0.5rem 0',
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
    // If current input is empty, return query, else return query one line under current input
    const newInput = input === '' ? query : input + '\n' + query;
    setInput(newInput);
  };

  // Constructs new tree diagram and opens side bar
  const handleSchemaRequest = () => {
    const widthToSet = sideBarWidth.width === '0rem' ? '18rem' : '0rem';
    const paddingToSet =
      sideBarWidth.padding === '0.5rem 0' ? '0.5rem' : '0.5rem 0';
    setSideBarWidth({ width: widthToSet, padding: paddingToSet });
    setTreeObj(createTree(schema));
  };

  // Close sidebar
  const handleCloseSideBar = () => {
    setSideBarWidth({ width: '0rem', padding: '0.5rem 0' });
    setTreeObj({});
    // closes bottom bar
    const bottomBar = document.getElementById('bottom-bar');
    bottomBar.style.height = '0';
    bottomBar.style.padding = '1rem 0.75rem 0 0.75rem';
  };

  // Sets new editor for keyboard shortcuts
  const setNewEditor = (newEditor) => {
    setEditor(newEditor);
  };

  // Expands bottom bar when mouse enters
  const handleBottomBarExpand = () => {
    const bottomBar = document.getElementById('bottom-bar');
    bottomBar.style.removeProperty = 'height';
    bottomBar.style.padding = '1rem 0.75rem 2rem 0.75rem';
  };

  // Collapses bottom bar when mouse leaves and if side bar is not open
  const handleBottomBarCollapse = () => {
    // if sidebar is open, bottom bar stays expanded
    if (sideBarWidth.width !== '0rem') return;
    const bottomBar = document.getElementById('bottom-bar');
    bottomBar.style.height = '0';
    bottomBar.style.padding = '1rem 0.75rem 0 0.75rem';
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
            <div
              id={'bottom-bar'}
              onMouseEnter={handleBottomBarExpand}
              onMouseLeave={handleBottomBarCollapse}
              className={'bottom-bar'}
            >
              <div className="bottom-bar-toggle-icon-wrapper">
                <span className="bottom-bar-toggle-icon">🜉</span>
              </div>
              <span
                onClick={handleSchemaRequest}
                className="bottom-bar-options bottom-bar-schema"
              >
                Schema
              </span>
              <span className="bottom-bar-options bottom-bar-docs bottom-bar-unavailable">
                Docs
              </span>
              <span className="bottom-bar-options bottom-bar-metrics bottom-bar-unavailable">
                Metrics
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
            <div className="sidebar-schema">Schema</div>
            <div className="inner-tree-wrap">
              <Tree
                handleAutoQuery={handleAutoQuery}
                // handleQueryCacheAdd={handleQueryCacheAdd}
                // handleQueryCacheRemove={handleQueryCacheRemove}
                tree={treeObj}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
