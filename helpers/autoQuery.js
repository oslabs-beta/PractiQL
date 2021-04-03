export default function autoQuery(autoQueryChain) {
  let spaceCount = 2;
  const query = autoQueryChain.reduce((acc, el, index) => {
    console.log(spaceCount);
    let spaces = ' '.repeat(spaceCount);
    acc += `{
${spaces}${el}`;

    if (index === autoQueryChain.length - 1) {
      // const closingBrackets = '}'.repeat(index + 1);
      for (let i = 0; i <= index; i++) {
        spaces = ' '.repeat(spaceCount - 2);
        acc += `
${spaces}}`;
        spaceCount -= 2;
      }
    }

    spaceCount += 2;
    return acc;
  }, '');
  return query;
}
