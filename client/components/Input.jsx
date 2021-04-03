import React from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { ValidationContext, SDLValidationContext } from 'graphql';

export default function Input(props) {
  const {
    autoQuery,
    value,
    onChange,
    selection,
    onSelectionChange,
    schema,
    theme,
  } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  function handleSelection(sel) {
    if (onSelectionChange) {
      onSelectionChange(sel);
      console.log(selection);
    }
    // console.log(onSelectionChange);
  }

  function handlePress(editor, keyEvent) {
    if (!editor.state.completionActive && keyEvent.keyCode != 13) {
      editor.showHint({ completeSingle: false });
    }
  }

  return (
    <div className="input-container-outer">
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        onKeyPress={handlePress}
        className="input-container-inner"
        onCursor={(editor, data) => {
          handleSelection(editor.getSelection());
        }}
        editorDidMount={(editor) => {
          editor.display.wrapper.className =
            editor.display.wrapper.className + ' input-instance';
        }}
        options={{
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          matchBrackets: true,
          autoCloseBrackets: true,
          lineWrapping: true,
          indentUnit: 2,
          tabSize: 2,
          //currently is not linting need to look into it, might need options
          mode: 'graphql',
          lint: {
            schema: schema,
          },
          showHint: true,
          hintOptions: {
            schema: schema,
          },
          lineNumbers: true,
          theme: theme,
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
        }}
      />
    </div>
  );
}
