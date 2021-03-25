import React from 'react'

export default function TopBar(props) {
  const { input, selection, setResults } = props;

  const handleClick = () => {
    const sel = selection ? selection.trim() : input.trim();
    const arrItems = matchRecursiveRegExp (sel, '{', '}');

    let querySubjects = [];
    let myQuery = 'query myquery {\r\n';
  
    for (let i = 0; i < arrItems.length; i++){

      myQuery += arrItems[i].trim() + (i < arrItems.length - 1 ? ',\r\n' : '\r\n');
    
console.log(arrItems[i])

    }
    myQuery += '}';

    fetch('https://countries.trevorblades.com', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
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
    })
  }

  function matchRecursiveRegExp (str, left, right) {
    const x = new RegExp(left + "|" + right, "g")
    const l = new RegExp(left)
    let a = []
    let t, s, m

    t = 0;
    
    while (m = x.exec(str)) {

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
    <div className='top-bar'>
      <button className='run queries' onClick={handleClick}>Run</button>
    </div>
  )
}
