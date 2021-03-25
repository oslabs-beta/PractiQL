import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function Editor(props) {
  const { displayName, language, value, onChange } = props;

  return (
    <>
      <ControlledEditor
        value={JSON.stringify(value, null, 2)}
        className="code-mirror-wrapper"
        options={{
          mode: language,
          lineNumbers: true,
          readOnly: true,
          scrollbarStyle: 'overlay',
        }}
      />
    </>
  );
}
