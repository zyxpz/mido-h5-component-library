!function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/mido-h5-cp/dist",n(n.s="./src/main.js")}({"./src/main.js":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Pulldown=e.Carousel=e.demo=void 0;var s=r(n("./src/web/demo/index.js")),i=r(n("./src/web/carousel/index.js")),o=r(n("./src/web/pullDown/index.js"));function r(t){return t&&t.__esModule?t:{default:t}}e.demo=s.default,e.Carousel=i.default,e.Pulldown=o.default},"./src/web/carousel/carousel.js":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}}();Object.prototype.prepend=function(t){return this.innerHTML=arguments[0]+this.innerHTML,this};var i=function(){},o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.attrs={warp:e.warp,main:e.main,startPos:"",endPos:"",play:e.play||!1,time:e.time||3e3,horizontal:e.horizontal||!1,point:e.point||!1,pointColor:e.pointColor||"blue",pointSize:e.pointSize||"6px",touch:e.touch||!1,pointEleRender:e.pointEleRender||i,onSwitch:e.onSwitch||i},this.index=0,this.stop=!1}return s(t,[{key:"init",value:function(){var t=this;this._warp=document.querySelector("."+this.attrs.warp),this._main=document.querySelectorAll("."+this.attrs.main),this._mainLen=this._main.length;var e=this._warp.offsetHeight,n=this._warp.offsetWidth;this.warpH=e,this.warpW=n;var s=this._main[0].cloneNode(!0),i=this._main[this._main.length-1].cloneNode(!0);this._warp.appendChild(s),this._warp.prepend(i),this._warp.childNodes.forEach(function(s,i){1===s.nodeType&&(s.style.height=e+"px",t.attrs.horizontal?s.style.left=n*(i/2-1)+"px":s.style.top=e*(i/2-1)+"px",s.index=i/2-1)}),this.attrs.touch&&this.handleMoveEventListener(),this.attrs.play&&this.handlePlayer(),this.attrs.point&&(this.createPoint(),this.handlePoint(this.index))}},{key:"createPoint",value:function(){var t=this,e=document.createElement("style"),n=this._warp.parentNode;n.style.position="relative";var s=document.createElement("div");s.className="point-dom-"+this.attrs.horizontal,this._main.forEach(function(e,n){s.innerHTML+=t.attrs.pointEleRender(n)||"<span class='point-list-"+t.attrs.horizontal+"' data-tap='"+n+"'>●</span>"}),this.attrs.horizontal?e.innerHTML="\n          .point-dom-true {\n            position: absolute;\n            bottom: 10px;\n            left: 50%;\n            transform: translate(-50%, 0);\n          }\n          .point-list-true {\n            margin-right: 5px;\n            font-size: "+this.attrs.pointSize+";\n          }\n          .point-dom-true .selected-point-list {\n            color: "+this.attrs.pointColor+";\n          }\n        ":e.innerHTML="\n        .point-dom-false {\n          position: absolute;\n          top: 50%;\n          left: 30px;\n          transform: translate(0, -50%);\n        }\n        .point-list-false {\n          margin-right: 5px;\n          display: block;\n          font-size: "+this.attrs.pointSize+";\n        }\n        .point-dom-false .selected-point-list {\n          color: "+this.attrs.pointColor+";\n        }\n      ",n.appendChild(s),n.appendChild(e),this.pointList=s.childNodes}},{key:"handleMoveEventListener",value:function(){this._warp.addEventListener("touchstart",this.handleTouchStart.bind(this)),this._warp.addEventListener("touchend",this.handleTouchEnd.bind(this))}},{key:"handleTouchStart",value:function(t){t.preventDefault(),this.stop?console.log("stop"):(this.attrs.startPos=t.touches[0].pageY,this.attrs.startPosX=t.touches[0].pageX,this.attrs.endPos="",new RegExp(this.attrs.main).test(t.target.className)?this.index=t.target.index:this.index=t.target.parentNode.index,clearInterval(this.interval),this._warp.addEventListener("touchmove",this.handleTouchMove.bind(this)))}},{key:"handleTouchMove",value:function(t){t.preventDefault(),this.attrs.endPos=t.touches[0].pageY,this.attrs.endPosX=t.touches[0].pageX}},{key:"handleTouchEnd",value:function(){this.stop?console.log("stop"):(""!==this.attrs.endPos&&(this.attrs.horizontal?this.attrs.endPosX-this.attrs.startPosX>10?this.prev():this.attrs.endPosX-this.attrs.startPosX<-10&&this.next():this.attrs.endPos-this.attrs.startPos>10?this.prev():this.attrs.endPos-this.attrs.startPos<-10&&this.next()),this.attrs.play&&this.handlePlayer())}},{key:"prev",value:function(){if(this.index=this.index-1,this.index<0)return this.index=-1,void this.domShow(this.index);this.domShow(this.index)}},{key:"next",value:function(){if(this.index=this.index+1,this.index>=this._mainLen)return this.index=this._mainLen,void this.domShow(this.index);this.domShow(this.index)}},{key:"handlePoint",value:function(t){-1===t?t=this._mainLen-1:t===this._mainLen&&(t=0),this.pointList.forEach(function(e){e.getAttribute("data-tap")===t.toString()?(e.className=e.className.replace(/selected-point-list/,""),e.className+=" selected-point-list"):e.className=e.className.replace(/\s+selected-point-list/,"")})}},{key:"domShow",value:function(t){var e=this,n=this;this.attrs.horizontal?(-1===t?(this.index=this._mainLen,this._warp.style.cssText="transform: translate3d("+1*this.warpW+"px, 0, 0); transition: transform .5s",this.stop=!0,this.timmer=setTimeout(function(){e._warp.style.cssText="transform: translate3d("+-(e._mainLen-1)*e.warpW+"px, 0, 0);",e.stop=!1,clearTimeout(n.timmer)},550)):this._warp.style.cssText="transform: translate3d("+-t*this.warpW+"px, 0,0); transition: transform .5s",t===this._mainLen&&(this.index=0,this.stop=!0,this.timmer=setTimeout(function(){e._warp.style.cssText="transform: translate3d(0, 0, 0);",e.stop=!1,clearTimeout(n.timmer)},550))):(-1===t?(this.index=this._mainLen,this._warp.style.cssText="transform: translate3d(0, "+1*this.warpH+"px, 0); transition: transform .5s",this.timmer=setTimeout(function(){e._warp.style.cssText="transform: translate3d(0, "+-(e._mainLen-1)*e.warpH+"px, 0);",clearTimeout(n.timmer)},550)):this._warp.style.cssText="transform: translate3d(0, -"+t*this.warpH+"px, 0); transition: transform .5s",t===this._mainLen&&(this.index=0,this.timmer=setTimeout(function(){e._warp.style.cssText="transform: translate3d(0, 0, 0);",clearTimeout(n.timmer)},550))),this.attrs.point&&this.handlePoint(t),this.attrs.onSwitch(this.index)}},{key:"handlePlayer",value:function(){var t=this;this.interval=setInterval(function(){t.next()},this.attrs.time)}}]),t}();e.default=o},"./src/web/carousel/index.js":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("./src/web/carousel/carousel.js");Object.defineProperty(e,"default",{enumerable:!0,get:function(){return(t=s,t&&t.__esModule?t:{default:t}).default;var t}})},"./src/web/demo/demo.js":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){console.log(t)}},"./src/web/demo/index.js":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("./src/web/demo/demo.js");Object.defineProperty(e,"default",{enumerable:!0,get:function(){return(t=s,t&&t.__esModule?t:{default:t}).default;var t}})},"./src/web/pullDown/index.js":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("./src/web/pullDown/pullDown.ts");Object.defineProperty(e,"default",{enumerable:!0,get:function(){return(t=s,t&&t.__esModule?t:{default:t}).default;var t}})},"./src/web/pullDown/pullDown.ts":function(t,e,n){"use strict";function s(){}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this.wrap=t.wrap||null,this.pullDom=t.pullDom||this.handleCreatDownEl().defaultPullDom,this.pullMoveEvent=t.pullMoveEvent||s,this.pullEndEvent=t.pullEndEvent||s,this.down=t.down||!1,this.downDom=t.downDom||this.handleCreatDownEl().defaultDownDom}return t.prototype.init=function(){this.handleFindEl()},t.prototype.handleFindEl=function(){if(!this.wrap)throw new Error("不存在元素");this.handlePullEl()},t.prototype.handlePullEl=function(){var t=document.createElement("div");t.className="pull-down-wrap",t.innerHTML=this.pullDom,this.wrap.insertBefore(t,this.wrap.childNodes[0]),this.pullDomHei=t.offsetHeight,this.wrap.style.cssText="transform: translate3d(0, -"+t.offsetHeight+"px, 0)",this.handleMoveEventListener()},t.prototype.handleCreatDownEl=function(){return{defaultDownDom:'<div class="mido-down-more">上拉加载更多</div>',defaultPullDom:'<div class="mido-pull-refresh">下拉刷新</div>'}},t.prototype.handleMoveEventListener=function(){this.wrap.addEventListener("touchstart",this.handleTouchStart.bind(this)),this.wrap.addEventListener("touchend",this.handleTouchEnd.bind(this))},t.prototype.handleTouchStart=function(t){this.startPos=t.touches[0].pageY,this.wrap.addEventListener("touchmove",this.handleTouchMove.bind(this))},t.prototype.handleTouchMove=function(t){this.endPos=t.touches[0].pageY,this.startPos-this.endPos<0&&(Math.abs(this.startPos-this.endPos)>=2*this.pullDomHei?this.wrap.style.cssText="transform: translate3d(0, "+this.pullDomHei+"px, 0);":(/mido\-pull\-refresh/.test(this.pullDom)||this.pullMoveEvent(),this.wrap.style.cssText="transform: translate3d(0, "+(this.endPos-this.startPos-this.pullDomHei)+"px, 0);"))},t.prototype.handleTouchEnd=function(){var t=this;Math.abs(this.startPos-this.endPos)>this.pullDomHei?/mido\-pull\-refresh/.test(this.pullDom)?this.wrap.style.cssText="transform: translate3d(0, -"+this.pullDomHei+"px, 0)":this.pullEndEvent(function(){t.wrap.style.cssText="transform: translate3d(0, -"+t.pullDomHei+"px, 0)"}):this.wrap.style.cssText="transform: translate3d(0, -"+this.pullDomHei+"px, 0)"},t}();e.default=i}});