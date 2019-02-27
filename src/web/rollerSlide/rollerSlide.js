export default class RollerSlide {
	constructor(opts) {
		this._wrap = opts.wrap;

		this.index = 0;

		this.startTime = 0;

		this.endTime = 0;

		this.flag = 5;

	}

	init = () => {
		// 最后一个子元素
		this.lastChild = this._wrap.childElementCount;

		// 是否火狐浏览器
		this.isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

		// 火狐浏览器使用的监听事件不同
		this.mousewheel = this.isFirefox ? "DOMMouseScroll" : "mousewheel";

		// 父元素高度
		this.warpH = this._wrap.offsetHeight;

		// 子元素铺满父元素
		this._wrap.childNodes.forEach((e, i) => {
			if (e.nodeType === 1) {
				e.style.height = `${this.warpH}px`;
				e.setAttribute('data-tap', (i - 1) / 2);
			}
		});

		this.handleMoveEvent();
	}

	// 移动事件
	handleMoveEvent = () => {
		this._wrap.addEventListener(this.mousewheel, this.handleMouseWhell);
	}

	// 监听动画是否结束
	// handleAnimationEnd = () => {
	// 	this.isMove = true;
	// }


	// 滚轮事件
	handleMouseWhell = (e) => {
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;

		this.startTime = this.endTime;

		this.endTime = new Date().getTime();

		let delta = (e.wheelDeltaY && (e.wheelDeltaY > 0 ? 1 : -1)) ||
			(e.detail && (e.detailY > 0 ? -1 : 1));

		console.log(this.endTime - this.startTime);

		if (this.endTime - this.startTime <= 300) {
			if (delta < 0 && delta != this.flag) {
				console.log("1");
				this.next();
				this.flag = delta;
			} else if (delta > 0 && delta != this.flag) {
				console.log("2");
				this.last();
				this.flag = delta;
			};
		} else {
			if (delta < 0) {
				console.log("3");
				this.next();
				this.flag = delta;
			} else {
				console.log("4");
				this.last();
				this.flag = delta;
			};
		};


	}

	handleWrapScroll = (index) => {
		this._wrap.style.cssText = `transform: translate3d(0, -${index * this.warpH}px, 0); transition: transform .5s`;
	}

	// 下一个
	next = () => {
		if (this.index === this.lastChild - 1) {
			this.index = this.lastChild - 1;
		} else {
			this.index = this.index + 1;
		}
		this.handleWrapScroll(this.index);
	}

	// 上一个
	last = () => {
		if (this.index === 0) {
			this.index = 0;
		} else {
			this.index = this.index - 1;
		}
		this.handleWrapScroll(this.index);
	}

}
