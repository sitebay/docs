(() => {
  // <stdin>
  (() => {
    function daysFromNow(days = 0) {
      let d = /* @__PURE__ */ new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1e3);
      return d;
    }
    function expireFromLocal(name) {
      if (null === localStorage.getItem(name)) return;
      let now = /* @__PURE__ */ new Date(), exp_value = localStorage.getItem(`${name}_exp`), exp_date = null !== exp_value ? new Date(exp_value) : now;
      if (isNaN(exp_date)) {
        localStorage.removeItem(`${name}_exp`);
        return;
      }
      if (now < exp_date) return;
      localStorage.removeItem(name);
      localStorage.removeItem(`${name}_exp`);
    }
    function saveToLocal(name, value, exp_date = null, overwrite = true) {
      let saved = localStorage.getItem(name);
      if (null !== saved && saved !== value && !overwrite) return;
      localStorage.setItem(name, value);
      if (null !== exp_date) {
        localStorage.setItem(`${name}_exp`, exp_date.toUTCString());
      }
    }
    function saveToCookie(name, value, exp_date = null, overwrite = true) {
      value = encodeURIComponent(value);
      if (document.cookie.indexOf(`${name}=`) >= 0 && document.cookie.indexOf(`${name}=${value}`) < 0 && !overwrite) return;
      let expires = null !== exp_date ? `expires=${exp_date.toUTCString()}; ` : "";
      document.cookie = `${name}=${value}; domain=.sitebay.org; ${expires}path=/; secure; samesite=lax; `;
    }
    function storeParams(args) {
      let url = new URL(window.location.href), param_value = url.searchParams.get(args.param);
      if (args.local) expireFromLocal(args.local);
      if (!param_value) return;
      if (args.regex && !param_value.match(args.regex)) return;
      let exp_date = args.days ? daysFromNow(args.days) : null;
      if (args.local) saveToLocal(args.local, param_value, exp_date);
      if (args.cookie) saveToCookie(args.cookie, param_value, exp_date);
    }
    storeParams({
      "param": "r",
      "cookie": "referralCode",
      "days": 14,
      "regex": /^[0-9a-f]{40}$/i
    });
    var cookies = Object.fromEntries(document.cookie.split(/\s*;\s*/).map((c) => c.split(/\s*=\s*/)));
    var body = document.getElementsByTagName("body")[0];
    if (cookies.referralCode) {
      body.classList.add("js-is-referral");
    }
    storeParams({
      "param": "promo",
      "cookie": "promoCode",
      "local": "promoCode",
      "days": 1,
      "regex": /^[0-9a-z-_]*$/i
    });
    storeParams({
      "param": "promo_length",
      "cookie": "promoLength",
      "local": "promoLength",
      "days": 1,
      "regex": /^[0-9]*$/
    });
    storeParams({
      "param": "promo_value",
      "cookie": "promoValue",
      "local": "promoValue",
      "days": 1,
      "regex": /^[0-9]*$/
    });
    function updateLinkPromoCodes(promo, should_override) {
      let $links = Array.from(document.querySelectorAll(`a[href*="my.sitebay.org"][href*="/signup"]`));
      $links.forEach(($link) => {
        let link_url = new URL($link.href);
        if (link_url.searchParams.has("promo")) {
          if (!$link.hasAttribute("data-promo-override")) return;
          if (!should_override) return;
          link_url.searchParams.delete("promo");
        }
        if (promo) {
          link_url.searchParams.set("promo", promo);
        }
        $link.href = link_url.toString();
      });
    }
    function updateFormPromoCodes(promo, should_override) {
      let $forms = Array.from(document.querySelectorAll(`form[action*="my.sitebay.org/signup"]`));
      $forms.forEach(($form) => {
        let form_url = new URL($form.action), $promo_field = $form.querySelector('input[name="promo"]');
        if ($promo_field) {
          if (!$promo_field.hasAttribute("data-promo-override")) return;
          if (!should_override) return;
          $promo_field.remove();
        }
        if (promo) {
          let $new_promo_field = document.createElement("input");
          $new_promo_field.setAttribute("type", "hidden");
          $new_promo_field.setAttribute("name", "promo");
          $new_promo_field.setAttribute("value", promo);
          $form.appendChild($new_promo_field);
        }
      });
    }
    function updatePromoCodes(promo, should_override) {
      updateLinkPromoCodes(promo, should_override);
      updateFormPromoCodes(promo, should_override);
    }
    var cookies2 = Object.fromEntries(document.cookie.split(/\s*;\s*/).map((c) => c.split(/\s*=\s*/)));
    var localPromoCode = localStorage.getItem("promoCode");
    if (cookies2.referralCode) {
      updatePromoCodes("", true);
    } else if (localPromoCode || cookies2.promoCode) {
      updatePromoCodes(localPromoCode || cookies2.promoCode, true);
    } else {
      fetch("https://www.sitebay.org/wp-json/sitebay/v1/promo-data").then((response) => {
        if (!response.ok) throw new Error("");
        return response;
      }).then((response) => response.json()).then((data) => {
        if (data.global && data.global.promo_code) {
          updatePromoCodes(data.global.promo_code, false);
        }
      }).catch((error) => {
      });
    }
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiKCgpID0+IHtcbiAgLy8gc3JjL2pzL0Zvb3Rlci9zdG9yYWdlLmpzXG4gIGZ1bmN0aW9uIGRheXNGcm9tTm93KGRheXMgPSAwKSB7XG4gICAgbGV0IGQgPSAvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKTtcbiAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyBkYXlzICogMjQgKiA2MCAqIDYwICogMWUzKTtcbiAgICByZXR1cm4gZDtcbiAgfVxuICBmdW5jdGlvbiBleHBpcmVGcm9tTG9jYWwobmFtZSkge1xuICAgIGlmIChudWxsID09PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSkgcmV0dXJuO1xuICAgIGxldCBub3cgPSAvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSwgZXhwX3ZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7bmFtZX1fZXhwYCksIGV4cF9kYXRlID0gbnVsbCAhPT0gZXhwX3ZhbHVlID8gbmV3IERhdGUoZXhwX3ZhbHVlKSA6IG5vdztcbiAgICBpZiAoaXNOYU4oZXhwX2RhdGUpKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lfV9leHBgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vdyA8IGV4cF9kYXRlKSByZXR1cm47XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7bmFtZX1fZXhwYCk7XG4gIH1cbiAgZnVuY3Rpb24gc2F2ZVRvTG9jYWwobmFtZSwgdmFsdWUsIGV4cF9kYXRlID0gbnVsbCwgb3ZlcndyaXRlID0gdHJ1ZSkge1xuICAgIGxldCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xuICAgIGlmIChudWxsICE9PSBzYXZlZCAmJiBzYXZlZCAhPT0gdmFsdWUgJiYgIW92ZXJ3cml0ZSkgcmV0dXJuO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbHVlKTtcbiAgICBpZiAobnVsbCAhPT0gZXhwX2RhdGUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke25hbWV9X2V4cGAsIGV4cF9kYXRlLnRvVVRDU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBzYXZlVG9Db29raWUobmFtZSwgdmFsdWUsIGV4cF9kYXRlID0gbnVsbCwgb3ZlcndyaXRlID0gdHJ1ZSkge1xuICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICBpZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoYCR7bmFtZX09YCkgPj0gMCAmJiBkb2N1bWVudC5jb29raWUuaW5kZXhPZihgJHtuYW1lfT0ke3ZhbHVlfWApIDwgMCAmJiAhb3ZlcndyaXRlKSByZXR1cm47XG4gICAgbGV0IGV4cGlyZXMgPSBudWxsICE9PSBleHBfZGF0ZSA/IGBleHBpcmVzPSR7ZXhwX2RhdGUudG9VVENTdHJpbmcoKX07IGAgOiBcIlwiO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7dmFsdWV9OyBkb21haW49LnNpdGViYXkub3JnOyAke2V4cGlyZXN9cGF0aD0vOyBzZWN1cmU7IHNhbWVzaXRlPWxheDsgYDtcbiAgfVxuICBmdW5jdGlvbiBzdG9yZVBhcmFtcyhhcmdzKSB7XG4gICAgbGV0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLCBwYXJhbV92YWx1ZSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KGFyZ3MucGFyYW0pO1xuICAgIGlmIChhcmdzLmxvY2FsKSBleHBpcmVGcm9tTG9jYWwoYXJncy5sb2NhbCk7XG4gICAgaWYgKCFwYXJhbV92YWx1ZSkgcmV0dXJuO1xuICAgIGlmIChhcmdzLnJlZ2V4ICYmICFwYXJhbV92YWx1ZS5tYXRjaChhcmdzLnJlZ2V4KSkgcmV0dXJuO1xuICAgIGxldCBleHBfZGF0ZSA9IGFyZ3MuZGF5cyA/IGRheXNGcm9tTm93KGFyZ3MuZGF5cykgOiBudWxsO1xuICAgIGlmIChhcmdzLmxvY2FsKSBzYXZlVG9Mb2NhbChhcmdzLmxvY2FsLCBwYXJhbV92YWx1ZSwgZXhwX2RhdGUpO1xuICAgIGlmIChhcmdzLmNvb2tpZSkgc2F2ZVRvQ29va2llKGFyZ3MuY29va2llLCBwYXJhbV92YWx1ZSwgZXhwX2RhdGUpO1xuICB9XG5cbiAgLy8gc3JjL2pzL0Zvb3Rlci9yZWZlcnJhbC1jb2Rlcy5qc1xuICBzdG9yZVBhcmFtcyh7XG4gICAgXCJwYXJhbVwiOiBcInJcIixcbiAgICBcImNvb2tpZVwiOiBcInJlZmVycmFsQ29kZVwiLFxuICAgIFwiZGF5c1wiOiAxNCxcbiAgICBcInJlZ2V4XCI6IC9eWzAtOWEtZl17NDB9JC9pXG4gIH0pO1xuICB2YXIgY29va2llcyA9IE9iamVjdC5mcm9tRW50cmllcyhkb2N1bWVudC5jb29raWUuc3BsaXQoL1xccyo7XFxzKi8pLm1hcCgoYykgPT4gYy5zcGxpdCgvXFxzKj1cXHMqLykpKTtcbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG4gIGlmIChjb29raWVzLnJlZmVycmFsQ29kZSkge1xuICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcImpzLWlzLXJlZmVycmFsXCIpO1xuICB9XG5cbiAgLy8gc3JjL2pzL0Zvb3Rlci9wcm9tby1jb2Rlcy5qc1xuICBzdG9yZVBhcmFtcyh7XG4gICAgXCJwYXJhbVwiOiBcInByb21vXCIsXG4gICAgXCJjb29raWVcIjogXCJwcm9tb0NvZGVcIixcbiAgICBcImxvY2FsXCI6IFwicHJvbW9Db2RlXCIsXG4gICAgXCJkYXlzXCI6IDEsXG4gICAgXCJyZWdleFwiOiAvXlswLTlhLXotX10qJC9pXG4gIH0pO1xuICBzdG9yZVBhcmFtcyh7XG4gICAgXCJwYXJhbVwiOiBcInByb21vX2xlbmd0aFwiLFxuICAgIFwiY29va2llXCI6IFwicHJvbW9MZW5ndGhcIixcbiAgICBcImxvY2FsXCI6IFwicHJvbW9MZW5ndGhcIixcbiAgICBcImRheXNcIjogMSxcbiAgICBcInJlZ2V4XCI6IC9eWzAtOV0qJC9cbiAgfSk7XG4gIHN0b3JlUGFyYW1zKHtcbiAgICBcInBhcmFtXCI6IFwicHJvbW9fdmFsdWVcIixcbiAgICBcImNvb2tpZVwiOiBcInByb21vVmFsdWVcIixcbiAgICBcImxvY2FsXCI6IFwicHJvbW9WYWx1ZVwiLFxuICAgIFwiZGF5c1wiOiAxLFxuICAgIFwicmVnZXhcIjogL15bMC05XSokL1xuICB9KTtcbiAgZnVuY3Rpb24gdXBkYXRlTGlua1Byb21vQ29kZXMocHJvbW8sIHNob3VsZF9vdmVycmlkZSkge1xuICAgIGxldCAkbGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGFbaHJlZio9XCJteS5zaXRlYmF5Lm9yZ1wiXVtocmVmKj1cIi9zaWdudXBcIl1gKSk7XG4gICAgJGxpbmtzLmZvckVhY2goKCRsaW5rKSA9PiB7XG4gICAgICBsZXQgbGlua191cmwgPSBuZXcgVVJMKCRsaW5rLmhyZWYpO1xuICAgICAgaWYgKGxpbmtfdXJsLnNlYXJjaFBhcmFtcy5oYXMoXCJwcm9tb1wiKSkge1xuICAgICAgICBpZiAoISRsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtcHJvbW8tb3ZlcnJpZGVcIikpIHJldHVybjtcbiAgICAgICAgaWYgKCFzaG91bGRfb3ZlcnJpZGUpIHJldHVybjtcbiAgICAgICAgbGlua191cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShcInByb21vXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHByb21vKSB7XG4gICAgICAgIGxpbmtfdXJsLnNlYXJjaFBhcmFtcy5zZXQoXCJwcm9tb1wiLCBwcm9tbyk7XG4gICAgICB9XG4gICAgICAkbGluay5ocmVmID0gbGlua191cmwudG9TdHJpbmcoKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVGb3JtUHJvbW9Db2Rlcyhwcm9tbywgc2hvdWxkX292ZXJyaWRlKSB7XG4gICAgbGV0ICRmb3JtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgZm9ybVthY3Rpb24qPVwibXkuc2l0ZWJheS5vcmcvc2lnbnVwXCJdYCkpO1xuICAgICRmb3Jtcy5mb3JFYWNoKCgkZm9ybSkgPT4ge1xuICAgICAgbGV0IGZvcm1fdXJsID0gbmV3IFVSTCgkZm9ybS5hY3Rpb24pLCAkcHJvbW9fZmllbGQgPSAkZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicHJvbW9cIl0nKTtcbiAgICAgIGlmICgkcHJvbW9fZmllbGQpIHtcbiAgICAgICAgaWYgKCEkcHJvbW9fZmllbGQuaGFzQXR0cmlidXRlKFwiZGF0YS1wcm9tby1vdmVycmlkZVwiKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXNob3VsZF9vdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAkcHJvbW9fZmllbGQucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBpZiAocHJvbW8pIHtcbiAgICAgICAgbGV0ICRuZXdfcHJvbW9fZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICRuZXdfcHJvbW9fZmllbGQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgJG5ld19wcm9tb19maWVsZC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwicHJvbW9cIik7XG4gICAgICAgICRuZXdfcHJvbW9fZmllbGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgcHJvbW8pO1xuICAgICAgICAkZm9ybS5hcHBlbmRDaGlsZCgkbmV3X3Byb21vX2ZpZWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVQcm9tb0NvZGVzKHByb21vLCBzaG91bGRfb3ZlcnJpZGUpIHtcbiAgICB1cGRhdGVMaW5rUHJvbW9Db2Rlcyhwcm9tbywgc2hvdWxkX292ZXJyaWRlKTtcbiAgICB1cGRhdGVGb3JtUHJvbW9Db2Rlcyhwcm9tbywgc2hvdWxkX292ZXJyaWRlKTtcbiAgfVxuICB2YXIgY29va2llczIgPSBPYmplY3QuZnJvbUVudHJpZXMoZG9jdW1lbnQuY29va2llLnNwbGl0KC9cXHMqO1xccyovKS5tYXAoKGMpID0+IGMuc3BsaXQoL1xccyo9XFxzKi8pKSk7XG4gIHZhciBsb2NhbFByb21vQ29kZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvbW9Db2RlXCIpO1xuICBpZiAoY29va2llczIucmVmZXJyYWxDb2RlKSB7XG4gICAgdXBkYXRlUHJvbW9Db2RlcyhcIlwiLCB0cnVlKTtcbiAgfSBlbHNlIGlmIChsb2NhbFByb21vQ29kZSB8fCBjb29raWVzMi5wcm9tb0NvZGUpIHtcbiAgICB1cGRhdGVQcm9tb0NvZGVzKGxvY2FsUHJvbW9Db2RlIHx8IGNvb2tpZXMyLnByb21vQ29kZSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZmV0Y2goXCJodHRwczovL3d3dy5zaXRlYmF5Lm9yZy93cC1qc29uL3NpdGViYXkvdjEvcHJvbW8tZGF0YVwiKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhLmdsb2JhbCAmJiBkYXRhLmdsb2JhbC5wcm9tb19jb2RlKSB7XG4gICAgICAgIHVwZGF0ZVByb21vQ29kZXMoZGF0YS5nbG9iYWwucHJvbW9fY29kZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIH0pO1xuICB9XG59KSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxHQUFDLE1BQU07QUFFTCxhQUFTLFlBQVksT0FBTyxHQUFHO0FBQzdCLFVBQUksSUFBb0Isb0JBQUksS0FBSztBQUNqQyxRQUFFLFFBQVEsRUFBRSxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssS0FBSyxH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
