const { chromium, expect } = require('@playwright/test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const base = process.env.CONTACT_TEST_URL || 'http://127.0.0.1:3001'
const artifacts = path.join(__dirname, '..', 'test-results')
fs.mkdirSync(artifacts, { recursive: true })
const businessFields = {
  rent: ['area', 'budget', 'layout', 'timing', 'property'],
  sale: ['area', 'propertyType', 'budget', 'timing', 'property'],
  invest: ['area', 'budget', 'goal', 'timing', 'property'],
  management: ['area', 'propertyType', 'units', 'timing'],
  minpaku: ['area', 'propertyType', 'rooms', 'stage', 'timing'],
  materials: [
    'product',
    'application',
    'stage',
    'documents',
    'quantity',
    'area',
    'timing',
  ],
  other: [],
}
async function fill(page) {
  await page.locator('#name').fill('Browser test — not sent')
  await page.locator('#email').fill('test@example.com')
  await page.locator('#message').fill('Browser-only intercepted inquiry')
  for (const input of await page.locator('input[id^="detail-"]').all())
    await input.fill('Test detail')
  for (const select of await page.locator('select[id^="detail-"]').all()) {
    if (!(await select.inputValue())) await select.selectOption({ index: 1 })
  }
}

;(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox'],
  })
  let assertions = 0
  try {
    for (const locale of ['ja', 'zh', 'en']) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
      })
      await context.addInitScript(
        (locale) => localStorage.setItem('locale', locale),
        locale
      )
      const page = await context.newPage()
      const errors = [],
        payloads = []
      page.on('pageerror', (error) => errors.push(error.message))
      let outcome = {
        status: 201,
        body: { success: true, delivery: 'email_accepted' },
      }
      // Every form POST is intercepted, including when running against the production site.
      await context.route('**/api/contact', async (route) => {
        if (route.request().method() !== 'POST') return route.continue()
        payloads.push(route.request().postDataJSON())
        if (outcome.abort) return route.abort()
        if (outcome.delay)
          await new Promise((resolve) => setTimeout(resolve, outcome.delay))
        await route.fulfill({
          status: outcome.status,
          contentType: 'application/json',
          body: JSON.stringify(outcome.body),
        })
      })
      await page.goto(`${base}/contact`)
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        locale === 'zh' ? 'zh-Hant' : locale
      )
      await expect(page.locator('form')).toHaveCount(1)
      await expect(page.locator('#business')).toHaveValue('')
      await expect(page.locator('#business option')).toHaveCount(8)
      await expect(page.locator('[id^="detail-"]')).toHaveCount(0)
      await page.locator('button[type="submit"]').click()
      assert.equal(
        payloads.length,
        0,
        'required fields must prevent submission'
      )
      assertions++

      for (const [business, fields] of Object.entries(businessFields)) {
        await page.locator('#business').selectOption(business)
        await expect(page.locator('[id^="detail-"]')).toHaveCount(fields.length)
        for (const field of fields) {
          await expect(page.locator(`#detail-${field}`)).toBeVisible()
          await expect(
            page.locator(`label[for="detail-${field}"]`)
          ).toHaveCount(1)
        }
        await fill(page)
        await page.locator('button[type="submit"]').click()
        await expect(page.locator('#contact-feedback')).toHaveAttribute(
          'role',
          'status'
        )
        await expect(page.locator('#name')).toHaveValue('')
        const payload = payloads.at(-1)
        assert.equal(payload.business, business)
        assert.equal(payload.locale, locale)
        assert.deepEqual(
          Object.keys(payload.details).sort(),
          [...fields].sort()
        )
        assertions++
      }
      await page.goto(
        `${base}/contact?business=materials&topic=sample&product=NALEXIBLE%20EasyStone`
      )
      await expect(page.locator('#business')).toHaveValue('materials')
      await expect(page.locator('#topic')).toHaveValue('sample')
      await expect(page.locator('#detail-product')).toHaveValue(
        'NALEXIBLE EasyStone'
      )
      await fill(page)
      if (locale === 'zh') {
        await page
          .locator('form')
          .screenshot({
            path: path.join(artifacts, 'contact_materials_desktop.png'),
          })
        await page.setViewportSize({ width: 375, height: 812 })
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth
          ),
          'mobile must not overflow horizontally'
        )
        await page
          .locator('form')
          .screenshot({
            path: path.join(artifacts, 'contact_materials_mobile.png'),
          })
        await page.setViewportSize({ width: 1280, height: 900 })
      }
      // Switching services removes hidden details from the outgoing request.
      await page.locator('#business').selectOption('rent')
      await expect(page.locator('#detail-product')).toHaveCount(0)
      await fill(page)
      await page.locator('button[type="submit"]').click()
      await expect(page.locator('#name')).toHaveValue('')
      assert.equal(payloads.at(-1).details.product, undefined)
      assertions++

      for (const failure of [
        { status: 503, body: { success: false } },
        { status: 400, body: { success: false, fields: ['message'] } },
        { status: 500, body: { success: true, delivery: 'email_accepted' } },
        { status: 201, body: { success: false } },
        { status: 201, body: { success: true } },
        { abort: true },
      ]) {
        outcome = failure
        await page.locator('#business').selectOption('other')
        await fill(page)
        await page.locator('button[type="submit"]').click()
        await expect(page.locator('#contact-feedback')).toHaveAttribute(
          'role',
          'alert'
        )
        await expect(page.locator('#name')).toHaveValue(
          'Browser test — not sent'
        )
        await expect(page.locator('#message')).toHaveValue(
          'Browser-only intercepted inquiry'
        )
        assertions++
      }
      outcome = {
        status: 202,
        body: { success: true, delivery: 'stored_only' },
      }
      await fill(page)
      await page.locator('button[type="submit"]').click()
      await expect(page.locator('#contact-feedback')).toHaveClass(/bg-amber-50/)
      await expect(page.locator('#contact-feedback a')).toHaveAttribute(
        'href',
        'mailto:info@kanae-tokyo.com'
      )
      await expect(page.locator('#name')).toHaveValue('')
      assertions++

      outcome = {
        status: 201,
        body: { success: true, delivery: 'email_accepted' },
        delay: 300,
      }
      await page.locator('#business').selectOption('other')
      await fill(page)
      const before = payloads.length
      await page.locator('form').evaluate((form) => {
        form.requestSubmit()
        form.requestSubmit()
      })
      await expect(page.locator('#name')).toHaveValue('')
      assert.equal(
        payloads.length - before,
        1,
        'prevent duplicate concurrent submissions'
      )
      assertions++

      const legacyUrl = `${base}/materials/contact?product=NALEXIBLE%20EasyStone&topic=sample`
      const redirect = await context.request.get(legacyUrl, { maxRedirects: 0 })
      assert.equal(redirect.status(), 308, 'legacy URL must redirect before streaming')
      const destination = new URL(redirect.headers().location, base)
      assert.equal(destination.pathname, '/contact')
      assert.equal(destination.searchParams.get('business'), 'materials')
      assert.equal(destination.searchParams.get('product'), 'NALEXIBLE EasyStone')
      assert.equal(destination.searchParams.get('topic'), 'sample')
      await page.goto(legacyUrl)
      await expect(page).toHaveURL(url => url.pathname === '/contact' && url.searchParams.get('business') === 'materials')
      await expect(page.locator('#detail-product')).toHaveValue(
        'NALEXIBLE EasyStone'
      )
      await expect(page.locator('#topic')).toHaveValue('sample')
      await page.goto(`${base}/contact?business=invalid&product=unknown`)
      await expect(page.locator('#business')).toHaveValue('')
      assert.deepEqual(errors, [], `no browser errors (${locale})`)
      assertions++
      await context.close()
      console.log(
        `PASS: ${locale} business fields, submission states, redirect, preselection`
      )
    }
    console.log(
      `PASS: ${assertions} browser scenario groups; all POST requests mocked (no emails sent).`
    )
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
