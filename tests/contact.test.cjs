const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const { NextRequest, NextResponse } = require('next/server')

// Execute the actual TS source with isolated service adapters; never send mail or write a DB.
function harness({
  db = false,
  dbError = false,
  dbThrows = false,
  key = false,
  mailStatus = 200,
  mailThrows = false,
  mailResult = { id: 'mock-email' },
} = {}) {
  const sends = [],
    inserts = [],
    logs = [],
    cache = new Map()
  const supabase = {
    from(table) {
      assert.equal(table, 'inquiries')
      return {
        insert(row) {
          inserts.push(row)
          return {
            async abortSignal() {
              if (dbThrows) throw Error('database network error')
              return {
                error: dbError
                  ? { code: 'MOCK', message: 'private provider error' }
                  : null,
              }
            },
          }
        },
      }
    },
  }
  function load(file) {
    if (cache.has(file)) return cache.get(file)
    const output = ts.transpileModule(
      fs.readFileSync(path.join(__dirname, '..', file), 'utf8'),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }
    ).outputText
    const exports = {}
    cache.set(file, exports)
    vm.runInNewContext(
      output,
      {
        exports,
        AbortSignal,
        TextEncoder,
        process: {
          env: key
            ? {
                RESEND_API_KEY: 'test-only',
                CONTACT_EMAIL: 'must-not-override@example.com',
              }
            : {},
        },
        console: {
          error: (...args) => logs.push(args),
          log: (...args) => logs.push(args),
        },
        fetch: async (url, opts) => {
          assert.equal(url, 'https://api.resend.com/emails')
          assert.ok(opts.signal)
          sends.push(JSON.parse(opts.body))
          if (mailThrows) throw Error('mail network error')
          return new Response(JSON.stringify(mailResult), {
            status: mailStatus,
          })
        },
        require: (name) =>
          name === 'next/server'
            ? { NextResponse }
            : name === '@/lib/supabase'
              ? { supabase, isSupabaseConfigured: db }
              : name.startsWith('@/')
                ? load(`${name.slice(2)}.ts`)
                : require(name),
      },
      { filename: file }
    )
    return exports
  }
  const route = load('app/api/contact/route.ts')
  return { ...route, schema: load('lib/contact.ts'), sends, inserts, logs }
}
const legacy = {
  name: 'Test visitor',
  email: 'visitor@example.com',
  message: 'Test inquiry',
  type: 'inquiry',
}
const submit = (h, body = legacy, headers = {}) =>
  h.POST(
    new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  )
function businessInput(config) {
  return {
    ...legacy,
    business: config.value,
    topic: config.topics[0].value,
    locale: 'zh',
    company: 'Test company',
    details: Object.fromEntries(
      config.fields.map((f) => [f.key, f.options?.[0].value ?? 'Test detail'])
    ),
  }
}

test('missing delivery configuration cannot return success', async () => {
  const h = harness(),
    res = await submit(h)
  assert.equal(res.status, 503)
  assert.equal((await res.json()).success, false)
  assert.equal(h.sends.length, 0)
})

test('email acceptance uses company inbox, visitor Reply-To and escaped HTML', async () => {
  const h = harness({ key: true })
  const res = await submit(h, {
    ...legacy,
    name: '<b>Visitor</b>\r\nInjected',
    message: '<script>alert(1)</script>\nSecond line',
  })
  assert.equal(res.status, 201)
  assert.deepEqual(await res.json(), {
    success: true,
    delivery: 'email_accepted',
  })
  assert.equal(h.sends[0].to, 'info@kanae-tokyo.com')
  assert.equal(h.sends[0].reply_to, legacy.email)
  assert.equal(h.sends[0].from, 'no-reply@kanae-tokyo.com')
  assert.ok(!h.sends[0].subject.includes('\n'))
  assert.ok(!h.sends[0].html.includes('<script>'))
  assert.ok(h.sends[0].html.includes('&lt;script&gt;'))
  assert.ok(h.sends[0].text.includes('<script>'))
  assert.ok(h.sends[0].text.includes('(JST)'))
})

for (const mailStatus of [401, 403, 429, 500])
  test(`provider HTTP ${mailStatus} without DB returns failure`, async () => {
    const h = harness({ key: true, mailStatus })
    assert.equal((await submit(h)).status, 503)
  })
for (const options of [
  { mailThrows: true },
  { mailResult: {} },
  { mailResult: null },
])
  test(`unconfirmed email is not success: ${JSON.stringify(options)}`, async () => {
    assert.equal((await submit(harness({ key: true, ...options }))).status, 503)
  })
