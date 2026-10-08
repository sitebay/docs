import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../../assets/js/main/navigation/promo-codes.js', import.meta.url), 'utf8');
const { newPromoCodesController } = await import(`data:text/javascript,${encodeURIComponent(source)}`);

test('SiteBay signup and optional promotions remain on the SiteBay tenant', async () => {
  const oldFetch = globalThis.fetch;
  try {
    globalThis.fetch = async url => {
      assert.equal(url, 'https://www.sitebay.org/wp-json/sitebay/v1/promo-data');
      return {ok:true,json:async () => ({docs:{promo_code:'fixture'}})};
    };
    const controller = newPromoCodesController(false);
    await controller.init();
    assert.equal(controller.signupURL(false), 'https://my.sitebay.org/signup');
    assert.equal(controller.signupURL(true), 'https://my.sitebay.org/signup?promo=fixture');
  } finally { globalThis.fetch = oldFetch; }
});

test('Missing, malformed and failed optional promo responses do not claim a promotion', async () => {
  const oldFetch = globalThis.fetch;
  try {
    for (const reply of [
      async () => {throw new Error('unavailable');},
      async () => ({ok:false}),
      async () => ({ok:true,json:async () => {throw new SyntaxError('bad JSON');}}),
      async () => ({ok:true,json:async () => ({docs:null})}),
    ]) {
      globalThis.fetch = reply;
      const controller = newPromoCodesController(false);
      await controller.init();
      assert.equal(controller.promoCode(), '');
      assert.equal(controller.signupURL(true), 'https://my.sitebay.org/signup');
    }
  } finally { globalThis.fetch = oldFetch; }
});
