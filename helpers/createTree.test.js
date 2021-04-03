const createTree = require('./createTree')
const schema = require('./introspectionSchema.json')
import { buildClientSchema } from 'graphql';


test('expecting a properly created tree from endpoint (using country dummy data)', () => {
    const testSchema = buildClientSchema(schema);
    expect(testSchema).toEqual();
})