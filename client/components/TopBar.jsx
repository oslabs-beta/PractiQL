import React, { useState } from 'react';

//  https://countries.trevorblades.com/
export default function TopBar(props) {
  const { endpoint, input, selection, setResults, setQuerySubjects } = props;

  const handleClick = () => {
    const sel = selection ? selection.trim() : input.trim();
    const arrItems = matchRecursiveRegExp(sel, '{', '}');

    let querySubjects = [];
    let myQuery = 'query myquery {\r\n';

    console.log(111, arrItems);
    for (let i = 0; i < arrItems.length; i++) {
      const x = arrItems[i];
      // IS THIS A MERGED QUERY?
      if (x.includes(',')) {
        const items = x.split(',');

        for (let i = 0; i < items.length; i++) {
          // DOES THIS item HAVE AN ALIAS?
          if (items[i].includes(':')) {
            querySubjects.push(
              items[i].substring(0, items[i].indexOf(':')).trim()
            );

            myQuery += items[i] + (i < items.length - 1 ? ',\r\n' : '\r\n');
          } else {
            // ADD ALIAS TO RETURN MULTIPLE RESULTSETS
            const alias =
              items[i].substring(0, items[i].indexOf('{')).trim() +
              '_' +
              i.toString();
            querySubjects.push(alias);

            myQuery +=
              alias +
              ' : ' +
              items[i] +
              (i < items.length - 1 ? ',\r\n' : '\r\n');
          }
        }
      } else {
        // DOES THIS item HAVE AN ALIAS?
        if (!x.trimStart().startsWith('__') && x.includes(':')) {
          querySubjects.push(x.substring(0, x.indexOf(':')).trim());
        } else {
          let alias;
          const query = x.substring(0, x.indexOf('{')).trim();
          const repeat = querySubjects.includes(query);
          if (repeat) {
            // CREATE AN ALIAS
            alias = query + '_' + i.toString();
          }

          querySubjects.push(repeat ? alias : query);
          myQuery +=
            (repeat ? alias + ' : ' : '') +
            arrItems[i].trim() +
            (i < arrItems.length - 1 ? ',\r\n' : '\r\n');
        }
      }
    }

    myQuery += '}';
    console.log('TopBar.jsx: fetching to ' + endpoint);
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: myQuery,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(222, myQuery);
        console.log(333, data.data);
        console.log(444, querySubjects);

        if (data.errors) {
          setResults(data.errors);
          return;
        }

        // SET STATE - results
        setResults(data.data);
        setQuerySubjects(querySubjects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function matchRecursiveRegExp(str, left, right) {
    const x = new RegExp(left + '|' + right, 'g');
    const l = new RegExp(left);
    let a = [];
    let t, s, m;

    t = 0;

    while ((m = x.exec(str))) {
      if (l.test(m[0])) {
        if (!t++) {
          s = x.lastIndex;
        }
      } else if (t) {
        if (!--t) {
          a.push(str.slice(s, m.index));
        }
      }
    }
    return a;
  }

  function handleBtnClick() {
    // passes value of input to props.handleBtnClick
    const inputValue = document.getElementById('endpoint-input').value;
    props.handleBtnClick(inputValue);

    let count = 6;
    let toggle = false;
    const color = inputValue ? '#a9d0c6' : 'red';

    const intervalID = setInterval(() => {
      const endpointIcon = document.getElementById('endpoint-input-icon');
      console.log('interval');
      console.log(count);
      if (!toggle) endpointIcon.style.color = color;
      else endpointIcon.style.color = 'gray';
      toggle = !toggle;
      count--;
      if (count === 0) clearInterval(intervalID);
    }, 175);
  }

  // Sets keyboard shortcut for sending queries
  if (props.editor !== '') {
    const editor = props.editor;
    const keyMap = {
      'Ctrl-Enter': handleClick,
    };
    editor.addKeyMap(keyMap);
  }

  // Sets enter shortcut for endpoint input
  function handleChange(e) {
    if (e.charCode === 13) handleBtnClick();
  }
  return (
    <div id="top-bar" className="top-bar top-bar--nord">
      <span className="logo logo--nord">PractiQL</span>
      <button className="send-btn send-btn--nord" onClick={handleClick}>
        Send
      </button>
      <div className="endpoint-input-wrapper">
        <div
          onClick={handleBtnClick}
          id="endpoint-input-icon"
          className="endpoint-input-icon"
        >
          ↻
        </div>
        <input
          onKeyPress={handleChange}
          id="endpoint-input"
          className="endpoint-input"
          type="input"
          placeholder="Enter new GraphQL endpoint here..."
        ></input>
      </div>
    </div>
  );
}
