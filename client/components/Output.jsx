import React, { useState, useEffect } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';


export default function Output(props) {
  const [accordion, setAccordion] = useState({
    accordionValue: 'collapsed',
    editorToGrab: null,
    divWrapper: null,
    btnText: 'expand',
  });

  const { displayName, language, value, onChange, theme } = props;

  const handleAccordian = () => {
    console.log('Editor.jsx: handleAccordion');
    // Grabs full expanded height of editor instance
    const sizer = accordion.divWrapper.querySelector('.CodeMirror-sizer').style
      .minHeight;
    if (accordion.accordionValue === 'collapsed') {
      accordion.divWrapper.style.height = sizer;
      accordion.divWrapper.style.maxHeight = sizer;
      setAccordion((prev) => {
        return { ...prev, accordionValue: 'expanded', btnText: 'collapse' };
      });
    } else if (accordion.accordionValue === 'expanded') {
      accordion.divWrapper.style.maxHeight = '150px';
      accordion.divWrapper.style.height = '150px';
      setAccordion((prev) => {
        return { ...prev, accordionValue: 'collapsed', btnText: 'expand' };
      });
    }
    // CSS transition runs asynchronously. refresh async so it's invoked after css transition animation
    setTimeout(() => {
      accordion.editorToGrab.refresh();
    }, 100);
  };

  return (
    <>
      <button
        className={'widget-btn widget-btn--nord'}
        onClick={() => {
          handleAccordian();
        }}
      >
        {accordion.btnText}
      </button>
      <ControlledEditor
        id={props.id}
        value={JSON.stringify(value, null, 2)}
        className="output-container-inner output-container-inner--nord"
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
          mode: 'javascript',
          lineNumbers: false,
          readOnly: true,
          theme: theme,
          // scrollbarStyle: 'overlay',
        }}
      ></ControlledEditor>
    </>
  );
}
