(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb2, mod) => function __require() {
    return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/helpers/lru.js
  var require_lru = __commonJS({
    "ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/helpers/lru.js"(exports, module) {
      !function(g, f) {
        if (typeof exports == "object" && typeof module != "undefined") {
          f(exports);
        } else if (typeof define == "function" && define.amd) {
          define(["exports"], f);
        } else {
          f((g = g || self)["lru_map"] = g["lru_map"] || {});
        }
      }(exports, function(exports2) {
        const NEWER = Symbol("newer");
        const OLDER = Symbol("older");
        class LRUMap3 {
          constructor(limit, entries) {
            if (typeof limit !== "number") {
              entries = limit;
              limit = 0;
            }
            this.size = 0;
            this.limit = limit;
            this.oldest = this.newest = void 0;
            this._keymap = /* @__PURE__ */ new Map();
            if (entries) {
              this.assign(entries);
              if (limit < 1) {
                this.limit = this.size;
              }
            }
          }
          _markEntryAsUsed(entry) {
            if (entry === this.newest) {
              return;
            }
            if (entry[NEWER]) {
              if (entry === this.oldest) {
                this.oldest = entry[NEWER];
              }
              entry[NEWER][OLDER] = entry[OLDER];
            }
            if (entry[OLDER]) {
              entry[OLDER][NEWER] = entry[NEWER];
            }
            entry[NEWER] = void 0;
            entry[OLDER] = this.newest;
            if (this.newest) {
              this.newest[NEWER] = entry;
            }
            this.newest = entry;
          }
          assign(entries) {
            let entry, limit = this.limit || Number.MAX_VALUE;
            this._keymap.clear();
            let it = entries[Symbol.iterator]();
            for (let itv = it.next(); !itv.done; itv = it.next()) {
              let e = new Entry(itv.value[0], itv.value[1]);
              this._keymap.set(e.key, e);
              if (!entry) {
                this.oldest = e;
              } else {
                entry[NEWER] = e;
                e[OLDER] = entry;
              }
              entry = e;
              if (limit-- == 0) {
                throw new Error("overflow");
              }
            }
            this.newest = entry;
            this.size = this._keymap.size;
          }
          get(key) {
            var entry = this._keymap.get(key);
            if (!entry) return;
            this._markEntryAsUsed(entry);
            return entry.value;
          }
          set(key, value) {
            var entry = this._keymap.get(key);
            if (entry) {
              entry.value = value;
              this._markEntryAsUsed(entry);
              return this;
            }
            this._keymap.set(key, entry = new Entry(key, value));
            if (this.newest) {
              this.newest[NEWER] = entry;
              entry[OLDER] = this.newest;
            } else {
              this.oldest = entry;
            }
            this.newest = entry;
            ++this.size;
            if (this.size > this.limit) {
              this.shift();
            }
            return this;
          }
          shift() {
            var entry = this.oldest;
            if (entry) {
              if (this.oldest[NEWER]) {
                this.oldest = this.oldest[NEWER];
                this.oldest[OLDER] = void 0;
              } else {
                this.oldest = void 0;
                this.newest = void 0;
              }
              entry[NEWER] = entry[OLDER] = void 0;
              this._keymap.delete(entry.key);
              --this.size;
              return [entry.key, entry.value];
            }
          }
          // -------------------------------------------------------------------------------------
          // Following code (until end of class definition) is optional and can be removed without
          // breaking the core functionality.
          find(key) {
            let e = this._keymap.get(key);
            return e ? e.value : void 0;
          }
          has(key) {
            return this._keymap.has(key);
          }
          delete(key) {
            var entry = this._keymap.get(key);
            if (!entry) return;
            this._keymap.delete(entry.key);
            if (entry[NEWER] && entry[OLDER]) {
              entry[OLDER][NEWER] = entry[NEWER];
              entry[NEWER][OLDER] = entry[OLDER];
            } else if (entry[NEWER]) {
              entry[NEWER][OLDER] = void 0;
              this.oldest = entry[NEWER];
            } else if (entry[OLDER]) {
              entry[OLDER][NEWER] = void 0;
              this.newest = entry[OLDER];
            } else {
              this.oldest = this.newest = void 0;
            }
            this.size--;
            return entry.value;
          }
          clear() {
            this.oldest = this.newest = void 0;
            this.size = 0;
            this._keymap.clear();
          }
          keys() {
            return new KeyIterator(this.oldest);
          }
          values() {
            return new ValueIterator(this.oldest);
          }
          entries() {
            return this;
          }
          [Symbol.iterator]() {
            return new EntryIterator(this.oldest);
          }
          forEach(fun, thisObj) {
            if (typeof thisObj !== "object") {
              thisObj = this;
            }
            let entry = this.oldest;
            while (entry) {
              fun.call(thisObj, entry.value, entry.key, this);
              entry = entry[NEWER];
            }
          }
          /** Returns a JSON (array) representation */
          toJSON() {
            var s = new Array(this.size), i = 0, entry = this.oldest;
            while (entry) {
              s[i++] = { key: entry.key, value: entry.value };
              entry = entry[NEWER];
            }
            return s;
          }
          /** Returns a String representation */
          toString() {
            var s = "", entry = this.oldest;
            while (entry) {
              s += String(entry.key) + ":" + entry.value;
              entry = entry[NEWER];
              if (entry) {
                s += " < ";
              }
            }
            return s;
          }
        }
        exports2.LRUMap = LRUMap3;
        function Entry(key, value) {
          this.key = key;
          this.value = value;
          this[NEWER] = void 0;
          this[OLDER] = void 0;
        }
        function EntryIterator(oldestEntry) {
          this.entry = oldestEntry;
        }
        EntryIterator.prototype[Symbol.iterator] = function() {
          return this;
        };
        EntryIterator.prototype.next = function() {
          let ent = this.entry;
          if (ent) {
            this.entry = ent[NEWER];
            return { done: false, value: [ent.key, ent.value] };
          } else {
            return { done: true, value: void 0 };
          }
        };
        function KeyIterator(oldestEntry) {
          this.entry = oldestEntry;
        }
        KeyIterator.prototype[Symbol.iterator] = function() {
          return this;
        };
        KeyIterator.prototype.next = function() {
          let ent = this.entry;
          if (ent) {
            this.entry = ent[NEWER];
            return { done: false, value: ent.key };
          } else {
            return { done: true, value: void 0 };
          }
        };
        function ValueIterator(oldestEntry) {
          this.entry = oldestEntry;
        }
        ValueIterator.prototype[Symbol.iterator] = function() {
          return this;
        };
        ValueIterator.prototype.next = function() {
          let ent = this.entry;
          if (ent) {
            this.entry = ent[NEWER];
            return { done: false, value: ent.value };
          } else {
            return { done: true, value: void 0 };
          }
        };
      });
    }
  });

  // ns-params:@params
  var params_exports = {};
  __export(params_exports, {
    default: () => params_default,
    file_issue_button: () => file_issue_button,
    is_production: () => is_production,
    is_test: () => is_test,
    page_title_suffix: () => page_title_suffix,
    search_cachewarmer_urls: () => search_cachewarmer_urls,
    search_config: () => search_config,
    weglot_api_key: () => weglot_api_key
  });
  var file_issue_button = { enable: false, issue_templates: [{ id: "issue-template-1.yml", title: "Report a problem" }, { id: "issue-template-2.yml", title: "Report something else" }], repo_url: "https://github.com/bep/githubissuestest" };
  var is_production = false;
  var is_test = true;
  var page_title_suffix = "sitebay Docs";
  var search_cachewarmer_urls = { api: "/docs/cachewarmers/sections/api.json", "api > ": "/docs/cachewarmers/sections/api_.json", "api > account": "/docs/cachewarmers/sections/api_account.json", "api > application_password": "/docs/cachewarmers/sections/api_application_password.json", "api > event": "/docs/cachewarmers/sections/api_event.json", "api > invite": "/docs/cachewarmers/sections/api_invite.json", "api > plan": "/docs/cachewarmers/sections/api_plan.json", "api > region": "/docs/cachewarmers/sections/api_region.json", "api > site_live": "/docs/cachewarmers/sections/api_site_live.json", "api > team": "/docs/cachewarmers/sections/api_team.json", "api > template": "/docs/cachewarmers/sections/api_template.json", "api > ticket": "/docs/cachewarmers/sections/api_ticket.json", "api > utils": "/docs/cachewarmers/sections/api_utils.json", bundles: "/docs/cachewarmers/sections/bundles.json", "bundles > sitebay-management": "/docs/cachewarmers/sections/bundles_sitebay-management.json", content: "/docs/cachewarmers/sections/content.json", "explorer-blank": "/docs/cachewarmers/global/explorer-blank.json", guides: "/docs/cachewarmers/sections/guides.json", "guides > cloudflare": "/docs/cachewarmers/sections/guides_cloudflare.json", "guides > cloudflare > get-started": "/docs/cachewarmers/sections/guides_cloudflare_get-started.json", "guides > common-problems": "/docs/cachewarmers/sections/guides_common-problems.json", "guides > databases": "/docs/cachewarmers/sections/guides_databases.json", "guides > databases > algolia": "/docs/cachewarmers/sections/guides_databases_algolia.json", "guides > databases > mysql": "/docs/cachewarmers/sections/guides_databases_mysql.json", "guides > development": "/docs/cachewarmers/sections/guides_development.json", "guides > development > php": "/docs/cachewarmers/sections/guides_development_php.json", "guides > development > tips-and-tricks": "/docs/cachewarmers/sections/guides_development_tips-and-tricks.json", "guides > generative-ai": "/docs/cachewarmers/sections/guides_generative-ai.json", "guides > kubernetes": "/docs/cachewarmers/sections/guides_kubernetes.json", "guides > platform": "/docs/cachewarmers/sections/guides_platform.json", "guides > platform > manager": "/docs/cachewarmers/sections/guides_platform_manager.json", "guides > quick-answers": "/docs/cachewarmers/sections/guides_quick-answers.json", "guides > quick-answers > sitebay": "/docs/cachewarmers/sections/guides_quick-answers_sitebay.json", "guides > quick-answers > sitebay-essentials": "/docs/cachewarmers/sections/guides_quick-answers_sitebay-essentials.json", "guides > quick-answers > websites": "/docs/cachewarmers/sections/guides_quick-answers_websites.json", "guides > security": "/docs/cachewarmers/sections/guides_security.json", "guides > security > basics": "/docs/cachewarmers/sections/guides_security_basics.json", "guides > security > monitoring": "/docs/cachewarmers/sections/guides_security_monitoring.json", "guides > security > recovery": "/docs/cachewarmers/sections/guides_security_recovery.json", "guides > security > vulnerabilities": "/docs/cachewarmers/sections/guides_security_vulnerabilities.json", "guides > tools-reference": "/docs/cachewarmers/sections/guides_tools-reference.json", "guides > tools-reference > basics": "/docs/cachewarmers/sections/guides_tools-reference_basics.json", "guides > tools-reference > tools": "/docs/cachewarmers/sections/guides_tools-reference_tools.json", "guides > troubleshooting": "/docs/cachewarmers/sections/guides_troubleshooting.json", "guides > websites": "/docs/cachewarmers/sections/guides_websites.json", "guides > websites > quickies": "/docs/cachewarmers/sections/guides_websites_quickies.json", "guides > wordpress": "/docs/cachewarmers/sections/guides_wordpress.json", platform: "/docs/cachewarmers/sections/platform.json", "platform > api": "/docs/cachewarmers/sections/platform_api.json", "platform > billing-and-support": "/docs/cachewarmers/sections/platform_billing-and-support.json", "platform > get-started": "/docs/cachewarmers/sections/platform_get-started.json", "platform > git-sync": "/docs/cachewarmers/sections/platform_git-sync.json", "platform > migrate-to-sitebay": "/docs/cachewarmers/sections/platform_migrate-to-sitebay.json", "platform > monitoring": "/docs/cachewarmers/sections/platform_monitoring.json", "platform > recording": "/docs/cachewarmers/sections/platform_recording.json", "platform > shopify": "/docs/cachewarmers/sections/platform_shopify.json", "platform > templates": "/docs/cachewarmers/sections/platform_templates.json", products: "/docs/cachewarmers/sections/products.json", "products > code-server": "/docs/cachewarmers/sections/products_code-server.json", "products > git-sync": "/docs/cachewarmers/sections/products_git-sync.json", "products > platform": "/docs/cachewarmers/sections/products_platform.json", "products > platform > accounts": "/docs/cachewarmers/sections/products_platform_accounts.json", "products > platform > accounts > guides": "/docs/cachewarmers/sections/products_platform_accounts_guides.json", "products > platform > billing": "/docs/cachewarmers/sections/products_platform_billing.json", "products > platform > billing > guides": "/docs/cachewarmers/sections/products_platform_billing_guides.json", "products > platform > get-started": "/docs/cachewarmers/sections/products_platform_get-started.json", "products > platform > get-started > guides": "/docs/cachewarmers/sections/products_platform_get-started_guides.json", "products > posthog": "/docs/cachewarmers/sections/products_posthog.json", "products > shopify-link": "/docs/cachewarmers/sections/products_shopify-link.json", "products > site-bot": "/docs/cachewarmers/sections/products_site-bot.json", "products > templates": "/docs/cachewarmers/sections/products_templates.json", "products > time-machine": "/docs/cachewarmers/sections/products_time-machine.json", "products > tools": "/docs/cachewarmers/sections/products_tools.json", sectionsmeta: "/docs/cachewarmers/global/sectionsmeta.json", templates: "/docs/cachewarmers/sections/templates.json" };
  var search_config = { api_key: "149b346e18683fc205d94bfe2d4e03de", app_id: "VJRR3OCA19", click_analytics: true, explorer_max_leafnodes: 50, hits_per_page: 10, index_prefix: "", meta_index: "sitebay-documentation-sections", recommendations: { api_key: "149b346e18683fc205d94bfe2d4e03de", app_id: "VJRR3OCA19", target_index: "sitebay-merged" }, sections: { api: { explorer_icon: "#icon-explorer--api", filters: "section.lvl0:api", index: "sitebay-documentation-api", name: "api", title: "API", weight: 40 }, blog: { explorer_icon: "#icon-explorer--blog", filters: "section.lvl0:Blog", name: "blog", noun: "Post", seo_title_template: "sitebay Blog | sitebay", seo_title_template_category: "sitebay Blog | {category} | sitebay", title: "Blog", weight: 50 }, community: { explorer_icon: "#icon-explorer--qa", filters: "objectType:question", name: "community", noun: "Q&A", title: "Q&A", weight: 70 }, guides: { explorer_icon: "#icon-explorer--guides", filters: "section.lvl0:guides", name: "guides", noun: "Guide", title: "Guides & Tutorials", weight: 10 }, "marketplace-docs": { explorer_icon: "#icon-explorer--marketplace", filters: "section.lvl0:marketplace-docs", name: "marketplace-docs", noun: "Marketplace", title: "Marketplace Docs", weight: 25 }, products: { explorer_icon: "#icon-explorer--products", filters: "section.lvl0:products", name: "products", noun: "Product Guide", title: "Products", weight: 35 }, "reference-architecture": { explorer_icon: "#icon-explorer--reference-architecture", filters: "section.lvl0:guides", name: "reference-architecture", noun: "Reference", title: "References", weight: 20 }, resources: { explorer_icon: "#icon-explorer--resources", filters: "section.lvl0:Resources", name: "resources", noun: "Content Resource", seo_title_template: "Cloud Computing Resources | sitebay", seo_title_template_category: "Cloud Computing {category} | sitebay", title: "Content Resources", weight: 60 } }, sections_merged: { filtering_facets: [{ name: "docType", title: "Doc Type" }, { name: "category", title: "Category" }, { isTags: true, name: "tags", title: "Tags" }], hits_per_page: 20, index: "sitebay-merged", index_by_pubdate: "sitebay-merged-sorted", name: "merged", noun: "All", title: "All" } };
  var weglot_api_key = "wg_3b3ef29c81aa81292c64d1368ee318969";
  var params_default = { file_issue_button, is_production, is_test, page_title_suffix, search_cachewarmer_urls, search_config, weglot_api_key };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/gohugoio/hugo-mod-jslibs-dist/alpinejs/v3/packages/alpinejs/dist/module.esm.js
  var flushPending = false;
  var flushing = false;
  var queue = [];
  var lastFlushedIndex = -1;
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex)
      queue.splice(index, 1);
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
      lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
  }
  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup2 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(() => {
      let value = getter();
      JSON.stringify(value);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    });
    return () => release(effectReference);
  }
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        // Allows events to pass the shadow DOM barrier.
        composed: true,
        cancelable: true
      })
    );
  }
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
  }
  var started = false;
  function start() {
    if (started)
      warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  var initInterceptors = [];
  function interceptInit(callback) {
    initInterceptors.push(callback);
  }
  function initTree(el, walker = walk, intercept = () => {
  }) {
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        intercept(el2, skip);
        initInterceptors.forEach((i) => i(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root, walker = walk) {
    walker(root, (el) => {
      cleanupAttributes(el);
      cleanupElement(el);
    });
  }
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === void 0 || names.includes(name)) {
        value.forEach((i) => i());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  function cleanupElement(el) {
    if (el._x_cleanups) {
      while (el._x_cleanups.length)
        el._x_cleanups.pop()();
    }
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var queuedMutations = [];
  function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(() => records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(() => {
      if (queuedMutations.length === queueLengthWhenTriggered) {
        while (queuedMutations.length > 0)
          queuedMutations.shift()();
      }
    });
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  var isCollecting = false;
  var deferredMutations = [];
  function deferMutations() {
    isCollecting = true;
  }
  function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
  }
  function onMutate(mutations) {
    if (isCollecting) {
      deferredMutations = deferredMutations.concat(mutations);
      return;
    }
    let addedNodes = /* @__PURE__ */ new Set();
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.add(node));
        mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.add(node));
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.has(node))
        continue;
      onElRemoveds.forEach((i) => i(node));
      destroyTree(node);
    }
    addedNodes.forEach((node) => {
      node._x_ignoreSelf = true;
      node._x_ignore = true;
    });
    for (let node of addedNodes) {
      if (removedNodes.has(node))
        continue;
      if (!node.isConnected)
        continue;
      delete node._x_ignoreSelf;
      delete node._x_ignore;
      onElAddeds.forEach((i) => i(node));
      node._x_ignore = true;
      node._x_ignoreSelf = true;
    }
    addedNodes.forEach((node) => {
      delete node._x_ignoreSelf;
      delete node._x_ignore;
    });
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({ objects }, mergeProxyTrap);
  }
  var mergeProxyTrap = {
    ownKeys({ objects }) {
      return Array.from(
        new Set(objects.flatMap((i) => Object.keys(i)))
      );
    },
    has({ objects }, name) {
      if (name == Symbol.unscopables)
        return false;
      return objects.some(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
      );
    },
    get({ objects }, name, thisProxy) {
      if (name == "toJSON")
        return collapseProxies;
      return Reflect.get(
        objects.find(
          (obj) => Reflect.has(obj, name)
        ) || {},
        name,
        thisProxy
      );
    },
    set({ objects }, name, value, thisProxy) {
      const target = objects.find(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name)
      ) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if ((descriptor == null ? void 0 : descriptor.set) && (descriptor == null ? void 0 : descriptor.get))
        return Reflect.set(target, name, value, thisProxy);
      return Reflect.set(target, name, value);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }
  function initInterceptors2(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === void 0)
          return;
        if (typeof value === "object" && value !== null && value.__v_skip)
          return;
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback]) => {
      let memoizedUtilities = null;
      function getUtilities() {
        if (memoizedUtilities) {
          return memoizedUtilities;
        } else {
          let [utilities, cleanup2] = getElementBoundUtilities(el);
          memoizedUtilities = __spreadValues({ interceptor }, utilities);
          onElRemoved(el, cleanup2);
          return memoizedUtilities;
        }
      }
      Object.defineProperty(obj, `$${name}`, {
        get() {
          return callback(el, getUtilities());
        },
        enumerable: false
      });
    });
    return {
      obj,
      cleanup: () => {
        el = null;
      }
    };
  }
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      handleError(e, el, expression);
    }
  }
  function handleError(error2, el, expression = void 0) {
    error2 = Object.assign(
      error2 != null ? error2 : { message: "No error message given." },
      { el, expression }
    );
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    let cleanup2 = injectMagics(overriddenMagics, el).cleanup;
    onAttributeRemoved(el, "evaluator", cleanup2);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    const safeAsyncFunction = () => {
      try {
        let func2 = new AsyncFunction(
          ["__self", "scope"],
          `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
        );
        Object.defineProperty(func2, "name", {
          value: `[Alpine] ${expression}`
        });
        return func2;
      } catch (error2) {
        handleError(error2, el, expression);
        return Promise.resolve();
      }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else if (typeof value === "object" && value instanceof Promise) {
      value.then((i) => receiver(i));
    } else {
      receiver(value);
    }
  }
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
      before(directive2) {
        if (!directiveHandlers[directive2]) {
          console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
          return;
        }
        const pos = directiveOrder.indexOf(directive2);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
      }
    };
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map();
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive2, utilities);
      handler4 = handler4.bind(handler4, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {
  }) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (expression === false)
      return;
    if (!expression || typeof expression === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      "enter": (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      "leave": (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1e3;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationIn}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: `scale(1)`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationOut}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: `scale(1)`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        ;
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration" || key === "delay") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {
  }) {
    return (...args) => isCloning ? fallback(...args) : callback(...args);
  }
  function onlyDuringClone(callback) {
    return (...args) => isCloning && callback(...args);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i) => i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      initTree(to, (el, callback) => {
        callback(el, () => {
        });
      });
    });
    isCloning = false;
  }
  var isCloningLegacy = false;
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (el.type === "radio") {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      }
    } else if (el.type === "checkbox") {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value === void 0 ? "" : value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) {
      el[propName] = value;
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function safeParseBoolean(rawValue) {
    if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
      return true;
    }
    if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
      return false;
    }
    return rawValue ? Boolean(rawValue) : null;
  }
  function isBooleanAttr(attrName) {
    const booleanAttributes = [
      "disabled",
      "checked",
      "required",
      "readonly",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule"
    ];
    return booleanAttributes.includes(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback);
  }
  function extractProp(el, name, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
      let binding = el._x_inlineBindings[name];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name, fallback);
  }
  function getAttributeBinding(el, name, fallback) {
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (attr === "")
      return true;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    return attr;
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference = effect(() => {
      let outer = outerGet();
      let inner = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner));
        } else {
        }
      }
      outerHash = JSON.stringify(outerGet());
      innerHash = JSON.stringify(innerGet());
    });
    return () => {
      release(reference);
    };
  }
  function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
  }
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i) => i(alpine_default));
  }
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
    initInterceptors2(stores[name]);
  }
  function getStores() {
    return stores;
  }
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      return applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
    return () => {
    };
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    version: "3.13.8",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    setEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    // INTERNAL: not public API and is subject to change without major release.
    transition,
    // INTERNAL
    setStyles,
    // INTERNAL
    mutateDom,
    directive,
    entangle,
    throttle,
    debounce,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    // INTERNAL
    cloneNode,
    // INTERNAL
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit2 = cache[str];
      return hit2 || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol(true ? "iterate" : "");
  var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }
  function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect3);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if (true) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive2(target) {
    if (target && target[
      "__v_isReadonly"
      /* IS_READONLY */
    ]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* RAW */
    ] && !(isReadonly && target[
      "__v_isReactive"
      /* IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed[
      "__v_raw"
      /* RAW */
    ]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let getter = () => {
      let value;
      evaluate2((i) => value = i);
      return value;
    };
    let unwatch = watch(getter, callback);
    cleanup2(unwatch);
  });
  magic("store", getStores);
  magic("data", (el) => scope(el));
  magic("root", (el) => closestRoot(el));
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i) => {
      if (i._x_refs)
        refObjects.push(i._x_refs);
    });
    return refObjects;
  }
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }
  magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
    let cacheKey = `${name}${key ? `-${key}` : ""}`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
      let root = closestIdRoot(el, name);
      let id = root ? root._x_ids[name] : findAndIncrementId(name);
      return key ? `${name}-${id}-${key}` : `${name}-${id}`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }
  magic("el", (el) => el);
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val) => evaluateInnerSet(() => {
    }, { scope: { "__placeholder": val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      let releaseEntanglement = entangle(
        {
          get() {
            return outerGet();
          },
          set(value) {
            outerSet(value);
          }
        },
        {
          get() {
            return innerGet();
          },
          set(value) {
            innerSet(value);
          }
        }
      );
      cleanup2(releaseEntanglement);
    });
  });
  directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
    let placeInDom = (clone3, target2, modifiers2) => {
      if (modifiers2.includes("prepend")) {
        target2.parentNode.insertBefore(clone3, target2);
      } else if (modifiers2.includes("append")) {
        target2.parentNode.insertBefore(clone3, target2.nextSibling);
      } else {
        target2.appendChild(clone3);
      }
    };
    mutateDom(() => {
      placeInDom(clone2, target, modifiers);
      initTree(clone2);
      clone2._x_ignore = true;
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup2(() => clone2.remove());
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression}"`);
    return target;
  }
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression));
  }));
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = debounce(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.target === el && next(e);
      });
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    handler4 = wrapHandler(handler4, (next, e) => {
      if (isKeyEvent(event)) {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
      }
      next(e);
    });
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    if ([" ", "_"].includes(
      subject
    ))
      return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once", "capture"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
      let debounceIndex = keyModifiers.indexOf("throttle");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      "ctrl": "control",
      "slash": "/",
      "space": " ",
      "spacebar": " ",
      "cmd": "meta",
      "esc": "escape",
      "up": "arrow-up",
      "down": "arrow-down",
      "left": "arrow-left",
      "right": "arrow-right",
      "period": ".",
      "equal": "=",
      "minus": "-",
      "underscore": "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
    } else if (typeof expression === "function" && typeof expression() === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
    } else {
      evaluateSet = () => {
      };
    }
    let getValue = () => {
      let result;
      evaluateGet((value) => result = value);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value) => {
      let result;
      evaluateGet((value2) => result = value2);
      if (isGetterSetter(result)) {
        result.set(value);
      } else {
        evaluateSet(() => {
        }, {
          scope: { "__placeholder": value }
        });
      }
    };
    if (typeof expression === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? () => {
    } : on(el, event, modifiers, (e) => {
      setValue(getInputValue(el, modifiers, e, getValue()));
    });
    if (modifiers.includes("fill")) {
      if ([void 0, null, ""].includes(getValue()) || el.type === "checkbox" && Array.isArray(getValue())) {
        setValue(
          getInputValue(el, modifiers, { target: el }, getValue())
        );
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e) => {
        nextTick(() => el._x_model && el._x_model.set(el.value));
      });
      cleanup2(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value) {
        setValue(value);
      }
    };
    el._x_forceModelUpdate = (value) => {
      if (value === void 0 && typeof expression === "string" && expression.match(/\./))
        value = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value));
      delete window.fromModel;
    };
    effect3(() => {
      let value = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== void 0)
        return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
      else if (el.type === "checkbox") {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option) => {
          return option.value || option.text;
        });
      } else {
        let newValue;
        if (el.type === "radio") {
          if (event.target.checked) {
            newValue = event.target.value;
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = event.target.value;
        }
        if (modifiers.includes("number")) {
          return safeParseNumber(newValue);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(newValue);
        } else if (modifiers.includes("trim")) {
          return newValue.trim();
        } else {
          return newValue;
        }
      }
    });
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate2(expression, {}, false);
    }
    return evaluate2(expression, {}, false);
  }));
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
      return;
    }
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value, result, modifiers));
    }));
    cleanup2(() => {
      el._x_undoAddedClasses && el._x_undoAddedClasses();
      el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
  };
  handler2.inline = (el, { value, modifiers, expression }) => {
    if (!value)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value] = { expression, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    let cleanup1 = injectMagics(magicContext, el).cleanup;
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    if (data2 === void 0 || data2 === true)
      data2 = {};
    let cleanup22 = injectMagics(data2, el).cleanup;
    let reactiveData = reactive(data2);
    initInterceptors2(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(() => {
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
      cleanup1();
      cleanup22();
    });
  });
  interceptClone((from, to) => {
    if (from._x_dataStack) {
      to._x_dataStack = from._x_dataStack;
      to.setAttribute("data-has-alpine-state", true);
    }
  });
  function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning)
      return false;
    if (isCloningLegacy)
      return true;
    return el.hasAttribute("data-has-alpine-state");
  }
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once(
      (value) => value ? show() : hide(),
      (value) => {
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
          el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
        } else {
          value ? clickAwayCompatibleShow() : hide();
        }
      }
    );
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(
      el,
      // the x-bind:key expression is stored for our use instead of evaluated.
      el._x_keyExpression || "index"
    );
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => el2.remove());
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => {
            if (keys.includes(value2))
              warn("Duplicate key on x-for", el);
            keys.push(value2);
          }, { scope: __spreadValues({ index: key }, scope2) });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => {
            if (keys.includes(value))
              warn("Duplicate key on x-for", el);
            keys.push(value);
          }, { scope: __spreadValues({ index: i }, scope2) });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        if (!!lookup[key]._x_effects) {
          lookup[key]._x_effects.forEach(dequeueJob);
        }
        lookup[key].remove();
        lookup[key] = null;
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value]) => {
            reactiveScope[key2] = value;
          });
        };
        mutateDom(() => {
          lastEl.after(clone2);
          skipDuringClone(() => initTree(clone2))();
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0; i < sames.length; i++) {
        lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler3() {
  }
  handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler3);
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        walk(clone2, (node) => {
          if (!!node._x_effects) {
            node._x_effects.forEach(dequeueJob);
          }
        });
        clone2.remove();
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });
  directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { "$event": e }, params: [e] });
    });
    cleanup2(() => removeListener());
  }));
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;
  var module_default = src_default;

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/gohugoio/hugo-mod-jslibs-dist/alpinejs/v3/packages/intersect/dist/module.esm.js
  function src_default2(Alpine2) {
    Alpine2.directive("intersect", Alpine2.skipDuringClone((el, { value, expression, modifiers }, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
      let evaluate2 = evaluateLater2(expression);
      let options = {
        rootMargin: getRootMargin(modifiers),
        threshold: getThreshold(modifiers)
      };
      let observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === (value === "leave"))
            return;
          evaluate2();
          modifiers.includes("once") && observer2.disconnect();
        });
      }, options);
      observer2.observe(el);
      cleanup2(() => {
        observer2.disconnect();
      });
    }));
  }
  function getThreshold(modifiers) {
    if (modifiers.includes("full"))
      return 0.99;
    if (modifiers.includes("half"))
      return 0.5;
    if (!modifiers.includes("threshold"))
      return 0;
    let threshold = modifiers[modifiers.indexOf("threshold") + 1];
    if (threshold === "100")
      return 1;
    if (threshold === "0")
      return 0;
    return Number(`.${threshold}`);
  }
  function getLengthValue(rawValue) {
    let match = rawValue.match(/^(-?[0-9]+)(px|%)?$/);
    return match ? match[1] + (match[2] || "px") : void 0;
  }
  function getRootMargin(modifiers) {
    const key = "margin";
    const fallback = "0px 0px 0px 0px";
    const index = modifiers.indexOf(key);
    if (index === -1)
      return fallback;
    let values = [];
    for (let i = 1; i < 5; i++) {
      values.push(getLengthValue(modifiers[index + i] || ""));
    }
    values = values.filter((v) => v !== void 0);
    return values.length ? values.join(" ").trim() : fallback;
  }
  var module_default2 = src_default2;

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/gohugoio/hugo-mod-jslibs-dist/alpinejs/v3/packages/persist/dist/module.esm.js
  function src_default3(Alpine2) {
    let persist = () => {
      let alias;
      let storage;
      try {
        storage = localStorage;
      } catch (e) {
        console.error(e);
        console.warn("Alpine: $persist is using temporary storage since localStorage is unavailable.");
        let dummy = /* @__PURE__ */ new Map();
        storage = {
          getItem: dummy.get.bind(dummy),
          setItem: dummy.set.bind(dummy)
        };
      }
      return Alpine2.interceptor((initialValue, getter, setter, path, key) => {
        let lookup = alias || `_x_${path}`;
        let initial = storageHas(lookup, storage) ? storageGet(lookup, storage) : initialValue;
        setter(initial);
        Alpine2.effect(() => {
          let value = getter();
          storageSet(lookup, value, storage);
          setter(value);
        });
        return initial;
      }, (func) => {
        func.as = (key) => {
          alias = key;
          return func;
        }, func.using = (target) => {
          storage = target;
          return func;
        };
      });
    };
    Object.defineProperty(Alpine2, "$persist", { get: () => persist() });
    Alpine2.magic("persist", persist);
    Alpine2.persist = (key, { get: get3, set: set3 }, storage = localStorage) => {
      let initial = storageHas(key, storage) ? storageGet(key, storage) : get3();
      set3(initial);
      Alpine2.effect(() => {
        let value = get3();
        storageSet(key, value, storage);
        set3(value);
      });
    };
  }
  function storageHas(key, storage) {
    return storage.getItem(key) !== null;
  }
  function storageGet(key, storage) {
    let value = storage.getItem(key, storage);
    if (value === void 0)
      return;
    return JSON.parse(value);
  }
  function storageSet(key, value, storage) {
    storage.setItem(key, JSON.stringify(value));
  }
  var module_default3 = src_default3;

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/alpine-turbo-bridge.js
  function bridgeTurboAndAlpine(Alpine2) {
    document.addEventListener("turbo:before-render", (event) => {
      event.detail.newBody.querySelectorAll("[data-alpine-generated]").forEach((el) => {
        if (el.hasAttribute("data-alpine-generated")) {
          el.removeAttribute("data-alpine-generated");
          el.remove();
        }
      });
    });
    document.addEventListener("turbo:render", () => {
      if (document.documentElement.hasAttribute("data-turbo-preview")) {
        return;
      }
      document.querySelectorAll("[data-alpine-ignored]").forEach((el) => {
        el.removeAttribute("x-ignore");
        el.removeAttribute("data-alpine-ignored");
      });
      document.body.querySelectorAll("[x-data]").forEach((el) => {
        if (el.hasAttribute("data-turbo-permanent")) {
          return;
        }
        Alpine2.initTree(el);
      });
      Alpine2.startObservingMutations();
    });
    document.addEventListener("turbo:before-cache", () => {
      Alpine2.stopObservingMutations();
      document.body.querySelectorAll("[data-turbo-permanent]").forEach((el) => {
        if (!el.hasAttribute("x-ignore")) {
          el.setAttribute("x-ignore", true);
          el.setAttribute("data-alpine-ignored", true);
        }
      });
      document.body.querySelectorAll("[x-for],[x-if],[x-teleport]").forEach((el) => {
        if (el.hasAttribute("x-for") && el._x_lookup) {
          Object.values(el._x_lookup).forEach((el2) => el2.setAttribute("data-alpine-generated", true));
        }
        if (el.hasAttribute("x-if") && el._x_currentIfEl) {
          el._x_currentIfEl.setAttribute("data-alpine-generated", true);
        }
        if (el.hasAttribute("x-teleport") && el._x_teleport) {
          el._x_teleport.setAttribute("data-alpine-generated", true);
        }
      });
      document.body.querySelectorAll("[x-data]").forEach((el) => {
        if (!el.hasAttribute("data-turbo-permanent")) {
          Alpine2.destroyTree(el);
          let clone2 = el.cloneNode(true);
          el.replaceWith(clone2);
        }
      });
    });
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/components/disqus.js
  var debug = 0 ? console.log.bind(console, "[disqus]") : function() {
  };
  var reset = function(page) {
    debug("reset", page);
    DISQUS.reset({
      reload: true,
      config: function() {
        this.page.identifier = page.permalink;
        this.page.url = page.permalink;
        this.page.title = page.title;
        this.language = "en";
      }
    });
  };
  var loadScript = function(shortName) {
    const scriptID = "disqus-embed";
    var script = document.getElementById(scriptID);
    if (script) {
      script.setAttribute("data-timestamp", +/* @__PURE__ */ new Date());
      return false;
    }
    script = document.createElement("script");
    script.src = `//${shortName}.disqus.com/embed.js`;
    script.setAttribute("id", scriptID);
    {
      script.setAttribute("data-timestamp", +/* @__PURE__ */ new Date());
    }
    script.async = true;
    (document.head || document.body).appendChild(script);
    return true;
  };
  function newDisqus(disqusShortname, page) {
    window.disqus_shortname = disqusShortname;
    window.disqus_identifier = page.permalink;
    window.disqus_url = page.permalink;
    window.disqus_config = function() {
      this.language = "en";
    };
    return {
      page,
      // Avoid using the name init(), which is also automatically invoked by AlpineJS.
      // We need to call it explicitly to make it run after AlpineJS has updated the DOM.
      initDisqus: function() {
        this.$nextTick(() => {
          if (!loadScript(disqusShortname)) {
            reset(this.page);
          }
        });
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/components/dropdowns.js
  var debug2 = 0 ? console.log.bind(console, "[dropdowns]") : function() {
  };
  function newDropdownsController(dropdowns) {
    return {
      dropdowns,
      toggleOpen: function(idx) {
        let wasOpen = this.dropdowns[idx].open;
        this.dropdowns[idx].open = !wasOpen;
        if (wasOpen) {
          return;
        }
        for (let i in dropdowns) {
          if (i != idx) {
            this.dropdowns[i].open = false;
          }
        }
      },
      closeAll: function() {
        this.dropdowns.forEach((e) => {
          e.open = false;
        });
      },
      isOpen: function(idx) {
        return this.dropdowns[idx].open;
      },
      isHidden: function(idx) {
        return this.dropdowns[idx].hidden;
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/components/svg.js
  var debug3 = 0 ? console.log.bind(console, "[svg]") : function() {
  };
  function alpineRegisterDirectiveSVG(Alpine2) {
    Alpine2.directive("svg", (el, { expression }, { effect: effect3, cleanup: cleanup2, evaluateLater: evaluateLater2 }) => {
      let evaluate2 = evaluateLater2(expression);
      effect3(() => {
        evaluate2((src) => {
          if (!src) {
            return "";
          }
          if (src.includes("<svg")) {
            replaceIn(el, src);
            return;
          }
          if (src.startsWith("http")) {
            createImgEl(el, src);
            return;
          }
          if (!src.endsWith("svg")) {
            replaceIn(el, "");
            return;
          }
          fetch(src).then((response) => response.text()).then((response) => {
            const str = response;
            if (str.indexOf("svg") === -1) {
              return;
            }
            replaceIn(el, str);
          }).catch((e) => {
            console.warn(e);
          });
        });
      });
    });
    const replaceIn = function(el, str) {
      let newEl;
      if (str) {
        let template = document.createElement("template");
        template.innerHTML = str;
        newEl = template.content.querySelector("svg");
      }
      if (!newEl) {
        newEl = document.createElement("div");
      }
      newEl.setAttribute("ln-created-by-me", "");
      let clazz = el.getAttribute("class");
      newEl.setAttribute("class", clazz);
      el.replaceWith(newEl);
    };
    const createImgEl = function(el, str) {
      let img = document.createElement("img");
      let clazz = el.getAttribute("class");
      img.setAttribute("class", clazz);
      img.setAttribute("src", str);
      el.replaceWith(img);
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/helpers/helpers.js
  function setDocumentMeta(meta) {
    document.title = meta.title;
  }
  function toggleBooleanClass(baseClass, el, truthy) {
    const is = `is-${baseClass}`;
    const isNot = `is-not-${baseClass}`;
    if (truthy) {
      if (el.classList.contains(isNot)) {
        el.classList.remove(isNot);
      }
      el.classList.add(is);
    } else {
      if (el.classList.contains(is)) {
        el.classList.remove(is);
      }
      el.classList.add(isNot);
    }
  }
  function normalizeSpace(text) {
    return text.replace(/\s\s+/g, " ");
  }
  function sanitizeHTML(text) {
    var element = document.createElement("div");
    element.innerText = text;
    return element.innerHTML;
  }
  function toDateString(date) {
    var year = date.getFullYear().toString().substr(-2);
    var month2 = date.getMonth() + 1;
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    return sprintf("%s/%s/%s", month2, day, year);
  }
  function sprintf(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    var i = 0;
    return format.replace(/%s/g, function() {
      return args[i++];
    });
  }
  function getScrollLeft(parent, child) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    if (childRect.left >= parentRect.left && childRect.right <= parentRect.right) {
      return 0;
    }
    return childRect.left - parentRect.left;
  }
  function scrollToActiveExplorerNode() {
    const id = "explorer";
    if (window.scrollHandledByClick && window.scrollHandledByClick[id]) {
      delete window.scrollHandledByClick[id];
      return;
    }
    let explorer = document.getElementById(id);
    if (!explorer) {
      return;
    }
    let retries = [0, 500, 1e3, 2e3];
    let isDone = false;
    for (let i = 0; i < retries.length; i++) {
      if (isDone) {
        return;
      }
      let sleep = retries[i];
      setTimeout(function() {
        if (isDone) {
          return;
        }
        let target = document.querySelector(".explorer--active .is-active-page");
        if (!target) {
          let explorerNodes = document.querySelectorAll(".explorer--active .explorer-node-open:last-child");
          if (explorerNodes.length > 0) {
            target = explorerNodes[explorerNodes.length - 1];
          }
        }
        if (!target) {
          return;
        }
        let offset = getOffsetTop(explorer, target);
        if (!offset) {
          return;
        }
        isDone = true;
        explorer.scroll({ top: offset - 20, behavior: "smooth" });
      }, sleep);
    }
  }
  function getOffsetTop(container, el) {
    let offset = 0;
    while (el && el != container) {
      offset += el.offsetTop;
      el = el.offsetParent;
    }
    return offset;
  }
  function setIsTranslating(el, timeout = 1e3) {
    let currentLang = getCurrentLang();
    if (!currentLang || currentLang == "en") {
      return;
    }
    let els = isIterable(el) ? el : [el];
    els.forEach((el2) => {
      el2.classList.add("is-translating");
    });
    setTimeout(function() {
      els.forEach((el2) => {
        el2.classList.remove("is-translating");
      });
    }, timeout);
  }
  function getCurrentLang() {
    let lang = getCurrentLangFromLocation();
    if (lang) {
      return lang;
    }
    return JSON.parse(localStorage.getItem("_x_currentLang"));
  }
  var validLangs = ["en", "es"];
  function getCurrentLangFromLocation() {
    let lang = new URLSearchParams(window.location.search).get("lang");
    if (validLangs.includes(lang)) {
      return lang;
    }
    return "";
  }
  function getIntParamFromLocation(param) {
    let value = new URLSearchParams(window.location.search).get(param);
    if (value) {
      return parseInt(value, 10);
    }
    return 0;
  }
  function isIterable(obj) {
    return Symbol.iterator in Object(obj);
  }
  function isMobile() {
    return document.documentElement.clientWidth < 768;
  }
  function isDesktop() {
    return isScreenLargerThan(1279);
  }
  function isScreenLargerThan(px) {
    return document.documentElement.clientWidth > px;
  }
  function isTouchDevice() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }
  function updatePaginationParamInLocation(pageKey2, pageNum, firstPage = 1) {
    let url = new URL(window.location);
    url.hash = "";
    if (pageNum == firstPage) {
      url.searchParams.delete(pageKey2);
    } else {
      url.searchParams.set(pageKey2, pageNum);
    }
    window.history.replaceState({ turbo: {} }, "", url);
  }
  var month = 30 * 24 * 60 * 60 * 1e3;
  function setCookie(name, value, duration = month) {
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + duration);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  function getCookie(name) {
    const prefix2 = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(prefix2) === 0) {
        return c.substring(prefix2.length, c.length);
      }
    }
    return "";
  }
  function supportsCookies() {
    try {
      return Boolean(navigator.cookieEnabled);
    } catch (e) {
      return false;
    }
  }
  function createUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/components/magic-helpers.js
  function alpineRegisterMagicHelpers(Alpine2) {
    Alpine2.magic("copy", (currentEl) => {
      return function(el) {
        if (!el) {
          el = currentEl;
        }
        let lntds = el.querySelectorAll(".lntable .lntd");
        if (lntds && lntds.length === 2) {
          el = lntds[1];
        }
        navigator.clipboard.writeText(el.textContent);
      };
    });
    Alpine2.magic("isScrollX", (currentEl) => {
      return function(el) {
        if (!el) {
          el = currentEl;
        }
        return el.clientWidth < el.scrollWidth;
      };
    });
    Alpine2.magic("isMobile", (currentEl) => {
      return function() {
        return isMobile();
      };
    });
    Alpine2.magic("isDesktop", (currentEl) => {
      return function() {
        return isDesktop();
      };
    });
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/components/tabs.js
  var debug4 = 0 ? console.log.bind(console, "[tabs]") : function() {
  };
  function newTabsController() {
    return {
      tabs: {
        ids: [],
        active: 0
      },
      // Ordinal for all the tabs components on a page. Used for debugging.
      ordinal: 0,
      // Top position of the tabs element when clicked.
      topPos: 0,
      updateActive(init = false) {
        let tabsEl = this.$refs.tabs;
        let tabsNavEl = this.$refs.tabsNav;
        let oldActive = this.tabs.active;
        let newActive = 0;
        let tabsState = this.$store.nav.tabs;
        let activeSet = false;
        this.tabs.ids.forEach((id, index) => {
          if (tabsState.active[id]) {
            newActive = index;
            activeSet = true;
          }
        });
        if (!activeSet && this.tabs.ids.length > 0) {
          tabsState.active[this.tabs.ids[0]] = true;
        }
        this.tabs.active = newActive;
        this.tabs.ids.forEach((id, index) => {
          let isActive = index === newActive;
          let tabContentEl = this.$refs["tabs-content-" + index];
          if (isActive) {
            let tabEl = this.$refs["tab-" + index];
            tabsNavEl.style.overflowX = "hidden";
            let scrollLeft = getScrollLeft(tabsNavEl, tabEl);
            if (scrollLeft) {
              tabsNavEl.scrollLeft = scrollLeft;
            }
            tabsNavEl.style.overflowX = "auto";
          }
          tabContentEl.style.display = isActive ? "" : "none";
        });
        if (init) {
          return;
        }
        if (this.ordinal == 0 || this.ordinal != tabsState.ordinal) {
          return;
        }
        let topPosAfter = tabsEl.getBoundingClientRect().top;
        let diff = topPosAfter - this.topPos;
        if (diff) {
          window.scrollBy(0, diff);
        }
      },
      initTabs(ordinal) {
        this.ordinal = ordinal;
        this.$nextTick(() => {
          this.$watch("$store.nav.tabs.counter", () => {
            this.updateActive();
          });
          this.updateActive(true);
        });
      },
      initTab(id) {
        if (this.ordinal == 0) {
          debug4("initTab", id);
        }
        this.tabs.ids.push(id);
      },
      isActive: function(ordinal) {
        return this.tabs.active === ordinal;
      },
      setActive: function(ordinal) {
        if (this.ordinal == 0) {
          debug4("setActive", ordinal);
        }
        this.clickedTab = ordinal;
        if (this.tabs.active === ordinal) {
          return;
        }
        let tabsEl = this.$refs.tabs;
        this.topPos = tabsEl.getBoundingClientRect().top;
        let tabsState = this.$store.nav.tabs;
        tabsState.ordinal = this.ordinal;
        let id = this.tabs.ids[ordinal];
        if (id) {
          this.tabs.ids.forEach((id2) => {
            tabsState.active[id2] = id === id2;
          });
          tabsState.counter = this.$store.nav.tabs.counter + 1;
        }
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/helpers/leak-checker.js
  function leackChecker(Alpine2) {
    weakRefs = /* @__PURE__ */ new Set();
    weakSet = /* @__PURE__ */ new WeakSet();
    return {
      selector: "[x-data]",
      active: 0,
      dirty: 0,
      add: function(el) {
        weakRefs.add(new WeakRef(el));
        weakSet.add(el);
      },
      listAllive: function() {
        this.dirty++;
        let allive = [];
        weakRefs.forEach((ref) => {
          let el = ref.deref();
          if (el !== void 0) {
            allive.push(`${el.localName}#${el.id}/${el.classList}`);
          }
        });
        return allive;
      },
      clear: function() {
        weakRefs.clear();
        this.active = 0;
        weakSet = /* @__PURE__ */ new WeakSet();
      },
      trackComponents: function(selector = "[x-data]") {
        console.log(`Track Components for leak detection using selector ${selector}...`);
        document.body.querySelectorAll(selector).forEach((el) => {
          if (el.id === "leack-checker" || el.hasAttribute("data-turbo-permanent")) {
            return;
          }
          this.add(el);
        });
      },
      replaceBody() {
        Alpine2.deferMutations();
        let newBody = document.body.cloneNode(true);
        newBody.replaceChildren(this.$root.cloneNode(true));
        document.body.replaceWith(newBody);
        Alpine2.flushAndStopDeferringMutations();
      },
      // Running Chrome with these flags will expose a gc() method that is very useful.
      // /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --js-flags="--expose-gc" --enable-memory-info
      runGC() {
        console.log("Run Garbage Collection...");
        if (!window.gc) {
          throw `window.gc() not available; you need to enable that in Chrome, e.g. /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --js-flags="--expose-gc" --enable-memory-info`;
        }
        window.gc();
        setTimeout(() => {
          console.log("Check Leaks...");
          this.active = this.listAllive().length;
          console.dir(weakSet);
        }, 2e3);
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/create-href.js
  var debug5 = 0 ? console.log.bind(console, "[router]") : function() {
  };
  function newCreateHref(searchConfig2) {
    if (!searchConfig2) {
      throw "newCreateHref: must provide searchConfig";
    }
    const SECTIONS_BASEPATH = "/docs/";
    return {
      sectionsFromPath: function() {
        let pathname = decodeURIComponent(window.location.pathname).replace(/^\/|\/$/g, "");
        pathname = sanitizeHTML(pathname);
        let sections = pathname.split("/").slice(1);
        return sections;
      },
      hrefSection: function(key) {
        let parts = key.split(" > ");
        if (parts.length > 1 && parts[0] === "taxonomies") {
          parts = parts.slice(1);
        }
        return `${SECTIONS_BASEPATH}${parts.join("/").toLowerCase()}/`;
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/breadcrumbs.js
  var debug6 = 0 ? console.log.bind(console, "[breadcrumbs]") : function() {
  };
  function newBreadcrumbsController(searchConfig2) {
    if (!searchConfig2) {
      throw "newBreadcrumbsController: must provide searchConfig";
    }
    const hrefFactory = newCreateHref(searchConfig2);
    return {
      data: {
        breadcrumbs: {
          sections: []
        }
      },
      breadCrumbsCreated: false,
      init: function() {
        this.$nextTick(() => {
          this.$store.search.withBlank((result) => {
            let parts = hrefFactory.sectionsFromPath();
            let sections = [];
            let sectionKeys = [];
            for (let i = 0; i < parts.length; i++) {
              let section = parts[i];
              sectionKeys.push(section.toLowerCase());
              let key = sectionKeys.join(" > ");
              let sm = result.getSectionMeta(key);
              if (sm) {
                sections.push(sm);
              } else {
                sections.length = 0;
                break;
              }
            }
            this.data.breadcrumbs.sections = sections;
          });
        });
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/search/request.ts
  var newRequestCallbackFactories = function() {
    return [];
  };
  var newRequestCallback = function(request, callback, meta) {
    return {
      request,
      callback,
      meta,
      isFiltered: function() {
        if (!meta || !meta.query) {
          return false;
        }
        return meta.query.isFiltered();
      },
      getFileCacheID: function() {
        if (!meta) {
          return "";
        }
        return meta.fileCacheID;
      }
    };
  };
  var newRequestCallbackFactoryTarget = function(factory, target) {
    return {
      factory,
      target
    };
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/explorer.js
  var debug7 = 0 ? console.log.bind(console, "[explorer-node]") : function() {
  };
  var debugDev = 0 ? console.log.bind(console, "[explorer-node-dev]") : function() {
  };
  var explorerCommon = {
    isOpen: function() {
      return this.$store.nav.open.explorer;
    },
    closeIfMobile: function() {
      if (this.$store.nav.open.explorer && isMobile()) {
        this.$store.nav.open.explorer = false;
      }
    },
    activateHydration: function(permanent = true) {
      this.$store.search.explorer.showHydratedExplorer = true;
      if (permanent) {
        this.$store.search.explorer.showAlwaysHydratedExplorer = permanent;
      }
    }
  };
  function newSearchExplorerInitial() {
    return __spreadProps(__spreadValues({}, explorerCommon), {
      // Keep track of sidebar sections to prevent duplication
      processedSections: /* @__PURE__ */ new Set(),
      onClickStaticLeafNode: function(e, href, objectID) {
        debug7("onClickStaticLeafNode", href, objectID);
        let hit2 = {
          objectID: objectID || href
        };
        this.$store.nav.analytics.handler.clickHit(hit2, "DOCS: Explorer");
      },
      onClickStaticBranchNode: function(e, href, objectID, key) {
        debug7("onClickStaticBranchNode", href, key);
        let hit2 = {
          objectID: objectID || href
        };
        if (key && (key.toLowerCase() === "api" || key.toLowerCase() === "products")) {
          this.processedSections.add(key.toLowerCase());
        }
        this.$store.nav.analytics.handler.clickHit(hit2, "DOCS: Explorer");
      },
      // Move to a hydrated version of the explorer tree.
      // key is the node that triggered this.
      // Open was that node's open state when the event was triggered.
      hydrateAndSwitchOpenStateForKey(key, open) {
        debug7("hydrateAndSwitchOpenStateForKey", key, open);
        if (key && (key.toLowerCase() === "api" || key.toLowerCase() === "products")) {
          this.processedSections.add(key.toLowerCase());
        }
        this.$store.search.explorer.keyOpenStack.push({ key, open });
        if (this.processedSections.size > 0) {
          this.$store.search.explorer.processedSections = [...this.processedSections];
        }
      },
      onRender(e) {
        if (document.documentElement.hasAttribute("data-turbo-preview")) {
          return;
        }
        scrollToActiveExplorerNode();
      },
      shouldShowHydratedExplorer() {
        return this.$store.search.shouldShowHydratedExplorer();
      }
    });
  }
  function newSearchExplorerHydrated(searchConfig2) {
    let sectionKey = "";
    return __spreadProps(__spreadValues({}, explorerCommon), {
      // Callbacks called on onRender.
      onRenders: [],
      // Explorer state.
      explorer: {
        // The top level nodes.
        rootNodes: [],
        // Sorted by href.
        facets: []
      },
      isActive: function() {
        return this.isOpen() && this.$store.search.shouldShowHydratedExplorerAndIsHydrated();
      },
      init: async function() {
        debug7("newSearchExplorerHydrated.init");
        const handleKeyOpenStack = () => {
          let stack = this.$store.search.explorer.keyOpenStack;
          debug7("handleKeyOpenStack", stack.length);
          if (!stack.length) {
            return;
          }
          let nn = stack.pop();
          let open = !nn.open;
          let n = this.explorer.facets.find((n2) => n2.key === nn.key);
          if (n && n.open != open) {
            n.open = open;
            if (open) {
              openNodeAndCloseTheOthers(n, this.explorer.facets);
            }
          }
          this.activateHydration();
        };
        this.$store.search.withExplorerData((data2) => {
          let facets = data2.blank.sectionFacets;
          let position = 0;
          facets.forEach((n) => {
            if (n.href.startsWith("/docs/guides/") || n.href.startsWith("/docs/products/")) {
              position++;
              n.hit = {
                objectID: n.href,
                __position: position
              };
            }
            n.id = n.href.replace(/\W/g, "_");
          });
          this.explorer.facets = facets;
          const apiKeys = ["api", "API"];
          const productKeys = ["products", "Products"];
          let seenApi = false;
          let seenProducts = false;
          let rootNodes = this.explorer.facets.filter(
            (n) => {
              if (n.level !== 1 || n.key === "bundles" || n.key === "community") {
                return false;
              }
              if (apiKeys.includes(n.key)) {
                if (seenApi) {
                  return false;
                }
                seenApi = true;
                return true;
              }
              if (productKeys.includes(n.key)) {
                if (seenProducts) {
                  return false;
                }
                seenProducts = true;
                return true;
              }
              return true;
            }
          );
          rootNodes.forEach((n) => {
            let section = searchConfig2.sections[n.key.toLowerCase()];
            if (section) {
              n.icon = section.explorer_icon;
              n.weight = section.weight;
              n.title = section.title;
              n.linkTitle = n.title;
              if (section.static_link_url) {
                n.static_link_url = section.static_link_url;
              }
            }
          });
          rootNodes.sort((a, b) => {
            if (a.weight === b.weight) {
              return a.title.localeCompare(b.title);
            }
            return a.weight - b.weight;
          });
          this.explorer.rootNodes = rootNodes;
          this.$watch("$store.search.results.main.sectionFacets", (value) => {
            debug7("watch $store.search.results.main.sectionFacets");
            updateFacetState(this.explorer.facets, value);
          });
          this.$watch("$store.search.explorer.keyOpenStack", (value) => {
            debug7("$store.search.explorer.keyOpenStack", value);
            handleKeyOpenStack();
          });
          this.openAndCloseNodes();
          this.$store.search.explorer.hydrated = true;
        }, createExplorerNodeRequest);
      },
      onBeforeRender(e) {
        if (this.$store.search.explorer.showAlwaysHydratedExplorer) {
          this.$store.search.explorer.showHydratedExplorer = false;
        }
      },
      onRender(e) {
        if (document.documentElement.hasAttribute("data-turbo-preview")) {
          return;
        }
        this.openAndCloseNodes();
        this.onRenders.forEach((cb2) => cb2(e));
      },
      getFacetsFor: function(node) {
        return findChildren(node.href, this.explorer.facets);
      },
      findNode: function(href) {
        let index = this.explorer.facets.findIndex((n) => n.href === href);
        if (index === -1) {
          return null;
        }
        return this.explorer.facets[index];
      },
      // Open/close state and transitions.
      openAndCloseNodes: function() {
        if (!this.isActive) {
          return;
        }
        let pageInfo = getPageInfo();
        if (!pageInfo) {
          return;
        }
        debug7("openAndCloseNodes", pageInfo.href);
        if (pageInfo.kind === "home") {
          closeLevel(1, this.explorer.facets);
        } else {
          let hrefSection = pageInfo.hrefSection;
          if (pageInfo.section === "api") {
            hrefSection = pageInfo.href;
          } else if (pageInfo.href === "/docs/sections/") {
            hrefSection = decodeURI(window.location.pathname);
            this.activateHydration(true);
          }
          debugDev("openAndCloseNodes.hrefSection", hrefSection);
          let currentNode = this.findNode(hrefSection);
          if (currentNode) {
            currentNode.open = currentNode.count > 0;
            openNodeAndCloseTheOthers(currentNode, this.explorer.facets);
          }
        }
      }
    });
  }
  function newSearchExplorerNode(searchConfig2, node) {
    let templates = {};
    const isActivePage = (p) => {
      return p.pathname === window.location.pathname && p.hash === window.location.hash;
    };
    let ctrl = {
      node,
      counter: 0,
      state: {
        childNodes: [],
        pages: [],
        // Includes only visible pages.
        totalPageCount: 0,
        // Includes hidden/deprecated pages.
        pagesLoaded: false,
        pageSearchActive: false,
        hydrated: false
      },
      viewAllText: function() {
        let nodeTitle = this.node.title || this.node.linkTitle;
        if (this.$store.search.query.isFiltered()) {
          return `See ${this.state.totalPageCount} Matching ${nodeTitle} Guides`;
        }
        return `See All ${this.state.totalPageCount} ${nodeTitle} Guides`;
      },
      init: function init() {
        debug7("init", this.node.href);
        templates = {
          templateNode: this.$refs["templateNode"],
          templateNodePages: this.$refs["templateNodePages"],
          templateNodePagesFooter: this.$refs["templateNodePagesFooter"]
        };
        this.onRenders.push((e) => {
          if (this.state.pagesLoaded) {
            this.state.pages.forEach((p) => {
              let active = isActivePage(p);
              if (p.active !== active) {
                p.active = active;
              }
            });
          }
        });
        this.$watch("node.open", (value) => {
          debug7("watch node.open", this.node.href, value);
          if (value) {
            this.hydrateNodeIfNeeded();
          } else {
            this.state.pageSearchActive = false;
          }
        });
        return this.$nextTick(() => {
          if (this.node.open) {
            this.hydrateNodeIfNeeded();
          }
        });
      },
      toggleOpen: function() {
        debug7("toggleOpen", this.node.href, this.node.open, this.state.hydrated);
        this.hydrateNodeIfNeeded();
        this.node.open = !this.node.open && this.node.count > 0;
        if (this.node.open) {
          openNodeAndCloseTheOthers(this.node, this.explorer.facets);
        }
      },
      showStaticLeafNodes: function() {
        return !this.state.pagesLoaded;
      },
      onClick: function(e, p = null) {
        let hit2 = null;
        if (p) {
          hit2 = p.hit;
        } else {
          hit2 = this.node.hit;
        }
        if (hit2) {
          this.$store.nav.analytics.handler.clickHit(hit2, "DOCS: Explorer");
        }
      },
      getNodesSection: function() {
        return this.getFacetsFor(this.node);
      },
      activatePageSearchIfNeeded: function() {
        debug7("activatePageSearchIfNeeded", this.node.href, this.state.pageSearchActive);
        if (this.state.pageSearchActive) {
          return;
        }
        this.state.pageSearchActive = true;
        let self2 = this;
        let factory = {
          status: function() {
            return self2.state.pageSearchActive ? 1 /* On */ : 0 /* Off */;
          },
          create: (query) => {
            return newRequestCallback(
              createExplorerNodeRequest(searchConfig2, query, self2.node.key),
              (result) => {
                debug7("pages result", self2.node.href, result.hits.length);
                let pageCount = 0;
                let pages = [];
                for (hit of result.hits) {
                  pageCount++;
                  if (hit.deprecated) {
                    continue;
                  }
                  if (hit.hierarchy && hit.hierarchy.length) {
                    let last = hit.hierarchy[hit.hierarchy.length - 1];
                    hit.href = last.href;
                  }
                  let pathname = hit.href;
                  let hash = "";
                  let hashIndex = hit.href.indexOf("#");
                  if (hashIndex !== -1) {
                    pathname = hit.href.substring(0, hashIndex);
                    hash = hit.href.substring(hashIndex);
                  }
                  let p = {
                    title: hit.linkTitle ? hit.linkTitle : hit.title,
                    linkTitle: hit.linkTitle ? hit.linkTitle : hit.title,
                    href: hit.href,
                    pathname,
                    hash,
                    // Store away the original hit for Algolia events.
                    hit
                  };
                  p.active = isActivePage(p);
                  pages.push(p);
                }
                pages.sort(itemsComparer);
                self2.state.totalPageCount = pageCount;
                self2.state.pages = pages;
                self2.state.pagesLoaded = true;
              },
              {
                pronto: true,
                query,
                fileCacheID: self2.node.key
              }
            );
          }
        };
        this.$store.search.addSearches(newRequestCallbackFactoryTarget(factory, 1 /* Main */));
      },
      hydrateNodeIfNeeded: function() {
        if (this.destroyed) {
          return;
        }
        if (!this.state.hydrated) {
          debug7("hydrateNodeIfNeeded", this.node.href);
          this.hydrateNode();
        } else {
          debug7("hydrateNodeIfNeeded.already hydrated", this.node.href);
        }
        this.activatePageSearchIfNeeded();
      },
      hydrateNode: function() {
        debug7("hydrateNode", this.node.href);
        let self2 = this;
        this.state.hydrated = true;
        const nodeElement = this.$refs["node-tree"];
        let nodeTemplate = document.importNode(templates.templateNode.content.querySelector("template"), true);
        let nodePagesTemplate = document.importNode(templates.templateNodePages.content.querySelector("template"), true);
        let nodePagesTemplateFooter = document.importNode(
          templates.templateNodePagesFooter.content.querySelector("template"),
          true
        );
        nodeElement.appendChild(nodePagesTemplate);
        nodeElement.appendChild(nodeTemplate);
        nodeElement.appendChild(nodePagesTemplateFooter);
      }
    };
    return ctrl;
  }
  var findChildren = function(href, nodes) {
    let children = [];
    let index = nodes.findIndex((n) => n.href === href);
    if (index === -1) {
      return children;
    }
    let level = nodes[index].level;
    let child = nodes[index + 1];
    while (child && child.href.startsWith(href)) {
      if (child.level === level + 1) {
        children.push(child);
      }
      index++;
      child = nodes[index + 1];
    }
    return children;
  };
  var openNodeAndCloseTheOthers = function(node, nodes) {
    debugDev("openNodeAndCloseTheOthers", node.href);
    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i];
      if (node.href.startsWith(n.href)) {
        n.open = true;
      } else {
        n.open = false;
      }
      if (n.open) {
        debugDev("openNodeAndCloseTheOthers.open", n.href);
      }
    }
  };
  var closeLevel = function(level, nodes) {
    debug7("closeLevel", level);
    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i];
      if (n.open && n.level === level) {
        n.open = false;
      }
    }
  };
  var updateFacetState = function(to, from) {
    let fromIndex = 0;
    for (let toIndex = 0; toIndex < to.length; toIndex++) {
      let toNode = to[toIndex];
      if (toNode.count < 0) {
        continue;
      }
      let fromNode = null;
      if (toIndex >= from.length) {
        let idx = from.findIndex((n) => n.href === toNode.href);
        if (idx !== -1) {
          fromNode = from[idx];
        }
        if (!fromNode) {
          toNode.count = 0;
          toNode.open = false;
          continue;
        }
      } else {
        fromNode = from[fromIndex];
      }
      if (toNode.href === fromNode.href) {
        toNode.count = fromNode.count;
        fromIndex++;
        continue;
      }
      toNode.count = 0;
      toNode.open = false;
    }
  };
  var createExplorerNodeRequest = function(searchConfig2, query, key) {
    let maxLeafNodes = 200;
    let sectionFilter = `section:${key}`;
    let facetFilters = query.toFacetFilters();
    let filters = "";
    return {
      indexName: searchConfig2.indexName(searchConfig2.sections_merged.index),
      filters,
      facetFilters: facetFilters.concat(facetFilters, sectionFilter),
      distinct: 0,
      params: `query=${encodeURIComponent(query.lndq)}&hitsPerPage=${maxLeafNodes}`
    };
  };
  var getPageInfo = function() {
    let info = window.lnPageInfo;
    if (!info) {
      return null;
    }
    let sectionKey = "";
    if (info.sectionsPath) {
      const parts = info.sectionsPath.split("/");
      const delim = " > ";
      sectionKey = parts.join(delim);
    }
    info.sectionKey = sectionKey;
    return info;
  };
  var itemsComparer = function(a, b) {
    return a.linkTitle.localeCompare(b.linkTitle);
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/lang.js
  var linodeDotCom = "https://www.sitebay.org";
  function addLangToHref(href, lang) {
    if (!(href && href.startsWith(`${linodeDotCom}`))) {
      return href;
    }
    let url = new URL(href);
    let pathExcludeRe = /(\/docs\/|\/community\/questions\/|\/wp-content\/)/;
    if (pathExcludeRe.test(url.pathname)) {
      return href;
    }
    if (url.pathname == "/") {
      return `${href}${lang}/`;
    }
    return href.replace(url.pathname, `/${lang}${url.pathname}`);
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/language-switcher.js
  var debug8 = 0 ? console.log.bind(console, "[language-switcher]") : function() {
  };
  function newLanguageSwitcherController(weglot_api_key2) {
    debug8("newLanguageSwitcherController");
    const initAndSwitchTo = function(self2) {
      let lang = self2.currentLang;
      self2.$store.nav.lang = lang;
      setTimeout(() => {
        Weglot.initialized = false;
        Weglot.on("initialized", () => {
          debug8("Weglot initialized");
          Weglot.switchTo(lang);
        });
        initWeglot(weglot_api_key2);
      }, 600);
    };
    return function() {
      return {
        show: true,
        open: false,
        currentLang: this.$persist("en"),
        languages: [
          { lang: "en", name: "English" },
          { lang: "es", name: "Espa\xF1ol" }
        ],
        init: function() {
          debug8("init language");
          const langParam = getCurrentLangFromLocation();
          if (langParam) {
            this.currentLang = langParam;
          }
          if (!this.isDefaultLanguage()) {
            this.$nextTick(() => {
              initAndSwitchTo(this);
            });
          }
        },
        switchLanguage: function(lang) {
          if (!lang || lang === this.currentLang) {
            return;
          }
          if (window.location.search.includes("lang=")) {
            window.location.search = `lang=${lang}`;
          } else {
            window.location.search += `&lang=${lang}`;
          }
        },
        currentLanguage: function() {
          return this.languages.find((element) => {
            return element.lang === this.currentLang;
          });
        },
        languageIDs: function(prefix2) {
          let s = "";
          for (let i = 0; i < this.languages.length; i++) {
            s += prefix2 + this.languages[i].lang;
            if (i < this.languages.length - 1) {
              s += " ";
            }
          }
          return s;
        },
        isDefaultLanguage: function() {
          return this.currentLang === "en";
        }
      };
    };
  }
  function initWeglot(apiKey) {
    debug8("initWeglot");
    Weglot.initialize({
      api_key: apiKey,
      hide_switcher: true
    });
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/search/search-store.js
  var import_lru = __toESM(require_lru());

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/search/query.ts
  var filterAttributes = ["docType", "category", "tags", "authors"];
  var setQueryValues = function(q, key, values) {
    if (key === "sections" || key === "section.lvl0") {
      key = "docType";
    }
    if (filterAttributes.includes(key)) {
      q.filters.set(key, values);
    }
  };
  var newQuery = function() {
    return {
      p: 0,
      lndq: "",
      filters: /* @__PURE__ */ new Map(),
      addFilter(key, value) {
        if (this.filters.has(key)) {
          this.filters.get(key).push(value);
        } else {
          this.filters.set(key, [value]);
        }
      },
      replaceFilter(key, value) {
        this.filters.set(key, [value]);
      },
      toFacetFilters() {
        let filters = [];
        this.filters.forEach((values, key) => {
          let filterGroup = [];
          values.forEach((value) => {
            filterGroup.push(`${key}:${value}`);
          });
          filters.push(filterGroup);
        });
        return filters;
      },
      hasFilter() {
        return this.filters.size > 0;
      },
      isFiltered() {
        return this.lndq != "" || this.hasFilter();
      }
    };
  };
  var QueryHandler = class {
    constructor() {
    }
    isQueryParam(k) {
      switch (k) {
        case "p":
          return true;
        case "lndq":
          return true;
        default:
          return filterAttributes.includes(k);
      }
    }
    queryFromLocation() {
      if (!window.location.search) {
        return newQuery();
      }
      return this.queryFromString(window.location.search.slice(1));
    }
    queryFromString(s) {
      let q = newQuery();
      new URLSearchParams(s).forEach((v, k) => {
        switch (k) {
          case "p":
            q.p = parseInt(v, 10);
            if (q.p < 0) {
              q.p = 0;
            }
            break;
          case "lndq":
            q.lndq = normalizeSpace(v);
            break;
          case "q":
            if (isTopResultsPage()) {
              q.lndq = normalizeSpace(v);
            }
            break;
          default:
            setQueryValues(q, k, v.split(","));
        }
      });
      return q;
    }
    queryAndLocationToQueryString(q) {
      let search = "";
      let currentURL = new URL(window.location.toString());
      currentURL.searchParams.forEach((v, k) => {
        if (!this.isQueryParam(k)) {
          search = addTrailingAnd(search);
          search += `${k}=${v}`;
        }
      });
      let queryString = this.queryToQueryString(q);
      if (!queryString) {
        return search;
      }
      if (search) {
        queryString += "&" + search;
      }
      return queryString;
    }
    queryToQueryString(q) {
      let queryString = "";
      if (q.lndq) {
        queryString = `lndq=${encodeURIComponent(q.lndq)}`;
      }
      if (q.p) {
        queryString = addTrailingAnd(queryString);
        queryString = queryString.concat(`p=${q.p}`);
      }
      q.filters.forEach((values, key) => {
        queryString = addTrailingAnd(queryString);
        queryString = queryString.concat(`${key}=${encodeURIComponent(values.join(",").toLowerCase())}`);
      });
      return queryString;
    }
  };
  function addTrailingAnd(s) {
    if (s && !s.endsWith("&")) {
      s += "&";
    }
    return s;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/search/search-store.js
  var debug9 = 0 ? console.log.bind(console, "[search-store]") : function() {
  };
  var debugDev2 = 0 ? console.log.bind(console, "[search-store]") : function() {
  };
  var debugFetch = 0 ? console.log.bind(console, "[search-fetch]") : function() {
  };
  var createSectionFacetsSorted = function(searchConfig2, result) {
    if (!result.facets) {
      return [];
    }
    let nodes = [];
    let sections = searchConfig2.sections;
    for (let i = 0; ; i++) {
      let key = `section.lvl${i}`;
      let sectionFacet = result.facets[key];
      if (!sectionFacet) {
        break;
      }
      for (let k in sectionFacet) {
        let parts = k.split(" > ");
        let first = parts[0].toLowerCase();
        if (!(first in sections)) {
          continue;
        }
        let last = parts[parts.length - 1];
        let title = last.replace("-", " ");
        title = title.charAt(0).toUpperCase() + title.slice(1);
        let href = `/docs/${parts.join("/").toLowerCase()}/`;
        let node = {
          href,
          key: k,
          level: i + 1,
          title,
          count: sectionFacet[k],
          open: false
        };
        nodes.push(node);
      }
    }
    nodes.sort((a, b) => {
      return a.href < b.href ? -1 : 1;
    });
    return nodes;
  };
  function newSearchStore(searchConfig2, params, Alpine2) {
    let cacheWarmerUrls = params.search_cachewarmer_urls;
    let setResult = function(result, loaded = true) {
      let facets = createSectionFacetsSorted(searchConfig2, result);
      this.sectionFacets = facets;
      this.result = result;
      this.loaded = loaded;
    };
    let results = {
      blank: { loaded: false, set: setResult },
      main: { loaded: false, set: setResult },
      explorerData: { loaded: false },
      // Holds the last Algolia queryID.
      lastQueryID: ""
    };
    const resultCallback = (result) => {
      if (!result.queryID) {
        return;
      }
      results.lastQueryID = result.queryID;
    };
    const searcher = new Searcher(searchConfig2, results.blank, cacheWarmerUrls, resultCallback, debug9);
    let searchEffectMain = null;
    const router = newCreateHref(searchConfig2);
    const queryHandler2 = new QueryHandler();
    let store2 = {
      // This is the only query instance. When search is active, any change to this will trigger a new search for searchGroupMain.
      query: newQuery(),
      // searchGroupMain holds the main search and others that should react to changes
      // to the query filters.
      searchGroupMain: newRequestCallbackFactories(),
      // searchGroupAdHoc holds, typically, one time queries needed to fetch
      // data for the home page etc.
      searchGroupAdHoc: newRequestCallbackFactories(),
      // The blank (needed for the explorer and section metadata) and the main search result.
      results,
      // Search related state for the explorer that should survive navigation.
      explorer: {
        // Signal that we need to show the hydrated/dynamic explorer.
        showHydratedExplorer: false,
        // Signal that the above is a permanent state.
        showAlwaysHydratedExplorer: false,
        // Signal that the explorer has been hydrated.
        hydrated: false,
        // A stack of key/open pairs to be opened or closed.
        keyOpenStack: []
      },
      docsearchLink: function(ds) {
        return `https://docsearch.akamai.com/s/global-search/${this.query.lndq}?s=Akamai%20TechDocs&ds=${ds}`;
      },
      shouldShowHydratedExplorer: function() {
        return this.explorer.showHydratedExplorer || this.query.isFiltered();
      },
      shouldShowHydratedExplorerAndIsHydrated: function() {
        return this.explorer.hydrated && this.shouldShowHydratedExplorer();
      },
      clearQuery: function() {
        this.query = newQuery();
      },
      updateLocationWithQuery() {
        let search = queryHandler2.queryAndLocationToQueryString(this.query);
        if (search === this.search) {
          return;
        }
        this.search = search;
        let href = window.location.pathname;
        if (search) {
          href += "?" + search;
        }
        href += window.location.hash;
        history.replaceState({ turbo: {} }, null, href);
      },
      executeBatch() {
        searcher.executeBatch();
      },
      addSearches(...requestCallBackFactoryTargets) {
        requestCallBackFactoryTargets.forEach((rcf) => {
          switch (rcf.target) {
            case 1 /* Main */:
              this.searchGroupMain.push(rcf.factory);
              break;
            case 2 /* AdHoc */:
              this.searchGroupAdHoc.push(rcf.factory);
              break;
            default:
              throw `unknown search group ${rcf.target}`;
          }
        });
      },
      init() {
        this.results.blank.getSectionMeta = function(key) {
          key = key.toLocaleLowerCase().replace(/&amp;/g, "&");
          if (key.endsWith("-branches")) {
            key = key.substring(0, key.indexOf("-branches"));
          }
          if (!this.metaResult) {
            return null;
          }
          let sectionConfigIdx = searchConfig2.sectionsSorted.findIndex((section) => {
            return section.name === key.toLocaleLowerCase();
          });
          let m = this.metaResult.get(key);
          if (!m && sectionConfigIdx !== -1) {
            let index = searchConfig2.sectionsSorted[sectionConfigIdx];
            m = { title: index.title, linkTitle: index.title, excerpt: "" };
          }
          if (m) {
            m.ordinal = sectionConfigIdx !== -1 ? sectionConfigIdx + 1 : m.ordinal;
            if (!m.href) {
              m.href = router.hrefSection(key);
            }
          }
          return m;
        };
        const searchEffectAdHoc = Alpine2.effect(() => {
          debug9("searchEffectAdHoc", this.searchGroupAdHoc.length);
          searcher.searchFactories(this.searchGroupAdHoc, null);
        });
        this.searchInit();
      },
      searchInit: function() {
        if (searchEffectMain === null) {
          searchEffectMain = Alpine2.effect(() => {
            searcher.searchFactories(this.searchGroupMain, this.query);
          });
        }
      },
      searchToggle: function(active) {
        if (active) {
          this.searchGroupMain.push({
            status: function() {
              return 1 /* On */;
            },
            create: (query) => {
              return newRequestCallback(
                createSectionRequest(query),
                (result) => {
                  this.results.main.set(result);
                },
                {
                  query
                }
              );
            }
          });
        }
        searchEffectMain.active = active;
      },
      isSearching: function() {
        return searchEffectMain && searchEffectMain.active;
      },
      withExplorerData: function(callback = (data2) => {
      }, createExplorerNodeRequest2, sectionKeys = []) {
        if (this.results.explorerData.loaded) {
          callbackWrapper(this.explorerData.data);
          return;
        }
        let callbackWrapper = (data2) => {
          data2.blank.sectionFacets.forEach((section) => {
            let m = data2.blank.getSectionMeta(section.key);
            if (m) {
              section.title = m.title;
              section.linkTitle = m.linkTitle;
            }
          });
          callback(data2);
        };
        this.withBlank((blank) => {
          let data2 = {
            sections: {},
            blank
          };
          if (sectionKeys.length === 0) {
            callbackWrapper(data2);
            return;
          }
          let loadCount = 0;
          let markLoaded = () => {
            loadCount++;
            if (loadCount === sectionKeys.length) {
              this.results.explorerData.data = data2;
              this.results.explorerData.loaded = true;
              callbackWrapper(data2);
              __stopWatch("withExplorerData.done");
            }
          };
          let searches = [];
          for (let sectionKey of sectionKeys) {
            let factory = {
              status: function() {
                return 2 /* Once */;
              },
              create: function(query) {
                return newRequestCallback(
                  createExplorerNodeRequest2(query, sectionKey),
                  (result) => {
                    data2.sections[sectionKey] = result;
                    markLoaded();
                  },
                  {
                    query,
                    fileCacheID: sectionKey
                  }
                );
              }
            };
            searches.push(newRequestCallbackFactoryTarget(factory, 2 /* AdHoc */));
          }
          this.addSearches(...searches);
        });
      },
      withBlank: async function(callback = () => {
      }) {
        debug9("withBlank");
        if (this.results.blank.loaded) {
          callback(this.results.blank);
          return;
        }
        let loadCount = 0;
        let markLoaded = () => {
          loadCount++;
          if (loadCount === 2) {
            this.results.blank.loaded = true;
            callback(this.results.blank);
          }
        };
        searcher.batcher.add(
          // Load section meta data from Algolia.
          newRequestCallback(
            {
              indexName: searchConfig2.indexName(searchConfig2.meta_index),
              params: "query=&hitsPerPage=600"
            },
            (result) => {
              debug9("withBlank.blank.metaResult:", result);
              this.results.blank.metaResult = result.hits.reduce(function(m, hit2) {
                m.set(hit2.objectID.toLowerCase().replace(/&amp;/g, "&"), hit2);
                return m;
              }, /* @__PURE__ */ new Map());
              markLoaded();
            },
            {
              fileCacheID: "sectionsmeta"
            }
          ),
          newRequestCallback(
            createSectionRequest(null),
            (result) => {
              if (!result.index.endsWith("sitebay-merged")) {
                throw `invalid state: ${result.index}`;
              }
              debug9("withBlank.blank.result:", result);
              this.results.blank.set(result, false);
              markLoaded();
            },
            {
              fileCacheID: "explorer-blank"
            }
          )
        );
      }
    };
    const createSectionRequest = function(query) {
      debug9("createSectionRequest:", query);
      let sectionConfig = searchConfig2.sections_merged;
      let facets = sectionConfig.section_facet ? [sectionConfig.section_facet] : ["section.*"];
      let filteringFacetNames = [];
      if (sectionConfig.filtering_facets) {
        filteringFacetNames = sectionConfig.filtering_facets.map((facet) => facet.name);
        facets = facets.concat(filteringFacetNames);
      }
      let hitsPerPage = 0;
      let q = "";
      let filters = sectionConfig.filters || "NOT docType:community AND NOT docType:products AND NOT docType:api AND NOT docType:Marketplace";
      let facetFilters = [];
      let attributesToHighlight = [];
      let analyticsTags = [];
      let page = 0;
      if (query) {
        hitsPerPage = sectionConfig.hits_per_page || searchConfig2.hits_per_page || 20;
        q = encodeURIComponent(query.lndq);
        facetFilters = query.toFacetFilters();
        attributesToHighlight = ["title", "excerpt", ...filteringFacetNames];
        page = query.p;
        if (query.isFiltered()) {
          analyticsTags.push("active");
        }
      }
      return {
        indexName: searchConfig2.indexName(sectionConfig.index),
        clickAnalytics: searchConfig2.click_analytics,
        analyticsTags,
        filters,
        facetFilters,
        facets,
        distinct: 1,
        attributesToHighlight,
        params: `query=${q}&hitsPerPage=${hitsPerPage}&page=${page}`
      };
    };
    return store2;
  }
  function normalizeAlgoliaResult(result, lang = "") {
    let index = result.index;
    let queryID = result.queryID ? result.queryID : "";
    result.hits.forEach((hit2, idx) => {
      hit2.__index = index;
      hit2.__queryID = queryID;
      if (hit2.__queryID) {
        hit2.__position = idx + 1 + result.page * result.hitsPerPage;
      }
      hit2.sectionTitle = hit2.section;
      if (hit2.section) {
        hit2.section = hit2.section.toLowerCase();
      }
      hit2.rootSectionTitle = hit2["section.lvl0"];
      if (hit2.rootSectionTitle) {
        if (hit2.rootSectionTitle.endsWith("-branches")) {
          hit2.rootSectionTitle = hit2.rootSectionTitle.substring(0, hit2.rootSectionTitle.indexOf("-branches"));
        }
        hit2.rootSectionTitle = hit2.rootSectionTitle.replace("-", " ");
      }
      hit2.titleHighlighted = hit2._highlightResult && hit2._highlightResult.title ? hit2._highlightResult.title.value : hit2.title;
      hit2.excerptHighlighted = hit2._highlightResult && hit2._highlightResult.excerpt ? hit2._highlightResult.excerpt.value : hit2.excerpt;
      hit2.linkTitle = hit2.linkTitle || hit2.title;
      hit2.mainTitle = hit2.title || hit2.linkTitle;
      if (hit2.hierarchy && hit2.hierarchy.length) {
        let first = hit2.hierarchy[0];
        hit2.mainTitle = first.title || first.linkTitle;
      }
      if (hit2.href) {
        hit2.isExternalLink = hit2.href.startsWith("http");
      }
      if (lang && lang !== "en" && hit2.href) {
        hit2.href = addLangToHref(hit2.href, lang);
      }
      hit2.firstPublishedDateString = "";
      if (hit2.firstPublishedTime) {
        hit2.firstPublishedDateString = toDateString(new Date(hit2.firstPublishedTime * 1e3));
      }
      hit2.excerptTruncated = function(maxLen = 300) {
        let excerpt = this.excerpt || this.description;
        if (!excerpt) {
          return "";
        }
        if (excerpt.length <= maxLen) {
          return excerpt;
        }
        return `${excerpt.substring(0, maxLen)} \u2026`;
      };
      if (!hit2.thumbnailUrl) {
        hit2.thumbnailUrl = "/docs/media/images/SiteBay-Default-416x234.jpg";
      }
      hit2.tagsValues = function() {
        if (!this.tags) {
          return [];
        }
        return Object.values(this.tags);
      };
    });
  }
  var normalizeResult = function(self2, result) {
    let hitsStart = 0;
    let hitsEnd = 0;
    if (result.nbHits) {
      hitsStart = result.page * result.hitsPerPage;
      hitsStart = hitsStart ? hitsStart + 1 : 1;
      hitsEnd = hitsStart + result.hits.length - 1;
    }
    result.stats = {
      totalNbHits: result.nbHits,
      totalNbPages: result.nbPages,
      hitsStart,
      hitsEnd
    };
    let facets = result.facets;
    if (facets) {
      let facetsMeta = {};
      Object.entries(facets).forEach(([k, v]) => {
        if (k === "docType" || k.startsWith("section.")) {
          let obj = {};
          Object.entries(v).forEach(([kk, vv]) => {
            if (k == "docType" && (kk == "community" || kk == "products" || kk == "api")) {
              return;
            }
            let m = self2.metaProvider.getSectionMeta(kk.toLocaleLowerCase());
            obj[kk] = { count: vv, meta: m };
          });
          facetsMeta[k] = obj;
        } else {
          facetsMeta[k] = v;
        }
      });
      result.facetsMeta = facetsMeta;
    }
    result.sections = function() {
      let sections = [];
      if (!this.facets) {
        return sections;
      }
      let position = 0;
      for (let i = 0; ; i++) {
        let key = `section.lvl${i}`;
        let sectionFacets = this.facets[key];
        let facetsMeta = this.facetsMeta[key];
        if (!sectionFacets) {
          break;
        }
        for (let k in sectionFacets) {
          let sectionLvl0 = k;
          if (i > 0) {
            sectionLvl0 = k.split(" > ")[0];
          }
          let meta;
          let facetMeta = facetsMeta[k];
          if (facetMeta) {
            meta = facetMeta.meta;
          }
          let hasObjectID = sectionLvl0 == "products" || sectionLvl0 == "guides";
          position++;
          sections.push({
            key: k,
            count: sectionFacets[k],
            isGhostSection: false,
            sectionLvl0,
            meta,
            // Used for Analytics.
            hasObjectID,
            queryID: result.queryID,
            position
          });
        }
      }
      return sections;
    };
    let lang = getCurrentLang();
    normalizeAlgoliaResult(result, lang);
  };
  var SearchBatcher = class {
    constructor(searchConfig2, metaProvider, cacheWarmerUrls, resultCallback = (result) => {
    }) {
      const algoliaHost = `https://${searchConfig2.app_id}-dsn.algolia.net`;
      this.headers = {
        "X-Algolia-Application-Id": searchConfig2.app_id,
        "X-Algolia-API-Key": searchConfig2.api_key
      };
      this.urlQueries = `${algoliaHost}/1/indexes/*/queries`;
      this.cache = new import_lru.LRUMap(12);
      this.cacheEnabled = true;
      this.metaProvider = metaProvider;
      this.resultCallback = resultCallback;
      this.cacheWarmerUrls = cacheWarmerUrls;
      this.interval = () => {
        return 100;
      };
      this.executeCount = 0;
      this.fetchCount = 0;
      this.queue = [];
    }
    async add(...requestCallbacks) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.executeBatch("timers");
        }, this.interval());
      }
      let cacheResult = await this.searchCache(...requestCallbacks);
      if (cacheResult.cacheMisses.length === 0) {
        return;
      }
      this.queue = this.queue.concat(...cacheResult.cacheMisses);
    }
    executeBatch(what = "manual") {
      let requestCallbacks = [...this.queue];
      this.queue.length = 0;
      this.timer = null;
      this.search(...requestCallbacks);
      this.executeCount++;
    }
    async searchCache(...requestCallbacks) {
      debug9("searchCache, num requests:", requestCallbacks.length);
      if (requestCallbacks.length === 0) {
        return { cacheMisses: [], cacheMissesKeys: [] };
      }
      let cacheMisses = [];
      let cacheMissesKeys = [];
      if (!this.cacheEnabled) {
        for (let i = 0; i < requestCallbacks.length; i++) {
          let cb2 = requestCallbacks[i];
          let key = JSON.stringify(cb2.request);
          cacheMisses.push(requestCallbacks[i]);
          cacheMissesKeys.push(key);
        }
        return { cacheMisses, cacheMissesKeys };
      }
      for (let i = 0; i < requestCallbacks.length; i++) {
        let cb2 = requestCallbacks[i];
        if (!cb2.request) {
          console.warn("invalid state", cb2);
          throw "must provide a request";
        }
        let key = JSON.stringify(cb2.request);
        let cachedResult = this.cache.get(key);
        if (cachedResult) {
          cb2.callback(cachedResult);
          this.resultCallback(cachedResult);
        } else {
          cacheMisses.push(requestCallbacks[i]);
          cacheMissesKeys.push(key);
        }
      }
      return { cacheMisses, cacheMissesKeys };
    }
    async checkFileCache(fileCacheID) {
      let fileCacheUrl = this.cacheWarmerUrls[fileCacheID];
      if (fileCacheUrl) {
        debug9("fetch data from file cache:", fileCacheUrl);
        const response = await fetch(fileCacheUrl, { credentials: "same-origin" });
        if (response.ok) {
          let data2 = await response.json();
          if (Array.isArray(data2)) {
            if (data2.length > 0) {
              data2 = data2.filter((item) => !item.isBranch);
            }
            data2 = {
              hits: data2
            };
          }
          normalizeResult(this, data2);
          return data2;
        }
      }
      return null;
    }
    async search(...requestCallbacks) {
      debug9("search, num requests:", requestCallbacks.length);
      if (requestCallbacks.length === 0) {
        return;
      }
      let cacheResult = await this.searchCache(...requestCallbacks);
      if (cacheResult.cacheMisses.length === 0) {
        return;
      }
      let requests = [];
      let requestCallbackMap = /* @__PURE__ */ new Map();
      let cacheMissesKeysCopy = [...cacheResult.cacheMissesKeys];
      cacheResult.cacheMissesKeys.length = 0;
      for (let i = 0; i < cacheMissesKeysCopy.length; i++) {
        let rc = cacheResult.cacheMisses[i];
        let rck = cacheMissesKeysCopy[i];
        let req = rc.request;
        if (!requestCallbackMap.has(rck)) {
          let cachedResult = this.cache.get(rck);
          if (cachedResult) {
            rc.callback(cachedResult);
            this.resultCallback(cachedResult);
            continue;
          }
          if (!rc.isFiltered()) {
            let fileCacheID = rc.getFileCacheID();
            if (fileCacheID) {
              let data2 = await this.checkFileCache(fileCacheID);
              if (data2) {
                rc.callback(data2);
                this.resultCallback(data2);
                if (this.cacheEnabled) {
                  this.cache.set(rck, data2);
                }
                continue;
              }
            }
          }
          requests.push(req);
          cacheResult.cacheMissesKeys.push(rck);
          cacheResult.cacheMisses.push(rc);
          requestCallbackMap.set(rck, []);
        }
        requestCallbackMap.get(rck).push(rc.callback);
      }
      if (requests.length === 0) {
        return;
      }
      let queries = {
        requests
      };
      debugFetch(`fetch.POST(${queries.requests.length})`, queries);
      fetch(this.urlQueries, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(queries)
      }).then((response) => response.json()).then((data2) => {
        this.fetchCount++;
        if (!data2.results) {
          console.warn("invalid response", data2);
          return;
        }
        for (let i = 0; i < data2.results.length; i++) {
          let result = data2.results[i];
          this.resultCallback(result);
          normalizeResult(this, result);
          let key = cacheResult.cacheMissesKeys[i];
          if (!key) {
            throw `invalid state: no key set for results ${i}`;
          }
          if (this.cacheEnabled) {
            this.cache.set(key, result);
          }
          requestCallbackMap.get(key).forEach((callback) => {
            callback(result);
          });
        }
      }).catch(function(error2) {
        console.warn("Algolia query failed:", error2);
      });
    }
  };
  var Searcher = class {
    constructor(searchConfig2, metaProvider, cacheWarmerUrls, resultCallback, debug22 = function() {
    }) {
      this.batcher = new SearchBatcher(searchConfig2, metaProvider, cacheWarmerUrls, resultCallback);
    }
    searchFactories(factories, query) {
      if (!query) {
        query = newQuery();
      }
      let requestCallbacks = [];
      for (let i = factories.length - 1; i >= 0; i--) {
        let cbf = factories[i];
        if (cbf.status() > 0 /* Off */) {
          let requestCallback = cbf.create(query);
          requestCallbacks.push(requestCallback);
        }
        if (cbf.status() !== 1 /* On */) {
          debugDev2("remove inactive search factory");
          factories.splice(i, 1);
        }
      }
      debugDev2("factories length:", factories.length);
      this.search(...requestCallbacks);
    }
    search(...requestCallbacks) {
      if (this.batcher.executeCount > 0 && requestCallbacks.length === 1 && requestCallbacks[0].pronto) {
        this.batcher.search(...requestCallbacks);
      } else {
        this.batcher.add(...requestCallbacks);
      }
    }
    executeBatch() {
      this.batcher.executeBatch();
    }
  };
  function getSearchConfig(params) {
    let cfg = params.search_config;
    console.log(cfg);
    console.log("cfg");
    cfg.sectionsSorted = Object.values(cfg.sections);
    cfg.sectionsSorted.sort((a, b) => {
      return a.weight < b.weight ? -1 : 1;
    });
    cfg.sectionsSorted.forEach((sectionCfg) => {
      sectionCfg.nounPlural = function(count = 2) {
        let noun = this.noun || this.title;
        if (count === 0 || count > 1 && !noun.endsWith("s")) {
          noun += "s";
        }
        return noun;
      };
    });
    cfg.indexName = function(index) {
      if (!cfg.index_prefix) {
        return index;
      }
      let prefix2 = cfg.index_prefix;
      if (!prefix2.endsWith("_")) {
        prefix2 += "_";
      }
      return `${prefix2}${index}`;
    };
    return cfg;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/search/filters.js
  var debug10 = 0 ? console.log.bind(console, "[filters]") : function() {
  };
  function newSearchFiltersController(searchConfig2, queryCallback = function(action) {
  }) {
    const queryHandler2 = new QueryHandler();
    var ctrl = {
      // The 3 search views.
      view: 1,
      filters: {
        open: false,
        // Used on mobile to open/close the filter panel.
        loaded: false
      }
    };
    const filterableCloud = () => {
      return {
        open: false,
        searchString: "",
        // to filter the tags by.
        filter: [],
        filterBySearchString: function() {
          let tags = this.filter;
          if (!tags) {
            return [];
          }
          let checkboxes = tags.checkboxes;
          if (!this.searchString) {
            return checkboxes;
          }
          let searchString = this.searchString.toUpperCase();
          return checkboxes.filter((cb2) => cb2.title.toUpperCase().includes(searchString));
        }
      };
    };
    ctrl.filters.data = {
      // Maps a facet name to a filter. The filter maps to the owning section.
      filters: /* @__PURE__ */ new Map(),
      filtersarr: function() {
        return Array.from(this.filters).map(([name, value]) => value).filter((value) => {
          return !value.hidden;
        });
      },
      countActive: function() {
        var count = 0;
        this.filters.forEach((filter, facetName) => {
          if (!filter.allChecked) {
            count++;
          }
        });
        return count;
      },
      // Holds the state for the tags filters.
      tags: filterableCloud(),
      // Holds the state for the authors filters.
      authors: filterableCloud()
    };
    ctrl.incrPage = function(num) {
      let query = this.getQ();
      query.p += num;
      if (query.p < 0) {
        query.p = 0;
      }
      this.$store.nav.scrollToNavBarIfPinned();
    };
    ctrl.getQ = function() {
      return this.$store.search.query;
    };
    ctrl.init = function() {
      debug10("init()");
      this.$nextTick(() => {
        if (this.$store.search.results.blank.loaded) {
          this.initData(this.$store.search.results.blank.result);
        }
        this.$watch("filters.open", (value) => {
          toggleBooleanClass("search-panel_filters-open", document.body, value);
          if (!this.filters.loaded) {
            this.$store.search.withBlank();
          }
        });
        this.$watch("$store.search.results.blank.result", (value) => {
          debug10("blank result");
          this.initData(value);
        });
        this.$watch("$store.search.results.main.result", (value) => {
          debug10("main result");
          this.updateData(value);
          this.populateFilters(false);
        });
        this.$watch("$store.nav.searchResults", (value) => {
          if (value.open && value.userChange) {
            this.populateFilters(true);
          }
          if (value.open || !value.userChange) {
            return;
          }
          this.filters.data.filters.forEach((filter, key) => {
            filter.allChecked = true;
            filter.checkboxes.forEach((e) => {
              e.checked = false;
            });
          });
        });
      });
    };
    ctrl.updateData = function(result) {
      debug10("updateData", result, this.filters.loaded);
      if (!this.filters.loaded) {
        return;
      }
      var facets = result.facetsMeta;
      if (!facets) {
        return;
      }
      searchConfig2.sections_merged.filtering_facets.forEach((facetConfig) => {
        let facet = facets[facetConfig.name];
        let filters = this.filters.data.filters.get(facetConfig.name);
        if (!filters) {
          return;
        }
        for (cb of filters.checkboxes) {
          let count = 0;
          if (facet) {
            let facetv = facet[cb.value];
            if (facetv) {
              count = facetv.count | facetv;
            }
          }
          cb.count = count;
        }
      });
    };
    ctrl.initData = function(result) {
      if (this.filters.loaded) {
        return;
      }
      debug10("initData", result);
      this.filters.data.stats = result.stats;
      if (!result.facetsMeta) {
        return;
      }
      var facets = result.facetsMeta;
      searchConfig2.sections_merged.filtering_facets.forEach((facetConfig) => {
        let facet = facets[facetConfig.name];
        let checkboxes = [];
        for (let k in facet) {
          let v = facet[k];
          let count = v.count || v;
          let title = v.meta ? v.meta.linkTitle : k;
          let ordinal = v.meta ? v.meta.ordinal : 0;
          checkboxes.push({ value: k, title, count, checked: false, ordinal });
        }
        checkboxes.sort((a, b) => {
          if (a.ordinal === b.ordinal) {
            return a.title < b.title ? -1 : 1;
          }
          return a.ordinal === 0 ? 1 : a.ordinal - b.ordinal;
        });
        this.filters.data.filters.set(facetConfig.name, {
          hidden: facetConfig.isTags,
          title: facetConfig.title,
          name: facetConfig.name,
          allChecked: true,
          wasAllChecked: true,
          checkboxes
        });
      });
      this.populateFilters();
      debug10("filters loaded:", this.filters.data.filters);
      this.filters.loaded = true;
    };
    ctrl.populateFilters = function(force = false) {
      if (!force && this.filters.loaded) {
        return;
      }
      debug10("populateFilters");
      let query = this.getQ();
      this.filters.data.filters.forEach((filter, key) => {
        let vals = query.filters.get(key);
        if (vals && vals.length > 0) {
          filter.allChecked = false;
          filter.checkboxes.forEach((e) => {
            e.checked = vals.includes(e.value.toLowerCase());
          });
        } else {
          filter.allChecked = true;
          filter.checkboxes.forEach((e) => {
            e.checked = false;
          });
        }
        filter.wasAllChecked = filter.allChecked;
      });
      this.filters.data.tags.filter = this.filters.data.filters.get("tags");
      this.filters.data.authors.filter = this.filters.data.filters.get("authors");
    };
    ctrl.apply = function() {
      debug10("apply");
      let query = this.getQ();
      query.filters.clear();
      query.p = 0;
      this.filters.data.filters.forEach((filter, facetName) => {
        if (filter.allChecked) {
          for (let cb2 of filter.checkboxes) {
            if (cb2.checked) {
              filter.allChecked = !filter.wasAllChecked;
              if (!filter.allChecked) {
                break;
              }
              cb2.checked = false;
            }
          }
        }
        var someChecked = false;
        for (let cb2 of filter.checkboxes) {
          if (!filter.allChecked && cb2.checked) {
            someChecked = true;
            query.addFilter(facetName, cb2.value);
          }
        }
        filter.allChecked = filter.allChecked || !someChecked;
        filter.wasAllChecked = filter.allChecked;
      });
    };
    return ctrl;
  }
  function isTopResultsPage() {
    return window.location.href.includes("topresults");
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/search/input.js
  var debug11 = 0 ? console.log.bind(console, "[search-input]") : function() {
  };
  function newSearchInputController() {
    return {
      focus: false,
      click: function() {
        this.$store.nav.openSearchPanel();
      },
      open: function() {
        this.$store.nav.openSearchPanel();
        window.scrollTo({ top: 0 });
        this.$nextTick(() => {
          this.$refs.searchinput.focus();
        });
      },
      setFocus: function(focus) {
        this.focus = focus;
      },
      close: function() {
        this.$store.nav.searchResults = { open: false, userChange: true };
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/nav.js
  var debug12 = 0 ? console.log.bind(console, "[navbar]") : function() {
  };
  var queryHandler = new QueryHandler();
  var getScrollPosNavbar = function() {
    let h = window.getComputedStyle(document.getElementById("grid")).getPropertyValue("--height-sitebay-menu-row");
    return parseInt(h, 10) - 1;
  };
  var onNavSearchResults = function(self2, val, oldVal) {
    if (val.open === oldVal.open) {
      if (!val.open && val.userChange) {
        self2.$store.search.clearQuery();
      }
      return;
    }
    if (!val.userChange) {
      return;
    }
    if (!val.open) {
      self2.$store.search.query = newQuery();
      self2.$store.nav.goBack();
    } else {
      let newSearch = !isTopResultsPage();
      if (newSearch) {
        let queryString = queryHandler.queryToQueryString(self2.$store.search.query);
        if (queryString) {
          queryString = "?" + queryString;
        }
        self2.$store.nav.pushTopResults(queryString);
      }
    }
  };
  var applyUIState = function(self2, init = false) {
    let setClassAndWatch = (initValue, prop, baseClass) => {
      toggleBooleanClass(baseClass, document.body, initValue);
      if (init) {
        self2.$watch(prop, (val, oldVal) => {
          toggleBooleanClass(baseClass, document.body, val);
          switch (prop) {
            case "$store.nav.open.explorer":
              if (val && isMobile() && self2.$store.nav.open.toc) {
                self2.$store.nav.open.toc = false;
              }
              break;
          }
        });
      }
    };
    if (init) {
      self2.$watch("$store.nav.searchResults", (val, oldVal) => {
        onNavSearchResults(self2, val, oldVal);
      });
    }
    setClassAndWatch(self2.$store.nav.searchResults.open, "$store.nav.searchResults.open", "search-panel-open");
    setClassAndWatch(self2.$store.nav.open.explorer, "$store.nav.open.explorer", "explorer-open");
    setClassAndWatch(self2.$store.nav.open.toc, "$store.nav.open.toc", "toc-open");
    setClassAndWatch(self2.$store.nav.pinned, "$store.nav.pinned", "topbar-pinned");
  };
  function newNavController(weglot_api_key2) {
    return {
      init: function() {
        applyUIState(this, true);
        if (isTopResultsPage()) {
          this.$store.search.searchToggle(true);
          this.$store.nav.searchResults.open = true;
        }
        this.$store.search.query = queryHandler.queryFromLocation();
        this.$watch("$store.search.query.lndq", (val, oldVal) => {
          this.$store.search.query.lndqCleared = oldVal && !val;
          if (this.$store.search.query.p) {
            this.$store.search.query.p = 0;
          }
        });
      },
      onOptanonGroupsUpdated: function(groups) {
        this.$store.nav.updateOptanonGroups(groups);
      },
      onEffect: function() {
        this.$store.search.updateLocationWithQuery();
      },
      onPopState: function(event) {
        if (isTopResultsPage()) {
          this.$store.search.query = queryHandler.queryFromLocation();
          this.$store.nav.searchResults.open = true;
        } else if (this.$store.nav.searchResults.open) {
          this.$store.nav.searchResults.open = false;
        }
      },
      onTurboBeforeRender: function(event) {
        if (!isTopResultsPage()) {
          this.$store.nav.searchResults = { open: false };
        }
      },
      onTurboRender: function() {
        if (document.documentElement.hasAttribute("data-turbo-preview")) {
          return;
        }
        applyUIState(this, false);
        if (document.body.dataset.objectid) {
          let analyticsItem = {
            __queryID: this.$store.search.results.lastQueryID,
            objectID: document.body.dataset.objectid,
            event: "view",
            eventName: "DOCS: Guide Navigate"
          };
          this.$store.nav.analytics.handler.pushItem(analyticsItem);
          this.$store.nav.analytics.handler.startNewPage();
        }
      },
      onScroll: function(e) {
        this.$store.nav.analytics.onScroll();
        let scrollpos = window.scrollY;
        let scrollPosNavbar = getScrollPosNavbar();
        if (scrollpos >= scrollPosNavbar) {
          if (!this.$store.nav.pinned) {
            this.$store.nav.pinned = true;
          }
        } else if (!self.reloaded && this.$store.nav.pinned && scrollpos < 10) {
          this.$store.nav.pinned = false;
        }
        self.reloaded = false;
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/toc.js
  var debug13 = 0 ? console.log.bind(console, "[toc]") : function() {
  };
  var devMode = false;
  var setProgress = function(self2, el) {
    let mainEl = document.querySelector("#main__content");
    let mainHeight = mainEl.offsetHeight;
    let mainStart = mainEl.offsetTop;
    let progress = Math.round((el.offsetTop - mainStart) / mainHeight * 100);
    self2.activeHeading.title = el.innerText;
    self2.activeHeading.progress = progress;
  };
  function newToCController(opts = {
    level2Only: false,
    setProgress: true,
    desktopOnly: false
  }) {
    return {
      activeHeading: {
        title: "",
        progress: 0
      },
      destroyed: false,
      enabled: false,
      showHeading: true,
      opts,
      isActive: function() {
        if (this.opts.desktopOnly && !isDesktop()) {
          return false;
        }
        return true;
      },
      initToC: function() {
        let { level2Only } = this.opts;
        if (level2Only) {
          this.headerEls = () => document.querySelectorAll("#main__content h2");
        } else {
          this.headerEls = () => document.querySelectorAll("#main__content h2, #main__content h3");
        }
        if (devMode) {
          this.$store.nav.open.toc = true;
        }
        this.$nextTick(() => {
          this.createTOC();
        });
      },
      destroy: function() {
        this.destroyed = true;
      },
      createTOC: function() {
        if (this.destroyed) {
          return;
        }
        let self2 = this;
        self2.activeHeading.title = "";
        let ol = this.$refs.ol;
        let olFragment = document.createDocumentFragment();
        let row = [];
        let prevLevel = 0;
        this.headerEls().forEach((el) => {
          if (el.hasAttribute("data-toc-ignore")) {
            return;
          }
          if (!el || el.offsetParent === null || !el.id) {
            return;
          }
          self2.enabled = true;
          let id = el.id;
          let level = parseInt(el.nodeName.substring(1), 10);
          if (prevLevel === 0 && level != 2) {
            return;
          }
          let li = document.createElement("li");
          li.classList.add(`level-${level}`);
          let a = document.createElement("a");
          a.setAttribute("href", `#${id}`);
          a.addEventListener("click", (e) => {
            const { href } = e.target;
            const targetUrl = new URL(href);
            let heading = document.getElementById(targetUrl.hash.substring(1));
            self2.closeIfMobile();
            if (heading) {
              e.preventDefault();
              let spaceAbove = 24 + (document.body.classList.contains("is-topbar-pinned") ? 56 : 97);
              window.scrollTo({
                left: 0,
                top: heading.offsetTop - spaceAbove,
                behavior: "smooth"
              });
              if (history.pushState) {
                history.pushState(null, null, targetUrl.hash);
              }
            }
          });
          if (a.attributes.href.value === window.location.hash) {
            li.classList.add("active");
            setProgress(self2, el);
          }
          a.innerHTML = el.innerText;
          li.appendChild(a);
          if (level == 2) {
            row.length = 0;
            row.push(olFragment);
            olFragment.appendChild(li);
          } else if (level === prevLevel) {
            let ol2 = row[row.length - 1];
            ol2.appendChild(li);
          } else if (level > prevLevel) {
            let ol2 = document.createElement("ol");
            let li2 = row[row.length - 1].lastChild;
            li2.appendChild(ol2);
            ol2.appendChild(li);
            row.push(ol2);
          } else if (level < prevLevel) {
            let diff = prevLevel - level;
            row.length = row.length - diff;
            let ol2 = row[row.length - 1];
            ol2.appendChild(li);
          }
          prevLevel = level;
        });
        if (!this.enabled) {
          this.$store.nav.open.toc = false;
          return;
        }
        if (isMobile() && this.$refs.headerCloseButton) {
          olFragment.querySelectorAll(".level-2").forEach((li) => {
            if (li.querySelector("li") !== null) {
              li.setAttribute("x-data", "{ open: false }");
              let ol2 = li.querySelector("ol");
              ol2.setAttribute("x-show", "open");
              ol2.setAttribute("x-transition", "");
              let closeEl = document.importNode(this.$refs.headerCloseButton.content.querySelector("button"), true);
              li.appendChild(closeEl);
            }
          });
        }
        ol.replaceChildren(olFragment);
      },
      toggleOpen: function() {
        this.$store.nav.open.toc = !this.$store.nav.open.toc;
      },
      close: function() {
        if (this.$store.nav.open.toc) {
          this.$store.nav.open.toc = false;
        }
      },
      closeIfMobile: function() {
        if (isMobile()) {
          this.close();
        }
      },
      onHashchange: function() {
        let id = document.location.hash.slice(1);
        let self2 = this;
        this.headerEls().forEach((el) => {
          if (el.id === id) {
            setProgress(self2, el);
          }
        });
      },
      onScroll: function() {
        if (!this.enabled) {
          return;
        }
        if (!this.isActive()) {
          return;
        }
        let scrollpos = window.scrollY;
        let self2 = this;
        document.activeElement.blur();
        this.headerEls().forEach((el) => {
          let offset = el.offsetTop;
          if (offset > scrollpos && offset < scrollpos + 200) {
            let ol = this.$refs.ol;
            ol.querySelectorAll("li").forEach((liEl) => {
              let a = liEl.querySelector("a");
              if (!a.attributes || !a.attributes.href) {
                return;
              }
              let hash = `#${el.id}`;
              if (a.attributes.href.value === hash) {
                liEl.classList.add("active");
              } else {
                liEl.classList.remove("active");
              }
            });
            setProgress(self2, el);
          }
          if (window.innerHeight + scrollpos >= document.body.offsetHeight) {
            this.activeHeading.progress = 100;
          }
        });
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/promo-codes.js
  var debug14 = 0 ? console.log.bind(console, "[promo-codes]") : function() {
  };
  function newPromoCodesController(isTest) {
    let endpoint = "https://www.sitebay.org/wp-json/sitebay/v1/promo-data";
    if (isTest) {
      endpoint = "/docs/wptestjson/promo-data.json";
      if (window.__api_shouldfail) {
        endpoint = "/docs/wptestjson/promo-data-fail.json";
      }
    }
    debug14("isTest:", isTest, "endpoint:", endpoint);
    return {
      data: {
        foo: "bar",
        code: {}
      },
      signupURL: function(withPromo) {
        const baseURL = "https://my.sitebay.org/signup";
        let promo = this.promoCode();
        if (withPromo && promo) {
          return baseURL + "?promo=" + promo;
        }
        return baseURL;
      },
      promoCode: function() {
        if (this.data.code.promo_code) {
          return this.data.code.promo_code;
        }
        return "";
      },
      init: async function() {
        const response = await fetch(endpoint);
        if (response.ok) {
          let codes = await response.json();
          this.data.code = codes.docs;
          debug14("init code docs:", this.data);
        }
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/paginator.js
  var debug15 = 0 ? console.log.bind(console, "[paginator]") : function() {
  };
  function newPaginatorController() {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    const pageKey2 = "page";
    return {
      pages: [],
      items: [],
      page: 1,
      showAll: false,
      // Page navigation.
      current() {
        if (this.showAll) {
          return this.items;
        }
        return this.pages[this.currentPage() - 1];
      },
      currentPage() {
        return parseInt(this.page, 10);
      },
      first() {
        this.page = 1;
        scrollToTop();
      },
      last() {
        this.page = this.pages.length;
        scrollToTop();
      },
      next() {
        if (this.page < this.pages.length) {
          this.page++;
        }
        scrollToTop();
      },
      prev() {
        if (this.page > 0) {
          this.page--;
        }
        scrollToTop();
      },
      toggleAll() {
        this.showAll = !this.showAll;
        this.page = this.showAll ? -1 : 1;
        scrollToTop();
      },
      statusText() {
        if (this.showAll) {
          return "All Pages";
        }
        let current = this.currentPage();
        let total = this.pages.length;
        return `Page ${current} of ${total}`;
      },
      async initPaginator(url, pageSize) {
        this.page = getIntParamFromLocation(pageKey2);
        this.$watch("page", (page2) => {
          updatePaginationParamInLocation(pageKey2, page2);
        });
        let data2 = await fetch(url);
        let items = await data2.json();
        let pages = [];
        let page = [];
        for (let i = 0; i < items.length; i++) {
          page.push(items[i]);
          if (page.length >= pageSize) {
            pages.push(page);
            page = [];
          }
        }
        if (page.length > 0) {
          pages.push(page);
        }
        this.pages = pages;
        this.items = items;
        if (this.page < 0) {
          this.showAll = true;
        } else if (this.page < 1 || this.page > this.pages.length) {
          this.page = 1;
        }
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/helpers/smartqueue.js
  var noOp = () => {
  };
  function smartQueue(handler4, opts) {
    opts = opts || {};
    var timer, tmp, running;
    var queue2 = opts.initial || [];
    var max = opts.max || Infinity;
    var int = opts.interval || 1e4;
    var onEmpty = opts.onEmpty || noOp;
    var onPause = opts.onPause || noOp;
    function batch(all) {
      clearInterval(timer);
      var removed = queue2.splice(0, max);
      if (removed.length) {
        handler4(removed, queue2);
      }
      if (!queue2.length) {
        running = false;
        return onEmpty(queue2);
      }
      if (all) {
        return batch();
      }
      return ticker();
    }
    function ticker() {
      running = true;
      timer = setInterval(batch, int);
    }
    if (queue2.length) {
      ticker();
    }
    return {
      flush: function(all) {
        batch(all);
      },
      resume: batch,
      push: function(val) {
        tmp = queue2.push(val);
        if (tmp >= max && !opts.throttle) {
          batch();
        }
        if (!running) {
          ticker();
        }
        return tmp;
      },
      size: function() {
        return queue2.length;
      },
      pause: function(toFlush) {
        if (toFlush) batch();
        clearInterval(timer);
        running = false;
        onPause(queue2);
      }
      // end === pause
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/nav-analytics.js
  var unspecificedUserToken = "unspecified";
  var userTokenCookieName = "linode_anonymous_usertoken";
  var debug16 = 0 ? console.log.bind(console, "[nav-analytics]") : function() {
  };
  var AnalyticsEventsCollector = class {
    constructor(searchConfig2, getLastQueryID, onetrust) {
      this.headers = {
        "X-Algolia-Application-Id": searchConfig2.app_id,
        "X-Algolia-API-Key": searchConfig2.api_key
      };
      this.getLastQueryID = getLastQueryID, this.urlEvents = `https://insights.algolia.io/1/events`;
      this.onetrust = onetrust;
      this.anonomousUserToken = unspecificedUserToken;
      if (supportsCookies()) {
        this.anonomousUserToken = getCookie(userTokenCookieName);
        if (!this.anonomousUserToken) {
          this.anonomousUserToken = `anonomous-${createUUID()}`;
          setCookie(userTokenCookieName, this.anonomousUserToken, 30 * 24 * 60 * 60 * 1e3);
        }
      }
      this.currentPageTimer = null;
      var self2 = this;
      this.eventQueue = smartQueue(
        (items, restOfQueue) => {
        },
        {
          max: 20,
          // limit
          interval: 3e3,
          // 3s
          throttle: true,
          // Ensure only max is processed at interval
          onPause: () => {
          },
          onEmpty: (queue2, type) => {
          }
        }
      );
      if (searchConfig2.click_analytics) {
        const mergedIndex = searchConfig2.indexName(searchConfig2.sections_merged.index);
        const userToken = () => {
          if (onetrust.performance) {
            return this.anonomousUserToken;
          }
          return unspecificedUserToken;
        };
        const createEventFromObjectID = (objectID, eventType, eventName) => {
          const event = {
            eventType,
            eventName,
            index: mergedIndex,
            userToken: userToken(),
            timestamp: Date.now(),
            objectIDs: [objectID]
          };
          return event;
        };
        const createEventFromItem = (item) => {
          if (!item.objectID) {
            throw new Error("Item has no objectID");
          }
          const event = {
            eventType: item.eventType ? item.eventType : "view",
            eventName: item.eventName ? item.eventName : "Guide Viewed",
            index: item.__index ? item.__index : mergedIndex,
            queryID: item.__queryID ? item.__queryID : "",
            userToken: userToken(),
            timestamp: Date.now(),
            objectIDs: [item.objectID]
          };
          if (event.queryID && item.__position) {
            event.positions = [item.__position];
          }
          return event;
        };
        this.handler = {
          pushItem: (item) => {
            this.eventQueue.push(createEventFromItem(item));
          },
          startNewPage: () => {
            if (this.currentPageTimer) {
              this.currentPageTimer.stop();
            }
            this.currentPageTimer = {
              eventTimers: {
                "DOCS: Time-on-page 30 seconds": {
                  seconds: 30
                },
                "DOCS: Time-on-page 1 minute": {
                  seconds: 60
                },
                "DOCS: Time-on-page 5 minutes": {
                  seconds: 300
                }
              },
              eventDistance: {
                "DOCS: Scroll 50%": { distance: 0.5, fired: false },
                "DOCS: Scroll 75%": { distance: 0.75, fired: false }
              },
              scroll: {
                scrollTop: 0,
                height: 0
              },
              onScroll: () => {
                let scroll = this.currentPageTimer.scroll;
                if (!scroll.scrollHeight) {
                  return;
                }
                let scrollDistance = (window.scrollY - scroll.offsetTop) / scroll.scrollHeight;
                for (let eventName in this.currentPageTimer.eventDistance) {
                  const event = this.currentPageTimer.eventDistance[eventName];
                  if (event.fired) {
                    continue;
                  }
                  if (scrollDistance >= event.distance) {
                    if (document.body.dataset.objectid) {
                      debug16("convert", eventName, document.body.dataset.objectid);
                      this.handler.convertObject(document.body.dataset.objectid, eventName);
                    }
                    event.fired = true;
                  }
                }
              },
              start: () => {
                let mainEl = document.getElementsByTagName("main")[0];
                this.currentPageTimer.scroll = {
                  offsetTop: mainEl ? mainEl.offsetTop : 0,
                  scrollHeight: mainEl ? mainEl.scrollHeight : 0
                };
                for (let eventName in this.currentPageTimer.eventTimers) {
                  debug16("start", eventName);
                  const timer = this.currentPageTimer.eventTimers[eventName];
                  timer.timer = setTimeout(() => {
                    if (!document.body.dataset.objectid) {
                      return;
                    }
                    debug16("convert", eventName, document.body.dataset.objectid);
                    this.handler.convertObject(document.body.dataset.objectid, eventName);
                  }, timer.seconds * 1e3);
                }
              },
              stop: () => {
                for (let eventName in this.currentPageTimer.eventTimers) {
                  debug16("stop", eventName);
                  const timer = this.currentPageTimer.eventTimers[eventName];
                  if (timer.timer) {
                    clearTimeout(timer.timer);
                  }
                }
              }
            };
            this.currentPageTimer.start();
          },
          clickHit: (hit2, eventName) => {
            if (!hit2.__queryID) {
              hit2.__queryID = this.getLastQueryID();
              hit2.__position = 1;
            }
            const item = createEventFromItem(hit2);
            item.eventType = "click";
            item.eventName = eventName;
            this.eventQueue.push(item);
          },
          convertObject: (objectID, eventName) => {
            const event = createEventFromObjectID(objectID, "conversion", eventName);
            event.queryID = this.getLastQueryID();
            this.eventQueue.push(event);
          }
        };
      } else {
        this.handler = {
          click: () => {
          },
          view: () => {
          },
          conversion: () => {
          }
        };
      }
    }
    onScroll() {
      if (this.currentPageTimer) {
        this.currentPageTimer.onScroll();
      }
    }
    postEvents(events) {
      debug16("POST", events);
      fetch(this.urlEvents, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ events })
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      }).catch((err) => {
        console.log("Sending events to Algolia failed:", err);
      });
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/recommendations.js
  var import_lru2 = __toESM(require_lru());
  var debug17 = 0 ? console.log.bind(console, "[nav-recommendations]") : function() {
  };
  var RecommendationsFetcher = class {
    constructor(searchConfig2) {
      this.headers = {
        "X-Algolia-Application-Id": searchConfig2.recommendations.app_id,
        "X-Algolia-API-Key": searchConfig2.recommendations.api_key,
        "Content-Type": "application/json"
      };
      this.targetIndex = searchConfig2.recommendations.target_index;
      this.urlRecommendations = `https://${searchConfig2.recommendations.app_id}-dsn.algolia.net/1/indexes/*/recommendations`;
      this.cache = new import_lru2.LRUMap(20);
      this.queues = /* @__PURE__ */ new Map();
      debug17("constructor", this.targetIndex, this.urlRecommendations);
    }
    async fetch(objectID, targetArray, model = "related-products") {
      let request = {
        indexName: this.targetIndex,
        model,
        threshold: 25,
        maxRecommendations: 3,
        objectID
      };
      let key = JSON.stringify(request);
      let cached = this.cache.get(key);
      if (cached) {
        debug17("cached", objectID, model, cached.length);
        targetArray.length = 0;
        targetArray.push(...cached);
        return;
      }
      let queue2 = this.queues.get(key);
      if (queue2) {
        queue2.push(targetArray);
        debug17("in flight", objectID);
        return;
      } else {
        queue2 = [];
        queue2.push(targetArray);
        this.queues.set(key, queue2);
      }
      let url = this.urlRecommendations;
      let headers = this.headers;
      let body = JSON.stringify({ requests: [request] });
      let response = await fetch(url, {
        method: "POST",
        headers,
        body
      });
      if (!response.ok) {
        console.warn(`[nav-recommendations] fetchRecommendations failed: ${response.status} ${response.statusText}`);
        targetArray.length = 0;
        return;
      }
      let json = await response.json();
      let result = json.results[0];
      normalizeAlgoliaResult(result);
      let hits = await result.hits;
      this.cache.set(key, hits);
      debug17("fetch", objectID, model, hits.length);
      queue2 = this.queues.get(key);
      this.queues.delete(key);
      queue2.forEach((arr) => {
        arr.length = 0;
        arr.push(...hits);
        debug17("drain", objectID, model, hits.length);
      });
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/nav-store.js
  function newNavStore(searchConfig2, searchStore, params, Alpine2) {
    const debug22 = 0 ? console.log.bind(console, "[nav-store]") : function() {
    };
    return {
      // Stack used when we manipulate the navigation history and to track it so we can go back if needed.
      history: [],
      lang: "en",
      // Set by the language switcher.
      pinned: false,
      searchResults: {
        open: false,
        // Whether the search panel is open or not.
        userChange: false
        // Whether this is a user or a system change.
      },
      // State for the tabs shortcode.
      tabs: {
        // Holds ids for all active tabs.
        active: {},
        // Incremented to trigger a re-render of the tabs.
        counter: 0,
        // Ordinal of the last clicked tabs component.
        ordinal: 0
      },
      searchEvents: null,
      open: {
        explorer: !isMobile(),
        toc: false
      },
      onetrust: {
        required: false,
        performance: false,
        functional: false,
        targeting: false,
        socialmedia: false,
        toggleConsentDialog(event) {
          if (!window.OneTrust) {
            return;
          }
          debug22("toggleConsentDialog");
          window.OneTrust.ToggleInfoDisplay();
          event.preventDefault();
        }
      },
      recommendations: new RecommendationsFetcher(searchConfig2),
      init() {
        const tabsKey = "tabs";
        const urlDelimiter = ",";
        let url = new URL(window.location);
        let currentTabsString = url.searchParams.get(tabsKey);
        if (currentTabsString) {
          let activeTabs = currentTabsString.split(urlDelimiter);
          for (let tab of activeTabs) {
            this.tabs.active[tab] = true;
          }
        }
        Alpine2.effect(() => {
          if (this.tabs.counter) {
            let url2 = new URL(window.location);
            let currentTabsString2 = url2.searchParams.get(tabsKey);
            let activeTabs = [];
            for (let tab in this.tabs.active) {
              if (this.tabs.active[tab]) {
                activeTabs.push(tab);
              }
            }
            activeTabs.sort();
            let activeTabsString = activeTabs.join(urlDelimiter);
            if (currentTabsString2 !== activeTabsString) {
              let searchParams = new URLSearchParams(url2.search);
              searchParams.set(tabsKey, activeTabsString);
              let newUrl = url2.pathname + "?" + searchParams.toString();
              history.replaceState({ turbo: {} }, "", newUrl);
              debug22("tabs", activeTabsString);
            }
          }
        });
        let getLastQueryID = () => {
          return searchStore.results.lastQueryID;
        };
        this.analytics = new AnalyticsEventsCollector(searchConfig2, getLastQueryID, this.onetrust);
        let analyticsLoadEventPublished = false;
        let cb2 = () => {
          if (!analyticsLoadEventPublished && document.body.dataset.objectid) {
            analyticsLoadEventPublished = true;
            let analyticsItem = {
              __queryID: getLastQueryID(),
              objectID: document.body.dataset.objectid,
              event: "view",
              eventName: "DOCS: Guide Load"
            };
            this.analytics.handler.pushItem(analyticsItem);
            this.analytics.handler.startNewPage();
          }
        };
      },
      updateOptanonGroups(groups) {
        let groupArray = groups.split(",").filter(Boolean);
        this.onetrust.required = groupArray.includes("C0001");
        this.onetrust.performance = groupArray.includes("C0002");
        this.onetrust.functional = groupArray.includes("C0003");
        this.onetrust.targeting = groupArray.includes("C0004");
        this.onetrust.socialmedia = groupArray.includes("C0005");
        console.log("updateOptanonGroups", this.onetrust);
      },
      openSearchPanel(scrollUp = false) {
        if (!this.searchResults.open) {
          this.searchResults = { open: true, userChange: true };
          searchStore.searchToggle(true);
        }
        if (scrollUp) {
          this.scrollToNavBarIfPinned();
        }
      },
      openSearchPanelWithQuery(callback) {
        callback(searchStore.query);
        this.openSearchPanel(true);
      },
      goBack() {
        let href = this.history.pop();
        if (href) {
          history.back();
          return;
        }
        Turbo.visit("/docs");
      },
      pushState(href) {
        this.history.push(window.location.pathname);
        history.pushState({}, "", href);
      },
      pushTopResults(queryString) {
        let meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = "noindex";
        document.head.appendChild(meta);
        this.pushState("/docs/topresults/" + queryString);
      },
      scrollToNavBarIfPinned() {
        if (!this.pinned) {
          return;
        }
        let scrollPosNavbar = getScrollPosNavbar();
        window.scrollTo(0, scrollPosNavbar);
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/file-issue-button.js
  var debug18 = 0 ? console.log.bind(console, "[file-issue-button]") : function() {
  };
  function newFileIssueButton(conf) {
    return {
      isHovered: false,
      hoveredEl: null,
      isHoveredButton: false,
      timeoutID: null,
      // The issue items presented to the user.
      items: [],
      show() {
        return this.isHoveredButton || this.isHovered;
      },
      hoverButton() {
        this.items.length = 0;
        for (let item of conf.issue_templates) {
          let info = window.lnPageInfo;
          let file = "";
          if (info.path) {
            file = `https://github.com/sitebay/docs/blob/main/articles/${info.path}`;
          }
          let context = this.hoveredEl.textContent.trim();
          debug18("context:", context);
          let href = `${conf.repo_url}/issues/new?&template=${item.id}&file=${encodeURIComponent(
            file
          )}&context=${encodeURIComponent(context)}`;
          this.items.push({ title: item.title, href });
        }
        this.isHoveredButton = true;
      },
      hoverOn(hoveredEl) {
        if (this.isHovered) {
          debug18("hoverOn:", hoveredEl.tagName, "vs", this.hoveredEl.tagName);
          if (hoveredEl.tagName !== this.hoveredEl.tagName) {
            if (hoveredEl.contains(this.hoveredEl)) {
              debug18("skip");
              return;
            }
          } else {
            if (hoveredEl.tagName == "TD" || hoveredEl.tagName == "TH") {
              debug18("skip");
              return;
            }
          }
        }
        if (this.isHoveredButton) {
          this.isHoveredButton = false;
        }
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }
        debug18("hoverOn:", hoveredEl.tagName);
        if (hoveredEl.tagName === "PRE") {
          let parent = hoveredEl.parentNode;
          if (parent.tagName === "TD") {
            hoveredEl = parent.parentNode.parentNode;
            let tds = hoveredEl.querySelectorAll("td");
            hoveredEl = tds[tds.length - 1];
          }
        }
        this.isHovered = true;
        this.hoveredEl = hoveredEl;
        let el = this.$el;
        let container = el.parentNode;
        let distance = getOffsetTop(container, hoveredEl);
        el.style.position = "absolute";
        el.style.top = distance + "px";
        el.style.left = "0";
        el.style.zIndex = 5;
        this.timeoutID = setTimeout(() => {
          this.isHovered = false;
        }, 2500);
      },
      init() {
        return this.$nextTick(() => {
          if (isMobile()) {
            return;
          }
          let mainContentEl = document.getElementById("main__content");
          if (!mainContentEl) {
            return;
          }
          mainContentEl.querySelectorAll(".content").forEach((contentEl) => {
            contentEl.addEventListener(
              "mouseover",
              (e) => {
                switch (e.target.tagName) {
                  case "DL":
                  case "LI":
                  case "P":
                  case "PRE":
                  case "TD":
                  case "TH":
                    this.hoverOn(e.target);
                    break;
                  case "SPAN":
                  case "CODE":
                    let pre = e.target.closest("pre");
                    if (pre) {
                      this.hoverOn(pre);
                    }
                    break;
                  case "DIV":
                    let whitelist = ["file-issue-button-content", "note", "code"];
                    for (let w of whitelist) {
                      if (e.target.classList.contains(w)) {
                        this.hoverOn(e.target);
                        break;
                      }
                    }
                    break;
                  default:
                    debug18("default:", e.target.tagName);
                    break;
                }
              },
              { passive: true }
            );
          });
        });
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/navigation/svg-viewer.js
  var debug19 = 0 ? console.log.bind(console, "[svg-viewer]") : function() {
  };
  var getTransformParameters = (element) => {
    const transform = element.style.transform;
    let scale = 1, j;
    x = 0, y = 0;
    if (transform.includes("scale")) scale = parseFloat(transform.slice(transform.indexOf("scale") + 6));
    if (transform.includes("translateX")) x = parseInt(transform.slice(transform.indexOf("translateX") + 11));
    if (transform.includes("translateY")) y = parseInt(transform.slice(transform.indexOf("translateY") + 11));
    return { scale, x, y };
  };
  var animationClass = "large-diagram-animate";
  var getTransformString = (scale, x2, y2) => "scale(" + scale + ") translateX(" + x2 + "px) translateY(" + y2 + "px)";
  var maxZoom = 7;
  var minZoom = 0.75;
  var SvgViewer = class {
    constructor(container, el) {
      this.el = el;
      this.container = container;
      this.dragState = {
        dragging: false,
        lastX: 0,
        lastY: 0
      };
      this.zoomState = {
        zooming: false
      };
    }
    reset() {
      let svg = this.el;
      svg.style.transform = getTransformString(1, 0, 0);
    }
    zoom(dscale) {
      let svg = this.el;
      const { scale, x: x2, y: y2 } = getTransformParameters(svg);
      let newScale = scale + dscale;
      if (newScale > maxZoom || newScale < minZoom) {
        return;
      }
      svg.style.transform = getTransformString(newScale, x2, y2);
    }
    panDirection(direction) {
      let dx = 0, dy = 0;
      const speed = 30;
      switch (direction) {
        case "left":
          dx = speed;
          break;
        case "right":
          dx = -speed;
          break;
        case "up":
          dy = speed;
          break;
        case "down":
          dy = -speed;
          break;
      }
      let svg = this.el;
      const { scale, x: x2, y: y2 } = getTransformParameters(svg);
      svg.style.transform = getTransformString(scale, x2 + dx, y2 + dy);
    }
    pan(clientX, clientY) {
      if (!this.dragState.dragging) {
        return;
      }
      let svg = this.el;
      const { scale, x: x2, y: y2 } = getTransformParameters(svg);
      let dx = clientX - this.dragState.lastX;
      let dy = clientY - this.dragState.lastY;
      this.dragState.lastX = clientX;
      this.dragState.lastY = clientY;
      svg.style.transform = getTransformString(scale, x2 + dx, y2 + dy);
    }
    activate() {
      if (this.active) {
        return;
      }
      this.active = true;
      this.container.classList.remove(animationClass);
      if (!isMobile()) {
        this.container.addEventListener("wheel", (e) => {
          e.preventDefault();
          let scale = e.deltaY < 0 ? 0.1 : -0.1;
          this.zoom(scale);
        });
        this.el.addEventListener(
          "mousedown",
          (e) => {
            this.dragState.dragging = true;
            this.dragState.lastX = e.clientX;
            this.dragState.lastY = e.clientY;
          },
          { passive: true }
        );
        document.addEventListener(
          "mousemove",
          (e) => {
            this.pan(e.clientX, e.clientY);
          },
          { passive: true }
        );
        document.addEventListener(
          "mouseup",
          (e) => {
            this.dragState.dragging = false;
          },
          { passive: true }
        );
      }
    }
  };
  function newSVGViewerController(opts) {
    let { diagramDescriptionID } = opts;
    let diagramDescriptionEl = document.getElementById(diagramDescriptionID);
    return {
      svgViewer: null,
      // Toggle for a modal view of the diagram.
      showModal: false,
      tooltip: {
        show: false,
        content: "",
        style: ""
      },
      activate() {
        this.svgViewer.activate();
      },
      toggleModal() {
        this.showModal = !this.showModal;
      },
      zoom(n) {
        this.svgViewer.zoom(n / 3);
      },
      pan(direction) {
        this.svgViewer.panDirection(direction);
      },
      init: function() {
        this.$watch("showModal", (val) => {
          debug19("showModal", val);
          this.svgViewer.reset();
          this.$el.classList.remove("on-load");
          let frame = this.$el.querySelector(".large-diagram-svg-frame");
          let modalWrapper = this.$el.querySelector(".large-diagram-svg-modal-wrapper");
          let svgContainerModal = this.$el.querySelector(".svg-container-modal");
          if (val) {
            svgContainerModal.replaceChildren(...[frame]);
          } else {
            modalWrapper.appendChild(frame);
          }
        });
        this.$nextTick(() => {
          let container = this.$el;
          let svg = this.$el.querySelector(".svg-container");
          if (!isMobile()) {
            let bullets = svg.querySelectorAll(".bullet");
            let bulletsArray = Array.from(bullets);
            bulletsArray.forEach((bullet) => {
              bullet.addEventListener("mouseleave", () => {
                this.tooltip.show = false;
              });
              bullet.addEventListener("mouseover", (e) => {
                if (this.tooltip.show) {
                  return;
                }
                let l1 = 0;
                let l2 = 0;
                let classNames = bullet.classList;
                classNames.forEach((className) => {
                  if (className.match(/bullet-\d/)) {
                    let parts = className.split("-");
                    if (parts.length === 2) {
                      l1 = parseInt(parts[1]);
                    } else if (parts.length === 3) {
                      l1 = parseInt(parts[1]);
                      l2 = parseInt(parts[2]);
                    }
                  }
                });
                if (l1 > 0) {
                  let diagramDescriptionList = diagramDescriptionEl.children;
                  let diagramDescriptionListArray = Array.from(diagramDescriptionList);
                  let idx = l1 - 1;
                  if (idx >= 0 && idx < diagramDescriptionListArray.length) {
                    let targetLi = diagramDescriptionListArray[idx];
                    if (l2 > 0) {
                      let subListItems = targetLi.querySelectorAll("li");
                      if (subListItems) {
                        let subListItemsArray = Array.from(subListItems);
                        let subIdx = l2 - 1;
                        if (subIdx >= 0 && subIdx < subListItemsArray.length) {
                          targetLi = subListItemsArray[subIdx];
                        }
                      }
                    }
                    let clone2 = targetLi.cloneNode(true);
                    let ignoredEls = clone2.querySelectorAll("ol, .note");
                    ignoredEls.forEach((nestedList) => {
                      nestedList.parentNode.removeChild(nestedList);
                    });
                    this.tooltip.content = clone2.innerHTML;
                    if (l2 > 0) {
                      this.tooltip.number = `${l1}${numberToLowerAlpha(l2)}`;
                    } else {
                      this.tooltip.number = l1;
                    }
                    let svgContainer = this.$el.querySelector(".large-diagram-svg-container");
                    let bounds = svgContainer.getBoundingClientRect();
                    let distanceY = (e.clientY - bounds.top) / svgContainer.offsetHeight;
                    if (distanceY > 0.5) {
                      this.tooltip.style = "top: 0; bottom: auto;";
                    } else {
                      this.tooltip.style = "top: auto; bottom: 0;";
                    }
                    this.tooltip.show = true;
                  }
                }
              });
            });
          }
          this.svgViewer = new SvgViewer(container, svg);
        });
      }
    };
  }
  function numberToLowerAlpha(n) {
    let a = "a".charCodeAt(0);
    return String.fromCharCode(a + n - 1);
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/helpers/swipe.js
  function newSwiper(el, callback) {
    const moveThreshold = 50;
    var touches = {
      touchstart: { x: -1, y: -1 },
      touchmove: { x: -1, y: -1 }
    };
    touches.direction = function() {
      if (this.touchmove.x == -1) {
        return "";
      }
      let distance = this.touchmove.x - this.touchstart.x;
      if (Math.abs(distance) < moveThreshold) {
        return "";
      }
      return distance > 0 ? "right" : "left";
    };
    touches.reset = function() {
      this.touchstart.x = -1, this.touchstart.y = -1;
      this.touchmove.x = -1, this.touchmove.y = -1;
    };
    touches.update = function(event, touch) {
      this[event.type].x = touch.pageX;
      this[event.type].y = touch.pageY;
    };
    var handleTouch = function(event) {
      if (typeof event !== "undefined" && typeof event.touches !== "undefined") {
        var touch = event.touches[0];
        switch (event.type) {
          case "touchstart":
            touches.reset();
            touches.update(event, touch);
            break;
          case "touchmove":
            touches.update(event, touch);
            break;
          case "touchend":
            let direction = touches.direction();
            if (direction) {
              callback(direction);
            }
            break;
          default:
            break;
        }
      }
    };
    el.addEventListener("touchstart", handleTouch, { passive: true });
    el.addEventListener("touchmove", handleTouch, { passive: true });
    el.addEventListener("touchend", handleTouch, { passive: true });
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/sections/home/home.js
  var debug20 = 0 ? console.log.bind(console, "[home]") : function() {
  };
  function newHomeController(searchConfig2, staticData) {
    debug20("newHomeController");
    const sectionLevel0s = ["blog", "resources"];
    const tilesAlgoliaPreloadItems = isMobile() ? 12 : 30;
    const requestFromSection = function(name) {
      return {
        page: 0,
        params: `query=&hitsPerPage=${tilesAlgoliaPreloadItems}`,
        indexName: searchConfig2.indexName(searchConfig2.sections_merged.index_by_pubdate),
        facets: ["section.*"],
        filters: `section.lvl0:${name} AND NOT excludeFromViews:home`
      };
    };
    const tilesPageSize = 6;
    const tilesPageSizeMobile = 2;
    const newPager = function(pageSize, el, items = null) {
      if (!el) {
        throw "pager element must be provided";
      }
      debug20("newPager");
      if (!items) {
        items = [];
        for (let i = 0; i < tilesAlgoliaPreloadItems; i++) {
          let href = `#dummy${i}`;
          let item = { linkTitle: "", href, objectID: href };
          item.excerptTruncated = function() {
          };
          items.push(item);
        }
      }
      let pager = {
        index: 0,
        // current slide, zero based.
        numPages: 0,
        // The total number of pages.
        pageSize,
        // The number of slides per page.
        showNavigation: false,
        // Whether to show the prev/next and the progress bar.
        el,
        // The carousel DOM element.
        items
        // The items; an item must have a linkTitle and an href set.
      };
      pager.toggleShowNavigation = function(show) {
        this.showNavigation = show;
      };
      pager.setItems = function(items2) {
        if (!this.el) {
          return;
        }
        this.items = items2;
        this.initItems();
      };
      pager.initItems = function() {
        this.el.style.setProperty("--carousel-slide-count", this.items.length);
        this.refreshPageSize();
        this.adjustIndex(0);
      };
      pager.adjustIndex = function(incr) {
        let index = this.index + incr;
        if (index < 0) {
          index = 0;
        } else if (index >= this.items.length) {
          index = this.items.length - 1;
        }
        this.index = index;
        this.el.style.setProperty("--carousel-slide", this.index);
      };
      pager.refreshPageSize = function() {
        let psEl = this.el.querySelector(".page-size");
        let style = getComputedStyle(psEl);
        let ps = style.getPropertyValue("z-index");
        let pageSize2 = parseInt(ps, 10);
        this.numPages = Math.ceil(this.items.length / pageSize2);
        if (pageSize2 !== this.pageSize) {
          this.pageSize = pageSize2;
          this.adjustIndex(0);
        }
      };
      pager.hasNext = function() {
        return this.index + this.pageSize < this.items.length;
      };
      pager.next = function() {
        this.adjustIndex(1 * this.pageSize);
      };
      pager.hasPrev = function() {
        return this.index > 0;
      };
      pager.prev = function() {
        this.adjustIndex(-1 * this.pageSize);
      };
      pager.page = function() {
        return Math.ceil((this.index + 1) / this.pageSize);
      };
      pager.progress = function() {
        if (this.numPages === 0) {
          return [];
        }
        let page = this.page();
        let progressSlice = [];
        for (let i = 1; i <= this.numPages; i++) {
          progressSlice.push(i <= page);
        }
        return progressSlice;
      };
      let pageSizeXl = pageSize;
      let pageSizeLg = pageSize === tilesPageSizeMobile ? tilesPageSizeMobile : pageSize - 1;
      let pageSizeMd = pageSize === tilesPageSizeMobile ? tilesPageSizeMobile : pageSize - 2;
      pager.el.style.setProperty("--carousel-page-size--mobile", tilesPageSizeMobile);
      pager.el.style.setProperty("--carousel-page-size--xl", pageSizeXl);
      pager.el.style.setProperty("--carousel-page-size--lg", pageSizeLg);
      pager.el.style.setProperty("--carousel-page-size--md", pageSizeMd);
      pager.initItems();
      if (isTouchDevice()) {
        newSwiper(el, function(direction) {
          switch (direction) {
            case "left":
              pager.next();
              break;
            case "right":
              pager.prev();
              break;
          }
        });
      }
      return pager;
    };
    let sectionTiles = {};
    return {
      data: {
        sectionTiles
      },
      loaded: false,
      destroyed: false,
      menuStateChanging: false,
      init: function() {
        debug20("init");
        this.$nextTick(() => {
          debug20("init: nextTick");
          console.log(sectionLevel0s);
          sectionLevel0s.forEach((name) => {
            let el = this.$refs[`carousel-${name}`];
            let pager = newPager(tilesPageSize, el);
            this.data.sectionTiles[name] = pager;
          });
          this.loaded = true;
        });
      },
      destroy: function() {
        this.destroyed = true;
        Object.values(sectionTiles).forEach((tile) => {
          tile.el = null;
        });
      },
      initCarousels: function() {
        debug20("initCarousels");
        console.log(sectionLevel0s);
        this.$nextTick(() => {
          sectionLevel0s.forEach((name) => {
            let factory = {
              status: function() {
                return 2 /* Once */;
              },
              create: () => {
                return newRequestCallback(requestFromSection(name), (result) => {
                  this.data.sectionTiles[name].setItems(result.hits);
                });
              }
            };
            this.$store.search.addSearches(newRequestCallbackFactoryTarget(factory, 2 /* AdHoc */));
          });
        });
      },
      onEffect: function() {
        if (this.destroyed) {
          return;
        }
        let el = this.$store.nav.open.explorer;
        this.onNavChange(true);
      },
      // onNavChange triggers on screen resize or e.g. if the explorer opens/closes.
      // The slide width may have changed so the pager number of pages may have changed.
      onNavChange: function(menuStateChange = false) {
        if (this.destroyed) {
          return;
        }
        if (menuStateChange) {
          this.menuStateChanging = true;
        }
        for (let i in this.data.sectionTiles) {
          this.data.sectionTiles[i].refreshPageSize();
        }
        if (menuStateChange) {
          this.menuStateChanging = false;
        }
      }
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/sitebay/sitebay-docs-theme/assets/js/main/sections/sections/list.js
  var debug21 = 0 ? console.log.bind(console, "[list]") : function() {
  };
  var pageKey = "page";
  var designMode = false;
  function newSectionsController(searchConfig2, params) {
    if (!searchConfig2) {
      throw "newSectionsController: must provide searchConfig";
    }
    const hrefFactory = newCreateHref(searchConfig2);
    const updateSearches = function(self2, page) {
      if (page < 1) {
        page = 1;
      }
      let factory = {
        status: function() {
          return 2 /* Once */;
        },
        create: (query) => {
          let filters = `section.lvl${self2.data.lvl}:'${self2.key}'`;
          encodeURIComponent(query.lndq);
          let request = {
            page: page - 1,
            // paginator is 1 based, Algolia is 0 based.
            indexName: searchConfig2.indexName(searchConfig2.sections_merged.index_by_pubdate),
            facets: ["section.*"],
            filters,
            facetFilters: query.toFacetFilters(),
            params: `query=${query.lndq}`
          };
          return newRequestCallback(request, (result) => {
            self2.$store.search.withBlank(() => {
              self2.handleResult(result);
              self2.$nextTick(() => {
                self2.$store.nav.scrollToNavBarIfPinned();
              });
            });
          });
        }
      };
      self2.$store.search.addSearches(newRequestCallbackFactoryTarget(factory, 1 /* Main */));
    };
    const activateSearches = function(self2) {
      self2.$store.search.updateLocationWithQuery();
      let page = getIntParamFromLocation(pageKey);
      if (page < 1) {
        page = 1;
      }
      self2.data.page = page;
      self2.$watch("data.page", (value, oldValue) => {
        if (value === oldValue) {
          return;
        }
        updatePaginationParamInLocation(pageKey, value, 1);
        updateSearches(self2, value);
      });
      updateSearches(self2, self2.data.page);
    };
    function sortObject(obj, less) {
      return Object.keys(obj).sort(less).reduce(function(result, key) {
        result[key] = obj[key];
        return result;
      }, {});
    }
    var sortOptions = [
      {
        title: "Sort by Category",
        field: "",
        sortSections: true,
        firstText: "Ascending",
        secondText: "Descending",
        enabled: true,
        down: false
      },
      {
        title: "Sort Alphabetically",
        field: "linkTitle",
        firstText: "Ascending",
        secondText: "Descending",
        enabled: false,
        down: false
      },
      {
        title: "Sort by Published date",
        field: "firstPublishedTime",
        firstText: "Newest first",
        secondText: "Oldest first",
        moreIsLess: true,
        enabled: false,
        down: false
      },
      {
        title: "Sort by Modified date",
        field: "lastUpdatedTime",
        firstText: "Newest first",
        secondText: "Oldest first",
        moreIsLess: true,
        enabled: false,
        down: false
      }
    ];
    return {
      uiState: {
        // When togled on we show a list of all descendant guides.
        listGuidesPerSection: false,
        // When togled on we show a list of all the guides in this section.
        // This is enabled for bottom level only
        listGuides: false,
        // Enabled  on first level or when we get to the bottom level.
        noToggleGuidesLink: false,
        sorting: {
          options: sortOptions,
          open: false
        }
      },
      loaded: false,
      // if data is loaded from Algolia
      status: { code: 200 },
      // error state
      data: {
        result: {
          hits: []
        },
        page: 1,
        // For pagination.
        meta: {
          title: "",
          excerpt: ""
        },
        key: "",
        sections: [],
        hitsBySection: {},
        lvl: 0
      },
      init: function() {
        return this.$nextTick(() => {
          if (designMode) {
            this.uiState.listGuidesPerSection = true;
            this.uiState.sorting.open = true;
          }
          let parts = hrefFactory.sectionsFromPath();
          let last = parts[parts.length - 1];
          let indexName = parts[0];
          this.key = parts.join(" > ");
          let sectionConfig = searchConfig2.sectionsSorted.find((s) => s.name === indexName);
          if (!sectionConfig) {
            throw `no search config found for section ${indexName}`;
          }
          this.data.lvl = parts.length - 1;
          this.data.sectionConfig = sectionConfig;
          activateSearches(this);
          this.data.meta.title = last.charAt(0).toUpperCase() + last.slice(1);
          var self2 = this;
          this.uiState.sorting.sort = function(opt) {
            this.options.forEach((o) => {
              o.enabled = opt === o;
            });
            if (opt.sortSections) {
              self2.data.hitsBySection = sortObject(self2.data.hitsBySection, (a, b) => {
                if (opt.down) {
                  return a < b ? 1 : -1;
                }
                return a < b ? -1 : 1;
              });
              return;
            }
            self2.data.result.hits.sort((a, b) => {
              let f1 = a[opt.field];
              let f2 = b[opt.field];
              if (f1 === f2) {
                return 0;
              }
              if (opt.moreIsLess && !opt.down || !opt.moreIsLess && opt.down) {
                return f1 < f2 ? 1 : -1;
              }
              return f1 < f2 ? -1 : 1;
            });
          };
          this.uiState.showSectionsTiles = function() {
            if (!self2.loaded) {
              return false;
            }
            return !this.listGuidesPerSection && !this.listGuides;
          };
          this.uiState.showGuidesWithSortOption = function() {
            if (!self2.loaded) {
              return false;
            }
            return this.listGuidesPerSection && !this.listGuides;
          };
          this.uiState.showGuidesPerSection = function() {
            return this.listGuidesPerSection && (!this.sorting.open || this.sorting.options[0].enabled);
          };
          this.uiState.showSortedGuideList = function() {
            if (!self2.loaded) {
              return false;
            }
            return this.listGuidesPerSection && this.sorting.open && !this.sorting.options[0].enabled;
          };
          this.uiState.showGuidesTiles = function() {
            if (!self2.loaded) {
              return false;
            }
            return this.listGuides;
          };
        });
      },
      handleResult: function(result) {
        debug21("handleResult", result);
        this.data.result = result;
        let sectionMeta = this.$store.search.results.blank.getSectionMeta(this.key);
        if (sectionMeta) {
          this.data.meta = sectionMeta;
        } else {
          if (!(this.data.result && this.data.result.nbHits)) {
            this.status.code = 404;
            this.status.message = "Page Not Found";
            return;
          }
        }
        this.status.code = 200;
        let seoTitle = this.data.meta.title;
        if (this.data.lvl == 0 && this.data.sectionConfig.seo_title_template) {
          seoTitle = this.data.sectionConfig.seo_title_template;
        } else if (this.data.sectionConfig.seo_title_template_category) {
          seoTitle = this.data.sectionConfig.seo_title_template_category.replace("{category}", this.data.meta.title);
        }
        setDocumentMeta({
          title: seoTitle + " | " + params.page_title_suffix
        });
        let facets = this.data.result.facets;
        let nextLevel = this.data.lvl + 1;
        let sectionFacet = facets[`section.lvl${nextLevel}`];
        if (sectionFacet) {
          this.data.result.hits.sort((a, b) => a.section < b.section ? -1 : 1);
        }
        let hitsBySection = this.data.result.hits.reduce(function(h, hit2) {
          h[hit2.section] = (h[hit2.section] || []).concat(hit2);
          return h;
        }, {});
        this.data.hitsBySection = hitsBySection;
        var self2 = this;
        var assembleSections = function(parts) {
          let sections = [];
          if (!parts) {
            return sections;
          }
          let sectionKeys = [];
          for (let section of parts) {
            sectionKeys.push(section);
            let key2 = sectionKeys.join(" > ");
            let sm = self2.$store.search.results.blank.getSectionMeta(key2);
            if (sm) {
              sections.push(sm);
            }
          }
          return sections;
        };
        this.data.sectionsFromKey = function(key2) {
          return assembleSections(key2.split(" > "));
        };
        if (this.data.lvl === 0) {
          this.uiState.noToggleGuidesLink = true;
        } else if (!sectionFacet) {
          this.uiState.listGuides = true;
          this.uiState.noToggleGuidesLink = true;
          this.loaded = true;
          return;
        }
        let newSection = function(key2, value) {
          let m = self2.$store.search.results.blank.getSectionMeta(key2);
          let s = { key: key2, title: "", linkTitle: "", thumbnail: "", count: value };
          s.href = hrefFactory.hrefSection(key2);
          if (m) {
            s.title = m.title;
            s.linkTitle = m.linkTitle || m.title;
            s.thumbnail = m.thumbnail;
            s.thumbnailInline = m.thumbnailInline || m.thumbnailinline;
          }
          if (s.linkTitle === "") {
            let last = key2.split(" > ").pop();
            s.linkTitle = last.charAt(0).toUpperCase() + last.slice(1);
          }
          return s;
        };
        this.data.sections = [];
        for (var key in sectionFacet) {
          this.data.sections.push(newSection(key.toLowerCase(), sectionFacet[key]));
        }
        this.loaded = true;
      },
      toggleShowGuides: function() {
        this.uiState.listGuidesPerSection = !this.uiState.listGuidesPerSection;
      },
      incrPage: function(num) {
        let page = this.data.page + num;
        if (page < 1) {
          page = 1;
        }
        this.data.page = page;
      }
    };
  }

  // <stdin>
  var searchConfig = getSearchConfig(params_exports);
  (function() {
    window.OptanonWrapper = function() {
      const e = new CustomEvent("onetrust:groups-updated", { detail: OnetrustActiveGroups });
      window.dispatchEvent(e);
    };
  })();
  (function() {
    if (window.Cypress) {
      window.truste = {};
      window.addEventListener("unhandledrejection", function(e) {
        console.error(e);
        return false;
      });
    }
    __stopWatch("index.js.start");
    {
      module_default.plugin(module_default2);
      module_default.plugin(module_default3);
    }
    {
      alpineRegisterMagicHelpers(module_default);
      alpineRegisterDirectiveSVG(module_default);
    }
    let fetchController = function(url) {
      return {
        data: {},
        init: async function() {
          let res = await fetch(url);
          if (res.ok) {
            this.data = await res.json();
          }
        }
      };
    };
    {
      module_default.data("lncNav", () => newNavController(weglot_api_key));
      module_default.data("lncLanguageSwitcher", newLanguageSwitcherController(weglot_api_key));
      module_default.data("lncSearchFilters", () => newSearchFiltersController(searchConfig));
      module_default.data("lncSearchInput", newSearchInputController);
      module_default.data("lncSearchExplorerNode", (node = {}) => newSearchExplorerNode(searchConfig, node));
      module_default.data("lncSearchExplorerInitial", () => newSearchExplorerInitial());
      module_default.data("lncSearchExplorerHydrated", () => newSearchExplorerHydrated(searchConfig));
      module_default.data("lncToc", newToCController);
      module_default.data("lncBreadcrumbs", () => newBreadcrumbsController(searchConfig));
      module_default.data("lncDropdowns", newDropdownsController);
      module_default.data("lncTabs", newTabsController);
      module_default.data("lncDisqus", newDisqus);
      module_default.data("lncPaginator", newPaginatorController);
      module_default.data("lncPromoCodes", () => newPromoCodesController(is_test));
      module_default.data("lncFetch", fetchController);
      module_default.data("lnvSVGViewer", newSVGViewerController);
      if (file_issue_button && file_issue_button.enable) {
        module_default.data("lncFileIssueButton", () => newFileIssueButton(file_issue_button));
      }
      module_default.data("lncHome", (staticData) => {
        return newHomeController(searchConfig, staticData);
      });
      module_default.data("lncSections", () => newSectionsController(searchConfig, params_exports));
      if (!void 0) {
        module_default.data("lncLeakChecker", () => leackChecker(module_default));
      }
    }
    {
      module_default.store("search", newSearchStore(searchConfig, params_exports, module_default));
      module_default.store("nav", newNavStore(searchConfig, module_default.store("search"), params_exports, module_default));
    }
    module_default.start();
    bridgeTurboAndAlpine(module_default);
  })();
  (function() {
    if (!window.__stopWatch) {
      window.__stopWatch = function(name) {
      };
    }
    window.gtag = function(event) {
      this.dataLayer = this.dataLayer || [];
      this.dataLayer.push(event);
    };
    let pushDataLayer = function(eventName) {
      let event = {
        event: eventName
      };
      if (window._dataLayer) {
        while (window._dataLayer.length) {
          let obj = window._dataLayer.pop();
          for (const [key, value] of Object.entries(obj)) {
            event[key] = value;
          }
        }
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(event);
    };
    document.addEventListener("turbo:load", function(event) {
      if (window.turbolinksLoaded) {
        return;
      }
      toggleBooleanClass("turbo-loaded", document.documentElement, true);
      window.turbolinksLoaded = true;
      setTimeout(function() {
        pushDataLayer("docs_load");
      }, 2e3);
    });
    document.addEventListener("turbo:before-render", function(event) {
      let body = event.detail.newBody;
      setIsTranslating(body.querySelectorAll(".hide-on-lang-nav"));
    });
    document.addEventListener("turbo:render", function(event) {
      if (document.documentElement.hasAttribute("data-turbo-preview")) {
        return;
      }
      reloadOTBanner();
      pushDataLayer("docs_navigate");
    });
    if (!window.scrollPositions) {
      window.scrollPositions = {};
    }
    if (!window.scrollHandledByClick) {
      window.scrollHandledByClick = {};
    }
    function turboClick(e) {
      if (e.detail.url.includes("/docs/api")) {
        e.preventDefault();
      }
    }
    function preserveScroll(e) {
      document.querySelectorAll("[data-preserve-scroll]").forEach((el) => {
        let target = e.target;
        let isChild = false;
        while (target) {
          if (target === el) {
            isChild = true;
            break;
          }
          target = target.parentElement;
        }
        if (isChild) {
          scrollPositions[el.id] = el.scrollTop;
          scrollHandledByClick[el.id] = true;
        }
      });
    }
    function restoreScroll(e) {
      if (!window.turbolinksLoaded) {
        return;
      }
      const isFinalRender = e.type === "turbo:render" && !document.documentElement.hasAttribute("data-turbo-preview");
      document.querySelectorAll("[data-preserve-scroll]").forEach((element) => {
        let id = element.id;
        let scrollPos = scrollPositions[id];
        if (!scrollPos) {
          return;
        }
        element.scrollTop = scrollPos;
        if (isFinalRender) {
          delete scrollPositions[id];
        }
      });
      if (!e.detail || !e.detail.newBody) return;
      e.detail.newBody.querySelectorAll("[data-preserve-scroll]").forEach((element) => {
        let id = element.id;
        element.scrollTop = scrollPositions[id];
      });
    }
    window.addEventListener("turbo:click", preserveScroll);
    window.addEventListener("turbo:click", turboClick);
    window.addEventListener("turbo:before-render", restoreScroll);
    window.addEventListener("turbo:render", restoreScroll);
  })();
  function reloadOTBanner() {
    var otConsentSdk = document.getElementById("onetrust-consent-sdk");
    if (otConsentSdk) {
      otConsentSdk.remove();
    }
    if (window.OneTrust != null) {
      OneTrust.Init();
      setTimeout(function() {
        OneTrust.LoadBanner();
        var toggleDisplay = document.getElementsByClassName("ot-sdk-show-settings");
        for (var i = 0; i < toggleDisplay.length; i++) {
          toggleDisplay[i].onclick = function(event) {
            event.stopImmediatePropagation();
            window.OneTrust.ToggleInfoDisplay();
          };
        }
      }, 1e3);
    }
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9oZWxwZXJzL2xydS5qcyIsICJucy1wYXJhbXM6QHBhcmFtcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2dvaHVnb2lvL2h1Z28tbW9kLWpzbGlicy1kaXN0L2FscGluZWpzL3YzL3BhY2thZ2VzL2FscGluZWpzL2Rpc3QvbW9kdWxlLmVzbS5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2dvaHVnb2lvL2h1Z28tbW9kLWpzbGlicy1kaXN0L2FscGluZWpzL3YzL3BhY2thZ2VzL2ludGVyc2VjdC9kaXN0L21vZHVsZS5lc20uanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9nb2h1Z29pby9odWdvLW1vZC1qc2xpYnMtZGlzdC9hbHBpbmVqcy92My9wYWNrYWdlcy9wZXJzaXN0L2Rpc3QvbW9kdWxlLmVzbS5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL2FscGluZS10dXJiby1icmlkZ2UuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9jb21wb25lbnRzL2Rpc3F1cy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL2NvbXBvbmVudHMvZHJvcGRvd25zLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vY29tcG9uZW50cy9zdmcuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9oZWxwZXJzL2hlbHBlcnMuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9jb21wb25lbnRzL21hZ2ljLWhlbHBlcnMuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9jb21wb25lbnRzL3RhYnMuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9oZWxwZXJzL2xlYWstY2hlY2tlci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL25hdmlnYXRpb24vY3JlYXRlLWhyZWYuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9uYXZpZ2F0aW9uL2JyZWFkY3J1bWJzLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vc2VhcmNoL3JlcXVlc3QudHMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9uYXZpZ2F0aW9uL2V4cGxvcmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vbmF2aWdhdGlvbi9sYW5nLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vbmF2aWdhdGlvbi9sYW5ndWFnZS1zd2l0Y2hlci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL3NlYXJjaC9zZWFyY2gtc3RvcmUuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9zZWFyY2gvcXVlcnkudHMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9zZWFyY2gvZmlsdGVycy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL3NlYXJjaC9pbnB1dC5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL25hdmlnYXRpb24vbmF2LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vbmF2aWdhdGlvbi90b2MuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9uYXZpZ2F0aW9uL3Byb21vLWNvZGVzLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vbmF2aWdhdGlvbi9wYWdpbmF0b3IuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9oZWxwZXJzL3NtYXJ0cXVldWUuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9uYXZpZ2F0aW9uL25hdi1hbmFseXRpY3MuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9uYXZpZ2F0aW9uL3JlY29tbWVuZGF0aW9ucy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL25hdmlnYXRpb24vbmF2LXN0b3JlLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vc2l0ZWJheS9zaXRlYmF5LWRvY3MtdGhlbWUvYXNzZXRzL2pzL21haW4vbmF2aWdhdGlvbi9maWxlLWlzc3VlLWJ1dHRvbi5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL25hdmlnYXRpb24vc3ZnLXZpZXdlci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2Fzc2V0cy9qcy9tYWluL2hlbHBlcnMvc3dpcGUuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9zZWN0aW9ucy9ob21lL2hvbWUuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9zaXRlYmF5L3NpdGViYXktZG9jcy10aGVtZS9hc3NldHMvanMvbWFpbi9zZWN0aW9ucy9zZWN0aW9ucy9saXN0LmpzIiwgIjxzdGRpbj4iXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQSBkb3VibHkgbGlua2VkIGxpc3QtYmFzZWQgTGVhc3QgUmVjZW50bHkgVXNlZCAoTFJVKSBjYWNoZS4gV2lsbCBrZWVwIG1vc3RcbiAqIHJlY2VudGx5IHVzZWQgaXRlbXMgd2hpbGUgZGlzY2FyZGluZyBsZWFzdCByZWNlbnRseSB1c2VkIGl0ZW1zIHdoZW4gaXRzIGxpbWl0XG4gKiBpcyByZWFjaGVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVC4gQ29weXJpZ2h0IChjKSAyMDEwIFJhc211cyBBbmRlcnNzb24gPGh0dHA6Ly9odW5jaC5zZS8+XG4gKiBTZWUgUkVBRE1FLm1kIGZvciBkZXRhaWxzLlxuICpcbiAqIElsbHVzdHJhdGlvbiBvZiB0aGUgZGVzaWduOlxuICpcbiAqICAgICAgIGVudHJ5ICAgICAgICAgICAgIGVudHJ5ICAgICAgICAgICAgIGVudHJ5ICAgICAgICAgICAgIGVudHJ5XG4gKiAgICAgICBfX19fX18gICAgICAgICAgICBfX19fX18gICAgICAgICAgICBfX19fX18gICAgICAgICAgICBfX19fX19cbiAqICAgICAgfCBoZWFkIHwubmV3ZXIgPT4gfCAgICAgIHwubmV3ZXIgPT4gfCAgICAgIHwubmV3ZXIgPT4gfCB0YWlsIHxcbiAqICAgICAgfCAgQSAgIHwgICAgICAgICAgfCAgQiAgIHwgICAgICAgICAgfCAgQyAgIHwgICAgICAgICAgfCAgRCAgIHxcbiAqICAgICAgfF9fX19fX3wgPD0gb2xkZXIufF9fX19fX3wgPD0gb2xkZXIufF9fX19fX3wgPD0gb2xkZXIufF9fX19fX3xcbiAqXG4gKiAgcmVtb3ZlZCAgPC0tICA8LS0gIDwtLSAgPC0tICA8LS0gIDwtLSAgPC0tICA8LS0gIDwtLSAgPC0tICA8LS0gIGFkZGVkXG4gKi9cbiEoZnVuY3Rpb24gKGcsIGYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRmKGV4cG9ydHMpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cyddLCBmKTtcblx0fSBlbHNlIHtcblx0XHRmKCgoZyA9IGcgfHwgc2VsZilbJ2xydV9tYXAnXSA9IGdbJ2xydV9tYXAnXSB8fCB7fSkpO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXHRjb25zdCBORVdFUiA9IFN5bWJvbCgnbmV3ZXInKTtcblx0Y29uc3QgT0xERVIgPSBTeW1ib2woJ29sZGVyJyk7XG5cblx0Y2xhc3MgTFJVTWFwIHtcblx0XHRjb25zdHJ1Y3RvcihsaW1pdCwgZW50cmllcykge1xuXHRcdFx0aWYgKHR5cGVvZiBsaW1pdCAhPT0gJ251bWJlcicpIHtcblx0XHRcdFx0Ly8gY2FsbGVkIGFzIChlbnRyaWVzKVxuXHRcdFx0XHRlbnRyaWVzID0gbGltaXQ7XG5cdFx0XHRcdGxpbWl0ID0gMDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zaXplID0gMDtcblx0XHRcdHRoaXMubGltaXQgPSBsaW1pdDtcblx0XHRcdHRoaXMub2xkZXN0ID0gdGhpcy5uZXdlc3QgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLl9rZXltYXAgPSBuZXcgTWFwKCk7XG5cblx0XHRcdGlmIChlbnRyaWVzKSB7XG5cdFx0XHRcdHRoaXMuYXNzaWduKGVudHJpZXMpO1xuXHRcdFx0XHRpZiAobGltaXQgPCAxKSB7XG5cdFx0XHRcdFx0dGhpcy5saW1pdCA9IHRoaXMuc2l6ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdF9tYXJrRW50cnlBc1VzZWQoZW50cnkpIHtcblx0XHRcdGlmIChlbnRyeSA9PT0gdGhpcy5uZXdlc3QpIHtcblx0XHRcdFx0Ly8gQWxyZWFkeSB0aGUgbW9zdCByZWNlbmx0eSB1c2VkIGVudHJ5LCBzbyBubyBuZWVkIHRvIHVwZGF0ZSB0aGUgbGlzdFxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvLyBIRUFELS0tLS0tLS0tLS0tLS1UQUlMXG5cdFx0XHQvLyAgIDwub2xkZXIgICAubmV3ZXI+XG5cdFx0XHQvLyAgPC0tLSBhZGQgZGlyZWN0aW9uIC0tXG5cdFx0XHQvLyAgIEEgIEIgIEMgIDxEPiAgRVxuXHRcdFx0aWYgKGVudHJ5W05FV0VSXSkge1xuXHRcdFx0XHRpZiAoZW50cnkgPT09IHRoaXMub2xkZXN0KSB7XG5cdFx0XHRcdFx0dGhpcy5vbGRlc3QgPSBlbnRyeVtORVdFUl07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZW50cnlbTkVXRVJdW09MREVSXSA9IGVudHJ5W09MREVSXTsgLy8gQyA8LS0gRS5cblx0XHRcdH1cblx0XHRcdGlmIChlbnRyeVtPTERFUl0pIHtcblx0XHRcdFx0ZW50cnlbT0xERVJdW05FV0VSXSA9IGVudHJ5W05FV0VSXTsgLy8gQy4gLS0+IEVcblx0XHRcdH1cblx0XHRcdGVudHJ5W05FV0VSXSA9IHVuZGVmaW5lZDsgLy8gRCAtLXhcblx0XHRcdGVudHJ5W09MREVSXSA9IHRoaXMubmV3ZXN0OyAvLyBELiAtLT4gRVxuXHRcdFx0aWYgKHRoaXMubmV3ZXN0KSB7XG5cdFx0XHRcdHRoaXMubmV3ZXN0W05FV0VSXSA9IGVudHJ5OyAvLyBFLiA8LS0gRFxuXHRcdFx0fVxuXHRcdFx0dGhpcy5uZXdlc3QgPSBlbnRyeTtcblx0XHR9XG5cblx0XHRhc3NpZ24oZW50cmllcykge1xuXHRcdFx0bGV0IGVudHJ5LFxuXHRcdFx0XHRsaW1pdCA9IHRoaXMubGltaXQgfHwgTnVtYmVyLk1BWF9WQUxVRTtcblx0XHRcdHRoaXMuX2tleW1hcC5jbGVhcigpO1xuXHRcdFx0bGV0IGl0ID0gZW50cmllc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRmb3IgKGxldCBpdHYgPSBpdC5uZXh0KCk7ICFpdHYuZG9uZTsgaXR2ID0gaXQubmV4dCgpKSB7XG5cdFx0XHRcdGxldCBlID0gbmV3IEVudHJ5KGl0di52YWx1ZVswXSwgaXR2LnZhbHVlWzFdKTtcblx0XHRcdFx0dGhpcy5fa2V5bWFwLnNldChlLmtleSwgZSk7XG5cdFx0XHRcdGlmICghZW50cnkpIHtcblx0XHRcdFx0XHR0aGlzLm9sZGVzdCA9IGU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZW50cnlbTkVXRVJdID0gZTtcblx0XHRcdFx0XHRlW09MREVSXSA9IGVudHJ5O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVudHJ5ID0gZTtcblx0XHRcdFx0aWYgKGxpbWl0LS0gPT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5uZXdlc3QgPSBlbnRyeTtcblx0XHRcdHRoaXMuc2l6ZSA9IHRoaXMuX2tleW1hcC5zaXplO1xuXHRcdH1cblxuXHRcdGdldChrZXkpIHtcblx0XHRcdC8vIEZpcnN0LCBmaW5kIG91ciBjYWNoZSBlbnRyeVxuXHRcdFx0dmFyIGVudHJ5ID0gdGhpcy5fa2V5bWFwLmdldChrZXkpO1xuXHRcdFx0aWYgKCFlbnRyeSkgcmV0dXJuOyAvLyBOb3QgY2FjaGVkLiBTb3JyeS5cblx0XHRcdC8vIEFzIDxrZXk+IHdhcyBmb3VuZCBpbiB0aGUgY2FjaGUsIHJlZ2lzdGVyIGl0IGFzIGJlaW5nIHJlcXVlc3RlZCByZWNlbnRseVxuXHRcdFx0dGhpcy5fbWFya0VudHJ5QXNVc2VkKGVudHJ5KTtcblx0XHRcdHJldHVybiBlbnRyeS52YWx1ZTtcblx0XHR9XG5cblx0XHRzZXQoa2V5LCB2YWx1ZSkge1xuXHRcdFx0dmFyIGVudHJ5ID0gdGhpcy5fa2V5bWFwLmdldChrZXkpO1xuXG5cdFx0XHRpZiAoZW50cnkpIHtcblx0XHRcdFx0Ly8gdXBkYXRlIGV4aXN0aW5nXG5cdFx0XHRcdGVudHJ5LnZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdHRoaXMuX21hcmtFbnRyeUFzVXNlZChlbnRyeSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBuZXcgZW50cnlcblx0XHRcdHRoaXMuX2tleW1hcC5zZXQoa2V5LCAoZW50cnkgPSBuZXcgRW50cnkoa2V5LCB2YWx1ZSkpKTtcblxuXHRcdFx0aWYgKHRoaXMubmV3ZXN0KSB7XG5cdFx0XHRcdC8vIGxpbmsgcHJldmlvdXMgdGFpbCB0byB0aGUgbmV3IHRhaWwgKGVudHJ5KVxuXHRcdFx0XHR0aGlzLm5ld2VzdFtORVdFUl0gPSBlbnRyeTtcblx0XHRcdFx0ZW50cnlbT0xERVJdID0gdGhpcy5uZXdlc3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB3ZSdyZSBmaXJzdCBpbiAtLSB5YXlcblx0XHRcdFx0dGhpcy5vbGRlc3QgPSBlbnRyeTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYWRkIG5ldyBlbnRyeSB0byB0aGUgZW5kIG9mIHRoZSBsaW5rZWQgbGlzdCAtLSBpdCdzIG5vdyB0aGUgZnJlc2hlc3QgZW50cnkuXG5cdFx0XHR0aGlzLm5ld2VzdCA9IGVudHJ5O1xuXHRcdFx0Kyt0aGlzLnNpemU7XG5cdFx0XHRpZiAodGhpcy5zaXplID4gdGhpcy5saW1pdCkge1xuXHRcdFx0XHQvLyB3ZSBoaXQgdGhlIGxpbWl0IC0tIHJlbW92ZSB0aGUgaGVhZFxuXHRcdFx0XHR0aGlzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNoaWZ0KCkge1xuXHRcdFx0Ly8gdG9kbzogaGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVuIGxpbWl0ID09IDFcblx0XHRcdHZhciBlbnRyeSA9IHRoaXMub2xkZXN0O1xuXHRcdFx0aWYgKGVudHJ5KSB7XG5cdFx0XHRcdGlmICh0aGlzLm9sZGVzdFtORVdFUl0pIHtcblx0XHRcdFx0XHQvLyBhZHZhbmNlIHRoZSBsaXN0XG5cdFx0XHRcdFx0dGhpcy5vbGRlc3QgPSB0aGlzLm9sZGVzdFtORVdFUl07XG5cdFx0XHRcdFx0dGhpcy5vbGRlc3RbT0xERVJdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHRoZSBjYWNoZSBpcyBleGhhdXN0ZWRcblx0XHRcdFx0XHR0aGlzLm9sZGVzdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHR0aGlzLm5ld2VzdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBSZW1vdmUgbGFzdCBzdHJvbmcgcmVmZXJlbmNlIHRvIDxlbnRyeT4gYW5kIHJlbW92ZSBsaW5rcyBmcm9tIHRoZSBwdXJnZWRcblx0XHRcdFx0Ly8gZW50cnkgYmVpbmcgcmV0dXJuZWQ6XG5cdFx0XHRcdGVudHJ5W05FV0VSXSA9IGVudHJ5W09MREVSXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dGhpcy5fa2V5bWFwLmRlbGV0ZShlbnRyeS5rZXkpO1xuXHRcdFx0XHQtLXRoaXMuc2l6ZTtcblx0XHRcdFx0cmV0dXJuIFtlbnRyeS5rZXksIGVudHJ5LnZhbHVlXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0Ly8gRm9sbG93aW5nIGNvZGUgKHVudGlsIGVuZCBvZiBjbGFzcyBkZWZpbml0aW9uKSBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlbW92ZWQgd2l0aG91dFxuXHRcdC8vIGJyZWFraW5nIHRoZSBjb3JlIGZ1bmN0aW9uYWxpdHkuXG5cblx0XHRmaW5kKGtleSkge1xuXHRcdFx0bGV0IGUgPSB0aGlzLl9rZXltYXAuZ2V0KGtleSk7XG5cdFx0XHRyZXR1cm4gZSA/IGUudmFsdWUgOiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0aGFzKGtleSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2tleW1hcC5oYXMoa2V5KTtcblx0XHR9XG5cblx0XHRkZWxldGUoa2V5KSB7XG5cdFx0XHR2YXIgZW50cnkgPSB0aGlzLl9rZXltYXAuZ2V0KGtleSk7XG5cdFx0XHRpZiAoIWVudHJ5KSByZXR1cm47XG5cdFx0XHR0aGlzLl9rZXltYXAuZGVsZXRlKGVudHJ5LmtleSk7XG5cdFx0XHRpZiAoZW50cnlbTkVXRVJdICYmIGVudHJ5W09MREVSXSkge1xuXHRcdFx0XHQvLyByZWxpbmsgdGhlIG9sZGVyIGVudHJ5IHdpdGggdGhlIG5ld2VyIGVudHJ5XG5cdFx0XHRcdGVudHJ5W09MREVSXVtORVdFUl0gPSBlbnRyeVtORVdFUl07XG5cdFx0XHRcdGVudHJ5W05FV0VSXVtPTERFUl0gPSBlbnRyeVtPTERFUl07XG5cdFx0XHR9IGVsc2UgaWYgKGVudHJ5W05FV0VSXSkge1xuXHRcdFx0XHQvLyByZW1vdmUgdGhlIGxpbmsgdG8gdXNcblx0XHRcdFx0ZW50cnlbTkVXRVJdW09MREVSXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0Ly8gbGluayB0aGUgbmV3ZXIgZW50cnkgdG8gaGVhZFxuXHRcdFx0XHR0aGlzLm9sZGVzdCA9IGVudHJ5W05FV0VSXTtcblx0XHRcdH0gZWxzZSBpZiAoZW50cnlbT0xERVJdKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSB0aGUgbGluayB0byB1c1xuXHRcdFx0XHRlbnRyeVtPTERFUl1bTkVXRVJdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHQvLyBsaW5rIHRoZSBuZXdlciBlbnRyeSB0byBoZWFkXG5cdFx0XHRcdHRoaXMubmV3ZXN0ID0gZW50cnlbT0xERVJdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gaWYoZW50cnlbT0xERVJdID09PSB1bmRlZmluZWQgJiYgZW50cnkubmV3ZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLm9sZGVzdCA9IHRoaXMubmV3ZXN0ID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNpemUtLTtcblx0XHRcdHJldHVybiBlbnRyeS52YWx1ZTtcblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdC8vIE5vdCBjbGVhcmluZyBsaW5rcyBzaG91bGQgYmUgc2FmZSwgYXMgd2UgZG9uJ3QgZXhwb3NlIGxpdmUgbGlua3MgdG8gdXNlclxuXHRcdFx0dGhpcy5vbGRlc3QgPSB0aGlzLm5ld2VzdCA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMuc2l6ZSA9IDA7XG5cdFx0XHR0aGlzLl9rZXltYXAuY2xlYXIoKTtcblx0XHR9XG5cblx0XHRrZXlzKCkge1xuXHRcdFx0cmV0dXJuIG5ldyBLZXlJdGVyYXRvcih0aGlzLm9sZGVzdCk7XG5cdFx0fVxuXG5cdFx0dmFsdWVzKCkge1xuXHRcdFx0cmV0dXJuIG5ldyBWYWx1ZUl0ZXJhdG9yKHRoaXMub2xkZXN0KTtcblx0XHR9XG5cblx0XHRlbnRyaWVzKCkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEVudHJ5SXRlcmF0b3IodGhpcy5vbGRlc3QpO1xuXHRcdH1cblxuXHRcdGZvckVhY2goZnVuLCB0aGlzT2JqKSB7XG5cdFx0XHRpZiAodHlwZW9mIHRoaXNPYmogIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHRoaXNPYmogPSB0aGlzO1xuXHRcdFx0fVxuXHRcdFx0bGV0IGVudHJ5ID0gdGhpcy5vbGRlc3Q7XG5cdFx0XHR3aGlsZSAoZW50cnkpIHtcblx0XHRcdFx0ZnVuLmNhbGwodGhpc09iaiwgZW50cnkudmFsdWUsIGVudHJ5LmtleSwgdGhpcyk7XG5cdFx0XHRcdGVudHJ5ID0gZW50cnlbTkVXRVJdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiBSZXR1cm5zIGEgSlNPTiAoYXJyYXkpIHJlcHJlc2VudGF0aW9uICovXG5cdFx0dG9KU09OKCkge1xuXHRcdFx0dmFyIHMgPSBuZXcgQXJyYXkodGhpcy5zaXplKSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGVudHJ5ID0gdGhpcy5vbGRlc3Q7XG5cdFx0XHR3aGlsZSAoZW50cnkpIHtcblx0XHRcdFx0c1tpKytdID0geyBrZXk6IGVudHJ5LmtleSwgdmFsdWU6IGVudHJ5LnZhbHVlIH07XG5cdFx0XHRcdGVudHJ5ID0gZW50cnlbTkVXRVJdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXG5cdFx0LyoqIFJldHVybnMgYSBTdHJpbmcgcmVwcmVzZW50YXRpb24gKi9cblx0XHR0b1N0cmluZygpIHtcblx0XHRcdHZhciBzID0gJycsXG5cdFx0XHRcdGVudHJ5ID0gdGhpcy5vbGRlc3Q7XG5cdFx0XHR3aGlsZSAoZW50cnkpIHtcblx0XHRcdFx0cyArPSBTdHJpbmcoZW50cnkua2V5KSArICc6JyArIGVudHJ5LnZhbHVlO1xuXHRcdFx0XHRlbnRyeSA9IGVudHJ5W05FV0VSXTtcblx0XHRcdFx0aWYgKGVudHJ5KSB7XG5cdFx0XHRcdFx0cyArPSAnIDwgJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0cy5MUlVNYXAgPSBMUlVNYXA7XG5cblx0ZnVuY3Rpb24gRW50cnkoa2V5LCB2YWx1ZSkge1xuXHRcdHRoaXMua2V5ID0ga2V5O1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHR0aGlzW05FV0VSXSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzW09MREVSXSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGZ1bmN0aW9uIEVudHJ5SXRlcmF0b3Iob2xkZXN0RW50cnkpIHtcblx0XHR0aGlzLmVudHJ5ID0gb2xkZXN0RW50cnk7XG5cdH1cblx0RW50cnlJdGVyYXRvci5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblx0RW50cnlJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgZW50ID0gdGhpcy5lbnRyeTtcblx0XHRpZiAoZW50KSB7XG5cdFx0XHR0aGlzLmVudHJ5ID0gZW50W05FV0VSXTtcblx0XHRcdHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogW2VudC5rZXksIGVudC52YWx1ZV0gfTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBLZXlJdGVyYXRvcihvbGRlc3RFbnRyeSkge1xuXHRcdHRoaXMuZW50cnkgPSBvbGRlc3RFbnRyeTtcblx0fVxuXHRLZXlJdGVyYXRvci5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblx0S2V5SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0bGV0IGVudCA9IHRoaXMuZW50cnk7XG5cdFx0aWYgKGVudCkge1xuXHRcdFx0dGhpcy5lbnRyeSA9IGVudFtORVdFUl07XG5cdFx0XHRyZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IGVudC5rZXkgfTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiBWYWx1ZUl0ZXJhdG9yKG9sZGVzdEVudHJ5KSB7XG5cdFx0dGhpcy5lbnRyeSA9IG9sZGVzdEVudHJ5O1xuXHR9XG5cdFZhbHVlSXRlcmF0b3IucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cdFZhbHVlSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0bGV0IGVudCA9IHRoaXMuZW50cnk7XG5cdFx0aWYgKGVudCkge1xuXHRcdFx0dGhpcy5lbnRyeSA9IGVudFtORVdFUl07XG5cdFx0XHRyZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IGVudC52YWx1ZSB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG5cdFx0fVxuXHR9O1xufSk7XG4iLCAie1wiZmlsZV9pc3N1ZV9idXR0b25cIjp7XCJlbmFibGVcIjpmYWxzZSxcImlzc3VlX3RlbXBsYXRlc1wiOlt7XCJpZFwiOlwiaXNzdWUtdGVtcGxhdGUtMS55bWxcIixcInRpdGxlXCI6XCJSZXBvcnQgYSBwcm9ibGVtXCJ9LHtcImlkXCI6XCJpc3N1ZS10ZW1wbGF0ZS0yLnltbFwiLFwidGl0bGVcIjpcIlJlcG9ydCBzb21ldGhpbmcgZWxzZVwifV0sXCJyZXBvX3VybFwiOlwiaHR0cHM6Ly9naXRodWIuY29tL2JlcC9naXRodWJpc3N1ZXN0ZXN0XCJ9LFwiaXNfcHJvZHVjdGlvblwiOmZhbHNlLFwiaXNfdGVzdFwiOnRydWUsXCJwYWdlX3RpdGxlX3N1ZmZpeFwiOlwic2l0ZWJheSBEb2NzXCIsXCJzZWFyY2hfY2FjaGV3YXJtZXJfdXJsc1wiOntcImFwaVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2FwaS5qc29uXCIsXCJhcGkgXFx1MDAzZSBcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9hcGlfLmpzb25cIixcImFwaSBcXHUwMDNlIGFjY291bnRcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9hcGlfYWNjb3VudC5qc29uXCIsXCJhcGkgXFx1MDAzZSBhcHBsaWNhdGlvbl9wYXNzd29yZFwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2FwaV9hcHBsaWNhdGlvbl9wYXNzd29yZC5qc29uXCIsXCJhcGkgXFx1MDAzZSBldmVudFwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2FwaV9ldmVudC5qc29uXCIsXCJhcGkgXFx1MDAzZSBpbnZpdGVcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9hcGlfaW52aXRlLmpzb25cIixcImFwaSBcXHUwMDNlIHBsYW5cIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9hcGlfcGxhbi5qc29uXCIsXCJhcGkgXFx1MDAzZSByZWdpb25cIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9hcGlfcmVnaW9uLmpzb25cIixcImFwaSBcXHUwMDNlIHNpdGVfbGl2ZVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2FwaV9zaXRlX2xpdmUuanNvblwiLFwiYXBpIFxcdTAwM2UgdGVhbVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2FwaV90ZWFtLmpzb25cIixcImFwaSBcXHUwMDNlIHRlbXBsYXRlXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvYXBpX3RlbXBsYXRlLmpzb25cIixcImFwaSBcXHUwMDNlIHRpY2tldFwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2FwaV90aWNrZXQuanNvblwiLFwiYXBpIFxcdTAwM2UgdXRpbHNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9hcGlfdXRpbHMuanNvblwiLFwiYnVuZGxlc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2J1bmRsZXMuanNvblwiLFwiYnVuZGxlcyBcXHUwMDNlIHNpdGViYXktbWFuYWdlbWVudFwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2J1bmRsZXNfc2l0ZWJheS1tYW5hZ2VtZW50Lmpzb25cIixcImNvbnRlbnRcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9jb250ZW50Lmpzb25cIixcImV4cGxvcmVyLWJsYW5rXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvZ2xvYmFsL2V4cGxvcmVyLWJsYW5rLmpzb25cIixcImd1aWRlc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlcy5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSBjbG91ZGZsYXJlXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX2Nsb3VkZmxhcmUuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgY2xvdWRmbGFyZSBcXHUwMDNlIGdldC1zdGFydGVkXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX2Nsb3VkZmxhcmVfZ2V0LXN0YXJ0ZWQuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgY29tbW9uLXByb2JsZW1zXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX2NvbW1vbi1wcm9ibGVtcy5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSBkYXRhYmFzZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfZGF0YWJhc2VzLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIGRhdGFiYXNlcyBcXHUwMDNlIGFsZ29saWFcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfZGF0YWJhc2VzX2FsZ29saWEuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgZGF0YWJhc2VzIFxcdTAwM2UgbXlzcWxcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfZGF0YWJhc2VzX215c3FsLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIGRldmVsb3BtZW50XCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX2RldmVsb3BtZW50Lmpzb25cIixcImd1aWRlcyBcXHUwMDNlIGRldmVsb3BtZW50IFxcdTAwM2UgcGhwXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX2RldmVsb3BtZW50X3BocC5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSBkZXZlbG9wbWVudCBcXHUwMDNlIHRpcHMtYW5kLXRyaWNrc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc19kZXZlbG9wbWVudF90aXBzLWFuZC10cmlja3MuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgZ2VuZXJhdGl2ZS1haVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc19nZW5lcmF0aXZlLWFpLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIGt1YmVybmV0ZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfa3ViZXJuZXRlcy5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSBwbGF0Zm9ybVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc19wbGF0Zm9ybS5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSBwbGF0Zm9ybSBcXHUwMDNlIG1hbmFnZXJcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfcGxhdGZvcm1fbWFuYWdlci5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSBxdWljay1hbnN3ZXJzXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX3F1aWNrLWFuc3dlcnMuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgcXVpY2stYW5zd2VycyBcXHUwMDNlIHNpdGViYXlcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfcXVpY2stYW5zd2Vyc19zaXRlYmF5Lmpzb25cIixcImd1aWRlcyBcXHUwMDNlIHF1aWNrLWFuc3dlcnMgXFx1MDAzZSBzaXRlYmF5LWVzc2VudGlhbHNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfcXVpY2stYW5zd2Vyc19zaXRlYmF5LWVzc2VudGlhbHMuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgcXVpY2stYW5zd2VycyBcXHUwMDNlIHdlYnNpdGVzXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX3F1aWNrLWFuc3dlcnNfd2Vic2l0ZXMuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2Ugc2VjdXJpdHlcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfc2VjdXJpdHkuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2Ugc2VjdXJpdHkgXFx1MDAzZSBiYXNpY3NcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfc2VjdXJpdHlfYmFzaWNzLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIHNlY3VyaXR5IFxcdTAwM2UgbW9uaXRvcmluZ1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc19zZWN1cml0eV9tb25pdG9yaW5nLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIHNlY3VyaXR5IFxcdTAwM2UgcmVjb3ZlcnlcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfc2VjdXJpdHlfcmVjb3ZlcnkuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2Ugc2VjdXJpdHkgXFx1MDAzZSB2dWxuZXJhYmlsaXRpZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfc2VjdXJpdHlfdnVsbmVyYWJpbGl0aWVzLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIHRvb2xzLXJlZmVyZW5jZVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc190b29scy1yZWZlcmVuY2UuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgdG9vbHMtcmVmZXJlbmNlIFxcdTAwM2UgYmFzaWNzXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvZ3VpZGVzX3Rvb2xzLXJlZmVyZW5jZV9iYXNpY3MuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2UgdG9vbHMtcmVmZXJlbmNlIFxcdTAwM2UgdG9vbHNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfdG9vbHMtcmVmZXJlbmNlX3Rvb2xzLmpzb25cIixcImd1aWRlcyBcXHUwMDNlIHRyb3VibGVzaG9vdGluZ1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc190cm91Ymxlc2hvb3RpbmcuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2Ugd2Vic2l0ZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfd2Vic2l0ZXMuanNvblwiLFwiZ3VpZGVzIFxcdTAwM2Ugd2Vic2l0ZXMgXFx1MDAzZSBxdWlja2llc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL2d1aWRlc193ZWJzaXRlc19xdWlja2llcy5qc29uXCIsXCJndWlkZXMgXFx1MDAzZSB3b3JkcHJlc3NcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9ndWlkZXNfd29yZHByZXNzLmpzb25cIixcInBsYXRmb3JtXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcGxhdGZvcm0uanNvblwiLFwicGxhdGZvcm0gXFx1MDAzZSBhcGlcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wbGF0Zm9ybV9hcGkuanNvblwiLFwicGxhdGZvcm0gXFx1MDAzZSBiaWxsaW5nLWFuZC1zdXBwb3J0XCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcGxhdGZvcm1fYmlsbGluZy1hbmQtc3VwcG9ydC5qc29uXCIsXCJwbGF0Zm9ybSBcXHUwMDNlIGdldC1zdGFydGVkXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcGxhdGZvcm1fZ2V0LXN0YXJ0ZWQuanNvblwiLFwicGxhdGZvcm0gXFx1MDAzZSBnaXQtc3luY1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3BsYXRmb3JtX2dpdC1zeW5jLmpzb25cIixcInBsYXRmb3JtIFxcdTAwM2UgbWlncmF0ZS10by1zaXRlYmF5XCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcGxhdGZvcm1fbWlncmF0ZS10by1zaXRlYmF5Lmpzb25cIixcInBsYXRmb3JtIFxcdTAwM2UgbW9uaXRvcmluZ1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3BsYXRmb3JtX21vbml0b3JpbmcuanNvblwiLFwicGxhdGZvcm0gXFx1MDAzZSByZWNvcmRpbmdcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wbGF0Zm9ybV9yZWNvcmRpbmcuanNvblwiLFwicGxhdGZvcm0gXFx1MDAzZSBzaG9waWZ5XCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcGxhdGZvcm1fc2hvcGlmeS5qc29uXCIsXCJwbGF0Zm9ybSBcXHUwMDNlIHRlbXBsYXRlc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3BsYXRmb3JtX3RlbXBsYXRlcy5qc29uXCIsXCJwcm9kdWN0c1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzLmpzb25cIixcInByb2R1Y3RzIFxcdTAwM2UgY29kZS1zZXJ2ZXJcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wcm9kdWN0c19jb2RlLXNlcnZlci5qc29uXCIsXCJwcm9kdWN0cyBcXHUwMDNlIGdpdC1zeW5jXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcHJvZHVjdHNfZ2l0LXN5bmMuanNvblwiLFwicHJvZHVjdHMgXFx1MDAzZSBwbGF0Zm9ybVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzX3BsYXRmb3JtLmpzb25cIixcInByb2R1Y3RzIFxcdTAwM2UgcGxhdGZvcm0gXFx1MDAzZSBhY2NvdW50c1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzX3BsYXRmb3JtX2FjY291bnRzLmpzb25cIixcInByb2R1Y3RzIFxcdTAwM2UgcGxhdGZvcm0gXFx1MDAzZSBhY2NvdW50cyBcXHUwMDNlIGd1aWRlc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzX3BsYXRmb3JtX2FjY291bnRzX2d1aWRlcy5qc29uXCIsXCJwcm9kdWN0cyBcXHUwMDNlIHBsYXRmb3JtIFxcdTAwM2UgYmlsbGluZ1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzX3BsYXRmb3JtX2JpbGxpbmcuanNvblwiLFwicHJvZHVjdHMgXFx1MDAzZSBwbGF0Zm9ybSBcXHUwMDNlIGJpbGxpbmcgXFx1MDAzZSBndWlkZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wcm9kdWN0c19wbGF0Zm9ybV9iaWxsaW5nX2d1aWRlcy5qc29uXCIsXCJwcm9kdWN0cyBcXHUwMDNlIHBsYXRmb3JtIFxcdTAwM2UgZ2V0LXN0YXJ0ZWRcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wcm9kdWN0c19wbGF0Zm9ybV9nZXQtc3RhcnRlZC5qc29uXCIsXCJwcm9kdWN0cyBcXHUwMDNlIHBsYXRmb3JtIFxcdTAwM2UgZ2V0LXN0YXJ0ZWQgXFx1MDAzZSBndWlkZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wcm9kdWN0c19wbGF0Zm9ybV9nZXQtc3RhcnRlZF9ndWlkZXMuanNvblwiLFwicHJvZHVjdHMgXFx1MDAzZSBwb3N0aG9nXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcHJvZHVjdHNfcG9zdGhvZy5qc29uXCIsXCJwcm9kdWN0cyBcXHUwMDNlIHNob3BpZnktbGlua1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzX3Nob3BpZnktbGluay5qc29uXCIsXCJwcm9kdWN0cyBcXHUwMDNlIHNpdGUtYm90XCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvcHJvZHVjdHNfc2l0ZS1ib3QuanNvblwiLFwicHJvZHVjdHMgXFx1MDAzZSB0ZW1wbGF0ZXNcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wcm9kdWN0c190ZW1wbGF0ZXMuanNvblwiLFwicHJvZHVjdHMgXFx1MDAzZSB0aW1lLW1hY2hpbmVcIjpcIi9kb2NzL2NhY2hld2FybWVycy9zZWN0aW9ucy9wcm9kdWN0c190aW1lLW1hY2hpbmUuanNvblwiLFwicHJvZHVjdHMgXFx1MDAzZSB0b29sc1wiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL3NlY3Rpb25zL3Byb2R1Y3RzX3Rvb2xzLmpzb25cIixcInNlY3Rpb25zbWV0YVwiOlwiL2RvY3MvY2FjaGV3YXJtZXJzL2dsb2JhbC9zZWN0aW9uc21ldGEuanNvblwiLFwidGVtcGxhdGVzXCI6XCIvZG9jcy9jYWNoZXdhcm1lcnMvc2VjdGlvbnMvdGVtcGxhdGVzLmpzb25cIn0sXCJzZWFyY2hfY29uZmlnXCI6e1wiYXBpX2tleVwiOlwiMTQ5YjM0NmUxODY4M2ZjMjA1ZDk0YmZlMmQ0ZTAzZGVcIixcImFwcF9pZFwiOlwiVkpSUjNPQ0ExOVwiLFwiY2xpY2tfYW5hbHl0aWNzXCI6dHJ1ZSxcImV4cGxvcmVyX21heF9sZWFmbm9kZXNcIjo1MCxcImhpdHNfcGVyX3BhZ2VcIjoxMCxcImluZGV4X3ByZWZpeFwiOlwiXCIsXCJtZXRhX2luZGV4XCI6XCJzaXRlYmF5LWRvY3VtZW50YXRpb24tc2VjdGlvbnNcIixcInJlY29tbWVuZGF0aW9uc1wiOntcImFwaV9rZXlcIjpcIjE0OWIzNDZlMTg2ODNmYzIwNWQ5NGJmZTJkNGUwM2RlXCIsXCJhcHBfaWRcIjpcIlZKUlIzT0NBMTlcIixcInRhcmdldF9pbmRleFwiOlwic2l0ZWJheS1tZXJnZWRcIn0sXCJzZWN0aW9uc1wiOntcImFwaVwiOntcImV4cGxvcmVyX2ljb25cIjpcIiNpY29uLWV4cGxvcmVyLS1hcGlcIixcImZpbHRlcnNcIjpcInNlY3Rpb24ubHZsMDphcGlcIixcImluZGV4XCI6XCJzaXRlYmF5LWRvY3VtZW50YXRpb24tYXBpXCIsXCJuYW1lXCI6XCJhcGlcIixcInRpdGxlXCI6XCJBUElcIixcIndlaWdodFwiOjQwfSxcImJsb2dcIjp7XCJleHBsb3Jlcl9pY29uXCI6XCIjaWNvbi1leHBsb3Jlci0tYmxvZ1wiLFwiZmlsdGVyc1wiOlwic2VjdGlvbi5sdmwwOkJsb2dcIixcIm5hbWVcIjpcImJsb2dcIixcIm5vdW5cIjpcIlBvc3RcIixcInNlb190aXRsZV90ZW1wbGF0ZVwiOlwic2l0ZWJheSBCbG9nIHwgc2l0ZWJheVwiLFwic2VvX3RpdGxlX3RlbXBsYXRlX2NhdGVnb3J5XCI6XCJzaXRlYmF5IEJsb2cgfCB7Y2F0ZWdvcnl9IHwgc2l0ZWJheVwiLFwidGl0bGVcIjpcIkJsb2dcIixcIndlaWdodFwiOjUwfSxcImNvbW11bml0eVwiOntcImV4cGxvcmVyX2ljb25cIjpcIiNpY29uLWV4cGxvcmVyLS1xYVwiLFwiZmlsdGVyc1wiOlwib2JqZWN0VHlwZTpxdWVzdGlvblwiLFwibmFtZVwiOlwiY29tbXVuaXR5XCIsXCJub3VuXCI6XCJRXFx1MDAyNkFcIixcInRpdGxlXCI6XCJRXFx1MDAyNkFcIixcIndlaWdodFwiOjcwfSxcImd1aWRlc1wiOntcImV4cGxvcmVyX2ljb25cIjpcIiNpY29uLWV4cGxvcmVyLS1ndWlkZXNcIixcImZpbHRlcnNcIjpcInNlY3Rpb24ubHZsMDpndWlkZXNcIixcIm5hbWVcIjpcImd1aWRlc1wiLFwibm91blwiOlwiR3VpZGVcIixcInRpdGxlXCI6XCJHdWlkZXMgXFx1MDAyNiBUdXRvcmlhbHNcIixcIndlaWdodFwiOjEwfSxcIm1hcmtldHBsYWNlLWRvY3NcIjp7XCJleHBsb3Jlcl9pY29uXCI6XCIjaWNvbi1leHBsb3Jlci0tbWFya2V0cGxhY2VcIixcImZpbHRlcnNcIjpcInNlY3Rpb24ubHZsMDptYXJrZXRwbGFjZS1kb2NzXCIsXCJuYW1lXCI6XCJtYXJrZXRwbGFjZS1kb2NzXCIsXCJub3VuXCI6XCJNYXJrZXRwbGFjZVwiLFwidGl0bGVcIjpcIk1hcmtldHBsYWNlIERvY3NcIixcIndlaWdodFwiOjI1fSxcInByb2R1Y3RzXCI6e1wiZXhwbG9yZXJfaWNvblwiOlwiI2ljb24tZXhwbG9yZXItLXByb2R1Y3RzXCIsXCJmaWx0ZXJzXCI6XCJzZWN0aW9uLmx2bDA6cHJvZHVjdHNcIixcIm5hbWVcIjpcInByb2R1Y3RzXCIsXCJub3VuXCI6XCJQcm9kdWN0IEd1aWRlXCIsXCJ0aXRsZVwiOlwiUHJvZHVjdHNcIixcIndlaWdodFwiOjM1fSxcInJlZmVyZW5jZS1hcmNoaXRlY3R1cmVcIjp7XCJleHBsb3Jlcl9pY29uXCI6XCIjaWNvbi1leHBsb3Jlci0tcmVmZXJlbmNlLWFyY2hpdGVjdHVyZVwiLFwiZmlsdGVyc1wiOlwic2VjdGlvbi5sdmwwOmd1aWRlc1wiLFwibmFtZVwiOlwicmVmZXJlbmNlLWFyY2hpdGVjdHVyZVwiLFwibm91blwiOlwiUmVmZXJlbmNlXCIsXCJ0aXRsZVwiOlwiUmVmZXJlbmNlc1wiLFwid2VpZ2h0XCI6MjB9LFwicmVzb3VyY2VzXCI6e1wiZXhwbG9yZXJfaWNvblwiOlwiI2ljb24tZXhwbG9yZXItLXJlc291cmNlc1wiLFwiZmlsdGVyc1wiOlwic2VjdGlvbi5sdmwwOlJlc291cmNlc1wiLFwibmFtZVwiOlwicmVzb3VyY2VzXCIsXCJub3VuXCI6XCJDb250ZW50IFJlc291cmNlXCIsXCJzZW9fdGl0bGVfdGVtcGxhdGVcIjpcIkNsb3VkIENvbXB1dGluZyBSZXNvdXJjZXMgfCBzaXRlYmF5XCIsXCJzZW9fdGl0bGVfdGVtcGxhdGVfY2F0ZWdvcnlcIjpcIkNsb3VkIENvbXB1dGluZyB7Y2F0ZWdvcnl9IHwgc2l0ZWJheVwiLFwidGl0bGVcIjpcIkNvbnRlbnQgUmVzb3VyY2VzXCIsXCJ3ZWlnaHRcIjo2MH19LFwic2VjdGlvbnNfbWVyZ2VkXCI6e1wiZmlsdGVyaW5nX2ZhY2V0c1wiOlt7XCJuYW1lXCI6XCJkb2NUeXBlXCIsXCJ0aXRsZVwiOlwiRG9jIFR5cGVcIn0se1wibmFtZVwiOlwiY2F0ZWdvcnlcIixcInRpdGxlXCI6XCJDYXRlZ29yeVwifSx7XCJpc1RhZ3NcIjp0cnVlLFwibmFtZVwiOlwidGFnc1wiLFwidGl0bGVcIjpcIlRhZ3NcIn1dLFwiaGl0c19wZXJfcGFnZVwiOjIwLFwiaW5kZXhcIjpcInNpdGViYXktbWVyZ2VkXCIsXCJpbmRleF9ieV9wdWJkYXRlXCI6XCJzaXRlYmF5LW1lcmdlZC1zb3J0ZWRcIixcIm5hbWVcIjpcIm1lcmdlZFwiLFwibm91blwiOlwiQWxsXCIsXCJ0aXRsZVwiOlwiQWxsXCJ9fSxcIndlZ2xvdF9hcGlfa2V5XCI6XCJ3Z18zYjNlZjI5YzgxYWE4MTI5MmM2NGQxMzY4ZWUzMTg5NjlcIn0iLCAiLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3NjaGVkdWxlci5qc1xudmFyIGZsdXNoUGVuZGluZyA9IGZhbHNlO1xudmFyIGZsdXNoaW5nID0gZmFsc2U7XG52YXIgcXVldWUgPSBbXTtcbnZhciBsYXN0Rmx1c2hlZEluZGV4ID0gLTE7XG5mdW5jdGlvbiBzY2hlZHVsZXIoY2FsbGJhY2spIHtcbiAgcXVldWVKb2IoY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gcXVldWVKb2Ioam9iKSB7XG4gIGlmICghcXVldWUuaW5jbHVkZXMoam9iKSlcbiAgICBxdWV1ZS5wdXNoKGpvYik7XG4gIHF1ZXVlRmx1c2goKTtcbn1cbmZ1bmN0aW9uIGRlcXVldWVKb2Ioam9iKSB7XG4gIGxldCBpbmRleCA9IHF1ZXVlLmluZGV4T2Yoam9iKTtcbiAgaWYgKGluZGV4ICE9PSAtMSAmJiBpbmRleCA+IGxhc3RGbHVzaGVkSW5kZXgpXG4gICAgcXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbn1cbmZ1bmN0aW9uIHF1ZXVlRmx1c2goKSB7XG4gIGlmICghZmx1c2hpbmcgJiYgIWZsdXNoUGVuZGluZykge1xuICAgIGZsdXNoUGVuZGluZyA9IHRydWU7XG4gICAgcXVldWVNaWNyb3Rhc2soZmx1c2hKb2JzKTtcbiAgfVxufVxuZnVuY3Rpb24gZmx1c2hKb2JzKCkge1xuICBmbHVzaFBlbmRpbmcgPSBmYWxzZTtcbiAgZmx1c2hpbmcgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgcXVldWVbaV0oKTtcbiAgICBsYXN0Rmx1c2hlZEluZGV4ID0gaTtcbiAgfVxuICBxdWV1ZS5sZW5ndGggPSAwO1xuICBsYXN0Rmx1c2hlZEluZGV4ID0gLTE7XG4gIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9yZWFjdGl2aXR5LmpzXG52YXIgcmVhY3RpdmU7XG52YXIgZWZmZWN0O1xudmFyIHJlbGVhc2U7XG52YXIgcmF3O1xudmFyIHNob3VsZFNjaGVkdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGRpc2FibGVFZmZlY3RTY2hlZHVsaW5nKGNhbGxiYWNrKSB7XG4gIHNob3VsZFNjaGVkdWxlID0gZmFsc2U7XG4gIGNhbGxiYWNrKCk7XG4gIHNob3VsZFNjaGVkdWxlID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNldFJlYWN0aXZpdHlFbmdpbmUoZW5naW5lKSB7XG4gIHJlYWN0aXZlID0gZW5naW5lLnJlYWN0aXZlO1xuICByZWxlYXNlID0gZW5naW5lLnJlbGVhc2U7XG4gIGVmZmVjdCA9IChjYWxsYmFjaykgPT4gZW5naW5lLmVmZmVjdChjYWxsYmFjaywgeyBzY2hlZHVsZXI6ICh0YXNrKSA9PiB7XG4gICAgaWYgKHNob3VsZFNjaGVkdWxlKSB7XG4gICAgICBzY2hlZHVsZXIodGFzayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2soKTtcbiAgICB9XG4gIH0gfSk7XG4gIHJhdyA9IGVuZ2luZS5yYXc7XG59XG5mdW5jdGlvbiBvdmVycmlkZUVmZmVjdChvdmVycmlkZSkge1xuICBlZmZlY3QgPSBvdmVycmlkZTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRCb3VuZEVmZmVjdChlbCkge1xuICBsZXQgY2xlYW51cDIgPSAoKSA9PiB7XG4gIH07XG4gIGxldCB3cmFwcGVkRWZmZWN0ID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgbGV0IGVmZmVjdFJlZmVyZW5jZSA9IGVmZmVjdChjYWxsYmFjayk7XG4gICAgaWYgKCFlbC5feF9lZmZlY3RzKSB7XG4gICAgICBlbC5feF9lZmZlY3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgICAgIGVsLl94X3J1bkVmZmVjdHMgPSAoKSA9PiB7XG4gICAgICAgIGVsLl94X2VmZmVjdHMuZm9yRWFjaCgoaSkgPT4gaSgpKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGVsLl94X2VmZmVjdHMuYWRkKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgY2xlYW51cDIgPSAoKSA9PiB7XG4gICAgICBpZiAoZWZmZWN0UmVmZXJlbmNlID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGVsLl94X2VmZmVjdHMuZGVsZXRlKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgICByZWxlYXNlKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgfTtcbiAgICByZXR1cm4gZWZmZWN0UmVmZXJlbmNlO1xuICB9O1xuICByZXR1cm4gW3dyYXBwZWRFZmZlY3QsICgpID0+IHtcbiAgICBjbGVhbnVwMigpO1xuICB9XTtcbn1cbmZ1bmN0aW9uIHdhdGNoKGdldHRlciwgY2FsbGJhY2spIHtcbiAgbGV0IGZpcnN0VGltZSA9IHRydWU7XG4gIGxldCBvbGRWYWx1ZTtcbiAgbGV0IGVmZmVjdFJlZmVyZW5jZSA9IGVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZ2V0dGVyKCk7XG4gICAgSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmICghZmlyc3RUaW1lKSB7XG4gICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gIH0pO1xuICByZXR1cm4gKCkgPT4gcmVsZWFzZShlZmZlY3RSZWZlcmVuY2UpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvZGlzcGF0Y2guanNcbmZ1bmN0aW9uIGRpc3BhdGNoKGVsLCBuYW1lLCBkZXRhaWwgPSB7fSkge1xuICBlbC5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWwsXG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgLy8gQWxsb3dzIGV2ZW50cyB0byBwYXNzIHRoZSBzaGFkb3cgRE9NIGJhcnJpZXIuXG4gICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KVxuICApO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvd2Fsay5qc1xuZnVuY3Rpb24gd2FsayhlbCwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBTaGFkb3dSb290ID09PSBcImZ1bmN0aW9uXCIgJiYgZWwgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgQXJyYXkuZnJvbShlbC5jaGlsZHJlbikuZm9yRWFjaCgoZWwyKSA9PiB3YWxrKGVsMiwgY2FsbGJhY2spKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IHNraXAgPSBmYWxzZTtcbiAgY2FsbGJhY2soZWwsICgpID0+IHNraXAgPSB0cnVlKTtcbiAgaWYgKHNraXApXG4gICAgcmV0dXJuO1xuICBsZXQgbm9kZSA9IGVsLmZpcnN0RWxlbWVudENoaWxkO1xuICB3aGlsZSAobm9kZSkge1xuICAgIHdhbGsobm9kZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICBub2RlID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIH1cbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL3dhcm4uanNcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgLi4uYXJncykge1xuICBjb25zb2xlLndhcm4oYEFscGluZSBXYXJuaW5nOiAke21lc3NhZ2V9YCwgLi4uYXJncyk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9saWZlY3ljbGUuanNcbnZhciBzdGFydGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgaWYgKHN0YXJ0ZWQpXG4gICAgd2FybihcIkFscGluZSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkIG9uIHRoaXMgcGFnZS4gQ2FsbGluZyBBbHBpbmUuc3RhcnQoKSBtb3JlIHRoYW4gb25jZSBjYW4gY2F1c2UgcHJvYmxlbXMuXCIpO1xuICBzdGFydGVkID0gdHJ1ZTtcbiAgaWYgKCFkb2N1bWVudC5ib2R5KVxuICAgIHdhcm4oXCJVbmFibGUgdG8gaW5pdGlhbGl6ZS4gVHJ5aW5nIHRvIGxvYWQgQWxwaW5lIGJlZm9yZSBgPGJvZHk+YCBpcyBhdmFpbGFibGUuIERpZCB5b3UgZm9yZ2V0IHRvIGFkZCBgZGVmZXJgIGluIEFscGluZSdzIGA8c2NyaXB0PmAgdGFnP1wiKTtcbiAgZGlzcGF0Y2goZG9jdW1lbnQsIFwiYWxwaW5lOmluaXRcIik7XG4gIGRpc3BhdGNoKGRvY3VtZW50LCBcImFscGluZTppbml0aWFsaXppbmdcIik7XG4gIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zKCk7XG4gIG9uRWxBZGRlZCgoZWwpID0+IGluaXRUcmVlKGVsLCB3YWxrKSk7XG4gIG9uRWxSZW1vdmVkKChlbCkgPT4gZGVzdHJveVRyZWUoZWwpKTtcbiAgb25BdHRyaWJ1dGVzQWRkZWQoKGVsLCBhdHRycykgPT4ge1xuICAgIGRpcmVjdGl2ZXMoZWwsIGF0dHJzKS5mb3JFYWNoKChoYW5kbGUpID0+IGhhbmRsZSgpKTtcbiAgfSk7XG4gIGxldCBvdXROZXN0ZWRDb21wb25lbnRzID0gKGVsKSA9PiAhY2xvc2VzdFJvb3QoZWwucGFyZW50RWxlbWVudCwgdHJ1ZSk7XG4gIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChhbGxTZWxlY3RvcnMoKS5qb2luKFwiLFwiKSkpLmZpbHRlcihvdXROZXN0ZWRDb21wb25lbnRzKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGluaXRUcmVlKGVsKTtcbiAgfSk7XG4gIGRpc3BhdGNoKGRvY3VtZW50LCBcImFscGluZTppbml0aWFsaXplZFwiKTtcbn1cbnZhciByb290U2VsZWN0b3JDYWxsYmFja3MgPSBbXTtcbnZhciBpbml0U2VsZWN0b3JDYWxsYmFja3MgPSBbXTtcbmZ1bmN0aW9uIHJvb3RTZWxlY3RvcnMoKSB7XG4gIHJldHVybiByb290U2VsZWN0b3JDYWxsYmFja3MubWFwKChmbikgPT4gZm4oKSk7XG59XG5mdW5jdGlvbiBhbGxTZWxlY3RvcnMoKSB7XG4gIHJldHVybiByb290U2VsZWN0b3JDYWxsYmFja3MuY29uY2F0KGluaXRTZWxlY3RvckNhbGxiYWNrcykubWFwKChmbikgPT4gZm4oKSk7XG59XG5mdW5jdGlvbiBhZGRSb290U2VsZWN0b3Ioc2VsZWN0b3JDYWxsYmFjaykge1xuICByb290U2VsZWN0b3JDYWxsYmFja3MucHVzaChzZWxlY3RvckNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGFkZEluaXRTZWxlY3RvcihzZWxlY3RvckNhbGxiYWNrKSB7XG4gIGluaXRTZWxlY3RvckNhbGxiYWNrcy5wdXNoKHNlbGVjdG9yQ2FsbGJhY2spO1xufVxuZnVuY3Rpb24gY2xvc2VzdFJvb3QoZWwsIGluY2x1ZGVJbml0U2VsZWN0b3JzID0gZmFsc2UpIHtcbiAgcmV0dXJuIGZpbmRDbG9zZXN0KGVsLCAoZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGluY2x1ZGVJbml0U2VsZWN0b3JzID8gYWxsU2VsZWN0b3JzKCkgOiByb290U2VsZWN0b3JzKCk7XG4gICAgaWYgKHNlbGVjdG9ycy5zb21lKChzZWxlY3RvcikgPT4gZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5mdW5jdGlvbiBmaW5kQ2xvc2VzdChlbCwgY2FsbGJhY2spIHtcbiAgaWYgKCFlbClcbiAgICByZXR1cm47XG4gIGlmIChjYWxsYmFjayhlbCkpXG4gICAgcmV0dXJuIGVsO1xuICBpZiAoZWwuX3hfdGVsZXBvcnRCYWNrKVxuICAgIGVsID0gZWwuX3hfdGVsZXBvcnRCYWNrO1xuICBpZiAoIWVsLnBhcmVudEVsZW1lbnQpXG4gICAgcmV0dXJuO1xuICByZXR1cm4gZmluZENsb3Nlc3QoZWwucGFyZW50RWxlbWVudCwgY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gaXNSb290KGVsKSB7XG4gIHJldHVybiByb290U2VsZWN0b3JzKCkuc29tZSgoc2VsZWN0b3IpID0+IGVsLm1hdGNoZXMoc2VsZWN0b3IpKTtcbn1cbnZhciBpbml0SW50ZXJjZXB0b3JzID0gW107XG5mdW5jdGlvbiBpbnRlcmNlcHRJbml0KGNhbGxiYWNrKSB7XG4gIGluaXRJbnRlcmNlcHRvcnMucHVzaChjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBpbml0VHJlZShlbCwgd2Fsa2VyID0gd2FsaywgaW50ZXJjZXB0ID0gKCkgPT4ge1xufSkge1xuICBkZWZlckhhbmRsaW5nRGlyZWN0aXZlcygoKSA9PiB7XG4gICAgd2Fsa2VyKGVsLCAoZWwyLCBza2lwKSA9PiB7XG4gICAgICBpbnRlcmNlcHQoZWwyLCBza2lwKTtcbiAgICAgIGluaXRJbnRlcmNlcHRvcnMuZm9yRWFjaCgoaSkgPT4gaShlbDIsIHNraXApKTtcbiAgICAgIGRpcmVjdGl2ZXMoZWwyLCBlbDIuYXR0cmlidXRlcykuZm9yRWFjaCgoaGFuZGxlKSA9PiBoYW5kbGUoKSk7XG4gICAgICBlbDIuX3hfaWdub3JlICYmIHNraXAoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBkZXN0cm95VHJlZShyb290LCB3YWxrZXIgPSB3YWxrKSB7XG4gIHdhbGtlcihyb290LCAoZWwpID0+IHtcbiAgICBjbGVhbnVwQXR0cmlidXRlcyhlbCk7XG4gICAgY2xlYW51cEVsZW1lbnQoZWwpO1xuICB9KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL211dGF0aW9uLmpzXG52YXIgb25BdHRyaWJ1dGVBZGRlZHMgPSBbXTtcbnZhciBvbkVsUmVtb3ZlZHMgPSBbXTtcbnZhciBvbkVsQWRkZWRzID0gW107XG5mdW5jdGlvbiBvbkVsQWRkZWQoY2FsbGJhY2spIHtcbiAgb25FbEFkZGVkcy5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIG9uRWxSZW1vdmVkKGVsLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBpZiAoIWVsLl94X2NsZWFudXBzKVxuICAgICAgZWwuX3hfY2xlYW51cHMgPSBbXTtcbiAgICBlbC5feF9jbGVhbnVwcy5wdXNoKGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjayA9IGVsO1xuICAgIG9uRWxSZW1vdmVkcy5wdXNoKGNhbGxiYWNrKTtcbiAgfVxufVxuZnVuY3Rpb24gb25BdHRyaWJ1dGVzQWRkZWQoY2FsbGJhY2spIHtcbiAgb25BdHRyaWJ1dGVBZGRlZHMucHVzaChjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBvbkF0dHJpYnV0ZVJlbW92ZWQoZWwsIG5hbWUsIGNhbGxiYWNrKSB7XG4gIGlmICghZWwuX3hfYXR0cmlidXRlQ2xlYW51cHMpXG4gICAgZWwuX3hfYXR0cmlidXRlQ2xlYW51cHMgPSB7fTtcbiAgaWYgKCFlbC5feF9hdHRyaWJ1dGVDbGVhbnVwc1tuYW1lXSlcbiAgICBlbC5feF9hdHRyaWJ1dGVDbGVhbnVwc1tuYW1lXSA9IFtdO1xuICBlbC5feF9hdHRyaWJ1dGVDbGVhbnVwc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGNsZWFudXBBdHRyaWJ1dGVzKGVsLCBuYW1lcykge1xuICBpZiAoIWVsLl94X2F0dHJpYnV0ZUNsZWFudXBzKVxuICAgIHJldHVybjtcbiAgT2JqZWN0LmVudHJpZXMoZWwuX3hfYXR0cmlidXRlQ2xlYW51cHMpLmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICBpZiAobmFtZXMgPT09IHZvaWQgMCB8fCBuYW1lcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoaSkgPT4gaSgpKTtcbiAgICAgIGRlbGV0ZSBlbC5feF9hdHRyaWJ1dGVDbGVhbnVwc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gY2xlYW51cEVsZW1lbnQoZWwpIHtcbiAgaWYgKGVsLl94X2NsZWFudXBzKSB7XG4gICAgd2hpbGUgKGVsLl94X2NsZWFudXBzLmxlbmd0aClcbiAgICAgIGVsLl94X2NsZWFudXBzLnBvcCgpKCk7XG4gIH1cbn1cbnZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG9uTXV0YXRlKTtcbnZhciBjdXJyZW50bHlPYnNlcnZpbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zKCkge1xuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUgfSk7XG4gIGN1cnJlbnRseU9ic2VydmluZyA9IHRydWU7XG59XG5mdW5jdGlvbiBzdG9wT2JzZXJ2aW5nTXV0YXRpb25zKCkge1xuICBmbHVzaE9ic2VydmVyKCk7XG4gIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgY3VycmVudGx5T2JzZXJ2aW5nID0gZmFsc2U7XG59XG52YXIgcXVldWVkTXV0YXRpb25zID0gW107XG5mdW5jdGlvbiBmbHVzaE9ic2VydmVyKCkge1xuICBsZXQgcmVjb3JkcyA9IG9ic2VydmVyLnRha2VSZWNvcmRzKCk7XG4gIHF1ZXVlZE11dGF0aW9ucy5wdXNoKCgpID0+IHJlY29yZHMubGVuZ3RoID4gMCAmJiBvbk11dGF0ZShyZWNvcmRzKSk7XG4gIGxldCBxdWV1ZUxlbmd0aFdoZW5UcmlnZ2VyZWQgPSBxdWV1ZWRNdXRhdGlvbnMubGVuZ3RoO1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaWYgKHF1ZXVlZE11dGF0aW9ucy5sZW5ndGggPT09IHF1ZXVlTGVuZ3RoV2hlblRyaWdnZXJlZCkge1xuICAgICAgd2hpbGUgKHF1ZXVlZE11dGF0aW9ucy5sZW5ndGggPiAwKVxuICAgICAgICBxdWV1ZWRNdXRhdGlvbnMuc2hpZnQoKSgpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBtdXRhdGVEb20oY2FsbGJhY2spIHtcbiAgaWYgKCFjdXJyZW50bHlPYnNlcnZpbmcpXG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIHN0b3BPYnNlcnZpbmdNdXRhdGlvbnMoKTtcbiAgbGV0IHJlc3VsdCA9IGNhbGxiYWNrKCk7XG4gIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zKCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG52YXIgaXNDb2xsZWN0aW5nID0gZmFsc2U7XG52YXIgZGVmZXJyZWRNdXRhdGlvbnMgPSBbXTtcbmZ1bmN0aW9uIGRlZmVyTXV0YXRpb25zKCkge1xuICBpc0NvbGxlY3RpbmcgPSB0cnVlO1xufVxuZnVuY3Rpb24gZmx1c2hBbmRTdG9wRGVmZXJyaW5nTXV0YXRpb25zKCkge1xuICBpc0NvbGxlY3RpbmcgPSBmYWxzZTtcbiAgb25NdXRhdGUoZGVmZXJyZWRNdXRhdGlvbnMpO1xuICBkZWZlcnJlZE11dGF0aW9ucyA9IFtdO1xufVxuZnVuY3Rpb24gb25NdXRhdGUobXV0YXRpb25zKSB7XG4gIGlmIChpc0NvbGxlY3RpbmcpIHtcbiAgICBkZWZlcnJlZE11dGF0aW9ucyA9IGRlZmVycmVkTXV0YXRpb25zLmNvbmNhdChtdXRhdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgYWRkZWROb2RlcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gIGxldCByZW1vdmVkTm9kZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBsZXQgYWRkZWRBdHRyaWJ1dGVzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgbGV0IHJlbW92ZWRBdHRyaWJ1dGVzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobXV0YXRpb25zW2ldLnRhcmdldC5feF9pZ25vcmVNdXRhdGlvbk9ic2VydmVyKVxuICAgICAgY29udGludWU7XG4gICAgaWYgKG11dGF0aW9uc1tpXS50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XG4gICAgICBtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAxICYmIGFkZGVkTm9kZXMuYWRkKG5vZGUpKTtcbiAgICAgIG11dGF0aW9uc1tpXS5yZW1vdmVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiByZW1vdmVkTm9kZXMuYWRkKG5vZGUpKTtcbiAgICB9XG4gICAgaWYgKG11dGF0aW9uc1tpXS50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgbGV0IGVsID0gbXV0YXRpb25zW2ldLnRhcmdldDtcbiAgICAgIGxldCBuYW1lID0gbXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWU7XG4gICAgICBsZXQgb2xkVmFsdWUgPSBtdXRhdGlvbnNbaV0ub2xkVmFsdWU7XG4gICAgICBsZXQgYWRkMiA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFhZGRlZEF0dHJpYnV0ZXMuaGFzKGVsKSlcbiAgICAgICAgICBhZGRlZEF0dHJpYnV0ZXMuc2V0KGVsLCBbXSk7XG4gICAgICAgIGFkZGVkQXR0cmlidXRlcy5nZXQoZWwpLnB1c2goeyBuYW1lLCB2YWx1ZTogZWwuZ2V0QXR0cmlidXRlKG5hbWUpIH0pO1xuICAgICAgfTtcbiAgICAgIGxldCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICghcmVtb3ZlZEF0dHJpYnV0ZXMuaGFzKGVsKSlcbiAgICAgICAgICByZW1vdmVkQXR0cmlidXRlcy5zZXQoZWwsIFtdKTtcbiAgICAgICAgcmVtb3ZlZEF0dHJpYnV0ZXMuZ2V0KGVsKS5wdXNoKG5hbWUpO1xuICAgICAgfTtcbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUobmFtZSkgJiYgb2xkVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgYWRkMigpO1xuICAgICAgfSBlbHNlIGlmIChlbC5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgIGFkZDIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZW1vdmVkQXR0cmlidXRlcy5mb3JFYWNoKChhdHRycywgZWwpID0+IHtcbiAgICBjbGVhbnVwQXR0cmlidXRlcyhlbCwgYXR0cnMpO1xuICB9KTtcbiAgYWRkZWRBdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJzLCBlbCkgPT4ge1xuICAgIG9uQXR0cmlidXRlQWRkZWRzLmZvckVhY2goKGkpID0+IGkoZWwsIGF0dHJzKSk7XG4gIH0pO1xuICBmb3IgKGxldCBub2RlIG9mIHJlbW92ZWROb2Rlcykge1xuICAgIGlmIChhZGRlZE5vZGVzLmhhcyhub2RlKSlcbiAgICAgIGNvbnRpbnVlO1xuICAgIG9uRWxSZW1vdmVkcy5mb3JFYWNoKChpKSA9PiBpKG5vZGUpKTtcbiAgICBkZXN0cm95VHJlZShub2RlKTtcbiAgfVxuICBhZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBub2RlLl94X2lnbm9yZVNlbGYgPSB0cnVlO1xuICAgIG5vZGUuX3hfaWdub3JlID0gdHJ1ZTtcbiAgfSk7XG4gIGZvciAobGV0IG5vZGUgb2YgYWRkZWROb2Rlcykge1xuICAgIGlmIChyZW1vdmVkTm9kZXMuaGFzKG5vZGUpKVxuICAgICAgY29udGludWU7XG4gICAgaWYgKCFub2RlLmlzQ29ubmVjdGVkKVxuICAgICAgY29udGludWU7XG4gICAgZGVsZXRlIG5vZGUuX3hfaWdub3JlU2VsZjtcbiAgICBkZWxldGUgbm9kZS5feF9pZ25vcmU7XG4gICAgb25FbEFkZGVkcy5mb3JFYWNoKChpKSA9PiBpKG5vZGUpKTtcbiAgICBub2RlLl94X2lnbm9yZSA9IHRydWU7XG4gICAgbm9kZS5feF9pZ25vcmVTZWxmID0gdHJ1ZTtcbiAgfVxuICBhZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBkZWxldGUgbm9kZS5feF9pZ25vcmVTZWxmO1xuICAgIGRlbGV0ZSBub2RlLl94X2lnbm9yZTtcbiAgfSk7XG4gIGFkZGVkTm9kZXMgPSBudWxsO1xuICByZW1vdmVkTm9kZXMgPSBudWxsO1xuICBhZGRlZEF0dHJpYnV0ZXMgPSBudWxsO1xuICByZW1vdmVkQXR0cmlidXRlcyA9IG51bGw7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9zY29wZS5qc1xuZnVuY3Rpb24gc2NvcGUobm9kZSkge1xuICByZXR1cm4gbWVyZ2VQcm94aWVzKGNsb3Nlc3REYXRhU3RhY2sobm9kZSkpO1xufVxuZnVuY3Rpb24gYWRkU2NvcGVUb05vZGUobm9kZSwgZGF0YTIsIHJlZmVyZW5jZU5vZGUpIHtcbiAgbm9kZS5feF9kYXRhU3RhY2sgPSBbZGF0YTIsIC4uLmNsb3Nlc3REYXRhU3RhY2socmVmZXJlbmNlTm9kZSB8fCBub2RlKV07XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbm9kZS5feF9kYXRhU3RhY2sgPSBub2RlLl94X2RhdGFTdGFjay5maWx0ZXIoKGkpID0+IGkgIT09IGRhdGEyKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3REYXRhU3RhY2sobm9kZSkge1xuICBpZiAobm9kZS5feF9kYXRhU3RhY2spXG4gICAgcmV0dXJuIG5vZGUuX3hfZGF0YVN0YWNrO1xuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09IFwiZnVuY3Rpb25cIiAmJiBub2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgIHJldHVybiBjbG9zZXN0RGF0YVN0YWNrKG5vZGUuaG9zdCk7XG4gIH1cbiAgaWYgKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIGNsb3Nlc3REYXRhU3RhY2sobm9kZS5wYXJlbnROb2RlKTtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJveGllcyhvYmplY3RzKSB7XG4gIHJldHVybiBuZXcgUHJveHkoeyBvYmplY3RzIH0sIG1lcmdlUHJveHlUcmFwKTtcbn1cbnZhciBtZXJnZVByb3h5VHJhcCA9IHtcbiAgb3duS2V5cyh7IG9iamVjdHMgfSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgbmV3IFNldChvYmplY3RzLmZsYXRNYXAoKGkpID0+IE9iamVjdC5rZXlzKGkpKSlcbiAgICApO1xuICB9LFxuICBoYXMoeyBvYmplY3RzIH0sIG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PSBTeW1ib2wudW5zY29wYWJsZXMpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG9iamVjdHMuc29tZShcbiAgICAgIChvYmopID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIG5hbWUpIHx8IFJlZmxlY3QuaGFzKG9iaiwgbmFtZSlcbiAgICApO1xuICB9LFxuICBnZXQoeyBvYmplY3RzIH0sIG5hbWUsIHRoaXNQcm94eSkge1xuICAgIGlmIChuYW1lID09IFwidG9KU09OXCIpXG4gICAgICByZXR1cm4gY29sbGFwc2VQcm94aWVzO1xuICAgIHJldHVybiBSZWZsZWN0LmdldChcbiAgICAgIG9iamVjdHMuZmluZChcbiAgICAgICAgKG9iaikgPT4gUmVmbGVjdC5oYXMob2JqLCBuYW1lKVxuICAgICAgKSB8fCB7fSxcbiAgICAgIG5hbWUsXG4gICAgICB0aGlzUHJveHlcbiAgICApO1xuICB9LFxuICBzZXQoeyBvYmplY3RzIH0sIG5hbWUsIHZhbHVlLCB0aGlzUHJveHkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBvYmplY3RzLmZpbmQoXG4gICAgICAob2JqKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBuYW1lKVxuICAgICkgfHwgb2JqZWN0c1tvYmplY3RzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgbmFtZSk7XG4gICAgaWYgKGRlc2NyaXB0b3I/LnNldCAmJiBkZXNjcmlwdG9yPy5nZXQpXG4gICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSwgdGhpc1Byb3h5KTtcbiAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSk7XG4gIH1cbn07XG5mdW5jdGlvbiBjb2xsYXBzZVByb3hpZXMoKSB7XG4gIGxldCBrZXlzID0gUmVmbGVjdC5vd25LZXlzKHRoaXMpO1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgYWNjW2tleV0gPSBSZWZsZWN0LmdldCh0aGlzLCBrZXkpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2ludGVyY2VwdG9yLmpzXG5mdW5jdGlvbiBpbml0SW50ZXJjZXB0b3JzMihkYXRhMikge1xuICBsZXQgaXNPYmplY3QyID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWwpICYmIHZhbCAhPT0gbnVsbDtcbiAgbGV0IHJlY3Vyc2UgPSAob2JqLCBiYXNlUGF0aCA9IFwiXCIpID0+IHtcbiAgICBPYmplY3QuZW50cmllcyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopKS5mb3JFYWNoKChba2V5LCB7IHZhbHVlLCBlbnVtZXJhYmxlIH1dKSA9PiB7XG4gICAgICBpZiAoZW51bWVyYWJsZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IHZvaWQgMClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5fX3Zfc2tpcClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbGV0IHBhdGggPSBiYXNlUGF0aCA9PT0gXCJcIiA/IGtleSA6IGAke2Jhc2VQYXRofS4ke2tleX1gO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5feF9pbnRlcmNlcHRvcikge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlLmluaXRpYWxpemUoZGF0YTIsIHBhdGgsIGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNPYmplY3QyKHZhbHVlKSAmJiB2YWx1ZSAhPT0gb2JqICYmICEodmFsdWUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgIHJlY3Vyc2UodmFsdWUsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiByZWN1cnNlKGRhdGEyKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdG9yKGNhbGxiYWNrLCBtdXRhdGVPYmogPSAoKSA9PiB7XG59KSB7XG4gIGxldCBvYmogPSB7XG4gICAgaW5pdGlhbFZhbHVlOiB2b2lkIDAsXG4gICAgX3hfaW50ZXJjZXB0b3I6IHRydWUsXG4gICAgaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5pbml0aWFsVmFsdWUsICgpID0+IGdldChkYXRhMiwgcGF0aCksICh2YWx1ZSkgPT4gc2V0KGRhdGEyLCBwYXRoLCB2YWx1ZSksIHBhdGgsIGtleSk7XG4gICAgfVxuICB9O1xuICBtdXRhdGVPYmoob2JqKTtcbiAgcmV0dXJuIChpbml0aWFsVmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIGluaXRpYWxWYWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBpbml0aWFsVmFsdWUgIT09IG51bGwgJiYgaW5pdGlhbFZhbHVlLl94X2ludGVyY2VwdG9yKSB7XG4gICAgICBsZXQgaW5pdGlhbGl6ZSA9IG9iai5pbml0aWFsaXplLmJpbmQob2JqKTtcbiAgICAgIG9iai5pbml0aWFsaXplID0gKGRhdGEyLCBwYXRoLCBrZXkpID0+IHtcbiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBpbml0aWFsVmFsdWUuaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KTtcbiAgICAgICAgb2JqLmluaXRpYWxWYWx1ZSA9IGlubmVyVmFsdWU7XG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKGRhdGEyLCBwYXRoLCBrZXkpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLmluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldChvYmosIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgoY2FycnksIHNlZ21lbnQpID0+IGNhcnJ5W3NlZ21lbnRdLCBvYmopO1xufVxuZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKVxuICAgIG9ialtwYXRoWzBdXSA9IHZhbHVlO1xuICBlbHNlIGlmIChwYXRoLmxlbmd0aCA9PT0gMClcbiAgICB0aHJvdyBlcnJvcjtcbiAgZWxzZSB7XG4gICAgaWYgKG9ialtwYXRoWzBdXSlcbiAgICAgIHJldHVybiBzZXQob2JqW3BhdGhbMF1dLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSk7XG4gICAgZWxzZSB7XG4gICAgICBvYmpbcGF0aFswXV0gPSB7fTtcbiAgICAgIHJldHVybiBzZXQob2JqW3BhdGhbMF1dLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MuanNcbnZhciBtYWdpY3MgPSB7fTtcbmZ1bmN0aW9uIG1hZ2ljKG5hbWUsIGNhbGxiYWNrKSB7XG4gIG1hZ2ljc1tuYW1lXSA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gaW5qZWN0TWFnaWNzKG9iaiwgZWwpIHtcbiAgT2JqZWN0LmVudHJpZXMobWFnaWNzKS5mb3JFYWNoKChbbmFtZSwgY2FsbGJhY2tdKSA9PiB7XG4gICAgbGV0IG1lbW9pemVkVXRpbGl0aWVzID0gbnVsbDtcbiAgICBmdW5jdGlvbiBnZXRVdGlsaXRpZXMoKSB7XG4gICAgICBpZiAobWVtb2l6ZWRVdGlsaXRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG1lbW9pemVkVXRpbGl0aWVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IFt1dGlsaXRpZXMsIGNsZWFudXAyXSA9IGdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyhlbCk7XG4gICAgICAgIG1lbW9pemVkVXRpbGl0aWVzID0geyBpbnRlcmNlcHRvciwgLi4udXRpbGl0aWVzIH07XG4gICAgICAgIG9uRWxSZW1vdmVkKGVsLCBjbGVhbnVwMik7XG4gICAgICAgIHJldHVybiBtZW1vaXplZFV0aWxpdGllcztcbiAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgYCQke25hbWV9YCwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZWwsIGdldFV0aWxpdGllcygpKTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBvYmosXG4gICAgY2xlYW51cDogKCkgPT4ge1xuICAgICAgZWwgPSBudWxsO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL2Vycm9yLmpzXG5mdW5jdGlvbiB0cnlDYXRjaChlbCwgZXhwcmVzc2lvbiwgY2FsbGJhY2ssIC4uLmFyZ3MpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBoYW5kbGVFcnJvcihlLCBlbCwgZXhwcmVzc2lvbik7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yMiwgZWwsIGV4cHJlc3Npb24gPSB2b2lkIDApIHtcbiAgZXJyb3IyID0gT2JqZWN0LmFzc2lnbihcbiAgICBlcnJvcjIgPz8geyBtZXNzYWdlOiBcIk5vIGVycm9yIG1lc3NhZ2UgZ2l2ZW4uXCIgfSxcbiAgICB7IGVsLCBleHByZXNzaW9uIH1cbiAgKTtcbiAgY29uc29sZS53YXJuKGBBbHBpbmUgRXhwcmVzc2lvbiBFcnJvcjogJHtlcnJvcjIubWVzc2FnZX1cblxuJHtleHByZXNzaW9uID8gJ0V4cHJlc3Npb246IFwiJyArIGV4cHJlc3Npb24gKyAnXCJcXG5cXG4nIDogXCJcIn1gLCBlbCk7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRocm93IGVycm9yMjtcbiAgfSwgMCk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9ldmFsdWF0b3IuanNcbnZhciBzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnMgPSB0cnVlO1xuZnVuY3Rpb24gZG9udEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyhjYWxsYmFjaykge1xuICBsZXQgY2FjaGUgPSBzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnM7XG4gIHNob3VsZEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyA9IGZhbHNlO1xuICBsZXQgcmVzdWx0ID0gY2FsbGJhY2soKTtcbiAgc2hvdWxkQXV0b0V2YWx1YXRlRnVuY3Rpb25zID0gY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBldmFsdWF0ZShlbCwgZXhwcmVzc2lvbiwgZXh0cmFzID0ge30pIHtcbiAgbGV0IHJlc3VsdDtcbiAgZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbikoKHZhbHVlKSA9PiByZXN1bHQgPSB2YWx1ZSwgZXh0cmFzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGV2YWx1YXRlTGF0ZXIoLi4uYXJncykge1xuICByZXR1cm4gdGhlRXZhbHVhdG9yRnVuY3Rpb24oLi4uYXJncyk7XG59XG52YXIgdGhlRXZhbHVhdG9yRnVuY3Rpb24gPSBub3JtYWxFdmFsdWF0b3I7XG5mdW5jdGlvbiBzZXRFdmFsdWF0b3IobmV3RXZhbHVhdG9yKSB7XG4gIHRoZUV2YWx1YXRvckZ1bmN0aW9uID0gbmV3RXZhbHVhdG9yO1xufVxuZnVuY3Rpb24gbm9ybWFsRXZhbHVhdG9yKGVsLCBleHByZXNzaW9uKSB7XG4gIGxldCBvdmVycmlkZGVuTWFnaWNzID0ge307XG4gIGxldCBjbGVhbnVwMiA9IGluamVjdE1hZ2ljcyhvdmVycmlkZGVuTWFnaWNzLCBlbCkuY2xlYW51cDtcbiAgb25BdHRyaWJ1dGVSZW1vdmVkKGVsLCBcImV2YWx1YXRvclwiLCBjbGVhbnVwMik7XG4gIGxldCBkYXRhU3RhY2sgPSBbb3ZlcnJpZGRlbk1hZ2ljcywgLi4uY2xvc2VzdERhdGFTdGFjayhlbCldO1xuICBsZXQgZXZhbHVhdG9yID0gdHlwZW9mIGV4cHJlc3Npb24gPT09IFwiZnVuY3Rpb25cIiA/IGdlbmVyYXRlRXZhbHVhdG9yRnJvbUZ1bmN0aW9uKGRhdGFTdGFjaywgZXhwcmVzc2lvbikgOiBnZW5lcmF0ZUV2YWx1YXRvckZyb21TdHJpbmcoZGF0YVN0YWNrLCBleHByZXNzaW9uLCBlbCk7XG4gIHJldHVybiB0cnlDYXRjaC5iaW5kKG51bGwsIGVsLCBleHByZXNzaW9uLCBldmFsdWF0b3IpO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVFdmFsdWF0b3JGcm9tRnVuY3Rpb24oZGF0YVN0YWNrLCBmdW5jKSB7XG4gIHJldHVybiAocmVjZWl2ZXIgPSAoKSA9PiB7XG4gIH0sIHsgc2NvcGU6IHNjb3BlMiA9IHt9LCBwYXJhbXMgPSBbXSB9ID0ge30pID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gZnVuYy5hcHBseShtZXJnZVByb3hpZXMoW3Njb3BlMiwgLi4uZGF0YVN0YWNrXSksIHBhcmFtcyk7XG4gICAgcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgcmVzdWx0KTtcbiAgfTtcbn1cbnZhciBldmFsdWF0b3JNZW1vID0ge307XG5mdW5jdGlvbiBnZW5lcmF0ZUZ1bmN0aW9uRnJvbVN0cmluZyhleHByZXNzaW9uLCBlbCkge1xuICBpZiAoZXZhbHVhdG9yTWVtb1tleHByZXNzaW9uXSkge1xuICAgIHJldHVybiBldmFsdWF0b3JNZW1vW2V4cHJlc3Npb25dO1xuICB9XG4gIGxldCBBc3luY0Z1bmN0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jIGZ1bmN0aW9uKCkge1xuICB9KS5jb25zdHJ1Y3RvcjtcbiAgbGV0IHJpZ2h0U2lkZVNhZmVFeHByZXNzaW9uID0gL15bXFxuXFxzXSppZi4qXFwoLipcXCkvLnRlc3QoZXhwcmVzc2lvbi50cmltKCkpIHx8IC9eKGxldHxjb25zdClcXHMvLnRlc3QoZXhwcmVzc2lvbi50cmltKCkpID8gYChhc3luYygpPT57ICR7ZXhwcmVzc2lvbn0gfSkoKWAgOiBleHByZXNzaW9uO1xuICBjb25zdCBzYWZlQXN5bmNGdW5jdGlvbiA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGZ1bmMyID0gbmV3IEFzeW5jRnVuY3Rpb24oXG4gICAgICAgIFtcIl9fc2VsZlwiLCBcInNjb3BlXCJdLFxuICAgICAgICBgd2l0aCAoc2NvcGUpIHsgX19zZWxmLnJlc3VsdCA9ICR7cmlnaHRTaWRlU2FmZUV4cHJlc3Npb259IH07IF9fc2VsZi5maW5pc2hlZCA9IHRydWU7IHJldHVybiBfX3NlbGYucmVzdWx0O2BcbiAgICAgICk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuYzIsIFwibmFtZVwiLCB7XG4gICAgICAgIHZhbHVlOiBgW0FscGluZV0gJHtleHByZXNzaW9ufWBcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZ1bmMyO1xuICAgIH0gY2F0Y2ggKGVycm9yMikge1xuICAgICAgaGFuZGxlRXJyb3IoZXJyb3IyLCBlbCwgZXhwcmVzc2lvbik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICB9O1xuICBsZXQgZnVuYyA9IHNhZmVBc3luY0Z1bmN0aW9uKCk7XG4gIGV2YWx1YXRvck1lbW9bZXhwcmVzc2lvbl0gPSBmdW5jO1xuICByZXR1cm4gZnVuYztcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRXZhbHVhdG9yRnJvbVN0cmluZyhkYXRhU3RhY2ssIGV4cHJlc3Npb24sIGVsKSB7XG4gIGxldCBmdW5jID0gZ2VuZXJhdGVGdW5jdGlvbkZyb21TdHJpbmcoZXhwcmVzc2lvbiwgZWwpO1xuICByZXR1cm4gKHJlY2VpdmVyID0gKCkgPT4ge1xuICB9LCB7IHNjb3BlOiBzY29wZTIgPSB7fSwgcGFyYW1zID0gW10gfSA9IHt9KSA9PiB7XG4gICAgZnVuYy5yZXN1bHQgPSB2b2lkIDA7XG4gICAgZnVuYy5maW5pc2hlZCA9IGZhbHNlO1xuICAgIGxldCBjb21wbGV0ZVNjb3BlID0gbWVyZ2VQcm94aWVzKFtzY29wZTIsIC4uLmRhdGFTdGFja10pO1xuICAgIGlmICh0eXBlb2YgZnVuYyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBsZXQgcHJvbWlzZSA9IGZ1bmMoZnVuYywgY29tcGxldGVTY29wZSkuY2F0Y2goKGVycm9yMikgPT4gaGFuZGxlRXJyb3IoZXJyb3IyLCBlbCwgZXhwcmVzc2lvbikpO1xuICAgICAgaWYgKGZ1bmMuZmluaXNoZWQpIHtcbiAgICAgICAgcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgZnVuYy5yZXN1bHQsIGNvbXBsZXRlU2NvcGUsIHBhcmFtcywgZWwpO1xuICAgICAgICBmdW5jLnJlc3VsdCA9IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgcmVzdWx0LCBjb21wbGV0ZVNjb3BlLCBwYXJhbXMsIGVsKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yMikgPT4gaGFuZGxlRXJyb3IoZXJyb3IyLCBlbCwgZXhwcmVzc2lvbikpLmZpbmFsbHkoKCkgPT4gZnVuYy5yZXN1bHQgPSB2b2lkIDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIHZhbHVlLCBzY29wZTIsIHBhcmFtcywgZWwpIHtcbiAgaWYgKHNob3VsZEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZS5hcHBseShzY29wZTIsIHBhcmFtcyk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgIHJlc3VsdC50aGVuKChpKSA9PiBydW5JZlR5cGVPZkZ1bmN0aW9uKHJlY2VpdmVyLCBpLCBzY29wZTIsIHBhcmFtcykpLmNhdGNoKChlcnJvcjIpID0+IGhhbmRsZUVycm9yKGVycm9yMiwgZWwsIHZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY2VpdmVyKHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICB2YWx1ZS50aGVuKChpKSA9PiByZWNlaXZlcihpKSk7XG4gIH0gZWxzZSB7XG4gICAgcmVjZWl2ZXIodmFsdWUpO1xuICB9XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzLmpzXG52YXIgcHJlZml4QXNTdHJpbmcgPSBcIngtXCI7XG5mdW5jdGlvbiBwcmVmaXgoc3ViamVjdCA9IFwiXCIpIHtcbiAgcmV0dXJuIHByZWZpeEFzU3RyaW5nICsgc3ViamVjdDtcbn1cbmZ1bmN0aW9uIHNldFByZWZpeChuZXdQcmVmaXgpIHtcbiAgcHJlZml4QXNTdHJpbmcgPSBuZXdQcmVmaXg7XG59XG52YXIgZGlyZWN0aXZlSGFuZGxlcnMgPSB7fTtcbmZ1bmN0aW9uIGRpcmVjdGl2ZShuYW1lLCBjYWxsYmFjaykge1xuICBkaXJlY3RpdmVIYW5kbGVyc1tuYW1lXSA9IGNhbGxiYWNrO1xuICByZXR1cm4ge1xuICAgIGJlZm9yZShkaXJlY3RpdmUyKSB7XG4gICAgICBpZiAoIWRpcmVjdGl2ZUhhbmRsZXJzW2RpcmVjdGl2ZTJdKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihTdHJpbmcucmF3YENhbm5vdCBmaW5kIGRpcmVjdGl2ZSBcXGAke2RpcmVjdGl2ZTJ9XFxgLiBcXGAke25hbWV9XFxgIHdpbGwgdXNlIHRoZSBkZWZhdWx0IG9yZGVyIG9mIGV4ZWN1dGlvbmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBwb3MgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGRpcmVjdGl2ZTIpO1xuICAgICAgZGlyZWN0aXZlT3JkZXIuc3BsaWNlKHBvcyA+PSAwID8gcG9zIDogZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihcIkRFRkFVTFRcIiksIDAsIG5hbWUpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGRpcmVjdGl2ZXMoZWwsIGF0dHJpYnV0ZXMsIG9yaWdpbmFsQXR0cmlidXRlT3ZlcnJpZGUpIHtcbiAgYXR0cmlidXRlcyA9IEFycmF5LmZyb20oYXR0cmlidXRlcyk7XG4gIGlmIChlbC5feF92aXJ0dWFsRGlyZWN0aXZlcykge1xuICAgIGxldCB2QXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGVsLl94X3ZpcnR1YWxEaXJlY3RpdmVzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgICBsZXQgc3RhdGljQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNPbmx5KHZBdHRyaWJ1dGVzKTtcbiAgICB2QXR0cmlidXRlcyA9IHZBdHRyaWJ1dGVzLm1hcCgoYXR0cmlidXRlKSA9PiB7XG4gICAgICBpZiAoc3RhdGljQXR0cmlidXRlcy5maW5kKChhdHRyKSA9PiBhdHRyLm5hbWUgPT09IGF0dHJpYnV0ZS5uYW1lKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGB4LWJpbmQ6JHthdHRyaWJ1dGUubmFtZX1gLFxuICAgICAgICAgIHZhbHVlOiBgXCIke2F0dHJpYnV0ZS52YWx1ZX1cImBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhdHRyaWJ1dGU7XG4gICAgfSk7XG4gICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuY29uY2F0KHZBdHRyaWJ1dGVzKTtcbiAgfVxuICBsZXQgdHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXAgPSB7fTtcbiAgbGV0IGRpcmVjdGl2ZXMyID0gYXR0cmlidXRlcy5tYXAodG9UcmFuc2Zvcm1lZEF0dHJpYnV0ZXMoKG5ld05hbWUsIG9sZE5hbWUpID0+IHRyYW5zZm9ybWVkQXR0cmlidXRlTWFwW25ld05hbWVdID0gb2xkTmFtZSkpLmZpbHRlcihvdXROb25BbHBpbmVBdHRyaWJ1dGVzKS5tYXAodG9QYXJzZWREaXJlY3RpdmVzKHRyYW5zZm9ybWVkQXR0cmlidXRlTWFwLCBvcmlnaW5hbEF0dHJpYnV0ZU92ZXJyaWRlKSkuc29ydChieVByaW9yaXR5KTtcbiAgcmV0dXJuIGRpcmVjdGl2ZXMyLm1hcCgoZGlyZWN0aXZlMikgPT4ge1xuICAgIHJldHVybiBnZXREaXJlY3RpdmVIYW5kbGVyKGVsLCBkaXJlY3RpdmUyKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhdHRyaWJ1dGVzT25seShhdHRyaWJ1dGVzKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGF0dHJpYnV0ZXMpLm1hcCh0b1RyYW5zZm9ybWVkQXR0cmlidXRlcygpKS5maWx0ZXIoKGF0dHIpID0+ICFvdXROb25BbHBpbmVBdHRyaWJ1dGVzKGF0dHIpKTtcbn1cbnZhciBpc0RlZmVycmluZ0hhbmRsZXJzID0gZmFsc2U7XG52YXIgZGlyZWN0aXZlSGFuZGxlclN0YWNrcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG52YXIgY3VycmVudEhhbmRsZXJTdGFja0tleSA9IFN5bWJvbCgpO1xuZnVuY3Rpb24gZGVmZXJIYW5kbGluZ0RpcmVjdGl2ZXMoY2FsbGJhY2spIHtcbiAgaXNEZWZlcnJpbmdIYW5kbGVycyA9IHRydWU7XG4gIGxldCBrZXkgPSBTeW1ib2woKTtcbiAgY3VycmVudEhhbmRsZXJTdGFja0tleSA9IGtleTtcbiAgZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5zZXQoa2V5LCBbXSk7XG4gIGxldCBmbHVzaEhhbmRsZXJzID0gKCkgPT4ge1xuICAgIHdoaWxlIChkaXJlY3RpdmVIYW5kbGVyU3RhY2tzLmdldChrZXkpLmxlbmd0aClcbiAgICAgIGRpcmVjdGl2ZUhhbmRsZXJTdGFja3MuZ2V0KGtleSkuc2hpZnQoKSgpO1xuICAgIGRpcmVjdGl2ZUhhbmRsZXJTdGFja3MuZGVsZXRlKGtleSk7XG4gIH07XG4gIGxldCBzdG9wRGVmZXJyaW5nID0gKCkgPT4ge1xuICAgIGlzRGVmZXJyaW5nSGFuZGxlcnMgPSBmYWxzZTtcbiAgICBmbHVzaEhhbmRsZXJzKCk7XG4gIH07XG4gIGNhbGxiYWNrKGZsdXNoSGFuZGxlcnMpO1xuICBzdG9wRGVmZXJyaW5nKCk7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50Qm91bmRVdGlsaXRpZXMoZWwpIHtcbiAgbGV0IGNsZWFudXBzID0gW107XG4gIGxldCBjbGVhbnVwMiA9IChjYWxsYmFjaykgPT4gY2xlYW51cHMucHVzaChjYWxsYmFjayk7XG4gIGxldCBbZWZmZWN0MywgY2xlYW51cEVmZmVjdF0gPSBlbGVtZW50Qm91bmRFZmZlY3QoZWwpO1xuICBjbGVhbnVwcy5wdXNoKGNsZWFudXBFZmZlY3QpO1xuICBsZXQgdXRpbGl0aWVzID0ge1xuICAgIEFscGluZTogYWxwaW5lX2RlZmF1bHQsXG4gICAgZWZmZWN0OiBlZmZlY3QzLFxuICAgIGNsZWFudXA6IGNsZWFudXAyLFxuICAgIGV2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIuYmluZChldmFsdWF0ZUxhdGVyLCBlbCksXG4gICAgZXZhbHVhdGU6IGV2YWx1YXRlLmJpbmQoZXZhbHVhdGUsIGVsKVxuICB9O1xuICBsZXQgZG9DbGVhbnVwID0gKCkgPT4gY2xlYW51cHMuZm9yRWFjaCgoaSkgPT4gaSgpKTtcbiAgcmV0dXJuIFt1dGlsaXRpZXMsIGRvQ2xlYW51cF07XG59XG5mdW5jdGlvbiBnZXREaXJlY3RpdmVIYW5kbGVyKGVsLCBkaXJlY3RpdmUyKSB7XG4gIGxldCBub29wID0gKCkgPT4ge1xuICB9O1xuICBsZXQgaGFuZGxlcjQgPSBkaXJlY3RpdmVIYW5kbGVyc1tkaXJlY3RpdmUyLnR5cGVdIHx8IG5vb3A7XG4gIGxldCBbdXRpbGl0aWVzLCBjbGVhbnVwMl0gPSBnZXRFbGVtZW50Qm91bmRVdGlsaXRpZXMoZWwpO1xuICBvbkF0dHJpYnV0ZVJlbW92ZWQoZWwsIGRpcmVjdGl2ZTIub3JpZ2luYWwsIGNsZWFudXAyKTtcbiAgbGV0IGZ1bGxIYW5kbGVyID0gKCkgPT4ge1xuICAgIGlmIChlbC5feF9pZ25vcmUgfHwgZWwuX3hfaWdub3JlU2VsZilcbiAgICAgIHJldHVybjtcbiAgICBoYW5kbGVyNC5pbmxpbmUgJiYgaGFuZGxlcjQuaW5saW5lKGVsLCBkaXJlY3RpdmUyLCB1dGlsaXRpZXMpO1xuICAgIGhhbmRsZXI0ID0gaGFuZGxlcjQuYmluZChoYW5kbGVyNCwgZWwsIGRpcmVjdGl2ZTIsIHV0aWxpdGllcyk7XG4gICAgaXNEZWZlcnJpbmdIYW5kbGVycyA/IGRpcmVjdGl2ZUhhbmRsZXJTdGFja3MuZ2V0KGN1cnJlbnRIYW5kbGVyU3RhY2tLZXkpLnB1c2goaGFuZGxlcjQpIDogaGFuZGxlcjQoKTtcbiAgfTtcbiAgZnVsbEhhbmRsZXIucnVuQ2xlYW51cHMgPSBjbGVhbnVwMjtcbiAgcmV0dXJuIGZ1bGxIYW5kbGVyO1xufVxudmFyIHN0YXJ0aW5nV2l0aCA9IChzdWJqZWN0LCByZXBsYWNlbWVudCkgPT4gKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICBpZiAobmFtZS5zdGFydHNXaXRoKHN1YmplY3QpKVxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2Uoc3ViamVjdCwgcmVwbGFjZW1lbnQpO1xuICByZXR1cm4geyBuYW1lLCB2YWx1ZSB9O1xufTtcbnZhciBpbnRvID0gKGkpID0+IGk7XG5mdW5jdGlvbiB0b1RyYW5zZm9ybWVkQXR0cmlidXRlcyhjYWxsYmFjayA9ICgpID0+IHtcbn0pIHtcbiAgcmV0dXJuICh7IG5hbWUsIHZhbHVlIH0pID0+IHtcbiAgICBsZXQgeyBuYW1lOiBuZXdOYW1lLCB2YWx1ZTogbmV3VmFsdWUgfSA9IGF0dHJpYnV0ZVRyYW5zZm9ybWVycy5yZWR1Y2UoKGNhcnJ5LCB0cmFuc2Zvcm0pID0+IHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm0oY2FycnkpO1xuICAgIH0sIHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgaWYgKG5ld05hbWUgIT09IG5hbWUpXG4gICAgICBjYWxsYmFjayhuZXdOYW1lLCBuYW1lKTtcbiAgICByZXR1cm4geyBuYW1lOiBuZXdOYW1lLCB2YWx1ZTogbmV3VmFsdWUgfTtcbiAgfTtcbn1cbnZhciBhdHRyaWJ1dGVUcmFuc2Zvcm1lcnMgPSBbXTtcbmZ1bmN0aW9uIG1hcEF0dHJpYnV0ZXMoY2FsbGJhY2spIHtcbiAgYXR0cmlidXRlVHJhbnNmb3JtZXJzLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gb3V0Tm9uQWxwaW5lQXR0cmlidXRlcyh7IG5hbWUgfSkge1xuICByZXR1cm4gYWxwaW5lQXR0cmlidXRlUmVnZXgoKS50ZXN0KG5hbWUpO1xufVxudmFyIGFscGluZUF0dHJpYnV0ZVJlZ2V4ID0gKCkgPT4gbmV3IFJlZ0V4cChgXiR7cHJlZml4QXNTdHJpbmd9KFteOl4uXSspXFxcXGJgKTtcbmZ1bmN0aW9uIHRvUGFyc2VkRGlyZWN0aXZlcyh0cmFuc2Zvcm1lZEF0dHJpYnV0ZU1hcCwgb3JpZ2luYWxBdHRyaWJ1dGVPdmVycmlkZSkge1xuICByZXR1cm4gKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGxldCB0eXBlTWF0Y2ggPSBuYW1lLm1hdGNoKGFscGluZUF0dHJpYnV0ZVJlZ2V4KCkpO1xuICAgIGxldCB2YWx1ZU1hdGNoID0gbmFtZS5tYXRjaCgvOihbYS16QS1aMC05XFwtXzpdKykvKTtcbiAgICBsZXQgbW9kaWZpZXJzID0gbmFtZS5tYXRjaCgvXFwuW14uXFxdXSsoPz1bXlxcXV0qJCkvZykgfHwgW107XG4gICAgbGV0IG9yaWdpbmFsID0gb3JpZ2luYWxBdHRyaWJ1dGVPdmVycmlkZSB8fCB0cmFuc2Zvcm1lZEF0dHJpYnV0ZU1hcFtuYW1lXSB8fCBuYW1lO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0eXBlTWF0Y2ggPyB0eXBlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgdmFsdWU6IHZhbHVlTWF0Y2ggPyB2YWx1ZU1hdGNoWzFdIDogbnVsbCxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLm1hcCgoaSkgPT4gaS5yZXBsYWNlKFwiLlwiLCBcIlwiKSksXG4gICAgICBleHByZXNzaW9uOiB2YWx1ZSxcbiAgICAgIG9yaWdpbmFsXG4gICAgfTtcbiAgfTtcbn1cbnZhciBERUZBVUxUID0gXCJERUZBVUxUXCI7XG52YXIgZGlyZWN0aXZlT3JkZXIgPSBbXG4gIFwiaWdub3JlXCIsXG4gIFwicmVmXCIsXG4gIFwiZGF0YVwiLFxuICBcImlkXCIsXG4gIFwiYW5jaG9yXCIsXG4gIFwiYmluZFwiLFxuICBcImluaXRcIixcbiAgXCJmb3JcIixcbiAgXCJtb2RlbFwiLFxuICBcIm1vZGVsYWJsZVwiLFxuICBcInRyYW5zaXRpb25cIixcbiAgXCJzaG93XCIsXG4gIFwiaWZcIixcbiAgREVGQVVMVCxcbiAgXCJ0ZWxlcG9ydFwiXG5dO1xuZnVuY3Rpb24gYnlQcmlvcml0eShhLCBiKSB7XG4gIGxldCB0eXBlQSA9IGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YoYS50eXBlKSA9PT0gLTEgPyBERUZBVUxUIDogYS50eXBlO1xuICBsZXQgdHlwZUIgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGIudHlwZSkgPT09IC0xID8gREVGQVVMVCA6IGIudHlwZTtcbiAgcmV0dXJuIGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YodHlwZUEpIC0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZih0eXBlQik7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9uZXh0VGljay5qc1xudmFyIHRpY2tTdGFjayA9IFtdO1xudmFyIGlzSG9sZGluZyA9IGZhbHNlO1xuZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2sgPSAoKSA9PiB7XG59KSB7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc0hvbGRpbmcgfHwgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZWxlYXNlTmV4dFRpY2tzKCk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgIHRpY2tTdGFjay5wdXNoKCgpID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgICByZXMoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWxlYXNlTmV4dFRpY2tzKCkge1xuICBpc0hvbGRpbmcgPSBmYWxzZTtcbiAgd2hpbGUgKHRpY2tTdGFjay5sZW5ndGgpXG4gICAgdGlja1N0YWNrLnNoaWZ0KCkoKTtcbn1cbmZ1bmN0aW9uIGhvbGROZXh0VGlja3MoKSB7XG4gIGlzSG9sZGluZyA9IHRydWU7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9jbGFzc2VzLmpzXG5mdW5jdGlvbiBzZXRDbGFzc2VzKGVsLCB2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc2V0Q2xhc3Nlc0Zyb21TdHJpbmcoZWwsIHZhbHVlLmpvaW4oXCIgXCIpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2V0Q2xhc3Nlc0Zyb21PYmplY3QoZWwsIHZhbHVlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBzZXRDbGFzc2VzKGVsLCB2YWx1ZSgpKTtcbiAgfVxuICByZXR1cm4gc2V0Q2xhc3Nlc0Zyb21TdHJpbmcoZWwsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHNldENsYXNzZXNGcm9tU3RyaW5nKGVsLCBjbGFzc1N0cmluZykge1xuICBsZXQgc3BsaXQgPSAoY2xhc3NTdHJpbmcyKSA9PiBjbGFzc1N0cmluZzIuc3BsaXQoXCIgXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IG1pc3NpbmdDbGFzc2VzID0gKGNsYXNzU3RyaW5nMikgPT4gY2xhc3NTdHJpbmcyLnNwbGl0KFwiIFwiKS5maWx0ZXIoKGkpID0+ICFlbC5jbGFzc0xpc3QuY29udGFpbnMoaSkpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGFkZENsYXNzZXNBbmRSZXR1cm5VbmRvID0gKGNsYXNzZXMpID0+IHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXMpO1xuICAgIH07XG4gIH07XG4gIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgPT09IHRydWUgPyBjbGFzc1N0cmluZyA9IFwiXCIgOiBjbGFzc1N0cmluZyB8fCBcIlwiO1xuICByZXR1cm4gYWRkQ2xhc3Nlc0FuZFJldHVyblVuZG8obWlzc2luZ0NsYXNzZXMoY2xhc3NTdHJpbmcpKTtcbn1cbmZ1bmN0aW9uIHNldENsYXNzZXNGcm9tT2JqZWN0KGVsLCBjbGFzc09iamVjdCkge1xuICBsZXQgc3BsaXQgPSAoY2xhc3NTdHJpbmcpID0+IGNsYXNzU3RyaW5nLnNwbGl0KFwiIFwiKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBmb3JBZGQgPSBPYmplY3QuZW50cmllcyhjbGFzc09iamVjdCkuZmxhdE1hcCgoW2NsYXNzU3RyaW5nLCBib29sXSkgPT4gYm9vbCA/IHNwbGl0KGNsYXNzU3RyaW5nKSA6IGZhbHNlKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBmb3JSZW1vdmUgPSBPYmplY3QuZW50cmllcyhjbGFzc09iamVjdCkuZmxhdE1hcCgoW2NsYXNzU3RyaW5nLCBib29sXSkgPT4gIWJvb2wgPyBzcGxpdChjbGFzc1N0cmluZykgOiBmYWxzZSkuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgYWRkZWQgPSBbXTtcbiAgbGV0IHJlbW92ZWQgPSBbXTtcbiAgZm9yUmVtb3ZlLmZvckVhY2goKGkpID0+IHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGkpKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGkpO1xuICAgICAgcmVtb3ZlZC5wdXNoKGkpO1xuICAgIH1cbiAgfSk7XG4gIGZvckFkZC5mb3JFYWNoKChpKSA9PiB7XG4gICAgaWYgKCFlbC5jbGFzc0xpc3QuY29udGFpbnMoaSkpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoaSk7XG4gICAgICBhZGRlZC5wdXNoKGkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcmVtb3ZlZC5mb3JFYWNoKChpKSA9PiBlbC5jbGFzc0xpc3QuYWRkKGkpKTtcbiAgICBhZGRlZC5mb3JFYWNoKChpKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKGkpKTtcbiAgfTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL3N0eWxlcy5qc1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHNldFN0eWxlc0Zyb21PYmplY3QoZWwsIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gc2V0U3R5bGVzRnJvbVN0cmluZyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0U3R5bGVzRnJvbU9iamVjdChlbCwgdmFsdWUpIHtcbiAgbGV0IHByZXZpb3VzU3R5bGVzID0ge307XG4gIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChba2V5LCB2YWx1ZTJdKSA9PiB7XG4gICAgcHJldmlvdXNTdHlsZXNba2V5XSA9IGVsLnN0eWxlW2tleV07XG4gICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBrZXkgPSBrZWJhYkNhc2Uoa2V5KTtcbiAgICB9XG4gICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZTIpO1xuICB9KTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGVsLnN0eWxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBzZXRTdHlsZXMoZWwsIHByZXZpb3VzU3R5bGVzKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHNldFN0eWxlc0Zyb21TdHJpbmcoZWwsIHZhbHVlKSB7XG4gIGxldCBjYWNoZSA9IGVsLmdldEF0dHJpYnV0ZShcInN0eWxlXCIsIHZhbHVlKTtcbiAgZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgdmFsdWUpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGNhY2hlIHx8IFwiXCIpO1xuICB9O1xufVxuZnVuY3Rpb24ga2ViYWJDYXNlKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgXCIkMS0kMlwiKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvb25jZS5qc1xuZnVuY3Rpb24gb25jZShjYWxsYmFjaywgZmFsbGJhY2sgPSAoKSA9PiB7XG59KSB7XG4gIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtdHJhbnNpdGlvbi5qc1xuZGlyZWN0aXZlKFwidHJhbnNpdGlvblwiLCAoZWwsIHsgdmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGV2YWx1YXRlOiBldmFsdWF0ZTIgfSkgPT4ge1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwiZnVuY3Rpb25cIilcbiAgICBleHByZXNzaW9uID0gZXZhbHVhdGUyKGV4cHJlc3Npb24pO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gZmFsc2UpXG4gICAgcmV0dXJuO1xuICBpZiAoIWV4cHJlc3Npb24gfHwgdHlwZW9mIGV4cHJlc3Npb24gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uc0Zyb21IZWxwZXIoZWwsIG1vZGlmaWVycywgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbnNGcm9tQ2xhc3NTdHJpbmcoZWwsIGV4cHJlc3Npb24sIHZhbHVlKTtcbiAgfVxufSk7XG5mdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25zRnJvbUNsYXNzU3RyaW5nKGVsLCBjbGFzc1N0cmluZywgc3RhZ2UpIHtcbiAgcmVnaXN0ZXJUcmFuc2l0aW9uT2JqZWN0KGVsLCBzZXRDbGFzc2VzLCBcIlwiKTtcbiAgbGV0IGRpcmVjdGl2ZVN0b3JhZ2VNYXAgPSB7XG4gICAgXCJlbnRlclwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5kdXJpbmcgPSBjbGFzc2VzO1xuICAgIH0sXG4gICAgXCJlbnRlci1zdGFydFwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5zdGFydCA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImVudGVyLWVuZFwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5lbmQgPSBjbGFzc2VzO1xuICAgIH0sXG4gICAgXCJsZWF2ZVwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5kdXJpbmcgPSBjbGFzc2VzO1xuICAgIH0sXG4gICAgXCJsZWF2ZS1zdGFydFwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5zdGFydCA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImxlYXZlLWVuZFwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5lbmQgPSBjbGFzc2VzO1xuICAgIH1cbiAgfTtcbiAgZGlyZWN0aXZlU3RvcmFnZU1hcFtzdGFnZV0oY2xhc3NTdHJpbmcpO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uc0Zyb21IZWxwZXIoZWwsIG1vZGlmaWVycywgc3RhZ2UpIHtcbiAgcmVnaXN0ZXJUcmFuc2l0aW9uT2JqZWN0KGVsLCBzZXRTdHlsZXMpO1xuICBsZXQgZG9lc250U3BlY2lmeSA9ICFtb2RpZmllcnMuaW5jbHVkZXMoXCJpblwiKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKFwib3V0XCIpICYmICFzdGFnZTtcbiAgbGV0IHRyYW5zaXRpb25pbmdJbiA9IGRvZXNudFNwZWNpZnkgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwiaW5cIikgfHwgW1wiZW50ZXJcIl0uaW5jbHVkZXMoc3RhZ2UpO1xuICBsZXQgdHJhbnNpdGlvbmluZ091dCA9IGRvZXNudFNwZWNpZnkgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwib3V0XCIpIHx8IFtcImxlYXZlXCJdLmluY2x1ZGVzKHN0YWdlKTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImluXCIpICYmICFkb2VzbnRTcGVjaWZ5KSB7XG4gICAgbW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcigoaSwgaW5kZXgpID0+IGluZGV4IDwgbW9kaWZpZXJzLmluZGV4T2YoXCJvdXRcIikpO1xuICB9XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJvdXRcIikgJiYgIWRvZXNudFNwZWNpZnkpIHtcbiAgICBtb2RpZmllcnMgPSBtb2RpZmllcnMuZmlsdGVyKChpLCBpbmRleCkgPT4gaW5kZXggPiBtb2RpZmllcnMuaW5kZXhPZihcIm91dFwiKSk7XG4gIH1cbiAgbGV0IHdhbnRzQWxsID0gIW1vZGlmaWVycy5pbmNsdWRlcyhcIm9wYWNpdHlcIikgJiYgIW1vZGlmaWVycy5pbmNsdWRlcyhcInNjYWxlXCIpO1xuICBsZXQgd2FudHNPcGFjaXR5ID0gd2FudHNBbGwgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwib3BhY2l0eVwiKTtcbiAgbGV0IHdhbnRzU2NhbGUgPSB3YW50c0FsbCB8fCBtb2RpZmllcnMuaW5jbHVkZXMoXCJzY2FsZVwiKTtcbiAgbGV0IG9wYWNpdHlWYWx1ZSA9IHdhbnRzT3BhY2l0eSA/IDAgOiAxO1xuICBsZXQgc2NhbGVWYWx1ZSA9IHdhbnRzU2NhbGUgPyBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJzY2FsZVwiLCA5NSkgLyAxMDAgOiAxO1xuICBsZXQgZGVsYXkgPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJkZWxheVwiLCAwKSAvIDFlMztcbiAgbGV0IG9yaWdpbiA9IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBcIm9yaWdpblwiLCBcImNlbnRlclwiKTtcbiAgbGV0IHByb3BlcnR5ID0gXCJvcGFjaXR5LCB0cmFuc2Zvcm1cIjtcbiAgbGV0IGR1cmF0aW9uSW4gPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJkdXJhdGlvblwiLCAxNTApIC8gMWUzO1xuICBsZXQgZHVyYXRpb25PdXQgPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJkdXJhdGlvblwiLCA3NSkgLyAxZTM7XG4gIGxldCBlYXNpbmcgPSBgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpYDtcbiAgaWYgKHRyYW5zaXRpb25pbmdJbikge1xuICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZHVyaW5nID0ge1xuICAgICAgdHJhbnNmb3JtT3JpZ2luOiBvcmlnaW4sXG4gICAgICB0cmFuc2l0aW9uRGVsYXk6IGAke2RlbGF5fXNgLFxuICAgICAgdHJhbnNpdGlvblByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogYCR7ZHVyYXRpb25Jbn1zYCxcbiAgICAgIHRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbjogZWFzaW5nXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLnN0YXJ0ID0ge1xuICAgICAgb3BhY2l0eTogb3BhY2l0eVZhbHVlLFxuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzY2FsZVZhbHVlfSlgXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmVuZCA9IHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgxKWBcbiAgICB9O1xuICB9XG4gIGlmICh0cmFuc2l0aW9uaW5nT3V0KSB7XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5kdXJpbmcgPSB7XG4gICAgICB0cmFuc2Zvcm1PcmlnaW46IG9yaWdpbixcbiAgICAgIHRyYW5zaXRpb25EZWxheTogYCR7ZGVsYXl9c2AsXG4gICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBgJHtkdXJhdGlvbk91dH1zYCxcbiAgICAgIHRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbjogZWFzaW5nXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLnN0YXJ0ID0ge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKDEpYFxuICAgIH07XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5lbmQgPSB7XG4gICAgICBvcGFjaXR5OiBvcGFjaXR5VmFsdWUsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3NjYWxlVmFsdWV9KWBcbiAgICB9O1xuICB9XG59XG5mdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25PYmplY3QoZWwsIHNldEZ1bmN0aW9uLCBkZWZhdWx0VmFsdWUgPSB7fSkge1xuICBpZiAoIWVsLl94X3RyYW5zaXRpb24pXG4gICAgZWwuX3hfdHJhbnNpdGlvbiA9IHtcbiAgICAgIGVudGVyOiB7IGR1cmluZzogZGVmYXVsdFZhbHVlLCBzdGFydDogZGVmYXVsdFZhbHVlLCBlbmQ6IGRlZmF1bHRWYWx1ZSB9LFxuICAgICAgbGVhdmU6IHsgZHVyaW5nOiBkZWZhdWx0VmFsdWUsIHN0YXJ0OiBkZWZhdWx0VmFsdWUsIGVuZDogZGVmYXVsdFZhbHVlIH0sXG4gICAgICBpbihiZWZvcmUgPSAoKSA9PiB7XG4gICAgICB9LCBhZnRlciA9ICgpID0+IHtcbiAgICAgIH0pIHtcbiAgICAgICAgdHJhbnNpdGlvbihlbCwgc2V0RnVuY3Rpb24sIHtcbiAgICAgICAgICBkdXJpbmc6IHRoaXMuZW50ZXIuZHVyaW5nLFxuICAgICAgICAgIHN0YXJ0OiB0aGlzLmVudGVyLnN0YXJ0LFxuICAgICAgICAgIGVuZDogdGhpcy5lbnRlci5lbmRcbiAgICAgICAgfSwgYmVmb3JlLCBhZnRlcik7XG4gICAgICB9LFxuICAgICAgb3V0KGJlZm9yZSA9ICgpID0+IHtcbiAgICAgIH0sIGFmdGVyID0gKCkgPT4ge1xuICAgICAgfSkge1xuICAgICAgICB0cmFuc2l0aW9uKGVsLCBzZXRGdW5jdGlvbiwge1xuICAgICAgICAgIGR1cmluZzogdGhpcy5sZWF2ZS5kdXJpbmcsXG4gICAgICAgICAgc3RhcnQ6IHRoaXMubGVhdmUuc3RhcnQsXG4gICAgICAgICAgZW5kOiB0aGlzLmxlYXZlLmVuZFxuICAgICAgICB9LCBiZWZvcmUsIGFmdGVyKTtcbiAgICAgIH1cbiAgICB9O1xufVxud2luZG93LkVsZW1lbnQucHJvdG90eXBlLl94X3RvZ2dsZUFuZENhc2NhZGVXaXRoVHJhbnNpdGlvbnMgPSBmdW5jdGlvbihlbCwgdmFsdWUsIHNob3csIGhpZGUpIHtcbiAgY29uc3QgbmV4dFRpY2syID0gZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcInZpc2libGVcIiA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSA6IHNldFRpbWVvdXQ7XG4gIGxldCBjbGlja0F3YXlDb21wYXRpYmxlU2hvdyA9ICgpID0+IG5leHRUaWNrMihzaG93KTtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKGVsLl94X3RyYW5zaXRpb24gJiYgKGVsLl94X3RyYW5zaXRpb24uZW50ZXIgfHwgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZSkpIHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIgJiYgKE9iamVjdC5lbnRyaWVzKGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZHVyaW5nKS5sZW5ndGggfHwgT2JqZWN0LmVudHJpZXMoZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5zdGFydCkubGVuZ3RoIHx8IE9iamVjdC5lbnRyaWVzKGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZW5kKS5sZW5ndGgpID8gZWwuX3hfdHJhbnNpdGlvbi5pbihzaG93KSA6IGNsaWNrQXdheUNvbXBhdGlibGVTaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24gPyBlbC5feF90cmFuc2l0aW9uLmluKHNob3cpIDogY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsLl94X2hpZGVQcm9taXNlID0gZWwuX3hfdHJhbnNpdGlvbiA/IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBlbC5feF90cmFuc2l0aW9uLm91dCgoKSA9PiB7XG4gICAgfSwgKCkgPT4gcmVzb2x2ZShoaWRlKSk7XG4gICAgZWwuX3hfdHJhbnNpdGlvbmluZyAmJiBlbC5feF90cmFuc2l0aW9uaW5nLmJlZm9yZUNhbmNlbCgoKSA9PiByZWplY3QoeyBpc0Zyb21DYW5jZWxsZWRUcmFuc2l0aW9uOiB0cnVlIH0pKTtcbiAgfSkgOiBQcm9taXNlLnJlc29sdmUoaGlkZSk7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBsZXQgY2xvc2VzdCA9IGNsb3Nlc3RIaWRlKGVsKTtcbiAgICBpZiAoY2xvc2VzdCkge1xuICAgICAgaWYgKCFjbG9zZXN0Ll94X2hpZGVDaGlsZHJlbilcbiAgICAgICAgY2xvc2VzdC5feF9oaWRlQ2hpbGRyZW4gPSBbXTtcbiAgICAgIGNsb3Nlc3QuX3hfaGlkZUNoaWxkcmVuLnB1c2goZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0VGljazIoKCkgPT4ge1xuICAgICAgICBsZXQgaGlkZUFmdGVyQ2hpbGRyZW4gPSAoZWwyKSA9PiB7XG4gICAgICAgICAgbGV0IGNhcnJ5ID0gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZWwyLl94X2hpZGVQcm9taXNlLFxuICAgICAgICAgICAgLi4uKGVsMi5feF9oaWRlQ2hpbGRyZW4gfHwgW10pLm1hcChoaWRlQWZ0ZXJDaGlsZHJlbilcbiAgICAgICAgICBdKS50aGVuKChbaV0pID0+IGkoKSk7XG4gICAgICAgICAgZGVsZXRlIGVsMi5feF9oaWRlUHJvbWlzZTtcbiAgICAgICAgICBkZWxldGUgZWwyLl94X2hpZGVDaGlsZHJlbjtcbiAgICAgICAgICByZXR1cm4gY2Fycnk7XG4gICAgICAgIH07XG4gICAgICAgIGhpZGVBZnRlckNoaWxkcmVuKGVsKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIGlmICghZS5pc0Zyb21DYW5jZWxsZWRUcmFuc2l0aW9uKVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcbmZ1bmN0aW9uIGNsb3Nlc3RIaWRlKGVsKSB7XG4gIGxldCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICBpZiAoIXBhcmVudClcbiAgICByZXR1cm47XG4gIHJldHVybiBwYXJlbnQuX3hfaGlkZVByb21pc2UgPyBwYXJlbnQgOiBjbG9zZXN0SGlkZShwYXJlbnQpO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbihlbCwgc2V0RnVuY3Rpb24sIHsgZHVyaW5nLCBzdGFydDogc3RhcnQyLCBlbmQgfSA9IHt9LCBiZWZvcmUgPSAoKSA9PiB7XG59LCBhZnRlciA9ICgpID0+IHtcbn0pIHtcbiAgaWYgKGVsLl94X3RyYW5zaXRpb25pbmcpXG4gICAgZWwuX3hfdHJhbnNpdGlvbmluZy5jYW5jZWwoKTtcbiAgaWYgKE9iamVjdC5rZXlzKGR1cmluZykubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKHN0YXJ0MikubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKGVuZCkubGVuZ3RoID09PSAwKSB7XG4gICAgYmVmb3JlKCk7XG4gICAgYWZ0ZXIoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IHVuZG9TdGFydCwgdW5kb0R1cmluZywgdW5kb0VuZDtcbiAgcGVyZm9ybVRyYW5zaXRpb24oZWwsIHtcbiAgICBzdGFydCgpIHtcbiAgICAgIHVuZG9TdGFydCA9IHNldEZ1bmN0aW9uKGVsLCBzdGFydDIpO1xuICAgIH0sXG4gICAgZHVyaW5nKCkge1xuICAgICAgdW5kb0R1cmluZyA9IHNldEZ1bmN0aW9uKGVsLCBkdXJpbmcpO1xuICAgIH0sXG4gICAgYmVmb3JlLFxuICAgIGVuZCgpIHtcbiAgICAgIHVuZG9TdGFydCgpO1xuICAgICAgdW5kb0VuZCA9IHNldEZ1bmN0aW9uKGVsLCBlbmQpO1xuICAgIH0sXG4gICAgYWZ0ZXIsXG4gICAgY2xlYW51cCgpIHtcbiAgICAgIHVuZG9EdXJpbmcoKTtcbiAgICAgIHVuZG9FbmQoKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gcGVyZm9ybVRyYW5zaXRpb24oZWwsIHN0YWdlcykge1xuICBsZXQgaW50ZXJydXB0ZWQsIHJlYWNoZWRCZWZvcmUsIHJlYWNoZWRFbmQ7XG4gIGxldCBmaW5pc2ggPSBvbmNlKCgpID0+IHtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgaW50ZXJydXB0ZWQgPSB0cnVlO1xuICAgICAgaWYgKCFyZWFjaGVkQmVmb3JlKVxuICAgICAgICBzdGFnZXMuYmVmb3JlKCk7XG4gICAgICBpZiAoIXJlYWNoZWRFbmQpIHtcbiAgICAgICAgc3RhZ2VzLmVuZCgpO1xuICAgICAgICByZWxlYXNlTmV4dFRpY2tzKCk7XG4gICAgICB9XG4gICAgICBzdGFnZXMuYWZ0ZXIoKTtcbiAgICAgIGlmIChlbC5pc0Nvbm5lY3RlZClcbiAgICAgICAgc3RhZ2VzLmNsZWFudXAoKTtcbiAgICAgIGRlbGV0ZSBlbC5feF90cmFuc2l0aW9uaW5nO1xuICAgIH0pO1xuICB9KTtcbiAgZWwuX3hfdHJhbnNpdGlvbmluZyA9IHtcbiAgICBiZWZvcmVDYW5jZWxzOiBbXSxcbiAgICBiZWZvcmVDYW5jZWwoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuYmVmb3JlQ2FuY2Vscy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGNhbmNlbDogb25jZShmdW5jdGlvbigpIHtcbiAgICAgIHdoaWxlICh0aGlzLmJlZm9yZUNhbmNlbHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlQ2FuY2Vscy5zaGlmdCgpKCk7XG4gICAgICB9XG4gICAgICA7XG4gICAgICBmaW5pc2goKTtcbiAgICB9KSxcbiAgICBmaW5pc2hcbiAgfTtcbiAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICBzdGFnZXMuc3RhcnQoKTtcbiAgICBzdGFnZXMuZHVyaW5nKCk7XG4gIH0pO1xuICBob2xkTmV4dFRpY2tzKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgaWYgKGludGVycnVwdGVkKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCBkdXJhdGlvbiA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRHVyYXRpb24ucmVwbGFjZSgvLC4qLywgXCJcIikucmVwbGFjZShcInNcIiwgXCJcIikpICogMWUzO1xuICAgIGxldCBkZWxheSA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRGVsYXkucmVwbGFjZSgvLC4qLywgXCJcIikucmVwbGFjZShcInNcIiwgXCJcIikpICogMWUzO1xuICAgIGlmIChkdXJhdGlvbiA9PT0gMClcbiAgICAgIGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLmFuaW1hdGlvbkR1cmF0aW9uLnJlcGxhY2UoXCJzXCIsIFwiXCIpKSAqIDFlMztcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgc3RhZ2VzLmJlZm9yZSgpO1xuICAgIH0pO1xuICAgIHJlYWNoZWRCZWZvcmUgPSB0cnVlO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoaW50ZXJydXB0ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIHN0YWdlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgICAgcmVsZWFzZU5leHRUaWNrcygpO1xuICAgICAgc2V0VGltZW91dChlbC5feF90cmFuc2l0aW9uaW5nLmZpbmlzaCwgZHVyYXRpb24gKyBkZWxheSk7XG4gICAgICByZWFjaGVkRW5kID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywga2V5LCBmYWxsYmFjaykge1xuICBpZiAobW9kaWZpZXJzLmluZGV4T2Yoa2V5KSA9PT0gLTEpXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICBjb25zdCByYXdWYWx1ZSA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMV07XG4gIGlmICghcmF3VmFsdWUpXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICBpZiAoa2V5ID09PSBcInNjYWxlXCIpIHtcbiAgICBpZiAoaXNOYU4ocmF3VmFsdWUpKVxuICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG4gIGlmIChrZXkgPT09IFwiZHVyYXRpb25cIiB8fCBrZXkgPT09IFwiZGVsYXlcIikge1xuICAgIGxldCBtYXRjaCA9IHJhd1ZhbHVlLm1hdGNoKC8oWzAtOV0rKW1zLyk7XG4gICAgaWYgKG1hdGNoKVxuICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICB9XG4gIGlmIChrZXkgPT09IFwib3JpZ2luXCIpIHtcbiAgICBpZiAoW1widG9wXCIsIFwicmlnaHRcIiwgXCJsZWZ0XCIsIFwiY2VudGVyXCIsIFwiYm90dG9tXCJdLmluY2x1ZGVzKG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMl0pKSB7XG4gICAgICByZXR1cm4gW3Jhd1ZhbHVlLCBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdXS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhd1ZhbHVlO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvY2xvbmUuanNcbnZhciBpc0Nsb25pbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHNraXBEdXJpbmdDbG9uZShjYWxsYmFjaywgZmFsbGJhY2sgPSAoKSA9PiB7XG59KSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gaXNDbG9uaW5nID8gZmFsbGJhY2soLi4uYXJncykgOiBjYWxsYmFjayguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIG9ubHlEdXJpbmdDbG9uZShjYWxsYmFjaykge1xuICByZXR1cm4gKC4uLmFyZ3MpID0+IGlzQ2xvbmluZyAmJiBjYWxsYmFjayguLi5hcmdzKTtcbn1cbnZhciBpbnRlcmNlcHRvcnMgPSBbXTtcbmZ1bmN0aW9uIGludGVyY2VwdENsb25lKGNhbGxiYWNrKSB7XG4gIGludGVyY2VwdG9ycy5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGNsb25lTm9kZShmcm9tLCB0bykge1xuICBpbnRlcmNlcHRvcnMuZm9yRWFjaCgoaSkgPT4gaShmcm9tLCB0bykpO1xuICBpc0Nsb25pbmcgPSB0cnVlO1xuICBkb250UmVnaXN0ZXJSZWFjdGl2ZVNpZGVFZmZlY3RzKCgpID0+IHtcbiAgICBpbml0VHJlZSh0bywgKGVsLCBjYWxsYmFjaykgPT4ge1xuICAgICAgY2FsbGJhY2soZWwsICgpID0+IHtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgaXNDbG9uaW5nID0gZmFsc2U7XG59XG52YXIgaXNDbG9uaW5nTGVnYWN5ID0gZmFsc2U7XG5mdW5jdGlvbiBjbG9uZShvbGRFbCwgbmV3RWwpIHtcbiAgaWYgKCFuZXdFbC5feF9kYXRhU3RhY2spXG4gICAgbmV3RWwuX3hfZGF0YVN0YWNrID0gb2xkRWwuX3hfZGF0YVN0YWNrO1xuICBpc0Nsb25pbmcgPSB0cnVlO1xuICBpc0Nsb25pbmdMZWdhY3kgPSB0cnVlO1xuICBkb250UmVnaXN0ZXJSZWFjdGl2ZVNpZGVFZmZlY3RzKCgpID0+IHtcbiAgICBjbG9uZVRyZWUobmV3RWwpO1xuICB9KTtcbiAgaXNDbG9uaW5nID0gZmFsc2U7XG4gIGlzQ2xvbmluZ0xlZ2FjeSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gY2xvbmVUcmVlKGVsKSB7XG4gIGxldCBoYXNSdW5UaHJvdWdoRmlyc3RFbCA9IGZhbHNlO1xuICBsZXQgc2hhbGxvd1dhbGtlciA9IChlbDIsIGNhbGxiYWNrKSA9PiB7XG4gICAgd2FsayhlbDIsIChlbDMsIHNraXApID0+IHtcbiAgICAgIGlmIChoYXNSdW5UaHJvdWdoRmlyc3RFbCAmJiBpc1Jvb3QoZWwzKSlcbiAgICAgICAgcmV0dXJuIHNraXAoKTtcbiAgICAgIGhhc1J1blRocm91Z2hGaXJzdEVsID0gdHJ1ZTtcbiAgICAgIGNhbGxiYWNrKGVsMywgc2tpcCk7XG4gICAgfSk7XG4gIH07XG4gIGluaXRUcmVlKGVsLCBzaGFsbG93V2Fsa2VyKTtcbn1cbmZ1bmN0aW9uIGRvbnRSZWdpc3RlclJlYWN0aXZlU2lkZUVmZmVjdHMoY2FsbGJhY2spIHtcbiAgbGV0IGNhY2hlID0gZWZmZWN0O1xuICBvdmVycmlkZUVmZmVjdCgoY2FsbGJhY2syLCBlbCkgPT4ge1xuICAgIGxldCBzdG9yZWRFZmZlY3QgPSBjYWNoZShjYWxsYmFjazIpO1xuICAgIHJlbGVhc2Uoc3RvcmVkRWZmZWN0KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgIH07XG4gIH0pO1xuICBjYWxsYmFjaygpO1xuICBvdmVycmlkZUVmZmVjdChjYWNoZSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9iaW5kLmpzXG5mdW5jdGlvbiBiaW5kKGVsLCBuYW1lLCB2YWx1ZSwgbW9kaWZpZXJzID0gW10pIHtcbiAgaWYgKCFlbC5feF9iaW5kaW5ncylcbiAgICBlbC5feF9iaW5kaW5ncyA9IHJlYWN0aXZlKHt9KTtcbiAgZWwuX3hfYmluZGluZ3NbbmFtZV0gPSB2YWx1ZTtcbiAgbmFtZSA9IG1vZGlmaWVycy5pbmNsdWRlcyhcImNhbWVsXCIpID8gY2FtZWxDYXNlKG5hbWUpIDogbmFtZTtcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICBiaW5kSW5wdXRWYWx1ZShlbCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICBiaW5kU3R5bGVzKGVsLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgIGJpbmRDbGFzc2VzKGVsLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2VsZWN0ZWRcIjpcbiAgICBjYXNlIFwiY2hlY2tlZFwiOlxuICAgICAgYmluZEF0dHJpYnV0ZUFuZFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYmluZEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cbmZ1bmN0aW9uIGJpbmRJbnB1dFZhbHVlKGVsLCB2YWx1ZSkge1xuICBpZiAoZWwudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgaWYgKGVsLmF0dHJpYnV0ZXMudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5mcm9tTW9kZWwpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBzYWZlUGFyc2VCb29sZWFuKGVsLnZhbHVlKSA9PT0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUoZWwudmFsdWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XG4gICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJib29sZWFuXCIgJiYgIVtudWxsLCB2b2lkIDBdLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgZWwudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlLnNvbWUoKHZhbCkgPT4gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUodmFsLCBlbC52YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUgPT09IFwiU0VMRUNUXCIpIHtcbiAgICB1cGRhdGVTZWxlY3QoZWwsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZWwudmFsdWUgPT09IHZhbHVlKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLnZhbHVlID0gdmFsdWUgPT09IHZvaWQgMCA/IFwiXCIgOiB2YWx1ZTtcbiAgfVxufVxuZnVuY3Rpb24gYmluZENsYXNzZXMoZWwsIHZhbHVlKSB7XG4gIGlmIChlbC5feF91bmRvQWRkZWRDbGFzc2VzKVxuICAgIGVsLl94X3VuZG9BZGRlZENsYXNzZXMoKTtcbiAgZWwuX3hfdW5kb0FkZGVkQ2xhc3NlcyA9IHNldENsYXNzZXMoZWwsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGJpbmRTdHlsZXMoZWwsIHZhbHVlKSB7XG4gIGlmIChlbC5feF91bmRvQWRkZWRTdHlsZXMpXG4gICAgZWwuX3hfdW5kb0FkZGVkU3R5bGVzKCk7XG4gIGVsLl94X3VuZG9BZGRlZFN0eWxlcyA9IHNldFN0eWxlcyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gYmluZEF0dHJpYnV0ZUFuZFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSkge1xuICBiaW5kQXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSk7XG4gIHNldFByb3BlcnR5SWZDaGFuZ2VkKGVsLCBuYW1lLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBiaW5kQXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSkge1xuICBpZiAoW251bGwsIHZvaWQgMCwgZmFsc2VdLmluY2x1ZGVzKHZhbHVlKSAmJiBhdHRyaWJ1dGVTaG91bGRudEJlUHJlc2VydmVkSWZGYWxzeShuYW1lKSkge1xuICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNCb29sZWFuQXR0cihuYW1lKSlcbiAgICAgIHZhbHVlID0gbmFtZTtcbiAgICBzZXRJZkNoYW5nZWQoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgdmFsdWUpIHtcbiAgaWYgKGVsLmdldEF0dHJpYnV0ZShhdHRyTmFtZSkgIT0gdmFsdWUpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0UHJvcGVydHlJZkNoYW5nZWQoZWwsIHByb3BOYW1lLCB2YWx1ZSkge1xuICBpZiAoZWxbcHJvcE5hbWVdICE9PSB2YWx1ZSkge1xuICAgIGVsW3Byb3BOYW1lXSA9IHZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVTZWxlY3QoZWwsIHZhbHVlKSB7XG4gIGNvbnN0IGFycmF5V3JhcHBlZFZhbHVlID0gW10uY29uY2F0KHZhbHVlKS5tYXAoKHZhbHVlMikgPT4ge1xuICAgIHJldHVybiB2YWx1ZTIgKyBcIlwiO1xuICB9KTtcbiAgQXJyYXkuZnJvbShlbC5vcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICBvcHRpb24uc2VsZWN0ZWQgPSBhcnJheVdyYXBwZWRWYWx1ZS5pbmNsdWRlcyhvcHRpb24udmFsdWUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLShcXHcpL2csIChtYXRjaCwgY2hhcikgPT4gY2hhci50b1VwcGVyQ2FzZSgpKTtcbn1cbmZ1bmN0aW9uIGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKHZhbHVlQSwgdmFsdWVCKSB7XG4gIHJldHVybiB2YWx1ZUEgPT0gdmFsdWVCO1xufVxuZnVuY3Rpb24gc2FmZVBhcnNlQm9vbGVhbihyYXdWYWx1ZSkge1xuICBpZiAoWzEsIFwiMVwiLCBcInRydWVcIiwgXCJvblwiLCBcInllc1wiLCB0cnVlXS5pbmNsdWRlcyhyYXdWYWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoWzAsIFwiMFwiLCBcImZhbHNlXCIsIFwib2ZmXCIsIFwibm9cIiwgZmFsc2VdLmluY2x1ZGVzKHJhd1ZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gcmF3VmFsdWUgPyBCb29sZWFuKHJhd1ZhbHVlKSA6IG51bGw7XG59XG5mdW5jdGlvbiBpc0Jvb2xlYW5BdHRyKGF0dHJOYW1lKSB7XG4gIGNvbnN0IGJvb2xlYW5BdHRyaWJ1dGVzID0gW1xuICAgIFwiZGlzYWJsZWRcIixcbiAgICBcImNoZWNrZWRcIixcbiAgICBcInJlcXVpcmVkXCIsXG4gICAgXCJyZWFkb25seVwiLFxuICAgIFwib3BlblwiLFxuICAgIFwic2VsZWN0ZWRcIixcbiAgICBcImF1dG9mb2N1c1wiLFxuICAgIFwiaXRlbXNjb3BlXCIsXG4gICAgXCJtdWx0aXBsZVwiLFxuICAgIFwibm92YWxpZGF0ZVwiLFxuICAgIFwiYWxsb3dmdWxsc2NyZWVuXCIsXG4gICAgXCJhbGxvd3BheW1lbnRyZXF1ZXN0XCIsXG4gICAgXCJmb3Jtbm92YWxpZGF0ZVwiLFxuICAgIFwiYXV0b3BsYXlcIixcbiAgICBcImNvbnRyb2xzXCIsXG4gICAgXCJsb29wXCIsXG4gICAgXCJtdXRlZFwiLFxuICAgIFwicGxheXNpbmxpbmVcIixcbiAgICBcImRlZmF1bHRcIixcbiAgICBcImlzbWFwXCIsXG4gICAgXCJyZXZlcnNlZFwiLFxuICAgIFwiYXN5bmNcIixcbiAgICBcImRlZmVyXCIsXG4gICAgXCJub21vZHVsZVwiXG4gIF07XG4gIHJldHVybiBib29sZWFuQXR0cmlidXRlcy5pbmNsdWRlcyhhdHRyTmFtZSk7XG59XG5mdW5jdGlvbiBhdHRyaWJ1dGVTaG91bGRudEJlUHJlc2VydmVkSWZGYWxzeShuYW1lKSB7XG4gIHJldHVybiAhW1wiYXJpYS1wcmVzc2VkXCIsIFwiYXJpYS1jaGVja2VkXCIsIFwiYXJpYS1leHBhbmRlZFwiLCBcImFyaWEtc2VsZWN0ZWRcIl0uaW5jbHVkZXMobmFtZSk7XG59XG5mdW5jdGlvbiBnZXRCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjaykge1xuICBpZiAoZWwuX3hfYmluZGluZ3MgJiYgZWwuX3hfYmluZGluZ3NbbmFtZV0gIT09IHZvaWQgMClcbiAgICByZXR1cm4gZWwuX3hfYmluZGluZ3NbbmFtZV07XG4gIHJldHVybiBnZXRBdHRyaWJ1dGVCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjayk7XG59XG5mdW5jdGlvbiBleHRyYWN0UHJvcChlbCwgbmFtZSwgZmFsbGJhY2ssIGV4dHJhY3QgPSB0cnVlKSB7XG4gIGlmIChlbC5feF9iaW5kaW5ncyAmJiBlbC5feF9iaW5kaW5nc1tuYW1lXSAhPT0gdm9pZCAwKVxuICAgIHJldHVybiBlbC5feF9iaW5kaW5nc1tuYW1lXTtcbiAgaWYgKGVsLl94X2lubGluZUJpbmRpbmdzICYmIGVsLl94X2lubGluZUJpbmRpbmdzW25hbWVdICE9PSB2b2lkIDApIHtcbiAgICBsZXQgYmluZGluZyA9IGVsLl94X2lubGluZUJpbmRpbmdzW25hbWVdO1xuICAgIGJpbmRpbmcuZXh0cmFjdCA9IGV4dHJhY3Q7XG4gICAgcmV0dXJuIGRvbnRBdXRvRXZhbHVhdGVGdW5jdGlvbnMoKCkgPT4ge1xuICAgICAgcmV0dXJuIGV2YWx1YXRlKGVsLCBiaW5kaW5nLmV4cHJlc3Npb24pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBnZXRBdHRyaWJ1dGVCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjayk7XG59XG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVCaW5kaW5nKGVsLCBuYW1lLCBmYWxsYmFjaykge1xuICBsZXQgYXR0ciA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgaWYgKGF0dHIgPT09IG51bGwpXG4gICAgcmV0dXJuIHR5cGVvZiBmYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gZmFsbGJhY2soKSA6IGZhbGxiYWNrO1xuICBpZiAoYXR0ciA9PT0gXCJcIilcbiAgICByZXR1cm4gdHJ1ZTtcbiAgaWYgKGlzQm9vbGVhbkF0dHIobmFtZSkpIHtcbiAgICByZXR1cm4gISFbbmFtZSwgXCJ0cnVlXCJdLmluY2x1ZGVzKGF0dHIpO1xuICB9XG4gIHJldHVybiBhdHRyO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvZGVib3VuY2UuanNcbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgdmFyIHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvdGhyb3R0bGUuanNcbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XG4gIGxldCBpblRocm90dGxlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmICghaW5UaHJvdHRsZSkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGluVGhyb3R0bGUgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBpblRocm90dGxlID0gZmFsc2UsIGxpbWl0KTtcbiAgICB9XG4gIH07XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9lbnRhbmdsZS5qc1xuZnVuY3Rpb24gZW50YW5nbGUoeyBnZXQ6IG91dGVyR2V0LCBzZXQ6IG91dGVyU2V0IH0sIHsgZ2V0OiBpbm5lckdldCwgc2V0OiBpbm5lclNldCB9KSB7XG4gIGxldCBmaXJzdFJ1biA9IHRydWU7XG4gIGxldCBvdXRlckhhc2g7XG4gIGxldCBpbm5lckhhc2g7XG4gIGxldCByZWZlcmVuY2UgPSBlZmZlY3QoKCkgPT4ge1xuICAgIGxldCBvdXRlciA9IG91dGVyR2V0KCk7XG4gICAgbGV0IGlubmVyID0gaW5uZXJHZXQoKTtcbiAgICBpZiAoZmlyc3RSdW4pIHtcbiAgICAgIGlubmVyU2V0KGNsb25lSWZPYmplY3Qob3V0ZXIpKTtcbiAgICAgIGZpcnN0UnVuID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvdXRlckhhc2hMYXRlc3QgPSBKU09OLnN0cmluZ2lmeShvdXRlcik7XG4gICAgICBsZXQgaW5uZXJIYXNoTGF0ZXN0ID0gSlNPTi5zdHJpbmdpZnkoaW5uZXIpO1xuICAgICAgaWYgKG91dGVySGFzaExhdGVzdCAhPT0gb3V0ZXJIYXNoKSB7XG4gICAgICAgIGlubmVyU2V0KGNsb25lSWZPYmplY3Qob3V0ZXIpKTtcbiAgICAgIH0gZWxzZSBpZiAob3V0ZXJIYXNoTGF0ZXN0ICE9PSBpbm5lckhhc2hMYXRlc3QpIHtcbiAgICAgICAgb3V0ZXJTZXQoY2xvbmVJZk9iamVjdChpbm5lcikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgIH1cbiAgICB9XG4gICAgb3V0ZXJIYXNoID0gSlNPTi5zdHJpbmdpZnkob3V0ZXJHZXQoKSk7XG4gICAgaW5uZXJIYXNoID0gSlNPTi5zdHJpbmdpZnkoaW5uZXJHZXQoKSk7XG4gIH0pO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHJlbGVhc2UocmVmZXJlbmNlKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNsb25lSWZPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKSA6IHZhbHVlO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvcGx1Z2luLmpzXG5mdW5jdGlvbiBwbHVnaW4oY2FsbGJhY2spIHtcbiAgbGV0IGNhbGxiYWNrcyA9IEFycmF5LmlzQXJyYXkoY2FsbGJhY2spID8gY2FsbGJhY2sgOiBbY2FsbGJhY2tdO1xuICBjYWxsYmFja3MuZm9yRWFjaCgoaSkgPT4gaShhbHBpbmVfZGVmYXVsdCkpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvc3RvcmUuanNcbnZhciBzdG9yZXMgPSB7fTtcbnZhciBpc1JlYWN0aXZlID0gZmFsc2U7XG5mdW5jdGlvbiBzdG9yZShuYW1lLCB2YWx1ZSkge1xuICBpZiAoIWlzUmVhY3RpdmUpIHtcbiAgICBzdG9yZXMgPSByZWFjdGl2ZShzdG9yZXMpO1xuICAgIGlzUmVhY3RpdmUgPSB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHN0b3Jlc1tuYW1lXTtcbiAgfVxuICBzdG9yZXNbbmFtZV0gPSB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcImluaXRcIikgJiYgdHlwZW9mIHZhbHVlLmluaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHN0b3Jlc1tuYW1lXS5pbml0KCk7XG4gIH1cbiAgaW5pdEludGVyY2VwdG9yczIoc3RvcmVzW25hbWVdKTtcbn1cbmZ1bmN0aW9uIGdldFN0b3JlcygpIHtcbiAgcmV0dXJuIHN0b3Jlcztcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2JpbmRzLmpzXG52YXIgYmluZHMgPSB7fTtcbmZ1bmN0aW9uIGJpbmQyKG5hbWUsIGJpbmRpbmdzKSB7XG4gIGxldCBnZXRCaW5kaW5ncyA9IHR5cGVvZiBiaW5kaW5ncyAhPT0gXCJmdW5jdGlvblwiID8gKCkgPT4gYmluZGluZ3MgOiBiaW5kaW5ncztcbiAgaWYgKG5hbWUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgcmV0dXJuIGFwcGx5QmluZGluZ3NPYmplY3QobmFtZSwgZ2V0QmluZGluZ3MoKSk7XG4gIH0gZWxzZSB7XG4gICAgYmluZHNbbmFtZV0gPSBnZXRCaW5kaW5ncztcbiAgfVxuICByZXR1cm4gKCkgPT4ge1xuICB9O1xufVxuZnVuY3Rpb24gaW5qZWN0QmluZGluZ1Byb3ZpZGVycyhvYmopIHtcbiAgT2JqZWN0LmVudHJpZXMoYmluZHMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBhcHBseUJpbmRpbmdzT2JqZWN0KGVsLCBvYmosIG9yaWdpbmFsKSB7XG4gIGxldCBjbGVhbnVwUnVubmVycyA9IFtdO1xuICB3aGlsZSAoY2xlYW51cFJ1bm5lcnMubGVuZ3RoKVxuICAgIGNsZWFudXBSdW5uZXJzLnBvcCgpKCk7XG4gIGxldCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMob2JqKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlIH0pKTtcbiAgbGV0IHN0YXRpY0F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzT25seShhdHRyaWJ1dGVzKTtcbiAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMubWFwKChhdHRyaWJ1dGUpID0+IHtcbiAgICBpZiAoc3RhdGljQXR0cmlidXRlcy5maW5kKChhdHRyKSA9PiBhdHRyLm5hbWUgPT09IGF0dHJpYnV0ZS5uYW1lKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYHgtYmluZDoke2F0dHJpYnV0ZS5uYW1lfWAsXG4gICAgICAgIHZhbHVlOiBgXCIke2F0dHJpYnV0ZS52YWx1ZX1cImBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBhdHRyaWJ1dGU7XG4gIH0pO1xuICBkaXJlY3RpdmVzKGVsLCBhdHRyaWJ1dGVzLCBvcmlnaW5hbCkubWFwKChoYW5kbGUpID0+IHtcbiAgICBjbGVhbnVwUnVubmVycy5wdXNoKGhhbmRsZS5ydW5DbGVhbnVwcyk7XG4gICAgaGFuZGxlKCk7XG4gIH0pO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHdoaWxlIChjbGVhbnVwUnVubmVycy5sZW5ndGgpXG4gICAgICBjbGVhbnVwUnVubmVycy5wb3AoKSgpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGF0YXMuanNcbnZhciBkYXRhcyA9IHt9O1xuZnVuY3Rpb24gZGF0YShuYW1lLCBjYWxsYmFjaykge1xuICBkYXRhc1tuYW1lXSA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gaW5qZWN0RGF0YVByb3ZpZGVycyhvYmosIGNvbnRleHQpIHtcbiAgT2JqZWN0LmVudHJpZXMoZGF0YXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjay5iaW5kKGNvbnRleHQpKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb2JqO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvYWxwaW5lLmpzXG52YXIgQWxwaW5lID0ge1xuICBnZXQgcmVhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHJlYWN0aXZlO1xuICB9LFxuICBnZXQgcmVsZWFzZSgpIHtcbiAgICByZXR1cm4gcmVsZWFzZTtcbiAgfSxcbiAgZ2V0IGVmZmVjdCgpIHtcbiAgICByZXR1cm4gZWZmZWN0O1xuICB9LFxuICBnZXQgcmF3KCkge1xuICAgIHJldHVybiByYXc7XG4gIH0sXG4gIHZlcnNpb246IFwiMy4xMy44XCIsXG4gIGZsdXNoQW5kU3RvcERlZmVycmluZ011dGF0aW9ucyxcbiAgZG9udEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyxcbiAgZGlzYWJsZUVmZmVjdFNjaGVkdWxpbmcsXG4gIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zLFxuICBzdG9wT2JzZXJ2aW5nTXV0YXRpb25zLFxuICBzZXRSZWFjdGl2aXR5RW5naW5lLFxuICBvbkF0dHJpYnV0ZVJlbW92ZWQsXG4gIG9uQXR0cmlidXRlc0FkZGVkLFxuICBjbG9zZXN0RGF0YVN0YWNrLFxuICBza2lwRHVyaW5nQ2xvbmUsXG4gIG9ubHlEdXJpbmdDbG9uZSxcbiAgYWRkUm9vdFNlbGVjdG9yLFxuICBhZGRJbml0U2VsZWN0b3IsXG4gIGludGVyY2VwdENsb25lLFxuICBhZGRTY29wZVRvTm9kZSxcbiAgZGVmZXJNdXRhdGlvbnMsXG4gIG1hcEF0dHJpYnV0ZXMsXG4gIGV2YWx1YXRlTGF0ZXIsXG4gIGludGVyY2VwdEluaXQsXG4gIHNldEV2YWx1YXRvcixcbiAgbWVyZ2VQcm94aWVzLFxuICBleHRyYWN0UHJvcCxcbiAgZmluZENsb3Nlc3QsXG4gIG9uRWxSZW1vdmVkLFxuICBjbG9zZXN0Um9vdCxcbiAgZGVzdHJveVRyZWUsXG4gIGludGVyY2VwdG9yLFxuICAvLyBJTlRFUk5BTDogbm90IHB1YmxpYyBBUEkgYW5kIGlzIHN1YmplY3QgdG8gY2hhbmdlIHdpdGhvdXQgbWFqb3IgcmVsZWFzZS5cbiAgdHJhbnNpdGlvbixcbiAgLy8gSU5URVJOQUxcbiAgc2V0U3R5bGVzLFxuICAvLyBJTlRFUk5BTFxuICBtdXRhdGVEb20sXG4gIGRpcmVjdGl2ZSxcbiAgZW50YW5nbGUsXG4gIHRocm90dGxlLFxuICBkZWJvdW5jZSxcbiAgZXZhbHVhdGUsXG4gIGluaXRUcmVlLFxuICBuZXh0VGljayxcbiAgcHJlZml4ZWQ6IHByZWZpeCxcbiAgcHJlZml4OiBzZXRQcmVmaXgsXG4gIHBsdWdpbixcbiAgbWFnaWMsXG4gIHN0b3JlLFxuICBzdGFydCxcbiAgY2xvbmUsXG4gIC8vIElOVEVSTkFMXG4gIGNsb25lTm9kZSxcbiAgLy8gSU5URVJOQUxcbiAgYm91bmQ6IGdldEJpbmRpbmcsXG4gICRkYXRhOiBzY29wZSxcbiAgd2F0Y2gsXG4gIHdhbGssXG4gIGRhdGEsXG4gIGJpbmQ6IGJpbmQyXG59O1xudmFyIGFscGluZV9kZWZhdWx0ID0gQWxwaW5lO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9zaGFyZWQvZGlzdC9zaGFyZWQuZXNtLWJ1bmRsZXIuanNcbmZ1bmN0aW9uIG1ha2VNYXAoc3RyLCBleHBlY3RzTG93ZXJDYXNlKSB7XG4gIGNvbnN0IG1hcCA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCBsaXN0ID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwW2xpc3RbaV1dID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZSA/ICh2YWwpID0+ICEhbWFwW3ZhbC50b0xvd2VyQ2FzZSgpXSA6ICh2YWwpID0+ICEhbWFwW3ZhbF07XG59XG52YXIgc3BlY2lhbEJvb2xlYW5BdHRycyA9IGBpdGVtc2NvcGUsYWxsb3dmdWxsc2NyZWVuLGZvcm1ub3ZhbGlkYXRlLGlzbWFwLG5vbW9kdWxlLG5vdmFsaWRhdGUscmVhZG9ubHlgO1xudmFyIGlzQm9vbGVhbkF0dHIyID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoc3BlY2lhbEJvb2xlYW5BdHRycyArIGAsYXN5bmMsYXV0b2ZvY3VzLGF1dG9wbGF5LGNvbnRyb2xzLGRlZmF1bHQsZGVmZXIsZGlzYWJsZWQsaGlkZGVuLGxvb3Asb3BlbixyZXF1aXJlZCxyZXZlcnNlZCxzY29wZWQsc2VhbWxlc3MsY2hlY2tlZCxtdXRlZCxtdWx0aXBsZSxzZWxlY3RlZGApO1xudmFyIEVNUFRZX09CSiA9IHRydWUgPyBPYmplY3QuZnJlZXplKHt9KSA6IHt9O1xudmFyIEVNUFRZX0FSUiA9IHRydWUgPyBPYmplY3QuZnJlZXplKFtdKSA6IFtdO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBoYXNPd24gPSAodmFsLCBrZXkpID0+IGhhc093blByb3BlcnR5LmNhbGwodmFsLCBrZXkpO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGlzTWFwID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBNYXBdXCI7XG52YXIgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xudmFyIGlzU3ltYm9sID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJzeW1ib2xcIjtcbnZhciBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiO1xudmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB0b1R5cGVTdHJpbmcgPSAodmFsdWUpID0+IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xudmFyIHRvUmF3VHlwZSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdG9UeXBlU3RyaW5nKHZhbHVlKS5zbGljZSg4LCAtMSk7XG59O1xudmFyIGlzSW50ZWdlcktleSA9IChrZXkpID0+IGlzU3RyaW5nKGtleSkgJiYga2V5ICE9PSBcIk5hTlwiICYmIGtleVswXSAhPT0gXCItXCIgJiYgXCJcIiArIHBhcnNlSW50KGtleSwgMTApID09PSBrZXk7XG52YXIgY2FjaGVTdHJpbmdGdW5jdGlvbiA9IChmbikgPT4ge1xuICBjb25zdCBjYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gKHN0cikgPT4ge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl07XG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpO1xuICB9O1xufTtcbnZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xudmFyIGNhbWVsaXplID0gY2FjaGVTdHJpbmdGdW5jdGlvbigoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCAoXywgYykgPT4gYyA/IGMudG9VcHBlckNhc2UoKSA6IFwiXCIpO1xufSk7XG52YXIgaHlwaGVuYXRlUkUgPSAvXFxCKFtBLVpdKS9nO1xudmFyIGh5cGhlbmF0ZSA9IGNhY2hlU3RyaW5nRnVuY3Rpb24oKHN0cikgPT4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkpO1xudmFyIGNhcGl0YWxpemUgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKSk7XG52YXIgdG9IYW5kbGVyS2V5ID0gY2FjaGVTdHJpbmdGdW5jdGlvbigoc3RyKSA9PiBzdHIgPyBgb24ke2NhcGl0YWxpemUoc3RyKX1gIDogYGApO1xudmFyIGhhc0NoYW5nZWQgPSAodmFsdWUsIG9sZFZhbHVlKSA9PiB2YWx1ZSAhPT0gb2xkVmFsdWUgJiYgKHZhbHVlID09PSB2YWx1ZSB8fCBvbGRWYWx1ZSA9PT0gb2xkVmFsdWUpO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9yZWFjdGl2aXR5L2Rpc3QvcmVhY3Rpdml0eS5lc20tYnVuZGxlci5qc1xudmFyIHRhcmdldE1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIGVmZmVjdFN0YWNrID0gW107XG52YXIgYWN0aXZlRWZmZWN0O1xudmFyIElURVJBVEVfS0VZID0gU3ltYm9sKHRydWUgPyBcIml0ZXJhdGVcIiA6IFwiXCIpO1xudmFyIE1BUF9LRVlfSVRFUkFURV9LRVkgPSBTeW1ib2wodHJ1ZSA/IFwiTWFwIGtleSBpdGVyYXRlXCIgOiBcIlwiKTtcbmZ1bmN0aW9uIGlzRWZmZWN0KGZuKSB7XG4gIHJldHVybiBmbiAmJiBmbi5faXNFZmZlY3QgPT09IHRydWU7XG59XG5mdW5jdGlvbiBlZmZlY3QyKGZuLCBvcHRpb25zID0gRU1QVFlfT0JKKSB7XG4gIGlmIChpc0VmZmVjdChmbikpIHtcbiAgICBmbiA9IGZuLnJhdztcbiAgfVxuICBjb25zdCBlZmZlY3QzID0gY3JlYXRlUmVhY3RpdmVFZmZlY3QoZm4sIG9wdGlvbnMpO1xuICBpZiAoIW9wdGlvbnMubGF6eSkge1xuICAgIGVmZmVjdDMoKTtcbiAgfVxuICByZXR1cm4gZWZmZWN0Mztcbn1cbmZ1bmN0aW9uIHN0b3AoZWZmZWN0Mykge1xuICBpZiAoZWZmZWN0My5hY3RpdmUpIHtcbiAgICBjbGVhbnVwKGVmZmVjdDMpO1xuICAgIGlmIChlZmZlY3QzLm9wdGlvbnMub25TdG9wKSB7XG4gICAgICBlZmZlY3QzLm9wdGlvbnMub25TdG9wKCk7XG4gICAgfVxuICAgIGVmZmVjdDMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cbnZhciB1aWQgPSAwO1xuZnVuY3Rpb24gY3JlYXRlUmVhY3RpdmVFZmZlY3QoZm4sIG9wdGlvbnMpIHtcbiAgY29uc3QgZWZmZWN0MyA9IGZ1bmN0aW9uIHJlYWN0aXZlRWZmZWN0KCkge1xuICAgIGlmICghZWZmZWN0My5hY3RpdmUpIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICBpZiAoIWVmZmVjdFN0YWNrLmluY2x1ZGVzKGVmZmVjdDMpKSB7XG4gICAgICBjbGVhbnVwKGVmZmVjdDMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5hYmxlVHJhY2tpbmcoKTtcbiAgICAgICAgZWZmZWN0U3RhY2sucHVzaChlZmZlY3QzKTtcbiAgICAgICAgYWN0aXZlRWZmZWN0ID0gZWZmZWN0MztcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBlZmZlY3RTdGFjay5wb3AoKTtcbiAgICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgICBhY3RpdmVFZmZlY3QgPSBlZmZlY3RTdGFja1tlZmZlY3RTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGVmZmVjdDMuaWQgPSB1aWQrKztcbiAgZWZmZWN0My5hbGxvd1JlY3Vyc2UgPSAhIW9wdGlvbnMuYWxsb3dSZWN1cnNlO1xuICBlZmZlY3QzLl9pc0VmZmVjdCA9IHRydWU7XG4gIGVmZmVjdDMuYWN0aXZlID0gdHJ1ZTtcbiAgZWZmZWN0My5yYXcgPSBmbjtcbiAgZWZmZWN0My5kZXBzID0gW107XG4gIGVmZmVjdDMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHJldHVybiBlZmZlY3QzO1xufVxuZnVuY3Rpb24gY2xlYW51cChlZmZlY3QzKSB7XG4gIGNvbnN0IHsgZGVwcyB9ID0gZWZmZWN0MztcbiAgaWYgKGRlcHMubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXBzW2ldLmRlbGV0ZShlZmZlY3QzKTtcbiAgICB9XG4gICAgZGVwcy5sZW5ndGggPSAwO1xuICB9XG59XG52YXIgc2hvdWxkVHJhY2sgPSB0cnVlO1xudmFyIHRyYWNrU3RhY2sgPSBbXTtcbmZ1bmN0aW9uIHBhdXNlVHJhY2tpbmcoKSB7XG4gIHRyYWNrU3RhY2sucHVzaChzaG91bGRUcmFjayk7XG4gIHNob3VsZFRyYWNrID0gZmFsc2U7XG59XG5mdW5jdGlvbiBlbmFibGVUcmFja2luZygpIHtcbiAgdHJhY2tTdGFjay5wdXNoKHNob3VsZFRyYWNrKTtcbiAgc2hvdWxkVHJhY2sgPSB0cnVlO1xufVxuZnVuY3Rpb24gcmVzZXRUcmFja2luZygpIHtcbiAgY29uc3QgbGFzdCA9IHRyYWNrU3RhY2sucG9wKCk7XG4gIHNob3VsZFRyYWNrID0gbGFzdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IGxhc3Q7XG59XG5mdW5jdGlvbiB0cmFjayh0YXJnZXQsIHR5cGUsIGtleSkge1xuICBpZiAoIXNob3VsZFRyYWNrIHx8IGFjdGl2ZUVmZmVjdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoIWRlcHNNYXApIHtcbiAgICB0YXJnZXRNYXAuc2V0KHRhcmdldCwgZGVwc01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCkpO1xuICB9XG4gIGxldCBkZXAgPSBkZXBzTWFwLmdldChrZXkpO1xuICBpZiAoIWRlcCkge1xuICAgIGRlcHNNYXAuc2V0KGtleSwgZGVwID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSk7XG4gIH1cbiAgaWYgKCFkZXAuaGFzKGFjdGl2ZUVmZmVjdCkpIHtcbiAgICBkZXAuYWRkKGFjdGl2ZUVmZmVjdCk7XG4gICAgYWN0aXZlRWZmZWN0LmRlcHMucHVzaChkZXApO1xuICAgIGlmIChhY3RpdmVFZmZlY3Qub3B0aW9ucy5vblRyYWNrKSB7XG4gICAgICBhY3RpdmVFZmZlY3Qub3B0aW9ucy5vblRyYWNrKHtcbiAgICAgICAgZWZmZWN0OiBhY3RpdmVFZmZlY3QsXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRyaWdnZXIodGFyZ2V0LCB0eXBlLCBrZXksIG5ld1ZhbHVlLCBvbGRWYWx1ZSwgb2xkVGFyZ2V0KSB7XG4gIGNvbnN0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KHRhcmdldCk7XG4gIGlmICghZGVwc01hcCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBlZmZlY3RzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgY29uc3QgYWRkMiA9IChlZmZlY3RzVG9BZGQpID0+IHtcbiAgICBpZiAoZWZmZWN0c1RvQWRkKSB7XG4gICAgICBlZmZlY3RzVG9BZGQuZm9yRWFjaCgoZWZmZWN0MykgPT4ge1xuICAgICAgICBpZiAoZWZmZWN0MyAhPT0gYWN0aXZlRWZmZWN0IHx8IGVmZmVjdDMuYWxsb3dSZWN1cnNlKSB7XG4gICAgICAgICAgZWZmZWN0cy5hZGQoZWZmZWN0Myk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgaWYgKHR5cGUgPT09IFwiY2xlYXJcIikge1xuICAgIGRlcHNNYXAuZm9yRWFjaChhZGQyKTtcbiAgfSBlbHNlIGlmIChrZXkgPT09IFwibGVuZ3RoXCIgJiYgaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgZGVwc01hcC5mb3JFYWNoKChkZXAsIGtleTIpID0+IHtcbiAgICAgIGlmIChrZXkyID09PSBcImxlbmd0aFwiIHx8IGtleTIgPj0gbmV3VmFsdWUpIHtcbiAgICAgICAgYWRkMihkZXApO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGlmIChrZXkgIT09IHZvaWQgMCkge1xuICAgICAgYWRkMihkZXBzTWFwLmdldChrZXkpKTtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiYWRkXCI6XG4gICAgICAgIGlmICghaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgYWRkMihkZXBzTWFwLmdldChJVEVSQVRFX0tFWSkpO1xuICAgICAgICAgIGlmIChpc01hcCh0YXJnZXQpKSB7XG4gICAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KE1BUF9LRVlfSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNJbnRlZ2VyS2V5KGtleSkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KFwibGVuZ3RoXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcbiAgICAgICAgaWYgKCFpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoTUFQX0tFWV9JVEVSQVRFX0tFWSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzZXRcIjpcbiAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGNvbnN0IHJ1biA9IChlZmZlY3QzKSA9PiB7XG4gICAgaWYgKGVmZmVjdDMub3B0aW9ucy5vblRyaWdnZXIpIHtcbiAgICAgIGVmZmVjdDMub3B0aW9ucy5vblRyaWdnZXIoe1xuICAgICAgICBlZmZlY3Q6IGVmZmVjdDMsXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAga2V5LFxuICAgICAgICB0eXBlLFxuICAgICAgICBuZXdWYWx1ZSxcbiAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgIG9sZFRhcmdldFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChlZmZlY3QzLm9wdGlvbnMuc2NoZWR1bGVyKSB7XG4gICAgICBlZmZlY3QzLm9wdGlvbnMuc2NoZWR1bGVyKGVmZmVjdDMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlZmZlY3QzKCk7XG4gICAgfVxuICB9O1xuICBlZmZlY3RzLmZvckVhY2gocnVuKTtcbn1cbnZhciBpc05vblRyYWNrYWJsZUtleXMgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChgX19wcm90b19fLF9fdl9pc1JlZixfX2lzVnVlYCk7XG52YXIgYnVpbHRJblN5bWJvbHMgPSBuZXcgU2V0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkubWFwKChrZXkpID0+IFN5bWJvbFtrZXldKS5maWx0ZXIoaXNTeW1ib2wpKTtcbnZhciBnZXQyID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcigpO1xudmFyIHJlYWRvbmx5R2V0ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcih0cnVlKTtcbnZhciBhcnJheUluc3RydW1lbnRhdGlvbnMgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlQXJyYXlJbnN0cnVtZW50YXRpb25zKCk7XG5mdW5jdGlvbiBjcmVhdGVBcnJheUluc3RydW1lbnRhdGlvbnMoKSB7XG4gIGNvbnN0IGluc3RydW1lbnRhdGlvbnMgPSB7fTtcbiAgW1wiaW5jbHVkZXNcIiwgXCJpbmRleE9mXCIsIFwibGFzdEluZGV4T2ZcIl0uZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaW5zdHJ1bWVudGF0aW9uc1trZXldID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgY29uc3QgYXJyID0gdG9SYXcodGhpcyk7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRyYWNrKGFyciwgXCJnZXRcIiwgaSArIFwiXCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzID0gYXJyW2tleV0oLi4uYXJncyk7XG4gICAgICBpZiAocmVzID09PSAtMSB8fCByZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBhcnJba2V5XSguLi5hcmdzLm1hcCh0b1JhdykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgW1wicHVzaFwiLCBcInBvcFwiLCBcInNoaWZ0XCIsIFwidW5zaGlmdFwiLCBcInNwbGljZVwiXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpbnN0cnVtZW50YXRpb25zW2tleV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgICBjb25zdCByZXMgPSB0b1Jhdyh0aGlzKVtrZXldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIGluc3RydW1lbnRhdGlvbnM7XG59XG5mdW5jdGlvbiBjcmVhdGVHZXR0ZXIoaXNSZWFkb25seSA9IGZhbHNlLCBzaGFsbG93ID0gZmFsc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldDModGFyZ2V0LCBrZXksIHJlY2VpdmVyKSB7XG4gICAgaWYgKGtleSA9PT0gXCJfX3ZfaXNSZWFjdGl2ZVwiKSB7XG4gICAgICByZXR1cm4gIWlzUmVhZG9ubHk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X2lzUmVhZG9ubHlcIikge1xuICAgICAgcmV0dXJuIGlzUmVhZG9ubHk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X3Jhd1wiICYmIHJlY2VpdmVyID09PSAoaXNSZWFkb25seSA/IHNoYWxsb3cgPyBzaGFsbG93UmVhZG9ubHlNYXAgOiByZWFkb25seU1hcCA6IHNoYWxsb3cgPyBzaGFsbG93UmVhY3RpdmVNYXAgOiByZWFjdGl2ZU1hcCkuZ2V0KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldElzQXJyYXkgPSBpc0FycmF5KHRhcmdldCk7XG4gICAgaWYgKCFpc1JlYWRvbmx5ICYmIHRhcmdldElzQXJyYXkgJiYgaGFzT3duKGFycmF5SW5zdHJ1bWVudGF0aW9ucywga2V5KSkge1xuICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGFycmF5SW5zdHJ1bWVudGF0aW9ucywga2V5LCByZWNlaXZlcik7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlcik7XG4gICAgaWYgKGlzU3ltYm9sKGtleSkgPyBidWlsdEluU3ltYm9scy5oYXMoa2V5KSA6IGlzTm9uVHJhY2thYmxlS2V5cyhrZXkpKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoIWlzUmVhZG9ubHkpIHtcbiAgICAgIHRyYWNrKHRhcmdldCwgXCJnZXRcIiwga2V5KTtcbiAgICB9XG4gICAgaWYgKHNoYWxsb3cpIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmIChpc1JlZihyZXMpKSB7XG4gICAgICBjb25zdCBzaG91bGRVbndyYXAgPSAhdGFyZ2V0SXNBcnJheSB8fCAhaXNJbnRlZ2VyS2V5KGtleSk7XG4gICAgICByZXR1cm4gc2hvdWxkVW53cmFwID8gcmVzLnZhbHVlIDogcmVzO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QocmVzKSkge1xuICAgICAgcmV0dXJuIGlzUmVhZG9ubHkgPyByZWFkb25seShyZXMpIDogcmVhY3RpdmUyKHJlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG59XG52YXIgc2V0MiA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTZXR0ZXIoKTtcbmZ1bmN0aW9uIGNyZWF0ZVNldHRlcihzaGFsbG93ID0gZmFsc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNldDModGFyZ2V0LCBrZXksIHZhbHVlLCByZWNlaXZlcikge1xuICAgIGxldCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgIGlmICghc2hhbGxvdykge1xuICAgICAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gICAgICBvbGRWYWx1ZSA9IHRvUmF3KG9sZFZhbHVlKTtcbiAgICAgIGlmICghaXNBcnJheSh0YXJnZXQpICYmIGlzUmVmKG9sZFZhbHVlKSAmJiAhaXNSZWYodmFsdWUpKSB7XG4gICAgICAgIG9sZFZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBoYWRLZXkgPSBpc0FycmF5KHRhcmdldCkgJiYgaXNJbnRlZ2VyS2V5KGtleSkgPyBOdW1iZXIoa2V5KSA8IHRhcmdldC5sZW5ndGggOiBoYXNPd24odGFyZ2V0LCBrZXkpO1xuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgIGlmICh0YXJnZXQgPT09IHRvUmF3KHJlY2VpdmVyKSkge1xuICAgICAgaWYgKCFoYWRLZXkpIHtcbiAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiYWRkXCIsIGtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwic2V0XCIsIGtleSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gIGNvbnN0IGhhZEtleSA9IGhhc093bih0YXJnZXQsIGtleSk7XG4gIGNvbnN0IG9sZFZhbHVlID0gdGFyZ2V0W2tleV07XG4gIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICBpZiAocmVzdWx0ICYmIGhhZEtleSkge1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgb2xkVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBoYXModGFyZ2V0LCBrZXkpIHtcbiAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5oYXModGFyZ2V0LCBrZXkpO1xuICBpZiAoIWlzU3ltYm9sKGtleSkgfHwgIWJ1aWx0SW5TeW1ib2xzLmhhcyhrZXkpKSB7XG4gICAgdHJhY2sodGFyZ2V0LCBcImhhc1wiLCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvd25LZXlzKHRhcmdldCkge1xuICB0cmFjayh0YXJnZXQsIFwiaXRlcmF0ZVwiLCBpc0FycmF5KHRhcmdldCkgPyBcImxlbmd0aFwiIDogSVRFUkFURV9LRVkpO1xuICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG59XG52YXIgbXV0YWJsZUhhbmRsZXJzID0ge1xuICBnZXQ6IGdldDIsXG4gIHNldDogc2V0MixcbiAgZGVsZXRlUHJvcGVydHksXG4gIGhhcyxcbiAgb3duS2V5c1xufTtcbnZhciByZWFkb25seUhhbmRsZXJzID0ge1xuICBnZXQ6IHJlYWRvbmx5R2V0LFxuICBzZXQodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc29sZS53YXJuKGBTZXQgb3BlcmF0aW9uIG9uIGtleSBcIiR7U3RyaW5nKGtleSl9XCIgZmFpbGVkOiB0YXJnZXQgaXMgcmVhZG9ubHkuYCwgdGFyZ2V0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgaWYgKHRydWUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgRGVsZXRlIG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsIHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xudmFyIHRvUmVhY3RpdmUgPSAodmFsdWUpID0+IGlzT2JqZWN0KHZhbHVlKSA/IHJlYWN0aXZlMih2YWx1ZSkgOiB2YWx1ZTtcbnZhciB0b1JlYWRvbmx5ID0gKHZhbHVlKSA9PiBpc09iamVjdCh2YWx1ZSkgPyByZWFkb25seSh2YWx1ZSkgOiB2YWx1ZTtcbnZhciB0b1NoYWxsb3cgPSAodmFsdWUpID0+IHZhbHVlO1xudmFyIGdldFByb3RvID0gKHYpID0+IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2Yodik7XG5mdW5jdGlvbiBnZXQkMSh0YXJnZXQsIGtleSwgaXNSZWFkb25seSA9IGZhbHNlLCBpc1NoYWxsb3cgPSBmYWxzZSkge1xuICB0YXJnZXQgPSB0YXJnZXRbXG4gICAgXCJfX3ZfcmF3XCJcbiAgICAvKiBSQVcgKi9cbiAgXTtcbiAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgY29uc3QgcmF3S2V5ID0gdG9SYXcoa2V5KTtcbiAgaWYgKGtleSAhPT0gcmF3S2V5KSB7XG4gICAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcImdldFwiLCBrZXkpO1xuICB9XG4gICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJnZXRcIiwgcmF3S2V5KTtcbiAgY29uc3QgeyBoYXM6IGhhczIgfSA9IGdldFByb3RvKHJhd1RhcmdldCk7XG4gIGNvbnN0IHdyYXAgPSBpc1NoYWxsb3cgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5ID8gdG9SZWFkb25seSA6IHRvUmVhY3RpdmU7XG4gIGlmIChoYXMyLmNhbGwocmF3VGFyZ2V0LCBrZXkpKSB7XG4gICAgcmV0dXJuIHdyYXAodGFyZ2V0LmdldChrZXkpKTtcbiAgfSBlbHNlIGlmIChoYXMyLmNhbGwocmF3VGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgcmV0dXJuIHdyYXAodGFyZ2V0LmdldChyYXdLZXkpKTtcbiAgfSBlbHNlIGlmICh0YXJnZXQgIT09IHJhd1RhcmdldCkge1xuICAgIHRhcmdldC5nZXQoa2V5KTtcbiAgfVxufVxuZnVuY3Rpb24gaGFzJDEoa2V5LCBpc1JlYWRvbmx5ID0gZmFsc2UpIHtcbiAgY29uc3QgdGFyZ2V0ID0gdGhpc1tcbiAgICBcIl9fdl9yYXdcIlxuICAgIC8qIFJBVyAqL1xuICBdO1xuICBjb25zdCByYXdUYXJnZXQgPSB0b1Jhdyh0YXJnZXQpO1xuICBjb25zdCByYXdLZXkgPSB0b1JhdyhrZXkpO1xuICBpZiAoa2V5ICE9PSByYXdLZXkpIHtcbiAgICAhaXNSZWFkb25seSAmJiB0cmFjayhyYXdUYXJnZXQsIFwiaGFzXCIsIGtleSk7XG4gIH1cbiAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcImhhc1wiLCByYXdLZXkpO1xuICByZXR1cm4ga2V5ID09PSByYXdLZXkgPyB0YXJnZXQuaGFzKGtleSkgOiB0YXJnZXQuaGFzKGtleSkgfHwgdGFyZ2V0LmhhcyhyYXdLZXkpO1xufVxuZnVuY3Rpb24gc2l6ZSh0YXJnZXQsIGlzUmVhZG9ubHkgPSBmYWxzZSkge1xuICB0YXJnZXQgPSB0YXJnZXRbXG4gICAgXCJfX3ZfcmF3XCJcbiAgICAvKiBSQVcgKi9cbiAgXTtcbiAgIWlzUmVhZG9ubHkgJiYgdHJhY2sodG9SYXcodGFyZ2V0KSwgXCJpdGVyYXRlXCIsIElURVJBVEVfS0VZKTtcbiAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgXCJzaXplXCIsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICBjb25zdCBwcm90byA9IGdldFByb3RvKHRhcmdldCk7XG4gIGNvbnN0IGhhZEtleSA9IHByb3RvLmhhcy5jYWxsKHRhcmdldCwgdmFsdWUpO1xuICBpZiAoIWhhZEtleSkge1xuICAgIHRhcmdldC5hZGQodmFsdWUpO1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCB2YWx1ZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gc2V0JDEoa2V5LCB2YWx1ZSkge1xuICB2YWx1ZSA9IHRvUmF3KHZhbHVlKTtcbiAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gIGNvbnN0IHsgaGFzOiBoYXMyLCBnZXQ6IGdldDMgfSA9IGdldFByb3RvKHRhcmdldCk7XG4gIGxldCBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICBpZiAoIWhhZEtleSkge1xuICAgIGtleSA9IHRvUmF3KGtleSk7XG4gICAgaGFkS2V5ID0gaGFzMi5jYWxsKHRhcmdldCwga2V5KTtcbiAgfSBlbHNlIGlmICh0cnVlKSB7XG4gICAgY2hlY2tJZGVudGl0eUtleXModGFyZ2V0LCBoYXMyLCBrZXkpO1xuICB9XG4gIGNvbnN0IG9sZFZhbHVlID0gZ2V0My5jYWxsKHRhcmdldCwga2V5KTtcbiAgdGFyZ2V0LnNldChrZXksIHZhbHVlKTtcbiAgaWYgKCFoYWRLZXkpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJhZGRcIiwga2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgdHJpZ2dlcih0YXJnZXQsIFwic2V0XCIsIGtleSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIGRlbGV0ZUVudHJ5KGtleSkge1xuICBjb25zdCB0YXJnZXQgPSB0b1Jhdyh0aGlzKTtcbiAgY29uc3QgeyBoYXM6IGhhczIsIGdldDogZ2V0MyB9ID0gZ2V0UHJvdG8odGFyZ2V0KTtcbiAgbGV0IGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gIGlmICghaGFkS2V5KSB7XG4gICAga2V5ID0gdG9SYXcoa2V5KTtcbiAgICBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICB9IGVsc2UgaWYgKHRydWUpIHtcbiAgICBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhczIsIGtleSk7XG4gIH1cbiAgY29uc3Qgb2xkVmFsdWUgPSBnZXQzID8gZ2V0My5jYWxsKHRhcmdldCwga2V5KSA6IHZvaWQgMDtcbiAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0LmRlbGV0ZShrZXkpO1xuICBpZiAoaGFkS2V5KSB7XG4gICAgdHJpZ2dlcih0YXJnZXQsIFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBvbGRWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNsZWFyKCkge1xuICBjb25zdCB0YXJnZXQgPSB0b1Jhdyh0aGlzKTtcbiAgY29uc3QgaGFkSXRlbXMgPSB0YXJnZXQuc2l6ZSAhPT0gMDtcbiAgY29uc3Qgb2xkVGFyZ2V0ID0gdHJ1ZSA/IGlzTWFwKHRhcmdldCkgPyBuZXcgTWFwKHRhcmdldCkgOiBuZXcgU2V0KHRhcmdldCkgOiB2b2lkIDA7XG4gIGNvbnN0IHJlc3VsdCA9IHRhcmdldC5jbGVhcigpO1xuICBpZiAoaGFkSXRlbXMpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJjbGVhclwiLCB2b2lkIDAsIHZvaWQgMCwgb2xkVGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY3JlYXRlRm9yRWFjaChpc1JlYWRvbmx5LCBpc1NoYWxsb3cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBjb25zdCBvYnNlcnZlZCA9IHRoaXM7XG4gICAgY29uc3QgdGFyZ2V0ID0gb2JzZXJ2ZWRbXG4gICAgICBcIl9fdl9yYXdcIlxuICAgICAgLyogUkFXICovXG4gICAgXTtcbiAgICBjb25zdCByYXdUYXJnZXQgPSB0b1Jhdyh0YXJnZXQpO1xuICAgIGNvbnN0IHdyYXAgPSBpc1NoYWxsb3cgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5ID8gdG9SZWFkb25seSA6IHRvUmVhY3RpdmU7XG4gICAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcIml0ZXJhdGVcIiwgSVRFUkFURV9LRVkpO1xuICAgIHJldHVybiB0YXJnZXQuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgd3JhcCh2YWx1ZSksIHdyYXAoa2V5KSwgb2JzZXJ2ZWQpO1xuICAgIH0pO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBpc1JlYWRvbmx5LCBpc1NoYWxsb3cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzW1xuICAgICAgXCJfX3ZfcmF3XCJcbiAgICAgIC8qIFJBVyAqL1xuICAgIF07XG4gICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICBjb25zdCB0YXJnZXRJc01hcCA9IGlzTWFwKHJhd1RhcmdldCk7XG4gICAgY29uc3QgaXNQYWlyID0gbWV0aG9kID09PSBcImVudHJpZXNcIiB8fCBtZXRob2QgPT09IFN5bWJvbC5pdGVyYXRvciAmJiB0YXJnZXRJc01hcDtcbiAgICBjb25zdCBpc0tleU9ubHkgPSBtZXRob2QgPT09IFwia2V5c1wiICYmIHRhcmdldElzTWFwO1xuICAgIGNvbnN0IGlubmVySXRlcmF0b3IgPSB0YXJnZXRbbWV0aG9kXSguLi5hcmdzKTtcbiAgICBjb25zdCB3cmFwID0gaXNTaGFsbG93ID8gdG9TaGFsbG93IDogaXNSZWFkb25seSA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJpdGVyYXRlXCIsIGlzS2V5T25seSA/IE1BUF9LRVlfSVRFUkFURV9LRVkgOiBJVEVSQVRFX0tFWSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGl0ZXJhdG9yIHByb3RvY29sXG4gICAgICBuZXh0KCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBpbm5lckl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIGRvbmUgPyB7IHZhbHVlLCBkb25lIH0gOiB7XG4gICAgICAgICAgdmFsdWU6IGlzUGFpciA/IFt3cmFwKHZhbHVlWzBdKSwgd3JhcCh2YWx1ZVsxXSldIDogd3JhcCh2YWx1ZSksXG4gICAgICAgICAgZG9uZVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIC8vIGl0ZXJhYmxlIHByb3RvY29sXG4gICAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJlYWRvbmx5TWV0aG9kKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYXJnc1swXSA/IGBvbiBrZXkgXCIke2FyZ3NbMF19XCIgYCA6IGBgO1xuICAgICAgY29uc29sZS53YXJuKGAke2NhcGl0YWxpemUodHlwZSl9IG9wZXJhdGlvbiAke2tleX1mYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLCB0b1Jhdyh0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlID09PSBcImRlbGV0ZVwiID8gZmFsc2UgOiB0aGlzO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucygpIHtcbiAgY29uc3QgbXV0YWJsZUluc3RydW1lbnRhdGlvbnMyID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXQkMSh0aGlzLCBrZXkpO1xuICAgIH0sXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gc2l6ZSh0aGlzKTtcbiAgICB9LFxuICAgIGhhczogaGFzJDEsXG4gICAgYWRkLFxuICAgIHNldDogc2V0JDEsXG4gICAgZGVsZXRlOiBkZWxldGVFbnRyeSxcbiAgICBjbGVhcixcbiAgICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKGZhbHNlLCBmYWxzZSlcbiAgfTtcbiAgY29uc3Qgc2hhbGxvd0luc3RydW1lbnRhdGlvbnMyID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXQkMSh0aGlzLCBrZXksIGZhbHNlLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcyk7XG4gICAgfSxcbiAgICBoYXM6IGhhcyQxLFxuICAgIGFkZCxcbiAgICBzZXQ6IHNldCQxLFxuICAgIGRlbGV0ZTogZGVsZXRlRW50cnksXG4gICAgY2xlYXIsXG4gICAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaChmYWxzZSwgdHJ1ZSlcbiAgfTtcbiAgY29uc3QgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMiA9IHtcbiAgICBnZXQoa2V5KSB7XG4gICAgICByZXR1cm4gZ2V0JDEodGhpcywga2V5LCB0cnVlKTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcywgdHJ1ZSk7XG4gICAgfSxcbiAgICBoYXMoa2V5KSB7XG4gICAgICByZXR1cm4gaGFzJDEuY2FsbCh0aGlzLCBrZXksIHRydWUpO1xuICAgIH0sXG4gICAgYWRkOiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwiYWRkXCJcbiAgICAgIC8qIEFERCAqL1xuICAgICksXG4gICAgc2V0OiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwic2V0XCJcbiAgICAgIC8qIFNFVCAqL1xuICAgICksXG4gICAgZGVsZXRlOiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwiZGVsZXRlXCJcbiAgICAgIC8qIERFTEVURSAqL1xuICAgICksXG4gICAgY2xlYXI6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFxuICAgICAgXCJjbGVhclwiXG4gICAgICAvKiBDTEVBUiAqL1xuICAgICksXG4gICAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaCh0cnVlLCBmYWxzZSlcbiAgfTtcbiAgY29uc3Qgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uczIgPSB7XG4gICAgZ2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldCQxKHRoaXMsIGtleSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiBzaXplKHRoaXMsIHRydWUpO1xuICAgIH0sXG4gICAgaGFzKGtleSkge1xuICAgICAgcmV0dXJuIGhhcyQxLmNhbGwodGhpcywga2V5LCB0cnVlKTtcbiAgICB9LFxuICAgIGFkZDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXG4gICAgICBcImFkZFwiXG4gICAgICAvKiBBREQgKi9cbiAgICApLFxuICAgIHNldDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXG4gICAgICBcInNldFwiXG4gICAgICAvKiBTRVQgKi9cbiAgICApLFxuICAgIGRlbGV0ZTogY3JlYXRlUmVhZG9ubHlNZXRob2QoXG4gICAgICBcImRlbGV0ZVwiXG4gICAgICAvKiBERUxFVEUgKi9cbiAgICApLFxuICAgIGNsZWFyOiBjcmVhdGVSZWFkb25seU1ldGhvZChcbiAgICAgIFwiY2xlYXJcIlxuICAgICAgLyogQ0xFQVIgKi9cbiAgICApLFxuICAgIGZvckVhY2g6IGNyZWF0ZUZvckVhY2godHJ1ZSwgdHJ1ZSlcbiAgfTtcbiAgY29uc3QgaXRlcmF0b3JNZXRob2RzID0gW1wia2V5c1wiLCBcInZhbHVlc1wiLCBcImVudHJpZXNcIiwgU3ltYm9sLml0ZXJhdG9yXTtcbiAgaXRlcmF0b3JNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIG11dGFibGVJbnN0cnVtZW50YXRpb25zMlttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9uczJbbWV0aG9kXSA9IGNyZWF0ZUl0ZXJhYmxlTWV0aG9kKG1ldGhvZCwgdHJ1ZSwgZmFsc2UpO1xuICAgIHNoYWxsb3dJbnN0cnVtZW50YXRpb25zMlttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBmYWxzZSwgdHJ1ZSk7XG4gICAgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uczJbbWV0aG9kXSA9IGNyZWF0ZUl0ZXJhYmxlTWV0aG9kKG1ldGhvZCwgdHJ1ZSwgdHJ1ZSk7XG4gIH0pO1xuICByZXR1cm4gW1xuICAgIG11dGFibGVJbnN0cnVtZW50YXRpb25zMixcbiAgICByZWFkb25seUluc3RydW1lbnRhdGlvbnMyLFxuICAgIHNoYWxsb3dJbnN0cnVtZW50YXRpb25zMixcbiAgICBzaGFsbG93UmVhZG9ubHlJbnN0cnVtZW50YXRpb25zMlxuICBdO1xufVxudmFyIFttdXRhYmxlSW5zdHJ1bWVudGF0aW9ucywgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zLCBzaGFsbG93SW5zdHJ1bWVudGF0aW9ucywgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uc10gPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucygpO1xuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGlzUmVhZG9ubHksIHNoYWxsb3cpIHtcbiAgY29uc3QgaW5zdHJ1bWVudGF0aW9ucyA9IHNoYWxsb3cgPyBpc1JlYWRvbmx5ID8gc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IHNoYWxsb3dJbnN0cnVtZW50YXRpb25zIDogaXNSZWFkb25seSA/IHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IG11dGFibGVJbnN0cnVtZW50YXRpb25zO1xuICByZXR1cm4gKHRhcmdldCwga2V5LCByZWNlaXZlcikgPT4ge1xuICAgIGlmIChrZXkgPT09IFwiX192X2lzUmVhY3RpdmVcIikge1xuICAgICAgcmV0dXJuICFpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9yYXdcIikge1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGhhc093bihpbnN0cnVtZW50YXRpb25zLCBrZXkpICYmIGtleSBpbiB0YXJnZXQgPyBpbnN0cnVtZW50YXRpb25zIDogdGFyZ2V0LCBrZXksIHJlY2VpdmVyKTtcbiAgfTtcbn1cbnZhciBtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzID0ge1xuICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIoZmFsc2UsIGZhbHNlKVxufTtcbnZhciByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgZ2V0OiAvKiBAX19QVVJFX18gKi8gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKHRydWUsIGZhbHNlKVxufTtcbmZ1bmN0aW9uIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KSB7XG4gIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gIGlmIChyYXdLZXkgIT09IGtleSAmJiBoYXMyLmNhbGwodGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgY29uc3QgdHlwZSA9IHRvUmF3VHlwZSh0YXJnZXQpO1xuICAgIGNvbnNvbGUud2FybihgUmVhY3RpdmUgJHt0eXBlfSBjb250YWlucyBib3RoIHRoZSByYXcgYW5kIHJlYWN0aXZlIHZlcnNpb25zIG9mIHRoZSBzYW1lIG9iamVjdCR7dHlwZSA9PT0gYE1hcGAgPyBgIGFzIGtleXNgIDogYGB9LCB3aGljaCBjYW4gbGVhZCB0byBpbmNvbnNpc3RlbmNpZXMuIEF2b2lkIGRpZmZlcmVudGlhdGluZyBiZXR3ZWVuIHRoZSByYXcgYW5kIHJlYWN0aXZlIHZlcnNpb25zIG9mIGFuIG9iamVjdCBhbmQgb25seSB1c2UgdGhlIHJlYWN0aXZlIHZlcnNpb24gaWYgcG9zc2libGUuYCk7XG4gIH1cbn1cbnZhciByZWFjdGl2ZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIHNoYWxsb3dSZWFjdGl2ZU1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIHJlYWRvbmx5TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG52YXIgc2hhbGxvd1JlYWRvbmx5TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiB0YXJnZXRUeXBlTWFwKHJhd1R5cGUpIHtcbiAgc3dpdGNoIChyYXdUeXBlKSB7XG4gICAgY2FzZSBcIk9iamVjdFwiOlxuICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSBcIk1hcFwiOlxuICAgIGNhc2UgXCJTZXRcIjpcbiAgICBjYXNlIFwiV2Vha01hcFwiOlxuICAgIGNhc2UgXCJXZWFrU2V0XCI6XG4gICAgICByZXR1cm4gMjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDA7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhcmdldFR5cGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlW1xuICAgIFwiX192X3NraXBcIlxuICAgIC8qIFNLSVAgKi9cbiAgXSB8fCAhT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkgPyAwIDogdGFyZ2V0VHlwZU1hcCh0b1Jhd1R5cGUodmFsdWUpKTtcbn1cbmZ1bmN0aW9uIHJlYWN0aXZlMih0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCAmJiB0YXJnZXRbXG4gICAgXCJfX3ZfaXNSZWFkb25seVwiXG4gICAgLyogSVNfUkVBRE9OTFkgKi9cbiAgXSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KHRhcmdldCwgZmFsc2UsIG11dGFibGVIYW5kbGVycywgbXV0YWJsZUNvbGxlY3Rpb25IYW5kbGVycywgcmVhY3RpdmVNYXApO1xufVxuZnVuY3Rpb24gcmVhZG9ubHkodGFyZ2V0KSB7XG4gIHJldHVybiBjcmVhdGVSZWFjdGl2ZU9iamVjdCh0YXJnZXQsIHRydWUsIHJlYWRvbmx5SGFuZGxlcnMsIHJlYWRvbmx5Q29sbGVjdGlvbkhhbmRsZXJzLCByZWFkb25seU1hcCk7XG59XG5mdW5jdGlvbiBjcmVhdGVSZWFjdGl2ZU9iamVjdCh0YXJnZXQsIGlzUmVhZG9ubHksIGJhc2VIYW5kbGVycywgY29sbGVjdGlvbkhhbmRsZXJzLCBwcm94eU1hcCkge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc29sZS53YXJuKGB2YWx1ZSBjYW5ub3QgYmUgbWFkZSByZWFjdGl2ZTogJHtTdHJpbmcodGFyZ2V0KX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBpZiAodGFyZ2V0W1xuICAgIFwiX192X3Jhd1wiXG4gICAgLyogUkFXICovXG4gIF0gJiYgIShpc1JlYWRvbmx5ICYmIHRhcmdldFtcbiAgICBcIl9fdl9pc1JlYWN0aXZlXCJcbiAgICAvKiBJU19SRUFDVElWRSAqL1xuICBdKSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgY29uc3QgZXhpc3RpbmdQcm94eSA9IHByb3h5TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoZXhpc3RpbmdQcm94eSkge1xuICAgIHJldHVybiBleGlzdGluZ1Byb3h5O1xuICB9XG4gIGNvbnN0IHRhcmdldFR5cGUgPSBnZXRUYXJnZXRUeXBlKHRhcmdldCk7XG4gIGlmICh0YXJnZXRUeXBlID09PSAwKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIHRhcmdldFR5cGUgPT09IDIgPyBjb2xsZWN0aW9uSGFuZGxlcnMgOiBiYXNlSGFuZGxlcnMpO1xuICBwcm94eU1hcC5zZXQodGFyZ2V0LCBwcm94eSk7XG4gIHJldHVybiBwcm94eTtcbn1cbmZ1bmN0aW9uIHRvUmF3KG9ic2VydmVkKSB7XG4gIHJldHVybiBvYnNlcnZlZCAmJiB0b1JhdyhvYnNlcnZlZFtcbiAgICBcIl9fdl9yYXdcIlxuICAgIC8qIFJBVyAqL1xuICBdKSB8fCBvYnNlcnZlZDtcbn1cbmZ1bmN0aW9uIGlzUmVmKHIpIHtcbiAgcmV0dXJuIEJvb2xlYW4ociAmJiByLl9fdl9pc1JlZiA9PT0gdHJ1ZSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvJG5leHRUaWNrLmpzXG5tYWdpYyhcIm5leHRUaWNrXCIsICgpID0+IG5leHRUaWNrKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kZGlzcGF0Y2guanNcbm1hZ2ljKFwiZGlzcGF0Y2hcIiwgKGVsKSA9PiBkaXNwYXRjaC5iaW5kKGRpc3BhdGNoLCBlbCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyR3YXRjaC5qc1xubWFnaWMoXCJ3YXRjaFwiLCAoZWwsIHsgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlcjIsIGNsZWFudXA6IGNsZWFudXAyIH0pID0+IChrZXksIGNhbGxiYWNrKSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyMihrZXkpO1xuICBsZXQgZ2V0dGVyID0gKCkgPT4ge1xuICAgIGxldCB2YWx1ZTtcbiAgICBldmFsdWF0ZTIoKGkpID0+IHZhbHVlID0gaSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBsZXQgdW53YXRjaCA9IHdhdGNoKGdldHRlciwgY2FsbGJhY2spO1xuICBjbGVhbnVwMih1bndhdGNoKTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRzdG9yZS5qc1xubWFnaWMoXCJzdG9yZVwiLCBnZXRTdG9yZXMpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRkYXRhLmpzXG5tYWdpYyhcImRhdGFcIiwgKGVsKSA9PiBzY29wZShlbCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRyb290LmpzXG5tYWdpYyhcInJvb3RcIiwgKGVsKSA9PiBjbG9zZXN0Um9vdChlbCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRyZWZzLmpzXG5tYWdpYyhcInJlZnNcIiwgKGVsKSA9PiB7XG4gIGlmIChlbC5feF9yZWZzX3Byb3h5KVxuICAgIHJldHVybiBlbC5feF9yZWZzX3Byb3h5O1xuICBlbC5feF9yZWZzX3Byb3h5ID0gbWVyZ2VQcm94aWVzKGdldEFycmF5T2ZSZWZPYmplY3QoZWwpKTtcbiAgcmV0dXJuIGVsLl94X3JlZnNfcHJveHk7XG59KTtcbmZ1bmN0aW9uIGdldEFycmF5T2ZSZWZPYmplY3QoZWwpIHtcbiAgbGV0IHJlZk9iamVjdHMgPSBbXTtcbiAgZmluZENsb3Nlc3QoZWwsIChpKSA9PiB7XG4gICAgaWYgKGkuX3hfcmVmcylcbiAgICAgIHJlZk9iamVjdHMucHVzaChpLl94X3JlZnMpO1xuICB9KTtcbiAgcmV0dXJuIHJlZk9iamVjdHM7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9pZHMuanNcbnZhciBnbG9iYWxJZE1lbW8gPSB7fTtcbmZ1bmN0aW9uIGZpbmRBbmRJbmNyZW1lbnRJZChuYW1lKSB7XG4gIGlmICghZ2xvYmFsSWRNZW1vW25hbWVdKVxuICAgIGdsb2JhbElkTWVtb1tuYW1lXSA9IDA7XG4gIHJldHVybiArK2dsb2JhbElkTWVtb1tuYW1lXTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3RJZFJvb3QoZWwsIG5hbWUpIHtcbiAgcmV0dXJuIGZpbmRDbG9zZXN0KGVsLCAoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50Ll94X2lkcyAmJiBlbGVtZW50Ll94X2lkc1tuYW1lXSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHNldElkUm9vdChlbCwgbmFtZSkge1xuICBpZiAoIWVsLl94X2lkcylcbiAgICBlbC5feF9pZHMgPSB7fTtcbiAgaWYgKCFlbC5feF9pZHNbbmFtZV0pXG4gICAgZWwuX3hfaWRzW25hbWVdID0gZmluZEFuZEluY3JlbWVudElkKG5hbWUpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRpZC5qc1xubWFnaWMoXCJpZFwiLCAoZWwsIHsgY2xlYW51cDogY2xlYW51cDIgfSkgPT4gKG5hbWUsIGtleSA9IG51bGwpID0+IHtcbiAgbGV0IGNhY2hlS2V5ID0gYCR7bmFtZX0ke2tleSA/IGAtJHtrZXl9YCA6IFwiXCJ9YDtcbiAgcmV0dXJuIGNhY2hlSWRCeU5hbWVPbkVsZW1lbnQoZWwsIGNhY2hlS2V5LCBjbGVhbnVwMiwgKCkgPT4ge1xuICAgIGxldCByb290ID0gY2xvc2VzdElkUm9vdChlbCwgbmFtZSk7XG4gICAgbGV0IGlkID0gcm9vdCA/IHJvb3QuX3hfaWRzW25hbWVdIDogZmluZEFuZEluY3JlbWVudElkKG5hbWUpO1xuICAgIHJldHVybiBrZXkgPyBgJHtuYW1lfS0ke2lkfS0ke2tleX1gIDogYCR7bmFtZX0tJHtpZH1gO1xuICB9KTtcbn0pO1xuaW50ZXJjZXB0Q2xvbmUoKGZyb20sIHRvKSA9PiB7XG4gIGlmIChmcm9tLl94X2lkKSB7XG4gICAgdG8uX3hfaWQgPSBmcm9tLl94X2lkO1xuICB9XG59KTtcbmZ1bmN0aW9uIGNhY2hlSWRCeU5hbWVPbkVsZW1lbnQoZWwsIGNhY2hlS2V5LCBjbGVhbnVwMiwgY2FsbGJhY2spIHtcbiAgaWYgKCFlbC5feF9pZClcbiAgICBlbC5feF9pZCA9IHt9O1xuICBpZiAoZWwuX3hfaWRbY2FjaGVLZXldKVxuICAgIHJldHVybiBlbC5feF9pZFtjYWNoZUtleV07XG4gIGxldCBvdXRwdXQgPSBjYWxsYmFjaygpO1xuICBlbC5feF9pZFtjYWNoZUtleV0gPSBvdXRwdXQ7XG4gIGNsZWFudXAyKCgpID0+IHtcbiAgICBkZWxldGUgZWwuX3hfaWRbY2FjaGVLZXldO1xuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kZWwuanNcbm1hZ2ljKFwiZWxcIiwgKGVsKSA9PiBlbCk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvaW5kZXguanNcbndhcm5NaXNzaW5nUGx1Z2luTWFnaWMoXCJGb2N1c1wiLCBcImZvY3VzXCIsIFwiZm9jdXNcIik7XG53YXJuTWlzc2luZ1BsdWdpbk1hZ2ljKFwiUGVyc2lzdFwiLCBcInBlcnNpc3RcIiwgXCJwZXJzaXN0XCIpO1xuZnVuY3Rpb24gd2Fybk1pc3NpbmdQbHVnaW5NYWdpYyhuYW1lLCBtYWdpY05hbWUsIHNsdWcpIHtcbiAgbWFnaWMobWFnaWNOYW1lLCAoZWwpID0+IHdhcm4oYFlvdSBjYW4ndCB1c2UgWyQke21hZ2ljTmFtZX1dIHdpdGhvdXQgZmlyc3QgaW5zdGFsbGluZyB0aGUgXCIke25hbWV9XCIgcGx1Z2luIGhlcmU6IGh0dHBzOi8vYWxwaW5lanMuZGV2L3BsdWdpbnMvJHtzbHVnfWAsIGVsKSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtbW9kZWxhYmxlLmpzXG5kaXJlY3RpdmUoXCJtb2RlbGFibGVcIiwgKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMsIGV2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIyLCBjbGVhbnVwOiBjbGVhbnVwMiB9KSA9PiB7XG4gIGxldCBmdW5jID0gZXZhbHVhdGVMYXRlcjIoZXhwcmVzc2lvbik7XG4gIGxldCBpbm5lckdldCA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGZ1bmMoKGkpID0+IHJlc3VsdCA9IGkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGxldCBldmFsdWF0ZUlubmVyU2V0ID0gZXZhbHVhdGVMYXRlcjIoYCR7ZXhwcmVzc2lvbn0gPSBfX3BsYWNlaG9sZGVyYCk7XG4gIGxldCBpbm5lclNldCA9ICh2YWwpID0+IGV2YWx1YXRlSW5uZXJTZXQoKCkgPT4ge1xuICB9LCB7IHNjb3BlOiB7IFwiX19wbGFjZWhvbGRlclwiOiB2YWwgfSB9KTtcbiAgbGV0IGluaXRpYWxWYWx1ZSA9IGlubmVyR2V0KCk7XG4gIGlubmVyU2V0KGluaXRpYWxWYWx1ZSk7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpZiAoIWVsLl94X21vZGVsKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzW1wiZGVmYXVsdFwiXSgpO1xuICAgIGxldCBvdXRlckdldCA9IGVsLl94X21vZGVsLmdldDtcbiAgICBsZXQgb3V0ZXJTZXQgPSBlbC5feF9tb2RlbC5zZXQ7XG4gICAgbGV0IHJlbGVhc2VFbnRhbmdsZW1lbnQgPSBlbnRhbmdsZShcbiAgICAgIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBvdXRlckdldCgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBvdXRlclNldCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gaW5uZXJHZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgaW5uZXJTZXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBjbGVhbnVwMihyZWxlYXNlRW50YW5nbGVtZW50KTtcbiAgfSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC10ZWxlcG9ydC5qc1xuZGlyZWN0aXZlKFwidGVsZXBvcnRcIiwgKGVsLCB7IG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJ0ZW1wbGF0ZVwiKVxuICAgIHdhcm4oXCJ4LXRlbGVwb3J0IGNhbiBvbmx5IGJlIHVzZWQgb24gYSA8dGVtcGxhdGU+IHRhZ1wiLCBlbCk7XG4gIGxldCB0YXJnZXQgPSBnZXRUYXJnZXQoZXhwcmVzc2lvbik7XG4gIGxldCBjbG9uZTIgPSBlbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgZWwuX3hfdGVsZXBvcnQgPSBjbG9uZTI7XG4gIGNsb25lMi5feF90ZWxlcG9ydEJhY2sgPSBlbDtcbiAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS10ZWxlcG9ydC10ZW1wbGF0ZVwiLCB0cnVlKTtcbiAgY2xvbmUyLnNldEF0dHJpYnV0ZShcImRhdGEtdGVsZXBvcnQtdGFyZ2V0XCIsIHRydWUpO1xuICBpZiAoZWwuX3hfZm9yd2FyZEV2ZW50cykge1xuICAgIGVsLl94X2ZvcndhcmRFdmVudHMuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICBjbG9uZTIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IGUuY29uc3RydWN0b3IoZS50eXBlLCBlKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhZGRTY29wZVRvTm9kZShjbG9uZTIsIHt9LCBlbCk7XG4gIGxldCBwbGFjZUluRG9tID0gKGNsb25lMywgdGFyZ2V0MiwgbW9kaWZpZXJzMikgPT4ge1xuICAgIGlmIChtb2RpZmllcnMyLmluY2x1ZGVzKFwicHJlcGVuZFwiKSkge1xuICAgICAgdGFyZ2V0Mi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZTMsIHRhcmdldDIpO1xuICAgIH0gZWxzZSBpZiAobW9kaWZpZXJzMi5pbmNsdWRlcyhcImFwcGVuZFwiKSkge1xuICAgICAgdGFyZ2V0Mi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZTMsIHRhcmdldDIubmV4dFNpYmxpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQyLmFwcGVuZENoaWxkKGNsb25lMyk7XG4gICAgfVxuICB9O1xuICBtdXRhdGVEb20oKCkgPT4ge1xuICAgIHBsYWNlSW5Eb20oY2xvbmUyLCB0YXJnZXQsIG1vZGlmaWVycyk7XG4gICAgaW5pdFRyZWUoY2xvbmUyKTtcbiAgICBjbG9uZTIuX3hfaWdub3JlID0gdHJ1ZTtcbiAgfSk7XG4gIGVsLl94X3RlbGVwb3J0UHV0QmFjayA9ICgpID0+IHtcbiAgICBsZXQgdGFyZ2V0MiA9IGdldFRhcmdldChleHByZXNzaW9uKTtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgcGxhY2VJbkRvbShlbC5feF90ZWxlcG9ydCwgdGFyZ2V0MiwgbW9kaWZpZXJzKTtcbiAgICB9KTtcbiAgfTtcbiAgY2xlYW51cDIoKCkgPT4gY2xvbmUyLnJlbW92ZSgpKTtcbn0pO1xudmFyIHRlbGVwb3J0Q29udGFpbmVyRHVyaW5nQ2xvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KGV4cHJlc3Npb24pIHtcbiAgbGV0IHRhcmdldCA9IHNraXBEdXJpbmdDbG9uZSgoKSA9PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZXhwcmVzc2lvbik7XG4gIH0sICgpID0+IHtcbiAgICByZXR1cm4gdGVsZXBvcnRDb250YWluZXJEdXJpbmdDbG9uZTtcbiAgfSkoKTtcbiAgaWYgKCF0YXJnZXQpXG4gICAgd2FybihgQ2Fubm90IGZpbmQgeC10ZWxlcG9ydCBlbGVtZW50IGZvciBzZWxlY3RvcjogXCIke2V4cHJlc3Npb259XCJgKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZ25vcmUuanNcbnZhciBoYW5kbGVyID0gKCkgPT4ge1xufTtcbmhhbmRsZXIuaW5saW5lID0gKGVsLCB7IG1vZGlmaWVycyB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgbW9kaWZpZXJzLmluY2x1ZGVzKFwic2VsZlwiKSA/IGVsLl94X2lnbm9yZVNlbGYgPSB0cnVlIDogZWwuX3hfaWdub3JlID0gdHJ1ZTtcbiAgY2xlYW51cDIoKCkgPT4ge1xuICAgIG1vZGlmaWVycy5pbmNsdWRlcyhcInNlbGZcIikgPyBkZWxldGUgZWwuX3hfaWdub3JlU2VsZiA6IGRlbGV0ZSBlbC5feF9pZ25vcmU7XG4gIH0pO1xufTtcbmRpcmVjdGl2ZShcImlnbm9yZVwiLCBoYW5kbGVyKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1lZmZlY3QuanNcbmRpcmVjdGl2ZShcImVmZmVjdFwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMgfSkgPT4ge1xuICBlZmZlY3QzKGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pKTtcbn0pKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL29uLmpzXG5mdW5jdGlvbiBvbihlbCwgZXZlbnQsIG1vZGlmaWVycywgY2FsbGJhY2spIHtcbiAgbGV0IGxpc3RlbmVyVGFyZ2V0ID0gZWw7XG4gIGxldCBoYW5kbGVyNCA9IChlKSA9PiBjYWxsYmFjayhlKTtcbiAgbGV0IG9wdGlvbnMgPSB7fTtcbiAgbGV0IHdyYXBIYW5kbGVyID0gKGNhbGxiYWNrMiwgd3JhcHBlcikgPT4gKGUpID0+IHdyYXBwZXIoY2FsbGJhY2syLCBlKTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImRvdFwiKSlcbiAgICBldmVudCA9IGRvdFN5bnRheChldmVudCk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJjYW1lbFwiKSlcbiAgICBldmVudCA9IGNhbWVsQ2FzZTIoZXZlbnQpO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwicGFzc2l2ZVwiKSlcbiAgICBvcHRpb25zLnBhc3NpdmUgPSB0cnVlO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiY2FwdHVyZVwiKSlcbiAgICBvcHRpb25zLmNhcHR1cmUgPSB0cnVlO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwid2luZG93XCIpKVxuICAgIGxpc3RlbmVyVGFyZ2V0ID0gd2luZG93O1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiZG9jdW1lbnRcIikpXG4gICAgbGlzdGVuZXJUYXJnZXQgPSBkb2N1bWVudDtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImRlYm91bmNlXCIpKSB7XG4gICAgbGV0IG5leHRNb2RpZmllciA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihcImRlYm91bmNlXCIpICsgMV0gfHwgXCJpbnZhbGlkLXdhaXRcIjtcbiAgICBsZXQgd2FpdCA9IGlzTnVtZXJpYyhuZXh0TW9kaWZpZXIuc3BsaXQoXCJtc1wiKVswXSkgPyBOdW1iZXIobmV4dE1vZGlmaWVyLnNwbGl0KFwibXNcIilbMF0pIDogMjUwO1xuICAgIGhhbmRsZXI0ID0gZGVib3VuY2UoaGFuZGxlcjQsIHdhaXQpO1xuICB9XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJ0aHJvdHRsZVwiKSkge1xuICAgIGxldCBuZXh0TW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoXCJ0aHJvdHRsZVwiKSArIDFdIHx8IFwiaW52YWxpZC13YWl0XCI7XG4gICAgbGV0IHdhaXQgPSBpc051bWVyaWMobmV4dE1vZGlmaWVyLnNwbGl0KFwibXNcIilbMF0pID8gTnVtYmVyKG5leHRNb2RpZmllci5zcGxpdChcIm1zXCIpWzBdKSA6IDI1MDtcbiAgICBoYW5kbGVyNCA9IHRocm90dGxlKGhhbmRsZXI0LCB3YWl0KTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwicHJldmVudFwiKSlcbiAgICBoYW5kbGVyNCA9IHdyYXBIYW5kbGVyKGhhbmRsZXI0LCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInN0b3BcIikpXG4gICAgaGFuZGxlcjQgPSB3cmFwSGFuZGxlcihoYW5kbGVyNCwgKG5leHQsIGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBuZXh0KGUpO1xuICAgIH0pO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwic2VsZlwiKSlcbiAgICBoYW5kbGVyNCA9IHdyYXBIYW5kbGVyKGhhbmRsZXI0LCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS50YXJnZXQgPT09IGVsICYmIG5leHQoZSk7XG4gICAgfSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJhd2F5XCIpIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcIm91dHNpZGVcIikpIHtcbiAgICBsaXN0ZW5lclRhcmdldCA9IGRvY3VtZW50O1xuICAgIGhhbmRsZXI0ID0gd3JhcEhhbmRsZXIoaGFuZGxlcjQsIChuZXh0LCBlKSA9PiB7XG4gICAgICBpZiAoZWwuY29udGFpbnMoZS50YXJnZXQpKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAoZS50YXJnZXQuaXNDb25uZWN0ZWQgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAoZWwub2Zmc2V0V2lkdGggPCAxICYmIGVsLm9mZnNldEhlaWdodCA8IDEpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmIChlbC5feF9pc1Nob3duID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwib25jZVwiKSkge1xuICAgIGhhbmRsZXI0ID0gd3JhcEhhbmRsZXIoaGFuZGxlcjQsIChuZXh0LCBlKSA9PiB7XG4gICAgICBuZXh0KGUpO1xuICAgICAgbGlzdGVuZXJUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcjQsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZXI0ID0gd3JhcEhhbmRsZXIoaGFuZGxlcjQsIChuZXh0LCBlKSA9PiB7XG4gICAgaWYgKGlzS2V5RXZlbnQoZXZlbnQpKSB7XG4gICAgICBpZiAoaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgbmV4dChlKTtcbiAgfSk7XG4gIGxpc3RlbmVyVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXI0LCBvcHRpb25zKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBsaXN0ZW5lclRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyNCwgb3B0aW9ucyk7XG4gIH07XG59XG5mdW5jdGlvbiBkb3RTeW50YXgoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8tL2csIFwiLlwiKTtcbn1cbmZ1bmN0aW9uIGNhbWVsQ2FzZTIoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oXFx3KS9nLCAobWF0Y2gsIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBpc051bWVyaWMoc3ViamVjdCkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xufVxuZnVuY3Rpb24ga2ViYWJDYXNlMihzdWJqZWN0KSB7XG4gIGlmIChbXCIgXCIsIFwiX1wiXS5pbmNsdWRlcyhcbiAgICBzdWJqZWN0XG4gICkpXG4gICAgcmV0dXJuIHN1YmplY3Q7XG4gIHJldHVybiBzdWJqZWN0LnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIFwiJDEtJDJcIikucmVwbGFjZSgvW19cXHNdLywgXCItXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiBpc0tleUV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBbXCJrZXlkb3duXCIsIFwia2V5dXBcIl0uaW5jbHVkZXMoZXZlbnQpO1xufVxuZnVuY3Rpb24gaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpIHtcbiAgbGV0IGtleU1vZGlmaWVycyA9IG1vZGlmaWVycy5maWx0ZXIoKGkpID0+IHtcbiAgICByZXR1cm4gIVtcIndpbmRvd1wiLCBcImRvY3VtZW50XCIsIFwicHJldmVudFwiLCBcInN0b3BcIiwgXCJvbmNlXCIsIFwiY2FwdHVyZVwiXS5pbmNsdWRlcyhpKTtcbiAgfSk7XG4gIGlmIChrZXlNb2RpZmllcnMuaW5jbHVkZXMoXCJkZWJvdW5jZVwiKSkge1xuICAgIGxldCBkZWJvdW5jZUluZGV4ID0ga2V5TW9kaWZpZXJzLmluZGV4T2YoXCJkZWJvdW5jZVwiKTtcbiAgICBrZXlNb2RpZmllcnMuc3BsaWNlKGRlYm91bmNlSW5kZXgsIGlzTnVtZXJpYygoa2V5TW9kaWZpZXJzW2RlYm91bmNlSW5kZXggKyAxXSB8fCBcImludmFsaWQtd2FpdFwiKS5zcGxpdChcIm1zXCIpWzBdKSA/IDIgOiAxKTtcbiAgfVxuICBpZiAoa2V5TW9kaWZpZXJzLmluY2x1ZGVzKFwidGhyb3R0bGVcIikpIHtcbiAgICBsZXQgZGVib3VuY2VJbmRleCA9IGtleU1vZGlmaWVycy5pbmRleE9mKFwidGhyb3R0bGVcIik7XG4gICAga2V5TW9kaWZpZXJzLnNwbGljZShkZWJvdW5jZUluZGV4LCBpc051bWVyaWMoKGtleU1vZGlmaWVyc1tkZWJvdW5jZUluZGV4ICsgMV0gfHwgXCJpbnZhbGlkLXdhaXRcIikuc3BsaXQoXCJtc1wiKVswXSkgPyAyIDogMSk7XG4gIH1cbiAgaWYgKGtleU1vZGlmaWVycy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMSAmJiBrZXlUb01vZGlmaWVycyhlLmtleSkuaW5jbHVkZXMoa2V5TW9kaWZpZXJzWzBdKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHN5c3RlbUtleU1vZGlmaWVycyA9IFtcImN0cmxcIiwgXCJzaGlmdFwiLCBcImFsdFwiLCBcIm1ldGFcIiwgXCJjbWRcIiwgXCJzdXBlclwiXTtcbiAgY29uc3Qgc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMgPSBzeXN0ZW1LZXlNb2RpZmllcnMuZmlsdGVyKChtb2RpZmllcikgPT4ga2V5TW9kaWZpZXJzLmluY2x1ZGVzKG1vZGlmaWVyKSk7XG4gIGtleU1vZGlmaWVycyA9IGtleU1vZGlmaWVycy5maWx0ZXIoKGkpID0+ICFzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5pbmNsdWRlcyhpKSk7XG4gIGlmIChzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzID0gc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMuZmlsdGVyKChtb2RpZmllcikgPT4ge1xuICAgICAgaWYgKG1vZGlmaWVyID09PSBcImNtZFwiIHx8IG1vZGlmaWVyID09PSBcInN1cGVyXCIpXG4gICAgICAgIG1vZGlmaWVyID0gXCJtZXRhXCI7XG4gICAgICByZXR1cm4gZVtgJHttb2RpZmllcn1LZXlgXTtcbiAgICB9KTtcbiAgICBpZiAoYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICBpZiAoa2V5VG9Nb2RpZmllcnMoZS5rZXkpLmluY2x1ZGVzKGtleU1vZGlmaWVyc1swXSkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBrZXlUb01vZGlmaWVycyhrZXkpIHtcbiAgaWYgKCFrZXkpXG4gICAgcmV0dXJuIFtdO1xuICBrZXkgPSBrZWJhYkNhc2UyKGtleSk7XG4gIGxldCBtb2RpZmllclRvS2V5TWFwID0ge1xuICAgIFwiY3RybFwiOiBcImNvbnRyb2xcIixcbiAgICBcInNsYXNoXCI6IFwiL1wiLFxuICAgIFwic3BhY2VcIjogXCIgXCIsXG4gICAgXCJzcGFjZWJhclwiOiBcIiBcIixcbiAgICBcImNtZFwiOiBcIm1ldGFcIixcbiAgICBcImVzY1wiOiBcImVzY2FwZVwiLFxuICAgIFwidXBcIjogXCJhcnJvdy11cFwiLFxuICAgIFwiZG93blwiOiBcImFycm93LWRvd25cIixcbiAgICBcImxlZnRcIjogXCJhcnJvdy1sZWZ0XCIsXG4gICAgXCJyaWdodFwiOiBcImFycm93LXJpZ2h0XCIsXG4gICAgXCJwZXJpb2RcIjogXCIuXCIsXG4gICAgXCJlcXVhbFwiOiBcIj1cIixcbiAgICBcIm1pbnVzXCI6IFwiLVwiLFxuICAgIFwidW5kZXJzY29yZVwiOiBcIl9cIlxuICB9O1xuICBtb2RpZmllclRvS2V5TWFwW2tleV0gPSBrZXk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhtb2RpZmllclRvS2V5TWFwKS5tYXAoKG1vZGlmaWVyKSA9PiB7XG4gICAgaWYgKG1vZGlmaWVyVG9LZXlNYXBbbW9kaWZpZXJdID09PSBrZXkpXG4gICAgICByZXR1cm4gbW9kaWZpZXI7XG4gIH0pLmZpbHRlcigobW9kaWZpZXIpID0+IG1vZGlmaWVyKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1tb2RlbC5qc1xuZGlyZWN0aXZlKFwibW9kZWxcIiwgKGVsLCB7IG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGVmZmVjdDogZWZmZWN0MywgY2xlYW51cDogY2xlYW51cDIgfSkgPT4ge1xuICBsZXQgc2NvcGVUYXJnZXQgPSBlbDtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInBhcmVudFwiKSkge1xuICAgIHNjb3BlVGFyZ2V0ID0gZWwucGFyZW50Tm9kZTtcbiAgfVxuICBsZXQgZXZhbHVhdGVHZXQgPSBldmFsdWF0ZUxhdGVyKHNjb3BlVGFyZ2V0LCBleHByZXNzaW9uKTtcbiAgbGV0IGV2YWx1YXRlU2V0O1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICBldmFsdWF0ZVNldCA9IGV2YWx1YXRlTGF0ZXIoc2NvcGVUYXJnZXQsIGAke2V4cHJlc3Npb259ID0gX19wbGFjZWhvbGRlcmApO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIGV4cHJlc3Npb24oKSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGV2YWx1YXRlU2V0ID0gZXZhbHVhdGVMYXRlcihzY29wZVRhcmdldCwgYCR7ZXhwcmVzc2lvbigpfSA9IF9fcGxhY2Vob2xkZXJgKTtcbiAgfSBlbHNlIHtcbiAgICBldmFsdWF0ZVNldCA9ICgpID0+IHtcbiAgICB9O1xuICB9XG4gIGxldCBnZXRWYWx1ZSA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGV2YWx1YXRlR2V0KCh2YWx1ZSkgPT4gcmVzdWx0ID0gdmFsdWUpO1xuICAgIHJldHVybiBpc0dldHRlclNldHRlcihyZXN1bHQpID8gcmVzdWx0LmdldCgpIDogcmVzdWx0O1xuICB9O1xuICBsZXQgc2V0VmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGV2YWx1YXRlR2V0KCh2YWx1ZTIpID0+IHJlc3VsdCA9IHZhbHVlMik7XG4gICAgaWYgKGlzR2V0dGVyU2V0dGVyKHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdC5zZXQodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmFsdWF0ZVNldCgoKSA9PiB7XG4gICAgICB9LCB7XG4gICAgICAgIHNjb3BlOiB7IFwiX19wbGFjZWhvbGRlclwiOiB2YWx1ZSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJzdHJpbmdcIiAmJiBlbC50eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoXCJuYW1lXCIpKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGV4cHJlc3Npb24pO1xuICAgIH0pO1xuICB9XG4gIHZhciBldmVudCA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiB8fCBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdLmluY2x1ZGVzKGVsLnR5cGUpIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcImxhenlcIikgPyBcImNoYW5nZVwiIDogXCJpbnB1dFwiO1xuICBsZXQgcmVtb3ZlTGlzdGVuZXIgPSBpc0Nsb25pbmcgPyAoKSA9PiB7XG4gIH0gOiBvbihlbCwgZXZlbnQsIG1vZGlmaWVycywgKGUpID0+IHtcbiAgICBzZXRWYWx1ZShnZXRJbnB1dFZhbHVlKGVsLCBtb2RpZmllcnMsIGUsIGdldFZhbHVlKCkpKTtcbiAgfSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJmaWxsXCIpKSB7XG4gICAgaWYgKFt2b2lkIDAsIG51bGwsIFwiXCJdLmluY2x1ZGVzKGdldFZhbHVlKCkpIHx8IGVsLnR5cGUgPT09IFwiY2hlY2tib3hcIiAmJiBBcnJheS5pc0FycmF5KGdldFZhbHVlKCkpKSB7XG4gICAgICBzZXRWYWx1ZShcbiAgICAgICAgZ2V0SW5wdXRWYWx1ZShlbCwgbW9kaWZpZXJzLCB7IHRhcmdldDogZWwgfSwgZ2V0VmFsdWUoKSlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlmICghZWwuX3hfcmVtb3ZlTW9kZWxMaXN0ZW5lcnMpXG4gICAgZWwuX3hfcmVtb3ZlTW9kZWxMaXN0ZW5lcnMgPSB7fTtcbiAgZWwuX3hfcmVtb3ZlTW9kZWxMaXN0ZW5lcnNbXCJkZWZhdWx0XCJdID0gcmVtb3ZlTGlzdGVuZXI7XG4gIGNsZWFudXAyKCgpID0+IGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzW1wiZGVmYXVsdFwiXSgpKTtcbiAgaWYgKGVsLmZvcm0pIHtcbiAgICBsZXQgcmVtb3ZlUmVzZXRMaXN0ZW5lciA9IG9uKGVsLmZvcm0sIFwicmVzZXRcIiwgW10sIChlKSA9PiB7XG4gICAgICBuZXh0VGljaygoKSA9PiBlbC5feF9tb2RlbCAmJiBlbC5feF9tb2RlbC5zZXQoZWwudmFsdWUpKTtcbiAgICB9KTtcbiAgICBjbGVhbnVwMigoKSA9PiByZW1vdmVSZXNldExpc3RlbmVyKCkpO1xuICB9XG4gIGVsLl94X21vZGVsID0ge1xuICAgIGdldCgpIHtcbiAgICAgIHJldHVybiBnZXRWYWx1ZSgpO1xuICAgIH0sXG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICBzZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xuICBlbC5feF9mb3JjZU1vZGVsVXBkYXRlID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB2b2lkIDAgJiYgdHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIgJiYgZXhwcmVzc2lvbi5tYXRjaCgvXFwuLykpXG4gICAgICB2YWx1ZSA9IFwiXCI7XG4gICAgd2luZG93LmZyb21Nb2RlbCA9IHRydWU7XG4gICAgbXV0YXRlRG9tKCgpID0+IGJpbmQoZWwsIFwidmFsdWVcIiwgdmFsdWUpKTtcbiAgICBkZWxldGUgd2luZG93LmZyb21Nb2RlbDtcbiAgfTtcbiAgZWZmZWN0MygoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZ2V0VmFsdWUoKTtcbiAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwidW5pbnRydXNpdmVcIikgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGVsKSlcbiAgICAgIHJldHVybjtcbiAgICBlbC5feF9mb3JjZU1vZGVsVXBkYXRlKHZhbHVlKTtcbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGdldElucHV0VmFsdWUoZWwsIG1vZGlmaWVycywgZXZlbnQsIGN1cnJlbnRWYWx1ZSkge1xuICByZXR1cm4gbXV0YXRlRG9tKCgpID0+IHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBDdXN0b21FdmVudCAmJiBldmVudC5kZXRhaWwgIT09IHZvaWQgMClcbiAgICAgIHJldHVybiBldmVudC5kZXRhaWwgIT09IG51bGwgJiYgZXZlbnQuZGV0YWlsICE9PSB2b2lkIDAgPyBldmVudC5kZXRhaWwgOiBldmVudC50YXJnZXQudmFsdWU7XG4gICAgZWxzZSBpZiAoZWwudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IG51bGw7XG4gICAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJudW1iZXJcIikpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHNhZmVQYXJzZU51bWJlcihldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImJvb2xlYW5cIikpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IHNhZmVQYXJzZUJvb2xlYW4oZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyBjdXJyZW50VmFsdWUuY29uY2F0KFtuZXdWYWx1ZV0pIDogY3VycmVudFZhbHVlLmZpbHRlcigoZWwyKSA9PiAhY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUyKGVsMiwgbmV3VmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiAmJiBlbC5tdWx0aXBsZSkge1xuICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcIm51bWJlclwiKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgIGxldCByYXdWYWx1ZSA9IG9wdGlvbi52YWx1ZSB8fCBvcHRpb24udGV4dDtcbiAgICAgICAgICByZXR1cm4gc2FmZVBhcnNlTnVtYmVyKHJhd1ZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImJvb2xlYW5cIikpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICBsZXQgcmF3VmFsdWUgPSBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUJvb2xlYW4ocmF3VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgaWYgKGVsLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwibnVtYmVyXCIpKSB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VOdW1iZXIobmV3VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJib29sZWFuXCIpKSB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VCb29sZWFuKG5ld1ZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwidHJpbVwiKSkge1xuICAgICAgICByZXR1cm4gbmV3VmFsdWUudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpIHtcbiAgbGV0IG51bWJlciA9IHJhd1ZhbHVlID8gcGFyc2VGbG9hdChyYXdWYWx1ZSkgOiBudWxsO1xuICByZXR1cm4gaXNOdW1lcmljMihudW1iZXIpID8gbnVtYmVyIDogcmF3VmFsdWU7XG59XG5mdW5jdGlvbiBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZTIodmFsdWVBLCB2YWx1ZUIpIHtcbiAgcmV0dXJuIHZhbHVlQSA9PSB2YWx1ZUI7XG59XG5mdW5jdGlvbiBpc051bWVyaWMyKHN1YmplY3QpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KHN1YmplY3QpICYmICFpc05hTihzdWJqZWN0KTtcbn1cbmZ1bmN0aW9uIGlzR2V0dGVyU2V0dGVyKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlLmdldCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiB2YWx1ZS5zZXQgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1jbG9hay5qc1xuZGlyZWN0aXZlKFwiY2xvYWtcIiwgKGVsKSA9PiBxdWV1ZU1pY3JvdGFzaygoKSA9PiBtdXRhdGVEb20oKCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKHByZWZpeChcImNsb2FrXCIpKSkpKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pbml0LmpzXG5hZGRJbml0U2VsZWN0b3IoKCkgPT4gYFske3ByZWZpeChcImluaXRcIil9XWApO1xuZGlyZWN0aXZlKFwiaW5pdFwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBldmFsdWF0ZTogZXZhbHVhdGUyIH0pID0+IHtcbiAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuICEhZXhwcmVzc2lvbi50cmltKCkgJiYgZXZhbHVhdGUyKGV4cHJlc3Npb24sIHt9LCBmYWxzZSk7XG4gIH1cbiAgcmV0dXJuIGV2YWx1YXRlMihleHByZXNzaW9uLCB7fSwgZmFsc2UpO1xufSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXRleHQuanNcbmRpcmVjdGl2ZShcInRleHRcIiwgKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMsIGV2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIyIH0pID0+IHtcbiAgbGV0IGV2YWx1YXRlMiA9IGV2YWx1YXRlTGF0ZXIyKGV4cHJlc3Npb24pO1xuICBlZmZlY3QzKCgpID0+IHtcbiAgICBldmFsdWF0ZTIoKHZhbHVlKSA9PiB7XG4gICAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtaHRtbC5qc1xuZGlyZWN0aXZlKFwiaHRtbFwiLCAoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGVmZmVjdDogZWZmZWN0MywgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlcjIgfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcjIoZXhwcmVzc2lvbik7XG4gIGVmZmVjdDMoKCkgPT4ge1xuICAgIGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICBlbC5feF9pZ25vcmVTZWxmID0gdHJ1ZTtcbiAgICAgICAgaW5pdFRyZWUoZWwpO1xuICAgICAgICBkZWxldGUgZWwuX3hfaWdub3JlU2VsZjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWJpbmQuanNcbm1hcEF0dHJpYnV0ZXMoc3RhcnRpbmdXaXRoKFwiOlwiLCBpbnRvKHByZWZpeChcImJpbmQ6XCIpKSkpO1xudmFyIGhhbmRsZXIyID0gKGVsLCB7IHZhbHVlLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIG9yaWdpbmFsIH0sIHsgZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwOiBjbGVhbnVwMiB9KSA9PiB7XG4gIGlmICghdmFsdWUpIHtcbiAgICBsZXQgYmluZGluZ1Byb3ZpZGVycyA9IHt9O1xuICAgIGluamVjdEJpbmRpbmdQcm92aWRlcnMoYmluZGluZ1Byb3ZpZGVycyk7XG4gICAgbGV0IGdldEJpbmRpbmdzID0gZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbik7XG4gICAgZ2V0QmluZGluZ3MoKGJpbmRpbmdzKSA9PiB7XG4gICAgICBhcHBseUJpbmRpbmdzT2JqZWN0KGVsLCBiaW5kaW5ncywgb3JpZ2luYWwpO1xuICAgIH0sIHsgc2NvcGU6IGJpbmRpbmdQcm92aWRlcnMgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gXCJrZXlcIilcbiAgICByZXR1cm4gc3RvcmVLZXlGb3JYRm9yKGVsLCBleHByZXNzaW9uKTtcbiAgaWYgKGVsLl94X2lubGluZUJpbmRpbmdzICYmIGVsLl94X2lubGluZUJpbmRpbmdzW3ZhbHVlXSAmJiBlbC5feF9pbmxpbmVCaW5kaW5nc1t2YWx1ZV0uZXh0cmFjdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbik7XG4gIGVmZmVjdDMoKCkgPT4gZXZhbHVhdGUyKChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0ID09PSB2b2lkIDAgJiYgdHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIgJiYgZXhwcmVzc2lvbi5tYXRjaCgvXFwuLykpIHtcbiAgICAgIHJlc3VsdCA9IFwiXCI7XG4gICAgfVxuICAgIG11dGF0ZURvbSgoKSA9PiBiaW5kKGVsLCB2YWx1ZSwgcmVzdWx0LCBtb2RpZmllcnMpKTtcbiAgfSkpO1xuICBjbGVhbnVwMigoKSA9PiB7XG4gICAgZWwuX3hfdW5kb0FkZGVkQ2xhc3NlcyAmJiBlbC5feF91bmRvQWRkZWRDbGFzc2VzKCk7XG4gICAgZWwuX3hfdW5kb0FkZGVkU3R5bGVzICYmIGVsLl94X3VuZG9BZGRlZFN0eWxlcygpO1xuICB9KTtcbn07XG5oYW5kbGVyMi5pbmxpbmUgPSAoZWwsIHsgdmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbiB9KSA9PiB7XG4gIGlmICghdmFsdWUpXG4gICAgcmV0dXJuO1xuICBpZiAoIWVsLl94X2lubGluZUJpbmRpbmdzKVxuICAgIGVsLl94X2lubGluZUJpbmRpbmdzID0ge307XG4gIGVsLl94X2lubGluZUJpbmRpbmdzW3ZhbHVlXSA9IHsgZXhwcmVzc2lvbiwgZXh0cmFjdDogZmFsc2UgfTtcbn07XG5kaXJlY3RpdmUoXCJiaW5kXCIsIGhhbmRsZXIyKTtcbmZ1bmN0aW9uIHN0b3JlS2V5Rm9yWEZvcihlbCwgZXhwcmVzc2lvbikge1xuICBlbC5feF9rZXlFeHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1kYXRhLmpzXG5hZGRSb290U2VsZWN0b3IoKCkgPT4gYFske3ByZWZpeChcImRhdGFcIil9XWApO1xuZGlyZWN0aXZlKFwiZGF0YVwiLCAoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgaWYgKHNob3VsZFNraXBSZWdpc3RlcmluZ0RhdGFEdXJpbmdDbG9uZShlbCkpXG4gICAgcmV0dXJuO1xuICBleHByZXNzaW9uID0gZXhwcmVzc2lvbiA9PT0gXCJcIiA/IFwie31cIiA6IGV4cHJlc3Npb247XG4gIGxldCBtYWdpY0NvbnRleHQgPSB7fTtcbiAgbGV0IGNsZWFudXAxID0gaW5qZWN0TWFnaWNzKG1hZ2ljQ29udGV4dCwgZWwpLmNsZWFudXA7XG4gIGxldCBkYXRhUHJvdmlkZXJDb250ZXh0ID0ge307XG4gIGluamVjdERhdGFQcm92aWRlcnMoZGF0YVByb3ZpZGVyQ29udGV4dCwgbWFnaWNDb250ZXh0KTtcbiAgbGV0IGRhdGEyID0gZXZhbHVhdGUoZWwsIGV4cHJlc3Npb24sIHsgc2NvcGU6IGRhdGFQcm92aWRlckNvbnRleHQgfSk7XG4gIGlmIChkYXRhMiA9PT0gdm9pZCAwIHx8IGRhdGEyID09PSB0cnVlKVxuICAgIGRhdGEyID0ge307XG4gIGxldCBjbGVhbnVwMjIgPSBpbmplY3RNYWdpY3MoZGF0YTIsIGVsKS5jbGVhbnVwO1xuICBsZXQgcmVhY3RpdmVEYXRhID0gcmVhY3RpdmUoZGF0YTIpO1xuICBpbml0SW50ZXJjZXB0b3JzMihyZWFjdGl2ZURhdGEpO1xuICBsZXQgdW5kbyA9IGFkZFNjb3BlVG9Ob2RlKGVsLCByZWFjdGl2ZURhdGEpO1xuICByZWFjdGl2ZURhdGFbXCJpbml0XCJdICYmIGV2YWx1YXRlKGVsLCByZWFjdGl2ZURhdGFbXCJpbml0XCJdKTtcbiAgY2xlYW51cDIoKCkgPT4ge1xuICAgIHJlYWN0aXZlRGF0YVtcImRlc3Ryb3lcIl0gJiYgZXZhbHVhdGUoZWwsIHJlYWN0aXZlRGF0YVtcImRlc3Ryb3lcIl0pO1xuICAgIHVuZG8oKTtcbiAgICBjbGVhbnVwMSgpO1xuICAgIGNsZWFudXAyMigpO1xuICB9KTtcbn0pO1xuaW50ZXJjZXB0Q2xvbmUoKGZyb20sIHRvKSA9PiB7XG4gIGlmIChmcm9tLl94X2RhdGFTdGFjaykge1xuICAgIHRvLl94X2RhdGFTdGFjayA9IGZyb20uX3hfZGF0YVN0YWNrO1xuICAgIHRvLnNldEF0dHJpYnV0ZShcImRhdGEtaGFzLWFscGluZS1zdGF0ZVwiLCB0cnVlKTtcbiAgfVxufSk7XG5mdW5jdGlvbiBzaG91bGRTa2lwUmVnaXN0ZXJpbmdEYXRhRHVyaW5nQ2xvbmUoZWwpIHtcbiAgaWYgKCFpc0Nsb25pbmcpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoaXNDbG9uaW5nTGVnYWN5KVxuICAgIHJldHVybiB0cnVlO1xuICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKFwiZGF0YS1oYXMtYWxwaW5lLXN0YXRlXCIpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXNob3cuanNcbmRpcmVjdGl2ZShcInNob3dcIiwgKGVsLCB7IG1vZGlmaWVycywgZXhwcmVzc2lvbiB9LCB7IGVmZmVjdDogZWZmZWN0MyB9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgaWYgKCFlbC5feF9kb0hpZGUpXG4gICAgZWwuX3hfZG9IaWRlID0gKCkgPT4ge1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoXCJkaXNwbGF5XCIsIFwibm9uZVwiLCBtb2RpZmllcnMuaW5jbHVkZXMoXCJpbXBvcnRhbnRcIikgPyBcImltcG9ydGFudFwiIDogdm9pZCAwKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIGlmICghZWwuX3hfZG9TaG93KVxuICAgIGVsLl94X2RvU2hvdyA9ICgpID0+IHtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5sZW5ndGggPT09IDEgJiYgZWwuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIGxldCBoaWRlID0gKCkgPT4ge1xuICAgIGVsLl94X2RvSGlkZSgpO1xuICAgIGVsLl94X2lzU2hvd24gPSBmYWxzZTtcbiAgfTtcbiAgbGV0IHNob3cgPSAoKSA9PiB7XG4gICAgZWwuX3hfZG9TaG93KCk7XG4gICAgZWwuX3hfaXNTaG93biA9IHRydWU7XG4gIH07XG4gIGxldCBjbGlja0F3YXlDb21wYXRpYmxlU2hvdyA9ICgpID0+IHNldFRpbWVvdXQoc2hvdyk7XG4gIGxldCB0b2dnbGUgPSBvbmNlKFxuICAgICh2YWx1ZSkgPT4gdmFsdWUgPyBzaG93KCkgOiBoaWRlKCksXG4gICAgKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVsLl94X3RvZ2dsZUFuZENhc2NhZGVXaXRoVHJhbnNpdGlvbnMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlbC5feF90b2dnbGVBbmRDYXNjYWRlV2l0aFRyYW5zaXRpb25zKGVsLCB2YWx1ZSwgc2hvdywgaGlkZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA/IGNsaWNrQXdheUNvbXBhdGlibGVTaG93KCkgOiBoaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICApO1xuICBsZXQgb2xkVmFsdWU7XG4gIGxldCBmaXJzdFRpbWUgPSB0cnVlO1xuICBlZmZlY3QzKCgpID0+IGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICBpZiAoIWZpcnN0VGltZSAmJiB2YWx1ZSA9PT0gb2xkVmFsdWUpXG4gICAgICByZXR1cm47XG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImltbWVkaWF0ZVwiKSlcbiAgICAgIHZhbHVlID8gY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKSA6IGhpZGUoKTtcbiAgICB0b2dnbGUodmFsdWUpO1xuICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gIH0pKTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWZvci5qc1xuZGlyZWN0aXZlKFwiZm9yXCIsIChlbCwgeyBleHByZXNzaW9uIH0sIHsgZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwOiBjbGVhbnVwMiB9KSA9PiB7XG4gIGxldCBpdGVyYXRvck5hbWVzID0gcGFyc2VGb3JFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICBsZXQgZXZhbHVhdGVJdGVtcyA9IGV2YWx1YXRlTGF0ZXIoZWwsIGl0ZXJhdG9yTmFtZXMuaXRlbXMpO1xuICBsZXQgZXZhbHVhdGVLZXkgPSBldmFsdWF0ZUxhdGVyKFxuICAgIGVsLFxuICAgIC8vIHRoZSB4LWJpbmQ6a2V5IGV4cHJlc3Npb24gaXMgc3RvcmVkIGZvciBvdXIgdXNlIGluc3RlYWQgb2YgZXZhbHVhdGVkLlxuICAgIGVsLl94X2tleUV4cHJlc3Npb24gfHwgXCJpbmRleFwiXG4gICk7XG4gIGVsLl94X3ByZXZLZXlzID0gW107XG4gIGVsLl94X2xvb2t1cCA9IHt9O1xuICBlZmZlY3QzKCgpID0+IGxvb3AoZWwsIGl0ZXJhdG9yTmFtZXMsIGV2YWx1YXRlSXRlbXMsIGV2YWx1YXRlS2V5KSk7XG4gIGNsZWFudXAyKCgpID0+IHtcbiAgICBPYmplY3QudmFsdWVzKGVsLl94X2xvb2t1cCkuZm9yRWFjaCgoZWwyKSA9PiBlbDIucmVtb3ZlKCkpO1xuICAgIGRlbGV0ZSBlbC5feF9wcmV2S2V5cztcbiAgICBkZWxldGUgZWwuX3hfbG9va3VwO1xuICB9KTtcbn0pO1xuZnVuY3Rpb24gbG9vcChlbCwgaXRlcmF0b3JOYW1lcywgZXZhbHVhdGVJdGVtcywgZXZhbHVhdGVLZXkpIHtcbiAgbGV0IGlzT2JqZWN0MiA9IChpKSA9PiB0eXBlb2YgaSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShpKTtcbiAgbGV0IHRlbXBsYXRlRWwgPSBlbDtcbiAgZXZhbHVhdGVJdGVtcygoaXRlbXMpID0+IHtcbiAgICBpZiAoaXNOdW1lcmljMyhpdGVtcykgJiYgaXRlbXMgPj0gMCkge1xuICAgICAgaXRlbXMgPSBBcnJheS5mcm9tKEFycmF5KGl0ZW1zKS5rZXlzKCksIChpKSA9PiBpICsgMSk7XG4gICAgfVxuICAgIGlmIChpdGVtcyA9PT0gdm9pZCAwKVxuICAgICAgaXRlbXMgPSBbXTtcbiAgICBsZXQgbG9va3VwID0gZWwuX3hfbG9va3VwO1xuICAgIGxldCBwcmV2S2V5cyA9IGVsLl94X3ByZXZLZXlzO1xuICAgIGxldCBzY29wZXMgPSBbXTtcbiAgICBsZXQga2V5cyA9IFtdO1xuICAgIGlmIChpc09iamVjdDIoaXRlbXMpKSB7XG4gICAgICBpdGVtcyA9IE9iamVjdC5lbnRyaWVzKGl0ZW1zKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBsZXQgc2NvcGUyID0gZ2V0SXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMoaXRlcmF0b3JOYW1lcywgdmFsdWUsIGtleSwgaXRlbXMpO1xuICAgICAgICBldmFsdWF0ZUtleSgodmFsdWUyKSA9PiB7XG4gICAgICAgICAgaWYgKGtleXMuaW5jbHVkZXModmFsdWUyKSlcbiAgICAgICAgICAgIHdhcm4oXCJEdXBsaWNhdGUga2V5IG9uIHgtZm9yXCIsIGVsKTtcbiAgICAgICAgICBrZXlzLnB1c2godmFsdWUyKTtcbiAgICAgICAgfSwgeyBzY29wZTogeyBpbmRleDoga2V5LCAuLi5zY29wZTIgfSB9KTtcbiAgICAgICAgc2NvcGVzLnB1c2goc2NvcGUyKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzY29wZTIgPSBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtc1tpXSwgaSwgaXRlbXMpO1xuICAgICAgICBldmFsdWF0ZUtleSgodmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAoa2V5cy5pbmNsdWRlcyh2YWx1ZSkpXG4gICAgICAgICAgICB3YXJuKFwiRHVwbGljYXRlIGtleSBvbiB4LWZvclwiLCBlbCk7XG4gICAgICAgICAga2V5cy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSwgeyBzY29wZTogeyBpbmRleDogaSwgLi4uc2NvcGUyIH0gfSk7XG4gICAgICAgIHNjb3Blcy5wdXNoKHNjb3BlMik7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBhZGRzID0gW107XG4gICAgbGV0IG1vdmVzID0gW107XG4gICAgbGV0IHJlbW92ZXMgPSBbXTtcbiAgICBsZXQgc2FtZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQga2V5ID0gcHJldktleXNbaV07XG4gICAgICBpZiAoa2V5cy5pbmRleE9mKGtleSkgPT09IC0xKVxuICAgICAgICByZW1vdmVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcHJldktleXMgPSBwcmV2S2V5cy5maWx0ZXIoKGtleSkgPT4gIXJlbW92ZXMuaW5jbHVkZXMoa2V5KSk7XG4gICAgbGV0IGxhc3RLZXkgPSBcInRlbXBsYXRlXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgIGxldCBwcmV2SW5kZXggPSBwcmV2S2V5cy5pbmRleE9mKGtleSk7XG4gICAgICBpZiAocHJldkluZGV4ID09PSAtMSkge1xuICAgICAgICBwcmV2S2V5cy5zcGxpY2UoaSwgMCwga2V5KTtcbiAgICAgICAgYWRkcy5wdXNoKFtsYXN0S2V5LCBpXSk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZJbmRleCAhPT0gaSkge1xuICAgICAgICBsZXQga2V5SW5TcG90ID0gcHJldktleXMuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICBsZXQga2V5Rm9yU3BvdCA9IHByZXZLZXlzLnNwbGljZShwcmV2SW5kZXggLSAxLCAxKVswXTtcbiAgICAgICAgcHJldktleXMuc3BsaWNlKGksIDAsIGtleUZvclNwb3QpO1xuICAgICAgICBwcmV2S2V5cy5zcGxpY2UocHJldkluZGV4LCAwLCBrZXlJblNwb3QpO1xuICAgICAgICBtb3Zlcy5wdXNoKFtrZXlJblNwb3QsIGtleUZvclNwb3RdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbWVzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICAgIGxhc3RLZXkgPSBrZXk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGtleSA9IHJlbW92ZXNbaV07XG4gICAgICBpZiAoISFsb29rdXBba2V5XS5feF9lZmZlY3RzKSB7XG4gICAgICAgIGxvb2t1cFtrZXldLl94X2VmZmVjdHMuZm9yRWFjaChkZXF1ZXVlSm9iKTtcbiAgICAgIH1cbiAgICAgIGxvb2t1cFtrZXldLnJlbW92ZSgpO1xuICAgICAgbG9va3VwW2tleV0gPSBudWxsO1xuICAgICAgZGVsZXRlIGxvb2t1cFtrZXldO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2tleUluU3BvdCwga2V5Rm9yU3BvdF0gPSBtb3Zlc1tpXTtcbiAgICAgIGxldCBlbEluU3BvdCA9IGxvb2t1cFtrZXlJblNwb3RdO1xuICAgICAgbGV0IGVsRm9yU3BvdCA9IGxvb2t1cFtrZXlGb3JTcG90XTtcbiAgICAgIGxldCBtYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgaWYgKCFlbEZvclNwb3QpXG4gICAgICAgICAgd2FybihgeC1mb3IgXCI6a2V5XCIgaXMgdW5kZWZpbmVkIG9yIGludmFsaWRgLCB0ZW1wbGF0ZUVsLCBrZXlGb3JTcG90LCBsb29rdXApO1xuICAgICAgICBlbEZvclNwb3QuYWZ0ZXIobWFya2VyKTtcbiAgICAgICAgZWxJblNwb3QuYWZ0ZXIoZWxGb3JTcG90KTtcbiAgICAgICAgZWxGb3JTcG90Ll94X2N1cnJlbnRJZkVsICYmIGVsRm9yU3BvdC5hZnRlcihlbEZvclNwb3QuX3hfY3VycmVudElmRWwpO1xuICAgICAgICBtYXJrZXIuYmVmb3JlKGVsSW5TcG90KTtcbiAgICAgICAgZWxJblNwb3QuX3hfY3VycmVudElmRWwgJiYgZWxJblNwb3QuYWZ0ZXIoZWxJblNwb3QuX3hfY3VycmVudElmRWwpO1xuICAgICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIGVsRm9yU3BvdC5feF9yZWZyZXNoWEZvclNjb3BlKHNjb3Blc1trZXlzLmluZGV4T2Yoa2V5Rm9yU3BvdCldKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2xhc3RLZXkyLCBpbmRleF0gPSBhZGRzW2ldO1xuICAgICAgbGV0IGxhc3RFbCA9IGxhc3RLZXkyID09PSBcInRlbXBsYXRlXCIgPyB0ZW1wbGF0ZUVsIDogbG9va3VwW2xhc3RLZXkyXTtcbiAgICAgIGlmIChsYXN0RWwuX3hfY3VycmVudElmRWwpXG4gICAgICAgIGxhc3RFbCA9IGxhc3RFbC5feF9jdXJyZW50SWZFbDtcbiAgICAgIGxldCBzY29wZTIgPSBzY29wZXNbaW5kZXhdO1xuICAgICAgbGV0IGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgbGV0IGNsb25lMiA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCByZWFjdGl2ZVNjb3BlID0gcmVhY3RpdmUoc2NvcGUyKTtcbiAgICAgIGFkZFNjb3BlVG9Ob2RlKGNsb25lMiwgcmVhY3RpdmVTY29wZSwgdGVtcGxhdGVFbCk7XG4gICAgICBjbG9uZTIuX3hfcmVmcmVzaFhGb3JTY29wZSA9IChuZXdTY29wZSkgPT4ge1xuICAgICAgICBPYmplY3QuZW50cmllcyhuZXdTY29wZSkuZm9yRWFjaCgoW2tleTIsIHZhbHVlXSkgPT4ge1xuICAgICAgICAgIHJlYWN0aXZlU2NvcGVba2V5Ml0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgbGFzdEVsLmFmdGVyKGNsb25lMik7XG4gICAgICAgIHNraXBEdXJpbmdDbG9uZSgoKSA9PiBpbml0VHJlZShjbG9uZTIpKSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB3YXJuKFwieC1mb3Iga2V5IGNhbm5vdCBiZSBhbiBvYmplY3QsIGl0IG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gaW50ZWdlclwiLCB0ZW1wbGF0ZUVsKTtcbiAgICAgIH1cbiAgICAgIGxvb2t1cFtrZXldID0gY2xvbmUyO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb29rdXBbc2FtZXNbaV1dLl94X3JlZnJlc2hYRm9yU2NvcGUoc2NvcGVzW2tleXMuaW5kZXhPZihzYW1lc1tpXSldKTtcbiAgICB9XG4gICAgdGVtcGxhdGVFbC5feF9wcmV2S2V5cyA9IGtleXM7XG4gIH0pO1xufVxuZnVuY3Rpb24gcGFyc2VGb3JFeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcbiAgbGV0IGZvckl0ZXJhdG9yUkUgPSAvLChbXixcXH1cXF1dKikoPzosKFteLFxcfVxcXV0qKSk/JC87XG4gIGxldCBzdHJpcFBhcmVuc1JFID0gL15cXHMqXFwofFxcKVxccyokL2c7XG4gIGxldCBmb3JBbGlhc1JFID0gLyhbXFxzXFxTXSo/KVxccysoPzppbnxvZilcXHMrKFtcXHNcXFNdKikvO1xuICBsZXQgaW5NYXRjaCA9IGV4cHJlc3Npb24ubWF0Y2goZm9yQWxpYXNSRSk7XG4gIGlmICghaW5NYXRjaClcbiAgICByZXR1cm47XG4gIGxldCByZXMgPSB7fTtcbiAgcmVzLml0ZW1zID0gaW5NYXRjaFsyXS50cmltKCk7XG4gIGxldCBpdGVtID0gaW5NYXRjaFsxXS5yZXBsYWNlKHN0cmlwUGFyZW5zUkUsIFwiXCIpLnRyaW0oKTtcbiAgbGV0IGl0ZXJhdG9yTWF0Y2ggPSBpdGVtLm1hdGNoKGZvckl0ZXJhdG9yUkUpO1xuICBpZiAoaXRlcmF0b3JNYXRjaCkge1xuICAgIHJlcy5pdGVtID0gaXRlbS5yZXBsYWNlKGZvckl0ZXJhdG9yUkUsIFwiXCIpLnRyaW0oKTtcbiAgICByZXMuaW5kZXggPSBpdGVyYXRvck1hdGNoWzFdLnRyaW0oKTtcbiAgICBpZiAoaXRlcmF0b3JNYXRjaFsyXSkge1xuICAgICAgcmVzLmNvbGxlY3Rpb24gPSBpdGVyYXRvck1hdGNoWzJdLnRyaW0oKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzLml0ZW0gPSBpdGVtO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtLCBpbmRleCwgaXRlbXMpIHtcbiAgbGV0IHNjb3BlVmFyaWFibGVzID0ge307XG4gIGlmICgvXlxcWy4qXFxdJC8udGVzdChpdGVyYXRvck5hbWVzLml0ZW0pICYmIEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICBsZXQgbmFtZXMgPSBpdGVyYXRvck5hbWVzLml0ZW0ucmVwbGFjZShcIltcIiwgXCJcIikucmVwbGFjZShcIl1cIiwgXCJcIikuc3BsaXQoXCIsXCIpLm1hcCgoaSkgPT4gaS50cmltKCkpO1xuICAgIG5hbWVzLmZvckVhY2goKG5hbWUsIGkpID0+IHtcbiAgICAgIHNjb3BlVmFyaWFibGVzW25hbWVdID0gaXRlbVtpXTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICgvXlxcey4qXFx9JC8udGVzdChpdGVyYXRvck5hbWVzLml0ZW0pICYmICFBcnJheS5pc0FycmF5KGl0ZW0pICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiKSB7XG4gICAgbGV0IG5hbWVzID0gaXRlcmF0b3JOYW1lcy5pdGVtLnJlcGxhY2UoXCJ7XCIsIFwiXCIpLnJlcGxhY2UoXCJ9XCIsIFwiXCIpLnNwbGl0KFwiLFwiKS5tYXAoKGkpID0+IGkudHJpbSgpKTtcbiAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBzY29wZVZhcmlhYmxlc1tuYW1lXSA9IGl0ZW1bbmFtZV07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pdGVtXSA9IGl0ZW07XG4gIH1cbiAgaWYgKGl0ZXJhdG9yTmFtZXMuaW5kZXgpXG4gICAgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pbmRleF0gPSBpbmRleDtcbiAgaWYgKGl0ZXJhdG9yTmFtZXMuY29sbGVjdGlvbilcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb25dID0gaXRlbXM7XG4gIHJldHVybiBzY29wZVZhcmlhYmxlcztcbn1cbmZ1bmN0aW9uIGlzTnVtZXJpYzMoc3ViamVjdCkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXJlZi5qc1xuZnVuY3Rpb24gaGFuZGxlcjMoKSB7XG59XG5oYW5kbGVyMy5pbmxpbmUgPSAoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgbGV0IHJvb3QgPSBjbG9zZXN0Um9vdChlbCk7XG4gIGlmICghcm9vdC5feF9yZWZzKVxuICAgIHJvb3QuX3hfcmVmcyA9IHt9O1xuICByb290Ll94X3JlZnNbZXhwcmVzc2lvbl0gPSBlbDtcbiAgY2xlYW51cDIoKCkgPT4gZGVsZXRlIHJvb3QuX3hfcmVmc1tleHByZXNzaW9uXSk7XG59O1xuZGlyZWN0aXZlKFwicmVmXCIsIGhhbmRsZXIzKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZi5qc1xuZGlyZWN0aXZlKFwiaWZcIiwgKGVsLCB7IGV4cHJlc3Npb24gfSwgeyBlZmZlY3Q6IGVmZmVjdDMsIGNsZWFudXA6IGNsZWFudXAyIH0pID0+IHtcbiAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJ0ZW1wbGF0ZVwiKVxuICAgIHdhcm4oXCJ4LWlmIGNhbiBvbmx5IGJlIHVzZWQgb24gYSA8dGVtcGxhdGU+IHRhZ1wiLCBlbCk7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgbGV0IHNob3cgPSAoKSA9PiB7XG4gICAgaWYgKGVsLl94X2N1cnJlbnRJZkVsKVxuICAgICAgcmV0dXJuIGVsLl94X2N1cnJlbnRJZkVsO1xuICAgIGxldCBjbG9uZTIgPSBlbC5jb250ZW50LmNsb25lTm9kZSh0cnVlKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBhZGRTY29wZVRvTm9kZShjbG9uZTIsIHt9LCBlbCk7XG4gICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgIGVsLmFmdGVyKGNsb25lMik7XG4gICAgICBza2lwRHVyaW5nQ2xvbmUoKCkgPT4gaW5pdFRyZWUoY2xvbmUyKSkoKTtcbiAgICB9KTtcbiAgICBlbC5feF9jdXJyZW50SWZFbCA9IGNsb25lMjtcbiAgICBlbC5feF91bmRvSWYgPSAoKSA9PiB7XG4gICAgICB3YWxrKGNsb25lMiwgKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKCEhbm9kZS5feF9lZmZlY3RzKSB7XG4gICAgICAgICAgbm9kZS5feF9lZmZlY3RzLmZvckVhY2goZGVxdWV1ZUpvYik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY2xvbmUyLnJlbW92ZSgpO1xuICAgICAgZGVsZXRlIGVsLl94X2N1cnJlbnRJZkVsO1xuICAgIH07XG4gICAgcmV0dXJuIGNsb25lMjtcbiAgfTtcbiAgbGV0IGhpZGUgPSAoKSA9PiB7XG4gICAgaWYgKCFlbC5feF91bmRvSWYpXG4gICAgICByZXR1cm47XG4gICAgZWwuX3hfdW5kb0lmKCk7XG4gICAgZGVsZXRlIGVsLl94X3VuZG9JZjtcbiAgfTtcbiAgZWZmZWN0MygoKSA9PiBldmFsdWF0ZTIoKHZhbHVlKSA9PiB7XG4gICAgdmFsdWUgPyBzaG93KCkgOiBoaWRlKCk7XG4gIH0pKTtcbiAgY2xlYW51cDIoKCkgPT4gZWwuX3hfdW5kb0lmICYmIGVsLl94X3VuZG9JZigpKTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWlkLmpzXG5kaXJlY3RpdmUoXCJpZFwiLCAoZWwsIHsgZXhwcmVzc2lvbiB9LCB7IGV2YWx1YXRlOiBldmFsdWF0ZTIgfSkgPT4ge1xuICBsZXQgbmFtZXMgPSBldmFsdWF0ZTIoZXhwcmVzc2lvbik7XG4gIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHNldElkUm9vdChlbCwgbmFtZSkpO1xufSk7XG5pbnRlcmNlcHRDbG9uZSgoZnJvbSwgdG8pID0+IHtcbiAgaWYgKGZyb20uX3hfaWRzKSB7XG4gICAgdG8uX3hfaWRzID0gZnJvbS5feF9pZHM7XG4gIH1cbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LW9uLmpzXG5tYXBBdHRyaWJ1dGVzKHN0YXJ0aW5nV2l0aChcIkBcIiwgaW50byhwcmVmaXgoXCJvbjpcIikpKSk7XG5kaXJlY3RpdmUoXCJvblwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7IHZhbHVlLCBtb2RpZmllcnMsIGV4cHJlc3Npb24gfSwgeyBjbGVhbnVwOiBjbGVhbnVwMiB9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBleHByZXNzaW9uID8gZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbikgOiAoKSA9PiB7XG4gIH07XG4gIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidGVtcGxhdGVcIikge1xuICAgIGlmICghZWwuX3hfZm9yd2FyZEV2ZW50cylcbiAgICAgIGVsLl94X2ZvcndhcmRFdmVudHMgPSBbXTtcbiAgICBpZiAoIWVsLl94X2ZvcndhcmRFdmVudHMuaW5jbHVkZXModmFsdWUpKVxuICAgICAgZWwuX3hfZm9yd2FyZEV2ZW50cy5wdXNoKHZhbHVlKTtcbiAgfVxuICBsZXQgcmVtb3ZlTGlzdGVuZXIgPSBvbihlbCwgdmFsdWUsIG1vZGlmaWVycywgKGUpID0+IHtcbiAgICBldmFsdWF0ZTIoKCkgPT4ge1xuICAgIH0sIHsgc2NvcGU6IHsgXCIkZXZlbnRcIjogZSB9LCBwYXJhbXM6IFtlXSB9KTtcbiAgfSk7XG4gIGNsZWFudXAyKCgpID0+IHJlbW92ZUxpc3RlbmVyKCkpO1xufSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy9pbmRleC5qc1xud2Fybk1pc3NpbmdQbHVnaW5EaXJlY3RpdmUoXCJDb2xsYXBzZVwiLCBcImNvbGxhcHNlXCIsIFwiY29sbGFwc2VcIik7XG53YXJuTWlzc2luZ1BsdWdpbkRpcmVjdGl2ZShcIkludGVyc2VjdFwiLCBcImludGVyc2VjdFwiLCBcImludGVyc2VjdFwiKTtcbndhcm5NaXNzaW5nUGx1Z2luRGlyZWN0aXZlKFwiRm9jdXNcIiwgXCJ0cmFwXCIsIFwiZm9jdXNcIik7XG53YXJuTWlzc2luZ1BsdWdpbkRpcmVjdGl2ZShcIk1hc2tcIiwgXCJtYXNrXCIsIFwibWFza1wiKTtcbmZ1bmN0aW9uIHdhcm5NaXNzaW5nUGx1Z2luRGlyZWN0aXZlKG5hbWUsIGRpcmVjdGl2ZU5hbWUsIHNsdWcpIHtcbiAgZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUsIChlbCkgPT4gd2FybihgWW91IGNhbid0IHVzZSBbeC0ke2RpcmVjdGl2ZU5hbWV9XSB3aXRob3V0IGZpcnN0IGluc3RhbGxpbmcgdGhlIFwiJHtuYW1lfVwiIHBsdWdpbiBoZXJlOiBodHRwczovL2FscGluZWpzLmRldi9wbHVnaW5zLyR7c2x1Z31gLCBlbCkpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvaW5kZXguanNcbmFscGluZV9kZWZhdWx0LnNldEV2YWx1YXRvcihub3JtYWxFdmFsdWF0b3IpO1xuYWxwaW5lX2RlZmF1bHQuc2V0UmVhY3Rpdml0eUVuZ2luZSh7IHJlYWN0aXZlOiByZWFjdGl2ZTIsIGVmZmVjdDogZWZmZWN0MiwgcmVsZWFzZTogc3RvcCwgcmF3OiB0b1JhdyB9KTtcbnZhciBzcmNfZGVmYXVsdCA9IGFscGluZV9kZWZhdWx0O1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9idWlsZHMvbW9kdWxlLmpzXG52YXIgbW9kdWxlX2RlZmF1bHQgPSBzcmNfZGVmYXVsdDtcbmV4cG9ydCB7XG4gIHNyY19kZWZhdWx0IGFzIEFscGluZSxcbiAgbW9kdWxlX2RlZmF1bHQgYXMgZGVmYXVsdFxufTtcbiIsICIvLyBwYWNrYWdlcy9pbnRlcnNlY3Qvc3JjL2luZGV4LmpzXG5mdW5jdGlvbiBzcmNfZGVmYXVsdChBbHBpbmUpIHtcbiAgQWxwaW5lLmRpcmVjdGl2ZShcImludGVyc2VjdFwiLCBBbHBpbmUuc2tpcER1cmluZ0Nsb25lKChlbCwgeyB2YWx1ZSwgZXhwcmVzc2lvbiwgbW9kaWZpZXJzIH0sIHsgZXZhbHVhdGVMYXRlciwgY2xlYW51cCB9KSA9PiB7XG4gICAgbGV0IGV2YWx1YXRlID0gZXZhbHVhdGVMYXRlcihleHByZXNzaW9uKTtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHJvb3RNYXJnaW46IGdldFJvb3RNYXJnaW4obW9kaWZpZXJzKSxcbiAgICAgIHRocmVzaG9sZDogZ2V0VGhyZXNob2xkKG1vZGlmaWVycylcbiAgICB9O1xuICAgIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcgPT09ICh2YWx1ZSA9PT0gXCJsZWF2ZVwiKSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGV2YWx1YXRlKCk7XG4gICAgICAgIG1vZGlmaWVycy5pbmNsdWRlcyhcIm9uY2VcIikgJiYgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfSk7XG4gICAgfSwgb3B0aW9ucyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XG4gICAgY2xlYW51cCgoKSA9PiB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gIH0pKTtcbn1cbmZ1bmN0aW9uIGdldFRocmVzaG9sZChtb2RpZmllcnMpIHtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImZ1bGxcIikpXG4gICAgcmV0dXJuIDAuOTk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJoYWxmXCIpKVxuICAgIHJldHVybiAwLjU7XG4gIGlmICghbW9kaWZpZXJzLmluY2x1ZGVzKFwidGhyZXNob2xkXCIpKVxuICAgIHJldHVybiAwO1xuICBsZXQgdGhyZXNob2xkID0gbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKFwidGhyZXNob2xkXCIpICsgMV07XG4gIGlmICh0aHJlc2hvbGQgPT09IFwiMTAwXCIpXG4gICAgcmV0dXJuIDE7XG4gIGlmICh0aHJlc2hvbGQgPT09IFwiMFwiKVxuICAgIHJldHVybiAwO1xuICByZXR1cm4gTnVtYmVyKGAuJHt0aHJlc2hvbGR9YCk7XG59XG5mdW5jdGlvbiBnZXRMZW5ndGhWYWx1ZShyYXdWYWx1ZSkge1xuICBsZXQgbWF0Y2ggPSByYXdWYWx1ZS5tYXRjaCgvXigtP1swLTldKykocHh8JSk/JC8pO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSArIChtYXRjaFsyXSB8fCBcInB4XCIpIDogdm9pZCAwO1xufVxuZnVuY3Rpb24gZ2V0Um9vdE1hcmdpbihtb2RpZmllcnMpIHtcbiAgY29uc3Qga2V5ID0gXCJtYXJnaW5cIjtcbiAgY29uc3QgZmFsbGJhY2sgPSBcIjBweCAwcHggMHB4IDBweFwiO1xuICBjb25zdCBpbmRleCA9IG1vZGlmaWVycy5pbmRleE9mKGtleSk7XG4gIGlmIChpbmRleCA9PT0gLTEpXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICBsZXQgdmFsdWVzID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgdmFsdWVzLnB1c2goZ2V0TGVuZ3RoVmFsdWUobW9kaWZpZXJzW2luZGV4ICsgaV0gfHwgXCJcIikpO1xuICB9XG4gIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIoKHYpID0+IHYgIT09IHZvaWQgMCk7XG4gIHJldHVybiB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzLmpvaW4oXCIgXCIpLnRyaW0oKSA6IGZhbGxiYWNrO1xufVxuXG4vLyBwYWNrYWdlcy9pbnRlcnNlY3QvYnVpbGRzL21vZHVsZS5qc1xudmFyIG1vZHVsZV9kZWZhdWx0ID0gc3JjX2RlZmF1bHQ7XG5leHBvcnQge1xuICBtb2R1bGVfZGVmYXVsdCBhcyBkZWZhdWx0LFxuICBzcmNfZGVmYXVsdCBhcyBpbnRlcnNlY3Rcbn07XG4iLCAiLy8gcGFja2FnZXMvcGVyc2lzdC9zcmMvaW5kZXguanNcbmZ1bmN0aW9uIHNyY19kZWZhdWx0KEFscGluZSkge1xuICBsZXQgcGVyc2lzdCA9ICgpID0+IHtcbiAgICBsZXQgYWxpYXM7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgIHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIGNvbnNvbGUud2FybihcIkFscGluZTogJHBlcnNpc3QgaXMgdXNpbmcgdGVtcG9yYXJ5IHN0b3JhZ2Ugc2luY2UgbG9jYWxTdG9yYWdlIGlzIHVuYXZhaWxhYmxlLlwiKTtcbiAgICAgIGxldCBkdW1teSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgICBzdG9yYWdlID0ge1xuICAgICAgICBnZXRJdGVtOiBkdW1teS5nZXQuYmluZChkdW1teSksXG4gICAgICAgIHNldEl0ZW06IGR1bW15LnNldC5iaW5kKGR1bW15KVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIEFscGluZS5pbnRlcmNlcHRvcigoaW5pdGlhbFZhbHVlLCBnZXR0ZXIsIHNldHRlciwgcGF0aCwga2V5KSA9PiB7XG4gICAgICBsZXQgbG9va3VwID0gYWxpYXMgfHwgYF94XyR7cGF0aH1gO1xuICAgICAgbGV0IGluaXRpYWwgPSBzdG9yYWdlSGFzKGxvb2t1cCwgc3RvcmFnZSkgPyBzdG9yYWdlR2V0KGxvb2t1cCwgc3RvcmFnZSkgOiBpbml0aWFsVmFsdWU7XG4gICAgICBzZXR0ZXIoaW5pdGlhbCk7XG4gICAgICBBbHBpbmUuZWZmZWN0KCgpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZ2V0dGVyKCk7XG4gICAgICAgIHN0b3JhZ2VTZXQobG9va3VwLCB2YWx1ZSwgc3RvcmFnZSk7XG4gICAgICAgIHNldHRlcih2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBpbml0aWFsO1xuICAgIH0sIChmdW5jKSA9PiB7XG4gICAgICBmdW5jLmFzID0gKGtleSkgPT4ge1xuICAgICAgICBhbGlhcyA9IGtleTtcbiAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICB9LCBmdW5jLnVzaW5nID0gKHRhcmdldCkgPT4ge1xuICAgICAgICBzdG9yYWdlID0gdGFyZ2V0O1xuICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbHBpbmUsIFwiJHBlcnNpc3RcIiwgeyBnZXQ6ICgpID0+IHBlcnNpc3QoKSB9KTtcbiAgQWxwaW5lLm1hZ2ljKFwicGVyc2lzdFwiLCBwZXJzaXN0KTtcbiAgQWxwaW5lLnBlcnNpc3QgPSAoa2V5LCB7IGdldCwgc2V0IH0sIHN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2UpID0+IHtcbiAgICBsZXQgaW5pdGlhbCA9IHN0b3JhZ2VIYXMoa2V5LCBzdG9yYWdlKSA/IHN0b3JhZ2VHZXQoa2V5LCBzdG9yYWdlKSA6IGdldCgpO1xuICAgIHNldChpbml0aWFsKTtcbiAgICBBbHBpbmUuZWZmZWN0KCgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGdldCgpO1xuICAgICAgc3RvcmFnZVNldChrZXksIHZhbHVlLCBzdG9yYWdlKTtcbiAgICAgIHNldCh2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG59XG5mdW5jdGlvbiBzdG9yYWdlSGFzKGtleSwgc3RvcmFnZSkge1xuICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKGtleSkgIT09IG51bGw7XG59XG5mdW5jdGlvbiBzdG9yYWdlR2V0KGtleSwgc3RvcmFnZSkge1xuICBsZXQgdmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0oa2V5LCBzdG9yYWdlKTtcbiAgaWYgKHZhbHVlID09PSB2b2lkIDApXG4gICAgcmV0dXJuO1xuICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBzdG9yYWdlU2V0KGtleSwgdmFsdWUsIHN0b3JhZ2UpIHtcbiAgc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn1cblxuLy8gcGFja2FnZXMvcGVyc2lzdC9idWlsZHMvbW9kdWxlLmpzXG52YXIgbW9kdWxlX2RlZmF1bHQgPSBzcmNfZGVmYXVsdDtcbmV4cG9ydCB7XG4gIG1vZHVsZV9kZWZhdWx0IGFzIGRlZmF1bHQsXG4gIHNyY19kZWZhdWx0IGFzIHBlcnNpc3Rcbn07XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGJyaWRnZVR1cmJvQW5kQWxwaW5lKEFscGluZSkge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpiZWZvcmUtcmVuZGVyJywgKGV2ZW50KSA9PiB7XG5cdFx0ZXZlbnQuZGV0YWlsLm5ld0JvZHkucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWxwaW5lLWdlbmVyYXRlZF0nKS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0aWYgKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1hbHBpbmUtZ2VuZXJhdGVkJykpIHtcblx0XHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWFscGluZS1nZW5lcmF0ZWQnKTtcblx0XHRcdFx0ZWwucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3R1cmJvOnJlbmRlcicsICgpID0+IHtcblx0XHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS10dXJiby1wcmV2aWV3JykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hbHBpbmUtaWdub3JlZF0nKS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKCd4LWlnbm9yZScpO1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWFscGluZS1pZ25vcmVkJyk7XG5cdFx0fSk7XG5cblx0XHRkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t4LWRhdGFdJykuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHVyYm8tcGVybWFuZW50JykpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0QWxwaW5lLmluaXRUcmVlKGVsKTtcblx0XHR9KTtcblxuXHRcdEFscGluZS5zdGFydE9ic2VydmluZ011dGF0aW9ucygpO1xuXHR9KTtcblxuXHQvLyBDbGVhbnVwIEFscGluZSBzdGF0ZSBvbiBuYXZpZ2F0aW9uLlxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpiZWZvcmUtY2FjaGUnLCAoKSA9PiB7XG5cdFx0Ly8gVGhpcyB3aWxsIGJlIHJlc3RhcnRlZCBpbiB0dXJibzpyZW5kZXIuXG5cdFx0QWxwaW5lLnN0b3BPYnNlcnZpbmdNdXRhdGlvbnMoKTtcblxuXHRcdGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHVyYm8tcGVybWFuZW50XScpLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRpZiAoIWVsLmhhc0F0dHJpYnV0ZSgneC1pZ25vcmUnKSkge1xuXHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3gtaWdub3JlJywgdHJ1ZSk7XG5cdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbHBpbmUtaWdub3JlZCcsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCdbeC1mb3JdLFt4LWlmXSxbeC10ZWxlcG9ydF0nKS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0aWYgKGVsLmhhc0F0dHJpYnV0ZSgneC1mb3InKSAmJiBlbC5feF9sb29rdXApIHtcblx0XHRcdFx0T2JqZWN0LnZhbHVlcyhlbC5feF9sb29rdXApLmZvckVhY2goKGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWxwaW5lLWdlbmVyYXRlZCcsIHRydWUpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVsLmhhc0F0dHJpYnV0ZSgneC1pZicpICYmIGVsLl94X2N1cnJlbnRJZkVsKSB7XG5cdFx0XHRcdGVsLl94X2N1cnJlbnRJZkVsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbHBpbmUtZ2VuZXJhdGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3gtdGVsZXBvcnQnKSAmJiBlbC5feF90ZWxlcG9ydCkge1xuXHRcdFx0XHRlbC5feF90ZWxlcG9ydC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWxwaW5lLWdlbmVyYXRlZCcsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCdbeC1kYXRhXScpLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRpZiAoIWVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10dXJiby1wZXJtYW5lbnQnKSkge1xuXHRcdFx0XHRBbHBpbmUuZGVzdHJveVRyZWUoZWwpO1xuXHRcdFx0XHQvLyBUdXJibyBsZWFrcyBET00gZWxlbWVudHMgdmlhIHRoZWlyIGRhdGEtdHVyYm8tcGVybWFuZW50IGhhbmRsaW5nLlxuXHRcdFx0XHQvLyBUaGF0IG5lZWRzIHRvIGJlIGZpeGVkIHVwc3RyZWFtLCBidXQgdW50aWwgdGhlbi5cblx0XHRcdFx0bGV0IGNsb25lID0gZWwuY2xvbmVOb2RlKHRydWUpO1xuXHRcdFx0XHRlbC5yZXBsYWNlV2l0aChjbG9uZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuIiwgIigndXNlIHN0cmljdCcpO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW2Rpc3F1c10nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5jb25zdCByZXNldCA9IGZ1bmN0aW9uIChwYWdlKSB7XG5cdGRlYnVnKCdyZXNldCcsIHBhZ2UpO1xuXHRESVNRVVMucmVzZXQoe1xuXHRcdHJlbG9hZDogdHJ1ZSxcblx0XHRjb25maWc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMucGFnZS5pZGVudGlmaWVyID0gcGFnZS5wZXJtYWxpbms7XG5cdFx0XHR0aGlzLnBhZ2UudXJsID0gcGFnZS5wZXJtYWxpbms7XG5cdFx0XHR0aGlzLnBhZ2UudGl0bGUgPSBwYWdlLnRpdGxlO1xuXHRcdFx0dGhpcy5sYW5ndWFnZSA9ICdlbic7XG5cdFx0fSxcblx0fSk7XG59O1xuXG5jb25zdCBsb2FkU2NyaXB0ID0gZnVuY3Rpb24gKHNob3J0TmFtZSkge1xuXHRjb25zdCBzY3JpcHRJRCA9ICdkaXNxdXMtZW1iZWQnO1xuXHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2NyaXB0SUQpO1xuXHRpZiAoc2NyaXB0KSB7XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnLCArbmV3IERhdGUoKSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdHNjcmlwdC5zcmMgPSBgLy8ke3Nob3J0TmFtZX0uZGlzcXVzLmNvbS9lbWJlZC5qc2A7XG5cdHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2NyaXB0SUQpO1xuXHR7XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnLCArbmV3IERhdGUoKSk7XG5cdH1cblx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcblx0KGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdEaXNxdXMoZGlzcXVzU2hvcnRuYW1lLCBwYWdlKSB7XG5cdHdpbmRvdy5kaXNxdXNfc2hvcnRuYW1lID0gZGlzcXVzU2hvcnRuYW1lO1xuXHR3aW5kb3cuZGlzcXVzX2lkZW50aWZpZXIgPSBwYWdlLnBlcm1hbGluaztcblx0d2luZG93LmRpc3F1c191cmwgPSBwYWdlLnBlcm1hbGluaztcblx0d2luZG93LmRpc3F1c19jb25maWcgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5sYW5ndWFnZSA9ICdlbic7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRwYWdlOiBwYWdlLFxuXHRcdC8vIEF2b2lkIHVzaW5nIHRoZSBuYW1lIGluaXQoKSwgd2hpY2ggaXMgYWxzbyBhdXRvbWF0aWNhbGx5IGludm9rZWQgYnkgQWxwaW5lSlMuXG5cdFx0Ly8gV2UgbmVlZCB0byBjYWxsIGl0IGV4cGxpY2l0bHkgdG8gbWFrZSBpdCBydW4gYWZ0ZXIgQWxwaW5lSlMgaGFzIHVwZGF0ZWQgdGhlIERPTS5cblx0XHRpbml0RGlzcXVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRcdGlmICghbG9hZFNjcmlwdChkaXNxdXNTaG9ydG5hbWUpKSB7XG5cdFx0XHRcdFx0Ly8gVGhlIHNjcmlwdCB0YWcgYWxyZWFkeSBleGlzdHMuXG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIG5hdmlnYXRpb24gdmlhIFR1cmJvbGlua3Mgc28ganVzdCBkbyBhIERJU1FVUy5yZXNldC5cblx0XHRcdFx0XHRyZXNldCh0aGlzLnBhZ2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHR9O1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tkcm9wZG93bnNdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0Ryb3Bkb3duc0NvbnRyb2xsZXIoZHJvcGRvd25zKSB7XG5cdHJldHVybiB7XG5cdFx0ZHJvcGRvd25zOiBkcm9wZG93bnMsXG5cdFx0dG9nZ2xlT3BlbjogZnVuY3Rpb24gKGlkeCkge1xuXHRcdFx0bGV0IHdhc09wZW4gPSB0aGlzLmRyb3Bkb3duc1tpZHhdLm9wZW47XG5cdFx0XHR0aGlzLmRyb3Bkb3duc1tpZHhdLm9wZW4gPSAhd2FzT3BlbjtcblxuXHRcdFx0aWYgKHdhc09wZW4pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPbmx5IDEgb3BlbiBhdCBhIHRpbWUuXG5cdFx0XHRmb3IgKGxldCBpIGluIGRyb3Bkb3ducykge1xuXHRcdFx0XHRpZiAoaSAhPSBpZHgpIHtcblx0XHRcdFx0XHR0aGlzLmRyb3Bkb3duc1tpXS5vcGVuID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGNsb3NlQWxsOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmRyb3Bkb3ducy5mb3JFYWNoKChlKSA9PiB7XG5cdFx0XHRcdGUub3BlbiA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRpc09wZW46IGZ1bmN0aW9uIChpZHgpIHtcblx0XHRcdHJldHVybiB0aGlzLmRyb3Bkb3duc1tpZHhdLm9wZW47XG5cdFx0fSxcblx0XHRpc0hpZGRlbjogZnVuY3Rpb24gKGlkeCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZHJvcGRvd25zW2lkeF0uaGlkZGVuO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW3N2Z10nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gYWxwaW5lUmVnaXN0ZXJEaXJlY3RpdmVTVkcoQWxwaW5lKSB7XG5cdEFscGluZS5kaXJlY3RpdmUoJ3N2ZycsIChlbCwgeyBleHByZXNzaW9uIH0sIHsgZWZmZWN0LCBjbGVhbnVwLCBldmFsdWF0ZUxhdGVyIH0pID0+IHtcblx0XHRsZXQgZXZhbHVhdGUgPSBldmFsdWF0ZUxhdGVyKGV4cHJlc3Npb24pO1xuXG5cdFx0ZWZmZWN0KCgpID0+IHtcblx0XHRcdGV2YWx1YXRlKChzcmMpID0+IHtcblx0XHRcdFx0aWYgKCFzcmMpIHtcblx0XHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3JjLmluY2x1ZGVzKCc8c3ZnJykpIHtcblx0XHRcdFx0XHQvLyBBbHJlYWR5IGlubGluZWQuXG5cdFx0XHRcdFx0cmVwbGFjZUluKGVsLCBzcmMpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzcmMuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG5cdFx0XHRcdFx0Y3JlYXRlSW1nRWwoZWwsIHNyYyk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFzcmMuZW5kc1dpdGgoJ3N2ZycpKSB7XG5cdFx0XHRcdFx0cmVwbGFjZUluKGVsLCAnJyk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmV0Y2goc3JjKVxuXHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuXHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3RyID0gcmVzcG9uc2U7XG5cblx0XHRcdFx0XHRcdGlmIChzdHIuaW5kZXhPZignc3ZnJykgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVwbGFjZUluKGVsLCBzdHIpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0Y29uc3QgcmVwbGFjZUluID0gZnVuY3Rpb24gKGVsLCBzdHIpIHtcblx0XHRsZXQgbmV3RWw7XG5cblx0XHRpZiAoc3RyKSB7XG5cdFx0XHRsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuXHRcdFx0dGVtcGxhdGUuaW5uZXJIVE1MID0gc3RyO1xuXHRcdFx0bmV3RWwgPSB0ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdH1cblxuXHRcdGlmICghbmV3RWwpIHtcblx0XHRcdG5ld0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0fVxuXG5cdFx0bmV3RWwuc2V0QXR0cmlidXRlKCdsbi1jcmVhdGVkLWJ5LW1lJywgJycpO1xuXG5cdFx0bGV0IGNsYXp6ID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xuXHRcdG5ld0VsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGF6eik7XG5cblx0XHRlbC5yZXBsYWNlV2l0aChuZXdFbCk7XG5cdH07XG5cblx0Y29uc3QgY3JlYXRlSW1nRWwgPSBmdW5jdGlvbiAoZWwsIHN0cikge1xuXHRcdGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRsZXQgY2xhenogPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG5cdFx0aW1nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGF6eik7XG5cdFx0aW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3RyKTtcblx0XHRlbC5yZXBsYWNlV2l0aChpbWcpO1xuXHR9O1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBzZXREb2N1bWVudE1ldGEobWV0YSkge1xuXHRkb2N1bWVudC50aXRsZSA9IG1ldGEudGl0bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVCb29sZWFuQ2xhc3MoYmFzZUNsYXNzLCBlbCwgdHJ1dGh5KSB7XG5cdGNvbnN0IGlzID0gYGlzLSR7YmFzZUNsYXNzfWA7XG5cdGNvbnN0IGlzTm90ID0gYGlzLW5vdC0ke2Jhc2VDbGFzc31gO1xuXG5cdGlmICh0cnV0aHkpIHtcblx0XHRpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGlzTm90KSkge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZShpc05vdCk7XG5cdFx0fVxuXHRcdGVsLmNsYXNzTGlzdC5hZGQoaXMpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoaXMpKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGlzKTtcblx0XHR9XG5cdFx0ZWwuY2xhc3NMaXN0LmFkZChpc05vdCk7XG5cdH1cbn1cblxuLy8gbm9ybWFsaXplU3BhY2UgcmVwbGFjZXMgYW55IHdoaXRlc3BhY2UgY2hhcmFjdGVyIChzcGFjZXMsIHRhYnMsIG5ld2xpbmVzIGFuZCBVbmljb2RlIHNwYWNlKSB3aXRoIGEgc3BhY2UuXG4vLyBNdWx0aXBsZSBzcGFjZXMgYXJlIGNvbGxhcHNlZCBpbnRvIG9uZS5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVTcGFjZSh0ZXh0KSB7XG5cdHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcc1xccysvZywgJyAnKTtcbn1cblxuLy8gU2VlIGh0dHBzOi8vY2hlYXRzaGVldHNlcmllcy5vd2FzcC5vcmcvY2hlYXRzaGVldHMvRE9NX2Jhc2VkX1hTU19QcmV2ZW50aW9uX0NoZWF0X1NoZWV0Lmh0bWwjUlVMRV8uMjM3Xy1fRml4aW5nX0RPTV9Dcm9zcy1zaXRlX1NjcmlwdGluZ19WdWxuZXJhYmlsaXRpZXNcbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUhUTUwodGV4dCkge1xuXHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRlbGVtZW50LmlubmVyVGV4dCA9IHRleHQ7XG5cdHJldHVybiBlbGVtZW50LmlubmVySFRNTDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG5cdHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKC0yKTtcblx0dmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcblx0dmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG5cdGlmIChkYXkgPCAxMCkge1xuXHRcdGRheSA9ICcwJyArIGRheTtcblx0fVxuXHRpZiAobW9udGggPCAxMCkge1xuXHRcdG1vbnRoID0gJzAnICsgbW9udGg7XG5cdH1cblxuXHRyZXR1cm4gc3ByaW50ZignJXMvJXMvJXMnLCBtb250aCwgZGF5LCB5ZWFyKTtcbn1cblxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcm1hcml1enpvLzg3NjE2OThcbmZ1bmN0aW9uIHNwcmludGYoZm9ybWF0KSB7XG5cdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblx0dmFyIGkgPSAwO1xuXHRyZXR1cm4gZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gYXJnc1tpKytdO1xuXHR9KTtcbn1cblxuLy8gZ2V0U2Nyb2xsTGVmdCByZXR1cm5zIHRoZSBzY3JvbGxMZWZ0IHZhbHVlIG5lZWRlZCB0byBtYWtlIHRoZSBjaGlsZCBlbGVtZW50IHZpc2libGUuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdChwYXJlbnQsIGNoaWxkKSB7XG5cdGNvbnN0IHBhcmVudFJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGNoaWxkUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdC8vIElmIHRoZSBjaGlsZCBpcyBhbHJlYWR5IHZpc2libGUsIHJldHVybiAwLlxuXHRpZiAoY2hpbGRSZWN0LmxlZnQgPj0gcGFyZW50UmVjdC5sZWZ0ICYmIGNoaWxkUmVjdC5yaWdodCA8PSBwYXJlbnRSZWN0LnJpZ2h0KSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gY2hpbGRSZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnQ7XG59XG5cbi8vIHNjcm9sbFRvQWN0aXZlRXhwbG9yZXJOb2RlIHNjcm9sbHMgdGhlIGV4cGxvcmVyIHRvIHRoZSBhY3RpdmUgbm9kZS5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxUb0FjdGl2ZUV4cGxvcmVyTm9kZSgpIHtcblx0Y29uc3QgaWQgPSAnZXhwbG9yZXInO1xuXHRpZiAod2luZG93LnNjcm9sbEhhbmRsZWRCeUNsaWNrICYmIHdpbmRvdy5zY3JvbGxIYW5kbGVkQnlDbGlja1tpZF0pIHtcblx0XHQvLyBUaGlzIHNjcm9sbCB3YXMgaGFuZGxlZCBieSBhIGNsaWNrIGV2ZW50LlxuXHRcdGRlbGV0ZSB3aW5kb3cuc2Nyb2xsSGFuZGxlZEJ5Q2xpY2tbaWRdO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGxldCBleHBsb3JlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0aWYgKCFleHBsb3Jlcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGxldCByZXRyaWVzID0gWzAsIDUwMCwgMTAwMCwgMjAwMF07XG5cdGxldCBpc0RvbmUgPSBmYWxzZTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZXRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKGlzRG9uZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgc2xlZXAgPSByZXRyaWVzW2ldO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGlzRG9uZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4cGxvcmVyLS1hY3RpdmUgLmlzLWFjdGl2ZS1wYWdlJyk7XG5cdFx0XHRpZiAoIXRhcmdldCkge1xuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBubyBhY3RpdmUgcGFnZSwgbG9vayBmb3IgdGhlIGxhc3Qgb3BlbiBub2RlLlxuXHRcdFx0XHRsZXQgZXhwbG9yZXJOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leHBsb3Jlci0tYWN0aXZlIC5leHBsb3Jlci1ub2RlLW9wZW46bGFzdC1jaGlsZCcpO1xuXHRcdFx0XHRpZiAoZXhwbG9yZXJOb2Rlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gZXhwbG9yZXJOb2Rlc1tleHBsb3Jlck5vZGVzLmxlbmd0aCAtIDFdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGFyZ2V0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IG9mZnNldCA9IGdldE9mZnNldFRvcChleHBsb3JlciwgdGFyZ2V0KTtcblx0XHRcdGlmICghb2Zmc2V0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aXNEb25lID0gdHJ1ZTtcblx0XHRcdGV4cGxvcmVyLnNjcm9sbCh7IHRvcDogb2Zmc2V0IC0gMjAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcblx0XHR9LCBzbGVlcCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldFRvcChjb250YWluZXIsIGVsKSB7XG5cdGxldCBvZmZzZXQgPSAwO1xuXHR3aGlsZSAoZWwgJiYgZWwgIT0gY29udGFpbmVyKSB7XG5cdFx0b2Zmc2V0ICs9IGVsLm9mZnNldFRvcDtcblx0XHRlbCA9IGVsLm9mZnNldFBhcmVudDtcblx0fVxuXHRyZXR1cm4gb2Zmc2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXNUcmFuc2xhdGluZyhlbCwgdGltZW91dCA9IDEwMDApIHtcblx0bGV0IGN1cnJlbnRMYW5nID0gZ2V0Q3VycmVudExhbmcoKTtcblx0aWYgKCFjdXJyZW50TGFuZyB8fCBjdXJyZW50TGFuZyA9PSAnZW4nKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IGVscyA9IGlzSXRlcmFibGUoZWwpID8gZWwgOiBbZWxdO1xuXG5cdGVscy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdGVsLmNsYXNzTGlzdC5hZGQoJ2lzLXRyYW5zbGF0aW5nJyk7XG5cdH0pO1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdGVscy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdHJhbnNsYXRpbmcnKTtcblx0XHR9KTtcblx0fSwgdGltZW91dCk7XG59XG5cbi8vIGdldExhbmcgZ2V0cyB0aGUgbGFuZ3VhZ2UgZnJvbSBlaXRoZXIgdGhlIFVSTCBvciB0aGUgYnJvd3NlcidzIGxvY2FsIHN0b3JhZ2UuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudExhbmcoKSB7XG5cdGxldCBsYW5nID0gZ2V0Q3VycmVudExhbmdGcm9tTG9jYXRpb24oKTtcblx0aWYgKGxhbmcpIHtcblx0XHRyZXR1cm4gbGFuZztcblx0fVxuXG5cdC8vIF94XyBpcyB0aGUgc3BlY2lhbCBuYW1lc3BhY2UgdXNlZCBieSBBbHBpbmVKUy5cblx0Ly8gUmVhZCBpdCBkaXJlY3RseSBoZXJlIGJlY2F1c2Ugd2UgbmVlZCB0byBhY2Nlc3MgaXQgYmVmb3JlIEFscGluZSBpcyBsb2FkZWQuXG5cdHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfeF9jdXJyZW50TGFuZycpKTtcbn1cblxuY29uc3QgdmFsaWRMYW5ncyA9IFsnZW4nLCAnZXMnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRMYW5nRnJvbUxvY2F0aW9uKCkge1xuXHRsZXQgbGFuZyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCkuZ2V0KCdsYW5nJyk7XG5cdGlmICh2YWxpZExhbmdzLmluY2x1ZGVzKGxhbmcpKSB7XG5cdFx0cmV0dXJuIGxhbmc7XG5cdH1cblx0cmV0dXJuICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50UGFyYW1Gcm9tTG9jYXRpb24ocGFyYW0pIHtcblx0bGV0IHZhbHVlID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQocGFyYW0pO1xuXHRpZiAodmFsdWUpIHtcblx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcblx0fVxuXHRyZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gaXNJdGVyYWJsZShvYmopIHtcblx0cmV0dXJuIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3Qob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDwgNzY4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXNrdG9wKCkge1xuXHRyZXR1cm4gaXNTY3JlZW5MYXJnZXJUaGFuKDEyNzkpOyAvLyB4bCBpbiBUYWlsd2luZCBjb25maWcuXG59XG5cbmZ1bmN0aW9uIGlzU2NyZWVuTGFyZ2VyVGhhbihweCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID4gcHg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RvdWNoRGV2aWNlKCkge1xuXHR0cnkge1xuXHRcdGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50Jyk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBhZ2luYXRpb25QYXJhbUluTG9jYXRpb24ocGFnZUtleSwgcGFnZU51bSwgZmlyc3RQYWdlID0gMSkge1xuXHRsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24pO1xuXHR1cmwuaGFzaCA9ICcnO1xuXHRpZiAocGFnZU51bSA9PSBmaXJzdFBhZ2UpIHtcblx0XHR1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShwYWdlS2V5KTtcblx0fSBlbHNlIHtcblx0XHR1cmwuc2VhcmNoUGFyYW1zLnNldChwYWdlS2V5LCBwYWdlTnVtKTtcblx0fVxuXHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyB0dXJibzoge30gfSwgJycsIHVybCk7XG59XG5cbmNvbnN0IG1vbnRoID0gMzAgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29va2llKG5hbWUsIHZhbHVlLCBkdXJhdGlvbiA9IG1vbnRoKSB7XG5cdGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuXHRkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyBkdXJhdGlvbik7XG5cdGNvbnN0IGV4cGlyZXMgPSBgZXhwaXJlcz0ke2QudG9VVENTdHJpbmcoKX1gO1xuXHRkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT0ke3ZhbHVlfTske2V4cGlyZXN9O3BhdGg9L2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xuXHRjb25zdCBwcmVmaXggPSBgJHtuYW1lfT1gO1xuXHRjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGMgPSBjYVtpXTtcblx0XHR3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuXHRcdFx0YyA9IGMuc3Vic3RyaW5nKDEpO1xuXHRcdH1cblx0XHRpZiAoYy5pbmRleE9mKHByZWZpeCkgPT09IDApIHtcblx0XHRcdHJldHVybiBjLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoLCBjLmxlbmd0aCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRzQ29va2llcygpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gQm9vbGVhbihuYXZpZ2F0b3IuY29va2llRW5hYmxlZCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FsZ29saWEvc2VhcmNoLWluc2lnaHRzLmpzL2Jsb2IvNzM4ZTVkOWUyYTljNDE2MTA0OTQ5Y2EzNTA5YjY1ZTdjYjc5MDA3OS9saWIvdXRpbHMvdXVpZC50c1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVVSUQoKSB7XG5cdHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XG5cdFx0Y29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMDtcblx0XHRjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XG5cdH0pO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgaXNEZXNrdG9wLCBpc01vYmlsZSB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhbHBpbmVSZWdpc3Rlck1hZ2ljSGVscGVycyhBbHBpbmUpIHtcblx0Ly8gJGNvcHkgaXMgYSBtYWdpYyBoZWxwZXIgdGhhdCBjb3B5cyB0aGUgY29udGVudCBvZiB0aGUgY3VycmVudCBvciB0aGUgc3VwcGxpZWQgZWxlbWVudCB0byB0aGUgY2xpcGJvYXJkLlxuXHRBbHBpbmUubWFnaWMoJ2NvcHknLCAoY3VycmVudEVsKSA9PiB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKCFlbCkge1xuXHRcdFx0XHRlbCA9IGN1cnJlbnRFbDtcblx0XHRcdH1cblx0XHRcdGxldCBsbnRkcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5sbnRhYmxlIC5sbnRkJyk7XG5cdFx0XHRpZiAobG50ZHMgJiYgbG50ZHMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdC8vIEEgdGFibGUgd2l0aCBsaW5lIG51bWJlcnMsIHRoZSBjb2RlIGlzIGluIHRoZSBzZWNvbmQgY29sdW1uLlxuXHRcdFx0XHRlbCA9IGxudGRzWzFdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaHJvbWEsIEh1Z28ncyBoaWdobGlnaHRlciwgcmVjZW50bHkgbWFkZSB0aGUgbGluZSBzcGFuIGVsZW1lbnRzIGJsb2NrIGVsZW1lbnRzICh0byBtYWtlIHRoZW0gZ28gZnVsbCB3aWR0aCkuXG5cdFx0XHQvLyBUaGlzIG1ha2VzIHJlc3VsdHMgIGVsLmlubmVyVGV4dCBoYXZpbmcgZXh0cmEgbmV3bGluZXMuXG5cdFx0XHQvLyB0ZXh0Q29udGVudCwgaG93ZXZlciwgaWdub3JlcyBhbnkgc3R5bGluZywgd2hpY2ggaXMgd2hhdCB3ZSB3YW50LlxuXHRcdFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZWwudGV4dENvbnRlbnQpO1xuXHRcdH07XG5cdH0pO1xuXG5cdC8vICRpc1Njb2xsWCBtYWdpYyBoZWxwZXIgdGhhdCByZXBvcnRzIHdoZXRoZXIgdGhlIGN1cnJlbnQgb3IgdGhlIHN1cHBsaWVkIGVsZW1lbnQgaXMgc2Nyb2xsaW5nIG9uIHRoZSB4IGF4aXMuXG5cdEFscGluZS5tYWdpYygnaXNTY3JvbGxYJywgKGN1cnJlbnRFbCkgPT4ge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdGlmICghZWwpIHtcblx0XHRcdFx0ZWwgPSBjdXJyZW50RWw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWwuY2xpZW50V2lkdGggPCBlbC5zY3JvbGxXaWR0aDtcblx0XHR9O1xuXHR9KTtcblxuXHQvLyAkaXNNb2JpbGUgbWFnaWMgaGVscGVycyB0aGF0IHJlcG9ydHMgd2hldGhlciB0aGlzIGlzIGEgbW9iaWxlIChzbWFsbGwpIGRldmljZS5cblx0QWxwaW5lLm1hZ2ljKCdpc01vYmlsZScsIChjdXJyZW50RWwpID0+IHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGlzTW9iaWxlKCk7XG5cdFx0fTtcblx0fSk7XG5cblx0Ly8gJGlzRGVza3RvcCBtYWdpYyBoZWxwZXJzIHRoYXQgcmVwb3J0cyB3aGV0aGVyIHRoaXMgaXMgYSBkZXNrdG9wIChsYXJnZXIpIGRldmljZS5cblx0QWxwaW5lLm1hZ2ljKCdpc0Rlc2t0b3AnLCAoY3VycmVudEVsKSA9PiB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBpc0Rlc2t0b3AoKTtcblx0XHR9O1xuXHR9KTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGdldFNjcm9sbExlZnQgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW3RhYnNdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1RhYnNDb250cm9sbGVyKCkge1xuXHRyZXR1cm4ge1xuXHRcdHRhYnM6IHtcblx0XHRcdGlkczogW10sXG5cdFx0XHRhY3RpdmU6IDAsXG5cdFx0fSxcblx0XHQvLyBPcmRpbmFsIGZvciBhbGwgdGhlIHRhYnMgY29tcG9uZW50cyBvbiBhIHBhZ2UuIFVzZWQgZm9yIGRlYnVnZ2luZy5cblx0XHRvcmRpbmFsOiAwLFxuXG5cdFx0Ly8gVG9wIHBvc2l0aW9uIG9mIHRoZSB0YWJzIGVsZW1lbnQgd2hlbiBjbGlja2VkLlxuXHRcdHRvcFBvczogMCxcblxuXHRcdHVwZGF0ZUFjdGl2ZShpbml0ID0gZmFsc2UpIHtcblx0XHRcdGxldCB0YWJzRWwgPSB0aGlzLiRyZWZzLnRhYnM7XG5cdFx0XHRsZXQgdGFic05hdkVsID0gdGhpcy4kcmVmcy50YWJzTmF2O1xuXHRcdFx0bGV0IG9sZEFjdGl2ZSA9IHRoaXMudGFicy5hY3RpdmU7XG5cdFx0XHRsZXQgbmV3QWN0aXZlID0gMDtcblx0XHRcdGxldCB0YWJzU3RhdGUgPSB0aGlzLiRzdG9yZS5uYXYudGFicztcblxuXHRcdFx0Ly8gTG9vcCBvdmVyIHRoZSBpZHMgYW5kIHNldCB0aGUgYWN0aXZlIHRhYiB0byBlaXRoZXIgdGhlIGZpcnN0IG9uZSBvciB0aGUgb25lIHRoYXQgaXMgc2V0IHRvIGFjdGl2ZSBpbiB0aGUgZ2xvYmFsIHN0b3JlLlxuXHRcdFx0bGV0IGFjdGl2ZVNldCA9IGZhbHNlO1xuXHRcdFx0dGhpcy50YWJzLmlkcy5mb3JFYWNoKChpZCwgaW5kZXgpID0+IHtcblx0XHRcdFx0aWYgKHRhYnNTdGF0ZS5hY3RpdmVbaWRdKSB7XG5cdFx0XHRcdFx0bmV3QWN0aXZlID0gaW5kZXg7XG5cdFx0XHRcdFx0YWN0aXZlU2V0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFRoaXMgaXMgYSB0YWIgc2V0IHdlIGhhdmUgbm90IHNlZW4gYmVmb3JlLCBzbyBzZXQgdGhlIGZpcnN0IG9uZSB0byBhY3RpdmUuXG5cdFx0XHRpZiAoIWFjdGl2ZVNldCAmJiB0aGlzLnRhYnMuaWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGFic1N0YXRlLmFjdGl2ZVt0aGlzLnRhYnMuaWRzWzBdXSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudGFicy5hY3RpdmUgPSBuZXdBY3RpdmU7XG5cblx0XHRcdHRoaXMudGFicy5pZHMuZm9yRWFjaCgoaWQsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGxldCBpc0FjdGl2ZSA9IGluZGV4ID09PSBuZXdBY3RpdmU7XG5cdFx0XHRcdGxldCB0YWJDb250ZW50RWwgPSB0aGlzLiRyZWZzWyd0YWJzLWNvbnRlbnQtJyArIGluZGV4XTtcblx0XHRcdFx0aWYgKGlzQWN0aXZlKSB7XG5cdFx0XHRcdFx0bGV0IHRhYkVsID0gdGhpcy4kcmVmc1sndGFiLScgKyBpbmRleF07XG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIFNhZmFyaSB0aGF0IHNlZW1zIHRvIGdldCBjb25mdXNlZFxuXHRcdFx0XHRcdC8vIHdoZW4gd2Ugc2V0IHNjcm9sbExlZnQgb24gYSBzY3JvbGxlZCBlbGVtZW50LlxuXHRcdFx0XHRcdHRhYnNOYXZFbC5zdHlsZS5vdmVyZmxvd1ggPSAnaGlkZGVuJztcblx0XHRcdFx0XHRsZXQgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbExlZnQodGFic05hdkVsLCB0YWJFbCk7XG5cdFx0XHRcdFx0aWYgKHNjcm9sbExlZnQpIHtcblx0XHRcdFx0XHRcdHRhYnNOYXZFbC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGFic05hdkVsLnN0eWxlLm92ZXJmbG93WCA9ICdhdXRvJztcblx0XHRcdFx0fVxuXHRcdFx0XHR0YWJDb250ZW50RWwuc3R5bGUuZGlzcGxheSA9IGlzQWN0aXZlID8gJycgOiAnbm9uZSc7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGluaXQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZSBvbmx5IG5lZWQgdG8gYWRqdXN0IHRoZSBjdXJyZW50bHkgY2xpY2tlZCBjb21wb25lbnQsXG5cdFx0XHQvLyBhbmQgbm90IHRoZSB0b3Agb25lLlxuXHRcdFx0aWYgKHRoaXMub3JkaW5hbCA9PSAwIHx8IHRoaXMub3JkaW5hbCAhPSB0YWJzU3RhdGUub3JkaW5hbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCB0b3BQb3NBZnRlciA9IHRhYnNFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cdFx0XHQvLyBSZXN0b3JlIG9mZnNldCBvZiB0aGUgY2xpY2tlZCB0YWIgaWYgaXQgaGFzIGNoYW5nZWQuXG5cdFx0XHRsZXQgZGlmZiA9IHRvcFBvc0FmdGVyIC0gdGhpcy50b3BQb3M7XG5cblx0XHRcdGlmIChkaWZmKSB7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxCeSgwLCBkaWZmKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGluaXRUYWJzKG9yZGluYWwpIHtcblx0XHRcdHRoaXMub3JkaW5hbCA9IG9yZGluYWw7XG5cdFx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRcdHRoaXMuJHdhdGNoKCckc3RvcmUubmF2LnRhYnMuY291bnRlcicsICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZUFjdGl2ZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLnVwZGF0ZUFjdGl2ZSh0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0aW5pdFRhYihpZCkge1xuXHRcdFx0aWYgKHRoaXMub3JkaW5hbCA9PSAwKSB7XG5cdFx0XHRcdGRlYnVnKCdpbml0VGFiJywgaWQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy50YWJzLmlkcy5wdXNoKGlkKTtcblx0XHR9LFxuXHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAob3JkaW5hbCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudGFicy5hY3RpdmUgPT09IG9yZGluYWw7XG5cdFx0fSxcblxuXHRcdHNldEFjdGl2ZTogZnVuY3Rpb24gKG9yZGluYWwpIHtcblx0XHRcdGlmICh0aGlzLm9yZGluYWwgPT0gMCkge1xuXHRcdFx0XHRkZWJ1Zygnc2V0QWN0aXZlJywgb3JkaW5hbCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNsaWNrZWRUYWIgPSBvcmRpbmFsO1xuXHRcdFx0aWYgKHRoaXMudGFicy5hY3RpdmUgPT09IG9yZGluYWwpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgdGFic0VsID0gdGhpcy4kcmVmcy50YWJzO1xuXHRcdFx0Ly8gUHJlc2VydmUgb2Zmc2V0IG9mIHRoZSBjbGlja2VkIHRhYi5cblx0XHRcdHRoaXMudG9wUG9zID0gdGFic0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblx0XHRcdGxldCB0YWJzU3RhdGUgPSB0aGlzLiRzdG9yZS5uYXYudGFicztcblxuXHRcdFx0dGFic1N0YXRlLm9yZGluYWwgPSB0aGlzLm9yZGluYWw7XG5cblx0XHRcdGxldCBpZCA9IHRoaXMudGFicy5pZHNbb3JkaW5hbF07XG5cdFx0XHRpZiAoaWQpIHtcblx0XHRcdFx0dGhpcy50YWJzLmlkcy5mb3JFYWNoKChpZDIpID0+IHtcblx0XHRcdFx0XHR0YWJzU3RhdGUuYWN0aXZlW2lkMl0gPSBpZCA9PT0gaWQyO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Ly8gV2lsbCB0cmlnZ2VyIHVwZGF0ZUFjdGl2ZSgpIGluIGFsbCB0YWJzIGNvbXBvbmVudHMuXG5cdFx0XHRcdHRhYnNTdGF0ZS5jb3VudGVyID0gdGhpcy4kc3RvcmUubmF2LnRhYnMuY291bnRlciArIDE7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gbGVhY2tDaGVja2VyKEFscGluZSkge1xuXHR3ZWFrUmVmcyA9IG5ldyBTZXQoKTtcblx0d2Vha1NldCA9IG5ldyBXZWFrU2V0KCk7XG5cblx0cmV0dXJuIHtcblx0XHRzZWxlY3RvcjogJ1t4LWRhdGFdJyxcblx0XHRhY3RpdmU6IDAsXG5cdFx0ZGlydHk6IDAsXG5cblx0XHRhZGQ6IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0d2Vha1JlZnMuYWRkKG5ldyBXZWFrUmVmKGVsKSk7XG5cdFx0XHR3ZWFrU2V0LmFkZChlbCk7XG5cdFx0fSxcblxuXHRcdGxpc3RBbGxpdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuZGlydHkrKztcblx0XHRcdGxldCBhbGxpdmUgPSBbXTtcblx0XHRcdHdlYWtSZWZzLmZvckVhY2goKHJlZikgPT4ge1xuXHRcdFx0XHRsZXQgZWwgPSByZWYuZGVyZWYoKTtcblx0XHRcdFx0aWYgKGVsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhbGxpdmUucHVzaChgJHtlbC5sb2NhbE5hbWV9IyR7ZWwuaWR9LyR7ZWwuY2xhc3NMaXN0fWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBhbGxpdmU7XG5cdFx0fSxcblxuXHRcdGNsZWFyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3ZWFrUmVmcy5jbGVhcigpO1xuXHRcdFx0dGhpcy5hY3RpdmUgPSAwO1xuXHRcdFx0d2Vha1NldCA9IG5ldyBXZWFrU2V0KCk7XG5cdFx0fSxcblxuXHRcdHRyYWNrQ29tcG9uZW50czogZnVuY3Rpb24gKHNlbGVjdG9yID0gJ1t4LWRhdGFdJykge1xuXHRcdFx0Y29uc29sZS5sb2coYFRyYWNrIENvbXBvbmVudHMgZm9yIGxlYWsgZGV0ZWN0aW9uIHVzaW5nIHNlbGVjdG9yICR7c2VsZWN0b3J9Li4uYCk7XG5cblx0XHRcdGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdFx0aWYgKGVsLmlkID09PSAnbGVhY2stY2hlY2tlcicgfHwgZWwuaGFzQXR0cmlidXRlKCdkYXRhLXR1cmJvLXBlcm1hbmVudCcpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYWRkKGVsKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRyZXBsYWNlQm9keSgpIHtcblx0XHRcdEFscGluZS5kZWZlck11dGF0aW9ucygpO1xuXHRcdFx0bGV0IG5ld0JvZHkgPSBkb2N1bWVudC5ib2R5LmNsb25lTm9kZSh0cnVlKTtcblx0XHRcdG5ld0JvZHkucmVwbGFjZUNoaWxkcmVuKHRoaXMuJHJvb3QuY2xvbmVOb2RlKHRydWUpKTtcblx0XHRcdGRvY3VtZW50LmJvZHkucmVwbGFjZVdpdGgobmV3Qm9keSk7XG5cdFx0XHRBbHBpbmUuZmx1c2hBbmRTdG9wRGVmZXJyaW5nTXV0YXRpb25zKCk7XG5cdFx0fSxcblxuXHRcdC8vIFJ1bm5pbmcgQ2hyb21lIHdpdGggdGhlc2UgZmxhZ3Mgd2lsbCBleHBvc2UgYSBnYygpIG1ldGhvZCB0aGF0IGlzIHZlcnkgdXNlZnVsLlxuXHRcdC8vIC9BcHBsaWNhdGlvbnMvR29vZ2xlXFwgQ2hyb21lLmFwcC9Db250ZW50cy9NYWNPUy9Hb29nbGVcXCBDaHJvbWUgLS1qcy1mbGFncz1cIi0tZXhwb3NlLWdjXCIgLS1lbmFibGUtbWVtb3J5LWluZm9cblx0XHRydW5HQygpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdSdW4gR2FyYmFnZSBDb2xsZWN0aW9uLi4uJyk7XG5cdFx0XHRpZiAoIXdpbmRvdy5nYykge1xuXHRcdFx0XHR0aHJvdyBgd2luZG93LmdjKCkgbm90IGF2YWlsYWJsZTsgeW91IG5lZWQgdG8gZW5hYmxlIHRoYXQgaW4gQ2hyb21lLCBlLmcuIC9BcHBsaWNhdGlvbnMvR29vZ2xlXFwgQ2hyb21lLmFwcC9Db250ZW50cy9NYWNPUy9Hb29nbGVcXCBDaHJvbWUgLS1qcy1mbGFncz1cIi0tZXhwb3NlLWdjXCIgLS1lbmFibGUtbWVtb3J5LWluZm9gO1xuXHRcdFx0fVxuXHRcdFx0d2luZG93LmdjKCk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ0NoZWNrIExlYWtzLi4uJyk7XG5cdFx0XHRcdHRoaXMuYWN0aXZlID0gdGhpcy5saXN0QWxsaXZlKCkubGVuZ3RoO1xuXHRcdFx0XHRjb25zb2xlLmRpcih3ZWFrU2V0KTtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBzYW5pdGl6ZUhUTUwgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW3JvdXRlcl0nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3Q3JlYXRlSHJlZihzZWFyY2hDb25maWcpIHtcblx0aWYgKCFzZWFyY2hDb25maWcpIHtcblx0XHR0aHJvdyAnbmV3Q3JlYXRlSHJlZjogbXVzdCBwcm92aWRlIHNlYXJjaENvbmZpZyc7XG5cdH1cblxuXHRjb25zdCBTRUNUSU9OU19CQVNFUEFUSCA9ICcvZG9jcy8nO1xuXG5cdHJldHVybiB7XG5cdFx0c2VjdGlvbnNGcm9tUGF0aDogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IHBhdGhuYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcblx0XHRcdHBhdGhuYW1lID0gc2FuaXRpemVIVE1MKHBhdGhuYW1lKTtcblx0XHRcdGxldCBzZWN0aW9ucyA9IHBhdGhuYW1lLnNwbGl0KCcvJykuc2xpY2UoMSk7XG5cdFx0XHRyZXR1cm4gc2VjdGlvbnM7XG5cdFx0fSxcblx0XHRocmVmU2VjdGlvbjogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0bGV0IHBhcnRzID0ga2V5LnNwbGl0KCcgPiAnKTtcblxuXHRcdFx0aWYgKHBhcnRzLmxlbmd0aCA+IDEgJiYgcGFydHNbMF0gPT09ICd0YXhvbm9taWVzJykge1xuXHRcdFx0XHRwYXJ0cyA9IHBhcnRzLnNsaWNlKDEpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGAke1NFQ1RJT05TX0JBU0VQQVRIfSR7cGFydHMuam9pbignLycpLnRvTG93ZXJDYXNlKCl9L2A7XG5cdFx0fSxcblx0fTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IG5ld0NyZWF0ZUhyZWYgfSBmcm9tICcuL2NyZWF0ZS1ocmVmJztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1ticmVhZGNydW1ic10nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3QnJlYWRjcnVtYnNDb250cm9sbGVyKHNlYXJjaENvbmZpZykge1xuXHRpZiAoIXNlYXJjaENvbmZpZykge1xuXHRcdHRocm93ICduZXdCcmVhZGNydW1ic0NvbnRyb2xsZXI6IG11c3QgcHJvdmlkZSBzZWFyY2hDb25maWcnO1xuXHR9XG5cdGNvbnN0IGhyZWZGYWN0b3J5ID0gbmV3Q3JlYXRlSHJlZihzZWFyY2hDb25maWcpO1xuXG5cdHJldHVybiB7XG5cdFx0ZGF0YToge1xuXHRcdFx0YnJlYWRjcnVtYnM6IHtcblx0XHRcdFx0c2VjdGlvbnM6IFtdLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGJyZWFkQ3J1bWJzQ3JlYXRlZDogZmFsc2UsXG5cdFx0aW5pdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5zZWFyY2gud2l0aEJsYW5rKChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRsZXQgcGFydHMgPSBocmVmRmFjdG9yeS5zZWN0aW9uc0Zyb21QYXRoKCk7XG5cdFx0XHRcdFx0bGV0IHNlY3Rpb25zID0gW107XG5cdFx0XHRcdFx0bGV0IHNlY3Rpb25LZXlzID0gW107XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0bGV0IHNlY3Rpb24gPSBwYXJ0c1tpXTtcblx0XHRcdFx0XHRcdHNlY3Rpb25LZXlzLnB1c2goc2VjdGlvbi50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdFx0XHRcdGxldCBrZXkgPSBzZWN0aW9uS2V5cy5qb2luKCcgPiAnKTtcblx0XHRcdFx0XHRcdGxldCBzbSA9IHJlc3VsdC5nZXRTZWN0aW9uTWV0YShrZXkpO1xuXHRcdFx0XHRcdFx0aWYgKHNtKSB7XG5cdFx0XHRcdFx0XHRcdHNlY3Rpb25zLnB1c2goc20pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gSnVzdCBzaG93IGEgbGluayB0byB0aGUgaG9tZSBwYWdlIGluIHRoZSBicmVhZGNydW1icy5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBtb3N0bHkgYSBtaXNzcGVsbGVkIFVSTC5cblx0XHRcdFx0XHRcdFx0Ly8gV2UgY291bGQgY3JlYXRlIGEgcGF0aCBiYXNlZCBvbiB0aGUgbG9jYXRpb24sXG5cdFx0XHRcdFx0XHRcdC8vIGFzIHdlIGRvIHNhbml0aXplIGluIHNlY3Rpb25zRnJvbVBhdGgsXG5cdFx0XHRcdFx0XHRcdC8vIGJ1dCBsZXQncyBub3Qgb3BlbiB1cCB0byBwb3RlbnRpYWwgWFNTIGF0dGFja3MuXG5cdFx0XHRcdFx0XHRcdHNlY3Rpb25zLmxlbmd0aCA9IDA7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuZGF0YS5icmVhZGNydW1icy5zZWN0aW9ucyA9IHNlY3Rpb25zO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiaW1wb3J0IHsgUXVlcnkgfSBmcm9tICcuL3F1ZXJ5JztcblxuZXhwb3J0IGVudW0gU2VhcmNoR3JvdXBJZGVudGlmaWVyIHtcblx0TWFpbiA9IDEsXG5cdEFkSG9jXG59XG5cbmludGVyZmFjZSBSZXF1ZXN0IHtcblx0ZmFjZXRGaWx0ZXJzOiBzdHJpbmdbXTtcblx0ZmlsdGVyczogc3RyaW5nO1xuXHRpbmRleE5hbWU6IHN0cmluZztcblx0cGFyYW1zOiBzdHJpbmc7XG59XG5cbiBpbnRlcmZhY2UgUmVxdWVzdE1ldGEge1xuXHRxdWVyeTogUXVlcnk7XG5cdHByb250bzogYm9vbGVhbjtcblx0ZmlsZUNhY2hlSUQ6IHN0cmluZztcbn1cblxuXG5pbnRlcmZhY2UgUmVzdWx0IHtcblx0aGl0czogUmVjb3JkPHN0cmluZywgYW55PltdO1xuXHRmYWNldHM6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIG51bWJlcj4+O1xuXHRuYkhpdHM6IG51bWJlcjtcblx0bmJQYWdlczogbnVtYmVyO1xuXHRoaXRzUGVyUGFnZTogbnVtYmVyO1xuXHRwYWdlOiBudW1iZXI7XG5cdGluZGV4OiBzdHJpbmc7XG5cdHBhcmFtczogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdENhbGxiYWNrIHtcblx0cmVxdWVzdDogUmVxdWVzdDtcblx0Y2FsbGJhY2socmVzdWx0OiBSZXN1bHQpOiB2b2lkO1xuXHRtZXRhPzogUmVxdWVzdE1ldGE7XG5cblx0aXNGaWx0ZXJlZCgpOiBib29sZWFuO1xuXHRnZXRGaWxlQ2FjaGVJRCgpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFJlcXVlc3RDYWxsQmFja1N0YXR1cyB7XG5cdE9mZixcblx0T24sXG5cdE9uY2Vcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RDYWxsQmFja0ZhY3Rvcnkge1xuXHRzdGF0dXMoKTogUmVxdWVzdENhbGxCYWNrU3RhdHVzO1xuXHRjcmVhdGUocXVlcnk6IFF1ZXJ5KTogUmVxdWVzdENhbGxiYWNrO1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdENhbGxCYWNrRmFjdG9yeVRhcmdldCB7XG5cdGZhY3Rvcnk6IFJlcXVlc3RDYWxsQmFja0ZhY3Rvcnk7XG5cdHRhcmdldDogU2VhcmNoR3JvdXBJZGVudGlmaWVyO1xufVxuXG5leHBvcnQgY29uc3QgbmV3UmVxdWVzdENhbGxiYWNrRmFjdG9yaWVzID0gZnVuY3Rpb24oKTogUmVxdWVzdENhbGxCYWNrRmFjdG9yeVtdIHtcblx0cmV0dXJuIFtdO1xufTtcblxuZXhwb3J0IGNvbnN0IG5ld1JlcXVlc3RDYWxsYmFjayA9IGZ1bmN0aW9uKFxuXHRyZXF1ZXN0OiBSZXF1ZXN0LFxuXHRjYWxsYmFjazogKHJlc3VsdDogUmVzdWx0KSA9PiB2b2lkLFxuXHRtZXRhPzogUmVxdWVzdE1ldGFcbik6IFJlcXVlc3RDYWxsYmFjayB7XG5cblxuXHRyZXR1cm4ge1xuXHRcdHJlcXVlc3Q6IHJlcXVlc3QsXG5cdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdG1ldGE6IG1ldGEsXG5cdFx0aXNGaWx0ZXJlZDogZnVuY3Rpb24oKTogYm9vbGVhbiB7XG5cdFx0XHRpZiAoIW1ldGEgfHwgIW1ldGEucXVlcnkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1ldGEucXVlcnkuaXNGaWx0ZXJlZCgpO1xuXHRcdH0sXG5cdFx0Z2V0RmlsZUNhY2hlSUQ6IGZ1bmN0aW9uKCk6IHN0cmluZyB7XG5cdFx0XHRpZiAoIW1ldGEpIHtcblx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICBtZXRhLmZpbGVDYWNoZUlEO1xuXHRcdH1cblx0fTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdSZXF1ZXN0Q2FsbGJhY2tGYWN0b3J5VGFyZ2V0ID0gZnVuY3Rpb24oXG5cdGZhY3Rvcnk6IFJlcXVlc3RDYWxsQmFja0ZhY3RvcnksXG5cdHRhcmdldDogU2VhcmNoR3JvdXBJZGVudGlmaWVyXG4pOiBSZXF1ZXN0Q2FsbEJhY2tGYWN0b3J5VGFyZ2V0IHtcblx0cmV0dXJuIHtcblx0XHRmYWN0b3J5OiBmYWN0b3J5LFxuXHRcdHRhcmdldDogdGFyZ2V0XG5cdH07XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgaXNNb2JpbGUsIHNjcm9sbFRvQWN0aXZlRXhwbG9yZXJOb2RlIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcbmltcG9ydCB7XG5cdG5ld1JlcXVlc3RDYWxsYmFjayxcblx0bmV3UmVxdWVzdENhbGxiYWNrRmFjdG9yeVRhcmdldCxcblx0UmVxdWVzdENhbGxCYWNrU3RhdHVzLFxuXHRTZWFyY2hHcm91cElkZW50aWZpZXIsXG59IGZyb20gJy4uL3NlYXJjaC9yZXF1ZXN0JztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tleHBsb3Jlci1ub2RlXScpIDogZnVuY3Rpb24gKCkge307XG52YXIgZGVidWdEZXYgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW2V4cGxvcmVyLW5vZGUtZGV2XScpIDogZnVuY3Rpb24gKCkge307XG5cbmNvbnN0IGV4cGxvcmVyQ29tbW9uID0ge1xuXHRpc09wZW46IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy4kc3RvcmUubmF2Lm9wZW4uZXhwbG9yZXI7XG5cdH0sXG5cblx0Y2xvc2VJZk1vYmlsZTogZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLiRzdG9yZS5uYXYub3Blbi5leHBsb3JlciAmJiBpc01vYmlsZSgpKSB7XG5cdFx0XHR0aGlzLiRzdG9yZS5uYXYub3Blbi5leHBsb3JlciA9IGZhbHNlO1xuXHRcdH1cblx0fSxcblxuXHRhY3RpdmF0ZUh5ZHJhdGlvbjogZnVuY3Rpb24gKHBlcm1hbmVudCA9IHRydWUpIHtcblx0XHR0aGlzLiRzdG9yZS5zZWFyY2guZXhwbG9yZXIuc2hvd0h5ZHJhdGVkRXhwbG9yZXIgPSB0cnVlO1xuXHRcdGlmIChwZXJtYW5lbnQpIHtcblx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5leHBsb3Jlci5zaG93QWx3YXlzSHlkcmF0ZWRFeHBsb3JlciA9IHBlcm1hbmVudDtcblx0XHR9XG5cdH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3U2VhcmNoRXhwbG9yZXJJbml0aWFsKCkge1xuXHRyZXR1cm4ge1xuXHRcdC4uLmV4cGxvcmVyQ29tbW9uLFxuXG5cdFx0Ly8gS2VlcCB0cmFjayBvZiBzaWRlYmFyIHNlY3Rpb25zIHRvIHByZXZlbnQgZHVwbGljYXRpb25cblx0XHRwcm9jZXNzZWRTZWN0aW9uczogbmV3IFNldCgpLFxuXG5cdFx0b25DbGlja1N0YXRpY0xlYWZOb2RlOiBmdW5jdGlvbiAoZSwgaHJlZiwgb2JqZWN0SUQpIHtcblx0XHRcdGRlYnVnKCdvbkNsaWNrU3RhdGljTGVhZk5vZGUnLCBocmVmLCBvYmplY3RJRCk7XG5cdFx0XHRsZXQgaGl0ID0ge1xuXHRcdFx0XHRvYmplY3RJRDogb2JqZWN0SUQgfHwgaHJlZixcblx0XHRcdH07XG5cdFx0XHR0aGlzLiRzdG9yZS5uYXYuYW5hbHl0aWNzLmhhbmRsZXIuY2xpY2tIaXQoaGl0LCAnRE9DUzogRXhwbG9yZXInKTtcblx0XHR9LFxuXG5cdFx0b25DbGlja1N0YXRpY0JyYW5jaE5vZGU6IGZ1bmN0aW9uIChlLCBocmVmLCBvYmplY3RJRCwga2V5KSB7XG5cdFx0XHRkZWJ1Zygnb25DbGlja1N0YXRpY0JyYW5jaE5vZGUnLCBocmVmLCBrZXkpO1xuXHRcdFx0bGV0IGhpdCA9IHtcblx0XHRcdFx0b2JqZWN0SUQ6IG9iamVjdElEIHx8IGhyZWYsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBUcmFjayBzZWN0aW9ucyB3ZSd2ZSBjbGlja2VkIHRvIHByZXZlbnQgZHVwbGljYXRpb24gaW4gaHlkcmF0ZWQgdmlld1xuXHRcdFx0aWYgKGtleSAmJiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09ICdhcGknIHx8IGtleS50b0xvd2VyQ2FzZSgpID09PSAncHJvZHVjdHMnKSkge1xuXHRcdFx0XHR0aGlzLnByb2Nlc3NlZFNlY3Rpb25zLmFkZChrZXkudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuJHN0b3JlLm5hdi5hbmFseXRpY3MuaGFuZGxlci5jbGlja0hpdChoaXQsICdET0NTOiBFeHBsb3JlcicpO1xuXHRcdH0sXG5cblx0XHQvLyBNb3ZlIHRvIGEgaHlkcmF0ZWQgdmVyc2lvbiBvZiB0aGUgZXhwbG9yZXIgdHJlZS5cblx0XHQvLyBrZXkgaXMgdGhlIG5vZGUgdGhhdCB0cmlnZ2VyZWQgdGhpcy5cblx0XHQvLyBPcGVuIHdhcyB0aGF0IG5vZGUncyBvcGVuIHN0YXRlIHdoZW4gdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQuXG5cdFx0aHlkcmF0ZUFuZFN3aXRjaE9wZW5TdGF0ZUZvcktleShrZXksIG9wZW4pIHtcblx0XHRcdGRlYnVnKCdoeWRyYXRlQW5kU3dpdGNoT3BlblN0YXRlRm9yS2V5Jywga2V5LCBvcGVuKTtcblx0XHRcdFxuXHRcdFx0Ly8gU3RvcmUgcHJvY2Vzc2VkIHNlY3Rpb24gdG8gcHJldmVudCBkdXBsaWNhdGlvblxuXHRcdFx0aWYgKGtleSAmJiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09ICdhcGknIHx8IGtleS50b0xvd2VyQ2FzZSgpID09PSAncHJvZHVjdHMnKSkge1xuXHRcdFx0XHR0aGlzLnByb2Nlc3NlZFNlY3Rpb25zLmFkZChrZXkudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5leHBsb3Jlci5rZXlPcGVuU3RhY2sucHVzaCh7IGtleToga2V5LCBvcGVuOiBvcGVuIH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBQYXNzIHByb2Nlc3NlZCBzZWN0aW9ucyBpbmZvcm1hdGlvbiB0byB0aGUgc3RvcmVcblx0XHRcdGlmICh0aGlzLnByb2Nlc3NlZFNlY3Rpb25zLnNpemUgPiAwKSB7XG5cdFx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5leHBsb3Jlci5wcm9jZXNzZWRTZWN0aW9ucyA9IFsuLi50aGlzLnByb2Nlc3NlZFNlY3Rpb25zXTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b25SZW5kZXIoZSkge1xuXHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHVyYm8tcHJldmlldycpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHNjcm9sbFRvQWN0aXZlRXhwbG9yZXJOb2RlKCk7XG5cdFx0fSxcblx0XHRcblx0XHRzaG91bGRTaG93SHlkcmF0ZWRFeHBsb3JlcigpIHtcblx0XHRcdC8vIE92ZXJyaWRlIHRvIGVuc3VyZSBwcm9wZXIgdHJhbnNpdGlvbiBiZXR3ZWVuIHN0YXRlc1xuXHRcdFx0cmV0dXJuIHRoaXMuJHN0b3JlLnNlYXJjaC5zaG91bGRTaG93SHlkcmF0ZWRFeHBsb3JlcigpO1xuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1NlYXJjaEV4cGxvcmVySHlkcmF0ZWQoc2VhcmNoQ29uZmlnKSB7XG5cdGxldCBzZWN0aW9uS2V5ID0gJyc7XG5cblx0cmV0dXJuIHtcblx0XHQuLi5leHBsb3JlckNvbW1vbixcblxuXHRcdC8vIENhbGxiYWNrcyBjYWxsZWQgb24gb25SZW5kZXIuXG5cdFx0b25SZW5kZXJzOiBbXSxcblxuXHRcdC8vIEV4cGxvcmVyIHN0YXRlLlxuXHRcdGV4cGxvcmVyOiB7XG5cdFx0XHQvLyBUaGUgdG9wIGxldmVsIG5vZGVzLlxuXHRcdFx0cm9vdE5vZGVzOiBbXSxcblxuXHRcdFx0Ly8gU29ydGVkIGJ5IGhyZWYuXG5cdFx0XHRmYWNldHM6IFtdLFxuXHRcdH0sXG5cblx0XHRpc0FjdGl2ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy4kc3RvcmUuc2VhcmNoLnNob3VsZFNob3dIeWRyYXRlZEV4cGxvcmVyQW5kSXNIeWRyYXRlZCgpO1xuXHRcdH0sXG5cblx0XHRpbml0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG5cdFx0XHRkZWJ1ZygnbmV3U2VhcmNoRXhwbG9yZXJIeWRyYXRlZC5pbml0Jyk7XG5cdFx0XHRjb25zdCBoYW5kbGVLZXlPcGVuU3RhY2sgPSAoKSA9PiB7XG5cdFx0XHRcdGxldCBzdGFjayA9IHRoaXMuJHN0b3JlLnNlYXJjaC5leHBsb3Jlci5rZXlPcGVuU3RhY2s7XG5cdFx0XHRcdGRlYnVnKCdoYW5kbGVLZXlPcGVuU3RhY2snLCBzdGFjay5sZW5ndGgpO1xuXHRcdFx0XHRpZiAoIXN0YWNrLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgbm4gPSBzdGFjay5wb3AoKTtcblx0XHRcdFx0bGV0IG9wZW4gPSAhbm4ub3Blbjtcblx0XHRcdFx0bGV0IG4gPSB0aGlzLmV4cGxvcmVyLmZhY2V0cy5maW5kKChuKSA9PiBuLmtleSA9PT0gbm4ua2V5KTtcblx0XHRcdFx0aWYgKG4gJiYgbi5vcGVuICE9IG9wZW4pIHtcblx0XHRcdFx0XHRuLm9wZW4gPSBvcGVuO1xuXHRcdFx0XHRcdGlmIChvcGVuKSB7XG5cdFx0XHRcdFx0XHRvcGVuTm9kZUFuZENsb3NlVGhlT3RoZXJzKG4sIHRoaXMuZXhwbG9yZXIuZmFjZXRzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hY3RpdmF0ZUh5ZHJhdGlvbigpO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy4kc3RvcmUuc2VhcmNoLndpdGhFeHBsb3JlckRhdGEoKGRhdGEpID0+IHtcblx0XHRcdFx0bGV0IGZhY2V0cyA9IGRhdGEuYmxhbmsuc2VjdGlvbkZhY2V0cztcblx0XHRcdFx0Ly8gQXBwbHkgc29tZSBtZXRhZGF0YSB1c2VkIGZvciBBbGdvbGlhIGV2ZW50cyBhbmQgc2ltaWxhci5cblx0XHRcdFx0bGV0IHBvc2l0aW9uID0gMDtcblx0XHRcdFx0ZmFjZXRzLmZvckVhY2goKG4pID0+IHtcblx0XHRcdFx0XHQvLyBUaGVzZSBhcmUgYWxzbyBpbmRleGVkIG9uIGl0cyBvd24uXG5cdFx0XHRcdFx0aWYgKG4uaHJlZi5zdGFydHNXaXRoKCcvZG9jcy9ndWlkZXMvJykgfHwgbi5ocmVmLnN0YXJ0c1dpdGgoJy9kb2NzL3Byb2R1Y3RzLycpKSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbisrO1xuXHRcdFx0XHRcdFx0bi5oaXQgPSB7XG5cdFx0XHRcdFx0XHRcdG9iamVjdElEOiBuLmhyZWYsXG5cdFx0XHRcdFx0XHRcdF9fcG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDcmVhdGUgYSBpZCB0aGF0J3MgYSB2YWxpZCBzZWxlY3Rvci5cblx0XHRcdFx0XHRuLmlkID0gbi5ocmVmLnJlcGxhY2UoL1xcVy9nLCAnXycpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5leHBsb3Jlci5mYWNldHMgPSBmYWNldHM7XG5cdFx0XHRcdC8vIEZpbHRlciByb290IG5vZGVzIGFuZCBzcGVjaWZpY2FsbHkgaGFuZGxlIGFwaS9wcm9kdWN0cyBkdXBsaWNhdGVzXG5cdFx0XHRcdGNvbnN0IGFwaUtleXMgPSBbJ2FwaScsICdBUEknXTtcblx0XHRcdFx0Y29uc3QgcHJvZHVjdEtleXMgPSBbJ3Byb2R1Y3RzJywgJ1Byb2R1Y3RzJ107XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBUcmFjayBpZiB3ZSd2ZSBzZWVuIGFwaSBvciBwcm9kdWN0cyBub2Rlc1xuXHRcdFx0XHRsZXQgc2VlbkFwaSA9IGZhbHNlO1xuXHRcdFx0XHRsZXQgc2VlblByb2R1Y3RzID0gZmFsc2U7XG5cdFx0XHRcdFxuXHRcdFx0XHRsZXQgcm9vdE5vZGVzID0gdGhpcy5leHBsb3Jlci5mYWNldHMuZmlsdGVyKFxuXHRcdFx0XHRcdChuKSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBTa2lwIGJ1bmRsZXMgYW5kIGNvbW11bml0eVxuXHRcdFx0XHRcdFx0aWYgKG4ubGV2ZWwgIT09IDEgfHwgbi5rZXkgPT09ICdidW5kbGVzJyB8fCBuLmtleSA9PT0gJ2NvbW11bml0eScpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgQVBJIG5vZGVzIC0gb25seSBpbmNsdWRlIHRoZSBmaXJzdCBvbmVcblx0XHRcdFx0XHRcdGlmIChhcGlLZXlzLmluY2x1ZGVzKG4ua2V5KSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2VlbkFwaSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRzZWVuQXBpID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIEhhbmRsZSBQcm9kdWN0cyBub2RlcyAtIG9ubHkgaW5jbHVkZSB0aGUgZmlyc3Qgb25lXG5cdFx0XHRcdFx0XHRpZiAocHJvZHVjdEtleXMuaW5jbHVkZXMobi5rZXkpKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChzZWVuUHJvZHVjdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0c2VlblByb2R1Y3RzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8vIEluY2x1ZGUgYWxsIG90aGVyIGxldmVsIDEgbm9kZXNcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLy8vIENoZWNrIGlmICdwcm9kdWN0cycgYW5kICdhcGknIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgcm9vdE5vZGVzXG5cdFx0XHRcdC8vaWYgKCFyb290Tm9kZXMuZmluZChuID0+IG4ua2V5ID09PSAncHJvZHVjdHMnKSkge1xuXHRcdFx0XHQvL1x0cm9vdE5vZGVzLnB1c2goe1xuXHRcdFx0XHQvL1x0XHRrZXk6ICdwcm9kdWN0cycsXG5cdFx0XHRcdC8vXHRcdGNvdW50OiAtMSxcblx0XHRcdFx0Ly9cdFx0bGV2ZWw6IDEsXG5cdFx0XHRcdC8vXHR9KTtcblx0XHRcdFx0Ly99XG5cblx0XHRcdFx0Ly8vLyBDaGVjayBpZiAnYXBpJyBpcyBub3QgYWxyZWFkeSBpbiB0aGUgcm9vdE5vZGVzXG5cdFx0XHRcdC8vaWYgKCFyb290Tm9kZXMuZmluZChuID0+IG4ua2V5ID09PSAnYXBpJykpIHtcblx0XHRcdFx0Ly9cdHJvb3ROb2Rlcy5wdXNoKHtcblx0XHRcdFx0Ly9cdFx0a2V5OiAnYXBpJyxcblx0XHRcdFx0Ly9cdFx0Y291bnQ6IC0xLFxuXHRcdFx0XHQvL1x0XHRsZXZlbDogMSxcblx0XHRcdFx0Ly9cdH0pO1xuXHRcdFx0XHQvL31cblxuXHRcdFx0XHQvLyBBcHBseSBleHBsb3Jlcl9pY29uIGFuZCB3ZWlnaHQgZnJvbSBzZWFyY2hDb25maWcuc2VjdGlvbnMuXG5cdFx0XHRcdHJvb3ROb2Rlcy5mb3JFYWNoKChuKSA9PiB7XG5cdFx0XHRcdFx0bGV0IHNlY3Rpb24gPSBzZWFyY2hDb25maWcuc2VjdGlvbnNbbi5rZXkudG9Mb3dlckNhc2UoKV07XG5cdFx0XHRcdFx0aWYgKHNlY3Rpb24pIHtcblx0XHRcdFx0XHRcdG4uaWNvbiA9IHNlY3Rpb24uZXhwbG9yZXJfaWNvbjtcblx0XHRcdFx0XHRcdG4ud2VpZ2h0ID0gc2VjdGlvbi53ZWlnaHQ7XG5cdFx0XHRcdFx0XHRuLnRpdGxlID0gc2VjdGlvbi50aXRsZTtcblx0XHRcdFx0XHRcdG4ubGlua1RpdGxlID0gbi50aXRsZTtcblx0XHRcdFx0XHRcdGlmIChzZWN0aW9uLnN0YXRpY19saW5rX3VybCkge1xuXHRcdFx0XHRcdFx0XHRuLnN0YXRpY19saW5rX3VybCA9IHNlY3Rpb24uc3RhdGljX2xpbmtfdXJsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gU29ydCBieSB3ZWlnaHQsIHRoZW4gYnkgdGl0bGUuXG5cdFx0XHRcdHJvb3ROb2Rlcy5zb3J0KChhLCBiKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGEud2VpZ2h0ID09PSBiLndlaWdodCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGEudGl0bGUubG9jYWxlQ29tcGFyZShiLnRpdGxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGEud2VpZ2h0IC0gYi53ZWlnaHQ7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuZXhwbG9yZXIucm9vdE5vZGVzID0gcm9vdE5vZGVzO1xuXG5cdFx0XHRcdHRoaXMuJHdhdGNoKCckc3RvcmUuc2VhcmNoLnJlc3VsdHMubWFpbi5zZWN0aW9uRmFjZXRzJywgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0ZGVidWcoJ3dhdGNoICRzdG9yZS5zZWFyY2gucmVzdWx0cy5tYWluLnNlY3Rpb25GYWNldHMnKTtcblx0XHRcdFx0XHR1cGRhdGVGYWNldFN0YXRlKHRoaXMuZXhwbG9yZXIuZmFjZXRzLCB2YWx1ZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuJHdhdGNoKCckc3RvcmUuc2VhcmNoLmV4cGxvcmVyLmtleU9wZW5TdGFjaycsICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdGRlYnVnKCckc3RvcmUuc2VhcmNoLmV4cGxvcmVyLmtleU9wZW5TdGFjaycsIHZhbHVlKTtcblx0XHRcdFx0XHRoYW5kbGVLZXlPcGVuU3RhY2soKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5vcGVuQW5kQ2xvc2VOb2RlcygpO1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5zZWFyY2guZXhwbG9yZXIuaHlkcmF0ZWQgPSB0cnVlO1xuXHRcdFx0fSwgY3JlYXRlRXhwbG9yZXJOb2RlUmVxdWVzdCk7XG5cdFx0fSxcblxuXHRcdG9uQmVmb3JlUmVuZGVyKGUpIHtcblx0XHRcdGlmICh0aGlzLiRzdG9yZS5zZWFyY2guZXhwbG9yZXIuc2hvd0Fsd2F5c0h5ZHJhdGVkRXhwbG9yZXIpIHtcblx0XHRcdFx0dGhpcy4kc3RvcmUuc2VhcmNoLmV4cGxvcmVyLnNob3dIeWRyYXRlZEV4cGxvcmVyID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9uUmVuZGVyKGUpIHtcblx0XHRcdGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXR1cmJvLXByZXZpZXcnKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm9wZW5BbmRDbG9zZU5vZGVzKCk7XG5cdFx0XHR0aGlzLm9uUmVuZGVycy5mb3JFYWNoKChjYikgPT4gY2IoZSkpO1xuXHRcdH0sXG5cblx0XHRnZXRGYWNldHNGb3I6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRyZXR1cm4gZmluZENoaWxkcmVuKG5vZGUuaHJlZiwgdGhpcy5leHBsb3Jlci5mYWNldHMpO1xuXHRcdH0sXG5cblx0XHRmaW5kTm9kZTogZnVuY3Rpb24gKGhyZWYpIHtcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuZXhwbG9yZXIuZmFjZXRzLmZpbmRJbmRleCgobikgPT4gbi5ocmVmID09PSBocmVmKTtcblx0XHRcdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5leHBsb3Jlci5mYWNldHNbaW5kZXhdO1xuXHRcdH0sXG5cblx0XHQvLyBPcGVuL2Nsb3NlIHN0YXRlIGFuZCB0cmFuc2l0aW9ucy5cblxuXHRcdG9wZW5BbmRDbG9zZU5vZGVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNBY3RpdmUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHBhZ2VJbmZvID0gZ2V0UGFnZUluZm8oKTtcblx0XHRcdGlmICghcGFnZUluZm8pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZGVidWcoJ29wZW5BbmRDbG9zZU5vZGVzJywgcGFnZUluZm8uaHJlZik7XG5cdFx0XHRpZiAocGFnZUluZm8ua2luZCA9PT0gJ2hvbWUnKSB7XG5cdFx0XHRcdGNsb3NlTGV2ZWwoMSwgdGhpcy5leHBsb3Jlci5mYWNldHMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IGhyZWZTZWN0aW9uID0gcGFnZUluZm8uaHJlZlNlY3Rpb247XG5cdFx0XHRcdGlmIChwYWdlSW5mby5zZWN0aW9uID09PSAnYXBpJykge1xuXHRcdFx0XHRcdC8vIFRoZSBBUEkgc2VjdGlvbiBpcyBjdXJyZW50bHkgYSBsaXR0bGUgc3BlY2lhbC5cblx0XHRcdFx0XHRocmVmU2VjdGlvbiA9IHBhZ2VJbmZvLmhyZWY7XG5cdFx0XHRcdH0gZWxzZSBpZiAocGFnZUluZm8uaHJlZiA9PT0gJy9kb2NzL3NlY3Rpb25zLycpIHtcblx0XHRcdFx0XHQvLyBFLmcuIGJsb2csIG1hcmtldHBsYWNlLiBUaGVzZSBhcmUgc3RhdGljIG9ubHkgb24gdGhlIGZpcnN0IGxldmVsLlxuXHRcdFx0XHRcdC8vIFdlIG5lZWQgdG8gb3BlbiB1cCB0aGUgc2Vjb25kIGxldmVsLlxuXHRcdFx0XHRcdGhyZWZTZWN0aW9uID0gZGVjb2RlVVJJKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cblx0XHRcdFx0XHQvLyBXZSBkb24ndCBoYXZlIGEgc3RhdGljIHJlcHJlc2VudGF0aW9uIG9mIHRoZXNlIG5vZGVzLlxuXHRcdFx0XHRcdHRoaXMuYWN0aXZhdGVIeWRyYXRpb24odHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVidWdEZXYoJ29wZW5BbmRDbG9zZU5vZGVzLmhyZWZTZWN0aW9uJywgaHJlZlNlY3Rpb24pO1xuXHRcdFx0XHRsZXQgY3VycmVudE5vZGUgPSB0aGlzLmZpbmROb2RlKGhyZWZTZWN0aW9uKTtcblx0XHRcdFx0aWYgKGN1cnJlbnROb2RlKSB7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUub3BlbiA9IGN1cnJlbnROb2RlLmNvdW50ID4gMDtcblx0XHRcdFx0XHRvcGVuTm9kZUFuZENsb3NlVGhlT3RoZXJzKGN1cnJlbnROb2RlLCB0aGlzLmV4cGxvcmVyLmZhY2V0cyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3U2VhcmNoRXhwbG9yZXJOb2RlKHNlYXJjaENvbmZpZywgbm9kZSkge1xuXHRsZXQgdGVtcGxhdGVzID0ge307XG5cblx0Y29uc3QgaXNBY3RpdmVQYWdlID0gKHApID0+IHtcblx0XHRyZXR1cm4gcC5wYXRobmFtZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICYmIHAuaGFzaCA9PT0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cdH07XG5cblx0bGV0IGN0cmwgPSB7XG5cdFx0bm9kZTogbm9kZSxcblx0XHRjb3VudGVyOiAwLFxuXHRcdHN0YXRlOiB7XG5cdFx0XHRjaGlsZE5vZGVzOiBbXSxcblx0XHRcdHBhZ2VzOiBbXSwgLy8gSW5jbHVkZXMgb25seSB2aXNpYmxlIHBhZ2VzLlxuXHRcdFx0dG90YWxQYWdlQ291bnQ6IDAsIC8vIEluY2x1ZGVzIGhpZGRlbi9kZXByZWNhdGVkIHBhZ2VzLlxuXHRcdFx0cGFnZXNMb2FkZWQ6IGZhbHNlLFxuXHRcdFx0cGFnZVNlYXJjaEFjdGl2ZTogZmFsc2UsXG5cdFx0XHRoeWRyYXRlZDogZmFsc2UsXG5cdFx0fSxcblx0XHR2aWV3QWxsVGV4dDogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IG5vZGVUaXRsZSA9IHRoaXMubm9kZS50aXRsZSB8fCB0aGlzLm5vZGUubGlua1RpdGxlO1xuXHRcdFx0aWYgKHRoaXMuJHN0b3JlLnNlYXJjaC5xdWVyeS5pc0ZpbHRlcmVkKCkpIHtcblx0XHRcdFx0cmV0dXJuIGBTZWUgJHt0aGlzLnN0YXRlLnRvdGFsUGFnZUNvdW50fSBNYXRjaGluZyAke25vZGVUaXRsZX0gR3VpZGVzYDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBgU2VlIEFsbCAke3RoaXMuc3RhdGUudG90YWxQYWdlQ291bnR9ICR7bm9kZVRpdGxlfSBHdWlkZXNgO1xuXHRcdH0sXG5cblx0XHRpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuXHRcdFx0ZGVidWcoJ2luaXQnLCB0aGlzLm5vZGUuaHJlZik7XG5cdFx0XHR0ZW1wbGF0ZXMgPSB7XG5cdFx0XHRcdHRlbXBsYXRlTm9kZTogdGhpcy4kcmVmc1sndGVtcGxhdGVOb2RlJ10sXG5cdFx0XHRcdHRlbXBsYXRlTm9kZVBhZ2VzOiB0aGlzLiRyZWZzWyd0ZW1wbGF0ZU5vZGVQYWdlcyddLFxuXHRcdFx0XHR0ZW1wbGF0ZU5vZGVQYWdlc0Zvb3RlcjogdGhpcy4kcmVmc1sndGVtcGxhdGVOb2RlUGFnZXNGb290ZXInXSxcblx0XHRcdH07XG5cblx0XHRcdHRoaXMub25SZW5kZXJzLnB1c2goKGUpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUucGFnZXNMb2FkZWQpIHtcblx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIGFjdGl2ZSBwYWdlLlxuXHRcdFx0XHRcdHRoaXMuc3RhdGUucGFnZXMuZm9yRWFjaCgocCkgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IGFjdGl2ZSA9IGlzQWN0aXZlUGFnZShwKTtcblx0XHRcdFx0XHRcdGlmIChwLmFjdGl2ZSAhPT0gYWN0aXZlKSB7XG5cdFx0XHRcdFx0XHRcdHAuYWN0aXZlID0gYWN0aXZlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy4kd2F0Y2goJ25vZGUub3BlbicsICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRkZWJ1Zygnd2F0Y2ggbm9kZS5vcGVuJywgdGhpcy5ub2RlLmhyZWYsIHZhbHVlKTtcblx0XHRcdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRcdFx0dGhpcy5oeWRyYXRlTm9kZUlmTmVlZGVkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQXZvaWQgZG9pbmcgc2VhcmNoZXMgZm9yIHBhZ2VzIHdoZW4gdGhlIG5vZGUgaXMgY2xvc2VkLlxuXHRcdFx0XHRcdC8vIFNlYXJjaGluZyB3aWxsIGJlIHJlc3RhcnRlZCB3aGVuIHRoZSBub2RlIGlzIG9wZW5lZCBhZ2Fpbi5cblx0XHRcdFx0XHR0aGlzLnN0YXRlLnBhZ2VTZWFyY2hBY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLm5vZGUub3Blbikge1xuXHRcdFx0XHRcdHRoaXMuaHlkcmF0ZU5vZGVJZk5lZWRlZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0dG9nZ2xlT3BlbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZGVidWcoJ3RvZ2dsZU9wZW4nLCB0aGlzLm5vZGUuaHJlZiwgdGhpcy5ub2RlLm9wZW4sIHRoaXMuc3RhdGUuaHlkcmF0ZWQpO1xuXHRcdFx0dGhpcy5oeWRyYXRlTm9kZUlmTmVlZGVkKCk7XG5cdFx0XHR0aGlzLm5vZGUub3BlbiA9ICF0aGlzLm5vZGUub3BlbiAmJiB0aGlzLm5vZGUuY291bnQgPiAwO1xuXHRcdFx0aWYgKHRoaXMubm9kZS5vcGVuKSB7XG5cdFx0XHRcdG9wZW5Ob2RlQW5kQ2xvc2VUaGVPdGhlcnModGhpcy5ub2RlLCB0aGlzLmV4cGxvcmVyLmZhY2V0cyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNob3dTdGF0aWNMZWFmTm9kZXM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIEtlZXAgaXQgc3RhdGljIHVudGlsIGl0IGlzbid0LlxuXHRcdFx0cmV0dXJuICF0aGlzLnN0YXRlLnBhZ2VzTG9hZGVkO1xuXHRcdH0sXG5cblx0XHRvbkNsaWNrOiBmdW5jdGlvbiAoZSwgcCA9IG51bGwpIHtcblx0XHRcdGxldCBoaXQgPSBudWxsO1xuXHRcdFx0aWYgKHApIHtcblx0XHRcdFx0aGl0ID0gcC5oaXQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoaXQgPSB0aGlzLm5vZGUuaGl0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaGl0KSB7XG5cdFx0XHRcdC8vIFNlbmQgY2xpY2sgZXZlbnRzIHRvIEFsZ29saWEgaW5zaWdodHMuXG5cdFx0XHRcdHRoaXMuJHN0b3JlLm5hdi5hbmFseXRpY3MuaGFuZGxlci5jbGlja0hpdChoaXQsICdET0NTOiBFeHBsb3JlcicpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXROb2Rlc1NlY3Rpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldEZhY2V0c0Zvcih0aGlzLm5vZGUpO1xuXHRcdH0sXG5cblx0XHRhY3RpdmF0ZVBhZ2VTZWFyY2hJZk5lZWRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZGVidWcoJ2FjdGl2YXRlUGFnZVNlYXJjaElmTmVlZGVkJywgdGhpcy5ub2RlLmhyZWYsIHRoaXMuc3RhdGUucGFnZVNlYXJjaEFjdGl2ZSk7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5wYWdlU2VhcmNoQWN0aXZlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuc3RhdGUucGFnZVNlYXJjaEFjdGl2ZSA9IHRydWU7XG5cdFx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cdFx0XHRsZXQgZmFjdG9yeSA9IHtcblx0XHRcdFx0c3RhdHVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuc3RhdGUucGFnZVNlYXJjaEFjdGl2ZSA/IFJlcXVlc3RDYWxsQmFja1N0YXR1cy5PbiA6IFJlcXVlc3RDYWxsQmFja1N0YXR1cy5PZmY7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNyZWF0ZTogKHF1ZXJ5KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ld1JlcXVlc3RDYWxsYmFjayhcblx0XHRcdFx0XHRcdGNyZWF0ZUV4cGxvcmVyTm9kZVJlcXVlc3Qoc2VhcmNoQ29uZmlnLCBxdWVyeSwgc2VsZi5ub2RlLmtleSksXG5cdFx0XHRcdFx0XHQocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGRlYnVnKCdwYWdlcyByZXN1bHQnLCBzZWxmLm5vZGUuaHJlZiwgcmVzdWx0LmhpdHMubGVuZ3RoKTtcblx0XHRcdFx0XHRcdFx0bGV0IHBhZ2VDb3VudCA9IDA7XG5cdFx0XHRcdFx0XHRcdGxldCBwYWdlcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGhpdCBvZiByZXN1bHQuaGl0cykge1xuXHRcdFx0XHRcdFx0XHRcdHBhZ2VDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChoaXQuZGVwcmVjYXRlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmIChoaXQuaGllcmFyY2h5ICYmIGhpdC5oaWVyYXJjaHkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIHRoZSByZWZlcmVuY2Utc2VjdGlvbi5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEFsbCBwYWdlcyBpbiBhIHNlY3Rpb24gc2hhcmVzIHRoZSBzYW1lIGhyZWYgKHRoZSBzZWN0aW9uKSxcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCB0aGUgYmVzdCBtYXRjaCBpcyBzZWxlY3RlZCB3aGlsZSBzZWFyY2hpbmcgdXNpbmcgQWxnb2xpYSdzIGRpc3RpbmN0IGtleXdvcmQuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIHRoZSBleHBsb3JlciwgYW5kIHdlIG5lZWQgdG8gbGluayB0byB0aGUgZGV0YWlsIHBhZ2UuXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgbGFzdCA9IGhpdC5oaWVyYXJjaHlbaGl0LmhpZXJhcmNoeS5sZW5ndGggLSAxXTtcblx0XHRcdFx0XHRcdFx0XHRcdGhpdC5ocmVmID0gbGFzdC5ocmVmO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8vIFNwbGl0IGhpdC5yZWYgaW50byBwYXRobmFtZSBhbmQgaGFzaC5cblx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIG5lZWRlZCB0byBjb21wYXJlIHdpdGggdGhlIGN1cnJlbnQgbG9jYXRpb24uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gTm90ZSB0aGF0IHRoaXMgaXMgY3VycmVudGx5IG9ubHkgcmVsZXZhbnQgZm9yIHRoZSBBUEkgcGFnZXMuXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHBhdGhuYW1lID0gaGl0LmhyZWY7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGhhc2ggPSAnJztcblx0XHRcdFx0XHRcdFx0XHRsZXQgaGFzaEluZGV4ID0gaGl0LmhyZWYuaW5kZXhPZignIycpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYXRobmFtZSA9IGhpdC5ocmVmLnN1YnN0cmluZygwLCBoYXNoSW5kZXgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aGFzaCA9IGhpdC5ocmVmLnN1YnN0cmluZyhoYXNoSW5kZXgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGxldCBwID0ge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IGhpdC5saW5rVGl0bGUgPyBoaXQubGlua1RpdGxlIDogaGl0LnRpdGxlLFxuXHRcdFx0XHRcdFx0XHRcdFx0bGlua1RpdGxlOiBoaXQubGlua1RpdGxlID8gaGl0LmxpbmtUaXRsZSA6IGhpdC50aXRsZSxcblx0XHRcdFx0XHRcdFx0XHRcdGhyZWY6IGhpdC5ocmVmLFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRwYXRobmFtZTogcGF0aG5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRoYXNoOiBoYXNoLFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3RvcmUgYXdheSB0aGUgb3JpZ2luYWwgaGl0IGZvciBBbGdvbGlhIGV2ZW50cy5cblx0XHRcdFx0XHRcdFx0XHRcdGhpdDogaGl0LFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0XHRwLmFjdGl2ZSA9IGlzQWN0aXZlUGFnZShwKTtcblxuXHRcdFx0XHRcdFx0XHRcdHBhZ2VzLnB1c2gocCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRwYWdlcy5zb3J0KGl0ZW1zQ29tcGFyZXIpO1xuXHRcdFx0XHRcdFx0XHRzZWxmLnN0YXRlLnRvdGFsUGFnZUNvdW50ID0gcGFnZUNvdW50O1xuXHRcdFx0XHRcdFx0XHRzZWxmLnN0YXRlLnBhZ2VzID0gcGFnZXM7XG5cdFx0XHRcdFx0XHRcdHNlbGYuc3RhdGUucGFnZXNMb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cHJvbnRvOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRxdWVyeTogcXVlcnksXG5cdFx0XHRcdFx0XHRcdGZpbGVDYWNoZUlEOiBzZWxmLm5vZGUua2V5LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fTtcblx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5hZGRTZWFyY2hlcyhuZXdSZXF1ZXN0Q2FsbGJhY2tGYWN0b3J5VGFyZ2V0KGZhY3RvcnksIFNlYXJjaEdyb3VwSWRlbnRpZmllci5NYWluKSk7XG5cdFx0fSxcblxuXHRcdGh5ZHJhdGVOb2RlSWZOZWVkZWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLmRlc3Ryb3llZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXRoaXMuc3RhdGUuaHlkcmF0ZWQpIHtcblx0XHRcdFx0ZGVidWcoJ2h5ZHJhdGVOb2RlSWZOZWVkZWQnLCB0aGlzLm5vZGUuaHJlZik7XG5cdFx0XHRcdHRoaXMuaHlkcmF0ZU5vZGUoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlYnVnKCdoeWRyYXRlTm9kZUlmTmVlZGVkLmFscmVhZHkgaHlkcmF0ZWQnLCB0aGlzLm5vZGUuaHJlZik7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYWN0aXZhdGVQYWdlU2VhcmNoSWZOZWVkZWQoKTtcblx0XHR9LFxuXG5cdFx0aHlkcmF0ZU5vZGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGRlYnVnKCdoeWRyYXRlTm9kZScsIHRoaXMubm9kZS5ocmVmKTtcblx0XHRcdGxldCBzZWxmID0gdGhpcztcblx0XHRcdHRoaXMuc3RhdGUuaHlkcmF0ZWQgPSB0cnVlO1xuXG5cdFx0XHRjb25zdCBub2RlRWxlbWVudCA9IHRoaXMuJHJlZnNbJ25vZGUtdHJlZSddO1xuXG5cdFx0XHRsZXQgbm9kZVRlbXBsYXRlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZXMudGVtcGxhdGVOb2RlLmNvbnRlbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKSwgdHJ1ZSk7XG5cdFx0XHRsZXQgbm9kZVBhZ2VzVGVtcGxhdGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlcy50ZW1wbGF0ZU5vZGVQYWdlcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ3RlbXBsYXRlJyksIHRydWUpO1xuXHRcdFx0bGV0IG5vZGVQYWdlc1RlbXBsYXRlRm9vdGVyID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcblx0XHRcdFx0dGVtcGxhdGVzLnRlbXBsYXRlTm9kZVBhZ2VzRm9vdGVyLmNvbnRlbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdCk7XG5cblx0XHRcdC8vIEZpcnN0IGFwcGVuZCB0aGUgbGVhZiBub2Rlcy5cblx0XHRcdG5vZGVFbGVtZW50LmFwcGVuZENoaWxkKG5vZGVQYWdlc1RlbXBsYXRlKTtcblx0XHRcdC8vIFRoZW4gYXBwZW5kIHRoZSBicmFuY2ggbm9kZXMuXG5cdFx0XHRub2RlRWxlbWVudC5hcHBlbmRDaGlsZChub2RlVGVtcGxhdGUpO1xuXHRcdFx0Ly8gQW5kIGZpbmFsbHkgdGhlIGZvb3Rlci5cblx0XHRcdG5vZGVFbGVtZW50LmFwcGVuZENoaWxkKG5vZGVQYWdlc1RlbXBsYXRlRm9vdGVyKTtcblx0XHR9LFxuXHR9O1xuXG5cdHJldHVybiBjdHJsO1xufVxuXG5jb25zdCBmaW5kQ2hpbGRyZW4gPSBmdW5jdGlvbiAoaHJlZiwgbm9kZXMpIHtcblx0bGV0IGNoaWxkcmVuID0gW107XG5cblx0Ly8gTm9kZXMgYXJlIHNvcnRlZCBieSBocmVmLCBzbyB3ZSBjYW4gdXNlIGEgYmluYXJ5IHNlYXJjaC5cblx0bGV0IGluZGV4ID0gbm9kZXMuZmluZEluZGV4KChuKSA9PiBuLmhyZWYgPT09IGhyZWYpO1xuXHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuO1xuXHR9XG5cblx0Ly8gTm93IGZpbmQgYWxsIGNoaWxkcmVuIG9uZSBsZXZlbCBkb3duLlxuXHRsZXQgbGV2ZWwgPSBub2Rlc1tpbmRleF0ubGV2ZWw7XG5cdGxldCBjaGlsZCA9IG5vZGVzW2luZGV4ICsgMV07XG5cdHdoaWxlIChjaGlsZCAmJiBjaGlsZC5ocmVmLnN0YXJ0c1dpdGgoaHJlZikpIHtcblx0XHRpZiAoY2hpbGQubGV2ZWwgPT09IGxldmVsICsgMSkge1xuXHRcdFx0Y2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0Y2hpbGQgPSBub2Rlc1tpbmRleCArIDFdO1xuXHR9XG5cdHJldHVybiBjaGlsZHJlbjtcbn07XG5cbmNvbnN0IG9wZW5Ob2RlQW5kQ2xvc2VUaGVPdGhlcnMgPSBmdW5jdGlvbiAobm9kZSwgbm9kZXMpIHtcblx0ZGVidWdEZXYoJ29wZW5Ob2RlQW5kQ2xvc2VUaGVPdGhlcnMnLCBub2RlLmhyZWYpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IG4gPSBub2Rlc1tpXTtcblx0XHRpZiAobm9kZS5ocmVmLnN0YXJ0c1dpdGgobi5ocmVmKSkge1xuXHRcdFx0bi5vcGVuID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bi5vcGVuID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChuLm9wZW4pIHtcblx0XHRcdGRlYnVnRGV2KCdvcGVuTm9kZUFuZENsb3NlVGhlT3RoZXJzLm9wZW4nLCBuLmhyZWYpO1xuXHRcdH1cblx0fVxufTtcblxuY29uc3QgY2xvc2VMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCwgbm9kZXMpIHtcblx0ZGVidWcoJ2Nsb3NlTGV2ZWwnLCBsZXZlbCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbiA9IG5vZGVzW2ldO1xuXHRcdGlmIChuLm9wZW4gJiYgbi5sZXZlbCA9PT0gbGV2ZWwpIHtcblx0XHRcdG4ub3BlbiA9IGZhbHNlO1xuXHRcdH1cblx0fVxufTtcblxuY29uc3QgdXBkYXRlRmFjZXRTdGF0ZSA9IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuXHQvLyBmcm9tIGlzIGEgc3Vic2V0IG9mIHRvLlxuXHQvLyBJZiBhIG5vZGUgaW4gZnJvbSBpcyBub3QgZm91bmQgaW4gdG8sIGRpc2FibGUgaXQuXG5cdC8vIEZvciBtYXRjaGVzLCB1cGRhdGUgY291bnQuXG5cdC8vIEZvciBub24tbWF0Y2hlcywgc2V0IGNvdW50IHRvIDAuXG5cdGxldCBmcm9tSW5kZXggPSAwO1xuXHRmb3IgKGxldCB0b0luZGV4ID0gMDsgdG9JbmRleCA8IHRvLmxlbmd0aDsgdG9JbmRleCsrKSB7XG5cdFx0bGV0IHRvTm9kZSA9IHRvW3RvSW5kZXhdO1xuXHRcdGlmICh0b05vZGUuY291bnQgPCAwKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0bGV0IGZyb21Ob2RlID0gbnVsbDtcblx0XHRpZiAodG9JbmRleCA+PSBmcm9tLmxlbmd0aCkge1xuXHRcdFx0bGV0IGlkeCA9IGZyb20uZmluZEluZGV4KChuKSA9PiBuLmhyZWYgPT09IHRvTm9kZS5ocmVmKTtcblx0XHRcdGlmIChpZHggIT09IC0xKSB7XG5cdFx0XHRcdGZyb21Ob2RlID0gZnJvbVtpZHhdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFmcm9tTm9kZSkge1xuXHRcdFx0XHR0b05vZGUuY291bnQgPSAwO1xuXHRcdFx0XHR0b05vZGUub3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnJvbU5vZGUgPSBmcm9tW2Zyb21JbmRleF07XG5cdFx0fVxuXG5cdFx0aWYgKHRvTm9kZS5ocmVmID09PSBmcm9tTm9kZS5ocmVmKSB7XG5cdFx0XHR0b05vZGUuY291bnQgPSBmcm9tTm9kZS5jb3VudDtcblx0XHRcdGZyb21JbmRleCsrO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dG9Ob2RlLmNvdW50ID0gMDtcblx0XHR0b05vZGUub3BlbiA9IGZhbHNlO1xuXHR9XG59O1xuXG5jb25zdCBjcmVhdGVFeHBsb3Jlck5vZGVSZXF1ZXN0ID0gZnVuY3Rpb24gKHNlYXJjaENvbmZpZywgcXVlcnksIGtleSkge1xuXHRsZXQgbWF4TGVhZk5vZGVzID0gMjAwOyAvLyBUaGlzIG5lZWRzIHRvIGJpZyBlbm91Z2ggdG8gY292ZXIgdGhlIGJpZ2dlc3Qgc2VjdGlvbi5cblx0bGV0IHNlY3Rpb25GaWx0ZXIgPSBgc2VjdGlvbjoke2tleX1gO1xuXHRsZXQgZmFjZXRGaWx0ZXJzID0gcXVlcnkudG9GYWNldEZpbHRlcnMoKTtcblx0bGV0IGZpbHRlcnMgPSAnJztcblxuXHRyZXR1cm4ge1xuXHRcdGluZGV4TmFtZTogc2VhcmNoQ29uZmlnLmluZGV4TmFtZShzZWFyY2hDb25maWcuc2VjdGlvbnNfbWVyZ2VkLmluZGV4KSxcblx0XHRmaWx0ZXJzOiBmaWx0ZXJzLFxuXHRcdGZhY2V0RmlsdGVyczogZmFjZXRGaWx0ZXJzLmNvbmNhdChmYWNldEZpbHRlcnMsIHNlY3Rpb25GaWx0ZXIpLFxuXHRcdGRpc3RpbmN0OiAwLFxuXHRcdHBhcmFtczogYHF1ZXJ5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5LmxuZHEpfSZoaXRzUGVyUGFnZT0ke21heExlYWZOb2Rlc31gLFxuXHR9O1xufTtcblxuY29uc3QgZ2V0UGFnZUluZm8gPSBmdW5jdGlvbiAoKSB7XG5cdGxldCBpbmZvID0gd2luZG93LmxuUGFnZUluZm87XG5cdGlmICghaW5mbykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGxldCBzZWN0aW9uS2V5ID0gJyc7XG5cdGlmIChpbmZvLnNlY3Rpb25zUGF0aCkge1xuXHRcdC8vIENyZWF0ZSBhIHNlY3Rpb24ga2V5IHRoYXQncyBvbiB0aGUgc2FtZSBmb3JtYXQgYXMgd2hhdCB3ZSBoYXZlIGluIEFsZ29saWEuXG5cdFx0Y29uc3QgcGFydHMgPSBpbmZvLnNlY3Rpb25zUGF0aC5zcGxpdCgnLycpO1xuXHRcdGNvbnN0IGRlbGltID0gJyA+ICc7XG5cdFx0c2VjdGlvbktleSA9IHBhcnRzLmpvaW4oZGVsaW0pO1xuXHR9XG5cdGluZm8uc2VjdGlvbktleSA9IHNlY3Rpb25LZXk7XG5cblx0cmV0dXJuIGluZm87XG59O1xuXG4vLyBUaGlzIGNvbXBhcmVyIGlzIHVzZWQgdG8gc29ydCBib3RoIHNlY3Rpb25zXG4vLyBhbmQgbGVhZiBub2RlcyBpbiB0aGUgZXhwbG9yZXIgdHJlZS5cbi8vIFRoaXMgZnVuY3Rpb25zIG9yZGVycyBieSAxKSBPcmRpbmFsIDIpIFB1YkRhdGUgb3IgMykgVGl0bGUuXG4vLyBOb3RlOiBUaGUgc29ydCB3YXMgbWFkZSBzaW1wbGVyIHRvIGdldCBpdCBpbiBsaW5lIHdpdGggdGhlIHN0YXRpYyByZW5kZXIsXG4vLyBidXQgdGhlIG9sZCBjb2RlIGlzIGNvbW1lbnRlZCBvdXQgaWYgd2Ugd2FudCB0byByZXZlcnQgaXQgbGF0ZXIuXG5jb25zdCBpdGVtc0NvbXBhcmVyID0gZnVuY3Rpb24gKGEsIGIpIHtcblx0cmV0dXJuIGEubGlua1RpdGxlLmxvY2FsZUNvbXBhcmUoYi5saW5rVGl0bGUpO1xuXHQvKlxuXHRpZiAoYS5vcmRpbmFsID09PSBiLm9yZGluYWwpIHtcblx0XHRpZiAoYS5maXJzdFB1Ymxpc2hlZFRpbWUgPT09IGIuZmlyc3RQdWJsaXNoZWRUaW1lKSB7XG5cdFx0XHRsZXQgYXRpdGxlID0gYS5saW5rVGl0bGUgfHwgYS50aXRsZTtcblx0XHRcdGxldCBidGl0bGUgPSBiLmxpbmtUaXRsZSB8fCBiLnRpdGxlO1xuXHRcdFx0cmV0dXJuIGF0aXRsZSA8IGJ0aXRsZSA/IC0xIDogMTtcblx0XHR9XG5cdFx0Ly8gU29ydCBuZXdlc3QgZmlyc3QuXG5cdFx0cmV0dXJuIGEuZmlyc3RQdWJsaXNoZWRUaW1lID4gYi5maXJzdFB1Ymxpc2hlZFRpbWUgPyAtMSA6IDE7XG5cdH1cblx0cmV0dXJuIGEub3JkaW5hbCAtIGIub3JkaW5hbDtcblx0Ki9cbn07XG4iLCAiY29uc3QgbGlub2RlRG90Q29tID0gJ2h0dHBzOi8vd3d3LnNpdGViYXkub3JnJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExhbmdUb0xpbmtzKGxhbmcsIGNvbnRhaW5lcikge1xuXHRpZiAoIWNvbnRhaW5lcikge1xuXHRcdHJldHVybjtcblx0fVxuXHRsZXQgbGlua3MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGxpbmsgPSBsaW5rc1tpXTtcblxuXHRcdGxldCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRpZiAoIWhyZWYgfHwgaHJlZi5zdGFydHNXaXRoKGAke2xpbm9kZURvdENvbX0vJHtsYW5nfS9gKSkge1xuXHRcdFx0Ly8gTGFuZ3VhZ2UgYWxyZWFkeSBwcmVzZW50LlxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGxldCBocmVmV2l0aExhbmcgPSBhZGRMYW5nVG9IcmVmKGhyZWYsIGxhbmcpO1xuXHRcdGlmIChocmVmID09PSBocmVmV2l0aExhbmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWZXaXRoTGFuZyk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExhbmdUb0hyZWYoaHJlZiwgbGFuZykge1xuXHRpZiAoIShocmVmICYmIGhyZWYuc3RhcnRzV2l0aChgJHtsaW5vZGVEb3RDb219YCkpKSB7XG5cdFx0cmV0dXJuIGhyZWY7XG5cdH1cblx0bGV0IHVybCA9IG5ldyBVUkwoaHJlZik7XG5cdGxldCBwYXRoRXhjbHVkZVJlID0gLyhcXC9kb2NzXFwvfFxcL2NvbW11bml0eVxcL3F1ZXN0aW9uc1xcL3xcXC93cC1jb250ZW50XFwvKS87XG5cdGlmIChwYXRoRXhjbHVkZVJlLnRlc3QodXJsLnBhdGhuYW1lKSkge1xuXHRcdHJldHVybiBocmVmO1xuXHR9XG5cblx0aWYgKHVybC5wYXRobmFtZSA9PSAnLycpIHtcblx0XHRyZXR1cm4gYCR7aHJlZn0ke2xhbmd9L2A7XG5cdH1cblxuXHRyZXR1cm4gaHJlZi5yZXBsYWNlKHVybC5wYXRobmFtZSwgYC8ke2xhbmd9JHt1cmwucGF0aG5hbWV9YCk7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBnZXRDdXJyZW50TGFuZ0Zyb21Mb2NhdGlvbiB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbnZhciBkZWJ1ZyA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbbGFuZ3VhZ2Utc3dpdGNoZXJdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0xhbmd1YWdlU3dpdGNoZXJDb250cm9sbGVyKHdlZ2xvdF9hcGlfa2V5KSB7XG5cdGRlYnVnKCduZXdMYW5ndWFnZVN3aXRjaGVyQ29udHJvbGxlcicpO1xuXHRjb25zdCBpbml0QW5kU3dpdGNoVG8gPSBmdW5jdGlvbiAoc2VsZikge1xuXHRcdGxldCBsYW5nID0gc2VsZi5jdXJyZW50TGFuZztcblx0XHRzZWxmLiRzdG9yZS5uYXYubGFuZyA9IGxhbmc7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHQvLyBXZSBuYXZpZ2F0ZSB3aXRoIFR1cmJvLCBidXQgd2UgbmVlZCB0byBpbml0aWFsaXplIFdlZ2xvdCBvbiBlYWNoXG5cdFx0XHQvLyBwYWdlIGxvYWQuXG5cdFx0XHRXZWdsb3QuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblx0XHRcdFdlZ2xvdC5vbignaW5pdGlhbGl6ZWQnLCAoKSA9PiB7XG5cdFx0XHRcdGRlYnVnKCdXZWdsb3QgaW5pdGlhbGl6ZWQnKTtcblx0XHRcdFx0V2VnbG90LnN3aXRjaFRvKGxhbmcpO1xuXHRcdFx0fSk7XG5cdFx0XHRpbml0V2VnbG90KHdlZ2xvdF9hcGlfa2V5KTtcblx0XHR9LCA2MDApO1xuXHR9O1xuXG5cdC8vIFRoaXMgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbiB0byBnZXQgdGhlICRwZXJzaXN0IGJpbmRlZC5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2hvdzogdHJ1ZSxcblx0XHRcdG9wZW46IGZhbHNlLFxuXHRcdFx0Y3VycmVudExhbmc6IHRoaXMuJHBlcnNpc3QoJ2VuJyksXG5cdFx0XHRsYW5ndWFnZXM6IFtcblx0XHRcdFx0eyBsYW5nOiAnZW4nLCBuYW1lOiAnRW5nbGlzaCcgfSxcblx0XHRcdFx0eyBsYW5nOiAnZXMnLCBuYW1lOiAnRXNwYVx1MDBGMW9sJyB9LFxuXHRcdFx0XSxcblxuXHRcdFx0aW5pdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkZWJ1ZygnaW5pdCBsYW5ndWFnZScpO1xuXHRcdFx0XHRjb25zdCBsYW5nUGFyYW0gPSBnZXRDdXJyZW50TGFuZ0Zyb21Mb2NhdGlvbigpO1xuXHRcdFx0XHRpZiAobGFuZ1BhcmFtKSB7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50TGFuZyA9IGxhbmdQYXJhbTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghdGhpcy5pc0RlZmF1bHRMYW5ndWFnZSgpKSB7XG5cdFx0XHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuXHRcdFx0XHRcdFx0aW5pdEFuZFN3aXRjaFRvKHRoaXMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRzd2l0Y2hMYW5ndWFnZTogZnVuY3Rpb24gKGxhbmcpIHtcblx0XHRcdFx0aWYgKCFsYW5nIHx8IGxhbmcgPT09IHRoaXMuY3VycmVudExhbmcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gRG8gYSBmdWxsIHJlZnJlc2ggdG8gbWFrZSBzdXJlIGFsbCBsaW5rcyBldGMuIGdldHMgdXBkYXRlZGQuXG5cdFx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsYW5nPScpKSB7XG5cdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnNlYXJjaCA9IGBsYW5nPSR7bGFuZ31gO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKz0gYCZsYW5nPSR7bGFuZ31gO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRjdXJyZW50TGFuZ3VhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubGFuZ3VhZ2VzLmZpbmQoKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5sYW5nID09PSB0aGlzLmN1cnJlbnRMYW5nO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRsYW5ndWFnZUlEczogZnVuY3Rpb24gKHByZWZpeCkge1xuXHRcdFx0XHQvL0Egc3RyaW5nIG9mIGxhbmd1YWdlIElEcyBwcmVmaXhlZCB3aXRoIHRoZSBnaXZlbiBwcmVmaXggc2VwYXJhdGVkIGJ5IHNwYWNlcy5cblx0XHRcdFx0bGV0IHMgPSAnJztcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHMgKz0gcHJlZml4ICsgdGhpcy5sYW5ndWFnZXNbaV0ubGFuZztcblx0XHRcdFx0XHRpZiAoaSA8IHRoaXMubGFuZ3VhZ2VzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHRcdHMgKz0gJyAnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH0sXG5cdFx0XHRpc0RlZmF1bHRMYW5ndWFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jdXJyZW50TGFuZyA9PT0gJ2VuJztcblx0XHRcdH0sXG5cdFx0fTtcblx0fTtcbn1cblxuZnVuY3Rpb24gaW5pdFdlZ2xvdChhcGlLZXkpIHtcblx0ZGVidWcoJ2luaXRXZWdsb3QnKTtcblx0Ly8gSW5pdGlhbGl6YXRpb24gb2YgV2VnbG90LlxuXHRXZWdsb3QuaW5pdGlhbGl6ZSh7XG5cdFx0YXBpX2tleTogYXBpS2V5LFxuXHRcdGhpZGVfc3dpdGNoZXI6IHRydWUsXG5cdH0pO1xufVxuIiwgImltcG9ydCB7IGdldEN1cnJlbnRMYW5nLCB0b0RhdGVTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuaW1wb3J0IHsgTFJVTWFwIH0gZnJvbSAnLi4vaGVscGVycy9scnUnO1xuaW1wb3J0IHsgYWRkTGFuZ1RvSHJlZiwgbmV3Q3JlYXRlSHJlZiB9IGZyb20gJy4uL25hdmlnYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgbmV3UXVlcnksIFF1ZXJ5SGFuZGxlciB9IGZyb20gJy4vcXVlcnknO1xuaW1wb3J0IHtcblx0bmV3UmVxdWVzdENhbGxiYWNrLFxuXHRuZXdSZXF1ZXN0Q2FsbGJhY2tGYWN0b3JpZXMsXG5cdG5ld1JlcXVlc3RDYWxsYmFja0ZhY3RvcnlUYXJnZXQsXG5cdFJlcXVlc3RDYWxsQmFja1N0YXR1cyxcblx0U2VhcmNoR3JvdXBJZGVudGlmaWVyLFxufSBmcm9tICcuL3JlcXVlc3QnO1xuXG5jb25zdCBkZWJ1ZyA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbc2VhcmNoLXN0b3JlXScpIDogZnVuY3Rpb24gKCkge307XG5jb25zdCBkZWJ1Z0RldiA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbc2VhcmNoLXN0b3JlXScpIDogZnVuY3Rpb24gKCkge307XG5jb25zdCBkZWJ1Z0ZldGNoID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tzZWFyY2gtZmV0Y2hdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuY29uc3QgY3JlYXRlU2VjdGlvbkZhY2V0c1NvcnRlZCA9IGZ1bmN0aW9uIChzZWFyY2hDb25maWcsIHJlc3VsdCkge1xuXHRpZiAoIXJlc3VsdC5mYWNldHMpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0bGV0IG5vZGVzID0gW107XG5cdGxldCBzZWN0aW9ucyA9IHNlYXJjaENvbmZpZy5zZWN0aW9ucztcblxuXHQvLyBTZWN0aW9uIGZhY2V0cyBhcmUgbmFtZWQgc2VjdGlvbi5sdmxuIHdoZXJlIG4gaXMgMCB0byAzLlxuXHRmb3IgKGxldCBpID0gMDsgOyBpKyspIHtcblx0XHRsZXQga2V5ID0gYHNlY3Rpb24ubHZsJHtpfWA7XG5cdFx0bGV0IHNlY3Rpb25GYWNldCA9IHJlc3VsdC5mYWNldHNba2V5XTtcblx0XHRpZiAoIXNlY3Rpb25GYWNldCkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgayBpbiBzZWN0aW9uRmFjZXQpIHtcblx0XHRcdGxldCBwYXJ0cyA9IGsuc3BsaXQoJyA+ICcpO1xuXHRcdFx0bGV0IGZpcnN0ID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmICghKGZpcnN0IGluIHNlY3Rpb25zKSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdGxldCBsYXN0ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG5cdFx0XHRsZXQgdGl0bGUgPSBsYXN0LnJlcGxhY2UoJy0nLCAnICcpO1xuXHRcdFx0Ly8gRmlyc3QgbGV0dGVyIHVwcGVyIGNhc2UuXG5cdFx0XHR0aXRsZSA9IHRpdGxlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGl0bGUuc2xpY2UoMSk7XG5cdFx0XHRsZXQgaHJlZiA9IGAvZG9jcy8ke3BhcnRzLmpvaW4oJy8nKS50b0xvd2VyQ2FzZSgpfS9gO1xuXHRcdFx0bGV0IG5vZGUgPSB7XG5cdFx0XHRcdGhyZWY6IGhyZWYsXG5cdFx0XHRcdGtleTogayxcblx0XHRcdFx0bGV2ZWw6IGkgKyAxLFxuXHRcdFx0XHR0aXRsZTogdGl0bGUsXG5cdFx0XHRcdGNvdW50OiBzZWN0aW9uRmFjZXRba10sXG5cdFx0XHRcdG9wZW46IGZhbHNlLFxuXHRcdFx0fTtcblx0XHRcdG5vZGVzLnB1c2gobm9kZSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gU29ydCBieSBocmVmLlxuXHRub2Rlcy5zb3J0KChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIGEuaHJlZiA8IGIuaHJlZiA/IC0xIDogMTtcblx0fSk7XG5cdHJldHVybiBub2Rlcztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdTZWFyY2hTdG9yZShzZWFyY2hDb25maWcsIHBhcmFtcywgQWxwaW5lKSB7XG5cdGxldCBjYWNoZVdhcm1lclVybHMgPSBwYXJhbXMuc2VhcmNoX2NhY2hld2FybWVyX3VybHM7XG5cblx0bGV0IHNldFJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQsIGxvYWRlZCA9IHRydWUpIHtcblx0XHRsZXQgZmFjZXRzID0gY3JlYXRlU2VjdGlvbkZhY2V0c1NvcnRlZChzZWFyY2hDb25maWcsIHJlc3VsdCk7XG5cdFx0dGhpcy5zZWN0aW9uRmFjZXRzID0gZmFjZXRzO1xuXHRcdHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuXHRcdHRoaXMubG9hZGVkID0gbG9hZGVkO1xuXHR9O1xuXG5cdGxldCByZXN1bHRzID0ge1xuXHRcdGJsYW5rOiB7IGxvYWRlZDogZmFsc2UsIHNldDogc2V0UmVzdWx0IH0sXG5cdFx0bWFpbjogeyBsb2FkZWQ6IGZhbHNlLCBzZXQ6IHNldFJlc3VsdCB9LFxuXHRcdGV4cGxvcmVyRGF0YTogeyBsb2FkZWQ6IGZhbHNlIH0sXG5cdFx0Ly8gSG9sZHMgdGhlIGxhc3QgQWxnb2xpYSBxdWVyeUlELlxuXHRcdGxhc3RRdWVyeUlEOiAnJyxcblx0fTtcblxuXHRjb25zdCByZXN1bHRDYWxsYmFjayA9IChyZXN1bHQpID0+IHtcblx0XHRpZiAoIXJlc3VsdC5xdWVyeUlEKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHJlc3VsdHMubGFzdFF1ZXJ5SUQgPSByZXN1bHQucXVlcnlJRDtcblx0fTtcblxuXHRjb25zdCBzZWFyY2hlciA9IG5ldyBTZWFyY2hlcihzZWFyY2hDb25maWcsIHJlc3VsdHMuYmxhbmssIGNhY2hlV2FybWVyVXJscywgcmVzdWx0Q2FsbGJhY2ssIGRlYnVnKTtcblx0bGV0IHNlYXJjaEVmZmVjdE1haW4gPSBudWxsO1xuXHRjb25zdCByb3V0ZXIgPSBuZXdDcmVhdGVIcmVmKHNlYXJjaENvbmZpZyk7XG5cdGNvbnN0IHF1ZXJ5SGFuZGxlciA9IG5ldyBRdWVyeUhhbmRsZXIoKTtcblxuXHRsZXQgc3RvcmUgPSB7XG5cdFx0Ly8gVGhpcyBpcyB0aGUgb25seSBxdWVyeSBpbnN0YW5jZS4gV2hlbiBzZWFyY2ggaXMgYWN0aXZlLCBhbnkgY2hhbmdlIHRvIHRoaXMgd2lsbCB0cmlnZ2VyIGEgbmV3IHNlYXJjaCBmb3Igc2VhcmNoR3JvdXBNYWluLlxuXHRcdHF1ZXJ5OiBuZXdRdWVyeSgpLFxuXG5cdFx0Ly8gc2VhcmNoR3JvdXBNYWluIGhvbGRzIHRoZSBtYWluIHNlYXJjaCBhbmQgb3RoZXJzIHRoYXQgc2hvdWxkIHJlYWN0IHRvIGNoYW5nZXNcblx0XHQvLyB0byB0aGUgcXVlcnkgZmlsdGVycy5cblx0XHRzZWFyY2hHcm91cE1haW46IG5ld1JlcXVlc3RDYWxsYmFja0ZhY3RvcmllcygpLFxuXG5cdFx0Ly8gc2VhcmNoR3JvdXBBZEhvYyBob2xkcywgdHlwaWNhbGx5LCBvbmUgdGltZSBxdWVyaWVzIG5lZWRlZCB0byBmZXRjaFxuXHRcdC8vIGRhdGEgZm9yIHRoZSBob21lIHBhZ2UgZXRjLlxuXHRcdHNlYXJjaEdyb3VwQWRIb2M6IG5ld1JlcXVlc3RDYWxsYmFja0ZhY3RvcmllcygpLFxuXG5cdFx0Ly8gVGhlIGJsYW5rIChuZWVkZWQgZm9yIHRoZSBleHBsb3JlciBhbmQgc2VjdGlvbiBtZXRhZGF0YSkgYW5kIHRoZSBtYWluIHNlYXJjaCByZXN1bHQuXG5cdFx0cmVzdWx0czogcmVzdWx0cyxcblxuXHRcdC8vIFNlYXJjaCByZWxhdGVkIHN0YXRlIGZvciB0aGUgZXhwbG9yZXIgdGhhdCBzaG91bGQgc3Vydml2ZSBuYXZpZ2F0aW9uLlxuXHRcdGV4cGxvcmVyOiB7XG5cdFx0XHQvLyBTaWduYWwgdGhhdCB3ZSBuZWVkIHRvIHNob3cgdGhlIGh5ZHJhdGVkL2R5bmFtaWMgZXhwbG9yZXIuXG5cdFx0XHRzaG93SHlkcmF0ZWRFeHBsb3JlcjogZmFsc2UsXG5cblx0XHRcdC8vIFNpZ25hbCB0aGF0IHRoZSBhYm92ZSBpcyBhIHBlcm1hbmVudCBzdGF0ZS5cblx0XHRcdHNob3dBbHdheXNIeWRyYXRlZEV4cGxvcmVyOiBmYWxzZSxcblxuXHRcdFx0Ly8gU2lnbmFsIHRoYXQgdGhlIGV4cGxvcmVyIGhhcyBiZWVuIGh5ZHJhdGVkLlxuXHRcdFx0aHlkcmF0ZWQ6IGZhbHNlLFxuXG5cdFx0XHQvLyBBIHN0YWNrIG9mIGtleS9vcGVuIHBhaXJzIHRvIGJlIG9wZW5lZCBvciBjbG9zZWQuXG5cdFx0XHRrZXlPcGVuU3RhY2s6IFtdLFxuXHRcdH0sXG5cblx0XHRkb2NzZWFyY2hMaW5rOiBmdW5jdGlvbiAoZHMpIHtcblx0XHRcdHJldHVybiBgaHR0cHM6Ly9kb2NzZWFyY2guYWthbWFpLmNvbS9zL2dsb2JhbC1zZWFyY2gvJHt0aGlzLnF1ZXJ5LmxuZHF9P3M9QWthbWFpJTIwVGVjaERvY3MmZHM9JHtkc31gO1xuXHRcdH0sXG5cblx0XHRzaG91bGRTaG93SHlkcmF0ZWRFeHBsb3JlcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZXhwbG9yZXIuc2hvd0h5ZHJhdGVkRXhwbG9yZXIgfHwgdGhpcy5xdWVyeS5pc0ZpbHRlcmVkKCk7XG5cdFx0fSxcblxuXHRcdHNob3VsZFNob3dIeWRyYXRlZEV4cGxvcmVyQW5kSXNIeWRyYXRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZXhwbG9yZXIuaHlkcmF0ZWQgJiYgdGhpcy5zaG91bGRTaG93SHlkcmF0ZWRFeHBsb3JlcigpO1xuXHRcdH0sXG5cblx0XHRjbGVhclF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnF1ZXJ5ID0gbmV3UXVlcnkoKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlTG9jYXRpb25XaXRoUXVlcnkoKSB7XG5cdFx0XHRsZXQgc2VhcmNoID0gcXVlcnlIYW5kbGVyLnF1ZXJ5QW5kTG9jYXRpb25Ub1F1ZXJ5U3RyaW5nKHRoaXMucXVlcnkpO1xuXHRcdFx0aWYgKHNlYXJjaCA9PT0gdGhpcy5zZWFyY2gpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZWFyY2ggPSBzZWFyY2g7XG5cdFx0XHRsZXQgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblx0XHRcdGlmIChzZWFyY2gpIHtcblx0XHRcdFx0aHJlZiArPSAnPycgKyBzZWFyY2g7XG5cdFx0XHR9XG5cdFx0XHRocmVmICs9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG5cdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL2lzc3Vlcy8xNjMjaXNzdWVjb21tZW50LTkzMzY5MTg3OFxuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoeyB0dXJibzoge30gfSwgbnVsbCwgaHJlZik7XG5cdFx0fSxcblxuXHRcdGV4ZWN1dGVCYXRjaCgpIHtcblx0XHRcdHNlYXJjaGVyLmV4ZWN1dGVCYXRjaCgpO1xuXHRcdH0sXG5cblx0XHRhZGRTZWFyY2hlcyguLi5yZXF1ZXN0Q2FsbEJhY2tGYWN0b3J5VGFyZ2V0cykge1xuXHRcdFx0cmVxdWVzdENhbGxCYWNrRmFjdG9yeVRhcmdldHMuZm9yRWFjaCgocmNmKSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAocmNmLnRhcmdldCkge1xuXHRcdFx0XHRcdGNhc2UgU2VhcmNoR3JvdXBJZGVudGlmaWVyLk1haW46XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXJjaEdyb3VwTWFpbi5wdXNoKHJjZi5mYWN0b3J5KTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgU2VhcmNoR3JvdXBJZGVudGlmaWVyLkFkSG9jOlxuXHRcdFx0XHRcdFx0dGhpcy5zZWFyY2hHcm91cEFkSG9jLnB1c2gocmNmLmZhY3RvcnkpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93IGB1bmtub3duIHNlYXJjaCBncm91cCAke3JjZi50YXJnZXR9YDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdGluaXQoKSB7XG5cdFx0XHR0aGlzLnJlc3VsdHMuYmxhbmsuZ2V0U2VjdGlvbk1ldGEgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdGtleSA9IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpLnJlcGxhY2UoLyZhbXA7L2csICcmJyk7XG5cdFx0XHRcdGlmIChrZXkuZW5kc1dpdGgoJy1icmFuY2hlcycpKSB7XG5cdFx0XHRcdFx0a2V5ID0ga2V5LnN1YnN0cmluZygwLCBrZXkuaW5kZXhPZignLWJyYW5jaGVzJykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLm1ldGFSZXN1bHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBzZWN0aW9uQ29uZmlnSWR4ID0gc2VhcmNoQ29uZmlnLnNlY3Rpb25zU29ydGVkLmZpbmRJbmRleCgoc2VjdGlvbikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBzZWN0aW9uLm5hbWUgPT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRsZXQgbSA9IHRoaXMubWV0YVJlc3VsdC5nZXQoa2V5KTtcblx0XHRcdFx0aWYgKCFtICYmIHNlY3Rpb25Db25maWdJZHggIT09IC0xKSB7XG5cdFx0XHRcdFx0bGV0IGluZGV4ID0gc2VhcmNoQ29uZmlnLnNlY3Rpb25zU29ydGVkW3NlY3Rpb25Db25maWdJZHhdO1xuXHRcdFx0XHRcdG0gPSB7IHRpdGxlOiBpbmRleC50aXRsZSwgbGlua1RpdGxlOiBpbmRleC50aXRsZSwgZXhjZXJwdDogJycgfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChtKSB7XG5cdFx0XHRcdFx0bS5vcmRpbmFsID0gc2VjdGlvbkNvbmZpZ0lkeCAhPT0gLTEgPyBzZWN0aW9uQ29uZmlnSWR4ICsgMSA6IG0ub3JkaW5hbDtcblx0XHRcdFx0XHRpZiAoIW0uaHJlZikge1xuXHRcdFx0XHRcdFx0bS5ocmVmID0gcm91dGVyLmhyZWZTZWN0aW9uKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG07XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBzZWFyY2hFZmZlY3RBZEhvYyA9IEFscGluZS5lZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHRkZWJ1Zygnc2VhcmNoRWZmZWN0QWRIb2MnLCB0aGlzLnNlYXJjaEdyb3VwQWRIb2MubGVuZ3RoKTtcblx0XHRcdFx0c2VhcmNoZXIuc2VhcmNoRmFjdG9yaWVzKHRoaXMuc2VhcmNoR3JvdXBBZEhvYywgbnVsbCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5zZWFyY2hJbml0KCk7XG5cdFx0fSxcblx0XHRzZWFyY2hJbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoc2VhcmNoRWZmZWN0TWFpbiA9PT0gbnVsbCkge1xuXHRcdFx0XHQvLyBTdGFydCB3YXRjaGluZy5cblx0XHRcdFx0c2VhcmNoRWZmZWN0TWFpbiA9IEFscGluZS5lZmZlY3QoKCkgPT4ge1xuXHRcdFx0XHRcdHNlYXJjaGVyLnNlYXJjaEZhY3Rvcmllcyh0aGlzLnNlYXJjaEdyb3VwTWFpbiwgdGhpcy5xdWVyeSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2VhcmNoVG9nZ2xlOiBmdW5jdGlvbiAoYWN0aXZlKSB7XG5cdFx0XHRpZiAoYWN0aXZlKSB7XG5cdFx0XHRcdC8vIFRoaXMgd2lsbCBtYWtlIHN1cmUgdG8ga2VlcCB0aGUgYmxhbmsgcmVzdWx0IChuZWVkZWQgYnkgZXhwbG9yZXIgZXRjLikgdXBkYXRlZCB3aXRoIHRoZSBsYXRlc3QgcXVlcnkuXG5cdFx0XHRcdHRoaXMuc2VhcmNoR3JvdXBNYWluLnB1c2goe1xuXHRcdFx0XHRcdHN0YXR1czogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Ly8gV2lsbCBiZSBhY3RpdmUgYXMgbG9uZyBhcyBzZWFyY2hFZmZlY3RNYWluIGlzIGFjdGl2ZSwgYnV0XG5cdFx0XHRcdFx0XHQvLyB0aGUgY2FjaGUgd2lsbCBwcmV2ZW50IG5ldyByZW1vdGUgQWxnb2xpYSByZXF1ZXN0cyBhcyBsb25nXG5cdFx0XHRcdFx0XHQvLyBhcyB0aGUgcXVlcnkgZG9lcyBub3QgY2hhbmdlLlxuXHRcdFx0XHRcdFx0cmV0dXJuIFJlcXVlc3RDYWxsQmFja1N0YXR1cy5Pbjtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNyZWF0ZTogKHF1ZXJ5KSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3UmVxdWVzdENhbGxiYWNrKFxuXHRcdFx0XHRcdFx0XHRjcmVhdGVTZWN0aW9uUmVxdWVzdChxdWVyeSksXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlc3VsdHMubWFpbi5zZXQocmVzdWx0KTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHF1ZXJ5OiBxdWVyeSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHNlYXJjaEVmZmVjdE1haW4uYWN0aXZlID0gYWN0aXZlO1xuXHRcdH0sXG5cdFx0aXNTZWFyY2hpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBzZWFyY2hFZmZlY3RNYWluICYmIHNlYXJjaEVmZmVjdE1haW4uYWN0aXZlO1xuXHRcdH0sXG5cblx0XHR3aXRoRXhwbG9yZXJEYXRhOiBmdW5jdGlvbiAoY2FsbGJhY2sgPSAoZGF0YSkgPT4ge30sIGNyZWF0ZUV4cGxvcmVyTm9kZVJlcXVlc3QsIHNlY3Rpb25LZXlzID0gW10pIHtcblx0XHRcdGlmICh0aGlzLnJlc3VsdHMuZXhwbG9yZXJEYXRhLmxvYWRlZCkge1xuXHRcdFx0XHRjYWxsYmFja1dyYXBwZXIodGhpcy5leHBsb3JlckRhdGEuZGF0YSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGNhbGxiYWNrV3JhcHBlciA9IChkYXRhKSA9PiB7XG5cdFx0XHRcdGRhdGEuYmxhbmsuc2VjdGlvbkZhY2V0cy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0bGV0IG0gPSBkYXRhLmJsYW5rLmdldFNlY3Rpb25NZXRhKHNlY3Rpb24ua2V5KTtcblx0XHRcdFx0XHRpZiAobSkge1xuXHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSB0aXRsZXMgZnJvbSB0aGUgbWV0YSBkYXRhIGluZGV4IGluc3RlYWQgb2YgdGhlIGZhY2V0IG5hbWUuXG5cdFx0XHRcdFx0XHRzZWN0aW9uLnRpdGxlID0gbS50aXRsZTtcblx0XHRcdFx0XHRcdHNlY3Rpb24ubGlua1RpdGxlID0gbS5saW5rVGl0bGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0Y2FsbGJhY2soZGF0YSk7XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLndpdGhCbGFuaygoYmxhbmspID0+IHtcblx0XHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdFx0c2VjdGlvbnM6IHt9LFxuXHRcdFx0XHRcdGJsYW5rOiBibGFuayxcblx0XHRcdFx0fTtcblx0XHRcdFx0aWYgKHNlY3Rpb25LZXlzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrV3JhcHBlcihkYXRhKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IGxvYWRDb3VudCA9IDA7XG5cdFx0XHRcdGxldCBtYXJrTG9hZGVkID0gKCkgPT4ge1xuXHRcdFx0XHRcdGxvYWRDb3VudCsrO1xuXHRcdFx0XHRcdGlmIChsb2FkQ291bnQgPT09IHNlY3Rpb25LZXlzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRzLmV4cGxvcmVyRGF0YS5kYXRhID0gZGF0YTtcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0cy5leHBsb3JlckRhdGEubG9hZGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrV3JhcHBlcihkYXRhKTtcblx0XHRcdFx0XHRcdF9fc3RvcFdhdGNoKCd3aXRoRXhwbG9yZXJEYXRhLmRvbmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRcdGxldCBzZWFyY2hlcyA9IFtdO1xuXHRcdFx0XHRmb3IgKGxldCBzZWN0aW9uS2V5IG9mIHNlY3Rpb25LZXlzKSB7XG5cdFx0XHRcdFx0bGV0IGZhY3RvcnkgPSB7XG5cdFx0XHRcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFJlcXVlc3RDYWxsQmFja1N0YXR1cy5PbmNlO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGNyZWF0ZTogZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdSZXF1ZXN0Q2FsbGJhY2soXG5cdFx0XHRcdFx0XHRcdFx0Y3JlYXRlRXhwbG9yZXJOb2RlUmVxdWVzdChxdWVyeSwgc2VjdGlvbktleSksXG5cdFx0XHRcdFx0XHRcdFx0KHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS5zZWN0aW9uc1tzZWN0aW9uS2V5XSA9IHJlc3VsdDtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtMb2FkZWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHF1ZXJ5OiBxdWVyeSxcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVDYWNoZUlEOiBzZWN0aW9uS2V5LFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0c2VhcmNoZXMucHVzaChuZXdSZXF1ZXN0Q2FsbGJhY2tGYWN0b3J5VGFyZ2V0KGZhY3RvcnksIFNlYXJjaEdyb3VwSWRlbnRpZmllci5BZEhvYykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYWRkU2VhcmNoZXMoLi4uc2VhcmNoZXMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdHdpdGhCbGFuazogYXN5bmMgZnVuY3Rpb24gKGNhbGxiYWNrID0gKCkgPT4ge30pIHtcblx0XHRcdGRlYnVnKCd3aXRoQmxhbmsnKTtcblxuXHRcdFx0aWYgKHRoaXMucmVzdWx0cy5ibGFuay5sb2FkZWQpIHtcblx0XHRcdFx0Y2FsbGJhY2sodGhpcy5yZXN1bHRzLmJsYW5rKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbG9hZENvdW50ID0gMDtcblx0XHRcdGxldCBtYXJrTG9hZGVkID0gKCkgPT4ge1xuXHRcdFx0XHRsb2FkQ291bnQrKztcblx0XHRcdFx0aWYgKGxvYWRDb3VudCA9PT0gMikge1xuXHRcdFx0XHRcdHRoaXMucmVzdWx0cy5ibGFuay5sb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGNhbGxiYWNrKHRoaXMucmVzdWx0cy5ibGFuayk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHNlYXJjaGVyLmJhdGNoZXIuYWRkKFxuXHRcdFx0XHQvLyBMb2FkIHNlY3Rpb24gbWV0YSBkYXRhIGZyb20gQWxnb2xpYS5cblx0XHRcdFx0bmV3UmVxdWVzdENhbGxiYWNrKFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGluZGV4TmFtZTogc2VhcmNoQ29uZmlnLmluZGV4TmFtZShzZWFyY2hDb25maWcubWV0YV9pbmRleCksXG5cdFx0XHRcdFx0XHRwYXJhbXM6ICdxdWVyeT0maGl0c1BlclBhZ2U9NjAwJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRcdGRlYnVnKCd3aXRoQmxhbmsuYmxhbmsubWV0YVJlc3VsdDonLCByZXN1bHQpO1xuXHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRzLmJsYW5rLm1ldGFSZXN1bHQgPSByZXN1bHQuaGl0cy5yZWR1Y2UoZnVuY3Rpb24gKG0sIGhpdCkge1xuXHRcdFx0XHRcdFx0XHQvLyBUaGUgYmxvZyBzZWN0aW9ucyBoYXZlIG1peGVkLWNhc2Ugb2JqZWN0SURzLCBidXQgd2UgbmVlZCB0aGlzIGxvb2t1cCB0byBiZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHRcdFx0XHRcdFx0XHRtLnNldChoaXQub2JqZWN0SUQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8mYW1wOy9nLCAnJicpLCBoaXQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbTtcblx0XHRcdFx0XHRcdH0sIG5ldyBNYXAoKSk7XG5cdFx0XHRcdFx0XHRtYXJrTG9hZGVkKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmaWxlQ2FjaGVJRDogJ3NlY3Rpb25zbWV0YScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0KSxcblx0XHRcdFx0bmV3UmVxdWVzdENhbGxiYWNrKFxuXHRcdFx0XHRcdGNyZWF0ZVNlY3Rpb25SZXF1ZXN0KG51bGwpLFxuXHRcdFx0XHRcdChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRcdGlmICghcmVzdWx0LmluZGV4LmVuZHNXaXRoKCdzaXRlYmF5LW1lcmdlZCcpKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IGBpbnZhbGlkIHN0YXRlOiAke3Jlc3VsdC5pbmRleH1gO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVidWcoJ3dpdGhCbGFuay5ibGFuay5yZXN1bHQ6JywgcmVzdWx0KTtcblx0XHRcdFx0XHRcdHRoaXMucmVzdWx0cy5ibGFuay5zZXQocmVzdWx0LCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRtYXJrTG9hZGVkKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmaWxlQ2FjaGVJRDogJ2V4cGxvcmVyLWJsYW5rJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGNyZWF0ZVNlY3Rpb25SZXF1ZXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG5cdFx0ZGVidWcoJ2NyZWF0ZVNlY3Rpb25SZXF1ZXN0OicsIHF1ZXJ5KTtcblx0XHRsZXQgc2VjdGlvbkNvbmZpZyA9IHNlYXJjaENvbmZpZy5zZWN0aW9uc19tZXJnZWQ7XG5cdFx0bGV0IGZhY2V0cyA9IHNlY3Rpb25Db25maWcuc2VjdGlvbl9mYWNldCA/IFtzZWN0aW9uQ29uZmlnLnNlY3Rpb25fZmFjZXRdIDogWydzZWN0aW9uLionXTtcblx0XHRsZXQgZmlsdGVyaW5nRmFjZXROYW1lcyA9IFtdO1xuXHRcdGlmIChzZWN0aW9uQ29uZmlnLmZpbHRlcmluZ19mYWNldHMpIHtcblx0XHRcdGZpbHRlcmluZ0ZhY2V0TmFtZXMgPSBzZWN0aW9uQ29uZmlnLmZpbHRlcmluZ19mYWNldHMubWFwKChmYWNldCkgPT4gZmFjZXQubmFtZSk7XG5cdFx0XHRmYWNldHMgPSBmYWNldHMuY29uY2F0KGZpbHRlcmluZ0ZhY2V0TmFtZXMpO1xuXHRcdH1cblxuXHRcdGxldCBoaXRzUGVyUGFnZSA9IDA7XG5cdFx0bGV0IHEgPSAnJztcblx0XHQvLyBUT0RPKGJlcCkgd2UgaGF2ZSByZW1vdmVkIHRoZSBRQSBzZWN0aW9uIGZyb20gZXhwbG9yZXIvc2VhcmNoLCBidXQgdGhlXG5cdFx0Ly8gZGF0YSBpcyBzdGlsbCB0aGVyZS4gVGhlIGRvY1R5cGUgZmlsdGVyIGJlbG93IGNhbiBiZSByZW1vdmUgd2hlbiB3ZSBoYXZlIGNvbXBsZXRlZCB0aGUgbWlncmF0aW9uLlxuXHRcdGxldCBmaWx0ZXJzID1cblx0XHRcdHNlY3Rpb25Db25maWcuZmlsdGVycyB8fFxuXHRcdFx0J05PVCBkb2NUeXBlOmNvbW11bml0eSBBTkQgTk9UIGRvY1R5cGU6cHJvZHVjdHMgQU5EIE5PVCBkb2NUeXBlOmFwaSBBTkQgTk9UIGRvY1R5cGU6TWFya2V0cGxhY2UnO1xuXHRcdGxldCBmYWNldEZpbHRlcnMgPSBbXTtcblx0XHRsZXQgYXR0cmlidXRlc1RvSGlnaGxpZ2h0ID0gW107XG5cdFx0bGV0IGFuYWx5dGljc1RhZ3MgPSBbXTtcblx0XHRsZXQgcGFnZSA9IDA7XG5cblx0XHRpZiAocXVlcnkpIHtcblx0XHRcdGhpdHNQZXJQYWdlID0gc2VjdGlvbkNvbmZpZy5oaXRzX3Blcl9wYWdlIHx8IHNlYXJjaENvbmZpZy5oaXRzX3Blcl9wYWdlIHx8IDIwO1xuXHRcdFx0cSA9IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeS5sbmRxKTtcblx0XHRcdGZhY2V0RmlsdGVycyA9IHF1ZXJ5LnRvRmFjZXRGaWx0ZXJzKCk7XG5cdFx0XHRhdHRyaWJ1dGVzVG9IaWdobGlnaHQgPSBbJ3RpdGxlJywgJ2V4Y2VycHQnLCAuLi5maWx0ZXJpbmdGYWNldE5hbWVzXTtcblx0XHRcdHBhZ2UgPSBxdWVyeS5wO1xuXHRcdFx0aWYgKHF1ZXJ5LmlzRmlsdGVyZWQoKSkge1xuXHRcdFx0XHRhbmFseXRpY3NUYWdzLnB1c2goJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRpbmRleE5hbWU6IHNlYXJjaENvbmZpZy5pbmRleE5hbWUoc2VjdGlvbkNvbmZpZy5pbmRleCksXG5cdFx0XHRjbGlja0FuYWx5dGljczogc2VhcmNoQ29uZmlnLmNsaWNrX2FuYWx5dGljcyxcblx0XHRcdGFuYWx5dGljc1RhZ3M6IGFuYWx5dGljc1RhZ3MsXG5cdFx0XHRmaWx0ZXJzOiBmaWx0ZXJzLFxuXHRcdFx0ZmFjZXRGaWx0ZXJzOiBmYWNldEZpbHRlcnMsXG5cdFx0XHRmYWNldHM6IGZhY2V0cyxcblx0XHRcdGRpc3RpbmN0OiAxLFxuXHRcdFx0YXR0cmlidXRlc1RvSGlnaGxpZ2h0OiBhdHRyaWJ1dGVzVG9IaWdobGlnaHQsXG5cdFx0XHRwYXJhbXM6IGBxdWVyeT0ke3F9JmhpdHNQZXJQYWdlPSR7aGl0c1BlclBhZ2V9JnBhZ2U9JHtwYWdlfWAsXG5cdFx0fTtcblx0fTtcblxuXHRyZXR1cm4gc3RvcmU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVBbGdvbGlhUmVzdWx0KHJlc3VsdCwgbGFuZyA9ICcnKSB7XG5cdGxldCBpbmRleCA9IHJlc3VsdC5pbmRleDtcblx0bGV0IHF1ZXJ5SUQgPSByZXN1bHQucXVlcnlJRCA/IHJlc3VsdC5xdWVyeUlEIDogJyc7XG5cblx0cmVzdWx0LmhpdHMuZm9yRWFjaCgoaGl0LCBpZHgpID0+IHtcblx0XHQvLyBGb3IgZXZlbnQgdHJhY2tpbmdcblx0XHRoaXQuX19pbmRleCA9IGluZGV4O1xuXHRcdGhpdC5fX3F1ZXJ5SUQgPSBxdWVyeUlEO1xuXHRcdGlmIChoaXQuX19xdWVyeUlEKSB7XG5cdFx0XHQvLyBPbmx5IHNlbmQgcG9zaXRpb24gaWYgd2UgaGF2ZSBhIHF1ZXJ5SUQuXG5cdFx0XHRoaXQuX19wb3NpdGlvbiA9IGlkeCArIDEgKyByZXN1bHQucGFnZSAqIHJlc3VsdC5oaXRzUGVyUGFnZTtcblx0XHR9XG5cblx0XHRoaXQuc2VjdGlvblRpdGxlID0gaGl0LnNlY3Rpb247XG5cdFx0aWYgKGhpdC5zZWN0aW9uKSB7XG5cdFx0XHRoaXQuc2VjdGlvbiA9IGhpdC5zZWN0aW9uLnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXG5cdFx0aGl0LnJvb3RTZWN0aW9uVGl0bGUgPSBoaXRbJ3NlY3Rpb24ubHZsMCddO1xuXHRcdGlmIChoaXQucm9vdFNlY3Rpb25UaXRsZSkge1xuXHRcdFx0aWYgKGhpdC5yb290U2VjdGlvblRpdGxlLmVuZHNXaXRoKCctYnJhbmNoZXMnKSkge1xuXHRcdFx0XHRoaXQucm9vdFNlY3Rpb25UaXRsZSA9IGhpdC5yb290U2VjdGlvblRpdGxlLnN1YnN0cmluZygwLCBoaXQucm9vdFNlY3Rpb25UaXRsZS5pbmRleE9mKCctYnJhbmNoZXMnKSk7XG5cdFx0XHR9XG5cdFx0XHRoaXQucm9vdFNlY3Rpb25UaXRsZSA9IGhpdC5yb290U2VjdGlvblRpdGxlLnJlcGxhY2UoJy0nLCAnICcpO1xuXHRcdH1cblxuXHRcdGhpdC50aXRsZUhpZ2hsaWdodGVkID1cblx0XHRcdGhpdC5faGlnaGxpZ2h0UmVzdWx0ICYmIGhpdC5faGlnaGxpZ2h0UmVzdWx0LnRpdGxlID8gaGl0Ll9oaWdobGlnaHRSZXN1bHQudGl0bGUudmFsdWUgOiBoaXQudGl0bGU7XG5cblx0XHRoaXQuZXhjZXJwdEhpZ2hsaWdodGVkID1cblx0XHRcdGhpdC5faGlnaGxpZ2h0UmVzdWx0ICYmIGhpdC5faGlnaGxpZ2h0UmVzdWx0LmV4Y2VycHQgPyBoaXQuX2hpZ2hsaWdodFJlc3VsdC5leGNlcnB0LnZhbHVlIDogaGl0LmV4Y2VycHQ7XG5cblx0XHRoaXQubGlua1RpdGxlID0gaGl0LmxpbmtUaXRsZSB8fCBoaXQudGl0bGU7XG5cdFx0aGl0Lm1haW5UaXRsZSA9IGhpdC50aXRsZSB8fCBoaXQubGlua1RpdGxlO1xuXG5cdFx0aWYgKGhpdC5oaWVyYXJjaHkgJiYgaGl0LmhpZXJhcmNoeS5sZW5ndGgpIHtcblx0XHRcdC8vIFRoaXMgaXMgdGhlIHJlZmVyZW5jZS1zZWN0aW9uLCBwaWNrIHRoZSBtYWluIHRpdGxlIGZyb21cblx0XHRcdC8vIHRoZSB0b3AgbGV2ZWwuXG5cdFx0XHRsZXQgZmlyc3QgPSBoaXQuaGllcmFyY2h5WzBdO1xuXHRcdFx0aGl0Lm1haW5UaXRsZSA9IGZpcnN0LnRpdGxlIHx8IGZpcnN0LmxpbmtUaXRsZTtcblx0XHR9XG5cblx0XHRpZiAoaGl0LmhyZWYpIHtcblx0XHRcdGhpdC5pc0V4dGVybmFsTGluayA9IGhpdC5ocmVmLnN0YXJ0c1dpdGgoJ2h0dHAnKTtcblx0XHR9XG5cblx0XHRpZiAobGFuZyAmJiBsYW5nICE9PSAnZW4nICYmIGhpdC5ocmVmKSB7XG5cdFx0XHRoaXQuaHJlZiA9IGFkZExhbmdUb0hyZWYoaGl0LmhyZWYsIGxhbmcpO1xuXHRcdH1cblxuXHRcdGhpdC5maXJzdFB1Ymxpc2hlZERhdGVTdHJpbmcgPSAnJztcblx0XHRpZiAoaGl0LmZpcnN0UHVibGlzaGVkVGltZSkge1xuXHRcdFx0aGl0LmZpcnN0UHVibGlzaGVkRGF0ZVN0cmluZyA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShoaXQuZmlyc3RQdWJsaXNoZWRUaW1lICogMTAwMCkpO1xuXHRcdH1cblxuXHRcdGhpdC5leGNlcnB0VHJ1bmNhdGVkID0gZnVuY3Rpb24gKG1heExlbiA9IDMwMCkge1xuXHRcdFx0bGV0IGV4Y2VycHQgPSB0aGlzLmV4Y2VycHQgfHwgdGhpcy5kZXNjcmlwdGlvbjtcblx0XHRcdGlmICghZXhjZXJwdCkge1xuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXhjZXJwdC5sZW5ndGggPD0gbWF4TGVuKSB7XG5cdFx0XHRcdHJldHVybiBleGNlcnB0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGAke2V4Y2VycHQuc3Vic3RyaW5nKDAsIG1heExlbil9IFx1MjAyNmA7XG5cdFx0fTtcblxuXHRcdGlmICghaGl0LnRodW1ibmFpbFVybCkge1xuXHRcdFx0aGl0LnRodW1ibmFpbFVybCA9ICcvZG9jcy9tZWRpYS9pbWFnZXMvU2l0ZUJheS1EZWZhdWx0LTQxNngyMzQuanBnJztcblx0XHR9XG5cblx0XHRoaXQudGFnc1ZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghdGhpcy50YWdzKSB7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy50YWdzKTtcblx0XHR9O1xuXHR9KTtcbn1cblxuLy8gTm9ybWFsaXphdGlvbiBvZiBzZWFyY2ggcmVzdWx0cy5cbmNvbnN0IG5vcm1hbGl6ZVJlc3VsdCA9IGZ1bmN0aW9uIChzZWxmLCByZXN1bHQpIHtcblx0bGV0IGhpdHNTdGFydCA9IDA7XG5cdGxldCBoaXRzRW5kID0gMDtcblxuXHRpZiAocmVzdWx0Lm5iSGl0cykge1xuXHRcdGhpdHNTdGFydCA9IHJlc3VsdC5wYWdlICogcmVzdWx0LmhpdHNQZXJQYWdlO1xuXHRcdGhpdHNTdGFydCA9IGhpdHNTdGFydCA/IGhpdHNTdGFydCArIDEgOiAxO1xuXHRcdGhpdHNFbmQgPSBoaXRzU3RhcnQgKyByZXN1bHQuaGl0cy5sZW5ndGggLSAxO1xuXHR9XG5cblx0cmVzdWx0LnN0YXRzID0ge1xuXHRcdHRvdGFsTmJIaXRzOiByZXN1bHQubmJIaXRzLFxuXHRcdHRvdGFsTmJQYWdlczogcmVzdWx0Lm5iUGFnZXMsXG5cdFx0aGl0c1N0YXJ0OiBoaXRzU3RhcnQsXG5cdFx0aGl0c0VuZDogaGl0c0VuZCxcblx0fTtcblxuXHRsZXQgZmFjZXRzID0gcmVzdWx0LmZhY2V0cztcblx0aWYgKGZhY2V0cykge1xuXHRcdC8vIEFwcGx5IG1ldGFkYXRhIHRvIHRoZSBzZWN0aW9uIGZhY2V0cy5cblx0XHRsZXQgZmFjZXRzTWV0YSA9IHt9O1xuXHRcdE9iamVjdC5lbnRyaWVzKGZhY2V0cykuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG5cdFx0XHRpZiAoayA9PT0gJ2RvY1R5cGUnIHx8IGsuc3RhcnRzV2l0aCgnc2VjdGlvbi4nKSkge1xuXHRcdFx0XHRsZXQgb2JqID0ge307XG5cdFx0XHRcdE9iamVjdC5lbnRyaWVzKHYpLmZvckVhY2goKFtraywgdnZdKSA9PiB7XG5cdFx0XHRcdFx0Ly8gVE9ETyhiZXApIHdlIGhhdmUgcmVtb3ZlZCB0aGUgUUEgYW5kIHByb2R1Y3RzIHNlY3Rpb24gZnJvbSBleHBsb3Jlci9zZWFyY2gsIGJ1dCB0aGVcblx0XHRcdFx0XHQvLyBkYXRhIGlzIHN0aWxsIHRoZXJlLiBUaGUgZG9jVHlwZSBmaWx0ZXIgYmVsb3cgY2FuIGJlIHJlbW92ZSB3aGVuIHdlIGhhdmUgY29tcGxldGVkIHRoZSBtaWdyYXRpb24uXG5cdFx0XHRcdFx0aWYgKGsgPT0gJ2RvY1R5cGUnICYmIChrayA9PSAnY29tbXVuaXR5JyB8fCBrayA9PSAncHJvZHVjdHMnIHx8IGtrID09ICdhcGknKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsZXQgbSA9IHNlbGYubWV0YVByb3ZpZGVyLmdldFNlY3Rpb25NZXRhKGtrLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuXHRcdFx0XHRcdG9ialtra10gPSB7IGNvdW50OiB2diwgbWV0YTogbSB9O1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZmFjZXRzTWV0YVtrXSA9IG9iajtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZhY2V0c01ldGFba10gPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJlc3VsdC5mYWNldHNNZXRhID0gZmFjZXRzTWV0YTtcblx0fVxuXG5cdHJlc3VsdC5zZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgc2VjdGlvbnMgPSBbXTtcblxuXHRcdGlmICghdGhpcy5mYWNldHMpIHtcblx0XHRcdHJldHVybiBzZWN0aW9ucztcblx0XHR9XG5cblx0XHRsZXQgcG9zaXRpb24gPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IDsgaSsrKSB7XG5cdFx0XHQvLyB3ZWJzZXJ2ZXJcblx0XHRcdC8vIHdlYnNlcnZlciBhcGFjaGVcblx0XHRcdGxldCBrZXkgPSBgc2VjdGlvbi5sdmwke2l9YDtcblx0XHRcdGxldCBzZWN0aW9uRmFjZXRzID0gdGhpcy5mYWNldHNba2V5XTtcblx0XHRcdGxldCBmYWNldHNNZXRhID0gdGhpcy5mYWNldHNNZXRhW2tleV07XG5cblx0XHRcdGlmICghc2VjdGlvbkZhY2V0cykge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgayBpbiBzZWN0aW9uRmFjZXRzKSB7XG5cdFx0XHRcdGxldCBzZWN0aW9uTHZsMCA9IGs7XG5cdFx0XHRcdGlmIChpID4gMCkge1xuXHRcdFx0XHRcdHNlY3Rpb25MdmwwID0gay5zcGxpdCgnID4gJylbMF07XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IG1ldGE7XG5cdFx0XHRcdGxldCBmYWNldE1ldGEgPSBmYWNldHNNZXRhW2tdO1xuXHRcdFx0XHRpZiAoZmFjZXRNZXRhKSB7XG5cdFx0XHRcdFx0bWV0YSA9IGZhY2V0TWV0YS5tZXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVGhlc2UgYXJlIGFsc28gaW5kZXhlZCBvbiBpdHMgb3duLlxuXHRcdFx0XHRsZXQgaGFzT2JqZWN0SUQgPSBzZWN0aW9uTHZsMCA9PSAncHJvZHVjdHMnIHx8IHNlY3Rpb25MdmwwID09ICdndWlkZXMnO1xuXHRcdFx0XHRwb3NpdGlvbisrO1xuXG5cdFx0XHRcdHNlY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRcdGtleTogayxcblx0XHRcdFx0XHRjb3VudDogc2VjdGlvbkZhY2V0c1trXSxcblx0XHRcdFx0XHRpc0dob3N0U2VjdGlvbjogZmFsc2UsXG5cdFx0XHRcdFx0c2VjdGlvbkx2bDA6IHNlY3Rpb25MdmwwLFxuXHRcdFx0XHRcdG1ldGE6IG1ldGEsXG5cdFx0XHRcdFx0Ly8gVXNlZCBmb3IgQW5hbHl0aWNzLlxuXHRcdFx0XHRcdGhhc09iamVjdElEOiBoYXNPYmplY3RJRCxcblx0XHRcdFx0XHRxdWVyeUlEOiByZXN1bHQucXVlcnlJRCxcblx0XHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzZWN0aW9ucztcblx0fTtcblxuXHRsZXQgbGFuZyA9IGdldEN1cnJlbnRMYW5nKCk7XG5cblx0bm9ybWFsaXplQWxnb2xpYVJlc3VsdChyZXN1bHQsIGxhbmcpO1xufTtcblxuY2xhc3MgU2VhcmNoQmF0Y2hlciB7XG5cdGNvbnN0cnVjdG9yKHNlYXJjaENvbmZpZywgbWV0YVByb3ZpZGVyLCBjYWNoZVdhcm1lclVybHMsIHJlc3VsdENhbGxiYWNrID0gKHJlc3VsdCkgPT4ge30pIHtcblx0XHRjb25zdCBhbGdvbGlhSG9zdCA9IGBodHRwczovLyR7c2VhcmNoQ29uZmlnLmFwcF9pZH0tZHNuLmFsZ29saWEubmV0YDtcblx0XHR0aGlzLmhlYWRlcnMgPSB7XG5cdFx0XHQnWC1BbGdvbGlhLUFwcGxpY2F0aW9uLUlkJzogc2VhcmNoQ29uZmlnLmFwcF9pZCxcblx0XHRcdCdYLUFsZ29saWEtQVBJLUtleSc6IHNlYXJjaENvbmZpZy5hcGlfa2V5LFxuXHRcdH07XG5cblx0XHR0aGlzLnVybFF1ZXJpZXMgPSBgJHthbGdvbGlhSG9zdH0vMS9pbmRleGVzLyovcXVlcmllc2A7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBMUlVNYXAoMTIpOyAvLyBRdWVyeSBjYWNoZS5cblx0XHR0aGlzLmNhY2hlRW5hYmxlZCA9IHRydWU7XG5cdFx0dGhpcy5tZXRhUHJvdmlkZXIgPSBtZXRhUHJvdmlkZXI7XG5cdFx0dGhpcy5yZXN1bHRDYWxsYmFjayA9IHJlc3VsdENhbGxiYWNrO1xuXHRcdHRoaXMuY2FjaGVXYXJtZXJVcmxzID0gY2FjaGVXYXJtZXJVcmxzO1xuXHRcdHRoaXMuaW50ZXJ2YWwgPSAoKSA9PiB7XG5cdFx0XHRyZXR1cm4gMTAwO1xuXHRcdH07XG5cdFx0dGhpcy5leGVjdXRlQ291bnQgPSAwO1xuXHRcdHRoaXMuZmV0Y2hDb3VudCA9IDA7XG5cdFx0dGhpcy5xdWV1ZSA9IFtdO1xuXHR9XG5cblx0YXN5bmMgYWRkKC4uLnJlcXVlc3RDYWxsYmFja3MpIHtcblx0XHRpZiAoIXRoaXMudGltZXIpIHtcblx0XHRcdHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5leGVjdXRlQmF0Y2goJ3RpbWVycycpO1xuXHRcdFx0fSwgdGhpcy5pbnRlcnZhbCgpKTtcblx0XHR9XG5cdFx0Ly8gU2VhcmNoIGNhY2hlIGZpcnN0LCBhZGQgdGhlIHJlc3QgdG8gdGhlIGJhdGNoIHF1ZXVlLlxuXHRcdGxldCBjYWNoZVJlc3VsdCA9IGF3YWl0IHRoaXMuc2VhcmNoQ2FjaGUoLi4ucmVxdWVzdENhbGxiYWNrcyk7XG5cdFx0aWYgKGNhY2hlUmVzdWx0LmNhY2hlTWlzc2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS5jb25jYXQoLi4uY2FjaGVSZXN1bHQuY2FjaGVNaXNzZXMpO1xuXHR9XG5cblx0ZXhlY3V0ZUJhdGNoKHdoYXQgPSAnbWFudWFsJykge1xuXHRcdGxldCByZXF1ZXN0Q2FsbGJhY2tzID0gWy4uLnRoaXMucXVldWVdO1xuXG5cdFx0dGhpcy5xdWV1ZS5sZW5ndGggPSAwO1xuXHRcdHRoaXMudGltZXIgPSBudWxsO1xuXG5cdFx0dGhpcy5zZWFyY2goLi4ucmVxdWVzdENhbGxiYWNrcyk7XG5cdFx0dGhpcy5leGVjdXRlQ291bnQrKztcblx0fVxuXG5cdGFzeW5jIHNlYXJjaENhY2hlKC4uLnJlcXVlc3RDYWxsYmFja3MpIHtcblx0XHRkZWJ1Zygnc2VhcmNoQ2FjaGUsIG51bSByZXF1ZXN0czonLCByZXF1ZXN0Q2FsbGJhY2tzLmxlbmd0aCk7XG5cdFx0aWYgKHJlcXVlc3RDYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4geyBjYWNoZU1pc3NlczogW10sIGNhY2hlTWlzc2VzS2V5czogW10gfTtcblx0XHR9XG5cdFx0Ly8gVHJ5IHRoZSBjYWNoZSBmaXJzdFxuXHRcdGxldCBjYWNoZU1pc3NlcyA9IFtdO1xuXHRcdGxldCBjYWNoZU1pc3Nlc0tleXMgPSBbXTtcblxuXHRcdGlmICghdGhpcy5jYWNoZUVuYWJsZWQpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVxdWVzdENhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgY2IgPSByZXF1ZXN0Q2FsbGJhY2tzW2ldO1xuXHRcdFx0XHRsZXQga2V5ID0gSlNPTi5zdHJpbmdpZnkoY2IucmVxdWVzdCk7XG5cdFx0XHRcdGNhY2hlTWlzc2VzLnB1c2gocmVxdWVzdENhbGxiYWNrc1tpXSk7XG5cdFx0XHRcdGNhY2hlTWlzc2VzS2V5cy5wdXNoKGtleSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geyBjYWNoZU1pc3NlczogY2FjaGVNaXNzZXMsIGNhY2hlTWlzc2VzS2V5czogY2FjaGVNaXNzZXNLZXlzIH07XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZXF1ZXN0Q2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgY2IgPSByZXF1ZXN0Q2FsbGJhY2tzW2ldO1xuXHRcdFx0aWYgKCFjYi5yZXF1ZXN0KSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignaW52YWxpZCBzdGF0ZScsIGNiKTtcblx0XHRcdFx0dGhyb3cgJ211c3QgcHJvdmlkZSBhIHJlcXVlc3QnO1xuXHRcdFx0fVxuXHRcdFx0bGV0IGtleSA9IEpTT04uc3RyaW5naWZ5KGNiLnJlcXVlc3QpO1xuXG5cdFx0XHRsZXQgY2FjaGVkUmVzdWx0ID0gdGhpcy5jYWNoZS5nZXQoa2V5KTtcblx0XHRcdGlmIChjYWNoZWRSZXN1bHQpIHtcblx0XHRcdFx0Y2IuY2FsbGJhY2soY2FjaGVkUmVzdWx0KTtcblx0XHRcdFx0dGhpcy5yZXN1bHRDYWxsYmFjayhjYWNoZWRSZXN1bHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2FjaGVNaXNzZXMucHVzaChyZXF1ZXN0Q2FsbGJhY2tzW2ldKTtcblx0XHRcdFx0Y2FjaGVNaXNzZXNLZXlzLnB1c2goa2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4geyBjYWNoZU1pc3NlczogY2FjaGVNaXNzZXMsIGNhY2hlTWlzc2VzS2V5czogY2FjaGVNaXNzZXNLZXlzIH07XG5cdH1cblxuXHRhc3luYyBjaGVja0ZpbGVDYWNoZShmaWxlQ2FjaGVJRCkge1xuXHRcdC8vIFRyeSB0aGUgbG9jYWwgZmlsZSBjYWNoZSBpZiBmb3VuZC5cblx0XHRsZXQgZmlsZUNhY2hlVXJsID0gdGhpcy5jYWNoZVdhcm1lclVybHNbZmlsZUNhY2hlSURdO1xuXG5cdFx0aWYgKGZpbGVDYWNoZVVybCkge1xuXHRcdFx0ZGVidWcoJ2ZldGNoIGRhdGEgZnJvbSBmaWxlIGNhY2hlOicsIGZpbGVDYWNoZVVybCk7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGVDYWNoZVVybCwgeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9KTtcblxuXHRcdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRcdGlmIChkYXRhLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdC8vIFdlIGN1cnJlbnRseSBkb24ndCB3YW50IHRoZSBicmFuY2ggbm9kZXMgKGluIHRoZSBleHBsb3JlcikuXG5cdFx0XHRcdFx0XHRkYXRhID0gZGF0YS5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmlzQnJhbmNoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0XHRcdGhpdHM6IGRhdGEsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5vcm1hbGl6ZVJlc3VsdCh0aGlzLCBkYXRhKTtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0YXN5bmMgc2VhcmNoKC4uLnJlcXVlc3RDYWxsYmFja3MpIHtcblx0XHRkZWJ1Zygnc2VhcmNoLCBudW0gcmVxdWVzdHM6JywgcmVxdWVzdENhbGxiYWNrcy5sZW5ndGgpO1xuXHRcdGlmIChyZXF1ZXN0Q2FsbGJhY2tzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFRyeSB0aGUgY2FjaGUgZmlyc3Rcblx0XHRsZXQgY2FjaGVSZXN1bHQgPSBhd2FpdCB0aGlzLnNlYXJjaENhY2hlKC4uLnJlcXVlc3RDYWxsYmFja3MpO1xuXHRcdGlmIChjYWNoZVJlc3VsdC5jYWNoZU1pc3Nlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBUaGVyZSBtYXkgYmUgc3RpbGwgYmUgZHVwbGljYXRlIHJlcXVlc3RzLlxuXHRcdGxldCByZXF1ZXN0cyA9IFtdO1xuXHRcdGxldCByZXF1ZXN0Q2FsbGJhY2tNYXAgPSBuZXcgTWFwKCk7XG5cdFx0bGV0IGNhY2hlTWlzc2VzS2V5c0NvcHkgPSBbLi4uY2FjaGVSZXN1bHQuY2FjaGVNaXNzZXNLZXlzXTtcblxuXHRcdGNhY2hlUmVzdWx0LmNhY2hlTWlzc2VzS2V5cy5sZW5ndGggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjYWNoZU1pc3Nlc0tleXNDb3B5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcmMgPSBjYWNoZVJlc3VsdC5jYWNoZU1pc3Nlc1tpXTtcblx0XHRcdGxldCByY2sgPSBjYWNoZU1pc3Nlc0tleXNDb3B5W2ldO1xuXHRcdFx0bGV0IHJlcSA9IHJjLnJlcXVlc3Q7XG5cblx0XHRcdGlmICghcmVxdWVzdENhbGxiYWNrTWFwLmhhcyhyY2spKSB7XG5cdFx0XHRcdC8vIERvdWJsZSBjaGVjayBjYWNoZS5cblx0XHRcdFx0bGV0IGNhY2hlZFJlc3VsdCA9IHRoaXMuY2FjaGUuZ2V0KHJjayk7XG5cdFx0XHRcdGlmIChjYWNoZWRSZXN1bHQpIHtcblx0XHRcdFx0XHRyYy5jYWxsYmFjayhjYWNoZWRSZXN1bHQpO1xuXHRcdFx0XHRcdHRoaXMucmVzdWx0Q2FsbGJhY2soY2FjaGVkUmVzdWx0KTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghcmMuaXNGaWx0ZXJlZCgpKSB7XG5cdFx0XHRcdFx0bGV0IGZpbGVDYWNoZUlEID0gcmMuZ2V0RmlsZUNhY2hlSUQoKTtcblx0XHRcdFx0XHRpZiAoZmlsZUNhY2hlSUQpIHtcblx0XHRcdFx0XHRcdGxldCBkYXRhID0gYXdhaXQgdGhpcy5jaGVja0ZpbGVDYWNoZShmaWxlQ2FjaGVJRCk7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRyYy5jYWxsYmFjayhkYXRhKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZXN1bHRDYWxsYmFjayhkYXRhKTtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuY2FjaGVFbmFibGVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5jYWNoZS5zZXQocmNrLCBkYXRhKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXF1ZXN0cy5wdXNoKHJlcSk7XG5cdFx0XHRcdGNhY2hlUmVzdWx0LmNhY2hlTWlzc2VzS2V5cy5wdXNoKHJjayk7XG5cdFx0XHRcdGNhY2hlUmVzdWx0LmNhY2hlTWlzc2VzLnB1c2gocmMpO1xuXHRcdFx0XHRyZXF1ZXN0Q2FsbGJhY2tNYXAuc2V0KHJjaywgW10pO1xuXHRcdFx0fVxuXHRcdFx0cmVxdWVzdENhbGxiYWNrTWFwLmdldChyY2spLnB1c2gocmMuY2FsbGJhY2spO1xuXHRcdH1cblxuXHRcdGlmIChyZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgcXVlcmllcyA9IHtcblx0XHRcdHJlcXVlc3RzOiByZXF1ZXN0cyxcblx0XHR9O1xuXG5cdFx0ZGVidWdGZXRjaChgZmV0Y2guUE9TVCgke3F1ZXJpZXMucmVxdWVzdHMubGVuZ3RofSlgLCBxdWVyaWVzKTtcblxuXHRcdGZldGNoKHRoaXMudXJsUXVlcmllcywge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShxdWVyaWVzKSxcblx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHR0aGlzLmZldGNoQ291bnQrKztcblx0XHRcdFx0aWYgKCFkYXRhLnJlc3VsdHMpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ2ludmFsaWQgcmVzcG9uc2UnLCBkYXRhKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gZGF0YS5yZXN1bHRzW2ldO1xuXHRcdFx0XHRcdHRoaXMucmVzdWx0Q2FsbGJhY2socmVzdWx0KTtcblx0XHRcdFx0XHRub3JtYWxpemVSZXN1bHQodGhpcywgcmVzdWx0KTtcblx0XHRcdFx0XHRsZXQga2V5ID0gY2FjaGVSZXN1bHQuY2FjaGVNaXNzZXNLZXlzW2ldO1xuXHRcdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBgaW52YWxpZCBzdGF0ZTogbm8ga2V5IHNldCBmb3IgcmVzdWx0cyAke2l9YDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMuY2FjaGVFbmFibGVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNhY2hlLnNldChrZXksIHJlc3VsdCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVxdWVzdENhbGxiYWNrTWFwLmdldChrZXkpLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayhyZXN1bHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0FsZ29saWEgcXVlcnkgZmFpbGVkOicsIGVycm9yKTtcblx0XHRcdH0pO1xuXHR9XG59XG5cbmNsYXNzIFNlYXJjaGVyIHtcblx0Y29uc3RydWN0b3Ioc2VhcmNoQ29uZmlnLCBtZXRhUHJvdmlkZXIsIGNhY2hlV2FybWVyVXJscywgcmVzdWx0Q2FsbGJhY2ssIGRlYnVnID0gZnVuY3Rpb24gKCkge30pIHtcblx0XHR0aGlzLmJhdGNoZXIgPSBuZXcgU2VhcmNoQmF0Y2hlcihzZWFyY2hDb25maWcsIG1ldGFQcm92aWRlciwgY2FjaGVXYXJtZXJVcmxzLCByZXN1bHRDYWxsYmFjayk7XG5cdH1cblxuXHRzZWFyY2hGYWN0b3JpZXMoZmFjdG9yaWVzLCBxdWVyeSkge1xuXHRcdGlmICghcXVlcnkpIHtcblx0XHRcdHF1ZXJ5ID0gbmV3UXVlcnkoKTtcblx0XHR9XG5cdFx0bGV0IHJlcXVlc3RDYWxsYmFja3MgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gZmFjdG9yaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRsZXQgY2JmID0gZmFjdG9yaWVzW2ldO1xuXHRcdFx0aWYgKGNiZi5zdGF0dXMoKSA+IFJlcXVlc3RDYWxsQmFja1N0YXR1cy5PZmYpIHtcblx0XHRcdFx0bGV0IHJlcXVlc3RDYWxsYmFjayA9IGNiZi5jcmVhdGUocXVlcnkpO1xuXHRcdFx0XHRyZXF1ZXN0Q2FsbGJhY2tzLnB1c2gocmVxdWVzdENhbGxiYWNrKTtcblx0XHRcdH1cblx0XHRcdGlmIChjYmYuc3RhdHVzKCkgIT09IFJlcXVlc3RDYWxsQmFja1N0YXR1cy5Pbikge1xuXHRcdFx0XHRkZWJ1Z0RldigncmVtb3ZlIGluYWN0aXZlIHNlYXJjaCBmYWN0b3J5Jyk7XG5cdFx0XHRcdGZhY3Rvcmllcy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGRlYnVnRGV2KCdmYWN0b3JpZXMgbGVuZ3RoOicsIGZhY3Rvcmllcy5sZW5ndGgpO1xuXHRcdHRoaXMuc2VhcmNoKC4uLnJlcXVlc3RDYWxsYmFja3MpO1xuXHR9XG5cblx0c2VhcmNoKC4uLnJlcXVlc3RDYWxsYmFja3MpIHtcblx0XHRpZiAodGhpcy5iYXRjaGVyLmV4ZWN1dGVDb3VudCA+IDAgJiYgcmVxdWVzdENhbGxiYWNrcy5sZW5ndGggPT09IDEgJiYgcmVxdWVzdENhbGxiYWNrc1swXS5wcm9udG8pIHtcblx0XHRcdC8vIFRoaXMgaXMgdGhlIHVzZXIgdHlwaW5nLCBzZWFyY2ggcmlnaHQgYXdheS5cblx0XHRcdHRoaXMuYmF0Y2hlci5zZWFyY2goLi4ucmVxdWVzdENhbGxiYWNrcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuYmF0Y2hlci5hZGQoLi4ucmVxdWVzdENhbGxiYWNrcyk7XG5cdFx0fVxuXHR9XG5cblx0ZXhlY3V0ZUJhdGNoKCkge1xuXHRcdHRoaXMuYmF0Y2hlci5leGVjdXRlQmF0Y2goKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VhcmNoQ29uZmlnKHBhcmFtcykge1xuXHRsZXQgY2ZnID0gcGFyYW1zLnNlYXJjaF9jb25maWc7XG5cdGNvbnNvbGUubG9nKGNmZylcblx0Y29uc29sZS5sb2coJ2NmZycpXG5cblx0Y2ZnLnNlY3Rpb25zU29ydGVkID0gT2JqZWN0LnZhbHVlcyhjZmcuc2VjdGlvbnMpO1xuXHRjZmcuc2VjdGlvbnNTb3J0ZWQuc29ydCgoYSwgYikgPT4ge1xuXHRcdHJldHVybiBhLndlaWdodCA8IGIud2VpZ2h0ID8gLTEgOiAxO1xuXHR9KTtcblxuXHRjZmcuc2VjdGlvbnNTb3J0ZWQuZm9yRWFjaCgoc2VjdGlvbkNmZykgPT4ge1xuXHRcdHNlY3Rpb25DZmcubm91blBsdXJhbCA9IGZ1bmN0aW9uIChjb3VudCA9IDIpIHtcblx0XHRcdGxldCBub3VuID0gdGhpcy5ub3VuIHx8IHRoaXMudGl0bGU7XG5cblx0XHRcdGlmIChjb3VudCA9PT0gMCB8fCAoY291bnQgPiAxICYmICFub3VuLmVuZHNXaXRoKCdzJykpKSB7XG5cdFx0XHRcdG5vdW4gKz0gJ3MnO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5vdW47XG5cdFx0fTtcblx0fSk7XG5cblx0Y2ZnLmluZGV4TmFtZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuXHRcdGlmICghY2ZnLmluZGV4X3ByZWZpeCkge1xuXHRcdFx0cmV0dXJuIGluZGV4O1xuXHRcdH1cblx0XHRsZXQgcHJlZml4ID0gY2ZnLmluZGV4X3ByZWZpeDtcblx0XHRpZiAoIXByZWZpeC5lbmRzV2l0aCgnXycpKSB7XG5cdFx0XHRwcmVmaXggKz0gJ18nO1xuXHRcdH1cblx0XHRyZXR1cm4gYCR7cHJlZml4fSR7aW5kZXh9YDtcblx0fTtcblxuXHRyZXR1cm4gY2ZnO1xufVxuIiwgImltcG9ydCB7IGlzVG9wUmVzdWx0c1BhZ2UgfSBmcm9tICcuJztcbmltcG9ydCB7IG5vcm1hbGl6ZVNwYWNlIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG5cdC8vIEhvbGRzIHRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyLlxuXHQvLyBTdGFydHMgYXQgMC5cblx0cDogbnVtYmVyO1xuXG5cdC8vIGxuZHEgaG9sZHMgdGhlIGZyZWUgdGV4dCBxdWVyeSB1c3VhbGx5IGZldGNoZWQgZnJvbSB0aGUgc2VhcmNoIGlucHV0IGJveC5cblx0bG5kcTogc3RyaW5nO1xuXG5cdC8vIGZhY2V0IGZpbHRlcnMuXG5cdGZpbHRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcblxuXHQvLyBhZGRGaWx0ZXIgYWRkcyB2YWx1ZSB0byB0aGUgc2xpY2Ugb2YgZmlsdGVycyB3aXRoIGtleS5cblx0YWRkRmlsdGVyKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTtcblxuXHQvLyByZXBsYWNlRmlsdGVyIHJlcGxhY2VzIHRoZSBzbGljZSBvZiBmaWx0ZXJzIHdpdGgga2V5IHdpdGggdmFsdWUuXG5cdHJlcGxhY2VGaWx0ZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpO1xuXG5cdC8vIFJldHVybnMgdGhlIGZpbHRlcnMgcmVhZHkgdG8gYmUgdXNlZCBpbiBhIEFsZ29saWEgcXVlcnkuXG5cdHRvRmFjZXRGaWx0ZXJzKCk6IHN0cmluZ1tdO1xuXG5cdC8vIGhhc0ZpbHRlciByZXBvcnRzIHdoZXRoZXIgYSBmaWx0ZXIgKGUuZy4gdGFncykgaXMgc2V0LlxuXHRoYXNGaWx0ZXIoKTogYm9vbGVhbjtcblxuXHQvLyBpc0ZpbHRlcmVkIHJlcG9ydHMgd2hldGhlciBhIGZpbHRlciBvciBhIG5vbi1lbXB0eSB0ZXh0IGd1ZXJ5IGlzIHNldC5cblx0aXNGaWx0ZXJlZCgpOiBib29sZWFuO1xufVxuXG4vLyBPbmx5IHVzZWQgdG8gdmFsaWRhdGUgcXVlcnkgcGFyYW1ldGVycy5cbmNvbnN0IGZpbHRlckF0dHJpYnV0ZXMgPSBbICdkb2NUeXBlJywgJ2NhdGVnb3J5JywgJ3RhZ3MnLCAnYXV0aG9ycycgXTtcblxuY29uc3Qgc2V0UXVlcnlWYWx1ZXMgPSBmdW5jdGlvbihxOiBRdWVyeSwga2V5OiBzdHJpbmcsIHZhbHVlczogc3RyaW5nW10pIHtcblx0Ly8gTGVnYWN5IHZhbHVlcy5cblx0aWYgKGtleSA9PT0gJ3NlY3Rpb25zJyB8fCBrZXkgPT09ICdzZWN0aW9uLmx2bDAnKSB7XG5cdFx0a2V5ID0gJ2RvY1R5cGUnO1xuXHR9XG5cdGlmIChmaWx0ZXJBdHRyaWJ1dGVzLmluY2x1ZGVzKGtleSkpIHtcblx0XHRxLmZpbHRlcnMuc2V0KGtleSwgdmFsdWVzKTtcblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IG5ld1F1ZXJ5ID0gZnVuY3Rpb24oKTogUXVlcnkge1xuXHRyZXR1cm4ge1xuXHRcdHA6IDAsXG5cdFx0bG5kcTogJycsXG5cdFx0ZmlsdGVyczogbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpLFxuXG5cdFx0YWRkRmlsdGVyKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG5cdFx0XHRpZiAodGhpcy5maWx0ZXJzLmhhcyhrZXkpKSB7XG5cdFx0XHRcdHRoaXMuZmlsdGVycy5nZXQoa2V5KS5wdXNoKHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZmlsdGVycy5zZXQoa2V5LCBbIHZhbHVlIF0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRyZXBsYWNlRmlsdGVyKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG5cdFx0XHR0aGlzLmZpbHRlcnMuc2V0KGtleSwgWyB2YWx1ZSBdKTtcblx0XHR9LFxuXG5cdFx0dG9GYWNldEZpbHRlcnMoKTogc3RyaW5nW10ge1xuXHRcdFx0Ly8gSW4gQWxnb2xpYSwgZXZlcnkgdmFsdWUgd2l0aGluIHRoZSBtYWluIGJyYWNrZXQgaXMgaW50ZXJwcmV0ZWQgYXMgYSBjb25qdW5jdGlvbiAoQU5EKSxcblx0XHRcdC8vIG5lc3RlZCBhcnJheXMgZ2V0cyB0byBiZSBkaXNqdW5jdGl2ZSAoT1IpLlxuXHRcdFx0Ly8gU28gd2UgcHV0IGVhY2ggZmlsdGVyIGluIHRoZSB0b3AgbGV2ZWwgYXJyYXkgKEFORCkgYXMgYW4gYXJyYXkgd2l0aCBmaWx0ZXIgdmFsdWVzLlxuXHRcdFx0bGV0IGZpbHRlcnMgPSBbXTtcblx0XHRcdHRoaXMuZmlsdGVycy5mb3JFYWNoKCh2YWx1ZXMsIGtleSkgPT4ge1xuXHRcdFx0XHRsZXQgZmlsdGVyR3JvdXAgPSBbXTtcblx0XHRcdFx0dmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0ZmlsdGVyR3JvdXAucHVzaChgJHtrZXl9OiR7dmFsdWV9YCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRmaWx0ZXJzLnB1c2goZmlsdGVyR3JvdXApO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmlsdGVycztcblx0XHR9LFxuXG5cdFx0aGFzRmlsdGVyKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmlsdGVycy5zaXplID4gMDtcblx0XHR9LFxuXG5cdFx0aXNGaWx0ZXJlZCgpIHtcblx0XHRcdHJldHVybiB0aGlzLmxuZHEgIT0gJycgfHwgdGhpcy5oYXNGaWx0ZXIoKTtcblx0XHR9XG5cdH07XG59O1xuXG5leHBvcnQgY2xhc3MgUXVlcnlIYW5kbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7fVxuXG5cdGlzUXVlcnlQYXJhbShrOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRzd2l0Y2ggKGspIHtcblx0XHRcdGNhc2UgJ3AnOlxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdGNhc2UgJ2xuZHEnOlxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBmaWx0ZXJBdHRyaWJ1dGVzLmluY2x1ZGVzKGspO1xuXHRcdH1cblx0fVxuXG5cdHF1ZXJ5RnJvbUxvY2F0aW9uKCk6IFF1ZXJ5IHtcblx0XHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpIHtcblx0XHRcdHJldHVybiBuZXdRdWVyeSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5xdWVyeUZyb21TdHJpbmcod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSk7XG5cdH1cblxuXHRxdWVyeUZyb21TdHJpbmcoczogc3RyaW5nKTogUXVlcnkge1xuXHRcdGxldCBxID0gbmV3UXVlcnkoKTtcblx0XHRuZXcgVVJMU2VhcmNoUGFyYW1zKHMpLmZvckVhY2goKHYsIGspID0+IHtcblx0XHRcdHN3aXRjaCAoaykge1xuXHRcdFx0XHRjYXNlICdwJzpcblx0XHRcdFx0XHRxLnAgPSBwYXJzZUludCh2LCAxMCk7XG5cdFx0XHRcdFx0aWYgKHEucCA8IDApIHtcblx0XHRcdFx0XHRcdHEucCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdsbmRxJzpcblx0XHRcdFx0XHRxLmxuZHEgPSBub3JtYWxpemVTcGFjZSh2KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncSc6XG5cdFx0XHRcdFx0aWYgKGlzVG9wUmVzdWx0c1BhZ2UoKSkge1xuXHRcdFx0XHRcdFx0Ly8gbGVnYWN5XG5cdFx0XHRcdFx0XHRxLmxuZHEgPSBub3JtYWxpemVTcGFjZSh2KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0c2V0UXVlcnlWYWx1ZXMocSwgaywgdi5zcGxpdCgnLCcpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gcTtcblx0fVxuXG5cdHF1ZXJ5QW5kTG9jYXRpb25Ub1F1ZXJ5U3RyaW5nKHE6IFF1ZXJ5KTogc3RyaW5nIHtcblx0XHRsZXQgc2VhcmNoID0gJyc7XG5cdFx0bGV0IGN1cnJlbnRVUkwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKTtcblxuXHRcdC8vIFByZXNlcnZlIG5vbi1zZWFyY2gtcmVsYXRlZCBxdWVyeSBwYXJhbXMuXG5cdFx0Y3VycmVudFVSTC5zZWFyY2hQYXJhbXMuZm9yRWFjaCgodiwgaykgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLmlzUXVlcnlQYXJhbShrKSkge1xuXHRcdFx0XHRzZWFyY2ggPSBhZGRUcmFpbGluZ0FuZChzZWFyY2gpO1xuXHRcdFx0XHRzZWFyY2ggKz0gYCR7a309JHt2fWA7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQgcXVlcnlTdHJpbmcgPSB0aGlzLnF1ZXJ5VG9RdWVyeVN0cmluZyhxKTtcblxuXHRcdGlmICghcXVlcnlTdHJpbmcpIHtcblx0XHRcdHJldHVybiBzZWFyY2g7XG5cdFx0fVxuXG5cblx0XHRpZiAoc2VhcmNoKSB7XG5cdFx0XHRxdWVyeVN0cmluZyArPSAnJicgKyBzZWFyY2g7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xuXHR9XG5cblx0cXVlcnlUb1F1ZXJ5U3RyaW5nKHE6IFF1ZXJ5KTogc3RyaW5nIHtcblx0XHRsZXQgcXVlcnlTdHJpbmcgPSAnJztcblx0XHRpZiAocS5sbmRxKSB7XG5cdFx0XHRxdWVyeVN0cmluZyA9IGBsbmRxPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHEubG5kcSl9YDtcblx0XHR9XG5cblx0XHRpZiAocS5wKSB7XG5cdFx0XHRxdWVyeVN0cmluZyA9IGFkZFRyYWlsaW5nQW5kKHF1ZXJ5U3RyaW5nKTtcblx0XHRcdHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuY29uY2F0KGBwPSR7cS5wfWApO1xuXHRcdH1cblxuXHRcdHEuZmlsdGVycy5mb3JFYWNoKCh2YWx1ZXMsIGtleSkgPT4ge1xuXHRcdFx0cXVlcnlTdHJpbmcgPSBhZGRUcmFpbGluZ0FuZChxdWVyeVN0cmluZyk7XG5cdFx0XHRxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLmNvbmNhdChgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlcy5qb2luKCcsJykudG9Mb3dlckNhc2UoKSl9YCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcXVlcnlTdHJpbmc7XG5cdH1cbn1cblxuZnVuY3Rpb24gYWRkVHJhaWxpbmdBbmQoczogc3RyaW5nKSB7XG5cdGlmIChzICYmICFzLmVuZHNXaXRoKCcmJykpIHtcblx0XHRzICs9ICcmJztcblx0fVxuXHRyZXR1cm4gcztcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IHRvZ2dsZUJvb2xlYW5DbGFzcyB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5pbXBvcnQgeyBRdWVyeUhhbmRsZXIgfSBmcm9tICcuL3F1ZXJ5JztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tmaWx0ZXJzXScpIDogZnVuY3Rpb24gKCkge307XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdTZWFyY2hGaWx0ZXJzQ29udHJvbGxlcihzZWFyY2hDb25maWcsIHF1ZXJ5Q2FsbGJhY2sgPSBmdW5jdGlvbiAoYWN0aW9uKSB7fSkge1xuXHRjb25zdCBxdWVyeUhhbmRsZXIgPSBuZXcgUXVlcnlIYW5kbGVyKCk7XG5cblx0dmFyIGN0cmwgPSB7XG5cdFx0Ly8gVGhlIDMgc2VhcmNoIHZpZXdzLlxuXHRcdHZpZXc6IDEsXG5cblx0XHRmaWx0ZXJzOiB7XG5cdFx0XHRvcGVuOiBmYWxzZSwgLy8gVXNlZCBvbiBtb2JpbGUgdG8gb3Blbi9jbG9zZSB0aGUgZmlsdGVyIHBhbmVsLlxuXHRcdFx0bG9hZGVkOiBmYWxzZSxcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGZpbHRlcmFibGVDbG91ZCA9ICgpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b3BlbjogZmFsc2UsXG5cdFx0XHRzZWFyY2hTdHJpbmc6ICcnLCAvLyB0byBmaWx0ZXIgdGhlIHRhZ3MgYnkuXG5cdFx0XHRmaWx0ZXI6IFtdLFxuXHRcdFx0ZmlsdGVyQnlTZWFyY2hTdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bGV0IHRhZ3MgPSB0aGlzLmZpbHRlcjtcblx0XHRcdFx0aWYgKCF0YWdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCBjaGVja2JveGVzID0gdGFncy5jaGVja2JveGVzO1xuXHRcdFx0XHRpZiAoIXRoaXMuc2VhcmNoU3RyaW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNoZWNrYm94ZXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgc2VhcmNoU3RyaW5nID0gdGhpcy5zZWFyY2hTdHJpbmcudG9VcHBlckNhc2UoKTtcblx0XHRcdFx0cmV0dXJuIGNoZWNrYm94ZXMuZmlsdGVyKChjYikgPT4gY2IudGl0bGUudG9VcHBlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpKTtcblx0XHRcdH0sXG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGUgVUkgc3RhdGUuXG5cdGN0cmwuZmlsdGVycy5kYXRhID0ge1xuXHRcdC8vIE1hcHMgYSBmYWNldCBuYW1lIHRvIGEgZmlsdGVyLiBUaGUgZmlsdGVyIG1hcHMgdG8gdGhlIG93bmluZyBzZWN0aW9uLlxuXHRcdGZpbHRlcnM6IG5ldyBNYXAoKSxcblxuXHRcdGZpbHRlcnNhcnI6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuZmlsdGVycylcblx0XHRcdFx0Lm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gdmFsdWUpXG5cdFx0XHRcdC5maWx0ZXIoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuICF2YWx1ZS5oaWRkZW47XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRjb3VudEFjdGl2ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvdW50ID0gMDtcblx0XHRcdHRoaXMuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIGZhY2V0TmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoIWZpbHRlci5hbGxDaGVja2VkKSB7XG5cdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fSxcblxuXHRcdC8vIEhvbGRzIHRoZSBzdGF0ZSBmb3IgdGhlIHRhZ3MgZmlsdGVycy5cblx0XHR0YWdzOiBmaWx0ZXJhYmxlQ2xvdWQoKSxcblxuXHRcdC8vIEhvbGRzIHRoZSBzdGF0ZSBmb3IgdGhlIGF1dGhvcnMgZmlsdGVycy5cblx0XHRhdXRob3JzOiBmaWx0ZXJhYmxlQ2xvdWQoKSxcblx0fTtcblxuXHQvLyBOYXZpZ2F0aW9uLlxuXHRjdHJsLmluY3JQYWdlID0gZnVuY3Rpb24gKG51bSkge1xuXHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0USgpO1xuXHRcdHF1ZXJ5LnAgKz0gbnVtO1xuXHRcdGlmIChxdWVyeS5wIDwgMCkge1xuXHRcdFx0cXVlcnkucCA9IDA7XG5cdFx0fVxuXHRcdHRoaXMuJHN0b3JlLm5hdi5zY3JvbGxUb05hdkJhcklmUGlubmVkKCk7XG5cdH07XG5cblx0Y3RybC5nZXRRID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLiRzdG9yZS5zZWFyY2gucXVlcnk7XG5cdH07XG5cblx0Y3RybC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdpbml0KCknKTtcblx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy4kc3RvcmUuc2VhcmNoLnJlc3VsdHMuYmxhbmsubG9hZGVkKSB7XG5cdFx0XHRcdHRoaXMuaW5pdERhdGEodGhpcy4kc3RvcmUuc2VhcmNoLnJlc3VsdHMuYmxhbmsucmVzdWx0KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy4kd2F0Y2goJ2ZpbHRlcnMub3BlbicsICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHR0b2dnbGVCb29sZWFuQ2xhc3MoJ3NlYXJjaC1wYW5lbF9maWx0ZXJzLW9wZW4nLCBkb2N1bWVudC5ib2R5LCB2YWx1ZSk7XG5cdFx0XHRcdGlmICghdGhpcy5maWx0ZXJzLmxvYWRlZCkge1xuXHRcdFx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC53aXRoQmxhbmsoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLiR3YXRjaCgnJHN0b3JlLnNlYXJjaC5yZXN1bHRzLmJsYW5rLnJlc3VsdCcsICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRkZWJ1ZygnYmxhbmsgcmVzdWx0Jyk7XG5cdFx0XHRcdHRoaXMuaW5pdERhdGEodmFsdWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuJHdhdGNoKCckc3RvcmUuc2VhcmNoLnJlc3VsdHMubWFpbi5yZXN1bHQnLCAodmFsdWUpID0+IHtcblx0XHRcdFx0ZGVidWcoJ21haW4gcmVzdWx0Jyk7XG5cdFx0XHRcdHRoaXMudXBkYXRlRGF0YSh2YWx1ZSk7XG5cdFx0XHRcdHRoaXMucG9wdWxhdGVGaWx0ZXJzKGZhbHNlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLiR3YXRjaCgnJHN0b3JlLm5hdi5zZWFyY2hSZXN1bHRzJywgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmICh2YWx1ZS5vcGVuICYmIHZhbHVlLnVzZXJDaGFuZ2UpIHtcblx0XHRcdFx0XHR0aGlzLnBvcHVsYXRlRmlsdGVycyh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodmFsdWUub3BlbiB8fCAhdmFsdWUudXNlckNoYW5nZSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFVzZXIgaGFzIGNsb3NlZCB0aGUgc2VhcmNoIGlucHV0LCBjbGVhciBhbGwgZmlsdGVycy5cblx0XHRcdFx0dGhpcy5maWx0ZXJzLmRhdGEuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIGtleSkgPT4ge1xuXHRcdFx0XHRcdGZpbHRlci5hbGxDaGVja2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRmaWx0ZXIuY2hlY2tib3hlcy5mb3JFYWNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRlLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHRjdHJsLnVwZGF0ZURhdGEgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0ZGVidWcoJ3VwZGF0ZURhdGEnLCByZXN1bHQsIHRoaXMuZmlsdGVycy5sb2FkZWQpO1xuXHRcdGlmICghdGhpcy5maWx0ZXJzLmxvYWRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBmYWNldHMgPSByZXN1bHQuZmFjZXRzTWV0YTtcblx0XHRpZiAoIWZhY2V0cykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHNlYXJjaENvbmZpZy5zZWN0aW9uc19tZXJnZWQuZmlsdGVyaW5nX2ZhY2V0cy5mb3JFYWNoKChmYWNldENvbmZpZykgPT4ge1xuXHRcdFx0bGV0IGZhY2V0ID0gZmFjZXRzW2ZhY2V0Q29uZmlnLm5hbWVdO1xuXG5cdFx0XHRsZXQgZmlsdGVycyA9IHRoaXMuZmlsdGVycy5kYXRhLmZpbHRlcnMuZ2V0KGZhY2V0Q29uZmlnLm5hbWUpO1xuXHRcdFx0aWYgKCFmaWx0ZXJzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjYiBvZiBmaWx0ZXJzLmNoZWNrYm94ZXMpIHtcblx0XHRcdFx0bGV0IGNvdW50ID0gMDtcblx0XHRcdFx0aWYgKGZhY2V0KSB7XG5cdFx0XHRcdFx0bGV0IGZhY2V0diA9IGZhY2V0W2NiLnZhbHVlXTtcblx0XHRcdFx0XHRpZiAoZmFjZXR2KSB7XG5cdFx0XHRcdFx0XHRjb3VudCA9IGZhY2V0di5jb3VudCB8IGZhY2V0djtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2IuY291bnQgPSBjb3VudDtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblxuXHRjdHJsLmluaXREYXRhID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmICh0aGlzLmZpbHRlcnMubG9hZGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRlYnVnKCdpbml0RGF0YScsIHJlc3VsdCk7XG5cblx0XHR0aGlzLmZpbHRlcnMuZGF0YS5zdGF0cyA9IHJlc3VsdC5zdGF0cztcblxuXHRcdGlmICghcmVzdWx0LmZhY2V0c01ldGEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZmFjZXRzID0gcmVzdWx0LmZhY2V0c01ldGE7XG5cblx0XHRzZWFyY2hDb25maWcuc2VjdGlvbnNfbWVyZ2VkLmZpbHRlcmluZ19mYWNldHMuZm9yRWFjaCgoZmFjZXRDb25maWcpID0+IHtcblx0XHRcdGxldCBmYWNldCA9IGZhY2V0c1tmYWNldENvbmZpZy5uYW1lXTtcblxuXHRcdFx0bGV0IGNoZWNrYm94ZXMgPSBbXTtcblx0XHRcdGZvciAobGV0IGsgaW4gZmFjZXQpIHtcblx0XHRcdFx0bGV0IHYgPSBmYWNldFtrXTtcblx0XHRcdFx0bGV0IGNvdW50ID0gdi5jb3VudCB8fCB2O1xuXHRcdFx0XHRsZXQgdGl0bGUgPSB2Lm1ldGEgPyB2Lm1ldGEubGlua1RpdGxlIDogaztcblx0XHRcdFx0bGV0IG9yZGluYWwgPSB2Lm1ldGEgPyB2Lm1ldGEub3JkaW5hbCA6IDA7XG5cdFx0XHRcdGNoZWNrYm94ZXMucHVzaCh7IHZhbHVlOiBrLCB0aXRsZTogdGl0bGUsIGNvdW50OiBjb3VudCwgY2hlY2tlZDogZmFsc2UsIG9yZGluYWw6IG9yZGluYWwgfSk7XG5cdFx0XHR9XG5cblx0XHRcdGNoZWNrYm94ZXMuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHRpZiAoYS5vcmRpbmFsID09PSBiLm9yZGluYWwpIHtcblx0XHRcdFx0XHRyZXR1cm4gYS50aXRsZSA8IGIudGl0bGUgPyAtMSA6IDE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYS5vcmRpbmFsID09PSAwID8gMSA6IGEub3JkaW5hbCAtIGIub3JkaW5hbDtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmZpbHRlcnMuZGF0YS5maWx0ZXJzLnNldChmYWNldENvbmZpZy5uYW1lLCB7XG5cdFx0XHRcdGhpZGRlbjogZmFjZXRDb25maWcuaXNUYWdzLFxuXHRcdFx0XHR0aXRsZTogZmFjZXRDb25maWcudGl0bGUsXG5cdFx0XHRcdG5hbWU6IGZhY2V0Q29uZmlnLm5hbWUsXG5cdFx0XHRcdGFsbENoZWNrZWQ6IHRydWUsXG5cdFx0XHRcdHdhc0FsbENoZWNrZWQ6IHRydWUsXG5cdFx0XHRcdGNoZWNrYm94ZXM6IGNoZWNrYm94ZXMsXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMucG9wdWxhdGVGaWx0ZXJzKCk7XG5cdFx0ZGVidWcoJ2ZpbHRlcnMgbG9hZGVkOicsIHRoaXMuZmlsdGVycy5kYXRhLmZpbHRlcnMpO1xuXHRcdHRoaXMuZmlsdGVycy5sb2FkZWQgPSB0cnVlO1xuXHR9O1xuXG5cdGN0cmwucG9wdWxhdGVGaWx0ZXJzID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcblx0XHRpZiAoIWZvcmNlICYmIHRoaXMuZmlsdGVycy5sb2FkZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZGVidWcoJ3BvcHVsYXRlRmlsdGVycycpO1xuXHRcdC8vIEdldCB0aGUgVUkgaW4gc3luY2ggd2l0aCB0aGUgc2VhcmNoIHBhcmFtcy5cblx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldFEoKTtcblx0XHR0aGlzLmZpbHRlcnMuZGF0YS5maWx0ZXJzLmZvckVhY2goKGZpbHRlciwga2V5KSA9PiB7XG5cdFx0XHRsZXQgdmFscyA9IHF1ZXJ5LmZpbHRlcnMuZ2V0KGtleSk7XG5cdFx0XHRpZiAodmFscyAmJiB2YWxzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0ZmlsdGVyLmFsbENoZWNrZWQgPSBmYWxzZTtcblx0XHRcdFx0ZmlsdGVyLmNoZWNrYm94ZXMuZm9yRWFjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdGUuY2hlY2tlZCA9IHZhbHMuaW5jbHVkZXMoZS52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmaWx0ZXIuYWxsQ2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdGZpbHRlci5jaGVja2JveGVzLmZvckVhY2goKGUpID0+IHtcblx0XHRcdFx0XHRlLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRmaWx0ZXIud2FzQWxsQ2hlY2tlZCA9IGZpbHRlci5hbGxDaGVja2VkO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5maWx0ZXJzLmRhdGEudGFncy5maWx0ZXIgPSB0aGlzLmZpbHRlcnMuZGF0YS5maWx0ZXJzLmdldCgndGFncycpO1xuXHRcdHRoaXMuZmlsdGVycy5kYXRhLmF1dGhvcnMuZmlsdGVyID0gdGhpcy5maWx0ZXJzLmRhdGEuZmlsdGVycy5nZXQoJ2F1dGhvcnMnKTtcblx0fTtcblxuXHQvLyBhcHBseSBhcHBsaWVzIHRoZSBjdXJyZW50IFVJIGZpbHRlcnMuIFRoaXMgaXMgaW52b2tlZCBvbiBhbnkgY2hhbmdlLlxuXHRjdHJsLmFwcGx5ID0gZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnKCdhcHBseScpO1xuXHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0USgpO1xuXHRcdC8vIENsZWFyIGZpbHRlcnMsIHByZXNlcnZlIHEuXG5cdFx0cXVlcnkuZmlsdGVycy5jbGVhcigpO1xuXHRcdHF1ZXJ5LnAgPSAwO1xuXG5cdFx0dGhpcy5maWx0ZXJzLmRhdGEuZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIGZhY2V0TmFtZSkgPT4ge1xuXHRcdFx0Ly8gSWYgYWxsIGNoZWNrZWQgaXMgcHJlc3NlZFxuXHRcdFx0aWYgKGZpbHRlci5hbGxDaGVja2VkKSB7XG5cdFx0XHRcdGZvciAobGV0IGNiIG9mIGZpbHRlci5jaGVja2JveGVzKSB7XG5cdFx0XHRcdFx0aWYgKGNiLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGZpbHRlci5hbGxDaGVja2VkID0gIWZpbHRlci53YXNBbGxDaGVja2VkO1xuXHRcdFx0XHRcdFx0aWYgKCFmaWx0ZXIuYWxsQ2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNiLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHNvbWVDaGVja2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBjYiBvZiBmaWx0ZXIuY2hlY2tib3hlcykge1xuXHRcdFx0XHRpZiAoIWZpbHRlci5hbGxDaGVja2VkICYmIGNiLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRzb21lQ2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdFx0cXVlcnkuYWRkRmlsdGVyKGZhY2V0TmFtZSwgY2IudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZpbHRlci5hbGxDaGVja2VkID0gZmlsdGVyLmFsbENoZWNrZWQgfHwgIXNvbWVDaGVja2VkO1xuXHRcdFx0ZmlsdGVyLndhc0FsbENoZWNrZWQgPSBmaWx0ZXIuYWxsQ2hlY2tlZDtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4gY3RybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9wUmVzdWx0c1BhZ2UoKSB7XG5cdHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcygndG9wcmVzdWx0cycpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tzZWFyY2gtaW5wdXRdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1NlYXJjaElucHV0Q29udHJvbGxlcigpIHtcblx0cmV0dXJuIHtcblx0XHRmb2N1czogZmFsc2UsXG5cdFx0Y2xpY2s6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuJHN0b3JlLm5hdi5vcGVuU2VhcmNoUGFuZWwoKTtcblx0XHR9LFxuXHRcdG9wZW46IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuJHN0b3JlLm5hdi5vcGVuU2VhcmNoUGFuZWwoKTtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCB9KTtcblx0XHRcdHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0dGhpcy4kcmVmcy5zZWFyY2hpbnB1dC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRzZXRGb2N1czogZnVuY3Rpb24gKGZvY3VzKSB7XG5cdFx0XHR0aGlzLmZvY3VzID0gZm9jdXM7XG5cdFx0fSxcblx0XHRjbG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy4kc3RvcmUubmF2LnNlYXJjaFJlc3VsdHMgPSB7IG9wZW46IGZhbHNlLCB1c2VyQ2hhbmdlOiB0cnVlIH07XG5cdFx0fSxcblx0fTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGlzTW9iaWxlLCB0b2dnbGVCb29sZWFuQ2xhc3MgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNUb3BSZXN1bHRzUGFnZSB9IGZyb20gJy4uL3NlYXJjaCc7XG5pbXBvcnQgeyBuZXdRdWVyeSwgUXVlcnlIYW5kbGVyIH0gZnJvbSAnLi4vc2VhcmNoL3F1ZXJ5JztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tuYXZiYXJdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuY29uc3QgcXVlcnlIYW5kbGVyID0gbmV3IFF1ZXJ5SGFuZGxlcigpO1xuXG5leHBvcnQgY29uc3QgZ2V0U2Nyb2xsUG9zTmF2YmFyID0gZnVuY3Rpb24gKCkge1xuXHRsZXQgaCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpLmdldFByb3BlcnR5VmFsdWUoJy0taGVpZ2h0LXNpdGViYXktbWVudS1yb3cnKTtcblx0cmV0dXJuIHBhcnNlSW50KGgsIDEwKSAtIDE7XG59O1xuXG4vLyBDYWxsZWQgd2hlbiB0aGUgc2VhcmNoIG1haW4gcmVzdWx0cyBwYW5lbCBvcGVucyBvciBjbG9zZXMuXG5jb25zdCBvbk5hdlNlYXJjaFJlc3VsdHMgPSBmdW5jdGlvbiAoc2VsZiwgdmFsLCBvbGRWYWwpIHtcblx0aWYgKHZhbC5vcGVuID09PSBvbGRWYWwub3Blbikge1xuXHRcdGlmICghdmFsLm9wZW4gJiYgdmFsLnVzZXJDaGFuZ2UpIHtcblx0XHRcdC8vIENsaWNraW5nIHRoZSB4IHdoZW4gdGhlIHBhbmVsIGlzIGFscmVhZHkgY2xvc2VkLlxuXHRcdFx0c2VsZi4kc3RvcmUuc2VhcmNoLmNsZWFyUXVlcnkoKTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmICghdmFsLnVzZXJDaGFuZ2UpIHtcblx0XHQvLyBOb3QgYSB1c2VyIGFjdGlvbi5cblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoIXZhbC5vcGVuKSB7XG5cdFx0Ly8gQ2xlYXIgZmlsdGVycyBhbmQgbmF2aWdhdGUgYmFjayBvciBob21lLlxuXHRcdHNlbGYuJHN0b3JlLnNlYXJjaC5xdWVyeSA9IG5ld1F1ZXJ5KCk7XG5cdFx0c2VsZi4kc3RvcmUubmF2LmdvQmFjaygpO1xuXHR9IGVsc2Uge1xuXHRcdGxldCBuZXdTZWFyY2ggPSAhaXNUb3BSZXN1bHRzUGFnZSgpO1xuXHRcdGlmIChuZXdTZWFyY2gpIHtcblx0XHRcdGxldCBxdWVyeVN0cmluZyA9IHF1ZXJ5SGFuZGxlci5xdWVyeVRvUXVlcnlTdHJpbmcoc2VsZi4kc3RvcmUuc2VhcmNoLnF1ZXJ5KTtcblx0XHRcdGlmIChxdWVyeVN0cmluZykge1xuXHRcdFx0XHRxdWVyeVN0cmluZyA9ICc/JyArIHF1ZXJ5U3RyaW5nO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi4kc3RvcmUubmF2LnB1c2hUb3BSZXN1bHRzKHF1ZXJ5U3RyaW5nKTtcblx0XHR9XG5cdH1cbn07XG5cbmNvbnN0IGFwcGx5VUlTdGF0ZSA9IGZ1bmN0aW9uIChzZWxmLCBpbml0ID0gZmFsc2UpIHtcblx0bGV0IHNldENsYXNzQW5kV2F0Y2ggPSAoaW5pdFZhbHVlLCBwcm9wLCBiYXNlQ2xhc3MpID0+IHtcblx0XHR0b2dnbGVCb29sZWFuQ2xhc3MoYmFzZUNsYXNzLCBkb2N1bWVudC5ib2R5LCBpbml0VmFsdWUpO1xuXHRcdGlmIChpbml0KSB7XG5cdFx0XHRzZWxmLiR3YXRjaChwcm9wLCAodmFsLCBvbGRWYWwpID0+IHtcblx0XHRcdFx0dG9nZ2xlQm9vbGVhbkNsYXNzKGJhc2VDbGFzcywgZG9jdW1lbnQuYm9keSwgdmFsKTtcblxuXHRcdFx0XHRzd2l0Y2ggKHByb3ApIHtcblx0XHRcdFx0XHRjYXNlICckc3RvcmUubmF2Lm9wZW4uZXhwbG9yZXInOlxuXHRcdFx0XHRcdFx0aWYgKHZhbCAmJiBpc01vYmlsZSgpICYmIHNlbGYuJHN0b3JlLm5hdi5vcGVuLnRvYykge1xuXHRcdFx0XHRcdFx0XHRzZWxmLiRzdG9yZS5uYXYub3Blbi50b2MgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0aWYgKGluaXQpIHtcblx0XHRzZWxmLiR3YXRjaCgnJHN0b3JlLm5hdi5zZWFyY2hSZXN1bHRzJywgKHZhbCwgb2xkVmFsKSA9PiB7XG5cdFx0XHRvbk5hdlNlYXJjaFJlc3VsdHMoc2VsZiwgdmFsLCBvbGRWYWwpO1xuXHRcdH0pO1xuXHR9XG5cblx0c2V0Q2xhc3NBbmRXYXRjaChzZWxmLiRzdG9yZS5uYXYuc2VhcmNoUmVzdWx0cy5vcGVuLCAnJHN0b3JlLm5hdi5zZWFyY2hSZXN1bHRzLm9wZW4nLCAnc2VhcmNoLXBhbmVsLW9wZW4nKTtcblx0c2V0Q2xhc3NBbmRXYXRjaChzZWxmLiRzdG9yZS5uYXYub3Blbi5leHBsb3JlciwgJyRzdG9yZS5uYXYub3Blbi5leHBsb3JlcicsICdleHBsb3Jlci1vcGVuJyk7XG5cdHNldENsYXNzQW5kV2F0Y2goc2VsZi4kc3RvcmUubmF2Lm9wZW4udG9jLCAnJHN0b3JlLm5hdi5vcGVuLnRvYycsICd0b2Mtb3BlbicpO1xuXHRzZXRDbGFzc0FuZFdhdGNoKHNlbGYuJHN0b3JlLm5hdi5waW5uZWQsICckc3RvcmUubmF2LnBpbm5lZCcsICd0b3BiYXItcGlubmVkJyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3TmF2Q29udHJvbGxlcih3ZWdsb3RfYXBpX2tleSkge1xuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGFwcGx5VUlTdGF0ZSh0aGlzLCB0cnVlKTtcblxuXHRcdFx0aWYgKGlzVG9wUmVzdWx0c1BhZ2UoKSkge1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5zZWFyY2guc2VhcmNoVG9nZ2xlKHRydWUpO1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5uYXYuc2VhcmNoUmVzdWx0cy5vcGVuID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5xdWVyeSA9IHF1ZXJ5SGFuZGxlci5xdWVyeUZyb21Mb2NhdGlvbigpO1xuXHRcdFx0dGhpcy4kd2F0Y2goJyRzdG9yZS5zZWFyY2gucXVlcnkubG5kcScsICh2YWwsIG9sZFZhbCkgPT4ge1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5zZWFyY2gucXVlcnkubG5kcUNsZWFyZWQgPSBvbGRWYWwgJiYgIXZhbDtcblxuXHRcdFx0XHQvLyBOYXZpZ2F0ZSBiYWNrIHRvIHBhZ2UgMCB3aGVuIHRoZSB1c2VyIGNoYW5nZXMgdGhlIHRleHQgaW5wdXQuXG5cdFx0XHRcdGlmICh0aGlzLiRzdG9yZS5zZWFyY2gucXVlcnkucCkge1xuXHRcdFx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5xdWVyeS5wID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdG9uT3B0YW5vbkdyb3Vwc1VwZGF0ZWQ6IGZ1bmN0aW9uIChncm91cHMpIHtcblx0XHRcdHRoaXMuJHN0b3JlLm5hdi51cGRhdGVPcHRhbm9uR3JvdXBzKGdyb3Vwcyk7XG5cdFx0fSxcblxuXHRcdG9uRWZmZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLiRzdG9yZS5zZWFyY2gudXBkYXRlTG9jYXRpb25XaXRoUXVlcnkoKTtcblx0XHR9LFxuXG5cdFx0b25Qb3BTdGF0ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRpZiAoaXNUb3BSZXN1bHRzUGFnZSgpKSB7XG5cdFx0XHRcdHRoaXMuJHN0b3JlLnNlYXJjaC5xdWVyeSA9IHF1ZXJ5SGFuZGxlci5xdWVyeUZyb21Mb2NhdGlvbigpO1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5uYXYuc2VhcmNoUmVzdWx0cy5vcGVuID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy4kc3RvcmUubmF2LnNlYXJjaFJlc3VsdHMub3Blbikge1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5uYXYuc2VhcmNoUmVzdWx0cy5vcGVuID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9uVHVyYm9CZWZvcmVSZW5kZXI6IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0aWYgKCFpc1RvcFJlc3VsdHNQYWdlKCkpIHtcblx0XHRcdFx0Ly8gQWx3YXlzIGhpZGUgdGhlIHNlYXJjaCBwYW5lbCB1bmxlc3Mgb24gdGhlIHNlYXJjaCBwYWdlLlxuXHRcdFx0XHR0aGlzLiRzdG9yZS5uYXYuc2VhcmNoUmVzdWx0cyA9IHsgb3BlbjogZmFsc2UgfTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b25UdXJib1JlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHVyYm8tcHJldmlldycpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0YXBwbHlVSVN0YXRlKHRoaXMsIGZhbHNlKTtcblxuXHRcdFx0aWYgKGRvY3VtZW50LmJvZHkuZGF0YXNldC5vYmplY3RpZCkge1xuXHRcdFx0XHQvLyBBZGQgYSB2aWV3IGV2ZW50IHRvIEFsZ29saWEgYW5hbHl0aWNzLlxuXHRcdFx0XHRsZXQgYW5hbHl0aWNzSXRlbSA9IHtcblx0XHRcdFx0XHRfX3F1ZXJ5SUQ6IHRoaXMuJHN0b3JlLnNlYXJjaC5yZXN1bHRzLmxhc3RRdWVyeUlELFxuXHRcdFx0XHRcdG9iamVjdElEOiBkb2N1bWVudC5ib2R5LmRhdGFzZXQub2JqZWN0aWQsXG5cdFx0XHRcdFx0ZXZlbnQ6ICd2aWV3Jyxcblx0XHRcdFx0XHRldmVudE5hbWU6ICdET0NTOiBHdWlkZSBOYXZpZ2F0ZScsXG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMuJHN0b3JlLm5hdi5hbmFseXRpY3MuaGFuZGxlci5wdXNoSXRlbShhbmFseXRpY3NJdGVtKTtcblx0XHRcdFx0dGhpcy4kc3RvcmUubmF2LmFuYWx5dGljcy5oYW5kbGVyLnN0YXJ0TmV3UGFnZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKlxuXHRcdFx0VE9ETyhiZXApIHRoaXMgY2F1c2VzIGEgZmxpY2tlciBlZmZlY3QgaW4gVHVyYm8uXG5cdFx0XHRTZWUgaHR0cHM6Ly9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL2lzc3Vlcy8zNTQjaXNzdWVjb21tZW50LTkxMzEzMjI2NFxuXHRcdFx0aWYgKHRoaXMuJHN0b3JlLm5hdi5waW5uZWQpIHtcblx0XHRcdFx0dGhpcy5yZWxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdGxldCBzY3JvbGxQb3NOYXZiYXIgPSBnZXRTY3JvbGxQb3NOYXZiYXIoKTtcblx0XHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuXHRcdFx0XHRcdC8vd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFBvc05hdmJhcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSovXG5cdFx0fSxcblxuXHRcdG9uU2Nyb2xsOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dGhpcy4kc3RvcmUubmF2LmFuYWx5dGljcy5vblNjcm9sbCgpO1xuXHRcdFx0bGV0IHNjcm9sbHBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdFx0bGV0IHNjcm9sbFBvc05hdmJhciA9IGdldFNjcm9sbFBvc05hdmJhcigpO1xuXHRcdFx0aWYgKHNjcm9sbHBvcyA+PSBzY3JvbGxQb3NOYXZiYXIpIHtcblx0XHRcdFx0aWYgKCF0aGlzLiRzdG9yZS5uYXYucGlubmVkKSB7XG5cdFx0XHRcdFx0dGhpcy4kc3RvcmUubmF2LnBpbm5lZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoIXNlbGYucmVsb2FkZWQgJiYgdGhpcy4kc3RvcmUubmF2LnBpbm5lZCAmJiBzY3JvbGxwb3MgPCAxMCkge1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5uYXYucGlubmVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLnJlbG9hZGVkID0gZmFsc2U7XG5cdFx0fSxcblx0fTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGlzRGVza3RvcCwgaXNNb2JpbGUgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW3RvY10nKSA6IGZ1bmN0aW9uICgpIHt9O1xudmFyIGRldk1vZGUgPSBmYWxzZTtcblxuY29uc3Qgc2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbiAoc2VsZiwgZWwpIHtcblx0bGV0IG1haW5FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluX19jb250ZW50Jyk7XG5cdGxldCBtYWluSGVpZ2h0ID0gbWFpbkVsLm9mZnNldEhlaWdodDtcblx0bGV0IG1haW5TdGFydCA9IG1haW5FbC5vZmZzZXRUb3A7XG5cdGxldCBwcm9ncmVzcyA9IE1hdGgucm91bmQoKChlbC5vZmZzZXRUb3AgLSBtYWluU3RhcnQpIC8gbWFpbkhlaWdodCkgKiAxMDApO1xuXHRzZWxmLmFjdGl2ZUhlYWRpbmcudGl0bGUgPSBlbC5pbm5lclRleHQ7XG5cdHNlbGYuYWN0aXZlSGVhZGluZy5wcm9ncmVzcyA9IHByb2dyZXNzO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1RvQ0NvbnRyb2xsZXIoXG5cdG9wdHMgPSB7XG5cdFx0bGV2ZWwyT25seTogZmFsc2UsXG5cdFx0c2V0UHJvZ3Jlc3M6IHRydWUsXG5cdFx0ZGVza3RvcE9ubHk6IGZhbHNlLFxuXHR9LFxuKSB7XG5cdHJldHVybiB7XG5cdFx0YWN0aXZlSGVhZGluZzoge1xuXHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0cHJvZ3Jlc3M6IDAsXG5cdFx0fSxcblx0XHRkZXN0cm95ZWQ6IGZhbHNlLFxuXHRcdGVuYWJsZWQ6IGZhbHNlLFxuXHRcdHNob3dIZWFkaW5nOiB0cnVlLFxuXHRcdG9wdHM6IG9wdHMsXG5cdFx0aXNBY3RpdmU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLm9wdHMuZGVza3RvcE9ubHkgJiYgIWlzRGVza3RvcCgpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0aW5pdFRvQzogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IHsgbGV2ZWwyT25seSB9ID0gdGhpcy5vcHRzO1xuXHRcdFx0aWYgKGxldmVsMk9ubHkpIHtcblx0XHRcdFx0dGhpcy5oZWFkZXJFbHMgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbWFpbl9fY29udGVudCBoMicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5oZWFkZXJFbHMgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbWFpbl9fY29udGVudCBoMiwgI21haW5fX2NvbnRlbnQgaDMnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRldk1vZGUpIHtcblx0XHRcdFx0dGhpcy4kc3RvcmUubmF2Lm9wZW4udG9jID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVRPQygpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgKHR5cGljYWxseSBvbiBudmlnYXRpb24gdG8gYSBuZXcgcGFnZSkuXG5cdFx0XHR0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG5cdFx0fSxcblxuXHRcdGNyZWF0ZVRPQzogZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gVGhlcmUgYXJlIHNvbWUgcmFyZSBzaXR1YXNpb24gKGUuZy4gaWYgYSB1c2VyIGNsaWNrcyByZXBlYWRlZGx5IHJlYWxseSBmYXN0IG9uIGEgZ2l2ZW4gbGluayBpbiB0aGUgZXhwbG9yZXIpLFxuXHRcdFx0Ly8gdGhlbiBjcmVhdGVUb0MgY2FuIGJlIGNhbGxlZCBvbiBhIGRlc3Ryb3llZCBjb21wb25lbnQuIFRoaXMgY2hlY2sgcHJldmVudHMgdGhhdC5cblx0XHRcdGlmICh0aGlzLmRlc3Ryb3llZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgc2VsZiA9IHRoaXM7XG5cdFx0XHRzZWxmLmFjdGl2ZUhlYWRpbmcudGl0bGUgPSAnJztcblx0XHRcdGxldCBvbCA9IHRoaXMuJHJlZnMub2w7XG5cdFx0XHRsZXQgb2xGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdGxldCByb3cgPSBbXTtcblx0XHRcdGxldCBwcmV2TGV2ZWwgPSAwO1xuXG5cdFx0XHR0aGlzLmhlYWRlckVscygpLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRcdGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9jLWlnbm9yZScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIFNraXAgaGlkZGVuIGVsZW1lbnRzIGFuZCBoZWFkZXJzIHdpdGhvdXQgSUQuXG5cdFx0XHRcdGlmICghZWwgfHwgZWwub2Zmc2V0UGFyZW50ID09PSBudWxsIHx8ICFlbC5pZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxmLmVuYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRsZXQgaWQgPSBlbC5pZDtcblx0XHRcdFx0bGV0IGxldmVsID0gcGFyc2VJbnQoZWwubm9kZU5hbWUuc3Vic3RyaW5nKDEpLCAxMCk7XG5cblx0XHRcdFx0Ly8gV2UgbmVlZCB0byBzdGFydCBvdXQgd2l0aCBhIGxldmVsIDIgaGVhZGVyIGZvciB0aGUgbG9naWNcblx0XHRcdFx0Ly8gYmVsb3cgdG8gd29yay5cblx0XHRcdFx0aWYgKHByZXZMZXZlbCA9PT0gMCAmJiBsZXZlbCAhPSAyKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuXHRcdFx0XHRsaS5jbGFzc0xpc3QuYWRkKGBsZXZlbC0ke2xldmVsfWApO1xuXG5cdFx0XHRcdGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG5cdFx0XHRcdGEuc2V0QXR0cmlidXRlKCdocmVmJywgYCMke2lkfWApO1xuXHRcdFx0XHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdFx0XHRjb25zdCB7IGhyZWYgfSA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdGNvbnN0IHRhcmdldFVybCA9IG5ldyBVUkwoaHJlZik7XG5cdFx0XHRcdFx0bGV0IGhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRVcmwuaGFzaC5zdWJzdHJpbmcoMSkpO1xuXHRcdFx0XHRcdHNlbGYuY2xvc2VJZk1vYmlsZSgpO1xuXHRcdFx0XHRcdGlmIChoZWFkaW5nKSB7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHQvLyAyNCBweCB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0XHQvLyArIDU2IHB4IGZvciBwaW5uZWQgdG9wYmFyXG5cdFx0XHRcdFx0XHQvLyBPUlxuXHRcdFx0XHRcdFx0Ly8gKyA5NyBweCBmb3IgdW5waW5uZWQgdG9wYmFyXG5cdFx0XHRcdFx0XHRsZXQgc3BhY2VBYm92ZSA9IDI0ICsgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy10b3BiYXItcGlubmVkJykgPyA1NiA6IDk3KTtcblx0XHRcdFx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdFx0XHRcdGxlZnQ6IDAsXG5cdFx0XHRcdFx0XHRcdHRvcDogaGVhZGluZy5vZmZzZXRUb3AgLSBzcGFjZUFib3ZlLFxuXHRcdFx0XHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCcsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdC8vIFdlIHdhbnQgdGhlIHNtb290aCBzY3JvbGwgQU5EIHRoZSBoYXNoIHRvIGJlIHVwZGF0ZWQgLS0gd2l0aG91dCB0cmlnZ2VyaW5nIGFueSBoYXNoY2hhbmdlIGV2ZW50LlxuXHRcdFx0XHRcdFx0aWYgKGhpc3RvcnkucHVzaFN0YXRlKSB7XG5cdFx0XHRcdFx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRhcmdldFVybC5oYXNoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoYS5hdHRyaWJ1dGVzLmhyZWYudmFsdWUgPT09IHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG5cdFx0XHRcdFx0bGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0XHRcdFx0c2V0UHJvZ3Jlc3Moc2VsZiwgZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGEuaW5uZXJIVE1MID0gZWwuaW5uZXJUZXh0O1xuXG5cdFx0XHRcdGxpLmFwcGVuZENoaWxkKGEpO1xuXG5cdFx0XHRcdGlmIChsZXZlbCA9PSAyKSB7XG5cdFx0XHRcdFx0cm93Lmxlbmd0aCA9IDA7XG5cdFx0XHRcdFx0cm93LnB1c2gob2xGcmFnbWVudCk7XG5cdFx0XHRcdFx0b2xGcmFnbWVudC5hcHBlbmRDaGlsZChsaSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IHByZXZMZXZlbCkge1xuXHRcdFx0XHRcdGxldCBvbCA9IHJvd1tyb3cubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0b2wuYXBwZW5kQ2hpbGQobGkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGxldmVsID4gcHJldkxldmVsKSB7XG5cdFx0XHRcdFx0bGV0IG9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcblx0XHRcdFx0XHRsZXQgbGkyID0gcm93W3Jvdy5sZW5ndGggLSAxXS5sYXN0Q2hpbGQ7XG5cdFx0XHRcdFx0bGkyLmFwcGVuZENoaWxkKG9sKTtcblx0XHRcdFx0XHRvbC5hcHBlbmRDaGlsZChsaSk7XG5cdFx0XHRcdFx0cm93LnB1c2gob2wpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGxldmVsIDwgcHJldkxldmVsKSB7XG5cdFx0XHRcdFx0bGV0IGRpZmYgPSBwcmV2TGV2ZWwgLSBsZXZlbDtcblx0XHRcdFx0XHRyb3cubGVuZ3RoID0gcm93Lmxlbmd0aCAtIGRpZmY7XG5cdFx0XHRcdFx0bGV0IG9sID0gcm93W3Jvdy5sZW5ndGggLSAxXTtcblx0XHRcdFx0XHRvbC5hcHBlbmRDaGlsZChsaSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJldkxldmVsID0gbGV2ZWw7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHtcblx0XHRcdFx0dGhpcy4kc3RvcmUubmF2Lm9wZW4udG9jID0gZmFsc2U7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT24gbW9iaWxlLCBhZGQgY2xvc2Uvb3BlbiB0byBoMiBoZWFkZXJzIHdpdGggZGVzY2VuZGFudHMuXG5cdFx0XHRpZiAoaXNNb2JpbGUoKSAmJiB0aGlzLiRyZWZzLmhlYWRlckNsb3NlQnV0dG9uKSB7XG5cdFx0XHRcdG9sRnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxldmVsLTInKS5mb3JFYWNoKChsaSkgPT4ge1xuXHRcdFx0XHRcdGlmIChsaS5xdWVyeVNlbGVjdG9yKCdsaScpICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRsaS5zZXRBdHRyaWJ1dGUoJ3gtZGF0YScsICd7IG9wZW46IGZhbHNlIH0nKTtcblx0XHRcdFx0XHRcdGxldCBvbCA9IGxpLnF1ZXJ5U2VsZWN0b3IoJ29sJyk7XG5cdFx0XHRcdFx0XHRvbC5zZXRBdHRyaWJ1dGUoJ3gtc2hvdycsICdvcGVuJyk7XG5cdFx0XHRcdFx0XHRvbC5zZXRBdHRyaWJ1dGUoJ3gtdHJhbnNpdGlvbicsICcnKTtcblx0XHRcdFx0XHRcdGxldCBjbG9zZUVsID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLiRyZWZzLmhlYWRlckNsb3NlQnV0dG9uLmNvbnRlbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyksIHRydWUpO1xuXHRcdFx0XHRcdFx0bGkuYXBwZW5kQ2hpbGQoY2xvc2VFbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdG9sLnJlcGxhY2VDaGlsZHJlbihvbEZyYWdtZW50KTtcblx0XHR9LFxuXHRcdHRvZ2dsZU9wZW46IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuJHN0b3JlLm5hdi5vcGVuLnRvYyA9ICF0aGlzLiRzdG9yZS5uYXYub3Blbi50b2M7XG5cdFx0fSxcblx0XHRjbG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuJHN0b3JlLm5hdi5vcGVuLnRvYykge1xuXHRcdFx0XHR0aGlzLiRzdG9yZS5uYXYub3Blbi50b2MgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNsb3NlSWZNb2JpbGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChpc01vYmlsZSgpKSB7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG9uSGFzaGNoYW5nZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IGlkID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcblx0XHRcdGxldCBzZWxmID0gdGhpcztcblx0XHRcdHRoaXMuaGVhZGVyRWxzKCkuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdFx0aWYgKGVsLmlkID09PSBpZCkge1xuXHRcdFx0XHRcdHNldFByb2dyZXNzKHNlbGYsIGVsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRvblNjcm9sbDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCF0aGlzLmlzQWN0aXZlKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHNjcm9sbHBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuXHRcdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdFx0ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5cblx0XHRcdHRoaXMuaGVhZGVyRWxzKCkuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdFx0bGV0IG9mZnNldCA9IGVsLm9mZnNldFRvcDtcblxuXHRcdFx0XHRpZiAob2Zmc2V0ID4gc2Nyb2xscG9zICYmIG9mZnNldCA8IHNjcm9sbHBvcyArIDIwMCkge1xuXHRcdFx0XHRcdGxldCBvbCA9IHRoaXMuJHJlZnMub2w7XG5cdFx0XHRcdFx0b2wucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKChsaUVsKSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgYSA9IGxpRWwucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRcdFx0aWYgKCFhLmF0dHJpYnV0ZXMgfHwgIWEuYXR0cmlidXRlcy5ocmVmKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxldCBoYXNoID0gYCMke2VsLmlkfWA7XG5cblx0XHRcdFx0XHRcdGlmIChhLmF0dHJpYnV0ZXMuaHJlZi52YWx1ZSA9PT0gaGFzaCkge1xuXHRcdFx0XHRcdFx0XHRsaUVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0bGlFbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXRQcm9ncmVzcyhzZWxmLCBlbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAod2luZG93LmlubmVySGVpZ2h0ICsgc2Nyb2xscG9zID49IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0dGhpcy5hY3RpdmVIZWFkaW5nLnByb2dyZXNzID0gMTAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHR9O1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1twcm9tby1jb2Rlc10nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvbW9Db2Rlc0NvbnRyb2xsZXIoaXNUZXN0KSB7XG5cdGxldCBlbmRwb2ludCA9ICdodHRwczovL3d3dy5zaXRlYmF5Lm9yZy93cC1qc29uL3NpdGViYXkvdjEvcHJvbW8tZGF0YSc7XG5cdGlmIChpc1Rlc3QpIHtcblx0XHQvLyBsb2NhbGhvc3Qgb3IgTmV0bGlmeS5cblx0XHQvLyBVc2UgbG9jYWwgcmVzb3VyY2UgdG8gd29yayBhcm91bmQgQ09SUyBpc3N1ZXMuXG5cdFx0ZW5kcG9pbnQgPSAnL2RvY3Mvd3B0ZXN0anNvbi9wcm9tby1kYXRhLmpzb24nO1xuXHRcdC8vIFRoaXMgb25seSBldmVyIHNldCBpbiBkZXYvdGVzdCBlbnZpcm9ubWVudHMuXG5cdFx0aWYgKHdpbmRvdy5fX2FwaV9zaG91bGRmYWlsKSB7XG5cdFx0XHRlbmRwb2ludCA9ICcvZG9jcy93cHRlc3Rqc29uL3Byb21vLWRhdGEtZmFpbC5qc29uJztcblx0XHR9XG5cdH1cblx0ZGVidWcoJ2lzVGVzdDonLCBpc1Rlc3QsICdlbmRwb2ludDonLCBlbmRwb2ludCk7XG5cblx0cmV0dXJuIHtcblx0XHRkYXRhOiB7XG5cdFx0XHRmb286ICdiYXInLFxuXHRcdFx0Y29kZToge30sXG5cdFx0fSxcblx0XHRzaWdudXBVUkw6IGZ1bmN0aW9uICh3aXRoUHJvbW8pIHtcblx0XHRcdGNvbnN0IGJhc2VVUkwgPSAnaHR0cHM6Ly9teS5zaXRlYmF5Lm9yZy9zaWdudXAnO1xuXHRcdFx0bGV0IHByb21vID0gdGhpcy5wcm9tb0NvZGUoKTtcblx0XHRcdGlmICh3aXRoUHJvbW8gJiYgcHJvbW8pIHtcblx0XHRcdFx0cmV0dXJuIGJhc2VVUkwgKyAnP3Byb21vPScgKyBwcm9tbztcblx0XHRcdH1cblx0XHRcdHJldHVybiBiYXNlVVJMO1xuXHRcdH0sXG5cdFx0cHJvbW9Db2RlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhLmNvZGUucHJvbW9fY29kZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kYXRhLmNvZGUucHJvbW9fY29kZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAnJztcblx0XHR9LFxuXHRcdGluaXQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQpO1xuXHRcdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGxldCBjb2RlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0dGhpcy5kYXRhLmNvZGUgPSBjb2Rlcy5kb2NzO1xuXHRcdFx0XHRkZWJ1ZygnaW5pdCBjb2RlIGRvY3M6JywgdGhpcy5kYXRhKTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgZ2V0SW50UGFyYW1Gcm9tTG9jYXRpb24sIHVwZGF0ZVBhZ2luYXRpb25QYXJhbUluTG9jYXRpb24gfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW3BhZ2luYXRvcl0nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3UGFnaW5hdG9yQ29udHJvbGxlcigpIHtcblx0Y29uc3Qgc2Nyb2xsVG9Ub3AgPSAoKSA9PiB7XG5cdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHR9O1xuXG5cdGNvbnN0IHBhZ2VLZXkgPSAncGFnZSc7XG5cblx0cmV0dXJuIHtcblx0XHRwYWdlczogW10sXG5cdFx0aXRlbXM6IFtdLFxuXHRcdHBhZ2U6IDEsXG5cdFx0c2hvd0FsbDogZmFsc2UsXG5cblx0XHQvLyBQYWdlIG5hdmlnYXRpb24uXG5cdFx0Y3VycmVudCgpIHtcblx0XHRcdGlmICh0aGlzLnNob3dBbGwpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXRlbXM7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5wYWdlc1t0aGlzLmN1cnJlbnRQYWdlKCkgLSAxXTtcblx0XHR9LFxuXHRcdGN1cnJlbnRQYWdlKCkge1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHRoaXMucGFnZSwgMTApO1xuXHRcdH0sXG5cdFx0Zmlyc3QoKSB7XG5cdFx0XHR0aGlzLnBhZ2UgPSAxO1xuXHRcdFx0c2Nyb2xsVG9Ub3AoKTtcblx0XHR9LFxuXHRcdGxhc3QoKSB7XG5cdFx0XHR0aGlzLnBhZ2UgPSB0aGlzLnBhZ2VzLmxlbmd0aDtcblx0XHRcdHNjcm9sbFRvVG9wKCk7XG5cdFx0fSxcblx0XHRuZXh0KCkge1xuXHRcdFx0aWYgKHRoaXMucGFnZSA8IHRoaXMucGFnZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMucGFnZSsrO1xuXHRcdFx0fVxuXHRcdFx0c2Nyb2xsVG9Ub3AoKTtcblx0XHR9LFxuXHRcdHByZXYoKSB7XG5cdFx0XHRpZiAodGhpcy5wYWdlID4gMCkge1xuXHRcdFx0XHR0aGlzLnBhZ2UtLTtcblx0XHRcdH1cblx0XHRcdHNjcm9sbFRvVG9wKCk7XG5cdFx0fSxcblx0XHR0b2dnbGVBbGwoKSB7XG5cdFx0XHR0aGlzLnNob3dBbGwgPSAhdGhpcy5zaG93QWxsO1xuXHRcdFx0dGhpcy5wYWdlID0gdGhpcy5zaG93QWxsID8gLTEgOiAxO1xuXHRcdFx0c2Nyb2xsVG9Ub3AoKTtcblx0XHR9LFxuXHRcdHN0YXR1c1RleHQoKSB7XG5cdFx0XHRpZiAodGhpcy5zaG93QWxsKSB7XG5cdFx0XHRcdHJldHVybiAnQWxsIFBhZ2VzJztcblx0XHRcdH1cblx0XHRcdGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50UGFnZSgpO1xuXHRcdFx0bGV0IHRvdGFsID0gdGhpcy5wYWdlcy5sZW5ndGg7XG5cdFx0XHRyZXR1cm4gYFBhZ2UgJHtjdXJyZW50fSBvZiAke3RvdGFsfWA7XG5cdFx0fSxcblxuXHRcdGFzeW5jIGluaXRQYWdpbmF0b3IodXJsLCBwYWdlU2l6ZSkge1xuXHRcdFx0dGhpcy5wYWdlID0gZ2V0SW50UGFyYW1Gcm9tTG9jYXRpb24ocGFnZUtleSk7XG5cblx0XHRcdHRoaXMuJHdhdGNoKCdwYWdlJywgKHBhZ2UpID0+IHtcblx0XHRcdFx0dXBkYXRlUGFnaW5hdGlvblBhcmFtSW5Mb2NhdGlvbihwYWdlS2V5LCBwYWdlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRsZXQgZGF0YSA9IGF3YWl0IGZldGNoKHVybCk7XG5cdFx0XHRsZXQgaXRlbXMgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuXHRcdFx0Ly8gU3BsaXQgdGhlIGl0ZW1zIGludG8gcGFnZXMuXG5cdFx0XHRsZXQgcGFnZXMgPSBbXTtcblx0XHRcdGxldCBwYWdlID0gW107XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHBhZ2UucHVzaChpdGVtc1tpXSk7XG5cdFx0XHRcdGlmIChwYWdlLmxlbmd0aCA+PSBwYWdlU2l6ZSkge1xuXHRcdFx0XHRcdHBhZ2VzLnB1c2gocGFnZSk7XG5cdFx0XHRcdFx0cGFnZSA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAocGFnZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHBhZ2VzLnB1c2gocGFnZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnBhZ2VzID0gcGFnZXM7XG5cdFx0XHR0aGlzLml0ZW1zID0gaXRlbXM7XG5cblx0XHRcdGlmICh0aGlzLnBhZ2UgPCAwKSB7XG5cdFx0XHRcdHRoaXMuc2hvd0FsbCA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMucGFnZSA8IDEgfHwgdGhpcy5wYWdlID4gdGhpcy5wYWdlcy5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5wYWdlID0gMTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIiwgIi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9EYXZpZFdlbGxzL2FuYWx5dGljcy9tYXN0ZXIvcGFja2FnZXMvYW5hbHl0aWNzLXV0aWwtcXVldWUvc3JjL2luZGV4LmpzXG4vLyBNSVQgTGljZW5zZS5cbmNvbnN0IG5vT3AgPSAoKSA9PiB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNtYXJ0UXVldWUoaGFuZGxlciwgb3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblx0dmFyIHRpbWVyLCB0bXAsIHJ1bm5pbmc7XG5cdHZhciBxdWV1ZSA9IG9wdHMuaW5pdGlhbCB8fCBbXTtcblx0dmFyIG1heCA9IG9wdHMubWF4IHx8IEluZmluaXR5O1xuXHR2YXIgaW50ID0gb3B0cy5pbnRlcnZhbCB8fCAxMGUzO1xuXHR2YXIgb25FbXB0eSA9IG9wdHMub25FbXB0eSB8fCBub09wO1xuXHR2YXIgb25QYXVzZSA9IG9wdHMub25QYXVzZSB8fCBub09wO1xuXG5cdGZ1bmN0aW9uIGJhdGNoKGFsbCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXHRcdHZhciByZW1vdmVkID0gcXVldWUuc3BsaWNlKDAsIG1heCk7XG5cdFx0LyogSWYgcXVldWUgY2h1bmsgaGFzIG5vIGl0ZW1zICovXG5cdFx0Ly8gaWYgKCFyZW1vdmVkLmxlbmd0aCkge1xuXHRcdC8vICAgcnVubmluZyA9IGZhbHNlXG5cdFx0Ly8gICByZXR1cm4gb25FbmQocXVldWUsICdwcm9jZXNzLWVtcHR5Jylcblx0XHQvLyB9XG5cdFx0aWYgKHJlbW92ZWQubGVuZ3RoKSB7XG5cdFx0XHRoYW5kbGVyKHJlbW92ZWQsIHF1ZXVlKTtcblx0XHR9XG5cdFx0LyogSWYgcXVldWUgYmFja2xvZyBoYXMgbm8gaXRlbXMgKi9cblx0XHRpZiAoIXF1ZXVlLmxlbmd0aCkge1xuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdFx0Ly8gcmV0dXJuIG9uRW5kKHF1ZXVlLCAnZW5kJylcblx0XHRcdHJldHVybiBvbkVtcHR5KHF1ZXVlKTtcblx0XHR9XG5cblx0XHRpZiAoYWxsKSB7XG5cdFx0XHRyZXR1cm4gYmF0Y2goKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRpY2tlcigpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdGlja2VyKCkge1xuXHRcdHJ1bm5pbmcgPSB0cnVlO1xuXHRcdHRpbWVyID0gc2V0SW50ZXJ2YWwoYmF0Y2gsIGludCk7XG5cdH1cblxuXHQvLyBTdGFydCBxdWV1ZSBpZiBpdGVtc1xuXHRpZiAocXVldWUubGVuZ3RoKSB7XG5cdFx0dGlja2VyKCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGZsdXNoOiBmdW5jdGlvbiAoYWxsKSB7XG5cdFx0XHRiYXRjaChhbGwpO1xuXHRcdH0sXG5cdFx0cmVzdW1lOiBiYXRjaCxcblx0XHRwdXNoOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHR0bXAgPSBxdWV1ZS5wdXNoKHZhbCk7XG5cdFx0XHQvKiBDbGVhciBpZiBvdmVyZmxvdyAqL1xuXHRcdFx0aWYgKHRtcCA+PSBtYXggJiYgIW9wdHMudGhyb3R0bGUpIHtcblx0XHRcdFx0YmF0Y2goKTsgLy8gaW1tZWRpYXRlbHkgcHJvY2VzcyBvdmVyZmxvdyBpbiBxdWV1ZVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFydW5uaW5nKSB7XG5cdFx0XHRcdHRpY2tlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRtcDtcblx0XHR9LFxuXHRcdHNpemU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBxdWV1ZS5sZW5ndGg7XG5cdFx0fSxcblx0XHRwYXVzZTogZnVuY3Rpb24gKHRvRmx1c2gpIHtcblx0XHRcdGlmICh0b0ZsdXNoKSBiYXRjaCgpO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRvblBhdXNlKHF1ZXVlKTtcblx0XHRcdC8vIG9uRW1wdHkocXVldWUsICdlbmQtY2FsbGVkJylcblx0XHR9LFxuXHRcdC8vIGVuZCA9PT0gcGF1c2Vcblx0fTtcbn1cbiIsICJpbXBvcnQgeyBnZXRDb29raWUsIHNldENvb2tpZSwgc3VwcG9ydHNDb29raWVzLCBjcmVhdGVVVUlEIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcbmltcG9ydCB7IHNtYXJ0UXVldWUgfSBmcm9tICcuLi9oZWxwZXJzL3NtYXJ0cXVldWUnO1xuXG5jb25zdCB1bnNwZWNpZmljZWRVc2VyVG9rZW4gPSAndW5zcGVjaWZpZWQnO1xuY29uc3QgdXNlclRva2VuQ29va2llTmFtZSA9ICdsaW5vZGVfYW5vbnltb3VzX3VzZXJ0b2tlbic7XG5cbnZhciBkZWJ1ZyA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbbmF2LWFuYWx5dGljc10nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzRXZlbnRzQ29sbGVjdG9yIHtcblx0Y29uc3RydWN0b3Ioc2VhcmNoQ29uZmlnLCBnZXRMYXN0UXVlcnlJRCwgb25ldHJ1c3QpIHtcblx0XHR0aGlzLmhlYWRlcnMgPSB7XG5cdFx0XHQnWC1BbGdvbGlhLUFwcGxpY2F0aW9uLUlkJzogc2VhcmNoQ29uZmlnLmFwcF9pZCxcblx0XHRcdCdYLUFsZ29saWEtQVBJLUtleSc6IHNlYXJjaENvbmZpZy5hcGlfa2V5LFxuXHRcdH07XG5cblx0XHQodGhpcy5nZXRMYXN0UXVlcnlJRCA9IGdldExhc3RRdWVyeUlEKSwgKHRoaXMudXJsRXZlbnRzID0gYGh0dHBzOi8vaW5zaWdodHMuYWxnb2xpYS5pby8xL2V2ZW50c2ApO1xuXHRcdHRoaXMub25ldHJ1c3QgPSBvbmV0cnVzdDtcblx0XHR0aGlzLmFub25vbW91c1VzZXJUb2tlbiA9IHVuc3BlY2lmaWNlZFVzZXJUb2tlbjtcblx0XHRpZiAoc3VwcG9ydHNDb29raWVzKCkpIHtcblx0XHRcdHRoaXMuYW5vbm9tb3VzVXNlclRva2VuID0gZ2V0Q29va2llKHVzZXJUb2tlbkNvb2tpZU5hbWUpO1xuXHRcdFx0aWYgKCF0aGlzLmFub25vbW91c1VzZXJUb2tlbikge1xuXHRcdFx0XHR0aGlzLmFub25vbW91c1VzZXJUb2tlbiA9IGBhbm9ub21vdXMtJHtjcmVhdGVVVUlEKCl9YDtcblxuXHRcdFx0XHQvLyBTZXQgdGhlIGNvb2tpZSBmb3IgMzAgZGF5cyxcblx0XHRcdFx0c2V0Q29va2llKHVzZXJUb2tlbkNvb2tpZU5hbWUsIHRoaXMuYW5vbm9tb3VzVXNlclRva2VuLCAzMCAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudFBhZ2VUaW1lciA9IG51bGw7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMuZXZlbnRRdWV1ZSA9IHNtYXJ0UXVldWUoXG5cdFx0XHQoaXRlbXMsIHJlc3RPZlF1ZXVlKSA9PiB7XG5cdFx0XHRcdC8vIEFsZ29saWEgZXZlbnRzIHN0b3BwZWQsIHNlZSBpc3N1ZSAjMzkxNC5cblx0XHRcdFx0Ly9zZWxmLnBvc3RFdmVudHMoaXRlbXMpO1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bWF4OiAyMCwgLy8gbGltaXRcblx0XHRcdFx0aW50ZXJ2YWw6IDMwMDAsIC8vIDNzXG5cdFx0XHRcdHRocm90dGxlOiB0cnVlLCAvLyBFbnN1cmUgb25seSBtYXggaXMgcHJvY2Vzc2VkIGF0IGludGVydmFsXG5cdFx0XHRcdG9uUGF1c2U6ICgpID0+IHt9LFxuXHRcdFx0XHRvbkVtcHR5OiAocXVldWUsIHR5cGUpID0+IHt9LFxuXHRcdFx0fSxcblx0XHQpO1xuXG5cdFx0Ly8gQWxnb2xpYSBhbmFseXRpY3MuXG5cdFx0aWYgKHNlYXJjaENvbmZpZy5jbGlja19hbmFseXRpY3MpIHtcblx0XHRcdGNvbnN0IG1lcmdlZEluZGV4ID0gc2VhcmNoQ29uZmlnLmluZGV4TmFtZShzZWFyY2hDb25maWcuc2VjdGlvbnNfbWVyZ2VkLmluZGV4KTtcblx0XHRcdGNvbnN0IHVzZXJUb2tlbiA9ICgpID0+IHtcblx0XHRcdFx0aWYgKG9uZXRydXN0LnBlcmZvcm1hbmNlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYW5vbm9tb3VzVXNlclRva2VuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB1bnNwZWNpZmljZWRVc2VyVG9rZW47XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgY3JlYXRlRXZlbnRGcm9tT2JqZWN0SUQgPSAob2JqZWN0SUQsIGV2ZW50VHlwZSwgZXZlbnROYW1lKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGV2ZW50ID0ge1xuXHRcdFx0XHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdFx0XHRcdGV2ZW50TmFtZTogZXZlbnROYW1lLFxuXHRcdFx0XHRcdGluZGV4OiBtZXJnZWRJbmRleCxcblx0XHRcdFx0XHR1c2VyVG9rZW46IHVzZXJUb2tlbigpLFxuXHRcdFx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdFx0XHRvYmplY3RJRHM6IFtvYmplY3RJRF0sXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiBldmVudDtcblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGNyZWF0ZUV2ZW50RnJvbUl0ZW0gPSAoaXRlbSkgPT4ge1xuXHRcdFx0XHRpZiAoIWl0ZW0ub2JqZWN0SUQpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0l0ZW0gaGFzIG5vIG9iamVjdElEJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgZXZlbnQgPSB7XG5cdFx0XHRcdFx0ZXZlbnRUeXBlOiBpdGVtLmV2ZW50VHlwZSA/IGl0ZW0uZXZlbnRUeXBlIDogJ3ZpZXcnLFxuXHRcdFx0XHRcdGV2ZW50TmFtZTogaXRlbS5ldmVudE5hbWUgPyBpdGVtLmV2ZW50TmFtZSA6ICdHdWlkZSBWaWV3ZWQnLFxuXHRcdFx0XHRcdGluZGV4OiBpdGVtLl9faW5kZXggPyBpdGVtLl9faW5kZXggOiBtZXJnZWRJbmRleCxcblx0XHRcdFx0XHRxdWVyeUlEOiBpdGVtLl9fcXVlcnlJRCA/IGl0ZW0uX19xdWVyeUlEIDogJycsXG5cdFx0XHRcdFx0dXNlclRva2VuOiB1c2VyVG9rZW4oKSxcblx0XHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdFx0b2JqZWN0SURzOiBbaXRlbS5vYmplY3RJRF0sXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmIChldmVudC5xdWVyeUlEICYmIGl0ZW0uX19wb3NpdGlvbikge1xuXHRcdFx0XHRcdGV2ZW50LnBvc2l0aW9ucyA9IFtpdGVtLl9fcG9zaXRpb25dO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBldmVudDtcblx0XHRcdH07XG5cdFx0XHR0aGlzLmhhbmRsZXIgPSB7XG5cdFx0XHRcdHB1c2hJdGVtOiAoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZXZlbnRRdWV1ZS5wdXNoKGNyZWF0ZUV2ZW50RnJvbUl0ZW0oaXRlbSkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdGFydE5ld1BhZ2U6ICgpID0+IHtcblx0XHRcdFx0XHQvLyBTdG9wIHRoZSBvbGQgaWYgc2V0LlxuXHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRQYWdlVGltZXIpIHtcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBhZ2VUaW1lci5zdG9wKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZVRpbWVyID0ge1xuXHRcdFx0XHRcdFx0ZXZlbnRUaW1lcnM6IHtcblx0XHRcdFx0XHRcdFx0J0RPQ1M6IFRpbWUtb24tcGFnZSAzMCBzZWNvbmRzJzoge1xuXHRcdFx0XHRcdFx0XHRcdHNlY29uZHM6IDMwLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQnRE9DUzogVGltZS1vbi1wYWdlIDEgbWludXRlJzoge1xuXHRcdFx0XHRcdFx0XHRcdHNlY29uZHM6IDYwLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQnRE9DUzogVGltZS1vbi1wYWdlIDUgbWludXRlcyc6IHtcblx0XHRcdFx0XHRcdFx0XHRzZWNvbmRzOiAzMDAsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZXZlbnREaXN0YW5jZToge1xuXHRcdFx0XHRcdFx0XHQnRE9DUzogU2Nyb2xsIDUwJSc6IHsgZGlzdGFuY2U6IDAuNSwgZmlyZWQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdCdET0NTOiBTY3JvbGwgNzUlJzogeyBkaXN0YW5jZTogMC43NSwgZmlyZWQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c2Nyb2xsOiB7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbFRvcDogMCxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAwLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG9uU2Nyb2xsOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGxldCBzY3JvbGwgPSB0aGlzLmN1cnJlbnRQYWdlVGltZXIuc2Nyb2xsO1xuXHRcdFx0XHRcdFx0XHRpZiAoIXNjcm9sbC5zY3JvbGxIZWlnaHQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRsZXQgc2Nyb2xsRGlzdGFuY2UgPSAod2luZG93LnNjcm9sbFkgLSBzY3JvbGwub2Zmc2V0VG9wKSAvIHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG5cblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgZXZlbnROYW1lIGluIHRoaXMuY3VycmVudFBhZ2VUaW1lci5ldmVudERpc3RhbmNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgZXZlbnQgPSB0aGlzLmN1cnJlbnRQYWdlVGltZXIuZXZlbnREaXN0YW5jZVtldmVudE5hbWVdO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChldmVudC5maXJlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmIChzY3JvbGxEaXN0YW5jZSA+PSBldmVudC5kaXN0YW5jZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGRvY3VtZW50LmJvZHkuZGF0YXNldC5vYmplY3RpZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWJ1ZygnY29udmVydCcsIGV2ZW50TmFtZSwgZG9jdW1lbnQuYm9keS5kYXRhc2V0Lm9iamVjdGlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVyLmNvbnZlcnRPYmplY3QoZG9jdW1lbnQuYm9keS5kYXRhc2V0Lm9iamVjdGlkLCBldmVudE5hbWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQuZmlyZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN0YXJ0OiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGxldCBtYWluRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbWFpbicpWzBdO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlVGltZXIuc2Nyb2xsID0ge1xuXHRcdFx0XHRcdFx0XHRcdG9mZnNldFRvcDogbWFpbkVsID8gbWFpbkVsLm9mZnNldFRvcCA6IDAsXG5cdFx0XHRcdFx0XHRcdFx0c2Nyb2xsSGVpZ2h0OiBtYWluRWwgPyBtYWluRWwuc2Nyb2xsSGVpZ2h0IDogMCxcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBldmVudE5hbWUgaW4gdGhpcy5jdXJyZW50UGFnZVRpbWVyLmV2ZW50VGltZXJzKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWcoJ3N0YXJ0JywgZXZlbnROYW1lKTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB0aW1lciA9IHRoaXMuY3VycmVudFBhZ2VUaW1lci5ldmVudFRpbWVyc1tldmVudE5hbWVdO1xuXHRcdFx0XHRcdFx0XHRcdHRpbWVyLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWRvY3VtZW50LmJvZHkuZGF0YXNldC5vYmplY3RpZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWJ1ZygnY29udmVydCcsIGV2ZW50TmFtZSwgZG9jdW1lbnQuYm9keS5kYXRhc2V0Lm9iamVjdGlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuaGFuZGxlci5jb252ZXJ0T2JqZWN0KGRvY3VtZW50LmJvZHkuZGF0YXNldC5vYmplY3RpZCwgZXZlbnROYW1lKTtcblx0XHRcdFx0XHRcdFx0XHR9LCB0aW1lci5zZWNvbmRzICogMTAwMCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdG9wOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGZvciAobGV0IGV2ZW50TmFtZSBpbiB0aGlzLmN1cnJlbnRQYWdlVGltZXIuZXZlbnRUaW1lcnMpIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Zygnc3RvcCcsIGV2ZW50TmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGltZXIgPSB0aGlzLmN1cnJlbnRQYWdlVGltZXIuZXZlbnRUaW1lcnNbZXZlbnROYW1lXTtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGltZXIudGltZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lci50aW1lcik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlVGltZXIuc3RhcnQoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2tIaXQ6IChoaXQsIGV2ZW50TmFtZSkgPT4ge1xuXHRcdFx0XHRcdGlmICghaGl0Ll9fcXVlcnlJRCkge1xuXHRcdFx0XHRcdFx0Ly8gVGhlIEV4cGxvcmVyIG5vZGUgZXhwYW5zaW9ucyBhcmUgc2VwYXJhdGUgQWxnb2xpYSBxdWVyaWVzLCBidXQgdGhleSBkb24ndCBoYXZlIGEgcXVlcnlJRCxcblx0XHRcdFx0XHRcdC8vIGFuZCB0aGV5J3JlIGxvZ2ljYWxseSB0aWVkIHRvIHRoZSBtYWluIHNlYXJjaC5cblx0XHRcdFx0XHRcdGhpdC5fX3F1ZXJ5SUQgPSB0aGlzLmdldExhc3RRdWVyeUlEKCk7XG5cblx0XHRcdFx0XHRcdC8vIENsaWNrIGV2ZW50cyBuZWVkcyB0byBoYXZlIGEgcG9zaXRpb24uXG5cdFx0XHRcdFx0XHQvLyBXZSBhdHRhY2ggRXhwbG9yZXIgY2xpY2sgZXZlbnRzIHRvIHRoZSBtYWluIHNlYXJjaCByZXN1bHRzLCBidXRcblx0XHRcdFx0XHRcdC8vIHdlIGhhdmUgbm8gd2F5IG9mIGNvbm5lY3RpbmcgdGhpcyBpdGVtIHRvIGEgcG9zaXRpb24gaW4gdGhhdCBsaXN0aW5nLFxuXHRcdFx0XHRcdFx0Ly8ganVzdCBhc3NpZ24gaXQgYSBwb3NpdGlvbiBvZiAxLlxuXHRcdFx0XHRcdFx0aGl0Ll9fcG9zaXRpb24gPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCBpdGVtID0gY3JlYXRlRXZlbnRGcm9tSXRlbShoaXQpO1xuXHRcdFx0XHRcdGl0ZW0uZXZlbnRUeXBlID0gJ2NsaWNrJztcblx0XHRcdFx0XHRpdGVtLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcblx0XHRcdFx0XHR0aGlzLmV2ZW50UXVldWUucHVzaChpdGVtKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29udmVydE9iamVjdDogKG9iamVjdElELCBldmVudE5hbWUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBldmVudCA9IGNyZWF0ZUV2ZW50RnJvbU9iamVjdElEKG9iamVjdElELCAnY29udmVyc2lvbicsIGV2ZW50TmFtZSk7XG5cdFx0XHRcdFx0ZXZlbnQucXVlcnlJRCA9IHRoaXMuZ2V0TGFzdFF1ZXJ5SUQoKTtcblx0XHRcdFx0XHR0aGlzLmV2ZW50UXVldWUucHVzaChldmVudCk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBTZXQgdXAgc29tZSBkdW1teSBoYW5kbGVycy5cblx0XHRcdHRoaXMuaGFuZGxlciA9IHtcblx0XHRcdFx0Y2xpY2s6ICgpID0+IHt9LFxuXHRcdFx0XHR2aWV3OiAoKSA9PiB7fSxcblx0XHRcdFx0Y29udmVyc2lvbjogKCkgPT4ge30sXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdG9uU2Nyb2xsKCkge1xuXHRcdGlmICh0aGlzLmN1cnJlbnRQYWdlVGltZXIpIHtcblx0XHRcdHRoaXMuY3VycmVudFBhZ2VUaW1lci5vblNjcm9sbCgpO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RFdmVudHMoZXZlbnRzKSB7XG5cdFx0ZGVidWcoJ1BPU1QnLCBldmVudHMpO1xuXHRcdGZldGNoKHRoaXMudXJsRXZlbnRzLCB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZXZlbnRzOiBldmVudHMgfSksXG5cdFx0fSlcblx0XHRcdC50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0aWYgKCFyZXMub2spIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzLnRleHQoKS50aGVuKCh0ZXh0KSA9PiB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IodGV4dCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnU2VuZGluZyBldmVudHMgdG8gQWxnb2xpYSBmYWlsZWQ6JywgZXJyKTtcblx0XHRcdH0pO1xuXHR9XG59XG4iLCAiaW1wb3J0IHsgTFJVTWFwIH0gZnJvbSAnLi4vaGVscGVycy9scnUnO1xuaW1wb3J0IHsgbm9ybWFsaXplQWxnb2xpYVJlc3VsdCB9IGZyb20gJy4uL3NlYXJjaC9zZWFyY2gtc3RvcmUnO1xuXG52YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW25hdi1yZWNvbW1lbmRhdGlvbnNdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuZXhwb3J0IGNsYXNzIFJlY29tbWVuZGF0aW9uc0ZldGNoZXIge1xuXHRjb25zdHJ1Y3RvcihzZWFyY2hDb25maWcpIHtcblx0XHR0aGlzLmhlYWRlcnMgPSB7XG5cdFx0XHQnWC1BbGdvbGlhLUFwcGxpY2F0aW9uLUlkJzogc2VhcmNoQ29uZmlnLnJlY29tbWVuZGF0aW9ucy5hcHBfaWQsXG5cdFx0XHQnWC1BbGdvbGlhLUFQSS1LZXknOiBzZWFyY2hDb25maWcucmVjb21tZW5kYXRpb25zLmFwaV9rZXksXG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdH07XG5cdFx0dGhpcy50YXJnZXRJbmRleCA9IHNlYXJjaENvbmZpZy5yZWNvbW1lbmRhdGlvbnMudGFyZ2V0X2luZGV4O1xuXHRcdHRoaXMudXJsUmVjb21tZW5kYXRpb25zID0gYGh0dHBzOi8vJHtzZWFyY2hDb25maWcucmVjb21tZW5kYXRpb25zLmFwcF9pZH0tZHNuLmFsZ29saWEubmV0LzEvaW5kZXhlcy8qL3JlY29tbWVuZGF0aW9uc2A7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBMUlVNYXAoMjApOyAvLyBRdWVyeSBjYWNoZS5cblxuXHRcdHRoaXMucXVldWVzID0gbmV3IE1hcCgpO1xuXG5cdFx0ZGVidWcoJ2NvbnN0cnVjdG9yJywgdGhpcy50YXJnZXRJbmRleCwgdGhpcy51cmxSZWNvbW1lbmRhdGlvbnMpO1xuXHR9XG5cblx0YXN5bmMgZmV0Y2gob2JqZWN0SUQsIHRhcmdldEFycmF5LCBtb2RlbCA9ICdyZWxhdGVkLXByb2R1Y3RzJykge1xuXHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0aW5kZXhOYW1lOiB0aGlzLnRhcmdldEluZGV4LFxuXHRcdFx0bW9kZWw6IG1vZGVsLFxuXHRcdFx0dGhyZXNob2xkOiAyNSxcblx0XHRcdG1heFJlY29tbWVuZGF0aW9uczogMyxcblx0XHRcdG9iamVjdElEOiBvYmplY3RJRCxcblx0XHR9O1xuXG5cdFx0bGV0IGtleSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpO1xuXG5cdFx0bGV0IGNhY2hlZCA9IHRoaXMuY2FjaGUuZ2V0KGtleSk7XG5cdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0ZGVidWcoJ2NhY2hlZCcsIG9iamVjdElELCBtb2RlbCwgY2FjaGVkLmxlbmd0aCk7XG5cdFx0XHR0YXJnZXRBcnJheS5sZW5ndGggPSAwO1xuXHRcdFx0dGFyZ2V0QXJyYXkucHVzaCguLi5jYWNoZWQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIHRoaXMga2V5IGlzIGluIGZsaWdodC5cblx0XHRsZXQgcXVldWUgPSB0aGlzLnF1ZXVlcy5nZXQoa2V5KTtcblx0XHRpZiAocXVldWUpIHtcblx0XHRcdHF1ZXVlLnB1c2godGFyZ2V0QXJyYXkpO1xuXHRcdFx0ZGVidWcoJ2luIGZsaWdodCcsIG9iamVjdElEKTtcblx0XHRcdHJldHVybjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLnB1c2godGFyZ2V0QXJyYXkpO1xuXHRcdFx0dGhpcy5xdWV1ZXMuc2V0KGtleSwgcXVldWUpO1xuXHRcdH1cblxuXHRcdGxldCB1cmwgPSB0aGlzLnVybFJlY29tbWVuZGF0aW9ucztcblx0XHRsZXQgaGVhZGVycyA9IHRoaXMuaGVhZGVycztcblx0XHRsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgcmVxdWVzdHM6IFtyZXF1ZXN0XSB9KTtcblxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0Ym9keTogYm9keSxcblx0XHR9KTtcblxuXHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdGNvbnNvbGUud2FybihgW25hdi1yZWNvbW1lbmRhdGlvbnNdIGZldGNoUmVjb21tZW5kYXRpb25zIGZhaWxlZDogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcblx0XHRcdHRhcmdldEFycmF5Lmxlbmd0aCA9IDA7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bGV0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0bGV0IHJlc3VsdCA9IGpzb24ucmVzdWx0c1swXTtcblxuXHRcdG5vcm1hbGl6ZUFsZ29saWFSZXN1bHQocmVzdWx0KTtcblxuXHRcdGxldCBoaXRzID0gYXdhaXQgcmVzdWx0LmhpdHM7XG5cblx0XHR0aGlzLmNhY2hlLnNldChrZXksIGhpdHMpO1xuXG5cdFx0ZGVidWcoJ2ZldGNoJywgb2JqZWN0SUQsIG1vZGVsLCBoaXRzLmxlbmd0aCk7XG5cblx0XHQvLyBEcmFpbiB0aGUgcXVldWUuXG5cdFx0cXVldWUgPSB0aGlzLnF1ZXVlcy5nZXQoa2V5KTtcblx0XHR0aGlzLnF1ZXVlcy5kZWxldGUoa2V5KTtcblx0XHRxdWV1ZS5mb3JFYWNoKChhcnIpID0+IHtcblx0XHRcdGFyci5sZW5ndGggPSAwO1xuXHRcdFx0YXJyLnB1c2goLi4uaGl0cyk7XG5cdFx0XHRkZWJ1ZygnZHJhaW4nLCBvYmplY3RJRCwgbW9kZWwsIGhpdHMubGVuZ3RoKTtcblx0XHR9KTtcblx0fVxufVxuIiwgImltcG9ydCB7IGlzTW9iaWxlIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcbmltcG9ydCB7IGdldFNjcm9sbFBvc05hdmJhciB9IGZyb20gJy4vbmF2JztcbmltcG9ydCB7IEFuYWx5dGljc0V2ZW50c0NvbGxlY3RvciB9IGZyb20gJy4vbmF2LWFuYWx5dGljcyc7XG5pbXBvcnQgeyBSZWNvbW1lbmRhdGlvbnNGZXRjaGVyIH0gZnJvbSAnLi9yZWNvbW1lbmRhdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3TmF2U3RvcmUoc2VhcmNoQ29uZmlnLCBzZWFyY2hTdG9yZSwgcGFyYW1zLCBBbHBpbmUpIHtcblx0Y29uc3QgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW25hdi1zdG9yZV0nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5cdHJldHVybiB7XG5cdFx0Ly8gU3RhY2sgdXNlZCB3aGVuIHdlIG1hbmlwdWxhdGUgdGhlIG5hdmlnYXRpb24gaGlzdG9yeSBhbmQgdG8gdHJhY2sgaXQgc28gd2UgY2FuIGdvIGJhY2sgaWYgbmVlZGVkLlxuXHRcdGhpc3Rvcnk6IFtdLFxuXHRcdGxhbmc6ICdlbicsIC8vIFNldCBieSB0aGUgbGFuZ3VhZ2Ugc3dpdGNoZXIuXG5cblx0XHRwaW5uZWQ6IGZhbHNlLFxuXHRcdHNlYXJjaFJlc3VsdHM6IHtcblx0XHRcdG9wZW46IGZhbHNlLCAvLyBXaGV0aGVyIHRoZSBzZWFyY2ggcGFuZWwgaXMgb3BlbiBvciBub3QuXG5cdFx0XHR1c2VyQ2hhbmdlOiBmYWxzZSwgLy8gV2hldGhlciB0aGlzIGlzIGEgdXNlciBvciBhIHN5c3RlbSBjaGFuZ2UuXG5cdFx0fSxcblxuXHRcdC8vIFN0YXRlIGZvciB0aGUgdGFicyBzaG9ydGNvZGUuXG5cdFx0dGFiczoge1xuXHRcdFx0Ly8gSG9sZHMgaWRzIGZvciBhbGwgYWN0aXZlIHRhYnMuXG5cdFx0XHRhY3RpdmU6IHt9LFxuXG5cdFx0XHQvLyBJbmNyZW1lbnRlZCB0byB0cmlnZ2VyIGEgcmUtcmVuZGVyIG9mIHRoZSB0YWJzLlxuXHRcdFx0Y291bnRlcjogMCxcblxuXHRcdFx0Ly8gT3JkaW5hbCBvZiB0aGUgbGFzdCBjbGlja2VkIHRhYnMgY29tcG9uZW50LlxuXHRcdFx0b3JkaW5hbDogMCxcblx0XHR9LFxuXG5cdFx0c2VhcmNoRXZlbnRzOiBudWxsLFxuXG5cdFx0b3Blbjoge1xuXHRcdFx0ZXhwbG9yZXI6ICFpc01vYmlsZSgpLFxuXHRcdFx0dG9jOiBmYWxzZSxcblx0XHR9LFxuXG5cdFx0b25ldHJ1c3Q6IHtcblx0XHRcdHJlcXVpcmVkOiBmYWxzZSxcblx0XHRcdHBlcmZvcm1hbmNlOiBmYWxzZSxcblx0XHRcdGZ1bmN0aW9uYWw6IGZhbHNlLFxuXHRcdFx0dGFyZ2V0aW5nOiBmYWxzZSxcblx0XHRcdHNvY2lhbG1lZGlhOiBmYWxzZSxcblxuXHRcdFx0dG9nZ2xlQ29uc2VudERpYWxvZyhldmVudCkge1xuXHRcdFx0XHRpZiAoIXdpbmRvdy5PbmVUcnVzdCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWJ1ZygndG9nZ2xlQ29uc2VudERpYWxvZycpO1xuXHRcdFx0XHQvLyBUT0RPMSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpdGViYXkvc2l0ZWJheS1kb2NzLXRoZW1lL2lzc3Vlcy85NTQgQ29va2llIENvbnNlbnQgTGlua3Ncblx0XHRcdFx0d2luZG93Lk9uZVRydXN0LlRvZ2dsZUluZm9EaXNwbGF5KCk7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9LFxuXHRcdH0sXG5cblx0XHRyZWNvbW1lbmRhdGlvbnM6IG5ldyBSZWNvbW1lbmRhdGlvbnNGZXRjaGVyKHNlYXJjaENvbmZpZyksXG5cblx0XHRpbml0KCkge1xuXHRcdFx0Y29uc3QgdGFic0tleSA9ICd0YWJzJztcblx0XHRcdGNvbnN0IHVybERlbGltaXRlciA9ICcsJztcblx0XHRcdGxldCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbik7XG5cdFx0XHRsZXQgY3VycmVudFRhYnNTdHJpbmcgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCh0YWJzS2V5KTtcblx0XHRcdGlmIChjdXJyZW50VGFic1N0cmluZykge1xuXHRcdFx0XHQvLyBTcGxpdCB0aGUgc3RyaW5nIGludG8gYW4gYXJyYXkuXG5cdFx0XHRcdGxldCBhY3RpdmVUYWJzID0gY3VycmVudFRhYnNTdHJpbmcuc3BsaXQodXJsRGVsaW1pdGVyKTtcblx0XHRcdFx0Ly8gU2V0IHRoZSBhY3RpdmUgdGFicy5cblx0XHRcdFx0Zm9yIChsZXQgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcblx0XHRcdFx0XHR0aGlzLnRhYnMuYWN0aXZlW3RhYl0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgc29tZSBjb21tb24gcXVlcnkgcGFyYW1ldGVycyBpbiB0aGUgVVJMIGluIHN5bmMgd2l0aCB0aGUgc3RvcmUuXG5cdFx0XHRBbHBpbmUuZWZmZWN0KCgpID0+IHtcblx0XHRcdFx0Ly8gVGhpcyB3aWxsIGVmZmVjdGl2ZWx5IHdhdGNoIGZvciBhbnkgY2hhbmdlcyB0byB0aGUgdGFicyBzdGF0ZS5cblx0XHRcdFx0aWYgKHRoaXMudGFicy5jb3VudGVyKSB7XG5cdFx0XHRcdFx0bGV0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uKTtcblx0XHRcdFx0XHRsZXQgY3VycmVudFRhYnNTdHJpbmcgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCh0YWJzS2V5KTtcblxuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIHNvcnRlZCBsaXN0IG9mIGFjdGl2ZSB0YWJzLlxuXHRcdFx0XHRcdGxldCBhY3RpdmVUYWJzID0gW107XG5cdFx0XHRcdFx0Zm9yIChsZXQgdGFiIGluIHRoaXMudGFicy5hY3RpdmUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLnRhYnMuYWN0aXZlW3RhYl0pIHtcblx0XHRcdFx0XHRcdFx0YWN0aXZlVGFicy5wdXNoKHRhYik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGFjdGl2ZVRhYnMuc29ydCgpO1xuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIHN0cmluZyBmcm9tIHRoZSBsaXN0LlxuXHRcdFx0XHRcdGxldCBhY3RpdmVUYWJzU3RyaW5nID0gYWN0aXZlVGFicy5qb2luKHVybERlbGltaXRlcik7XG5cblx0XHRcdFx0XHQvLyBPbmx5IHVwZGF0ZSB0aGUgVVJMIGlmIHRoZSB0YWJzIHN0cmluZyBoYXMgY2hhbmdlZC5cblx0XHRcdFx0XHRpZiAoY3VycmVudFRhYnNTdHJpbmcgIT09IGFjdGl2ZVRhYnNTdHJpbmcpIHtcblx0XHRcdFx0XHRcdGxldCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2gpO1xuXHRcdFx0XHRcdFx0c2VhcmNoUGFyYW1zLnNldCh0YWJzS2V5LCBhY3RpdmVUYWJzU3RyaW5nKTtcblx0XHRcdFx0XHRcdGxldCBuZXdVcmwgPSB1cmwucGF0aG5hbWUgKyAnPycgKyBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKHsgdHVyYm86IHt9IH0sICcnLCBuZXdVcmwpO1xuXHRcdFx0XHRcdFx0ZGVidWcoJ3RhYnMnLCBhY3RpdmVUYWJzU3RyaW5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0bGV0IGdldExhc3RRdWVyeUlEID0gKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gc2VhcmNoU3RvcmUucmVzdWx0cy5sYXN0UXVlcnlJRDtcblx0XHRcdH07XG5cdFx0XHR0aGlzLmFuYWx5dGljcyA9IG5ldyBBbmFseXRpY3NFdmVudHNDb2xsZWN0b3Ioc2VhcmNoQ29uZmlnLCBnZXRMYXN0UXVlcnlJRCwgdGhpcy5vbmV0cnVzdCk7XG5cblx0XHRcdC8vIFRoZSBjYWxsYmFjayBiZWxvdyBtYXkgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlxuXHRcdFx0bGV0IGFuYWx5dGljc0xvYWRFdmVudFB1Ymxpc2hlZCA9IGZhbHNlO1xuXHRcdFx0bGV0IGNiID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoIWFuYWx5dGljc0xvYWRFdmVudFB1Ymxpc2hlZCAmJiBkb2N1bWVudC5ib2R5LmRhdGFzZXQub2JqZWN0aWQpIHtcblx0XHRcdFx0XHRhbmFseXRpY3NMb2FkRXZlbnRQdWJsaXNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGxldCBhbmFseXRpY3NJdGVtID0ge1xuXHRcdFx0XHRcdFx0X19xdWVyeUlEOiBnZXRMYXN0UXVlcnlJRCgpLFxuXHRcdFx0XHRcdFx0b2JqZWN0SUQ6IGRvY3VtZW50LmJvZHkuZGF0YXNldC5vYmplY3RpZCxcblx0XHRcdFx0XHRcdGV2ZW50OiAndmlldycsXG5cdFx0XHRcdFx0XHRldmVudE5hbWU6ICdET0NTOiBHdWlkZSBMb2FkJyxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHRoaXMuYW5hbHl0aWNzLmhhbmRsZXIucHVzaEl0ZW0oYW5hbHl0aWNzSXRlbSk7XG5cdFx0XHRcdFx0dGhpcy5hbmFseXRpY3MuaGFuZGxlci5zdGFydE5ld1BhZ2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlT3B0YW5vbkdyb3Vwcyhncm91cHMpIHtcblx0XHRcdC8vIEdyb3VwcyBvbiBmb3JtICxDMDAwMSxDMDAwMixDMDAwMyxDMDAwNCxDMDAwNSxcblx0XHRcdC8vIFNwbGl0IG9uIGNvbW1hLCByZW1vdmUgZW1wdHkgc3RyaW5ncy5cblx0XHRcdGxldCBncm91cEFycmF5ID0gZ3JvdXBzLnNwbGl0KCcsJykuZmlsdGVyKEJvb2xlYW4pO1xuXHRcdFx0dGhpcy5vbmV0cnVzdC5yZXF1aXJlZCA9IGdyb3VwQXJyYXkuaW5jbHVkZXMoJ0MwMDAxJyk7XG5cdFx0XHR0aGlzLm9uZXRydXN0LnBlcmZvcm1hbmNlID0gZ3JvdXBBcnJheS5pbmNsdWRlcygnQzAwMDInKTtcblx0XHRcdHRoaXMub25ldHJ1c3QuZnVuY3Rpb25hbCA9IGdyb3VwQXJyYXkuaW5jbHVkZXMoJ0MwMDAzJyk7XG5cdFx0XHR0aGlzLm9uZXRydXN0LnRhcmdldGluZyA9IGdyb3VwQXJyYXkuaW5jbHVkZXMoJ0MwMDA0Jyk7XG5cdFx0XHR0aGlzLm9uZXRydXN0LnNvY2lhbG1lZGlhID0gZ3JvdXBBcnJheS5pbmNsdWRlcygnQzAwMDUnKTtcblxuXHRcdFx0Y29uc29sZS5sb2coJ3VwZGF0ZU9wdGFub25Hcm91cHMnLCB0aGlzLm9uZXRydXN0KTtcblx0XHR9LFxuXG5cdFx0b3BlblNlYXJjaFBhbmVsKHNjcm9sbFVwID0gZmFsc2UpIHtcblx0XHRcdGlmICghdGhpcy5zZWFyY2hSZXN1bHRzLm9wZW4pIHtcblx0XHRcdFx0dGhpcy5zZWFyY2hSZXN1bHRzID0geyBvcGVuOiB0cnVlLCB1c2VyQ2hhbmdlOiB0cnVlIH07XG5cdFx0XHRcdHNlYXJjaFN0b3JlLnNlYXJjaFRvZ2dsZSh0cnVlKTtcblx0XHRcdH1cblx0XHRcdGlmIChzY3JvbGxVcCkge1xuXHRcdFx0XHR0aGlzLnNjcm9sbFRvTmF2QmFySWZQaW5uZWQoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b3BlblNlYXJjaFBhbmVsV2l0aFF1ZXJ5KGNhbGxiYWNrKSB7XG5cdFx0XHRjYWxsYmFjayhzZWFyY2hTdG9yZS5xdWVyeSk7XG5cdFx0XHR0aGlzLm9wZW5TZWFyY2hQYW5lbCh0cnVlKTtcblx0XHR9LFxuXG5cdFx0Z29CYWNrKCkge1xuXHRcdFx0bGV0IGhyZWYgPSB0aGlzLmhpc3RvcnkucG9wKCk7XG5cdFx0XHRpZiAoaHJlZikge1xuXHRcdFx0XHQvLyBUaGlzIG1lYW5zIHdlIGhhdmUgYSBoaXN0b3J5LCBzbyBqdXN0IGdvIGJhY2suXG5cdFx0XHRcdGhpc3RvcnkuYmFjaygpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlIGdvdCBoZXJlIGRpcmVjdGx5LCBubyBoaXN0b3J5LiBOYXZpZ2F0ZSBiYWNrIHRvIHRoZSBob21lIHBhZ2UuXG5cdFx0XHRUdXJiby52aXNpdCgnL2RvY3MnKTtcblx0XHR9LFxuXG5cdFx0cHVzaFN0YXRlKGhyZWYpIHtcblx0XHRcdC8vIFN0b3JlIHRoZSBvbGQgc28gd2UgY2FuIGdvIGJhY2suXG5cdFx0XHR0aGlzLmhpc3RvcnkucHVzaCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBocmVmKTtcblx0XHR9LFxuXG5cdFx0cHVzaFRvcFJlc3VsdHMocXVlcnlTdHJpbmcpIHtcblx0XHRcdC8vIEFkZCBhIG5vaW5kZXggbWV0YSB0YWcgdG8gdGhlIHBhZ2Ugc28gaXQgZG9lc24ndCBnZXQgaW5kZXhlZC5cblx0XHRcdGxldCBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuXHRcdFx0bWV0YS5uYW1lID0gJ3JvYm90cyc7XG5cdFx0XHRtZXRhLmNvbnRlbnQgPSAnbm9pbmRleCc7XG5cdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG1ldGEpO1xuXHRcdFx0dGhpcy5wdXNoU3RhdGUoJy9kb2NzL3RvcHJlc3VsdHMvJyArIHF1ZXJ5U3RyaW5nKTtcblx0XHR9LFxuXG5cdFx0c2Nyb2xsVG9OYXZCYXJJZlBpbm5lZCgpIHtcblx0XHRcdGlmICghdGhpcy5waW5uZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHNjcm9sbFBvc05hdmJhciA9IGdldFNjcm9sbFBvc05hdmJhcigpO1xuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFBvc05hdmJhcik7XG5cdFx0fSxcblx0fTtcbn1cbiIsICJ2YXIgZGVidWcgPSAwID8gY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnW2ZpbGUtaXNzdWUtYnV0dG9uXScpIDogZnVuY3Rpb24gKCkge307XG5cbmltcG9ydCB7IGdldE9mZnNldFRvcCwgaXNNb2JpbGUgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3RmlsZUlzc3VlQnV0dG9uKGNvbmYpIHtcblx0cmV0dXJuIHtcblx0XHRpc0hvdmVyZWQ6IGZhbHNlLFxuXHRcdGhvdmVyZWRFbDogbnVsbCxcblx0XHRpc0hvdmVyZWRCdXR0b246IGZhbHNlLFxuXHRcdHRpbWVvdXRJRDogbnVsbCxcblxuXHRcdC8vIFRoZSBpc3N1ZSBpdGVtcyBwcmVzZW50ZWQgdG8gdGhlIHVzZXIuXG5cdFx0aXRlbXM6IFtdLFxuXG5cdFx0c2hvdygpIHtcblx0XHRcdHJldHVybiB0aGlzLmlzSG92ZXJlZEJ1dHRvbiB8fCB0aGlzLmlzSG92ZXJlZDtcblx0XHR9LFxuXG5cdFx0aG92ZXJCdXR0b24oKSB7XG5cdFx0XHQvLyBQcmVwYXJlIHRoZSBpc3N1ZSBpdGVtcy5cblx0XHRcdC8vIEZpcnN0IGNsZWFyIGFueSBleGlzdGluZyBpdGVtcy5cblx0XHRcdHRoaXMuaXRlbXMubGVuZ3RoID0gMDtcblxuXHRcdFx0Zm9yIChsZXQgaXRlbSBvZiBjb25mLmlzc3VlX3RlbXBsYXRlcykge1xuXHRcdFx0XHRsZXQgaW5mbyA9IHdpbmRvdy5sblBhZ2VJbmZvO1xuXHRcdFx0XHRsZXQgZmlsZSA9ICcnO1xuXHRcdFx0XHRpZiAoaW5mby5wYXRoKSB7XG5cdFx0XHRcdFx0ZmlsZSA9IGBodHRwczovL2dpdGh1Yi5jb20vc2l0ZWJheS9kb2NzL2Jsb2IvbWFpbi9hcnRpY2xlcy8ke2luZm8ucGF0aH1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCBjb250ZXh0ID0gdGhpcy5ob3ZlcmVkRWwudGV4dENvbnRlbnQudHJpbSgpO1xuXHRcdFx0XHRkZWJ1ZygnY29udGV4dDonLCBjb250ZXh0KTtcblx0XHRcdFx0bGV0IGhyZWYgPSBgJHtjb25mLnJlcG9fdXJsfS9pc3N1ZXMvbmV3PyZ0ZW1wbGF0ZT0ke2l0ZW0uaWR9JmZpbGU9JHtlbmNvZGVVUklDb21wb25lbnQoXG5cdFx0XHRcdFx0ZmlsZSxcblx0XHRcdFx0KX0mY29udGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChjb250ZXh0KX1gO1xuXHRcdFx0XHR0aGlzLml0ZW1zLnB1c2goeyB0aXRsZTogaXRlbS50aXRsZSwgaHJlZjogaHJlZiB9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVGhpcyB3aWxsIHNob3cgdGhlIGlzc3VlIGl0ZW1zIGRyb3Bkb3duLlxuXHRcdFx0dGhpcy5pc0hvdmVyZWRCdXR0b24gPSB0cnVlO1xuXHRcdH0sXG5cblx0XHRob3Zlck9uKGhvdmVyZWRFbCkge1xuXHRcdFx0aWYgKHRoaXMuaXNIb3ZlcmVkKSB7XG5cdFx0XHRcdGRlYnVnKCdob3Zlck9uOicsIGhvdmVyZWRFbC50YWdOYW1lLCAndnMnLCB0aGlzLmhvdmVyZWRFbC50YWdOYW1lKTtcblxuXHRcdFx0XHRpZiAoaG92ZXJlZEVsLnRhZ05hbWUgIT09IHRoaXMuaG92ZXJlZEVsLnRhZ05hbWUpIHtcblx0XHRcdFx0XHQvLyBDaGVjayBpZiB3ZSdyZSBob3ZlcmluZyBvdmVyIHRoZSBzYW1lIGVsZW1lbnQgb3IgYW4gYW5jZXN0b3IuXG5cdFx0XHRcdFx0aWYgKGhvdmVyZWRFbC5jb250YWlucyh0aGlzLmhvdmVyZWRFbCkpIHtcblx0XHRcdFx0XHRcdGRlYnVnKCdza2lwJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChob3ZlcmVkRWwudGFnTmFtZSA9PSAnVEQnIHx8IGhvdmVyZWRFbC50YWdOYW1lID09ICdUSCcpIHtcblx0XHRcdFx0XHRcdGRlYnVnKCdza2lwJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5pc0hvdmVyZWRCdXR0b24pIHtcblx0XHRcdFx0dGhpcy5pc0hvdmVyZWRCdXR0b24gPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnRpbWVvdXRJRCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SUQpO1xuXHRcdFx0fVxuXHRcdFx0ZGVidWcoJ2hvdmVyT246JywgaG92ZXJlZEVsLnRhZ05hbWUpO1xuXG5cdFx0XHRpZiAoaG92ZXJlZEVsLnRhZ05hbWUgPT09ICdQUkUnKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBwYXJlbnQgaXMgYSBURCB3ZSBuZWVkIHRvIHNlbGVjdCB0aGUgc2Vjb25kIGNvbHVtbiwgdGhlIGZpcnN0IGlzIGxpbmUgbnVtYmVycy5cblx0XHRcdFx0bGV0IHBhcmVudCA9IGhvdmVyZWRFbC5wYXJlbnROb2RlO1xuXHRcdFx0XHRpZiAocGFyZW50LnRhZ05hbWUgPT09ICdURCcpIHtcblx0XHRcdFx0XHRob3ZlcmVkRWwgPSBwYXJlbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdGxldCB0ZHMgPSBob3ZlcmVkRWwucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcblx0XHRcdFx0XHQvLyBTZWxlY3QgbGFzdCB0ZC5cblx0XHRcdFx0XHRob3ZlcmVkRWwgPSB0ZHNbdGRzLmxlbmd0aCAtIDFdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaXNIb3ZlcmVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuaG92ZXJlZEVsID0gaG92ZXJlZEVsO1xuXG5cdFx0XHRsZXQgZWwgPSB0aGlzLiRlbDtcblx0XHRcdGxldCBjb250YWluZXIgPSBlbC5wYXJlbnROb2RlO1xuXHRcdFx0bGV0IGRpc3RhbmNlID0gZ2V0T2Zmc2V0VG9wKGNvbnRhaW5lciwgaG92ZXJlZEVsKTtcblxuXHRcdFx0Ly8gUG9zaXRpb24gZWwgcmVsYXRpdmUgdG8gaG92ZXJlZEVsLlxuXHRcdFx0ZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0ZWwuc3R5bGUudG9wID0gZGlzdGFuY2UgKyAncHgnO1xuXHRcdFx0ZWwuc3R5bGUubGVmdCA9ICcwJztcblx0XHRcdGVsLnN0eWxlLnpJbmRleCA9IDU7XG5cblx0XHRcdHRoaXMudGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuaXNIb3ZlcmVkID0gZmFsc2U7XG5cdFx0XHR9LCAyNTAwKTtcblx0XHR9LFxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdHJldHVybiB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRcdGlmIChpc01vYmlsZSgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCBtYWluQ29udGVudEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW5fX2NvbnRlbnQnKTtcblx0XHRcdFx0aWYgKCFtYWluQ29udGVudEVsKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bWFpbkNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGVudCcpLmZvckVhY2goKGNvbnRlbnRFbCkgPT4ge1xuXHRcdFx0XHRcdGNvbnRlbnRFbC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcdFx0J21vdXNlb3ZlcicsXG5cdFx0XHRcdFx0XHQoZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGUudGFyZ2V0LnRhZ05hbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdETCc6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnTEknOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ1AnOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ1BSRSc6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnVEQnOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ1RIJzpcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuaG92ZXJPbihlLnRhcmdldCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdTUEFOJzpcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdDT0RFJzpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIENoZWNrIGlmIHdlJ3JlIGluIGEgcHJlIGJsb2NrLlxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHByZSA9IGUudGFyZ2V0LmNsb3Nlc3QoJ3ByZScpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHByZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmhvdmVyT24ocHJlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ0RJVic6XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGNsYXNzIGlzIHNldCBpbiB0aGUgdGFicyBjb21wb25lbnQgZXRjLFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gdG8gYXZvaWQgZ2V0dGluZyBtYW55IGZhbHNlIHBvc2l0aXZlcyBvbiB0aGUgRElWUy5cblx0XHRcdFx0XHRcdFx0XHRcdGxldCB3aGl0ZWxpc3QgPSBbJ2ZpbGUtaXNzdWUtYnV0dG9uLWNvbnRlbnQnLCAnbm90ZScsICdjb2RlJ107XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKGxldCB3IG9mIHdoaXRlbGlzdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHcpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ob3Zlck9uKGUudGFyZ2V0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdGRlYnVnKCdkZWZhdWx0OicsIGUudGFyZ2V0LnRhZ05hbWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7IHBhc3NpdmU6IHRydWUgfSxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBpc01vYmlsZSB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbnZhciBkZWJ1ZyA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbc3ZnLXZpZXdlcl0nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5jb25zdCBnZXRUcmFuc2Zvcm1QYXJhbWV0ZXJzID0gKGVsZW1lbnQpID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gZWxlbWVudC5zdHlsZS50cmFuc2Zvcm07XG5cdGxldCBzY2FsZSA9IDEsXG5cdFx0ajtcblx0KHggPSAwKSwgKHkgPSAwKTtcblx0aWYgKHRyYW5zZm9ybS5pbmNsdWRlcygnc2NhbGUnKSkgc2NhbGUgPSBwYXJzZUZsb2F0KHRyYW5zZm9ybS5zbGljZSh0cmFuc2Zvcm0uaW5kZXhPZignc2NhbGUnKSArIDYpKTtcblx0aWYgKHRyYW5zZm9ybS5pbmNsdWRlcygndHJhbnNsYXRlWCcpKSB4ID0gcGFyc2VJbnQodHJhbnNmb3JtLnNsaWNlKHRyYW5zZm9ybS5pbmRleE9mKCd0cmFuc2xhdGVYJykgKyAxMSkpO1xuXHRpZiAodHJhbnNmb3JtLmluY2x1ZGVzKCd0cmFuc2xhdGVZJykpIHkgPSBwYXJzZUludCh0cmFuc2Zvcm0uc2xpY2UodHJhbnNmb3JtLmluZGV4T2YoJ3RyYW5zbGF0ZVknKSArIDExKSk7XG5cdHJldHVybiB7IHNjYWxlLCB4LCB5IH07XG59O1xuXG5jb25zdCBhbmltYXRpb25DbGFzcyA9ICdsYXJnZS1kaWFncmFtLWFuaW1hdGUnO1xuXG5jb25zdCBnZXRUcmFuc2Zvcm1TdHJpbmcgPSAoc2NhbGUsIHgsIHkpID0+ICdzY2FsZSgnICsgc2NhbGUgKyAnKSAnICsgJ3RyYW5zbGF0ZVgoJyArIHggKyAncHgpIHRyYW5zbGF0ZVkoJyArIHkgKyAncHgpJztcblxuY29uc3QgbWF4Wm9vbSA9IDc7XG5jb25zdCBtaW5ab29tID0gMC43NTtcblxuY2xhc3MgU3ZnVmlld2VyIHtcblx0Y29uc3RydWN0b3IoY29udGFpbmVyLCBlbCkge1xuXHRcdHRoaXMuZWwgPSBlbDtcblx0XHR0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuXHRcdHRoaXMuZHJhZ1N0YXRlID0ge1xuXHRcdFx0ZHJhZ2dpbmc6IGZhbHNlLFxuXHRcdFx0bGFzdFg6IDAsXG5cdFx0XHRsYXN0WTogMCxcblx0XHR9O1xuXG5cdFx0dGhpcy56b29tU3RhdGUgPSB7XG5cdFx0XHR6b29taW5nOiBmYWxzZSxcblx0XHR9O1xuXHR9XG5cblx0cmVzZXQoKSB7XG5cdFx0bGV0IHN2ZyA9IHRoaXMuZWw7XG5cdFx0c3ZnLnN0eWxlLnRyYW5zZm9ybSA9IGdldFRyYW5zZm9ybVN0cmluZygxLCAwLCAwKTtcblx0fVxuXG5cdHpvb20oZHNjYWxlKSB7XG5cdFx0bGV0IHN2ZyA9IHRoaXMuZWw7XG5cdFx0Y29uc3QgeyBzY2FsZSwgeCwgeSB9ID0gZ2V0VHJhbnNmb3JtUGFyYW1ldGVycyhzdmcpO1xuXG5cdFx0bGV0IG5ld1NjYWxlID0gc2NhbGUgKyBkc2NhbGU7XG5cblx0XHRpZiAobmV3U2NhbGUgPiBtYXhab29tIHx8IG5ld1NjYWxlIDwgbWluWm9vbSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHN2Zy5zdHlsZS50cmFuc2Zvcm0gPSBnZXRUcmFuc2Zvcm1TdHJpbmcobmV3U2NhbGUsIHgsIHkpO1xuXHR9XG5cblx0cGFuRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuXHRcdGxldCBkeCA9IDAsXG5cdFx0XHRkeSA9IDA7XG5cblx0XHRjb25zdCBzcGVlZCA9IDMwO1xuXG5cdFx0c3dpdGNoIChkaXJlY3Rpb24pIHtcblx0XHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0XHRkeCA9IHNwZWVkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0ZHggPSAtc3BlZWQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAndXAnOlxuXHRcdFx0XHRkeSA9IHNwZWVkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Rvd24nOlxuXHRcdFx0XHRkeSA9IC1zcGVlZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0bGV0IHN2ZyA9IHRoaXMuZWw7XG5cdFx0Y29uc3QgeyBzY2FsZSwgeCwgeSB9ID0gZ2V0VHJhbnNmb3JtUGFyYW1ldGVycyhzdmcpO1xuXHRcdHN2Zy5zdHlsZS50cmFuc2Zvcm0gPSBnZXRUcmFuc2Zvcm1TdHJpbmcoc2NhbGUsIHggKyBkeCwgeSArIGR5KTtcblx0fVxuXG5cdHBhbihjbGllbnRYLCBjbGllbnRZKSB7XG5cdFx0aWYgKCF0aGlzLmRyYWdTdGF0ZS5kcmFnZ2luZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgc3ZnID0gdGhpcy5lbDtcblx0XHRjb25zdCB7IHNjYWxlLCB4LCB5IH0gPSBnZXRUcmFuc2Zvcm1QYXJhbWV0ZXJzKHN2Zyk7XG5cblx0XHRsZXQgZHggPSBjbGllbnRYIC0gdGhpcy5kcmFnU3RhdGUubGFzdFg7XG5cdFx0bGV0IGR5ID0gY2xpZW50WSAtIHRoaXMuZHJhZ1N0YXRlLmxhc3RZO1xuXG5cdFx0dGhpcy5kcmFnU3RhdGUubGFzdFggPSBjbGllbnRYO1xuXHRcdHRoaXMuZHJhZ1N0YXRlLmxhc3RZID0gY2xpZW50WTtcblxuXHRcdHN2Zy5zdHlsZS50cmFuc2Zvcm0gPSBnZXRUcmFuc2Zvcm1TdHJpbmcoc2NhbGUsIHggKyBkeCwgeSArIGR5KTtcblx0fVxuXG5cdGFjdGl2YXRlKCkge1xuXHRcdGlmICh0aGlzLmFjdGl2ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XG5cdFx0dGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShhbmltYXRpb25DbGFzcyk7XG5cdFx0Ly8gVGhpcyBpcyBoYXJkIHRvIGdldCByaWdodCBvbiBzbWFsbCBzY3JlZW5zLCBzbyBsZXQgdGhlbSB1c2UgdGhlIGJ1dHRvbnMuXG5cdFx0aWYgKCFpc01vYmlsZSgpKSB7XG5cdFx0XHQvLyBab29taW5nLlxuXHRcdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGxldCBzY2FsZSA9IGUuZGVsdGFZIDwgMCA/IDAuMSA6IC0wLjE7XG5cdFx0XHRcdHRoaXMuem9vbShzY2FsZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHQnbW91c2Vkb3duJyxcblx0XHRcdFx0KGUpID0+IHtcblx0XHRcdFx0XHR0aGlzLmRyYWdTdGF0ZS5kcmFnZ2luZyA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5kcmFnU3RhdGUubGFzdFggPSBlLmNsaWVudFg7XG5cdFx0XHRcdFx0dGhpcy5kcmFnU3RhdGUubGFzdFkgPSBlLmNsaWVudFk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHsgcGFzc2l2ZTogdHJ1ZSB9LFxuXHRcdFx0KTtcblxuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0J21vdXNlbW92ZScsXG5cdFx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wYW4oZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7IHBhc3NpdmU6IHRydWUgfSxcblx0XHRcdCk7XG5cblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdCdtb3VzZXVwJyxcblx0XHRcdFx0KGUpID0+IHtcblx0XHRcdFx0XHR0aGlzLmRyYWdTdGF0ZS5kcmFnZ2luZyA9IGZhbHNlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR7IHBhc3NpdmU6IHRydWUgfSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdTVkdWaWV3ZXJDb250cm9sbGVyKG9wdHMpIHtcblx0bGV0IHsgZGlhZ3JhbURlc2NyaXB0aW9uSUQgfSA9IG9wdHM7XG5cdGxldCBkaWFncmFtRGVzY3JpcHRpb25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWdyYW1EZXNjcmlwdGlvbklEKTtcblxuXHRyZXR1cm4ge1xuXHRcdHN2Z1ZpZXdlcjogbnVsbCxcblx0XHQvLyBUb2dnbGUgZm9yIGEgbW9kYWwgdmlldyBvZiB0aGUgZGlhZ3JhbS5cblx0XHRzaG93TW9kYWw6IGZhbHNlLFxuXHRcdHRvb2x0aXA6IHtcblx0XHRcdHNob3c6IGZhbHNlLFxuXHRcdFx0Y29udGVudDogJycsXG5cdFx0XHRzdHlsZTogJycsXG5cdFx0fSxcblx0XHRhY3RpdmF0ZSgpIHtcblx0XHRcdHRoaXMuc3ZnVmlld2VyLmFjdGl2YXRlKCk7XG5cdFx0fSxcblx0XHR0b2dnbGVNb2RhbCgpIHtcblx0XHRcdHRoaXMuc2hvd01vZGFsID0gIXRoaXMuc2hvd01vZGFsO1xuXHRcdH0sXG5cdFx0em9vbShuKSB7XG5cdFx0XHR0aGlzLnN2Z1ZpZXdlci56b29tKG4gLyAzKTtcblx0XHR9LFxuXHRcdHBhbihkaXJlY3Rpb24pIHtcblx0XHRcdHRoaXMuc3ZnVmlld2VyLnBhbkRpcmVjdGlvbihkaXJlY3Rpb24pO1xuXHRcdH0sXG5cblx0XHRpbml0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLiR3YXRjaCgnc2hvd01vZGFsJywgKHZhbCkgPT4ge1xuXHRcdFx0XHRkZWJ1Zygnc2hvd01vZGFsJywgdmFsKTtcblx0XHRcdFx0dGhpcy5zdmdWaWV3ZXIucmVzZXQoKTtcblxuXHRcdFx0XHR0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdvbi1sb2FkJyk7XG5cblx0XHRcdFx0Ly8gV2Ugd2FudCB0byBwcmVzZXJ2ZSB0aGUgYmVoYXZpb3Igb2YgdGhlIFNWRyAod2l0aCB0b29sdGlwcyksXG5cdFx0XHRcdC8vIHNvIGp1c3QgbW92ZSB0aGUgZWxlbWVudCBpbiB0aGUgRE9NLlxuXHRcdFx0XHRsZXQgZnJhbWUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGFyZ2UtZGlhZ3JhbS1zdmctZnJhbWUnKTtcblx0XHRcdFx0bGV0IG1vZGFsV3JhcHBlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sYXJnZS1kaWFncmFtLXN2Zy1tb2RhbC13cmFwcGVyJyk7XG5cdFx0XHRcdGxldCBzdmdDb250YWluZXJNb2RhbCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5zdmctY29udGFpbmVyLW1vZGFsJyk7XG5cdFx0XHRcdGlmICh2YWwpIHtcblx0XHRcdFx0XHRzdmdDb250YWluZXJNb2RhbC5yZXBsYWNlQ2hpbGRyZW4oLi4uW2ZyYW1lXSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bW9kYWxXcmFwcGVyLmFwcGVuZENoaWxkKGZyYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0bGV0IGNvbnRhaW5lciA9IHRoaXMuJGVsO1xuXHRcdFx0XHRsZXQgc3ZnID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnN2Zy1jb250YWluZXInKTtcblxuXHRcdFx0XHRpZiAoIWlzTW9iaWxlKCkpIHtcblx0XHRcdFx0XHRsZXQgYnVsbGV0cyA9IHN2Zy5xdWVyeVNlbGVjdG9yQWxsKCcuYnVsbGV0Jyk7XG5cdFx0XHRcdFx0bGV0IGJ1bGxldHNBcnJheSA9IEFycmF5LmZyb20oYnVsbGV0cyk7XG5cdFx0XHRcdFx0YnVsbGV0c0FycmF5LmZvckVhY2goKGJ1bGxldCkgPT4ge1xuXHRcdFx0XHRcdFx0YnVsbGV0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudG9vbHRpcC5zaG93ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGJ1bGxldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy50b29sdGlwLnNob3cpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bGV0IGwxID0gMDtcblx0XHRcdFx0XHRcdFx0bGV0IGwyID0gMDtcblx0XHRcdFx0XHRcdFx0bGV0IGNsYXNzTmFtZXMgPSBidWxsZXQuY2xhc3NMaXN0O1xuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWVzLmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjbGFzc05hbWUubWF0Y2goL2J1bGxldC1cXGQvKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHBhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCctJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGVpdGhlciBvbiB0aGUgZm9ybSBidWxsZXQtMSBvciBidWxsZXQtMS0xLlxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gYnVsbGV0LTEtMSBtYXRjaGVzIHRoZSBmaXJzdCBidWxsZXQgZmlyc3Qgc3ViIGJ1bGxldC5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIGJ1bGxldC0xIG1hdGNoZXMgdGhlIGZpcnN0IGJ1bGxldCBhbmQgc28gb24uXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGwxID0gcGFyc2VJbnQocGFydHNbMV0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChwYXJ0cy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bDEgPSBwYXJzZUludChwYXJ0c1sxXSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGwyID0gcGFyc2VJbnQocGFydHNbMl0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdGlmIChsMSA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBGaW5kIHRoZSBudGggbGkgaW4gdGhlIGRpYWdyYW0gZGVzY3JpcHRpb24uXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGRpYWdyYW1EZXNjcmlwdGlvbkxpc3QgPSBkaWFncmFtRGVzY3JpcHRpb25FbC5jaGlsZHJlbjtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZGlhZ3JhbURlc2NyaXB0aW9uTGlzdEFycmF5ID0gQXJyYXkuZnJvbShkaWFncmFtRGVzY3JpcHRpb25MaXN0KTtcblx0XHRcdFx0XHRcdFx0XHRsZXQgaWR4ID0gbDEgLSAxO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCAmJiBpZHggPCBkaWFncmFtRGVzY3JpcHRpb25MaXN0QXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgdGFyZ2V0TGkgPSBkaWFncmFtRGVzY3JpcHRpb25MaXN0QXJyYXlbaWR4XTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChsMiA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHN1Ykxpc3RJdGVtcyA9IHRhcmdldExpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChzdWJMaXN0SXRlbXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgc3ViTGlzdEl0ZW1zQXJyYXkgPSBBcnJheS5mcm9tKHN1Ykxpc3RJdGVtcyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHN1YklkeCA9IGwyIC0gMTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoc3ViSWR4ID49IDAgJiYgc3ViSWR4IDwgc3ViTGlzdEl0ZW1zQXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXRMaSA9IHN1Ykxpc3RJdGVtc0FycmF5W3N1YklkeF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgY2xvbmUgPSB0YXJnZXRMaS5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBSZW1vdmUgbmVzdGVkIE9McyBvciBub3Rlcy5cblx0XHRcdFx0XHRcdFx0XHRcdGxldCBpZ25vcmVkRWxzID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnb2wsIC5ub3RlJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZ25vcmVkRWxzLmZvckVhY2goKG5lc3RlZExpc3QpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmVzdGVkTGlzdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5lc3RlZExpc3QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBBZGQgdGhlIHRhcmdldExpIGNvbnRlbnQgdG8gdGhlIHRvb2x0aXAuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnRvb2x0aXAuY29udGVudCA9IGNsb25lLmlubmVySFRNTDtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChsMiA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50b29sdGlwLm51bWJlciA9IGAke2wxfSR7bnVtYmVyVG9Mb3dlckFscGhhKGwyKX1gO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50b29sdGlwLm51bWJlciA9IGwxO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgc3ZnQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxhcmdlLWRpYWdyYW0tc3ZnLWNvbnRhaW5lcicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGJvdW5kcyA9IHN2Z0NvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEZyYWN0aW9uYWwgZGlzdGFuY2UgZnJvbSB0aGUgdG9wLlxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGRpc3RhbmNlWSA9IChlLmNsaWVudFkgLSBib3VuZHMudG9wKSAvIHN2Z0NvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChkaXN0YW5jZVkgPiAwLjUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50b29sdGlwLnN0eWxlID0gJ3RvcDogMDsgYm90dG9tOiBhdXRvOyc7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnRvb2x0aXAuc3R5bGUgPSAndG9wOiBhdXRvOyBib3R0b206IDA7Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50b29sdGlwLnNob3cgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnN2Z1ZpZXdlciA9IG5ldyBTdmdWaWV3ZXIoY29udGFpbmVyLCBzdmcpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0fTtcbn1cblxuZnVuY3Rpb24gbnVtYmVyVG9Mb3dlckFscGhhKG4pIHtcblx0bGV0IGEgPSAnYScuY2hhckNvZGVBdCgwKTtcblx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoYSArIG4gLSAxKTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdTd2lwZXIoZWwsIGNhbGxiYWNrKSB7XG5cdC8vIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiB0b3VjaCBzdGFydC9lbmQgZm9yIHVzIHRvIGNvbnNpZGVyIGl0IGEgc3dpcGUuXG5cdGNvbnN0IG1vdmVUaHJlc2hvbGQgPSA1MDtcblxuXHR2YXIgdG91Y2hlcyA9IHtcblx0XHR0b3VjaHN0YXJ0OiB7IHg6IC0xLCB5OiAtMSB9LFxuXHRcdHRvdWNobW92ZTogeyB4OiAtMSwgeTogLTEgfSxcblx0fTtcblxuXHQvLyBkaXJlY3Rpb24gcmV0dXJucyByaWdodCBvciBsZWZ0IGlmIGFib3ZlIG1vdmVUaHJlc2hvbGQsXG5cdC8vIGVtcHR5IGlmIG5vdC5cblx0Ly8gTm90ZSB0aGF0IHdlIGhhdmUgbm90IGltcGxlbWVudGVkIG1vdmVtZW50cyBhbG9uZyB0aGVcblx0Ly8geSBheGlzLlxuXHR0b3VjaGVzLmRpcmVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy50b3VjaG1vdmUueCA9PSAtMSkge1xuXHRcdFx0Ly8gQSByZWd1bGFyIGNsaWNrLlxuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGxldCBkaXN0YW5jZSA9IHRoaXMudG91Y2htb3ZlLnggLSB0aGlzLnRvdWNoc3RhcnQueDtcblx0XHRpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgbW92ZVRocmVzaG9sZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gZGlzdGFuY2UgPiAwID8gJ3JpZ2h0JyA6ICdsZWZ0Jztcblx0fTtcblxuXHR0b3VjaGVzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdCh0aGlzLnRvdWNoc3RhcnQueCA9IC0xKSwgKHRoaXMudG91Y2hzdGFydC55ID0gLTEpO1xuXHRcdCh0aGlzLnRvdWNobW92ZS54ID0gLTEpLCAodGhpcy50b3VjaG1vdmUueSA9IC0xKTtcblx0fTtcblxuXHR0b3VjaGVzLnVwZGF0ZSA9IGZ1bmN0aW9uIChldmVudCwgdG91Y2gpIHtcblx0XHR0aGlzW2V2ZW50LnR5cGVdLnggPSB0b3VjaC5wYWdlWDtcblx0XHR0aGlzW2V2ZW50LnR5cGVdLnkgPSB0b3VjaC5wYWdlWTtcblx0fTtcblxuXHR2YXIgaGFuZGxlVG91Y2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAodHlwZW9mIGV2ZW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXZlbnQudG91Y2hlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG5cdFx0XHRzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSAndG91Y2hzdGFydCc6XG5cdFx0XHRcdFx0dG91Y2hlcy5yZXNldCgpO1xuXHRcdFx0XHRcdHRvdWNoZXMudXBkYXRlKGV2ZW50LCB0b3VjaCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3RvdWNobW92ZSc6XG5cdFx0XHRcdFx0dG91Y2hlcy51cGRhdGUoZXZlbnQsIHRvdWNoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAndG91Y2hlbmQnOlxuXHRcdFx0XHRcdGxldCBkaXJlY3Rpb24gPSB0b3VjaGVzLmRpcmVjdGlvbigpO1xuXHRcdFx0XHRcdGlmIChkaXJlY3Rpb24pIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKGRpcmVjdGlvbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2gsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblx0ZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlVG91Y2gsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblx0ZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBoYW5kbGVUb3VjaCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgaXNNb2JpbGUsIGlzVG91Y2hEZXZpY2UgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2hlbHBlcnMnO1xuaW1wb3J0IHsgbmV3U3dpcGVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zd2lwZSc7XG5pbXBvcnQge1xuXHRuZXdSZXF1ZXN0Q2FsbGJhY2ssXG5cdG5ld1JlcXVlc3RDYWxsYmFja0ZhY3RvcnlUYXJnZXQsXG5cdFJlcXVlc3RDYWxsQmFja1N0YXR1cyxcblx0U2VhcmNoR3JvdXBJZGVudGlmaWVyLFxufSBmcm9tICcuLi8uLi9zZWFyY2gvcmVxdWVzdCc7XG5cbnZhciBkZWJ1ZyA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbaG9tZV0nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3SG9tZUNvbnRyb2xsZXIoc2VhcmNoQ29uZmlnLCBzdGF0aWNEYXRhKSB7XG5cdGRlYnVnKCduZXdIb21lQ29udHJvbGxlcicpO1xuXG5cdC8vIFRoZSBzZWN0aW9uIHdlIHBhZ2luYXRlIG9uIHRoZSBob21lIHBhZ2UuXG5cdC8vIFRoaXMgbWFwcyB0byBzZWN0aW9uLmx2bDAgaW4gc2l0ZWJheS1tZXJnZWQuXG5cdGNvbnN0IHNlY3Rpb25MZXZlbDBzID0gWydibG9nJywgJ3Jlc291cmNlcyddO1xuXG5cdC8vIEF2b2lkIGxvYWRpbmcgdG9vIG11Y2ggZGF0YSB3aGVuIG9uIG1vYmlsZS5cblx0Y29uc3QgdGlsZXNBbGdvbGlhUHJlbG9hZEl0ZW1zID0gaXNNb2JpbGUoKSA/IDEyIDogMzA7XG5cblx0Y29uc3QgcmVxdWVzdEZyb21TZWN0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGFnZTogMCxcblx0XHRcdHBhcmFtczogYHF1ZXJ5PSZoaXRzUGVyUGFnZT0ke3RpbGVzQWxnb2xpYVByZWxvYWRJdGVtc31gLFxuXHRcdFx0aW5kZXhOYW1lOiBzZWFyY2hDb25maWcuaW5kZXhOYW1lKHNlYXJjaENvbmZpZy5zZWN0aW9uc19tZXJnZWQuaW5kZXhfYnlfcHViZGF0ZSksXG5cdFx0XHRmYWNldHM6IFsnc2VjdGlvbi4qJ10sXG5cdFx0XHRmaWx0ZXJzOiBgc2VjdGlvbi5sdmwwOiR7bmFtZX0gQU5EIE5PVCBleGNsdWRlRnJvbVZpZXdzOmhvbWVgLFxuXHRcdH07XG5cdH07XG5cblx0Ly8gTnVtYmVyIG9mIHRpbGVzIHBlciBwYWdpbmF0ZWQgcGFnZS5cblx0Ly8gSXQgd2lsbCBzY2FsZSBkb3duIHdpdGggcGFnZSBzaXplLlxuXHRjb25zdCB0aWxlc1BhZ2VTaXplID0gNjtcblx0Y29uc3QgdGlsZXNQYWdlU2l6ZU1vYmlsZSA9IDI7XG5cblx0Ly8gQ3JlYXRlIGEgbmV3IHBhZ2VyIGZvciB0aGUgZ2l2ZW4gZWwgYW5kIGl0ZW1zLlxuXHQvLyBwYWdlU2l6ZSBpcyB0aGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuXHQvLyBtb2JpbGVPdmVybGFwIGlzIGhvdyBtdWNoIG9mIHRoZSB0aGlyZCB0aWxlIHdlIHNob3cgKHRvIGluZGljYXRlIHN3aXBlKS5cblx0Y29uc3QgbmV3UGFnZXIgPSBmdW5jdGlvbiAocGFnZVNpemUsIGVsLCBpdGVtcyA9IG51bGwpIHtcblx0XHRpZiAoIWVsKSB7XG5cdFx0XHR0aHJvdyAncGFnZXIgZWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkJztcblx0XHR9XG5cblx0XHRkZWJ1ZygnbmV3UGFnZXInKTtcblxuXHRcdGlmICghaXRlbXMpIHtcblx0XHRcdC8vIFNldCB1cCBzb21lIHRlbXBvcmFyeSBwbGFjZWhvbGRlcnMuIFRoZSByZWFsIGRhdGEgd2lsbCBhcnJpdmUgbGF0ZXIuXG5cdFx0XHRpdGVtcyA9IFtdO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzQWxnb2xpYVByZWxvYWRJdGVtczsgaSsrKSB7XG5cdFx0XHRcdC8vIFRoZSByZWFsIGRhdGEgYXJyaXZlcyBsYXRlci5cblx0XHRcdFx0bGV0IGhyZWYgPSBgI2R1bW15JHtpfWA7XG5cdFx0XHRcdGxldCBpdGVtID0geyBsaW5rVGl0bGU6ICcnLCBocmVmOiBocmVmLCBvYmplY3RJRDogaHJlZiB9O1xuXHRcdFx0XHRpdGVtLmV4Y2VycHRUcnVuY2F0ZWQgPSBmdW5jdGlvbiAoKSB7fTtcblxuXHRcdFx0XHRpdGVtcy5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBwYWdlciA9IHtcblx0XHRcdGluZGV4OiAwLCAvLyBjdXJyZW50IHNsaWRlLCB6ZXJvIGJhc2VkLlxuXHRcdFx0bnVtUGFnZXM6IDAsIC8vIFRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXMuXG5cdFx0XHRwYWdlU2l6ZTogcGFnZVNpemUsIC8vIFRoZSBudW1iZXIgb2Ygc2xpZGVzIHBlciBwYWdlLlxuXHRcdFx0c2hvd05hdmlnYXRpb246IGZhbHNlLCAvLyBXaGV0aGVyIHRvIHNob3cgdGhlIHByZXYvbmV4dCBhbmQgdGhlIHByb2dyZXNzIGJhci5cblx0XHRcdGVsOiBlbCwgLy8gVGhlIGNhcm91c2VsIERPTSBlbGVtZW50LlxuXHRcdFx0aXRlbXM6IGl0ZW1zLCAvLyBUaGUgaXRlbXM7IGFuIGl0ZW0gbXVzdCBoYXZlIGEgbGlua1RpdGxlIGFuZCBhbiBocmVmIHNldC5cblx0XHR9O1xuXG5cdFx0cGFnZXIudG9nZ2xlU2hvd05hdmlnYXRpb24gPSBmdW5jdGlvbiAoc2hvdykge1xuXHRcdFx0dGhpcy5zaG93TmF2aWdhdGlvbiA9IHNob3c7XG5cdFx0fTtcblxuXHRcdC8vIFdlIHNldCB1cCBzb21lIGR1bW15IGluaXRpYWwgb24gY29tcG9uZW50IGluaXQgYW5kIHJlY2VpdmUgdGhlIHJlYWwgaXRlbXMgYSBsaXR0bGUgYml0IGxhdGVyLlxuXHRcdHBhZ2VyLnNldEl0ZW1zID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG5cdFx0XHRpZiAoIXRoaXMuZWwpIHtcblx0XHRcdFx0Ly8gVXNlciBoYXMgbmF2aWdhdGVkIGF3YXkuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuaXRlbXMgPSBpdGVtcztcblx0XHRcdHRoaXMuaW5pdEl0ZW1zKCk7XG5cdFx0fTtcblxuXHRcdHBhZ2VyLmluaXRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuZWwuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2Fyb3VzZWwtc2xpZGUtY291bnQnLCB0aGlzLml0ZW1zLmxlbmd0aCk7XG5cblx0XHRcdHRoaXMucmVmcmVzaFBhZ2VTaXplKCk7XG5cdFx0XHR0aGlzLmFkanVzdEluZGV4KDApO1xuXHRcdH07XG5cblx0XHQvLyBhZGp1c3RJbmRleCBieSBpbmNyIG51bWJlciBvZiBzbGlkZXMgaW4gZWl0aGVyIGRpcmVjdGlvbi5cblx0XHRwYWdlci5hZGp1c3RJbmRleCA9IGZ1bmN0aW9uIChpbmNyKSB7XG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLmluZGV4ICsgaW5jcjtcblx0XHRcdGlmIChpbmRleCA8IDApIHtcblx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0fSBlbHNlIGlmIChpbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aCkge1xuXHRcdFx0XHRpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5kZXggPSBpbmRleDtcblx0XHRcdHRoaXMuZWwuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2Fyb3VzZWwtc2xpZGUnLCB0aGlzLmluZGV4KTtcblx0XHR9O1xuXG5cdFx0Ly8gUmVmcmVzaCBwYWdlIHNpemUgZnJvbSBDU1MuXG5cdFx0Ly8gLS1jYXJvdXNlbC1wYWdlLXNpemUgY2FuIGJlIGEgY2FsYyBleHByZXNzaW9uIHNvIHdlIG5lZWQgdG8gZG8gaXRcblx0XHQvLyBpbiB0aGlzIHJvdW5kYWJvdXQgIHdheS5cblx0XHRwYWdlci5yZWZyZXNoUGFnZVNpemUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgcHNFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnBhZ2Utc2l6ZScpO1xuXHRcdFx0bGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShwc0VsKTtcblx0XHRcdGxldCBwcyA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3otaW5kZXgnKTtcblx0XHRcdGxldCBwYWdlU2l6ZSA9IHBhcnNlSW50KHBzLCAxMCk7XG5cdFx0XHR0aGlzLm51bVBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuaXRlbXMubGVuZ3RoIC8gcGFnZVNpemUpO1xuXG5cdFx0XHRpZiAocGFnZVNpemUgIT09IHRoaXMucGFnZVNpemUpIHtcblx0XHRcdFx0dGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuXHRcdFx0XHR0aGlzLmFkanVzdEluZGV4KDApO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRwYWdlci5oYXNOZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5kZXggKyB0aGlzLnBhZ2VTaXplIDwgdGhpcy5pdGVtcy5sZW5ndGg7XG5cdFx0fTtcblxuXHRcdHBhZ2VyLm5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmFkanVzdEluZGV4KDEgKiB0aGlzLnBhZ2VTaXplKTtcblx0XHR9O1xuXG5cdFx0cGFnZXIuaGFzUHJldiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmluZGV4ID4gMDtcblx0XHR9O1xuXG5cdFx0cGFnZXIucHJldiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuYWRqdXN0SW5kZXgoLTEgKiB0aGlzLnBhZ2VTaXplKTtcblx0XHR9O1xuXG5cdFx0cGFnZXIucGFnZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBNYXRoLmNlaWwoKHRoaXMuaW5kZXggKyAxKSAvIHRoaXMucGFnZVNpemUpO1xuXHRcdH07XG5cblx0XHQvLyBwcm9ncmVzcyByZXR1cm5zIGEgc2xpY2Ugb2YgYm9vbHMgb2Ygc2l6ZSBsZW5ndGggaW5kaWNhdGluZyB0aGUgcHJvZ3Jlc3Mgb2YgdGhpcyBwYWdlci5cblx0XHQvLyBUaGlzIGNvbnN0cnVjdCBtYXkgbG9vayBhIGxpdHRsZSBvZGQsIGJ1dCBpdCBtYWtlcyB0aGUgQWxwaW5lSlMgdGVtcGxhdGUgY29uc3RydWN0IHNpbXBsZS5cblx0XHRwYWdlci5wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLm51bVBhZ2VzID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGxldCBwYWdlID0gdGhpcy5wYWdlKCk7XG5cdFx0XHRsZXQgcHJvZ3Jlc3NTbGljZSA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5udW1QYWdlczsgaSsrKSB7XG5cdFx0XHRcdHByb2dyZXNzU2xpY2UucHVzaChpIDw9IHBhZ2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHByb2dyZXNzU2xpY2U7XG5cdFx0fTtcblxuXHRcdGxldCBwYWdlU2l6ZVhsID0gcGFnZVNpemU7XG5cdFx0bGV0IHBhZ2VTaXplTGcgPSBwYWdlU2l6ZSA9PT0gdGlsZXNQYWdlU2l6ZU1vYmlsZSA/IHRpbGVzUGFnZVNpemVNb2JpbGUgOiBwYWdlU2l6ZSAtIDE7XG5cdFx0bGV0IHBhZ2VTaXplTWQgPSBwYWdlU2l6ZSA9PT0gdGlsZXNQYWdlU2l6ZU1vYmlsZSA/IHRpbGVzUGFnZVNpemVNb2JpbGUgOiBwYWdlU2l6ZSAtIDI7XG5cblx0XHRwYWdlci5lbC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jYXJvdXNlbC1wYWdlLXNpemUtLW1vYmlsZScsIHRpbGVzUGFnZVNpemVNb2JpbGUpO1xuXHRcdHBhZ2VyLmVsLnN0eWxlLnNldFByb3BlcnR5KCctLWNhcm91c2VsLXBhZ2Utc2l6ZS0teGwnLCBwYWdlU2l6ZVhsKTtcblx0XHRwYWdlci5lbC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jYXJvdXNlbC1wYWdlLXNpemUtLWxnJywgcGFnZVNpemVMZyk7XG5cdFx0cGFnZXIuZWwuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2Fyb3VzZWwtcGFnZS1zaXplLS1tZCcsIHBhZ2VTaXplTWQpO1xuXG5cdFx0cGFnZXIuaW5pdEl0ZW1zKCk7XG5cblx0XHRpZiAoaXNUb3VjaERldmljZSgpKSB7XG5cdFx0XHRuZXdTd2lwZXIoZWwsIGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcblx0XHRcdFx0c3dpdGNoIChkaXJlY3Rpb24pIHtcblx0XHRcdFx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdFx0XHRcdHBhZ2VyLm5leHQoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0XHRcdHBhZ2VyLnByZXYoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcGFnZXI7XG5cdH07XG5cblx0Ly8gTWFwcyB0aGUgdmFsdWVzIGluIHNlY3Rpb25MZXZlbDBzIHRvIHRoZWlyIHRpbGVzIGRhdGEuXG5cdGxldCBzZWN0aW9uVGlsZXMgPSB7fTtcblxuXHRyZXR1cm4ge1xuXHRcdGRhdGE6IHtcblx0XHRcdHNlY3Rpb25UaWxlczogc2VjdGlvblRpbGVzLFxuXHRcdH0sXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRkZXN0cm95ZWQ6IGZhbHNlLFxuXHRcdG1lbnVTdGF0ZUNoYW5naW5nOiBmYWxzZSxcblxuXHRcdGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGRlYnVnKCdpbml0Jyk7XG5cblx0XHRcdHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0ZGVidWcoJ2luaXQ6IG5leHRUaWNrJyk7XG5cdFx0XHRcdC8vIFNldCB1cCBwbGFjZWhvbGRlcnMgZm9yIHRoZSBkeW5hbWljIGNhcm91c2Vscy5cblx0XHRcdFx0Ly8gVGhlIGRhdGEgd2lsbCBhcnJpdmUgb24gaW50ZXJzZWN0LlxuXHRcdFx0XHRjb25zb2xlLmxvZyhzZWN0aW9uTGV2ZWwwcylcblx0XHRcdFx0c2VjdGlvbkxldmVsMHMuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0XHRcdGxldCBlbCA9IHRoaXMuJHJlZnNbYGNhcm91c2VsLSR7bmFtZX1gXTtcblx0XHRcdFx0XHRsZXQgcGFnZXIgPSBuZXdQYWdlcih0aWxlc1BhZ2VTaXplLCBlbCk7XG5cdFx0XHRcdFx0dGhpcy5kYXRhLnNlY3Rpb25UaWxlc1tuYW1lXSA9IHBhZ2VyO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLmxvYWRlZCA9IHRydWU7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuXHRcdFx0Ly8gUHJldmVudHMgbWVtb3J5IGxlYWsuXG5cdFx0XHRPYmplY3QudmFsdWVzKHNlY3Rpb25UaWxlcykuZm9yRWFjaCgodGlsZSkgPT4ge1xuXHRcdFx0XHR0aWxlLmVsID0gbnVsbDtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRpbml0Q2Fyb3VzZWxzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRkZWJ1ZygnaW5pdENhcm91c2VscycpO1xuXHRcdFx0Y29uc29sZS5sb2coc2VjdGlvbkxldmVsMHMpXG5cdFx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRcdHNlY3Rpb25MZXZlbDBzLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdFx0XHRsZXQgZmFjdG9yeSA9IHtcblx0XHRcdFx0XHRcdHN0YXR1czogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gUmVxdWVzdENhbGxCYWNrU3RhdHVzLk9uY2U7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y3JlYXRlOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdSZXF1ZXN0Q2FsbGJhY2socmVxdWVzdEZyb21TZWN0aW9uKG5hbWUpLCAocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhLnNlY3Rpb25UaWxlc1tuYW1lXS5zZXRJdGVtcyhyZXN1bHQuaGl0cyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dGhpcy4kc3RvcmUuc2VhcmNoLmFkZFNlYXJjaGVzKG5ld1JlcXVlc3RDYWxsYmFja0ZhY3RvcnlUYXJnZXQoZmFjdG9yeSwgU2VhcmNoR3JvdXBJZGVudGlmaWVyLkFkSG9jKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdG9uRWZmZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5kZXN0cm95ZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8gVGhpcyBjb25zdHJ1Y3QgbWF5IGxvb2sgb2RkLCBidXQgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGZyb20gYW4geC1lZmZlY3QsXG5cdFx0XHQvLyBzbyB0aGlzIHdpbGwgdHJpZ2dlciBvbiBhbnkgY2hhbmdlIHRvIHRoZSBvcGVuIHN0YXRlLlxuXHRcdFx0bGV0IGVsID0gdGhpcy4kc3RvcmUubmF2Lm9wZW4uZXhwbG9yZXI7XG5cdFx0XHR0aGlzLm9uTmF2Q2hhbmdlKHRydWUpO1xuXHRcdH0sXG5cblx0XHQvLyBvbk5hdkNoYW5nZSB0cmlnZ2VycyBvbiBzY3JlZW4gcmVzaXplIG9yIGUuZy4gaWYgdGhlIGV4cGxvcmVyIG9wZW5zL2Nsb3Nlcy5cblx0XHQvLyBUaGUgc2xpZGUgd2lkdGggbWF5IGhhdmUgY2hhbmdlZCBzbyB0aGUgcGFnZXIgbnVtYmVyIG9mIHBhZ2VzIG1heSBoYXZlIGNoYW5nZWQuXG5cdFx0b25OYXZDaGFuZ2U6IGZ1bmN0aW9uIChtZW51U3RhdGVDaGFuZ2UgPSBmYWxzZSkge1xuXHRcdFx0aWYgKHRoaXMuZGVzdHJveWVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChtZW51U3RhdGVDaGFuZ2UpIHtcblx0XHRcdFx0Ly8gQXZvaWQgdGhlIHNjcm9sbCB0cmFuc2l0aW9uIHdoZW4gdGhlIGxlZnQgbWVudSBjaGFuZ2VzIHN0YXRlLlxuXHRcdFx0XHR0aGlzLm1lbnVTdGF0ZUNoYW5naW5nID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGZvciAobGV0IGkgaW4gdGhpcy5kYXRhLnNlY3Rpb25UaWxlcykge1xuXHRcdFx0XHR0aGlzLmRhdGEuc2VjdGlvblRpbGVzW2ldLnJlZnJlc2hQYWdlU2l6ZSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1lbnVTdGF0ZUNoYW5nZSkge1xuXHRcdFx0XHR0aGlzLm1lbnVTdGF0ZUNoYW5naW5nID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGdldEludFBhcmFtRnJvbUxvY2F0aW9uLCBzZXREb2N1bWVudE1ldGEsIHVwZGF0ZVBhZ2luYXRpb25QYXJhbUluTG9jYXRpb24gfSBmcm9tICcuLi8uLi9oZWxwZXJzL2hlbHBlcnMnO1xuaW1wb3J0IHsgbmV3Q3JlYXRlSHJlZiB9IGZyb20gJy4uLy4uL25hdmlnYXRpb24vaW5kZXgnO1xuaW1wb3J0IHtcblx0bmV3UmVxdWVzdENhbGxiYWNrLFxuXHRuZXdSZXF1ZXN0Q2FsbGJhY2tGYWN0b3J5VGFyZ2V0LFxuXHRTZWFyY2hHcm91cElkZW50aWZpZXIsXG5cdFJlcXVlc3RDYWxsQmFja1N0YXR1cyxcbn0gZnJvbSAnanMvbWFpbi9zZWFyY2gvcmVxdWVzdCc7XG5cbnZhciBkZWJ1ZyA9IDAgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUsICdbbGlzdF0nKSA6IGZ1bmN0aW9uICgpIHt9O1xuXG5jb25zdCBzZWFyY2hOYW1lID0gJ3NlYXJjaDpkYXRhLWNhdGVnb3JpZXMtZmlsdGVyZWQnO1xuY29uc3QgcGFnZUtleSA9ICdwYWdlJztcbmNvbnN0IGRlc2lnbk1vZGUgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1NlY3Rpb25zQ29udHJvbGxlcihzZWFyY2hDb25maWcsIHBhcmFtcykge1xuXHRpZiAoIXNlYXJjaENvbmZpZykge1xuXHRcdHRocm93ICduZXdTZWN0aW9uc0NvbnRyb2xsZXI6IG11c3QgcHJvdmlkZSBzZWFyY2hDb25maWcnO1xuXHR9XG5cblx0Y29uc3QgaHJlZkZhY3RvcnkgPSBuZXdDcmVhdGVIcmVmKHNlYXJjaENvbmZpZyk7XG5cblx0Y29uc3QgdXBkYXRlU2VhcmNoZXMgPSBmdW5jdGlvbiAoc2VsZiwgcGFnZSkge1xuXHRcdGlmIChwYWdlIDwgMSkge1xuXHRcdFx0cGFnZSA9IDE7XG5cdFx0fVxuXHRcdGxldCBmYWN0b3J5ID0ge1xuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBSZXF1ZXN0Q2FsbEJhY2tTdGF0dXMuT25jZTtcblx0XHRcdH0sXG5cdFx0XHRjcmVhdGU6IChxdWVyeSkgPT4ge1xuXHRcdFx0XHRsZXQgZmlsdGVycyA9IGBzZWN0aW9uLmx2bCR7c2VsZi5kYXRhLmx2bH06JyR7c2VsZi5rZXl9J2A7XG5cblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5LmxuZHEpO1xuXG5cdFx0XHRcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0XHRcdHBhZ2U6IHBhZ2UgLSAxLCAvLyBwYWdpbmF0b3IgaXMgMSBiYXNlZCwgQWxnb2xpYSBpcyAwIGJhc2VkLlxuXHRcdFx0XHRcdGluZGV4TmFtZTogc2VhcmNoQ29uZmlnLmluZGV4TmFtZShzZWFyY2hDb25maWcuc2VjdGlvbnNfbWVyZ2VkLmluZGV4X2J5X3B1YmRhdGUpLFxuXHRcdFx0XHRcdGZhY2V0czogWydzZWN0aW9uLionXSxcblx0XHRcdFx0XHRmaWx0ZXJzOiBmaWx0ZXJzLFxuXHRcdFx0XHRcdGZhY2V0RmlsdGVyczogcXVlcnkudG9GYWNldEZpbHRlcnMoKSxcblx0XHRcdFx0XHRwYXJhbXM6IGBxdWVyeT0ke3F1ZXJ5LmxuZHF9YCxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZXR1cm4gbmV3UmVxdWVzdENhbGxiYWNrKHJlcXVlc3QsIChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRzZWxmLiRzdG9yZS5zZWFyY2gud2l0aEJsYW5rKCgpID0+IHtcblx0XHRcdFx0XHRcdHNlbGYuaGFuZGxlUmVzdWx0KHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRzZWxmLiRuZXh0VGljaygoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuJHN0b3JlLm5hdi5zY3JvbGxUb05hdkJhcklmUGlubmVkKCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdH07XG5cblx0XHRzZWxmLiRzdG9yZS5zZWFyY2guYWRkU2VhcmNoZXMobmV3UmVxdWVzdENhbGxiYWNrRmFjdG9yeVRhcmdldChmYWN0b3J5LCBTZWFyY2hHcm91cElkZW50aWZpZXIuTWFpbikpO1xuXHR9O1xuXG5cdGNvbnN0IGFjdGl2YXRlU2VhcmNoZXMgPSBmdW5jdGlvbiAoc2VsZikge1xuXHRcdHNlbGYuJHN0b3JlLnNlYXJjaC51cGRhdGVMb2NhdGlvbldpdGhRdWVyeSgpO1xuXHRcdGxldCBwYWdlID0gZ2V0SW50UGFyYW1Gcm9tTG9jYXRpb24ocGFnZUtleSk7XG5cdFx0aWYgKHBhZ2UgPCAxKSB7XG5cdFx0XHRwYWdlID0gMTtcblx0XHR9XG5cdFx0c2VsZi5kYXRhLnBhZ2UgPSBwYWdlO1xuXHRcdHNlbGYuJHdhdGNoKCdkYXRhLnBhZ2UnLCAodmFsdWUsIG9sZFZhbHVlKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUgPT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHVwZGF0ZVBhZ2luYXRpb25QYXJhbUluTG9jYXRpb24ocGFnZUtleSwgdmFsdWUsIDEpO1xuXHRcdFx0dXBkYXRlU2VhcmNoZXMoc2VsZiwgdmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0dXBkYXRlU2VhcmNoZXMoc2VsZiwgc2VsZi5kYXRhLnBhZ2UpO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIHNvcnRPYmplY3Qob2JqLCBsZXNzKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG9iailcblx0XHRcdC5zb3J0KGxlc3MpXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGtleSkge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSwge30pO1xuXHR9XG5cblx0dmFyIHNvcnRPcHRpb25zID0gW1xuXHRcdHtcblx0XHRcdHRpdGxlOiAnU29ydCBieSBDYXRlZ29yeScsXG5cdFx0XHRmaWVsZDogJycsXG5cdFx0XHRzb3J0U2VjdGlvbnM6IHRydWUsXG5cdFx0XHRmaXJzdFRleHQ6ICdBc2NlbmRpbmcnLFxuXHRcdFx0c2Vjb25kVGV4dDogJ0Rlc2NlbmRpbmcnLFxuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdGRvd246IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGl0bGU6ICdTb3J0IEFscGhhYmV0aWNhbGx5Jyxcblx0XHRcdGZpZWxkOiAnbGlua1RpdGxlJyxcblx0XHRcdGZpcnN0VGV4dDogJ0FzY2VuZGluZycsXG5cdFx0XHRzZWNvbmRUZXh0OiAnRGVzY2VuZGluZycsXG5cdFx0XHRlbmFibGVkOiBmYWxzZSxcblx0XHRcdGRvd246IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGl0bGU6ICdTb3J0IGJ5IFB1Ymxpc2hlZCBkYXRlJyxcblx0XHRcdGZpZWxkOiAnZmlyc3RQdWJsaXNoZWRUaW1lJyxcblx0XHRcdGZpcnN0VGV4dDogJ05ld2VzdCBmaXJzdCcsXG5cdFx0XHRzZWNvbmRUZXh0OiAnT2xkZXN0IGZpcnN0Jyxcblx0XHRcdG1vcmVJc0xlc3M6IHRydWUsXG5cdFx0XHRlbmFibGVkOiBmYWxzZSxcblx0XHRcdGRvd246IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0dGl0bGU6ICdTb3J0IGJ5IE1vZGlmaWVkIGRhdGUnLFxuXHRcdFx0ZmllbGQ6ICdsYXN0VXBkYXRlZFRpbWUnLFxuXHRcdFx0Zmlyc3RUZXh0OiAnTmV3ZXN0IGZpcnN0Jyxcblx0XHRcdHNlY29uZFRleHQ6ICdPbGRlc3QgZmlyc3QnLFxuXHRcdFx0bW9yZUlzTGVzczogdHJ1ZSxcblx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxuXHRcdFx0ZG93bjogZmFsc2UsXG5cdFx0fSxcblx0XTtcblxuXHRyZXR1cm4ge1xuXHRcdHVpU3RhdGU6IHtcblx0XHRcdC8vIFdoZW4gdG9nbGVkIG9uIHdlIHNob3cgYSBsaXN0IG9mIGFsbCBkZXNjZW5kYW50IGd1aWRlcy5cblx0XHRcdGxpc3RHdWlkZXNQZXJTZWN0aW9uOiBmYWxzZSxcblxuXHRcdFx0Ly8gV2hlbiB0b2dsZWQgb24gd2Ugc2hvdyBhIGxpc3Qgb2YgYWxsIHRoZSBndWlkZXMgaW4gdGhpcyBzZWN0aW9uLlxuXHRcdFx0Ly8gVGhpcyBpcyBlbmFibGVkIGZvciBib3R0b20gbGV2ZWwgb25seVxuXHRcdFx0bGlzdEd1aWRlczogZmFsc2UsXG5cblx0XHRcdC8vIEVuYWJsZWQgIG9uIGZpcnN0IGxldmVsIG9yIHdoZW4gd2UgZ2V0IHRvIHRoZSBib3R0b20gbGV2ZWwuXG5cdFx0XHRub1RvZ2dsZUd1aWRlc0xpbms6IGZhbHNlLFxuXG5cdFx0XHRzb3J0aW5nOiB7XG5cdFx0XHRcdG9wdGlvbnM6IHNvcnRPcHRpb25zLFxuXHRcdFx0XHRvcGVuOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRsb2FkZWQ6IGZhbHNlLCAvLyBpZiBkYXRhIGlzIGxvYWRlZCBmcm9tIEFsZ29saWFcblx0XHRzdGF0dXM6IHsgY29kZTogMjAwIH0sIC8vIGVycm9yIHN0YXRlXG5cdFx0ZGF0YToge1xuXHRcdFx0cmVzdWx0OiB7XG5cdFx0XHRcdGhpdHM6IFtdLFxuXHRcdFx0fSxcblx0XHRcdHBhZ2U6IDEsIC8vIEZvciBwYWdpbmF0aW9uLlxuXHRcdFx0bWV0YToge1xuXHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdGV4Y2VycHQ6ICcnLFxuXHRcdFx0fSxcblx0XHRcdGtleTogJycsXG5cdFx0XHRzZWN0aW9uczogW10sXG5cdFx0XHRoaXRzQnlTZWN0aW9uOiB7fSxcblx0XHRcdGx2bDogMCxcblx0XHR9LFxuXG5cdFx0aW5pdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0aWYgKGRlc2lnbk1vZGUpIHtcblx0XHRcdFx0XHR0aGlzLnVpU3RhdGUubGlzdEd1aWRlc1BlclNlY3Rpb24gPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMudWlTdGF0ZS5zb3J0aW5nLm9wZW4gPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHBhcnRzID0gaHJlZkZhY3Rvcnkuc2VjdGlvbnNGcm9tUGF0aCgpO1xuXG5cdFx0XHRcdGxldCBsYXN0ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG5cdFx0XHRcdGxldCBpbmRleE5hbWUgPSBwYXJ0c1swXTtcblx0XHRcdFx0dGhpcy5rZXkgPSBwYXJ0cy5qb2luKCcgPiAnKTtcblx0XHRcdFx0bGV0IHNlY3Rpb25Db25maWcgPSBzZWFyY2hDb25maWcuc2VjdGlvbnNTb3J0ZWQuZmluZCgocykgPT4gcy5uYW1lID09PSBpbmRleE5hbWUpO1xuXHRcdFx0XHRpZiAoIXNlY3Rpb25Db25maWcpIHtcblx0XHRcdFx0XHR0aHJvdyBgbm8gc2VhcmNoIGNvbmZpZyBmb3VuZCBmb3Igc2VjdGlvbiAke2luZGV4TmFtZX1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZGF0YS5sdmwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXHRcdFx0XHR0aGlzLmRhdGEuc2VjdGlvbkNvbmZpZyA9IHNlY3Rpb25Db25maWc7XG5cdFx0XHRcdGFjdGl2YXRlU2VhcmNoZXModGhpcyk7XG5cdFx0XHRcdHRoaXMuZGF0YS5tZXRhLnRpdGxlID0gbGFzdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxhc3Quc2xpY2UoMSk7XG5cblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRcdHRoaXMudWlTdGF0ZS5zb3J0aW5nLnNvcnQgPSBmdW5jdGlvbiAob3B0KSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmZvckVhY2goKG8pID0+IHtcblx0XHRcdFx0XHRcdG8uZW5hYmxlZCA9IG9wdCA9PT0gbztcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGlmIChvcHQuc29ydFNlY3Rpb25zKSB7XG5cdFx0XHRcdFx0XHRzZWxmLmRhdGEuaGl0c0J5U2VjdGlvbiA9IHNvcnRPYmplY3Qoc2VsZi5kYXRhLmhpdHNCeVNlY3Rpb24sIChhLCBiKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHQuZG93bikge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhIDwgYiA/IDEgOiAtMTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYSA8IGIgPyAtMSA6IDE7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxmLmRhdGEucmVzdWx0LmhpdHMuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IGYxID0gYVtvcHQuZmllbGRdO1xuXHRcdFx0XHRcdFx0bGV0IGYyID0gYltvcHQuZmllbGRdO1xuXHRcdFx0XHRcdFx0aWYgKGYxID09PSBmMikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICgob3B0Lm1vcmVJc0xlc3MgJiYgIW9wdC5kb3duKSB8fCAoIW9wdC5tb3JlSXNMZXNzICYmIG9wdC5kb3duKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZjEgPCBmMiA/IDEgOiAtMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmMSA8IGYyID8gLTEgOiAxO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHRoaXMudWlTdGF0ZS5zaG93U2VjdGlvbnNUaWxlcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoIXNlbGYubG9hZGVkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiAhdGhpcy5saXN0R3VpZGVzUGVyU2VjdGlvbiAmJiAhdGhpcy5saXN0R3VpZGVzO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLnVpU3RhdGUuc2hvd0d1aWRlc1dpdGhTb3J0T3B0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICghc2VsZi5sb2FkZWQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubGlzdEd1aWRlc1BlclNlY3Rpb24gJiYgIXRoaXMubGlzdEd1aWRlcztcblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy51aVN0YXRlLnNob3dHdWlkZXNQZXJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxpc3RHdWlkZXNQZXJTZWN0aW9uICYmICghdGhpcy5zb3J0aW5nLm9wZW4gfHwgdGhpcy5zb3J0aW5nLm9wdGlvbnNbMF0uZW5hYmxlZCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMudWlTdGF0ZS5zaG93U29ydGVkR3VpZGVMaXN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICghc2VsZi5sb2FkZWQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubGlzdEd1aWRlc1BlclNlY3Rpb24gJiYgdGhpcy5zb3J0aW5nLm9wZW4gJiYgIXRoaXMuc29ydGluZy5vcHRpb25zWzBdLmVuYWJsZWQ7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0dGhpcy51aVN0YXRlLnNob3dHdWlkZXNUaWxlcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoIXNlbGYubG9hZGVkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxpc3RHdWlkZXM7XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0aGFuZGxlUmVzdWx0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRkZWJ1ZygnaGFuZGxlUmVzdWx0JywgcmVzdWx0KTtcblxuXHRcdFx0dGhpcy5kYXRhLnJlc3VsdCA9IHJlc3VsdDtcblx0XHRcdGxldCBzZWN0aW9uTWV0YSA9IHRoaXMuJHN0b3JlLnNlYXJjaC5yZXN1bHRzLmJsYW5rLmdldFNlY3Rpb25NZXRhKHRoaXMua2V5KTtcblx0XHRcdGlmIChzZWN0aW9uTWV0YSkge1xuXHRcdFx0XHR0aGlzLmRhdGEubWV0YSA9IHNlY3Rpb25NZXRhO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCEodGhpcy5kYXRhLnJlc3VsdCAmJiB0aGlzLmRhdGEucmVzdWx0Lm5iSGl0cykpIHtcblx0XHRcdFx0XHR0aGlzLnN0YXR1cy5jb2RlID0gNDA0O1xuXHRcdFx0XHRcdHRoaXMuc3RhdHVzLm1lc3NhZ2UgPSAnUGFnZSBOb3QgRm91bmQnO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnN0YXR1cy5jb2RlID0gMjAwO1xuXG5cdFx0XHRsZXQgc2VvVGl0bGUgPSB0aGlzLmRhdGEubWV0YS50aXRsZTtcblxuXHRcdFx0aWYgKHRoaXMuZGF0YS5sdmwgPT0gMCAmJiB0aGlzLmRhdGEuc2VjdGlvbkNvbmZpZy5zZW9fdGl0bGVfdGVtcGxhdGUpIHtcblx0XHRcdFx0c2VvVGl0bGUgPSB0aGlzLmRhdGEuc2VjdGlvbkNvbmZpZy5zZW9fdGl0bGVfdGVtcGxhdGU7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YS5zZWN0aW9uQ29uZmlnLnNlb190aXRsZV90ZW1wbGF0ZV9jYXRlZ29yeSkge1xuXHRcdFx0XHRzZW9UaXRsZSA9IHRoaXMuZGF0YS5zZWN0aW9uQ29uZmlnLnNlb190aXRsZV90ZW1wbGF0ZV9jYXRlZ29yeS5yZXBsYWNlKCd7Y2F0ZWdvcnl9JywgdGhpcy5kYXRhLm1ldGEudGl0bGUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgPGhlYWQ+XG5cdFx0XHRzZXREb2N1bWVudE1ldGEoe1xuXHRcdFx0XHR0aXRsZTogc2VvVGl0bGUgKyAnIHwgJyArIHBhcmFtcy5wYWdlX3RpdGxlX3N1ZmZpeCxcblx0XHRcdH0pO1xuXG5cdFx0XHRsZXQgZmFjZXRzID0gdGhpcy5kYXRhLnJlc3VsdC5mYWNldHM7XG5cblx0XHRcdC8vIFRoZSBzZWN0aW9uIGxpc3Rpbmcgd2UncmUgaW50ZXJlc3RlZCBpbiBpcyBhdCB0aGUgbmV4dCBsZXZlbC5cblx0XHRcdGxldCBuZXh0TGV2ZWwgPSB0aGlzLmRhdGEubHZsICsgMTtcblx0XHRcdGxldCBzZWN0aW9uRmFjZXQgPSBmYWNldHNbYHNlY3Rpb24ubHZsJHtuZXh0TGV2ZWx9YF07XG5cblx0XHRcdGlmIChzZWN0aW9uRmFjZXQpIHtcblx0XHRcdFx0Ly8gV2UncmUgbm90IGF0IHRoZSBib3R0b20gbGV2ZWwuIFRoaXMgd2lsbCBzaG93IHNvcnQgb3B0aW9ucy5cblx0XHRcdFx0Ly8gU29ydCB0aGUgaGl0cyBieSBzZWN0aW9uIGJ5IGRlZmF1bHRcblx0XHRcdFx0dGhpcy5kYXRhLnJlc3VsdC5oaXRzLnNvcnQoKGEsIGIpID0+IChhLnNlY3Rpb24gPCBiLnNlY3Rpb24gPyAtMSA6IDEpKTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGhpdHNCeVNlY3Rpb24gPSB0aGlzLmRhdGEucmVzdWx0LmhpdHMucmVkdWNlKGZ1bmN0aW9uIChoLCBoaXQpIHtcblx0XHRcdFx0aFtoaXQuc2VjdGlvbl0gPSAoaFtoaXQuc2VjdGlvbl0gfHwgW10pLmNvbmNhdChoaXQpO1xuXHRcdFx0XHRyZXR1cm4gaDtcblx0XHRcdH0sIHt9KTtcblxuXHRcdFx0dGhpcy5kYXRhLmhpdHNCeVNlY3Rpb24gPSBoaXRzQnlTZWN0aW9uO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHR2YXIgYXNzZW1ibGVTZWN0aW9ucyA9IGZ1bmN0aW9uIChwYXJ0cykge1xuXHRcdFx0XHRsZXQgc2VjdGlvbnMgPSBbXTtcblx0XHRcdFx0aWYgKCFwYXJ0cykge1xuXHRcdFx0XHRcdHJldHVybiBzZWN0aW9ucztcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgc2VjdGlvbktleXMgPSBbXTtcblx0XHRcdFx0Zm9yIChsZXQgc2VjdGlvbiBvZiBwYXJ0cykge1xuXHRcdFx0XHRcdHNlY3Rpb25LZXlzLnB1c2goc2VjdGlvbik7XG5cdFx0XHRcdFx0bGV0IGtleSA9IHNlY3Rpb25LZXlzLmpvaW4oJyA+ICcpO1xuXHRcdFx0XHRcdGxldCBzbSA9IHNlbGYuJHN0b3JlLnNlYXJjaC5yZXN1bHRzLmJsYW5rLmdldFNlY3Rpb25NZXRhKGtleSk7XG5cdFx0XHRcdFx0aWYgKHNtKSB7XG5cdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHNtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNlY3Rpb25zO1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5kYXRhLnNlY3Rpb25zRnJvbUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0cmV0dXJuIGFzc2VtYmxlU2VjdGlvbnMoa2V5LnNwbGl0KCcgPiAnKSk7XG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAodGhpcy5kYXRhLmx2bCA9PT0gMCkge1xuXHRcdFx0XHR0aGlzLnVpU3RhdGUubm9Ub2dnbGVHdWlkZXNMaW5rID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoIXNlY3Rpb25GYWNldCkge1xuXHRcdFx0XHQvLyBCb3R0b20gbGV2ZWwuXG5cdFx0XHRcdHRoaXMudWlTdGF0ZS5saXN0R3VpZGVzID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy51aVN0YXRlLm5vVG9nZ2xlR3VpZGVzTGluayA9IHRydWU7XG5cdFx0XHRcdHRoaXMubG9hZGVkID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbmV3U2VjdGlvbiA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGxldCBtID0gc2VsZi4kc3RvcmUuc2VhcmNoLnJlc3VsdHMuYmxhbmsuZ2V0U2VjdGlvbk1ldGEoa2V5KTtcblx0XHRcdFx0bGV0IHMgPSB7IGtleSwgdGl0bGU6ICcnLCBsaW5rVGl0bGU6ICcnLCB0aHVtYm5haWw6ICcnLCBjb3VudDogdmFsdWUgfTtcblx0XHRcdFx0cy5ocmVmID0gaHJlZkZhY3RvcnkuaHJlZlNlY3Rpb24oa2V5KTtcblxuXHRcdFx0XHRpZiAobSkge1xuXHRcdFx0XHRcdHMudGl0bGUgPSBtLnRpdGxlO1xuXHRcdFx0XHRcdHMubGlua1RpdGxlID0gbS5saW5rVGl0bGUgfHwgbS50aXRsZTtcblx0XHRcdFx0XHRzLnRodW1ibmFpbCA9IG0udGh1bWJuYWlsO1xuXHRcdFx0XHRcdHMudGh1bWJuYWlsSW5saW5lID0gbS50aHVtYm5haWxJbmxpbmUgfHwgbS50aHVtYm5haWxpbmxpbmU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocy5saW5rVGl0bGUgPT09ICcnKSB7XG5cdFx0XHRcdFx0Ly8gTWlzc2luZyBtZXRhZGF0YSwgY3JlYXRlIGEgdGl0bGUgZnJvbSB0aGUgbGFzdCBwYXJ0IG9mIHRoZSBrZXkuXG5cdFx0XHRcdFx0bGV0IGxhc3QgPSBrZXkuc3BsaXQoJyA+ICcpLnBvcCgpO1xuXHRcdFx0XHRcdHMubGlua1RpdGxlID0gbGFzdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxhc3Quc2xpY2UoMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZGF0YS5zZWN0aW9ucyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHNlY3Rpb25GYWNldCkge1xuXHRcdFx0XHR0aGlzLmRhdGEuc2VjdGlvbnMucHVzaChuZXdTZWN0aW9uKGtleS50b0xvd2VyQ2FzZSgpLCBzZWN0aW9uRmFjZXRba2V5XSkpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmxvYWRlZCA9IHRydWU7XG5cdFx0fSxcblxuXHRcdHRvZ2dsZVNob3dHdWlkZXM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMudWlTdGF0ZS5saXN0R3VpZGVzUGVyU2VjdGlvbiA9ICF0aGlzLnVpU3RhdGUubGlzdEd1aWRlc1BlclNlY3Rpb247XG5cdFx0fSxcblxuXHRcdGluY3JQYWdlOiBmdW5jdGlvbiAobnVtKSB7XG5cdFx0XHRsZXQgcGFnZSA9IHRoaXMuZGF0YS5wYWdlICsgbnVtO1xuXHRcdFx0aWYgKHBhZ2UgPCAxKSB7XG5cdFx0XHRcdHBhZ2UgPSAxO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5kYXRhLnBhZ2UgPSBwYWdlO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiLy8gQ29uZmlndXJhdGlvbiAoc2VhcmNoIEFQSSBrZXkgZXRjLilcbmltcG9ydCAqIGFzIHBhcmFtcyBmcm9tICdAcGFyYW1zJztcbmltcG9ydCBBbHBpbmUgZnJvbSAnanNsaWJzL2FscGluZWpzL3YzL2FscGluZWpzL2Rpc3QvbW9kdWxlLmVzbS5qcyc7XG5pbXBvcnQgaW50ZXJzZWN0IGZyb20gJ2pzbGlicy9hbHBpbmVqcy92My9pbnRlcnNlY3QvZGlzdC9tb2R1bGUuZXNtLmpzJztcbmltcG9ydCBwZXJzaXN0IGZyb20gJ2pzbGlicy9hbHBpbmVqcy92My9wZXJzaXN0L2Rpc3QvbW9kdWxlLmVzbS5qcyc7XG5pbXBvcnQgeyBicmlkZ2VUdXJib0FuZEFscGluZSB9IGZyb20gJy4vYWxwaW5lLXR1cmJvLWJyaWRnZSc7XG5pbXBvcnQge1xuXHRhbHBpbmVSZWdpc3RlckRpcmVjdGl2ZVNWRyxcblx0YWxwaW5lUmVnaXN0ZXJNYWdpY0hlbHBlcnMsXG5cdG5ld0Rpc3F1cyxcblx0bmV3RHJvcGRvd25zQ29udHJvbGxlcixcblx0bmV3VGFic0NvbnRyb2xsZXIsXG59IGZyb20gJy4vY29tcG9uZW50cy9pbmRleCc7XG5pbXBvcnQgeyBzZXRJc1RyYW5zbGF0aW5nLCB0b2dnbGVCb29sZWFuQ2xhc3MgfSBmcm9tICcuL2hlbHBlcnMvaGVscGVycyc7XG5pbXBvcnQgeyBsZWFja0NoZWNrZXIgfSBmcm9tICcuL2hlbHBlcnMvbGVhay1jaGVja2VyJztcbmltcG9ydCB7XG5cdG5ld0JyZWFkY3J1bWJzQ29udHJvbGxlcixcblx0bmV3TGFuZ3VhZ2VTd2l0Y2hlckNvbnRyb2xsZXIsXG5cdG5ld05hdkNvbnRyb2xsZXIsXG5cdG5ld1BhZ2luYXRvckNvbnRyb2xsZXIsXG5cdG5ld1Byb21vQ29kZXNDb250cm9sbGVyLFxuXHRuZXdTZWFyY2hFeHBsb3Jlckh5ZHJhdGVkLFxuXHRuZXdTZWFyY2hFeHBsb3JlckluaXRpYWwsXG5cdG5ld1NlYXJjaEV4cGxvcmVyTm9kZSxcblx0bmV3VG9DQ29udHJvbGxlclxufSBmcm9tICcuL25hdmlnYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgbmV3TmF2U3RvcmUgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2LXN0b3JlJztcbi8vIEFscGluZUpTIGNvbnRyb2xsZXJzIGFuZCBoZWxwZXJzLlxuaW1wb3J0IHsgbmV3RmlsZUlzc3VlQnV0dG9uIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL2ZpbGUtaXNzdWUtYnV0dG9uJztcbmltcG9ydCB7IG5ld1NWR1ZpZXdlckNvbnRyb2xsZXIgfSBmcm9tICcuL25hdmlnYXRpb24vc3ZnLXZpZXdlcic7XG5pbXBvcnQgeyBnZXRTZWFyY2hDb25maWcsIG5ld1NlYXJjaEZpbHRlcnNDb250cm9sbGVyLCBuZXdTZWFyY2hJbnB1dENvbnRyb2xsZXIsIG5ld1NlYXJjaFN0b3JlIH0gZnJvbSAnLi9zZWFyY2gvaW5kZXgnO1xuaW1wb3J0IHsgbmV3SG9tZUNvbnRyb2xsZXIgfSBmcm9tICcuL3NlY3Rpb25zL2hvbWUvaG9tZSc7XG5pbXBvcnQgeyBuZXdTZWN0aW9uc0NvbnRyb2xsZXIgfSBmcm9tICcuL3NlY3Rpb25zL3NlY3Rpb25zL2luZGV4JztcblxuLy8gU2V0IHVwIHRoZSBzZWFyY2ggY29uZmlndXJhdGlvbiAoYXMgZGVmaW5lZCBpbiBjb25maWcudG9tbCkuXG5jb25zdCBzZWFyY2hDb25maWcgPSBnZXRTZWFyY2hDb25maWcocGFyYW1zKTtcblxuLy8gSGFuZGxlIGNvbnNlbnQgY2hhbmdlcy5cbihmdW5jdGlvbiAoKSB7XG5cdHdpbmRvdy5PcHRhbm9uV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCBlID0gbmV3IEN1c3RvbUV2ZW50KCdvbmV0cnVzdDpncm91cHMtdXBkYXRlZCcsIHsgZGV0YWlsOiBPbmV0cnVzdEFjdGl2ZUdyb3VwcyB9KTtcblx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChlKTtcblx0fTtcbn0pKCk7XG5cbi8vIFNldCB1cCBhbmQgc3RhcnQgQWxwaW5lLlxuKGZ1bmN0aW9uICgpIHtcblx0Ly8gRm9yIGludGVncmF0aW9uIHRlc3RzLlxuXHRpZiAod2luZG93LkN5cHJlc3MpIHtcblx0XHR3aW5kb3cudHJ1c3RlID0ge307XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHR9XG5cblx0X19zdG9wV2F0Y2goJ2luZGV4LmpzLnN0YXJ0Jyk7XG5cblx0Ly8gUmVnaXN0ZXIgQWxwaW5lSlMgcGx1Z2lucy5cblx0e1xuXHRcdEFscGluZS5wbHVnaW4oaW50ZXJzZWN0KTtcblx0XHRBbHBpbmUucGx1Z2luKHBlcnNpc3QpO1xuXHR9XG5cblx0Ly8gUmVnaXN0ZXIgQWxwaW5lSlMgbWFnaWNzIGFuZCBkaXJlY3RpdmVzLlxuXHR7XG5cdFx0Ly8gSGFuZGxlcyBjb3B5IHRvIGNsaXBib2FyZCBldGMuXG5cdFx0YWxwaW5lUmVnaXN0ZXJNYWdpY0hlbHBlcnMoQWxwaW5lKTtcblx0XHQvLyBIYW5kbGVzIGlubGluaW5nIG9mIFNWR3MuXG5cdFx0YWxwaW5lUmVnaXN0ZXJEaXJlY3RpdmVTVkcoQWxwaW5lKTtcblx0fVxuXG5cdGxldCBmZXRjaENvbnRyb2xsZXIgPSBmdW5jdGlvbiAodXJsKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0aW5pdDogYXN5bmMgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsZXQgcmVzID0gYXdhaXQgZmV0Y2godXJsKTtcblx0XHRcdFx0aWYgKHJlcy5vaykge1xuXHRcdFx0XHRcdHRoaXMuZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fTtcblx0fTtcblxuXHQvLyBSZWdpc3RlciBBbHBpbmVKUyBjb250cm9sbGVycy5cblx0e1xuXHRcdC8vIFNlYXJjaCBhbmQgbmF2aWdhdGlvbi5cblx0XHRBbHBpbmUuZGF0YSgnbG5jTmF2JywgKCkgPT4gbmV3TmF2Q29udHJvbGxlcihwYXJhbXMud2VnbG90X2FwaV9rZXkpKTtcblx0XHRBbHBpbmUuZGF0YSgnbG5jTGFuZ3VhZ2VTd2l0Y2hlcicsIG5ld0xhbmd1YWdlU3dpdGNoZXJDb250cm9sbGVyKHBhcmFtcy53ZWdsb3RfYXBpX2tleSkpO1xuXHRcdEFscGluZS5kYXRhKCdsbmNTZWFyY2hGaWx0ZXJzJywgKCkgPT4gbmV3U2VhcmNoRmlsdGVyc0NvbnRyb2xsZXIoc2VhcmNoQ29uZmlnKSk7XG5cdFx0QWxwaW5lLmRhdGEoJ2xuY1NlYXJjaElucHV0JywgbmV3U2VhcmNoSW5wdXRDb250cm9sbGVyKTtcblx0XHRBbHBpbmUuZGF0YSgnbG5jU2VhcmNoRXhwbG9yZXJOb2RlJywgKG5vZGUgPSB7fSkgPT4gbmV3U2VhcmNoRXhwbG9yZXJOb2RlKHNlYXJjaENvbmZpZywgbm9kZSkpO1xuXHRcdEFscGluZS5kYXRhKCdsbmNTZWFyY2hFeHBsb3JlckluaXRpYWwnLCAoKSA9PiBuZXdTZWFyY2hFeHBsb3JlckluaXRpYWwoKSk7XG5cdFx0QWxwaW5lLmRhdGEoJ2xuY1NlYXJjaEV4cGxvcmVySHlkcmF0ZWQnLCAoKSA9PiBuZXdTZWFyY2hFeHBsb3Jlckh5ZHJhdGVkKHNlYXJjaENvbmZpZykpO1xuXHRcdEFscGluZS5kYXRhKCdsbmNUb2MnLCBuZXdUb0NDb250cm9sbGVyKTtcblx0XHRBbHBpbmUuZGF0YSgnbG5jQnJlYWRjcnVtYnMnLCAoKSA9PiBuZXdCcmVhZGNydW1ic0NvbnRyb2xsZXIoc2VhcmNoQ29uZmlnKSk7XG5cdFx0QWxwaW5lLmRhdGEoJ2xuY0Ryb3Bkb3ducycsIG5ld0Ryb3Bkb3duc0NvbnRyb2xsZXIpO1xuXHRcdEFscGluZS5kYXRhKCdsbmNUYWJzJywgbmV3VGFic0NvbnRyb2xsZXIpO1xuXHRcdEFscGluZS5kYXRhKCdsbmNEaXNxdXMnLCBuZXdEaXNxdXMpO1xuXHRcdEFscGluZS5kYXRhKCdsbmNQYWdpbmF0b3InLCBuZXdQYWdpbmF0b3JDb250cm9sbGVyKTtcblx0XHRBbHBpbmUuZGF0YSgnbG5jUHJvbW9Db2RlcycsICgpID0+IG5ld1Byb21vQ29kZXNDb250cm9sbGVyKHBhcmFtcy5pc190ZXN0KSk7XG5cdFx0QWxwaW5lLmRhdGEoJ2xuY0ZldGNoJywgZmV0Y2hDb250cm9sbGVyKTtcblx0XHRBbHBpbmUuZGF0YSgnbG52U1ZHVmlld2VyJywgbmV3U1ZHVmlld2VyQ29udHJvbGxlcik7XG5cdFx0aWYgKHBhcmFtcy5maWxlX2lzc3VlX2J1dHRvbiAmJiBwYXJhbXMuZmlsZV9pc3N1ZV9idXR0b24uZW5hYmxlKSB7XG5cdFx0XHRBbHBpbmUuZGF0YSgnbG5jRmlsZUlzc3VlQnV0dG9uJywgKCkgPT4gbmV3RmlsZUlzc3VlQnV0dG9uKHBhcmFtcy5maWxlX2lzc3VlX2J1dHRvbikpO1xuXHRcdH1cblxuXHRcdC8vIFBhZ2UgY29udHJvbGxlcnMuXG5cdFx0QWxwaW5lLmRhdGEoJ2xuY0hvbWUnLCAoc3RhdGljRGF0YSkgPT4ge1xuXHRcdFx0cmV0dXJuIG5ld0hvbWVDb250cm9sbGVyKHNlYXJjaENvbmZpZywgc3RhdGljRGF0YSk7XG5cdFx0fSk7XG5cblx0XHRBbHBpbmUuZGF0YSgnbG5jU2VjdGlvbnMnLCAoKSA9PiBuZXdTZWN0aW9uc0NvbnRyb2xsZXIoc2VhcmNoQ29uZmlnLCBwYXJhbXMpKTtcblxuXHRcdGlmICghcGFyYW1zLmVuYWJsZV9sZWFrX2NoZWNrZXIpIHtcblx0XHRcdEFscGluZS5kYXRhKCdsbmNMZWFrQ2hlY2tlcicsICgpID0+IGxlYWNrQ2hlY2tlcihBbHBpbmUpKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgdXAgQWxwaW5lSlMgc3RvcmVzLlxuXHR7XG5cdFx0QWxwaW5lLnN0b3JlKCdzZWFyY2gnLCBuZXdTZWFyY2hTdG9yZShzZWFyY2hDb25maWcsIHBhcmFtcywgQWxwaW5lKSk7XG5cdFx0QWxwaW5lLnN0b3JlKCduYXYnLCBuZXdOYXZTdG9yZShzZWFyY2hDb25maWcsIEFscGluZS5zdG9yZSgnc2VhcmNoJyksIHBhcmFtcywgQWxwaW5lKSk7XG5cdH1cblxuXHQvLyBTdGFydCBBbHBpbmUuXG5cdEFscGluZS5zdGFydCgpO1xuXG5cdC8vIFN0YXJ0IHRoZSBUdXJiby1BbHBpbmUgYnJpZGdlLlxuXHRicmlkZ2VUdXJib0FuZEFscGluZShBbHBpbmUpO1xufSkoKTtcblxuLy8gU2V0IHVwIGdsb2JhbCBldmVudCBsaXN0ZW5lcnMgZXRjLlxuKGZ1bmN0aW9uICgpIHtcblx0aWYgKCF3aW5kb3cuX19zdG9wV2F0Y2gpIHtcblx0XHR3aW5kb3cuX19zdG9wV2F0Y2ggPSBmdW5jdGlvbiAobmFtZSkge307XG5cdH1cblx0Ly8gU2V0IHVwIGEgZ2xvYmFsIGZ1bmN0aW9uIHRvIHNlbmQgZXZlbnRzIHRvIEdvb2dsZSBBbmFseXRpY3MuXG5cdHdpbmRvdy5ndGFnID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0dGhpcy5kYXRhTGF5ZXIgPSB0aGlzLmRhdGFMYXllciB8fCBbXTtcblx0XHR0aGlzLmRhdGFMYXllci5wdXNoKGV2ZW50KTtcblx0fTtcblxuXHRsZXQgcHVzaERhdGFMYXllciA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcblx0XHRsZXQgZXZlbnQgPSB7XG5cdFx0XHRldmVudDogZXZlbnROYW1lLFxuXHRcdH07XG5cblx0XHRpZiAod2luZG93Ll9kYXRhTGF5ZXIpIHtcblx0XHRcdHdoaWxlICh3aW5kb3cuX2RhdGFMYXllci5sZW5ndGgpIHtcblx0XHRcdFx0bGV0IG9iaiA9IHdpbmRvdy5fZGF0YUxheWVyLnBvcCgpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG5cdFx0XHRcdFx0ZXZlbnRba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0d2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG5cdFx0d2luZG93LmRhdGFMYXllci5wdXNoKGV2ZW50KTtcblx0fTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0Ly8gVXBkYXRlIGFueSBzdGF0aWMgbGlua3MgdG8gdGhlIGN1cnJlbnQgbGFuZ3VhZ2UuXG5cdFx0Ly9sZXQgbGFuZyA9IGdldEN1cnJlbnRMYW5nKCk7XG5cdFx0Ly9pZiAobGFuZyAmJiBsYW5nICE9PSAnZW4nKSB7XG5cdFx0Ly9cdGFkZExhbmdUb0xpbmtzKGxhbmcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlYmF5LW1lbnVzJykpO1xuXHRcdC8vXHRhZGRMYW5nVG9MaW5rcyhsYW5nLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJykpO1xuXHRcdC8vfVxuXG5cdFx0aWYgKHdpbmRvdy50dXJib2xpbmtzTG9hZGVkKSB7XG5cdFx0XHQvLyBNYWtlIHN1cmUgd2Ugb25seSBmaXJlIG9uZSBldmVudCB0byBHVE0uXG5cdFx0XHQvLyBUaGUgbmF2aWdhdGlvbiBldmVudHMgZ2V0cyBoYW5kbGVkIGJ5IHR1cmJvOnJlbmRlclxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRvZ2dsZUJvb2xlYW5DbGFzcygndHVyYm8tbG9hZGVkJywgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0cnVlKTtcblxuXHRcdC8vIEluaXQgbGFuZ3VhZ2UgbGlua3MuXG5cdFx0Ly9sZXQgbGFuZ3VhZ2VTd2l0Y2hlclRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWdsb3RfaGVyZScpO1xuXG5cdFx0Ly9sZXQgbGFuZ3VhZ2VTd2l0Y2hlclRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhbmd1YWdlLXN3aXRjaGVyLXRlbXBsYXRlJyk7XG5cdFx0Ly9sZXQgbGFuZ3VhZ2VTd2l0Y2hlclNvdXJjZSA9IGRvY3VtZW50LmltcG9ydE5vZGUobGFuZ3VhZ2VTd2l0Y2hlclRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuXHRcdC8vbGFuZ3VhZ2VTd2l0Y2hlclRhcmdldC5yZXBsYWNlQ2hpbGRyZW4obGFuZ3VhZ2VTd2l0Y2hlclNvdXJjZSk7XG5cblx0XHR3aW5kb3cudHVyYm9saW5rc0xvYWRlZCA9IHRydWU7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRwdXNoRGF0YUxheWVyKCdkb2NzX2xvYWQnKTtcblx0XHR9LCAyMDAwKTtcblx0fSk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHVyYm86YmVmb3JlLXJlbmRlcicsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGxldCBib2R5ID0gZXZlbnQuZGV0YWlsLm5ld0JvZHk7XG5cblx0XHQvLyBUaGlzIGhpZGVzIHRoZSByZWxldmFudCBlbGVtZW50cyBmb3IgYSBzZWNvbmQgaWYgdGhlIHVzZXIgaGFzIHNlbGVjdGVkIGEgbGFuZ3VhZ2UgZGlmZmVyZW50IGZyb20gdGhlIGRlZmF1bHQgb25lLlxuXHRcdC8vIFRoaXMgc2hvdWxkIGF2b2lkIHRoZSBzdGF0aWMgYW5kIHVudHJhbnNsYXRlZCBjb250ZW50IHNob3dpbmcuXG5cdFx0c2V0SXNUcmFuc2xhdGluZyhib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oaWRlLW9uLWxhbmctbmF2JykpO1xuXHR9KTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpyZW5kZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS10dXJiby1wcmV2aWV3JykpIHtcblx0XHRcdC8vIFR1cmJvbGlua3MgaXMgZGlzcGxheWluZyBhIHByZXZpZXdcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRyZWxvYWRPVEJhbm5lcigpO1xuXG5cdFx0cHVzaERhdGFMYXllcignZG9jc19uYXZpZ2F0ZScpO1xuXHR9KTtcblxuXHQvLyBQcmVzZXJ2ZSBzY3JvbGwgcG9zaXRpb24gd2hlbiBuYXZpZ2F0aW5nIHdpdGggVHVyYm8gb24gYWxsIGVsZW1lbnRzIHdpdGggdGhlIGRhdGEtcHJlc2VydmUtc2Nyb2xsIGF0dHJpYnV0ZS5cblx0aWYgKCF3aW5kb3cuc2Nyb2xsUG9zaXRpb25zKSB7XG5cdFx0d2luZG93LnNjcm9sbFBvc2l0aW9ucyA9IHt9O1xuXHR9XG5cdGlmICghd2luZG93LnNjcm9sbEhhbmRsZWRCeUNsaWNrKSB7XG5cdFx0d2luZG93LnNjcm9sbEhhbmRsZWRCeUNsaWNrID0ge307XG5cdH1cblxuXHRmdW5jdGlvbiB0dXJib0NsaWNrKGUpIHtcblx0XHRpZiAoZS5kZXRhaWwudXJsLmluY2x1ZGVzKCcvZG9jcy9hcGknKSkge1xuXHRcdFx0Ly8gRGlzYWJsZSBUdXJibyBmb3IgdGhlIEFQSSBkb2NzIHRvIGFsbG93IGZvciBlZGdlIHJlZGlyZWN0cy5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVzZXJ2ZVNjcm9sbChlKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJlc2VydmUtc2Nyb2xsXScpLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgZXZlbnQncyB0YXJnZXQgaXMgYSBjaGlsZCBvZiB0aGUgZWxlbWVudC5cblx0XHRcdC8vIEZvciB0aGUgZXhwbG9yZXIgdXNlIGNhc2Ugd2Ugb25seSB3YW50IHRvIHRyYWNrIGNsaWNrcyBpbnNpZGUgdGhlIGV4cGxvcmVyLlxuXHRcdFx0bGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0bGV0IGlzQ2hpbGQgPSBmYWxzZTtcblx0XHRcdHdoaWxlICh0YXJnZXQpIHtcblx0XHRcdFx0aWYgKHRhcmdldCA9PT0gZWwpIHtcblx0XHRcdFx0XHRpc0NoaWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzQ2hpbGQpIHtcblx0XHRcdFx0c2Nyb2xsUG9zaXRpb25zW2VsLmlkXSA9IGVsLnNjcm9sbFRvcDtcblx0XHRcdFx0c2Nyb2xsSGFuZGxlZEJ5Q2xpY2tbZWwuaWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGwoZSkge1xuXHRcdGlmICghd2luZG93LnR1cmJvbGlua3NMb2FkZWQpIHtcblx0XHRcdC8vIFRoZSBzY3JvbGwgb24gdGhlIGZpcnN0IHBhZ2UgbG9hZCBpcyBoYW5kbGVkIGJ5IG90aGVycy5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgaXNGaW5hbFJlbmRlciA9IGUudHlwZSA9PT0gJ3R1cmJvOnJlbmRlcicgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHVyYm8tcHJldmlldycpO1xuXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJlc2VydmUtc2Nyb2xsXScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdGxldCBpZCA9IGVsZW1lbnQuaWQ7XG5cdFx0XHRsZXQgc2Nyb2xsUG9zID0gc2Nyb2xsUG9zaXRpb25zW2lkXTtcblx0XHRcdGlmICghc2Nyb2xsUG9zKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsUG9zO1xuXHRcdFx0aWYgKGlzRmluYWxSZW5kZXIpIHtcblx0XHRcdFx0ZGVsZXRlIHNjcm9sbFBvc2l0aW9uc1tpZF07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoIWUuZGV0YWlsIHx8ICFlLmRldGFpbC5uZXdCb2R5KSByZXR1cm47XG5cdFx0ZS5kZXRhaWwubmV3Qm9keS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmVzZXJ2ZS1zY3JvbGxdJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gZWxlbWVudC5pZDtcblx0XHRcdGVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsUG9zaXRpb25zW2lkXTtcblx0XHR9KTtcblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpjbGljaycsIHByZXNlcnZlU2Nyb2xsKTtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3R1cmJvOmNsaWNrJywgdHVyYm9DbGljayk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpiZWZvcmUtcmVuZGVyJywgcmVzdG9yZVNjcm9sbCk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0dXJibzpyZW5kZXInLCByZXN0b3JlU2Nyb2xsKTtcbn0pKCk7XG5cbi8vIFNlZSBodHRwczovL215Lm9uZXRydXN0LmNvbS9zL2FydGljbGUvVVVJRC02OTE2MmNiNy1jNGEyLWFjNzAtMzlhMS1jYTY5YzkzNDAwNDY/bGFuZ3VhZ2U9ZW5fVVMmdG9waWNJZD0wVE8xUTAwMDAwMHNzSkJXQVlcbmZ1bmN0aW9uIHJlbG9hZE9UQmFubmVyKCkge1xuXHR2YXIgb3RDb25zZW50U2RrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29uZXRydXN0LWNvbnNlbnQtc2RrJyk7XG5cdGlmIChvdENvbnNlbnRTZGspIHtcblx0XHRvdENvbnNlbnRTZGsucmVtb3ZlKCk7XG5cdH1cblxuXHRpZiAod2luZG93Lk9uZVRydXN0ICE9IG51bGwpIHtcblx0XHRPbmVUcnVzdC5Jbml0KCk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdE9uZVRydXN0LkxvYWRCYW5uZXIoKTtcblxuXHRcdFx0dmFyIHRvZ2dsZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvdC1zZGstc2hvdy1zZXR0aW5ncycpO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRvZ2dsZURpc3BsYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dG9nZ2xlRGlzcGxheVtpXS5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0d2luZG93Lk9uZVRydXN0LlRvZ2dsZUluZm9EaXNwbGF5KCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSwgMTAwMCk7XG5cdH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBa0JBLE9BQUUsU0FBVSxHQUFHLEdBQUc7QUFDakIsWUFBSSxPQUFPLFdBQVcsWUFBWSxPQUFPLFVBQVUsYUFBYTtBQUMvRCxZQUFFLE9BQU87QUFBQSxRQUNWLFdBQVcsT0FBTyxVQUFVLGNBQWMsT0FBTyxLQUFLO0FBQ3JELGlCQUFPLENBQUMsU0FBUyxHQUFHLENBQUM7QUFBQSxRQUN0QixPQUFPO0FBQ04sYUFBSSxJQUFJLEtBQUssTUFBTSxTQUFTLElBQUksRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFFO0FBQUEsUUFDcEQ7QUFBQSxNQUNELEVBQUcsU0FBTSxTQUFVQSxVQUFTO0FBQzNCLGNBQU0sUUFBUSxPQUFPLE9BQU87QUFDNUIsY0FBTSxRQUFRLE9BQU8sT0FBTztBQUFBLFFBRTVCLE1BQU1DLFFBQU87QUFBQSxVQUNaLFlBQVksT0FBTyxTQUFTO0FBQzNCLGdCQUFJLE9BQU8sVUFBVSxVQUFVO0FBRTlCLHdCQUFVO0FBQ1Ysc0JBQVE7QUFBQSxZQUNUO0FB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LFdBQU8saUJBQWlCLHVCQUF1QixhQUFhO0FBQzVELFdBQU8saUJBQWlCLGdCQUFnQixhQUFhO0FBQUEsRUFDdEQsR0FBRztBQUdILFdBQVMsaUJBQWlCO0FBQ3pCLFFBQUksZUFBZSxTQUFTLGVBQWUsc0JBQXNCO0FBQ2pFLFFBQUksY0FBYztBQUNqQixtQkFBYSxPQUFPO0FBQUEsSUFDckI7QUFFQSxRQUFJLE9BQU8sWUFBWSxNQUFNO0FBQzVCLGVBQVMsS0FBSztBQUVkLGlCQUFXLFdBQVk7QUFDdEIsaUJBQVMsV0FBVztBQUVwQixZQUFJLGdCQUFnQixTQUFTLHVCQUF1QixzQkFBc0I7QUFFMUUsaUJBQVMsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUs7QUFDOUMsd0JBQWMsQ0FBQyxFQUFFLFVBQVUsU0FBVSxPQUFPO0FBQzNDLGtCQUFNLHlCQUF5QjtBQUMvQixtQkFBTyxTQUFTLGtCQUFrQjtBQUFBLFVBQ25DO0FBQUEsUUFDRDtBQUFBLE1BQ0QsR0FBRyxHQUFJO0FBQUEsSUFDUjtBQUFBLEVBQ0Q7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAiTFJVTWFwIiwgImhpdCIsICJzcmNfZGVmYXVsdCIsICJBbHBpbmUiLCAiZXZhbHVhdGVMYXRlciIsICJjbGVhbnVwIiwgImV2YWx1YXRlIiwgIm9ic2VydmVyIiwgIm1vZHVsZV9kZWZhdWx0IiwgInNyY19kZWZhdWx0IiwgIkFscGluZSIsICJnZXQiLCAic2V0IiwgIm1vZHVsZV9kZWZhdWx0IiwgIkFscGluZSIsICJlbCIsICJjbG9uZSIsICJkZWJ1ZyIsICJkZWJ1ZyIsICJBbHBpbmUiLCAiZWZmZWN0IiwgImNsZWFudXAiLCAiZXZhbHVhdGVMYXRlciIsICJldmFsdWF0ZSIsICJtb250aCIsICJlbCIsICJwYWdlS2V5IiwgInByZWZpeCIsICJBbHBpbmUiLCAiZGVidWciLCAiQWxwaW5lIiwgImRlYnVnIiwgInNlYXJjaENvbmZpZyIsICJkZWJ1ZyIsICJzZWFyY2hDb25maWciLCAiZGVidWciLCAiaGl0IiwgInNlYXJjaENvbmZpZyIsICJuIiwgImRhdGEiLCAiY2IiLCAic2VsZiIsICJkZWJ1ZyIsICJ3ZWdsb3RfYXBpX2tleSIsICJzZWxmIiwgInByZWZpeCIsICJkZWJ1ZyIsICJkZWJ1Z0RldiIsICJzZWFyY2hDb25maWciLCAiQWxwaW5lIiwgInF1ZXJ5SGFuZGxlciIsICJzdG9yZSIsICJkYXRhIiwgImNyZWF0ZUV4cGxvcmVyTm9kZVJlcXVlc3QiLCAiaGl0IiwgInNlbGYiLCAiY2IiLCAiZXJyb3IiLCAicHJlZml4IiwgImRlYnVnIiwgInNlYXJjaENvbmZpZyIsICJxdWVyeUhhbmRsZXIiLCAiY2IiLCAiZGVidWciLCAiZGVidWciLCAic2VsZiIsICJ3ZWdsb3RfYXBpX2tleSIsICJkZWJ1ZyIsICJzZWxmIiwgIm9sIiwgImRlYnVnIiwgImRlYnVnIiwgInBhZ2VLZXkiLCAicGFnZSIsICJkYXRhIiwgImhhbmRsZXIiLCAicXVldWUiLCAiZGVidWciLCAic2VhcmNoQ29uZmlnIiwgInNlbGYiLCAicXVldWUiLCAiaGl0IiwgImltcG9ydF9scnUiLCAiZGVidWciLCAic2VhcmNoQ29uZmlnIiwgInF1ZXVlIiwgInNlYXJjaENvbmZpZyIsICJBbHBpbmUiLCAiZGVidWciLCAidXJsIiwgImN1cnJlbnRUYWJzU3RyaW5nIiwgImNiIiwgImRlYnVnIiwgImRlYnVnIiwgIngiLCAieSIsICJjbG9uZSIsICJkZWJ1ZyIsICJzZWFyY2hDb25maWciLCAiaXRlbXMiLCAicGFnZVNpemUiLCAiZGVidWciLCAic2VhcmNoQ29uZmlnIiwgInNlbGYiLCAiZGVidWciLCAiaGl0IiwgImtleSIsICJtb2R1bGVfZGVmYXVsdCJdCn0K
