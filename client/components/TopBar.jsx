import React from 'react';

export default function TopBar(props) {
  const { input, selection, setResults, setQuerySubjects } = props;

  const handleClick = () => {
    const sel = selection ? selection.trim() : input.trim();
    const arrItems = matchRecursiveRegExp(sel, '{', '}');

    let querySubjects = [];
    let myQuery = 'query myquery {\r\n';

    for (let i = 0; i < arrItems.length; i++){
      myQuery += arrItems[i].trim() + (i < arrItems.length - 1 ? ',\r\n' : '\r\n');
    
      const x = arrItems[i].substring(0, arrItems[i].indexOf('{')).trim();
      querySubjects.push(x);

//console.log(querySubjects)

      console.log(arrItems[i]);
    }
    
    myQuery += '}';

    fetch('https://countries.trevorblades.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: myQuery
      })
    })
    .then(res => res.json())
    .then(data => {

// console.log(myQuery);
// console.log(data.data)
      
      // SET STATE - results
      setResults(data.data)
      setQuerySubjects(querySubjects)
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(myQuery);
        //console.log(data.errors)
        if (data.errors) {
          data.errors[0].custom = 'my test message';
          console.log(data.errors);
          console.log(data.errors.message);
          setResults(data.errors);
          return;
        }

        // SET STATE - results
        setResults([data.data]);
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

  return (
    <div className="top-bar top-bar--nord">
      <span className="logo logo--nord">PractiQL</span>
      <button className="send-btn send-btn--nord" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}
