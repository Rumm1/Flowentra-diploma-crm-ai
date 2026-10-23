// Design-time checks. These do not test a running API or database.
const assert = require('node:assert/strict');
const path = require('node:path');
const SwaggerParser = require('@apidevtools/swagger-parser');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

(async () => {
  const file = path.resolve(__dirname, '../api/openapi.yaml');
  const api = await SwaggerParser.validate(file);
  const operations = [];
  let examples = 0;
  const ajv = new Ajv({strict:false, allErrors:true});
  addFormats(ajv);
  ajv.addFormat('int64', {type:'number', validate:Number.isSafeInteger});
  ajv.addFormat('password', {type:'string', validate:() => true});
  const ids = new Set();
  for (const [route, item] of Object.entries(api.paths)) {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      const op = item[method];
      if (!op) continue;
      const label = `${method.toUpperCase()} ${route}`;
      assert(op.operationId && !ids.has(op.operationId), `Unique operationId: ${label}`);
      ids.add(op.operationId);
      assert(op.summary && op.description && op['x-roles'], `Documented operation: ${label}`);
      const security = op.security ?? api.security;
      assert(route === '/auth/login' ? security.length === 0 : security.some(s => 'bearerAuth' in s), `Authentication: ${label}`);
      if (method === 'patch') {
        assert(op.parameters.some(p => p.name === 'If-Match' && p.required), `Precondition: ${label}`);
        assert(op.responses['412'] && op.responses['428'], `Precondition errors: ${label}`);
      }
      if (method === 'post' && !route.startsWith('/auth/')) {
        assert(op.parameters.some(p => p.name === 'Idempotency-Key' && p.required), `Retry safety: ${label}`);
        assert(op.responses['201'] && op.responses['409'], `Create responses: ${label}`);
      }
      for (const [status, response] of Object.entries(op.responses)) {
        if (+status >= 400) assert(response.content?.['application/problem+json'], `Problem response: ${label} ${status}`);
        if (+status === 204) assert(!response.content, `No content for 204: ${label}`);
      }
      const mediaObjects = [op.requestBody, ...Object.values(op.responses)].filter(Boolean);
      for (const owner of mediaObjects) for (const media of Object.values(owner.content ?? {})) {
        if (media.example !== undefined) {
          const validate = ajv.compile(media.schema);
          assert(validate(media.example), `Example schema: ${label} ${JSON.stringify(validate.errors)}`);
          examples++;
        }
      }
      operations.push(label);
    }
  }
  for (const name of ['User','Client','Deal','Task','Appointment']) {
    const schema = api.components.schemas[name];
    assert(schema.properties.id && schema.properties.version, `${name} identity/version`);
    const page = api.components.schemas[name+'Page'];
    assert(page.properties.data && page.properties.next_cursor, `${name} pagination`);
  }
  assert(!JSON.stringify(api.components.schemas.User).includes('password'), 'No password in user response');
  for (const entity of ['clients','deals','tasks','appointments','users']) {
    assert(api.paths['/'+entity]?.get && api.paths['/'+entity]?.post, `${entity} collection operations`);
    assert(api.paths['/'+entity+'/{id}']?.get && api.paths['/'+entity+'/{id}']?.patch, `${entity} item operations`);
  }
  const invalidCases = [
    ['ClientCreate', {display_name:'Example', unexpected:true}],
    ['ClientCreate', {display_name:'Example', phone:'123'}],
    ['ClientUpdate', {}],
    ['DealUpdate', {amount:'-1.00'}],
    ['TaskUpdate', {owner_id:null}],
    ['AppointmentUpdate', {start_at:'tomorrow'}],
  ];
  for (const [name, value] of invalidCases) assert(!ajv.compile(api.components.schemas[name])(value), `${name} rejects invalid fixture`);
  console.log(`PASS: OpenAPI 3.0.3 schema/reference validation; ${Object.keys(api.paths).length} paths, ${operations.length} operations; ${examples} example occurrences (including reused error examples) validated; ${invalidCases.length} invalid fixtures rejected; authentication, retry, precondition, error, pagination, and response-shape checks.`);
})().catch(err => { console.error(err); process.exit(1); });
