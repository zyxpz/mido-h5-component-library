!function(e){function t(t){for(var n,r,i=t[0],a=t[1],c=0,u=[];c<i.length;c++)r=i[c],o[r]&&u.push(o[r][0]),o[r]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(l&&l(t);u.length;)u.shift()()}var n={},r={4:0},o={4:0};function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{0:1}[e]&&t.push(r[e]=new Promise(function(t,n){for(var o=({}[e]||e)+".37b181b1.css",a=i.p+o,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var l=(d=c[u]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(l===o||l===a))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){var d;if((l=(d=s[u]).getAttribute("data-href"))===o||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.request=o,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=a,document.getElementsByTagName("head")[0].appendChild(f)}).then(function(){r[e]=0}));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=a);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=function(e){return i.p+""+({}[e]||e)+".37b181b1.js"}(e),c=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+i+")");a.type=r,a.request=i,n[1](a)}o[e]=void 0}};var l=setTimeout(function(){c({type:"timeout",target:u})},12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/mido-h5-cp/dist",i.oe=function(e){throw console.error(e),e};var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;i(i.s="./src/web/copy/examples/index.js")}({"./src/web/copy/examples/index.js":function(e,t,n){"use strict";n("./src/web/copy/examples/index.less"),Promise.all([n.e(1),n.e(0),n.e(2)]).then(n.t.bind(null,"./src/main.js",7)).then(function(e){var t=e.copy;document.querySelector(".J-btn").addEventListener("click",function(){t({copyWrap:"J-content",dataType:"value"})}),document.querySelector(".J-inner-btn").addEventListener("click",function(){t({copyWrap:"J-content-innertext",dataType:"innerText"})})})},"./src/web/copy/examples/index.less":function(e,t,n){}});