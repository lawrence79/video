/** 
* video - v0.3.1.
* https://github.com/mkay581/video.git
* Copyright 2015 Mark Kennedy. Licensed MIT.
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.Video=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";var c,d=a("./element"),e=a("./image-element"),f=0,g={};b.exports=function(){var a=function(a){this.initialize(a)};return a.prototype={initialize:function(){var a=this;c||document.body.kit||(c=Object.defineProperty(window.Element.prototype,"kit",{get:function(){return a.setup(this)}}))},setup:function(a){var b;return g[a._kitId]||(b=a instanceof window.HTMLImageElement?e:d,f++,a._kitId=f,g[a._kitId]=new b(a)),g[a._kitId]},destroy:function(){}},new a}()},{"./element":2,"./image-element":3}],2:[function(a,b){"use strict";var c=a("./utils"),d=(a("./element-kit"),function(a){this.initialize(a)});d.prototype={initialize:function(a){this.el=a,this.classList=this._getClassList(),this._eventListenerMap=this._eventListenerMap||[],Object.defineProperty(this,"dataset",{get:function(){return this.getData()}.bind(this)})},_traverseEachParent:function(a,b){for(var c,d=b||this.el;d&&"string"==typeof d.className&&(c=a(d),void 0===c||c);)d=d.parentNode},appendOuterHtml:function(a){var b=this.el.parentNode,d=c.createHtmlElement(a);return b?b.replaceChild(d,this.el):(b=document.createDocumentFragment(),b.appendChild(d)),d.appendChild(this.el),d},getUniqueId:function(){return this.el._kitId},getClosestAncestorElementByClassName:function(a){var b;return this._traverseEachParent(function(c){return c.kit._hasClass(a)?(b=c,!1):void 0},this.el.parentNode),b},addEventListener:function(a,b,c,d){var e=b;d=d||{},"function"!=typeof e&&(e=this._createEventListener(c[b],c)),this.el.addEventListener(a,e,d.useCapture),this._eventListenerMap.push({event:a,listener:e,listenerId:b,context:c})},_createEventListener:function(a,b){return function(){b=b||this,a.apply(b,arguments)}},removeEventListener:function(a,b,c){var d,e,f=this._eventListenerMap||[];if(f.length)for(d=0;d<f.length;d++)if(e=f[d],e&&e.event===a&&e.listenerId===b&&e.context===c){this.el.removeEventListener(a,e.listener),this._eventListenerMap[d]=null;break}},waitForTransition:function(a){var b=this.getTransitionDuration();a&&(b>0?setTimeout(a.bind(this,this.el),b):a(this.el))},getTransitionDuration:function(){var a,b=this.getCssComputedProperty("transition-delay")||"0ms",c=this.getCssComputedProperty("transition-duration")||"0ms",d=Array.isArray(c)?c:[c],e=Array.isArray(b)?b:[b],f=0;return d.push.apply(d,e),d.forEach(function(b){b.split(",").forEach(function(b){b=this._convertCssTimeValueToMilliseconds(b),a=this._getCssPropUnitMap(b),a.num>f&&(f=a.num)}.bind(this))}.bind(this)),f},getCssComputedProperty:function(a){var b=window.getComputedStyle(this.el);return b.getPropertyValue(a)||this.el.style[this._getJsPropName(a)]},_getCssPropUnitMap:function(a){a.trim();var b=a.match("[0-9.]+"),c="ms";return b=b?b[0]:"",b&&(c=a.split(b)[1],b=Number(b)),{num:b,unit:c}},_convertCssTimeValueToMilliseconds:function(a){var b=this._getCssPropUnitMap(a).num,c=a.replace(b,"");return a="s"===c?1e3*b:b,a+"ms"},_getClassList:function(){return{add:this._addClass.bind(this),remove:this._removeClass.bind(this),contains:this._hasClass.bind(this),toggle:this._toggleClass.bind(this)}},_getCssClasses:function(){return this.el.className.split(" ")},_toggleClass:function(a){this._hasClass(a)?this._removeClass(a):this._addClass(a)},_addClass:function(){"classList"in document.createElement("_")?this._each(arguments,function(a){this.el.classList.add(a)}.bind(this)):this._each(arguments,function(a){this._hasClass(a)||(this.el.className=this.el.className?this.el.className+" "+a:a)}.bind(this))},_each:function(a,b){var c,d=a.length;for(c=0;d>c;c++)b(a[c])},_removeClass:function(){var a;"classList"in document.createElement("_")?this._each(arguments,function(a){this.el.classList.remove(a)}.bind(this)):this._each(arguments,function(b){this.el.className===b?this.el.className="":(a="[\\s]*"+b,a=new RegExp(a,"i"),this.el.className=this.el.className.replace(a,""))}.bind(this))},_hasClass:function(a){var b=this._getCssClasses();return-1!==b.indexOf(a)},_getJsPropName:function(a){return a=a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})},getAttributes:function(){var a=this.el.attributes,b={};if(a.length)for(var c=0;c<a.length;c++)b[a[c].name]=a[c].value;return b},_getDomData:function(){var a,b,c=this.getAttributes(),d={};for(a in c)c.hasOwnProperty(a)&&(b=c[a],0===a.indexOf("data-")&&(a=a.substr(5),d[a]=b));return d},getData:function(){var a;this._data=c.extend({},this._data,this._getDomData());for(a in this._data)if(this._data.hasOwnProperty(a)){var b=this._data[a];Object.defineProperty(this._data,a,{writeable:!0,get:function(){return b}.bind(this),set:function(b){this.setData.bind(this,a,b)}.bind(this)})}return this._data},setData:function(a,b){this.el.setAttribute("data-"+a,b),this._data[a]=b},destroy:function(){}},b.exports=d},{"./element-kit":1,"./utils":4}],3:[function(a,b){"use strict";var c=a("./utils"),d=a("./element"),e=function(a){d.prototype.initialize.call(this,a)};e.prototype=c.extend({},d.prototype,{load:function(a,b){var c=this.el,d=c.getAttribute(a)||a;return d||console.warn('ElementKit error: ImageElement has no "'+a+'" attribute to load'),-1!==d.indexOf(",")&&(d=this._getImageSourceSetPath(d)),this._loadImage(d,b),this},_loadImage:function(a,b){var c=this.el;c.onload=function(){b?b(c):null},c.src=a},_getImageSourceSetPath:function(a){var b,c,d,e,f,g=window.innerWidth,h=window.innerHeight;return a.split(",").forEach(function(a){c=this._buildSourceMapWidthHeight(a),d=c.width||0,e=c.height||0,!f&&g>=d&&h>=e&&(b=a.split(" ")[0],f=!0)}.bind(this)),b},_buildSourceMapWidthHeight:function(a,b){var c,d=a.split(" "),e=function(a){return Number(a.substr(0,a.length-1))};return b=b||{},d.shift(),d.forEach(function(a){c=a.charAt(a.length-1),"w"===c?b.width=e(a):"h"===c&&(b.height=e(a))}),b}}),b.exports=e},{"./element":2,"./utils":4}],4:[function(a,b){b.exports={createHtmlElement:function(a){var b,c;return a?(a=a.trim(a),b=document.createElement("div"),b.innerHTML=a,c=b.childNodes[0],b.removeChild(c)):void 0},extend:function(a){var b,c,d=a;for(c=1;c<arguments.length;c++){b=arguments[c];for(var e in b)b.hasOwnProperty(e)&&(d[e]=b[e])}return d}}},{}],5:[function(b,c,d){(function(){function b(a){function b(b,c,d,e,f,g){for(;f>=0&&g>f;f+=a){var h=e?e[f]:f;d=c(d,b[h],h,b)}return d}return function(c,d,e,f){d=v(d,f,4);var g=!A(c)&&u.keys(c),h=(g||c).length,i=a>0?0:h-1;return arguments.length<3&&(e=c[g?g[i]:i],i+=a),b(c,d,e,g,i,h)}}function e(a){return function(b,c,d){c=w(c,d);for(var e=null!=b&&b.length,f=a>0?0:e-1;f>=0&&e>f;f+=a)if(c(b[f],f,b))return f;return-1}}function f(a,b){var c=F.length,d=a.constructor,e=u.isFunction(d)&&d.prototype||j,f="constructor";for(u.has(a,f)&&!u.contains(b,f)&&b.push(f);c--;)f=F[c],f in a&&a[f]!==e[f]&&!u.contains(b,f)&&b.push(f)}var g=this,h=g._,i=Array.prototype,j=Object.prototype,k=Function.prototype,l=i.push,m=i.slice,n=j.toString,o=j.hasOwnProperty,p=Array.isArray,q=Object.keys,r=k.bind,s=Object.create,t=function(){},u=function(a){return a instanceof u?a:this instanceof u?void(this._wrapped=a):new u(a)};"undefined"!=typeof d?("undefined"!=typeof c&&c.exports&&(d=c.exports=u),d._=u):g._=u,u.VERSION="1.8.2";var v=function(a,b,c){if(void 0===b)return a;switch(null==c?3:c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)}}return function(){return a.apply(b,arguments)}},w=function(a,b,c){return null==a?u.identity:u.isFunction(a)?v(a,b,c):u.isObject(a)?u.matcher(a):u.property(a)};u.iteratee=function(a,b){return w(a,b,1/0)};var x=function(a,b){return function(c){var d=arguments.length;if(2>d||null==c)return c;for(var e=1;d>e;e++)for(var f=arguments[e],g=a(f),h=g.length,i=0;h>i;i++){var j=g[i];b&&void 0!==c[j]||(c[j]=f[j])}return c}},y=function(a){if(!u.isObject(a))return{};if(s)return s(a);t.prototype=a;var b=new t;return t.prototype=null,b},z=Math.pow(2,53)-1,A=function(a){var b=a&&a.length;return"number"==typeof b&&b>=0&&z>=b};u.each=u.forEach=function(a,b,c){b=v(b,c);var d,e;if(A(a))for(d=0,e=a.length;e>d;d++)b(a[d],d,a);else{var f=u.keys(a);for(d=0,e=f.length;e>d;d++)b(a[f[d]],f[d],a)}return a},u.map=u.collect=function(a,b,c){b=w(b,c);for(var d=!A(a)&&u.keys(a),e=(d||a).length,f=Array(e),g=0;e>g;g++){var h=d?d[g]:g;f[g]=b(a[h],h,a)}return f},u.reduce=u.foldl=u.inject=b(1),u.reduceRight=u.foldr=b(-1),u.find=u.detect=function(a,b,c){var d;return d=A(a)?u.findIndex(a,b,c):u.findKey(a,b,c),void 0!==d&&-1!==d?a[d]:void 0},u.filter=u.select=function(a,b,c){var d=[];return b=w(b,c),u.each(a,function(a,c,e){b(a,c,e)&&d.push(a)}),d},u.reject=function(a,b,c){return u.filter(a,u.negate(w(b)),c)},u.every=u.all=function(a,b,c){b=w(b,c);for(var d=!A(a)&&u.keys(a),e=(d||a).length,f=0;e>f;f++){var g=d?d[f]:f;if(!b(a[g],g,a))return!1}return!0},u.some=u.any=function(a,b,c){b=w(b,c);for(var d=!A(a)&&u.keys(a),e=(d||a).length,f=0;e>f;f++){var g=d?d[f]:f;if(b(a[g],g,a))return!0}return!1},u.contains=u.includes=u.include=function(a,b,c){return A(a)||(a=u.values(a)),u.indexOf(a,b,"number"==typeof c&&c)>=0},u.invoke=function(a,b){var c=m.call(arguments,2),d=u.isFunction(b);return u.map(a,function(a){var e=d?b:a[b];return null==e?e:e.apply(a,c)})},u.pluck=function(a,b){return u.map(a,u.property(b))},u.where=function(a,b){return u.filter(a,u.matcher(b))},u.findWhere=function(a,b){return u.find(a,u.matcher(b))},u.max=function(a,b,c){var d,e,f=-(1/0),g=-(1/0);if(null==b&&null!=a){a=A(a)?a:u.values(a);for(var h=0,i=a.length;i>h;h++)d=a[h],d>f&&(f=d)}else b=w(b,c),u.each(a,function(a,c,d){e=b(a,c,d),(e>g||e===-(1/0)&&f===-(1/0))&&(f=a,g=e)});return f},u.min=function(a,b,c){var d,e,f=1/0,g=1/0;if(null==b&&null!=a){a=A(a)?a:u.values(a);for(var h=0,i=a.length;i>h;h++)d=a[h],f>d&&(f=d)}else b=w(b,c),u.each(a,function(a,c,d){e=b(a,c,d),(g>e||e===1/0&&f===1/0)&&(f=a,g=e)});return f},u.shuffle=function(a){for(var b,c=A(a)?a:u.values(a),d=c.length,e=Array(d),f=0;d>f;f++)b=u.random(0,f),b!==f&&(e[f]=e[b]),e[b]=c[f];return e},u.sample=function(a,b,c){return null==b||c?(A(a)||(a=u.values(a)),a[u.random(a.length-1)]):u.shuffle(a).slice(0,Math.max(0,b))},u.sortBy=function(a,b,c){return b=w(b,c),u.pluck(u.map(a,function(a,c,d){return{value:a,index:c,criteria:b(a,c,d)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index-b.index}),"value")};var B=function(a){return function(b,c,d){var e={};return c=w(c,d),u.each(b,function(d,f){var g=c(d,f,b);a(e,d,g)}),e}};u.groupBy=B(function(a,b,c){u.has(a,c)?a[c].push(b):a[c]=[b]}),u.indexBy=B(function(a,b,c){a[c]=b}),u.countBy=B(function(a,b,c){u.has(a,c)?a[c]++:a[c]=1}),u.toArray=function(a){return a?u.isArray(a)?m.call(a):A(a)?u.map(a,u.identity):u.values(a):[]},u.size=function(a){return null==a?0:A(a)?a.length:u.keys(a).length},u.partition=function(a,b,c){b=w(b,c);var d=[],e=[];return u.each(a,function(a,c,f){(b(a,c,f)?d:e).push(a)}),[d,e]},u.first=u.head=u.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:u.initial(a,a.length-b)},u.initial=function(a,b,c){return m.call(a,0,Math.max(0,a.length-(null==b||c?1:b)))},u.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:u.rest(a,Math.max(0,a.length-b))},u.rest=u.tail=u.drop=function(a,b,c){return m.call(a,null==b||c?1:b)},u.compact=function(a){return u.filter(a,u.identity)};var C=function(a,b,c,d){for(var e=[],f=0,g=d||0,h=a&&a.length;h>g;g++){var i=a[g];if(A(i)&&(u.isArray(i)||u.isArguments(i))){b||(i=C(i,b,c));var j=0,k=i.length;for(e.length+=k;k>j;)e[f++]=i[j++]}else c||(e[f++]=i)}return e};u.flatten=function(a,b){return C(a,b,!1)},u.without=function(a){return u.difference(a,m.call(arguments,1))},u.uniq=u.unique=function(a,b,c,d){if(null==a)return[];u.isBoolean(b)||(d=c,c=b,b=!1),null!=c&&(c=w(c,d));for(var e=[],f=[],g=0,h=a.length;h>g;g++){var i=a[g],j=c?c(i,g,a):i;b?(g&&f===j||e.push(i),f=j):c?u.contains(f,j)||(f.push(j),e.push(i)):u.contains(e,i)||e.push(i)}return e},u.union=function(){return u.uniq(C(arguments,!0,!0))},u.intersection=function(a){if(null==a)return[];for(var b=[],c=arguments.length,d=0,e=a.length;e>d;d++){var f=a[d];if(!u.contains(b,f)){for(var g=1;c>g&&u.contains(arguments[g],f);g++);g===c&&b.push(f)}}return b},u.difference=function(a){var b=C(arguments,!0,!0,1);return u.filter(a,function(a){return!u.contains(b,a)})},u.zip=function(){return u.unzip(arguments)},u.unzip=function(a){for(var b=a&&u.max(a,"length").length||0,c=Array(b),d=0;b>d;d++)c[d]=u.pluck(a,d);return c},u.object=function(a,b){for(var c={},d=0,e=a&&a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},u.indexOf=function(a,b,c){var d=0,e=a&&a.length;if("number"==typeof c)d=0>c?Math.max(0,e+c):c;else if(c&&e)return d=u.sortedIndex(a,b),a[d]===b?d:-1;if(b!==b)return u.findIndex(m.call(a,d),u.isNaN);for(;e>d;d++)if(a[d]===b)return d;return-1},u.lastIndexOf=function(a,b,c){var d=a?a.length:0;if("number"==typeof c&&(d=0>c?d+c+1:Math.min(d,c+1)),b!==b)return u.findLastIndex(m.call(a,0,d),u.isNaN);for(;--d>=0;)if(a[d]===b)return d;return-1},u.findIndex=e(1),u.findLastIndex=e(-1),u.sortedIndex=function(a,b,c,d){c=w(c,d,1);for(var e=c(b),f=0,g=a.length;g>f;){var h=Math.floor((f+g)/2);c(a[h])<e?f=h+1:g=h}return f},u.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=c||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=Array(d),f=0;d>f;f++,a+=c)e[f]=a;return e};var D=function(a,b,c,d,e){if(!(d instanceof b))return a.apply(c,e);var f=y(a.prototype),g=a.apply(f,e);return u.isObject(g)?g:f};u.bind=function(a,b){if(r&&a.bind===r)return r.apply(a,m.call(arguments,1));if(!u.isFunction(a))throw new TypeError("Bind must be called on a function");var c=m.call(arguments,2),d=function(){return D(a,d,b,this,c.concat(m.call(arguments)))};return d},u.partial=function(a){var b=m.call(arguments,1),c=function(){for(var d=0,e=b.length,f=Array(e),g=0;e>g;g++)f[g]=b[g]===u?arguments[d++]:b[g];for(;d<arguments.length;)f.push(arguments[d++]);return D(a,c,this,this,f)};return c},u.bindAll=function(a){var b,c,d=arguments.length;if(1>=d)throw new Error("bindAll must be passed function names");for(b=1;d>b;b++)c=arguments[b],a[c]=u.bind(a[c],a);return a},u.memoize=function(a,b){var c=function(d){var e=c.cache,f=""+(b?b.apply(this,arguments):d);return u.has(e,f)||(e[f]=a.apply(this,arguments)),e[f]};return c.cache={},c},u.delay=function(a,b){var c=m.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},u.defer=u.partial(u.delay,u,1),u.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:u.now(),g=null,f=a.apply(d,e),g||(d=e=null)};return function(){var j=u.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k||k>b?(g&&(clearTimeout(g),g=null),h=j,f=a.apply(d,e),g||(d=e=null)):g||c.trailing===!1||(g=setTimeout(i,k)),f}},u.debounce=function(a,b,c){var d,e,f,g,h,i=function(){var j=u.now()-g;b>j&&j>=0?d=setTimeout(i,b-j):(d=null,c||(h=a.apply(f,e),d||(f=e=null)))};return function(){f=this,e=arguments,g=u.now();var j=c&&!d;return d||(d=setTimeout(i,b)),j&&(h=a.apply(f,e),f=e=null),h}},u.wrap=function(a,b){return u.partial(b,a)},u.negate=function(a){return function(){return!a.apply(this,arguments)}},u.compose=function(){var a=arguments,b=a.length-1;return function(){for(var c=b,d=a[b].apply(this,arguments);c--;)d=a[c].call(this,d);return d}},u.after=function(a,b){return function(){return--a<1?b.apply(this,arguments):void 0}},u.before=function(a,b){var c;return function(){return--a>0&&(c=b.apply(this,arguments)),1>=a&&(b=null),c}},u.once=u.partial(u.before,2);var E=!{toString:null}.propertyIsEnumerable("toString"),F=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];u.keys=function(a){if(!u.isObject(a))return[];if(q)return q(a);var b=[];for(var c in a)u.has(a,c)&&b.push(c);return E&&f(a,b),b},u.allKeys=function(a){if(!u.isObject(a))return[];var b=[];for(var c in a)b.push(c);return E&&f(a,b),b},u.values=function(a){for(var b=u.keys(a),c=b.length,d=Array(c),e=0;c>e;e++)d[e]=a[b[e]];return d},u.mapObject=function(a,b,c){b=w(b,c);for(var d,e=u.keys(a),f=e.length,g={},h=0;f>h;h++)d=e[h],g[d]=b(a[d],d,a);return g},u.pairs=function(a){for(var b=u.keys(a),c=b.length,d=Array(c),e=0;c>e;e++)d[e]=[b[e],a[b[e]]];return d},u.invert=function(a){for(var b={},c=u.keys(a),d=0,e=c.length;e>d;d++)b[a[c[d]]]=c[d];return b},u.functions=u.methods=function(a){var b=[];for(var c in a)u.isFunction(a[c])&&b.push(c);return b.sort()},u.extend=x(u.allKeys),u.extendOwn=u.assign=x(u.keys),u.findKey=function(a,b,c){b=w(b,c);for(var d,e=u.keys(a),f=0,g=e.length;g>f;f++)if(d=e[f],b(a[d],d,a))return d},u.pick=function(a,b,c){var d,e,f={},g=a;if(null==g)return f;u.isFunction(b)?(e=u.allKeys(g),d=v(b,c)):(e=C(arguments,!1,!1,1),d=function(a,b,c){return b in c},g=Object(g));for(var h=0,i=e.length;i>h;h++){var j=e[h],k=g[j];d(k,j,g)&&(f[j]=k)}return f},u.omit=function(a,b,c){if(u.isFunction(b))b=u.negate(b);else{var d=u.map(C(arguments,!1,!1,1),String);b=function(a,b){return!u.contains(d,b)}}return u.pick(a,b,c)},u.defaults=x(u.allKeys,!0),u.clone=function(a){return u.isObject(a)?u.isArray(a)?a.slice():u.extend({},a):a},u.tap=function(a,b){return b(a),a},u.isMatch=function(a,b){var c=u.keys(b),d=c.length;if(null==a)return!d;for(var e=Object(a),f=0;d>f;f++){var g=c[f];if(b[g]!==e[g]||!(g in e))return!1}return!0};var G=function(a,b,c,d){if(a===b)return 0!==a||1/a===1/b;if(null==a||null==b)return a===b;a instanceof u&&(a=a._wrapped),b instanceof u&&(b=b._wrapped);var e=n.call(a);if(e!==n.call(b))return!1;switch(e){case"[object RegExp]":case"[object String]":return""+a==""+b;case"[object Number]":return+a!==+a?+b!==+b:0===+a?1/+a===1/b:+a===+b;case"[object Date]":case"[object Boolean]":return+a===+b}var f="[object Array]"===e;if(!f){if("object"!=typeof a||"object"!=typeof b)return!1;var g=a.constructor,h=b.constructor;if(g!==h&&!(u.isFunction(g)&&g instanceof g&&u.isFunction(h)&&h instanceof h)&&"constructor"in a&&"constructor"in b)return!1}c=c||[],d=d||[];for(var i=c.length;i--;)if(c[i]===a)return d[i]===b;if(c.push(a),d.push(b),f){if(i=a.length,i!==b.length)return!1;for(;i--;)if(!G(a[i],b[i],c,d))return!1}else{var j,k=u.keys(a);if(i=k.length,u.keys(b).length!==i)return!1;for(;i--;)if(j=k[i],!u.has(b,j)||!G(a[j],b[j],c,d))return!1}return c.pop(),d.pop(),!0};u.isEqual=function(a,b){return G(a,b)},u.isEmpty=function(a){return null==a?!0:A(a)&&(u.isArray(a)||u.isString(a)||u.isArguments(a))?0===a.length:0===u.keys(a).length},u.isElement=function(a){return!(!a||1!==a.nodeType)},u.isArray=p||function(a){return"[object Array]"===n.call(a)},u.isObject=function(a){var b=typeof a;return"function"===b||"object"===b&&!!a},u.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(a){u["is"+a]=function(b){return n.call(b)==="[object "+a+"]"}}),u.isArguments(arguments)||(u.isArguments=function(a){return u.has(a,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(u.isFunction=function(a){return"function"==typeof a||!1}),u.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},u.isNaN=function(a){return u.isNumber(a)&&a!==+a},u.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"===n.call(a)},u.isNull=function(a){return null===a},u.isUndefined=function(a){return void 0===a},u.has=function(a,b){return null!=a&&o.call(a,b)},u.noConflict=function(){return g._=h,this},u.identity=function(a){return a},u.constant=function(a){return function(){return a}},u.noop=function(){},u.property=function(a){return function(b){return null==b?void 0:b[a]}},u.propertyOf=function(a){return null==a?function(){}:function(b){return a[b]}},u.matcher=u.matches=function(a){return a=u.extendOwn({},a),function(b){return u.isMatch(b,a)}},u.times=function(a,b,c){var d=Array(Math.max(0,a));b=v(b,c,1);for(var e=0;a>e;e++)d[e]=b(e);return d},u.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))},u.now=Date.now||function(){return(new Date).getTime()};var H={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},I=u.invert(H),J=function(a){var b=function(b){return a[b]},c="(?:"+u.keys(a).join("|")+")",d=RegExp(c),e=RegExp(c,"g");return function(a){return a=null==a?"":""+a,d.test(a)?a.replace(e,b):a}};u.escape=J(H),u.unescape=J(I),u.result=function(a,b,c){var d=null==a?void 0:a[b];return void 0===d&&(d=c),u.isFunction(d)?d.call(a):d};var K=0;u.uniqueId=function(a){var b=++K+"";return a?a+b:b},u.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var L=/(.)^/,M={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},N=/\\|'|\r|\n|\u2028|\u2029/g,O=function(a){return"\\"+M[a]};u.template=function(a,b,c){!b&&c&&(b=c),b=u.defaults({},b,u.templateSettings);var d=RegExp([(b.escape||L).source,(b.interpolate||L).source,(b.evaluate||L).source].join("|")+"|$","g"),e=0,f="__p+='";a.replace(d,function(b,c,d,g,h){return f+=a.slice(e,h).replace(N,O),e=h+b.length,c?f+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'":d?f+="'+\n((__t=("+d+"))==null?'':__t)+\n'":g&&(f+="';\n"+g+"\n__p+='"),b}),f+="';\n",b.variable||(f="with(obj||{}){\n"+f+"}\n"),f="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+f+"return __p;\n";try{var g=new Function(b.variable||"obj","_",f)}catch(h){throw h.source=f,h}var i=function(a){return g.call(this,a,u)},j=b.variable||"obj";return i.source="function("+j+"){\n"+f+"}",i},u.chain=function(a){var b=u(a);return b._chain=!0,b};var P=function(a,b){return a._chain?u(b).chain():b};u.mixin=function(a){u.each(u.functions(a),function(b){var c=u[b]=a[b];u.prototype[b]=function(){var a=[this._wrapped];return l.apply(a,arguments),P(this,c.apply(u,a))}})},u.mixin(u),u.each(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=i[a];u.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!==a&&"splice"!==a||0!==c.length||delete c[0],P(this,c)}}),u.each(["concat","join","slice"],function(a){var b=i[a];u.prototype[a]=function(){return P(this,b.apply(this._wrapped,arguments))}}),u.prototype.value=function(){return this._wrapped},u.prototype.valueOf=u.prototype.toJSON=u.prototype.value,u.prototype.toString=function(){return""+this._wrapped},"function"==typeof a&&a.amd&&a("underscore",[],function(){return u})}).call(this)},{}],6:[function(a,b){"use strict";var c=a("underscore"),d=function(){};d.prototype={initialize:function(a){var b=a.el||document.createDocumentFragment();this.options=c.extend({el:b,src:b.getAttribute("src"),autoplay:b.getAttribute("autoplay")},a),d.prototype.vidCount=d.prototype.vidCount||0,d.prototype.vidCount++,this.vpid="v"+d.prototype.vidCount},addEventListener:function(a,b,c){this.el.addEventListener(a,b,c)},removeEventListener:function(a,b,c){this.el.removeEventListener(a,b,c)},load:function(){this.el.load()},play:function(){this.el.play()},pause:function(){this.el.pause()},destroy:function(){}},window.Video=window.Video||{},b.exports=d},{underscore:5}],7:[function(a,b){"use strict";var c=a("./base-video"),d=a("underscore"),e=(a("element-kit"),function(a){this.initialize(a)});e.prototype=d.extend({},c.prototype,{initialize:function(a){var b=a.el||document.createDocumentFragment();this.options=d.extend({el:b,autoplay:b.getAttribute("autoplay"),width:b.getAttribute("width"),height:b.getAttribute("height"),playingCssClass:"video-playing",loadingCssClass:"video-loading"},a),c.prototype.initialize.call(this,this.options),e.prototype.players=e.prototype.players||{},e.prototype.players[this.vpid]=this,this.el=this.options.el,this._origParent=this.el.parentNode,this._playerVars=d.extend({autoplay:this.options.autoplay?1:0},this.getPlayerVars())},getSourceUrl:function(){var a,b,c=this.el.getElementsByTagName("source"),d=c.length;if(!this.src){for(a=0;d>a;a++)if(b=c[a],"video/youtube"===b.getAttribute("type")){this.src=b.getAttribute("src");break}this.src=this.src||""}return this.src},load:function(a){this._container=document.createElement("div"),this._container.setAttribute("id","vplayer"+this.vpid+"-container"),this._origParent&&this._origParent.contains(this.el)&&this._origParent.replaceChild(this._container,this.el),this._container.kit.classList.add(this.options.loadingCssClass),this._loadScript(function(){this._buildPlayer(function(b){this.player=b,this._container.kit.classList.remove(this.options.loadingCssClass),a&&a(b)}.bind(this))}.bind(this))},_buildPlayer:function(a){var b=function(b){a&&a(b)};this._p?b(this._p):this._p=this._createPlayer(b)},_createPlayer:function(a){var b="vplayer"+this.vpid;return this._ytEl=document.createElement("div"),this._ytEl.setAttribute("id",b),this._container.appendChild(this._ytEl),this._videoId=this.getVideoId(this.getSourceUrl()),new YT.Player(b,{height:this.options.height,width:this.options.width,playerVars:this._playerVars,videoId:this._videoId,events:{onReady:function(b){a(b.target)},onStateChange:this._onStateChange.bind(this)}})},getPlayerVars:function(){var a=this.getSourceUrl().split("?")[1]||"",b=a.split("&");if(""==b)return{};for(var c={},d=0;d<b.length;++d){var e=b[d].split("=",2);c[e[0]]=1==e.length?"":decodeURIComponent(e[1].replace(/\+/g," "))}return c},getVideoId:function(a){var b=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;return a.replace(b,"$1")},_loadScript:function(a){if(e.prototype._scriptLoaded)return a?a():null;if(!e.prototype._script){var b=document.createElement("script");b.src="https://www.youtube.com/iframe_api",b.async=!0;var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c),e.prototype._script=b}window.onYouTubeIframeAPIReady=function(){a?a():null,e.prototype._scriptLoaded=!0}.bind(this)},_onStateChange:function(a){var b={"-1":{name:"unstarted"},0:{name:"ended",method:this.onEnd},1:{name:"playing",method:this.onPlay},2:{name:"paused",method:this.onPause},3:{name:"buffering"},5:{name:"cued"}},c=""+a.data;b[c].method&&b[c].method.call(this)},_triggerEvent:function(a){var b=document.createEvent("CustomEvent");b.initCustomEvent(a,!1,!1,null),this.el.dispatchEvent(b)},play:function(){this.getSourceUrl()?this.player&&this.player.playVideo():console.warn("youtube video error: you cannot call play() method on a video element that has no youtube source url")},onPlay:function(){this._container.classList.add(this.options.playingCssClass),this._triggerEvent("play")},pause:function(){this.player?this.player.pauseVideo():null},onPause:function(){this._container.classList.remove(this.options.playingCssClass),this._triggerEvent("pause")},stop:function(){this.player?this.player.stopVideo():null},onEnd:function(){this._container.classList.remove(this.options.playingCssClass),this._triggerEvent("ended")},destroy:function(){var a=e.prototype._script,b=e.prototype.players;this._container&&this._container.kit.classList.remove(this.options.loadingCssClass),delete b[this.vpid],window.onYouTubeIframeAPIReady=function(){},a&&!d.keys(b).length&&(a.parentNode.removeChild(a),e.prototype._script=null,e.prototype._scriptLoaded=null),this._origParent&&this._origParent.contains(this._container)&&this._origParent.replaceChild(this.el,this._container),c.prototype.destroy.call(this)}}),b.exports=window.Video.Youtube=e},{"./base-video":6,"element-kit":1,underscore:5}]},{},[7])(7)});