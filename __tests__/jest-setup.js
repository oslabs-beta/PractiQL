const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// module.exports = async () => {
//   global.testServer = await require('../server/server');
// };
