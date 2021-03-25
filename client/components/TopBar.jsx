import React from 'react'

export default function TopBar(props) {
  const { input, selection } = props;

  const handleClick = () => {
    const sel = selection ? selection.trim() : input.trim();
    const arrItems = matchRecursiveRegExp (sel, '{', '}');

    let myQuery = 'query myquery {\r\n';
        for (let i = 0; i < arrItems.length; i++){
          myQuery += arrItems[i].trim() + (i < arrItems.length - 1 ? ',\r\n' : '\r\n');
        }
        myQuery += '}';

    console.log(myQuery);
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
