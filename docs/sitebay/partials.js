(() => {
  // <stdin>
  (() => {
    function getCookie(e, o) {
      return null == (o = RegExp("(^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? void 0 : o[2] ? o[2] : void 0;
    }
    function setCookie(firstLast, cookieName, cookieValue) {
      var cS = "; max-age=31536000; domain=.sitebay.org; path=/";
      document.cookie = firstLast + cookieName + "=" + cookieValue + cS;
    }
    var parseQueryString = function() {
      var e = window.location.search.toLowerCase(), r = {};
      return e.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function(e2, n, a, o) {
        r[n] = o;
      }), r;
    };
    var pFA = parseQueryString();
    var aV = {
      FullQuery: window.location.search || getCookie("atr_lastFullQuery") || "",
      GA_ID: getCookie("_ga") || getCookie("atr_lastGA_ID") || getCookie("atr_firstGA_ID") || "",
      GCLID: getCookie("_gcl_aw") || getCookie("atr_lastGCLID") || getCookie("atr_firstGCLID") || "",
      Custom1: "true",
      Custom5: getCookie("_fbc") || getCookie("atr_lastCustom5") || getCookie("atr_firstCustom5") || "",
      Custom4: getCookie("_fbp") || getCookie("atr_lastCustom4") || getCookie("atr_firstCustom4") || "",
      Custom3: window.location.pathname || "",
      Path: window.location.pathname || "",
      UTM_Campaign: pFA["utm_campaign"] || getCookie("atr_lastUTM_Campaign") || getCookie("atr_firstUTM_Campaign") || "",
      UTM_Source: pFA["utm_source"] || getCookie("atr_lastUTM_Source") || getCookie("atr_firstUTM_Source") || "",
      UTM_Medium: pFA["utm_medium"] || getCookie("atr_lastUTM_Medium") || getCookie("atr_firstUTM_Medium") || "",
      UTM_Content: pFA["utm_content"] || getCookie("atr_lastUTM_Content") || getCookie("atr_firstUTM_Content") || "",
      UTM_Term: pFA["utm_term"] || getCookie("atr_lastUTM_Term") || getCookie("atr_firstUTM_Term") || ""
    };
    var aVEvery = ["Custom1", "Custom3", "Custom4", "Custom5", "GA_ID", "GCLID"];
    if (document.cookie.indexOf("atr1_sessionValsStores=") == -1 && (window.location.search.indexOf("utm") != -1 || window.location.search.indexOf("gclid") != -1 || document.cookie.indexOf("_fbp=") != -1 || document.cookie.indexOf("_fbc=") != -1 || document.cookie.indexOf("_gcl_aw=") != -1)) {
      document.cookie = "atr1_sessionValsStores=true; expires=0; domain=.sitebay.org; path=/";
      if (document.cookie.indexOf("atr1_firstSource=") == -1) {
        for (key in aV) {
          if (aV.hasOwnProperty(key)) {
            setCookie("atr_first", key, aV[key]);
          }
        }
        setCookie("atr1_first", "Source", "true");
        document.cookie = "atr1_isFirst=true; expires=0; domain=.sitebay.org; path=/";
      }
      for (key in aV) {
        if (aV.hasOwnProperty(key)) {
          setCookie("atr_last", key, aV[key]);
        }
      }
    } else {
      for (i = 0; i < aVEvery.length; i++) {
        if (document.cookie.indexOf("atr1_firstSource=") == -1 || document.cookie.indexOf("atr1_isFirst=") != -1) {
          setCookie("atr_first", aVEvery[i], aV[aVEvery[i]]);
        }
        setCookie("atr_last", aVEvery[i], aV[aVEvery[i]]);
      }
    }
    var key;
    var i;
  })();
  (() => {
    var $html = document.querySelector("html");
    var $header;
    var mount = function() {
      $header = document.querySelector(".c-site-header");
      if (!$header) return;
      bindEvents();
      setActiveMenuItem();
    };
    var setScrollY = function() {
      document.documentElement.style.setProperty("--site-scroll-y", window.scrollY + "px");
    };
    var bindEvents = function() {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setScrollY);
      } else {
        setScrollY();
      }
      window.addEventListener("scroll", setScrollY);
      $header.addEventListener("toggle:on", function(event) {
        setHtmlScrollState(false);
      });
      $header.addEventListener("toggle:off", function(event) {
        setHtmlScrollState(true);
      });
      document.addEventListener("keyup", function(event) {
        switch (event.keyCode) {
          case 27:
            $header.querySelectorAll(".active").forEach(($item) => $item.classList.remove("active"));
            document.activeElement.blur();
            setHtmlScrollState(true);
            break;
        }
      });
    };
    var setActiveMenuItem = function() {
      var current_path = window.location.pathname;
      if ("/" === current_path) {
        return;
      } else if (current_path.match(/^\/community\/questions\/.+/)) {
        current_path = "/community/questions/";
      } else if (current_path.match(/^\/docs\/.+/)) {
        current_path = "/docs/";
      } else if (current_path.match(/^\/blog|marketplace\/.+/)) {
        current_path = current_path.replace(/^\/([^\/]+)\/.+/, "/$1/");
      } else if (current_path.match(/^\/event\/.+/)) {
        current_path = "/events/";
      } else if (current_path.match(/^\/content|content-type|featuring|series\/.+/)) {
        current_path = "/content/";
      } else if (current_path.match(/^\/media\-coverage|press\-release\/.+/)) {
        current_path = "/company/press/";
      }
      var $current_links = $header.querySelectorAll(':scope a.o-menu__link[href*="' + current_path + '"');
      if (!$current_links) return;
      Array.from($current_links).forEach(($link) => {
        if (!$link.getAttribute("href").split(/[?#]/)[0].endsWith(current_path)) return;
        $link.classList.add("current");
        const $sub_menu = $link.closest(".c-submenu");
        if (null === $sub_menu) return;
        const $trigger_links = $header.querySelectorAll(
          `:scope [data-toggle="#${$sub_menu.id}"]`
        );
        Array.from($trigger_links).forEach(($trigger) => $trigger.classList.add("current"));
      });
    };
    var setHtmlScrollState = function(state) {
      $html.style.overflow = state ? "" : "hidden";
    };
    if (!$html.classList.contains("fl-builder-edit")) {
      mount();
    }
    document.addEventListener("turbolinks:render", function(event) {
      mount();
    });
    function handleFetchErrors(response) {
      if (!response.ok) {
        let errorMessage = "";
        if (response.statusText) {
          errorMessage = response.statusText;
        } else if (response.status === 404) {
          errorMessage = "Resource not found";
        } else {
          errorMessage = "Problem fetching resource";
        }
        throw new Error(`${errorMessage} (${response.url})`);
      }
      return response;
    }
    var languages = ["de", "es", "fr", "it", "ja", "ko", "pt-br", "pt", "zh"];
    function getLanguageString() {
      let lang = document.documentElement.lang;
      if (lang && languages.includes(lang)) {
        return lang;
      } else {
        return "";
      }
    }
    function safeHTML(input, allow_tags = ["b", "br", "em", "i", "span", "strong", "u"]) {
      let tmp = document.createElement("div");
      tmp.textContent = input;
      let output = tmp.innerHTML;
      let allow_regex = new RegExp(`&lt;(/?(${allow_tags.join("|")}))&gt;`, "gi");
      output = output.replace(allow_regex, "<$1>");
      return output;
    }
    var $html2;
    var mount2 = function() {
      const api_url = "https://www.sitebay.org/wp-json/sitebay/v1/header-featured", lang = getLanguageString();
      fetch(api_url).then(handleFetchErrors).then((response) => response.json()).then((data) => updateDOM(data)).catch((error) => console.log(error));
    };
    var updateDOM = function(data) {
      data.forEach((item) => {
        let $slot = document.querySelector('.c-site-header [data-featured="' + item.slot + '"]');
        if (!$slot) return;
        let $feature = generateFeature(item);
        if (!$feature) return;
        while ($slot.firstChild) {
          $slot.removeChild($slot.firstChild);
        }
        $slot.appendChild($feature);
      });
    };
    var generateImage = function(data) {
      let $img = document.createElement("img");
      $img.src = data.src;
      $img.width = data.width;
      $img.height = data.height;
      $img.loading = "lazy";
      $img.fetchPriority = "low";
      if (data.alt) {
        $img.alt = data.alt;
      }
      if (data.srcset) {
        $img.srcset = data.srcset;
      }
      if (data.sizes) {
        $img.sizes = data.sizes;
      }
      return $img;
    };
    var generateFeature = function(data) {
      let $base = document.createElement("div"), $h6 = document.createElement("h6"), $a = document.createElement("a"), $text = document.createElement("div"), $headline = document.createElement("div"), $excerpt = document.createElement("div"), $button = document.createElement("span"), $style = document.createElement("style");
      $h6.textContent = data.eyebrow;
      $a.classList.add("c-featured");
      $a.id = `c-featured--${data.slot}`;
      $a.href = data.link_url;
      $a.setAttribute("style", data.wrap_styles);
      $a.setAttribute("data-analytics-event", `${data.ga_category} | ${data.ga_action} | ${data.ga_label}`);
      $text.classList.add("c-featured__text");
      $headline.classList.add("c-featured__headline");
      $headline.innerHTML = safeHTML(data.headline);
      $excerpt.classList.add("c-featured__excerpt");
      $excerpt.innerHTML = data.excerpt;
      $button.classList.add("c-featured__button");
      $button.textContent = data.link_text;
      $style.type = "text/css";
      $style.textContent = data.css;
      $text.appendChild($headline);
      $text.appendChild($excerpt);
      $text.appendChild($button);
      if (data.background_image.src) {
        let $bg = generateImage(data.background_image);
        $bg.classList.add("c-featured__background");
        $a.appendChild($bg);
      }
      if (data.foreground_image.src) {
        let $fg = generateImage(data.foreground_image);
        $fg.classList.add("c-featured__image");
        $a.appendChild($fg);
      }
      $a.appendChild($text);
      $base.appendChild($h6);
      $base.appendChild($a);
      $base.appendChild($style);
      return $base;
    };
    var $html2 = document.querySelector("html");
    if (!$html2.classList.contains("fl-builder-edit")) {
      mount2();
    }
    document.addEventListener("turbolinks:render", function(event) {
      mount2();
    });
    var $html3 = document.querySelector("html");
    var mount3 = function() {
      bindEvents2();
    };
    var bindEvents2 = function() {
      $html3.addEventListener("click", handleClick);
    };
    var handleClick = function(e) {
      const $trigger = e.target.closest("[data-toggle]");
      if (null === $trigger) return;
      if (null !== e.target.closest("form")) return;
      const $target = $trigger.dataset.toggle ? $html3.querySelector($trigger.dataset.toggle) : $trigger;
      if (null === $target) return;
      const $anchor = e.target.closest("a");
      if ($anchor) {
        if ($anchor === $trigger) {
          e.preventDefault();
        } else {
          const $url = new URL($anchor.getAttribute("href"));
          if ($url && $url.pathname !== window.location.pathname) return;
          $anchor.blur();
        }
      }
      toggle($target, $trigger);
    };
    var toggle = function($target, $trigger) {
      const target_active = $target.classList.contains("active"), group = $target.dataset.group, $active = group ? $html3.querySelectorAll('[data-group="' + group + '"].active') : null, toggle_event = new CustomEvent(
        "toggle:" + (target_active ? "off" : "on"),
        {
          bubbles: true
        }
      );
      if ($active) {
        $active.forEach(($item) => $item.classList.remove("active"));
      }
      if (!target_active) {
        $target.classList.add("active");
        $trigger.classList.add("active");
      } else {
        $trigger.blur();
      }
      $target.dispatchEvent(toggle_event);
    };
    if (!$html3.classList.contains("fl-builder-edit")) {
      mount3();
    }
    document.addEventListener("turbolinks:render", function(event) {
      mount3();
    });
    window.addEventListener("click", (e) => {
      if (e.target.matches('a[href*="#open-consent-prefs"]') || e.target.matches("span#open-consent-prefs")) {
        e.preventDefault();
        if (typeof window.OneTrust !== "undefined") {
          window.OneTrust.ToggleInfoDisplay();
        }
      }
    });
    !function(t, e) {
      var o, n, p, r;
      e.__SV || (window.posthog = e, e._i = [], e.init = function(i, s, a) {
        function g(t2, e2) {
          var o2 = e2.split(".");
          2 == o2.length && (t2 = t2[o2[0]], e2 = o2[1]), t2[e2] = function() {
            t2.push([e2].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = true, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
        var u = e;
        for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function(t2) {
          var e2 = "posthog";
          return "posthog" !== a && (e2 += "." + a), t2 || (e2 += " (stub)"), e2;
        }, u.people.toString = function() {
          return u.toString(1) + ".people (stub)";
        }, o = "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "), n = 0; n < o.length; n++) g(u, o[n]);
        e._i.push([i, s, a]);
      }, e.__SV = 1);
    }(document, window.posthog || []);
    posthog.init("sTMFPsFhdP1Ssg", {
      api_host: "https://my.sitebay.org",
      person_profiles: "always"
    });
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiKCgpID0+IHtcbiAgLy8gc3JjL2pzL2F0dHJpYnV0aW9uLWlubGluZS5qc1xuICBmdW5jdGlvbiBnZXRDb29raWUoZSwgbykge1xuICAgIHJldHVybiBudWxsID09IChvID0gUmVnRXhwKFwiKF58OyApXCIgKyBlbmNvZGVVUklDb21wb25lbnQoZSkgKyBcIj0oW147XSopXCIpLmV4ZWMoZG9jdW1lbnQuY29va2llKSkgPyB2b2lkIDAgOiBvWzJdID8gb1syXSA6IHZvaWQgMDtcbiAgfVxuICBmdW5jdGlvbiBzZXRDb29raWUoZmlyc3RMYXN0LCBjb29raWVOYW1lLCBjb29raWVWYWx1ZSkge1xuICAgIHZhciBjUyA9IFwiOyBtYXgtYWdlPTMxNTM2MDAwOyBkb21haW49LnNpdGViYXkub3JnOyBwYXRoPS9cIjtcbiAgICBkb2N1bWVudC5jb29raWUgPSBmaXJzdExhc3QgKyBjb29raWVOYW1lICsgXCI9XCIgKyBjb29raWVWYWx1ZSArIGNTO1xuICB9XG4gIHZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGUgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnRvTG93ZXJDYXNlKCksIHIgPSB7fTtcbiAgICByZXR1cm4gZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoW14/PSZdKykoPShbXiZdKikpP1wiLCBcImdcIiksIGZ1bmN0aW9uKGUyLCBuLCBhLCBvKSB7XG4gICAgICByW25dID0gbztcbiAgICB9KSwgcjtcbiAgfTtcbiAgdmFyIHBGQSA9IHBhcnNlUXVlcnlTdHJpbmcoKTtcbiAgdmFyIGFWID0ge1xuICAgIEZ1bGxRdWVyeTogd2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBnZXRDb29raWUoXCJhdHJfbGFzdEZ1bGxRdWVyeVwiKSB8fCBcIlwiLFxuICAgIEdBX0lEOiBnZXRDb29raWUoXCJfZ2FcIikgfHwgZ2V0Q29va2llKFwiYXRyX2xhc3RHQV9JRFwiKSB8fCBnZXRDb29raWUoXCJhdHJfZmlyc3RHQV9JRFwiKSB8fCBcIlwiLFxuICAgIEdDTElEOiBnZXRDb29raWUoXCJfZ2NsX2F3XCIpIHx8IGdldENvb2tpZShcImF0cl9sYXN0R0NMSURcIikgfHwgZ2V0Q29va2llKFwiYXRyX2ZpcnN0R0NMSURcIikgfHwgXCJcIixcbiAgICBDdXN0b20xOiBcInRydWVcIixcbiAgICBDdXN0b201OiBnZXRDb29raWUoXCJfZmJjXCIpIHx8IGdldENvb2tpZShcImF0cl9sYXN0Q3VzdG9tNVwiKSB8fCBnZXRDb29raWUoXCJhdHJfZmlyc3RDdXN0b201XCIpIHx8IFwiXCIsXG4gICAgQ3VzdG9tNDogZ2V0Q29va2llKFwiX2ZicFwiKSB8fCBnZXRDb29raWUoXCJhdHJfbGFzdEN1c3RvbTRcIikgfHwgZ2V0Q29va2llKFwiYXRyX2ZpcnN0Q3VzdG9tNFwiKSB8fCBcIlwiLFxuICAgIEN1c3RvbTM6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSB8fCBcIlwiLFxuICAgIFBhdGg6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSB8fCBcIlwiLFxuICAgIFVUTV9DYW1wYWlnbjogcEZBW1widXRtX2NhbXBhaWduXCJdIHx8IGdldENvb2tpZShcImF0cl9sYXN0VVRNX0NhbXBhaWduXCIpIHx8IGdldENvb2tpZShcImF0cl9maXJzdFVUTV9DYW1wYWlnblwiKSB8fCBcIlwiLFxuICAgIFVUTV9Tb3VyY2U6IHBGQVtcInV0bV9zb3VyY2VcIl0gfHwgZ2V0Q29va2llKFwiYXRyX2xhc3RVVE1fU291cmNlXCIpIHx8IGdldENvb2tpZShcImF0cl9maXJzdFVUTV9Tb3VyY2VcIikgfHwgXCJcIixcbiAgICBVVE1fTWVkaXVtOiBwRkFbXCJ1dG1fbWVkaXVtXCJdIHx8IGdldENvb2tpZShcImF0cl9sYXN0VVRNX01lZGl1bVwiKSB8fCBnZXRDb29raWUoXCJhdHJfZmlyc3RVVE1fTWVkaXVtXCIpIHx8IFwiXCIsXG4gICAgVVRNX0NvbnRlbnQ6IHBGQVtcInV0bV9jb250ZW50XCJdIHx8IGdldENvb2tpZShcImF0cl9sYXN0VVRNX0NvbnRlbnRcIikgfHwgZ2V0Q29va2llKFwiYXRyX2ZpcnN0VVRNX0NvbnRlbnRcIikgfHwgXCJcIixcbiAgICBVVE1fVGVybTogcEZBW1widXRtX3Rlcm1cIl0gfHwgZ2V0Q29va2llKFwiYXRyX2xhc3RVVE1fVGVybVwiKSB8fCBnZXRDb29raWUoXCJhdHJfZmlyc3RVVE1fVGVybVwiKSB8fCBcIlwiXG4gIH07XG4gIHZhciBhVkV2ZXJ5ID0gW1wiQ3VzdG9tMVwiLCBcIkN1c3RvbTNcIiwgXCJDdXN0b200XCIsIFwiQ3VzdG9tNVwiLCBcIkdBX0lEXCIsIFwiR0NMSURcIl07XG4gIGlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZihcImF0cjFfc2Vzc2lvblZhbHNTdG9yZXM9XCIpID09IC0xICYmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJ1dG1cIikgIT0gLTEgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZ2NsaWRcIikgIT0gLTEgfHwgZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJfZmJwPVwiKSAhPSAtMSB8fCBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIl9mYmM9XCIpICE9IC0xIHx8IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiX2djbF9hdz1cIikgIT0gLTEpKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gXCJhdHIxX3Nlc3Npb25WYWxzU3RvcmVzPXRydWU7IGV4cGlyZXM9MDsgZG9tYWluPS5zaXRlYmF5Lm9yZzsgcGF0aD0vXCI7XG4gICAgaWYgKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiYXRyMV9maXJzdFNvdXJjZT1cIikgPT0gLTEpIHtcbiAgICAgIGZvciAoa2V5IGluIGFWKSB7XG4gICAgICAgIGlmIChhVi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgc2V0Q29va2llKFwiYXRyX2ZpcnN0XCIsIGtleSwgYVZba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldENvb2tpZShcImF0cjFfZmlyc3RcIiwgXCJTb3VyY2VcIiwgXCJ0cnVlXCIpO1xuICAgICAgZG9jdW1lbnQuY29va2llID0gXCJhdHIxX2lzRmlyc3Q9dHJ1ZTsgZXhwaXJlcz0wOyBkb21haW49LnNpdGViYXkub3JnOyBwYXRoPS9cIjtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gYVYpIHtcbiAgICAgIGlmIChhVi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHNldENvb2tpZShcImF0cl9sYXN0XCIsIGtleSwgYVZba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoaSA9IDA7IGkgPCBhVkV2ZXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJhdHIxX2ZpcnN0U291cmNlPVwiKSA9PSAtMSB8fCBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcImF0cjFfaXNGaXJzdD1cIikgIT0gLTEpIHtcbiAgICAgICAgc2V0Q29va2llKFwiYXRyX2ZpcnN0XCIsIGFWRXZlcnlbaV0sIGFWW2FWRXZlcnlbaV1dKTtcbiAgICAgIH1cbiAgICAgIHNldENvb2tpZShcImF0cl9sYXN0XCIsIGFWRXZlcnlbaV0sIGFWW2FWRXZlcnlbaV1dKTtcbiAgICB9XG4gIH1cbiAgdmFyIGtleTtcbiAgdmFyIGk7XG59KSgpO1xuXG47XG4oKCkgPT4ge1xuICAvLyBzcmMvanMvTWFpbi9tYWluLW1lbnUuanNcbiAgdmFyICRodG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIik7XG4gIHZhciAkaGVhZGVyO1xuICB2YXIgbW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jLXNpdGUtaGVhZGVyXCIpO1xuICAgIGlmICghJGhlYWRlcikgcmV0dXJuO1xuICAgIGJpbmRFdmVudHMoKTtcbiAgICBzZXRBY3RpdmVNZW51SXRlbSgpO1xuICB9O1xuICB2YXIgc2V0U2Nyb2xsWSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tc2l0ZS1zY3JvbGwteVwiLCB3aW5kb3cuc2Nyb2xsWSArIFwicHhcIik7XG4gIH07XG4gIHZhciBiaW5kRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBzZXRTY3JvbGxZKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0U2Nyb2xsWSgpO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzZXRTY3JvbGxZKTtcbiAgICAkaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b2dnbGU6b25cIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHNldEh0bWxTY3JvbGxTdGF0ZShmYWxzZSk7XG4gICAgfSk7XG4gICAgJGhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwidG9nZ2xlOm9mZlwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgc2V0SHRtbFNjcm9sbFN0YXRlKHRydWUpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgJGhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGl2ZVwiKS5mb3JFYWNoKCgkaXRlbSkgPT4gJGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XG4gICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgICAgc2V0SHRtbFNjcm9sbFN0YXRlKHRydWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICB2YXIgc2V0QWN0aXZlTWVudUl0ZW0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudF9wYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIGlmIChcIi9cIiA9PT0gY3VycmVudF9wYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjdXJyZW50X3BhdGgubWF0Y2goL15cXC9jb21tdW5pdHlcXC9xdWVzdGlvbnNcXC8uKy8pKSB7XG4gICAgICBjdXJyZW50X3BhdGggPSBcIi9jb21tdW5pdHkvcXVlc3Rpb25zL1wiO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudF9wYXRoLm1hdGNoKC9eXFwvZG9jc1xcLy4rLykpIHtcbiAgICAgIGN1cnJlbnRfcGF0aCA9IFwiL2RvY3MvXCI7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50X3BhdGgubWF0Y2goL15cXC9ibG9nfG1hcmtldHBsYWNlXFwvLisvKSkge1xuICAgICAgY3VycmVudF9wYXRoID0gY3VycmVudF9wYXRoLnJlcGxhY2UoL15cXC8oW15cXC9dKylcXC8uKy8sIFwiLyQxL1wiKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRfcGF0aC5tYXRjaCgvXlxcL2V2ZW50XFwvLisvKSkge1xuICAgICAgY3VycmVudF9wYXRoID0gXCIvZXZlbnRzL1wiO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudF9wYXRoLm1hdGNoKC9eXFwvY29udGVudHxjb250ZW50LXR5cGV8ZmVhdHVyaW5nfHNlcmllc1xcLy4rLykpIHtcbiAgICAgIGN1cnJlbnRfcGF0aCA9IFwiL2NvbnRlbnQvXCI7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50X3BhdGgubWF0Y2goL15cXC9tZWRpYVxcLWNvdmVyYWdlfHByZXNzXFwtcmVsZWFzZVxcLy4rLykpIHtcbiAgICAgIGN1cnJlbnRfcGF0aCA9IFwiL2NvbXBhbnkvcHJlc3MvXCI7XG4gICAgfVxuICAgIHZhciAkY3VycmVudF9saW5rcyA9ICRoZWFkZXIucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlIGEuby1tZW51X19saW5rW2hyZWYqPVwiJyArIGN1cnJlbnRfcGF0aCArICdcIicpO1xuICAgIGlmICghJGN1cnJlbnRfbGlua3MpIHJldHVybjtcbiAgICBBcnJheS5mcm9tKCRjdXJyZW50X2xpbmtzKS5mb3JFYWNoKCgkbGluaykgPT4ge1xuICAgICAgaWYgKCEkbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLnNwbGl0KC9bPyNdLylbMF0uZW5kc1dpdGgoY3VycmVudF9wYXRoKSkgcmV0dXJuO1xuICAgICAgJGxpbmsuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XG4gICAgICBjb25zdCAkc3ViX21lbnUgPSAkbGluay5jbG9zZXN0KFwiLmMtc3VibWVudVwiKTtcbiAgICAgIGlmIChudWxsID09PSAkc3ViX21lbnUpIHJldHVybjtcbiAgICAgIGNvbnN0ICR0cmlnZ2VyX2xpbmtzID0gJGhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBgOnNjb3BlIFtkYXRhLXRvZ2dsZT1cIiMkeyRzdWJfbWVudS5pZH1cIl1gXG4gICAgICApO1xuICAgICAgQXJyYXkuZnJvbSgkdHJpZ2dlcl9saW5rcykuZm9yRWFjaCgoJHRyaWdnZXIpID0+ICR0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpKTtcbiAgICB9KTtcbiAgfTtcbiAgdmFyIHNldEh0bWxTY3JvbGxTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgJGh0bWwuc3R5bGUub3ZlcmZsb3cgPSBzdGF0ZSA/IFwiXCIgOiBcImhpZGRlblwiO1xuICB9O1xuICBpZiAoISRodG1sLmNsYXNzTGlzdC5jb250YWlucyhcImZsLWJ1aWxkZXItZWRpdFwiKSkge1xuICAgIG1vdW50KCk7XG4gIH1cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInR1cmJvbGlua3M6cmVuZGVyXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbW91bnQoKTtcbiAgfSk7XG5cbiAgLy8gc3JjL2pzL01haW4vaGFuZGxlLWZldGNoLWVycm9ycy5qc1xuICBmdW5jdGlvbiBoYW5kbGVGZXRjaEVycm9ycyhyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c1RleHQpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJSZXNvdXJjZSBub3QgZm91bmRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IFwiUHJvYmxlbSBmZXRjaGluZyByZXNvdXJjZVwiO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Vycm9yTWVzc2FnZX0gKCR7cmVzcG9uc2UudXJsfSlgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgLy8gc3JjL2pzL01haW4vaTE4bi5qc1xuICB2YXIgbGFuZ3VhZ2VzID0gW1wiZGVcIiwgXCJlc1wiLCBcImZyXCIsIFwiaXRcIiwgXCJqYVwiLCBcImtvXCIsIFwicHQtYnJcIiwgXCJwdFwiLCBcInpoXCJdO1xuICBmdW5jdGlvbiBnZXRMYW5ndWFnZVN0cmluZygpIHtcbiAgICBsZXQgbGFuZyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nO1xuICAgIGlmIChsYW5nICYmIGxhbmd1YWdlcy5pbmNsdWRlcyhsYW5nKSkge1xuICAgICAgcmV0dXJuIGxhbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNyYy9qcy9NYWluL3NhZmUtaHRtbC5qc1xuICBmdW5jdGlvbiBzYWZlSFRNTChpbnB1dCwgYWxsb3dfdGFncyA9IFtcImJcIiwgXCJiclwiLCBcImVtXCIsIFwiaVwiLCBcInNwYW5cIiwgXCJzdHJvbmdcIiwgXCJ1XCJdKSB7XG4gICAgbGV0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG1wLnRleHRDb250ZW50ID0gaW5wdXQ7XG4gICAgbGV0IG91dHB1dCA9IHRtcC5pbm5lckhUTUw7XG4gICAgbGV0IGFsbG93X3JlZ2V4ID0gbmV3IFJlZ0V4cChgJmx0OygvPygke2FsbG93X3RhZ3Muam9pbihcInxcIil9KSkmZ3Q7YCwgXCJnaVwiKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZShhbGxvd19yZWdleCwgXCI8JDE+XCIpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvLyBzcmMvanMvTWFpbi9oZWFkZXItZmVhdHVyZWQuanNcbiAgdmFyICRodG1sMjtcbiAgdmFyIG1vdW50MiA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGFwaV91cmwgPSBcImh0dHBzOi8vd3d3LnNpdGViYXkub3JnL3dwLWpzb24vc2l0ZWJheS92MS9oZWFkZXItZmVhdHVyZWRcIiwgbGFuZyA9IGdldExhbmd1YWdlU3RyaW5nKCk7XG4gICAgLy9pZiAobGFuZykge1xuICAgIC8vICBhcGlfdXJsID0gYGh0dHBzOi8vd3d3LnNpdGViYXkub3JnLyR7bGFuZ30vd3AtanNvbi9zaXRlYmF5L3YxL2hlYWRlci1mZWF0dXJlZD9sYW5nPSR7bGFuZ31gO1xuICAgIC8vfVxuICAgIGZldGNoKGFwaV91cmwpLnRoZW4oaGFuZGxlRmV0Y2hFcnJvcnMpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpLnRoZW4oKGRhdGEpID0+IHVwZGF0ZURPTShkYXRhKSkuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICB9O1xuICB2YXIgdXBkYXRlRE9NID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgbGV0ICRzbG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtc2l0ZS1oZWFkZXIgW2RhdGEtZmVhdHVyZWQ9XCInICsgaXRlbS5zbG90ICsgJ1wiXScpO1xuICAgICAgaWYgKCEkc2xvdCkgcmV0dXJuO1xuICAgICAgbGV0ICRmZWF0dXJlID0gZ2VuZXJhdGVGZWF0dXJlKGl0ZW0pO1xuICAgICAgaWYgKCEkZmVhdHVyZSkgcmV0dXJuO1xuICAgICAgd2hpbGUgKCRzbG90LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgJHNsb3QucmVtb3ZlQ2hpbGQoJHNsb3QuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICAkc2xvdC5hcHBlbmRDaGlsZCgkZmVhdHVyZSk7XG4gICAgfSk7XG4gIH07XG4gIHZhciBnZW5lcmF0ZUltYWdlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCAkaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAkaW1nLnNyYyA9IGRhdGEuc3JjO1xuICAgICRpbWcud2lkdGggPSBkYXRhLndpZHRoO1xuICAgICRpbWcuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgJGltZy5sb2FkaW5nID0gXCJsYXp5XCI7XG4gICAgJGltZy5mZXRjaFByaW9yaXR5ID0gXCJsb3dcIjtcbiAgICBpZiAoZGF0YS5hbHQpIHtcbiAgICAgICRpbWcuYWx0ID0gZGF0YS5hbHQ7XG4gICAgfVxuICAgIGlmIChkYXRhLnNyY3NldCkge1xuICAgICAgJGltZy5zcmNzZXQgPSBkYXRhLnNyY3NldDtcbiAgICB9XG4gICAgaWYgKGRhdGEuc2l6ZXMpIHtcbiAgICAgICRpbWcuc2l6ZXMgPSBkYXRhLnNpemVzO1xuICAgIH1cbiAgICByZXR1cm4gJGltZztcbiAgfTtcbiAgdmFyIGdlbmVyYXRlRmVhdHVyZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgJGJhc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCAkaDYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDZcIiksICRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIiksICR0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgJGhlYWRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgJGV4Y2VycHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCAkYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksICRzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAkaDYudGV4dENvbnRlbnQgPSBkYXRhLmV5ZWJyb3c7XG4gICAgJGEuY2xhc3NMaXN0LmFkZChcImMtZmVhdHVyZWRcIik7XG4gICAgJGEuaWQgPSBgYy1mZWF0dXJlZC0tJHtkYXRhLnNsb3R9YDtcbiAgICAkYS5ocmVmID0gZGF0YS5saW5rX3VybDtcbiAgICAkYS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBkYXRhLndyYXBfc3R5bGVzKTtcbiAgICAkYS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFuYWx5dGljcy1ldmVudFwiLCBgJHtkYXRhLmdhX2NhdGVnb3J5fSB8ICR7ZGF0YS5nYV9hY3Rpb259IHwgJHtkYXRhLmdhX2xhYmVsfWApO1xuICAgICR0ZXh0LmNsYXNzTGlzdC5hZGQoXCJjLWZlYXR1cmVkX190ZXh0XCIpO1xuICAgICRoZWFkbGluZS5jbGFzc0xpc3QuYWRkKFwiYy1mZWF0dXJlZF9faGVhZGxpbmVcIik7XG4gICAgJGhlYWRsaW5lLmlubmVySFRNTCA9IHNhZmVIVE1MKGRhdGEuaGVhZGxpbmUpO1xuICAgICRleGNlcnB0LmNsYXNzTGlzdC5hZGQoXCJjLWZlYXR1cmVkX19leGNlcnB0XCIpO1xuICAgICRleGNlcnB0LmlubmVySFRNTCA9IGRhdGEuZXhjZXJwdDtcbiAgICAkYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjLWZlYXR1cmVkX19idXR0b25cIik7XG4gICAgJGJ1dHRvbi50ZXh0Q29udGVudCA9IGRhdGEubGlua190ZXh0O1xuICAgICRzdHlsZS50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgICRzdHlsZS50ZXh0Q29udGVudCA9IGRhdGEuY3NzO1xuICAgICR0ZXh0LmFwcGVuZENoaWxkKCRoZWFkbGluZSk7XG4gICAgJHRleHQuYXBwZW5kQ2hpbGQoJGV4Y2VycHQpO1xuICAgICR0ZXh0LmFwcGVuZENoaWxkKCRidXR0b24pO1xuICAgIGlmIChkYXRhLmJhY2tncm91bmRfaW1hZ2Uuc3JjKSB7XG4gICAgICBsZXQgJGJnID0gZ2VuZXJhdGVJbWFnZShkYXRhLmJhY2tncm91bmRfaW1hZ2UpO1xuICAgICAgJGJnLmNsYXNzTGlzdC5hZGQoXCJjLWZlYXR1cmVkX19iYWNrZ3JvdW5kXCIpO1xuICAgICAgJGEuYXBwZW5kQ2hpbGQoJGJnKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuZm9yZWdyb3VuZF9pbWFnZS5zcmMpIHtcbiAgICAgIGxldCAkZmcgPSBnZW5lcmF0ZUltYWdlKGRhdGEuZm9yZWdyb3VuZF9pbWFnZSk7XG4gICAgICAkZmcuY2xhc3NMaXN0LmFkZChcImMtZmVhdHVyZWRfX2ltYWdlXCIpO1xuICAgICAgJGEuYXBwZW5kQ2hpbGQoJGZnKTtcbiAgICB9XG4gICAgJGEuYXBwZW5kQ2hpbGQoJHRleHQpO1xuICAgICRiYXNlLmFwcGVuZENoaWxkKCRoNik7XG4gICAgJGJhc2UuYXBwZW5kQ2hpbGQoJGEpO1xuICAgICRiYXNlLmFwcGVuZENoaWxkKCRzdHlsZSk7XG4gICAgcmV0dXJuICRiYXNlO1xuICB9O1xuICB2YXIgJGh0bWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIik7XG4gIGlmICghJGh0bWwyLmNsYXNzTGlzdC5jb250YWlucyhcImZsLWJ1aWxkZXItZWRpdFwiKSkge1xuICAgIG1vdW50MigpO1xuICB9XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJib2xpbmtzOnJlbmRlclwiLCBmdW5jdGlvbihldmVudCkge1xuICAgIG1vdW50MigpO1xuICB9KTtcblxuICAvLyBzcmMvanMvTWFpbi9zd2l0Y2hlci5qc1xuICB2YXIgJGh0bWwzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIik7XG4gIHZhciBtb3VudDMgPSBmdW5jdGlvbigpIHtcbiAgICBiaW5kRXZlbnRzMigpO1xuICB9O1xuICB2YXIgYmluZEV2ZW50czIgPSBmdW5jdGlvbigpIHtcbiAgICAkaHRtbDMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrKTtcbiAgfTtcbiAgdmFyIGhhbmRsZUNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGNvbnN0ICR0cmlnZ2VyID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLXRvZ2dsZV1cIik7XG4gICAgaWYgKG51bGwgPT09ICR0cmlnZ2VyKSByZXR1cm47XG4gICAgaWYgKG51bGwgIT09IGUudGFyZ2V0LmNsb3Nlc3QoXCJmb3JtXCIpKSByZXR1cm47XG4gICAgY29uc3QgJHRhcmdldCA9ICR0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlID8gJGh0bWwzLnF1ZXJ5U2VsZWN0b3IoJHRyaWdnZXIuZGF0YXNldC50b2dnbGUpIDogJHRyaWdnZXI7XG4gICAgaWYgKG51bGwgPT09ICR0YXJnZXQpIHJldHVybjtcbiAgICBjb25zdCAkYW5jaG9yID0gZS50YXJnZXQuY2xvc2VzdChcImFcIik7XG4gICAgaWYgKCRhbmNob3IpIHtcbiAgICAgIGlmICgkYW5jaG9yID09PSAkdHJpZ2dlcikge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCAkdXJsID0gbmV3IFVSTCgkYW5jaG9yLmdldEF0dHJpYnV0ZShcImhyZWZcIikpO1xuICAgICAgICBpZiAoJHVybCAmJiAkdXJsLnBhdGhuYW1lICE9PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHJldHVybjtcbiAgICAgICAgJGFuY2hvci5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRvZ2dsZSgkdGFyZ2V0LCAkdHJpZ2dlcik7XG4gIH07XG4gIHZhciB0b2dnbGUgPSBmdW5jdGlvbigkdGFyZ2V0LCAkdHJpZ2dlcikge1xuICAgIGNvbnN0IHRhcmdldF9hY3RpdmUgPSAkdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSwgZ3JvdXAgPSAkdGFyZ2V0LmRhdGFzZXQuZ3JvdXAsICRhY3RpdmUgPSBncm91cCA/ICRodG1sMy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ncm91cD1cIicgKyBncm91cCArICdcIl0uYWN0aXZlJykgOiBudWxsLCB0b2dnbGVfZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICBcInRvZ2dsZTpcIiArICh0YXJnZXRfYWN0aXZlID8gXCJvZmZcIiA6IFwib25cIiksXG4gICAgICB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgIH1cbiAgICApO1xuICAgIGlmICgkYWN0aXZlKSB7XG4gICAgICAkYWN0aXZlLmZvckVhY2goKCRpdGVtKSA9PiAkaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcbiAgICB9XG4gICAgaWYgKCF0YXJnZXRfYWN0aXZlKSB7XG4gICAgICAkdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAkdHJpZ2dlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkdHJpZ2dlci5ibHVyKCk7XG4gICAgfVxuICAgICR0YXJnZXQuZGlzcGF0Y2hFdmVudCh0b2dnbGVfZXZlbnQpO1xuICB9O1xuICBpZiAoISRodG1sMy5jbGFzc0xpc3QuY29udGFpbnMoXCJmbC1idWlsZGVyLWVkaXRcIikpIHtcbiAgICBtb3VudDMoKTtcbiAgfVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidHVyYm9saW5rczpyZW5kZXJcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBtb3VudDMoKTtcbiAgfSk7XG5cbiAgLy8gc3JjL2pzL01haW4vY29uc2VudC5qc1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoJ2FbaHJlZio9XCIjb3Blbi1jb25zZW50LXByZWZzXCJdJykgfHwgZS50YXJnZXQubWF0Y2hlcyhcInNwYW4jb3Blbi1jb25zZW50LXByZWZzXCIpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5PbmVUcnVzdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cuT25lVHJ1c3QuVG9nZ2xlSW5mb0Rpc3BsYXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAhZnVuY3Rpb24odCxlKXt2YXIgbyxuLHAscjtlLl9fU1Z8fCh3aW5kb3cucG9zdGhvZz1lLGUuX2k9W10sZS5pbml0PWZ1bmN0aW9uKGkscyxhKXtmdW5jdGlvbiBnKHQsZSl7dmFyIG89ZS5zcGxpdChcIi5cIik7Mj09by5sZW5ndGgmJih0PXRbb1swXV0sZT1vWzFdKSx0W2VdPWZ1bmN0aW9uKCl7dC5wdXNoKFtlXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApKSl9fShwPXQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkudHlwZT1cInRleHQvamF2YXNjcmlwdFwiLHAuY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIixwLmFzeW5jPSEwLHAuc3JjPXMuYXBpX2hvc3QucmVwbGFjZShcIi5pLnBvc3Rob2cuY29tXCIsXCItYXNzZXRzLmkucG9zdGhvZy5jb21cIikrXCIvc3RhdGljL2FycmF5LmpzXCIsKHI9dC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXSkucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocCxyKTt2YXIgdT1lO2Zvcih2b2lkIDAhPT1hP3U9ZVthXT1bXTphPVwicG9zdGhvZ1wiLHUucGVvcGxlPXUucGVvcGxlfHxbXSx1LnRvU3RyaW5nPWZ1bmN0aW9uKHQpe3ZhciBlPVwicG9zdGhvZ1wiO3JldHVyblwicG9zdGhvZ1wiIT09YSYmKGUrPVwiLlwiK2EpLHR8fChlKz1cIiAoc3R1YilcIiksZX0sdS5wZW9wbGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdS50b1N0cmluZygxKStcIi5wZW9wbGUgKHN0dWIpXCJ9LG89XCJpbml0IGNhcHR1cmUgcmVnaXN0ZXIgcmVnaXN0ZXJfb25jZSByZWdpc3Rlcl9mb3Jfc2Vzc2lvbiB1bnJlZ2lzdGVyIHVucmVnaXN0ZXJfZm9yX3Nlc3Npb24gZ2V0RmVhdHVyZUZsYWcgZ2V0RmVhdHVyZUZsYWdQYXlsb2FkIGlzRmVhdHVyZUVuYWJsZWQgcmVsb2FkRmVhdHVyZUZsYWdzIHVwZGF0ZUVhcmx5QWNjZXNzRmVhdHVyZUVucm9sbG1lbnQgZ2V0RWFybHlBY2Nlc3NGZWF0dXJlcyBvbiBvbkZlYXR1cmVGbGFncyBvblNlc3Npb25JZCBnZXRTdXJ2ZXlzIGdldEFjdGl2ZU1hdGNoaW5nU3VydmV5cyByZW5kZXJTdXJ2ZXkgY2FuUmVuZGVyU3VydmV5IGdldE5leHRTdXJ2ZXlTdGVwIGlkZW50aWZ5IHNldFBlcnNvblByb3BlcnRpZXMgZ3JvdXAgcmVzZXRHcm91cHMgc2V0UGVyc29uUHJvcGVydGllc0ZvckZsYWdzIHJlc2V0UGVyc29uUHJvcGVydGllc0ZvckZsYWdzIHNldEdyb3VwUHJvcGVydGllc0ZvckZsYWdzIHJlc2V0R3JvdXBQcm9wZXJ0aWVzRm9yRmxhZ3MgcmVzZXQgZ2V0X2Rpc3RpbmN0X2lkIGdldEdyb3VwcyBnZXRfc2Vzc2lvbl9pZCBnZXRfc2Vzc2lvbl9yZXBsYXlfdXJsIGFsaWFzIHNldF9jb25maWcgc3RhcnRTZXNzaW9uUmVjb3JkaW5nIHN0b3BTZXNzaW9uUmVjb3JkaW5nIHNlc3Npb25SZWNvcmRpbmdTdGFydGVkIGNhcHR1cmVFeGNlcHRpb24gbG9hZFRvb2xiYXIgZ2V0X3Byb3BlcnR5IGdldFNlc3Npb25Qcm9wZXJ0eSBjcmVhdGVQZXJzb25Qcm9maWxlIG9wdF9pbl9jYXB0dXJpbmcgb3B0X291dF9jYXB0dXJpbmcgaGFzX29wdGVkX2luX2NhcHR1cmluZyBoYXNfb3B0ZWRfb3V0X2NhcHR1cmluZyBjbGVhcl9vcHRfaW5fb3V0X2NhcHR1cmluZyBkZWJ1ZyBnZXRQYWdlVmlld0lkXCIuc3BsaXQoXCIgXCIpLG49MDtuPG8ubGVuZ3RoO24rKylnKHUsb1tuXSk7ZS5faS5wdXNoKFtpLHMsYV0pfSxlLl9fU1Y9MSl9KGRvY3VtZW50LHdpbmRvdy5wb3N0aG9nfHxbXSk7XG4gIHBvc3Rob2cuaW5pdCgnc1RNRlBzRmhkUDFTc2cnLCB7XG4gICAgICBhcGlfaG9zdDogJ2h0dHBzOi8vbXkuc2l0ZWJheS5vcmcnLFxuICAgICAgcGVyc29uX3Byb2ZpbGVzOiAnYWx3YXlzJyxcbiAgfSlcbn0pKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLEdBQUMsTUFBTTtBQUVMLGFBQVMsVUFBVSxHQUFHLEdBQUc7QUFDdkIsYUFBTyxTQUFTLElBQUksT0FBTyxXQUFXLG1CQUFtQixDQUFDLElBQUksVUFBVSxFQUFFLEtBQUssU0FBUyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSTtBQUFBLElBQzVIO0FBQ0EsYUFBUyxVQUFVLFdBQVcsWUFBWSxhQUFhO0FBQ3JELFVBQUksS0FBSztBQUNULGVBQVMsU0FBUyxZQUFZLGFBQWEsTUFBTSxjQUFjO0FBQUEsSUFDakU7QUFDQSxRQUFJLG1CQUFtQixXQUFXO0FBQ2hDLFVBQUksSUFBSSxPQUFPLFNBQVMsT0FBTyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ25ELGFBQU8sRUFBRSxRQUFRLElBQUksT0FBTyx3QkFBd0IsR0FBRyxHQUFHLFNBQVMsSUFBSSxHQUFHLEdBQUcsR0FBRztBQUM5RSxVQUFFLENBQUMsSUFBSTtBQUFBLE1BQ1QsQ0FBQyxHQUFHO0FBQUEsSUFDTjtBQUNBLFFBQUksTUFBTSxpQkFBaUI7QUFDM0IsUUFBSSxLQUFLO0FBQUEsTUFDUCxXQUFXLE9BQU8sU0FBUyxVQUFVLFVBQVUsbUJBQW1CLEtBQUs7QUFBQSxNQUN2RSxPQUFPLFVBQVUsS0FB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
