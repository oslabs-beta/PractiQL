export default function autoQuery(autoQueryChain) {
  const query = autoQueryChain.reduce((acc, el, index) => {
    acc += '{' + el;
    if (index === autoQueryChain.length - 1) {
      const closingBrackets = '}'.repeat(index + 1);
      acc += closingBrackets;
    }
    return acc;
  }, '');
  console.log(query);
  return query;
}
