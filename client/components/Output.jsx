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

  useEffect(() => {
    // Returns results folded
    // How: copies the results into a headless CodeMirror instance. This headless instance is used to count lines and identify where to fold code
    // If only one query was sent, won't collapse code. Returns code expanded.
    if (results && Object.keys(results).length === 1) return;

    if (editorToGrab) {
      console.log('Output.jsx: in if');
      let count = 1;
      let lastLine = 0;
      for (let key in results) {
        let instance = new CodeMirror(document.createElement('div'), {
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
