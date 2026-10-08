'use strict';

var debug = 0 ? console.log.bind(console, '[promo-codes]') : function () {};

export function newPromoCodesController(isTest) {
	let endpoint = 'https://www.sitebay.org/wp-json/sitebay/v1/promo-data';
	if (isTest) {
		// localhost or Netlify.
		// Use local resource to work around CORS issues.
		endpoint = '/docs/wptestjson/promo-data.json';
		// This only ever set in dev/test environments.
		if (window.__api_shouldfail) {
			endpoint = '/docs/wptestjson/promo-data-fail.json';
		}
	}
	debug('isTest:', isTest, 'endpoint:', endpoint);

	return {
		data: {
			foo: 'bar',
			code: {},
		},
		signupURL: function (withPromo) {
			const baseURL = 'https://my.sitebay.org/signup';
			let promo = this.promoCode();
			if (withPromo && promo) {
				return baseURL + '?promo=' + promo;
			}
			return baseURL;
		},
		promoCode: function () {
			if (this.data.code.promo_code) {
				return this.data.code.promo_code;
			}
			return '';
		},
        init: async function () {
            // Promotions are optional; unavailable or malformed data must not
            // break page navigation or invent an active offer.
            try {
                const response = await fetch(endpoint);
                if (!response.ok) return;
                const codes = await response.json();
                this.data.code = codes && typeof codes.docs === 'object' && codes.docs !== null ? codes.docs : {};
            } catch {
                this.data.code = {};
            }
        },
	};
}
