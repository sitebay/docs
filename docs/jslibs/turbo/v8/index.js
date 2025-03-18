(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
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
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/polyfills/form-request-submit-polyfill.js
  (function(prototype) {
    if (typeof prototype.requestSubmit == "function") return;
    prototype.requestSubmit = function(submitter) {
      if (submitter) {
        validateSubmitter(submitter, this);
        submitter.click();
      } else {
        submitter = document.createElement("input");
        submitter.type = "submit";
        submitter.hidden = true;
        this.appendChild(submitter);
        submitter.click();
        this.removeChild(submitter);
      }
    };
    function validateSubmitter(submitter, form) {
      submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
      submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button");
      submitter.form == form || raise(DOMException, "The specified element is not owned by this form element", "NotFoundError");
    }
    function raise(errorConstructor, message, name) {
      throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ".", name);
    }
  })(HTMLFormElement.prototype);

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/polyfills/submit-event.js
  var submittersByForm = /* @__PURE__ */ new WeakMap();
  function findSubmitterFromClickTarget(target) {
    const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
    const candidate = element ? element.closest("input, button") : null;
    return (candidate == null ? void 0 : candidate.type) == "submit" ? candidate : null;
  }
  function clickCaptured(event) {
    const submitter = findSubmitterFromClickTarget(event.target);
    if (submitter && submitter.form) {
      submittersByForm.set(submitter.form, submitter);
    }
  }
  (function() {
    if ("submitter" in Event.prototype) return;
    let prototype = window.Event.prototype;
    if ("SubmitEvent" in window) {
      const prototypeOfSubmitEvent = window.SubmitEvent.prototype;
      if (/Apple Computer/.test(navigator.vendor) && !("submitter" in prototypeOfSubmitEvent)) {
        prototype = prototypeOfSubmitEvent;
      } else {
        return;
      }
    }
    addEventListener("click", clickCaptured, true);
    Object.defineProperty(prototype, "submitter", {
      get() {
        if (this.type == "submit" && this.target instanceof HTMLFormElement) {
          return submittersByForm.get(this.target);
        }
      }
    });
  })();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/elements/frame_element.js
  var FrameLoadingStyle = {
    eager: "eager",
    lazy: "lazy"
  };
  var _FrameElement = class _FrameElement extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "loaded", Promise.resolve());
      this.delegate = new _FrameElement.delegateConstructor(this);
    }
    static get observedAttributes() {
      return ["disabled", "loading", "src"];
    }
    connectedCallback() {
      this.delegate.connect();
    }
    disconnectedCallback() {
      this.delegate.disconnect();
    }
    reload() {
      return this.delegate.sourceURLReloaded();
    }
    attributeChangedCallback(name) {
      if (name == "loading") {
        this.delegate.loadingStyleChanged();
      } else if (name == "src") {
        this.delegate.sourceURLChanged();
      } else if (name == "disabled") {
        this.delegate.disabledChanged();
      }
    }
    /**
     * Gets the URL to lazily load source HTML from
     */
    get src() {
      return this.getAttribute("src");
    }
    /**
     * Sets the URL to lazily load source HTML from
     */
    set src(value) {
      if (value) {
        this.setAttribute("src", value);
      } else {
        this.removeAttribute("src");
      }
    }
    /**
     * Gets the refresh mode for the frame.
     */
    get refresh() {
      return this.getAttribute("refresh");
    }
    /**
     * Sets the refresh mode for the frame.
     */
    set refresh(value) {
      if (value) {
        this.setAttribute("refresh", value);
      } else {
        this.removeAttribute("refresh");
      }
    }
    /**
     * Determines if the element is loading
     */
    get loading() {
      return frameLoadingStyleFromString(this.getAttribute("loading") || "");
    }
    /**
     * Sets the value of if the element is loading
     */
    set loading(value) {
      if (value) {
        this.setAttribute("loading", value);
      } else {
        this.removeAttribute("loading");
      }
    }
    /**
     * Gets the disabled state of the frame.
     *
     * If disabled, no requests will be intercepted by the frame.
     */
    get disabled() {
      return this.hasAttribute("disabled");
    }
    /**
     * Sets the disabled state of the frame.
     *
     * If disabled, no requests will be intercepted by the frame.
     */
    set disabled(value) {
      if (value) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
    }
    /**
     * Gets the autoscroll state of the frame.
     *
     * If true, the frame will be scrolled into view automatically on update.
     */
    get autoscroll() {
      return this.hasAttribute("autoscroll");
    }
    /**
     * Sets the autoscroll state of the frame.
     *
     * If true, the frame will be scrolled into view automatically on update.
     */
    set autoscroll(value) {
      if (value) {
        this.setAttribute("autoscroll", "");
      } else {
        this.removeAttribute("autoscroll");
      }
    }
    /**
     * Determines if the element has finished loading
     */
    get complete() {
      return !this.delegate.isLoading;
    }
    /**
     * Gets the active state of the frame.
     *
     * If inactive, source changes will not be observed.
     */
    get isActive() {
      return this.ownerDocument === document && !this.isPreview;
    }
    /**
     * Sets the active state of the frame.
     *
     * If inactive, source changes will not be observed.
     */
    get isPreview() {
      var _a, _b;
      return (_b = (_a = this.ownerDocument) == null ? void 0 : _a.documentElement) == null ? void 0 : _b.hasAttribute("data-turbo-preview");
    }
  };
  __publicField(_FrameElement, "delegateConstructor");
  var FrameElement = _FrameElement;
  function frameLoadingStyleFromString(style) {
    switch (style.toLowerCase()) {
      case "lazy":
        return FrameLoadingStyle.lazy;
      default:
        return FrameLoadingStyle.eager;
    }
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/url.js
  function expandURL(locatable) {
    return new URL(locatable.toString(), document.baseURI);
  }
  function getAnchor(url) {
    let anchorMatch;
    if (url.hash) {
      return url.hash.slice(1);
    } else if (anchorMatch = url.href.match(/#(.*)$/)) {
      return anchorMatch[1];
    }
  }
  function getAction(form, submitter) {
    const action = (submitter == null ? void 0 : submitter.getAttribute("formaction")) || form.getAttribute("action") || form.action;
    return expandURL(action);
  }
  function getExtension(url) {
    return (getLastPathComponent(url).match(/\.[^.]*$/) || [])[0] || "";
  }
  function isHTML(url) {
    return !!getExtension(url).match(/^(?:|\.(?:htm|html|xhtml|php))$/);
  }
  function isPrefixedBy(baseURL, url) {
    const prefix = getPrefix(url);
    return baseURL.href === expandURL(prefix).href || baseURL.href.startsWith(prefix);
  }
  function locationIsVisitable(location2, rootLocation) {
    return isPrefixedBy(location2, rootLocation) && isHTML(location2);
  }
  function getRequestURL(url) {
    const anchor = getAnchor(url);
    return anchor != null ? url.href.slice(0, -(anchor.length + 1)) : url.href;
  }
  function toCacheKey(url) {
    return getRequestURL(url);
  }
  function urlsAreEqual(left, right) {
    return expandURL(left).href == expandURL(right).href;
  }
  function getPathComponents(url) {
    return url.pathname.split("/").slice(1);
  }
  function getLastPathComponent(url) {
    return getPathComponents(url).slice(-1)[0];
  }
  function getPrefix(url) {
    return addTrailingSlash(url.origin + url.pathname);
  }
  function addTrailingSlash(value) {
    return value.endsWith("/") ? value : value + "/";
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/http/fetch_response.js
  var FetchResponse = class {
    constructor(response) {
      this.response = response;
    }
    get succeeded() {
      return this.response.ok;
    }
    get failed() {
      return !this.succeeded;
    }
    get clientError() {
      return this.statusCode >= 400 && this.statusCode <= 499;
    }
    get serverError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
    get redirected() {
      return this.response.redirected;
    }
    get location() {
      return expandURL(this.response.url);
    }
    get isHTML() {
      return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/);
    }
    get statusCode() {
      return this.response.status;
    }
    get contentType() {
      return this.header("Content-Type");
    }
    get responseText() {
      return this.response.clone().text();
    }
    get responseHTML() {
      if (this.isHTML) {
        return this.response.clone().text();
      } else {
        return Promise.resolve(void 0);
      }
    }
    header(name) {
      return this.response.headers.get(name);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/util.js
  function activateScriptElement(element) {
    if (element.getAttribute("data-turbo-eval") == "false") {
      return element;
    } else {
      const createdScriptElement = document.createElement("script");
      const cspNonce = getMetaContent("csp-nonce");
      if (cspNonce) {
        createdScriptElement.nonce = cspNonce;
      }
      createdScriptElement.textContent = element.textContent;
      createdScriptElement.async = false;
      copyElementAttributes(createdScriptElement, element);
      return createdScriptElement;
    }
  }
  function copyElementAttributes(destinationElement, sourceElement) {
    for (const { name, value } of sourceElement.attributes) {
      destinationElement.setAttribute(name, value);
    }
  }
  function createDocumentFragment(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }
  function dispatch(eventName, { target, cancelable, detail } = {}) {
    const event = new CustomEvent(eventName, {
      cancelable,
      bubbles: true,
      composed: true,
      detail
    });
    if (target && target.isConnected) {
      target.dispatchEvent(event);
    } else {
      document.documentElement.dispatchEvent(event);
    }
    return event;
  }
  function nextRepaint() {
    if (document.visibilityState === "hidden") {
      return nextEventLoopTick();
    } else {
      return nextAnimationFrame();
    }
  }
  function nextAnimationFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  function nextEventLoopTick() {
    return new Promise((resolve) => setTimeout(() => resolve(), 0));
  }
  function nextMicrotask() {
    return Promise.resolve();
  }
  function parseHTMLDocument(html = "") {
    return new DOMParser().parseFromString(html, "text/html");
  }
  function unindent(strings, ...values) {
    const lines = interpolate(strings, values).replace(/^\n/, "").split("\n");
    const match = lines[0].match(/^\s+/);
    const indent = match ? match[0].length : 0;
    return lines.map((line) => line.slice(indent)).join("\n");
  }
  function interpolate(strings, values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] == void 0 ? "" : values[i];
      return result + string + value;
    }, "");
  }
  function uuid() {
    return Array.from({ length: 36 }).map((_, i) => {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        return "-";
      } else if (i == 14) {
        return "4";
      } else if (i == 19) {
        return (Math.floor(Math.random() * 4) + 8).toString(16);
      } else {
        return Math.floor(Math.random() * 15).toString(16);
      }
    }).join("");
  }
  function getAttribute(attributeName, ...elements) {
    for (const value of elements.map((element) => element == null ? void 0 : element.getAttribute(attributeName))) {
      if (typeof value == "string") return value;
    }
    return null;
  }
  function hasAttribute(attributeName, ...elements) {
    return elements.some((element) => element && element.hasAttribute(attributeName));
  }
  function markAsBusy(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.setAttribute("busy", "");
      }
      element.setAttribute("aria-busy", "true");
    }
  }
  function clearBusyState(...elements) {
    for (const element of elements) {
      if (element.localName == "turbo-frame") {
        element.removeAttribute("busy");
      }
      element.removeAttribute("aria-busy");
    }
  }
  function waitForLoad(element, timeoutInMilliseconds = 2e3) {
    return new Promise((resolve) => {
      const onComplete = () => {
        element.removeEventListener("error", onComplete);
        element.removeEventListener("load", onComplete);
        resolve();
      };
      element.addEventListener("load", onComplete, { once: true });
      element.addEventListener("error", onComplete, { once: true });
      setTimeout(resolve, timeoutInMilliseconds);
    });
  }
  function getHistoryMethodForAction(action) {
    switch (action) {
      case "replace":
        return history.replaceState;
      case "advance":
      case "restore":
        return history.pushState;
    }
  }
  function isAction(action) {
    return action == "advance" || action == "replace" || action == "restore";
  }
  function getVisitAction(...elements) {
    const action = getAttribute("data-turbo-action", ...elements);
    return isAction(action) ? action : null;
  }
  function getMetaElement(name) {
    return document.querySelector(`meta[name="${name}"]`);
  }
  function getMetaContent(name) {
    const element = getMetaElement(name);
    return element && element.content;
  }
  function setMetaContent(name, content) {
    let element = getMetaElement(name);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
    return element;
  }
  function findClosestRecursively(element, selector) {
    var _a;
    if (element instanceof Element) {
      return element.closest(selector) || findClosestRecursively(element.assignedSlot || ((_a = element.getRootNode()) == null ? void 0 : _a.host), selector);
    }
  }
  function elementIsFocusable(element) {
    const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])";
    return !!element && element.closest(inertDisabledOrHidden) == null && typeof element.focus == "function";
  }
  function queryAutofocusableElement(elementOrDocumentFragment) {
    return Array.from(elementOrDocumentFragment.querySelectorAll("[autofocus]")).find(elementIsFocusable);
  }
  async function around(callback, reader) {
    const before = reader();
    callback();
    await nextAnimationFrame();
    const after = reader();
    return [before, after];
  }
  function doesNotTargetIFrame(anchor) {
    if (anchor.hasAttribute("target")) {
      for (const element of document.getElementsByName(anchor.target)) {
        if (element instanceof HTMLIFrameElement) return false;
      }
    }
    return true;
  }
  function findLinkFromClickTarget(target) {
    return findClosestRecursively(target, "a[href]:not([target^=_]):not([download])");
  }
  function getLocationForLink(link) {
    return expandURL(link.getAttribute("href") || "");
  }
  function debounce(fn, delay) {
    let timeoutId = null;
    return (...args) => {
      const callback = () => fn.apply(this, args);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/limited_set.js
  var LimitedSet = class extends Set {
    constructor(maxSize) {
      super();
      this.maxSize = maxSize;
    }
    add(value) {
      if (this.size >= this.maxSize) {
        const iterator = this.values();
        const oldestValue = iterator.next().value;
        this.delete(oldestValue);
      }
      super.add(value);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/http/fetch.js
  var recentRequests = new LimitedSet(20);
  var nativeFetch = window.fetch;
  function fetchWithTurboHeaders(url, options = {}) {
    const modifiedHeaders = new Headers(options.headers || {});
    const requestUID = uuid();
    recentRequests.add(requestUID);
    modifiedHeaders.append("X-Turbo-Request-Id", requestUID);
    return nativeFetch(url, __spreadProps(__spreadValues({}, options), {
      headers: modifiedHeaders
    }));
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/http/fetch_request.js
  function fetchMethodFromString(method) {
    switch (method.toLowerCase()) {
      case "get":
        return FetchMethod.get;
      case "post":
        return FetchMethod.post;
      case "put":
        return FetchMethod.put;
      case "patch":
        return FetchMethod.patch;
      case "delete":
        return FetchMethod.delete;
    }
  }
  var FetchMethod = {
    get: "get",
    post: "post",
    put: "put",
    patch: "patch",
    delete: "delete"
  };
  function fetchEnctypeFromString(encoding) {
    switch (encoding.toLowerCase()) {
      case FetchEnctype.multipart:
        return FetchEnctype.multipart;
      case FetchEnctype.plain:
        return FetchEnctype.plain;
      default:
        return FetchEnctype.urlEncoded;
    }
  }
  var FetchEnctype = {
    urlEncoded: "application/x-www-form-urlencoded",
    multipart: "multipart/form-data",
    plain: "text/plain"
  };
  var _resolveRequestPromise, _FetchRequest_instances, allowRequestToBeIntercepted_fn, willDelegateErrorHandling_fn;
  var FetchRequest = class {
    constructor(delegate, method, location2, requestBody = new URLSearchParams(), target = null, enctype = FetchEnctype.urlEncoded) {
      __privateAdd(this, _FetchRequest_instances);
      __publicField(this, "abortController", new AbortController());
      __privateAdd(this, _resolveRequestPromise, (_value) => {
      });
      var _a;
      const [url, body] = buildResourceAndBody(expandURL(location2), method, requestBody, enctype);
      this.delegate = delegate;
      this.url = url;
      this.target = target;
      this.fetchOptions = {
        credentials: "same-origin",
        redirect: "follow",
        method,
        headers: __spreadValues({}, this.defaultHeaders),
        body,
        signal: this.abortSignal,
        referrer: (_a = this.delegate.referrer) == null ? void 0 : _a.href
      };
      this.enctype = enctype;
    }
    get method() {
      return this.fetchOptions.method;
    }
    set method(value) {
      const fetchBody = this.isSafe ? this.url.searchParams : this.fetchOptions.body || new FormData();
      const fetchMethod = fetchMethodFromString(value) || FetchMethod.get;
      this.url.search = "";
      const [url, body] = buildResourceAndBody(this.url, fetchMethod, fetchBody, this.enctype);
      this.url = url;
      this.fetchOptions.body = body;
      this.fetchOptions.method = fetchMethod;
    }
    get headers() {
      return this.fetchOptions.headers;
    }
    set headers(value) {
      this.fetchOptions.headers = value;
    }
    get body() {
      if (this.isSafe) {
        return this.url.searchParams;
      } else {
        return this.fetchOptions.body;
      }
    }
    set body(value) {
      this.fetchOptions.body = value;
    }
    get location() {
      return this.url;
    }
    get params() {
      return this.url.searchParams;
    }
    get entries() {
      return this.body ? Array.from(this.body.entries()) : [];
    }
    cancel() {
      this.abortController.abort();
    }
    async perform() {
      const { fetchOptions } = this;
      this.delegate.prepareRequest(this);
      const event = await __privateMethod(this, _FetchRequest_instances, allowRequestToBeIntercepted_fn).call(this, fetchOptions);
      try {
        this.delegate.requestStarted(this);
        if (event.detail.fetchRequest) {
          this.response = event.detail.fetchRequest.response;
        } else {
          this.response = fetchWithTurboHeaders(this.url.href, fetchOptions);
        }
        const response = await this.response;
        return await this.receive(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          if (__privateMethod(this, _FetchRequest_instances, willDelegateErrorHandling_fn).call(this, error)) {
            this.delegate.requestErrored(this, error);
          }
          throw error;
        }
      } finally {
        this.delegate.requestFinished(this);
      }
    }
    async receive(response) {
      const fetchResponse = new FetchResponse(response);
      const event = dispatch("turbo:before-fetch-response", {
        cancelable: true,
        detail: { fetchResponse },
        target: this.target
      });
      if (event.defaultPrevented) {
        this.delegate.requestPreventedHandlingResponse(this, fetchResponse);
      } else if (fetchResponse.succeeded) {
        this.delegate.requestSucceededWithResponse(this, fetchResponse);
      } else {
        this.delegate.requestFailedWithResponse(this, fetchResponse);
      }
      return fetchResponse;
    }
    get defaultHeaders() {
      return {
        Accept: "text/html, application/xhtml+xml"
      };
    }
    get isSafe() {
      return isSafe(this.method);
    }
    get abortSignal() {
      return this.abortController.signal;
    }
    acceptResponseType(mimeType) {
      this.headers["Accept"] = [mimeType, this.headers["Accept"]].join(", ");
    }
  };
  _resolveRequestPromise = new WeakMap();
  _FetchRequest_instances = new WeakSet();
  allowRequestToBeIntercepted_fn = async function(fetchOptions) {
    const requestInterception = new Promise((resolve) => __privateSet(this, _resolveRequestPromise, resolve));
    const event = dispatch("turbo:before-fetch-request", {
      cancelable: true,
      detail: {
        fetchOptions,
        url: this.url,
        resume: __privateGet(this, _resolveRequestPromise)
      },
      target: this.target
    });
    this.url = event.detail.url;
    if (event.defaultPrevented) await requestInterception;
    return event;
  };
  willDelegateErrorHandling_fn = function(error) {
    const event = dispatch("turbo:fetch-request-error", {
      target: this.target,
      cancelable: true,
      detail: { request: this, error }
    });
    return !event.defaultPrevented;
  };
  function isSafe(fetchMethod) {
    return fetchMethodFromString(fetchMethod) == FetchMethod.get;
  }
  function buildResourceAndBody(resource, method, requestBody, enctype) {
    const searchParams = Array.from(requestBody).length > 0 ? new URLSearchParams(entriesExcludingFiles(requestBody)) : resource.searchParams;
    if (isSafe(method)) {
      return [mergeIntoURLSearchParams(resource, searchParams), null];
    } else if (enctype == FetchEnctype.urlEncoded) {
      return [resource, searchParams];
    } else {
      return [resource, requestBody];
    }
  }
  function entriesExcludingFiles(requestBody) {
    const entries = [];
    for (const [name, value] of requestBody) {
      if (value instanceof File) continue;
      else entries.push([name, value]);
    }
    return entries;
  }
  function mergeIntoURLSearchParams(url, requestBody) {
    const searchParams = new URLSearchParams(entriesExcludingFiles(requestBody));
    url.search = searchParams.toString();
    return url;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/appearance_observer.js
  var AppearanceObserver = class {
    constructor(delegate, element) {
      __publicField(this, "started", false);
      __publicField(this, "intersect", (entries) => {
        const lastEntry = entries.slice(-1)[0];
        if (lastEntry == null ? void 0 : lastEntry.isIntersecting) {
          this.delegate.elementAppearedInViewport(this.element);
        }
      });
      this.delegate = delegate;
      this.element = element;
      this.intersectionObserver = new IntersectionObserver(this.intersect);
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.intersectionObserver.observe(this.element);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.intersectionObserver.unobserve(this.element);
      }
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/streams/stream_message.js
  var StreamMessage = class {
    static wrap(message) {
      if (typeof message == "string") {
        return new this(createDocumentFragment(message));
      } else {
        return message;
      }
    }
    constructor(fragment) {
      this.fragment = importStreamElements(fragment);
    }
  };
  __publicField(StreamMessage, "contentType", "text/vnd.turbo-stream.html");
  function importStreamElements(fragment) {
    for (const element of fragment.querySelectorAll("turbo-stream")) {
      const streamElement = document.importNode(element, true);
      for (const inertScriptElement of streamElement.templateElement.content.querySelectorAll("script")) {
        inertScriptElement.replaceWith(activateScriptElement(inertScriptElement));
      }
      element.replaceWith(streamElement);
    }
    return fragment;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/prefetch_cache.js
  var PREFETCH_DELAY = 100;
  var _prefetchTimeout, _prefetched;
  var PrefetchCache = class {
    constructor() {
      __privateAdd(this, _prefetchTimeout, null);
      __privateAdd(this, _prefetched, null);
    }
    get(url) {
      if (__privateGet(this, _prefetched) && __privateGet(this, _prefetched).url === url && __privateGet(this, _prefetched).expire > Date.now()) {
        return __privateGet(this, _prefetched).request;
      }
    }
    setLater(url, request, ttl) {
      this.clear();
      __privateSet(this, _prefetchTimeout, setTimeout(() => {
        request.perform();
        this.set(url, request, ttl);
        __privateSet(this, _prefetchTimeout, null);
      }, PREFETCH_DELAY));
    }
    set(url, request, ttl) {
      __privateSet(this, _prefetched, { url, request, expire: new Date((/* @__PURE__ */ new Date()).getTime() + ttl) });
    }
    clear() {
      if (__privateGet(this, _prefetchTimeout)) clearTimeout(__privateGet(this, _prefetchTimeout));
      __privateSet(this, _prefetched, null);
    }
  };
  _prefetchTimeout = new WeakMap();
  _prefetched = new WeakMap();
  var cacheTtl = 10 * 1e3;
  var prefetchCache = new PrefetchCache();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/form_submission.js
  var FormSubmissionState = {
    initialized: "initialized",
    requesting: "requesting",
    waiting: "waiting",
    receiving: "receiving",
    stopping: "stopping",
    stopped: "stopped"
  };
  var FormSubmission = class _FormSubmission {
    constructor(delegate, formElement, submitter, mustRedirect = false) {
      __publicField(this, "state", FormSubmissionState.initialized);
      const method = getMethod(formElement, submitter);
      const action = getAction2(getFormAction(formElement, submitter), method);
      const body = buildFormData(formElement, submitter);
      const enctype = getEnctype(formElement, submitter);
      this.delegate = delegate;
      this.formElement = formElement;
      this.submitter = submitter;
      this.fetchRequest = new FetchRequest(this, method, action, body, formElement, enctype);
      this.mustRedirect = mustRedirect;
    }
    static confirmMethod(message, _element, _submitter) {
      return Promise.resolve(confirm(message));
    }
    get method() {
      return this.fetchRequest.method;
    }
    set method(value) {
      this.fetchRequest.method = value;
    }
    get action() {
      return this.fetchRequest.url.toString();
    }
    set action(value) {
      this.fetchRequest.url = expandURL(value);
    }
    get body() {
      return this.fetchRequest.body;
    }
    get enctype() {
      return this.fetchRequest.enctype;
    }
    get isSafe() {
      return this.fetchRequest.isSafe;
    }
    get location() {
      return this.fetchRequest.url;
    }
    // The submission process
    async start() {
      const { initialized, requesting } = FormSubmissionState;
      const confirmationMessage = getAttribute("data-turbo-confirm", this.submitter, this.formElement);
      if (typeof confirmationMessage === "string") {
        const answer = await _FormSubmission.confirmMethod(confirmationMessage, this.formElement, this.submitter);
        if (!answer) {
          return;
        }
      }
      if (this.state == initialized) {
        this.state = requesting;
        return this.fetchRequest.perform();
      }
    }
    stop() {
      const { stopping, stopped } = FormSubmissionState;
      if (this.state != stopping && this.state != stopped) {
        this.state = stopping;
        this.fetchRequest.cancel();
        return true;
      }
    }
    // Fetch request delegate
    prepareRequest(request) {
      if (!request.isSafe) {
        const token = getCookieValue(getMetaContent("csrf-param")) || getMetaContent("csrf-token");
        if (token) {
          request.headers["X-CSRF-Token"] = token;
        }
      }
      if (this.requestAcceptsTurboStreamResponse(request)) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }
    requestStarted(_request) {
      var _a;
      this.state = FormSubmissionState.waiting;
      (_a = this.submitter) == null ? void 0 : _a.setAttribute("disabled", "");
      this.setSubmitsWith();
      markAsBusy(this.formElement);
      dispatch("turbo:submit-start", {
        target: this.formElement,
        detail: { formSubmission: this }
      });
      this.delegate.formSubmissionStarted(this);
    }
    requestPreventedHandlingResponse(request, response) {
      prefetchCache.clear();
      this.result = { success: response.succeeded, fetchResponse: response };
    }
    requestSucceededWithResponse(request, response) {
      if (response.clientError || response.serverError) {
        this.delegate.formSubmissionFailedWithResponse(this, response);
        return;
      }
      prefetchCache.clear();
      if (this.requestMustRedirect(request) && responseSucceededWithoutRedirect(response)) {
        const error = new Error("Form responses must redirect to another location");
        this.delegate.formSubmissionErrored(this, error);
      } else {
        this.state = FormSubmissionState.receiving;
        this.result = { success: true, fetchResponse: response };
        this.delegate.formSubmissionSucceededWithResponse(this, response);
      }
    }
    requestFailedWithResponse(request, response) {
      this.result = { success: false, fetchResponse: response };
      this.delegate.formSubmissionFailedWithResponse(this, response);
    }
    requestErrored(request, error) {
      this.result = { success: false, error };
      this.delegate.formSubmissionErrored(this, error);
    }
    requestFinished(_request) {
      var _a;
      this.state = FormSubmissionState.stopped;
      (_a = this.submitter) == null ? void 0 : _a.removeAttribute("disabled");
      this.resetSubmitterText();
      clearBusyState(this.formElement);
      dispatch("turbo:submit-end", {
        target: this.formElement,
        detail: __spreadValues({ formSubmission: this }, this.result)
      });
      this.delegate.formSubmissionFinished(this);
    }
    // Private
    setSubmitsWith() {
      if (!this.submitter || !this.submitsWith) return;
      if (this.submitter.matches("button")) {
        this.originalSubmitText = this.submitter.innerHTML;
        this.submitter.innerHTML = this.submitsWith;
      } else if (this.submitter.matches("input")) {
        const input = this.submitter;
        this.originalSubmitText = input.value;
        input.value = this.submitsWith;
      }
    }
    resetSubmitterText() {
      if (!this.submitter || !this.originalSubmitText) return;
      if (this.submitter.matches("button")) {
        this.submitter.innerHTML = this.originalSubmitText;
      } else if (this.submitter.matches("input")) {
        const input = this.submitter;
        input.value = this.originalSubmitText;
      }
    }
    requestMustRedirect(request) {
      return !request.isSafe && this.mustRedirect;
    }
    requestAcceptsTurboStreamResponse(request) {
      return !request.isSafe || hasAttribute("data-turbo-stream", this.submitter, this.formElement);
    }
    get submitsWith() {
      var _a;
      return (_a = this.submitter) == null ? void 0 : _a.getAttribute("data-turbo-submits-with");
    }
  };
  function buildFormData(formElement, submitter) {
    const formData = new FormData(formElement);
    const name = submitter == null ? void 0 : submitter.getAttribute("name");
    const value = submitter == null ? void 0 : submitter.getAttribute("value");
    if (name) {
      formData.append(name, value || "");
    }
    return formData;
  }
  function getCookieValue(cookieName) {
    if (cookieName != null) {
      const cookies = document.cookie ? document.cookie.split("; ") : [];
      const cookie = cookies.find((cookie2) => cookie2.startsWith(cookieName));
      if (cookie) {
        const value = cookie.split("=").slice(1).join("=");
        return value ? decodeURIComponent(value) : void 0;
      }
    }
  }
  function responseSucceededWithoutRedirect(response) {
    return response.statusCode == 200 && !response.redirected;
  }
  function getFormAction(formElement, submitter) {
    const formElementAction = typeof formElement.action === "string" ? formElement.action : null;
    if (submitter == null ? void 0 : submitter.hasAttribute("formaction")) {
      return submitter.getAttribute("formaction") || "";
    } else {
      return formElement.getAttribute("action") || formElementAction || "";
    }
  }
  function getAction2(formAction, fetchMethod) {
    const action = expandURL(formAction);
    if (isSafe(fetchMethod)) {
      action.search = "";
    }
    return action;
  }
  function getMethod(formElement, submitter) {
    const method = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || formElement.getAttribute("method") || "";
    return fetchMethodFromString(method.toLowerCase()) || FetchMethod.get;
  }
  function getEnctype(formElement, submitter) {
    return fetchEnctypeFromString((submitter == null ? void 0 : submitter.getAttribute("formenctype")) || formElement.enctype);
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/snapshot.js
  var Snapshot = class {
    constructor(element) {
      this.element = element;
    }
    get activeElement() {
      return this.element.ownerDocument.activeElement;
    }
    get children() {
      return [...this.element.children];
    }
    hasAnchor(anchor) {
      return this.getElementForAnchor(anchor) != null;
    }
    getElementForAnchor(anchor) {
      return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null;
    }
    get isConnected() {
      return this.element.isConnected;
    }
    get firstAutofocusableElement() {
      return queryAutofocusableElement(this.element);
    }
    get permanentElements() {
      return queryPermanentElementsAll(this.element);
    }
    getPermanentElementById(id) {
      return getPermanentElementById(this.element, id);
    }
    getPermanentElementMapForSnapshot(snapshot) {
      const permanentElementMap = {};
      for (const currentPermanentElement of this.permanentElements) {
        const { id } = currentPermanentElement;
        const newPermanentElement = snapshot.getPermanentElementById(id);
        if (newPermanentElement) {
          permanentElementMap[id] = [currentPermanentElement, newPermanentElement];
        }
      }
      return permanentElementMap;
    }
  };
  function getPermanentElementById(node, id) {
    return node.querySelector(`#${id}[data-turbo-permanent]`);
  }
  function queryPermanentElementsAll(node) {
    return node.querySelectorAll("[id][data-turbo-permanent]");
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/form_submit_observer.js
  var FormSubmitObserver = class {
    constructor(delegate, eventTarget) {
      __publicField(this, "started", false);
      __publicField(this, "submitCaptured", () => {
        this.eventTarget.removeEventListener("submit", this.submitBubbled, false);
        this.eventTarget.addEventListener("submit", this.submitBubbled, false);
      });
      __publicField(this, "submitBubbled", (event) => {
        if (!event.defaultPrevented) {
          const form = event.target instanceof HTMLFormElement ? event.target : void 0;
          const submitter = event.submitter || void 0;
          if (form && submissionDoesNotDismissDialog(form, submitter) && submissionDoesNotTargetIFrame(form, submitter) && this.delegate.willSubmitForm(form, submitter)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.delegate.formSubmitted(form, submitter);
          }
        }
      });
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    start() {
      if (!this.started) {
        this.eventTarget.addEventListener("submit", this.submitCaptured, true);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.eventTarget.removeEventListener("submit", this.submitCaptured, true);
        this.started = false;
      }
    }
  };
  function submissionDoesNotDismissDialog(form, submitter) {
    const method = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || form.getAttribute("method");
    return method != "dialog";
  }
  function submissionDoesNotTargetIFrame(form, submitter) {
    if ((submitter == null ? void 0 : submitter.hasAttribute("formtarget")) || form.hasAttribute("target")) {
      const target = (submitter == null ? void 0 : submitter.getAttribute("formtarget")) || form.target;
      for (const element of document.getElementsByName(target)) {
        if (element instanceof HTMLIFrameElement) return false;
      }
      return true;
    } else {
      return true;
    }
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/view.js
  var _resolveRenderPromise, _resolveInterceptionPromise;
  var View = class {
    constructor(delegate, element) {
      __privateAdd(this, _resolveRenderPromise, (_value) => {
      });
      __privateAdd(this, _resolveInterceptionPromise, (_value) => {
      });
      this.delegate = delegate;
      this.element = element;
    }
    // Scrolling
    scrollToAnchor(anchor) {
      const element = this.snapshot.getElementForAnchor(anchor);
      if (element) {
        this.scrollToElement(element);
        this.focusElement(element);
      } else {
        this.scrollToPosition({ x: 0, y: 0 });
      }
    }
    scrollToAnchorFromLocation(location2) {
      this.scrollToAnchor(getAnchor(location2));
    }
    scrollToElement(element) {
      element.scrollIntoView();
    }
    focusElement(element) {
      if (element instanceof HTMLElement) {
        if (element.hasAttribute("tabindex")) {
          element.focus();
        } else {
          element.setAttribute("tabindex", "-1");
          element.focus();
          element.removeAttribute("tabindex");
        }
      }
    }
    scrollToPosition({ x, y }) {
      this.scrollRoot.scrollTo(x, y);
    }
    scrollToTop() {
      this.scrollToPosition({ x: 0, y: 0 });
    }
    get scrollRoot() {
      return window;
    }
    // Rendering
    async render(renderer) {
      const { isPreview, shouldRender, willRender, newSnapshot: snapshot } = renderer;
      const shouldInvalidate = willRender;
      if (shouldRender) {
        try {
          this.renderPromise = new Promise((resolve) => __privateSet(this, _resolveRenderPromise, resolve));
          this.renderer = renderer;
          await this.prepareToRenderSnapshot(renderer);
          const renderInterception = new Promise((resolve) => __privateSet(this, _resolveInterceptionPromise, resolve));
          const options = { resume: __privateGet(this, _resolveInterceptionPromise), render: this.renderer.renderElement, renderMethod: this.renderer.renderMethod };
          const immediateRender = this.delegate.allowsImmediateRender(snapshot, options);
          if (!immediateRender) await renderInterception;
          await this.renderSnapshot(renderer);
          this.delegate.viewRenderedSnapshot(snapshot, isPreview, this.renderer.renderMethod);
          this.delegate.preloadOnLoadLinksForView(this.element);
          this.finishRenderingSnapshot(renderer);
        } finally {
          delete this.renderer;
          __privateGet(this, _resolveRenderPromise).call(this, void 0);
          delete this.renderPromise;
        }
      } else if (shouldInvalidate) {
        this.invalidate(renderer.reloadReason);
      }
    }
    invalidate(reason) {
      this.delegate.viewInvalidated(reason);
    }
    async prepareToRenderSnapshot(renderer) {
      this.markAsPreview(renderer.isPreview);
      await renderer.prepareToRender();
    }
    markAsPreview(isPreview) {
      if (isPreview) {
        this.element.setAttribute("data-turbo-preview", "");
      } else {
        this.element.removeAttribute("data-turbo-preview");
      }
    }
    markVisitDirection(direction) {
      this.element.setAttribute("data-turbo-visit-direction", direction);
    }
    unmarkVisitDirection() {
      this.element.removeAttribute("data-turbo-visit-direction");
    }
    async renderSnapshot(renderer) {
      await renderer.render();
    }
    finishRenderingSnapshot(renderer) {
      renderer.finishRendering();
    }
  };
  _resolveRenderPromise = new WeakMap();
  _resolveInterceptionPromise = new WeakMap();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/frames/frame_view.js
  var FrameView = class extends View {
    missing() {
      this.element.innerHTML = `<strong class="turbo-frame-error">Content missing</strong>`;
    }
    get snapshot() {
      return new Snapshot(this.element);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/frames/link_interceptor.js
  var LinkInterceptor = class {
    constructor(delegate, element) {
      __publicField(this, "clickBubbled", (event) => {
        if (this.respondsToEventTarget(event.target)) {
          this.clickEvent = event;
        } else {
          delete this.clickEvent;
        }
      });
      __publicField(this, "linkClicked", (event) => {
        if (this.clickEvent && this.respondsToEventTarget(event.target) && event.target instanceof Element) {
          if (this.delegate.shouldInterceptLinkClick(event.target, event.detail.url, event.detail.originalEvent)) {
            this.clickEvent.preventDefault();
            event.preventDefault();
            this.delegate.linkClickIntercepted(event.target, event.detail.url, event.detail.originalEvent);
          }
        }
        delete this.clickEvent;
      });
      __publicField(this, "willVisit", (_event) => {
        delete this.clickEvent;
      });
      this.delegate = delegate;
      this.element = element;
    }
    start() {
      this.element.addEventListener("click", this.clickBubbled);
      document.addEventListener("turbo:click", this.linkClicked);
      document.addEventListener("turbo:before-visit", this.willVisit);
    }
    stop() {
      this.element.removeEventListener("click", this.clickBubbled);
      document.removeEventListener("turbo:click", this.linkClicked);
      document.removeEventListener("turbo:before-visit", this.willVisit);
    }
    respondsToEventTarget(target) {
      const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
      return element && element.closest("turbo-frame, html") == this.element;
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/link_click_observer.js
  var LinkClickObserver = class {
    constructor(delegate, eventTarget) {
      __publicField(this, "started", false);
      __publicField(this, "clickCaptured", () => {
        this.eventTarget.removeEventListener("click", this.clickBubbled, false);
        this.eventTarget.addEventListener("click", this.clickBubbled, false);
      });
      __publicField(this, "clickBubbled", (event) => {
        if (event instanceof MouseEvent && this.clickEventIsSignificant(event)) {
          const target = event.composedPath && event.composedPath()[0] || event.target;
          const link = findLinkFromClickTarget(target);
          if (link && doesNotTargetIFrame(link)) {
            const location2 = getLocationForLink(link);
            if (this.delegate.willFollowLinkToLocation(link, location2, event)) {
              event.preventDefault();
              this.delegate.followedLinkToLocation(link, location2);
            }
          }
        }
      });
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    start() {
      if (!this.started) {
        this.eventTarget.addEventListener("click", this.clickCaptured, true);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.eventTarget.removeEventListener("click", this.clickCaptured, true);
        this.started = false;
      }
    }
    clickEventIsSignificant(event) {
      return !(event.target && event.target.isContentEditable || event.defaultPrevented || event.which > 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/form_link_click_observer.js
  var FormLinkClickObserver = class {
    constructor(delegate, element) {
      this.delegate = delegate;
      this.linkInterceptor = new LinkClickObserver(this, element);
    }
    start() {
      this.linkInterceptor.start();
    }
    stop() {
      this.linkInterceptor.stop();
    }
    // Link hover observer delegate
    canPrefetchRequestToLocation(link, location2) {
      return false;
    }
    prefetchAndCacheRequestToLocation(link, location2) {
      return;
    }
    // Link click observer delegate
    willFollowLinkToLocation(link, location2, originalEvent) {
      return this.delegate.willSubmitFormLinkToLocation(link, location2, originalEvent) && (link.hasAttribute("data-turbo-method") || link.hasAttribute("data-turbo-stream"));
    }
    followedLinkToLocation(link, location2) {
      const form = document.createElement("form");
      const type = "hidden";
      for (const [name, value] of location2.searchParams) {
        form.append(Object.assign(document.createElement("input"), { type, name, value }));
      }
      const action = Object.assign(location2, { search: "" });
      form.setAttribute("data-turbo", "true");
      form.setAttribute("action", action.href);
      form.setAttribute("hidden", "");
      const method = link.getAttribute("data-turbo-method");
      if (method) form.setAttribute("method", method);
      const turboFrame = link.getAttribute("data-turbo-frame");
      if (turboFrame) form.setAttribute("data-turbo-frame", turboFrame);
      const turboAction = getVisitAction(link);
      if (turboAction) form.setAttribute("data-turbo-action", turboAction);
      const turboConfirm = link.getAttribute("data-turbo-confirm");
      if (turboConfirm) form.setAttribute("data-turbo-confirm", turboConfirm);
      const turboStream = link.hasAttribute("data-turbo-stream");
      if (turboStream) form.setAttribute("data-turbo-stream", "");
      this.delegate.submittedFormLinkToLocation(link, location2, form);
      document.body.appendChild(form);
      form.addEventListener("turbo:submit-end", () => form.remove(), { once: true });
      requestAnimationFrame(() => form.requestSubmit());
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/bardo.js
  var Bardo = class {
    static async preservingPermanentElements(delegate, permanentElementMap, callback) {
      const bardo = new this(delegate, permanentElementMap);
      bardo.enter();
      await callback();
      bardo.leave();
    }
    constructor(delegate, permanentElementMap) {
      this.delegate = delegate;
      this.permanentElementMap = permanentElementMap;
    }
    enter() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement, newPermanentElement] = this.permanentElementMap[id];
        this.delegate.enteringBardo(currentPermanentElement, newPermanentElement);
        this.replaceNewPermanentElementWithPlaceholder(newPermanentElement);
      }
    }
    leave() {
      for (const id in this.permanentElementMap) {
        const [currentPermanentElement] = this.permanentElementMap[id];
        this.replaceCurrentPermanentElementWithClone(currentPermanentElement);
        this.replacePlaceholderWithPermanentElement(currentPermanentElement);
        this.delegate.leavingBardo(currentPermanentElement);
      }
    }
    replaceNewPermanentElementWithPlaceholder(permanentElement) {
      const placeholder = createPlaceholderForPermanentElement(permanentElement);
      permanentElement.replaceWith(placeholder);
    }
    replaceCurrentPermanentElementWithClone(permanentElement) {
      const clone = permanentElement.cloneNode(true);
      permanentElement.replaceWith(clone);
    }
    replacePlaceholderWithPermanentElement(permanentElement) {
      const placeholder = this.getPlaceholderById(permanentElement.id);
      placeholder == null ? void 0 : placeholder.replaceWith(permanentElement);
    }
    getPlaceholderById(id) {
      return this.placeholders.find((element) => element.content == id);
    }
    get placeholders() {
      return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")];
    }
  };
  function createPlaceholderForPermanentElement(permanentElement) {
    const element = document.createElement("meta");
    element.setAttribute("name", "turbo-permanent-placeholder");
    element.setAttribute("content", permanentElement.id);
    return element;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/renderer.js
  var _activeElement;
  var Renderer = class {
    constructor(currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
      __privateAdd(this, _activeElement, null);
      this.currentSnapshot = currentSnapshot;
      this.newSnapshot = newSnapshot;
      this.isPreview = isPreview;
      this.willRender = willRender;
      this.renderElement = renderElement;
      this.promise = new Promise((resolve, reject) => this.resolvingFunctions = { resolve, reject });
    }
    get shouldRender() {
      return true;
    }
    get reloadReason() {
      return;
    }
    prepareToRender() {
      return;
    }
    render() {
    }
    finishRendering() {
      if (this.resolvingFunctions) {
        this.resolvingFunctions.resolve();
        delete this.resolvingFunctions;
      }
    }
    async preservingPermanentElements(callback) {
      await Bardo.preservingPermanentElements(this, this.permanentElementMap, callback);
    }
    focusFirstAutofocusableElement() {
      const element = this.connectedSnapshot.firstAutofocusableElement;
      if (element) {
        element.focus();
      }
    }
    // Bardo delegate
    enteringBardo(currentPermanentElement) {
      if (__privateGet(this, _activeElement)) return;
      if (currentPermanentElement.contains(this.currentSnapshot.activeElement)) {
        __privateSet(this, _activeElement, this.currentSnapshot.activeElement);
      }
    }
    leavingBardo(currentPermanentElement) {
      if (currentPermanentElement.contains(__privateGet(this, _activeElement)) && __privateGet(this, _activeElement) instanceof HTMLElement) {
        __privateGet(this, _activeElement).focus();
        __privateSet(this, _activeElement, null);
      }
    }
    get connectedSnapshot() {
      return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot;
    }
    get currentElement() {
      return this.currentSnapshot.element;
    }
    get newElement() {
      return this.newSnapshot.element;
    }
    get permanentElementMap() {
      return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot);
    }
    get renderMethod() {
      return "replace";
    }
  };
  _activeElement = new WeakMap();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/frames/frame_renderer.js
  var FrameRenderer = class extends Renderer {
    static renderElement(currentElement, newElement) {
      var _a;
      const destinationRange = document.createRange();
      destinationRange.selectNodeContents(currentElement);
      destinationRange.deleteContents();
      const frameElement = newElement;
      const sourceRange = (_a = frameElement.ownerDocument) == null ? void 0 : _a.createRange();
      if (sourceRange) {
        sourceRange.selectNodeContents(frameElement);
        currentElement.appendChild(sourceRange.extractContents());
      }
    }
    constructor(delegate, currentSnapshot, newSnapshot, renderElement, isPreview, willRender = true) {
      super(currentSnapshot, newSnapshot, renderElement, isPreview, willRender);
      this.delegate = delegate;
    }
    get shouldRender() {
      return true;
    }
    async render() {
      await nextRepaint();
      this.preservingPermanentElements(() => {
        this.loadFrameElement();
      });
      this.scrollFrameIntoView();
      await nextRepaint();
      this.focusFirstAutofocusableElement();
      await nextRepaint();
      this.activateScriptElements();
    }
    loadFrameElement() {
      this.delegate.willRenderFrame(this.currentElement, this.newElement);
      this.renderElement(this.currentElement, this.newElement);
    }
    scrollFrameIntoView() {
      if (this.currentElement.autoscroll || this.newElement.autoscroll) {
        const element = this.currentElement.firstElementChild;
        const block = readScrollLogicalPosition(this.currentElement.getAttribute("data-autoscroll-block"), "end");
        const behavior = readScrollBehavior(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
        if (element) {
          element.scrollIntoView({ block, behavior });
          return true;
        }
      }
      return false;
    }
    activateScriptElements() {
      for (const inertScriptElement of this.newScriptElements) {
        const activatedScriptElement = activateScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }
    get newScriptElements() {
      return this.currentElement.querySelectorAll("script");
    }
  };
  function readScrollLogicalPosition(value, defaultValue) {
    if (value == "end" || value == "start" || value == "center" || value == "nearest") {
      return value;
    } else {
      return defaultValue;
    }
  }
  function readScrollBehavior(value, defaultValue) {
    if (value == "auto" || value == "smooth") {
      return value;
    } else {
      return defaultValue;
    }
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/index.js
  var core_exports = {};
  __export(core_exports, {
    FrameRenderer: () => FrameRenderer,
    PageRenderer: () => PageRenderer,
    PageSnapshot: () => PageSnapshot,
    cache: () => cache,
    clearCache: () => clearCache,
    connectStreamSource: () => connectStreamSource,
    disconnectStreamSource: () => disconnectStreamSource,
    fetch: () => fetchWithTurboHeaders,
    navigator: () => navigator2,
    registerAdapter: () => registerAdapter,
    renderStreamMessage: () => renderStreamMessage,
    session: () => session,
    setConfirmMethod: () => setConfirmMethod,
    setFormMode: () => setFormMode,
    setProgressBarDelay: () => setProgressBarDelay,
    start: () => start,
    visit: () => visit
  });

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/progress_bar.js
  var _ProgressBar = class _ProgressBar {
    constructor() {
      __publicField(this, "hiding", false);
      __publicField(this, "value", 0);
      __publicField(this, "visible", false);
      __publicField(this, "trickle", () => {
        this.setValue(this.value + Math.random() / 100);
      });
      this.stylesheetElement = this.createStylesheetElement();
      this.progressElement = this.createProgressElement();
      this.installStylesheetElement();
      this.setValue(0);
    }
    /*ms*/
    static get defaultCSS() {
      return unindent`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${_ProgressBar.animationDuration}ms ease-out,
          opacity ${_ProgressBar.animationDuration / 2}ms ${_ProgressBar.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `;
    }
    show() {
      if (!this.visible) {
        this.visible = true;
        this.installProgressElement();
        this.startTrickling();
      }
    }
    hide() {
      if (this.visible && !this.hiding) {
        this.hiding = true;
        this.fadeProgressElement(() => {
          this.uninstallProgressElement();
          this.stopTrickling();
          this.visible = false;
          this.hiding = false;
        });
      }
    }
    setValue(value) {
      this.value = value;
      this.refresh();
    }
    // Private
    installStylesheetElement() {
      document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
    }
    installProgressElement() {
      this.progressElement.style.width = "0";
      this.progressElement.style.opacity = "1";
      document.documentElement.insertBefore(this.progressElement, document.body);
      this.refresh();
    }
    fadeProgressElement(callback) {
      this.progressElement.style.opacity = "0";
      setTimeout(callback, _ProgressBar.animationDuration * 1.5);
    }
    uninstallProgressElement() {
      if (this.progressElement.parentNode) {
        document.documentElement.removeChild(this.progressElement);
      }
    }
    startTrickling() {
      if (!this.trickleInterval) {
        this.trickleInterval = window.setInterval(this.trickle, _ProgressBar.animationDuration);
      }
    }
    stopTrickling() {
      window.clearInterval(this.trickleInterval);
      delete this.trickleInterval;
    }
    refresh() {
      requestAnimationFrame(() => {
        this.progressElement.style.width = `${10 + this.value * 90}%`;
      });
    }
    createStylesheetElement() {
      const element = document.createElement("style");
      element.type = "text/css";
      element.textContent = _ProgressBar.defaultCSS;
      if (this.cspNonce) {
        element.nonce = this.cspNonce;
      }
      return element;
    }
    createProgressElement() {
      const element = document.createElement("div");
      element.className = "turbo-progress-bar";
      return element;
    }
    get cspNonce() {
      return getMetaContent("csp-nonce");
    }
  };
  __publicField(_ProgressBar, "animationDuration", 300);
  var ProgressBar = _ProgressBar;

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/head_snapshot.js
  var HeadSnapshot = class extends Snapshot {
    constructor() {
      super(...arguments);
      __publicField(this, "detailsByOuterHTML", this.children.filter((element) => !elementIsNoscript(element)).map((element) => elementWithoutNonce(element)).reduce((result, element) => {
        const { outerHTML } = element;
        const details = outerHTML in result ? result[outerHTML] : {
          type: elementType(element),
          tracked: elementIsTracked(element),
          elements: []
        };
        return __spreadProps(__spreadValues({}, result), {
          [outerHTML]: __spreadProps(__spreadValues({}, details), {
            elements: [...details.elements, element]
          })
        });
      }, {}));
    }
    get trackedElementSignature() {
      return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => this.detailsByOuterHTML[outerHTML].tracked).join("");
    }
    getScriptElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("script", snapshot);
    }
    getStylesheetElementsNotInSnapshot(snapshot) {
      return this.getElementsMatchingTypeNotInSnapshot("stylesheet", snapshot);
    }
    getElementsMatchingTypeNotInSnapshot(matchedType, snapshot) {
      return Object.keys(this.detailsByOuterHTML).filter((outerHTML) => !(outerHTML in snapshot.detailsByOuterHTML)).map((outerHTML) => this.detailsByOuterHTML[outerHTML]).filter(({ type }) => type == matchedType).map(({ elements: [element] }) => element);
    }
    get provisionalElements() {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const { type, tracked, elements } = this.detailsByOuterHTML[outerHTML];
        if (type == null && !tracked) {
          return [...result, ...elements];
        } else if (elements.length > 1) {
          return [...result, ...elements.slice(1)];
        } else {
          return result;
        }
      }, []);
    }
    getMetaValue(name) {
      const element = this.findMetaElementByName(name);
      return element ? element.getAttribute("content") : null;
    }
    findMetaElementByName(name) {
      return Object.keys(this.detailsByOuterHTML).reduce((result, outerHTML) => {
        const {
          elements: [element]
        } = this.detailsByOuterHTML[outerHTML];
        return elementIsMetaElementWithName(element, name) ? element : result;
      }, void 0 | void 0);
    }
  };
  function elementType(element) {
    if (elementIsScript(element)) {
      return "script";
    } else if (elementIsStylesheet(element)) {
      return "stylesheet";
    }
  }
  function elementIsTracked(element) {
    return element.getAttribute("data-turbo-track") == "reload";
  }
  function elementIsScript(element) {
    const tagName = element.localName;
    return tagName == "script";
  }
  function elementIsNoscript(element) {
    const tagName = element.localName;
    return tagName == "noscript";
  }
  function elementIsStylesheet(element) {
    const tagName = element.localName;
    return tagName == "style" || tagName == "link" && element.getAttribute("rel") == "stylesheet";
  }
  function elementIsMetaElementWithName(element, name) {
    const tagName = element.localName;
    return tagName == "meta" && element.getAttribute("name") == name;
  }
  function elementWithoutNonce(element) {
    if (element.hasAttribute("nonce")) {
      element.setAttribute("nonce", "");
    }
    return element;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/page_snapshot.js
  var PageSnapshot = class _PageSnapshot extends Snapshot {
    static fromHTMLString(html = "") {
      return this.fromDocument(parseHTMLDocument(html));
    }
    static fromElement(element) {
      return this.fromDocument(element.ownerDocument);
    }
    static fromDocument({ documentElement, body, head }) {
      return new this(documentElement, body, new HeadSnapshot(head));
    }
    constructor(documentElement, body, headSnapshot) {
      super(body);
      this.documentElement = documentElement;
      this.headSnapshot = headSnapshot;
    }
    clone() {
      const clonedElement = this.element.cloneNode(true);
      const selectElements = this.element.querySelectorAll("select");
      const clonedSelectElements = clonedElement.querySelectorAll("select");
      for (const [index, source] of selectElements.entries()) {
        const clone = clonedSelectElements[index];
        for (const option of clone.selectedOptions) option.selected = false;
        for (const option of source.selectedOptions) clone.options[option.index].selected = true;
      }
      for (const clonedPasswordInput of clonedElement.querySelectorAll('input[type="password"]')) {
        clonedPasswordInput.value = "";
      }
      return new _PageSnapshot(this.documentElement, clonedElement, this.headSnapshot);
    }
    get lang() {
      return this.documentElement.getAttribute("lang");
    }
    get headElement() {
      return this.headSnapshot.element;
    }
    get rootLocation() {
      var _a;
      const root = (_a = this.getSetting("root")) != null ? _a : "/";
      return expandURL(root);
    }
    get cacheControlValue() {
      return this.getSetting("cache-control");
    }
    get isPreviewable() {
      return this.cacheControlValue != "no-preview";
    }
    get isCacheable() {
      return this.cacheControlValue != "no-cache";
    }
    get isVisitable() {
      return this.getSetting("visit-control") != "reload";
    }
    get prefersViewTransitions() {
      return this.headSnapshot.getMetaValue("view-transition") === "same-origin";
    }
    get shouldMorphPage() {
      return this.getSetting("refresh-method") === "morph";
    }
    get shouldPreserveScrollPosition() {
      return this.getSetting("refresh-scroll") === "preserve";
    }
    // Private
    getSetting(name) {
      return this.headSnapshot.getMetaValue(`turbo-${name}`);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/view_transitioner.js
  var _viewTransitionStarted, _lastOperation;
  var ViewTransitioner = class {
    constructor() {
      __privateAdd(this, _viewTransitionStarted, false);
      __privateAdd(this, _lastOperation, Promise.resolve());
    }
    renderChange(useViewTransition, render) {
      if (useViewTransition && this.viewTransitionsAvailable && !__privateGet(this, _viewTransitionStarted)) {
        __privateSet(this, _viewTransitionStarted, true);
        __privateSet(this, _lastOperation, __privateGet(this, _lastOperation).then(async () => {
          await document.startViewTransition(render).finished;
        }));
      } else {
        __privateSet(this, _lastOperation, __privateGet(this, _lastOperation).then(render));
      }
      return __privateGet(this, _lastOperation);
    }
    get viewTransitionsAvailable() {
      return document.startViewTransition;
    }
  };
  _viewTransitionStarted = new WeakMap();
  _lastOperation = new WeakMap();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/visit.js
  var defaultOptions = {
    action: "advance",
    historyChanged: false,
    visitCachedSnapshot: () => {
    },
    willRender: true,
    updateHistory: true,
    shouldCacheSnapshot: true,
    acceptsStreamResponse: false
  };
  var TimingMetric = {
    visitStart: "visitStart",
    requestStart: "requestStart",
    requestEnd: "requestEnd",
    visitEnd: "visitEnd"
  };
  var VisitState = {
    initialized: "initialized",
    started: "started",
    canceled: "canceled",
    failed: "failed",
    completed: "completed"
  };
  var SystemStatusCode = {
    networkFailure: 0,
    timeoutFailure: -1,
    contentTypeMismatch: -2
  };
  var Direction = {
    advance: "forward",
    restore: "back",
    replace: "none"
  };
  var Visit = class {
    constructor(delegate, location2, restorationIdentifier, options = {}) {
      __publicField(this, "identifier", uuid());
      // Required by turbo-ios
      __publicField(this, "timingMetrics", {});
      __publicField(this, "followedRedirect", false);
      __publicField(this, "historyChanged", false);
      __publicField(this, "scrolled", false);
      __publicField(this, "shouldCacheSnapshot", true);
      __publicField(this, "acceptsStreamResponse", false);
      __publicField(this, "snapshotCached", false);
      __publicField(this, "state", VisitState.initialized);
      __publicField(this, "viewTransitioner", new ViewTransitioner());
      this.delegate = delegate;
      this.location = location2;
      this.restorationIdentifier = restorationIdentifier || uuid();
      const {
        action,
        historyChanged,
        referrer,
        snapshot,
        snapshotHTML,
        response,
        visitCachedSnapshot,
        willRender,
        updateHistory,
        shouldCacheSnapshot,
        acceptsStreamResponse,
        direction
      } = __spreadValues(__spreadValues({}, defaultOptions), options);
      this.action = action;
      this.historyChanged = historyChanged;
      this.referrer = referrer;
      this.snapshot = snapshot;
      this.snapshotHTML = snapshotHTML;
      this.response = response;
      this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action);
      this.isPageRefresh = this.view.isPageRefresh(this);
      this.visitCachedSnapshot = visitCachedSnapshot;
      this.willRender = willRender;
      this.updateHistory = updateHistory;
      this.scrolled = !willRender;
      this.shouldCacheSnapshot = shouldCacheSnapshot;
      this.acceptsStreamResponse = acceptsStreamResponse;
      this.direction = direction || Direction[action];
    }
    get adapter() {
      return this.delegate.adapter;
    }
    get view() {
      return this.delegate.view;
    }
    get history() {
      return this.delegate.history;
    }
    get restorationData() {
      return this.history.getRestorationDataForIdentifier(this.restorationIdentifier);
    }
    get silent() {
      return this.isSamePage;
    }
    start() {
      if (this.state == VisitState.initialized) {
        this.recordTimingMetric(TimingMetric.visitStart);
        this.state = VisitState.started;
        this.adapter.visitStarted(this);
        this.delegate.visitStarted(this);
      }
    }
    cancel() {
      if (this.state == VisitState.started) {
        if (this.request) {
          this.request.cancel();
        }
        this.cancelRender();
        this.state = VisitState.canceled;
      }
    }
    complete() {
      if (this.state == VisitState.started) {
        this.recordTimingMetric(TimingMetric.visitEnd);
        this.adapter.visitCompleted(this);
        this.state = VisitState.completed;
        this.followRedirect();
        if (!this.followedRedirect) {
          this.delegate.visitCompleted(this);
        }
      }
    }
    fail() {
      if (this.state == VisitState.started) {
        this.state = VisitState.failed;
        this.adapter.visitFailed(this);
        this.delegate.visitCompleted(this);
      }
    }
    changeHistory() {
      var _a;
      if (!this.historyChanged && this.updateHistory) {
        const actionForHistory = this.location.href === ((_a = this.referrer) == null ? void 0 : _a.href) ? "replace" : this.action;
        const method = getHistoryMethodForAction(actionForHistory);
        this.history.update(method, this.location, this.restorationIdentifier);
        this.historyChanged = true;
      }
    }
    issueRequest() {
      if (this.hasPreloadedResponse()) {
        this.simulateRequest();
      } else if (this.shouldIssueRequest() && !this.request) {
        this.request = new FetchRequest(this, FetchMethod.get, this.location);
        this.request.perform();
      }
    }
    simulateRequest() {
      if (this.response) {
        this.startRequest();
        this.recordResponse();
        this.finishRequest();
      }
    }
    startRequest() {
      this.recordTimingMetric(TimingMetric.requestStart);
      this.adapter.visitRequestStarted(this);
    }
    recordResponse(response = this.response) {
      this.response = response;
      if (response) {
        const { statusCode } = response;
        if (isSuccessful(statusCode)) {
          this.adapter.visitRequestCompleted(this);
        } else {
          this.adapter.visitRequestFailedWithStatusCode(this, statusCode);
        }
      }
    }
    finishRequest() {
      this.recordTimingMetric(TimingMetric.requestEnd);
      this.adapter.visitRequestFinished(this);
    }
    loadResponse() {
      if (this.response) {
        const { statusCode, responseHTML } = this.response;
        this.render(async () => {
          if (this.shouldCacheSnapshot) this.cacheSnapshot();
          if (this.view.renderPromise) await this.view.renderPromise;
          if (isSuccessful(statusCode) && responseHTML != null) {
            const snapshot = PageSnapshot.fromHTMLString(responseHTML);
            await this.renderPageSnapshot(snapshot, false);
            this.adapter.visitRendered(this);
            this.complete();
          } else {
            await this.view.renderError(PageSnapshot.fromHTMLString(responseHTML), this);
            this.adapter.visitRendered(this);
            this.fail();
          }
        });
      }
    }
    getCachedSnapshot() {
      const snapshot = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
      if (snapshot && (!getAnchor(this.location) || snapshot.hasAnchor(getAnchor(this.location)))) {
        if (this.action == "restore" || snapshot.isPreviewable) {
          return snapshot;
        }
      }
    }
    getPreloadedSnapshot() {
      if (this.snapshotHTML) {
        return PageSnapshot.fromHTMLString(this.snapshotHTML);
      }
    }
    hasCachedSnapshot() {
      return this.getCachedSnapshot() != null;
    }
    loadCachedSnapshot() {
      const snapshot = this.getCachedSnapshot();
      if (snapshot) {
        const isPreview = this.shouldIssueRequest();
        this.render(async () => {
          this.cacheSnapshot();
          if (this.isSamePage || this.isPageRefresh) {
            this.adapter.visitRendered(this);
          } else {
            if (this.view.renderPromise) await this.view.renderPromise;
            await this.renderPageSnapshot(snapshot, isPreview);
            this.adapter.visitRendered(this);
            if (!isPreview) {
              this.complete();
            }
          }
        });
      }
    }
    followRedirect() {
      var _a;
      if (this.redirectedToLocation && !this.followedRedirect && ((_a = this.response) == null ? void 0 : _a.redirected)) {
        this.adapter.visitProposedToLocation(this.redirectedToLocation, {
          action: "replace",
          response: this.response,
          shouldCacheSnapshot: false,
          willRender: false
        });
        this.followedRedirect = true;
      }
    }
    goToSamePageAnchor() {
      if (this.isSamePage) {
        this.render(async () => {
          this.cacheSnapshot();
          this.performScroll();
          this.changeHistory();
          this.adapter.visitRendered(this);
        });
      }
    }
    // Fetch request delegate
    prepareRequest(request) {
      if (this.acceptsStreamResponse) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }
    requestStarted() {
      this.startRequest();
    }
    requestPreventedHandlingResponse(_request, _response) {
    }
    async requestSucceededWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == void 0) {
        this.recordResponse({
          statusCode: SystemStatusCode.contentTypeMismatch,
          redirected
        });
      } else {
        this.redirectedToLocation = response.redirected ? response.location : void 0;
        this.recordResponse({ statusCode, responseHTML, redirected });
      }
    }
    async requestFailedWithResponse(request, response) {
      const responseHTML = await response.responseHTML;
      const { redirected, statusCode } = response;
      if (responseHTML == void 0) {
        this.recordResponse({
          statusCode: SystemStatusCode.contentTypeMismatch,
          redirected
        });
      } else {
        this.recordResponse({ statusCode, responseHTML, redirected });
      }
    }
    requestErrored(_request, _error) {
      this.recordResponse({
        statusCode: SystemStatusCode.networkFailure,
        redirected: false
      });
    }
    requestFinished() {
      this.finishRequest();
    }
    // Scrolling
    performScroll() {
      if (!this.scrolled && !this.view.forceReloaded && !this.view.shouldPreserveScrollPosition(this)) {
        if (this.action == "restore") {
          this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop();
        } else {
          this.scrollToAnchor() || this.view.scrollToTop();
        }
        if (this.isSamePage) {
          this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location);
        }
        this.scrolled = true;
      }
    }
    scrollToRestoredPosition() {
      const { scrollPosition } = this.restorationData;
      if (scrollPosition) {
        this.view.scrollToPosition(scrollPosition);
        return true;
      }
    }
    scrollToAnchor() {
      const anchor = getAnchor(this.location);
      if (anchor != null) {
        this.view.scrollToAnchor(anchor);
        return true;
      }
    }
    // Instrumentation
    recordTimingMetric(metric) {
      this.timingMetrics[metric] = (/* @__PURE__ */ new Date()).getTime();
    }
    getTimingMetrics() {
      return __spreadValues({}, this.timingMetrics);
    }
    // Private
    getHistoryMethodForAction(action) {
      switch (action) {
        case "replace":
          return history.replaceState;
        case "advance":
        case "restore":
          return history.pushState;
      }
    }
    hasPreloadedResponse() {
      return typeof this.response == "object";
    }
    shouldIssueRequest() {
      if (this.isSamePage) {
        return false;
      } else if (this.action == "restore") {
        return !this.hasCachedSnapshot();
      } else {
        return this.willRender;
      }
    }
    cacheSnapshot() {
      if (!this.snapshotCached) {
        this.view.cacheSnapshot(this.snapshot).then((snapshot) => snapshot && this.visitCachedSnapshot(snapshot));
        this.snapshotCached = true;
      }
    }
    async render(callback) {
      this.cancelRender();
      this.frame = await nextRepaint();
      await callback();
      delete this.frame;
    }
    async renderPageSnapshot(snapshot, isPreview) {
      await this.viewTransitioner.renderChange(this.view.shouldTransitionTo(snapshot), async () => {
        await this.view.renderPage(snapshot, isPreview, this.willRender, this);
        this.performScroll();
      });
    }
    cancelRender() {
      if (this.frame) {
        cancelAnimationFrame(this.frame);
        delete this.frame;
      }
    }
  };
  function isSuccessful(statusCode) {
    return statusCode >= 200 && statusCode < 300;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/native/browser_adapter.js
  var BrowserAdapter = class {
    constructor(session2) {
      __publicField(this, "progressBar", new ProgressBar());
      __publicField(this, "showProgressBar", () => {
        this.progressBar.show();
      });
      this.session = session2;
    }
    visitProposedToLocation(location2, options) {
      if (locationIsVisitable(location2, this.navigator.rootLocation)) {
        this.navigator.startVisit(location2, (options == null ? void 0 : options.restorationIdentifier) || uuid(), options);
      } else {
        window.location.href = location2.toString();
      }
    }
    visitStarted(visit2) {
      this.location = visit2.location;
      visit2.loadCachedSnapshot();
      visit2.issueRequest();
      visit2.goToSamePageAnchor();
    }
    visitRequestStarted(visit2) {
      this.progressBar.setValue(0);
      if (visit2.hasCachedSnapshot() || visit2.action != "restore") {
        this.showVisitProgressBarAfterDelay();
      } else {
        this.showProgressBar();
      }
    }
    visitRequestCompleted(visit2) {
      visit2.loadResponse();
    }
    visitRequestFailedWithStatusCode(visit2, statusCode) {
      switch (statusCode) {
        case SystemStatusCode.networkFailure:
        case SystemStatusCode.timeoutFailure:
        case SystemStatusCode.contentTypeMismatch:
          return this.reload({
            reason: "request_failed",
            context: {
              statusCode
            }
          });
        default:
          return visit2.loadResponse();
      }
    }
    visitRequestFinished(_visit) {
    }
    visitCompleted(_visit) {
      this.progressBar.setValue(1);
      this.hideVisitProgressBar();
    }
    pageInvalidated(reason) {
      this.reload(reason);
    }
    visitFailed(_visit) {
      this.progressBar.setValue(1);
      this.hideVisitProgressBar();
    }
    visitRendered(_visit) {
    }
    // Form Submission Delegate
    formSubmissionStarted(_formSubmission) {
      this.progressBar.setValue(0);
      this.showFormProgressBarAfterDelay();
    }
    formSubmissionFinished(_formSubmission) {
      this.progressBar.setValue(1);
      this.hideFormProgressBar();
    }
    // Private
    showVisitProgressBarAfterDelay() {
      this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
    }
    hideVisitProgressBar() {
      this.progressBar.hide();
      if (this.visitProgressBarTimeout != null) {
        window.clearTimeout(this.visitProgressBarTimeout);
        delete this.visitProgressBarTimeout;
      }
    }
    showFormProgressBarAfterDelay() {
      if (this.formProgressBarTimeout == null) {
        this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay);
      }
    }
    hideFormProgressBar() {
      this.progressBar.hide();
      if (this.formProgressBarTimeout != null) {
        window.clearTimeout(this.formProgressBarTimeout);
        delete this.formProgressBarTimeout;
      }
    }
    reload(reason) {
      var _a;
      dispatch("turbo:reload", { detail: reason });
      window.location.href = ((_a = this.location) == null ? void 0 : _a.toString()) || window.location.href;
    }
    get navigator() {
      return this.session.navigator;
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/cache_observer.js
  var CacheObserver = class {
    constructor() {
      __publicField(this, "selector", "[data-turbo-temporary]");
      __publicField(this, "deprecatedSelector", "[data-turbo-cache=false]");
      __publicField(this, "started", false);
      __publicField(this, "removeTemporaryElements", (_event) => {
        for (const element of this.temporaryElements) {
          element.remove();
        }
      });
    }
    start() {
      if (!this.started) {
        this.started = true;
        addEventListener("turbo:before-cache", this.removeTemporaryElements, false);
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        removeEventListener("turbo:before-cache", this.removeTemporaryElements, false);
      }
    }
    get temporaryElements() {
      return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation];
    }
    get temporaryElementsWithDeprecation() {
      const elements = document.querySelectorAll(this.deprecatedSelector);
      if (elements.length) {
        console.warn(
          `The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`
        );
      }
      return [...elements];
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/frames/frame_redirector.js
  var _FrameRedirector_instances, shouldSubmit_fn, shouldRedirect_fn, findFrameElement_fn;
  var FrameRedirector = class {
    constructor(session2, element) {
      __privateAdd(this, _FrameRedirector_instances);
      this.session = session2;
      this.element = element;
      this.linkInterceptor = new LinkInterceptor(this, element);
      this.formSubmitObserver = new FormSubmitObserver(this, element);
    }
    start() {
      this.linkInterceptor.start();
      this.formSubmitObserver.start();
    }
    stop() {
      this.linkInterceptor.stop();
      this.formSubmitObserver.stop();
    }
    // Link interceptor delegate
    shouldInterceptLinkClick(element, _location, _event) {
      return __privateMethod(this, _FrameRedirector_instances, shouldRedirect_fn).call(this, element);
    }
    linkClickIntercepted(element, url, event) {
      const frame = __privateMethod(this, _FrameRedirector_instances, findFrameElement_fn).call(this, element);
      if (frame) {
        frame.delegate.linkClickIntercepted(element, url, event);
      }
    }
    // Form submit observer delegate
    willSubmitForm(element, submitter) {
      return element.closest("turbo-frame") == null && __privateMethod(this, _FrameRedirector_instances, shouldSubmit_fn).call(this, element, submitter) && __privateMethod(this, _FrameRedirector_instances, shouldRedirect_fn).call(this, element, submitter);
    }
    formSubmitted(element, submitter) {
      const frame = __privateMethod(this, _FrameRedirector_instances, findFrameElement_fn).call(this, element, submitter);
      if (frame) {
        frame.delegate.formSubmitted(element, submitter);
      }
    }
  };
  _FrameRedirector_instances = new WeakSet();
  shouldSubmit_fn = function(form, submitter) {
    var _a;
    const action = getAction(form, submitter);
    const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
    const rootLocation = expandURL((_a = meta == null ? void 0 : meta.content) != null ? _a : "/");
    return __privateMethod(this, _FrameRedirector_instances, shouldRedirect_fn).call(this, form, submitter) && locationIsVisitable(action, rootLocation);
  };
  shouldRedirect_fn = function(element, submitter) {
    const isNavigatable = element instanceof HTMLFormElement ? this.session.submissionIsNavigatable(element, submitter) : this.session.elementIsNavigatable(element);
    if (isNavigatable) {
      const frame = __privateMethod(this, _FrameRedirector_instances, findFrameElement_fn).call(this, element, submitter);
      return frame ? frame != element.closest("turbo-frame") : false;
    } else {
      return false;
    }
  };
  findFrameElement_fn = function(element, submitter) {
    const id = (submitter == null ? void 0 : submitter.getAttribute("data-turbo-frame")) || element.getAttribute("data-turbo-frame");
    if (id && id != "_top") {
      const frame = this.element.querySelector(`#${id}:not([disabled])`);
      if (frame instanceof FrameElement) {
        return frame;
      }
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/history.js
  var History = class {
    constructor(delegate) {
      __publicField(this, "location");
      __publicField(this, "restorationIdentifier", uuid());
      __publicField(this, "restorationData", {});
      __publicField(this, "started", false);
      __publicField(this, "pageLoaded", false);
      __publicField(this, "currentIndex", 0);
      // Event handlers
      __publicField(this, "onPopState", (event) => {
        if (this.shouldHandlePopState()) {
          const { turbo } = event.state || {};
          if (turbo) {
            this.location = new URL(window.location.href);
            const { restorationIdentifier, restorationIndex } = turbo;
            this.restorationIdentifier = restorationIdentifier;
            const direction = restorationIndex > this.currentIndex ? "forward" : "back";
            this.delegate.historyPoppedToLocationWithRestorationIdentifierAndDirection(this.location, restorationIdentifier, direction);
            this.currentIndex = restorationIndex;
          }
        }
      });
      __publicField(this, "onPageLoad", async (_event) => {
        await nextMicrotask();
        this.pageLoaded = true;
      });
      this.delegate = delegate;
    }
    start() {
      var _a, _b;
      if (!this.started) {
        addEventListener("popstate", this.onPopState, false);
        addEventListener("load", this.onPageLoad, false);
        this.currentIndex = ((_b = (_a = history.state) == null ? void 0 : _a.turbo) == null ? void 0 : _b.restorationIndex) || 0;
        this.started = true;
        this.replace(new URL(window.location.href));
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("popstate", this.onPopState, false);
        removeEventListener("load", this.onPageLoad, false);
        this.started = false;
      }
    }
    push(location2, restorationIdentifier) {
      this.update(history.pushState, location2, restorationIdentifier);
    }
    replace(location2, restorationIdentifier) {
      this.update(history.replaceState, location2, restorationIdentifier);
    }
    update(method, location2, restorationIdentifier = uuid()) {
      if (method === history.pushState) ++this.currentIndex;
      const state = { turbo: { restorationIdentifier, restorationIndex: this.currentIndex } };
      method.call(history, state, "", location2.href);
      this.location = location2;
      this.restorationIdentifier = restorationIdentifier;
    }
    // Restoration data
    getRestorationDataForIdentifier(restorationIdentifier) {
      return this.restorationData[restorationIdentifier] || {};
    }
    updateRestorationData(additionalData) {
      const { restorationIdentifier } = this;
      const restorationData = this.restorationData[restorationIdentifier];
      this.restorationData[restorationIdentifier] = __spreadValues(__spreadValues({}, restorationData), additionalData);
    }
    // Scroll restoration
    assumeControlOfScrollRestoration() {
      var _a;
      if (!this.previousScrollRestoration) {
        this.previousScrollRestoration = (_a = history.scrollRestoration) != null ? _a : "auto";
        history.scrollRestoration = "manual";
      }
    }
    relinquishControlOfScrollRestoration() {
      if (this.previousScrollRestoration) {
        history.scrollRestoration = this.previousScrollRestoration;
        delete this.previousScrollRestoration;
      }
    }
    // Private
    shouldHandlePopState() {
      return this.pageIsLoaded();
    }
    pageIsLoaded() {
      return this.pageLoaded || document.readyState == "complete";
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/link_prefetch_observer.js
  var _prefetchedLink, _enable, _tryToPrefetchRequest, _cancelRequestIfObsolete, _cancelPrefetchRequest, _tryToUsePrefetchedRequest, _LinkPrefetchObserver_instances, cacheTtl_get, isPrefetchable_fn;
  var LinkPrefetchObserver = class {
    constructor(delegate, eventTarget) {
      __privateAdd(this, _LinkPrefetchObserver_instances);
      __publicField(this, "started", false);
      __privateAdd(this, _prefetchedLink, null);
      __privateAdd(this, _enable, () => {
        this.eventTarget.addEventListener("mouseenter", __privateGet(this, _tryToPrefetchRequest), {
          capture: true,
          passive: true
        });
        this.eventTarget.addEventListener("mouseleave", __privateGet(this, _cancelRequestIfObsolete), {
          capture: true,
          passive: true
        });
        this.eventTarget.addEventListener("turbo:before-fetch-request", __privateGet(this, _tryToUsePrefetchedRequest), true);
        this.started = true;
      });
      __privateAdd(this, _tryToPrefetchRequest, (event) => {
        if (getMetaContent("turbo-prefetch") === "false") return;
        const target = event.target;
        const isLink = target.matches && target.matches("a[href]:not([target^=_]):not([download])");
        if (isLink && __privateMethod(this, _LinkPrefetchObserver_instances, isPrefetchable_fn).call(this, target)) {
          const link = target;
          const location2 = getLocationForLink(link);
          if (this.delegate.canPrefetchRequestToLocation(link, location2)) {
            __privateSet(this, _prefetchedLink, link);
            const fetchRequest = new FetchRequest(
              this,
              FetchMethod.get,
              location2,
              new URLSearchParams(),
              target
            );
            prefetchCache.setLater(location2.toString(), fetchRequest, __privateGet(this, _LinkPrefetchObserver_instances, cacheTtl_get));
          }
        }
      });
      __privateAdd(this, _cancelRequestIfObsolete, (event) => {
        if (event.target === __privateGet(this, _prefetchedLink)) __privateGet(this, _cancelPrefetchRequest).call(this);
      });
      __privateAdd(this, _cancelPrefetchRequest, () => {
        prefetchCache.clear();
        __privateSet(this, _prefetchedLink, null);
      });
      __privateAdd(this, _tryToUsePrefetchedRequest, (event) => {
        if (event.target.tagName !== "FORM" && event.detail.fetchOptions.method === "get") {
          const cached = prefetchCache.get(event.detail.url.toString());
          if (cached) {
            event.detail.fetchRequest = cached;
          }
          prefetchCache.clear();
        }
      });
      this.delegate = delegate;
      this.eventTarget = eventTarget;
    }
    start() {
      if (this.started) return;
      if (this.eventTarget.readyState === "loading") {
        this.eventTarget.addEventListener("DOMContentLoaded", __privateGet(this, _enable), { once: true });
      } else {
        __privateGet(this, _enable).call(this);
      }
    }
    stop() {
      if (!this.started) return;
      this.eventTarget.removeEventListener("mouseenter", __privateGet(this, _tryToPrefetchRequest), {
        capture: true,
        passive: true
      });
      this.eventTarget.removeEventListener("mouseleave", __privateGet(this, _cancelRequestIfObsolete), {
        capture: true,
        passive: true
      });
      this.eventTarget.removeEventListener("turbo:before-fetch-request", __privateGet(this, _tryToUsePrefetchedRequest), true);
      this.started = false;
    }
    prepareRequest(request) {
      const link = request.target;
      request.headers["X-Sec-Purpose"] = "prefetch";
      const turboFrame = link.closest("turbo-frame");
      const turboFrameTarget = link.getAttribute("data-turbo-frame") || (turboFrame == null ? void 0 : turboFrame.getAttribute("target")) || (turboFrame == null ? void 0 : turboFrame.id);
      if (turboFrameTarget && turboFrameTarget !== "_top") {
        request.headers["Turbo-Frame"] = turboFrameTarget;
      }
    }
    // Fetch request interface
    requestSucceededWithResponse() {
    }
    requestStarted(fetchRequest) {
    }
    requestErrored(fetchRequest) {
    }
    requestFinished(fetchRequest) {
    }
    requestPreventedHandlingResponse(fetchRequest, fetchResponse) {
    }
    requestFailedWithResponse(fetchRequest, fetchResponse) {
    }
  };
  _prefetchedLink = new WeakMap();
  _enable = new WeakMap();
  _tryToPrefetchRequest = new WeakMap();
  _cancelRequestIfObsolete = new WeakMap();
  _cancelPrefetchRequest = new WeakMap();
  _tryToUsePrefetchedRequest = new WeakMap();
  _LinkPrefetchObserver_instances = new WeakSet();
  cacheTtl_get = function() {
    return Number(getMetaContent("turbo-prefetch-cache-time")) || cacheTtl;
  };
  isPrefetchable_fn = function(link) {
    const href = link.getAttribute("href");
    if (!href) return false;
    if (unfetchableLink(link)) return false;
    if (linkToTheSamePage(link)) return false;
    if (linkOptsOut(link)) return false;
    if (nonSafeLink(link)) return false;
    if (eventPrevented(link)) return false;
    return true;
  };
  var unfetchableLink = (link) => {
    return link.origin !== document.location.origin || !["http:", "https:"].includes(link.protocol) || link.hasAttribute("target");
  };
  var linkToTheSamePage = (link) => {
    return link.pathname + link.search === document.location.pathname + document.location.search || link.href.startsWith("#");
  };
  var linkOptsOut = (link) => {
    if (link.getAttribute("data-turbo-prefetch") === "false") return true;
    if (link.getAttribute("data-turbo") === "false") return true;
    const turboPrefetchParent = findClosestRecursively(link, "[data-turbo-prefetch]");
    if (turboPrefetchParent && turboPrefetchParent.getAttribute("data-turbo-prefetch") === "false") return true;
    return false;
  };
  var nonSafeLink = (link) => {
    const turboMethod = link.getAttribute("data-turbo-method");
    if (turboMethod && turboMethod.toLowerCase() !== "get") return true;
    if (isUJS(link)) return true;
    if (link.hasAttribute("data-turbo-confirm")) return true;
    if (link.hasAttribute("data-turbo-stream")) return true;
    return false;
  };
  var isUJS = (link) => {
    return link.hasAttribute("data-remote") || link.hasAttribute("data-behavior") || link.hasAttribute("data-confirm") || link.hasAttribute("data-method");
  };
  var eventPrevented = (link) => {
    const event = dispatch("turbo:before-prefetch", { target: link, cancelable: true });
    return event.defaultPrevented;
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/navigator.js
  var _Navigator_instances, getActionForFormSubmission_fn, getDefaultAction_fn;
  var Navigator = class {
    constructor(delegate) {
      __privateAdd(this, _Navigator_instances);
      this.delegate = delegate;
    }
    proposeVisit(location2, options = {}) {
      if (this.delegate.allowsVisitingLocationWithAction(location2, options.action)) {
        this.delegate.visitProposedToLocation(location2, options);
      }
    }
    startVisit(locatable, restorationIdentifier, options = {}) {
      this.stop();
      this.currentVisit = new Visit(this, expandURL(locatable), restorationIdentifier, __spreadValues({
        referrer: this.location
      }, options));
      this.currentVisit.start();
    }
    submitForm(form, submitter) {
      this.stop();
      this.formSubmission = new FormSubmission(this, form, submitter, true);
      this.formSubmission.start();
    }
    stop() {
      if (this.formSubmission) {
        this.formSubmission.stop();
        delete this.formSubmission;
      }
      if (this.currentVisit) {
        this.currentVisit.cancel();
        delete this.currentVisit;
      }
    }
    get adapter() {
      return this.delegate.adapter;
    }
    get view() {
      return this.delegate.view;
    }
    get rootLocation() {
      return this.view.snapshot.rootLocation;
    }
    get history() {
      return this.delegate.history;
    }
    // Form submission delegate
    formSubmissionStarted(formSubmission) {
      if (typeof this.adapter.formSubmissionStarted === "function") {
        this.adapter.formSubmissionStarted(formSubmission);
      }
    }
    async formSubmissionSucceededWithResponse(formSubmission, fetchResponse) {
      if (formSubmission == this.formSubmission) {
        const responseHTML = await fetchResponse.responseHTML;
        if (responseHTML) {
          const shouldCacheSnapshot = formSubmission.isSafe;
          if (!shouldCacheSnapshot) {
            this.view.clearSnapshotCache();
          }
          const { statusCode, redirected } = fetchResponse;
          const action = __privateMethod(this, _Navigator_instances, getActionForFormSubmission_fn).call(this, formSubmission, fetchResponse);
          const visitOptions = {
            action,
            shouldCacheSnapshot,
            response: { statusCode, responseHTML, redirected }
          };
          this.proposeVisit(fetchResponse.location, visitOptions);
        }
      }
    }
    async formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      const responseHTML = await fetchResponse.responseHTML;
      if (responseHTML) {
        const snapshot = PageSnapshot.fromHTMLString(responseHTML);
        if (fetchResponse.serverError) {
          await this.view.renderError(snapshot, this.currentVisit);
        } else {
          await this.view.renderPage(snapshot, false, true, this.currentVisit);
        }
        if (!snapshot.shouldPreserveScrollPosition) {
          this.view.scrollToTop();
        }
        this.view.clearSnapshotCache();
      }
    }
    formSubmissionErrored(formSubmission, error) {
      console.error(error);
    }
    formSubmissionFinished(formSubmission) {
      if (typeof this.adapter.formSubmissionFinished === "function") {
        this.adapter.formSubmissionFinished(formSubmission);
      }
    }
    // Visit delegate
    visitStarted(visit2) {
      this.delegate.visitStarted(visit2);
    }
    visitCompleted(visit2) {
      this.delegate.visitCompleted(visit2);
    }
    locationWithActionIsSamePage(location2, action) {
      const anchor = getAnchor(location2);
      const currentAnchor = getAnchor(this.view.lastRenderedLocation);
      const isRestorationToTop = action === "restore" && typeof anchor === "undefined";
      return action !== "replace" && getRequestURL(location2) === getRequestURL(this.view.lastRenderedLocation) && (isRestorationToTop || anchor != null && anchor !== currentAnchor);
    }
    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.delegate.visitScrolledToSamePageLocation(oldURL, newURL);
    }
    // Visits
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
  };
  _Navigator_instances = new WeakSet();
  getActionForFormSubmission_fn = function(formSubmission, fetchResponse) {
    const { submitter, formElement } = formSubmission;
    return getVisitAction(submitter, formElement) || __privateMethod(this, _Navigator_instances, getDefaultAction_fn).call(this, fetchResponse);
  };
  getDefaultAction_fn = function(fetchResponse) {
    var _a;
    const sameLocationRedirect = fetchResponse.redirected && fetchResponse.location.href === ((_a = this.location) == null ? void 0 : _a.href);
    return sameLocationRedirect ? "replace" : "advance";
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/page_observer.js
  var PageStage = {
    initial: 0,
    loading: 1,
    interactive: 2,
    complete: 3
  };
  var PageObserver = class {
    constructor(delegate) {
      __publicField(this, "stage", PageStage.initial);
      __publicField(this, "started", false);
      __publicField(this, "interpretReadyState", () => {
        const { readyState } = this;
        if (readyState == "interactive") {
          this.pageIsInteractive();
        } else if (readyState == "complete") {
          this.pageIsComplete();
        }
      });
      __publicField(this, "pageWillUnload", () => {
        this.delegate.pageWillUnload();
      });
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        if (this.stage == PageStage.initial) {
          this.stage = PageStage.loading;
        }
        document.addEventListener("readystatechange", this.interpretReadyState, false);
        addEventListener("pagehide", this.pageWillUnload, false);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        document.removeEventListener("readystatechange", this.interpretReadyState, false);
        removeEventListener("pagehide", this.pageWillUnload, false);
        this.started = false;
      }
    }
    pageIsInteractive() {
      if (this.stage == PageStage.loading) {
        this.stage = PageStage.interactive;
        this.delegate.pageBecameInteractive();
      }
    }
    pageIsComplete() {
      this.pageIsInteractive();
      if (this.stage == PageStage.interactive) {
        this.stage = PageStage.complete;
        this.delegate.pageLoaded();
      }
    }
    get readyState() {
      return document.readyState;
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/scroll_observer.js
  var ScrollObserver = class {
    constructor(delegate) {
      __publicField(this, "started", false);
      __publicField(this, "onScroll", () => {
        this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
      });
      this.delegate = delegate;
    }
    start() {
      if (!this.started) {
        addEventListener("scroll", this.onScroll, false);
        this.onScroll();
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        removeEventListener("scroll", this.onScroll, false);
        this.started = false;
      }
    }
    // Private
    updatePosition(position) {
      this.delegate.scrollPositionChanged(position);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/streams/stream_message_renderer.js
  var StreamMessageRenderer = class {
    render({ fragment }) {
      Bardo.preservingPermanentElements(this, getPermanentElementMapForFragment(fragment), () => {
        withAutofocusFromFragment(fragment, () => {
          withPreservedFocus(() => {
            document.documentElement.appendChild(fragment);
          });
        });
      });
    }
    // Bardo delegate
    enteringBardo(currentPermanentElement, newPermanentElement) {
      newPermanentElement.replaceWith(currentPermanentElement.cloneNode(true));
    }
    leavingBardo() {
    }
  };
  function getPermanentElementMapForFragment(fragment) {
    const permanentElementsInDocument = queryPermanentElementsAll(document.documentElement);
    const permanentElementMap = {};
    for (const permanentElementInDocument of permanentElementsInDocument) {
      const { id } = permanentElementInDocument;
      for (const streamElement of fragment.querySelectorAll("turbo-stream")) {
        const elementInStream = getPermanentElementById(streamElement.templateElement.content, id);
        if (elementInStream) {
          permanentElementMap[id] = [permanentElementInDocument, elementInStream];
        }
      }
    }
    return permanentElementMap;
  }
  async function withAutofocusFromFragment(fragment, callback) {
    const generatedID = `turbo-stream-autofocus-${uuid()}`;
    const turboStreams = fragment.querySelectorAll("turbo-stream");
    const elementWithAutofocus = firstAutofocusableElementInStreams(turboStreams);
    let willAutofocusId = null;
    if (elementWithAutofocus) {
      if (elementWithAutofocus.id) {
        willAutofocusId = elementWithAutofocus.id;
      } else {
        willAutofocusId = generatedID;
      }
      elementWithAutofocus.id = willAutofocusId;
    }
    callback();
    await nextRepaint();
    const hasNoActiveElement = document.activeElement == null || document.activeElement == document.body;
    if (hasNoActiveElement && willAutofocusId) {
      const elementToAutofocus = document.getElementById(willAutofocusId);
      if (elementIsFocusable(elementToAutofocus)) {
        elementToAutofocus.focus();
      }
      if (elementToAutofocus && elementToAutofocus.id == generatedID) {
        elementToAutofocus.removeAttribute("id");
      }
    }
  }
  async function withPreservedFocus(callback) {
    const [activeElementBeforeRender, activeElementAfterRender] = await around(callback, () => document.activeElement);
    const restoreFocusTo = activeElementBeforeRender && activeElementBeforeRender.id;
    if (restoreFocusTo) {
      const elementToFocus = document.getElementById(restoreFocusTo);
      if (elementIsFocusable(elementToFocus) && elementToFocus != activeElementAfterRender) {
        elementToFocus.focus();
      }
    }
  }
  function firstAutofocusableElementInStreams(nodeListOfStreamElements) {
    for (const streamElement of nodeListOfStreamElements) {
      const elementWithAutofocus = queryAutofocusableElement(streamElement.templateElement.content);
      if (elementWithAutofocus) return elementWithAutofocus;
    }
    return null;
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/observers/stream_observer.js
  var _started;
  var StreamObserver = class {
    constructor(delegate) {
      __publicField(this, "sources", /* @__PURE__ */ new Set());
      __privateAdd(this, _started, false);
      __publicField(this, "inspectFetchResponse", (event) => {
        const response = fetchResponseFromEvent(event);
        if (response && fetchResponseIsStream(response)) {
          event.preventDefault();
          this.receiveMessageResponse(response);
        }
      });
      __publicField(this, "receiveMessageEvent", (event) => {
        if (__privateGet(this, _started) && typeof event.data == "string") {
          this.receiveMessageHTML(event.data);
        }
      });
      this.delegate = delegate;
    }
    start() {
      if (!__privateGet(this, _started)) {
        __privateSet(this, _started, true);
        addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }
    stop() {
      if (__privateGet(this, _started)) {
        __privateSet(this, _started, false);
        removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, false);
      }
    }
    connectStreamSource(source) {
      if (!this.streamSourceIsConnected(source)) {
        this.sources.add(source);
        source.addEventListener("message", this.receiveMessageEvent, false);
      }
    }
    disconnectStreamSource(source) {
      if (this.streamSourceIsConnected(source)) {
        this.sources.delete(source);
        source.removeEventListener("message", this.receiveMessageEvent, false);
      }
    }
    streamSourceIsConnected(source) {
      return this.sources.has(source);
    }
    async receiveMessageResponse(response) {
      const html = await response.responseHTML;
      if (html) {
        this.receiveMessageHTML(html);
      }
    }
    receiveMessageHTML(html) {
      this.delegate.receivedMessageFromStream(StreamMessage.wrap(html));
    }
  };
  _started = new WeakMap();
  function fetchResponseFromEvent(event) {
    var _a;
    const fetchResponse = (_a = event.detail) == null ? void 0 : _a.fetchResponse;
    if (fetchResponse instanceof FetchResponse) {
      return fetchResponse;
    }
  }
  function fetchResponseIsStream(response) {
    var _a;
    const contentType = (_a = response.contentType) != null ? _a : "";
    return contentType.startsWith(StreamMessage.contentType);
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/error_renderer.js
  var ErrorRenderer = class extends Renderer {
    static renderElement(currentElement, newElement) {
      const { documentElement, body } = document;
      documentElement.replaceChild(newElement, body);
    }
    async render() {
      this.replaceHeadAndBody();
      this.activateScriptElements();
    }
    replaceHeadAndBody() {
      const { documentElement, head } = document;
      documentElement.replaceChild(this.newHead, head);
      this.renderElement(this.currentElement, this.newElement);
    }
    activateScriptElements() {
      for (const replaceableElement of this.scriptElements) {
        const parentNode = replaceableElement.parentNode;
        if (parentNode) {
          const element = activateScriptElement(replaceableElement);
          parentNode.replaceChild(element, replaceableElement);
        }
      }
    }
    get newHead() {
      return this.newSnapshot.headSnapshot.element;
    }
    get scriptElements() {
      return document.documentElement.querySelectorAll("script");
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/bigskysoftware/idiomorph/dist/idiomorph.esm.js
  var Idiomorph = function() {
    "use strict";
    let EMPTY_SET = /* @__PURE__ */ new Set();
    let defaults = {
      morphStyle: "outerHTML",
      callbacks: {
        beforeNodeAdded: noOp,
        afterNodeAdded: noOp,
        beforeNodeMorphed: noOp,
        afterNodeMorphed: noOp,
        beforeNodeRemoved: noOp,
        afterNodeRemoved: noOp,
        beforeAttributeUpdated: noOp
      },
      head: {
        style: "merge",
        shouldPreserve: function(elt) {
          return elt.getAttribute("im-preserve") === "true";
        },
        shouldReAppend: function(elt) {
          return elt.getAttribute("im-re-append") === "true";
        },
        shouldRemove: noOp,
        afterHeadMorphed: noOp
      }
    };
    function morph(oldNode, newContent, config = {}) {
      if (oldNode instanceof Document) {
        oldNode = oldNode.documentElement;
      }
      if (typeof newContent === "string") {
        newContent = parseContent(newContent);
      }
      let normalizedContent = normalizeContent(newContent);
      let ctx = createMorphContext(oldNode, normalizedContent, config);
      return morphNormalizedContent(oldNode, normalizedContent, ctx);
    }
    function morphNormalizedContent(oldNode, normalizedNewContent, ctx) {
      if (ctx.head.block) {
        let oldHead = oldNode.querySelector("head");
        let newHead = normalizedNewContent.querySelector("head");
        if (oldHead && newHead) {
          let promises = handleHeadElement(newHead, oldHead, ctx);
          Promise.all(promises).then(function() {
            morphNormalizedContent(oldNode, normalizedNewContent, Object.assign(ctx, {
              head: {
                block: false,
                ignore: true
              }
            }));
          });
          return;
        }
      }
      if (ctx.morphStyle === "innerHTML") {
        morphChildren(normalizedNewContent, oldNode, ctx);
        return oldNode.children;
      } else if (ctx.morphStyle === "outerHTML" || ctx.morphStyle == null) {
        let bestMatch = findBestNodeMatch(normalizedNewContent, oldNode, ctx);
        let previousSibling = bestMatch == null ? void 0 : bestMatch.previousSibling;
        let nextSibling = bestMatch == null ? void 0 : bestMatch.nextSibling;
        let morphedNode = morphOldNodeTo(oldNode, bestMatch, ctx);
        if (bestMatch) {
          return insertSiblings(previousSibling, morphedNode, nextSibling);
        } else {
          return [];
        }
      } else {
        throw "Do not understand how to morph style " + ctx.morphStyle;
      }
    }
    function ignoreValueOfActiveElement(possibleActiveElement, ctx) {
      return ctx.ignoreActiveValue && possibleActiveElement === document.activeElement;
    }
    function morphOldNodeTo(oldNode, newContent, ctx) {
      if (ctx.ignoreActive && oldNode === document.activeElement) {
      } else if (newContent == null) {
        if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
        oldNode.remove();
        ctx.callbacks.afterNodeRemoved(oldNode);
        return null;
      } else if (!isSoftMatch(oldNode, newContent)) {
        if (ctx.callbacks.beforeNodeRemoved(oldNode) === false) return oldNode;
        if (ctx.callbacks.beforeNodeAdded(newContent) === false) return oldNode;
        oldNode.parentElement.replaceChild(newContent, oldNode);
        ctx.callbacks.afterNodeAdded(newContent);
        ctx.callbacks.afterNodeRemoved(oldNode);
        return newContent;
      } else {
        if (ctx.callbacks.beforeNodeMorphed(oldNode, newContent) === false) return oldNode;
        if (oldNode instanceof HTMLHeadElement && ctx.head.ignore) {
        } else if (oldNode instanceof HTMLHeadElement && ctx.head.style !== "morph") {
          handleHeadElement(newContent, oldNode, ctx);
        } else {
          syncNodeFrom(newContent, oldNode, ctx);
          if (!ignoreValueOfActiveElement(oldNode, ctx)) {
            morphChildren(newContent, oldNode, ctx);
          }
        }
        ctx.callbacks.afterNodeMorphed(oldNode, newContent);
        return oldNode;
      }
    }
    function morphChildren(newParent, oldParent, ctx) {
      let nextNewChild = newParent.firstChild;
      let insertionPoint = oldParent.firstChild;
      let newChild;
      while (nextNewChild) {
        newChild = nextNewChild;
        nextNewChild = newChild.nextSibling;
        if (insertionPoint == null) {
          if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
          oldParent.appendChild(newChild);
          ctx.callbacks.afterNodeAdded(newChild);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }
        if (isIdSetMatch(newChild, insertionPoint, ctx)) {
          morphOldNodeTo(insertionPoint, newChild, ctx);
          insertionPoint = insertionPoint.nextSibling;
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }
        let idSetMatch = findIdSetMatch(newParent, oldParent, newChild, insertionPoint, ctx);
        if (idSetMatch) {
          insertionPoint = removeNodesBetween(insertionPoint, idSetMatch, ctx);
          morphOldNodeTo(idSetMatch, newChild, ctx);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }
        let softMatch = findSoftMatch(newParent, oldParent, newChild, insertionPoint, ctx);
        if (softMatch) {
          insertionPoint = removeNodesBetween(insertionPoint, softMatch, ctx);
          morphOldNodeTo(softMatch, newChild, ctx);
          removeIdsFromConsideration(ctx, newChild);
          continue;
        }
        if (ctx.callbacks.beforeNodeAdded(newChild) === false) return;
        oldParent.insertBefore(newChild, insertionPoint);
        ctx.callbacks.afterNodeAdded(newChild);
        removeIdsFromConsideration(ctx, newChild);
      }
      while (insertionPoint !== null) {
        let tempNode = insertionPoint;
        insertionPoint = insertionPoint.nextSibling;
        removeNode(tempNode, ctx);
      }
    }
    function ignoreAttribute(attr, to, updateType, ctx) {
      if (attr === "value" && ctx.ignoreActiveValue && to === document.activeElement) {
        return true;
      }
      return ctx.callbacks.beforeAttributeUpdated(attr, to, updateType) === false;
    }
    function syncNodeFrom(from, to, ctx) {
      let type = from.nodeType;
      if (type === 1) {
        const fromAttributes = from.attributes;
        const toAttributes = to.attributes;
        for (const fromAttribute of fromAttributes) {
          if (ignoreAttribute(fromAttribute.name, to, "update", ctx)) {
            continue;
          }
          if (to.getAttribute(fromAttribute.name) !== fromAttribute.value) {
            to.setAttribute(fromAttribute.name, fromAttribute.value);
          }
        }
        for (let i = toAttributes.length - 1; 0 <= i; i--) {
          const toAttribute = toAttributes[i];
          if (ignoreAttribute(toAttribute.name, to, "remove", ctx)) {
            continue;
          }
          if (!from.hasAttribute(toAttribute.name)) {
            to.removeAttribute(toAttribute.name);
          }
        }
      }
      if (type === 8 || type === 3) {
        if (to.nodeValue !== from.nodeValue) {
          to.nodeValue = from.nodeValue;
        }
      }
      if (!ignoreValueOfActiveElement(to, ctx)) {
        syncInputValue(from, to, ctx);
      }
    }
    function syncBooleanAttribute(from, to, attributeName, ctx) {
      if (from[attributeName] !== to[attributeName]) {
        let ignoreUpdate = ignoreAttribute(attributeName, to, "update", ctx);
        if (!ignoreUpdate) {
          to[attributeName] = from[attributeName];
        }
        if (from[attributeName]) {
          if (!ignoreUpdate) {
            to.setAttribute(attributeName, from[attributeName]);
          }
        } else {
          if (!ignoreAttribute(attributeName, to, "remove", ctx)) {
            to.removeAttribute(attributeName);
          }
        }
      }
    }
    function syncInputValue(from, to, ctx) {
      if (from instanceof HTMLInputElement && to instanceof HTMLInputElement && from.type !== "file") {
        let fromValue = from.value;
        let toValue = to.value;
        syncBooleanAttribute(from, to, "checked", ctx);
        syncBooleanAttribute(from, to, "disabled", ctx);
        if (!from.hasAttribute("value")) {
          if (!ignoreAttribute("value", to, "remove", ctx)) {
            to.value = "";
            to.removeAttribute("value");
          }
        } else if (fromValue !== toValue) {
          if (!ignoreAttribute("value", to, "update", ctx)) {
            to.setAttribute("value", fromValue);
            to.value = fromValue;
          }
        }
      } else if (from instanceof HTMLOptionElement) {
        syncBooleanAttribute(from, to, "selected", ctx);
      } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
        let fromValue = from.value;
        let toValue = to.value;
        if (ignoreAttribute("value", to, "update", ctx)) {
          return;
        }
        if (fromValue !== toValue) {
          to.value = fromValue;
        }
        if (to.firstChild && to.firstChild.nodeValue !== fromValue) {
          to.firstChild.nodeValue = fromValue;
        }
      }
    }
    function handleHeadElement(newHeadTag, currentHead, ctx) {
      let added = [];
      let removed = [];
      let preserved = [];
      let nodesToAppend = [];
      let headMergeStyle = ctx.head.style;
      let srcToNewHeadNodes = /* @__PURE__ */ new Map();
      for (const newHeadChild of newHeadTag.children) {
        srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
      }
      for (const currentHeadElt of currentHead.children) {
        let inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
        let isReAppended = ctx.head.shouldReAppend(currentHeadElt);
        let isPreserved = ctx.head.shouldPreserve(currentHeadElt);
        if (inNewContent || isPreserved) {
          if (isReAppended) {
            removed.push(currentHeadElt);
          } else {
            srcToNewHeadNodes.delete(currentHeadElt.outerHTML);
            preserved.push(currentHeadElt);
          }
        } else {
          if (headMergeStyle === "append") {
            if (isReAppended) {
              removed.push(currentHeadElt);
              nodesToAppend.push(currentHeadElt);
            }
          } else {
            if (ctx.head.shouldRemove(currentHeadElt) !== false) {
              removed.push(currentHeadElt);
            }
          }
        }
      }
      nodesToAppend.push(...srcToNewHeadNodes.values());
      log("to append: ", nodesToAppend);
      let promises = [];
      for (const newNode of nodesToAppend) {
        log("adding: ", newNode);
        let newElt = document.createRange().createContextualFragment(newNode.outerHTML).firstChild;
        log(newElt);
        if (ctx.callbacks.beforeNodeAdded(newElt) !== false) {
          if (newElt.href || newElt.src) {
            let resolve = null;
            let promise = new Promise(function(_resolve) {
              resolve = _resolve;
            });
            newElt.addEventListener("load", function() {
              resolve();
            });
            promises.push(promise);
          }
          currentHead.appendChild(newElt);
          ctx.callbacks.afterNodeAdded(newElt);
          added.push(newElt);
        }
      }
      for (const removedElement of removed) {
        if (ctx.callbacks.beforeNodeRemoved(removedElement) !== false) {
          currentHead.removeChild(removedElement);
          ctx.callbacks.afterNodeRemoved(removedElement);
        }
      }
      ctx.head.afterHeadMorphed(currentHead, { added, kept: preserved, removed });
      return promises;
    }
    function log() {
    }
    function noOp() {
    }
    function mergeDefaults(config) {
      let finalConfig = {};
      Object.assign(finalConfig, defaults);
      Object.assign(finalConfig, config);
      finalConfig.callbacks = {};
      Object.assign(finalConfig.callbacks, defaults.callbacks);
      Object.assign(finalConfig.callbacks, config.callbacks);
      finalConfig.head = {};
      Object.assign(finalConfig.head, defaults.head);
      Object.assign(finalConfig.head, config.head);
      return finalConfig;
    }
    function createMorphContext(oldNode, newContent, config) {
      config = mergeDefaults(config);
      return {
        target: oldNode,
        newContent,
        config,
        morphStyle: config.morphStyle,
        ignoreActive: config.ignoreActive,
        ignoreActiveValue: config.ignoreActiveValue,
        idMap: createIdMap(oldNode, newContent),
        deadIds: /* @__PURE__ */ new Set(),
        callbacks: config.callbacks,
        head: config.head
      };
    }
    function isIdSetMatch(node1, node2, ctx) {
      if (node1 == null || node2 == null) {
        return false;
      }
      if (node1.nodeType === node2.nodeType && node1.tagName === node2.tagName) {
        if (node1.id !== "" && node1.id === node2.id) {
          return true;
        } else {
          return getIdIntersectionCount(ctx, node1, node2) > 0;
        }
      }
      return false;
    }
    function isSoftMatch(node1, node2) {
      if (node1 == null || node2 == null) {
        return false;
      }
      return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName;
    }
    function removeNodesBetween(startInclusive, endExclusive, ctx) {
      while (startInclusive !== endExclusive) {
        let tempNode = startInclusive;
        startInclusive = startInclusive.nextSibling;
        removeNode(tempNode, ctx);
      }
      removeIdsFromConsideration(ctx, endExclusive);
      return endExclusive.nextSibling;
    }
    function findIdSetMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
      let newChildPotentialIdCount = getIdIntersectionCount(ctx, newChild, oldParent);
      let potentialMatch = null;
      if (newChildPotentialIdCount > 0) {
        let potentialMatch2 = insertionPoint;
        let otherMatchCount = 0;
        while (potentialMatch2 != null) {
          if (isIdSetMatch(newChild, potentialMatch2, ctx)) {
            return potentialMatch2;
          }
          otherMatchCount += getIdIntersectionCount(ctx, potentialMatch2, newContent);
          if (otherMatchCount > newChildPotentialIdCount) {
            return null;
          }
          potentialMatch2 = potentialMatch2.nextSibling;
        }
      }
      return potentialMatch;
    }
    function findSoftMatch(newContent, oldParent, newChild, insertionPoint, ctx) {
      let potentialSoftMatch = insertionPoint;
      let nextSibling = newChild.nextSibling;
      let siblingSoftMatchCount = 0;
      while (potentialSoftMatch != null) {
        if (getIdIntersectionCount(ctx, potentialSoftMatch, newContent) > 0) {
          return null;
        }
        if (isSoftMatch(newChild, potentialSoftMatch)) {
          return potentialSoftMatch;
        }
        if (isSoftMatch(nextSibling, potentialSoftMatch)) {
          siblingSoftMatchCount++;
          nextSibling = nextSibling.nextSibling;
          if (siblingSoftMatchCount >= 2) {
            return null;
          }
        }
        potentialSoftMatch = potentialSoftMatch.nextSibling;
      }
      return potentialSoftMatch;
    }
    function parseContent(newContent) {
      let parser = new DOMParser();
      let contentWithSvgsRemoved = newContent.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
      if (contentWithSvgsRemoved.match(/<\/html>/) || contentWithSvgsRemoved.match(/<\/head>/) || contentWithSvgsRemoved.match(/<\/body>/)) {
        let content = parser.parseFromString(newContent, "text/html");
        if (contentWithSvgsRemoved.match(/<\/html>/)) {
          content.generatedByIdiomorph = true;
          return content;
        } else {
          let htmlElement = content.firstChild;
          if (htmlElement) {
            htmlElement.generatedByIdiomorph = true;
            return htmlElement;
          } else {
            return null;
          }
        }
      } else {
        let responseDoc = parser.parseFromString("<body><template>" + newContent + "</template></body>", "text/html");
        let content = responseDoc.body.querySelector("template").content;
        content.generatedByIdiomorph = true;
        return content;
      }
    }
    function normalizeContent(newContent) {
      if (newContent == null) {
        const dummyParent = document.createElement("div");
        return dummyParent;
      } else if (newContent.generatedByIdiomorph) {
        return newContent;
      } else if (newContent instanceof Node) {
        const dummyParent = document.createElement("div");
        dummyParent.append(newContent);
        return dummyParent;
      } else {
        const dummyParent = document.createElement("div");
        for (const elt of [...newContent]) {
          dummyParent.append(elt);
        }
        return dummyParent;
      }
    }
    function insertSiblings(previousSibling, morphedNode, nextSibling) {
      let stack = [];
      let added = [];
      while (previousSibling != null) {
        stack.push(previousSibling);
        previousSibling = previousSibling.previousSibling;
      }
      while (stack.length > 0) {
        let node = stack.pop();
        added.push(node);
        morphedNode.parentElement.insertBefore(node, morphedNode);
      }
      added.push(morphedNode);
      while (nextSibling != null) {
        stack.push(nextSibling);
        added.push(nextSibling);
        nextSibling = nextSibling.nextSibling;
      }
      while (stack.length > 0) {
        morphedNode.parentElement.insertBefore(stack.pop(), morphedNode.nextSibling);
      }
      return added;
    }
    function findBestNodeMatch(newContent, oldNode, ctx) {
      let currentElement;
      currentElement = newContent.firstChild;
      let bestElement = currentElement;
      let score = 0;
      while (currentElement) {
        let newScore = scoreElement(currentElement, oldNode, ctx);
        if (newScore > score) {
          bestElement = currentElement;
          score = newScore;
        }
        currentElement = currentElement.nextSibling;
      }
      return bestElement;
    }
    function scoreElement(node1, node2, ctx) {
      if (isSoftMatch(node1, node2)) {
        return 0.5 + getIdIntersectionCount(ctx, node1, node2);
      }
      return 0;
    }
    function removeNode(tempNode, ctx) {
      removeIdsFromConsideration(ctx, tempNode);
      if (ctx.callbacks.beforeNodeRemoved(tempNode) === false) return;
      tempNode.remove();
      ctx.callbacks.afterNodeRemoved(tempNode);
    }
    function isIdInConsideration(ctx, id) {
      return !ctx.deadIds.has(id);
    }
    function idIsWithinNode(ctx, id, targetNode) {
      let idSet = ctx.idMap.get(targetNode) || EMPTY_SET;
      return idSet.has(id);
    }
    function removeIdsFromConsideration(ctx, node) {
      let idSet = ctx.idMap.get(node) || EMPTY_SET;
      for (const id of idSet) {
        ctx.deadIds.add(id);
      }
    }
    function getIdIntersectionCount(ctx, node1, node2) {
      let sourceSet = ctx.idMap.get(node1) || EMPTY_SET;
      let matchCount = 0;
      for (const id of sourceSet) {
        if (isIdInConsideration(ctx, id) && idIsWithinNode(ctx, id, node2)) {
          ++matchCount;
        }
      }
      return matchCount;
    }
    function populateIdMapForNode(node, idMap) {
      let nodeParent = node.parentElement;
      let idElements = node.querySelectorAll("[id]");
      for (const elt of idElements) {
        let current = elt;
        while (current !== nodeParent && current != null) {
          let idSet = idMap.get(current);
          if (idSet == null) {
            idSet = /* @__PURE__ */ new Set();
            idMap.set(current, idSet);
          }
          idSet.add(elt.id);
          current = current.parentElement;
        }
      }
    }
    function createIdMap(oldContent, newContent) {
      let idMap = /* @__PURE__ */ new Map();
      populateIdMapForNode(oldContent, idMap);
      populateIdMapForNode(newContent, idMap);
      return idMap;
    }
    return {
      morph,
      defaults
    };
  }();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/page_renderer.js
  var _PageRenderer_instances, setLanguage_fn;
  var PageRenderer = class extends Renderer {
    constructor() {
      super(...arguments);
      __privateAdd(this, _PageRenderer_instances);
    }
    static renderElement(currentElement, newElement) {
      if (document.body && newElement instanceof HTMLBodyElement) {
        document.body.replaceWith(newElement);
      } else {
        document.documentElement.appendChild(newElement);
      }
    }
    get shouldRender() {
      return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
    }
    get reloadReason() {
      if (!this.newSnapshot.isVisitable) {
        return {
          reason: "turbo_visit_control_is_reload"
        };
      }
      if (!this.trackedElementsAreIdentical) {
        return {
          reason: "tracked_element_mismatch"
        };
      }
    }
    async prepareToRender() {
      __privateMethod(this, _PageRenderer_instances, setLanguage_fn).call(this);
      await this.mergeHead();
    }
    async render() {
      if (this.willRender) {
        await this.replaceBody();
      }
    }
    finishRendering() {
      super.finishRendering();
      if (!this.isPreview) {
        this.focusFirstAutofocusableElement();
      }
    }
    get currentHeadSnapshot() {
      return this.currentSnapshot.headSnapshot;
    }
    get newHeadSnapshot() {
      return this.newSnapshot.headSnapshot;
    }
    get newElement() {
      return this.newSnapshot.element;
    }
    async mergeHead() {
      const mergedHeadElements = this.mergeProvisionalElements();
      const newStylesheetElements = this.copyNewHeadStylesheetElements();
      this.copyNewHeadScriptElements();
      await mergedHeadElements;
      await newStylesheetElements;
      if (this.willRender) {
        this.removeUnusedDynamicStylesheetElements();
      }
    }
    async replaceBody() {
      await this.preservingPermanentElements(async () => {
        this.activateNewBody();
        await this.assignNewBody();
      });
    }
    get trackedElementsAreIdentical() {
      return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature;
    }
    async copyNewHeadStylesheetElements() {
      const loadingElements = [];
      for (const element of this.newHeadStylesheetElements) {
        loadingElements.push(waitForLoad(element));
        document.head.appendChild(element);
      }
      await Promise.all(loadingElements);
    }
    copyNewHeadScriptElements() {
      for (const element of this.newHeadScriptElements) {
        document.head.appendChild(activateScriptElement(element));
      }
    }
    removeUnusedDynamicStylesheetElements() {
      for (const element of this.unusedDynamicStylesheetElements) {
        document.head.removeChild(element);
      }
    }
    async mergeProvisionalElements() {
      const newHeadElements = [...this.newHeadProvisionalElements];
      for (const element of this.currentHeadProvisionalElements) {
        if (!this.isCurrentElementInElementList(element, newHeadElements)) {
          document.head.removeChild(element);
        }
      }
      for (const element of newHeadElements) {
        document.head.appendChild(element);
      }
    }
    isCurrentElementInElementList(element, elementList) {
      for (const [index, newElement] of elementList.entries()) {
        if (element.tagName == "TITLE") {
          if (newElement.tagName != "TITLE") {
            continue;
          }
          if (element.innerHTML == newElement.innerHTML) {
            elementList.splice(index, 1);
            return true;
          }
        }
        if (newElement.isEqualNode(element)) {
          elementList.splice(index, 1);
          return true;
        }
      }
      return false;
    }
    removeCurrentHeadProvisionalElements() {
      for (const element of this.currentHeadProvisionalElements) {
        document.head.removeChild(element);
      }
    }
    copyNewHeadProvisionalElements() {
      for (const element of this.newHeadProvisionalElements) {
        document.head.appendChild(element);
      }
    }
    activateNewBody() {
      document.adoptNode(this.newElement);
      this.activateNewBodyScriptElements();
    }
    activateNewBodyScriptElements() {
      for (const inertScriptElement of this.newBodyScriptElements) {
        const activatedScriptElement = activateScriptElement(inertScriptElement);
        inertScriptElement.replaceWith(activatedScriptElement);
      }
    }
    async assignNewBody() {
      await this.renderElement(this.currentElement, this.newElement);
    }
    get unusedDynamicStylesheetElements() {
      return this.oldHeadStylesheetElements.filter((element) => {
        return element.getAttribute("data-turbo-track") === "dynamic";
      });
    }
    get oldHeadStylesheetElements() {
      return this.currentHeadSnapshot.getStylesheetElementsNotInSnapshot(this.newHeadSnapshot);
    }
    get newHeadStylesheetElements() {
      return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot);
    }
    get newHeadScriptElements() {
      return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot);
    }
    get currentHeadProvisionalElements() {
      return this.currentHeadSnapshot.provisionalElements;
    }
    get newHeadProvisionalElements() {
      return this.newHeadSnapshot.provisionalElements;
    }
    get newBodyScriptElements() {
      return this.newElement.querySelectorAll("script");
    }
  };
  _PageRenderer_instances = new WeakSet();
  setLanguage_fn = function() {
    const { documentElement } = this.currentSnapshot;
    const { lang } = this.newSnapshot;
    if (lang) {
      documentElement.setAttribute("lang", lang);
    } else {
      documentElement.removeAttribute("lang");
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/morph_renderer.js
  var _MorphRenderer_instances, morphBody_fn, morphElements_fn, _shouldAddElement, _shouldMorphElement, _shouldUpdateAttribute, _didMorphElement, _shouldRemoveElement, reloadRemoteFrames_fn, renderFrameWithMorph_fn, _morphFrameUpdate, isFrameReloadedWithMorph_fn, remoteFrames_fn;
  var MorphRenderer = class extends PageRenderer {
    constructor() {
      super(...arguments);
      __privateAdd(this, _MorphRenderer_instances);
      __privateAdd(this, _shouldAddElement, (node) => {
        return !(node.id && node.hasAttribute("data-turbo-permanent") && document.getElementById(node.id));
      });
      __privateAdd(this, _shouldMorphElement, (oldNode, newNode) => {
        if (oldNode instanceof HTMLElement) {
          if (!oldNode.hasAttribute("data-turbo-permanent") && (this.isMorphingTurboFrame || !__privateMethod(this, _MorphRenderer_instances, isFrameReloadedWithMorph_fn).call(this, oldNode))) {
            const event = dispatch("turbo:before-morph-element", {
              cancelable: true,
              target: oldNode,
              detail: {
                newElement: newNode
              }
            });
            return !event.defaultPrevented;
          } else {
            return false;
          }
        }
      });
      __privateAdd(this, _shouldUpdateAttribute, (attributeName, target, mutationType) => {
        const event = dispatch("turbo:before-morph-attribute", { cancelable: true, target, detail: { attributeName, mutationType } });
        return !event.defaultPrevented;
      });
      __privateAdd(this, _didMorphElement, (oldNode, newNode) => {
        if (newNode instanceof HTMLElement) {
          dispatch("turbo:morph-element", {
            target: oldNode,
            detail: {
              newElement: newNode
            }
          });
        }
      });
      __privateAdd(this, _shouldRemoveElement, (node) => {
        return __privateGet(this, _shouldMorphElement).call(this, node);
      });
      __privateAdd(this, _morphFrameUpdate, (currentElement, newElement) => {
        dispatch("turbo:before-frame-morph", {
          target: currentElement,
          detail: { currentElement, newElement }
        });
        __privateMethod(this, _MorphRenderer_instances, morphElements_fn).call(this, currentElement, newElement.children, "innerHTML");
      });
    }
    async render() {
      if (this.willRender) await __privateMethod(this, _MorphRenderer_instances, morphBody_fn).call(this);
    }
    get renderMethod() {
      return "morph";
    }
  };
  _MorphRenderer_instances = new WeakSet();
  morphBody_fn = async function() {
    __privateMethod(this, _MorphRenderer_instances, morphElements_fn).call(this, this.currentElement, this.newElement);
    __privateMethod(this, _MorphRenderer_instances, reloadRemoteFrames_fn).call(this);
    dispatch("turbo:morph", {
      detail: {
        currentElement: this.currentElement,
        newElement: this.newElement
      }
    });
  };
  morphElements_fn = function(currentElement, newElement, morphStyle = "outerHTML") {
    this.isMorphingTurboFrame = __privateMethod(this, _MorphRenderer_instances, isFrameReloadedWithMorph_fn).call(this, currentElement);
    Idiomorph.morph(currentElement, newElement, {
      morphStyle,
      callbacks: {
        beforeNodeAdded: __privateGet(this, _shouldAddElement),
        beforeNodeMorphed: __privateGet(this, _shouldMorphElement),
        beforeAttributeUpdated: __privateGet(this, _shouldUpdateAttribute),
        beforeNodeRemoved: __privateGet(this, _shouldRemoveElement),
        afterNodeMorphed: __privateGet(this, _didMorphElement)
      }
    });
  };
  _shouldAddElement = new WeakMap();
  _shouldMorphElement = new WeakMap();
  _shouldUpdateAttribute = new WeakMap();
  _didMorphElement = new WeakMap();
  _shouldRemoveElement = new WeakMap();
  reloadRemoteFrames_fn = function() {
    __privateMethod(this, _MorphRenderer_instances, remoteFrames_fn).call(this).forEach((frame) => {
      if (__privateMethod(this, _MorphRenderer_instances, isFrameReloadedWithMorph_fn).call(this, frame)) {
        __privateMethod(this, _MorphRenderer_instances, renderFrameWithMorph_fn).call(this, frame);
        frame.reload();
      }
    });
  };
  renderFrameWithMorph_fn = function(frame) {
    frame.addEventListener("turbo:before-frame-render", (event) => {
      event.detail.render = __privateGet(this, _morphFrameUpdate);
    }, { once: true });
  };
  _morphFrameUpdate = new WeakMap();
  isFrameReloadedWithMorph_fn = function(element) {
    return element.src && element.refresh === "morph";
  };
  remoteFrames_fn = function() {
    return Array.from(document.querySelectorAll("turbo-frame[src]")).filter((frame) => {
      return !frame.closest("[data-turbo-permanent]");
    });
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/snapshot_cache.js
  var SnapshotCache = class {
    constructor(size) {
      __publicField(this, "keys", []);
      __publicField(this, "snapshots", {});
      this.size = size;
    }
    has(location2) {
      return toCacheKey(location2) in this.snapshots;
    }
    get(location2) {
      if (this.has(location2)) {
        const snapshot = this.read(location2);
        this.touch(location2);
        return snapshot;
      }
    }
    put(location2, snapshot) {
      this.write(location2, snapshot);
      this.touch(location2);
      return snapshot;
    }
    clear() {
      this.snapshots = {};
    }
    // Private
    read(location2) {
      return this.snapshots[toCacheKey(location2)];
    }
    write(location2, snapshot) {
      this.snapshots[toCacheKey(location2)] = snapshot;
    }
    touch(location2) {
      const key = toCacheKey(location2);
      const index = this.keys.indexOf(key);
      if (index > -1) this.keys.splice(index, 1);
      this.keys.unshift(key);
      this.trim();
    }
    trim() {
      for (const key of this.keys.splice(this.size)) {
        delete this.snapshots[key];
      }
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/page_view.js
  var PageView = class extends View {
    constructor() {
      super(...arguments);
      __publicField(this, "snapshotCache", new SnapshotCache(10));
      __publicField(this, "lastRenderedLocation", new URL(location.href));
      __publicField(this, "forceReloaded", false);
    }
    shouldTransitionTo(newSnapshot) {
      return this.snapshot.prefersViewTransitions && newSnapshot.prefersViewTransitions;
    }
    renderPage(snapshot, isPreview = false, willRender = true, visit2) {
      const shouldMorphPage = this.isPageRefresh(visit2) && this.snapshot.shouldMorphPage;
      const rendererClass = shouldMorphPage ? MorphRenderer : PageRenderer;
      const renderer = new rendererClass(this.snapshot, snapshot, PageRenderer.renderElement, isPreview, willRender);
      if (!renderer.shouldRender) {
        this.forceReloaded = true;
      } else {
        visit2 == null ? void 0 : visit2.changeHistory();
      }
      return this.render(renderer);
    }
    renderError(snapshot, visit2) {
      visit2 == null ? void 0 : visit2.changeHistory();
      const renderer = new ErrorRenderer(this.snapshot, snapshot, ErrorRenderer.renderElement, false);
      return this.render(renderer);
    }
    clearSnapshotCache() {
      this.snapshotCache.clear();
    }
    async cacheSnapshot(snapshot = this.snapshot) {
      if (snapshot.isCacheable) {
        this.delegate.viewWillCacheSnapshot();
        const { lastRenderedLocation: location2 } = this;
        await nextEventLoopTick();
        const cachedSnapshot = snapshot.clone();
        this.snapshotCache.put(location2, cachedSnapshot);
        return cachedSnapshot;
      }
    }
    getCachedSnapshotForLocation(location2) {
      return this.snapshotCache.get(location2);
    }
    isPageRefresh(visit2) {
      return !visit2 || this.lastRenderedLocation.pathname === visit2.location.pathname && visit2.action === "replace";
    }
    shouldPreserveScrollPosition(visit2) {
      return this.isPageRefresh(visit2) && this.snapshot.shouldPreserveScrollPosition;
    }
    get snapshot() {
      return PageSnapshot.fromElement(this.element);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/drive/preloader.js
  var _preloadAll;
  var Preloader = class {
    constructor(delegate, snapshotCache) {
      __publicField(this, "selector", "a[data-turbo-preload]");
      __privateAdd(this, _preloadAll, () => {
        this.preloadOnLoadLinksForView(document.body);
      });
      this.delegate = delegate;
      this.snapshotCache = snapshotCache;
    }
    start() {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", __privateGet(this, _preloadAll));
      } else {
        this.preloadOnLoadLinksForView(document.body);
      }
    }
    stop() {
      document.removeEventListener("DOMContentLoaded", __privateGet(this, _preloadAll));
    }
    preloadOnLoadLinksForView(element) {
      for (const link of element.querySelectorAll(this.selector)) {
        if (this.delegate.shouldPreloadLink(link)) {
          this.preloadURL(link);
        }
      }
    }
    async preloadURL(link) {
      const location2 = new URL(link.href);
      if (this.snapshotCache.has(location2)) {
        return;
      }
      const fetchRequest = new FetchRequest(this, FetchMethod.get, location2, new URLSearchParams(), link);
      await fetchRequest.perform();
    }
    // Fetch request delegate
    prepareRequest(fetchRequest) {
      fetchRequest.headers["X-Sec-Purpose"] = "prefetch";
    }
    async requestSucceededWithResponse(fetchRequest, fetchResponse) {
      try {
        const responseHTML = await fetchResponse.responseHTML;
        const snapshot = PageSnapshot.fromHTMLString(responseHTML);
        this.snapshotCache.put(fetchRequest.url, snapshot);
      } catch (_) {
      }
    }
    requestStarted(fetchRequest) {
    }
    requestErrored(fetchRequest) {
    }
    requestFinished(fetchRequest) {
    }
    requestPreventedHandlingResponse(fetchRequest, fetchResponse) {
    }
    requestFailedWithResponse(fetchRequest, fetchResponse) {
    }
  };
  _preloadAll = new WeakMap();

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/cache.js
  var _Cache_instances, setCacheControl_fn;
  var Cache = class {
    constructor(session2) {
      __privateAdd(this, _Cache_instances);
      this.session = session2;
    }
    clear() {
      this.session.clearCache();
    }
    resetCacheControl() {
      __privateMethod(this, _Cache_instances, setCacheControl_fn).call(this, "");
    }
    exemptPageFromCache() {
      __privateMethod(this, _Cache_instances, setCacheControl_fn).call(this, "no-cache");
    }
    exemptPageFromPreview() {
      __privateMethod(this, _Cache_instances, setCacheControl_fn).call(this, "no-preview");
    }
  };
  _Cache_instances = new WeakSet();
  setCacheControl_fn = function(value) {
    setMetaContent("turbo-cache-control", value);
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/session.js
  var _pageRefreshDebouncePeriod;
  var Session = class {
    constructor(recentRequests2) {
      __publicField(this, "navigator", new Navigator(this));
      __publicField(this, "history", new History(this));
      __publicField(this, "view", new PageView(this, document.documentElement));
      __publicField(this, "adapter", new BrowserAdapter(this));
      __publicField(this, "pageObserver", new PageObserver(this));
      __publicField(this, "cacheObserver", new CacheObserver());
      __publicField(this, "linkPrefetchObserver", new LinkPrefetchObserver(this, document));
      __publicField(this, "linkClickObserver", new LinkClickObserver(this, window));
      __publicField(this, "formSubmitObserver", new FormSubmitObserver(this, document));
      __publicField(this, "scrollObserver", new ScrollObserver(this));
      __publicField(this, "streamObserver", new StreamObserver(this));
      __publicField(this, "formLinkClickObserver", new FormLinkClickObserver(this, document.documentElement));
      __publicField(this, "frameRedirector", new FrameRedirector(this, document.documentElement));
      __publicField(this, "streamMessageRenderer", new StreamMessageRenderer());
      __publicField(this, "cache", new Cache(this));
      __publicField(this, "drive", true);
      __publicField(this, "enabled", true);
      __publicField(this, "progressBarDelay", 500);
      __publicField(this, "started", false);
      __publicField(this, "formMode", "on");
      __privateAdd(this, _pageRefreshDebouncePeriod, 150);
      this.recentRequests = recentRequests2;
      this.preloader = new Preloader(this, this.view.snapshotCache);
      this.debouncedRefresh = this.refresh;
      this.pageRefreshDebouncePeriod = this.pageRefreshDebouncePeriod;
    }
    start() {
      if (!this.started) {
        this.pageObserver.start();
        this.cacheObserver.start();
        this.linkPrefetchObserver.start();
        this.formLinkClickObserver.start();
        this.linkClickObserver.start();
        this.formSubmitObserver.start();
        this.scrollObserver.start();
        this.streamObserver.start();
        this.frameRedirector.start();
        this.history.start();
        this.preloader.start();
        this.started = true;
        this.enabled = true;
      }
    }
    disable() {
      this.enabled = false;
    }
    stop() {
      if (this.started) {
        this.pageObserver.stop();
        this.cacheObserver.stop();
        this.linkPrefetchObserver.stop();
        this.formLinkClickObserver.stop();
        this.linkClickObserver.stop();
        this.formSubmitObserver.stop();
        this.scrollObserver.stop();
        this.streamObserver.stop();
        this.frameRedirector.stop();
        this.history.stop();
        this.preloader.stop();
        this.started = false;
      }
    }
    registerAdapter(adapter) {
      this.adapter = adapter;
    }
    visit(location2, options = {}) {
      const frameElement = options.frame ? document.getElementById(options.frame) : null;
      if (frameElement instanceof FrameElement) {
        const action = options.action || getVisitAction(frameElement);
        frameElement.delegate.proposeVisitIfNavigatedWithAction(frameElement, action);
        frameElement.src = location2.toString();
      } else {
        this.navigator.proposeVisit(expandURL(location2), options);
      }
    }
    refresh(url, requestId) {
      const isRecentRequest = requestId && this.recentRequests.has(requestId);
      if (!isRecentRequest) {
        this.visit(url, { action: "replace", shouldCacheSnapshot: false });
      }
    }
    connectStreamSource(source) {
      this.streamObserver.connectStreamSource(source);
    }
    disconnectStreamSource(source) {
      this.streamObserver.disconnectStreamSource(source);
    }
    renderStreamMessage(message) {
      this.streamMessageRenderer.render(StreamMessage.wrap(message));
    }
    clearCache() {
      this.view.clearSnapshotCache();
    }
    setProgressBarDelay(delay) {
      this.progressBarDelay = delay;
    }
    setFormMode(mode) {
      this.formMode = mode;
    }
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
    get pageRefreshDebouncePeriod() {
      return __privateGet(this, _pageRefreshDebouncePeriod);
    }
    set pageRefreshDebouncePeriod(value) {
      this.refresh = debounce(this.debouncedRefresh.bind(this), value);
      __privateSet(this, _pageRefreshDebouncePeriod, value);
    }
    // Preloader delegate
    shouldPreloadLink(element) {
      const isUnsafe = element.hasAttribute("data-turbo-method");
      const isStream = element.hasAttribute("data-turbo-stream");
      const frameTarget = element.getAttribute("data-turbo-frame");
      const frame = frameTarget == "_top" ? null : document.getElementById(frameTarget) || findClosestRecursively(element, "turbo-frame:not([disabled])");
      if (isUnsafe || isStream || frame instanceof FrameElement) {
        return false;
      } else {
        const location2 = new URL(element.href);
        return this.elementIsNavigatable(element) && locationIsVisitable(location2, this.snapshot.rootLocation);
      }
    }
    // History delegate
    historyPoppedToLocationWithRestorationIdentifierAndDirection(location2, restorationIdentifier, direction) {
      if (this.enabled) {
        this.navigator.startVisit(location2, restorationIdentifier, {
          action: "restore",
          historyChanged: true,
          direction
        });
      } else {
        this.adapter.pageInvalidated({
          reason: "turbo_disabled"
        });
      }
    }
    // Scroll observer delegate
    scrollPositionChanged(position) {
      this.history.updateRestorationData({ scrollPosition: position });
    }
    // Form click observer delegate
    willSubmitFormLinkToLocation(link, location2) {
      return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation);
    }
    submittedFormLinkToLocation() {
    }
    // Link hover observer delegate
    canPrefetchRequestToLocation(link, location2) {
      return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation);
    }
    // Link click observer delegate
    willFollowLinkToLocation(link, location2, event) {
      return this.elementIsNavigatable(link) && locationIsVisitable(location2, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(link, location2, event);
    }
    followedLinkToLocation(link, location2) {
      const action = this.getActionForLink(link);
      const acceptsStreamResponse = link.hasAttribute("data-turbo-stream");
      this.visit(location2.href, { action, acceptsStreamResponse });
    }
    // Navigator delegate
    allowsVisitingLocationWithAction(location2, action) {
      return this.locationWithActionIsSamePage(location2, action) || this.applicationAllowsVisitingLocation(location2);
    }
    visitProposedToLocation(location2, options) {
      extendURLWithDeprecatedProperties(location2);
      this.adapter.visitProposedToLocation(location2, options);
    }
    // Visit delegate
    visitStarted(visit2) {
      if (!visit2.acceptsStreamResponse) {
        markAsBusy(document.documentElement);
        this.view.markVisitDirection(visit2.direction);
      }
      extendURLWithDeprecatedProperties(visit2.location);
      if (!visit2.silent) {
        this.notifyApplicationAfterVisitingLocation(visit2.location, visit2.action);
      }
    }
    visitCompleted(visit2) {
      this.view.unmarkVisitDirection();
      clearBusyState(document.documentElement);
      this.notifyApplicationAfterPageLoad(visit2.getTimingMetrics());
    }
    locationWithActionIsSamePage(location2, action) {
      return this.navigator.locationWithActionIsSamePage(location2, action);
    }
    visitScrolledToSamePageLocation(oldURL, newURL) {
      this.notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL);
    }
    // Form submit observer delegate
    willSubmitForm(form, submitter) {
      const action = getAction(form, submitter);
      return this.submissionIsNavigatable(form, submitter) && locationIsVisitable(expandURL(action), this.snapshot.rootLocation);
    }
    formSubmitted(form, submitter) {
      this.navigator.submitForm(form, submitter);
    }
    // Page observer delegate
    pageBecameInteractive() {
      this.view.lastRenderedLocation = this.location;
      this.notifyApplicationAfterPageLoad();
    }
    pageLoaded() {
      this.history.assumeControlOfScrollRestoration();
    }
    pageWillUnload() {
      this.history.relinquishControlOfScrollRestoration();
    }
    // Stream observer delegate
    receivedMessageFromStream(message) {
      this.renderStreamMessage(message);
    }
    // Page view delegate
    viewWillCacheSnapshot() {
      var _a;
      if (!((_a = this.navigator.currentVisit) == null ? void 0 : _a.silent)) {
        this.notifyApplicationBeforeCachingSnapshot();
      }
    }
    allowsImmediateRender({ element }, options) {
      const event = this.notifyApplicationBeforeRender(element, options);
      const {
        defaultPrevented,
        detail: { render }
      } = event;
      if (this.view.renderer && render) {
        this.view.renderer.renderElement = render;
      }
      return !defaultPrevented;
    }
    viewRenderedSnapshot(_snapshot, _isPreview, renderMethod) {
      this.view.lastRenderedLocation = this.history.location;
      this.notifyApplicationAfterRender(renderMethod);
    }
    preloadOnLoadLinksForView(element) {
      this.preloader.preloadOnLoadLinksForView(element);
    }
    viewInvalidated(reason) {
      this.adapter.pageInvalidated(reason);
    }
    // Frame element
    frameLoaded(frame) {
      this.notifyApplicationAfterFrameLoad(frame);
    }
    frameRendered(fetchResponse, frame) {
      this.notifyApplicationAfterFrameRender(fetchResponse, frame);
    }
    // Application events
    applicationAllowsFollowingLinkToLocation(link, location2, ev) {
      const event = this.notifyApplicationAfterClickingLinkToLocation(link, location2, ev);
      return !event.defaultPrevented;
    }
    applicationAllowsVisitingLocation(location2) {
      const event = this.notifyApplicationBeforeVisitingLocation(location2);
      return !event.defaultPrevented;
    }
    notifyApplicationAfterClickingLinkToLocation(link, location2, event) {
      return dispatch("turbo:click", {
        target: link,
        detail: { url: location2.href, originalEvent: event },
        cancelable: true
      });
    }
    notifyApplicationBeforeVisitingLocation(location2) {
      return dispatch("turbo:before-visit", {
        detail: { url: location2.href },
        cancelable: true
      });
    }
    notifyApplicationAfterVisitingLocation(location2, action) {
      return dispatch("turbo:visit", { detail: { url: location2.href, action } });
    }
    notifyApplicationBeforeCachingSnapshot() {
      return dispatch("turbo:before-cache");
    }
    notifyApplicationBeforeRender(newBody, options) {
      return dispatch("turbo:before-render", {
        detail: __spreadValues({ newBody }, options),
        cancelable: true
      });
    }
    notifyApplicationAfterRender(renderMethod) {
      return dispatch("turbo:render", { detail: { renderMethod } });
    }
    notifyApplicationAfterPageLoad(timing = {}) {
      return dispatch("turbo:load", {
        detail: { url: this.location.href, timing }
      });
    }
    notifyApplicationAfterVisitingSamePageLocation(oldURL, newURL) {
      dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: oldURL.toString(),
          newURL: newURL.toString()
        })
      );
    }
    notifyApplicationAfterFrameLoad(frame) {
      return dispatch("turbo:frame-load", { target: frame });
    }
    notifyApplicationAfterFrameRender(fetchResponse, frame) {
      return dispatch("turbo:frame-render", {
        detail: { fetchResponse },
        target: frame,
        cancelable: true
      });
    }
    // Helpers
    submissionIsNavigatable(form, submitter) {
      if (this.formMode == "off") {
        return false;
      } else {
        const submitterIsNavigatable = submitter ? this.elementIsNavigatable(submitter) : true;
        if (this.formMode == "optin") {
          return submitterIsNavigatable && form.closest('[data-turbo="true"]') != null;
        } else {
          return submitterIsNavigatable && this.elementIsNavigatable(form);
        }
      }
    }
    elementIsNavigatable(element) {
      const container = findClosestRecursively(element, "[data-turbo]");
      const withinFrame = findClosestRecursively(element, "turbo-frame");
      if (this.drive || withinFrame) {
        if (container) {
          return container.getAttribute("data-turbo") != "false";
        } else {
          return true;
        }
      } else {
        if (container) {
          return container.getAttribute("data-turbo") == "true";
        } else {
          return false;
        }
      }
    }
    // Private
    getActionForLink(link) {
      return getVisitAction(link) || "advance";
    }
    get snapshot() {
      return this.view.snapshot;
    }
  };
  _pageRefreshDebouncePeriod = new WeakMap();
  function extendURLWithDeprecatedProperties(url) {
    Object.defineProperties(url, deprecatedLocationPropertyDescriptors);
  }
  var deprecatedLocationPropertyDescriptors = {
    absoluteURL: {
      get() {
        return this.toString();
      }
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/index.js
  var session = new Session(recentRequests);
  var { cache, navigator: navigator2 } = session;
  function start() {
    session.start();
  }
  function registerAdapter(adapter) {
    session.registerAdapter(adapter);
  }
  function visit(location2, options) {
    session.visit(location2, options);
  }
  function connectStreamSource(source) {
    session.connectStreamSource(source);
  }
  function disconnectStreamSource(source) {
    session.disconnectStreamSource(source);
  }
  function renderStreamMessage(message) {
    session.renderStreamMessage(message);
  }
  function clearCache() {
    console.warn(
      "Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
    );
    session.clearCache();
  }
  function setProgressBarDelay(delay) {
    session.setProgressBarDelay(delay);
  }
  function setConfirmMethod(confirmMethod) {
    FormSubmission.confirmMethod = confirmMethod;
  }
  function setFormMode(mode) {
    session.setFormMode(mode);
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/errors.js
  var TurboFrameMissingError = class extends Error {
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/frames/frame_controller.js
  var _currentFetchRequest, _resolveVisitPromise, _connected, _hasBeenLoaded, _ignoredAttributes, _FrameController_instances, loadSourceURL_fn, loadFrameResponse_fn, visit_fn, navigateFrame_fn, handleUnvisitableFrameResponse_fn, willHandleFrameMissingFromResponse_fn, handleFrameMissingFromResponse_fn, throwFrameMissingError_fn, visitResponse_fn, findFrameElement_fn2, formActionIsVisitable_fn, shouldInterceptNavigation_fn, isIgnoringChangesTo_fn, ignoringChangesToAttribute_fn, withCurrentNavigationElement_fn;
  var FrameController = class {
    constructor(element) {
      __privateAdd(this, _FrameController_instances);
      __publicField(this, "fetchResponseLoaded", (_fetchResponse) => Promise.resolve());
      __privateAdd(this, _currentFetchRequest, null);
      __privateAdd(this, _resolveVisitPromise, () => {
      });
      __privateAdd(this, _connected, false);
      __privateAdd(this, _hasBeenLoaded, false);
      __privateAdd(this, _ignoredAttributes, /* @__PURE__ */ new Set());
      __publicField(this, "action", null);
      __publicField(this, "visitCachedSnapshot", ({ element }) => {
        const frame = element.querySelector("#" + this.element.id);
        if (frame && this.previousFrameElement) {
          frame.replaceChildren(...this.previousFrameElement.children);
        }
        delete this.previousFrameElement;
      });
      this.element = element;
      this.view = new FrameView(this, this.element);
      this.appearanceObserver = new AppearanceObserver(this, this.element);
      this.formLinkClickObserver = new FormLinkClickObserver(this, this.element);
      this.linkInterceptor = new LinkInterceptor(this, this.element);
      this.restorationIdentifier = uuid();
      this.formSubmitObserver = new FormSubmitObserver(this, this.element);
    }
    // Frame delegate
    connect() {
      if (!__privateGet(this, _connected)) {
        __privateSet(this, _connected, true);
        if (this.loadingStyle == FrameLoadingStyle.lazy) {
          this.appearanceObserver.start();
        } else {
          __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
        }
        this.formLinkClickObserver.start();
        this.linkInterceptor.start();
        this.formSubmitObserver.start();
      }
    }
    disconnect() {
      if (__privateGet(this, _connected)) {
        __privateSet(this, _connected, false);
        this.appearanceObserver.stop();
        this.formLinkClickObserver.stop();
        this.linkInterceptor.stop();
        this.formSubmitObserver.stop();
      }
    }
    disabledChanged() {
      if (this.loadingStyle == FrameLoadingStyle.eager) {
        __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
      }
    }
    sourceURLChanged() {
      if (__privateMethod(this, _FrameController_instances, isIgnoringChangesTo_fn).call(this, "src")) return;
      if (this.element.isConnected) {
        this.complete = false;
      }
      if (this.loadingStyle == FrameLoadingStyle.eager || __privateGet(this, _hasBeenLoaded)) {
        __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
      }
    }
    sourceURLReloaded() {
      const { src } = this.element;
      this.element.removeAttribute("complete");
      this.element.src = null;
      this.element.src = src;
      return this.element.loaded;
    }
    loadingStyleChanged() {
      if (this.loadingStyle == FrameLoadingStyle.lazy) {
        this.appearanceObserver.start();
      } else {
        this.appearanceObserver.stop();
        __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
      }
    }
    async loadResponse(fetchResponse) {
      if (fetchResponse.redirected || fetchResponse.succeeded && fetchResponse.isHTML) {
        this.sourceURL = fetchResponse.response.url;
      }
      try {
        const html = await fetchResponse.responseHTML;
        if (html) {
          const document2 = parseHTMLDocument(html);
          const pageSnapshot = PageSnapshot.fromDocument(document2);
          if (pageSnapshot.isVisitable) {
            await __privateMethod(this, _FrameController_instances, loadFrameResponse_fn).call(this, fetchResponse, document2);
          } else {
            await __privateMethod(this, _FrameController_instances, handleUnvisitableFrameResponse_fn).call(this, fetchResponse);
          }
        }
      } finally {
        this.fetchResponseLoaded = () => Promise.resolve();
      }
    }
    // Appearance observer delegate
    elementAppearedInViewport(element) {
      this.proposeVisitIfNavigatedWithAction(element, getVisitAction(element));
      __privateMethod(this, _FrameController_instances, loadSourceURL_fn).call(this);
    }
    // Form link click observer delegate
    willSubmitFormLinkToLocation(link) {
      return __privateMethod(this, _FrameController_instances, shouldInterceptNavigation_fn).call(this, link);
    }
    submittedFormLinkToLocation(link, _location, form) {
      const frame = __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, link);
      if (frame) form.setAttribute("data-turbo-frame", frame.id);
    }
    // Link interceptor delegate
    shouldInterceptLinkClick(element, _location, _event) {
      return __privateMethod(this, _FrameController_instances, shouldInterceptNavigation_fn).call(this, element);
    }
    linkClickIntercepted(element, location2) {
      __privateMethod(this, _FrameController_instances, navigateFrame_fn).call(this, element, location2);
    }
    // Form submit observer delegate
    willSubmitForm(element, submitter) {
      return element.closest("turbo-frame") == this.element && __privateMethod(this, _FrameController_instances, shouldInterceptNavigation_fn).call(this, element, submitter);
    }
    formSubmitted(element, submitter) {
      if (this.formSubmission) {
        this.formSubmission.stop();
      }
      this.formSubmission = new FormSubmission(this, element, submitter);
      const { fetchRequest } = this.formSubmission;
      this.prepareRequest(fetchRequest);
      this.formSubmission.start();
    }
    // Fetch request delegate
    prepareRequest(request) {
      var _a;
      request.headers["Turbo-Frame"] = this.id;
      if ((_a = this.currentNavigationElement) == null ? void 0 : _a.hasAttribute("data-turbo-stream")) {
        request.acceptResponseType(StreamMessage.contentType);
      }
    }
    requestStarted(_request) {
      markAsBusy(this.element);
    }
    requestPreventedHandlingResponse(_request, _response) {
      __privateGet(this, _resolveVisitPromise).call(this);
    }
    async requestSucceededWithResponse(request, response) {
      await this.loadResponse(response);
      __privateGet(this, _resolveVisitPromise).call(this);
    }
    async requestFailedWithResponse(request, response) {
      await this.loadResponse(response);
      __privateGet(this, _resolveVisitPromise).call(this);
    }
    requestErrored(request, error) {
      console.error(error);
      __privateGet(this, _resolveVisitPromise).call(this);
    }
    requestFinished(_request) {
      clearBusyState(this.element);
    }
    // Form submission delegate
    formSubmissionStarted({ formElement }) {
      markAsBusy(formElement, __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, formElement));
    }
    formSubmissionSucceededWithResponse(formSubmission, response) {
      const frame = __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, formSubmission.formElement, formSubmission.submitter);
      frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(formSubmission.submitter, formSubmission.formElement, frame));
      frame.delegate.loadResponse(response);
      if (!formSubmission.isSafe) {
        session.clearCache();
      }
    }
    formSubmissionFailedWithResponse(formSubmission, fetchResponse) {
      this.element.delegate.loadResponse(fetchResponse);
      session.clearCache();
    }
    formSubmissionErrored(formSubmission, error) {
      console.error(error);
    }
    formSubmissionFinished({ formElement }) {
      clearBusyState(formElement, __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, formElement));
    }
    // View delegate
    allowsImmediateRender({ element: newFrame }, options) {
      const event = dispatch("turbo:before-frame-render", {
        target: this.element,
        detail: __spreadValues({ newFrame }, options),
        cancelable: true
      });
      const {
        defaultPrevented,
        detail: { render }
      } = event;
      if (this.view.renderer && render) {
        this.view.renderer.renderElement = render;
      }
      return !defaultPrevented;
    }
    viewRenderedSnapshot(_snapshot, _isPreview, _renderMethod) {
    }
    preloadOnLoadLinksForView(element) {
      session.preloadOnLoadLinksForView(element);
    }
    viewInvalidated() {
    }
    // Frame renderer delegate
    willRenderFrame(currentElement, _newElement) {
      this.previousFrameElement = currentElement.cloneNode(true);
    }
    proposeVisitIfNavigatedWithAction(frame, action = null) {
      this.action = action;
      if (this.action) {
        const pageSnapshot = PageSnapshot.fromElement(frame).clone();
        const { visitCachedSnapshot } = frame.delegate;
        frame.delegate.fetchResponseLoaded = async (fetchResponse) => {
          if (frame.src) {
            const { statusCode, redirected } = fetchResponse;
            const responseHTML = await fetchResponse.responseHTML;
            const response = { statusCode, redirected, responseHTML };
            const options = {
              response,
              visitCachedSnapshot,
              willRender: false,
              updateHistory: false,
              restorationIdentifier: this.restorationIdentifier,
              snapshot: pageSnapshot
            };
            if (this.action) options.action = this.action;
            session.visit(frame.src, options);
          }
        };
      }
    }
    changeHistory() {
      if (this.action) {
        const method = getHistoryMethodForAction(this.action);
        session.history.update(method, expandURL(this.element.src || ""), this.restorationIdentifier);
      }
    }
    async extractForeignFrameElement(container) {
      let element;
      const id = CSS.escape(this.id);
      try {
        element = activateElement(container.querySelector(`turbo-frame#${id}`), this.sourceURL);
        if (element) {
          return element;
        }
        element = activateElement(container.querySelector(`turbo-frame[src][recurse~=${id}]`), this.sourceURL);
        if (element) {
          await element.loaded;
          return await this.extractForeignFrameElement(element);
        }
      } catch (error) {
        console.error(error);
        return new FrameElement();
      }
      return null;
    }
    // Computed properties
    get id() {
      return this.element.id;
    }
    get enabled() {
      return !this.element.disabled;
    }
    get sourceURL() {
      if (this.element.src) {
        return this.element.src;
      }
    }
    set sourceURL(sourceURL) {
      __privateMethod(this, _FrameController_instances, ignoringChangesToAttribute_fn).call(this, "src", () => {
        this.element.src = sourceURL != null ? sourceURL : null;
      });
    }
    get loadingStyle() {
      return this.element.loading;
    }
    get isLoading() {
      return this.formSubmission !== void 0 || __privateGet(this, _resolveVisitPromise).call(this) !== void 0;
    }
    get complete() {
      return this.element.hasAttribute("complete");
    }
    set complete(value) {
      if (value) {
        this.element.setAttribute("complete", "");
      } else {
        this.element.removeAttribute("complete");
      }
    }
    get isActive() {
      return this.element.isActive && __privateGet(this, _connected);
    }
    get rootLocation() {
      var _a;
      const meta = this.element.ownerDocument.querySelector(`meta[name="turbo-root"]`);
      const root = (_a = meta == null ? void 0 : meta.content) != null ? _a : "/";
      return expandURL(root);
    }
  };
  _currentFetchRequest = new WeakMap();
  _resolveVisitPromise = new WeakMap();
  _connected = new WeakMap();
  _hasBeenLoaded = new WeakMap();
  _ignoredAttributes = new WeakMap();
  _FrameController_instances = new WeakSet();
  loadSourceURL_fn = async function() {
    if (this.enabled && this.isActive && !this.complete && this.sourceURL) {
      this.element.loaded = __privateMethod(this, _FrameController_instances, visit_fn).call(this, expandURL(this.sourceURL));
      this.appearanceObserver.stop();
      await this.element.loaded;
      __privateSet(this, _hasBeenLoaded, true);
    }
  };
  loadFrameResponse_fn = async function(fetchResponse, document2) {
    const newFrameElement = await this.extractForeignFrameElement(document2.body);
    if (newFrameElement) {
      const snapshot = new Snapshot(newFrameElement);
      const renderer = new FrameRenderer(this, this.view.snapshot, snapshot, FrameRenderer.renderElement, false, false);
      if (this.view.renderPromise) await this.view.renderPromise;
      this.changeHistory();
      await this.view.render(renderer);
      this.complete = true;
      session.frameRendered(fetchResponse, this.element);
      session.frameLoaded(this.element);
      await this.fetchResponseLoaded(fetchResponse);
    } else if (__privateMethod(this, _FrameController_instances, willHandleFrameMissingFromResponse_fn).call(this, fetchResponse)) {
      __privateMethod(this, _FrameController_instances, handleFrameMissingFromResponse_fn).call(this, fetchResponse);
    }
  };
  visit_fn = async function(url) {
    var _a;
    const request = new FetchRequest(this, FetchMethod.get, url, new URLSearchParams(), this.element);
    (_a = __privateGet(this, _currentFetchRequest)) == null ? void 0 : _a.cancel();
    __privateSet(this, _currentFetchRequest, request);
    return new Promise((resolve) => {
      __privateSet(this, _resolveVisitPromise, () => {
        __privateSet(this, _resolveVisitPromise, () => {
        });
        __privateSet(this, _currentFetchRequest, null);
        resolve();
      });
      request.perform();
    });
  };
  navigateFrame_fn = function(element, url, submitter) {
    const frame = __privateMethod(this, _FrameController_instances, findFrameElement_fn2).call(this, element, submitter);
    frame.delegate.proposeVisitIfNavigatedWithAction(frame, getVisitAction(submitter, element, frame));
    __privateMethod(this, _FrameController_instances, withCurrentNavigationElement_fn).call(this, element, () => {
      frame.src = url;
    });
  };
  handleUnvisitableFrameResponse_fn = async function(fetchResponse) {
    console.warn(
      `The response (${fetchResponse.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`
    );
    await __privateMethod(this, _FrameController_instances, visitResponse_fn).call(this, fetchResponse.response);
  };
  willHandleFrameMissingFromResponse_fn = function(fetchResponse) {
    this.element.setAttribute("complete", "");
    const response = fetchResponse.response;
    const visit2 = async (url, options) => {
      if (url instanceof Response) {
        __privateMethod(this, _FrameController_instances, visitResponse_fn).call(this, url);
      } else {
        session.visit(url, options);
      }
    };
    const event = dispatch("turbo:frame-missing", {
      target: this.element,
      detail: { response, visit: visit2 },
      cancelable: true
    });
    return !event.defaultPrevented;
  };
  handleFrameMissingFromResponse_fn = function(fetchResponse) {
    this.view.missing();
    __privateMethod(this, _FrameController_instances, throwFrameMissingError_fn).call(this, fetchResponse);
  };
  throwFrameMissingError_fn = function(fetchResponse) {
    const message = `The response (${fetchResponse.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
    throw new TurboFrameMissingError(message);
  };
  visitResponse_fn = async function(response) {
    const wrapped = new FetchResponse(response);
    const responseHTML = await wrapped.responseHTML;
    const { location: location2, redirected, statusCode } = wrapped;
    return session.visit(location2, { response: { redirected, statusCode, responseHTML } });
  };
  findFrameElement_fn2 = function(element, submitter) {
    var _a;
    const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
    return (_a = getFrameElementById(id)) != null ? _a : this.element;
  };
  formActionIsVisitable_fn = function(form, submitter) {
    const action = getAction(form, submitter);
    return locationIsVisitable(expandURL(action), this.rootLocation);
  };
  shouldInterceptNavigation_fn = function(element, submitter) {
    const id = getAttribute("data-turbo-frame", submitter, element) || this.element.getAttribute("target");
    if (element instanceof HTMLFormElement && !__privateMethod(this, _FrameController_instances, formActionIsVisitable_fn).call(this, element, submitter)) {
      return false;
    }
    if (!this.enabled || id == "_top") {
      return false;
    }
    if (id) {
      const frameElement = getFrameElementById(id);
      if (frameElement) {
        return !frameElement.disabled;
      }
    }
    if (!session.elementIsNavigatable(element)) {
      return false;
    }
    if (submitter && !session.elementIsNavigatable(submitter)) {
      return false;
    }
    return true;
  };
  isIgnoringChangesTo_fn = function(attributeName) {
    return __privateGet(this, _ignoredAttributes).has(attributeName);
  };
  ignoringChangesToAttribute_fn = function(attributeName, callback) {
    __privateGet(this, _ignoredAttributes).add(attributeName);
    callback();
    __privateGet(this, _ignoredAttributes).delete(attributeName);
  };
  withCurrentNavigationElement_fn = function(element, callback) {
    this.currentNavigationElement = element;
    callback();
    delete this.currentNavigationElement;
  };
  function getFrameElementById(id) {
    if (id != null) {
      const element = document.getElementById(id);
      if (element instanceof FrameElement) {
        return element;
      }
    }
  }
  function activateElement(element, currentURL) {
    if (element) {
      const src = element.getAttribute("src");
      if (src != null && currentURL != null && urlsAreEqual(src, currentURL)) {
        throw new Error(`Matching <turbo-frame id="${element.id}"> element has a source URL which references itself`);
      }
      if (element.ownerDocument !== document) {
        element = document.importNode(element, true);
      }
      if (element instanceof FrameElement) {
        element.connectedCallback();
        element.disconnectedCallback();
        return element;
      }
    }
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/core/streams/stream_actions.js
  var StreamActions = {
    after() {
      this.targetElements.forEach((e) => {
        var _a;
        return (_a = e.parentElement) == null ? void 0 : _a.insertBefore(this.templateContent, e.nextSibling);
      });
    },
    append() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.append(this.templateContent));
    },
    before() {
      this.targetElements.forEach((e) => {
        var _a;
        return (_a = e.parentElement) == null ? void 0 : _a.insertBefore(this.templateContent, e);
      });
    },
    prepend() {
      this.removeDuplicateTargetChildren();
      this.targetElements.forEach((e) => e.prepend(this.templateContent));
    },
    remove() {
      this.targetElements.forEach((e) => e.remove());
    },
    replace() {
      this.targetElements.forEach((e) => e.replaceWith(this.templateContent));
    },
    update() {
      this.targetElements.forEach((targetElement) => {
        targetElement.innerHTML = "";
        targetElement.append(this.templateContent);
      });
    },
    refresh() {
      session.refresh(this.baseURI, this.requestId);
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/elements/stream_element.js
  var _StreamElement_instances, raise_fn;
  var _StreamElement = class _StreamElement extends HTMLElement {
    constructor() {
      super(...arguments);
      __privateAdd(this, _StreamElement_instances);
    }
    static async renderElement(newElement) {
      await newElement.performAction();
    }
    async connectedCallback() {
      try {
        await this.render();
      } catch (error) {
        console.error(error);
      } finally {
        this.disconnect();
      }
    }
    async render() {
      var _a;
      return (_a = this.renderPromise) != null ? _a : this.renderPromise = (async () => {
        const event = this.beforeRenderEvent;
        if (this.dispatchEvent(event)) {
          await nextRepaint();
          await event.detail.render(this);
        }
      })();
    }
    disconnect() {
      try {
        this.remove();
      } catch (e) {
      }
    }
    /**
     * Removes duplicate children (by ID)
     */
    removeDuplicateTargetChildren() {
      this.duplicateChildren.forEach((c) => c.remove());
    }
    /**
     * Gets the list of duplicate children (i.e. those with the same ID)
     */
    get duplicateChildren() {
      var _a;
      const existingChildren = this.targetElements.flatMap((e) => [...e.children]).filter((c) => !!c.id);
      const newChildrenIds = [...((_a = this.templateContent) == null ? void 0 : _a.children) || []].filter((c) => !!c.id).map((c) => c.id);
      return existingChildren.filter((c) => newChildrenIds.includes(c.id));
    }
    /**
     * Gets the action function to be performed.
     */
    get performAction() {
      if (this.action) {
        const actionFunction = StreamActions[this.action];
        if (actionFunction) {
          return actionFunction;
        }
        __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "unknown action");
      }
      __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "action attribute is missing");
    }
    /**
     * Gets the target elements which the template will be rendered to.
     */
    get targetElements() {
      if (this.target) {
        return this.targetElementsById;
      } else if (this.targets) {
        return this.targetElementsByQuery;
      } else {
        __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "target or targets attribute is missing");
      }
    }
    /**
     * Gets the contents of the main `<template>`.
     */
    get templateContent() {
      return this.templateElement.content.cloneNode(true);
    }
    /**
     * Gets the main `<template>` used for rendering
     */
    get templateElement() {
      if (this.firstElementChild === null) {
        const template = this.ownerDocument.createElement("template");
        this.appendChild(template);
        return template;
      } else if (this.firstElementChild instanceof HTMLTemplateElement) {
        return this.firstElementChild;
      }
      __privateMethod(this, _StreamElement_instances, raise_fn).call(this, "first child element must be a <template> element");
    }
    /**
     * Gets the current action.
     */
    get action() {
      return this.getAttribute("action");
    }
    /**
     * Gets the current target (an element ID) to which the result will
     * be rendered.
     */
    get target() {
      return this.getAttribute("target");
    }
    /**
     * Gets the current "targets" selector (a CSS selector)
     */
    get targets() {
      return this.getAttribute("targets");
    }
    /**
     * Reads the request-id attribute
     */
    get requestId() {
      return this.getAttribute("request-id");
    }
    get description() {
      var _a, _b;
      return (_b = ((_a = this.outerHTML.match(/<[^>]+>/)) != null ? _a : [])[0]) != null ? _b : "<turbo-stream>";
    }
    get beforeRenderEvent() {
      return new CustomEvent("turbo:before-stream-render", {
        bubbles: true,
        cancelable: true,
        detail: { newStream: this, render: _StreamElement.renderElement }
      });
    }
    get targetElementsById() {
      var _a;
      const element = (_a = this.ownerDocument) == null ? void 0 : _a.getElementById(this.target);
      if (element !== null) {
        return [element];
      } else {
        return [];
      }
    }
    get targetElementsByQuery() {
      var _a;
      const elements = (_a = this.ownerDocument) == null ? void 0 : _a.querySelectorAll(this.targets);
      if (elements.length !== 0) {
        return Array.prototype.slice.call(elements);
      } else {
        return [];
      }
    }
  };
  _StreamElement_instances = new WeakSet();
  raise_fn = function(message) {
    throw new Error(`${this.description}: ${message}`);
  };
  var StreamElement = _StreamElement;

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/elements/stream_source_element.js
  var StreamSourceElement = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "streamSource", null);
    }
    connectedCallback() {
      this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src);
      connectStreamSource(this.streamSource);
    }
    disconnectedCallback() {
      if (this.streamSource) {
        this.streamSource.close();
        disconnectStreamSource(this.streamSource);
      }
    }
    get src() {
      return this.getAttribute("src") || "";
    }
  };

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/elements/index.js
  FrameElement.delegateConstructor = FrameController;
  if (customElements.get("turbo-frame") === void 0) {
    customElements.define("turbo-frame", FrameElement);
  }
  if (customElements.get("turbo-stream") === void 0) {
    customElements.define("turbo-stream", StreamElement);
  }
  if (customElements.get("turbo-stream-source") === void 0) {
    customElements.define("turbo-stream-source", StreamSourceElement);
  }

  // ns-hugo:/home/bitnami/dev/official/docs/_vendor/github.com/hotwired/turbo/src/script_warning.js
  (() => {
    let element = document.currentScript;
    if (!element) return;
    if (element.hasAttribute("data-turbo-suppress-warning")) return;
    element = element.parentElement;
    while (element) {
      if (element == document.body) {
        return console.warn(
          unindent`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `,
          element.outerHTML
        );
      }
      element = element.parentElement;
    }
  })();

  // <stdin>
  window.Turbo = __spreadProps(__spreadValues({}, core_exports), { StreamActions });
  start();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvcG9seWZpbGxzL2Zvcm0tcmVxdWVzdC1zdWJtaXQtcG9seWZpbGwuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvcG9seWZpbGxzL3N1Ym1pdC1ldmVudC5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9lbGVtZW50cy9mcmFtZV9lbGVtZW50LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvdXJsLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2h0dHAvZmV0Y2hfcmVzcG9uc2UuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvdXRpbC5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2RyaXZlL2xpbWl0ZWRfc2V0LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2h0dHAvZmV0Y2guanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvaHR0cC9mZXRjaF9yZXF1ZXN0LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL29ic2VydmVycy9hcHBlYXJhbmNlX29ic2VydmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvc3RyZWFtcy9zdHJlYW1fbWVzc2FnZS5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2RyaXZlL3ByZWZldGNoX2NhY2hlLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvZHJpdmUvZm9ybV9zdWJtaXNzaW9uLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvc25hcHNob3QuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvb2JzZXJ2ZXJzL2Zvcm1fc3VibWl0X29ic2VydmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvdmlldy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2ZyYW1lcy9mcmFtZV92aWV3LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvZnJhbWVzL2xpbmtfaW50ZXJjZXB0b3IuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvb2JzZXJ2ZXJzL2xpbmtfY2xpY2tfb2JzZXJ2ZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvb2JzZXJ2ZXJzL2Zvcm1fbGlua19jbGlja19vYnNlcnZlci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2JhcmRvLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvcmVuZGVyZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9mcmFtZXMvZnJhbWVfcmVuZGVyZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9pbmRleC5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2RyaXZlL3Byb2dyZXNzX2Jhci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2RyaXZlL2hlYWRfc25hcHNob3QuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9kcml2ZS9wYWdlX3NuYXBzaG90LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvZHJpdmUvdmlld190cmFuc2l0aW9uZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9kcml2ZS92aXNpdC5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL25hdGl2ZS9icm93c2VyX2FkYXB0ZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvb2JzZXJ2ZXJzL2NhY2hlX29ic2VydmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvZnJhbWVzL2ZyYW1lX3JlZGlyZWN0b3IuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9kcml2ZS9oaXN0b3J5LmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL29ic2VydmVycy9saW5rX3ByZWZldGNoX29ic2VydmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvZHJpdmUvbmF2aWdhdG9yLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL29ic2VydmVycy9wYWdlX29ic2VydmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL29ic2VydmVycy9zY3JvbGxfb2JzZXJ2ZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9zdHJlYW1zL3N0cmVhbV9tZXNzYWdlX3JlbmRlcmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL29ic2VydmVycy9zdHJlYW1fb2JzZXJ2ZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9kcml2ZS9lcnJvcl9yZW5kZXJlci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2JpZ3NreXNvZnR3YXJlL2lkaW9tb3JwaC9kaXN0L2lkaW9tb3JwaC5lc20uanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9kcml2ZS9wYWdlX3JlbmRlcmVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvZHJpdmUvbW9ycGhfcmVuZGVyZXIuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvY29yZS9kcml2ZS9zbmFwc2hvdF9jYWNoZS5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2RyaXZlL3BhZ2Vfdmlldy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2RyaXZlL3ByZWxvYWRlci5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2NhY2hlLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvc2Vzc2lvbi5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2Vycm9ycy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9jb3JlL2ZyYW1lcy9mcmFtZV9jb250cm9sbGVyLmpzIiwgIm5zLWh1Z286L2hvbWUvYml0bmFtaS9kZXYvb2ZmaWNpYWwvZG9jcy9fdmVuZG9yL2dpdGh1Yi5jb20vaG90d2lyZWQvdHVyYm8vc3JjL2NvcmUvc3RyZWFtcy9zdHJlYW1fYWN0aW9ucy5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9lbGVtZW50cy9zdHJlYW1fZWxlbWVudC5qcyIsICJucy1odWdvOi9ob21lL2JpdG5hbWkvZGV2L29mZmljaWFsL2RvY3MvX3ZlbmRvci9naXRodWIuY29tL2hvdHdpcmVkL3R1cmJvL3NyYy9lbGVtZW50cy9zdHJlYW1fc291cmNlX2VsZW1lbnQuanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvZWxlbWVudHMvaW5kZXguanMiLCAibnMtaHVnbzovaG9tZS9iaXRuYW1pL2Rldi9vZmZpY2lhbC9kb2NzL192ZW5kb3IvZ2l0aHViLmNvbS9ob3R3aXJlZC90dXJiby9zcmMvc2NyaXB0X3dhcm5pbmcuanMiLCAiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTkgSmF2YW4gTWFraG1hbGlcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbihmdW5jdGlvbiAocHJvdG90eXBlKSB7XG4gIGlmICh0eXBlb2YgcHJvdG90eXBlLnJlcXVlc3RTdWJtaXQgPT0gXCJmdW5jdGlvblwiKSByZXR1cm5cblxuICBwcm90b3R5cGUucmVxdWVzdFN1Ym1pdCA9IGZ1bmN0aW9uIChzdWJtaXR0ZXIpIHtcbiAgICBpZiAoc3VibWl0dGVyKSB7XG4gICAgICB2YWxpZGF0ZVN1Ym1pdHRlcihzdWJtaXR0ZXIsIHRoaXMpXG4gICAgICBzdWJtaXR0ZXIuY2xpY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdWJtaXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICAgIHN1Ym1pdHRlci50eXBlID0gXCJzdWJtaXRcIlxuICAgICAgc3VibWl0dGVyLmhpZGRlbiA9IHRydWVcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoc3VibWl0dGVyKVxuICAgICAgc3VibWl0dGVyLmNsaWNrKClcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQoc3VibWl0dGVyKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlU3VibWl0dGVyKHN1Ym1pdHRlciwgZm9ybSkge1xuICAgIHN1Ym1pdHRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHJhaXNlKFR5cGVFcnJvciwgXCJwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSAnSFRNTEVsZW1lbnQnXCIpXG4gICAgc3VibWl0dGVyLnR5cGUgPT0gXCJzdWJtaXRcIiB8fCByYWlzZShUeXBlRXJyb3IsIFwiVGhlIHNwZWNpZmllZCBlbGVtZW50IGlzIG5vdCBhIHN1Ym1pdCBidXR0b25cIilcbiAgICBzdWJtaXR0ZXIuZm9ybSA9PSBmb3JtIHx8XG4gICAgICByYWlzZShET01FeGNlcHRpb24sIFwiVGhlIHNwZWNpZmllZCBlbGVtZW50IGlzIG5vdCBvd25lZCBieSB0aGlzIGZvcm0gZWxlbWVudFwiLCBcIk5vdEZvdW5kRXJyb3JcIilcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhaXNlKGVycm9yQ29uc3RydWN0b3IsIG1lc3NhZ2UsIG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JDb25zdHJ1Y3RvcihcIkZhaWxlZCB0byBleGVjdXRlICdyZXF1ZXN0U3VibWl0JyBvbiAnSFRNTEZvcm1FbGVtZW50JzogXCIgKyBtZXNzYWdlICsgXCIuXCIsIG5hbWUpXG4gIH1cbn0pKEhUTUxGb3JtRWxlbWVudC5wcm90b3R5cGUpXG4iLCAiY29uc3Qgc3VibWl0dGVyc0J5Rm9ybSA9IG5ldyBXZWFrTWFwKClcblxuZnVuY3Rpb24gZmluZFN1Ym1pdHRlckZyb21DbGlja1RhcmdldCh0YXJnZXQpIHtcbiAgY29uc3QgZWxlbWVudCA9IHRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgPyB0YXJnZXQgOiB0YXJnZXQgaW5zdGFuY2VvZiBOb2RlID8gdGFyZ2V0LnBhcmVudEVsZW1lbnQgOiBudWxsXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IGVsZW1lbnQgPyBlbGVtZW50LmNsb3Nlc3QoXCJpbnB1dCwgYnV0dG9uXCIpIDogbnVsbFxuICByZXR1cm4gY2FuZGlkYXRlPy50eXBlID09IFwic3VibWl0XCIgPyBjYW5kaWRhdGUgOiBudWxsXG59XG5cbmZ1bmN0aW9uIGNsaWNrQ2FwdHVyZWQoZXZlbnQpIHtcbiAgY29uc3Qgc3VibWl0dGVyID0gZmluZFN1Ym1pdHRlckZyb21DbGlja1RhcmdldChldmVudC50YXJnZXQpXG5cbiAgaWYgKHN1Ym1pdHRlciAmJiBzdWJtaXR0ZXIuZm9ybSkge1xuICAgIHN1Ym1pdHRlcnNCeUZvcm0uc2V0KHN1Ym1pdHRlci5mb3JtLCBzdWJtaXR0ZXIpXG4gIH1cbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKFwic3VibWl0dGVyXCIgaW4gRXZlbnQucHJvdG90eXBlKSByZXR1cm5cblxuICBsZXQgcHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZVxuICAvLyBDZXJ0YWluIHZlcnNpb25zIG9mIFNhZmFyaSAxNSBoYXZlIGEgYnVnIHdoZXJlIHRoZXkgd29uJ3RcbiAgLy8gcG9wdWxhdGUgdGhlIHN1Ym1pdHRlci4gVGhpcyBodXJ0cyBUdXJib0RyaXZlJ3MgZW5hYmxlL2Rpc2FibGUgZGV0ZWN0aW9uLlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyOTY2MFxuICBpZiAoXCJTdWJtaXRFdmVudFwiIGluIHdpbmRvdykge1xuICAgIGNvbnN0IHByb3RvdHlwZU9mU3VibWl0RXZlbnQgPSB3aW5kb3cuU3VibWl0RXZlbnQucHJvdG90eXBlXG5cbiAgICBpZiAoL0FwcGxlIENvbXB1dGVyLy50ZXN0KG5hdmlnYXRvci52ZW5kb3IpICYmICEoXCJzdWJtaXR0ZXJcIiBpbiBwcm90b3R5cGVPZlN1Ym1pdEV2ZW50KSkge1xuICAgICAgcHJvdG90eXBlID0gcHJvdG90eXBlT2ZTdWJtaXRFdmVudFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLy8gcG9seWZpbGwgbm90IG5lZWRlZFxuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0NhcHR1cmVkLCB0cnVlKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsIFwic3VibWl0dGVyXCIsIHtcbiAgICBnZXQoKSB7XG4gICAgICBpZiAodGhpcy50eXBlID09IFwic3VibWl0XCIgJiYgdGhpcy50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHN1Ym1pdHRlcnNCeUZvcm0uZ2V0KHRoaXMudGFyZ2V0KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn0pKClcblxuLy8gRW5zdXJlIFR5cGVTY3JpcHQgcGFyc2VzIHRoaXMgZmlsZSBhcyBhIG1vZHVsZVxuZXhwb3J0IHt9XG4iLCAiZXhwb3J0IGNvbnN0IEZyYW1lTG9hZGluZ1N0eWxlID0ge1xuICBlYWdlcjogXCJlYWdlclwiLFxuICBsYXp5OiBcImxhenlcIlxufVxuXG4vKipcbiAqIENvbnRhaW5zIGEgZnJhZ21lbnQgb2YgSFRNTCB3aGljaCBpcyB1cGRhdGVkIGJhc2VkIG9uIG5hdmlnYXRpb24gd2l0aGluXG4gKiBpdCAoZS5nLiB2aWEgbGlua3Mgb3IgZm9ybSBzdWJtaXNzaW9ucykuXG4gKlxuICogQGN1c3RvbUVsZW1lbnQgdHVyYm8tZnJhbWVcbiAqIEBleGFtcGxlXG4gKiAgIDx0dXJiby1mcmFtZSBpZD1cIm1lc3NhZ2VzXCI+XG4gKiAgICAgPGEgaHJlZj1cIi9tZXNzYWdlcy9leHBhbmRlZFwiPlxuICogICAgICAgU2hvdyBhbGwgZXhwYW5kZWQgbWVzc2FnZXMgaW4gdGhpcyBmcmFtZS5cbiAqICAgICA8L2E+XG4gKlxuICogICAgIDxmb3JtIGFjdGlvbj1cIi9tZXNzYWdlc1wiPlxuICogICAgICAgU2hvdyByZXNwb25zZSBmcm9tIHRoaXMgZm9ybSB3aXRoaW4gdGhpcyBmcmFtZS5cbiAqICAgICA8L2Zvcm0+XG4gKiAgIDwvdHVyYm8tZnJhbWU+XG4gKi9cbmV4cG9ydCBjbGFzcyBGcmFtZUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBkZWxlZ2F0ZUNvbnN0cnVjdG9yID0gdW5kZWZpbmVkXG5cbiAgbG9hZGVkID0gUHJvbWlzZS5yZXNvbHZlKClcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wiZGlzYWJsZWRcIiwgXCJsb2FkaW5nXCIsIFwic3JjXCJdXG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5kZWxlZ2F0ZSA9IG5ldyBGcmFtZUVsZW1lbnQuZGVsZWdhdGVDb25zdHJ1Y3Rvcih0aGlzKVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5jb25uZWN0KClcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuZGVsZWdhdGUuZGlzY29ubmVjdCgpXG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuc291cmNlVVJMUmVsb2FkZWQoKVxuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PSBcImxvYWRpbmdcIikge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5sb2FkaW5nU3R5bGVDaGFuZ2VkKClcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJzcmNcIikge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5zb3VyY2VVUkxDaGFuZ2VkKClcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJkaXNhYmxlZFwiKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLmRpc2FibGVkQ2hhbmdlZCgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFVSTCB0byBsYXppbHkgbG9hZCBzb3VyY2UgSFRNTCBmcm9tXG4gICAqL1xuICBnZXQgc3JjKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNyY1wiKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFVSTCB0byBsYXppbHkgbG9hZCBzb3VyY2UgSFRNTCBmcm9tXG4gICAqL1xuICBzZXQgc3JjKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInNyY1wiLCB2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcmVmcmVzaCBtb2RlIGZvciB0aGUgZnJhbWUuXG4gICAqL1xuICBnZXQgcmVmcmVzaCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJyZWZyZXNoXCIpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcmVmcmVzaCBtb2RlIGZvciB0aGUgZnJhbWUuXG4gICAqL1xuICBzZXQgcmVmcmVzaCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJyZWZyZXNoXCIsIHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcInJlZnJlc2hcIilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgZWxlbWVudCBpcyBsb2FkaW5nXG4gICAqL1xuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gZnJhbWVMb2FkaW5nU3R5bGVGcm9tU3RyaW5nKHRoaXMuZ2V0QXR0cmlidXRlKFwibG9hZGluZ1wiKSB8fCBcIlwiKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIGlmIHRoZSBlbGVtZW50IGlzIGxvYWRpbmdcbiAgICovXG4gIHNldCBsb2FkaW5nKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImxvYWRpbmdcIiwgdmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKFwibG9hZGluZ1wiKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkaXNhYmxlZCBzdGF0ZSBvZiB0aGUgZnJhbWUuXG4gICAqXG4gICAqIElmIGRpc2FibGVkLCBubyByZXF1ZXN0cyB3aWxsIGJlIGludGVyY2VwdGVkIGJ5IHRoZSBmcmFtZS5cbiAgICovXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRpc2FibGVkIHN0YXRlIG9mIHRoZSBmcmFtZS5cbiAgICpcbiAgICogSWYgZGlzYWJsZWQsIG5vIHJlcXVlc3RzIHdpbGwgYmUgaW50ZXJjZXB0ZWQgYnkgdGhlIGZyYW1lLlxuICAgKi9cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYXV0b3Njcm9sbCBzdGF0ZSBvZiB0aGUgZnJhbWUuXG4gICAqXG4gICAqIElmIHRydWUsIHRoZSBmcmFtZSB3aWxsIGJlIHNjcm9sbGVkIGludG8gdmlldyBhdXRvbWF0aWNhbGx5IG9uIHVwZGF0ZS5cbiAgICovXG4gIGdldCBhdXRvc2Nyb2xsKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShcImF1dG9zY3JvbGxcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhdXRvc2Nyb2xsIHN0YXRlIG9mIHRoZSBmcmFtZS5cbiAgICpcbiAgICogSWYgdHJ1ZSwgdGhlIGZyYW1lIHdpbGwgYmUgc2Nyb2xsZWQgaW50byB2aWV3IGF1dG9tYXRpY2FsbHkgb24gdXBkYXRlLlxuICAgKi9cbiAgc2V0IGF1dG9zY3JvbGwodmFsdWUpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXV0b3Njcm9sbFwiLCBcIlwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImF1dG9zY3JvbGxcIilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgZWxlbWVudCBoYXMgZmluaXNoZWQgbG9hZGluZ1xuICAgKi9cbiAgZ2V0IGNvbXBsZXRlKCkge1xuICAgIHJldHVybiAhdGhpcy5kZWxlZ2F0ZS5pc0xvYWRpbmdcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIGZyYW1lLlxuICAgKlxuICAgKiBJZiBpbmFjdGl2ZSwgc291cmNlIGNoYW5nZXMgd2lsbCBub3QgYmUgb2JzZXJ2ZWQuXG4gICAqL1xuICBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudCA9PT0gZG9jdW1lbnQgJiYgIXRoaXMuaXNQcmV2aWV3XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBmcmFtZS5cbiAgICpcbiAgICogSWYgaW5hY3RpdmUsIHNvdXJjZSBjaGFuZ2VzIHdpbGwgbm90IGJlIG9ic2VydmVkLlxuICAgKi9cbiAgZ2V0IGlzUHJldmlldygpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lckRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/Lmhhc0F0dHJpYnV0ZShcImRhdGEtdHVyYm8tcHJldmlld1wiKVxuICB9XG59XG5cbmZ1bmN0aW9uIGZyYW1lTG9hZGluZ1N0eWxlRnJvbVN0cmluZyhzdHlsZSkge1xuICBzd2l0Y2ggKHN0eWxlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlIFwibGF6eVwiOlxuICAgICAgcmV0dXJuIEZyYW1lTG9hZGluZ1N0eWxlLmxhenlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEZyYW1lTG9hZGluZ1N0eWxlLmVhZ2VyXG4gIH1cbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gZXhwYW5kVVJMKGxvY2F0YWJsZSkge1xuICByZXR1cm4gbmV3IFVSTChsb2NhdGFibGUudG9TdHJpbmcoKSwgZG9jdW1lbnQuYmFzZVVSSSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2hvcih1cmwpIHtcbiAgbGV0IGFuY2hvck1hdGNoXG4gIGlmICh1cmwuaGFzaCkge1xuICAgIHJldHVybiB1cmwuaGFzaC5zbGljZSgxKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxuICB9IGVsc2UgaWYgKChhbmNob3JNYXRjaCA9IHVybC5ocmVmLm1hdGNoKC8jKC4qKSQvKSkpIHtcbiAgICByZXR1cm4gYW5jaG9yTWF0Y2hbMV1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aW9uKGZvcm0sIHN1Ym1pdHRlcikge1xuICBjb25zdCBhY3Rpb24gPSBzdWJtaXR0ZXI/LmdldEF0dHJpYnV0ZShcImZvcm1hY3Rpb25cIikgfHwgZm9ybS5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIikgfHwgZm9ybS5hY3Rpb25cblxuICByZXR1cm4gZXhwYW5kVVJMKGFjdGlvbilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV4dGVuc2lvbih1cmwpIHtcbiAgcmV0dXJuIChnZXRMYXN0UGF0aENvbXBvbmVudCh1cmwpLm1hdGNoKC9cXC5bXi5dKiQvKSB8fCBbXSlbMF0gfHwgXCJcIlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNIVE1MKHVybCkge1xuICByZXR1cm4gISFnZXRFeHRlbnNpb24odXJsKS5tYXRjaCgvXig/OnxcXC4oPzpodG18aHRtbHx4aHRtbHxwaHApKSQvKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmVmaXhlZEJ5KGJhc2VVUkwsIHVybCkge1xuICBjb25zdCBwcmVmaXggPSBnZXRQcmVmaXgodXJsKVxuICByZXR1cm4gYmFzZVVSTC5ocmVmID09PSBleHBhbmRVUkwocHJlZml4KS5ocmVmIHx8IGJhc2VVUkwuaHJlZi5zdGFydHNXaXRoKHByZWZpeClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0aW9uSXNWaXNpdGFibGUobG9jYXRpb24sIHJvb3RMb2NhdGlvbikge1xuICByZXR1cm4gaXNQcmVmaXhlZEJ5KGxvY2F0aW9uLCByb290TG9jYXRpb24pICYmIGlzSFRNTChsb2NhdGlvbilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlcXVlc3RVUkwodXJsKSB7XG4gIGNvbnN0IGFuY2hvciA9IGdldEFuY2hvcih1cmwpXG4gIHJldHVybiBhbmNob3IgIT0gbnVsbCA/IHVybC5ocmVmLnNsaWNlKDAsIC0oYW5jaG9yLmxlbmd0aCArIDEpKSA6IHVybC5ocmVmXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0NhY2hlS2V5KHVybCkge1xuICByZXR1cm4gZ2V0UmVxdWVzdFVSTCh1cmwpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cmxzQXJlRXF1YWwobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGV4cGFuZFVSTChsZWZ0KS5ocmVmID09IGV4cGFuZFVSTChyaWdodCkuaHJlZlxufVxuXG5mdW5jdGlvbiBnZXRQYXRoQ29tcG9uZW50cyh1cmwpIHtcbiAgcmV0dXJuIHVybC5wYXRobmFtZS5zcGxpdChcIi9cIikuc2xpY2UoMSlcbn1cblxuZnVuY3Rpb24gZ2V0TGFzdFBhdGhDb21wb25lbnQodXJsKSB7XG4gIHJldHVybiBnZXRQYXRoQ29tcG9uZW50cyh1cmwpLnNsaWNlKC0xKVswXVxufVxuXG5mdW5jdGlvbiBnZXRQcmVmaXgodXJsKSB7XG4gIHJldHVybiBhZGRUcmFpbGluZ1NsYXNoKHVybC5vcmlnaW4gKyB1cmwucGF0aG5hbWUpXG59XG5cbmZ1bmN0aW9uIGFkZFRyYWlsaW5nU2xhc2godmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmVuZHNXaXRoKFwiL1wiKSA/IHZhbHVlIDogdmFsdWUgKyBcIi9cIlxufVxuIiwgImltcG9ydCB7IGV4cGFuZFVSTCB9IGZyb20gXCIuLi9jb3JlL3VybFwiXG5cbmV4cG9ydCBjbGFzcyBGZXRjaFJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IocmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2VcbiAgfVxuXG4gIGdldCBzdWNjZWVkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2Uub2tcbiAgfVxuXG4gIGdldCBmYWlsZWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLnN1Y2NlZWRlZFxuICB9XG5cbiAgZ2V0IGNsaWVudEVycm9yKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1c0NvZGUgPj0gNDAwICYmIHRoaXMuc3RhdHVzQ29kZSA8PSA0OTlcbiAgfVxuXG4gIGdldCBzZXJ2ZXJFcnJvcigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXNDb2RlID49IDUwMCAmJiB0aGlzLnN0YXR1c0NvZGUgPD0gNTk5XG4gIH1cblxuICBnZXQgcmVkaXJlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXNwb25zZS5yZWRpcmVjdGVkXG4gIH1cblxuICBnZXQgbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIGV4cGFuZFVSTCh0aGlzLnJlc3BvbnNlLnVybClcbiAgfVxuXG4gIGdldCBpc0hUTUwoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGUgJiYgdGhpcy5jb250ZW50VHlwZS5tYXRjaCgvXig/OnRleHRcXC8oW15cXHM7LF0rXFxiKT9odG1sfGFwcGxpY2F0aW9uXFwveGh0bWxcXCt4bWwpXFxiLylcbiAgfVxuXG4gIGdldCBzdGF0dXNDb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlLnN0YXR1c1xuICB9XG5cbiAgZ2V0IGNvbnRlbnRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLmhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKVxuICB9XG5cbiAgZ2V0IHJlc3BvbnNlVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXNwb25zZS5jbG9uZSgpLnRleHQoKVxuICB9XG5cbiAgZ2V0IHJlc3BvbnNlSFRNTCgpIHtcbiAgICBpZiAodGhpcy5pc0hUTUwpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3BvbnNlLmNsb25lKCkudGV4dCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKVxuICAgIH1cbiAgfVxuXG4gIGhlYWRlcihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzcG9uc2UuaGVhZGVycy5nZXQobmFtZSlcbiAgfVxufVxuIiwgImltcG9ydCB7IGV4cGFuZFVSTCB9IGZyb20gXCIuL2NvcmUvdXJsXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlU2NyaXB0RWxlbWVudChlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdHVyYm8tZXZhbFwiKSA9PSBcImZhbHNlXCIpIHtcbiAgICByZXR1cm4gZWxlbWVudFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNyZWF0ZWRTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuICAgIGNvbnN0IGNzcE5vbmNlID0gZ2V0TWV0YUNvbnRlbnQoXCJjc3Atbm9uY2VcIilcbiAgICBpZiAoY3NwTm9uY2UpIHtcbiAgICAgIGNyZWF0ZWRTY3JpcHRFbGVtZW50Lm5vbmNlID0gY3NwTm9uY2VcbiAgICB9XG4gICAgY3JlYXRlZFNjcmlwdEVsZW1lbnQudGV4dENvbnRlbnQgPSBlbGVtZW50LnRleHRDb250ZW50XG4gICAgY3JlYXRlZFNjcmlwdEVsZW1lbnQuYXN5bmMgPSBmYWxzZVxuICAgIGNvcHlFbGVtZW50QXR0cmlidXRlcyhjcmVhdGVkU2NyaXB0RWxlbWVudCwgZWxlbWVudClcbiAgICByZXR1cm4gY3JlYXRlZFNjcmlwdEVsZW1lbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5RWxlbWVudEF0dHJpYnV0ZXMoZGVzdGluYXRpb25FbGVtZW50LCBzb3VyY2VFbGVtZW50KSB7XG4gIGZvciAoY29uc3QgeyBuYW1lLCB2YWx1ZSB9IG9mIHNvdXJjZUVsZW1lbnQuYXR0cmlidXRlcykge1xuICAgIGRlc3RpbmF0aW9uRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQoaHRtbCkge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaChldmVudE5hbWUsIHsgdGFyZ2V0LCBjYW5jZWxhYmxlLCBkZXRhaWwgfSA9IHt9KSB7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xuICAgIGNhbmNlbGFibGUsXG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICBkZXRhaWxcbiAgfSlcblxuICBpZiAodGFyZ2V0ICYmIHRhcmdldC5pc0Nvbm5lY3RlZCkge1xuICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICB9XG5cbiAgcmV0dXJuIGV2ZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0UmVwYWludCgpIHtcbiAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gXCJoaWRkZW5cIikge1xuICAgIHJldHVybiBuZXh0RXZlbnRMb29wVGljaygpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5leHRBbmltYXRpb25GcmFtZSgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRBbmltYXRpb25GcmFtZSgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVzb2x2ZSgpKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRFdmVudExvb3BUaWNrKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSgpLCAwKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRNaWNyb3Rhc2soKSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MRG9jdW1lbnQoaHRtbCA9IFwiXCIpIHtcbiAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW5kZW50KHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICBjb25zdCBsaW5lcyA9IGludGVycG9sYXRlKHN0cmluZ3MsIHZhbHVlcykucmVwbGFjZSgvXlxcbi8sIFwiXCIpLnNwbGl0KFwiXFxuXCIpXG4gIGNvbnN0IG1hdGNoID0gbGluZXNbMF0ubWF0Y2goL15cXHMrLylcbiAgY29uc3QgaW5kZW50ID0gbWF0Y2ggPyBtYXRjaFswXS5sZW5ndGggOiAwXG4gIHJldHVybiBsaW5lcy5tYXAoKGxpbmUpID0+IGxpbmUuc2xpY2UoaW5kZW50KSkuam9pbihcIlxcblwiKVxufVxuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHJpbmdzLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIHN0cmluZ3MucmVkdWNlKChyZXN1bHQsIHN0cmluZywgaSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldID09IHVuZGVmaW5lZCA/IFwiXCIgOiB2YWx1ZXNbaV1cbiAgICByZXR1cm4gcmVzdWx0ICsgc3RyaW5nICsgdmFsdWVcbiAgfSwgXCJcIilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzNiB9KVxuICAgIC5tYXAoKF8sIGkpID0+IHtcbiAgICAgIGlmIChpID09IDggfHwgaSA9PSAxMyB8fCBpID09IDE4IHx8IGkgPT0gMjMpIHtcbiAgICAgICAgcmV0dXJuIFwiLVwiXG4gICAgICB9IGVsc2UgaWYgKGkgPT0gMTQpIHtcbiAgICAgICAgcmV0dXJuIFwiNFwiXG4gICAgICB9IGVsc2UgaWYgKGkgPT0gMTkpIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSArIDgpLnRvU3RyaW5nKDE2KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE1KS50b1N0cmluZygxNilcbiAgICAgIH1cbiAgICB9KVxuICAgIC5qb2luKFwiXCIpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgLi4uZWxlbWVudHMpIHtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBlbGVtZW50cy5tYXAoKGVsZW1lbnQpID0+IGVsZW1lbnQ/LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCAuLi5lbGVtZW50cykge1xuICByZXR1cm4gZWxlbWVudHMuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudCAmJiBlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtBc0J1c3koLi4uZWxlbWVudHMpIHtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09IFwidHVyYm8tZnJhbWVcIikge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJidXN5XCIsIFwiXCIpXG4gICAgfVxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1idXN5XCIsIFwidHJ1ZVwiKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckJ1c3lTdGF0ZSguLi5lbGVtZW50cykge1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICBpZiAoZWxlbWVudC5sb2NhbE5hbWUgPT0gXCJ0dXJiby1mcmFtZVwiKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImJ1c3lcIilcbiAgICB9XG5cbiAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtYnVzeVwiKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yTG9hZChlbGVtZW50LCB0aW1lb3V0SW5NaWxsaXNlY29uZHMgPSAyMDAwKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBvbkNvbXBsZXRlKVxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvbkNvbXBsZXRlKVxuICAgICAgcmVzb2x2ZSgpXG4gICAgfVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBvbkNvbXBsZXRlLCB7IG9uY2U6IHRydWUgfSlcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBvbkNvbXBsZXRlLCB7IG9uY2U6IHRydWUgfSlcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWVvdXRJbk1pbGxpc2Vjb25kcylcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpc3RvcnlNZXRob2RGb3JBY3Rpb24oYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSBcInJlcGxhY2VcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5LnJlcGxhY2VTdGF0ZVxuICAgIGNhc2UgXCJhZHZhbmNlXCI6XG4gICAgY2FzZSBcInJlc3RvcmVcIjpcbiAgICAgIHJldHVybiBoaXN0b3J5LnB1c2hTdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjdGlvbihhY3Rpb24pIHtcbiAgcmV0dXJuIGFjdGlvbiA9PSBcImFkdmFuY2VcIiB8fCBhY3Rpb24gPT0gXCJyZXBsYWNlXCIgfHwgYWN0aW9uID09IFwicmVzdG9yZVwiXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaXNpdEFjdGlvbiguLi5lbGVtZW50cykge1xuICBjb25zdCBhY3Rpb24gPSBnZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWFjdGlvblwiLCAuLi5lbGVtZW50cylcblxuICByZXR1cm4gaXNBY3Rpb24oYWN0aW9uKSA/IGFjdGlvbiA6IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1ldGFFbGVtZW50KG5hbWUpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1ldGFbbmFtZT1cIiR7bmFtZX1cIl1gKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0YUNvbnRlbnQobmFtZSkge1xuICBjb25zdCBlbGVtZW50ID0gZ2V0TWV0YUVsZW1lbnQobmFtZSlcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5jb250ZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNZXRhQ29udGVudChuYW1lLCBjb250ZW50KSB7XG4gIGxldCBlbGVtZW50ID0gZ2V0TWV0YUVsZW1lbnQobmFtZSlcblxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1ldGFcIilcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgbmFtZSlcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgfVxuXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCBjb250ZW50KVxuXG4gIHJldHVybiBlbGVtZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2xvc2VzdFJlY3Vyc2l2ZWx5KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIHJldHVybiAoXG4gICAgICBlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3IpIHx8IGZpbmRDbG9zZXN0UmVjdXJzaXZlbHkoZWxlbWVudC5hc3NpZ25lZFNsb3QgfHwgZWxlbWVudC5nZXRSb290Tm9kZSgpPy5ob3N0LCBzZWxlY3RvcilcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRJc0ZvY3VzYWJsZShlbGVtZW50KSB7XG4gIGNvbnN0IGluZXJ0RGlzYWJsZWRPckhpZGRlbiA9IFwiW2luZXJ0XSwgOmRpc2FibGVkLCBbaGlkZGVuXSwgZGV0YWlsczpub3QoW29wZW5dKSwgZGlhbG9nOm5vdChbb3Blbl0pXCJcblxuICByZXR1cm4gISFlbGVtZW50ICYmIGVsZW1lbnQuY2xvc2VzdChpbmVydERpc2FibGVkT3JIaWRkZW4pID09IG51bGwgJiYgdHlwZW9mIGVsZW1lbnQuZm9jdXMgPT0gXCJmdW5jdGlvblwiXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeUF1dG9mb2N1c2FibGVFbGVtZW50KGVsZW1lbnRPckRvY3VtZW50RnJhZ21lbnQpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudE9yRG9jdW1lbnRGcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2F1dG9mb2N1c11cIikpLmZpbmQoZWxlbWVudElzRm9jdXNhYmxlKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXJvdW5kKGNhbGxiYWNrLCByZWFkZXIpIHtcbiAgY29uc3QgYmVmb3JlID0gcmVhZGVyKClcblxuICBjYWxsYmFjaygpXG5cbiAgYXdhaXQgbmV4dEFuaW1hdGlvbkZyYW1lKClcblxuICBjb25zdCBhZnRlciA9IHJlYWRlcigpXG5cbiAgcmV0dXJuIFtiZWZvcmUsIGFmdGVyXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9lc05vdFRhcmdldElGcmFtZShhbmNob3IpIHtcbiAgaWYgKGFuY2hvci5oYXNBdHRyaWJ1dGUoXCJ0YXJnZXRcIikpIHtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYW5jaG9yLnRhcmdldCkpIHtcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGlua0Zyb21DbGlja1RhcmdldCh0YXJnZXQpIHtcbiAgcmV0dXJuIGZpbmRDbG9zZXN0UmVjdXJzaXZlbHkodGFyZ2V0LCBcImFbaHJlZl06bm90KFt0YXJnZXRePV9dKTpub3QoW2Rvd25sb2FkXSlcIilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2F0aW9uRm9yTGluayhsaW5rKSB7XG4gIHJldHVybiBleHBhbmRVUkwobGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpIHx8IFwiXCIpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXkpIHtcbiAgbGV0IHRpbWVvdXRJZCA9IG51bGxcblxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBjYWxsYmFjayA9ICgpID0+IGZuLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZClcbiAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSlcbiAgfVxufVxuIiwgImV4cG9ydCBjbGFzcyBMaW1pdGVkU2V0IGV4dGVuZHMgU2V0IHtcbiAgY29uc3RydWN0b3IobWF4U2l6ZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm1heFNpemUgPSBtYXhTaXplXG4gIH1cblxuICBhZGQodmFsdWUpIHtcbiAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xuICAgICAgY29uc3QgaXRlcmF0b3IgPSB0aGlzLnZhbHVlcygpXG4gICAgICBjb25zdCBvbGRlc3RWYWx1ZSA9IGl0ZXJhdG9yLm5leHQoKS52YWx1ZVxuICAgICAgdGhpcy5kZWxldGUob2xkZXN0VmFsdWUpXG4gICAgfVxuICAgIHN1cGVyLmFkZCh2YWx1ZSlcbiAgfVxufVxuIiwgImltcG9ydCB7IHV1aWQgfSBmcm9tIFwiLi4vdXRpbFwiXG5pbXBvcnQgeyBMaW1pdGVkU2V0IH0gZnJvbSBcIi4uL2NvcmUvZHJpdmUvbGltaXRlZF9zZXRcIlxuXG5leHBvcnQgY29uc3QgcmVjZW50UmVxdWVzdHMgPSBuZXcgTGltaXRlZFNldCgyMClcblxuY29uc3QgbmF0aXZlRmV0Y2ggPSB3aW5kb3cuZmV0Y2hcblxuZnVuY3Rpb24gZmV0Y2hXaXRoVHVyYm9IZWFkZXJzKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IG1vZGlmaWVkSGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyB8fCB7fSlcbiAgY29uc3QgcmVxdWVzdFVJRCA9IHV1aWQoKVxuICByZWNlbnRSZXF1ZXN0cy5hZGQocmVxdWVzdFVJRClcbiAgbW9kaWZpZWRIZWFkZXJzLmFwcGVuZChcIlgtVHVyYm8tUmVxdWVzdC1JZFwiLCByZXF1ZXN0VUlEKVxuXG4gIHJldHVybiBuYXRpdmVGZXRjaCh1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIGhlYWRlcnM6IG1vZGlmaWVkSGVhZGVyc1xuICB9KVxufVxuXG5leHBvcnQgeyBmZXRjaFdpdGhUdXJib0hlYWRlcnMgYXMgZmV0Y2ggfVxuIiwgImltcG9ydCB7IEZldGNoUmVzcG9uc2UgfSBmcm9tIFwiLi9mZXRjaF9yZXNwb25zZVwiXG5pbXBvcnQgeyBleHBhbmRVUkwgfSBmcm9tIFwiLi4vY29yZS91cmxcIlxuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tIFwiLi4vdXRpbFwiXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCIuL2ZldGNoXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoTWV0aG9kRnJvbVN0cmluZyhtZXRob2QpIHtcbiAgc3dpdGNoIChtZXRob2QudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgXCJnZXRcIjpcbiAgICAgIHJldHVybiBGZXRjaE1ldGhvZC5nZXRcbiAgICBjYXNlIFwicG9zdFwiOlxuICAgICAgcmV0dXJuIEZldGNoTWV0aG9kLnBvc3RcbiAgICBjYXNlIFwicHV0XCI6XG4gICAgICByZXR1cm4gRmV0Y2hNZXRob2QucHV0XG4gICAgY2FzZSBcInBhdGNoXCI6XG4gICAgICByZXR1cm4gRmV0Y2hNZXRob2QucGF0Y2hcbiAgICBjYXNlIFwiZGVsZXRlXCI6XG4gICAgICByZXR1cm4gRmV0Y2hNZXRob2QuZGVsZXRlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEZldGNoTWV0aG9kID0ge1xuICBnZXQ6IFwiZ2V0XCIsXG4gIHBvc3Q6IFwicG9zdFwiLFxuICBwdXQ6IFwicHV0XCIsXG4gIHBhdGNoOiBcInBhdGNoXCIsXG4gIGRlbGV0ZTogXCJkZWxldGVcIlxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hFbmN0eXBlRnJvbVN0cmluZyhlbmNvZGluZykge1xuICBzd2l0Y2ggKGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlIEZldGNoRW5jdHlwZS5tdWx0aXBhcnQ6XG4gICAgICByZXR1cm4gRmV0Y2hFbmN0eXBlLm11bHRpcGFydFxuICAgIGNhc2UgRmV0Y2hFbmN0eXBlLnBsYWluOlxuICAgICAgcmV0dXJuIEZldGNoRW5jdHlwZS5wbGFpblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gRmV0Y2hFbmN0eXBlLnVybEVuY29kZWRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRmV0Y2hFbmN0eXBlID0ge1xuICB1cmxFbmNvZGVkOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICBtdWx0aXBhcnQ6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxuICBwbGFpbjogXCJ0ZXh0L3BsYWluXCJcbn1cblxuZXhwb3J0IGNsYXNzIEZldGNoUmVxdWVzdCB7XG4gIGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICAjcmVzb2x2ZVJlcXVlc3RQcm9taXNlID0gKF92YWx1ZSkgPT4ge31cblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgbWV0aG9kLCBsb2NhdGlvbiwgcmVxdWVzdEJvZHkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCksIHRhcmdldCA9IG51bGwsIGVuY3R5cGUgPSBGZXRjaEVuY3R5cGUudXJsRW5jb2RlZCkge1xuICAgIGNvbnN0IFt1cmwsIGJvZHldID0gYnVpbGRSZXNvdXJjZUFuZEJvZHkoZXhwYW5kVVJMKGxvY2F0aW9uKSwgbWV0aG9kLCByZXF1ZXN0Qm9keSwgZW5jdHlwZSlcblxuICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgIHRoaXMudXJsID0gdXJsXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXRcbiAgICB0aGlzLmZldGNoT3B0aW9ucyA9IHtcbiAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICByZWRpcmVjdDogXCJmb2xsb3dcIixcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgaGVhZGVyczogeyAuLi50aGlzLmRlZmF1bHRIZWFkZXJzIH0sXG4gICAgICBib2R5OiBib2R5LFxuICAgICAgc2lnbmFsOiB0aGlzLmFib3J0U2lnbmFsLFxuICAgICAgcmVmZXJyZXI6IHRoaXMuZGVsZWdhdGUucmVmZXJyZXI/LmhyZWZcbiAgICB9XG4gICAgdGhpcy5lbmN0eXBlID0gZW5jdHlwZVxuICB9XG5cbiAgZ2V0IG1ldGhvZCgpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaE9wdGlvbnMubWV0aG9kXG4gIH1cblxuICBzZXQgbWV0aG9kKHZhbHVlKSB7XG4gICAgY29uc3QgZmV0Y2hCb2R5ID0gdGhpcy5pc1NhZmUgPyB0aGlzLnVybC5zZWFyY2hQYXJhbXMgOiB0aGlzLmZldGNoT3B0aW9ucy5ib2R5IHx8IG5ldyBGb3JtRGF0YSgpXG4gICAgY29uc3QgZmV0Y2hNZXRob2QgPSBmZXRjaE1ldGhvZEZyb21TdHJpbmcodmFsdWUpIHx8IEZldGNoTWV0aG9kLmdldFxuXG4gICAgdGhpcy51cmwuc2VhcmNoID0gXCJcIlxuXG4gICAgY29uc3QgW3VybCwgYm9keV0gPSBidWlsZFJlc291cmNlQW5kQm9keSh0aGlzLnVybCwgZmV0Y2hNZXRob2QsIGZldGNoQm9keSwgdGhpcy5lbmN0eXBlKVxuXG4gICAgdGhpcy51cmwgPSB1cmxcbiAgICB0aGlzLmZldGNoT3B0aW9ucy5ib2R5ID0gYm9keVxuICAgIHRoaXMuZmV0Y2hPcHRpb25zLm1ldGhvZCA9IGZldGNoTWV0aG9kXG4gIH1cblxuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaE9wdGlvbnMuaGVhZGVyc1xuICB9XG5cbiAgc2V0IGhlYWRlcnModmFsdWUpIHtcbiAgICB0aGlzLmZldGNoT3B0aW9ucy5oZWFkZXJzID0gdmFsdWVcbiAgfVxuXG4gIGdldCBib2R5KCkge1xuICAgIGlmICh0aGlzLmlzU2FmZSkge1xuICAgICAgcmV0dXJuIHRoaXMudXJsLnNlYXJjaFBhcmFtc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5mZXRjaE9wdGlvbnMuYm9keVxuICAgIH1cbiAgfVxuXG4gIHNldCBib2R5KHZhbHVlKSB7XG4gICAgdGhpcy5mZXRjaE9wdGlvbnMuYm9keSA9IHZhbHVlXG4gIH1cblxuICBnZXQgbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudXJsXG4gIH1cblxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiB0aGlzLnVybC5zZWFyY2hQYXJhbXNcbiAgfVxuXG4gIGdldCBlbnRyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkgPyBBcnJheS5mcm9tKHRoaXMuYm9keS5lbnRyaWVzKCkpIDogW11cbiAgfVxuXG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLmFib3J0Q29udHJvbGxlci5hYm9ydCgpXG4gIH1cblxuICBhc3luYyBwZXJmb3JtKCkge1xuICAgIGNvbnN0IHsgZmV0Y2hPcHRpb25zIH0gPSB0aGlzXG4gICAgdGhpcy5kZWxlZ2F0ZS5wcmVwYXJlUmVxdWVzdCh0aGlzKVxuICAgIGNvbnN0IGV2ZW50ID0gYXdhaXQgdGhpcy4jYWxsb3dSZXF1ZXN0VG9CZUludGVyY2VwdGVkKGZldGNoT3B0aW9ucylcbiAgICB0cnkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZXF1ZXN0U3RhcnRlZCh0aGlzKVxuXG4gICAgICBpZiAoZXZlbnQuZGV0YWlsLmZldGNoUmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gZXZlbnQuZGV0YWlsLmZldGNoUmVxdWVzdC5yZXNwb25zZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IGZldGNoKHRoaXMudXJsLmhyZWYsIGZldGNoT3B0aW9ucylcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlc3BvbnNlXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZWNlaXZlKHJlc3BvbnNlKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IubmFtZSAhPT0gXCJBYm9ydEVycm9yXCIpIHtcbiAgICAgICAgaWYgKHRoaXMuI3dpbGxEZWxlZ2F0ZUVycm9ySGFuZGxpbmcoZXJyb3IpKSB7XG4gICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5yZXF1ZXN0RXJyb3JlZCh0aGlzLCBlcnJvcilcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnJlcXVlc3RGaW5pc2hlZCh0aGlzKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlY2VpdmUocmVzcG9uc2UpIHtcbiAgICBjb25zdCBmZXRjaFJlc3BvbnNlID0gbmV3IEZldGNoUmVzcG9uc2UocmVzcG9uc2UpXG4gICAgY29uc3QgZXZlbnQgPSBkaXNwYXRjaChcInR1cmJvOmJlZm9yZS1mZXRjaC1yZXNwb25zZVwiLCB7XG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgZGV0YWlsOiB7IGZldGNoUmVzcG9uc2UgfSxcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXRcbiAgICB9KVxuICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnJlcXVlc3RQcmV2ZW50ZWRIYW5kbGluZ1Jlc3BvbnNlKHRoaXMsIGZldGNoUmVzcG9uc2UpXG4gICAgfSBlbHNlIGlmIChmZXRjaFJlc3BvbnNlLnN1Y2NlZWRlZCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZXF1ZXN0U3VjY2VlZGVkV2l0aFJlc3BvbnNlKHRoaXMsIGZldGNoUmVzcG9uc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUucmVxdWVzdEZhaWxlZFdpdGhSZXNwb25zZSh0aGlzLCBmZXRjaFJlc3BvbnNlKVxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hSZXNwb25zZVxuICB9XG5cbiAgZ2V0IGRlZmF1bHRIZWFkZXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBBY2NlcHQ6IFwidGV4dC9odG1sLCBhcHBsaWNhdGlvbi94aHRtbCt4bWxcIlxuICAgIH1cbiAgfVxuXG4gIGdldCBpc1NhZmUoKSB7XG4gICAgcmV0dXJuIGlzU2FmZSh0aGlzLm1ldGhvZClcbiAgfVxuXG4gIGdldCBhYm9ydFNpZ25hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5hYm9ydENvbnRyb2xsZXIuc2lnbmFsXG4gIH1cblxuICBhY2NlcHRSZXNwb25zZVR5cGUobWltZVR5cGUpIHtcbiAgICB0aGlzLmhlYWRlcnNbXCJBY2NlcHRcIl0gPSBbbWltZVR5cGUsIHRoaXMuaGVhZGVyc1tcIkFjY2VwdFwiXV0uam9pbihcIiwgXCIpXG4gIH1cblxuICBhc3luYyAjYWxsb3dSZXF1ZXN0VG9CZUludGVyY2VwdGVkKGZldGNoT3B0aW9ucykge1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRpb24gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gKHRoaXMuI3Jlc29sdmVSZXF1ZXN0UHJvbWlzZSA9IHJlc29sdmUpKVxuICAgIGNvbnN0IGV2ZW50ID0gZGlzcGF0Y2goXCJ0dXJibzpiZWZvcmUtZmV0Y2gtcmVxdWVzdFwiLCB7XG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgZGV0YWlsOiB7XG4gICAgICAgIGZldGNoT3B0aW9ucyxcbiAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgcmVzdW1lOiB0aGlzLiNyZXNvbHZlUmVxdWVzdFByb21pc2VcbiAgICAgIH0sXG4gICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0XG4gICAgfSlcbiAgICB0aGlzLnVybCA9IGV2ZW50LmRldGFpbC51cmxcbiAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgYXdhaXQgcmVxdWVzdEludGVyY2VwdGlvblxuXG4gICAgcmV0dXJuIGV2ZW50XG4gIH1cblxuICAjd2lsbERlbGVnYXRlRXJyb3JIYW5kbGluZyhlcnJvcikge1xuICAgIGNvbnN0IGV2ZW50ID0gZGlzcGF0Y2goXCJ0dXJibzpmZXRjaC1yZXF1ZXN0LWVycm9yXCIsIHtcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgZGV0YWlsOiB7IHJlcXVlc3Q6IHRoaXMsIGVycm9yOiBlcnJvciB9XG4gICAgfSlcblxuICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NhZmUoZmV0Y2hNZXRob2QpIHtcbiAgcmV0dXJuIGZldGNoTWV0aG9kRnJvbVN0cmluZyhmZXRjaE1ldGhvZCkgPT0gRmV0Y2hNZXRob2QuZ2V0XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUmVzb3VyY2VBbmRCb2R5KHJlc291cmNlLCBtZXRob2QsIHJlcXVlc3RCb2R5LCBlbmN0eXBlKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9XG4gICAgQXJyYXkuZnJvbShyZXF1ZXN0Qm9keSkubGVuZ3RoID4gMCA/IG5ldyBVUkxTZWFyY2hQYXJhbXMoZW50cmllc0V4Y2x1ZGluZ0ZpbGVzKHJlcXVlc3RCb2R5KSkgOiByZXNvdXJjZS5zZWFyY2hQYXJhbXNcblxuICBpZiAoaXNTYWZlKG1ldGhvZCkpIHtcbiAgICByZXR1cm4gW21lcmdlSW50b1VSTFNlYXJjaFBhcmFtcyhyZXNvdXJjZSwgc2VhcmNoUGFyYW1zKSwgbnVsbF1cbiAgfSBlbHNlIGlmIChlbmN0eXBlID09IEZldGNoRW5jdHlwZS51cmxFbmNvZGVkKSB7XG4gICAgcmV0dXJuIFtyZXNvdXJjZSwgc2VhcmNoUGFyYW1zXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBbcmVzb3VyY2UsIHJlcXVlc3RCb2R5XVxuICB9XG59XG5cbmZ1bmN0aW9uIGVudHJpZXNFeGNsdWRpbmdGaWxlcyhyZXF1ZXN0Qm9keSkge1xuICBjb25zdCBlbnRyaWVzID0gW11cblxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgcmVxdWVzdEJvZHkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSBjb250aW51ZVxuICAgIGVsc2UgZW50cmllcy5wdXNoKFtuYW1lLCB2YWx1ZV0pXG4gIH1cblxuICByZXR1cm4gZW50cmllc1xufVxuXG5mdW5jdGlvbiBtZXJnZUludG9VUkxTZWFyY2hQYXJhbXModXJsLCByZXF1ZXN0Qm9keSkge1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGVudHJpZXNFeGNsdWRpbmdGaWxlcyhyZXF1ZXN0Qm9keSkpXG5cbiAgdXJsLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpXG5cbiAgcmV0dXJuIHVybFxufVxuIiwgImV4cG9ydCBjbGFzcyBBcHBlYXJhbmNlT2JzZXJ2ZXIge1xuICBzdGFydGVkID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgZWxlbWVudCkge1xuICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMuaW50ZXJzZWN0KVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWVcbiAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZVxuICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUodGhpcy5lbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGludGVyc2VjdCA9IChlbnRyaWVzKSA9PiB7XG4gICAgY29uc3QgbGFzdEVudHJ5ID0gZW50cmllcy5zbGljZSgtMSlbMF1cbiAgICBpZiAobGFzdEVudHJ5Py5pc0ludGVyc2VjdGluZykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50QXBwZWFyZWRJblZpZXdwb3J0KHRoaXMuZWxlbWVudClcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBhY3RpdmF0ZVNjcmlwdEVsZW1lbnQsIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiXG5cbmV4cG9ydCBjbGFzcyBTdHJlYW1NZXNzYWdlIHtcbiAgc3RhdGljIGNvbnRlbnRUeXBlID0gXCJ0ZXh0L3ZuZC50dXJiby1zdHJlYW0uaHRtbFwiXG5cbiAgc3RhdGljIHdyYXAobWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMoY3JlYXRlRG9jdW1lbnRGcmFnbWVudChtZXNzYWdlKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1lc3NhZ2VcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihmcmFnbWVudCkge1xuICAgIHRoaXMuZnJhZ21lbnQgPSBpbXBvcnRTdHJlYW1FbGVtZW50cyhmcmFnbWVudClcbiAgfVxufVxuXG5mdW5jdGlvbiBpbXBvcnRTdHJlYW1FbGVtZW50cyhmcmFnbWVudCkge1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbChcInR1cmJvLXN0cmVhbVwiKSkge1xuICAgIGNvbnN0IHN0cmVhbUVsZW1lbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKGVsZW1lbnQsIHRydWUpXG5cbiAgICBmb3IgKGNvbnN0IGluZXJ0U2NyaXB0RWxlbWVudCBvZiBzdHJlYW1FbGVtZW50LnRlbXBsYXRlRWxlbWVudC5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIikpIHtcbiAgICAgIGluZXJ0U2NyaXB0RWxlbWVudC5yZXBsYWNlV2l0aChhY3RpdmF0ZVNjcmlwdEVsZW1lbnQoaW5lcnRTY3JpcHRFbGVtZW50KSlcbiAgICB9XG5cbiAgICBlbGVtZW50LnJlcGxhY2VXaXRoKHN0cmVhbUVsZW1lbnQpXG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnRcbn1cbiIsICJjb25zdCBQUkVGRVRDSF9ERUxBWSA9IDEwMFxuXG5jbGFzcyBQcmVmZXRjaENhY2hlIHtcbiAgI3ByZWZldGNoVGltZW91dCA9IG51bGxcbiAgI3ByZWZldGNoZWQgPSBudWxsXG5cbiAgZ2V0KHVybCkge1xuICAgIGlmICh0aGlzLiNwcmVmZXRjaGVkICYmIHRoaXMuI3ByZWZldGNoZWQudXJsID09PSB1cmwgJiYgdGhpcy4jcHJlZmV0Y2hlZC5leHBpcmUgPiBEYXRlLm5vdygpKSB7XG4gICAgICByZXR1cm4gdGhpcy4jcHJlZmV0Y2hlZC5yZXF1ZXN0XG4gICAgfVxuICB9XG5cbiAgc2V0TGF0ZXIodXJsLCByZXF1ZXN0LCB0dGwpIHtcbiAgICB0aGlzLmNsZWFyKClcblxuICAgIHRoaXMuI3ByZWZldGNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVxdWVzdC5wZXJmb3JtKClcbiAgICAgIHRoaXMuc2V0KHVybCwgcmVxdWVzdCwgdHRsKVxuICAgICAgdGhpcy4jcHJlZmV0Y2hUaW1lb3V0ID0gbnVsbFxuICAgIH0sIFBSRUZFVENIX0RFTEFZKVxuICB9XG5cbiAgc2V0KHVybCwgcmVxdWVzdCwgdHRsKSB7XG4gICAgdGhpcy4jcHJlZmV0Y2hlZCA9IHsgdXJsLCByZXF1ZXN0LCBleHBpcmU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdHRsKSB9XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy4jcHJlZmV0Y2hUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy4jcHJlZmV0Y2hUaW1lb3V0KVxuICAgIHRoaXMuI3ByZWZldGNoZWQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNhY2hlVHRsID0gMTAgKiAxMDAwXG5leHBvcnQgY29uc3QgcHJlZmV0Y2hDYWNoZSA9IG5ldyBQcmVmZXRjaENhY2hlKClcbiIsICJpbXBvcnQgeyBGZXRjaFJlcXVlc3QsIEZldGNoTWV0aG9kLCBmZXRjaE1ldGhvZEZyb21TdHJpbmcsIGZldGNoRW5jdHlwZUZyb21TdHJpbmcsIGlzU2FmZSB9IGZyb20gXCIuLi8uLi9odHRwL2ZldGNoX3JlcXVlc3RcIlxuaW1wb3J0IHsgZXhwYW5kVVJMIH0gZnJvbSBcIi4uL3VybFwiXG5pbXBvcnQgeyBjbGVhckJ1c3lTdGF0ZSwgZGlzcGF0Y2gsIGdldEF0dHJpYnV0ZSwgZ2V0TWV0YUNvbnRlbnQsIGhhc0F0dHJpYnV0ZSwgbWFya0FzQnVzeSB9IGZyb20gXCIuLi8uLi91dGlsXCJcbmltcG9ydCB7IFN0cmVhbU1lc3NhZ2UgfSBmcm9tIFwiLi4vc3RyZWFtcy9zdHJlYW1fbWVzc2FnZVwiXG5pbXBvcnQgeyBwcmVmZXRjaENhY2hlIH0gZnJvbSBcIi4vcHJlZmV0Y2hfY2FjaGVcIlxuXG5leHBvcnQgY29uc3QgRm9ybVN1Ym1pc3Npb25TdGF0ZSA9IHtcbiAgaW5pdGlhbGl6ZWQ6IFwiaW5pdGlhbGl6ZWRcIixcbiAgcmVxdWVzdGluZzogXCJyZXF1ZXN0aW5nXCIsXG4gIHdhaXRpbmc6IFwid2FpdGluZ1wiLFxuICByZWNlaXZpbmc6IFwicmVjZWl2aW5nXCIsXG4gIHN0b3BwaW5nOiBcInN0b3BwaW5nXCIsXG4gIHN0b3BwZWQ6IFwic3RvcHBlZFwiXG59XG5cbmV4cG9ydCBjb25zdCBGb3JtRW5jdHlwZSA9IHtcbiAgdXJsRW5jb2RlZDogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgbXVsdGlwYXJ0OiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgcGxhaW46IFwidGV4dC9wbGFpblwiXG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtU3VibWlzc2lvbiB7XG4gIHN0YXRlID0gRm9ybVN1Ym1pc3Npb25TdGF0ZS5pbml0aWFsaXplZFxuXG4gIHN0YXRpYyBjb25maXJtTWV0aG9kKG1lc3NhZ2UsIF9lbGVtZW50LCBfc3VibWl0dGVyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb25maXJtKG1lc3NhZ2UpKVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGZvcm1FbGVtZW50LCBzdWJtaXR0ZXIsIG11c3RSZWRpcmVjdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbWV0aG9kID0gZ2V0TWV0aG9kKGZvcm1FbGVtZW50LCBzdWJtaXR0ZXIpXG4gICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKGdldEZvcm1BY3Rpb24oZm9ybUVsZW1lbnQsIHN1Ym1pdHRlciksIG1ldGhvZClcbiAgICBjb25zdCBib2R5ID0gYnVpbGRGb3JtRGF0YShmb3JtRWxlbWVudCwgc3VibWl0dGVyKVxuICAgIGNvbnN0IGVuY3R5cGUgPSBnZXRFbmN0eXBlKGZvcm1FbGVtZW50LCBzdWJtaXR0ZXIpXG5cbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnRcbiAgICB0aGlzLnN1Ym1pdHRlciA9IHN1Ym1pdHRlclxuICAgIHRoaXMuZmV0Y2hSZXF1ZXN0ID0gbmV3IEZldGNoUmVxdWVzdCh0aGlzLCBtZXRob2QsIGFjdGlvbiwgYm9keSwgZm9ybUVsZW1lbnQsIGVuY3R5cGUpXG4gICAgdGhpcy5tdXN0UmVkaXJlY3QgPSBtdXN0UmVkaXJlY3RcbiAgfVxuXG4gIGdldCBtZXRob2QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hSZXF1ZXN0Lm1ldGhvZFxuICB9XG5cbiAgc2V0IG1ldGhvZCh2YWx1ZSkge1xuICAgIHRoaXMuZmV0Y2hSZXF1ZXN0Lm1ldGhvZCA9IHZhbHVlXG4gIH1cblxuICBnZXQgYWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmZldGNoUmVxdWVzdC51cmwudG9TdHJpbmcoKVxuICB9XG5cbiAgc2V0IGFjdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuZmV0Y2hSZXF1ZXN0LnVybCA9IGV4cGFuZFVSTCh2YWx1ZSlcbiAgfVxuXG4gIGdldCBib2R5KCkge1xuICAgIHJldHVybiB0aGlzLmZldGNoUmVxdWVzdC5ib2R5XG4gIH1cblxuICBnZXQgZW5jdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaFJlcXVlc3QuZW5jdHlwZVxuICB9XG5cbiAgZ2V0IGlzU2FmZSgpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaFJlcXVlc3QuaXNTYWZlXG4gIH1cblxuICBnZXQgbG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hSZXF1ZXN0LnVybFxuICB9XG5cbiAgLy8gVGhlIHN1Ym1pc3Npb24gcHJvY2Vzc1xuXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgaW5pdGlhbGl6ZWQsIHJlcXVlc3RpbmcgfSA9IEZvcm1TdWJtaXNzaW9uU3RhdGVcbiAgICBjb25zdCBjb25maXJtYXRpb25NZXNzYWdlID0gZ2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby1jb25maXJtXCIsIHRoaXMuc3VibWl0dGVyLCB0aGlzLmZvcm1FbGVtZW50KVxuXG4gICAgaWYgKHR5cGVvZiBjb25maXJtYXRpb25NZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBGb3JtU3VibWlzc2lvbi5jb25maXJtTWV0aG9kKGNvbmZpcm1hdGlvbk1lc3NhZ2UsIHRoaXMuZm9ybUVsZW1lbnQsIHRoaXMuc3VibWl0dGVyKVxuICAgICAgaWYgKCFhbnN3ZXIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUgPT0gaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSByZXF1ZXN0aW5nXG4gICAgICByZXR1cm4gdGhpcy5mZXRjaFJlcXVlc3QucGVyZm9ybSgpXG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBjb25zdCB7IHN0b3BwaW5nLCBzdG9wcGVkIH0gPSBGb3JtU3VibWlzc2lvblN0YXRlXG4gICAgaWYgKHRoaXMuc3RhdGUgIT0gc3RvcHBpbmcgJiYgdGhpcy5zdGF0ZSAhPSBzdG9wcGVkKSB7XG4gICAgICB0aGlzLnN0YXRlID0gc3RvcHBpbmdcbiAgICAgIHRoaXMuZmV0Y2hSZXF1ZXN0LmNhbmNlbCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8vIEZldGNoIHJlcXVlc3QgZGVsZWdhdGVcblxuICBwcmVwYXJlUmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgaWYgKCFyZXF1ZXN0LmlzU2FmZSkge1xuICAgICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWVWYWx1ZShnZXRNZXRhQ29udGVudChcImNzcmYtcGFyYW1cIikpIHx8IGdldE1ldGFDb250ZW50KFwiY3NyZi10b2tlblwiKVxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHJlcXVlc3QuaGVhZGVyc1tcIlgtQ1NSRi1Ub2tlblwiXSA9IHRva2VuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVxdWVzdEFjY2VwdHNUdXJib1N0cmVhbVJlc3BvbnNlKHJlcXVlc3QpKSB7XG4gICAgICByZXF1ZXN0LmFjY2VwdFJlc3BvbnNlVHlwZShTdHJlYW1NZXNzYWdlLmNvbnRlbnRUeXBlKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RTdGFydGVkKF9yZXF1ZXN0KSB7XG4gICAgdGhpcy5zdGF0ZSA9IEZvcm1TdWJtaXNzaW9uU3RhdGUud2FpdGluZ1xuICAgIHRoaXMuc3VibWl0dGVyPy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKVxuICAgIHRoaXMuc2V0U3VibWl0c1dpdGgoKVxuICAgIG1hcmtBc0J1c3kodGhpcy5mb3JtRWxlbWVudClcbiAgICBkaXNwYXRjaChcInR1cmJvOnN1Ym1pdC1zdGFydFwiLCB7XG4gICAgICB0YXJnZXQ6IHRoaXMuZm9ybUVsZW1lbnQsXG4gICAgICBkZXRhaWw6IHsgZm9ybVN1Ym1pc3Npb246IHRoaXMgfVxuICAgIH0pXG4gICAgdGhpcy5kZWxlZ2F0ZS5mb3JtU3VibWlzc2lvblN0YXJ0ZWQodGhpcylcbiAgfVxuXG4gIHJlcXVlc3RQcmV2ZW50ZWRIYW5kbGluZ1Jlc3BvbnNlKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgcHJlZmV0Y2hDYWNoZS5jbGVhcigpXG5cbiAgICB0aGlzLnJlc3VsdCA9IHsgc3VjY2VzczogcmVzcG9uc2Uuc3VjY2VlZGVkLCBmZXRjaFJlc3BvbnNlOiByZXNwb25zZSB9XG4gIH1cblxuICByZXF1ZXN0U3VjY2VlZGVkV2l0aFJlc3BvbnNlKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLmNsaWVudEVycm9yIHx8IHJlc3BvbnNlLnNlcnZlckVycm9yKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLmZvcm1TdWJtaXNzaW9uRmFpbGVkV2l0aFJlc3BvbnNlKHRoaXMsIHJlc3BvbnNlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcHJlZmV0Y2hDYWNoZS5jbGVhcigpXG5cbiAgICBpZiAodGhpcy5yZXF1ZXN0TXVzdFJlZGlyZWN0KHJlcXVlc3QpICYmIHJlc3BvbnNlU3VjY2VlZGVkV2l0aG91dFJlZGlyZWN0KHJlc3BvbnNlKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXCJGb3JtIHJlc3BvbnNlcyBtdXN0IHJlZGlyZWN0IHRvIGFub3RoZXIgbG9jYXRpb25cIilcbiAgICAgIHRoaXMuZGVsZWdhdGUuZm9ybVN1Ym1pc3Npb25FcnJvcmVkKHRoaXMsIGVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0gRm9ybVN1Ym1pc3Npb25TdGF0ZS5yZWNlaXZpbmdcbiAgICAgIHRoaXMucmVzdWx0ID0geyBzdWNjZXNzOiB0cnVlLCBmZXRjaFJlc3BvbnNlOiByZXNwb25zZSB9XG4gICAgICB0aGlzLmRlbGVnYXRlLmZvcm1TdWJtaXNzaW9uU3VjY2VlZGVkV2l0aFJlc3BvbnNlKHRoaXMsIHJlc3BvbnNlKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RGYWlsZWRXaXRoUmVzcG9uc2UocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHsgc3VjY2VzczogZmFsc2UsIGZldGNoUmVzcG9uc2U6IHJlc3BvbnNlIH1cbiAgICB0aGlzLmRlbGVnYXRlLmZvcm1TdWJtaXNzaW9uRmFpbGVkV2l0aFJlc3BvbnNlKHRoaXMsIHJlc3BvbnNlKVxuICB9XG5cbiAgcmVxdWVzdEVycm9yZWQocmVxdWVzdCwgZXJyb3IpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHsgc3VjY2VzczogZmFsc2UsIGVycm9yIH1cbiAgICB0aGlzLmRlbGVnYXRlLmZvcm1TdWJtaXNzaW9uRXJyb3JlZCh0aGlzLCBlcnJvcilcbiAgfVxuXG4gIHJlcXVlc3RGaW5pc2hlZChfcmVxdWVzdCkge1xuICAgIHRoaXMuc3RhdGUgPSBGb3JtU3VibWlzc2lvblN0YXRlLnN0b3BwZWRcbiAgICB0aGlzLnN1Ym1pdHRlcj8ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIilcbiAgICB0aGlzLnJlc2V0U3VibWl0dGVyVGV4dCgpXG4gICAgY2xlYXJCdXN5U3RhdGUodGhpcy5mb3JtRWxlbWVudClcbiAgICBkaXNwYXRjaChcInR1cmJvOnN1Ym1pdC1lbmRcIiwge1xuICAgICAgdGFyZ2V0OiB0aGlzLmZvcm1FbGVtZW50LFxuICAgICAgZGV0YWlsOiB7IGZvcm1TdWJtaXNzaW9uOiB0aGlzLCAuLi50aGlzLnJlc3VsdCB9XG4gICAgfSlcbiAgICB0aGlzLmRlbGVnYXRlLmZvcm1TdWJtaXNzaW9uRmluaXNoZWQodGhpcylcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBzZXRTdWJtaXRzV2l0aCgpIHtcbiAgICBpZiAoIXRoaXMuc3VibWl0dGVyIHx8ICF0aGlzLnN1Ym1pdHNXaXRoKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnN1Ym1pdHRlci5tYXRjaGVzKFwiYnV0dG9uXCIpKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsU3VibWl0VGV4dCA9IHRoaXMuc3VibWl0dGVyLmlubmVySFRNTFxuICAgICAgdGhpcy5zdWJtaXR0ZXIuaW5uZXJIVE1MID0gdGhpcy5zdWJtaXRzV2l0aFxuICAgIH0gZWxzZSBpZiAodGhpcy5zdWJtaXR0ZXIubWF0Y2hlcyhcImlucHV0XCIpKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuc3VibWl0dGVyXG4gICAgICB0aGlzLm9yaWdpbmFsU3VibWl0VGV4dCA9IGlucHV0LnZhbHVlXG4gICAgICBpbnB1dC52YWx1ZSA9IHRoaXMuc3VibWl0c1dpdGhcbiAgICB9XG4gIH1cblxuICByZXNldFN1Ym1pdHRlclRleHQoKSB7XG4gICAgaWYgKCF0aGlzLnN1Ym1pdHRlciB8fCAhdGhpcy5vcmlnaW5hbFN1Ym1pdFRleHQpIHJldHVyblxuXG4gICAgaWYgKHRoaXMuc3VibWl0dGVyLm1hdGNoZXMoXCJidXR0b25cIikpIHtcbiAgICAgIHRoaXMuc3VibWl0dGVyLmlubmVySFRNTCA9IHRoaXMub3JpZ2luYWxTdWJtaXRUZXh0XG4gICAgfSBlbHNlIGlmICh0aGlzLnN1Ym1pdHRlci5tYXRjaGVzKFwiaW5wdXRcIikpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5zdWJtaXR0ZXJcbiAgICAgIGlucHV0LnZhbHVlID0gdGhpcy5vcmlnaW5hbFN1Ym1pdFRleHRcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0TXVzdFJlZGlyZWN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gIXJlcXVlc3QuaXNTYWZlICYmIHRoaXMubXVzdFJlZGlyZWN0XG4gIH1cblxuICByZXF1ZXN0QWNjZXB0c1R1cmJvU3RyZWFtUmVzcG9uc2UocmVxdWVzdCkge1xuICAgIHJldHVybiAhcmVxdWVzdC5pc1NhZmUgfHwgaGFzQXR0cmlidXRlKFwiZGF0YS10dXJiby1zdHJlYW1cIiwgdGhpcy5zdWJtaXR0ZXIsIHRoaXMuZm9ybUVsZW1lbnQpXG4gIH1cblxuICBnZXQgc3VibWl0c1dpdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VibWl0dGVyPy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXN1Ym1pdHMtd2l0aFwiKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybURhdGEoZm9ybUVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtRWxlbWVudClcbiAgY29uc3QgbmFtZSA9IHN1Ym1pdHRlcj8uZ2V0QXR0cmlidXRlKFwibmFtZVwiKVxuICBjb25zdCB2YWx1ZSA9IHN1Ym1pdHRlcj8uZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcblxuICBpZiAobmFtZSkge1xuICAgIGZvcm1EYXRhLmFwcGVuZChuYW1lLCB2YWx1ZSB8fCBcIlwiKVxuICB9XG5cbiAgcmV0dXJuIGZvcm1EYXRhXG59XG5cbmZ1bmN0aW9uIGdldENvb2tpZVZhbHVlKGNvb2tpZU5hbWUpIHtcbiAgaWYgKGNvb2tpZU5hbWUgIT0gbnVsbCkge1xuICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKSA6IFtdXG4gICAgY29uc3QgY29va2llID0gY29va2llcy5maW5kKChjb29raWUpID0+IGNvb2tpZS5zdGFydHNXaXRoKGNvb2tpZU5hbWUpKVxuICAgIGlmIChjb29raWUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY29va2llLnNwbGl0KFwiPVwiKS5zbGljZSgxKS5qb2luKFwiPVwiKVxuICAgICAgcmV0dXJuIHZhbHVlID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNwb25zZVN1Y2NlZWRlZFdpdGhvdXRSZWRpcmVjdChyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDAgJiYgIXJlc3BvbnNlLnJlZGlyZWN0ZWRcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybUFjdGlvbihmb3JtRWxlbWVudCwgc3VibWl0dGVyKSB7XG4gIGNvbnN0IGZvcm1FbGVtZW50QWN0aW9uID0gdHlwZW9mIGZvcm1FbGVtZW50LmFjdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGZvcm1FbGVtZW50LmFjdGlvbiA6IG51bGxcblxuICBpZiAoc3VibWl0dGVyPy5oYXNBdHRyaWJ1dGUoXCJmb3JtYWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIHN1Ym1pdHRlci5nZXRBdHRyaWJ1dGUoXCJmb3JtYWN0aW9uXCIpIHx8IFwiXCJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpIHx8IGZvcm1FbGVtZW50QWN0aW9uIHx8IFwiXCJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBY3Rpb24oZm9ybUFjdGlvbiwgZmV0Y2hNZXRob2QpIHtcbiAgY29uc3QgYWN0aW9uID0gZXhwYW5kVVJMKGZvcm1BY3Rpb24pXG5cbiAgaWYgKGlzU2FmZShmZXRjaE1ldGhvZCkpIHtcbiAgICBhY3Rpb24uc2VhcmNoID0gXCJcIlxuICB9XG5cbiAgcmV0dXJuIGFjdGlvblxufVxuXG5mdW5jdGlvbiBnZXRNZXRob2QoZm9ybUVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICBjb25zdCBtZXRob2QgPSBzdWJtaXR0ZXI/LmdldEF0dHJpYnV0ZShcImZvcm1tZXRob2RcIikgfHwgZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibWV0aG9kXCIpIHx8IFwiXCJcbiAgcmV0dXJuIGZldGNoTWV0aG9kRnJvbVN0cmluZyhtZXRob2QudG9Mb3dlckNhc2UoKSkgfHwgRmV0Y2hNZXRob2QuZ2V0XG59XG5cbmZ1bmN0aW9uIGdldEVuY3R5cGUoZm9ybUVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICByZXR1cm4gZmV0Y2hFbmN0eXBlRnJvbVN0cmluZyhzdWJtaXR0ZXI/LmdldEF0dHJpYnV0ZShcImZvcm1lbmN0eXBlXCIpIHx8IGZvcm1FbGVtZW50LmVuY3R5cGUpXG59XG4iLCAiaW1wb3J0IHsgcXVlcnlBdXRvZm9jdXNhYmxlRWxlbWVudCB9IGZyb20gXCIuLi91dGlsXCJcblxuZXhwb3J0IGNsYXNzIFNuYXBzaG90IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgfVxuXG4gIGdldCBhY3RpdmVFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gIH1cblxuICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIFsuLi50aGlzLmVsZW1lbnQuY2hpbGRyZW5dXG4gIH1cblxuICBoYXNBbmNob3IoYW5jaG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudEZvckFuY2hvcihhbmNob3IpICE9IG51bGxcbiAgfVxuXG4gIGdldEVsZW1lbnRGb3JBbmNob3IoYW5jaG9yKSB7XG4gICAgcmV0dXJuIGFuY2hvciA/IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbaWQ9JyR7YW5jaG9yfSddLCBhW25hbWU9JyR7YW5jaG9yfSddYCkgOiBudWxsXG4gIH1cblxuICBnZXQgaXNDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5pc0Nvbm5lY3RlZFxuICB9XG5cbiAgZ2V0IGZpcnN0QXV0b2ZvY3VzYWJsZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHF1ZXJ5QXV0b2ZvY3VzYWJsZUVsZW1lbnQodGhpcy5lbGVtZW50KVxuICB9XG5cbiAgZ2V0IHBlcm1hbmVudEVsZW1lbnRzKCkge1xuICAgIHJldHVybiBxdWVyeVBlcm1hbmVudEVsZW1lbnRzQWxsKHRoaXMuZWxlbWVudClcbiAgfVxuXG4gIGdldFBlcm1hbmVudEVsZW1lbnRCeUlkKGlkKSB7XG4gICAgcmV0dXJuIGdldFBlcm1hbmVudEVsZW1lbnRCeUlkKHRoaXMuZWxlbWVudCwgaWQpXG4gIH1cblxuICBnZXRQZXJtYW5lbnRFbGVtZW50TWFwRm9yU25hcHNob3Qoc25hcHNob3QpIHtcbiAgICBjb25zdCBwZXJtYW5lbnRFbGVtZW50TWFwID0ge31cblxuICAgIGZvciAoY29uc3QgY3VycmVudFBlcm1hbmVudEVsZW1lbnQgb2YgdGhpcy5wZXJtYW5lbnRFbGVtZW50cykge1xuICAgICAgY29uc3QgeyBpZCB9ID0gY3VycmVudFBlcm1hbmVudEVsZW1lbnRcbiAgICAgIGNvbnN0IG5ld1Blcm1hbmVudEVsZW1lbnQgPSBzbmFwc2hvdC5nZXRQZXJtYW5lbnRFbGVtZW50QnlJZChpZClcbiAgICAgIGlmIChuZXdQZXJtYW5lbnRFbGVtZW50KSB7XG4gICAgICAgIHBlcm1hbmVudEVsZW1lbnRNYXBbaWRdID0gW2N1cnJlbnRQZXJtYW5lbnRFbGVtZW50LCBuZXdQZXJtYW5lbnRFbGVtZW50XVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwZXJtYW5lbnRFbGVtZW50TWFwXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlcm1hbmVudEVsZW1lbnRCeUlkKG5vZGUsIGlkKSB7XG4gIHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3IoYCMke2lkfVtkYXRhLXR1cmJvLXBlcm1hbmVudF1gKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlQZXJtYW5lbnRFbGVtZW50c0FsbChub2RlKSB7XG4gIHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbaWRdW2RhdGEtdHVyYm8tcGVybWFuZW50XVwiKVxufVxuIiwgImV4cG9ydCBjbGFzcyBGb3JtU3VibWl0T2JzZXJ2ZXIge1xuICBzdGFydGVkID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgZXZlbnRUYXJnZXQpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgICB0aGlzLmV2ZW50VGFyZ2V0ID0gZXZlbnRUYXJnZXRcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLmV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRDYXB0dXJlZCwgdHJ1ZSlcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMuZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdENhcHR1cmVkLCB0cnVlKVxuICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBzdWJtaXRDYXB0dXJlZCA9ICgpID0+IHtcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRCdWJibGVkLCBmYWxzZSlcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRCdWJibGVkLCBmYWxzZSlcbiAgfVxuXG4gIHN1Ym1pdEJ1YmJsZWQgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgPyBldmVudC50YXJnZXQgOiB1bmRlZmluZWRcbiAgICAgIGNvbnN0IHN1Ym1pdHRlciA9IGV2ZW50LnN1Ym1pdHRlciB8fCB1bmRlZmluZWRcblxuICAgICAgaWYgKFxuICAgICAgICBmb3JtICYmXG4gICAgICAgIHN1Ym1pc3Npb25Eb2VzTm90RGlzbWlzc0RpYWxvZyhmb3JtLCBzdWJtaXR0ZXIpICYmXG4gICAgICAgIHN1Ym1pc3Npb25Eb2VzTm90VGFyZ2V0SUZyYW1lKGZvcm0sIHN1Ym1pdHRlcikgJiZcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS53aWxsU3VibWl0Rm9ybShmb3JtLCBzdWJtaXR0ZXIpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICAgICAgICB0aGlzLmRlbGVnYXRlLmZvcm1TdWJtaXR0ZWQoZm9ybSwgc3VibWl0dGVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdWJtaXNzaW9uRG9lc05vdERpc21pc3NEaWFsb2coZm9ybSwgc3VibWl0dGVyKSB7XG4gIGNvbnN0IG1ldGhvZCA9IHN1Ym1pdHRlcj8uZ2V0QXR0cmlidXRlKFwiZm9ybW1ldGhvZFwiKSB8fCBmb3JtLmdldEF0dHJpYnV0ZShcIm1ldGhvZFwiKVxuXG4gIHJldHVybiBtZXRob2QgIT0gXCJkaWFsb2dcIlxufVxuXG5mdW5jdGlvbiBzdWJtaXNzaW9uRG9lc05vdFRhcmdldElGcmFtZShmb3JtLCBzdWJtaXR0ZXIpIHtcbiAgaWYgKHN1Ym1pdHRlcj8uaGFzQXR0cmlidXRlKFwiZm9ybXRhcmdldFwiKSB8fCBmb3JtLmhhc0F0dHJpYnV0ZShcInRhcmdldFwiKSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHN1Ym1pdHRlcj8uZ2V0QXR0cmlidXRlKFwiZm9ybXRhcmdldFwiKSB8fCBmb3JtLnRhcmdldFxuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHRhcmdldCkpIHtcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuIiwgImltcG9ydCB7IGdldEFuY2hvciB9IGZyb20gXCIuL3VybFwiXG5cbmV4cG9ydCBjbGFzcyBWaWV3IHtcbiAgI3Jlc29sdmVSZW5kZXJQcm9taXNlID0gKF92YWx1ZSkgPT4ge31cbiAgI3Jlc29sdmVJbnRlcmNlcHRpb25Qcm9taXNlID0gKF92YWx1ZSkgPT4ge31cblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgZWxlbWVudCkge1xuICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgfVxuXG4gIC8vIFNjcm9sbGluZ1xuXG4gIHNjcm9sbFRvQW5jaG9yKGFuY2hvcikge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnNuYXBzaG90LmdldEVsZW1lbnRGb3JBbmNob3IoYW5jaG9yKVxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB0aGlzLnNjcm9sbFRvRWxlbWVudChlbGVtZW50KVxuICAgICAgdGhpcy5mb2N1c0VsZW1lbnQoZWxlbWVudClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY3JvbGxUb1Bvc2l0aW9uKHsgeDogMCwgeTogMCB9KVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvQW5jaG9yRnJvbUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgdGhpcy5zY3JvbGxUb0FuY2hvcihnZXRBbmNob3IobG9jYXRpb24pKVxuICB9XG5cbiAgc2Nyb2xsVG9FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KClcbiAgfVxuXG4gIGZvY3VzRWxlbWVudChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKFwidGFiaW5kZXhcIikpIHtcbiAgICAgICAgZWxlbWVudC5mb2N1cygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIilcbiAgICAgICAgZWxlbWVudC5mb2N1cygpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1Bvc2l0aW9uKHsgeCwgeSB9KSB7XG4gICAgdGhpcy5zY3JvbGxSb290LnNjcm9sbFRvKHgsIHkpXG4gIH1cblxuICBzY3JvbGxUb1RvcCgpIHtcbiAgICB0aGlzLnNjcm9sbFRvUG9zaXRpb24oeyB4OiAwLCB5OiAwIH0pXG4gIH1cblxuICBnZXQgc2Nyb2xsUm9vdCgpIHtcbiAgICByZXR1cm4gd2luZG93XG4gIH1cblxuICAvLyBSZW5kZXJpbmdcblxuICBhc3luYyByZW5kZXIocmVuZGVyZXIpIHtcbiAgICBjb25zdCB7IGlzUHJldmlldywgc2hvdWxkUmVuZGVyLCB3aWxsUmVuZGVyLCBuZXdTbmFwc2hvdDogc25hcHNob3QgfSA9IHJlbmRlcmVyXG5cbiAgICAvLyBBIHdvcmthcm91bmQgdG8gaWdub3JlIHRyYWNrZWQgZWxlbWVudCBtaXNtYXRjaCByZWxvYWRzIHdoZW4gcGVyZm9ybWluZ1xuICAgIC8vIGEgcHJvbW90ZWQgVmlzaXQgZnJvbSBhIGZyYW1lIG5hdmlnYXRpb25cbiAgICBjb25zdCBzaG91bGRJbnZhbGlkYXRlID0gd2lsbFJlbmRlclxuXG4gICAgaWYgKHNob3VsZFJlbmRlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5yZW5kZXJQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+ICh0aGlzLiNyZXNvbHZlUmVuZGVyUHJvbWlzZSA9IHJlc29sdmUpKVxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXJcbiAgICAgICAgYXdhaXQgdGhpcy5wcmVwYXJlVG9SZW5kZXJTbmFwc2hvdChyZW5kZXJlcilcblxuICAgICAgICBjb25zdCByZW5kZXJJbnRlcmNlcHRpb24gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gKHRoaXMuI3Jlc29sdmVJbnRlcmNlcHRpb25Qcm9taXNlID0gcmVzb2x2ZSkpXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHJlc3VtZTogdGhpcy4jcmVzb2x2ZUludGVyY2VwdGlvblByb21pc2UsIHJlbmRlcjogdGhpcy5yZW5kZXJlci5yZW5kZXJFbGVtZW50LCByZW5kZXJNZXRob2Q6IHRoaXMucmVuZGVyZXIucmVuZGVyTWV0aG9kIH1cbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUmVuZGVyID0gdGhpcy5kZWxlZ2F0ZS5hbGxvd3NJbW1lZGlhdGVSZW5kZXIoc25hcHNob3QsIG9wdGlvbnMpXG4gICAgICAgIGlmICghaW1tZWRpYXRlUmVuZGVyKSBhd2FpdCByZW5kZXJJbnRlcmNlcHRpb25cblxuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlclNuYXBzaG90KHJlbmRlcmVyKVxuICAgICAgICB0aGlzLmRlbGVnYXRlLnZpZXdSZW5kZXJlZFNuYXBzaG90KHNuYXBzaG90LCBpc1ByZXZpZXcsIHRoaXMucmVuZGVyZXIucmVuZGVyTWV0aG9kKVxuICAgICAgICB0aGlzLmRlbGVnYXRlLnByZWxvYWRPbkxvYWRMaW5rc0ZvclZpZXcodGhpcy5lbGVtZW50KVxuICAgICAgICB0aGlzLmZpbmlzaFJlbmRlcmluZ1NuYXBzaG90KHJlbmRlcmVyKVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIHRoaXMucmVuZGVyZXJcbiAgICAgICAgdGhpcy4jcmVzb2x2ZVJlbmRlclByb21pc2UodW5kZWZpbmVkKVxuICAgICAgICBkZWxldGUgdGhpcy5yZW5kZXJQcm9taXNlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaG91bGRJbnZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGUocmVuZGVyZXIucmVsb2FkUmVhc29uKVxuICAgIH1cbiAgfVxuXG4gIGludmFsaWRhdGUocmVhc29uKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZS52aWV3SW52YWxpZGF0ZWQocmVhc29uKVxuICB9XG5cbiAgYXN5bmMgcHJlcGFyZVRvUmVuZGVyU25hcHNob3QocmVuZGVyZXIpIHtcbiAgICB0aGlzLm1hcmtBc1ByZXZpZXcocmVuZGVyZXIuaXNQcmV2aWV3KVxuICAgIGF3YWl0IHJlbmRlcmVyLnByZXBhcmVUb1JlbmRlcigpXG4gIH1cblxuICBtYXJrQXNQcmV2aWV3KGlzUHJldmlldykge1xuICAgIGlmIChpc1ByZXZpZXcpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXByZXZpZXdcIiwgXCJcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtdHVyYm8tcHJldmlld1wiKVxuICAgIH1cbiAgfVxuXG4gIG1hcmtWaXNpdERpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby12aXNpdC1kaXJlY3Rpb25cIiwgZGlyZWN0aW9uKVxuICB9XG5cbiAgdW5tYXJrVmlzaXREaXJlY3Rpb24oKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtdHVyYm8tdmlzaXQtZGlyZWN0aW9uXCIpXG4gIH1cblxuICBhc3luYyByZW5kZXJTbmFwc2hvdChyZW5kZXJlcikge1xuICAgIGF3YWl0IHJlbmRlcmVyLnJlbmRlcigpXG4gIH1cblxuICBmaW5pc2hSZW5kZXJpbmdTbmFwc2hvdChyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLmZpbmlzaFJlbmRlcmluZygpXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTbmFwc2hvdCB9IGZyb20gXCIuLi9zbmFwc2hvdFwiXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uL3ZpZXdcIlxuXG5leHBvcnQgY2xhc3MgRnJhbWVWaWV3IGV4dGVuZHMgVmlldyB7XG4gIG1pc3NpbmcoKSB7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IGA8c3Ryb25nIGNsYXNzPVwidHVyYm8tZnJhbWUtZXJyb3JcIj5Db250ZW50IG1pc3Npbmc8L3N0cm9uZz5gXG4gIH1cblxuICBnZXQgc25hcHNob3QoKSB7XG4gICAgcmV0dXJuIG5ldyBTbmFwc2hvdCh0aGlzLmVsZW1lbnQpXG4gIH1cbn1cbiIsICJleHBvcnQgY2xhc3MgTGlua0ludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGVsZW1lbnQpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tCdWJibGVkKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJibzpjbGlja1wiLCB0aGlzLmxpbmtDbGlja2VkKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJibzpiZWZvcmUtdmlzaXRcIiwgdGhpcy53aWxsVmlzaXQpXG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0J1YmJsZWQpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInR1cmJvOmNsaWNrXCIsIHRoaXMubGlua0NsaWNrZWQpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInR1cmJvOmJlZm9yZS12aXNpdFwiLCB0aGlzLndpbGxWaXNpdClcbiAgfVxuXG4gIGNsaWNrQnViYmxlZCA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnJlc3BvbmRzVG9FdmVudFRhcmdldChldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNsaWNrRXZlbnQgPSBldmVudFxuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5jbGlja0V2ZW50XG4gICAgfVxuICB9XG5cbiAgbGlua0NsaWNrZWQgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5jbGlja0V2ZW50ICYmIHRoaXMucmVzcG9uZHNUb0V2ZW50VGFyZ2V0KGV2ZW50LnRhcmdldCkgJiYgZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc2hvdWxkSW50ZXJjZXB0TGlua0NsaWNrKGV2ZW50LnRhcmdldCwgZXZlbnQuZGV0YWlsLnVybCwgZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQpKSB7XG4gICAgICAgIHRoaXMuY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5saW5rQ2xpY2tJbnRlcmNlcHRlZChldmVudC50YXJnZXQsIGV2ZW50LmRldGFpbC51cmwsIGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUgdGhpcy5jbGlja0V2ZW50XG4gIH1cblxuICB3aWxsVmlzaXQgPSAoX2V2ZW50KSA9PiB7XG4gICAgZGVsZXRlIHRoaXMuY2xpY2tFdmVudFxuICB9XG5cbiAgcmVzcG9uZHNUb0V2ZW50VGFyZ2V0KHRhcmdldCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ID8gdGFyZ2V0IDogdGFyZ2V0IGluc3RhbmNlb2YgTm9kZSA/IHRhcmdldC5wYXJlbnRFbGVtZW50IDogbnVsbFxuICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuY2xvc2VzdChcInR1cmJvLWZyYW1lLCBodG1sXCIpID09IHRoaXMuZWxlbWVudFxuICB9XG59XG4iLCAiaW1wb3J0IHsgZG9lc05vdFRhcmdldElGcmFtZSwgZmluZExpbmtGcm9tQ2xpY2tUYXJnZXQsIGdldExvY2F0aW9uRm9yTGluayB9IGZyb20gXCIuLi91dGlsXCJcblxuZXhwb3J0IGNsYXNzIExpbmtDbGlja09ic2VydmVyIHtcbiAgc3RhcnRlZCA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGV2ZW50VGFyZ2V0KSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlXG4gICAgdGhpcy5ldmVudFRhcmdldCA9IGV2ZW50VGFyZ2V0XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgdGhpcy5ldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0NhcHR1cmVkLCB0cnVlKVxuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgdGhpcy5ldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0NhcHR1cmVkLCB0cnVlKVxuICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBjbGlja0NhcHR1cmVkID0gKCkgPT4ge1xuICAgIHRoaXMuZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tCdWJibGVkLCBmYWxzZSlcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrQnViYmxlZCwgZmFsc2UpXG4gIH1cblxuICBjbGlja0J1YmJsZWQgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmIHRoaXMuY2xpY2tFdmVudElzU2lnbmlmaWNhbnQoZXZlbnQpKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAoZXZlbnQuY29tcG9zZWRQYXRoICYmIGV2ZW50LmNvbXBvc2VkUGF0aCgpWzBdKSB8fCBldmVudC50YXJnZXRcbiAgICAgIGNvbnN0IGxpbmsgPSBmaW5kTGlua0Zyb21DbGlja1RhcmdldCh0YXJnZXQpXG4gICAgICBpZiAobGluayAmJiBkb2VzTm90VGFyZ2V0SUZyYW1lKGxpbmspKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2V0TG9jYXRpb25Gb3JMaW5rKGxpbmspXG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLndpbGxGb2xsb3dMaW5rVG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbiwgZXZlbnQpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZm9sbG93ZWRMaW5rVG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsaWNrRXZlbnRJc1NpZ25pZmljYW50KGV2ZW50KSB7XG4gICAgcmV0dXJuICEoXG4gICAgICAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSkgfHxcbiAgICAgIGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgfHxcbiAgICAgIGV2ZW50LndoaWNoID4gMSB8fFxuICAgICAgZXZlbnQuYWx0S2V5IHx8XG4gICAgICBldmVudC5jdHJsS2V5IHx8XG4gICAgICBldmVudC5tZXRhS2V5IHx8XG4gICAgICBldmVudC5zaGlmdEtleVxuICAgIClcbiAgfVxufVxuIiwgImltcG9ydCB7IExpbmtDbGlja09ic2VydmVyIH0gZnJvbSBcIi4vbGlua19jbGlja19vYnNlcnZlclwiXG5pbXBvcnQgeyBnZXRWaXNpdEFjdGlvbiB9IGZyb20gXCIuLi91dGlsXCJcblxuZXhwb3J0IGNsYXNzIEZvcm1MaW5rQ2xpY2tPYnNlcnZlciB7XG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRlLCBlbGVtZW50KSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlXG4gICAgdGhpcy5saW5rSW50ZXJjZXB0b3IgPSBuZXcgTGlua0NsaWNrT2JzZXJ2ZXIodGhpcywgZWxlbWVudClcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMubGlua0ludGVyY2VwdG9yLnN0YXJ0KClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5saW5rSW50ZXJjZXB0b3Iuc3RvcCgpXG4gIH1cblxuICAvLyBMaW5rIGhvdmVyIG9ic2VydmVyIGRlbGVnYXRlXG5cbiAgY2FuUHJlZmV0Y2hSZXF1ZXN0VG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcHJlZmV0Y2hBbmRDYWNoZVJlcXVlc3RUb0xvY2F0aW9uKGxpbmssIGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBMaW5rIGNsaWNrIG9ic2VydmVyIGRlbGVnYXRlXG5cbiAgd2lsbEZvbGxvd0xpbmtUb0xvY2F0aW9uKGxpbmssIGxvY2F0aW9uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZGVsZWdhdGUud2lsbFN1Ym1pdEZvcm1MaW5rVG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbiwgb3JpZ2luYWxFdmVudCkgJiZcbiAgICAgIChsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtdHVyYm8tbWV0aG9kXCIpIHx8IGxpbmsuaGFzQXR0cmlidXRlKFwiZGF0YS10dXJiby1zdHJlYW1cIikpXG4gICAgKVxuICB9XG5cbiAgZm9sbG93ZWRMaW5rVG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbikge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKVxuXG4gICAgY29uc3QgdHlwZSA9IFwiaGlkZGVuXCJcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgbG9jYXRpb24uc2VhcmNoUGFyYW1zKSB7XG4gICAgICBmb3JtLmFwcGVuZChPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSwgeyB0eXBlLCBuYW1lLCB2YWx1ZSB9KSlcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb24gPSBPYmplY3QuYXNzaWduKGxvY2F0aW9uLCB7IHNlYXJjaDogXCJcIiB9KVxuICAgIGZvcm0uc2V0QXR0cmlidXRlKFwiZGF0YS10dXJib1wiLCBcInRydWVcIilcbiAgICBmb3JtLnNldEF0dHJpYnV0ZShcImFjdGlvblwiLCBhY3Rpb24uaHJlZilcbiAgICBmb3JtLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKVxuXG4gICAgY29uc3QgbWV0aG9kID0gbGluay5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLW1ldGhvZFwiKVxuICAgIGlmIChtZXRob2QpIGZvcm0uc2V0QXR0cmlidXRlKFwibWV0aG9kXCIsIG1ldGhvZClcblxuICAgIGNvbnN0IHR1cmJvRnJhbWUgPSBsaW5rLmdldEF0dHJpYnV0ZShcImRhdGEtdHVyYm8tZnJhbWVcIilcbiAgICBpZiAodHVyYm9GcmFtZSkgZm9ybS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWZyYW1lXCIsIHR1cmJvRnJhbWUpXG5cbiAgICBjb25zdCB0dXJib0FjdGlvbiA9IGdldFZpc2l0QWN0aW9uKGxpbmspXG4gICAgaWYgKHR1cmJvQWN0aW9uKSBmb3JtLnNldEF0dHJpYnV0ZShcImRhdGEtdHVyYm8tYWN0aW9uXCIsIHR1cmJvQWN0aW9uKVxuXG4gICAgY29uc3QgdHVyYm9Db25maXJtID0gbGluay5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWNvbmZpcm1cIilcbiAgICBpZiAodHVyYm9Db25maXJtKSBmb3JtLnNldEF0dHJpYnV0ZShcImRhdGEtdHVyYm8tY29uZmlybVwiLCB0dXJib0NvbmZpcm0pXG5cbiAgICBjb25zdCB0dXJib1N0cmVhbSA9IGxpbmsuaGFzQXR0cmlidXRlKFwiZGF0YS10dXJiby1zdHJlYW1cIilcbiAgICBpZiAodHVyYm9TdHJlYW0pIGZvcm0uc2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby1zdHJlYW1cIiwgXCJcIilcblxuICAgIHRoaXMuZGVsZWdhdGUuc3VibWl0dGVkRm9ybUxpbmtUb0xvY2F0aW9uKGxpbmssIGxvY2F0aW9uLCBmb3JtKVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKVxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInR1cmJvOnN1Ym1pdC1lbmRcIiwgKCkgPT4gZm9ybS5yZW1vdmUoKSwgeyBvbmNlOiB0cnVlIH0pXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGZvcm0ucmVxdWVzdFN1Ym1pdCgpKVxuICB9XG59XG4iLCAiZXhwb3J0IGNsYXNzIEJhcmRvIHtcbiAgc3RhdGljIGFzeW5jIHByZXNlcnZpbmdQZXJtYW5lbnRFbGVtZW50cyhkZWxlZ2F0ZSwgcGVybWFuZW50RWxlbWVudE1hcCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBiYXJkbyA9IG5ldyB0aGlzKGRlbGVnYXRlLCBwZXJtYW5lbnRFbGVtZW50TWFwKVxuICAgIGJhcmRvLmVudGVyKClcbiAgICBhd2FpdCBjYWxsYmFjaygpXG4gICAgYmFyZG8ubGVhdmUoKVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUsIHBlcm1hbmVudEVsZW1lbnRNYXApIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgICB0aGlzLnBlcm1hbmVudEVsZW1lbnRNYXAgPSBwZXJtYW5lbnRFbGVtZW50TWFwXG4gIH1cblxuICBlbnRlcigpIHtcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMucGVybWFuZW50RWxlbWVudE1hcCkge1xuICAgICAgY29uc3QgW2N1cnJlbnRQZXJtYW5lbnRFbGVtZW50LCBuZXdQZXJtYW5lbnRFbGVtZW50XSA9IHRoaXMucGVybWFuZW50RWxlbWVudE1hcFtpZF1cbiAgICAgIHRoaXMuZGVsZWdhdGUuZW50ZXJpbmdCYXJkbyhjdXJyZW50UGVybWFuZW50RWxlbWVudCwgbmV3UGVybWFuZW50RWxlbWVudClcbiAgICAgIHRoaXMucmVwbGFjZU5ld1Blcm1hbmVudEVsZW1lbnRXaXRoUGxhY2Vob2xkZXIobmV3UGVybWFuZW50RWxlbWVudClcbiAgICB9XG4gIH1cblxuICBsZWF2ZSgpIHtcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMucGVybWFuZW50RWxlbWVudE1hcCkge1xuICAgICAgY29uc3QgW2N1cnJlbnRQZXJtYW5lbnRFbGVtZW50XSA9IHRoaXMucGVybWFuZW50RWxlbWVudE1hcFtpZF1cbiAgICAgIHRoaXMucmVwbGFjZUN1cnJlbnRQZXJtYW5lbnRFbGVtZW50V2l0aENsb25lKGN1cnJlbnRQZXJtYW5lbnRFbGVtZW50KVxuICAgICAgdGhpcy5yZXBsYWNlUGxhY2Vob2xkZXJXaXRoUGVybWFuZW50RWxlbWVudChjdXJyZW50UGVybWFuZW50RWxlbWVudClcbiAgICAgIHRoaXMuZGVsZWdhdGUubGVhdmluZ0JhcmRvKGN1cnJlbnRQZXJtYW5lbnRFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHJlcGxhY2VOZXdQZXJtYW5lbnRFbGVtZW50V2l0aFBsYWNlaG9sZGVyKHBlcm1hbmVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IGNyZWF0ZVBsYWNlaG9sZGVyRm9yUGVybWFuZW50RWxlbWVudChwZXJtYW5lbnRFbGVtZW50KVxuICAgIHBlcm1hbmVudEVsZW1lbnQucmVwbGFjZVdpdGgocGxhY2Vob2xkZXIpXG4gIH1cblxuICByZXBsYWNlQ3VycmVudFBlcm1hbmVudEVsZW1lbnRXaXRoQ2xvbmUocGVybWFuZW50RWxlbWVudCkge1xuICAgIGNvbnN0IGNsb25lID0gcGVybWFuZW50RWxlbWVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICBwZXJtYW5lbnRFbGVtZW50LnJlcGxhY2VXaXRoKGNsb25lKVxuICB9XG5cbiAgcmVwbGFjZVBsYWNlaG9sZGVyV2l0aFBlcm1hbmVudEVsZW1lbnQocGVybWFuZW50RWxlbWVudCkge1xuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5nZXRQbGFjZWhvbGRlckJ5SWQocGVybWFuZW50RWxlbWVudC5pZClcbiAgICBwbGFjZWhvbGRlcj8ucmVwbGFjZVdpdGgocGVybWFuZW50RWxlbWVudClcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyQnlJZChpZCkge1xuICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVycy5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50LmNvbnRlbnQgPT0gaWQpXG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXJzKCkge1xuICAgIHJldHVybiBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIm1ldGFbbmFtZT10dXJiby1wZXJtYW5lbnQtcGxhY2Vob2xkZXJdW2NvbnRlbnRdXCIpXVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyRm9yUGVybWFuZW50RWxlbWVudChwZXJtYW5lbnRFbGVtZW50KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWV0YVwiKVxuICBlbGVtZW50LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ0dXJiby1wZXJtYW5lbnQtcGxhY2Vob2xkZXJcIilcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIsIHBlcm1hbmVudEVsZW1lbnQuaWQpXG4gIHJldHVybiBlbGVtZW50XG59XG4iLCAiaW1wb3J0IHsgQmFyZG8gfSBmcm9tIFwiLi9iYXJkb1wiXG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG4gICNhY3RpdmVFbGVtZW50ID0gbnVsbFxuXG4gIGNvbnN0cnVjdG9yKGN1cnJlbnRTbmFwc2hvdCwgbmV3U25hcHNob3QsIHJlbmRlckVsZW1lbnQsIGlzUHJldmlldywgd2lsbFJlbmRlciA9IHRydWUpIHtcbiAgICB0aGlzLmN1cnJlbnRTbmFwc2hvdCA9IGN1cnJlbnRTbmFwc2hvdFxuICAgIHRoaXMubmV3U25hcHNob3QgPSBuZXdTbmFwc2hvdFxuICAgIHRoaXMuaXNQcmV2aWV3ID0gaXNQcmV2aWV3XG4gICAgdGhpcy53aWxsUmVuZGVyID0gd2lsbFJlbmRlclxuICAgIHRoaXMucmVuZGVyRWxlbWVudCA9IHJlbmRlckVsZW1lbnRcbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAodGhpcy5yZXNvbHZpbmdGdW5jdGlvbnMgPSB7IHJlc29sdmUsIHJlamVjdCB9KSlcbiAgfVxuXG4gIGdldCBzaG91bGRSZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGdldCByZWxvYWRSZWFzb24oKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBwcmVwYXJlVG9SZW5kZXIoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gQWJzdHJhY3QgbWV0aG9kXG4gIH1cblxuICBmaW5pc2hSZW5kZXJpbmcoKSB7XG4gICAgaWYgKHRoaXMucmVzb2x2aW5nRnVuY3Rpb25zKSB7XG4gICAgICB0aGlzLnJlc29sdmluZ0Z1bmN0aW9ucy5yZXNvbHZlKClcbiAgICAgIGRlbGV0ZSB0aGlzLnJlc29sdmluZ0Z1bmN0aW9uc1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHByZXNlcnZpbmdQZXJtYW5lbnRFbGVtZW50cyhjYWxsYmFjaykge1xuICAgIGF3YWl0IEJhcmRvLnByZXNlcnZpbmdQZXJtYW5lbnRFbGVtZW50cyh0aGlzLCB0aGlzLnBlcm1hbmVudEVsZW1lbnRNYXAsIGNhbGxiYWNrKVxuICB9XG5cbiAgZm9jdXNGaXJzdEF1dG9mb2N1c2FibGVFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmNvbm5lY3RlZFNuYXBzaG90LmZpcnN0QXV0b2ZvY3VzYWJsZUVsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgLy8gQmFyZG8gZGVsZWdhdGVcblxuICBlbnRlcmluZ0JhcmRvKGN1cnJlbnRQZXJtYW5lbnRFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuI2FjdGl2ZUVsZW1lbnQpIHJldHVyblxuXG4gICAgaWYgKGN1cnJlbnRQZXJtYW5lbnRFbGVtZW50LmNvbnRhaW5zKHRoaXMuY3VycmVudFNuYXBzaG90LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICB0aGlzLiNhY3RpdmVFbGVtZW50ID0gdGhpcy5jdXJyZW50U25hcHNob3QuYWN0aXZlRWxlbWVudFxuICAgIH1cbiAgfVxuXG4gIGxlYXZpbmdCYXJkbyhjdXJyZW50UGVybWFuZW50RWxlbWVudCkge1xuICAgIGlmIChjdXJyZW50UGVybWFuZW50RWxlbWVudC5jb250YWlucyh0aGlzLiNhY3RpdmVFbGVtZW50KSAmJiB0aGlzLiNhY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuI2FjdGl2ZUVsZW1lbnQuZm9jdXMoKVxuXG4gICAgICB0aGlzLiNhY3RpdmVFbGVtZW50ID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGdldCBjb25uZWN0ZWRTbmFwc2hvdCgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdTbmFwc2hvdC5pc0Nvbm5lY3RlZCA/IHRoaXMubmV3U25hcHNob3QgOiB0aGlzLmN1cnJlbnRTbmFwc2hvdFxuICB9XG5cbiAgZ2V0IGN1cnJlbnRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTbmFwc2hvdC5lbGVtZW50XG4gIH1cblxuICBnZXQgbmV3RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdTbmFwc2hvdC5lbGVtZW50XG4gIH1cblxuICBnZXQgcGVybWFuZW50RWxlbWVudE1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U25hcHNob3QuZ2V0UGVybWFuZW50RWxlbWVudE1hcEZvclNuYXBzaG90KHRoaXMubmV3U25hcHNob3QpXG4gIH1cblxuICBnZXQgcmVuZGVyTWV0aG9kKCkge1xuICAgIHJldHVybiBcInJlcGxhY2VcIlxuICB9XG59XG4iLCAiaW1wb3J0IHsgYWN0aXZhdGVTY3JpcHRFbGVtZW50LCBuZXh0UmVwYWludCB9IGZyb20gXCIuLi8uLi91dGlsXCJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL3JlbmRlcmVyXCJcblxuZXhwb3J0IGNsYXNzIEZyYW1lUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIHN0YXRpYyByZW5kZXJFbGVtZW50KGN1cnJlbnRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgY29uc3QgZGVzdGluYXRpb25SYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICBkZXN0aW5hdGlvblJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhjdXJyZW50RWxlbWVudClcbiAgICBkZXN0aW5hdGlvblJhbmdlLmRlbGV0ZUNvbnRlbnRzKClcblxuICAgIGNvbnN0IGZyYW1lRWxlbWVudCA9IG5ld0VsZW1lbnRcbiAgICBjb25zdCBzb3VyY2VSYW5nZSA9IGZyYW1lRWxlbWVudC5vd25lckRvY3VtZW50Py5jcmVhdGVSYW5nZSgpXG4gICAgaWYgKHNvdXJjZVJhbmdlKSB7XG4gICAgICBzb3VyY2VSYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZnJhbWVFbGVtZW50KVxuICAgICAgY3VycmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc291cmNlUmFuZ2UuZXh0cmFjdENvbnRlbnRzKCkpXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGN1cnJlbnRTbmFwc2hvdCwgbmV3U25hcHNob3QsIHJlbmRlckVsZW1lbnQsIGlzUHJldmlldywgd2lsbFJlbmRlciA9IHRydWUpIHtcbiAgICBzdXBlcihjdXJyZW50U25hcHNob3QsIG5ld1NuYXBzaG90LCByZW5kZXJFbGVtZW50LCBpc1ByZXZpZXcsIHdpbGxSZW5kZXIpXG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlXG4gIH1cblxuICBnZXQgc2hvdWxkUmVuZGVyKCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBhc3luYyByZW5kZXIoKSB7XG4gICAgYXdhaXQgbmV4dFJlcGFpbnQoKVxuICAgIHRoaXMucHJlc2VydmluZ1Blcm1hbmVudEVsZW1lbnRzKCgpID0+IHtcbiAgICAgIHRoaXMubG9hZEZyYW1lRWxlbWVudCgpXG4gICAgfSlcbiAgICB0aGlzLnNjcm9sbEZyYW1lSW50b1ZpZXcoKVxuICAgIGF3YWl0IG5leHRSZXBhaW50KClcbiAgICB0aGlzLmZvY3VzRmlyc3RBdXRvZm9jdXNhYmxlRWxlbWVudCgpXG4gICAgYXdhaXQgbmV4dFJlcGFpbnQoKVxuICAgIHRoaXMuYWN0aXZhdGVTY3JpcHRFbGVtZW50cygpXG4gIH1cblxuICBsb2FkRnJhbWVFbGVtZW50KCkge1xuICAgIHRoaXMuZGVsZWdhdGUud2lsbFJlbmRlckZyYW1lKHRoaXMuY3VycmVudEVsZW1lbnQsIHRoaXMubmV3RWxlbWVudClcbiAgICB0aGlzLnJlbmRlckVsZW1lbnQodGhpcy5jdXJyZW50RWxlbWVudCwgdGhpcy5uZXdFbGVtZW50KVxuICB9XG5cbiAgc2Nyb2xsRnJhbWVJbnRvVmlldygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50RWxlbWVudC5hdXRvc2Nyb2xsIHx8IHRoaXMubmV3RWxlbWVudC5hdXRvc2Nyb2xsKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5jdXJyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZFxuICAgICAgY29uc3QgYmxvY2sgPSByZWFkU2Nyb2xsTG9naWNhbFBvc2l0aW9uKHRoaXMuY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hdXRvc2Nyb2xsLWJsb2NrXCIpLCBcImVuZFwiKVxuICAgICAgY29uc3QgYmVoYXZpb3IgPSByZWFkU2Nyb2xsQmVoYXZpb3IodGhpcy5jdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWF1dG9zY3JvbGwtYmVoYXZpb3JcIiksIFwiYXV0b1wiKVxuXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2ssIGJlaGF2aW9yIH0pXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgYWN0aXZhdGVTY3JpcHRFbGVtZW50cygpIHtcbiAgICBmb3IgKGNvbnN0IGluZXJ0U2NyaXB0RWxlbWVudCBvZiB0aGlzLm5ld1NjcmlwdEVsZW1lbnRzKSB7XG4gICAgICBjb25zdCBhY3RpdmF0ZWRTY3JpcHRFbGVtZW50ID0gYWN0aXZhdGVTY3JpcHRFbGVtZW50KGluZXJ0U2NyaXB0RWxlbWVudClcbiAgICAgIGluZXJ0U2NyaXB0RWxlbWVudC5yZXBsYWNlV2l0aChhY3RpdmF0ZWRTY3JpcHRFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGdldCBuZXdTY3JpcHRFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZFNjcm9sbExvZ2ljYWxQb3NpdGlvbih2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBcImVuZFwiIHx8IHZhbHVlID09IFwic3RhcnRcIiB8fCB2YWx1ZSA9PSBcImNlbnRlclwiIHx8IHZhbHVlID09IFwibmVhcmVzdFwiKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWRTY3JvbGxCZWhhdmlvcih2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBcImF1dG9cIiB8fCB2YWx1ZSA9PSBcInNtb290aFwiKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICB9XG59XG4iLCAiaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCIuL3Nlc3Npb25cIlxuaW1wb3J0IHsgUGFnZVJlbmRlcmVyIH0gZnJvbSBcIi4vZHJpdmUvcGFnZV9yZW5kZXJlclwiXG5pbXBvcnQgeyBQYWdlU25hcHNob3QgfSBmcm9tIFwiLi9kcml2ZS9wYWdlX3NuYXBzaG90XCJcbmltcG9ydCB7IEZyYW1lUmVuZGVyZXIgfSBmcm9tIFwiLi9mcmFtZXMvZnJhbWVfcmVuZGVyZXJcIlxuaW1wb3J0IHsgRm9ybVN1Ym1pc3Npb24gfSBmcm9tIFwiLi9kcml2ZS9mb3JtX3N1Ym1pc3Npb25cIlxuaW1wb3J0IHsgZmV0Y2gsIHJlY2VudFJlcXVlc3RzIH0gZnJvbSBcIi4uL2h0dHAvZmV0Y2hcIlxuXG5jb25zdCBzZXNzaW9uID0gbmV3IFNlc3Npb24ocmVjZW50UmVxdWVzdHMpXG5jb25zdCB7IGNhY2hlLCBuYXZpZ2F0b3IgfSA9IHNlc3Npb25cbmV4cG9ydCB7IG5hdmlnYXRvciwgc2Vzc2lvbiwgY2FjaGUsIFBhZ2VSZW5kZXJlciwgUGFnZVNuYXBzaG90LCBGcmFtZVJlbmRlcmVyLCBmZXRjaCB9XG5cbi8qKlxuICogU3RhcnRzIHRoZSBtYWluIHNlc3Npb24uXG4gKiBUaGlzIGluaXRpYWxpc2VzIGFueSBuZWNlc3Nhcnkgb2JzZXJ2ZXJzIHN1Y2ggYXMgdGhvc2UgdG8gbW9uaXRvclxuICogbGluayBpbnRlcmFjdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydCgpIHtcbiAgc2Vzc2lvbi5zdGFydCgpXG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIGFuIGFkYXB0ZXIgZm9yIHRoZSBtYWluIHNlc3Npb24uXG4gKlxuICogQHBhcmFtIGFkYXB0ZXIgQWRhcHRlciB0byByZWdpc3RlclxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBZGFwdGVyKGFkYXB0ZXIpIHtcbiAgc2Vzc2lvbi5yZWdpc3RlckFkYXB0ZXIoYWRhcHRlcilcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhbiBhcHBsaWNhdGlvbiB2aXNpdCB0byB0aGUgZ2l2ZW4gbG9jYXRpb24uXG4gKlxuICogQHBhcmFtIGxvY2F0aW9uIExvY2F0aW9uIHRvIHZpc2l0IChhIFVSTCBvciBwYXRoKVxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBhcHBseVxuICogQHBhcmFtIG9wdGlvbnMuYWN0aW9uIFR5cGUgb2YgaGlzdG9yeSBuYXZpZ2F0aW9uIHRvIGFwcGx5IChcInJlc3RvcmVcIixcbiAqIFwicmVwbGFjZVwiIG9yIFwiYWR2YW5jZVwiKVxuICogQHBhcmFtIG9wdGlvbnMuaGlzdG9yeUNoYW5nZWQgU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGJyb3dzZXIgaGlzdG9yeSBoYXNcbiAqIGFscmVhZHkgYmVlbiBjaGFuZ2VkIGZvciB0aGlzIHZpc2l0IG9yIG5vdFxuICogQHBhcmFtIG9wdGlvbnMucmVmZXJyZXIgU3BlY2lmaWVzIHRoZSByZWZlcnJlciBvZiB0aGlzIHZpc2l0IHN1Y2ggdGhhdFxuICogbmF2aWdhdGlvbnMgdG8gdGhlIHNhbWUgcGFnZSB3aWxsIG5vdCByZXN1bHQgaW4gYSBuZXcgaGlzdG9yeSBlbnRyeS5cbiAqIEBwYXJhbSBvcHRpb25zLnNuYXBzaG90SFRNTCBDYWNoZWQgc25hcHNob3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0gb3B0aW9ucy5yZXNwb25zZSBSZXNwb25zZSBvZiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdChsb2NhdGlvbiwgb3B0aW9ucykge1xuICBzZXNzaW9uLnZpc2l0KGxvY2F0aW9uLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIENvbm5lY3RzIGEgc3RyZWFtIHNvdXJjZSB0byB0aGUgbWFpbiBzZXNzaW9uLlxuICpcbiAqIEBwYXJhbSBzb3VyY2UgU3RyZWFtIHNvdXJjZSB0byBjb25uZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25uZWN0U3RyZWFtU291cmNlKHNvdXJjZSkge1xuICBzZXNzaW9uLmNvbm5lY3RTdHJlYW1Tb3VyY2Uoc291cmNlKVxufVxuXG4vKipcbiAqIERpc2Nvbm5lY3RzIGEgc3RyZWFtIHNvdXJjZSBmcm9tIHRoZSBtYWluIHNlc3Npb24uXG4gKlxuICogQHBhcmFtIHNvdXJjZSBTdHJlYW0gc291cmNlIHRvIGRpc2Nvbm5lY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2Nvbm5lY3RTdHJlYW1Tb3VyY2Uoc291cmNlKSB7XG4gIHNlc3Npb24uZGlzY29ubmVjdFN0cmVhbVNvdXJjZShzb3VyY2UpXG59XG5cbi8qKlxuICogUmVuZGVycyBhIHN0cmVhbSBtZXNzYWdlIHRvIHRoZSBtYWluIHNlc3Npb24gYnkgYXBwZW5kaW5nIGl0IHRvIHRoZVxuICogY3VycmVudCBkb2N1bWVudC5cbiAqXG4gKiBAcGFyYW0gbWVzc2FnZSBNZXNzYWdlIHRvIHJlbmRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RyZWFtTWVzc2FnZShtZXNzYWdlKSB7XG4gIHNlc3Npb24ucmVuZGVyU3RyZWFtTWVzc2FnZShtZXNzYWdlKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGVudHJpZXMgZnJvbSB0aGUgVHVyYm8gRHJpdmUgcGFnZSBjYWNoZS5cbiAqIENhbGwgdGhpcyB3aGVuIHN0YXRlIGhhcyBjaGFuZ2VkIG9uIHRoZSBzZXJ2ZXIgdGhhdCBtYXkgYWZmZWN0IGNhY2hlZCBwYWdlcy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDcuMi4wIGluIGZhdm9yIG9mIGBUdXJiby5jYWNoZS5jbGVhcigpYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgY29uc29sZS53YXJuKFxuICAgIFwiUGxlYXNlIHJlcGxhY2UgYFR1cmJvLmNsZWFyQ2FjaGUoKWAgd2l0aCBgVHVyYm8uY2FjaGUuY2xlYXIoKWAuIFRoZSB0b3AtbGV2ZWwgZnVuY3Rpb24gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgVHVyYm8uYFwiXG4gIClcbiAgc2Vzc2lvbi5jbGVhckNhY2hlKClcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBkZWxheSBhZnRlciB3aGljaCB0aGUgcHJvZ3Jlc3MgYmFyIHdpbGwgYXBwZWFyIGR1cmluZyBuYXZpZ2F0aW9uLlxuICpcbiAqIFRoZSBwcm9ncmVzcyBiYXIgYXBwZWFycyBhZnRlciA1MDBtcyBieSBkZWZhdWx0LlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBoYXMgbm8gZWZmZWN0IHdoZW4gdXNlZCB3aXRoIHRoZSBpT1Mgb3IgQW5kcm9pZFxuICogYWRhcHRlcnMuXG4gKlxuICogQHBhcmFtIGRlbGF5IFRpbWUgdG8gZGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9ncmVzc0JhckRlbGF5KGRlbGF5KSB7XG4gIHNlc3Npb24uc2V0UHJvZ3Jlc3NCYXJEZWxheShkZWxheSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbmZpcm1NZXRob2QoY29uZmlybU1ldGhvZCkge1xuICBGb3JtU3VibWlzc2lvbi5jb25maXJtTWV0aG9kID0gY29uZmlybU1ldGhvZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Rm9ybU1vZGUobW9kZSkge1xuICBzZXNzaW9uLnNldEZvcm1Nb2RlKG1vZGUpXG59XG4iLCAiaW1wb3J0IHsgdW5pbmRlbnQsIGdldE1ldGFDb250ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxcIlxuXG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NCYXJJRCA9IFwidHVyYm8tcHJvZ3Jlc3MtYmFyXCJcblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgc3RhdGljIGFuaW1hdGlvbkR1cmF0aW9uID0gMzAwIC8qbXMqL1xuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdENTUygpIHtcbiAgICByZXR1cm4gdW5pbmRlbnRgXG4gICAgICAudHVyYm8tcHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBoZWlnaHQ6IDNweDtcbiAgICAgICAgYmFja2dyb3VuZDogIzAwNzZmZjtcbiAgICAgICAgei1pbmRleDogMjE0NzQ4MzY0NztcbiAgICAgICAgdHJhbnNpdGlvbjpcbiAgICAgICAgICB3aWR0aCAke1Byb2dyZXNzQmFyLmFuaW1hdGlvbkR1cmF0aW9ufW1zIGVhc2Utb3V0LFxuICAgICAgICAgIG9wYWNpdHkgJHtQcm9ncmVzc0Jhci5hbmltYXRpb25EdXJhdGlvbiAvIDJ9bXMgJHtQcm9ncmVzc0Jhci5hbmltYXRpb25EdXJhdGlvbiAvIDJ9bXMgZWFzZS1pbjtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgIH1cbiAgICBgXG4gIH1cblxuICBoaWRpbmcgPSBmYWxzZVxuICB2YWx1ZSA9IDBcbiAgdmlzaWJsZSA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdHlsZXNoZWV0RWxlbWVudCA9IHRoaXMuY3JlYXRlU3R5bGVzaGVldEVsZW1lbnQoKVxuICAgIHRoaXMucHJvZ3Jlc3NFbGVtZW50ID0gdGhpcy5jcmVhdGVQcm9ncmVzc0VsZW1lbnQoKVxuICAgIHRoaXMuaW5zdGFsbFN0eWxlc2hlZXRFbGVtZW50KClcbiAgICB0aGlzLnNldFZhbHVlKDApXG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICB0aGlzLnZpc2libGUgPSB0cnVlXG4gICAgICB0aGlzLmluc3RhbGxQcm9ncmVzc0VsZW1lbnQoKVxuICAgICAgdGhpcy5zdGFydFRyaWNrbGluZygpXG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy52aXNpYmxlICYmICF0aGlzLmhpZGluZykge1xuICAgICAgdGhpcy5oaWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZhZGVQcm9ncmVzc0VsZW1lbnQoKCkgPT4ge1xuICAgICAgICB0aGlzLnVuaW5zdGFsbFByb2dyZXNzRWxlbWVudCgpXG4gICAgICAgIHRoaXMuc3RvcFRyaWNrbGluZygpXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuaGlkaW5nID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIGluc3RhbGxTdHlsZXNoZWV0RWxlbWVudCgpIHtcbiAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZSh0aGlzLnN0eWxlc2hlZXRFbGVtZW50LCBkb2N1bWVudC5oZWFkLmZpcnN0Q2hpbGQpXG4gIH1cblxuICBpbnN0YWxsUHJvZ3Jlc3NFbGVtZW50KCkge1xuICAgIHRoaXMucHJvZ3Jlc3NFbGVtZW50LnN0eWxlLndpZHRoID0gXCIwXCJcbiAgICB0aGlzLnByb2dyZXNzRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIxXCJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMucHJvZ3Jlc3NFbGVtZW50LCBkb2N1bWVudC5ib2R5KVxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICBmYWRlUHJvZ3Jlc3NFbGVtZW50KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMFwiXG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgUHJvZ3Jlc3NCYXIuYW5pbWF0aW9uRHVyYXRpb24gKiAxLjUpXG4gIH1cblxuICB1bmluc3RhbGxQcm9ncmVzc0VsZW1lbnQoKSB7XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnByb2dyZXNzRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBzdGFydFRyaWNrbGluZygpIHtcbiAgICBpZiAoIXRoaXMudHJpY2tsZUludGVydmFsKSB7XG4gICAgICB0aGlzLnRyaWNrbGVJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLnRyaWNrbGUsIFByb2dyZXNzQmFyLmFuaW1hdGlvbkR1cmF0aW9uKVxuICAgIH1cbiAgfVxuXG4gIHN0b3BUcmlja2xpbmcoKSB7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50cmlja2xlSW50ZXJ2YWwpXG4gICAgZGVsZXRlIHRoaXMudHJpY2tsZUludGVydmFsXG4gIH1cblxuICB0cmlja2xlID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy52YWx1ZSArIE1hdGgucmFuZG9tKCkgLyAxMDApXG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9IGAkezEwICsgdGhpcy52YWx1ZSAqIDkwfSVgXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZVN0eWxlc2hlZXRFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcbiAgICBlbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCJcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gUHJvZ3Jlc3NCYXIuZGVmYXVsdENTU1xuICAgIGlmICh0aGlzLmNzcE5vbmNlKSB7XG4gICAgICBlbGVtZW50Lm5vbmNlID0gdGhpcy5jc3BOb25jZVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgY3JlYXRlUHJvZ3Jlc3NFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBcInR1cmJvLXByb2dyZXNzLWJhclwiXG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxuXG4gIGdldCBjc3BOb25jZSgpIHtcbiAgICByZXR1cm4gZ2V0TWV0YUNvbnRlbnQoXCJjc3Atbm9uY2VcIilcbiAgfVxufVxuIiwgImltcG9ydCB7IFNuYXBzaG90IH0gZnJvbSBcIi4uL3NuYXBzaG90XCJcblxuZXhwb3J0IGNsYXNzIEhlYWRTbmFwc2hvdCBleHRlbmRzIFNuYXBzaG90IHtcbiAgZGV0YWlsc0J5T3V0ZXJIVE1MID0gdGhpcy5jaGlsZHJlblxuICAgIC5maWx0ZXIoKGVsZW1lbnQpID0+ICFlbGVtZW50SXNOb3NjcmlwdChlbGVtZW50KSlcbiAgICAubWFwKChlbGVtZW50KSA9PiBlbGVtZW50V2l0aG91dE5vbmNlKGVsZW1lbnQpKVxuICAgIC5yZWR1Y2UoKHJlc3VsdCwgZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgeyBvdXRlckhUTUwgfSA9IGVsZW1lbnRcbiAgICAgIGNvbnN0IGRldGFpbHMgPVxuICAgICAgICBvdXRlckhUTUwgaW4gcmVzdWx0XG4gICAgICAgICAgPyByZXN1bHRbb3V0ZXJIVE1MXVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICB0eXBlOiBlbGVtZW50VHlwZShlbGVtZW50KSxcbiAgICAgICAgICAgICAgdHJhY2tlZDogZWxlbWVudElzVHJhY2tlZChlbGVtZW50KSxcbiAgICAgICAgICAgICAgZWxlbWVudHM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5yZXN1bHQsXG4gICAgICAgIFtvdXRlckhUTUxdOiB7XG4gICAgICAgICAgLi4uZGV0YWlscyxcbiAgICAgICAgICBlbGVtZW50czogWy4uLmRldGFpbHMuZWxlbWVudHMsIGVsZW1lbnRdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7fSlcblxuICBnZXQgdHJhY2tlZEVsZW1lbnRTaWduYXR1cmUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZGV0YWlsc0J5T3V0ZXJIVE1MKVxuICAgICAgLmZpbHRlcigob3V0ZXJIVE1MKSA9PiB0aGlzLmRldGFpbHNCeU91dGVySFRNTFtvdXRlckhUTUxdLnRyYWNrZWQpXG4gICAgICAuam9pbihcIlwiKVxuICB9XG5cbiAgZ2V0U2NyaXB0RWxlbWVudHNOb3RJblNuYXBzaG90KHNuYXBzaG90KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNNYXRjaGluZ1R5cGVOb3RJblNuYXBzaG90KFwic2NyaXB0XCIsIHNuYXBzaG90KVxuICB9XG5cbiAgZ2V0U3R5bGVzaGVldEVsZW1lbnRzTm90SW5TbmFwc2hvdChzbmFwc2hvdCkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzTWF0Y2hpbmdUeXBlTm90SW5TbmFwc2hvdChcInN0eWxlc2hlZXRcIiwgc25hcHNob3QpXG4gIH1cblxuICBnZXRFbGVtZW50c01hdGNoaW5nVHlwZU5vdEluU25hcHNob3QobWF0Y2hlZFR5cGUsIHNuYXBzaG90KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZGV0YWlsc0J5T3V0ZXJIVE1MKVxuICAgICAgLmZpbHRlcigob3V0ZXJIVE1MKSA9PiAhKG91dGVySFRNTCBpbiBzbmFwc2hvdC5kZXRhaWxzQnlPdXRlckhUTUwpKVxuICAgICAgLm1hcCgob3V0ZXJIVE1MKSA9PiB0aGlzLmRldGFpbHNCeU91dGVySFRNTFtvdXRlckhUTUxdKVxuICAgICAgLmZpbHRlcigoeyB0eXBlIH0pID0+IHR5cGUgPT0gbWF0Y2hlZFR5cGUpXG4gICAgICAubWFwKCh7IGVsZW1lbnRzOiBbZWxlbWVudF0gfSkgPT4gZWxlbWVudClcbiAgfVxuXG4gIGdldCBwcm92aXNpb25hbEVsZW1lbnRzKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRldGFpbHNCeU91dGVySFRNTCkucmVkdWNlKChyZXN1bHQsIG91dGVySFRNTCkgPT4ge1xuICAgICAgY29uc3QgeyB0eXBlLCB0cmFja2VkLCBlbGVtZW50cyB9ID0gdGhpcy5kZXRhaWxzQnlPdXRlckhUTUxbb3V0ZXJIVE1MXVxuICAgICAgaWYgKHR5cGUgPT0gbnVsbCAmJiAhdHJhY2tlZCkge1xuICAgICAgICByZXR1cm4gWy4uLnJlc3VsdCwgLi4uZWxlbWVudHNdXG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5yZXN1bHQsIC4uLmVsZW1lbnRzLnNsaWNlKDEpXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuICAgIH0sIFtdKVxuICB9XG5cbiAgZ2V0TWV0YVZhbHVlKG5hbWUpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5maW5kTWV0YUVsZW1lbnRCeU5hbWUobmFtZSlcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKSA6IG51bGxcbiAgfVxuXG4gIGZpbmRNZXRhRWxlbWVudEJ5TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZGV0YWlsc0J5T3V0ZXJIVE1MKS5yZWR1Y2UoKHJlc3VsdCwgb3V0ZXJIVE1MKSA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGVsZW1lbnRzOiBbZWxlbWVudF1cbiAgICAgIH0gPSB0aGlzLmRldGFpbHNCeU91dGVySFRNTFtvdXRlckhUTUxdXG4gICAgICByZXR1cm4gZWxlbWVudElzTWV0YUVsZW1lbnRXaXRoTmFtZShlbGVtZW50LCBuYW1lKSA/IGVsZW1lbnQgOiByZXN1bHRcbiAgICB9LCB1bmRlZmluZWQgfCB1bmRlZmluZWQpXG4gIH1cbn1cblxuZnVuY3Rpb24gZWxlbWVudFR5cGUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudElzU2NyaXB0KGVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIFwic2NyaXB0XCJcbiAgfSBlbHNlIGlmIChlbGVtZW50SXNTdHlsZXNoZWV0KGVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIFwic3R5bGVzaGVldFwiXG4gIH1cbn1cblxuZnVuY3Rpb24gZWxlbWVudElzVHJhY2tlZChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdHVyYm8tdHJhY2tcIikgPT0gXCJyZWxvYWRcIlxufVxuXG5mdW5jdGlvbiBlbGVtZW50SXNTY3JpcHQoZWxlbWVudCkge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC5sb2NhbE5hbWVcbiAgcmV0dXJuIHRhZ05hbWUgPT0gXCJzY3JpcHRcIlxufVxuXG5mdW5jdGlvbiBlbGVtZW50SXNOb3NjcmlwdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LmxvY2FsTmFtZVxuICByZXR1cm4gdGFnTmFtZSA9PSBcIm5vc2NyaXB0XCJcbn1cblxuZnVuY3Rpb24gZWxlbWVudElzU3R5bGVzaGVldChlbGVtZW50KSB7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LmxvY2FsTmFtZVxuICByZXR1cm4gdGFnTmFtZSA9PSBcInN0eWxlXCIgfHwgKHRhZ05hbWUgPT0gXCJsaW5rXCIgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJyZWxcIikgPT0gXCJzdHlsZXNoZWV0XCIpXG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRJc01ldGFFbGVtZW50V2l0aE5hbWUoZWxlbWVudCwgbmFtZSkge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC5sb2NhbE5hbWVcbiAgcmV0dXJuIHRhZ05hbWUgPT0gXCJtZXRhXCIgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpID09IG5hbWVcbn1cblxuZnVuY3Rpb24gZWxlbWVudFdpdGhvdXROb25jZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZShcIm5vbmNlXCIpKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBcIlwiKVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRcbn1cbiIsICJpbXBvcnQgeyBwYXJzZUhUTUxEb2N1bWVudCB9IGZyb20gXCIuLi8uLi91dGlsXCJcbmltcG9ydCB7IFNuYXBzaG90IH0gZnJvbSBcIi4uL3NuYXBzaG90XCJcbmltcG9ydCB7IGV4cGFuZFVSTCB9IGZyb20gXCIuLi91cmxcIlxuaW1wb3J0IHsgSGVhZFNuYXBzaG90IH0gZnJvbSBcIi4vaGVhZF9zbmFwc2hvdFwiXG5cbmV4cG9ydCBjbGFzcyBQYWdlU25hcHNob3QgZXh0ZW5kcyBTbmFwc2hvdCB7XG4gIHN0YXRpYyBmcm9tSFRNTFN0cmluZyhodG1sID0gXCJcIikge1xuICAgIHJldHVybiB0aGlzLmZyb21Eb2N1bWVudChwYXJzZUhUTUxEb2N1bWVudChodG1sKSlcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbURvY3VtZW50KGVsZW1lbnQub3duZXJEb2N1bWVudClcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRG9jdW1lbnQoeyBkb2N1bWVudEVsZW1lbnQsIGJvZHksIGhlYWQgfSkge1xuICAgIHJldHVybiBuZXcgdGhpcyhkb2N1bWVudEVsZW1lbnQsIGJvZHksIG5ldyBIZWFkU25hcHNob3QoaGVhZCkpXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihkb2N1bWVudEVsZW1lbnQsIGJvZHksIGhlYWRTbmFwc2hvdCkge1xuICAgIHN1cGVyKGJvZHkpXG4gICAgdGhpcy5kb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudEVsZW1lbnRcbiAgICB0aGlzLmhlYWRTbmFwc2hvdCA9IGhlYWRTbmFwc2hvdFxuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgY29uc3QgY2xvbmVkRWxlbWVudCA9IHRoaXMuZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSlcblxuICAgIGNvbnN0IHNlbGVjdEVsZW1lbnRzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RcIilcbiAgICBjb25zdCBjbG9uZWRTZWxlY3RFbGVtZW50cyA9IGNsb25lZEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFwiKVxuXG4gICAgZm9yIChjb25zdCBbaW5kZXgsIHNvdXJjZV0gb2Ygc2VsZWN0RWxlbWVudHMuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjbG9uZSA9IGNsb25lZFNlbGVjdEVsZW1lbnRzW2luZGV4XVxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgY2xvbmUuc2VsZWN0ZWRPcHRpb25zKSBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygc291cmNlLnNlbGVjdGVkT3B0aW9ucykgY2xvbmUub3B0aW9uc1tvcHRpb24uaW5kZXhdLnNlbGVjdGVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgY2xvbmVkUGFzc3dvcmRJbnB1dCBvZiBjbG9uZWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpKSB7XG4gICAgICBjbG9uZWRQYXNzd29yZElucHV0LnZhbHVlID0gXCJcIlxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGFnZVNuYXBzaG90KHRoaXMuZG9jdW1lbnRFbGVtZW50LCBjbG9uZWRFbGVtZW50LCB0aGlzLmhlYWRTbmFwc2hvdClcbiAgfVxuXG4gIGdldCBsYW5nKCkge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpXG4gIH1cblxuICBnZXQgaGVhZEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZFNuYXBzaG90LmVsZW1lbnRcbiAgfVxuXG4gIGdldCByb290TG9jYXRpb24oKSB7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXMuZ2V0U2V0dGluZyhcInJvb3RcIikgPz8gXCIvXCJcbiAgICByZXR1cm4gZXhwYW5kVVJMKHJvb3QpXG4gIH1cblxuICBnZXQgY2FjaGVDb250cm9sVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2V0dGluZyhcImNhY2hlLWNvbnRyb2xcIilcbiAgfVxuXG4gIGdldCBpc1ByZXZpZXdhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlQ29udHJvbFZhbHVlICE9IFwibm8tcHJldmlld1wiXG4gIH1cblxuICBnZXQgaXNDYWNoZWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVDb250cm9sVmFsdWUgIT0gXCJuby1jYWNoZVwiXG4gIH1cblxuICBnZXQgaXNWaXNpdGFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2V0dGluZyhcInZpc2l0LWNvbnRyb2xcIikgIT0gXCJyZWxvYWRcIlxuICB9XG5cbiAgZ2V0IHByZWZlcnNWaWV3VHJhbnNpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZFNuYXBzaG90LmdldE1ldGFWYWx1ZShcInZpZXctdHJhbnNpdGlvblwiKSA9PT0gXCJzYW1lLW9yaWdpblwiXG4gIH1cblxuICBnZXQgc2hvdWxkTW9ycGhQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLmdldFNldHRpbmcoXCJyZWZyZXNoLW1ldGhvZFwiKSA9PT0gXCJtb3JwaFwiXG4gIH1cblxuICBnZXQgc2hvdWxkUHJlc2VydmVTY3JvbGxQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTZXR0aW5nKFwicmVmcmVzaC1zY3JvbGxcIikgPT09IFwicHJlc2VydmVcIlxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIGdldFNldHRpbmcobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmhlYWRTbmFwc2hvdC5nZXRNZXRhVmFsdWUoYHR1cmJvLSR7bmFtZX1gKVxuICB9XG59XG4iLCAiZXhwb3J0IGNsYXNzIFZpZXdUcmFuc2l0aW9uZXIge1xuICAjdmlld1RyYW5zaXRpb25TdGFydGVkID0gZmFsc2VcbiAgI2xhc3RPcGVyYXRpb24gPSBQcm9taXNlLnJlc29sdmUoKVxuXG4gIHJlbmRlckNoYW5nZSh1c2VWaWV3VHJhbnNpdGlvbiwgcmVuZGVyKSB7XG4gICAgaWYgKHVzZVZpZXdUcmFuc2l0aW9uICYmIHRoaXMudmlld1RyYW5zaXRpb25zQXZhaWxhYmxlICYmICF0aGlzLiN2aWV3VHJhbnNpdGlvblN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMuI3ZpZXdUcmFuc2l0aW9uU3RhcnRlZCA9IHRydWVcbiAgICAgIHRoaXMuI2xhc3RPcGVyYXRpb24gPSB0aGlzLiNsYXN0T3BlcmF0aW9uLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkb2N1bWVudC5zdGFydFZpZXdUcmFuc2l0aW9uKHJlbmRlcikuZmluaXNoZWRcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2xhc3RPcGVyYXRpb24gPSB0aGlzLiNsYXN0T3BlcmF0aW9uLnRoZW4ocmVuZGVyKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLiNsYXN0T3BlcmF0aW9uXG4gIH1cblxuICBnZXQgdmlld1RyYW5zaXRpb25zQXZhaWxhYmxlKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5zdGFydFZpZXdUcmFuc2l0aW9uXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBGZXRjaE1ldGhvZCwgRmV0Y2hSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2h0dHAvZmV0Y2hfcmVxdWVzdFwiXG5pbXBvcnQgeyBnZXRBbmNob3IgfSBmcm9tIFwiLi4vdXJsXCJcbmltcG9ydCB7IFBhZ2VTbmFwc2hvdCB9IGZyb20gXCIuL3BhZ2Vfc25hcHNob3RcIlxuaW1wb3J0IHsgZ2V0SGlzdG9yeU1ldGhvZEZvckFjdGlvbiwgdXVpZCwgbmV4dFJlcGFpbnQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiXG5pbXBvcnQgeyBTdHJlYW1NZXNzYWdlIH0gZnJvbSBcIi4uL3N0cmVhbXMvc3RyZWFtX21lc3NhZ2VcIlxuaW1wb3J0IHsgVmlld1RyYW5zaXRpb25lciB9IGZyb20gXCIuL3ZpZXdfdHJhbnNpdGlvbmVyXCJcblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGFjdGlvbjogXCJhZHZhbmNlXCIsXG4gIGhpc3RvcnlDaGFuZ2VkOiBmYWxzZSxcbiAgdmlzaXRDYWNoZWRTbmFwc2hvdDogKCkgPT4ge30sXG4gIHdpbGxSZW5kZXI6IHRydWUsXG4gIHVwZGF0ZUhpc3Rvcnk6IHRydWUsXG4gIHNob3VsZENhY2hlU25hcHNob3Q6IHRydWUsXG4gIGFjY2VwdHNTdHJlYW1SZXNwb25zZTogZmFsc2Vcbn1cblxuZXhwb3J0IGNvbnN0IFRpbWluZ01ldHJpYyA9IHtcbiAgdmlzaXRTdGFydDogXCJ2aXNpdFN0YXJ0XCIsXG4gIHJlcXVlc3RTdGFydDogXCJyZXF1ZXN0U3RhcnRcIixcbiAgcmVxdWVzdEVuZDogXCJyZXF1ZXN0RW5kXCIsXG4gIHZpc2l0RW5kOiBcInZpc2l0RW5kXCJcbn1cblxuZXhwb3J0IGNvbnN0IFZpc2l0U3RhdGUgPSB7XG4gIGluaXRpYWxpemVkOiBcImluaXRpYWxpemVkXCIsXG4gIHN0YXJ0ZWQ6IFwic3RhcnRlZFwiLFxuICBjYW5jZWxlZDogXCJjYW5jZWxlZFwiLFxuICBmYWlsZWQ6IFwiZmFpbGVkXCIsXG4gIGNvbXBsZXRlZDogXCJjb21wbGV0ZWRcIlxufVxuXG5leHBvcnQgY29uc3QgU3lzdGVtU3RhdHVzQ29kZSA9IHtcbiAgbmV0d29ya0ZhaWx1cmU6IDAsXG4gIHRpbWVvdXRGYWlsdXJlOiAtMSxcbiAgY29udGVudFR5cGVNaXNtYXRjaDogLTJcbn1cblxuZXhwb3J0IGNvbnN0IERpcmVjdGlvbiA9IHtcbiAgYWR2YW5jZTogXCJmb3J3YXJkXCIsXG4gIHJlc3RvcmU6IFwiYmFja1wiLFxuICByZXBsYWNlOiBcIm5vbmVcIlxufVxuXG5leHBvcnQgY2xhc3MgVmlzaXQge1xuICBpZGVudGlmaWVyID0gdXVpZCgpIC8vIFJlcXVpcmVkIGJ5IHR1cmJvLWlvc1xuICB0aW1pbmdNZXRyaWNzID0ge31cblxuICBmb2xsb3dlZFJlZGlyZWN0ID0gZmFsc2VcbiAgaGlzdG9yeUNoYW5nZWQgPSBmYWxzZVxuICBzY3JvbGxlZCA9IGZhbHNlXG4gIHNob3VsZENhY2hlU25hcHNob3QgPSB0cnVlXG4gIGFjY2VwdHNTdHJlYW1SZXNwb25zZSA9IGZhbHNlXG4gIHNuYXBzaG90Q2FjaGVkID0gZmFsc2VcbiAgc3RhdGUgPSBWaXNpdFN0YXRlLmluaXRpYWxpemVkXG4gIHZpZXdUcmFuc2l0aW9uZXIgPSBuZXcgVmlld1RyYW5zaXRpb25lcigpXG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGxvY2F0aW9uLCByZXN0b3JhdGlvbklkZW50aWZpZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxuICAgIHRoaXMucmVzdG9yYXRpb25JZGVudGlmaWVyID0gcmVzdG9yYXRpb25JZGVudGlmaWVyIHx8IHV1aWQoKVxuXG4gICAgY29uc3Qge1xuICAgICAgYWN0aW9uLFxuICAgICAgaGlzdG9yeUNoYW5nZWQsXG4gICAgICByZWZlcnJlcixcbiAgICAgIHNuYXBzaG90LFxuICAgICAgc25hcHNob3RIVE1MLFxuICAgICAgcmVzcG9uc2UsXG4gICAgICB2aXNpdENhY2hlZFNuYXBzaG90LFxuICAgICAgd2lsbFJlbmRlcixcbiAgICAgIHVwZGF0ZUhpc3RvcnksXG4gICAgICBzaG91bGRDYWNoZVNuYXBzaG90LFxuICAgICAgYWNjZXB0c1N0cmVhbVJlc3BvbnNlLFxuICAgICAgZGlyZWN0aW9uXG4gICAgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH1cbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvblxuICAgIHRoaXMuaGlzdG9yeUNoYW5nZWQgPSBoaXN0b3J5Q2hhbmdlZFxuICAgIHRoaXMucmVmZXJyZXIgPSByZWZlcnJlclxuICAgIHRoaXMuc25hcHNob3QgPSBzbmFwc2hvdFxuICAgIHRoaXMuc25hcHNob3RIVE1MID0gc25hcHNob3RIVE1MXG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlXG4gICAgdGhpcy5pc1NhbWVQYWdlID0gdGhpcy5kZWxlZ2F0ZS5sb2NhdGlvbldpdGhBY3Rpb25Jc1NhbWVQYWdlKHRoaXMubG9jYXRpb24sIHRoaXMuYWN0aW9uKVxuICAgIHRoaXMuaXNQYWdlUmVmcmVzaCA9IHRoaXMudmlldy5pc1BhZ2VSZWZyZXNoKHRoaXMpXG4gICAgdGhpcy52aXNpdENhY2hlZFNuYXBzaG90ID0gdmlzaXRDYWNoZWRTbmFwc2hvdFxuICAgIHRoaXMud2lsbFJlbmRlciA9IHdpbGxSZW5kZXJcbiAgICB0aGlzLnVwZGF0ZUhpc3RvcnkgPSB1cGRhdGVIaXN0b3J5XG4gICAgdGhpcy5zY3JvbGxlZCA9ICF3aWxsUmVuZGVyXG4gICAgdGhpcy5zaG91bGRDYWNoZVNuYXBzaG90ID0gc2hvdWxkQ2FjaGVTbmFwc2hvdFxuICAgIHRoaXMuYWNjZXB0c1N0cmVhbVJlc3BvbnNlID0gYWNjZXB0c1N0cmVhbVJlc3BvbnNlXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24gfHwgRGlyZWN0aW9uW2FjdGlvbl1cbiAgfVxuXG4gIGdldCBhZGFwdGVyKCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmFkYXB0ZXJcbiAgfVxuXG4gIGdldCB2aWV3KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnZpZXdcbiAgfVxuXG4gIGdldCBoaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmhpc3RvcnlcbiAgfVxuXG4gIGdldCByZXN0b3JhdGlvbkRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeS5nZXRSZXN0b3JhdGlvbkRhdGFGb3JJZGVudGlmaWVyKHRoaXMucmVzdG9yYXRpb25JZGVudGlmaWVyKVxuICB9XG5cbiAgZ2V0IHNpbGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhbWVQYWdlXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PSBWaXNpdFN0YXRlLmluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLnJlY29yZFRpbWluZ01ldHJpYyhUaW1pbmdNZXRyaWMudmlzaXRTdGFydClcbiAgICAgIHRoaXMuc3RhdGUgPSBWaXNpdFN0YXRlLnN0YXJ0ZWRcbiAgICAgIHRoaXMuYWRhcHRlci52aXNpdFN0YXJ0ZWQodGhpcylcbiAgICAgIHRoaXMuZGVsZWdhdGUudmlzaXRTdGFydGVkKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09IFZpc2l0U3RhdGUuc3RhcnRlZCkge1xuICAgICAgaWYgKHRoaXMucmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QuY2FuY2VsKClcbiAgICAgIH1cbiAgICAgIHRoaXMuY2FuY2VsUmVuZGVyKClcbiAgICAgIHRoaXMuc3RhdGUgPSBWaXNpdFN0YXRlLmNhbmNlbGVkXG4gICAgfVxuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT0gVmlzaXRTdGF0ZS5zdGFydGVkKSB7XG4gICAgICB0aGlzLnJlY29yZFRpbWluZ01ldHJpYyhUaW1pbmdNZXRyaWMudmlzaXRFbmQpXG4gICAgICB0aGlzLmFkYXB0ZXIudmlzaXRDb21wbGV0ZWQodGhpcylcbiAgICAgIHRoaXMuc3RhdGUgPSBWaXNpdFN0YXRlLmNvbXBsZXRlZFxuICAgICAgdGhpcy5mb2xsb3dSZWRpcmVjdCgpXG5cbiAgICAgIGlmICghdGhpcy5mb2xsb3dlZFJlZGlyZWN0KSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUudmlzaXRDb21wbGV0ZWQodGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmYWlsKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09IFZpc2l0U3RhdGUuc3RhcnRlZCkge1xuICAgICAgdGhpcy5zdGF0ZSA9IFZpc2l0U3RhdGUuZmFpbGVkXG4gICAgICB0aGlzLmFkYXB0ZXIudmlzaXRGYWlsZWQodGhpcylcbiAgICAgIHRoaXMuZGVsZWdhdGUudmlzaXRDb21wbGV0ZWQodGhpcylcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VIaXN0b3J5KCkge1xuICAgIGlmICghdGhpcy5oaXN0b3J5Q2hhbmdlZCAmJiB0aGlzLnVwZGF0ZUhpc3RvcnkpIHtcbiAgICAgIGNvbnN0IGFjdGlvbkZvckhpc3RvcnkgPSB0aGlzLmxvY2F0aW9uLmhyZWYgPT09IHRoaXMucmVmZXJyZXI/LmhyZWYgPyBcInJlcGxhY2VcIiA6IHRoaXMuYWN0aW9uXG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRIaXN0b3J5TWV0aG9kRm9yQWN0aW9uKGFjdGlvbkZvckhpc3RvcnkpXG4gICAgICB0aGlzLmhpc3RvcnkudXBkYXRlKG1ldGhvZCwgdGhpcy5sb2NhdGlvbiwgdGhpcy5yZXN0b3JhdGlvbklkZW50aWZpZXIpXG4gICAgICB0aGlzLmhpc3RvcnlDaGFuZ2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGlzc3VlUmVxdWVzdCgpIHtcbiAgICBpZiAodGhpcy5oYXNQcmVsb2FkZWRSZXNwb25zZSgpKSB7XG4gICAgICB0aGlzLnNpbXVsYXRlUmVxdWVzdCgpXG4gICAgfSBlbHNlIGlmICh0aGlzLnNob3VsZElzc3VlUmVxdWVzdCgpICYmICF0aGlzLnJlcXVlc3QpIHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IG5ldyBGZXRjaFJlcXVlc3QodGhpcywgRmV0Y2hNZXRob2QuZ2V0LCB0aGlzLmxvY2F0aW9uKVxuICAgICAgdGhpcy5yZXF1ZXN0LnBlcmZvcm0oKVxuICAgIH1cbiAgfVxuXG4gIHNpbXVsYXRlUmVxdWVzdCgpIHtcbiAgICBpZiAodGhpcy5yZXNwb25zZSkge1xuICAgICAgdGhpcy5zdGFydFJlcXVlc3QoKVxuICAgICAgdGhpcy5yZWNvcmRSZXNwb25zZSgpXG4gICAgICB0aGlzLmZpbmlzaFJlcXVlc3QoKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0UmVxdWVzdCgpIHtcbiAgICB0aGlzLnJlY29yZFRpbWluZ01ldHJpYyhUaW1pbmdNZXRyaWMucmVxdWVzdFN0YXJ0KVxuICAgIHRoaXMuYWRhcHRlci52aXNpdFJlcXVlc3RTdGFydGVkKHRoaXMpXG4gIH1cblxuICByZWNvcmRSZXNwb25zZShyZXNwb25zZSA9IHRoaXMucmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2VcbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHsgc3RhdHVzQ29kZSB9ID0gcmVzcG9uc2VcbiAgICAgIGlmIChpc1N1Y2Nlc3NmdWwoc3RhdHVzQ29kZSkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnZpc2l0UmVxdWVzdENvbXBsZXRlZCh0aGlzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyLnZpc2l0UmVxdWVzdEZhaWxlZFdpdGhTdGF0dXNDb2RlKHRoaXMsIHN0YXR1c0NvZGUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluaXNoUmVxdWVzdCgpIHtcbiAgICB0aGlzLnJlY29yZFRpbWluZ01ldHJpYyhUaW1pbmdNZXRyaWMucmVxdWVzdEVuZClcbiAgICB0aGlzLmFkYXB0ZXIudmlzaXRSZXF1ZXN0RmluaXNoZWQodGhpcylcbiAgfVxuXG4gIGxvYWRSZXNwb25zZSgpIHtcbiAgICBpZiAodGhpcy5yZXNwb25zZSkge1xuICAgICAgY29uc3QgeyBzdGF0dXNDb2RlLCByZXNwb25zZUhUTUwgfSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIHRoaXMucmVuZGVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkQ2FjaGVTbmFwc2hvdCkgdGhpcy5jYWNoZVNuYXBzaG90KClcbiAgICAgICAgaWYgKHRoaXMudmlldy5yZW5kZXJQcm9taXNlKSBhd2FpdCB0aGlzLnZpZXcucmVuZGVyUHJvbWlzZVxuXG4gICAgICAgIGlmIChpc1N1Y2Nlc3NmdWwoc3RhdHVzQ29kZSkgJiYgcmVzcG9uc2VIVE1MICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IFBhZ2VTbmFwc2hvdC5mcm9tSFRNTFN0cmluZyhyZXNwb25zZUhUTUwpXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXJQYWdlU25hcHNob3Qoc25hcHNob3QsIGZhbHNlKVxuXG4gICAgICAgICAgdGhpcy5hZGFwdGVyLnZpc2l0UmVuZGVyZWQodGhpcylcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnZpZXcucmVuZGVyRXJyb3IoUGFnZVNuYXBzaG90LmZyb21IVE1MU3RyaW5nKHJlc3BvbnNlSFRNTCksIHRoaXMpXG4gICAgICAgICAgdGhpcy5hZGFwdGVyLnZpc2l0UmVuZGVyZWQodGhpcylcbiAgICAgICAgICB0aGlzLmZhaWwoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGdldENhY2hlZFNuYXBzaG90KCkge1xuICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy52aWV3LmdldENhY2hlZFNuYXBzaG90Rm9yTG9jYXRpb24odGhpcy5sb2NhdGlvbikgfHwgdGhpcy5nZXRQcmVsb2FkZWRTbmFwc2hvdCgpXG5cbiAgICBpZiAoc25hcHNob3QgJiYgKCFnZXRBbmNob3IodGhpcy5sb2NhdGlvbikgfHwgc25hcHNob3QuaGFzQW5jaG9yKGdldEFuY2hvcih0aGlzLmxvY2F0aW9uKSkpKSB7XG4gICAgICBpZiAodGhpcy5hY3Rpb24gPT0gXCJyZXN0b3JlXCIgfHwgc25hcHNob3QuaXNQcmV2aWV3YWJsZSkge1xuICAgICAgICByZXR1cm4gc25hcHNob3RcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRQcmVsb2FkZWRTbmFwc2hvdCgpIHtcbiAgICBpZiAodGhpcy5zbmFwc2hvdEhUTUwpIHtcbiAgICAgIHJldHVybiBQYWdlU25hcHNob3QuZnJvbUhUTUxTdHJpbmcodGhpcy5zbmFwc2hvdEhUTUwpXG4gICAgfVxuICB9XG5cbiAgaGFzQ2FjaGVkU25hcHNob3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkU25hcHNob3QoKSAhPSBudWxsXG4gIH1cblxuICBsb2FkQ2FjaGVkU25hcHNob3QoKSB7XG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLmdldENhY2hlZFNuYXBzaG90KClcbiAgICBpZiAoc25hcHNob3QpIHtcbiAgICAgIGNvbnN0IGlzUHJldmlldyA9IHRoaXMuc2hvdWxkSXNzdWVSZXF1ZXN0KClcbiAgICAgIHRoaXMucmVuZGVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5jYWNoZVNuYXBzaG90KClcbiAgICAgICAgaWYgKHRoaXMuaXNTYW1lUGFnZSB8fCB0aGlzLmlzUGFnZVJlZnJlc2gpIHtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXIudmlzaXRSZW5kZXJlZCh0aGlzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLnZpZXcucmVuZGVyUHJvbWlzZSkgYXdhaXQgdGhpcy52aWV3LnJlbmRlclByb21pc2VcblxuICAgICAgICAgIGF3YWl0IHRoaXMucmVuZGVyUGFnZVNuYXBzaG90KHNuYXBzaG90LCBpc1ByZXZpZXcpXG5cbiAgICAgICAgICB0aGlzLmFkYXB0ZXIudmlzaXRSZW5kZXJlZCh0aGlzKVxuICAgICAgICAgIGlmICghaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZm9sbG93UmVkaXJlY3QoKSB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RlZFRvTG9jYXRpb24gJiYgIXRoaXMuZm9sbG93ZWRSZWRpcmVjdCAmJiB0aGlzLnJlc3BvbnNlPy5yZWRpcmVjdGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXIudmlzaXRQcm9wb3NlZFRvTG9jYXRpb24odGhpcy5yZWRpcmVjdGVkVG9Mb2NhdGlvbiwge1xuICAgICAgICBhY3Rpb246IFwicmVwbGFjZVwiLFxuICAgICAgICByZXNwb25zZTogdGhpcy5yZXNwb25zZSxcbiAgICAgICAgc2hvdWxkQ2FjaGVTbmFwc2hvdDogZmFsc2UsXG4gICAgICAgIHdpbGxSZW5kZXI6IGZhbHNlXG4gICAgICB9KVxuICAgICAgdGhpcy5mb2xsb3dlZFJlZGlyZWN0ID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGdvVG9TYW1lUGFnZUFuY2hvcigpIHtcbiAgICBpZiAodGhpcy5pc1NhbWVQYWdlKSB7XG4gICAgICB0aGlzLnJlbmRlcihhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2FjaGVTbmFwc2hvdCgpXG4gICAgICAgIHRoaXMucGVyZm9ybVNjcm9sbCgpXG4gICAgICAgIHRoaXMuY2hhbmdlSGlzdG9yeSgpXG4gICAgICAgIHRoaXMuYWRhcHRlci52aXNpdFJlbmRlcmVkKHRoaXMpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIEZldGNoIHJlcXVlc3QgZGVsZWdhdGVcblxuICBwcmVwYXJlUmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgaWYgKHRoaXMuYWNjZXB0c1N0cmVhbVJlc3BvbnNlKSB7XG4gICAgICByZXF1ZXN0LmFjY2VwdFJlc3BvbnNlVHlwZShTdHJlYW1NZXNzYWdlLmNvbnRlbnRUeXBlKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RTdGFydGVkKCkge1xuICAgIHRoaXMuc3RhcnRSZXF1ZXN0KClcbiAgfVxuXG4gIHJlcXVlc3RQcmV2ZW50ZWRIYW5kbGluZ1Jlc3BvbnNlKF9yZXF1ZXN0LCBfcmVzcG9uc2UpIHt9XG5cbiAgYXN5bmMgcmVxdWVzdFN1Y2NlZWRlZFdpdGhSZXNwb25zZShyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIGNvbnN0IHJlc3BvbnNlSFRNTCA9IGF3YWl0IHJlc3BvbnNlLnJlc3BvbnNlSFRNTFxuICAgIGNvbnN0IHsgcmVkaXJlY3RlZCwgc3RhdHVzQ29kZSB9ID0gcmVzcG9uc2VcbiAgICBpZiAocmVzcG9uc2VIVE1MID09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZWNvcmRSZXNwb25zZSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IFN5c3RlbVN0YXR1c0NvZGUuY29udGVudFR5cGVNaXNtYXRjaCxcbiAgICAgICAgcmVkaXJlY3RlZFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZWRpcmVjdGVkVG9Mb2NhdGlvbiA9IHJlc3BvbnNlLnJlZGlyZWN0ZWQgPyByZXNwb25zZS5sb2NhdGlvbiA6IHVuZGVmaW5lZFxuICAgICAgdGhpcy5yZWNvcmRSZXNwb25zZSh7IHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUsIHJlc3BvbnNlSFRNTCwgcmVkaXJlY3RlZCB9KVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RGYWlsZWRXaXRoUmVzcG9uc2UocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICBjb25zdCByZXNwb25zZUhUTUwgPSBhd2FpdCByZXNwb25zZS5yZXNwb25zZUhUTUxcbiAgICBjb25zdCB7IHJlZGlyZWN0ZWQsIHN0YXR1c0NvZGUgfSA9IHJlc3BvbnNlXG4gICAgaWYgKHJlc3BvbnNlSFRNTCA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucmVjb3JkUmVzcG9uc2Uoe1xuICAgICAgICBzdGF0dXNDb2RlOiBTeXN0ZW1TdGF0dXNDb2RlLmNvbnRlbnRUeXBlTWlzbWF0Y2gsXG4gICAgICAgIHJlZGlyZWN0ZWRcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVjb3JkUmVzcG9uc2UoeyBzdGF0dXNDb2RlOiBzdGF0dXNDb2RlLCByZXNwb25zZUhUTUwsIHJlZGlyZWN0ZWQgfSlcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RXJyb3JlZChfcmVxdWVzdCwgX2Vycm9yKSB7XG4gICAgdGhpcy5yZWNvcmRSZXNwb25zZSh7XG4gICAgICBzdGF0dXNDb2RlOiBTeXN0ZW1TdGF0dXNDb2RlLm5ldHdvcmtGYWlsdXJlLFxuICAgICAgcmVkaXJlY3RlZDogZmFsc2VcbiAgICB9KVxuICB9XG5cbiAgcmVxdWVzdEZpbmlzaGVkKCkge1xuICAgIHRoaXMuZmluaXNoUmVxdWVzdCgpXG4gIH1cblxuICAvLyBTY3JvbGxpbmdcblxuICBwZXJmb3JtU2Nyb2xsKCkge1xuICAgIGlmICghdGhpcy5zY3JvbGxlZCAmJiAhdGhpcy52aWV3LmZvcmNlUmVsb2FkZWQgJiYgIXRoaXMudmlldy5zaG91bGRQcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uKHRoaXMpKSB7XG4gICAgICBpZiAodGhpcy5hY3Rpb24gPT0gXCJyZXN0b3JlXCIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb1Jlc3RvcmVkUG9zaXRpb24oKSB8fCB0aGlzLnNjcm9sbFRvQW5jaG9yKCkgfHwgdGhpcy52aWV3LnNjcm9sbFRvVG9wKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9BbmNob3IoKSB8fCB0aGlzLnZpZXcuc2Nyb2xsVG9Ub3AoKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNTYW1lUGFnZSkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnZpc2l0U2Nyb2xsZWRUb1NhbWVQYWdlTG9jYXRpb24odGhpcy52aWV3Lmxhc3RSZW5kZXJlZExvY2F0aW9uLCB0aGlzLmxvY2F0aW9uKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvUmVzdG9yZWRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB7IHNjcm9sbFBvc2l0aW9uIH0gPSB0aGlzLnJlc3RvcmF0aW9uRGF0YVxuICAgIGlmIChzY3JvbGxQb3NpdGlvbikge1xuICAgICAgdGhpcy52aWV3LnNjcm9sbFRvUG9zaXRpb24oc2Nyb2xsUG9zaXRpb24pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbFRvQW5jaG9yKCkge1xuICAgIGNvbnN0IGFuY2hvciA9IGdldEFuY2hvcih0aGlzLmxvY2F0aW9uKVxuICAgIGlmIChhbmNob3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy52aWV3LnNjcm9sbFRvQW5jaG9yKGFuY2hvcilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLy8gSW5zdHJ1bWVudGF0aW9uXG5cbiAgcmVjb3JkVGltaW5nTWV0cmljKG1ldHJpYykge1xuICAgIHRoaXMudGltaW5nTWV0cmljc1ttZXRyaWNdID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgfVxuXG4gIGdldFRpbWluZ01ldHJpY3MoKSB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy50aW1pbmdNZXRyaWNzIH1cbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBnZXRIaXN0b3J5TWV0aG9kRm9yQWN0aW9uKGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlIFwicmVwbGFjZVwiOlxuICAgICAgICByZXR1cm4gaGlzdG9yeS5yZXBsYWNlU3RhdGVcbiAgICAgIGNhc2UgXCJhZHZhbmNlXCI6XG4gICAgICBjYXNlIFwicmVzdG9yZVwiOlxuICAgICAgICByZXR1cm4gaGlzdG9yeS5wdXNoU3RhdGVcbiAgICB9XG4gIH1cblxuICBoYXNQcmVsb2FkZWRSZXNwb25zZSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMucmVzcG9uc2UgPT0gXCJvYmplY3RcIlxuICB9XG5cbiAgc2hvdWxkSXNzdWVSZXF1ZXN0KCkge1xuICAgIGlmICh0aGlzLmlzU2FtZVBhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAodGhpcy5hY3Rpb24gPT0gXCJyZXN0b3JlXCIpIHtcbiAgICAgIHJldHVybiAhdGhpcy5oYXNDYWNoZWRTbmFwc2hvdCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLndpbGxSZW5kZXJcbiAgICB9XG4gIH1cblxuICBjYWNoZVNuYXBzaG90KCkge1xuICAgIGlmICghdGhpcy5zbmFwc2hvdENhY2hlZCkge1xuICAgICAgdGhpcy52aWV3LmNhY2hlU25hcHNob3QodGhpcy5zbmFwc2hvdCkudGhlbigoc25hcHNob3QpID0+IHNuYXBzaG90ICYmIHRoaXMudmlzaXRDYWNoZWRTbmFwc2hvdChzbmFwc2hvdCkpXG4gICAgICB0aGlzLnNuYXBzaG90Q2FjaGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbmRlcihjYWxsYmFjaykge1xuICAgIHRoaXMuY2FuY2VsUmVuZGVyKClcbiAgICB0aGlzLmZyYW1lID0gYXdhaXQgbmV4dFJlcGFpbnQoKVxuICAgIGF3YWl0IGNhbGxiYWNrKClcbiAgICBkZWxldGUgdGhpcy5mcmFtZVxuICB9XG5cbiAgYXN5bmMgcmVuZGVyUGFnZVNuYXBzaG90KHNuYXBzaG90LCBpc1ByZXZpZXcpIHtcbiAgICBhd2FpdCB0aGlzLnZpZXdUcmFuc2l0aW9uZXIucmVuZGVyQ2hhbmdlKHRoaXMudmlldy5zaG91bGRUcmFuc2l0aW9uVG8oc25hcHNob3QpLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnZpZXcucmVuZGVyUGFnZShzbmFwc2hvdCwgaXNQcmV2aWV3LCB0aGlzLndpbGxSZW5kZXIsIHRoaXMpXG4gICAgICB0aGlzLnBlcmZvcm1TY3JvbGwoKVxuICAgIH0pXG4gIH1cblxuICBjYW5jZWxSZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuZnJhbWUpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUpXG4gICAgICBkZWxldGUgdGhpcy5mcmFtZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N1Y2Nlc3NmdWwoc3RhdHVzQ29kZSkge1xuICByZXR1cm4gc3RhdHVzQ29kZSA+PSAyMDAgJiYgc3RhdHVzQ29kZSA8IDMwMFxufVxuIiwgImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4uL2RyaXZlL3Byb2dyZXNzX2JhclwiXG5pbXBvcnQgeyBTeXN0ZW1TdGF0dXNDb2RlIH0gZnJvbSBcIi4uL2RyaXZlL3Zpc2l0XCJcbmltcG9ydCB7IHV1aWQsIGRpc3BhdGNoIH0gZnJvbSBcIi4uLy4uL3V0aWxcIlxuaW1wb3J0IHsgbG9jYXRpb25Jc1Zpc2l0YWJsZSB9IGZyb20gXCIuLi91cmxcIlxuXG5leHBvcnQgY2xhc3MgQnJvd3NlckFkYXB0ZXIge1xuICBwcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0JhcigpXG5cbiAgY29uc3RydWN0b3Ioc2Vzc2lvbikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb25cbiAgfVxuXG4gIHZpc2l0UHJvcG9zZWRUb0xvY2F0aW9uKGxvY2F0aW9uLCBvcHRpb25zKSB7XG4gICAgaWYgKGxvY2F0aW9uSXNWaXNpdGFibGUobG9jYXRpb24sIHRoaXMubmF2aWdhdG9yLnJvb3RMb2NhdGlvbikpIHtcbiAgICAgIHRoaXMubmF2aWdhdG9yLnN0YXJ0VmlzaXQobG9jYXRpb24sIG9wdGlvbnM/LnJlc3RvcmF0aW9uSWRlbnRpZmllciB8fCB1dWlkKCksIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbG9jYXRpb24udG9TdHJpbmcoKVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0U3RhcnRlZCh2aXNpdCkge1xuICAgIHRoaXMubG9jYXRpb24gPSB2aXNpdC5sb2NhdGlvblxuICAgIHZpc2l0LmxvYWRDYWNoZWRTbmFwc2hvdCgpXG4gICAgdmlzaXQuaXNzdWVSZXF1ZXN0KClcbiAgICB2aXNpdC5nb1RvU2FtZVBhZ2VBbmNob3IoKVxuICB9XG5cbiAgdmlzaXRSZXF1ZXN0U3RhcnRlZCh2aXNpdCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2V0VmFsdWUoMClcbiAgICBpZiAodmlzaXQuaGFzQ2FjaGVkU25hcHNob3QoKSB8fCB2aXNpdC5hY3Rpb24gIT0gXCJyZXN0b3JlXCIpIHtcbiAgICAgIHRoaXMuc2hvd1Zpc2l0UHJvZ3Jlc3NCYXJBZnRlckRlbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93UHJvZ3Jlc3NCYXIoKVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0UmVxdWVzdENvbXBsZXRlZCh2aXNpdCkge1xuICAgIHZpc2l0LmxvYWRSZXNwb25zZSgpXG4gIH1cblxuICB2aXNpdFJlcXVlc3RGYWlsZWRXaXRoU3RhdHVzQ29kZSh2aXNpdCwgc3RhdHVzQ29kZSkge1xuICAgIHN3aXRjaCAoc3RhdHVzQ29kZSkge1xuICAgICAgY2FzZSBTeXN0ZW1TdGF0dXNDb2RlLm5ldHdvcmtGYWlsdXJlOlxuICAgICAgY2FzZSBTeXN0ZW1TdGF0dXNDb2RlLnRpbWVvdXRGYWlsdXJlOlxuICAgICAgY2FzZSBTeXN0ZW1TdGF0dXNDb2RlLmNvbnRlbnRUeXBlTWlzbWF0Y2g6XG4gICAgICAgIHJldHVybiB0aGlzLnJlbG9hZCh7XG4gICAgICAgICAgcmVhc29uOiBcInJlcXVlc3RfZmFpbGVkXCIsXG4gICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgc3RhdHVzQ29kZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2aXNpdC5sb2FkUmVzcG9uc2UoKVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0UmVxdWVzdEZpbmlzaGVkKF92aXNpdCkge31cblxuICB2aXNpdENvbXBsZXRlZChfdmlzaXQpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyLnNldFZhbHVlKDEpXG4gICAgdGhpcy5oaWRlVmlzaXRQcm9ncmVzc0JhcigpXG4gIH1cblxuICBwYWdlSW52YWxpZGF0ZWQocmVhc29uKSB7XG4gICAgdGhpcy5yZWxvYWQocmVhc29uKVxuICB9XG5cbiAgdmlzaXRGYWlsZWQoX3Zpc2l0KSB7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zZXRWYWx1ZSgxKVxuICAgIHRoaXMuaGlkZVZpc2l0UHJvZ3Jlc3NCYXIoKVxuICB9XG5cbiAgdmlzaXRSZW5kZXJlZChfdmlzaXQpIHt9XG5cbiAgLy8gRm9ybSBTdWJtaXNzaW9uIERlbGVnYXRlXG5cbiAgZm9ybVN1Ym1pc3Npb25TdGFydGVkKF9mb3JtU3VibWlzc2lvbikge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2V0VmFsdWUoMClcbiAgICB0aGlzLnNob3dGb3JtUHJvZ3Jlc3NCYXJBZnRlckRlbGF5KClcbiAgfVxuXG4gIGZvcm1TdWJtaXNzaW9uRmluaXNoZWQoX2Zvcm1TdWJtaXNzaW9uKSB7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zZXRWYWx1ZSgxKVxuICAgIHRoaXMuaGlkZUZvcm1Qcm9ncmVzc0JhcigpXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgc2hvd1Zpc2l0UHJvZ3Jlc3NCYXJBZnRlckRlbGF5KCkge1xuICAgIHRoaXMudmlzaXRQcm9ncmVzc0JhclRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnNob3dQcm9ncmVzc0JhciwgdGhpcy5zZXNzaW9uLnByb2dyZXNzQmFyRGVsYXkpXG4gIH1cblxuICBoaWRlVmlzaXRQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyLmhpZGUoKVxuICAgIGlmICh0aGlzLnZpc2l0UHJvZ3Jlc3NCYXJUaW1lb3V0ICE9IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy52aXNpdFByb2dyZXNzQmFyVGltZW91dClcbiAgICAgIGRlbGV0ZSB0aGlzLnZpc2l0UHJvZ3Jlc3NCYXJUaW1lb3V0XG4gICAgfVxuICB9XG5cbiAgc2hvd0Zvcm1Qcm9ncmVzc0JhckFmdGVyRGVsYXkoKSB7XG4gICAgaWYgKHRoaXMuZm9ybVByb2dyZXNzQmFyVGltZW91dCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmZvcm1Qcm9ncmVzc0JhclRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCh0aGlzLnNob3dQcm9ncmVzc0JhciwgdGhpcy5zZXNzaW9uLnByb2dyZXNzQmFyRGVsYXkpXG4gICAgfVxuICB9XG5cbiAgaGlkZUZvcm1Qcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyLmhpZGUoKVxuICAgIGlmICh0aGlzLmZvcm1Qcm9ncmVzc0JhclRpbWVvdXQgIT0gbnVsbCkge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmZvcm1Qcm9ncmVzc0JhclRpbWVvdXQpXG4gICAgICBkZWxldGUgdGhpcy5mb3JtUHJvZ3Jlc3NCYXJUaW1lb3V0XG4gICAgfVxuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2hvdygpXG4gIH1cblxuICByZWxvYWQocmVhc29uKSB7XG4gICAgZGlzcGF0Y2goXCJ0dXJibzpyZWxvYWRcIiwgeyBkZXRhaWw6IHJlYXNvbiB9KVxuXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmxvY2F0aW9uPy50b1N0cmluZygpIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gIH1cblxuICBnZXQgbmF2aWdhdG9yKCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24ubmF2aWdhdG9yXG4gIH1cbn1cbiIsICJleHBvcnQgY2xhc3MgQ2FjaGVPYnNlcnZlciB7XG4gIHNlbGVjdG9yID0gXCJbZGF0YS10dXJiby10ZW1wb3JhcnldXCJcbiAgZGVwcmVjYXRlZFNlbGVjdG9yID0gXCJbZGF0YS10dXJiby1jYWNoZT1mYWxzZV1cIlxuXG4gIHN0YXJ0ZWQgPSBmYWxzZVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlXG4gICAgICBhZGRFdmVudExpc3RlbmVyKFwidHVyYm86YmVmb3JlLWNhY2hlXCIsIHRoaXMucmVtb3ZlVGVtcG9yYXJ5RWxlbWVudHMsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0dXJibzpiZWZvcmUtY2FjaGVcIiwgdGhpcy5yZW1vdmVUZW1wb3JhcnlFbGVtZW50cywgZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlVGVtcG9yYXJ5RWxlbWVudHMgPSAoX2V2ZW50KSA9PiB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMudGVtcG9yYXJ5RWxlbWVudHMpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG4gIH1cblxuICBnZXQgdGVtcG9yYXJ5RWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2VsZWN0b3IpLCAuLi50aGlzLnRlbXBvcmFyeUVsZW1lbnRzV2l0aERlcHJlY2F0aW9uXVxuICB9XG5cbiAgZ2V0IHRlbXBvcmFyeUVsZW1lbnRzV2l0aERlcHJlY2F0aW9uKCkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRlcHJlY2F0ZWRTZWxlY3RvcilcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRoZSAke3RoaXMuZGVwcmVjYXRlZFNlbGVjdG9yfSBzZWxlY3RvciBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi4gVXNlICR7dGhpcy5zZWxlY3Rvcn0gaW5zdGVhZC5gXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIFsuLi5lbGVtZW50c11cbiAgfVxufVxuIiwgImltcG9ydCB7IEZvcm1TdWJtaXRPYnNlcnZlciB9IGZyb20gXCIuLi8uLi9vYnNlcnZlcnMvZm9ybV9zdWJtaXRfb2JzZXJ2ZXJcIlxuaW1wb3J0IHsgRnJhbWVFbGVtZW50IH0gZnJvbSBcIi4uLy4uL2VsZW1lbnRzL2ZyYW1lX2VsZW1lbnRcIlxuaW1wb3J0IHsgTGlua0ludGVyY2VwdG9yIH0gZnJvbSBcIi4vbGlua19pbnRlcmNlcHRvclwiXG5pbXBvcnQgeyBleHBhbmRVUkwsIGdldEFjdGlvbiwgbG9jYXRpb25Jc1Zpc2l0YWJsZSB9IGZyb20gXCIuLi91cmxcIlxuXG5leHBvcnQgY2xhc3MgRnJhbWVSZWRpcmVjdG9yIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgZWxlbWVudCkge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb25cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5saW5rSW50ZXJjZXB0b3IgPSBuZXcgTGlua0ludGVyY2VwdG9yKHRoaXMsIGVsZW1lbnQpXG4gICAgdGhpcy5mb3JtU3VibWl0T2JzZXJ2ZXIgPSBuZXcgRm9ybVN1Ym1pdE9ic2VydmVyKHRoaXMsIGVsZW1lbnQpXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmxpbmtJbnRlcmNlcHRvci5zdGFydCgpXG4gICAgdGhpcy5mb3JtU3VibWl0T2JzZXJ2ZXIuc3RhcnQoKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmxpbmtJbnRlcmNlcHRvci5zdG9wKClcbiAgICB0aGlzLmZvcm1TdWJtaXRPYnNlcnZlci5zdG9wKClcbiAgfVxuXG4gIC8vIExpbmsgaW50ZXJjZXB0b3IgZGVsZWdhdGVcblxuICBzaG91bGRJbnRlcmNlcHRMaW5rQ2xpY2soZWxlbWVudCwgX2xvY2F0aW9uLCBfZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy4jc2hvdWxkUmVkaXJlY3QoZWxlbWVudClcbiAgfVxuXG4gIGxpbmtDbGlja0ludGVyY2VwdGVkKGVsZW1lbnQsIHVybCwgZXZlbnQpIHtcbiAgICBjb25zdCBmcmFtZSA9IHRoaXMuI2ZpbmRGcmFtZUVsZW1lbnQoZWxlbWVudClcbiAgICBpZiAoZnJhbWUpIHtcbiAgICAgIGZyYW1lLmRlbGVnYXRlLmxpbmtDbGlja0ludGVyY2VwdGVkKGVsZW1lbnQsIHVybCwgZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgLy8gRm9ybSBzdWJtaXQgb2JzZXJ2ZXIgZGVsZWdhdGVcblxuICB3aWxsU3VibWl0Rm9ybShlbGVtZW50LCBzdWJtaXR0ZXIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZWxlbWVudC5jbG9zZXN0KFwidHVyYm8tZnJhbWVcIikgPT0gbnVsbCAmJlxuICAgICAgdGhpcy4jc2hvdWxkU3VibWl0KGVsZW1lbnQsIHN1Ym1pdHRlcikgJiZcbiAgICAgIHRoaXMuI3Nob3VsZFJlZGlyZWN0KGVsZW1lbnQsIHN1Ym1pdHRlcilcbiAgICApXG4gIH1cblxuICBmb3JtU3VibWl0dGVkKGVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICAgIGNvbnN0IGZyYW1lID0gdGhpcy4jZmluZEZyYW1lRWxlbWVudChlbGVtZW50LCBzdWJtaXR0ZXIpXG4gICAgaWYgKGZyYW1lKSB7XG4gICAgICBmcmFtZS5kZWxlZ2F0ZS5mb3JtU3VibWl0dGVkKGVsZW1lbnQsIHN1Ym1pdHRlcilcbiAgICB9XG4gIH1cblxuICAjc2hvdWxkU3VibWl0KGZvcm0sIHN1Ym1pdHRlcikge1xuICAgIGNvbnN0IGFjdGlvbiA9IGdldEFjdGlvbihmb3JtLCBzdWJtaXR0ZXIpXG4gICAgY29uc3QgbWV0YSA9IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYG1ldGFbbmFtZT1cInR1cmJvLXJvb3RcIl1gKVxuICAgIGNvbnN0IHJvb3RMb2NhdGlvbiA9IGV4cGFuZFVSTChtZXRhPy5jb250ZW50ID8/IFwiL1wiKVxuXG4gICAgcmV0dXJuIHRoaXMuI3Nob3VsZFJlZGlyZWN0KGZvcm0sIHN1Ym1pdHRlcikgJiYgbG9jYXRpb25Jc1Zpc2l0YWJsZShhY3Rpb24sIHJvb3RMb2NhdGlvbilcbiAgfVxuXG4gICNzaG91bGRSZWRpcmVjdChlbGVtZW50LCBzdWJtaXR0ZXIpIHtcbiAgICBjb25zdCBpc05hdmlnYXRhYmxlID1cbiAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnRcbiAgICAgICAgPyB0aGlzLnNlc3Npb24uc3VibWlzc2lvbklzTmF2aWdhdGFibGUoZWxlbWVudCwgc3VibWl0dGVyKVxuICAgICAgICA6IHRoaXMuc2Vzc2lvbi5lbGVtZW50SXNOYXZpZ2F0YWJsZShlbGVtZW50KVxuXG4gICAgaWYgKGlzTmF2aWdhdGFibGUpIHtcbiAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy4jZmluZEZyYW1lRWxlbWVudChlbGVtZW50LCBzdWJtaXR0ZXIpXG4gICAgICByZXR1cm4gZnJhbWUgPyBmcmFtZSAhPSBlbGVtZW50LmNsb3Nlc3QoXCJ0dXJiby1mcmFtZVwiKSA6IGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gICNmaW5kRnJhbWVFbGVtZW50KGVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICAgIGNvbnN0IGlkID0gc3VibWl0dGVyPy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWZyYW1lXCIpIHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby1mcmFtZVwiKVxuICAgIGlmIChpZCAmJiBpZCAhPSBcIl90b3BcIikge1xuICAgICAgY29uc3QgZnJhbWUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9Om5vdChbZGlzYWJsZWRdKWApXG4gICAgICBpZiAoZnJhbWUgaW5zdGFuY2VvZiBGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGZyYW1lXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgbmV4dE1pY3JvdGFzaywgdXVpZCB9IGZyb20gXCIuLi8uLi91dGlsXCJcblxuZXhwb3J0IGNsYXNzIEhpc3Rvcnkge1xuICBsb2NhdGlvblxuICByZXN0b3JhdGlvbklkZW50aWZpZXIgPSB1dWlkKClcbiAgcmVzdG9yYXRpb25EYXRhID0ge31cbiAgc3RhcnRlZCA9IGZhbHNlXG4gIHBhZ2VMb2FkZWQgPSBmYWxzZVxuICBjdXJyZW50SW5kZXggPSAwXG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgdGhpcy5vblBvcFN0YXRlLCBmYWxzZSlcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHRoaXMub25QYWdlTG9hZCwgZmFsc2UpXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGhpc3Rvcnkuc3RhdGU/LnR1cmJvPy5yZXN0b3JhdGlvbkluZGV4IHx8IDBcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWVcbiAgICAgIHRoaXMucmVwbGFjZShuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSlcbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCB0aGlzLm9uUG9wU3RhdGUsIGZhbHNlKVxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5vblBhZ2VMb2FkLCBmYWxzZSlcbiAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcHVzaChsb2NhdGlvbiwgcmVzdG9yYXRpb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy51cGRhdGUoaGlzdG9yeS5wdXNoU3RhdGUsIGxvY2F0aW9uLCByZXN0b3JhdGlvbklkZW50aWZpZXIpXG4gIH1cblxuICByZXBsYWNlKGxvY2F0aW9uLCByZXN0b3JhdGlvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLnVwZGF0ZShoaXN0b3J5LnJlcGxhY2VTdGF0ZSwgbG9jYXRpb24sIHJlc3RvcmF0aW9uSWRlbnRpZmllcilcbiAgfVxuXG4gIHVwZGF0ZShtZXRob2QsIGxvY2F0aW9uLCByZXN0b3JhdGlvbklkZW50aWZpZXIgPSB1dWlkKCkpIHtcbiAgICBpZiAobWV0aG9kID09PSBoaXN0b3J5LnB1c2hTdGF0ZSkgKyt0aGlzLmN1cnJlbnRJbmRleFxuXG4gICAgY29uc3Qgc3RhdGUgPSB7IHR1cmJvOiB7IHJlc3RvcmF0aW9uSWRlbnRpZmllciwgcmVzdG9yYXRpb25JbmRleDogdGhpcy5jdXJyZW50SW5kZXggfSB9XG4gICAgbWV0aG9kLmNhbGwoaGlzdG9yeSwgc3RhdGUsIFwiXCIsIGxvY2F0aW9uLmhyZWYpXG4gICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uXG4gICAgdGhpcy5yZXN0b3JhdGlvbklkZW50aWZpZXIgPSByZXN0b3JhdGlvbklkZW50aWZpZXJcbiAgfVxuXG4gIC8vIFJlc3RvcmF0aW9uIGRhdGFcblxuICBnZXRSZXN0b3JhdGlvbkRhdGFGb3JJZGVudGlmaWVyKHJlc3RvcmF0aW9uSWRlbnRpZmllcikge1xuICAgIHJldHVybiB0aGlzLnJlc3RvcmF0aW9uRGF0YVtyZXN0b3JhdGlvbklkZW50aWZpZXJdIHx8IHt9XG4gIH1cblxuICB1cGRhdGVSZXN0b3JhdGlvbkRhdGEoYWRkaXRpb25hbERhdGEpIHtcbiAgICBjb25zdCB7IHJlc3RvcmF0aW9uSWRlbnRpZmllciB9ID0gdGhpc1xuICAgIGNvbnN0IHJlc3RvcmF0aW9uRGF0YSA9IHRoaXMucmVzdG9yYXRpb25EYXRhW3Jlc3RvcmF0aW9uSWRlbnRpZmllcl1cbiAgICB0aGlzLnJlc3RvcmF0aW9uRGF0YVtyZXN0b3JhdGlvbklkZW50aWZpZXJdID0ge1xuICAgICAgLi4ucmVzdG9yYXRpb25EYXRhLFxuICAgICAgLi4uYWRkaXRpb25hbERhdGFcbiAgICB9XG4gIH1cblxuICAvLyBTY3JvbGwgcmVzdG9yYXRpb25cblxuICBhc3N1bWVDb250cm9sT2ZTY3JvbGxSZXN0b3JhdGlvbigpIHtcbiAgICBpZiAoIXRoaXMucHJldmlvdXNTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgdGhpcy5wcmV2aW91c1Njcm9sbFJlc3RvcmF0aW9uID0gaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA/PyBcImF1dG9cIlxuICAgICAgaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IFwibWFudWFsXCJcbiAgICB9XG4gIH1cblxuICByZWxpbnF1aXNoQ29udHJvbE9mU2Nyb2xsUmVzdG9yYXRpb24oKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IHRoaXMucHJldmlvdXNTY3JvbGxSZXN0b3JhdGlvblxuICAgICAgZGVsZXRlIHRoaXMucHJldmlvdXNTY3JvbGxSZXN0b3JhdGlvblxuICAgIH1cbiAgfVxuXG4gIC8vIEV2ZW50IGhhbmRsZXJzXG5cbiAgb25Qb3BTdGF0ZSA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnNob3VsZEhhbmRsZVBvcFN0YXRlKCkpIHtcbiAgICAgIGNvbnN0IHsgdHVyYm8gfSA9IGV2ZW50LnN0YXRlIHx8IHt9XG4gICAgICBpZiAodHVyYm8pIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgICAgIGNvbnN0IHsgcmVzdG9yYXRpb25JZGVudGlmaWVyLCByZXN0b3JhdGlvbkluZGV4IH0gPSB0dXJib1xuICAgICAgICB0aGlzLnJlc3RvcmF0aW9uSWRlbnRpZmllciA9IHJlc3RvcmF0aW9uSWRlbnRpZmllclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSByZXN0b3JhdGlvbkluZGV4ID4gdGhpcy5jdXJyZW50SW5kZXggPyBcImZvcndhcmRcIiA6IFwiYmFja1wiXG4gICAgICAgIHRoaXMuZGVsZWdhdGUuaGlzdG9yeVBvcHBlZFRvTG9jYXRpb25XaXRoUmVzdG9yYXRpb25JZGVudGlmaWVyQW5kRGlyZWN0aW9uKHRoaXMubG9jYXRpb24sIHJlc3RvcmF0aW9uSWRlbnRpZmllciwgZGlyZWN0aW9uKVxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHJlc3RvcmF0aW9uSW5kZXhcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhZ2VMb2FkID0gYXN5bmMgKF9ldmVudCkgPT4ge1xuICAgIGF3YWl0IG5leHRNaWNyb3Rhc2soKVxuICAgIHRoaXMucGFnZUxvYWRlZCA9IHRydWVcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBzaG91bGRIYW5kbGVQb3BTdGF0ZSgpIHtcbiAgICAvLyBTYWZhcmkgZGlzcGF0Y2hlcyBhIHBvcHN0YXRlIGV2ZW50IGFmdGVyIHdpbmRvdydzIGxvYWQgZXZlbnQsIGlnbm9yZSBpdFxuICAgIHJldHVybiB0aGlzLnBhZ2VJc0xvYWRlZCgpXG4gIH1cblxuICBwYWdlSXNMb2FkZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZUxvYWRlZCB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIlxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZGlzcGF0Y2gsXG4gIGdldExvY2F0aW9uRm9yTGluayxcbiAgZ2V0TWV0YUNvbnRlbnQsXG4gIGZpbmRDbG9zZXN0UmVjdXJzaXZlbHlcbn0gZnJvbSBcIi4uL3V0aWxcIlxuXG5pbXBvcnQgeyBGZXRjaE1ldGhvZCwgRmV0Y2hSZXF1ZXN0IH0gZnJvbSBcIi4uL2h0dHAvZmV0Y2hfcmVxdWVzdFwiXG5pbXBvcnQgeyBwcmVmZXRjaENhY2hlLCBjYWNoZVR0bCB9IGZyb20gXCIuLi9jb3JlL2RyaXZlL3ByZWZldGNoX2NhY2hlXCJcblxuZXhwb3J0IGNsYXNzIExpbmtQcmVmZXRjaE9ic2VydmVyIHtcbiAgc3RhcnRlZCA9IGZhbHNlXG4gICNwcmVmZXRjaGVkTGluayA9IG51bGxcblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgZXZlbnRUYXJnZXQpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgICB0aGlzLmV2ZW50VGFyZ2V0ID0gZXZlbnRUYXJnZXRcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHJldHVyblxuXG4gICAgaWYgKHRoaXMuZXZlbnRUYXJnZXQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgIHRoaXMuZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgdGhpcy4jZW5hYmxlLCB7IG9uY2U6IHRydWUgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jZW5hYmxlKClcbiAgICB9XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSByZXR1cm5cblxuICAgIHRoaXMuZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy4jdHJ5VG9QcmVmZXRjaFJlcXVlc3QsIHtcbiAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICBwYXNzaXZlOiB0cnVlXG4gICAgfSlcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuI2NhbmNlbFJlcXVlc3RJZk9ic29sZXRlLCB7XG4gICAgICBjYXB0dXJlOiB0cnVlLFxuICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgIH0pXG5cbiAgICB0aGlzLmV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0dXJibzpiZWZvcmUtZmV0Y2gtcmVxdWVzdFwiLCB0aGlzLiN0cnlUb1VzZVByZWZldGNoZWRSZXF1ZXN0LCB0cnVlKVxuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlXG4gIH1cblxuICAjZW5hYmxlID0gKCkgPT4ge1xuICAgIHRoaXMuZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy4jdHJ5VG9QcmVmZXRjaFJlcXVlc3QsIHtcbiAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICBwYXNzaXZlOiB0cnVlXG4gICAgfSlcbiAgICB0aGlzLmV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuI2NhbmNlbFJlcXVlc3RJZk9ic29sZXRlLCB7XG4gICAgICBjYXB0dXJlOiB0cnVlLFxuICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgIH0pXG5cbiAgICB0aGlzLmV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJibzpiZWZvcmUtZmV0Y2gtcmVxdWVzdFwiLCB0aGlzLiN0cnlUb1VzZVByZWZldGNoZWRSZXF1ZXN0LCB0cnVlKVxuICAgIHRoaXMuc3RhcnRlZCA9IHRydWVcbiAgfVxuXG4gICN0cnlUb1ByZWZldGNoUmVxdWVzdCA9IChldmVudCkgPT4ge1xuICAgIGlmIChnZXRNZXRhQ29udGVudChcInR1cmJvLXByZWZldGNoXCIpID09PSBcImZhbHNlXCIpIHJldHVyblxuXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgY29uc3QgaXNMaW5rID0gdGFyZ2V0Lm1hdGNoZXMgJiYgdGFyZ2V0Lm1hdGNoZXMoXCJhW2hyZWZdOm5vdChbdGFyZ2V0Xj1fXSk6bm90KFtkb3dubG9hZF0pXCIpXG5cbiAgICBpZiAoaXNMaW5rICYmIHRoaXMuI2lzUHJlZmV0Y2hhYmxlKHRhcmdldCkpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSB0YXJnZXRcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2V0TG9jYXRpb25Gb3JMaW5rKGxpbmspXG5cbiAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmNhblByZWZldGNoUmVxdWVzdFRvTG9jYXRpb24obGluaywgbG9jYXRpb24pKSB7XG4gICAgICAgIHRoaXMuI3ByZWZldGNoZWRMaW5rID0gbGlua1xuXG4gICAgICAgIGNvbnN0IGZldGNoUmVxdWVzdCA9IG5ldyBGZXRjaFJlcXVlc3QoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBGZXRjaE1ldGhvZC5nZXQsXG4gICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcygpLFxuICAgICAgICAgIHRhcmdldFxuICAgICAgICApXG5cbiAgICAgICAgcHJlZmV0Y2hDYWNoZS5zZXRMYXRlcihsb2NhdGlvbi50b1N0cmluZygpLCBmZXRjaFJlcXVlc3QsIHRoaXMuI2NhY2hlVHRsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICNjYW5jZWxSZXF1ZXN0SWZPYnNvbGV0ZSA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMuI3ByZWZldGNoZWRMaW5rKSB0aGlzLiNjYW5jZWxQcmVmZXRjaFJlcXVlc3QoKVxuICB9XG5cbiAgI2NhbmNlbFByZWZldGNoUmVxdWVzdCA9ICgpID0+IHtcbiAgICBwcmVmZXRjaENhY2hlLmNsZWFyKClcbiAgICB0aGlzLiNwcmVmZXRjaGVkTGluayA9IG51bGxcbiAgfVxuXG4gICN0cnlUb1VzZVByZWZldGNoZWRSZXF1ZXN0ID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSBcIkZPUk1cIiAmJiBldmVudC5kZXRhaWwuZmV0Y2hPcHRpb25zLm1ldGhvZCA9PT0gXCJnZXRcIikge1xuICAgICAgY29uc3QgY2FjaGVkID0gcHJlZmV0Y2hDYWNoZS5nZXQoZXZlbnQuZGV0YWlsLnVybC50b1N0cmluZygpKVxuXG4gICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIC8vIFVzZXIgY2xpY2tlZCBsaW5rLCB1c2UgY2FjaGUgcmVzcG9uc2VcbiAgICAgICAgZXZlbnQuZGV0YWlsLmZldGNoUmVxdWVzdCA9IGNhY2hlZFxuICAgICAgfVxuXG4gICAgICBwcmVmZXRjaENhY2hlLmNsZWFyKClcbiAgICB9XG4gIH1cblxuICBwcmVwYXJlUmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgY29uc3QgbGluayA9IHJlcXVlc3QudGFyZ2V0XG5cbiAgICByZXF1ZXN0LmhlYWRlcnNbXCJYLVNlYy1QdXJwb3NlXCJdID0gXCJwcmVmZXRjaFwiXG5cbiAgICBjb25zdCB0dXJib0ZyYW1lID0gbGluay5jbG9zZXN0KFwidHVyYm8tZnJhbWVcIilcbiAgICBjb25zdCB0dXJib0ZyYW1lVGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWZyYW1lXCIpIHx8IHR1cmJvRnJhbWU/LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKSB8fCB0dXJib0ZyYW1lPy5pZFxuXG4gICAgaWYgKHR1cmJvRnJhbWVUYXJnZXQgJiYgdHVyYm9GcmFtZVRhcmdldCAhPT0gXCJfdG9wXCIpIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVyc1tcIlR1cmJvLUZyYW1lXCJdID0gdHVyYm9GcmFtZVRhcmdldFxuICAgIH1cbiAgfVxuXG4gIC8vIEZldGNoIHJlcXVlc3QgaW50ZXJmYWNlXG5cbiAgcmVxdWVzdFN1Y2NlZWRlZFdpdGhSZXNwb25zZSgpIHt9XG5cbiAgcmVxdWVzdFN0YXJ0ZWQoZmV0Y2hSZXF1ZXN0KSB7fVxuXG4gIHJlcXVlc3RFcnJvcmVkKGZldGNoUmVxdWVzdCkge31cblxuICByZXF1ZXN0RmluaXNoZWQoZmV0Y2hSZXF1ZXN0KSB7fVxuXG4gIHJlcXVlc3RQcmV2ZW50ZWRIYW5kbGluZ1Jlc3BvbnNlKGZldGNoUmVxdWVzdCwgZmV0Y2hSZXNwb25zZSkge31cblxuICByZXF1ZXN0RmFpbGVkV2l0aFJlc3BvbnNlKGZldGNoUmVxdWVzdCwgZmV0Y2hSZXNwb25zZSkge31cblxuICBnZXQgI2NhY2hlVHRsKCkge1xuICAgIHJldHVybiBOdW1iZXIoZ2V0TWV0YUNvbnRlbnQoXCJ0dXJiby1wcmVmZXRjaC1jYWNoZS10aW1lXCIpKSB8fCBjYWNoZVR0bFxuICB9XG5cbiAgI2lzUHJlZmV0Y2hhYmxlKGxpbmspIHtcbiAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG5cbiAgICBpZiAoIWhyZWYpIHJldHVybiBmYWxzZVxuXG4gICAgaWYgKHVuZmV0Y2hhYmxlTGluayhsaW5rKSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKGxpbmtUb1RoZVNhbWVQYWdlKGxpbmspKSByZXR1cm4gZmFsc2VcbiAgICBpZiAobGlua09wdHNPdXQobGluaykpIHJldHVybiBmYWxzZVxuICAgIGlmIChub25TYWZlTGluayhsaW5rKSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKGV2ZW50UHJldmVudGVkKGxpbmspKSByZXR1cm4gZmFsc2VcblxuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cblxuY29uc3QgdW5mZXRjaGFibGVMaW5rID0gKGxpbmspID0+IHtcbiAgcmV0dXJuIGxpbmsub3JpZ2luICE9PSBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gfHwgIVtcImh0dHA6XCIsIFwiaHR0cHM6XCJdLmluY2x1ZGVzKGxpbmsucHJvdG9jb2wpIHx8IGxpbmsuaGFzQXR0cmlidXRlKFwidGFyZ2V0XCIpXG59XG5cbmNvbnN0IGxpbmtUb1RoZVNhbWVQYWdlID0gKGxpbmspID0+IHtcbiAgcmV0dXJuIChsaW5rLnBhdGhuYW1lICsgbGluay5zZWFyY2ggPT09IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSB8fCBsaW5rLmhyZWYuc3RhcnRzV2l0aChcIiNcIilcbn1cblxuY29uc3QgbGlua09wdHNPdXQgPSAobGluaykgPT4ge1xuICBpZiAobGluay5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXByZWZldGNoXCIpID09PSBcImZhbHNlXCIpIHJldHVybiB0cnVlXG4gIGlmIChsaW5rLmdldEF0dHJpYnV0ZShcImRhdGEtdHVyYm9cIikgPT09IFwiZmFsc2VcIikgcmV0dXJuIHRydWVcblxuICBjb25zdCB0dXJib1ByZWZldGNoUGFyZW50ID0gZmluZENsb3Nlc3RSZWN1cnNpdmVseShsaW5rLCBcIltkYXRhLXR1cmJvLXByZWZldGNoXVwiKVxuICBpZiAodHVyYm9QcmVmZXRjaFBhcmVudCAmJiB0dXJib1ByZWZldGNoUGFyZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdHVyYm8tcHJlZmV0Y2hcIikgPT09IFwiZmFsc2VcIikgcmV0dXJuIHRydWVcblxuICByZXR1cm4gZmFsc2Vcbn1cblxuY29uc3Qgbm9uU2FmZUxpbmsgPSAobGluaykgPT4ge1xuICBjb25zdCB0dXJib01ldGhvZCA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby1tZXRob2RcIilcbiAgaWYgKHR1cmJvTWV0aG9kICYmIHR1cmJvTWV0aG9kLnRvTG93ZXJDYXNlKCkgIT09IFwiZ2V0XCIpIHJldHVybiB0cnVlXG5cbiAgaWYgKGlzVUpTKGxpbmspKSByZXR1cm4gdHJ1ZVxuICBpZiAobGluay5oYXNBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWNvbmZpcm1cIikpIHJldHVybiB0cnVlXG4gIGlmIChsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtdHVyYm8tc3RyZWFtXCIpKSByZXR1cm4gdHJ1ZVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5jb25zdCBpc1VKUyA9IChsaW5rKSA9PiB7XG4gIHJldHVybiBsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtcmVtb3RlXCIpIHx8IGxpbmsuaGFzQXR0cmlidXRlKFwiZGF0YS1iZWhhdmlvclwiKSB8fCBsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKSB8fCBsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpXG59XG5cbmNvbnN0IGV2ZW50UHJldmVudGVkID0gKGxpbmspID0+IHtcbiAgY29uc3QgZXZlbnQgPSBkaXNwYXRjaChcInR1cmJvOmJlZm9yZS1wcmVmZXRjaFwiLCB7IHRhcmdldDogbGluaywgY2FuY2VsYWJsZTogdHJ1ZSB9KVxuICByZXR1cm4gZXZlbnQuZGVmYXVsdFByZXZlbnRlZFxufVxuIiwgImltcG9ydCB7IGdldFZpc2l0QWN0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxcIlxuaW1wb3J0IHsgRm9ybVN1Ym1pc3Npb24gfSBmcm9tIFwiLi9mb3JtX3N1Ym1pc3Npb25cIlxuaW1wb3J0IHsgZXhwYW5kVVJMLCBnZXRBbmNob3IsIGdldFJlcXVlc3RVUkwgfSBmcm9tIFwiLi4vdXJsXCJcbmltcG9ydCB7IFZpc2l0IH0gZnJvbSBcIi4vdmlzaXRcIlxuaW1wb3J0IHsgUGFnZVNuYXBzaG90IH0gZnJvbSBcIi4vcGFnZV9zbmFwc2hvdFwiXG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0b3Ige1xuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSkge1xuICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICB9XG5cbiAgcHJvcG9zZVZpc2l0KGxvY2F0aW9uLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS5hbGxvd3NWaXNpdGluZ0xvY2F0aW9uV2l0aEFjdGlvbihsb2NhdGlvbiwgb3B0aW9ucy5hY3Rpb24pKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnZpc2l0UHJvcG9zZWRUb0xvY2F0aW9uKGxvY2F0aW9uLCBvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0VmlzaXQobG9jYXRhYmxlLCByZXN0b3JhdGlvbklkZW50aWZpZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuc3RvcCgpXG4gICAgdGhpcy5jdXJyZW50VmlzaXQgPSBuZXcgVmlzaXQodGhpcywgZXhwYW5kVVJMKGxvY2F0YWJsZSksIHJlc3RvcmF0aW9uSWRlbnRpZmllciwge1xuICAgICAgcmVmZXJyZXI6IHRoaXMubG9jYXRpb24sXG4gICAgICAuLi5vcHRpb25zXG4gICAgfSlcbiAgICB0aGlzLmN1cnJlbnRWaXNpdC5zdGFydCgpXG4gIH1cblxuICBzdWJtaXRGb3JtKGZvcm0sIHN1Ym1pdHRlcikge1xuICAgIHRoaXMuc3RvcCgpXG4gICAgdGhpcy5mb3JtU3VibWlzc2lvbiA9IG5ldyBGb3JtU3VibWlzc2lvbih0aGlzLCBmb3JtLCBzdWJtaXR0ZXIsIHRydWUpXG5cbiAgICB0aGlzLmZvcm1TdWJtaXNzaW9uLnN0YXJ0KClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuZm9ybVN1Ym1pc3Npb24pIHtcbiAgICAgIHRoaXMuZm9ybVN1Ym1pc3Npb24uc3RvcCgpXG4gICAgICBkZWxldGUgdGhpcy5mb3JtU3VibWlzc2lvblxuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnJlbnRWaXNpdCkge1xuICAgICAgdGhpcy5jdXJyZW50VmlzaXQuY2FuY2VsKClcbiAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnRWaXNpdFxuICAgIH1cbiAgfVxuXG4gIGdldCBhZGFwdGVyKCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmFkYXB0ZXJcbiAgfVxuXG4gIGdldCB2aWV3KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnZpZXdcbiAgfVxuXG4gIGdldCByb290TG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5zbmFwc2hvdC5yb290TG9jYXRpb25cbiAgfVxuXG4gIGdldCBoaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmhpc3RvcnlcbiAgfVxuXG4gIC8vIEZvcm0gc3VibWlzc2lvbiBkZWxlZ2F0ZVxuXG4gIGZvcm1TdWJtaXNzaW9uU3RhcnRlZChmb3JtU3VibWlzc2lvbikge1xuICAgIC8vIE5vdCBhbGwgYWRhcHRlcnMgaW1wbGVtZW50IGZvcm1TdWJtaXNzaW9uU3RhcnRlZFxuICAgIGlmICh0eXBlb2YgdGhpcy5hZGFwdGVyLmZvcm1TdWJtaXNzaW9uU3RhcnRlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLmFkYXB0ZXIuZm9ybVN1Ym1pc3Npb25TdGFydGVkKGZvcm1TdWJtaXNzaW9uKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZvcm1TdWJtaXNzaW9uU3VjY2VlZGVkV2l0aFJlc3BvbnNlKGZvcm1TdWJtaXNzaW9uLCBmZXRjaFJlc3BvbnNlKSB7XG4gICAgaWYgKGZvcm1TdWJtaXNzaW9uID09IHRoaXMuZm9ybVN1Ym1pc3Npb24pIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlSFRNTCA9IGF3YWl0IGZldGNoUmVzcG9uc2UucmVzcG9uc2VIVE1MXG4gICAgICBpZiAocmVzcG9uc2VIVE1MKSB7XG4gICAgICAgIGNvbnN0IHNob3VsZENhY2hlU25hcHNob3QgPSBmb3JtU3VibWlzc2lvbi5pc1NhZmVcbiAgICAgICAgaWYgKCFzaG91bGRDYWNoZVNuYXBzaG90KSB7XG4gICAgICAgICAgdGhpcy52aWV3LmNsZWFyU25hcHNob3RDYWNoZSgpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUsIHJlZGlyZWN0ZWQgfSA9IGZldGNoUmVzcG9uc2VcbiAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy4jZ2V0QWN0aW9uRm9yRm9ybVN1Ym1pc3Npb24oZm9ybVN1Ym1pc3Npb24sIGZldGNoUmVzcG9uc2UpXG4gICAgICAgIGNvbnN0IHZpc2l0T3B0aW9ucyA9IHtcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgc2hvdWxkQ2FjaGVTbmFwc2hvdCxcbiAgICAgICAgICByZXNwb25zZTogeyBzdGF0dXNDb2RlLCByZXNwb25zZUhUTUwsIHJlZGlyZWN0ZWQgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcG9zZVZpc2l0KGZldGNoUmVzcG9uc2UubG9jYXRpb24sIHZpc2l0T3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBmb3JtU3VibWlzc2lvbkZhaWxlZFdpdGhSZXNwb25zZShmb3JtU3VibWlzc2lvbiwgZmV0Y2hSZXNwb25zZSkge1xuICAgIGNvbnN0IHJlc3BvbnNlSFRNTCA9IGF3YWl0IGZldGNoUmVzcG9uc2UucmVzcG9uc2VIVE1MXG5cbiAgICBpZiAocmVzcG9uc2VIVE1MKSB7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IFBhZ2VTbmFwc2hvdC5mcm9tSFRNTFN0cmluZyhyZXNwb25zZUhUTUwpXG4gICAgICBpZiAoZmV0Y2hSZXNwb25zZS5zZXJ2ZXJFcnJvcikge1xuICAgICAgICBhd2FpdCB0aGlzLnZpZXcucmVuZGVyRXJyb3Ioc25hcHNob3QsIHRoaXMuY3VycmVudFZpc2l0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy52aWV3LnJlbmRlclBhZ2Uoc25hcHNob3QsIGZhbHNlLCB0cnVlLCB0aGlzLmN1cnJlbnRWaXNpdClcbiAgICAgIH1cbiAgICAgIGlmKCFzbmFwc2hvdC5zaG91bGRQcmVzZXJ2ZVNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMudmlldy5zY3JvbGxUb1RvcCgpXG4gICAgICB9XG4gICAgICB0aGlzLnZpZXcuY2xlYXJTbmFwc2hvdENhY2hlKClcbiAgICB9XG4gIH1cblxuICBmb3JtU3VibWlzc2lvbkVycm9yZWQoZm9ybVN1Ym1pc3Npb24sIGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxuXG4gIGZvcm1TdWJtaXNzaW9uRmluaXNoZWQoZm9ybVN1Ym1pc3Npb24pIHtcbiAgICAvLyBOb3QgYWxsIGFkYXB0ZXJzIGltcGxlbWVudCBmb3JtU3VibWlzc2lvbkZpbmlzaGVkXG4gICAgaWYgKHR5cGVvZiB0aGlzLmFkYXB0ZXIuZm9ybVN1Ym1pc3Npb25GaW5pc2hlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLmFkYXB0ZXIuZm9ybVN1Ym1pc3Npb25GaW5pc2hlZChmb3JtU3VibWlzc2lvbilcbiAgICB9XG4gIH1cblxuICAvLyBWaXNpdCBkZWxlZ2F0ZVxuXG4gIHZpc2l0U3RhcnRlZCh2aXNpdCkge1xuICAgIHRoaXMuZGVsZWdhdGUudmlzaXRTdGFydGVkKHZpc2l0KVxuICB9XG5cbiAgdmlzaXRDb21wbGV0ZWQodmlzaXQpIHtcbiAgICB0aGlzLmRlbGVnYXRlLnZpc2l0Q29tcGxldGVkKHZpc2l0KVxuICB9XG5cbiAgbG9jYXRpb25XaXRoQWN0aW9uSXNTYW1lUGFnZShsb2NhdGlvbiwgYWN0aW9uKSB7XG4gICAgY29uc3QgYW5jaG9yID0gZ2V0QW5jaG9yKGxvY2F0aW9uKVxuICAgIGNvbnN0IGN1cnJlbnRBbmNob3IgPSBnZXRBbmNob3IodGhpcy52aWV3Lmxhc3RSZW5kZXJlZExvY2F0aW9uKVxuICAgIGNvbnN0IGlzUmVzdG9yYXRpb25Ub1RvcCA9IGFjdGlvbiA9PT0gXCJyZXN0b3JlXCIgJiYgdHlwZW9mIGFuY2hvciA9PT0gXCJ1bmRlZmluZWRcIlxuXG4gICAgcmV0dXJuIChcbiAgICAgIGFjdGlvbiAhPT0gXCJyZXBsYWNlXCIgJiZcbiAgICAgIGdldFJlcXVlc3RVUkwobG9jYXRpb24pID09PSBnZXRSZXF1ZXN0VVJMKHRoaXMudmlldy5sYXN0UmVuZGVyZWRMb2NhdGlvbikgJiZcbiAgICAgIChpc1Jlc3RvcmF0aW9uVG9Ub3AgfHwgKGFuY2hvciAhPSBudWxsICYmIGFuY2hvciAhPT0gY3VycmVudEFuY2hvcikpXG4gICAgKVxuICB9XG5cbiAgdmlzaXRTY3JvbGxlZFRvU2FtZVBhZ2VMb2NhdGlvbihvbGRVUkwsIG5ld1VSTCkge1xuICAgIHRoaXMuZGVsZWdhdGUudmlzaXRTY3JvbGxlZFRvU2FtZVBhZ2VMb2NhdGlvbihvbGRVUkwsIG5ld1VSTClcbiAgfVxuXG4gIC8vIFZpc2l0c1xuXG4gIGdldCBsb2NhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5LmxvY2F0aW9uXG4gIH1cblxuICBnZXQgcmVzdG9yYXRpb25JZGVudGlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnkucmVzdG9yYXRpb25JZGVudGlmaWVyXG4gIH1cblxuICAjZ2V0QWN0aW9uRm9yRm9ybVN1Ym1pc3Npb24oZm9ybVN1Ym1pc3Npb24sIGZldGNoUmVzcG9uc2UpIHtcbiAgICBjb25zdCB7IHN1Ym1pdHRlciwgZm9ybUVsZW1lbnQgfSA9IGZvcm1TdWJtaXNzaW9uXG4gICAgcmV0dXJuIGdldFZpc2l0QWN0aW9uKHN1Ym1pdHRlciwgZm9ybUVsZW1lbnQpIHx8IHRoaXMuI2dldERlZmF1bHRBY3Rpb24oZmV0Y2hSZXNwb25zZSlcbiAgfVxuXG4gICNnZXREZWZhdWx0QWN0aW9uKGZldGNoUmVzcG9uc2UpIHtcbiAgICBjb25zdCBzYW1lTG9jYXRpb25SZWRpcmVjdCA9IGZldGNoUmVzcG9uc2UucmVkaXJlY3RlZCAmJiBmZXRjaFJlc3BvbnNlLmxvY2F0aW9uLmhyZWYgPT09IHRoaXMubG9jYXRpb24/LmhyZWZcbiAgICByZXR1cm4gc2FtZUxvY2F0aW9uUmVkaXJlY3QgPyBcInJlcGxhY2VcIiA6IFwiYWR2YW5jZVwiXG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgUGFnZVN0YWdlID0ge1xuICBpbml0aWFsOiAwLFxuICBsb2FkaW5nOiAxLFxuICBpbnRlcmFjdGl2ZTogMixcbiAgY29tcGxldGU6IDNcbn1cblxuZXhwb3J0IGNsYXNzIFBhZ2VPYnNlcnZlciB7XG4gIHN0YWdlID0gUGFnZVN0YWdlLmluaXRpYWxcbiAgc3RhcnRlZCA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICBpZiAodGhpcy5zdGFnZSA9PSBQYWdlU3RhZ2UuaW5pdGlhbCkge1xuICAgICAgICB0aGlzLnN0YWdlID0gUGFnZVN0YWdlLmxvYWRpbmdcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHRoaXMuaW50ZXJwcmV0UmVhZHlTdGF0ZSwgZmFsc2UpXG4gICAgICBhZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgdGhpcy5wYWdlV2lsbFVubG9hZCwgZmFsc2UpXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCB0aGlzLmludGVycHJldFJlYWR5U3RhdGUsIGZhbHNlKVxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIHRoaXMucGFnZVdpbGxVbmxvYWQsIGZhbHNlKVxuICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpbnRlcnByZXRSZWFkeVN0YXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSB9ID0gdGhpc1xuICAgIGlmIChyZWFkeVN0YXRlID09IFwiaW50ZXJhY3RpdmVcIikge1xuICAgICAgdGhpcy5wYWdlSXNJbnRlcmFjdGl2ZSgpXG4gICAgfSBlbHNlIGlmIChyZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xuICAgICAgdGhpcy5wYWdlSXNDb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgcGFnZUlzSW50ZXJhY3RpdmUoKSB7XG4gICAgaWYgKHRoaXMuc3RhZ2UgPT0gUGFnZVN0YWdlLmxvYWRpbmcpIHtcbiAgICAgIHRoaXMuc3RhZ2UgPSBQYWdlU3RhZ2UuaW50ZXJhY3RpdmVcbiAgICAgIHRoaXMuZGVsZWdhdGUucGFnZUJlY2FtZUludGVyYWN0aXZlKClcbiAgICB9XG4gIH1cblxuICBwYWdlSXNDb21wbGV0ZSgpIHtcbiAgICB0aGlzLnBhZ2VJc0ludGVyYWN0aXZlKClcbiAgICBpZiAodGhpcy5zdGFnZSA9PSBQYWdlU3RhZ2UuaW50ZXJhY3RpdmUpIHtcbiAgICAgIHRoaXMuc3RhZ2UgPSBQYWdlU3RhZ2UuY29tcGxldGVcbiAgICAgIHRoaXMuZGVsZWdhdGUucGFnZUxvYWRlZCgpXG4gICAgfVxuICB9XG5cbiAgcGFnZVdpbGxVbmxvYWQgPSAoKSA9PiB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5wYWdlV2lsbFVubG9hZCgpXG4gIH1cblxuICBnZXQgcmVhZHlTdGF0ZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucmVhZHlTdGF0ZVxuICB9XG59XG4iLCAiZXhwb3J0IGNsYXNzIFNjcm9sbE9ic2VydmVyIHtcbiAgc3RhcnRlZCA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIGZhbHNlKVxuICAgICAgdGhpcy5vblNjcm9sbCgpXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwsIGZhbHNlKVxuICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHsgeDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfSlcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICB1cGRhdGVQb3NpdGlvbihwb3NpdGlvbikge1xuICAgIHRoaXMuZGVsZWdhdGUuc2Nyb2xsUG9zaXRpb25DaGFuZ2VkKHBvc2l0aW9uKVxuICB9XG59XG4iLCAiaW1wb3J0IHsgQmFyZG8gfSBmcm9tIFwiLi4vYmFyZG9cIlxuaW1wb3J0IHsgZ2V0UGVybWFuZW50RWxlbWVudEJ5SWQsIHF1ZXJ5UGVybWFuZW50RWxlbWVudHNBbGwgfSBmcm9tIFwiLi4vc25hcHNob3RcIlxuaW1wb3J0IHsgYXJvdW5kLCBlbGVtZW50SXNGb2N1c2FibGUsIG5leHRSZXBhaW50LCBxdWVyeUF1dG9mb2N1c2FibGVFbGVtZW50LCB1dWlkIH0gZnJvbSBcIi4uLy4uL3V0aWxcIlxuXG5leHBvcnQgY2xhc3MgU3RyZWFtTWVzc2FnZVJlbmRlcmVyIHtcbiAgcmVuZGVyKHsgZnJhZ21lbnQgfSkge1xuICAgIEJhcmRvLnByZXNlcnZpbmdQZXJtYW5lbnRFbGVtZW50cyh0aGlzLCBnZXRQZXJtYW5lbnRFbGVtZW50TWFwRm9yRnJhZ21lbnQoZnJhZ21lbnQpLCAoKSA9PiB7XG4gICAgICB3aXRoQXV0b2ZvY3VzRnJvbUZyYWdtZW50KGZyYWdtZW50LCAoKSA9PiB7XG4gICAgICAgIHdpdGhQcmVzZXJ2ZWRGb2N1cygoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gQmFyZG8gZGVsZWdhdGVcblxuICBlbnRlcmluZ0JhcmRvKGN1cnJlbnRQZXJtYW5lbnRFbGVtZW50LCBuZXdQZXJtYW5lbnRFbGVtZW50KSB7XG4gICAgbmV3UGVybWFuZW50RWxlbWVudC5yZXBsYWNlV2l0aChjdXJyZW50UGVybWFuZW50RWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkpXG4gIH1cblxuICBsZWF2aW5nQmFyZG8oKSB7fVxufVxuXG5mdW5jdGlvbiBnZXRQZXJtYW5lbnRFbGVtZW50TWFwRm9yRnJhZ21lbnQoZnJhZ21lbnQpIHtcbiAgY29uc3QgcGVybWFuZW50RWxlbWVudHNJbkRvY3VtZW50ID0gcXVlcnlQZXJtYW5lbnRFbGVtZW50c0FsbChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gIGNvbnN0IHBlcm1hbmVudEVsZW1lbnRNYXAgPSB7fVxuICBmb3IgKGNvbnN0IHBlcm1hbmVudEVsZW1lbnRJbkRvY3VtZW50IG9mIHBlcm1hbmVudEVsZW1lbnRzSW5Eb2N1bWVudCkge1xuICAgIGNvbnN0IHsgaWQgfSA9IHBlcm1hbmVudEVsZW1lbnRJbkRvY3VtZW50XG5cbiAgICBmb3IgKGNvbnN0IHN0cmVhbUVsZW1lbnQgb2YgZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbChcInR1cmJvLXN0cmVhbVwiKSkge1xuICAgICAgY29uc3QgZWxlbWVudEluU3RyZWFtID0gZ2V0UGVybWFuZW50RWxlbWVudEJ5SWQoc3RyZWFtRWxlbWVudC50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCwgaWQpXG5cbiAgICAgIGlmIChlbGVtZW50SW5TdHJlYW0pIHtcbiAgICAgICAgcGVybWFuZW50RWxlbWVudE1hcFtpZF0gPSBbcGVybWFuZW50RWxlbWVudEluRG9jdW1lbnQsIGVsZW1lbnRJblN0cmVhbV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGVybWFuZW50RWxlbWVudE1hcFxufVxuXG5hc3luYyBmdW5jdGlvbiB3aXRoQXV0b2ZvY3VzRnJvbUZyYWdtZW50KGZyYWdtZW50LCBjYWxsYmFjaykge1xuICBjb25zdCBnZW5lcmF0ZWRJRCA9IGB0dXJiby1zdHJlYW0tYXV0b2ZvY3VzLSR7dXVpZCgpfWBcbiAgY29uc3QgdHVyYm9TdHJlYW1zID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbChcInR1cmJvLXN0cmVhbVwiKVxuICBjb25zdCBlbGVtZW50V2l0aEF1dG9mb2N1cyA9IGZpcnN0QXV0b2ZvY3VzYWJsZUVsZW1lbnRJblN0cmVhbXModHVyYm9TdHJlYW1zKVxuICBsZXQgd2lsbEF1dG9mb2N1c0lkID0gbnVsbFxuXG4gIGlmIChlbGVtZW50V2l0aEF1dG9mb2N1cykge1xuICAgIGlmIChlbGVtZW50V2l0aEF1dG9mb2N1cy5pZCkge1xuICAgICAgd2lsbEF1dG9mb2N1c0lkID0gZWxlbWVudFdpdGhBdXRvZm9jdXMuaWRcbiAgICB9IGVsc2Uge1xuICAgICAgd2lsbEF1dG9mb2N1c0lkID0gZ2VuZXJhdGVkSURcbiAgICB9XG5cbiAgICBlbGVtZW50V2l0aEF1dG9mb2N1cy5pZCA9IHdpbGxBdXRvZm9jdXNJZFxuICB9XG5cbiAgY2FsbGJhY2soKVxuICBhd2FpdCBuZXh0UmVwYWludCgpXG5cbiAgY29uc3QgaGFzTm9BY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PSBudWxsIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT0gZG9jdW1lbnQuYm9keVxuXG4gIGlmIChoYXNOb0FjdGl2ZUVsZW1lbnQgJiYgd2lsbEF1dG9mb2N1c0lkKSB7XG4gICAgY29uc3QgZWxlbWVudFRvQXV0b2ZvY3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQod2lsbEF1dG9mb2N1c0lkKVxuXG4gICAgaWYgKGVsZW1lbnRJc0ZvY3VzYWJsZShlbGVtZW50VG9BdXRvZm9jdXMpKSB7XG4gICAgICBlbGVtZW50VG9BdXRvZm9jdXMuZm9jdXMoKVxuICAgIH1cbiAgICBpZiAoZWxlbWVudFRvQXV0b2ZvY3VzICYmIGVsZW1lbnRUb0F1dG9mb2N1cy5pZCA9PSBnZW5lcmF0ZWRJRCkge1xuICAgICAgZWxlbWVudFRvQXV0b2ZvY3VzLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpXG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdpdGhQcmVzZXJ2ZWRGb2N1cyhjYWxsYmFjaykge1xuICBjb25zdCBbYWN0aXZlRWxlbWVudEJlZm9yZVJlbmRlciwgYWN0aXZlRWxlbWVudEFmdGVyUmVuZGVyXSA9IGF3YWl0IGFyb3VuZChjYWxsYmFjaywgKCkgPT4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcblxuICBjb25zdCByZXN0b3JlRm9jdXNUbyA9IGFjdGl2ZUVsZW1lbnRCZWZvcmVSZW5kZXIgJiYgYWN0aXZlRWxlbWVudEJlZm9yZVJlbmRlci5pZFxuXG4gIGlmIChyZXN0b3JlRm9jdXNUbykge1xuICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocmVzdG9yZUZvY3VzVG8pXG5cbiAgICBpZiAoZWxlbWVudElzRm9jdXNhYmxlKGVsZW1lbnRUb0ZvY3VzKSAmJiBlbGVtZW50VG9Gb2N1cyAhPSBhY3RpdmVFbGVtZW50QWZ0ZXJSZW5kZXIpIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmlyc3RBdXRvZm9jdXNhYmxlRWxlbWVudEluU3RyZWFtcyhub2RlTGlzdE9mU3RyZWFtRWxlbWVudHMpIHtcbiAgZm9yIChjb25zdCBzdHJlYW1FbGVtZW50IG9mIG5vZGVMaXN0T2ZTdHJlYW1FbGVtZW50cykge1xuICAgIGNvbnN0IGVsZW1lbnRXaXRoQXV0b2ZvY3VzID0gcXVlcnlBdXRvZm9jdXNhYmxlRWxlbWVudChzdHJlYW1FbGVtZW50LnRlbXBsYXRlRWxlbWVudC5jb250ZW50KVxuXG4gICAgaWYgKGVsZW1lbnRXaXRoQXV0b2ZvY3VzKSByZXR1cm4gZWxlbWVudFdpdGhBdXRvZm9jdXNcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG4iLCAiaW1wb3J0IHsgRmV0Y2hSZXNwb25zZSB9IGZyb20gXCIuLi9odHRwL2ZldGNoX3Jlc3BvbnNlXCJcbmltcG9ydCB7IFN0cmVhbU1lc3NhZ2UgfSBmcm9tIFwiLi4vY29yZS9zdHJlYW1zL3N0cmVhbV9tZXNzYWdlXCJcblxuZXhwb3J0IGNsYXNzIFN0cmVhbU9ic2VydmVyIHtcbiAgc291cmNlcyA9IG5ldyBTZXQoKVxuICAjc3RhcnRlZCA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGVcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy4jc3RhcnRlZCkge1xuICAgICAgdGhpcy4jc3RhcnRlZCA9IHRydWVcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJibzpiZWZvcmUtZmV0Y2gtcmVzcG9uc2VcIiwgdGhpcy5pbnNwZWN0RmV0Y2hSZXNwb25zZSwgZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy4jc3RhcnRlZCkge1xuICAgICAgdGhpcy4jc3RhcnRlZCA9IGZhbHNlXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwidHVyYm86YmVmb3JlLWZldGNoLXJlc3BvbnNlXCIsIHRoaXMuaW5zcGVjdEZldGNoUmVzcG9uc2UsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RTdHJlYW1Tb3VyY2Uoc291cmNlKSB7XG4gICAgaWYgKCF0aGlzLnN0cmVhbVNvdXJjZUlzQ29ubmVjdGVkKHNvdXJjZSkpIHtcbiAgICAgIHRoaXMuc291cmNlcy5hZGQoc291cmNlKVxuICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMucmVjZWl2ZU1lc3NhZ2VFdmVudCwgZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdFN0cmVhbVNvdXJjZShzb3VyY2UpIHtcbiAgICBpZiAodGhpcy5zdHJlYW1Tb3VyY2VJc0Nvbm5lY3RlZChzb3VyY2UpKSB7XG4gICAgICB0aGlzLnNvdXJjZXMuZGVsZXRlKHNvdXJjZSlcbiAgICAgIHNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLnJlY2VpdmVNZXNzYWdlRXZlbnQsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIHN0cmVhbVNvdXJjZUlzQ29ubmVjdGVkKHNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXMuaGFzKHNvdXJjZSlcbiAgfVxuXG4gIGluc3BlY3RGZXRjaFJlc3BvbnNlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBmZXRjaFJlc3BvbnNlRnJvbUV2ZW50KGV2ZW50KVxuICAgIGlmIChyZXNwb25zZSAmJiBmZXRjaFJlc3BvbnNlSXNTdHJlYW0ocmVzcG9uc2UpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLnJlY2VpdmVNZXNzYWdlUmVzcG9uc2UocmVzcG9uc2UpXG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZU1lc3NhZ2VFdmVudCA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLiNzdGFydGVkICYmIHR5cGVvZiBldmVudC5kYXRhID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2VIVE1MKGV2ZW50LmRhdGEpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVjZWl2ZU1lc3NhZ2VSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGNvbnN0IGh0bWwgPSBhd2FpdCByZXNwb25zZS5yZXNwb25zZUhUTUxcbiAgICBpZiAoaHRtbCkge1xuICAgICAgdGhpcy5yZWNlaXZlTWVzc2FnZUhUTUwoaHRtbClcbiAgICB9XG4gIH1cblxuICByZWNlaXZlTWVzc2FnZUhUTUwoaHRtbCkge1xuICAgIHRoaXMuZGVsZWdhdGUucmVjZWl2ZWRNZXNzYWdlRnJvbVN0cmVhbShTdHJlYW1NZXNzYWdlLndyYXAoaHRtbCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hSZXNwb25zZUZyb21FdmVudChldmVudCkge1xuICBjb25zdCBmZXRjaFJlc3BvbnNlID0gZXZlbnQuZGV0YWlsPy5mZXRjaFJlc3BvbnNlXG4gIGlmIChmZXRjaFJlc3BvbnNlIGluc3RhbmNlb2YgRmV0Y2hSZXNwb25zZSkge1xuICAgIHJldHVybiBmZXRjaFJlc3BvbnNlXG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hSZXNwb25zZUlzU3RyZWFtKHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuY29udGVudFR5cGUgPz8gXCJcIlxuICByZXR1cm4gY29udGVudFR5cGUuc3RhcnRzV2l0aChTdHJlYW1NZXNzYWdlLmNvbnRlbnRUeXBlKVxufVxuIiwgImltcG9ydCB7IGFjdGl2YXRlU2NyaXB0RWxlbWVudCB9IGZyb20gXCIuLi8uLi91dGlsXCJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uL3JlbmRlcmVyXCJcblxuZXhwb3J0IGNsYXNzIEVycm9yUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIHN0YXRpYyByZW5kZXJFbGVtZW50KGN1cnJlbnRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgY29uc3QgeyBkb2N1bWVudEVsZW1lbnQsIGJvZHkgfSA9IGRvY3VtZW50XG5cbiAgICBkb2N1bWVudEVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIGJvZHkpXG4gIH1cblxuICBhc3luYyByZW5kZXIoKSB7XG4gICAgdGhpcy5yZXBsYWNlSGVhZEFuZEJvZHkoKVxuICAgIHRoaXMuYWN0aXZhdGVTY3JpcHRFbGVtZW50cygpXG4gIH1cblxuICByZXBsYWNlSGVhZEFuZEJvZHkoKSB7XG4gICAgY29uc3QgeyBkb2N1bWVudEVsZW1lbnQsIGhlYWQgfSA9IGRvY3VtZW50XG4gICAgZG9jdW1lbnRFbGVtZW50LnJlcGxhY2VDaGlsZCh0aGlzLm5ld0hlYWQsIGhlYWQpXG4gICAgdGhpcy5yZW5kZXJFbGVtZW50KHRoaXMuY3VycmVudEVsZW1lbnQsIHRoaXMubmV3RWxlbWVudClcbiAgfVxuXG4gIGFjdGl2YXRlU2NyaXB0RWxlbWVudHMoKSB7XG4gICAgZm9yIChjb25zdCByZXBsYWNlYWJsZUVsZW1lbnQgb2YgdGhpcy5zY3JpcHRFbGVtZW50cykge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHJlcGxhY2VhYmxlRWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYWN0aXZhdGVTY3JpcHRFbGVtZW50KHJlcGxhY2VhYmxlRWxlbWVudClcbiAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZWxlbWVudCwgcmVwbGFjZWFibGVFbGVtZW50KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBuZXdIZWFkKCkge1xuICAgIHJldHVybiB0aGlzLm5ld1NuYXBzaG90LmhlYWRTbmFwc2hvdC5lbGVtZW50XG4gIH1cblxuICBnZXQgc2NyaXB0RWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpXG4gIH1cbn1cbiIsICIvLyBiYXNlIElJRkUgdG8gZGVmaW5lIGlkaW9tb3JwaFxudmFyIElkaW9tb3JwaCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vIEFORCBOT1cgSVQgQkVHSU5TLi4uXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgbGV0IEVNUFRZX1NFVCA9IG5ldyBTZXQoKTtcblxuICAgICAgICAvLyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gdmFsdWVzLCB1cGRhdGFibGUgYnkgdXNlcnMgbm93XG4gICAgICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG1vcnBoU3R5bGU6IFwib3V0ZXJIVE1MXCIsXG4gICAgICAgICAgICBjYWxsYmFja3MgOiB7XG4gICAgICAgICAgICAgICAgYmVmb3JlTm9kZUFkZGVkOiBub09wLFxuICAgICAgICAgICAgICAgIGFmdGVyTm9kZUFkZGVkOiBub09wLFxuICAgICAgICAgICAgICAgIGJlZm9yZU5vZGVNb3JwaGVkOiBub09wLFxuICAgICAgICAgICAgICAgIGFmdGVyTm9kZU1vcnBoZWQ6IG5vT3AsXG4gICAgICAgICAgICAgICAgYmVmb3JlTm9kZVJlbW92ZWQ6IG5vT3AsXG4gICAgICAgICAgICAgICAgYWZ0ZXJOb2RlUmVtb3ZlZDogbm9PcCxcbiAgICAgICAgICAgICAgICBiZWZvcmVBdHRyaWJ1dGVVcGRhdGVkOiBub09wLFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZDoge1xuICAgICAgICAgICAgICAgIHN0eWxlOiAnbWVyZ2UnLFxuICAgICAgICAgICAgICAgIHNob3VsZFByZXNlcnZlOiBmdW5jdGlvbiAoZWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbHQuZ2V0QXR0cmlidXRlKFwiaW0tcHJlc2VydmVcIikgPT09IFwidHJ1ZVwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVBcHBlbmQ6IGZ1bmN0aW9uIChlbHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsdC5nZXRBdHRyaWJ1dGUoXCJpbS1yZS1hcHBlbmRcIikgPT09IFwidHJ1ZVwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVtb3ZlOiBub09wLFxuICAgICAgICAgICAgICAgIGFmdGVySGVhZE1vcnBoZWQ6IG5vT3AsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyBDb3JlIE1vcnBoaW5nIEFsZ29yaXRobSAtIG1vcnBoLCBtb3JwaE5vcm1hbGl6ZWRDb250ZW50LCBtb3JwaE9sZE5vZGVUbywgbW9ycGhDaGlsZHJlblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoKG9sZE5vZGUsIG5ld0NvbnRlbnQsIGNvbmZpZyA9IHt9KSB7XG5cbiAgICAgICAgICAgIGlmIChvbGROb2RlIGluc3RhbmNlb2YgRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICBvbGROb2RlID0gb2xkTm9kZS5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBuZXdDb250ZW50ID0gcGFyc2VDb250ZW50KG5ld0NvbnRlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbm9ybWFsaXplZENvbnRlbnQgPSBub3JtYWxpemVDb250ZW50KG5ld0NvbnRlbnQpO1xuXG4gICAgICAgICAgICBsZXQgY3R4ID0gY3JlYXRlTW9ycGhDb250ZXh0KG9sZE5vZGUsIG5vcm1hbGl6ZWRDb250ZW50LCBjb25maWcpO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9ycGhOb3JtYWxpemVkQ29udGVudChvbGROb2RlLCBub3JtYWxpemVkQ29udGVudCwgY3R4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoTm9ybWFsaXplZENvbnRlbnQob2xkTm9kZSwgbm9ybWFsaXplZE5ld0NvbnRlbnQsIGN0eCkge1xuICAgICAgICAgICAgaWYgKGN0eC5oZWFkLmJsb2NrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9sZEhlYWQgPSBvbGROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3SGVhZCA9IG5vcm1hbGl6ZWROZXdDb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICAgICAgICAgICAgICBpZiAob2xkSGVhZCAmJiBuZXdIZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlcyA9IGhhbmRsZUhlYWRFbGVtZW50KG5ld0hlYWQsIG9sZEhlYWQsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gaGVhZCBwcm9taXNlcyByZXNvbHZlLCBjYWxsIG1vcnBoIGFnYWluLCBpZ25vcmluZyB0aGUgaGVhZCB0YWdcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhOb3JtYWxpemVkQ29udGVudChvbGROb2RlLCBub3JtYWxpemVkTmV3Q29udGVudCwgT2JqZWN0LmFzc2lnbihjdHgsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN0eC5tb3JwaFN0eWxlID09PSBcImlubmVySFRNTFwiKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBpbm5lckhUTUwsIHNvIHdlIGFyZSBvbmx5IHVwZGF0aW5nIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgICAgIG1vcnBoQ2hpbGRyZW4obm9ybWFsaXplZE5ld0NvbnRlbnQsIG9sZE5vZGUsIGN0eCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZE5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3R4Lm1vcnBoU3R5bGUgPT09IFwib3V0ZXJIVE1MXCIgfHwgY3R4Lm1vcnBoU3R5bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBmaW5kIHRoZSBiZXN0IGVsZW1lbnQgbWF0Y2ggaW4gdGhlIG5ldyBjb250ZW50LCBtb3JwaCB0aGF0LCBhbmQgbWVyZ2UgaXRzIHNpYmxpbmdzXG4gICAgICAgICAgICAgICAgLy8gaW50byBlaXRoZXIgc2lkZSBvZiB0aGUgYmVzdCBtYXRjaFxuICAgICAgICAgICAgICAgIGxldCBiZXN0TWF0Y2ggPSBmaW5kQmVzdE5vZGVNYXRjaChub3JtYWxpemVkTmV3Q29udGVudCwgb2xkTm9kZSwgY3R4KTtcblxuICAgICAgICAgICAgICAgIC8vIHN0YXNoIHRoZSBzaWJsaW5ncyB0aGF0IHdpbGwgbmVlZCB0byBiZSBpbnNlcnRlZCBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgYmVzdCBtYXRjaFxuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c1NpYmxpbmcgPSBiZXN0TWF0Y2g/LnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFNpYmxpbmcgPSBiZXN0TWF0Y2g/Lm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgLy8gbW9ycGggaXRcbiAgICAgICAgICAgICAgICBsZXQgbW9ycGhlZE5vZGUgPSBtb3JwaE9sZE5vZGVUbyhvbGROb2RlLCBiZXN0TWF0Y2gsIGN0eCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYmVzdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdhcyBhIGJlc3QgbWF0Y2gsIG1lcmdlIHRoZSBzaWJsaW5ncyBpbiB0b28gYW5kIHJldHVybiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hvbGUgYnVuY2hcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc2VydFNpYmxpbmdzKHByZXZpb3VzU2libGluZywgbW9ycGhlZE5vZGUsIG5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2Ugbm90aGluZyB3YXMgYWRkZWQgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiRG8gbm90IHVuZGVyc3RhbmQgaG93IHRvIG1vcnBoIHN0eWxlIFwiICsgY3R4Lm1vcnBoU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gcG9zc2libGVBY3RpdmVFbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSBjdHhcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBpZ25vcmVWYWx1ZU9mQWN0aXZlRWxlbWVudChwb3NzaWJsZUFjdGl2ZUVsZW1lbnQsIGN0eCkge1xuICAgICAgICAgICAgcmV0dXJuIGN0eC5pZ25vcmVBY3RpdmVWYWx1ZSAmJiBwb3NzaWJsZUFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9sZE5vZGUgcm9vdCBub2RlIHRvIG1lcmdlIGNvbnRlbnQgaW50b1xuICAgICAgICAgKiBAcGFyYW0gbmV3Q29udGVudCBuZXcgY29udGVudCB0byBtZXJnZVxuICAgICAgICAgKiBAcGFyYW0gY3R4IHRoZSBtZXJnZSBjb250ZXh0XG4gICAgICAgICAqIEByZXR1cm5zIHtFbGVtZW50fSB0aGUgZWxlbWVudCB0aGF0IGVuZGVkIHVwIGluIHRoZSBET01cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoT2xkTm9kZVRvKG9sZE5vZGUsIG5ld0NvbnRlbnQsIGN0eCkge1xuICAgICAgICAgICAgaWYgKGN0eC5pZ25vcmVBY3RpdmUgJiYgb2xkTm9kZSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IG1vcnBoIGZvY3VzZWQgZWxlbWVudFxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdDb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmNhbGxiYWNrcy5iZWZvcmVOb2RlUmVtb3ZlZChvbGROb2RlKSA9PT0gZmFsc2UpIHJldHVybiBvbGROb2RlO1xuXG4gICAgICAgICAgICAgICAgb2xkTm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjdHguY2FsbGJhY2tzLmFmdGVyTm9kZVJlbW92ZWQob2xkTm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc1NvZnRNYXRjaChvbGROb2RlLCBuZXdDb250ZW50KSkge1xuICAgICAgICAgICAgICAgIGlmIChjdHguY2FsbGJhY2tzLmJlZm9yZU5vZGVSZW1vdmVkKG9sZE5vZGUpID09PSBmYWxzZSkgcmV0dXJuIG9sZE5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKGN0eC5jYWxsYmFja3MuYmVmb3JlTm9kZUFkZGVkKG5ld0NvbnRlbnQpID09PSBmYWxzZSkgcmV0dXJuIG9sZE5vZGU7XG5cbiAgICAgICAgICAgICAgICBvbGROb2RlLnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0NvbnRlbnQsIG9sZE5vZGUpO1xuICAgICAgICAgICAgICAgIGN0eC5jYWxsYmFja3MuYWZ0ZXJOb2RlQWRkZWQobmV3Q29udGVudCk7XG4gICAgICAgICAgICAgICAgY3R4LmNhbGxiYWNrcy5hZnRlck5vZGVSZW1vdmVkKG9sZE5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdDb250ZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmNhbGxiYWNrcy5iZWZvcmVOb2RlTW9ycGhlZChvbGROb2RlLCBuZXdDb250ZW50KSA9PT0gZmFsc2UpIHJldHVybiBvbGROb2RlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9sZE5vZGUgaW5zdGFuY2VvZiBIVE1MSGVhZEVsZW1lbnQgJiYgY3R4LmhlYWQuaWdub3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSB0aGUgaGVhZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlIGluc3RhbmNlb2YgSFRNTEhlYWRFbGVtZW50ICYmIGN0eC5oZWFkLnN0eWxlICE9PSBcIm1vcnBoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlSGVhZEVsZW1lbnQobmV3Q29udGVudCwgb2xkTm9kZSwgY3R4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzeW5jTm9kZUZyb20obmV3Q29udGVudCwgb2xkTm9kZSwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpZ25vcmVWYWx1ZU9mQWN0aXZlRWxlbWVudChvbGROb2RlLCBjdHgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaENoaWxkcmVuKG5ld0NvbnRlbnQsIG9sZE5vZGUsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LmNhbGxiYWNrcy5hZnRlck5vZGVNb3JwaGVkKG9sZE5vZGUsIG5ld0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgaXMgdGhlIGNvcmUgYWxnb3JpdGhtIGZvciBtYXRjaGluZyB1cCBjaGlsZHJlbi4gIFRoZSBpZGVhIGlzIHRvIHVzZSBpZCBzZXRzIHRvIHRyeSB0byBtYXRjaCB1cFxuICAgICAgICAgKiBub2RlcyBhcyBmYWl0aGZ1bGx5IGFzIHBvc3NpYmxlLiAgV2UgZ3JlZWRpbHkgbWF0Y2gsIHdoaWNoIGFsbG93cyB1cyB0byBrZWVwIHRoZSBhbGdvcml0aG0gZmFzdCwgYnV0XG4gICAgICAgICAqIGJ5IHVzaW5nIGlkIHNldHMsIHdlIGFyZSBhYmxlIHRvIGJldHRlciBtYXRjaCB1cCB3aXRoIGNvbnRlbnQgZGVlcGVyIGluIHRoZSBET00uXG4gICAgICAgICAqXG4gICAgICAgICAqIEJhc2ljIGFsZ29yaXRobSBpcywgZm9yIGVhY2ggbm9kZSBpbiB0aGUgbmV3IGNvbnRlbnQ6XG4gICAgICAgICAqXG4gICAgICAgICAqIC0gaWYgd2UgaGF2ZSByZWFjaGVkIHRoZSBlbmQgb2YgdGhlIG9sZCBwYXJlbnQsIGFwcGVuZCB0aGUgbmV3IGNvbnRlbnRcbiAgICAgICAgICogLSBpZiB0aGUgbmV3IGNvbnRlbnQgaGFzIGFuIGlkIHNldCBtYXRjaCB3aXRoIHRoZSBjdXJyZW50IGluc2VydGlvbiBwb2ludCwgbW9ycGhcbiAgICAgICAgICogLSBzZWFyY2ggZm9yIGFuIGlkIHNldCBtYXRjaFxuICAgICAgICAgKiAtIGlmIGlkIHNldCBtYXRjaCBmb3VuZCwgbW9ycGhcbiAgICAgICAgICogLSBvdGhlcndpc2Ugc2VhcmNoIGZvciBhIFwic29mdFwiIG1hdGNoXG4gICAgICAgICAqIC0gaWYgYSBzb2Z0IG1hdGNoIGlzIGZvdW5kLCBtb3JwaFxuICAgICAgICAgKiAtIG90aGVyd2lzZSwgcHJlcGVuZCB0aGUgbmV3IG5vZGUgYmVmb3JlIHRoZSBjdXJyZW50IGluc2VydGlvbiBwb2ludFxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgdHdvIHNlYXJjaCBhbGdvcml0aG1zIHRlcm1pbmF0ZSBpZiBjb21wZXRpbmcgbm9kZSBtYXRjaGVzIGFwcGVhciB0byBvdXR3ZWlnaCB3aGF0IGNhbiBiZSBhY2hpZXZlZFxuICAgICAgICAgKiB3aXRoIHRoZSBjdXJyZW50IG5vZGUuICBTZWUgZmluZElkU2V0TWF0Y2goKSBhbmQgZmluZFNvZnRNYXRjaCgpIGZvciBkZXRhaWxzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5ld1BhcmVudCB0aGUgcGFyZW50IGVsZW1lbnQgb2YgdGhlIG5ldyBjb250ZW50XG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudCB9IG9sZFBhcmVudCB0aGUgb2xkIGNvbnRlbnQgdGhhdCB3ZSBhcmUgbWVyZ2luZyB0aGUgbmV3IGNvbnRlbnQgaW50b1xuICAgICAgICAgKiBAcGFyYW0gY3R4IHRoZSBtZXJnZSBjb250ZXh0XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBtb3JwaENoaWxkcmVuKG5ld1BhcmVudCwgb2xkUGFyZW50LCBjdHgpIHtcblxuICAgICAgICAgICAgbGV0IG5leHROZXdDaGlsZCA9IG5ld1BhcmVudC5maXJzdENoaWxkO1xuICAgICAgICAgICAgbGV0IGluc2VydGlvblBvaW50ID0gb2xkUGFyZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICBsZXQgbmV3Q2hpbGQ7XG5cbiAgICAgICAgICAgIC8vIHJ1biB0aHJvdWdoIGFsbCB0aGUgbmV3IGNvbnRlbnRcbiAgICAgICAgICAgIHdoaWxlIChuZXh0TmV3Q2hpbGQpIHtcblxuICAgICAgICAgICAgICAgIG5ld0NoaWxkID0gbmV4dE5ld0NoaWxkO1xuICAgICAgICAgICAgICAgIG5leHROZXdDaGlsZCA9IG5ld0NoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgYXJlIGF0IHRoZSBlbmQgb2YgdGhlIGV4aXRpbmcgcGFyZW50J3MgY2hpbGRyZW4sIGp1c3QgYXBwZW5kXG4gICAgICAgICAgICAgICAgaWYgKGluc2VydGlvblBvaW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jYWxsYmFja3MuYmVmb3JlTm9kZUFkZGVkKG5ld0NoaWxkKSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBvbGRQYXJlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2FsbGJhY2tzLmFmdGVyTm9kZUFkZGVkKG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSWRzRnJvbUNvbnNpZGVyYXRpb24oY3R4LCBuZXdDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IG5vZGUgaGFzIGFuIGlkIHNldCBtYXRjaCB0aGVuIG1vcnBoXG4gICAgICAgICAgICAgICAgaWYgKGlzSWRTZXRNYXRjaChuZXdDaGlsZCwgaW5zZXJ0aW9uUG9pbnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhPbGROb2RlVG8oaW5zZXJ0aW9uUG9pbnQsIG5ld0NoaWxkLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRpb25Qb2ludCA9IGluc2VydGlvblBvaW50Lm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVJZHNGcm9tQ29uc2lkZXJhdGlvbihjdHgsIG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHNlYXJjaCBmb3J3YXJkIGluIHRoZSBleGlzdGluZyBvbGQgY2hpbGRyZW4gZm9yIGFuIGlkIHNldCBtYXRjaFxuICAgICAgICAgICAgICAgIGxldCBpZFNldE1hdGNoID0gZmluZElkU2V0TWF0Y2gobmV3UGFyZW50LCBvbGRQYXJlbnQsIG5ld0NoaWxkLCBpbnNlcnRpb25Qb2ludCwgY3R4KTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGZvdW5kIGEgcG90ZW50aWFsIG1hdGNoLCByZW1vdmUgdGhlIG5vZGVzIHVudGlsIHRoYXQgcG9pbnQgYW5kIG1vcnBoXG4gICAgICAgICAgICAgICAgaWYgKGlkU2V0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0aW9uUG9pbnQgPSByZW1vdmVOb2Rlc0JldHdlZW4oaW5zZXJ0aW9uUG9pbnQsIGlkU2V0TWF0Y2gsIGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIG1vcnBoT2xkTm9kZVRvKGlkU2V0TWF0Y2gsIG5ld0NoaWxkLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVJZHNGcm9tQ29uc2lkZXJhdGlvbihjdHgsIG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbm8gaWQgc2V0IG1hdGNoIGZvdW5kLCBzbyBzY2FuIGZvcndhcmQgZm9yIGEgc29mdCBtYXRjaCBmb3IgdGhlIGN1cnJlbnQgbm9kZVxuICAgICAgICAgICAgICAgIGxldCBzb2Z0TWF0Y2ggPSBmaW5kU29mdE1hdGNoKG5ld1BhcmVudCwgb2xkUGFyZW50LCBuZXdDaGlsZCwgaW5zZXJ0aW9uUG9pbnQsIGN0eCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBmb3VuZCBhIHNvZnQgbWF0Y2ggZm9yIHRoZSBjdXJyZW50IG5vZGUsIG1vcnBoXG4gICAgICAgICAgICAgICAgaWYgKHNvZnRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRpb25Qb2ludCA9IHJlbW92ZU5vZGVzQmV0d2VlbihpbnNlcnRpb25Qb2ludCwgc29mdE1hdGNoLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaE9sZE5vZGVUbyhzb2Z0TWF0Y2gsIG5ld0NoaWxkLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVJZHNGcm9tQ29uc2lkZXJhdGlvbihjdHgsIG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWJhbmRvbiBhbGwgaG9wZSBvZiBtb3JwaGluZywganVzdCBpbnNlcnQgdGhlIG5ldyBjaGlsZCBiZWZvcmUgdGhlIGluc2VydGlvbiBwb2ludFxuICAgICAgICAgICAgICAgIC8vIGFuZCBtb3ZlIG9uXG4gICAgICAgICAgICAgICAgaWYgKGN0eC5jYWxsYmFja3MuYmVmb3JlTm9kZUFkZGVkKG5ld0NoaWxkKSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIGluc2VydGlvblBvaW50KTtcbiAgICAgICAgICAgICAgICBjdHguY2FsbGJhY2tzLmFmdGVyTm9kZUFkZGVkKG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICByZW1vdmVJZHNGcm9tQ29uc2lkZXJhdGlvbihjdHgsIG5ld0NoaWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFueSByZW1haW5pbmcgb2xkIG5vZGVzIHRoYXQgZGlkbid0IG1hdGNoIHVwIHdpdGggbmV3IGNvbnRlbnRcbiAgICAgICAgICAgIHdoaWxlIChpbnNlcnRpb25Qb2ludCAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb2RlID0gaW5zZXJ0aW9uUG9pbnQ7XG4gICAgICAgICAgICAgICAgaW5zZXJ0aW9uUG9pbnQgPSBpbnNlcnRpb25Qb2ludC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICByZW1vdmVOb2RlKHRlbXBOb2RlLCBjdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyBBdHRyaWJ1dGUgU3luY2luZyBDb2RlXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGF0dHIge1N0cmluZ30gdGhlIGF0dHJpYnV0ZSB0byBiZSBtdXRhdGVkXG4gICAgICAgICAqIEBwYXJhbSB0byB7RWxlbWVudH0gdGhlIGVsZW1lbnQgdGhhdCBpcyBnb2luZyB0byBiZSB1cGRhdGVkXG4gICAgICAgICAqIEBwYXJhbSB1cGRhdGVUeXBlIHsoXCJ1cGRhdGVcInxcInJlbW92ZVwiKX1cbiAgICAgICAgICogQHBhcmFtIGN0eCB0aGUgbWVyZ2UgY29udGV4dFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXR0cmlidXRlIHNob3VsZCBiZSBpZ25vcmVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGlnbm9yZUF0dHJpYnV0ZShhdHRyLCB0bywgdXBkYXRlVHlwZSwgY3R4KSB7XG4gICAgICAgICAgICBpZihhdHRyID09PSAndmFsdWUnICYmIGN0eC5pZ25vcmVBY3RpdmVWYWx1ZSAmJiB0byA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3R4LmNhbGxiYWNrcy5iZWZvcmVBdHRyaWJ1dGVVcGRhdGVkKGF0dHIsIHRvLCB1cGRhdGVUeXBlKSA9PT0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogc3luY3MgYSBnaXZlbiBub2RlIHdpdGggYW5vdGhlciBub2RlLCBjb3B5aW5nIG92ZXIgYWxsIGF0dHJpYnV0ZXMgYW5kXG4gICAgICAgICAqIGlubmVyIGVsZW1lbnQgc3RhdGUgZnJvbSB0aGUgJ2Zyb20nIG5vZGUgdG8gdGhlICd0bycgbm9kZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGZyb20gdGhlIGVsZW1lbnQgdG8gY29weSBhdHRyaWJ1dGVzICYgc3RhdGUgZnJvbVxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRvIHRoZSBlbGVtZW50IHRvIGNvcHkgYXR0cmlidXRlcyAmIHN0YXRlIHRvXG4gICAgICAgICAqIEBwYXJhbSBjdHggdGhlIG1lcmdlIGNvbnRleHRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHN5bmNOb2RlRnJvbShmcm9tLCB0bywgY3R4KSB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IGZyb20ubm9kZVR5cGVcblxuICAgICAgICAgICAgLy8gaWYgaXMgYW4gZWxlbWVudCB0eXBlLCBzeW5jIHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlXG4gICAgICAgICAgICAvLyBuZXcgbm9kZSBpbnRvIHRoZSBuZXcgbm9kZVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IDEgLyogZWxlbWVudCB0eXBlICovKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbUF0dHJpYnV0ZXMgPSBmcm9tLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9BdHRyaWJ1dGVzID0gdG8uYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZyb21BdHRyaWJ1dGUgb2YgZnJvbUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlnbm9yZUF0dHJpYnV0ZShmcm9tQXR0cmlidXRlLm5hbWUsIHRvLCAndXBkYXRlJywgY3R4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvLmdldEF0dHJpYnV0ZShmcm9tQXR0cmlidXRlLm5hbWUpICE9PSBmcm9tQXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0by5zZXRBdHRyaWJ1dGUoZnJvbUF0dHJpYnV0ZS5uYW1lLCBmcm9tQXR0cmlidXRlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpdGVyYXRlIGJhY2t3YXJkcyB0byBhdm9pZCBza2lwcGluZyBvdmVyIGl0ZW1zIHdoZW4gYSBkZWxldGUgb2NjdXJzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRvQXR0cmlidXRlcy5sZW5ndGggLSAxOyAwIDw9IGk7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b0F0dHJpYnV0ZSA9IHRvQXR0cmlidXRlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlnbm9yZUF0dHJpYnV0ZSh0b0F0dHJpYnV0ZS5uYW1lLCB0bywgJ3JlbW92ZScsIGN0eCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghZnJvbS5oYXNBdHRyaWJ1dGUodG9BdHRyaWJ1dGUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvLnJlbW92ZUF0dHJpYnV0ZSh0b0F0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc3luYyB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gOCAvKiBjb21tZW50ICovIHx8IHR5cGUgPT09IDMgLyogdGV4dCAqLykge1xuICAgICAgICAgICAgICAgIGlmICh0by5ub2RlVmFsdWUgIT09IGZyb20ubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvLm5vZGVWYWx1ZSA9IGZyb20ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpZ25vcmVWYWx1ZU9mQWN0aXZlRWxlbWVudCh0bywgY3R4KSkge1xuICAgICAgICAgICAgICAgIC8vIHN5bmMgaW5wdXQgdmFsdWVzXG4gICAgICAgICAgICAgICAgc3luY0lucHV0VmFsdWUoZnJvbSwgdG8sIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGZyb20ge0VsZW1lbnR9IGVsZW1lbnQgdG8gc3luYyB0aGUgdmFsdWUgZnJvbVxuICAgICAgICAgKiBAcGFyYW0gdG8ge0VsZW1lbnR9IGVsZW1lbnQgdG8gc3luYyB0aGUgdmFsdWUgdG9cbiAgICAgICAgICogQHBhcmFtIGF0dHJpYnV0ZU5hbWUge1N0cmluZ30gdGhlIGF0dHJpYnV0ZSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSBjdHggdGhlIG1lcmdlIGNvbnRleHRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0cmlidXRlKGZyb20sIHRvLCBhdHRyaWJ1dGVOYW1lLCBjdHgpIHtcbiAgICAgICAgICAgIGlmIChmcm9tW2F0dHJpYnV0ZU5hbWVdICE9PSB0b1thdHRyaWJ1dGVOYW1lXSkge1xuICAgICAgICAgICAgICAgIGxldCBpZ25vcmVVcGRhdGUgPSBpZ25vcmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgdG8sICd1cGRhdGUnLCBjdHgpO1xuICAgICAgICAgICAgICAgIGlmICghaWdub3JlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW2F0dHJpYnV0ZU5hbWVdID0gZnJvbVthdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZyb21bYXR0cmlidXRlTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpZ25vcmVVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBmcm9tW2F0dHJpYnV0ZU5hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaWdub3JlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHRvLCAncmVtb3ZlJywgY3R4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG8ucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE5COiBtYW55IGJvdGhhbnMgZGllZCB0byBicmluZyB1cyBpbmZvcm1hdGlvbjpcbiAgICAgICAgICpcbiAgICAgICAgICogIGh0dHBzOi8vZ2l0aHViLmNvbS9wYXRyaWNrLXN0ZWVsZS1pZGVtL21vcnBoZG9tL2Jsb2IvbWFzdGVyL3NyYy9zcGVjaWFsRWxIYW5kbGVycy5qc1xuICAgICAgICAgKiAgaHR0cHM6Ly9naXRodWIuY29tL2Nob29qcy9uYW5vbW9ycGgvYmxvYi9tYXN0ZXIvbGliL21vcnBoLmpzTDExM1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZnJvbSB7RWxlbWVudH0gdGhlIGVsZW1lbnQgdG8gc3luYyB0aGUgaW5wdXQgdmFsdWUgZnJvbVxuICAgICAgICAgKiBAcGFyYW0gdG8ge0VsZW1lbnR9IHRoZSBlbGVtZW50IHRvIHN5bmMgdGhlIGlucHV0IHZhbHVlIHRvXG4gICAgICAgICAqIEBwYXJhbSBjdHggdGhlIG1lcmdlIGNvbnRleHRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHN5bmNJbnB1dFZhbHVlKGZyb20sIHRvLCBjdHgpIHtcbiAgICAgICAgICAgIGlmIChmcm9tIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIHRvIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIGZyb20udHlwZSAhPT0gJ2ZpbGUnKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZnJvbVZhbHVlID0gZnJvbS52YWx1ZTtcbiAgICAgICAgICAgICAgICBsZXQgdG9WYWx1ZSA9IHRvLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gc3luYyBib29sZWFuIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBzeW5jQm9vbGVhbkF0dHJpYnV0ZShmcm9tLCB0bywgJ2NoZWNrZWQnLCBjdHgpO1xuICAgICAgICAgICAgICAgIHN5bmNCb29sZWFuQXR0cmlidXRlKGZyb20sIHRvLCAnZGlzYWJsZWQnLCBjdHgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmcm9tLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlnbm9yZUF0dHJpYnV0ZSgndmFsdWUnLCB0bywgJ3JlbW92ZScsIGN0eCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0by5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZyb21WYWx1ZSAhPT0gdG9WYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlnbm9yZUF0dHJpYnV0ZSgndmFsdWUnLCB0bywgJ3VwZGF0ZScsIGN0eCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBmcm9tVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG8udmFsdWUgPSBmcm9tVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZyb20gaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHN5bmNCb29sZWFuQXR0cmlidXRlKGZyb20sIHRvLCAnc2VsZWN0ZWQnLCBjdHgpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZyb20gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50ICYmIHRvIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBmcm9tVmFsdWUgPSBmcm9tLnZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCB0b1ZhbHVlID0gdG8udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGlnbm9yZUF0dHJpYnV0ZSgndmFsdWUnLCB0bywgJ3VwZGF0ZScsIGN0eCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSB0b1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvLnZhbHVlID0gZnJvbVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG8uZmlyc3RDaGlsZCAmJiB0by5maXJzdENoaWxkLm5vZGVWYWx1ZSAhPT0gZnJvbVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gZnJvbVZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyB0aGUgSEVBRCB0YWcgY2FuIGJlIGhhbmRsZWQgc3BlY2lhbGx5LCBlaXRoZXIgdy8gYSAnbWVyZ2UnIG9yICdhcHBlbmQnIHN0eWxlXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlSGVhZEVsZW1lbnQobmV3SGVhZFRhZywgY3VycmVudEhlYWQsIGN0eCkge1xuXG4gICAgICAgICAgICBsZXQgYWRkZWQgPSBbXVxuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSBbXVxuICAgICAgICAgICAgbGV0IHByZXNlcnZlZCA9IFtdXG4gICAgICAgICAgICBsZXQgbm9kZXNUb0FwcGVuZCA9IFtdXG5cbiAgICAgICAgICAgIGxldCBoZWFkTWVyZ2VTdHlsZSA9IGN0eC5oZWFkLnN0eWxlO1xuXG4gICAgICAgICAgICAvLyBwdXQgYWxsIG5ldyBoZWFkIGVsZW1lbnRzIGludG8gYSBNYXAsIGJ5IHRoZWlyIG91dGVySFRNTFxuICAgICAgICAgICAgbGV0IHNyY1RvTmV3SGVhZE5vZGVzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXdIZWFkQ2hpbGQgb2YgbmV3SGVhZFRhZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHNyY1RvTmV3SGVhZE5vZGVzLnNldChuZXdIZWFkQ2hpbGQub3V0ZXJIVE1MLCBuZXdIZWFkQ2hpbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBlbHQgaW4gdGhlIGN1cnJlbnQgaGVhZFxuICAgICAgICAgICAgZm9yIChjb25zdCBjdXJyZW50SGVhZEVsdCBvZiBjdXJyZW50SGVhZC5jaGlsZHJlbikge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgaGVhZCBlbGVtZW50IGlzIGluIHRoZSBtYXBcbiAgICAgICAgICAgICAgICBsZXQgaW5OZXdDb250ZW50ID0gc3JjVG9OZXdIZWFkTm9kZXMuaGFzKGN1cnJlbnRIZWFkRWx0Lm91dGVySFRNTCk7XG4gICAgICAgICAgICAgICAgbGV0IGlzUmVBcHBlbmRlZCA9IGN0eC5oZWFkLnNob3VsZFJlQXBwZW5kKGN1cnJlbnRIZWFkRWx0KTtcbiAgICAgICAgICAgICAgICBsZXQgaXNQcmVzZXJ2ZWQgPSBjdHguaGVhZC5zaG91bGRQcmVzZXJ2ZShjdXJyZW50SGVhZEVsdCk7XG4gICAgICAgICAgICAgICAgaWYgKGluTmV3Q29udGVudCB8fCBpc1ByZXNlcnZlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSZUFwcGVuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgdmVyc2lvbiBhbmQgbGV0IHRoZSBuZXcgdmVyc2lvbiByZXBsYWNlIGl0IGFuZCByZS1leGVjdXRlXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkLnB1c2goY3VycmVudEhlYWRFbHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBlbGVtZW50IGFscmVhZHkgZXhpc3RzIGFuZCBzaG91bGQgbm90IGJlIHJlLWFwcGVuZGVkLCBzbyByZW1vdmUgaXQgZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5ldyBjb250ZW50IG1hcCwgcHJlc2VydmluZyBpdCBpbiB0aGUgRE9NXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNUb05ld0hlYWROb2Rlcy5kZWxldGUoY3VycmVudEhlYWRFbHQub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNlcnZlZC5wdXNoKGN1cnJlbnRIZWFkRWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkTWVyZ2VTdHlsZSA9PT0gXCJhcHBlbmRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgYXJlIGFwcGVuZGluZyBhbmQgdGhpcyBleGlzdGluZyBlbGVtZW50IGlzIG5vdCBuZXcgY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gaWYgYW5kIG9ubHkgaWYgaXQgaXMgbWFya2VkIGZvciByZS1hcHBlbmQgZG8gd2UgZG8gYW55dGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1JlQXBwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkLnB1c2goY3VycmVudEhlYWRFbHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzVG9BcHBlbmQucHVzaChjdXJyZW50SGVhZEVsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEgbWVyZ2UsIHdlIHJlbW92ZSB0aGlzIGNvbnRlbnQgc2luY2UgaXQgaXMgbm90IGluIHRoZSBuZXcgaGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5oZWFkLnNob3VsZFJlbW92ZShjdXJyZW50SGVhZEVsdCkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGN1cnJlbnRIZWFkRWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUHVzaCB0aGUgcmVtYWluaW5nIG5ldyBoZWFkIGVsZW1lbnRzIGluIHRoZSBNYXAgaW50byB0aGVcbiAgICAgICAgICAgIC8vIG5vZGVzIHRvIGFwcGVuZCB0byB0aGUgaGVhZCB0YWdcbiAgICAgICAgICAgIG5vZGVzVG9BcHBlbmQucHVzaCguLi5zcmNUb05ld0hlYWROb2Rlcy52YWx1ZXMoKSk7XG4gICAgICAgICAgICBsb2coXCJ0byBhcHBlbmQ6IFwiLCBub2Rlc1RvQXBwZW5kKTtcblxuICAgICAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5ld05vZGUgb2Ygbm9kZXNUb0FwcGVuZCkge1xuICAgICAgICAgICAgICAgIGxvZyhcImFkZGluZzogXCIsIG5ld05vZGUpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdFbHQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChuZXdOb2RlLm91dGVySFRNTCkuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICBsb2cobmV3RWx0KTtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmNhbGxiYWNrcy5iZWZvcmVOb2RlQWRkZWQobmV3RWx0KSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0VsdC5ocmVmIHx8IG5ld0VsdC5zcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNvbHZlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKF9yZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IF9yZXNvbHZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdFbHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEhlYWQuYXBwZW5kQ2hpbGQobmV3RWx0KTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmNhbGxiYWNrcy5hZnRlck5vZGVBZGRlZChuZXdFbHQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRlZC5wdXNoKG5ld0VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW1vdmUgYWxsIHJlbW92ZWQgZWxlbWVudHMsIGFmdGVyIHdlIGhhdmUgYXBwZW5kZWQgdGhlIG5ldyBlbGVtZW50cyB0byBhdm9pZFxuICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBuZXR3b3JrIHJlcXVlc3RzIGZvciB0aGluZ3MgbGlrZSBzdHlsZSBzaGVldHNcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVtb3ZlZEVsZW1lbnQgb2YgcmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjdHguY2FsbGJhY2tzLmJlZm9yZU5vZGVSZW1vdmVkKHJlbW92ZWRFbGVtZW50KSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEhlYWQucmVtb3ZlQ2hpbGQocmVtb3ZlZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2FsbGJhY2tzLmFmdGVyTm9kZVJlbW92ZWQocmVtb3ZlZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3R4LmhlYWQuYWZ0ZXJIZWFkTW9ycGhlZChjdXJyZW50SGVhZCwge2FkZGVkOiBhZGRlZCwga2VwdDogcHJlc2VydmVkLCByZW1vdmVkOiByZW1vdmVkfSk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vIE1pc2NcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5vT3AoKSB7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgIERlZXAgbWVyZ2VzIHRoZSBjb25maWcgb2JqZWN0IGFuZCB0aGUgSWRpb21vcm9waC5kZWZhdWx0cyBvYmplY3QgdG9cbiAgICAgICAgICBwcm9kdWNlIGEgZmluYWwgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlRGVmYXVsdHMoY29uZmlnKSB7XG4gICAgICAgICAgICBsZXQgZmluYWxDb25maWcgPSB7fTtcbiAgICAgICAgICAgIC8vIGNvcHkgdG9wIGxldmVsIHN0dWZmIGludG8gZmluYWwgY29uZmlnXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGZpbmFsQ29uZmlnLCBkZWZhdWx0cyk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGZpbmFsQ29uZmlnLCBjb25maWcpO1xuXG4gICAgICAgICAgICAvLyBjb3B5IGNhbGxiYWNrcyBpbnRvIGZpbmFsIGNvbmZpZyAoZG8gdGhpcyB0byBkZWVwIG1lcmdlIHRoZSBjYWxsYmFja3MpXG4gICAgICAgICAgICBmaW5hbENvbmZpZy5jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZmluYWxDb25maWcuY2FsbGJhY2tzLCBkZWZhdWx0cy5jYWxsYmFja3MpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihmaW5hbENvbmZpZy5jYWxsYmFja3MsIGNvbmZpZy5jYWxsYmFja3MpO1xuXG4gICAgICAgICAgICAvLyBjb3B5IGhlYWQgY29uZmlnIGludG8gZmluYWwgY29uZmlnICAoZG8gdGhpcyB0byBkZWVwIG1lcmdlIHRoZSBoZWFkKVxuICAgICAgICAgICAgZmluYWxDb25maWcuaGVhZCA9IHt9O1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihmaW5hbENvbmZpZy5oZWFkLCBkZWZhdWx0cy5oZWFkKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZmluYWxDb25maWcuaGVhZCwgY29uZmlnLmhlYWQpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbmFsQ29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTW9ycGhDb250ZXh0KG9sZE5vZGUsIG5ld0NvbnRlbnQsIGNvbmZpZykge1xuICAgICAgICAgICAgY29uZmlnID0gbWVyZ2VEZWZhdWx0cyhjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IG9sZE5vZGUsXG4gICAgICAgICAgICAgICAgbmV3Q29udGVudDogbmV3Q29udGVudCxcbiAgICAgICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgICAgICBtb3JwaFN0eWxlOiBjb25maWcubW9ycGhTdHlsZSxcbiAgICAgICAgICAgICAgICBpZ25vcmVBY3RpdmU6IGNvbmZpZy5pZ25vcmVBY3RpdmUsXG4gICAgICAgICAgICAgICAgaWdub3JlQWN0aXZlVmFsdWU6IGNvbmZpZy5pZ25vcmVBY3RpdmVWYWx1ZSxcbiAgICAgICAgICAgICAgICBpZE1hcDogY3JlYXRlSWRNYXAob2xkTm9kZSwgbmV3Q29udGVudCksXG4gICAgICAgICAgICAgICAgZGVhZElkczogbmV3IFNldCgpLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrczogY29uZmlnLmNhbGxiYWNrcyxcbiAgICAgICAgICAgICAgICBoZWFkOiBjb25maWcuaGVhZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNJZFNldE1hdGNoKG5vZGUxLCBub2RlMiwgY3R4KSB7XG4gICAgICAgICAgICBpZiAobm9kZTEgPT0gbnVsbCB8fCBub2RlMiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUxLm5vZGVUeXBlID09PSBub2RlMi5ub2RlVHlwZSAmJiBub2RlMS50YWdOYW1lID09PSBub2RlMi50YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUxLmlkICE9PSBcIlwiICYmIG5vZGUxLmlkID09PSBub2RlMi5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0SWRJbnRlcnNlY3Rpb25Db3VudChjdHgsIG5vZGUxLCBub2RlMikgPiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzU29mdE1hdGNoKG5vZGUxLCBub2RlMikge1xuICAgICAgICAgICAgaWYgKG5vZGUxID09IG51bGwgfHwgbm9kZTIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlMS5ub2RlVHlwZSA9PT0gbm9kZTIubm9kZVR5cGUgJiYgbm9kZTEudGFnTmFtZSA9PT0gbm9kZTIudGFnTmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlTm9kZXNCZXR3ZWVuKHN0YXJ0SW5jbHVzaXZlLCBlbmRFeGNsdXNpdmUsIGN0eCkge1xuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0SW5jbHVzaXZlICE9PSBlbmRFeGNsdXNpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcE5vZGUgPSBzdGFydEluY2x1c2l2ZTtcbiAgICAgICAgICAgICAgICBzdGFydEluY2x1c2l2ZSA9IHN0YXJ0SW5jbHVzaXZlLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUodGVtcE5vZGUsIGN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW1vdmVJZHNGcm9tQ29uc2lkZXJhdGlvbihjdHgsIGVuZEV4Y2x1c2l2ZSk7XG4gICAgICAgICAgICByZXR1cm4gZW5kRXhjbHVzaXZlLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyBTY2FucyBmb3J3YXJkIGZyb20gdGhlIGluc2VydGlvblBvaW50IGluIHRoZSBvbGQgcGFyZW50IGxvb2tpbmcgZm9yIGEgcG90ZW50aWFsIGlkIG1hdGNoXG4gICAgICAgIC8vIGZvciB0aGUgbmV3Q2hpbGQuICBXZSBzdG9wIGlmIHdlIGZpbmQgYSBwb3RlbnRpYWwgaWQgbWF0Y2ggZm9yIHRoZSBuZXcgY2hpbGQgT1JcbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBvZiBwb3RlbnRpYWwgaWQgbWF0Y2hlcyB3ZSBhcmUgZGlzY2FyZGluZyBpcyBncmVhdGVyIHRoYW4gdGhlXG4gICAgICAgIC8vIHBvdGVudGlhbCBpZCBtYXRjaGVzIGZvciB0aGUgbmV3IGNoaWxkXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgZnVuY3Rpb24gZmluZElkU2V0TWF0Y2gobmV3Q29udGVudCwgb2xkUGFyZW50LCBuZXdDaGlsZCwgaW5zZXJ0aW9uUG9pbnQsIGN0eCkge1xuXG4gICAgICAgICAgICAvLyBtYXggaWQgbWF0Y2hlcyB3ZSBhcmUgd2lsbGluZyB0byBkaXNjYXJkIGluIG91ciBzZWFyY2hcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZFBvdGVudGlhbElkQ291bnQgPSBnZXRJZEludGVyc2VjdGlvbkNvdW50KGN0eCwgbmV3Q2hpbGQsIG9sZFBhcmVudCk7XG5cbiAgICAgICAgICAgIGxldCBwb3RlbnRpYWxNYXRjaCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIG9ubHkgc2VhcmNoIGZvcndhcmQgaWYgdGhlcmUgaXMgYSBwb3NzaWJpbGl0eSBvZiBhbiBpZCBtYXRjaFxuICAgICAgICAgICAgaWYgKG5ld0NoaWxkUG90ZW50aWFsSWRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcG90ZW50aWFsTWF0Y2ggPSBpbnNlcnRpb25Qb2ludDtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHBvc3NpYmlsaXR5IG9mIGFuIGlkIG1hdGNoLCBzY2FuIGZvcndhcmRcbiAgICAgICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBwb3RlbnRpYWwgaWQgbWF0Y2ggY291bnQgd2UgYXJlIGRpc2NhcmRpbmcgKHRoZVxuICAgICAgICAgICAgICAgIC8vIG5ld0NoaWxkUG90ZW50aWFsSWRDb3VudCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB0aGlzIHRvIG1ha2UgaXQgbGlrZWx5XG4gICAgICAgICAgICAgICAgLy8gd29ydGggaXQpXG4gICAgICAgICAgICAgICAgbGV0IG90aGVyTWF0Y2hDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvdGVudGlhbE1hdGNoICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGFuIGlkIG1hdGNoLCByZXR1cm4gdGhlIGN1cnJlbnQgcG90ZW50aWFsIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0lkU2V0TWF0Y2gobmV3Q2hpbGQsIHBvdGVudGlhbE1hdGNoLCBjdHgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG90ZW50aWFsTWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjb21wdXRlciB0aGUgb3RoZXIgcG90ZW50aWFsIG1hdGNoZXMgb2YgdGhpcyBuZXcgY29udGVudFxuICAgICAgICAgICAgICAgICAgICBvdGhlck1hdGNoQ291bnQgKz0gZ2V0SWRJbnRlcnNlY3Rpb25Db3VudChjdHgsIHBvdGVudGlhbE1hdGNoLCBuZXdDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyTWF0Y2hDb3VudCA+IG5ld0NoaWxkUG90ZW50aWFsSWRDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBtb3JlIHBvdGVudGlhbCBpZCBtYXRjaGVzIGluIF9vdGhlcl8gY29udGVudCwgd2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBoYXZlIGEgZ29vZCBjYW5kaWRhdGUgZm9yIGFuIGlkIG1hdGNoLCBzbyByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBhZHZhbmNlZCB0byB0aGUgbmV4dCBvbGQgY29udGVudCBjaGlsZFxuICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWxNYXRjaCA9IHBvdGVudGlhbE1hdGNoLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwb3RlbnRpYWxNYXRjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgLy8gU2NhbnMgZm9yd2FyZCBmcm9tIHRoZSBpbnNlcnRpb25Qb2ludCBpbiB0aGUgb2xkIHBhcmVudCBsb29raW5nIGZvciBhIHBvdGVudGlhbCBzb2Z0IG1hdGNoXG4gICAgICAgIC8vIGZvciB0aGUgbmV3Q2hpbGQuICBXZSBzdG9wIGlmIHdlIGZpbmQgYSBwb3RlbnRpYWwgc29mdCBtYXRjaCBmb3IgdGhlIG5ldyBjaGlsZCBPUlxuICAgICAgICAvLyBpZiB3ZSBmaW5kIGEgcG90ZW50aWFsIGlkIG1hdGNoIGluIHRoZSBvbGQgcGFyZW50cyBjaGlsZHJlbiBPUiBpZiB3ZSBmaW5kIHR3b1xuICAgICAgICAvLyBwb3RlbnRpYWwgc29mdCBtYXRjaGVzIGZvciB0aGUgbmV4dCB0d28gcGllY2VzIG9mIG5ldyBjb250ZW50XG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgZnVuY3Rpb24gZmluZFNvZnRNYXRjaChuZXdDb250ZW50LCBvbGRQYXJlbnQsIG5ld0NoaWxkLCBpbnNlcnRpb25Qb2ludCwgY3R4KSB7XG5cbiAgICAgICAgICAgIGxldCBwb3RlbnRpYWxTb2Z0TWF0Y2ggPSBpbnNlcnRpb25Qb2ludDtcbiAgICAgICAgICAgIGxldCBuZXh0U2libGluZyA9IG5ld0NoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgbGV0IHNpYmxpbmdTb2Z0TWF0Y2hDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChwb3RlbnRpYWxTb2Z0TWF0Y2ggIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGdldElkSW50ZXJzZWN0aW9uQ291bnQoY3R4LCBwb3RlbnRpYWxTb2Z0TWF0Y2gsIG5ld0NvbnRlbnQpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBwb3RlbnRpYWwgc29mdCBtYXRjaCBoYXMgYSBwb3RlbnRpYWwgaWQgc2V0IG1hdGNoIHdpdGggdGhlIHJlbWFpbmluZyBuZXdcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udGVudCBzbyBiYWlsIG91dCBvZiBsb29raW5nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgYSBzb2Z0IG1hdGNoIHdpdGggdGhlIGN1cnJlbnQgbm9kZSwgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgaWYgKGlzU29mdE1hdGNoKG5ld0NoaWxkLCBwb3RlbnRpYWxTb2Z0TWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3RlbnRpYWxTb2Z0TWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU29mdE1hdGNoKG5leHRTaWJsaW5nLCBwb3RlbnRpYWxTb2Z0TWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBuZXh0IG5ldyBub2RlIGhhcyBhIHNvZnQgbWF0Y2ggd2l0aCB0aGlzIG5vZGUsIHNvXG4gICAgICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudCB0aGUgY291bnQgb2YgZnV0dXJlIHNvZnQgbWF0Y2hlc1xuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nU29mdE1hdGNoQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNpYmxpbmcgPSBuZXh0U2libGluZy5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgdHdvIGZ1dHVyZSBzb2Z0IG1hdGNoZXMsIGJhaWwgdG8gYWxsb3cgdGhlIHNpYmxpbmdzIHRvIHNvZnQgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gdGhhdCB3ZSBkb24ndCBjb25zdW1lIGZ1dHVyZSBzb2Z0IG1hdGNoZXMgZm9yIHRoZSBzYWtlIG9mIHRoZSBjdXJyZW50IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdTb2Z0TWF0Y2hDb3VudCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkdmFuY2VkIHRvIHRoZSBuZXh0IG9sZCBjb250ZW50IGNoaWxkXG4gICAgICAgICAgICAgICAgcG90ZW50aWFsU29mdE1hdGNoID0gcG90ZW50aWFsU29mdE1hdGNoLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcG90ZW50aWFsU29mdE1hdGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VDb250ZW50KG5ld0NvbnRlbnQpIHtcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBzdmdzIHRvIGF2b2lkIGZhbHNlLXBvc2l0aXZlIG1hdGNoZXMgb24gaGVhZCwgZXRjLlxuICAgICAgICAgICAgbGV0IGNvbnRlbnRXaXRoU3Znc1JlbW92ZWQgPSBuZXdDb250ZW50LnJlcGxhY2UoLzxzdmcoXFxzW14+XSo+fD4pKFtcXHNcXFNdKj8pPFxcL3N2Zz4vZ2ltLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBuZXdDb250ZW50IGNvbnRhaW5zIGEgaHRtbCwgaGVhZCBvciBib2R5IHRhZywgd2UgY2FuIHNpbXBseSBwYXJzZSBpdCB3L28gd3JhcHBpbmdcbiAgICAgICAgICAgIGlmIChjb250ZW50V2l0aFN2Z3NSZW1vdmVkLm1hdGNoKC88XFwvaHRtbD4vKSB8fCBjb250ZW50V2l0aFN2Z3NSZW1vdmVkLm1hdGNoKC88XFwvaGVhZD4vKSB8fCBjb250ZW50V2l0aFN2Z3NSZW1vdmVkLm1hdGNoKC88XFwvYm9keT4vKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhuZXdDb250ZW50LCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyBhIGZ1bGwgSFRNTCBkb2N1bWVudCwgcmV0dXJuIHRoZSBkb2N1bWVudCBpdHNlbGYgYXMgdGhlIHBhcmVudCBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudFdpdGhTdmdzUmVtb3ZlZC5tYXRjaCgvPFxcL2h0bWw+LykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5nZW5lcmF0ZWRCeUlkaW9tb3JwaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSByZXR1cm4gdGhlIGh0bWwgZWxlbWVudCBhcyB0aGUgcGFyZW50IGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICBsZXQgaHRtbEVsZW1lbnQgPSBjb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChodG1sRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuZ2VuZXJhdGVkQnlJZGlvbW9ycGggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGh0bWxFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHBhcnRpYWwgSFRNTCwgd3JhcCBpdCBpbiBhIHRlbXBsYXRlIHRhZyB0byBwcm92aWRlIGEgcGFyZW50IGVsZW1lbnQgYW5kIGFsc28gdG8gaGVscFxuICAgICAgICAgICAgICAgIC8vIGRlYWwgd2l0aCB0b3VjaHkgdGFncyBsaWtlIHRyLCB0Ym9keSwgZXRjLlxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZURvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoXCI8Ym9keT48dGVtcGxhdGU+XCIgKyBuZXdDb250ZW50ICsgXCI8L3RlbXBsYXRlPjwvYm9keT5cIiwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSByZXNwb25zZURvYy5ib2R5LnF1ZXJ5U2VsZWN0b3IoJ3RlbXBsYXRlJykuY29udGVudDtcbiAgICAgICAgICAgICAgICBjb250ZW50LmdlbmVyYXRlZEJ5SWRpb21vcnBoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplQ29udGVudChuZXdDb250ZW50KSB7XG4gICAgICAgICAgICBpZiAobmV3Q29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFVubmVjZXNzYXJ5TG9jYWxWYXJpYWJsZUpTXG4gICAgICAgICAgICAgICAgY29uc3QgZHVtbXlQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHVtbXlQYXJlbnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0NvbnRlbnQuZ2VuZXJhdGVkQnlJZGlvbW9ycGgpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgdGVtcGxhdGUgdGFnIGNyZWF0ZWQgYnkgaWRpb21vcnBoIHBhcnNpbmcgY2FuIHNlcnZlIGFzIGEgZHVtbXkgcGFyZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0NvbnRlbnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0NvbnRlbnQgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gYSBzaW5nbGUgbm9kZSBpcyBhZGRlZCBhcyBhIGNoaWxkIHRvIGEgZHVtbXkgcGFyZW50XG4gICAgICAgICAgICAgICAgY29uc3QgZHVtbXlQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBkdW1teVBhcmVudC5hcHBlbmQobmV3Q29udGVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGR1bW15UGFyZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhbGwgbm9kZXMgaW4gdGhlIGFycmF5IG9yIEhUTUxFbGVtZW50IGNvbGxlY3Rpb24gYXJlIGNvbnNvbGlkYXRlZCB1bmRlclxuICAgICAgICAgICAgICAgIC8vIGEgc2luZ2xlIGR1bW15IHBhcmVudCBlbGVtZW50XG4gICAgICAgICAgICAgICAgY29uc3QgZHVtbXlQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVsdCBvZiBbLi4ubmV3Q29udGVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZHVtbXlQYXJlbnQuYXBwZW5kKGVsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkdW1teVBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGluc2VydFNpYmxpbmdzKHByZXZpb3VzU2libGluZywgbW9ycGhlZE5vZGUsIG5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhY2sgPSBbXVxuICAgICAgICAgICAgbGV0IGFkZGVkID0gW11cbiAgICAgICAgICAgIHdoaWxlIChwcmV2aW91c1NpYmxpbmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gocHJldmlvdXNTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIGFkZGVkLnB1c2gobm9kZSk7IC8vIHB1c2ggYWRkZWQgcHJlY2VkaW5nIHNpYmxpbmdzIG9uIGluIG9yZGVyIGFuZCBpbnNlcnRcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShub2RlLCBtb3JwaGVkTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRlZC5wdXNoKG1vcnBoZWROb2RlKTtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0U2libGluZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0U2libGluZyk7XG4gICAgICAgICAgICAgICAgYWRkZWQucHVzaChuZXh0U2libGluZyk7IC8vIGhlcmUgd2UgYXJlIGdvaW5nIGluIG9yZGVyLCBzbyBwdXNoIG9uIGFzIHdlIHNjYW4sIHJhdGhlciB0aGFuIGFkZFxuICAgICAgICAgICAgICAgIG5leHRTaWJsaW5nID0gbmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHN0YWNrLnBvcCgpLCBtb3JwaGVkTm9kZS5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWRkZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kQmVzdE5vZGVNYXRjaChuZXdDb250ZW50LCBvbGROb2RlLCBjdHgpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gbmV3Q29udGVudC5maXJzdENoaWxkO1xuICAgICAgICAgICAgbGV0IGJlc3RFbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgc2NvcmUgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1Njb3JlID0gc2NvcmVFbGVtZW50KGN1cnJlbnRFbGVtZW50LCBvbGROb2RlLCBjdHgpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdTY29yZSA+IHNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RFbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlID0gbmV3U2NvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmVzdEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzY29yZUVsZW1lbnQobm9kZTEsIG5vZGUyLCBjdHgpIHtcbiAgICAgICAgICAgIGlmIChpc1NvZnRNYXRjaChub2RlMSwgbm9kZTIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC41ICsgZ2V0SWRJbnRlcnNlY3Rpb25Db3VudChjdHgsIG5vZGUxLCBub2RlMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUodGVtcE5vZGUsIGN0eCkge1xuICAgICAgICAgICAgcmVtb3ZlSWRzRnJvbUNvbnNpZGVyYXRpb24oY3R4LCB0ZW1wTm9kZSlcbiAgICAgICAgICAgIGlmIChjdHguY2FsbGJhY2tzLmJlZm9yZU5vZGVSZW1vdmVkKHRlbXBOb2RlKSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICAgICAgdGVtcE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBjdHguY2FsbGJhY2tzLmFmdGVyTm9kZVJlbW92ZWQodGVtcE5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyBJRCBTZXQgRnVuY3Rpb25zXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICBmdW5jdGlvbiBpc0lkSW5Db25zaWRlcmF0aW9uKGN0eCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiAhY3R4LmRlYWRJZHMuaGFzKGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlkSXNXaXRoaW5Ob2RlKGN0eCwgaWQsIHRhcmdldE5vZGUpIHtcbiAgICAgICAgICAgIGxldCBpZFNldCA9IGN0eC5pZE1hcC5nZXQodGFyZ2V0Tm9kZSkgfHwgRU1QVFlfU0VUO1xuICAgICAgICAgICAgcmV0dXJuIGlkU2V0LmhhcyhpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVJZHNGcm9tQ29uc2lkZXJhdGlvbihjdHgsIG5vZGUpIHtcbiAgICAgICAgICAgIGxldCBpZFNldCA9IGN0eC5pZE1hcC5nZXQobm9kZSkgfHwgRU1QVFlfU0VUO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpZCBvZiBpZFNldCkge1xuICAgICAgICAgICAgICAgIGN0eC5kZWFkSWRzLmFkZChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRJZEludGVyc2VjdGlvbkNvdW50KGN0eCwgbm9kZTEsIG5vZGUyKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlU2V0ID0gY3R4LmlkTWFwLmdldChub2RlMSkgfHwgRU1QVFlfU0VUO1xuICAgICAgICAgICAgbGV0IG1hdGNoQ291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpZCBvZiBzb3VyY2VTZXQpIHtcbiAgICAgICAgICAgICAgICAvLyBhIHBvdGVudGlhbCBtYXRjaCBpcyBhbiBpZCBpbiB0aGUgc291cmNlIGFuZCBwb3RlbnRpYWxJZHNTZXQsIGJ1dFxuICAgICAgICAgICAgICAgIC8vIHRoYXQgaGFzIG5vdCBhbHJlYWR5IGJlZW4gbWVyZ2VkIGludG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIGlmIChpc0lkSW5Db25zaWRlcmF0aW9uKGN0eCwgaWQpICYmIGlkSXNXaXRoaW5Ob2RlKGN0eCwgaWQsIG5vZGUyKSkge1xuICAgICAgICAgICAgICAgICAgICArK21hdGNoQ291bnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBib3R0b20gdXAgYWxnb3JpdGhtIHRoYXQgZmluZHMgYWxsIGVsZW1lbnRzIHdpdGggaWRzIGluc2lkZSBvZiB0aGUgbm9kZVxuICAgICAgICAgKiBhcmd1bWVudCBhbmQgcG9wdWxhdGVzIGlkIHNldHMgZm9yIHRob3NlIG5vZGVzIGFuZCBhbGwgdGhlaXIgcGFyZW50cywgZ2VuZXJhdGluZ1xuICAgICAgICAgKiBhIHNldCBvZiBpZHMgY29udGFpbmVkIHdpdGhpbiBhbGwgbm9kZXMgZm9yIHRoZSBlbnRpcmUgaGllcmFyY2h5IGluIHRoZSBET01cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5vZGUge0VsZW1lbnR9XG4gICAgICAgICAqIEBwYXJhbSB7TWFwPE5vZGUsIFNldDxTdHJpbmc+Pn0gaWRNYXBcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlSWRNYXBGb3JOb2RlKG5vZGUsIGlkTWFwKSB7XG4gICAgICAgICAgICBsZXQgbm9kZVBhcmVudCA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIC8vIGZpbmQgYWxsIGVsZW1lbnRzIHdpdGggYW4gaWQgcHJvcGVydHlcbiAgICAgICAgICAgIGxldCBpZEVsZW1lbnRzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsdCBvZiBpZEVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBlbHQ7XG4gICAgICAgICAgICAgICAgLy8gd2FsayB1cCB0aGUgcGFyZW50IGhpZXJhcmNoeSBvZiB0aGF0IGVsZW1lbnQsIGFkZGluZyB0aGUgaWRcbiAgICAgICAgICAgICAgICAvLyBvZiBlbGVtZW50IHRvIHRoZSBwYXJlbnQncyBpZCBzZXRcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbm9kZVBhcmVudCAmJiBjdXJyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkU2V0ID0gaWRNYXAuZ2V0KGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgaWQgc2V0IGRvZXNuJ3QgZXhpc3QsIGNyZWF0ZSBpdCBhbmQgaW5zZXJ0IGl0IGluIHRoZSAgbWFwXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZFNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkTWFwLnNldChjdXJyZW50LCBpZFNldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWRTZXQuYWRkKGVsdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZnVuY3Rpb24gY29tcHV0ZXMgYSBtYXAgb2Ygbm9kZXMgdG8gYWxsIGlkcyBjb250YWluZWQgd2l0aGluIHRoYXQgbm9kZSAoaW5jbHVzaXZlIG9mIHRoZVxuICAgICAgICAgKiBub2RlKS4gIFRoaXMgbWFwIGNhbiBiZSB1c2VkIHRvIGFzayBpZiB0d28gbm9kZXMgaGF2ZSBpbnRlcnNlY3Rpbmcgc2V0cyBvZiBpZHMsIHdoaWNoIGFsbG93c1xuICAgICAgICAgKiBmb3IgYSBsb29zZXIgZGVmaW5pdGlvbiBvZiBcIm1hdGNoaW5nXCIgdGhhbiB0cmFkaXRpb24gaWQgbWF0Y2hpbmcsIGFuZCBhbGxvd3MgY2hpbGQgbm9kZXNcbiAgICAgICAgICogdG8gY29udHJpYnV0ZSB0byBhIHBhcmVudCBub2RlcyBtYXRjaGluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBvbGRDb250ZW50ICB0aGUgb2xkIGNvbnRlbnQgdGhhdCB3aWxsIGJlIG1vcnBoZWRcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBuZXdDb250ZW50ICB0aGUgbmV3IGNvbnRlbnQgdG8gbW9ycGggdG9cbiAgICAgICAgICogQHJldHVybnMge01hcDxOb2RlLCBTZXQ8U3RyaW5nPj59IGEgbWFwIG9mIG5vZGVzIHRvIGlkIHNldHMgZm9yIHRoZVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSWRNYXAob2xkQ29udGVudCwgbmV3Q29udGVudCkge1xuICAgICAgICAgICAgbGV0IGlkTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgcG9wdWxhdGVJZE1hcEZvck5vZGUob2xkQ29udGVudCwgaWRNYXApO1xuICAgICAgICAgICAgcG9wdWxhdGVJZE1hcEZvck5vZGUobmV3Q29udGVudCwgaWRNYXApO1xuICAgICAgICAgICAgcmV0dXJuIGlkTWFwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyBUaGlzIGlzIHdoYXQgZW5kcyB1cCBiZWNvbWluZyB0aGUgSWRpb21vcnBoIGdsb2JhbCBvYmplY3RcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9ycGgsXG4gICAgICAgICAgICBkZWZhdWx0c1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuZXhwb3J0IHtJZGlvbW9ycGh9O1xuIiwgImltcG9ydCB7IGFjdGl2YXRlU2NyaXB0RWxlbWVudCwgd2FpdEZvckxvYWQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi9yZW5kZXJlclwiXG5cbmV4cG9ydCBjbGFzcyBQYWdlUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gIHN0YXRpYyByZW5kZXJFbGVtZW50KGN1cnJlbnRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkgJiYgbmV3RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCb2R5RWxlbWVudCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZXBsYWNlV2l0aChuZXdFbGVtZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3RWxlbWVudClcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvdWxkUmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5ld1NuYXBzaG90LmlzVmlzaXRhYmxlICYmIHRoaXMudHJhY2tlZEVsZW1lbnRzQXJlSWRlbnRpY2FsXG4gIH1cblxuICBnZXQgcmVsb2FkUmVhc29uKCkge1xuICAgIGlmICghdGhpcy5uZXdTbmFwc2hvdC5pc1Zpc2l0YWJsZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVhc29uOiBcInR1cmJvX3Zpc2l0X2NvbnRyb2xfaXNfcmVsb2FkXCJcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudHJhY2tlZEVsZW1lbnRzQXJlSWRlbnRpY2FsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWFzb246IFwidHJhY2tlZF9lbGVtZW50X21pc21hdGNoXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBwcmVwYXJlVG9SZW5kZXIoKSB7XG4gICAgdGhpcy4jc2V0TGFuZ3VhZ2UoKVxuICAgIGF3YWl0IHRoaXMubWVyZ2VIZWFkKClcbiAgfVxuXG4gIGFzeW5jIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy53aWxsUmVuZGVyKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlcGxhY2VCb2R5KClcbiAgICB9XG4gIH1cblxuICBmaW5pc2hSZW5kZXJpbmcoKSB7XG4gICAgc3VwZXIuZmluaXNoUmVuZGVyaW5nKClcbiAgICBpZiAoIXRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICB0aGlzLmZvY3VzRmlyc3RBdXRvZm9jdXNhYmxlRWxlbWVudCgpXG4gICAgfVxuICB9XG5cbiAgZ2V0IGN1cnJlbnRIZWFkU25hcHNob3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNuYXBzaG90LmhlYWRTbmFwc2hvdFxuICB9XG5cbiAgZ2V0IG5ld0hlYWRTbmFwc2hvdCgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdTbmFwc2hvdC5oZWFkU25hcHNob3RcbiAgfVxuXG4gIGdldCBuZXdFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLm5ld1NuYXBzaG90LmVsZW1lbnRcbiAgfVxuXG4gICNzZXRMYW5ndWFnZSgpIHtcbiAgICBjb25zdCB7IGRvY3VtZW50RWxlbWVudCB9ID0gdGhpcy5jdXJyZW50U25hcHNob3RcbiAgICBjb25zdCB7IGxhbmcgfSA9IHRoaXMubmV3U25hcHNob3RcblxuICAgIGlmIChsYW5nKSB7XG4gICAgICBkb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibGFuZ1wiLCBsYW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwibGFuZ1wiKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG1lcmdlSGVhZCgpIHtcbiAgICBjb25zdCBtZXJnZWRIZWFkRWxlbWVudHMgPSB0aGlzLm1lcmdlUHJvdmlzaW9uYWxFbGVtZW50cygpXG4gICAgY29uc3QgbmV3U3R5bGVzaGVldEVsZW1lbnRzID0gdGhpcy5jb3B5TmV3SGVhZFN0eWxlc2hlZXRFbGVtZW50cygpXG4gICAgdGhpcy5jb3B5TmV3SGVhZFNjcmlwdEVsZW1lbnRzKClcblxuICAgIGF3YWl0IG1lcmdlZEhlYWRFbGVtZW50c1xuICAgIGF3YWl0IG5ld1N0eWxlc2hlZXRFbGVtZW50c1xuXG4gICAgaWYgKHRoaXMud2lsbFJlbmRlcikge1xuICAgICAgdGhpcy5yZW1vdmVVbnVzZWREeW5hbWljU3R5bGVzaGVldEVsZW1lbnRzKClcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXBsYWNlQm9keSgpIHtcbiAgICBhd2FpdCB0aGlzLnByZXNlcnZpbmdQZXJtYW5lbnRFbGVtZW50cyhhc3luYyAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlTmV3Qm9keSgpXG4gICAgICBhd2FpdCB0aGlzLmFzc2lnbk5ld0JvZHkoKVxuICAgIH0pXG4gIH1cblxuICBnZXQgdHJhY2tlZEVsZW1lbnRzQXJlSWRlbnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRIZWFkU25hcHNob3QudHJhY2tlZEVsZW1lbnRTaWduYXR1cmUgPT0gdGhpcy5uZXdIZWFkU25hcHNob3QudHJhY2tlZEVsZW1lbnRTaWduYXR1cmVcbiAgfVxuXG4gIGFzeW5jIGNvcHlOZXdIZWFkU3R5bGVzaGVldEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IGxvYWRpbmdFbGVtZW50cyA9IFtdXG5cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5uZXdIZWFkU3R5bGVzaGVldEVsZW1lbnRzKSB7XG4gICAgICBsb2FkaW5nRWxlbWVudHMucHVzaCh3YWl0Rm9yTG9hZChlbGVtZW50KSlcblxuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKGxvYWRpbmdFbGVtZW50cylcbiAgfVxuXG4gIGNvcHlOZXdIZWFkU2NyaXB0RWxlbWVudHMoKSB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMubmV3SGVhZFNjcmlwdEVsZW1lbnRzKSB7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGFjdGl2YXRlU2NyaXB0RWxlbWVudChlbGVtZW50KSlcbiAgICB9XG4gIH1cblxuICByZW1vdmVVbnVzZWREeW5hbWljU3R5bGVzaGVldEVsZW1lbnRzKCkge1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLnVudXNlZER5bmFtaWNTdHlsZXNoZWV0RWxlbWVudHMpIHtcbiAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICB9XG4gIH1cblxuICBhc3luYyBtZXJnZVByb3Zpc2lvbmFsRWxlbWVudHMoKSB7XG4gICAgY29uc3QgbmV3SGVhZEVsZW1lbnRzID0gWy4uLnRoaXMubmV3SGVhZFByb3Zpc2lvbmFsRWxlbWVudHNdXG5cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5jdXJyZW50SGVhZFByb3Zpc2lvbmFsRWxlbWVudHMpIHtcbiAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRFbGVtZW50SW5FbGVtZW50TGlzdChlbGVtZW50LCBuZXdIZWFkRWxlbWVudHMpKSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgbmV3SGVhZEVsZW1lbnRzKSB7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaXNDdXJyZW50RWxlbWVudEluRWxlbWVudExpc3QoZWxlbWVudCwgZWxlbWVudExpc3QpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgbmV3RWxlbWVudF0gb2YgZWxlbWVudExpc3QuZW50cmllcygpKSB7XG4gICAgICAvLyBpZiB0aXRsZSBlbGVtZW50Li4uXG4gICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09IFwiVElUTEVcIikge1xuICAgICAgICBpZiAobmV3RWxlbWVudC50YWdOYW1lICE9IFwiVElUTEVcIikge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJIVE1MID09IG5ld0VsZW1lbnQuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgZWxlbWVudExpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgYW55IG90aGVyIGVsZW1lbnQuLi5cbiAgICAgIGlmIChuZXdFbGVtZW50LmlzRXF1YWxOb2RlKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnRMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJlbW92ZUN1cnJlbnRIZWFkUHJvdmlzaW9uYWxFbGVtZW50cygpIHtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5jdXJyZW50SGVhZFByb3Zpc2lvbmFsRWxlbWVudHMpIHtcbiAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICB9XG4gIH1cblxuICBjb3B5TmV3SGVhZFByb3Zpc2lvbmFsRWxlbWVudHMoKSB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMubmV3SGVhZFByb3Zpc2lvbmFsRWxlbWVudHMpIHtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZU5ld0JvZHkoKSB7XG4gICAgZG9jdW1lbnQuYWRvcHROb2RlKHRoaXMubmV3RWxlbWVudClcbiAgICB0aGlzLmFjdGl2YXRlTmV3Qm9keVNjcmlwdEVsZW1lbnRzKClcbiAgfVxuXG4gIGFjdGl2YXRlTmV3Qm9keVNjcmlwdEVsZW1lbnRzKCkge1xuICAgIGZvciAoY29uc3QgaW5lcnRTY3JpcHRFbGVtZW50IG9mIHRoaXMubmV3Qm9keVNjcmlwdEVsZW1lbnRzKSB7XG4gICAgICBjb25zdCBhY3RpdmF0ZWRTY3JpcHRFbGVtZW50ID0gYWN0aXZhdGVTY3JpcHRFbGVtZW50KGluZXJ0U2NyaXB0RWxlbWVudClcbiAgICAgIGluZXJ0U2NyaXB0RWxlbWVudC5yZXBsYWNlV2l0aChhY3RpdmF0ZWRTY3JpcHRFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFzc2lnbk5ld0JvZHkoKSB7XG4gICAgYXdhaXQgdGhpcy5yZW5kZXJFbGVtZW50KHRoaXMuY3VycmVudEVsZW1lbnQsIHRoaXMubmV3RWxlbWVudClcbiAgfVxuXG4gIGdldCB1bnVzZWREeW5hbWljU3R5bGVzaGVldEVsZW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLm9sZEhlYWRTdHlsZXNoZWV0RWxlbWVudHMuZmlsdGVyKChlbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXRyYWNrXCIpID09PSBcImR5bmFtaWNcIlxuICAgIH0pXG4gIH1cblxuICBnZXQgb2xkSGVhZFN0eWxlc2hlZXRFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SGVhZFNuYXBzaG90LmdldFN0eWxlc2hlZXRFbGVtZW50c05vdEluU25hcHNob3QodGhpcy5uZXdIZWFkU25hcHNob3QpXG4gIH1cblxuICBnZXQgbmV3SGVhZFN0eWxlc2hlZXRFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdIZWFkU25hcHNob3QuZ2V0U3R5bGVzaGVldEVsZW1lbnRzTm90SW5TbmFwc2hvdCh0aGlzLmN1cnJlbnRIZWFkU25hcHNob3QpXG4gIH1cblxuICBnZXQgbmV3SGVhZFNjcmlwdEVsZW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLm5ld0hlYWRTbmFwc2hvdC5nZXRTY3JpcHRFbGVtZW50c05vdEluU25hcHNob3QodGhpcy5jdXJyZW50SGVhZFNuYXBzaG90KVxuICB9XG5cbiAgZ2V0IGN1cnJlbnRIZWFkUHJvdmlzaW9uYWxFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SGVhZFNuYXBzaG90LnByb3Zpc2lvbmFsRWxlbWVudHNcbiAgfVxuXG4gIGdldCBuZXdIZWFkUHJvdmlzaW9uYWxFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdIZWFkU25hcHNob3QucHJvdmlzaW9uYWxFbGVtZW50c1xuICB9XG5cbiAgZ2V0IG5ld0JvZHlTY3JpcHRFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRcIilcbiAgfVxufVxuIiwgImltcG9ydCB7IElkaW9tb3JwaCB9IGZyb20gXCJpZGlvbW9ycGgvZGlzdC9pZGlvbW9ycGguZXNtLmpzXCJcbmltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSBcIi4uLy4uL3V0aWxcIlxuaW1wb3J0IHsgUGFnZVJlbmRlcmVyIH0gZnJvbSBcIi4vcGFnZV9yZW5kZXJlclwiXG5cbmV4cG9ydCBjbGFzcyBNb3JwaFJlbmRlcmVyIGV4dGVuZHMgUGFnZVJlbmRlcmVyIHtcbiAgYXN5bmMgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLndpbGxSZW5kZXIpIGF3YWl0IHRoaXMuI21vcnBoQm9keSgpXG4gIH1cblxuICBnZXQgcmVuZGVyTWV0aG9kKCkge1xuICAgIHJldHVybiBcIm1vcnBoXCJcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBhc3luYyAjbW9ycGhCb2R5KCkge1xuICAgIHRoaXMuI21vcnBoRWxlbWVudHModGhpcy5jdXJyZW50RWxlbWVudCwgdGhpcy5uZXdFbGVtZW50KVxuICAgIHRoaXMuI3JlbG9hZFJlbW90ZUZyYW1lcygpXG5cbiAgICBkaXNwYXRjaChcInR1cmJvOm1vcnBoXCIsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBjdXJyZW50RWxlbWVudDogdGhpcy5jdXJyZW50RWxlbWVudCxcbiAgICAgICAgbmV3RWxlbWVudDogdGhpcy5uZXdFbGVtZW50XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gICNtb3JwaEVsZW1lbnRzKGN1cnJlbnRFbGVtZW50LCBuZXdFbGVtZW50LCBtb3JwaFN0eWxlID0gXCJvdXRlckhUTUxcIikge1xuICAgIHRoaXMuaXNNb3JwaGluZ1R1cmJvRnJhbWUgPSB0aGlzLiNpc0ZyYW1lUmVsb2FkZWRXaXRoTW9ycGgoY3VycmVudEVsZW1lbnQpXG5cbiAgICBJZGlvbW9ycGgubW9ycGgoY3VycmVudEVsZW1lbnQsIG5ld0VsZW1lbnQsIHtcbiAgICAgIG1vcnBoU3R5bGU6IG1vcnBoU3R5bGUsXG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgYmVmb3JlTm9kZUFkZGVkOiB0aGlzLiNzaG91bGRBZGRFbGVtZW50LFxuICAgICAgICBiZWZvcmVOb2RlTW9ycGhlZDogdGhpcy4jc2hvdWxkTW9ycGhFbGVtZW50LFxuICAgICAgICBiZWZvcmVBdHRyaWJ1dGVVcGRhdGVkOiB0aGlzLiNzaG91bGRVcGRhdGVBdHRyaWJ1dGUsXG4gICAgICAgIGJlZm9yZU5vZGVSZW1vdmVkOiB0aGlzLiNzaG91bGRSZW1vdmVFbGVtZW50LFxuICAgICAgICBhZnRlck5vZGVNb3JwaGVkOiB0aGlzLiNkaWRNb3JwaEVsZW1lbnRcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgI3Nob3VsZEFkZEVsZW1lbnQgPSAobm9kZSkgPT4ge1xuICAgIHJldHVybiAhKG5vZGUuaWQgJiYgbm9kZS5oYXNBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXBlcm1hbmVudFwiKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlLmlkKSlcbiAgfVxuXG4gICNzaG91bGRNb3JwaEVsZW1lbnQgPSAob2xkTm9kZSwgbmV3Tm9kZSkgPT4ge1xuICAgIGlmIChvbGROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmICghb2xkTm9kZS5oYXNBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXBlcm1hbmVudFwiKSAmJiAodGhpcy5pc01vcnBoaW5nVHVyYm9GcmFtZSB8fCAhdGhpcy4jaXNGcmFtZVJlbG9hZGVkV2l0aE1vcnBoKG9sZE5vZGUpKSkge1xuICAgICAgICBjb25zdCBldmVudCA9IGRpc3BhdGNoKFwidHVyYm86YmVmb3JlLW1vcnBoLWVsZW1lbnRcIiwge1xuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgdGFyZ2V0OiBvbGROb2RlLFxuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgbmV3RWxlbWVudDogbmV3Tm9kZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICNzaG91bGRVcGRhdGVBdHRyaWJ1dGUgPSAoYXR0cmlidXRlTmFtZSwgdGFyZ2V0LCBtdXRhdGlvblR5cGUpID0+IHtcbiAgICBjb25zdCBldmVudCA9IGRpc3BhdGNoKFwidHVyYm86YmVmb3JlLW1vcnBoLWF0dHJpYnV0ZVwiLCB7IGNhbmNlbGFibGU6IHRydWUsIHRhcmdldCwgZGV0YWlsOiB7IGF0dHJpYnV0ZU5hbWUsIG11dGF0aW9uVHlwZSB9IH0pXG5cbiAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcbiAgfVxuXG4gICNkaWRNb3JwaEVsZW1lbnQgPSAob2xkTm9kZSwgbmV3Tm9kZSkgPT4ge1xuICAgIGlmIChuZXdOb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIGRpc3BhdGNoKFwidHVyYm86bW9ycGgtZWxlbWVudFwiLCB7XG4gICAgICAgIHRhcmdldDogb2xkTm9kZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbmV3RWxlbWVudDogbmV3Tm9kZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gICNzaG91bGRSZW1vdmVFbGVtZW50ID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gdGhpcy4jc2hvdWxkTW9ycGhFbGVtZW50KG5vZGUpXG4gIH1cblxuICAjcmVsb2FkUmVtb3RlRnJhbWVzKCkge1xuICAgIHRoaXMuI3JlbW90ZUZyYW1lcygpLmZvckVhY2goKGZyYW1lKSA9PiB7XG4gICAgICBpZiAodGhpcy4jaXNGcmFtZVJlbG9hZGVkV2l0aE1vcnBoKGZyYW1lKSkge1xuICAgICAgICB0aGlzLiNyZW5kZXJGcmFtZVdpdGhNb3JwaChmcmFtZSlcbiAgICAgICAgZnJhbWUucmVsb2FkKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgI3JlbmRlckZyYW1lV2l0aE1vcnBoKGZyYW1lKSB7XG4gICAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcInR1cmJvOmJlZm9yZS1mcmFtZS1yZW5kZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5kZXRhaWwucmVuZGVyID0gdGhpcy4jbW9ycGhGcmFtZVVwZGF0ZVxuICAgIH0sIHsgb25jZTogdHJ1ZSB9KVxuICB9XG5cbiAgI21vcnBoRnJhbWVVcGRhdGUgPSAoY3VycmVudEVsZW1lbnQsIG5ld0VsZW1lbnQpID0+IHtcbiAgICBkaXNwYXRjaChcInR1cmJvOmJlZm9yZS1mcmFtZS1tb3JwaFwiLCB7XG4gICAgICB0YXJnZXQ6IGN1cnJlbnRFbGVtZW50LFxuICAgICAgZGV0YWlsOiB7IGN1cnJlbnRFbGVtZW50LCBuZXdFbGVtZW50IH1cbiAgICB9KVxuICAgIHRoaXMuI21vcnBoRWxlbWVudHMoY3VycmVudEVsZW1lbnQsIG5ld0VsZW1lbnQuY2hpbGRyZW4sIFwiaW5uZXJIVE1MXCIpXG4gIH1cblxuICAjaXNGcmFtZVJlbG9hZGVkV2l0aE1vcnBoKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5zcmMgJiYgZWxlbWVudC5yZWZyZXNoID09PSBcIm1vcnBoXCJcbiAgfVxuXG4gICNyZW1vdGVGcmFtZXMoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndHVyYm8tZnJhbWVbc3JjXScpKS5maWx0ZXIoZnJhbWUgPT4ge1xuICAgICAgcmV0dXJuICFmcmFtZS5jbG9zZXN0KCdbZGF0YS10dXJiby1wZXJtYW5lbnRdJylcbiAgICB9KVxuICB9XG59XG4iLCAiaW1wb3J0IHsgdG9DYWNoZUtleSB9IGZyb20gXCIuLi91cmxcIlxuXG5leHBvcnQgY2xhc3MgU25hcHNob3RDYWNoZSB7XG4gIGtleXMgPSBbXVxuICBzbmFwc2hvdHMgPSB7fVxuXG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplXG4gIH1cblxuICBoYXMobG9jYXRpb24pIHtcbiAgICByZXR1cm4gdG9DYWNoZUtleShsb2NhdGlvbikgaW4gdGhpcy5zbmFwc2hvdHNcbiAgfVxuXG4gIGdldChsb2NhdGlvbikge1xuICAgIGlmICh0aGlzLmhhcyhsb2NhdGlvbikpIHtcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy5yZWFkKGxvY2F0aW9uKVxuICAgICAgdGhpcy50b3VjaChsb2NhdGlvbilcbiAgICAgIHJldHVybiBzbmFwc2hvdFxuICAgIH1cbiAgfVxuXG4gIHB1dChsb2NhdGlvbiwgc25hcHNob3QpIHtcbiAgICB0aGlzLndyaXRlKGxvY2F0aW9uLCBzbmFwc2hvdClcbiAgICB0aGlzLnRvdWNoKGxvY2F0aW9uKVxuICAgIHJldHVybiBzbmFwc2hvdFxuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5zbmFwc2hvdHMgPSB7fVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIHJlYWQobG9jYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5zbmFwc2hvdHNbdG9DYWNoZUtleShsb2NhdGlvbildXG4gIH1cblxuICB3cml0ZShsb2NhdGlvbiwgc25hcHNob3QpIHtcbiAgICB0aGlzLnNuYXBzaG90c1t0b0NhY2hlS2V5KGxvY2F0aW9uKV0gPSBzbmFwc2hvdFxuICB9XG5cbiAgdG91Y2gobG9jYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSB0b0NhY2hlS2V5KGxvY2F0aW9uKVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2Yoa2V5KVxuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmtleXMuc3BsaWNlKGluZGV4LCAxKVxuICAgIHRoaXMua2V5cy51bnNoaWZ0KGtleSlcbiAgICB0aGlzLnRyaW0oKVxuICB9XG5cbiAgdHJpbSgpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleXMuc3BsaWNlKHRoaXMuc2l6ZSkpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnNuYXBzaG90c1trZXldXG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgbmV4dEV2ZW50TG9vcFRpY2sgfSBmcm9tIFwiLi4vLi4vdXRpbFwiXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4uL3ZpZXdcIlxuaW1wb3J0IHsgRXJyb3JSZW5kZXJlciB9IGZyb20gXCIuL2Vycm9yX3JlbmRlcmVyXCJcbmltcG9ydCB7IE1vcnBoUmVuZGVyZXIgfSBmcm9tIFwiLi9tb3JwaF9yZW5kZXJlclwiXG5pbXBvcnQgeyBQYWdlUmVuZGVyZXIgfSBmcm9tIFwiLi9wYWdlX3JlbmRlcmVyXCJcbmltcG9ydCB7IFBhZ2VTbmFwc2hvdCB9IGZyb20gXCIuL3BhZ2Vfc25hcHNob3RcIlxuaW1wb3J0IHsgU25hcHNob3RDYWNoZSB9IGZyb20gXCIuL3NuYXBzaG90X2NhY2hlXCJcblxuZXhwb3J0IGNsYXNzIFBhZ2VWaWV3IGV4dGVuZHMgVmlldyB7XG4gIHNuYXBzaG90Q2FjaGUgPSBuZXcgU25hcHNob3RDYWNoZSgxMClcbiAgbGFzdFJlbmRlcmVkTG9jYXRpb24gPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpXG4gIGZvcmNlUmVsb2FkZWQgPSBmYWxzZVxuXG4gIHNob3VsZFRyYW5zaXRpb25UbyhuZXdTbmFwc2hvdCkge1xuICAgIHJldHVybiB0aGlzLnNuYXBzaG90LnByZWZlcnNWaWV3VHJhbnNpdGlvbnMgJiYgbmV3U25hcHNob3QucHJlZmVyc1ZpZXdUcmFuc2l0aW9uc1xuICB9XG5cbiAgcmVuZGVyUGFnZShzbmFwc2hvdCwgaXNQcmV2aWV3ID0gZmFsc2UsIHdpbGxSZW5kZXIgPSB0cnVlLCB2aXNpdCkge1xuICAgIGNvbnN0IHNob3VsZE1vcnBoUGFnZSA9IHRoaXMuaXNQYWdlUmVmcmVzaCh2aXNpdCkgJiYgdGhpcy5zbmFwc2hvdC5zaG91bGRNb3JwaFBhZ2VcbiAgICBjb25zdCByZW5kZXJlckNsYXNzID0gc2hvdWxkTW9ycGhQYWdlID8gTW9ycGhSZW5kZXJlciA6IFBhZ2VSZW5kZXJlclxuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgcmVuZGVyZXJDbGFzcyh0aGlzLnNuYXBzaG90LCBzbmFwc2hvdCwgUGFnZVJlbmRlcmVyLnJlbmRlckVsZW1lbnQsIGlzUHJldmlldywgd2lsbFJlbmRlcilcblxuICAgIGlmICghcmVuZGVyZXIuc2hvdWxkUmVuZGVyKSB7XG4gICAgICB0aGlzLmZvcmNlUmVsb2FkZWQgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHZpc2l0Py5jaGFuZ2VIaXN0b3J5KClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZW5kZXIocmVuZGVyZXIpXG4gIH1cblxuICByZW5kZXJFcnJvcihzbmFwc2hvdCwgdmlzaXQpIHtcbiAgICB2aXNpdD8uY2hhbmdlSGlzdG9yeSgpXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgRXJyb3JSZW5kZXJlcih0aGlzLnNuYXBzaG90LCBzbmFwc2hvdCwgRXJyb3JSZW5kZXJlci5yZW5kZXJFbGVtZW50LCBmYWxzZSlcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIocmVuZGVyZXIpXG4gIH1cblxuICBjbGVhclNuYXBzaG90Q2FjaGUoKSB7XG4gICAgdGhpcy5zbmFwc2hvdENhY2hlLmNsZWFyKClcbiAgfVxuXG4gIGFzeW5jIGNhY2hlU25hcHNob3Qoc25hcHNob3QgPSB0aGlzLnNuYXBzaG90KSB7XG4gICAgaWYgKHNuYXBzaG90LmlzQ2FjaGVhYmxlKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnZpZXdXaWxsQ2FjaGVTbmFwc2hvdCgpXG4gICAgICBjb25zdCB7IGxhc3RSZW5kZXJlZExvY2F0aW9uOiBsb2NhdGlvbiB9ID0gdGhpc1xuICAgICAgYXdhaXQgbmV4dEV2ZW50TG9vcFRpY2soKVxuICAgICAgY29uc3QgY2FjaGVkU25hcHNob3QgPSBzbmFwc2hvdC5jbG9uZSgpXG4gICAgICB0aGlzLnNuYXBzaG90Q2FjaGUucHV0KGxvY2F0aW9uLCBjYWNoZWRTbmFwc2hvdClcbiAgICAgIHJldHVybiBjYWNoZWRTbmFwc2hvdFxuICAgIH1cbiAgfVxuXG4gIGdldENhY2hlZFNuYXBzaG90Rm9yTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5zbmFwc2hvdENhY2hlLmdldChsb2NhdGlvbilcbiAgfVxuXG4gIGlzUGFnZVJlZnJlc2godmlzaXQpIHtcbiAgICByZXR1cm4gIXZpc2l0IHx8ICh0aGlzLmxhc3RSZW5kZXJlZExvY2F0aW9uLnBhdGhuYW1lID09PSB2aXNpdC5sb2NhdGlvbi5wYXRobmFtZSAmJiB2aXNpdC5hY3Rpb24gPT09IFwicmVwbGFjZVwiKVxuICB9XG5cbiAgc2hvdWxkUHJlc2VydmVTY3JvbGxQb3NpdGlvbih2aXNpdCkge1xuICAgIHJldHVybiB0aGlzLmlzUGFnZVJlZnJlc2godmlzaXQpICYmIHRoaXMuc25hcHNob3Quc2hvdWxkUHJlc2VydmVTY3JvbGxQb3NpdGlvblxuICB9XG5cbiAgZ2V0IHNuYXBzaG90KCkge1xuICAgIHJldHVybiBQYWdlU25hcHNob3QuZnJvbUVsZW1lbnQodGhpcy5lbGVtZW50KVxuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFnZVNuYXBzaG90IH0gZnJvbSBcIi4vcGFnZV9zbmFwc2hvdFwiXG5pbXBvcnQgeyBGZXRjaE1ldGhvZCwgRmV0Y2hSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2h0dHAvZmV0Y2hfcmVxdWVzdFwiXG5cbmV4cG9ydCBjbGFzcyBQcmVsb2FkZXIge1xuICBzZWxlY3RvciA9IFwiYVtkYXRhLXR1cmJvLXByZWxvYWRdXCJcblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgc25hcHNob3RDYWNoZSkge1xuICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgIHRoaXMuc25hcHNob3RDYWNoZSA9IHNuYXBzaG90Q2FjaGVcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIikge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgdGhpcy4jcHJlbG9hZEFsbClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVsb2FkT25Mb2FkTGlua3NGb3JWaWV3KGRvY3VtZW50LmJvZHkpXG4gICAgfVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCB0aGlzLiNwcmVsb2FkQWxsKVxuICB9XG5cbiAgcHJlbG9hZE9uTG9hZExpbmtzRm9yVmlldyhlbGVtZW50KSB7XG4gICAgZm9yIChjb25zdCBsaW5rIG9mIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc2hvdWxkUHJlbG9hZExpbmsobGluaykpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkVVJMKGxpbmspXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcHJlbG9hZFVSTChsaW5rKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBuZXcgVVJMKGxpbmsuaHJlZilcblxuICAgIGlmICh0aGlzLnNuYXBzaG90Q2FjaGUuaGFzKGxvY2F0aW9uKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZmV0Y2hSZXF1ZXN0ID0gbmV3IEZldGNoUmVxdWVzdCh0aGlzLCBGZXRjaE1ldGhvZC5nZXQsIGxvY2F0aW9uLCBuZXcgVVJMU2VhcmNoUGFyYW1zKCksIGxpbmspXG4gICAgYXdhaXQgZmV0Y2hSZXF1ZXN0LnBlcmZvcm0oKVxuICB9XG5cbiAgLy8gRmV0Y2ggcmVxdWVzdCBkZWxlZ2F0ZVxuXG4gIHByZXBhcmVSZXF1ZXN0KGZldGNoUmVxdWVzdCkge1xuICAgIGZldGNoUmVxdWVzdC5oZWFkZXJzW1wiWC1TZWMtUHVycG9zZVwiXSA9IFwicHJlZmV0Y2hcIlxuICB9XG5cbiAgYXN5bmMgcmVxdWVzdFN1Y2NlZWRlZFdpdGhSZXNwb25zZShmZXRjaFJlcXVlc3QsIGZldGNoUmVzcG9uc2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2VIVE1MID0gYXdhaXQgZmV0Y2hSZXNwb25zZS5yZXNwb25zZUhUTUxcbiAgICAgIGNvbnN0IHNuYXBzaG90ID0gUGFnZVNuYXBzaG90LmZyb21IVE1MU3RyaW5nKHJlc3BvbnNlSFRNTClcblxuICAgICAgdGhpcy5zbmFwc2hvdENhY2hlLnB1dChmZXRjaFJlcXVlc3QudXJsLCBzbmFwc2hvdClcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAvLyBJZiB3ZSBjYW5ub3QgcHJlbG9hZCB0aGF0IGlzIG9rIVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RTdGFydGVkKGZldGNoUmVxdWVzdCkge31cblxuICByZXF1ZXN0RXJyb3JlZChmZXRjaFJlcXVlc3QpIHt9XG5cbiAgcmVxdWVzdEZpbmlzaGVkKGZldGNoUmVxdWVzdCkge31cblxuICByZXF1ZXN0UHJldmVudGVkSGFuZGxpbmdSZXNwb25zZShmZXRjaFJlcXVlc3QsIGZldGNoUmVzcG9uc2UpIHt9XG5cbiAgcmVxdWVzdEZhaWxlZFdpdGhSZXNwb25zZShmZXRjaFJlcXVlc3QsIGZldGNoUmVzcG9uc2UpIHt9XG5cbiAgI3ByZWxvYWRBbGwgPSAoKSA9PiB7XG4gICAgdGhpcy5wcmVsb2FkT25Mb2FkTGlua3NGb3JWaWV3KGRvY3VtZW50LmJvZHkpXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBzZXRNZXRhQ29udGVudCB9IGZyb20gXCIuLi91dGlsXCJcblxuZXhwb3J0IGNsYXNzIENhY2hlIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbikge1xuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb25cbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuc2Vzc2lvbi5jbGVhckNhY2hlKClcbiAgfVxuXG4gIHJlc2V0Q2FjaGVDb250cm9sKCkge1xuICAgIHRoaXMuI3NldENhY2hlQ29udHJvbChcIlwiKVxuICB9XG5cbiAgZXhlbXB0UGFnZUZyb21DYWNoZSgpIHtcbiAgICB0aGlzLiNzZXRDYWNoZUNvbnRyb2woXCJuby1jYWNoZVwiKVxuICB9XG5cbiAgZXhlbXB0UGFnZUZyb21QcmV2aWV3KCkge1xuICAgIHRoaXMuI3NldENhY2hlQ29udHJvbChcIm5vLXByZXZpZXdcIilcbiAgfVxuXG4gICNzZXRDYWNoZUNvbnRyb2wodmFsdWUpIHtcbiAgICBzZXRNZXRhQ29udGVudChcInR1cmJvLWNhY2hlLWNvbnRyb2xcIiwgdmFsdWUpXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBCcm93c2VyQWRhcHRlciB9IGZyb20gXCIuL25hdGl2ZS9icm93c2VyX2FkYXB0ZXJcIlxuaW1wb3J0IHsgQ2FjaGVPYnNlcnZlciB9IGZyb20gXCIuLi9vYnNlcnZlcnMvY2FjaGVfb2JzZXJ2ZXJcIlxuaW1wb3J0IHsgRm9ybVN1Ym1pdE9ic2VydmVyIH0gZnJvbSBcIi4uL29ic2VydmVycy9mb3JtX3N1Ym1pdF9vYnNlcnZlclwiXG5pbXBvcnQgeyBGcmFtZVJlZGlyZWN0b3IgfSBmcm9tIFwiLi9mcmFtZXMvZnJhbWVfcmVkaXJlY3RvclwiXG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSBcIi4vZHJpdmUvaGlzdG9yeVwiXG5pbXBvcnQgeyBMaW5rUHJlZmV0Y2hPYnNlcnZlciB9IGZyb20gXCIuLi9vYnNlcnZlcnMvbGlua19wcmVmZXRjaF9vYnNlcnZlclwiXG5pbXBvcnQgeyBMaW5rQ2xpY2tPYnNlcnZlciB9IGZyb20gXCIuLi9vYnNlcnZlcnMvbGlua19jbGlja19vYnNlcnZlclwiXG5pbXBvcnQgeyBGb3JtTGlua0NsaWNrT2JzZXJ2ZXIgfSBmcm9tIFwiLi4vb2JzZXJ2ZXJzL2Zvcm1fbGlua19jbGlja19vYnNlcnZlclwiXG5pbXBvcnQgeyBnZXRBY3Rpb24sIGV4cGFuZFVSTCwgbG9jYXRpb25Jc1Zpc2l0YWJsZSB9IGZyb20gXCIuL3VybFwiXG5pbXBvcnQgeyBOYXZpZ2F0b3IgfSBmcm9tIFwiLi9kcml2ZS9uYXZpZ2F0b3JcIlxuaW1wb3J0IHsgUGFnZU9ic2VydmVyIH0gZnJvbSBcIi4uL29ic2VydmVycy9wYWdlX29ic2VydmVyXCJcbmltcG9ydCB7IFNjcm9sbE9ic2VydmVyIH0gZnJvbSBcIi4uL29ic2VydmVycy9zY3JvbGxfb2JzZXJ2ZXJcIlxuaW1wb3J0IHsgU3RyZWFtTWVzc2FnZSB9IGZyb20gXCIuL3N0cmVhbXMvc3RyZWFtX21lc3NhZ2VcIlxuaW1wb3J0IHsgU3RyZWFtTWVzc2FnZVJlbmRlcmVyIH0gZnJvbSBcIi4vc3RyZWFtcy9zdHJlYW1fbWVzc2FnZV9yZW5kZXJlclwiXG5pbXBvcnQgeyBTdHJlYW1PYnNlcnZlciB9IGZyb20gXCIuLi9vYnNlcnZlcnMvc3RyZWFtX29ic2VydmVyXCJcbmltcG9ydCB7IGNsZWFyQnVzeVN0YXRlLCBkaXNwYXRjaCwgZmluZENsb3Nlc3RSZWN1cnNpdmVseSwgZ2V0VmlzaXRBY3Rpb24sIG1hcmtBc0J1c3ksIGRlYm91bmNlIH0gZnJvbSBcIi4uL3V0aWxcIlxuaW1wb3J0IHsgUGFnZVZpZXcgfSBmcm9tIFwiLi9kcml2ZS9wYWdlX3ZpZXdcIlxuaW1wb3J0IHsgRnJhbWVFbGVtZW50IH0gZnJvbSBcIi4uL2VsZW1lbnRzL2ZyYW1lX2VsZW1lbnRcIlxuaW1wb3J0IHsgUHJlbG9hZGVyIH0gZnJvbSBcIi4vZHJpdmUvcHJlbG9hZGVyXCJcbmltcG9ydCB7IENhY2hlIH0gZnJvbSBcIi4vY2FjaGVcIlxuXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiB7XG4gIG5hdmlnYXRvciA9IG5ldyBOYXZpZ2F0b3IodGhpcylcbiAgaGlzdG9yeSA9IG5ldyBIaXN0b3J5KHRoaXMpXG4gIHZpZXcgPSBuZXcgUGFnZVZpZXcodGhpcywgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICBhZGFwdGVyID0gbmV3IEJyb3dzZXJBZGFwdGVyKHRoaXMpXG5cbiAgcGFnZU9ic2VydmVyID0gbmV3IFBhZ2VPYnNlcnZlcih0aGlzKVxuICBjYWNoZU9ic2VydmVyID0gbmV3IENhY2hlT2JzZXJ2ZXIoKVxuICBsaW5rUHJlZmV0Y2hPYnNlcnZlciA9IG5ldyBMaW5rUHJlZmV0Y2hPYnNlcnZlcih0aGlzLCBkb2N1bWVudClcbiAgbGlua0NsaWNrT2JzZXJ2ZXIgPSBuZXcgTGlua0NsaWNrT2JzZXJ2ZXIodGhpcywgd2luZG93KVxuICBmb3JtU3VibWl0T2JzZXJ2ZXIgPSBuZXcgRm9ybVN1Ym1pdE9ic2VydmVyKHRoaXMsIGRvY3VtZW50KVxuICBzY3JvbGxPYnNlcnZlciA9IG5ldyBTY3JvbGxPYnNlcnZlcih0aGlzKVxuICBzdHJlYW1PYnNlcnZlciA9IG5ldyBTdHJlYW1PYnNlcnZlcih0aGlzKVxuICBmb3JtTGlua0NsaWNrT2JzZXJ2ZXIgPSBuZXcgRm9ybUxpbmtDbGlja09ic2VydmVyKHRoaXMsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcbiAgZnJhbWVSZWRpcmVjdG9yID0gbmV3IEZyYW1lUmVkaXJlY3Rvcih0aGlzLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gIHN0cmVhbU1lc3NhZ2VSZW5kZXJlciA9IG5ldyBTdHJlYW1NZXNzYWdlUmVuZGVyZXIoKVxuICBjYWNoZSA9IG5ldyBDYWNoZSh0aGlzKVxuXG4gIGRyaXZlID0gdHJ1ZVxuICBlbmFibGVkID0gdHJ1ZVxuICBwcm9ncmVzc0JhckRlbGF5ID0gNTAwXG4gIHN0YXJ0ZWQgPSBmYWxzZVxuICBmb3JtTW9kZSA9IFwib25cIlxuICAjcGFnZVJlZnJlc2hEZWJvdW5jZVBlcmlvZCA9IDE1MFxuXG4gIGNvbnN0cnVjdG9yKHJlY2VudFJlcXVlc3RzKSB7XG4gICAgdGhpcy5yZWNlbnRSZXF1ZXN0cyA9IHJlY2VudFJlcXVlc3RzXG4gICAgdGhpcy5wcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyKHRoaXMsIHRoaXMudmlldy5zbmFwc2hvdENhY2hlKVxuICAgIHRoaXMuZGVib3VuY2VkUmVmcmVzaCA9IHRoaXMucmVmcmVzaFxuICAgIHRoaXMucGFnZVJlZnJlc2hEZWJvdW5jZVBlcmlvZCA9IHRoaXMucGFnZVJlZnJlc2hEZWJvdW5jZVBlcmlvZFxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMucGFnZU9ic2VydmVyLnN0YXJ0KClcbiAgICAgIHRoaXMuY2FjaGVPYnNlcnZlci5zdGFydCgpXG4gICAgICB0aGlzLmxpbmtQcmVmZXRjaE9ic2VydmVyLnN0YXJ0KClcbiAgICAgIHRoaXMuZm9ybUxpbmtDbGlja09ic2VydmVyLnN0YXJ0KClcbiAgICAgIHRoaXMubGlua0NsaWNrT2JzZXJ2ZXIuc3RhcnQoKVxuICAgICAgdGhpcy5mb3JtU3VibWl0T2JzZXJ2ZXIuc3RhcnQoKVxuICAgICAgdGhpcy5zY3JvbGxPYnNlcnZlci5zdGFydCgpXG4gICAgICB0aGlzLnN0cmVhbU9ic2VydmVyLnN0YXJ0KClcbiAgICAgIHRoaXMuZnJhbWVSZWRpcmVjdG9yLnN0YXJ0KClcbiAgICAgIHRoaXMuaGlzdG9yeS5zdGFydCgpXG4gICAgICB0aGlzLnByZWxvYWRlci5zdGFydCgpXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlXG4gICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLnBhZ2VPYnNlcnZlci5zdG9wKClcbiAgICAgIHRoaXMuY2FjaGVPYnNlcnZlci5zdG9wKClcbiAgICAgIHRoaXMubGlua1ByZWZldGNoT2JzZXJ2ZXIuc3RvcCgpXG4gICAgICB0aGlzLmZvcm1MaW5rQ2xpY2tPYnNlcnZlci5zdG9wKClcbiAgICAgIHRoaXMubGlua0NsaWNrT2JzZXJ2ZXIuc3RvcCgpXG4gICAgICB0aGlzLmZvcm1TdWJtaXRPYnNlcnZlci5zdG9wKClcbiAgICAgIHRoaXMuc2Nyb2xsT2JzZXJ2ZXIuc3RvcCgpXG4gICAgICB0aGlzLnN0cmVhbU9ic2VydmVyLnN0b3AoKVxuICAgICAgdGhpcy5mcmFtZVJlZGlyZWN0b3Iuc3RvcCgpXG4gICAgICB0aGlzLmhpc3Rvcnkuc3RvcCgpXG4gICAgICB0aGlzLnByZWxvYWRlci5zdG9wKClcbiAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJBZGFwdGVyKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmFkYXB0ZXIgPSBhZGFwdGVyXG4gIH1cblxuICB2aXNpdChsb2NhdGlvbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZnJhbWVFbGVtZW50ID0gb3B0aW9ucy5mcmFtZSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdGlvbnMuZnJhbWUpIDogbnVsbFxuXG4gICAgaWYgKGZyYW1lRWxlbWVudCBpbnN0YW5jZW9mIEZyYW1lRWxlbWVudCkge1xuICAgICAgY29uc3QgYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gfHwgZ2V0VmlzaXRBY3Rpb24oZnJhbWVFbGVtZW50KVxuXG4gICAgICBmcmFtZUVsZW1lbnQuZGVsZWdhdGUucHJvcG9zZVZpc2l0SWZOYXZpZ2F0ZWRXaXRoQWN0aW9uKGZyYW1lRWxlbWVudCwgYWN0aW9uKVxuICAgICAgZnJhbWVFbGVtZW50LnNyYyA9IGxvY2F0aW9uLnRvU3RyaW5nKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZpZ2F0b3IucHJvcG9zZVZpc2l0KGV4cGFuZFVSTChsb2NhdGlvbiksIG9wdGlvbnMpXG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaCh1cmwsIHJlcXVlc3RJZCkge1xuICAgIGNvbnN0IGlzUmVjZW50UmVxdWVzdCA9IHJlcXVlc3RJZCAmJiB0aGlzLnJlY2VudFJlcXVlc3RzLmhhcyhyZXF1ZXN0SWQpXG4gICAgaWYgKCFpc1JlY2VudFJlcXVlc3QpIHtcbiAgICAgIHRoaXMudmlzaXQodXJsLCB7IGFjdGlvbjogXCJyZXBsYWNlXCIsIHNob3VsZENhY2hlU25hcHNob3Q6IGZhbHNlIH0pXG4gICAgfVxuICB9XG5cbiAgY29ubmVjdFN0cmVhbVNvdXJjZShzb3VyY2UpIHtcbiAgICB0aGlzLnN0cmVhbU9ic2VydmVyLmNvbm5lY3RTdHJlYW1Tb3VyY2Uoc291cmNlKVxuICB9XG5cbiAgZGlzY29ubmVjdFN0cmVhbVNvdXJjZShzb3VyY2UpIHtcbiAgICB0aGlzLnN0cmVhbU9ic2VydmVyLmRpc2Nvbm5lY3RTdHJlYW1Tb3VyY2Uoc291cmNlKVxuICB9XG5cbiAgcmVuZGVyU3RyZWFtTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdGhpcy5zdHJlYW1NZXNzYWdlUmVuZGVyZXIucmVuZGVyKFN0cmVhbU1lc3NhZ2Uud3JhcChtZXNzYWdlKSlcbiAgfVxuXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy52aWV3LmNsZWFyU25hcHNob3RDYWNoZSgpXG4gIH1cblxuICBzZXRQcm9ncmVzc0JhckRlbGF5KGRlbGF5KSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhckRlbGF5ID0gZGVsYXlcbiAgfVxuXG4gIHNldEZvcm1Nb2RlKG1vZGUpIHtcbiAgICB0aGlzLmZvcm1Nb2RlID0gbW9kZVxuICB9XG5cbiAgZ2V0IGxvY2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnkubG9jYXRpb25cbiAgfVxuXG4gIGdldCByZXN0b3JhdGlvbklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeS5yZXN0b3JhdGlvbklkZW50aWZpZXJcbiAgfVxuXG4gIGdldCBwYWdlUmVmcmVzaERlYm91bmNlUGVyaW9kKCkge1xuICAgIHJldHVybiB0aGlzLiNwYWdlUmVmcmVzaERlYm91bmNlUGVyaW9kXG4gIH1cblxuICBzZXQgcGFnZVJlZnJlc2hEZWJvdW5jZVBlcmlvZCh2YWx1ZSkge1xuICAgIHRoaXMucmVmcmVzaCA9IGRlYm91bmNlKHRoaXMuZGVib3VuY2VkUmVmcmVzaC5iaW5kKHRoaXMpLCB2YWx1ZSlcbiAgICB0aGlzLiNwYWdlUmVmcmVzaERlYm91bmNlUGVyaW9kID0gdmFsdWVcbiAgfVxuXG4gIC8vIFByZWxvYWRlciBkZWxlZ2F0ZVxuXG4gIHNob3VsZFByZWxvYWRMaW5rKGVsZW1lbnQpIHtcbiAgICBjb25zdCBpc1Vuc2FmZSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS10dXJiby1tZXRob2RcIilcbiAgICBjb25zdCBpc1N0cmVhbSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS10dXJiby1zdHJlYW1cIilcbiAgICBjb25zdCBmcmFtZVRhcmdldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby1mcmFtZVwiKVxuICAgIGNvbnN0IGZyYW1lID0gZnJhbWVUYXJnZXQgPT0gXCJfdG9wXCIgP1xuICAgICAgbnVsbCA6XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmcmFtZVRhcmdldCkgfHwgZmluZENsb3Nlc3RSZWN1cnNpdmVseShlbGVtZW50LCBcInR1cmJvLWZyYW1lOm5vdChbZGlzYWJsZWRdKVwiKVxuXG4gICAgaWYgKGlzVW5zYWZlIHx8IGlzU3RyZWFtIHx8IGZyYW1lIGluc3RhbmNlb2YgRnJhbWVFbGVtZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBuZXcgVVJMKGVsZW1lbnQuaHJlZilcblxuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudElzTmF2aWdhdGFibGUoZWxlbWVudCkgJiYgbG9jYXRpb25Jc1Zpc2l0YWJsZShsb2NhdGlvbiwgdGhpcy5zbmFwc2hvdC5yb290TG9jYXRpb24pXG4gICAgfVxuICB9XG5cbiAgLy8gSGlzdG9yeSBkZWxlZ2F0ZVxuXG4gIGhpc3RvcnlQb3BwZWRUb0xvY2F0aW9uV2l0aFJlc3RvcmF0aW9uSWRlbnRpZmllckFuZERpcmVjdGlvbihsb2NhdGlvbiwgcmVzdG9yYXRpb25JZGVudGlmaWVyLCBkaXJlY3Rpb24pIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLm5hdmlnYXRvci5zdGFydFZpc2l0KGxvY2F0aW9uLCByZXN0b3JhdGlvbklkZW50aWZpZXIsIHtcbiAgICAgICAgYWN0aW9uOiBcInJlc3RvcmVcIixcbiAgICAgICAgaGlzdG9yeUNoYW5nZWQ6IHRydWUsXG4gICAgICAgIGRpcmVjdGlvblxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyLnBhZ2VJbnZhbGlkYXRlZCh7XG4gICAgICAgIHJlYXNvbjogXCJ0dXJib19kaXNhYmxlZFwiXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIFNjcm9sbCBvYnNlcnZlciBkZWxlZ2F0ZVxuXG4gIHNjcm9sbFBvc2l0aW9uQ2hhbmdlZChwb3NpdGlvbikge1xuICAgIHRoaXMuaGlzdG9yeS51cGRhdGVSZXN0b3JhdGlvbkRhdGEoeyBzY3JvbGxQb3NpdGlvbjogcG9zaXRpb24gfSlcbiAgfVxuXG4gIC8vIEZvcm0gY2xpY2sgb2JzZXJ2ZXIgZGVsZWdhdGVcblxuICB3aWxsU3VibWl0Rm9ybUxpbmtUb0xvY2F0aW9uKGxpbmssIGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudElzTmF2aWdhdGFibGUobGluaykgJiYgbG9jYXRpb25Jc1Zpc2l0YWJsZShsb2NhdGlvbiwgdGhpcy5zbmFwc2hvdC5yb290TG9jYXRpb24pXG4gIH1cblxuICBzdWJtaXR0ZWRGb3JtTGlua1RvTG9jYXRpb24oKSB7fVxuXG4gIC8vIExpbmsgaG92ZXIgb2JzZXJ2ZXIgZGVsZWdhdGVcblxuICBjYW5QcmVmZXRjaFJlcXVlc3RUb0xvY2F0aW9uKGxpbmssIGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZWxlbWVudElzTmF2aWdhdGFibGUobGluaykgJiZcbiAgICAgICAgbG9jYXRpb25Jc1Zpc2l0YWJsZShsb2NhdGlvbiwgdGhpcy5zbmFwc2hvdC5yb290TG9jYXRpb24pXG4gICAgKVxuICB9XG5cbiAgLy8gTGluayBjbGljayBvYnNlcnZlciBkZWxlZ2F0ZVxuXG4gIHdpbGxGb2xsb3dMaW5rVG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbiwgZXZlbnQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5lbGVtZW50SXNOYXZpZ2F0YWJsZShsaW5rKSAmJlxuICAgICAgbG9jYXRpb25Jc1Zpc2l0YWJsZShsb2NhdGlvbiwgdGhpcy5zbmFwc2hvdC5yb290TG9jYXRpb24pICYmXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uQWxsb3dzRm9sbG93aW5nTGlua1RvTG9jYXRpb24obGluaywgbG9jYXRpb24sIGV2ZW50KVxuICAgIClcbiAgfVxuXG4gIGZvbGxvd2VkTGlua1RvTG9jYXRpb24obGluaywgbG9jYXRpb24pIHtcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmdldEFjdGlvbkZvckxpbmsobGluaylcbiAgICBjb25zdCBhY2NlcHRzU3RyZWFtUmVzcG9uc2UgPSBsaW5rLmhhc0F0dHJpYnV0ZShcImRhdGEtdHVyYm8tc3RyZWFtXCIpXG5cbiAgICB0aGlzLnZpc2l0KGxvY2F0aW9uLmhyZWYsIHsgYWN0aW9uLCBhY2NlcHRzU3RyZWFtUmVzcG9uc2UgfSlcbiAgfVxuXG4gIC8vIE5hdmlnYXRvciBkZWxlZ2F0ZVxuXG4gIGFsbG93c1Zpc2l0aW5nTG9jYXRpb25XaXRoQWN0aW9uKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbldpdGhBY3Rpb25Jc1NhbWVQYWdlKGxvY2F0aW9uLCBhY3Rpb24pIHx8IHRoaXMuYXBwbGljYXRpb25BbGxvd3NWaXNpdGluZ0xvY2F0aW9uKGxvY2F0aW9uKVxuICB9XG5cbiAgdmlzaXRQcm9wb3NlZFRvTG9jYXRpb24obG9jYXRpb24sIG9wdGlvbnMpIHtcbiAgICBleHRlbmRVUkxXaXRoRGVwcmVjYXRlZFByb3BlcnRpZXMobG9jYXRpb24pXG4gICAgdGhpcy5hZGFwdGVyLnZpc2l0UHJvcG9zZWRUb0xvY2F0aW9uKGxvY2F0aW9uLCBvcHRpb25zKVxuICB9XG5cbiAgLy8gVmlzaXQgZGVsZWdhdGVcblxuICB2aXNpdFN0YXJ0ZWQodmlzaXQpIHtcbiAgICBpZiAoIXZpc2l0LmFjY2VwdHNTdHJlYW1SZXNwb25zZSkge1xuICAgICAgbWFya0FzQnVzeShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gICAgICB0aGlzLnZpZXcubWFya1Zpc2l0RGlyZWN0aW9uKHZpc2l0LmRpcmVjdGlvbilcbiAgICB9XG4gICAgZXh0ZW5kVVJMV2l0aERlcHJlY2F0ZWRQcm9wZXJ0aWVzKHZpc2l0LmxvY2F0aW9uKVxuICAgIGlmICghdmlzaXQuc2lsZW50KSB7XG4gICAgICB0aGlzLm5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJWaXNpdGluZ0xvY2F0aW9uKHZpc2l0LmxvY2F0aW9uLCB2aXNpdC5hY3Rpb24pXG4gICAgfVxuICB9XG5cbiAgdmlzaXRDb21wbGV0ZWQodmlzaXQpIHtcbiAgICB0aGlzLnZpZXcudW5tYXJrVmlzaXREaXJlY3Rpb24oKVxuICAgIGNsZWFyQnVzeVN0YXRlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcbiAgICB0aGlzLm5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJQYWdlTG9hZCh2aXNpdC5nZXRUaW1pbmdNZXRyaWNzKCkpXG4gIH1cblxuICBsb2NhdGlvbldpdGhBY3Rpb25Jc1NhbWVQYWdlKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0b3IubG9jYXRpb25XaXRoQWN0aW9uSXNTYW1lUGFnZShsb2NhdGlvbiwgYWN0aW9uKVxuICB9XG5cbiAgdmlzaXRTY3JvbGxlZFRvU2FtZVBhZ2VMb2NhdGlvbihvbGRVUkwsIG5ld1VSTCkge1xuICAgIHRoaXMubm90aWZ5QXBwbGljYXRpb25BZnRlclZpc2l0aW5nU2FtZVBhZ2VMb2NhdGlvbihvbGRVUkwsIG5ld1VSTClcbiAgfVxuXG4gIC8vIEZvcm0gc3VibWl0IG9ic2VydmVyIGRlbGVnYXRlXG5cbiAgd2lsbFN1Ym1pdEZvcm0oZm9ybSwgc3VibWl0dGVyKSB7XG4gICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKGZvcm0sIHN1Ym1pdHRlcilcblxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN1Ym1pc3Npb25Jc05hdmlnYXRhYmxlKGZvcm0sIHN1Ym1pdHRlcikgJiZcbiAgICAgIGxvY2F0aW9uSXNWaXNpdGFibGUoZXhwYW5kVVJMKGFjdGlvbiksIHRoaXMuc25hcHNob3Qucm9vdExvY2F0aW9uKVxuICAgIClcbiAgfVxuXG4gIGZvcm1TdWJtaXR0ZWQoZm9ybSwgc3VibWl0dGVyKSB7XG4gICAgdGhpcy5uYXZpZ2F0b3Iuc3VibWl0Rm9ybShmb3JtLCBzdWJtaXR0ZXIpXG4gIH1cblxuICAvLyBQYWdlIG9ic2VydmVyIGRlbGVnYXRlXG5cbiAgcGFnZUJlY2FtZUludGVyYWN0aXZlKCkge1xuICAgIHRoaXMudmlldy5sYXN0UmVuZGVyZWRMb2NhdGlvbiA9IHRoaXMubG9jYXRpb25cbiAgICB0aGlzLm5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJQYWdlTG9hZCgpXG4gIH1cblxuICBwYWdlTG9hZGVkKCkge1xuICAgIHRoaXMuaGlzdG9yeS5hc3N1bWVDb250cm9sT2ZTY3JvbGxSZXN0b3JhdGlvbigpXG4gIH1cblxuICBwYWdlV2lsbFVubG9hZCgpIHtcbiAgICB0aGlzLmhpc3RvcnkucmVsaW5xdWlzaENvbnRyb2xPZlNjcm9sbFJlc3RvcmF0aW9uKClcbiAgfVxuXG4gIC8vIFN0cmVhbSBvYnNlcnZlciBkZWxlZ2F0ZVxuXG4gIHJlY2VpdmVkTWVzc2FnZUZyb21TdHJlYW0obWVzc2FnZSkge1xuICAgIHRoaXMucmVuZGVyU3RyZWFtTWVzc2FnZShtZXNzYWdlKVxuICB9XG5cbiAgLy8gUGFnZSB2aWV3IGRlbGVnYXRlXG5cbiAgdmlld1dpbGxDYWNoZVNuYXBzaG90KCkge1xuICAgIGlmICghdGhpcy5uYXZpZ2F0b3IuY3VycmVudFZpc2l0Py5zaWxlbnQpIHtcbiAgICAgIHRoaXMubm90aWZ5QXBwbGljYXRpb25CZWZvcmVDYWNoaW5nU25hcHNob3QoKVxuICAgIH1cbiAgfVxuXG4gIGFsbG93c0ltbWVkaWF0ZVJlbmRlcih7IGVsZW1lbnQgfSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ub3RpZnlBcHBsaWNhdGlvbkJlZm9yZVJlbmRlcihlbGVtZW50LCBvcHRpb25zKVxuICAgIGNvbnN0IHtcbiAgICAgIGRlZmF1bHRQcmV2ZW50ZWQsXG4gICAgICBkZXRhaWw6IHsgcmVuZGVyIH1cbiAgICB9ID0gZXZlbnRcblxuICAgIGlmICh0aGlzLnZpZXcucmVuZGVyZXIgJiYgcmVuZGVyKSB7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyZXIucmVuZGVyRWxlbWVudCA9IHJlbmRlclxuICAgIH1cblxuICAgIHJldHVybiAhZGVmYXVsdFByZXZlbnRlZFxuICB9XG5cbiAgdmlld1JlbmRlcmVkU25hcHNob3QoX3NuYXBzaG90LCBfaXNQcmV2aWV3LCByZW5kZXJNZXRob2QpIHtcbiAgICB0aGlzLnZpZXcubGFzdFJlbmRlcmVkTG9jYXRpb24gPSB0aGlzLmhpc3RvcnkubG9jYXRpb25cbiAgICB0aGlzLm5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJSZW5kZXIocmVuZGVyTWV0aG9kKVxuICB9XG5cbiAgcHJlbG9hZE9uTG9hZExpbmtzRm9yVmlldyhlbGVtZW50KSB7XG4gICAgdGhpcy5wcmVsb2FkZXIucHJlbG9hZE9uTG9hZExpbmtzRm9yVmlldyhlbGVtZW50KVxuICB9XG5cbiAgdmlld0ludmFsaWRhdGVkKHJlYXNvbikge1xuICAgIHRoaXMuYWRhcHRlci5wYWdlSW52YWxpZGF0ZWQocmVhc29uKVxuICB9XG5cbiAgLy8gRnJhbWUgZWxlbWVudFxuXG4gIGZyYW1lTG9hZGVkKGZyYW1lKSB7XG4gICAgdGhpcy5ub3RpZnlBcHBsaWNhdGlvbkFmdGVyRnJhbWVMb2FkKGZyYW1lKVxuICB9XG5cbiAgZnJhbWVSZW5kZXJlZChmZXRjaFJlc3BvbnNlLCBmcmFtZSkge1xuICAgIHRoaXMubm90aWZ5QXBwbGljYXRpb25BZnRlckZyYW1lUmVuZGVyKGZldGNoUmVzcG9uc2UsIGZyYW1lKVxuICB9XG5cbiAgLy8gQXBwbGljYXRpb24gZXZlbnRzXG5cbiAgYXBwbGljYXRpb25BbGxvd3NGb2xsb3dpbmdMaW5rVG9Mb2NhdGlvbihsaW5rLCBsb2NhdGlvbiwgZXYpIHtcbiAgICBjb25zdCBldmVudCA9IHRoaXMubm90aWZ5QXBwbGljYXRpb25BZnRlckNsaWNraW5nTGlua1RvTG9jYXRpb24obGluaywgbG9jYXRpb24sIGV2KVxuICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZFxuICB9XG5cbiAgYXBwbGljYXRpb25BbGxvd3NWaXNpdGluZ0xvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLm5vdGlmeUFwcGxpY2F0aW9uQmVmb3JlVmlzaXRpbmdMb2NhdGlvbihsb2NhdGlvbilcbiAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcbiAgfVxuXG4gIG5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJDbGlja2luZ0xpbmtUb0xvY2F0aW9uKGxpbmssIGxvY2F0aW9uLCBldmVudCkge1xuICAgIHJldHVybiBkaXNwYXRjaChcInR1cmJvOmNsaWNrXCIsIHtcbiAgICAgIHRhcmdldDogbGluayxcbiAgICAgIGRldGFpbDogeyB1cmw6IGxvY2F0aW9uLmhyZWYsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0sXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIG5vdGlmeUFwcGxpY2F0aW9uQmVmb3JlVmlzaXRpbmdMb2NhdGlvbihsb2NhdGlvbikge1xuICAgIHJldHVybiBkaXNwYXRjaChcInR1cmJvOmJlZm9yZS12aXNpdFwiLCB7XG4gICAgICBkZXRhaWw6IHsgdXJsOiBsb2NhdGlvbi5ocmVmIH0sXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIG5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJWaXNpdGluZ0xvY2F0aW9uKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goXCJ0dXJibzp2aXNpdFwiLCB7IGRldGFpbDogeyB1cmw6IGxvY2F0aW9uLmhyZWYsIGFjdGlvbiB9IH0pXG4gIH1cblxuICBub3RpZnlBcHBsaWNhdGlvbkJlZm9yZUNhY2hpbmdTbmFwc2hvdCgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goXCJ0dXJibzpiZWZvcmUtY2FjaGVcIilcbiAgfVxuXG4gIG5vdGlmeUFwcGxpY2F0aW9uQmVmb3JlUmVuZGVyKG5ld0JvZHksIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goXCJ0dXJibzpiZWZvcmUtcmVuZGVyXCIsIHtcbiAgICAgIGRldGFpbDogeyBuZXdCb2R5LCAuLi5vcHRpb25zIH0sXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIG5vdGlmeUFwcGxpY2F0aW9uQWZ0ZXJSZW5kZXIocmVuZGVyTWV0aG9kKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKFwidHVyYm86cmVuZGVyXCIsIHsgZGV0YWlsOiB7IHJlbmRlck1ldGhvZCB9IH0pXG4gIH1cblxuICBub3RpZnlBcHBsaWNhdGlvbkFmdGVyUGFnZUxvYWQodGltaW5nID0ge30pIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goXCJ0dXJibzpsb2FkXCIsIHtcbiAgICAgIGRldGFpbDogeyB1cmw6IHRoaXMubG9jYXRpb24uaHJlZiwgdGltaW5nIH1cbiAgICB9KVxuICB9XG5cbiAgbm90aWZ5QXBwbGljYXRpb25BZnRlclZpc2l0aW5nU2FtZVBhZ2VMb2NhdGlvbihvbGRVUkwsIG5ld1VSTCkge1xuICAgIGRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgSGFzaENoYW5nZUV2ZW50KFwiaGFzaGNoYW5nZVwiLCB7XG4gICAgICAgIG9sZFVSTDogb2xkVVJMLnRvU3RyaW5nKCksXG4gICAgICAgIG5ld1VSTDogbmV3VVJMLnRvU3RyaW5nKClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgbm90aWZ5QXBwbGljYXRpb25BZnRlckZyYW1lTG9hZChmcmFtZSkge1xuICAgIHJldHVybiBkaXNwYXRjaChcInR1cmJvOmZyYW1lLWxvYWRcIiwgeyB0YXJnZXQ6IGZyYW1lIH0pXG4gIH1cblxuICBub3RpZnlBcHBsaWNhdGlvbkFmdGVyRnJhbWVSZW5kZXIoZmV0Y2hSZXNwb25zZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goXCJ0dXJibzpmcmFtZS1yZW5kZXJcIiwge1xuICAgICAgZGV0YWlsOiB7IGZldGNoUmVzcG9uc2UgfSxcbiAgICAgIHRhcmdldDogZnJhbWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIC8vIEhlbHBlcnNcblxuICBzdWJtaXNzaW9uSXNOYXZpZ2F0YWJsZShmb3JtLCBzdWJtaXR0ZXIpIHtcbiAgICBpZiAodGhpcy5mb3JtTW9kZSA9PSBcIm9mZlwiKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3VibWl0dGVySXNOYXZpZ2F0YWJsZSA9IHN1Ym1pdHRlciA/IHRoaXMuZWxlbWVudElzTmF2aWdhdGFibGUoc3VibWl0dGVyKSA6IHRydWVcblxuICAgICAgaWYgKHRoaXMuZm9ybU1vZGUgPT0gXCJvcHRpblwiKSB7XG4gICAgICAgIHJldHVybiBzdWJtaXR0ZXJJc05hdmlnYXRhYmxlICYmIGZvcm0uY2xvc2VzdCgnW2RhdGEtdHVyYm89XCJ0cnVlXCJdJykgIT0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN1Ym1pdHRlcklzTmF2aWdhdGFibGUgJiYgdGhpcy5lbGVtZW50SXNOYXZpZ2F0YWJsZShmb3JtKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnRJc05hdmlnYXRhYmxlKGVsZW1lbnQpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBmaW5kQ2xvc2VzdFJlY3Vyc2l2ZWx5KGVsZW1lbnQsIFwiW2RhdGEtdHVyYm9dXCIpXG4gICAgY29uc3Qgd2l0aGluRnJhbWUgPSBmaW5kQ2xvc2VzdFJlY3Vyc2l2ZWx5KGVsZW1lbnQsIFwidHVyYm8tZnJhbWVcIilcblxuICAgIC8vIENoZWNrIGlmIERyaXZlIGlzIGVuYWJsZWQgb24gdGhlIHNlc3Npb24gb3Igd2UncmUgd2l0aGluIGEgRnJhbWUuXG4gICAgaWYgKHRoaXMuZHJpdmUgfHwgd2l0aGluRnJhbWUpIHtcbiAgICAgIC8vIEVsZW1lbnQgaXMgbmF2aWdhdGFibGUgYnkgZGVmYXVsdCwgdW5sZXNzIGBkYXRhLXR1cmJvPVwiZmFsc2VcImAuXG4gICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS10dXJib1wiKSAhPSBcImZhbHNlXCJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVsZW1lbnQgaXNuJ3QgbmF2aWdhdGFibGUgYnkgZGVmYXVsdCwgdW5sZXNzIGBkYXRhLXR1cmJvPVwidHJ1ZVwiYC5cbiAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvXCIpID09IFwidHJ1ZVwiXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgZ2V0QWN0aW9uRm9yTGluayhsaW5rKSB7XG4gICAgcmV0dXJuIGdldFZpc2l0QWN0aW9uKGxpbmspIHx8IFwiYWR2YW5jZVwiXG4gIH1cblxuICBnZXQgc25hcHNob3QoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5zbmFwc2hvdFxuICB9XG59XG5cbi8vIE9sZGVyIHZlcnNpb25zIG9mIHRoZSBUdXJibyBOYXRpdmUgYWRhcHRlcnMgcmVmZXJlbmNlZCB0aGVcbi8vIGBMb2NhdGlvbiNhYnNvbHV0ZVVSTGAgcHJvcGVydHkgaW4gdGhlaXIgaW1wbGVtZW50YXRpb25zIG9mXG4vLyB0aGUgYEFkYXB0ZXIjdmlzaXRQcm9wb3NlZFRvTG9jYXRpb24oKWAgYW5kIGAjdmlzaXRTdGFydGVkKClgXG4vLyBtZXRob2RzLiBUaGUgTG9jYXRpb24gY2xhc3MgaGFzIHNpbmNlIGJlZW4gcmVtb3ZlZCBpbiBmYXZvclxuLy8gb2YgdGhlIERPTSBVUkwgQVBJLCBhbmQgYWNjb3JkaW5nbHkgYWxsIEFkYXB0ZXIgbWV0aG9kcyBub3dcbi8vIHJlY2VpdmUgVVJMIG9iamVjdHMuXG4vL1xuLy8gV2UgYWxpYXMgI2Fic29sdXRlVVJMIHRvICN0b1N0cmluZygpIGhlcmUgdG8gYXZvaWQgY3Jhc2hpbmdcbi8vIG9sZGVyIGFkYXB0ZXJzIHdoaWNoIGRvIG5vdCBleHBlY3QgVVJMIG9iamVjdHMuIFdlIHNob3VsZFxuLy8gY29uc2lkZXIgcmVtb3ZpbmcgdGhpcyBzdXBwb3J0IGF0IHNvbWUgcG9pbnQgaW4gdGhlIGZ1dHVyZS5cblxuZnVuY3Rpb24gZXh0ZW5kVVJMV2l0aERlcHJlY2F0ZWRQcm9wZXJ0aWVzKHVybCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh1cmwsIGRlcHJlY2F0ZWRMb2NhdGlvblByb3BlcnR5RGVzY3JpcHRvcnMpXG59XG5cbmNvbnN0IGRlcHJlY2F0ZWRMb2NhdGlvblByb3BlcnR5RGVzY3JpcHRvcnMgPSB7XG4gIGFic29sdXRlVVJMOiB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKVxuICAgIH1cbiAgfVxufVxuIiwgImV4cG9ydCBjbGFzcyBUdXJib0ZyYW1lTWlzc2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cbiIsICJpbXBvcnQgeyBGcmFtZUVsZW1lbnQsIEZyYW1lTG9hZGluZ1N0eWxlIH0gZnJvbSBcIi4uLy4uL2VsZW1lbnRzL2ZyYW1lX2VsZW1lbnRcIlxuaW1wb3J0IHsgRmV0Y2hNZXRob2QsIEZldGNoUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9odHRwL2ZldGNoX3JlcXVlc3RcIlxuaW1wb3J0IHsgRmV0Y2hSZXNwb25zZSB9IGZyb20gXCIuLi8uLi9odHRwL2ZldGNoX3Jlc3BvbnNlXCJcbmltcG9ydCB7IEFwcGVhcmFuY2VPYnNlcnZlciB9IGZyb20gXCIuLi8uLi9vYnNlcnZlcnMvYXBwZWFyYW5jZV9vYnNlcnZlclwiXG5pbXBvcnQge1xuICBjbGVhckJ1c3lTdGF0ZSxcbiAgZGlzcGF0Y2gsXG4gIGdldEF0dHJpYnV0ZSxcbiAgcGFyc2VIVE1MRG9jdW1lbnQsXG4gIG1hcmtBc0J1c3ksXG4gIHV1aWQsXG4gIGdldEhpc3RvcnlNZXRob2RGb3JBY3Rpb24sXG4gIGdldFZpc2l0QWN0aW9uXG59IGZyb20gXCIuLi8uLi91dGlsXCJcbmltcG9ydCB7IEZvcm1TdWJtaXNzaW9uIH0gZnJvbSBcIi4uL2RyaXZlL2Zvcm1fc3VibWlzc2lvblwiXG5pbXBvcnQgeyBTbmFwc2hvdCB9IGZyb20gXCIuLi9zbmFwc2hvdFwiXG5pbXBvcnQgeyBnZXRBY3Rpb24sIGV4cGFuZFVSTCwgdXJsc0FyZUVxdWFsLCBsb2NhdGlvbklzVmlzaXRhYmxlIH0gZnJvbSBcIi4uL3VybFwiXG5pbXBvcnQgeyBGb3JtU3VibWl0T2JzZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vb2JzZXJ2ZXJzL2Zvcm1fc3VibWl0X29ic2VydmVyXCJcbmltcG9ydCB7IEZyYW1lVmlldyB9IGZyb20gXCIuL2ZyYW1lX3ZpZXdcIlxuaW1wb3J0IHsgTGlua0ludGVyY2VwdG9yIH0gZnJvbSBcIi4vbGlua19pbnRlcmNlcHRvclwiXG5pbXBvcnQgeyBGb3JtTGlua0NsaWNrT2JzZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vb2JzZXJ2ZXJzL2Zvcm1fbGlua19jbGlja19vYnNlcnZlclwiXG5pbXBvcnQgeyBGcmFtZVJlbmRlcmVyIH0gZnJvbSBcIi4vZnJhbWVfcmVuZGVyZXJcIlxuaW1wb3J0IHsgc2Vzc2lvbiB9IGZyb20gXCIuLi9pbmRleFwiXG5pbXBvcnQgeyBTdHJlYW1NZXNzYWdlIH0gZnJvbSBcIi4uL3N0cmVhbXMvc3RyZWFtX21lc3NhZ2VcIlxuaW1wb3J0IHsgUGFnZVNuYXBzaG90IH0gZnJvbSBcIi4uL2RyaXZlL3BhZ2Vfc25hcHNob3RcIlxuaW1wb3J0IHsgVHVyYm9GcmFtZU1pc3NpbmdFcnJvciB9IGZyb20gXCIuLi9lcnJvcnNcIlxuXG5leHBvcnQgY2xhc3MgRnJhbWVDb250cm9sbGVyIHtcbiAgZmV0Y2hSZXNwb25zZUxvYWRlZCA9IChfZmV0Y2hSZXNwb25zZSkgPT4gUHJvbWlzZS5yZXNvbHZlKClcbiAgI2N1cnJlbnRGZXRjaFJlcXVlc3QgPSBudWxsXG4gICNyZXNvbHZlVmlzaXRQcm9taXNlID0gKCkgPT4ge31cbiAgI2Nvbm5lY3RlZCA9IGZhbHNlXG4gICNoYXNCZWVuTG9hZGVkID0gZmFsc2VcbiAgI2lnbm9yZWRBdHRyaWJ1dGVzID0gbmV3IFNldCgpXG4gIGFjdGlvbiA9IG51bGxcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMudmlldyA9IG5ldyBGcmFtZVZpZXcodGhpcywgdGhpcy5lbGVtZW50KVxuICAgIHRoaXMuYXBwZWFyYW5jZU9ic2VydmVyID0gbmV3IEFwcGVhcmFuY2VPYnNlcnZlcih0aGlzLCB0aGlzLmVsZW1lbnQpXG4gICAgdGhpcy5mb3JtTGlua0NsaWNrT2JzZXJ2ZXIgPSBuZXcgRm9ybUxpbmtDbGlja09ic2VydmVyKHRoaXMsIHRoaXMuZWxlbWVudClcbiAgICB0aGlzLmxpbmtJbnRlcmNlcHRvciA9IG5ldyBMaW5rSW50ZXJjZXB0b3IodGhpcywgdGhpcy5lbGVtZW50KVxuICAgIHRoaXMucmVzdG9yYXRpb25JZGVudGlmaWVyID0gdXVpZCgpXG4gICAgdGhpcy5mb3JtU3VibWl0T2JzZXJ2ZXIgPSBuZXcgRm9ybVN1Ym1pdE9ic2VydmVyKHRoaXMsIHRoaXMuZWxlbWVudClcbiAgfVxuXG4gIC8vIEZyYW1lIGRlbGVnYXRlXG5cbiAgY29ubmVjdCgpIHtcbiAgICBpZiAoIXRoaXMuI2Nvbm5lY3RlZCkge1xuICAgICAgdGhpcy4jY29ubmVjdGVkID0gdHJ1ZVxuICAgICAgaWYgKHRoaXMubG9hZGluZ1N0eWxlID09IEZyYW1lTG9hZGluZ1N0eWxlLmxhenkpIHtcbiAgICAgICAgdGhpcy5hcHBlYXJhbmNlT2JzZXJ2ZXIuc3RhcnQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4jbG9hZFNvdXJjZVVSTCgpXG4gICAgICB9XG4gICAgICB0aGlzLmZvcm1MaW5rQ2xpY2tPYnNlcnZlci5zdGFydCgpXG4gICAgICB0aGlzLmxpbmtJbnRlcmNlcHRvci5zdGFydCgpXG4gICAgICB0aGlzLmZvcm1TdWJtaXRPYnNlcnZlci5zdGFydCgpXG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy4jY29ubmVjdGVkKSB7XG4gICAgICB0aGlzLiNjb25uZWN0ZWQgPSBmYWxzZVxuICAgICAgdGhpcy5hcHBlYXJhbmNlT2JzZXJ2ZXIuc3RvcCgpXG4gICAgICB0aGlzLmZvcm1MaW5rQ2xpY2tPYnNlcnZlci5zdG9wKClcbiAgICAgIHRoaXMubGlua0ludGVyY2VwdG9yLnN0b3AoKVxuICAgICAgdGhpcy5mb3JtU3VibWl0T2JzZXJ2ZXIuc3RvcCgpXG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZWRDaGFuZ2VkKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmdTdHlsZSA9PSBGcmFtZUxvYWRpbmdTdHlsZS5lYWdlcikge1xuICAgICAgdGhpcy4jbG9hZFNvdXJjZVVSTCgpXG4gICAgfVxuICB9XG5cbiAgc291cmNlVVJMQ2hhbmdlZCgpIHtcbiAgICBpZiAodGhpcy4jaXNJZ25vcmluZ0NoYW5nZXNUbyhcInNyY1wiKSkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy5lbGVtZW50LmlzQ29ubmVjdGVkKSB7XG4gICAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2FkaW5nU3R5bGUgPT0gRnJhbWVMb2FkaW5nU3R5bGUuZWFnZXIgfHwgdGhpcy4jaGFzQmVlbkxvYWRlZCkge1xuICAgICAgdGhpcy4jbG9hZFNvdXJjZVVSTCgpXG4gICAgfVxuICB9XG5cbiAgc291cmNlVVJMUmVsb2FkZWQoKSB7XG4gICAgY29uc3QgeyBzcmMgfSA9IHRoaXMuZWxlbWVudFxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJjb21wbGV0ZVwiKVxuICAgIHRoaXMuZWxlbWVudC5zcmMgPSBudWxsXG4gICAgdGhpcy5lbGVtZW50LnNyYyA9IHNyY1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubG9hZGVkXG4gIH1cblxuICBsb2FkaW5nU3R5bGVDaGFuZ2VkKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmdTdHlsZSA9PSBGcmFtZUxvYWRpbmdTdHlsZS5sYXp5KSB7XG4gICAgICB0aGlzLmFwcGVhcmFuY2VPYnNlcnZlci5zdGFydCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZU9ic2VydmVyLnN0b3AoKVxuICAgICAgdGhpcy4jbG9hZFNvdXJjZVVSTCgpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgI2xvYWRTb3VyY2VVUkwoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCAmJiB0aGlzLmlzQWN0aXZlICYmICF0aGlzLmNvbXBsZXRlICYmIHRoaXMuc291cmNlVVJMKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubG9hZGVkID0gdGhpcy4jdmlzaXQoZXhwYW5kVVJMKHRoaXMuc291cmNlVVJMKSlcbiAgICAgIHRoaXMuYXBwZWFyYW5jZU9ic2VydmVyLnN0b3AoKVxuICAgICAgYXdhaXQgdGhpcy5lbGVtZW50LmxvYWRlZFxuICAgICAgdGhpcy4jaGFzQmVlbkxvYWRlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSkge1xuICAgIGlmIChmZXRjaFJlc3BvbnNlLnJlZGlyZWN0ZWQgfHwgKGZldGNoUmVzcG9uc2Uuc3VjY2VlZGVkICYmIGZldGNoUmVzcG9uc2UuaXNIVE1MKSkge1xuICAgICAgdGhpcy5zb3VyY2VVUkwgPSBmZXRjaFJlc3BvbnNlLnJlc3BvbnNlLnVybFxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBodG1sID0gYXdhaXQgZmV0Y2hSZXNwb25zZS5yZXNwb25zZUhUTUxcbiAgICAgIGlmIChodG1sKSB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50ID0gcGFyc2VIVE1MRG9jdW1lbnQoaHRtbClcbiAgICAgICAgY29uc3QgcGFnZVNuYXBzaG90ID0gUGFnZVNuYXBzaG90LmZyb21Eb2N1bWVudChkb2N1bWVudClcblxuICAgICAgICBpZiAocGFnZVNuYXBzaG90LmlzVmlzaXRhYmxlKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy4jbG9hZEZyYW1lUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSwgZG9jdW1lbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy4jaGFuZGxlVW52aXNpdGFibGVGcmFtZVJlc3BvbnNlKGZldGNoUmVzcG9uc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5mZXRjaFJlc3BvbnNlTG9hZGVkID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG4gIH1cblxuICAvLyBBcHBlYXJhbmNlIG9ic2VydmVyIGRlbGVnYXRlXG5cbiAgZWxlbWVudEFwcGVhcmVkSW5WaWV3cG9ydChlbGVtZW50KSB7XG4gICAgdGhpcy5wcm9wb3NlVmlzaXRJZk5hdmlnYXRlZFdpdGhBY3Rpb24oZWxlbWVudCwgZ2V0VmlzaXRBY3Rpb24oZWxlbWVudCkpXG4gICAgdGhpcy4jbG9hZFNvdXJjZVVSTCgpXG4gIH1cblxuICAvLyBGb3JtIGxpbmsgY2xpY2sgb2JzZXJ2ZXIgZGVsZWdhdGVcblxuICB3aWxsU3VibWl0Rm9ybUxpbmtUb0xvY2F0aW9uKGxpbmspIHtcbiAgICByZXR1cm4gdGhpcy4jc2hvdWxkSW50ZXJjZXB0TmF2aWdhdGlvbihsaW5rKVxuICB9XG5cbiAgc3VibWl0dGVkRm9ybUxpbmtUb0xvY2F0aW9uKGxpbmssIF9sb2NhdGlvbiwgZm9ybSkge1xuICAgIGNvbnN0IGZyYW1lID0gdGhpcy4jZmluZEZyYW1lRWxlbWVudChsaW5rKVxuICAgIGlmIChmcmFtZSkgZm9ybS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWZyYW1lXCIsIGZyYW1lLmlkKVxuICB9XG5cbiAgLy8gTGluayBpbnRlcmNlcHRvciBkZWxlZ2F0ZVxuXG4gIHNob3VsZEludGVyY2VwdExpbmtDbGljayhlbGVtZW50LCBfbG9jYXRpb24sIF9ldmVudCkge1xuICAgIHJldHVybiB0aGlzLiNzaG91bGRJbnRlcmNlcHROYXZpZ2F0aW9uKGVsZW1lbnQpXG4gIH1cblxuICBsaW5rQ2xpY2tJbnRlcmNlcHRlZChlbGVtZW50LCBsb2NhdGlvbikge1xuICAgIHRoaXMuI25hdmlnYXRlRnJhbWUoZWxlbWVudCwgbG9jYXRpb24pXG4gIH1cblxuICAvLyBGb3JtIHN1Ym1pdCBvYnNlcnZlciBkZWxlZ2F0ZVxuXG4gIHdpbGxTdWJtaXRGb3JtKGVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICAgIHJldHVybiBlbGVtZW50LmNsb3Nlc3QoXCJ0dXJiby1mcmFtZVwiKSA9PSB0aGlzLmVsZW1lbnQgJiYgdGhpcy4jc2hvdWxkSW50ZXJjZXB0TmF2aWdhdGlvbihlbGVtZW50LCBzdWJtaXR0ZXIpXG4gIH1cblxuICBmb3JtU3VibWl0dGVkKGVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICAgIGlmICh0aGlzLmZvcm1TdWJtaXNzaW9uKSB7XG4gICAgICB0aGlzLmZvcm1TdWJtaXNzaW9uLnN0b3AoKVxuICAgIH1cblxuICAgIHRoaXMuZm9ybVN1Ym1pc3Npb24gPSBuZXcgRm9ybVN1Ym1pc3Npb24odGhpcywgZWxlbWVudCwgc3VibWl0dGVyKVxuICAgIGNvbnN0IHsgZmV0Y2hSZXF1ZXN0IH0gPSB0aGlzLmZvcm1TdWJtaXNzaW9uXG4gICAgdGhpcy5wcmVwYXJlUmVxdWVzdChmZXRjaFJlcXVlc3QpXG4gICAgdGhpcy5mb3JtU3VibWlzc2lvbi5zdGFydCgpXG4gIH1cblxuICAvLyBGZXRjaCByZXF1ZXN0IGRlbGVnYXRlXG5cbiAgcHJlcGFyZVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJlcXVlc3QuaGVhZGVyc1tcIlR1cmJvLUZyYW1lXCJdID0gdGhpcy5pZFxuXG4gICAgaWYgKHRoaXMuY3VycmVudE5hdmlnYXRpb25FbGVtZW50Py5oYXNBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLXN0cmVhbVwiKSkge1xuICAgICAgcmVxdWVzdC5hY2NlcHRSZXNwb25zZVR5cGUoU3RyZWFtTWVzc2FnZS5jb250ZW50VHlwZSlcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0U3RhcnRlZChfcmVxdWVzdCkge1xuICAgIG1hcmtBc0J1c3kodGhpcy5lbGVtZW50KVxuICB9XG5cbiAgcmVxdWVzdFByZXZlbnRlZEhhbmRsaW5nUmVzcG9uc2UoX3JlcXVlc3QsIF9yZXNwb25zZSkge1xuICAgIHRoaXMuI3Jlc29sdmVWaXNpdFByb21pc2UoKVxuICB9XG5cbiAgYXN5bmMgcmVxdWVzdFN1Y2NlZWRlZFdpdGhSZXNwb25zZShyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIGF3YWl0IHRoaXMubG9hZFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgIHRoaXMuI3Jlc29sdmVWaXNpdFByb21pc2UoKVxuICB9XG5cbiAgYXN5bmMgcmVxdWVzdEZhaWxlZFdpdGhSZXNwb25zZShyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIGF3YWl0IHRoaXMubG9hZFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgIHRoaXMuI3Jlc29sdmVWaXNpdFByb21pc2UoKVxuICB9XG5cbiAgcmVxdWVzdEVycm9yZWQocmVxdWVzdCwgZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIHRoaXMuI3Jlc29sdmVWaXNpdFByb21pc2UoKVxuICB9XG5cbiAgcmVxdWVzdEZpbmlzaGVkKF9yZXF1ZXN0KSB7XG4gICAgY2xlYXJCdXN5U3RhdGUodGhpcy5lbGVtZW50KVxuICB9XG5cbiAgLy8gRm9ybSBzdWJtaXNzaW9uIGRlbGVnYXRlXG5cbiAgZm9ybVN1Ym1pc3Npb25TdGFydGVkKHsgZm9ybUVsZW1lbnQgfSkge1xuICAgIG1hcmtBc0J1c3koZm9ybUVsZW1lbnQsIHRoaXMuI2ZpbmRGcmFtZUVsZW1lbnQoZm9ybUVsZW1lbnQpKVxuICB9XG5cbiAgZm9ybVN1Ym1pc3Npb25TdWNjZWVkZWRXaXRoUmVzcG9uc2UoZm9ybVN1Ym1pc3Npb24sIHJlc3BvbnNlKSB7XG4gICAgY29uc3QgZnJhbWUgPSB0aGlzLiNmaW5kRnJhbWVFbGVtZW50KGZvcm1TdWJtaXNzaW9uLmZvcm1FbGVtZW50LCBmb3JtU3VibWlzc2lvbi5zdWJtaXR0ZXIpXG5cbiAgICBmcmFtZS5kZWxlZ2F0ZS5wcm9wb3NlVmlzaXRJZk5hdmlnYXRlZFdpdGhBY3Rpb24oZnJhbWUsIGdldFZpc2l0QWN0aW9uKGZvcm1TdWJtaXNzaW9uLnN1Ym1pdHRlciwgZm9ybVN1Ym1pc3Npb24uZm9ybUVsZW1lbnQsIGZyYW1lKSlcbiAgICBmcmFtZS5kZWxlZ2F0ZS5sb2FkUmVzcG9uc2UocmVzcG9uc2UpXG5cbiAgICBpZiAoIWZvcm1TdWJtaXNzaW9uLmlzU2FmZSkge1xuICAgICAgc2Vzc2lvbi5jbGVhckNhY2hlKClcbiAgICB9XG4gIH1cblxuICBmb3JtU3VibWlzc2lvbkZhaWxlZFdpdGhSZXNwb25zZShmb3JtU3VibWlzc2lvbiwgZmV0Y2hSZXNwb25zZSkge1xuICAgIHRoaXMuZWxlbWVudC5kZWxlZ2F0ZS5sb2FkUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSlcbiAgICBzZXNzaW9uLmNsZWFyQ2FjaGUoKVxuICB9XG5cbiAgZm9ybVN1Ym1pc3Npb25FcnJvcmVkKGZvcm1TdWJtaXNzaW9uLCBlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cblxuICBmb3JtU3VibWlzc2lvbkZpbmlzaGVkKHsgZm9ybUVsZW1lbnQgfSkge1xuICAgIGNsZWFyQnVzeVN0YXRlKGZvcm1FbGVtZW50LCB0aGlzLiNmaW5kRnJhbWVFbGVtZW50KGZvcm1FbGVtZW50KSlcbiAgfVxuXG4gIC8vIFZpZXcgZGVsZWdhdGVcblxuICBhbGxvd3NJbW1lZGlhdGVSZW5kZXIoeyBlbGVtZW50OiBuZXdGcmFtZSB9LCBvcHRpb25zKSB7XG4gICAgY29uc3QgZXZlbnQgPSBkaXNwYXRjaChcInR1cmJvOmJlZm9yZS1mcmFtZS1yZW5kZXJcIiwge1xuICAgICAgdGFyZ2V0OiB0aGlzLmVsZW1lbnQsXG4gICAgICBkZXRhaWw6IHsgbmV3RnJhbWUsIC4uLm9wdGlvbnMgfSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KVxuICAgIGNvbnN0IHtcbiAgICAgIGRlZmF1bHRQcmV2ZW50ZWQsXG4gICAgICBkZXRhaWw6IHsgcmVuZGVyIH1cbiAgICB9ID0gZXZlbnRcblxuICAgIGlmICh0aGlzLnZpZXcucmVuZGVyZXIgJiYgcmVuZGVyKSB7XG4gICAgICB0aGlzLnZpZXcucmVuZGVyZXIucmVuZGVyRWxlbWVudCA9IHJlbmRlclxuICAgIH1cblxuICAgIHJldHVybiAhZGVmYXVsdFByZXZlbnRlZFxuICB9XG5cbiAgdmlld1JlbmRlcmVkU25hcHNob3QoX3NuYXBzaG90LCBfaXNQcmV2aWV3LCBfcmVuZGVyTWV0aG9kKSB7fVxuXG4gIHByZWxvYWRPbkxvYWRMaW5rc0ZvclZpZXcoZWxlbWVudCkge1xuICAgIHNlc3Npb24ucHJlbG9hZE9uTG9hZExpbmtzRm9yVmlldyhlbGVtZW50KVxuICB9XG5cbiAgdmlld0ludmFsaWRhdGVkKCkge31cblxuICAvLyBGcmFtZSByZW5kZXJlciBkZWxlZ2F0ZVxuXG4gIHdpbGxSZW5kZXJGcmFtZShjdXJyZW50RWxlbWVudCwgX25ld0VsZW1lbnQpIHtcbiAgICB0aGlzLnByZXZpb3VzRnJhbWVFbGVtZW50ID0gY3VycmVudEVsZW1lbnQuY2xvbmVOb2RlKHRydWUpXG4gIH1cblxuICB2aXNpdENhY2hlZFNuYXBzaG90ID0gKHsgZWxlbWVudCB9KSA9PiB7XG4gICAgY29uc3QgZnJhbWUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB0aGlzLmVsZW1lbnQuaWQpXG5cbiAgICBpZiAoZnJhbWUgJiYgdGhpcy5wcmV2aW91c0ZyYW1lRWxlbWVudCkge1xuICAgICAgZnJhbWUucmVwbGFjZUNoaWxkcmVuKC4uLnRoaXMucHJldmlvdXNGcmFtZUVsZW1lbnQuY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMucHJldmlvdXNGcmFtZUVsZW1lbnRcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBhc3luYyAjbG9hZEZyYW1lUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSwgZG9jdW1lbnQpIHtcbiAgICBjb25zdCBuZXdGcmFtZUVsZW1lbnQgPSBhd2FpdCB0aGlzLmV4dHJhY3RGb3JlaWduRnJhbWVFbGVtZW50KGRvY3VtZW50LmJvZHkpXG5cbiAgICBpZiAobmV3RnJhbWVFbGVtZW50KSB7XG4gICAgICBjb25zdCBzbmFwc2hvdCA9IG5ldyBTbmFwc2hvdChuZXdGcmFtZUVsZW1lbnQpXG4gICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBGcmFtZVJlbmRlcmVyKHRoaXMsIHRoaXMudmlldy5zbmFwc2hvdCwgc25hcHNob3QsIEZyYW1lUmVuZGVyZXIucmVuZGVyRWxlbWVudCwgZmFsc2UsIGZhbHNlKVxuICAgICAgaWYgKHRoaXMudmlldy5yZW5kZXJQcm9taXNlKSBhd2FpdCB0aGlzLnZpZXcucmVuZGVyUHJvbWlzZVxuICAgICAgdGhpcy5jaGFuZ2VIaXN0b3J5KClcblxuICAgICAgYXdhaXQgdGhpcy52aWV3LnJlbmRlcihyZW5kZXJlcilcbiAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlXG4gICAgICBzZXNzaW9uLmZyYW1lUmVuZGVyZWQoZmV0Y2hSZXNwb25zZSwgdGhpcy5lbGVtZW50KVxuICAgICAgc2Vzc2lvbi5mcmFtZUxvYWRlZCh0aGlzLmVsZW1lbnQpXG4gICAgICBhd2FpdCB0aGlzLmZldGNoUmVzcG9uc2VMb2FkZWQoZmV0Y2hSZXNwb25zZSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuI3dpbGxIYW5kbGVGcmFtZU1pc3NpbmdGcm9tUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSkpIHtcbiAgICAgIHRoaXMuI2hhbmRsZUZyYW1lTWlzc2luZ0Zyb21SZXNwb25zZShmZXRjaFJlc3BvbnNlKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jICN2aXNpdCh1cmwpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IEZldGNoUmVxdWVzdCh0aGlzLCBGZXRjaE1ldGhvZC5nZXQsIHVybCwgbmV3IFVSTFNlYXJjaFBhcmFtcygpLCB0aGlzLmVsZW1lbnQpXG5cbiAgICB0aGlzLiNjdXJyZW50RmV0Y2hSZXF1ZXN0Py5jYW5jZWwoKVxuICAgIHRoaXMuI2N1cnJlbnRGZXRjaFJlcXVlc3QgPSByZXF1ZXN0XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuI3Jlc29sdmVWaXNpdFByb21pc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuI3Jlc29sdmVWaXNpdFByb21pc2UgPSAoKSA9PiB7fVxuICAgICAgICB0aGlzLiNjdXJyZW50RmV0Y2hSZXF1ZXN0ID0gbnVsbFxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICAgIHJlcXVlc3QucGVyZm9ybSgpXG4gICAgfSlcbiAgfVxuXG4gICNuYXZpZ2F0ZUZyYW1lKGVsZW1lbnQsIHVybCwgc3VibWl0dGVyKSB7XG4gICAgY29uc3QgZnJhbWUgPSB0aGlzLiNmaW5kRnJhbWVFbGVtZW50KGVsZW1lbnQsIHN1Ym1pdHRlcilcblxuICAgIGZyYW1lLmRlbGVnYXRlLnByb3Bvc2VWaXNpdElmTmF2aWdhdGVkV2l0aEFjdGlvbihmcmFtZSwgZ2V0VmlzaXRBY3Rpb24oc3VibWl0dGVyLCBlbGVtZW50LCBmcmFtZSkpXG5cbiAgICB0aGlzLiN3aXRoQ3VycmVudE5hdmlnYXRpb25FbGVtZW50KGVsZW1lbnQsICgpID0+IHtcbiAgICAgIGZyYW1lLnNyYyA9IHVybFxuICAgIH0pXG4gIH1cblxuICBwcm9wb3NlVmlzaXRJZk5hdmlnYXRlZFdpdGhBY3Rpb24oZnJhbWUsIGFjdGlvbiA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGlvbiA9IGFjdGlvblxuXG4gICAgaWYgKHRoaXMuYWN0aW9uKSB7XG4gICAgICBjb25zdCBwYWdlU25hcHNob3QgPSBQYWdlU25hcHNob3QuZnJvbUVsZW1lbnQoZnJhbWUpLmNsb25lKClcbiAgICAgIGNvbnN0IHsgdmlzaXRDYWNoZWRTbmFwc2hvdCB9ID0gZnJhbWUuZGVsZWdhdGVcblxuICAgICAgZnJhbWUuZGVsZWdhdGUuZmV0Y2hSZXNwb25zZUxvYWRlZCA9IGFzeW5jIChmZXRjaFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChmcmFtZS5zcmMpIHtcbiAgICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUsIHJlZGlyZWN0ZWQgfSA9IGZldGNoUmVzcG9uc2VcbiAgICAgICAgICBjb25zdCByZXNwb25zZUhUTUwgPSBhd2FpdCBmZXRjaFJlc3BvbnNlLnJlc3BvbnNlSFRNTFxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geyBzdGF0dXNDb2RlLCByZWRpcmVjdGVkLCByZXNwb25zZUhUTUwgfVxuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgIHZpc2l0Q2FjaGVkU25hcHNob3QsXG4gICAgICAgICAgICB3aWxsUmVuZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHVwZGF0ZUhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICAgICAgcmVzdG9yYXRpb25JZGVudGlmaWVyOiB0aGlzLnJlc3RvcmF0aW9uSWRlbnRpZmllcixcbiAgICAgICAgICAgIHNuYXBzaG90OiBwYWdlU25hcHNob3RcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5hY3Rpb24pIG9wdGlvbnMuYWN0aW9uID0gdGhpcy5hY3Rpb25cblxuICAgICAgICAgIHNlc3Npb24udmlzaXQoZnJhbWUuc3JjLCBvcHRpb25zKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlSGlzdG9yeSgpIHtcbiAgICBpZiAodGhpcy5hY3Rpb24pIHtcbiAgICAgIGNvbnN0IG1ldGhvZCA9IGdldEhpc3RvcnlNZXRob2RGb3JBY3Rpb24odGhpcy5hY3Rpb24pXG4gICAgICBzZXNzaW9uLmhpc3RvcnkudXBkYXRlKG1ldGhvZCwgZXhwYW5kVVJMKHRoaXMuZWxlbWVudC5zcmMgfHwgXCJcIiksIHRoaXMucmVzdG9yYXRpb25JZGVudGlmaWVyKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jICNoYW5kbGVVbnZpc2l0YWJsZUZyYW1lUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBUaGUgcmVzcG9uc2UgKCR7ZmV0Y2hSZXNwb25zZS5zdGF0dXNDb2RlfSkgZnJvbSA8dHVyYm8tZnJhbWUgaWQ9XCIke3RoaXMuZWxlbWVudC5pZH1cIj4gaXMgcGVyZm9ybWluZyBhIGZ1bGwgcGFnZSB2aXNpdCBkdWUgdG8gdHVyYm8tdmlzaXQtY29udHJvbC5gXG4gICAgKVxuXG4gICAgYXdhaXQgdGhpcy4jdmlzaXRSZXNwb25zZShmZXRjaFJlc3BvbnNlLnJlc3BvbnNlKVxuICB9XG5cbiAgI3dpbGxIYW5kbGVGcmFtZU1pc3NpbmdGcm9tUmVzcG9uc2UoZmV0Y2hSZXNwb25zZSkge1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjb21wbGV0ZVwiLCBcIlwiKVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBmZXRjaFJlc3BvbnNlLnJlc3BvbnNlXG4gICAgY29uc3QgdmlzaXQgPSBhc3luYyAodXJsLCBvcHRpb25zKSA9PiB7XG4gICAgICBpZiAodXJsIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy4jdmlzaXRSZXNwb25zZSh1cmwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXNzaW9uLnZpc2l0KHVybCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBldmVudCA9IGRpc3BhdGNoKFwidHVyYm86ZnJhbWUtbWlzc2luZ1wiLCB7XG4gICAgICB0YXJnZXQ6IHRoaXMuZWxlbWVudCxcbiAgICAgIGRldGFpbDogeyByZXNwb25zZSwgdmlzaXQgfSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KVxuXG4gICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkXG4gIH1cblxuICAjaGFuZGxlRnJhbWVNaXNzaW5nRnJvbVJlc3BvbnNlKGZldGNoUmVzcG9uc2UpIHtcbiAgICB0aGlzLnZpZXcubWlzc2luZygpXG4gICAgdGhpcy4jdGhyb3dGcmFtZU1pc3NpbmdFcnJvcihmZXRjaFJlc3BvbnNlKVxuICB9XG5cbiAgI3Rocm93RnJhbWVNaXNzaW5nRXJyb3IoZmV0Y2hSZXNwb25zZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgVGhlIHJlc3BvbnNlICgke2ZldGNoUmVzcG9uc2Uuc3RhdHVzQ29kZX0pIGRpZCBub3QgY29udGFpbiB0aGUgZXhwZWN0ZWQgPHR1cmJvLWZyYW1lIGlkPVwiJHt0aGlzLmVsZW1lbnQuaWR9XCI+IGFuZCB3aWxsIGJlIGlnbm9yZWQuIFRvIHBlcmZvcm0gYSBmdWxsIHBhZ2UgdmlzaXQgaW5zdGVhZCwgc2V0IHR1cmJvLXZpc2l0LWNvbnRyb2wgdG8gcmVsb2FkLmBcbiAgICB0aHJvdyBuZXcgVHVyYm9GcmFtZU1pc3NpbmdFcnJvcihtZXNzYWdlKVxuICB9XG5cbiAgYXN5bmMgI3Zpc2l0UmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICBjb25zdCB3cmFwcGVkID0gbmV3IEZldGNoUmVzcG9uc2UocmVzcG9uc2UpXG4gICAgY29uc3QgcmVzcG9uc2VIVE1MID0gYXdhaXQgd3JhcHBlZC5yZXNwb25zZUhUTUxcbiAgICBjb25zdCB7IGxvY2F0aW9uLCByZWRpcmVjdGVkLCBzdGF0dXNDb2RlIH0gPSB3cmFwcGVkXG5cbiAgICByZXR1cm4gc2Vzc2lvbi52aXNpdChsb2NhdGlvbiwgeyByZXNwb25zZTogeyByZWRpcmVjdGVkLCBzdGF0dXNDb2RlLCByZXNwb25zZUhUTUwgfSB9KVxuICB9XG5cbiAgI2ZpbmRGcmFtZUVsZW1lbnQoZWxlbWVudCwgc3VibWl0dGVyKSB7XG4gICAgY29uc3QgaWQgPSBnZXRBdHRyaWJ1dGUoXCJkYXRhLXR1cmJvLWZyYW1lXCIsIHN1Ym1pdHRlciwgZWxlbWVudCkgfHwgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKVxuICAgIHJldHVybiBnZXRGcmFtZUVsZW1lbnRCeUlkKGlkKSA/PyB0aGlzLmVsZW1lbnRcbiAgfVxuXG4gIGFzeW5jIGV4dHJhY3RGb3JlaWduRnJhbWVFbGVtZW50KGNvbnRhaW5lcikge1xuICAgIGxldCBlbGVtZW50XG4gICAgY29uc3QgaWQgPSBDU1MuZXNjYXBlKHRoaXMuaWQpXG5cbiAgICB0cnkge1xuICAgICAgZWxlbWVudCA9IGFjdGl2YXRlRWxlbWVudChjb250YWluZXIucXVlcnlTZWxlY3RvcihgdHVyYm8tZnJhbWUjJHtpZH1gKSwgdGhpcy5zb3VyY2VVUkwpXG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudFxuICAgICAgfVxuXG4gICAgICBlbGVtZW50ID0gYWN0aXZhdGVFbGVtZW50KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGB0dXJiby1mcmFtZVtzcmNdW3JlY3Vyc2V+PSR7aWR9XWApLCB0aGlzLnNvdXJjZVVSTClcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGF3YWl0IGVsZW1lbnQubG9hZGVkXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmV4dHJhY3RGb3JlaWduRnJhbWVFbGVtZW50KGVsZW1lbnQpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICByZXR1cm4gbmV3IEZyYW1lRWxlbWVudCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gICNmb3JtQWN0aW9uSXNWaXNpdGFibGUoZm9ybSwgc3VibWl0dGVyKSB7XG4gICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKGZvcm0sIHN1Ym1pdHRlcilcblxuICAgIHJldHVybiBsb2NhdGlvbklzVmlzaXRhYmxlKGV4cGFuZFVSTChhY3Rpb24pLCB0aGlzLnJvb3RMb2NhdGlvbilcbiAgfVxuXG4gICNzaG91bGRJbnRlcmNlcHROYXZpZ2F0aW9uKGVsZW1lbnQsIHN1Ym1pdHRlcikge1xuICAgIGNvbnN0IGlkID0gZ2V0QXR0cmlidXRlKFwiZGF0YS10dXJiby1mcmFtZVwiLCBzdWJtaXR0ZXIsIGVsZW1lbnQpIHx8IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIilcblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICYmICF0aGlzLiNmb3JtQWN0aW9uSXNWaXNpdGFibGUoZWxlbWVudCwgc3VibWl0dGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgaWQgPT0gXCJfdG9wXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChpZCkge1xuICAgICAgY29uc3QgZnJhbWVFbGVtZW50ID0gZ2V0RnJhbWVFbGVtZW50QnlJZChpZClcbiAgICAgIGlmIChmcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuICFmcmFtZUVsZW1lbnQuZGlzYWJsZWRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNlc3Npb24uZWxlbWVudElzTmF2aWdhdGFibGUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzdWJtaXR0ZXIgJiYgIXNlc3Npb24uZWxlbWVudElzTmF2aWdhdGFibGUoc3VibWl0dGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIENvbXB1dGVkIHByb3BlcnRpZXNcblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5pZFxuICB9XG5cbiAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgcmV0dXJuICF0aGlzLmVsZW1lbnQuZGlzYWJsZWRcbiAgfVxuXG4gIGdldCBzb3VyY2VVUkwoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5zcmMpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuc3JjXG4gICAgfVxuICB9XG5cbiAgc2V0IHNvdXJjZVVSTChzb3VyY2VVUkwpIHtcbiAgICB0aGlzLiNpZ25vcmluZ0NoYW5nZXNUb0F0dHJpYnV0ZShcInNyY1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3JjID0gc291cmNlVVJMID8/IG51bGxcbiAgICB9KVxuICB9XG5cbiAgZ2V0IGxvYWRpbmdTdHlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmxvYWRpbmdcbiAgfVxuXG4gIGdldCBpc0xvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pc3Npb24gIT09IHVuZGVmaW5lZCB8fCB0aGlzLiNyZXNvbHZlVmlzaXRQcm9taXNlKCkgIT09IHVuZGVmaW5lZFxuICB9XG5cbiAgZ2V0IGNvbXBsZXRlKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKFwiY29tcGxldGVcIilcbiAgfVxuXG4gIHNldCBjb21wbGV0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImNvbXBsZXRlXCIsIFwiXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJjb21wbGV0ZVwiKVxuICAgIH1cbiAgfVxuXG4gIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmlzQWN0aXZlICYmIHRoaXMuI2Nvbm5lY3RlZFxuICB9XG5cbiAgZ2V0IHJvb3RMb2NhdGlvbigpIHtcbiAgICBjb25zdCBtZXRhID0gdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbWV0YVtuYW1lPVwidHVyYm8tcm9vdFwiXWApXG4gICAgY29uc3Qgcm9vdCA9IG1ldGE/LmNvbnRlbnQgPz8gXCIvXCJcbiAgICByZXR1cm4gZXhwYW5kVVJMKHJvb3QpXG4gIH1cblxuICAjaXNJZ25vcmluZ0NoYW5nZXNUbyhhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lnbm9yZWRBdHRyaWJ1dGVzLmhhcyhhdHRyaWJ1dGVOYW1lKVxuICB9XG5cbiAgI2lnbm9yaW5nQ2hhbmdlc1RvQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy4jaWdub3JlZEF0dHJpYnV0ZXMuYWRkKGF0dHJpYnV0ZU5hbWUpXG4gICAgY2FsbGJhY2soKVxuICAgIHRoaXMuI2lnbm9yZWRBdHRyaWJ1dGVzLmRlbGV0ZShhdHRyaWJ1dGVOYW1lKVxuICB9XG5cbiAgI3dpdGhDdXJyZW50TmF2aWdhdGlvbkVsZW1lbnQoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uRWxlbWVudCA9IGVsZW1lbnRcbiAgICBjYWxsYmFjaygpXG4gICAgZGVsZXRlIHRoaXMuY3VycmVudE5hdmlnYXRpb25FbGVtZW50XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RnJhbWVFbGVtZW50QnlJZChpZCkge1xuICBpZiAoaWQgIT0gbnVsbCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEZyYW1lRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVFbGVtZW50KGVsZW1lbnQsIGN1cnJlbnRVUkwpIHtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInNyY1wiKVxuICAgIGlmIChzcmMgIT0gbnVsbCAmJiBjdXJyZW50VVJMICE9IG51bGwgJiYgdXJsc0FyZUVxdWFsKHNyYywgY3VycmVudFVSTCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWF0Y2hpbmcgPHR1cmJvLWZyYW1lIGlkPVwiJHtlbGVtZW50LmlkfVwiPiBlbGVtZW50IGhhcyBhIHNvdXJjZSBVUkwgd2hpY2ggcmVmZXJlbmNlcyBpdHNlbGZgKVxuICAgIH1cbiAgICBpZiAoZWxlbWVudC5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCkge1xuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUoZWxlbWVudCwgdHJ1ZSlcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEZyYW1lRWxlbWVudCkge1xuICAgICAgZWxlbWVudC5jb25uZWN0ZWRDYWxsYmFjaygpXG4gICAgICBlbGVtZW50LmRpc2Nvbm5lY3RlZENhbGxiYWNrKClcbiAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHsgc2Vzc2lvbiB9IGZyb20gXCIuLi9cIlxuXG5leHBvcnQgY29uc3QgU3RyZWFtQWN0aW9ucyA9IHtcbiAgYWZ0ZXIoKSB7XG4gICAgdGhpcy50YXJnZXRFbGVtZW50cy5mb3JFYWNoKChlKSA9PiBlLnBhcmVudEVsZW1lbnQ/Lmluc2VydEJlZm9yZSh0aGlzLnRlbXBsYXRlQ29udGVudCwgZS5uZXh0U2libGluZykpXG4gIH0sXG5cbiAgYXBwZW5kKCkge1xuICAgIHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0Q2hpbGRyZW4oKVxuICAgIHRoaXMudGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgoZSkgPT4gZS5hcHBlbmQodGhpcy50ZW1wbGF0ZUNvbnRlbnQpKVxuICB9LFxuXG4gIGJlZm9yZSgpIHtcbiAgICB0aGlzLnRhcmdldEVsZW1lbnRzLmZvckVhY2goKGUpID0+IGUucGFyZW50RWxlbWVudD8uaW5zZXJ0QmVmb3JlKHRoaXMudGVtcGxhdGVDb250ZW50LCBlKSlcbiAgfSxcblxuICBwcmVwZW5kKCkge1xuICAgIHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0Q2hpbGRyZW4oKVxuICAgIHRoaXMudGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgoZSkgPT4gZS5wcmVwZW5kKHRoaXMudGVtcGxhdGVDb250ZW50KSlcbiAgfSxcblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy50YXJnZXRFbGVtZW50cy5mb3JFYWNoKChlKSA9PiBlLnJlbW92ZSgpKVxuICB9LFxuXG4gIHJlcGxhY2UoKSB7XG4gICAgdGhpcy50YXJnZXRFbGVtZW50cy5mb3JFYWNoKChlKSA9PiBlLnJlcGxhY2VXaXRoKHRoaXMudGVtcGxhdGVDb250ZW50KSlcbiAgfSxcblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy50YXJnZXRFbGVtZW50cy5mb3JFYWNoKCh0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9IFwiXCJcbiAgICAgIHRhcmdldEVsZW1lbnQuYXBwZW5kKHRoaXMudGVtcGxhdGVDb250ZW50KVxuICAgIH0pXG4gIH0sXG5cbiAgcmVmcmVzaCgpIHtcbiAgICBzZXNzaW9uLnJlZnJlc2godGhpcy5iYXNlVVJJLCB0aGlzLnJlcXVlc3RJZClcbiAgfVxufVxuIiwgImltcG9ydCB7IFN0cmVhbUFjdGlvbnMgfSBmcm9tIFwiLi4vY29yZS9zdHJlYW1zL3N0cmVhbV9hY3Rpb25zXCJcbmltcG9ydCB7IG5leHRSZXBhaW50IH0gZnJvbSBcIi4uL3V0aWxcIlxuXG4vLyA8dHVyYm8tc3RyZWFtIGFjdGlvbj1yZXBsYWNlIHRhcmdldD1pZD48dGVtcGxhdGU+Li4uXG5cbi8qKlxuICogUmVuZGVycyB1cGRhdGVzIHRvIHRoZSBwYWdlIGZyb20gYSBzdHJlYW0gb2YgbWVzc2FnZXMuXG4gKlxuICogVXNpbmcgdGhlIGBhY3Rpb25gIGF0dHJpYnV0ZSwgdGhpcyBjYW4gYmUgY29uZmlndXJlZCBvbmUgb2YgZm91ciB3YXlzOlxuICpcbiAqIC0gYGFwcGVuZGAgLSBhcHBlbmRzIHRoZSByZXN1bHQgdG8gdGhlIGNvbnRhaW5lclxuICogLSBgcHJlcGVuZGAgLSBwcmVwZW5kcyB0aGUgcmVzdWx0IHRvIHRoZSBjb250YWluZXJcbiAqIC0gYHJlcGxhY2VgIC0gcmVwbGFjZXMgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb250YWluZXJcbiAqIC0gYHJlbW92ZWAgLSByZW1vdmVzIHRoZSBjb250YWluZXJcbiAqIC0gYGJlZm9yZWAgLSBpbnNlcnRzIHRoZSByZXN1bHQgYmVmb3JlIHRoZSB0YXJnZXRcbiAqIC0gYGFmdGVyYCAtIGluc2VydHMgdGhlIHJlc3VsdCBhZnRlciB0aGUgdGFyZ2V0XG4gKlxuICogQGN1c3RvbUVsZW1lbnQgdHVyYm8tc3RyZWFtXG4gKiBAZXhhbXBsZVxuICogICA8dHVyYm8tc3RyZWFtIGFjdGlvbj1cImFwcGVuZFwiIHRhcmdldD1cImRvbV9pZFwiPlxuICogICAgIDx0ZW1wbGF0ZT5cbiAqICAgICAgIENvbnRlbnQgdG8gYXBwZW5kIHRvIGNvbnRhaW5lciBkZXNpZ25hdGVkIHdpdGggdGhlIGRvbV9pZC5cbiAqICAgICA8L3RlbXBsYXRlPlxuICogICA8L3R1cmJvLXN0cmVhbT5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmVhbUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBhc3luYyByZW5kZXJFbGVtZW50KG5ld0VsZW1lbnQpIHtcbiAgICBhd2FpdCBuZXdFbGVtZW50LnBlcmZvcm1BY3Rpb24oKVxuICB9XG5cbiAgYXN5bmMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMucmVuZGVyKClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICB9XG4gIH1cblxuICBhc3luYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuICh0aGlzLnJlbmRlclByb21pc2UgPz89IChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudCA9IHRoaXMuYmVmb3JlUmVuZGVyRXZlbnRcblxuICAgICAgaWYgKHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCkpIHtcbiAgICAgICAgYXdhaXQgbmV4dFJlcGFpbnQoKVxuICAgICAgICBhd2FpdCBldmVudC5kZXRhaWwucmVuZGVyKHRoaXMpXG4gICAgICB9XG4gICAgfSkoKSlcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGR1cGxpY2F0ZSBjaGlsZHJlbiAoYnkgSUQpXG4gICAqL1xuICByZW1vdmVEdXBsaWNhdGVUYXJnZXRDaGlsZHJlbigpIHtcbiAgICB0aGlzLmR1cGxpY2F0ZUNoaWxkcmVuLmZvckVhY2goKGMpID0+IGMucmVtb3ZlKCkpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGlzdCBvZiBkdXBsaWNhdGUgY2hpbGRyZW4gKGkuZS4gdGhvc2Ugd2l0aCB0aGUgc2FtZSBJRClcbiAgICovXG4gIGdldCBkdXBsaWNhdGVDaGlsZHJlbigpIHtcbiAgICBjb25zdCBleGlzdGluZ0NoaWxkcmVuID0gdGhpcy50YXJnZXRFbGVtZW50cy5mbGF0TWFwKChlKSA9PiBbLi4uZS5jaGlsZHJlbl0pLmZpbHRlcigoYykgPT4gISFjLmlkKVxuICAgIGNvbnN0IG5ld0NoaWxkcmVuSWRzID0gWy4uLih0aGlzLnRlbXBsYXRlQ29udGVudD8uY2hpbGRyZW4gfHwgW10pXS5maWx0ZXIoKGMpID0+ICEhYy5pZCkubWFwKChjKSA9PiBjLmlkKVxuXG4gICAgcmV0dXJuIGV4aXN0aW5nQ2hpbGRyZW4uZmlsdGVyKChjKSA9PiBuZXdDaGlsZHJlbklkcy5pbmNsdWRlcyhjLmlkKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhY3Rpb24gZnVuY3Rpb24gdG8gYmUgcGVyZm9ybWVkLlxuICAgKi9cbiAgZ2V0IHBlcmZvcm1BY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuYWN0aW9uKSB7XG4gICAgICBjb25zdCBhY3Rpb25GdW5jdGlvbiA9IFN0cmVhbUFjdGlvbnNbdGhpcy5hY3Rpb25dXG4gICAgICBpZiAoYWN0aW9uRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbkZ1bmN0aW9uXG4gICAgICB9XG4gICAgICB0aGlzLiNyYWlzZShcInVua25vd24gYWN0aW9uXCIpXG4gICAgfVxuICAgIHRoaXMuI3JhaXNlKFwiYWN0aW9uIGF0dHJpYnV0ZSBpcyBtaXNzaW5nXCIpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdGFyZ2V0IGVsZW1lbnRzIHdoaWNoIHRoZSB0ZW1wbGF0ZSB3aWxsIGJlIHJlbmRlcmVkIHRvLlxuICAgKi9cbiAgZ2V0IHRhcmdldEVsZW1lbnRzKCkge1xuICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0RWxlbWVudHNCeUlkXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldEVsZW1lbnRzQnlRdWVyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiNyYWlzZShcInRhcmdldCBvciB0YXJnZXRzIGF0dHJpYnV0ZSBpcyBtaXNzaW5nXCIpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvbnRlbnRzIG9mIHRoZSBtYWluIGA8dGVtcGxhdGU+YC5cbiAgICovXG4gIGdldCB0ZW1wbGF0ZUNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbWFpbiBgPHRlbXBsYXRlPmAgdXNlZCBmb3IgcmVuZGVyaW5nXG4gICAqL1xuICBnZXQgdGVtcGxhdGVFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLmZpcnN0RWxlbWVudENoaWxkID09PSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGVtcGxhdGUpXG4gICAgICByZXR1cm4gdGVtcGxhdGVcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQgaW5zdGFuY2VvZiBIVE1MVGVtcGxhdGVFbGVtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnRDaGlsZFxuICAgIH1cbiAgICB0aGlzLiNyYWlzZShcImZpcnN0IGNoaWxkIGVsZW1lbnQgbXVzdCBiZSBhIDx0ZW1wbGF0ZT4gZWxlbWVudFwiKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgYWN0aW9uLlxuICAgKi9cbiAgZ2V0IGFjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHRhcmdldCAoYW4gZWxlbWVudCBJRCkgdG8gd2hpY2ggdGhlIHJlc3VsdCB3aWxsXG4gICAqIGJlIHJlbmRlcmVkLlxuICAgKi9cbiAgZ2V0IHRhcmdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IFwidGFyZ2V0c1wiIHNlbGVjdG9yIChhIENTUyBzZWxlY3RvcilcbiAgICovXG4gIGdldCB0YXJnZXRzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInRhcmdldHNcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgcmVxdWVzdC1pZCBhdHRyaWJ1dGVcbiAgICovXG4gIGdldCByZXF1ZXN0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwicmVxdWVzdC1pZFwiKVxuICB9XG5cbiAgI3JhaXNlKG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5kZXNjcmlwdGlvbn06ICR7bWVzc2FnZX1gKVxuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5vdXRlckhUTUwubWF0Y2goLzxbXj5dKz4vKSA/PyBbXSlbMF0gPz8gXCI8dHVyYm8tc3RyZWFtPlwiXG4gIH1cblxuICBnZXQgYmVmb3JlUmVuZGVyRXZlbnQoKSB7XG4gICAgcmV0dXJuIG5ldyBDdXN0b21FdmVudChcInR1cmJvOmJlZm9yZS1zdHJlYW0tcmVuZGVyXCIsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgZGV0YWlsOiB7IG5ld1N0cmVhbTogdGhpcywgcmVuZGVyOiBTdHJlYW1FbGVtZW50LnJlbmRlckVsZW1lbnQgfVxuICAgIH0pXG4gIH1cblxuICBnZXQgdGFyZ2V0RWxlbWVudHNCeUlkKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQ/LmdldEVsZW1lbnRCeUlkKHRoaXMudGFyZ2V0KVxuXG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbZWxlbWVudF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9XG5cbiAgZ2V0IHRhcmdldEVsZW1lbnRzQnlRdWVyeSgpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMub3duZXJEb2N1bWVudD8ucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldHMpXG5cbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IGNvbm5lY3RTdHJlYW1Tb3VyY2UsIGRpc2Nvbm5lY3RTdHJlYW1Tb3VyY2UgfSBmcm9tIFwiLi4vY29yZS9pbmRleFwiXG5cbmV4cG9ydCBjbGFzcyBTdHJlYW1Tb3VyY2VFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdHJlYW1Tb3VyY2UgPSBudWxsXG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zdHJlYW1Tb3VyY2UgPSB0aGlzLnNyYy5tYXRjaCgvXndzezEsMn06LykgPyBuZXcgV2ViU29ja2V0KHRoaXMuc3JjKSA6IG5ldyBFdmVudFNvdXJjZSh0aGlzLnNyYylcblxuICAgIGNvbm5lY3RTdHJlYW1Tb3VyY2UodGhpcy5zdHJlYW1Tb3VyY2UpXG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5zdHJlYW1Tb3VyY2UpIHtcbiAgICAgIHRoaXMuc3RyZWFtU291cmNlLmNsb3NlKClcblxuICAgICAgZGlzY29ubmVjdFN0cmVhbVNvdXJjZSh0aGlzLnN0cmVhbVNvdXJjZSlcbiAgICB9XG4gIH1cblxuICBnZXQgc3JjKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNyY1wiKSB8fCBcIlwiXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBGcmFtZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY29yZS9mcmFtZXMvZnJhbWVfY29udHJvbGxlclwiXG5pbXBvcnQgeyBGcmFtZUVsZW1lbnQgfSBmcm9tIFwiLi9mcmFtZV9lbGVtZW50XCJcbmltcG9ydCB7IFN0cmVhbUVsZW1lbnQgfSBmcm9tIFwiLi9zdHJlYW1fZWxlbWVudFwiXG5pbXBvcnQgeyBTdHJlYW1Tb3VyY2VFbGVtZW50IH0gZnJvbSBcIi4vc3RyZWFtX3NvdXJjZV9lbGVtZW50XCJcblxuRnJhbWVFbGVtZW50LmRlbGVnYXRlQ29uc3RydWN0b3IgPSBGcmFtZUNvbnRyb2xsZXJcblxuZXhwb3J0ICogZnJvbSBcIi4vZnJhbWVfZWxlbWVudFwiXG5leHBvcnQgKiBmcm9tIFwiLi9zdHJlYW1fZWxlbWVudFwiXG5leHBvcnQgKiBmcm9tIFwiLi9zdHJlYW1fc291cmNlX2VsZW1lbnRcIlxuXG5pZiAoY3VzdG9tRWxlbWVudHMuZ2V0KFwidHVyYm8tZnJhbWVcIikgPT09IHVuZGVmaW5lZCkge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJ0dXJiby1mcmFtZVwiLCBGcmFtZUVsZW1lbnQpXG59XG5cbmlmIChjdXN0b21FbGVtZW50cy5nZXQoXCJ0dXJiby1zdHJlYW1cIikgPT09IHVuZGVmaW5lZCkge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJ0dXJiby1zdHJlYW1cIiwgU3RyZWFtRWxlbWVudClcbn1cblxuaWYgKGN1c3RvbUVsZW1lbnRzLmdldChcInR1cmJvLXN0cmVhbS1zb3VyY2VcIikgPT09IHVuZGVmaW5lZCkge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJ0dXJiby1zdHJlYW0tc291cmNlXCIsIFN0cmVhbVNvdXJjZUVsZW1lbnQpXG59XG4iLCAiaW1wb3J0IHsgdW5pbmRlbnQgfSBmcm9tIFwiLi91dGlsXCJcbjsoKCkgPT4ge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHRcbiAgaWYgKCFlbGVtZW50KSByZXR1cm5cbiAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS10dXJiby1zdXBwcmVzcy13YXJuaW5nXCIpKSByZXR1cm5cblxuICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gIHdoaWxlIChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihcbiAgICAgICAgdW5pbmRlbnRgXG4gICAgICAgIFlvdSBhcmUgbG9hZGluZyBUdXJibyBmcm9tIGEgPHNjcmlwdD4gZWxlbWVudCBpbnNpZGUgdGhlIDxib2R5PiBlbGVtZW50LiBUaGlzIGlzIHByb2JhYmx5IG5vdCB3aGF0IHlvdSBtZWFudCB0byBkbyFcblxuICAgICAgICBMb2FkIHlvdXIgYXBwbGljYXRpb25cdTIwMTlzIEphdmFTY3JpcHQgYnVuZGxlIGluc2lkZSB0aGUgPGhlYWQ+IGVsZW1lbnQgaW5zdGVhZC4gPHNjcmlwdD4gZWxlbWVudHMgaW4gPGJvZHk+IGFyZSBldmFsdWF0ZWQgd2l0aCBlYWNoIHBhZ2UgY2hhbmdlLlxuXG4gICAgICAgIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWU6IGh0dHBzOi8vdHVyYm8uaG90d2lyZWQuZGV2L2hhbmRib29rL2J1aWxkaW5nI3dvcmtpbmctd2l0aC1zY3JpcHQtZWxlbWVudHNcblxuICAgICAgICBcdTIwMTRcdTIwMTRcbiAgICAgICAgU3VwcHJlc3MgdGhpcyB3YXJuaW5nIGJ5IGFkZGluZyBhIFwiZGF0YS10dXJiby1zdXBwcmVzcy13YXJuaW5nXCIgYXR0cmlidXRlIHRvOiAlc1xuICAgICAgYCxcbiAgICAgICAgZWxlbWVudC5vdXRlckhUTUxcbiAgICAgIClcbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gIH1cbn0pKClcbiIsICJpbXBvcnQgXCIuL3BvbHlmaWxsc1wiXG5pbXBvcnQgXCIuL2VsZW1lbnRzXCJcbmltcG9ydCBcIi4vc2NyaXB0X3dhcm5pbmdcIlxuaW1wb3J0IHsgU3RyZWFtQWN0aW9ucyB9IGZyb20gXCIuL2NvcmUvc3RyZWFtcy9zdHJlYW1fYWN0aW9uc1wiXG5cbmltcG9ydCAqIGFzIFR1cmJvIGZyb20gXCIuL2NvcmVcIlxuXG53aW5kb3cuVHVyYm8gPSB7IC4uLlR1cmJvLCBTdHJlYW1BY3Rpb25zIH1cblR1cmJvLnN0YXJ0KClcblxuZXhwb3J0IHsgU3RyZWFtQWN0aW9ucyB9XG5leHBvcnQgKiBmcm9tIFwiLi9jb3JlXCJcbmV4cG9ydCAqIGZyb20gXCIuL2VsZW1lbnRzXCJcbmV4cG9ydCAqIGZyb20gXCIuL2h0dHBcIlxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsR0FBQyxTQUFVLFdBQVc7QUFDcEIsUUFBSSxPQUFPLFVBQVUsaUJBQWlCLFdBQVk7QUFFbEQsY0FBVSxnQkFBZ0IsU0FBVSxXQUFXO0FBQzdDLFVBQUksV0FBVztBQUNiLDBCQUFrQixXQUFXLElBQUk7QUFDakMsa0JBQVUsTUFBTTtBQUFBLE1BQ2xCLE9BQU87QUFDTCxvQkFBWSxTQUFTLGNBQWMsT0FBTztBQUMxQyxrQkFBVSxPQUFPO0FBQ2pCLGtCQUFVLFNBQVM7QUFDbkIsYUFBSyxZQUFZLFNBQVM7QUFDMUIsa0JBQVUsTUFBTTtBQUNoQixhQUFLLFlBQVksU0FBUztBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUVBLGFBQVMsa0JBQWtCLFdBQVcsTUFBTTtBQUMxQywyQkFBcUIsZUFBZSxNQUFNLFdBQVcsMENBQTBDO0FBQy9GLGdCQUFVLFFBQVEsWUFBWSxNQUFNLFdBQVcsOENBQThDO0FBQzdGLGdCQUFVLFFBQVEsUUFDaEIsTUFBTSxjQUFjLDJEQUEyRCxlQUFlO0FBQUEsSUFDbEc7QUFFQSxhQUFTLE1BQU0sa0JBQWtCLFNBQVMsTUFBTTtBQUM5QyxZQUFNLElBQUksaUJBQWlCLDZEQUE2RCxVQUFVLEtBQUssSUFBSTtBQUFBLElBQzdHO0FBQUEsRUFDRixHQUFHLGdCQUFnQixTQUFTOzs7QUNuRDVCLE1BQU0sbUJBQW1CLG9CQUFJLFFBQVE7QUFFckMsV0FBUyw2QkFBNkIsUUFBUTtBQUM1QyxVQUFNLFVBQVUsa0JBQWtCLFVBQVUsU0FBUyxrQkFBa0IsT0FBTyxPQUFPLGdCQUFnQjtBQUNyRyxVQUFNLFlBQVksVUFBVSxRQUFRLFFBQVEsZUFBZSxJQUFJO0FBQy9ELFlBQU8sdUNBQVcsU0FBUSxXQUFXLFlBQVk7QUFBQSxF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SSxXQUFXLFNBQVMsTUFBTTtBQUM1QixlQUFPLFFBQVE7QUFBQSxVQUNiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFVQSxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFFQSxnQkFBVSxRQUFRO0FBQUEsSUFDcEI7QUFBQSxFQUNGLEdBQUc7OztBQ25CSCxTQUFPLFFBQVEsaUNBQUssZUFBTCxFQUFZLGNBQWM7QUFDekMsRUFBTSxNQUFNOyIsCiAgIm5hbWVzIjogWyJsb2NhdGlvbiIsICJsb2NhdGlvbiIsICJnZXRBY3Rpb24iLCAiY29va2llIiwgImxvY2F0aW9uIiwgImxvY2F0aW9uIiwgImxvY2F0aW9uIiwgIm5hdmlnYXRvciIsICJsb2NhdGlvbiIsICJzZXNzaW9uIiwgImxvY2F0aW9uIiwgInZpc2l0IiwgInNlc3Npb24iLCAibG9jYXRpb24iLCAibG9jYXRpb24iLCAibG9jYXRpb24iLCAidmlzaXQiLCAicG90ZW50aWFsTWF0Y2giLCAibG9jYXRpb24iLCAidmlzaXQiLCAibG9jYXRpb24iLCAibG9jYXRpb24iLCAic2Vzc2lvbiIsICJyZWNlbnRSZXF1ZXN0cyIsICJsb2NhdGlvbiIsICJ2aXNpdCIsICJuYXZpZ2F0b3IiLCAibG9jYXRpb24iLCAiZmluZEZyYW1lRWxlbWVudF9mbiIsICJkb2N1bWVudCIsICJsb2NhdGlvbiIsICJ2aXNpdCJdCn0K
