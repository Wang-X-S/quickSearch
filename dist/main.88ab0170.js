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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $addWeb = $('.addWeb');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'aliyun',
  logoType: 'svgSelf',
  url: 'https://www.aliyun.com/'
}, {
  logo: 'bilibili',
  logoType: 'svgSelf',
  url: 'https://www.bilibili.com/'
}, {
  logo: 'cndblogs',
  logoType: 'svgSelf',
  url: 'https://www.cnblogs.com/'
}, {
  logo: 'GitHub',
  logoType: 'svgSelf',
  url: 'https://github.com/'
}, {
  logo: 'Stackoverflow',
  logoType: 'svgSelf',
  url: 'https://stackoverflow.com/'
}, {
  logo: 'Leetcode',
  logoType: 'svgSelf',
  url: 'https://leetcode-cn.com/'
}, {
  logo: 'zhihu',
  logoType: 'svgSelf',
  url: 'https://www.zhihu.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '') // ?????? / ???????????????
  .replace('.com', '').replace('.cn', '');
};

var render = function render() {
  $siteList.find('li:not(.addWeb)').remove();
  hashMap.forEach(function (node, index) {
    if (node.logoType === 'svgSelf') {
      var $li = $("\n            <li>\n\n                    <div class=\"site\">\n                        <div class=\"logo\">\n                            <svg class=\"icon\" aria-hidden=\"true\">\n                                <use xlink:href=\"#icon-".concat(node.logo.toLowerCase(), "\"></use>\n                            </svg>\n                        </div>\n                        <dig class=\"link\">").concat(node.logo, "</dig>\n                        <div class=\"delete\">\n                            <svg class=\"icon\" >\n                                <use xlink:href=\"#icon-delete\"></use>\n                            </svg>\n                        </div>\n                    </div>\n                \n            </li>\n            ")).insertBefore($addWeb);
      $li.on('click', function () {
        window.open(node.url);
      });
      $li.on('click', '.delete', function (e) {
        e.stopPropagation(); //????????????

        hashMap.splice(index, 1);
        render();
      });
    } else {
      var _$li = $("\n            <li>\n \n                    <div class=\"site\">\n                        <div class=\"logo\">\n                            ".concat(simplifyUrl(node.url)[0].toUpperCase(), "\n                        </div>\n                        <dig class=\"link\">").concat(simplifyUrl(node.url), "</dig>\n                        <div class=\"delete\">\n                        <svg class=\"icon\" >\n                            <use xlink:href=\"#icon-delete\"></use>\n                        </svg>\n                    </div>\n                    </div>\n\n            </li>\n            ")).insertBefore($addWeb);

      _$li.on('click', function () {
        window.open(node.url);
      });

      _$li.on('click', '.delete', function (e) {
        e.stopPropagation(); //????????????

        hashMap.splice(index, 1);
        render();
      });
    }
  });
};

render();
$('.addButton').on('click', function () {
  console.log('123');
  var url = window.prompt('??????????????????????????????');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: 'text',
    url: url
  });
  render(); // const $li = $(`
  //           <li>       
  //               <a href="${url}">
  //                 <div class="site">
  //                     <div class="logo">
  //                         ${url[0]}
  //                     </div>
  //                     <dig class="link">${url}</dig>
  //                 </div>     
  //              </a>
  //          </li>`).insertBefore('.addWeb')
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;
  hashMap.forEach(function (node) {
    if (node.logo.toLowerCase()[0] === key) {
      window.open(node.url);
    }
  });
});
$(document).on('keypress', function (e) {
  var key = e.key;
  xObject.forEach(function (node) {
    if (node.logo === key) {
      window.open(node.url);
    }
  });
});
render();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.88ab0170.js.map