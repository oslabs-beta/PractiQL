import CodeMirror, { overlayMode } from 'codemirror';
import React, { useState, useEffect, useCallback } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function Output(props) {
  const [editorToGrab, setEditor] = useState(null);
  const [value, setValue] = useState('');
  const {
    displayName,
    language,
    results,
    onChange,
    theme,
    numOfQueries,
  } = props;

  // {
  //   continents{
  //     name
  //   }
  // }

  // {
  //   languages{
  //     name
  //   }
  // }

  useEffect(() => {
    console.log('Output.jsx: useEffect invoked');
    if (editorToGrab) {
      console.log('Output.jsx: in if');
      // Create a Codemirror headless that means in the bg, and not attached to the DOM
      let count = 1;
      let lastLine = 0;
      for (let key in results) {
        const instance = new CodeMirror(document.getElementById('hidden'), {
          value: JSON.stringify(results[key], null, 2),
        });

        if (count === 1) {
          editorToGrab.foldCode(1);
        } else {
          editorToGrab.foldCode(lastLine + 1);
        }
        count++;
        lastLine += instance.lineCount();
        console.log(key + ' lastline: ' + lastLine);
      }
    }
    console.log('Output.jsx: end of useEffect');
  }, [results]);

  return (
    <>
      <ControlledEditor
        id={props.id}
        value={JSON.stringify(results, null, 2)}
        className="output-container-inner output-container-inner--nord"
        editorDidMount={(editor) => {
          setEditor(editor);
        }}
        on
        options={{
          mode: 'javascript',
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          readOnly: true,
          lineNumbers: true,
          theme: theme,
          scrollbarStyle: null,
        }}
      ></ControlledEditor>
    </>
  );
}
