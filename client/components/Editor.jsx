import React, { useState, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function Editor(props) {
  const [accordion, setAccordion] = useState({
    accordionValue: 'collapsed',
    editorToGrab: null,
    divWrapper: null,
    btnText: 'expand',
  });

  const { displayName, language, value, onChange } = props;

  const handleAccordian = () => {
    console.log('Editor.jsx: handleAccordion');
    console.log(accordion);
    if (accordion.accordionValue === 'collapsed') {
      accordion.divWrapper.style.maxHeight = '100%';
      accordion.divWrapper.style.height = '100%';
      setAccordion((prev) => {
        return { ...prev, accordionValue: 'expanded', btnText: 'collapse' };
      });
    } else if (accordion.accordionValue === 'expanded') {
      accordion.divWrapper.style.maxHeight = '150px';
      accordion.divWrapper.style.height = '100px';
      setAccordion((prev) => {
        return { ...prev, accordionValue: 'collapsed', btnText: 'expand' };
      });
    }
    accordion.editorToGrab.refresh();
  };

  return (
    <>
      <button
        className={'widget-btn'}
        onClick={() => {
          handleAccordian();
        }}
      >
        {accordion.btnText}
      </button>
      <ControlledEditor
        id={props.id}
        value={JSON.stringify(value, null, 2)}
        className="code-mirror-wrapper"
        editorDidMount={(editor) => {
          setAccordion((prev) => {
            return {
              ...prev,
              editorToGrab: editor,
              divWrapper: editor.display.wrapper,
            };
          });
        }}
        options={{
          mode: language,
          lineNumbers: true,
          readOnly: true,
          scrollbarStyle: 'overlay',
        }}
      ></ControlledEditor>
    </>
  );
}
