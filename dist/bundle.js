/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Load CSS here
	**/
	
	__webpack_require__(1);
	
	/**
	 * initialize your app here
	**/
	__webpack_require__(5).init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "html,\nbody {\n\tpadding: 0;\n\tmargin: 0;\n}\n\nbody {\n\tfont-family: -apple-system, 'Helvetica Neue', Helvetica, sans-serif;\n}\n", ""]);
	
	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function app() {
	  'use strict';
	
	  var self = {};
	
	  var config = __webpack_require__(6);
	  var router = __webpack_require__(7);
	
	  self.init = function init() {
	    console.log('app.js - config is:', config);
	    router.init();
	  };
	
	  return self;
	}();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
	  key: 'value'
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function router() {
	  'use strict';
	
	  var crossroads = __webpack_require__(8);
	  var hasher = __webpack_require__(10);
	
	  var events = __webpack_require__(11);
	
	  var self = {};
	
	  var paths = [{
	    routes: ['home'],
	    template: 'home'
	  }, {
	    routes: ['page-1', 'page-2'],
	    template: 'page'
	  }];
	
	  var controllers = {};
	  var views = {};
	  self.past = '';
	  self.current = '';
	  self.queue = null;
	  self.transitionning = false;
	  self.transitionTimeout = false;
	  self.transitionTimeoutDelay = 20000;
	
	  events.add('transition');
	
	  for (var i = 0; i < paths.length; i++) {
	    var path = paths[i];
	    for (var j = 0; j < path.routes.length; j++) {
	      var route = path.routes[j];
	      controllers[route] = __webpack_require__(12)("./" + path.template);
	      views[route] = __webpack_require__(15)("./" + path.template + '.html');
	    }
	  }
	
	  self.init = function init() {
	    self.initEvents();
	
	    crossroads.bypassed.add(function (request) {
	      crossroads.parse('home');
	      setHashSilently('home');
	    });
	
	    crossroads.addRoute('/{route}', function (route) {
	      handleRoute(route);
	    });
	
	    hasher.initialized.add(parseHash);
	    hasher.changed.add(parseHash);
	    hasher.init();
	  };
	
	  self.initEvents = function initEvents() {
	    events.transition.on('transition-in-end', self, function (route) {
	      // Remove content from #main-new
	      removeOldView();
	      clearTimeout(this.transitionTimeout);
	      this.transitionning = false;
	      this.transitionTimeout = false;
	      if (this.queue) {
	        handleQueue();
	      }
	    });
	    events.transition.on('transition-out-end', self, function (fromRoute, toRoute) {
	      // add a class `route` to the body
	      setBodyClass(toRoute, fromRoute);
	      // init route controller
	
	      controllers[toRoute] && controllers[toRoute].init && controllers[toRoute].init(toRoute);
	    });
	  };
	
	  function handleRoute(route) {
	    if (self.transitionning === true) {
	      self.queue = route;
	      self.transitionTimeout = setTimeout(function () {
	        self.transitionning = false;
	
	        handleRoute(route);
	      }, self.transitionTimeoutDelay);
	      return;
	    }
	    self.transitionning = true;
	
	    // store the last route
	    self.past = self.current;
	    // store current route
	    self.current = route;
	    // destroy current controller
	    if (self.past) {
	      controllers[self.past].destroy();
	    }
	    // set route view   
	    addView(views[route]);
	
	    // Call transitionOut on previous view
	    if (controllers[self.past]) {
	      controllers[self.past].transitionOut(self.past, route);
	    } else {
	      events.transition.dispatch('transition-out-end', undefined, route);
	    }
	  }
	
	  function handleQueue() {
	    self.queue = null;
	    handleRoute(window.location.hash.replace('#/', ''));
	  }
	
	  function setBodyClass(route) {
	    document.body.classList.remove(self.past + '-view');
	    document.body.classList.add(route + '-view');
	  }
	
	  function parseHash(newHash, oldHash) {
	    crossroads.parse(newHash);
	  }
	
	  function setHashSilently(hash) {
	    hasher.changed.active = false; // disable changed signal
	    hasher.setHash(hash); // set hash without dispatching changed signal
	    hasher.changed.active = true; // re-enable signal
	  }
	
	  function addView(view) {
	    document.querySelector('#main-new').innerHTML = view;
	  }
	
	  function removeOldView() {
	    var oldContainer = document.querySelector('#main');
	    var newContainer = document.querySelector('#main-new');
	    oldContainer.id = 'main-new';
	    newContainer.id = 'main';
	    oldContainer.innerHTML = '';
	  }
	
	  return self;
	}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** @license
	 * crossroads <http://millermedeiros.github.com/crossroads.js/>
	 * Author: Miller Medeiros | MIT License
	 * v0.12.2 (2015/07/31 18:37)
	 */
	
	(function () {
	var factory = function (signals) {
	
	    var crossroads,
	        _hasOptionalGroupBug,
	        UNDEF;
	
	    // Helpers -----------
	    //====================
	
	    // IE 7-8 capture optional groups as empty strings while other browsers
	    // capture as `undefined`
	    _hasOptionalGroupBug = (/t(.+)?/).exec('t')[1] === '';
	
	    function arrayIndexOf(arr, val) {
	        if (arr.indexOf) {
	            return arr.indexOf(val);
	        } else {
	            //Array.indexOf doesn't work on IE 6-7
	            var n = arr.length;
	            while (n--) {
	                if (arr[n] === val) {
	                    return n;
	                }
	            }
	            return -1;
	        }
	    }
	
	    function arrayRemove(arr, item) {
	        var i = arrayIndexOf(arr, item);
	        if (i !== -1) {
	            arr.splice(i, 1);
	        }
	    }
	
	    function isKind(val, kind) {
	        return '[object '+ kind +']' === Object.prototype.toString.call(val);
	    }
	
	    function isRegExp(val) {
	        return isKind(val, 'RegExp');
	    }
	
	    function isArray(val) {
	        return isKind(val, 'Array');
	    }
	
	    function isFunction(val) {
	        return typeof val === 'function';
	    }
	
	    //borrowed from AMD-utils
	    function typecastValue(val) {
	        var r;
	        if (val === null || val === 'null') {
	            r = null;
	        } else if (val === 'true') {
	            r = true;
	        } else if (val === 'false') {
	            r = false;
	        } else if (val === UNDEF || val === 'undefined') {
	            r = UNDEF;
	        } else if (val === '' || isNaN(val)) {
	            //isNaN('') returns false
	            r = val;
	        } else {
	            //parseFloat(null || '') returns NaN
	            r = parseFloat(val);
	        }
	        return r;
	    }
	
	    function typecastArrayValues(values) {
	        var n = values.length,
	            result = [];
	        while (n--) {
	            result[n] = typecastValue(values[n]);
	        }
	        return result;
	    }
	
	    // borrowed from MOUT
	    function decodeQueryString(queryStr, shouldTypecast) {
	        var queryArr = (queryStr || '').replace('?', '').split('&'),
	            reg = /([^=]+)=(.+)/,
	            i = -1,
	            obj = {},
	            equalIndex, cur, pValue, pName;
	
	        while ((cur = queryArr[++i])) {
	            equalIndex = cur.indexOf('=');
	            pName = cur.substring(0, equalIndex);
	            pValue = decodeURIComponent(cur.substring(equalIndex + 1));
	            if (shouldTypecast !== false) {
	                pValue = typecastValue(pValue);
	            }
	            if (pName in obj){
	                if(isArray(obj[pName])){
	                    obj[pName].push(pValue);
	                } else {
	                    obj[pName] = [obj[pName], pValue];
	                }
	            } else {
	                obj[pName] = pValue;
	           }
	        }
	        return obj;
	    }
	
	
	    // Crossroads --------
	    //====================
	
	    /**
	     * @constructor
	     */
	    function Crossroads() {
	        this.bypassed = new signals.Signal();
	        this.routed = new signals.Signal();
	        this._routes = [];
	        this._prevRoutes = [];
	        this._piped = [];
	        this.resetState();
	    }
	
	    Crossroads.prototype = {
	
	        greedy : false,
	
	        greedyEnabled : true,
	
	        ignoreCase : true,
	
	        ignoreState : false,
	
	        shouldTypecast : false,
	
	        normalizeFn : null,
	
	        resetState : function(){
	            this._prevRoutes.length = 0;
	            this._prevMatchedRequest = null;
	            this._prevBypassedRequest = null;
	        },
	
	        create : function () {
	            return new Crossroads();
	        },
	
	        addRoute : function (pattern, callback, priority) {
	            var route = new Route(pattern, callback, priority, this);
	            this._sortedInsert(route);
	            return route;
	        },
	
	        removeRoute : function (route) {
	            arrayRemove(this._routes, route);
	            route._destroy();
	        },
	
	        removeAllRoutes : function () {
	            var n = this.getNumRoutes();
	            while (n--) {
	                this._routes[n]._destroy();
	            }
	            this._routes.length = 0;
	        },
	
	        parse : function (request, defaultArgs) {
	            request = request || '';
	            defaultArgs = defaultArgs || [];
	
	            // should only care about different requests if ignoreState isn't true
	            if ( !this.ignoreState &&
	                (request === this._prevMatchedRequest ||
	                 request === this._prevBypassedRequest) ) {
	                return;
	            }
	
	            var routes = this._getMatchedRoutes(request),
	                i = 0,
	                n = routes.length,
	                cur;
	
	            if (n) {
	                this._prevMatchedRequest = request;
	
	                this._notifyPrevRoutes(routes, request);
	                this._prevRoutes = routes;
	                //should be incremental loop, execute routes in order
	                while (i < n) {
	                    cur = routes[i];
	                    cur.route.matched.dispatch.apply(cur.route.matched, defaultArgs.concat(cur.params));
	                    cur.isFirst = !i;
	                    this.routed.dispatch.apply(this.routed, defaultArgs.concat([request, cur]));
	                    i += 1;
	                }
	            } else {
	                this._prevBypassedRequest = request;
	                this.bypassed.dispatch.apply(this.bypassed, defaultArgs.concat([request]));
	            }
	
	            this._pipeParse(request, defaultArgs);
	        },
	
	        _notifyPrevRoutes : function(matchedRoutes, request) {
	            var i = 0, prev;
	            while (prev = this._prevRoutes[i++]) {
	                //check if switched exist since route may be disposed
	                if(prev.route.switched && this._didSwitch(prev.route, matchedRoutes)) {
	                    prev.route.switched.dispatch(request);
	                }
	            }
	        },
	
	        _didSwitch : function (route, matchedRoutes){
	            var matched,
	                i = 0;
	            while (matched = matchedRoutes[i++]) {
	                // only dispatch switched if it is going to a different route
	                if (matched.route === route) {
	                    return false;
	                }
	            }
	            return true;
	        },
	
	        _pipeParse : function(request, defaultArgs) {
	            var i = 0, route;
	            while (route = this._piped[i++]) {
	                route.parse(request, defaultArgs);
	            }
	        },
	
	        getNumRoutes : function () {
	            return this._routes.length;
	        },
	
	        _sortedInsert : function (route) {
	            //simplified insertion sort
	            var routes = this._routes,
	                n = routes.length;
	            do { --n; } while (routes[n] && route._priority <= routes[n]._priority);
	            routes.splice(n+1, 0, route);
	        },
	
	        _getMatchedRoutes : function (request) {
	            var res = [],
	                routes = this._routes,
	                n = routes.length,
	                route;
	            //should be decrement loop since higher priorities are added at the end of array
	            while (route = routes[--n]) {
	                if ((!res.length || this.greedy || route.greedy) && route.match(request)) {
	                    res.push({
	                        route : route,
	                        params : route._getParamsArray(request)
	                    });
	                }
	                if (!this.greedyEnabled && res.length) {
	                    break;
	                }
	            }
	            return res;
	        },
	
	        pipe : function (otherRouter) {
	            this._piped.push(otherRouter);
	        },
	
	        unpipe : function (otherRouter) {
	            arrayRemove(this._piped, otherRouter);
	        },
	
	        toString : function () {
	            return '[crossroads numRoutes:'+ this.getNumRoutes() +']';
	        }
	    };
	
	    //"static" instance
	    crossroads = new Crossroads();
	    crossroads.VERSION = '0.12.2';
	
	    crossroads.NORM_AS_ARRAY = function (req, vals) {
	        return [vals.vals_];
	    };
	
	    crossroads.NORM_AS_OBJECT = function (req, vals) {
	        return [vals];
	    };
	
	
	    // Route --------------
	    //=====================
	
	    /**
	     * @constructor
	     */
	    function Route(pattern, callback, priority, router) {
	        var isRegexPattern = isRegExp(pattern),
	            patternLexer = router.patternLexer;
	        this._router = router;
	        this._pattern = pattern;
	        this._paramsIds = isRegexPattern? null : patternLexer.getParamIds(pattern);
	        this._optionalParamsIds = isRegexPattern? null : patternLexer.getOptionalParamsIds(pattern);
	        this._matchRegexp = isRegexPattern? pattern : patternLexer.compilePattern(pattern, router.ignoreCase);
	        this.matched = new signals.Signal();
	        this.switched = new signals.Signal();
	        if (callback) {
	            this.matched.add(callback);
	        }
	        this._priority = priority || 0;
	    }
	
	    Route.prototype = {
	
	        greedy : false,
	
	        rules : void(0),
	
	        match : function (request) {
	            request = request || '';
	            return this._matchRegexp.test(request) && this._validateParams(request); //validate params even if regexp because of `request_` rule.
	        },
	
	        _validateParams : function (request) {
	            var rules = this.rules,
	                values = this._getParamsObject(request),
	                key;
	            for (key in rules) {
	                // normalize_ isn't a validation rule... (#39)
	                if(key !== 'normalize_' && rules.hasOwnProperty(key) && ! this._isValidParam(request, key, values)){
	                    return false;
	                }
	            }
	            return true;
	        },
	
	        _isValidParam : function (request, prop, values) {
	            var validationRule = this.rules[prop],
	                val = values[prop],
	                isValid = false,
	                isQuery = (prop.indexOf('?') === 0);
	
	            if (val == null && this._optionalParamsIds && arrayIndexOf(this._optionalParamsIds, prop) !== -1) {
	                isValid = true;
	            }
	            else if (isRegExp(validationRule)) {
	                if (isQuery) {
	                    val = values[prop +'_']; //use raw string
	                }
	                isValid = validationRule.test(val);
	            }
	            else if (isArray(validationRule)) {
	                if (isQuery) {
	                    val = values[prop +'_']; //use raw string
	                }
	                isValid = this._isValidArrayRule(validationRule, val);
	            }
	            else if (isFunction(validationRule)) {
	                isValid = validationRule(val, request, values);
	            }
	
	            return isValid; //fail silently if validationRule is from an unsupported type
	        },
	
	        _isValidArrayRule : function (arr, val) {
	            if (! this._router.ignoreCase) {
	                return arrayIndexOf(arr, val) !== -1;
	            }
	
	            if (typeof val === 'string') {
	                val = val.toLowerCase();
	            }
	
	            var n = arr.length,
	                item,
	                compareVal;
	
	            while (n--) {
	                item = arr[n];
	                compareVal = (typeof item === 'string')? item.toLowerCase() : item;
	                if (compareVal === val) {
	                    return true;
	                }
	            }
	            return false;
	        },
	
	        _getParamsObject : function (request) {
	            var shouldTypecast = this._router.shouldTypecast,
	                values = this._router.patternLexer.getParamValues(request, this._matchRegexp, shouldTypecast),
	                o = {},
	                n = values.length,
	                param, val;
	            while (n--) {
	                val = values[n];
	                if (this._paramsIds) {
	                    param = this._paramsIds[n];
	                    if (param.indexOf('?') === 0 && val) {
	                        //make a copy of the original string so array and
	                        //RegExp validation can be applied properly
	                        o[param +'_'] = val;
	                        //update vals_ array as well since it will be used
	                        //during dispatch
	                        val = decodeQueryString(val, shouldTypecast);
	                        values[n] = val;
	                    }
	                    // IE will capture optional groups as empty strings while other
	                    // browsers will capture `undefined` so normalize behavior.
	                    // see: #gh-58, #gh-59, #gh-60
	                    if ( _hasOptionalGroupBug && val === '' && arrayIndexOf(this._optionalParamsIds, param) !== -1 ) {
	                        val = void(0);
	                        values[n] = val;
	                    }
	                    o[param] = val;
	                }
	                //alias to paths and for RegExp pattern
	                o[n] = val;
	            }
	            o.request_ = shouldTypecast? typecastValue(request) : request;
	            o.vals_ = values;
	            return o;
	        },
	
	        _getParamsArray : function (request) {
	            var norm = this.rules? this.rules.normalize_ : null,
	                params;
	            norm = norm || this._router.normalizeFn; // default normalize
	            if (norm && isFunction(norm)) {
	                params = norm(request, this._getParamsObject(request));
	            } else {
	                params = this._getParamsObject(request).vals_;
	            }
	            return params;
	        },
	
	        interpolate : function(replacements) {
	            var str = this._router.patternLexer.interpolate(this._pattern, replacements);
	            if (! this._validateParams(str) ) {
	                throw new Error('Generated string doesn\'t validate against `Route.rules`.');
	            }
	            return str;
	        },
	
	        dispose : function () {
	            this._router.removeRoute(this);
	        },
	
	        _destroy : function () {
	            this.matched.dispose();
	            this.switched.dispose();
	            this.matched = this.switched = this._pattern = this._matchRegexp = null;
	        },
	
	        toString : function () {
	            return '[Route pattern:"'+ this._pattern +'", numListeners:'+ this.matched.getNumListeners() +']';
	        }
	
	    };
	
	
	
	    // Pattern Lexer ------
	    //=====================
	
	    Crossroads.prototype.patternLexer = (function () {
	
	        var
	            //match chars that should be escaped on string regexp
	            ESCAPE_CHARS_REGEXP = /[\\.+*?\^$\[\](){}\/'#]/g,
	
	            //trailing slashes (begin/end of string)
	            LOOSE_SLASHES_REGEXP = /^\/|\/$/g,
	            LEGACY_SLASHES_REGEXP = /\/$/g,
	
	            //params - everything between `{ }` or `: :`
	            PARAMS_REGEXP = /(?:\{|:)([^}:]+)(?:\}|:)/g,
	
	            //used to save params during compile (avoid escaping things that
	            //shouldn't be escaped).
	            TOKENS = {
	                'OS' : {
	                    //optional slashes
	                    //slash between `::` or `}:` or `\w:` or `:{?` or `}{?` or `\w{?`
	                    rgx : /([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,
	                    save : '$1{{id}}$2',
	                    res : '\\/?'
	                },
	                'RS' : {
	                    //required slashes
	                    //used to insert slash between `:{` and `}{`
	                    rgx : /([:}])\/?(\{)/g,
	                    save : '$1{{id}}$2',
	                    res : '\\/'
	                },
	                'RQ' : {
	                    //required query string - everything in between `{? }`
	                    rgx : /\{\?([^}]+)\}/g,
	                    //everything from `?` till `#` or end of string
	                    res : '\\?([^#]+)'
	                },
	                'OQ' : {
	                    //optional query string - everything in between `:? :`
	                    rgx : /:\?([^:]+):/g,
	                    //everything from `?` till `#` or end of string
	                    res : '(?:\\?([^#]*))?'
	                },
	                'OR' : {
	                    //optional rest - everything in between `: *:`
	                    rgx : /:([^:]+)\*:/g,
	                    res : '(.*)?' // optional group to avoid passing empty string as captured
	                },
	                'RR' : {
	                    //rest param - everything in between `{ *}`
	                    rgx : /\{([^}]+)\*\}/g,
	                    res : '(.+)'
	                },
	                // required/optional params should come after rest segments
	                'RP' : {
	                    //required params - everything between `{ }`
	                    rgx : /\{([^}]+)\}/g,
	                    res : '([^\\/?]+)'
	                },
	                'OP' : {
	                    //optional params - everything between `: :`
	                    rgx : /:([^:]+):/g,
	                    res : '([^\\/?]+)?\/?'
	                }
	            },
	
	            LOOSE_SLASH = 1,
	            STRICT_SLASH = 2,
	            LEGACY_SLASH = 3,
	
	            _slashMode = LOOSE_SLASH;
	
	
	        function precompileTokens(){
	            var key, cur;
	            for (key in TOKENS) {
	                if (TOKENS.hasOwnProperty(key)) {
	                    cur = TOKENS[key];
	                    cur.id = '__CR_'+ key +'__';
	                    cur.save = ('save' in cur)? cur.save.replace('{{id}}', cur.id) : cur.id;
	                    cur.rRestore = new RegExp(cur.id, 'g');
	                }
	            }
	        }
	        precompileTokens();
	
	
	        function captureVals(regex, pattern) {
	            var vals = [], match;
	            // very important to reset lastIndex since RegExp can have "g" flag
	            // and multiple runs might affect the result, specially if matching
	            // same string multiple times on IE 7-8
	            regex.lastIndex = 0;
	            while (match = regex.exec(pattern)) {
	                vals.push(match[1]);
	            }
	            return vals;
	        }
	
	        function getParamIds(pattern) {
	            return captureVals(PARAMS_REGEXP, pattern);
	        }
	
	        function getOptionalParamsIds(pattern) {
	            return captureVals(TOKENS.OP.rgx, pattern);
	        }
	
	        function compilePattern(pattern, ignoreCase) {
	            pattern = pattern || '';
	
	            if(pattern){
	                if (_slashMode === LOOSE_SLASH) {
	                    pattern = pattern.replace(LOOSE_SLASHES_REGEXP, '');
	                }
	                else if (_slashMode === LEGACY_SLASH) {
	                    pattern = pattern.replace(LEGACY_SLASHES_REGEXP, '');
	                }
	
	                //save tokens
	                pattern = replaceTokens(pattern, 'rgx', 'save');
	                //regexp escape
	                pattern = pattern.replace(ESCAPE_CHARS_REGEXP, '\\$&');
	                //restore tokens
	                pattern = replaceTokens(pattern, 'rRestore', 'res');
	
	                if (_slashMode === LOOSE_SLASH) {
	                    pattern = '\\/?'+ pattern;
	                }
	            }
	
	            if (_slashMode !== STRICT_SLASH) {
	                //single slash is treated as empty and end slash is optional
	                pattern += '\\/?';
	            }
	            return new RegExp('^'+ pattern + '$', ignoreCase? 'i' : '');
	        }
	
	        function replaceTokens(pattern, regexpName, replaceName) {
	            var cur, key;
	            for (key in TOKENS) {
	                if (TOKENS.hasOwnProperty(key)) {
	                    cur = TOKENS[key];
	                    pattern = pattern.replace(cur[regexpName], cur[replaceName]);
	                }
	            }
	            return pattern;
	        }
	
	        function getParamValues(request, regexp, shouldTypecast) {
	            var vals = regexp.exec(request);
	            if (vals) {
	                vals.shift();
	                if (shouldTypecast) {
	                    vals = typecastArrayValues(vals);
	                }
	            }
	            return vals;
	        }
	
	        function interpolate(pattern, replacements) {
	            // default to an empty object because pattern might have just
	            // optional arguments
	            replacements = replacements || {};
	            if (typeof pattern !== 'string') {
	                throw new Error('Route pattern should be a string.');
	            }
	
	            var replaceFn = function(match, prop){
	                    var val;
	                    prop = (prop.substr(0, 1) === '?')? prop.substr(1) : prop;
	                    if (replacements[prop] != null) {
	                        if (typeof replacements[prop] === 'object') {
	                            var queryParts = [], rep;
	                            for(var key in replacements[prop]) {
	                                rep = replacements[prop][key];
	                                if (isArray(rep)) {
	                                    for (var k in rep) {
	                                        if ( key.slice(-2) == '[]' ) {
	                                            queryParts.push(encodeURI(key.slice(0, -2)) + '[]=' + encodeURI(rep[k]));
	                                        } else {
	                                            queryParts.push(encodeURI(key + '=' + rep[k]));
	                                        }
	                                    }
	                                }
	                                else {
	                                    queryParts.push(encodeURI(key + '=' + rep));
	                                }
	                            }
	                            val = '?' + queryParts.join('&');
	                        } else {
	                            // make sure value is a string see #gh-54
	                            val = String(replacements[prop]);
	                        }
	
	                        if (match.indexOf('*') === -1 && val.indexOf('/') !== -1) {
	                            throw new Error('Invalid value "'+ val +'" for segment "'+ match +'".');
	                        }
	                    }
	                    else if (match.indexOf('{') !== -1) {
	                        throw new Error('The segment '+ match +' is required.');
	                    }
	                    else {
	                        val = '';
	                    }
	                    return val;
	                };
	
	            if (! TOKENS.OS.trail) {
	                TOKENS.OS.trail = new RegExp('(?:'+ TOKENS.OS.id +')+$');
	            }
	
	            return pattern
	                        .replace(TOKENS.OS.rgx, TOKENS.OS.save)
	                        .replace(PARAMS_REGEXP, replaceFn)
	                        .replace(TOKENS.OS.trail, '') // remove trailing
	                        .replace(TOKENS.OS.rRestore, '/'); // add slash between segments
	        }
	
	        //API
	        return {
	            strict : function(){
	                _slashMode = STRICT_SLASH;
	            },
	            loose : function(){
	                _slashMode = LOOSE_SLASH;
	            },
	            legacy : function(){
	                _slashMode = LEGACY_SLASH;
	            },
	            getParamIds : getParamIds,
	            getOptionalParamsIds : getOptionalParamsIds,
	            getParamValues : getParamValues,
	            compilePattern : compilePattern,
	            interpolate : interpolate
	        };
	
	    }());
	
	
	    return crossroads;
	};
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) { //Node
	    module.exports = factory(require('signals'));
	} else {
	    /*jshint sub:true */
	    window['crossroads'] = factory(window['signals']);
	}
	
	}());
	


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
	/*global define:false, require:false, exports:false, module:false, signals:false */
	
	/** @license
	 * JS Signals <http://millermedeiros.github.com/js-signals/>
	 * Released under the MIT license
	 * Author: Miller Medeiros
	 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
	 */
	
	(function(global){
	
	    // SignalBinding -------------------------------------------------
	    //================================================================
	
	    /**
	     * Object that represents a binding between a Signal and a listener function.
	     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
	     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
	     * @author Miller Medeiros
	     * @constructor
	     * @internal
	     * @name SignalBinding
	     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
	     * @param {Function} listener Handler function bound to the signal.
	     * @param {boolean} isOnce If binding should be executed just once.
	     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	     * @param {Number} [priority] The priority level of the event listener. (default = 0).
	     */
	    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
	
	        /**
	         * Handler function bound to the signal.
	         * @type Function
	         * @private
	         */
	        this._listener = listener;
	
	        /**
	         * If binding should be executed just once.
	         * @type boolean
	         * @private
	         */
	        this._isOnce = isOnce;
	
	        /**
	         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	         * @memberOf SignalBinding.prototype
	         * @name context
	         * @type Object|undefined|null
	         */
	        this.context = listenerContext;
	
	        /**
	         * Reference to Signal object that listener is currently bound to.
	         * @type Signal
	         * @private
	         */
	        this._signal = signal;
	
	        /**
	         * Listener priority
	         * @type Number
	         * @private
	         */
	        this._priority = priority || 0;
	    }
	
	    SignalBinding.prototype = {
	
	        /**
	         * If binding is active and should be executed.
	         * @type boolean
	         */
	        active : true,
	
	        /**
	         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
	         * @type Array|null
	         */
	        params : null,
	
	        /**
	         * Call listener passing arbitrary parameters.
	         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
	         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
	         * @return {*} Value returned by the listener.
	         */
	        execute : function (paramsArr) {
	            var handlerReturn, params;
	            if (this.active && !!this._listener) {
	                params = this.params? this.params.concat(paramsArr) : paramsArr;
	                handlerReturn = this._listener.apply(this.context, params);
	                if (this._isOnce) {
	                    this.detach();
	                }
	            }
	            return handlerReturn;
	        },
	
	        /**
	         * Detach binding from signal.
	         * - alias to: mySignal.remove(myBinding.getListener());
	         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
	         */
	        detach : function () {
	            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
	        },
	
	        /**
	         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
	         */
	        isBound : function () {
	            return (!!this._signal && !!this._listener);
	        },
	
	        /**
	         * @return {boolean} If SignalBinding will only be executed once.
	         */
	        isOnce : function () {
	            return this._isOnce;
	        },
	
	        /**
	         * @return {Function} Handler function bound to the signal.
	         */
	        getListener : function () {
	            return this._listener;
	        },
	
	        /**
	         * @return {Signal} Signal that listener is currently bound to.
	         */
	        getSignal : function () {
	            return this._signal;
	        },
	
	        /**
	         * Delete instance properties
	         * @private
	         */
	        _destroy : function () {
	            delete this._signal;
	            delete this._listener;
	            delete this.context;
	        },
	
	        /**
	         * @return {string} String representation of the object.
	         */
	        toString : function () {
	            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
	        }
	
	    };
	
	
	/*global SignalBinding:false*/
	
	    // Signal --------------------------------------------------------
	    //================================================================
	
	    function validateListener(listener, fnName) {
	        if (typeof listener !== 'function') {
	            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
	        }
	    }
	
	    /**
	     * Custom event broadcaster
	     * <br />- inspired by Robert Penner's AS3 Signals.
	     * @name Signal
	     * @author Miller Medeiros
	     * @constructor
	     */
	    function Signal() {
	        /**
	         * @type Array.<SignalBinding>
	         * @private
	         */
	        this._bindings = [];
	        this._prevParams = null;
	
	        // enforce dispatch to aways work on same context (#47)
	        var self = this;
	        this.dispatch = function(){
	            Signal.prototype.dispatch.apply(self, arguments);
	        };
	    }
	
	    Signal.prototype = {
	
	        /**
	         * Signals Version Number
	         * @type String
	         * @const
	         */
	        VERSION : '1.0.0',
	
	        /**
	         * If Signal should keep record of previously dispatched parameters and
	         * automatically execute listener during `add()`/`addOnce()` if Signal was
	         * already dispatched before.
	         * @type boolean
	         */
	        memorize : false,
	
	        /**
	         * @type boolean
	         * @private
	         */
	        _shouldPropagate : true,
	
	        /**
	         * If Signal is active and should broadcast events.
	         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
	         * @type boolean
	         */
	        active : true,
	
	        /**
	         * @param {Function} listener
	         * @param {boolean} isOnce
	         * @param {Object} [listenerContext]
	         * @param {Number} [priority]
	         * @return {SignalBinding}
	         * @private
	         */
	        _registerListener : function (listener, isOnce, listenerContext, priority) {
	
	            var prevIndex = this._indexOfListener(listener, listenerContext),
	                binding;
	
	            if (prevIndex !== -1) {
	                binding = this._bindings[prevIndex];
	                if (binding.isOnce() !== isOnce) {
	                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
	                }
	            } else {
	                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
	                this._addBinding(binding);
	            }
	
	            if(this.memorize && this._prevParams){
	                binding.execute(this._prevParams);
	            }
	
	            return binding;
	        },
	
	        /**
	         * @param {SignalBinding} binding
	         * @private
	         */
	        _addBinding : function (binding) {
	            //simplified insertion sort
	            var n = this._bindings.length;
	            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
	            this._bindings.splice(n + 1, 0, binding);
	        },
	
	        /**
	         * @param {Function} listener
	         * @return {number}
	         * @private
	         */
	        _indexOfListener : function (listener, context) {
	            var n = this._bindings.length,
	                cur;
	            while (n--) {
	                cur = this._bindings[n];
	                if (cur._listener === listener && cur.context === context) {
	                    return n;
	                }
	            }
	            return -1;
	        },
	
	        /**
	         * Check if listener was attached to Signal.
	         * @param {Function} listener
	         * @param {Object} [context]
	         * @return {boolean} if Signal has the specified listener.
	         */
	        has : function (listener, context) {
	            return this._indexOfListener(listener, context) !== -1;
	        },
	
	        /**
	         * Add a listener to the signal.
	         * @param {Function} listener Signal handler function.
	         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
	         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
	         */
	        add : function (listener, listenerContext, priority) {
	            validateListener(listener, 'add');
	            return this._registerListener(listener, false, listenerContext, priority);
	        },
	
	        /**
	         * Add listener to the signal that should be removed after first execution (will be executed only once).
	         * @param {Function} listener Signal handler function.
	         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
	         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
	         */
	        addOnce : function (listener, listenerContext, priority) {
	            validateListener(listener, 'addOnce');
	            return this._registerListener(listener, true, listenerContext, priority);
	        },
	
	        /**
	         * Remove a single listener from the dispatch queue.
	         * @param {Function} listener Handler function that should be removed.
	         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
	         * @return {Function} Listener handler function.
	         */
	        remove : function (listener, context) {
	            validateListener(listener, 'remove');
	
	            var i = this._indexOfListener(listener, context);
	            if (i !== -1) {
	                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
	                this._bindings.splice(i, 1);
	            }
	            return listener;
	        },
	
	        /**
	         * Remove all listeners from the Signal.
	         */
	        removeAll : function () {
	            var n = this._bindings.length;
	            while (n--) {
	                this._bindings[n]._destroy();
	            }
	            this._bindings.length = 0;
	        },
	
	        /**
	         * @return {number} Number of listeners attached to the Signal.
	         */
	        getNumListeners : function () {
	            return this._bindings.length;
	        },
	
	        /**
	         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
	         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
	         * @see Signal.prototype.disable
	         */
	        halt : function () {
	            this._shouldPropagate = false;
	        },
	
	        /**
	         * Dispatch/Broadcast Signal to all listeners added to the queue.
	         * @param {...*} [params] Parameters that should be passed to each handler.
	         */
	        dispatch : function (params) {
	            if (! this.active) {
	                return;
	            }
	
	            var paramsArr = Array.prototype.slice.call(arguments),
	                n = this._bindings.length,
	                bindings;
	
	            if (this.memorize) {
	                this._prevParams = paramsArr;
	            }
	
	            if (! n) {
	                //should come after memorize
	                return;
	            }
	
	            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
	            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.
	
	            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
	            //reverse loop since listeners with higher priority will be added at the end of the list
	            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
	        },
	
	        /**
	         * Forget memorized arguments.
	         * @see Signal.memorize
	         */
	        forget : function(){
	            this._prevParams = null;
	        },
	
	        /**
	         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
	         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
	         */
	        dispose : function () {
	            this.removeAll();
	            delete this._bindings;
	            delete this._prevParams;
	        },
	
	        /**
	         * @return {string} String representation of the object.
	         */
	        toString : function () {
	            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
	        }
	
	    };
	
	
	    // Namespace -----------------------------------------------------
	    //================================================================
	
	    /**
	     * Signals namespace
	     * @namespace
	     * @name signals
	     */
	    var signals = Signal;
	
	    /**
	     * Custom event broadcaster
	     * @see Signal
	     */
	    // alias for backwards compatibility (see #gh-44)
	    signals.Signal = Signal;
	
	
	
	    //exports to multiple environments
	    if(true){ //AMD
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return signals; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module.exports){ //node
	        module.exports = signals;
	    } else { //browser
	        //use string because of Google closure compiler ADVANCED_MODE
	        /*jslint sub:true */
	        global['signals'] = signals;
	    }
	
	}(this));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!!
	 * Hasher <http://github.com/millermedeiros/hasher>
	 * @author Miller Medeiros
	 * @version 1.2.0 (2013/11/11 03:18 PM)
	 * Released under the MIT License
	 */
	
	;(function () {
	var factory = function(signals){
	
	/*jshint white:false*/
	/*global signals:false, window:false*/
	
	/**
	 * Hasher
	 * @namespace History Manager for rich-media applications.
	 * @name hasher
	 */
	var hasher = (function(window){
	
	    //--------------------------------------------------------------------------------------
	    // Private Vars
	    //--------------------------------------------------------------------------------------
	
	    var
	
	        // frequency that it will check hash value on IE 6-7 since it doesn't
	        // support the hashchange event
	        POOL_INTERVAL = 25,
	
	        // local storage for brevity and better compression --------------------------------
	
	        document = window.document,
	        history = window.history,
	        Signal = signals.Signal,
	
	        // local vars ----------------------------------------------------------------------
	
	        hasher,
	        _hash,
	        _checkInterval,
	        _isActive,
	        _frame, //iframe used for legacy IE (6-7)
	        _checkHistory,
	        _hashValRegexp = /#(.*)$/,
	        _baseUrlRegexp = /(\?.*)|(\#.*)/,
	        _hashRegexp = /^\#/,
	
	        // sniffing/feature detection -------------------------------------------------------
	
	        //hack based on this: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
	        _isIE = (!+"\v1"),
	        // hashchange is supported by FF3.6+, IE8+, Chrome 5+, Safari 5+ but
	        // feature detection fails on IE compatibility mode, so we need to
	        // check documentMode
	        _isHashChangeSupported = ('onhashchange' in window) && document.documentMode !== 7,
	        //check if is IE6-7 since hash change is only supported on IE8+ and
	        //changing hash value on IE6-7 doesn't generate history record.
	        _isLegacyIE = _isIE && !_isHashChangeSupported,
	        _isLocal = (location.protocol === 'file:');
	
	
	    //--------------------------------------------------------------------------------------
	    // Private Methods
	    //--------------------------------------------------------------------------------------
	
	    function _escapeRegExp(str){
	        return String(str || '').replace(/\W/g, "\\$&");
	    }
	
	    function _trimHash(hash){
	        if (!hash) return '';
	        var regexp = new RegExp('^' + _escapeRegExp(hasher.prependHash) + '|' + _escapeRegExp(hasher.appendHash) + '$', 'g');
	        return hash.replace(regexp, '');
	    }
	
	    function _getWindowHash(){
	        //parsed full URL instead of getting window.location.hash because Firefox decode hash value (and all the other browsers don't)
	        //also because of IE8 bug with hash query in local file [issue #6]
	        var result = _hashValRegexp.exec( hasher.getURL() );
	        var path = (result && result[1]) || '';
	        try {
	          return hasher.raw? path : decodeURIComponent(path);
	        } catch (e) {
	          // in case user did not set `hasher.raw` and decodeURIComponent
	          // throws an error (see #57)
	          return path;
	        }
	    }
	
	    function _getFrameHash(){
	        return (_frame)? _frame.contentWindow.frameHash : null;
	    }
	
	    function _createFrame(){
	        _frame = document.createElement('iframe');
	        _frame.src = 'about:blank';
	        _frame.style.display = 'none';
	        document.body.appendChild(_frame);
	    }
	
	    function _updateFrame(){
	        if(_frame && _hash !== _getFrameHash()){
	            var frameDoc = _frame.contentWindow.document;
	            frameDoc.open();
	            //update iframe content to force new history record.
	            //based on Really Simple History, SWFAddress and YUI.history.
	            frameDoc.write('<html><head><title>' + document.title + '</title><script type="text/javascript">var frameHash="' + _hash + '";</script></head><body>&nbsp;</body></html>');
	            frameDoc.close();
	        }
	    }
	
	    function _registerChange(newHash, isReplace){
	        if(_hash !== newHash){
	            var oldHash = _hash;
	            _hash = newHash; //should come before event dispatch to make sure user can get proper value inside event handler
	            if(_isLegacyIE){
	                if(!isReplace){
	                    _updateFrame();
	                } else {
	                    _frame.contentWindow.frameHash = newHash;
	                }
	            }
	            hasher.changed.dispatch(_trimHash(newHash), _trimHash(oldHash));
	        }
	    }
	
	    if (_isLegacyIE) {
	        /**
	         * @private
	         */
	        _checkHistory = function(){
	            var windowHash = _getWindowHash(),
	                frameHash = _getFrameHash();
	            if(frameHash !== _hash && frameHash !== windowHash){
	                //detect changes made pressing browser history buttons.
	                //Workaround since history.back() and history.forward() doesn't
	                //update hash value on IE6/7 but updates content of the iframe.
	                //needs to trim hash since value stored already have
	                //prependHash + appendHash for fast check.
	                hasher.setHash(_trimHash(frameHash));
	            } else if (windowHash !== _hash){
	                //detect if hash changed (manually or using setHash)
	                _registerChange(windowHash);
	            }
	        };
	    } else {
	        /**
	         * @private
	         */
	        _checkHistory = function(){
	            var windowHash = _getWindowHash();
	            if(windowHash !== _hash){
	                _registerChange(windowHash);
	            }
	        };
	    }
	
	    function _addListener(elm, eType, fn){
	        if(elm.addEventListener){
	            elm.addEventListener(eType, fn, false);
	        } else if (elm.attachEvent){
	            elm.attachEvent('on' + eType, fn);
	        }
	    }
	
	    function _removeListener(elm, eType, fn){
	        if(elm.removeEventListener){
	            elm.removeEventListener(eType, fn, false);
	        } else if (elm.detachEvent){
	            elm.detachEvent('on' + eType, fn);
	        }
	    }
	
	    function _makePath(paths){
	        paths = Array.prototype.slice.call(arguments);
	
	        var path = paths.join(hasher.separator);
	        path = path? hasher.prependHash + path.replace(_hashRegexp, '') + hasher.appendHash : path;
	        return path;
	    }
	
	    function _encodePath(path){
	        //used encodeURI instead of encodeURIComponent to preserve '?', '/',
	        //'#'. Fixes Safari bug [issue #8]
	        path = encodeURI(path);
	        if(_isIE && _isLocal){
	            //fix IE8 local file bug [issue #6]
	            path = path.replace(/\?/, '%3F');
	        }
	        return path;
	    }
	
	    //--------------------------------------------------------------------------------------
	    // Public (API)
	    //--------------------------------------------------------------------------------------
	
	    hasher = /** @lends hasher */ {
	
	        /**
	         * hasher Version Number
	         * @type string
	         * @constant
	         */
	        VERSION : '1.2.0',
	
	        /**
	         * Boolean deciding if hasher encodes/decodes the hash or not.
	         * <ul>
	         * <li>default value: false;</li>
	         * </ul>
	         * @type boolean
	         */
	        raw : false,
	
	        /**
	         * String that should always be added to the end of Hash value.
	         * <ul>
	         * <li>default value: '';</li>
	         * <li>will be automatically removed from `hasher.getHash()`</li>
	         * <li>avoid conflicts with elements that contain ID equal to hash value;</li>
	         * </ul>
	         * @type string
	         */
	        appendHash : '',
	
	        /**
	         * String that should always be added to the beginning of Hash value.
	         * <ul>
	         * <li>default value: '/';</li>
	         * <li>will be automatically removed from `hasher.getHash()`</li>
	         * <li>avoid conflicts with elements that contain ID equal to hash value;</li>
	         * </ul>
	         * @type string
	         */
	        prependHash : '/',
	
	        /**
	         * String used to split hash paths; used by `hasher.getHashAsArray()` to split paths.
	         * <ul>
	         * <li>default value: '/';</li>
	         * </ul>
	         * @type string
	         */
	        separator : '/',
	
	        /**
	         * Signal dispatched when hash value changes.
	         * - pass current hash as 1st parameter to listeners and previous hash value as 2nd parameter.
	         * @type signals.Signal
	         */
	        changed : new Signal(),
	
	        /**
	         * Signal dispatched when hasher is stopped.
	         * -  pass current hash as first parameter to listeners
	         * @type signals.Signal
	         */
	        stopped : new Signal(),
	
	        /**
	         * Signal dispatched when hasher is initialized.
	         * - pass current hash as first parameter to listeners.
	         * @type signals.Signal
	         */
	        initialized : new Signal(),
	
	        /**
	         * Start listening/dispatching changes in the hash/history.
	         * <ul>
	         *   <li>hasher won't dispatch CHANGE events by manually typing a new value or pressing the back/forward buttons before calling this method.</li>
	         * </ul>
	         */
	        init : function(){
	            if(_isActive) return;
	
	            _hash = _getWindowHash();
	
	            //thought about branching/overloading hasher.init() to avoid checking multiple times but
	            //don't think worth doing it since it probably won't be called multiple times.
	            if(_isHashChangeSupported){
	                _addListener(window, 'hashchange', _checkHistory);
	            }else {
	                if(_isLegacyIE){
	                    if(! _frame){
	                        _createFrame();
	                    }
	                    _updateFrame();
	                }
	                _checkInterval = setInterval(_checkHistory, POOL_INTERVAL);
	            }
	
	            _isActive = true;
	            hasher.initialized.dispatch(_trimHash(_hash));
	        },
	
	        /**
	         * Stop listening/dispatching changes in the hash/history.
	         * <ul>
	         *   <li>hasher won't dispatch CHANGE events by manually typing a new value or pressing the back/forward buttons after calling this method, unless you call hasher.init() again.</li>
	         *   <li>hasher will still dispatch changes made programatically by calling hasher.setHash();</li>
	         * </ul>
	         */
	        stop : function(){
	            if(! _isActive) return;
	
	            if(_isHashChangeSupported){
	                _removeListener(window, 'hashchange', _checkHistory);
	            }else{
	                clearInterval(_checkInterval);
	                _checkInterval = null;
	            }
	
	            _isActive = false;
	            hasher.stopped.dispatch(_trimHash(_hash));
	        },
	
	        /**
	         * @return {boolean}    If hasher is listening to changes on the browser history and/or hash value.
	         */
	        isActive : function(){
	            return _isActive;
	        },
	
	        /**
	         * @return {string} Full URL.
	         */
	        getURL : function(){
	            return window.location.href;
	        },
	
	        /**
	         * @return {string} Retrieve URL without query string and hash.
	         */
	        getBaseURL : function(){
	            return hasher.getURL().replace(_baseUrlRegexp, ''); //removes everything after '?' and/or '#'
	        },
	
	        /**
	         * Set Hash value, generating a new history record.
	         * @param {...string} path    Hash value without '#'. Hasher will join
	         * path segments using `hasher.separator` and prepend/append hash value
	         * with `hasher.appendHash` and `hasher.prependHash`
	         * @example hasher.setHash('lorem', 'ipsum', 'dolor') -> '#/lorem/ipsum/dolor'
	         */
	        setHash : function(path){
	            path = _makePath.apply(null, arguments);
	            if(path !== _hash){
	                // we should store raw value
	                _registerChange(path);
	                if (path === _hash) {
	                    // we check if path is still === _hash to avoid error in
	                    // case of multiple consecutive redirects [issue #39]
	                    if (! hasher.raw) {
	                        path = _encodePath(path);
	                    }
	                    window.location.hash = '#' + path;
	                }
	            }
	        },
	
	        /**
	         * Set Hash value without keeping previous hash on the history record.
	         * Similar to calling `window.location.replace("#/hash")` but will also work on IE6-7.
	         * @param {...string} path    Hash value without '#'. Hasher will join
	         * path segments using `hasher.separator` and prepend/append hash value
	         * with `hasher.appendHash` and `hasher.prependHash`
	         * @example hasher.replaceHash('lorem', 'ipsum', 'dolor') -> '#/lorem/ipsum/dolor'
	         */
	        replaceHash : function(path){
	            path = _makePath.apply(null, arguments);
	            if(path !== _hash){
	                // we should store raw value
	                _registerChange(path, true);
	                if (path === _hash) {
	                    // we check if path is still === _hash to avoid error in
	                    // case of multiple consecutive redirects [issue #39]
	                    if (! hasher.raw) {
	                        path = _encodePath(path);
	                    }
	                    window.location.replace('#' + path);
	                }
	            }
	        },
	
	        /**
	         * @return {string} Hash value without '#', `hasher.appendHash` and `hasher.prependHash`.
	         */
	        getHash : function(){
	            //didn't used actual value of the `window.location.hash` to avoid breaking the application in case `window.location.hash` isn't available and also because value should always be synched.
	            return _trimHash(_hash);
	        },
	
	        /**
	         * @return {Array.<string>} Hash value split into an Array.
	         */
	        getHashAsArray : function(){
	            return hasher.getHash().split(hasher.separator);
	        },
	
	        /**
	         * Removes all event listeners, stops hasher and destroy hasher object.
	         * - IMPORTANT: hasher won't work after calling this method, hasher Object will be deleted.
	         */
	        dispose : function(){
	            hasher.stop();
	            hasher.initialized.dispose();
	            hasher.stopped.dispose();
	            hasher.changed.dispose();
	            _frame = hasher = window.hasher = null;
	        },
	
	        /**
	         * @return {string} A string representation of the object.
	         */
	        toString : function(){
	            return '[hasher version="'+ hasher.VERSION +'" hash="'+ hasher.getHash() +'"]';
	        }
	
	    };
	
	    hasher.initialized.memorize = true; //see #33
	
	    return hasher;
	
	}(window));
	
	
	    return hasher;
	};
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
	    module.exports = factory(require('signals'));
	} else {
	    /*jshint sub:true */
	    window['hasher'] = factory(window['signals']);
	}
	
	}());


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function transitionEvents() {
	  'use strict';
	
	  var Signal = __webpack_require__(9);
	
	  var self = {};
	
	  // TODO: Need a refactoring on functions added to Signal object
	
	  /**
	   * Create a new Signal object with listener function from eventName
	   * 
	   * @param {string} eventName - the name of the event you want to create 
	   */
	  self.add = function add(eventName) {
	    self[eventName] = new Signal();
	
	    /**
	     * Add an easier event listener and transmit any arguments passed to the signal.dispatch()
	     * 
	     * @param {string} targetEventName - the event name you want to listen
	     * @param {object} context - the context in which the cb must be called (will become `this` in callback) 
	     * @param {function} cb - the callback executed when target event is fired
	     */
	    self[eventName].on = function (targetEventName, context, cb) {
	      self[eventName].add(function (eventName) {
	        if (eventName === targetEventName) {
	          // Remove eventName from arguments passed to cb
	          Array.prototype.shift.apply(arguments);
	          typeof cb === 'function' ? cb.apply(context, arguments) : console.error('not a function on %s callback', targetEventName);
	        }
	      }, context);
	    };
	  };
	
	  return self;
	}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./home": 13,
		"./home.js": 13,
		"./page": 14,
		"./page.js": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 12;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function home() {
	  'use strict';
	
	  var events = __webpack_require__(11);
	
	  var ctrl = {};
	
	  ctrl.init = function init(toRoute) {
	    console.log('home.js - init home controller.');
	    // Launch transition In
	    ctrl.transitionIn(toRoute);
	  };
	
	  ctrl.transitionIn = function transitionIn(route) {
	    events.transition.dispatch('transition-in-end', route);
	  };
	
	  ctrl.transitionOut = function transitionOut(fromRoute, toRoute) {
	    events.transition.dispatch('transition-out-end', fromRoute);
	  };
	
	  ctrl.destroy = function destroy() {};
	
	  return ctrl;
	}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function page() {
	  'use strict';
	
	  var events = __webpack_require__(11);
	
	  var ctrl = {};
	
	  ctrl.init = function init(toRoute) {
	    console.log('page.js - init page controller.');
	    // Launch transition In
	    ctrl.transitionIn(toRoute);
	  };
	
	  ctrl.transitionIn = function transitionIn(route) {
	    events.transition.dispatch('transition-in-end', route);
	  };
	
	  ctrl.transitionOut = function transitionOut(fromRoute, toRoute) {
	    events.transition.dispatch('transition-out-end', fromRoute);
	  };
	
	  ctrl.destroy = function destroy() {};
	
	  return ctrl;
	}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./home.html": 16,
		"./page.html": 17
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 15;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = "<h2>Home view</h2>\n\n<a href=\"#/page-1\">Go to page 1</a>\n<a href=\"#/page-2\">Go to page 2</a>\n\n";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = "<h2>Page view</h2>\n\n<a href=\"#/home\">Go to home</a>\n\n";

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map