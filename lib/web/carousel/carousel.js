'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.prototype.prepend = function (newElenment) {
	this.innerHTML = arguments[0] + this.innerHTML;
	return this;
};

var loop = function loop() {};

var Carousel = function () {
	function Carousel(opts) {
		_classCallCheck(this, Carousel);

		this.attrs = {
			warp: opts.warp,
			main: opts.main,
			startPos: '', // 初始位置
			endPos: '', // 结束位置
			play: opts.play || false, // 自动播放
			time: opts.time || 2000, // 播放时间 默认2000
			horizontal: opts.horizontal || false, // 方向 默认横向
			point: opts.point || false,
			pointColor: opts.pointColor || 'blue',
			pointSize: opts.pointSize || '6px',
			touch: opts.touch || false,
			pointEleRender: opts.pointEleRender || loop,
			onSwitch: opts.onSwitch || loop
		};

		this.index = 0;
	}

	_createClass(Carousel, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this._warp = document.querySelector('.' + this.attrs.warp);

			this._main = document.querySelectorAll('.' + this.attrs.main);

			this._mainLen = this._main.length;

			var warpH = this._warp.offsetHeight;

			var warpW = this._warp.offsetWidth;

			this.warpH = warpH;

			this.warpW = warpW;

			var cloneFirst = this._main[0].cloneNode(true);

			var cloneLast = this._main[this._main.length - 1].cloneNode(true);

			this._warp.appendChild(cloneFirst);

			this._warp.prepend(cloneLast);

			this._warp.childNodes.forEach(function (e, i) {
				if (e.nodeType === 1) {
					e.style.height = warpH + 'px';
					if (_this.attrs.horizontal) {
						e.style.left = warpW * (i / 2 - 1) + 'px';
					} else {
						e.style.top = warpH * (i / 2 - 1) + 'px';
					}
					e.index = i / 2 - 1;
				}
			});

			if (this.attrs.touch) {
				this.handleMoveEventListener();
			}

			if (this.attrs.play) {
				this.handlePlayer();
			}

			// 创建小点
			if (this.attrs.point) {
				this.createPoint();

				this.handlePoint(this.index);
			}
		}
	}, {
		key: 'createPoint',
		value: function createPoint() {
			var _this2 = this;

			var styleEl = document.createElement('style');

			var parentEle = this._warp.parentNode;

			parentEle.style.position = 'relative';

			var pointDom = document.createElement('div');

			pointDom.className = 'point-dom-' + this.attrs.horizontal;
			this._main.forEach(function (e, i) {
				pointDom.innerHTML += _this2.attrs.pointEleRender(i) || '<span class=\'point-list-' + _this2.attrs.horizontal + '\' data-tap=\'' + i + '\'>\u25CF</span>';
			});

			if (this.attrs.horizontal) {
				styleEl.innerHTML = '\n          .point-dom-true {\n            position: absolute;\n            bottom: 10px;\n            left: 50%;\n            transform: translate(-50%, 0);\n          }\n          .point-list-true {\n            margin-right: 5px;\n            font-size: ' + this.attrs.pointSize + ';\n          }\n          .point-dom-true .selected-point-list {\n            color: ' + this.attrs.pointColor + ';\n          }\n        ';
			} else {
				styleEl.innerHTML = '\n        .point-dom-false {\n          position: absolute;\n          top: 50%;\n          left: 30px;\n          transform: translate(0, -50%);\n        }\n        .point-list-false {\n          margin-right: 5px;\n          display: block;\n          font-size: ' + this.attrs.pointSize + ';\n        }\n        .point-dom-false .selected-point-list {\n          color: ' + this.attrs.pointColor + ';\n        }\n      ';
			}

			parentEle.appendChild(pointDom);

			parentEle.appendChild(styleEl);

			this.pointList = pointDom.childNodes;
		}
	}, {
		key: 'handleMoveEventListener',
		value: function handleMoveEventListener() {
			this._warp.addEventListener('touchstart', this.handleTouchStart.bind(this));

			this._warp.addEventListener('touchend', this.handleTouchEnd.bind(this));
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(e) {
			e.preventDefault();
			this.attrs.startPos = e.touches[0].pageY;

			this.attrs.startPosX = e.touches[0].pageX;

			this.attrs.endPos = '';

			if (new RegExp(this.attrs.main).test(e.target.className)) {
				this.index = e.target.index;
			} else {
				this.index = e.target.parentNode.index;
			}

			clearInterval(this.interval);

			this._warp.addEventListener('touchmove', this.handleTouchMove.bind(this));
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(e) {
			e.preventDefault();

			this.attrs.endPos = e.touches[0].pageY;

			this.attrs.endPosX = e.touches[0].pageX;

			if (this.attrs.horizontal) {
				this._warp.style.cssText = 'transform: translate3d(' + (this.attrs.endPosX - this.attrs.startPosX - this.index * e.target.offsetWidth) + 'px, 0, 0); transition: none';
			} else {
				this._warp.style.cssText = 'transform: translate3d(0, ' + (this.attrs.endPos - this.attrs.startPos - this.index * e.target.offsetHeight) + 'px, 0); transition: none';
			}
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd() {
			if (this.attrs.horizontal && this.attrs.endPos !== '') {
				if (this.attrs.endPosX - this.attrs.startPosX > 10) {
					this.prev();
				} else if (this.attrs.endPosX - this.attrs.startPosX < -10) {
					this.next();
				}
			} else {
				if (this.attrs.endPos - this.attrs.startPos > 10) {
					this.prev();
				} else if (this.attrs.endPos - this.attrs.startPos < -10) {
					this.next();
				}
			}

			if (this.attrs.play) {
				this.handlePlayer();
			}
		}
	}, {
		key: 'prev',
		value: function prev() {
			this.index = this.index - 1;

			if (this.index < 0) {
				this.index = -1;
				this.domShow(this.index);
				return;
			}

			this.domShow(this.index);
		}
	}, {
		key: 'next',
		value: function next() {
			this.index = this.index + 1;

			if (this.index >= this._mainLen) {
				this.index = this._mainLen;
				this.domShow(this.index);
				return;
			}

			this.domShow(this.index);
		}
	}, {
		key: 'handlePoint',
		value: function handlePoint(index) {
			if (index === -1) {
				index = this._mainLen - 1;
			} else if (index === this._mainLen) {
				index = 0;
			}
			this.pointList.forEach(function (e) {
				if (e.getAttribute('data-tap') === index.toString()) {
					e.className = e.className.replace(/selected-point-list/, '');
					e.className += ' selected-point-list';
				} else {
					e.className = e.className.replace(/\s+selected-point-list/, '');
				}
			});
		}
	}, {
		key: 'domShow',
		value: function domShow(index) {
			var _this3 = this;

			var that = this;
			if (this.attrs.horizontal) {
				if (index === -1) {
					this.index = this._mainLen;
					this._warp.style.cssText = 'transform: translate3d(' + 1 * this.warpW + 'px, 0, 0); transition: transform .5s';

					this.timmer = setTimeout(function () {
						_this3._warp.style.cssText = 'transform: translate3d(' + -(_this3._mainLen - 1) * _this3.warpW + 'px, 0, 0);';
						clearTimeout(that.timmer);
					}, 550);
				} else {
					this._warp.style.cssText = 'transform: translate3d(' + -index * this.warpW + 'px, 0,0); transition: transform .5s';
				}

				if (index === this._mainLen) {
					this.index = 0;
					this.timmer = setTimeout(function () {
						_this3._warp.style.cssText = 'transform: translate3d(0, 0, 0);';
						clearTimeout(that.timmer);
					}, 550);
				}
			} else {
				if (index === -1) {
					this.index = this._mainLen;
					this._warp.style.cssText = 'transform: translate3d(0, ' + 1 * this.warpH + 'px, 0); transition: transform .5s';

					this.timmer = setTimeout(function () {
						_this3._warp.style.cssText = 'transform: translate3d(0, ' + -(_this3._mainLen - 1) * _this3.warpH + 'px, 0);';
						clearTimeout(that.timmer);
					}, 550);
				} else {
					this._warp.style.cssText = 'transform: translate3d(0, -' + index * this.warpH + 'px, 0); transition: transform .5s';
				}

				if (index === this._mainLen) {
					this.index = 0;
					this.timmer = setTimeout(function () {
						_this3._warp.style.cssText = 'transform: translate3d(0, 0, 0);';
						clearTimeout(that.timmer);
					}, 550);
				}
			}

			if (this.attrs.point) {
				this.handlePoint(index);
			}

			this.attrs.onSwitch(this.index);
		}
	}, {
		key: 'handlePlayer',
		value: function handlePlayer() {
			var _this4 = this;

			this.interval = setInterval(function () {
				_this4.next();
			}, this.attrs.time);
		}
	}]);

	return Carousel;
}();

exports.default = Carousel;