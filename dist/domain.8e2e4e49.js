// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleApi = exports.config = void 0;
var config = {
  MY_KEY: '15f45eafc4mshb706cfc1228c737p1480d2jsn9e9eeac4290e'
};
exports.config = config;
const googleApi = 'AIzaSyAT1fpWe017qA71w-wOIazxSyRMXI3c7dc';
exports.googleApi = googleApi;
},{}],"node_modules/@googlemaps/js-api-loader/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.DEFAULT_ID = void 0;

// do not edit .js files directly - edit src/index.jst
var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  } // true if both NaN, false otherwise


  return a !== a && b !== b;
};
/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const DEFAULT_ID = "__googleMapsScriptId";
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then(() => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */

exports.DEFAULT_ID = DEFAULT_ID;

class Loader {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({
    apiKey,
    channel,
    client,
    id = DEFAULT_ID,
    libraries = [],
    language,
    region,
    version,
    mapIds,
    nonce,
    retries = 3,
    url = "https://maps.googleapis.com/maps/api/js"
  }) {
    this.CALLBACK = "__googleMapsCallback";
    this.callbacks = [];
    this.done = false;
    this.loading = false;
    this.errors = [];
    this.version = version;
    this.apiKey = apiKey;
    this.channel = channel;
    this.client = client;
    this.id = id || DEFAULT_ID; // Do not allow empty string

    this.libraries = libraries;
    this.language = language;
    this.region = region;
    this.mapIds = mapIds;
    this.nonce = nonce;
    this.retries = retries;
    this.url = url;

    if (Loader.instance) {
      if (!fastDeepEqual(this.options, Loader.instance.options)) {
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
      }

      return Loader.instance;
    }

    Loader.instance = this;
  }

  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url
    };
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   */


  createUrl() {
    let url = this.url;
    url += `?callback=${this.CALLBACK}`;

    if (this.apiKey) {
      url += `&key=${this.apiKey}`;
    }

    if (this.channel) {
      url += `&channel=${this.channel}`;
    }

    if (this.client) {
      url += `&client=${this.client}`;
    }

    if (this.libraries.length > 0) {
      url += `&libraries=${this.libraries.join(",")}`;
    }

    if (this.language) {
      url += `&language=${this.language}`;
    }

    if (this.region) {
      url += `&region=${this.region}`;
    }

    if (this.version) {
      url += `&v=${this.version}`;
    }

    if (this.mapIds) {
      url += `&map_ids=${this.mapIds.join(",")}`;
    }

    return url;
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   */


  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   */


  loadPromise() {
    return new Promise((resolve, reject) => {
      this.loadCallback(err => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   */


  loadCallback(fn) {
    this.callbacks.push(fn);
    this.execute();
  }
  /**
   * Set the script on document.
   */


  setScript() {
    if (document.getElementById(this.id)) {
      // TODO wrap onerror callback for cases where the script was loaded elsewhere
      this.callback();
      return;
    }

    const url = this.createUrl();
    const script = document.createElement("script");
    script.id = this.id;
    script.type = "text/javascript";
    script.src = url;
    script.onerror = this.loadErrorCallback.bind(this);
    script.defer = true;
    script.async = true;

    if (this.nonce) {
      script.nonce = this.nonce;
    }

    document.head.appendChild(script);
  }

  deleteScript() {
    const script = document.getElementById(this.id);

    if (script) {
      script.remove();
    }
  }

  resetIfRetryingFailed() {
    const possibleAttempts = this.retries + 1;

    if (this.done && !this.loading && this.errors.length >= possibleAttempts) {
      this.deleteScript();
      this.done = false;
      this.loading = false;
      this.errors = [];
    }
  }

  loadErrorCallback(e) {
    this.errors.push(e);

    if (this.errors.length <= this.retries) {
      const delay = this.errors.length * Math.pow(2, this.errors.length);
      console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
      setTimeout(() => {
        this.deleteScript();
        this.setScript();
      }, delay);
    } else {
      this.onerrorEvent = e;
      this.callback();
    }
  }

  setCallback() {
    window.__googleMapsCallback = this.callback.bind(this);
  }

  callback() {
    this.done = true;
    this.loading = false;
    this.callbacks.forEach(cb => {
      cb(this.onerrorEvent);
    });
    this.callbacks = [];
  }

  execute() {
    if (window.google && window.google.maps && window.google.maps.version) {
      console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." + "This may result in undesirable behavior as options and script parameters may not match.");
      this.callback();
    }

    this.resetIfRetryingFailed();

    if (this.done) {
      this.callback();
    } else {
      if (this.loading) ;else {
        this.loading = true;
        this.setCallback();
        this.setScript();
      }
    }
  }

}

exports.Loader = Loader;
},{}],"domain.js":[function(require,module,exports) {
"use strict";

var _config = require("./config.js");

var _jsApiLoader = require("@googlemaps/js-api-loader");

//select all elements needed
const submitButton = document.querySelector('#sub');
const clearButton = document.querySelector('#clear');
const display = document.querySelector('#displayResults');
const input = document.querySelector('#inputId');
const mykey = _config.config.MY_KEY;
let map;
const loader = new _jsApiLoader.Loader({
  apiKey: _config.googleApi,
  version: "weekly"
});
loader.load().then(() => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 8
  });
}); //grab the data you need to display results

function domainData(data) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://domain-checker7.p.rapidapi.com/api/v2.0/domain",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-key": `${mykey}`,
      "x-rapidapi-host": "domain-checker7.p.rapidapi.com"
    },
    "data": {
      "domain": `${data}`
    }
  };
  const newData = $.ajax(settings).done(function (response) {
    return response;
  });
  return newData;
}

domainData('google.com'); //display those results onto the page

function html(data) {
  const markUp = `
   <h3>Domain: ${data.domain}</h3>
   <h3>Available: ${data.available}</h3>
   <h3>Created: ${data.created_at}</h3>
   <h3>Expires: ${data.expires_at}</h3>
   <h3>Registrar: ${data.registrar}</h3>
    `;
  return markUp;
}

function clear() {
  display.innerHTML = '';
  input.value = '';
  console.log('data cleared');
} //when the clear button is clicked clear the input
//when submit button is clicked get the value of the users input and attach to the query


submitButton.addEventListener('click', async function (e) {
  e.preventDefault();
  const value = input.value;
  const data = await domainData(value);
  console.log(data);
  display.innerHTML = html(data);
}, {
  once: false
});
clearButton.addEventListener('click', clear, {
  once: false
});
},{"./config.js":"config.js","@googlemaps/js-api-loader":"node_modules/@googlemaps/js-api-loader/dist/index.esm.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61506" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","domain.js"], null)
//# sourceMappingURL=/domain.8e2e4e49.js.map