for (const options of [
  {},
  { key: true, mailStatus: 403 },
  { key: true, mailThrows: true },
])
  test(`DB-only receipt is explicit: ${JSON.stringify(options)}`, async () => {
    const h = harness({ db: true, ...options }),
      res = await submit(h)
    assert.equal(res.status, 202)
    assert.deepEqual(await res.json(), {
      success: true,
      delivery: 'stored_only',
    })
    assert.equal(h.inserts.length, 1)
  })
for (const options of [{ dbError: true }, { dbThrows: true }])
  test(`email fallback survives database failure: ${JSON.stringify(options)}`, async () => {
    const h = harness({ db: true, key: true, ...options })
    assert.equal((await submit(h)).status, 201)
  })
test('both channels failing returns 503 without leaking provider errors', async () => {
  const h = harness({ db: true, dbError: true, key: true, mailStatus: 500 })
  const res = await submit(h)
  assert.equal(res.status, 503)
  assert.ok(!(await res.text()).includes('private provider error'))
})

test('all business schemas validate, serialize and reach the same inbox in three languages', async () => {
  const { businesses } = harness().schema
  for (const config of businesses)
    for (const locale of ['ja', 'zh', 'en']) {
      const h = harness({ db: true, key: true })
      const input = { ...businessInput(config), locale }
      const res = await submit(h, input)
      assert.equal(res.status, 201, `${config.value}/${locale}`)
      assert.equal(h.sends[0].to, 'info@kanae-tokyo.com')
      assert.ok(h.inserts[0].message.includes(config.label.ja))
      assert.ok(h.inserts[0].message.includes('Test company'))
      for (const field of config.fields)
        assert.ok(h.inserts[0].message.includes(field.label.ja))
      assert.ok(h.sends[0].text.includes(h.inserts[0].message))
    }
})

test('hidden fields from a different business and client-supplied recipients are ignored', async () => {
  const h = harness({ db: true, key: true })
  const other = h.schema.businesses.find((b) => b.value === 'other')
  const res = await submit(h, {
    ...businessInput(other),
    details: { product: 'DO_NOT_SEND' },
    to: 'attacker@example.com',
    customer_id: 'untrusted',
  })
  assert.equal(res.status, 201)
  assert.ok(!h.inserts[0].message.includes('DO_NOT_SEND'))
  assert.equal(h.inserts[0].customer_id, undefined)
  assert.equal(h.sends[0].to, 'info@kanae-tokyo.com')
})

test('legacy form types remain valid during rollout', async () => {
  for (const type of ['viewing', 'inquiry', 'application', 'other']) {
    const h = harness({ db: true })
    assert.equal((await submit(h, { ...legacy, type })).status, 202)
    assert.equal(h.inserts[0].type, type === 'other' ? 'inquiry' : type)
  }
})

const invalidPayloads = [
  null,
  [],
  {},
  { ...legacy, type: ['viewing'] },
  { ...legacy, name: '   ' },
  { ...legacy, name: 123 },
  { ...legacy, email: ['x@example.com'] },
  { ...legacy, email: 'x@example.com\nBcc:other@example.com' },
  { ...legacy, message: 'x'.repeat(5001) },
  { ...legacy, phone: {} },
  { ...legacy, website: 'spam' },
  { ...legacy, business: 'unknown', topic: 'inquiry', details: {} },
  { ...legacy, business: 'rent', topic: 'sample', details: { area: 'Tokyo' } },
  { ...legacy, business: 'rent', topic: 'inquiry', details: {} },
  { ...legacy, property_id: 'not-a-uuid' },
]
for (const [index, input] of invalidPayloads.entries())
  test(`invalid input ${index + 1} rejected before side effects`, async () => {
    const h = harness({ db: true, key: true })
    assert.equal((await submit(h, input)).status, 400)
    assert.equal(h.sends.length, 0)
    assert.equal(h.inserts.length, 0)
  })
test('invalid material option and missing conditional fields rejected', async () => {
  const h = harness({ key: true })
  const input = businessInput(
    h.schema.businesses.find((b) => b.value === 'materials')
  )
  for (const details of [
    { ...input.details, product: 'invalid product' },
    { ...input.details, stage: '' },
    { ...input.details, application: {} },
  ]) {
    assert.equal((await submit(h, { ...input, details })).status, 400)
  }
})
test('malformed JSON and oversize payloads rejected', async () => {
  const h = harness({ key: true })
  assert.equal((await submit(h, '{broken')).status, 400)
  assert.equal(
    (await submit(h, legacy, { 'content-length': '25000' })).status,
    413
  )
  assert.equal(
    (await submit(h, { ...legacy, message: '界'.repeat(9000) })).status,
    413
  )
  assert.equal(h.sends.length, 0)
})
test('GET advertises POST-only endpoint', async () => {
  const res = await harness().GET()
  assert.equal(res.status, 405)
  assert.equal(res.headers.get('allow'), 'POST')
})
