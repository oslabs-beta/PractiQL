function autoQuery(autoQueryChain) {
  // Uses autoQueryChain array to generate a query for input instance. Returns a string.
  if (!Array.isArray(autoQueryChain)) {
    console.log(new Error('Must pass an array to autoQuery'));
    return '';
  }
  let spaceCount = 2;
  const query = autoQueryChain.reduce((acc, el, index) => {
    let spaces = ' '.repeat(spaceCount);
    acc += `{
${spaces}${el}`;

    if (index === autoQueryChain.length - 1) {
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

module.exports = autoQuery;
