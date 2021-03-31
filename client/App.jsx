import React, { useState, useEffect } from 'react';
import { getIntrospectionQuery, buildClientSchema, parse, buildASTSchema, buildSchema, printSchema} from 'graphql';
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
import 'codemirror-graphql/results/mode'
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
=============================================
query myquery {
	continents {
    name
  },
	continents {
    code
  }
}


query myquery {
continents_name : continents {
    name
  },
continents_code : continents {
    code
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
// ===============================================

query {
continents {
    name
  }
}
  
query {
continents {
    code
  }
}

// ===============================================

{
  __type(name: "continents") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  } 
}
*/

  const outputs = [];
  if(results) {
    for (let i = 0; i < querySubjects.length; i++){
    outputs.push(<Output key={i} id={i} language='javascript' value={results[querySubjects[i]]} theme={myTheme}/>)
    }
  }
  
  useEffect(() => {
    
    // 'https://countries.trevorblades.com/' 'https://graphql-pokemon2.vercel.app'
    fetch('https://api.spacex.land/graphql/', {
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
        console.log(buildClientSchema(schemaJSON.data));
      });
  }, []);

  useEffect(() => {
    if(schema){
      // const validSchema = buildSchema(printSchema(schema));
      // const allTypes = validSchema.getTypeMap();
      // const allTypesAst = Object.keys(allTypes).map(key => allTypes[key].astNode);
      // console.log(allTypesAst);
      // console.log(schema._typeMap);
      console.log(createTree(schema));
      setTreeObj(createTree(schema));
    }
  }, [schema])

  return (
    <div className="main-container">
      <div className='content-wrap'>
        <div className='top-bar-wrap'>
          <TopBar input={input} selection={selection} setResults={setResults} setQuerySubjects={setQuerySubjects} />
        </div>
          <div className="io-container">

            <Input
              theme={myTheme}
              value={input}
              onChange={setInput}
              selection={selection}
              onSelectionChange={setSelection}
              schema={schema}
            />
            <div className="output-container-outer output-container-outer--nord">
              {/* {outputs} */}
            <Output language='javascript' results={results ? results : undefined} numOfQueries={querySubjects.length} theme={myTheme}/>
            </div>

            <div className='outter-tree-wrap'>
              <div className='inner-tree-wrap'>
                <Tree tree={treeObj}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}