export default class RollerSlide {
	constructor(opts) {
		this._wrap = opts.wrap;

		this.index = 0;

		this.startTime = 0;

		this.endTime = 0;

		this.flag = 5;

		this.target = null;

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

		const newChild = [];

		// 子元素铺满父元素
		this._wrap.childNodes.forEach((e, i) => {
			if (e.nodeType === 1) {
				newChild.push(e);
			}
		});

		newChild.forEach((item, i) => {
			item.style.height = `${this.warpH}px`;
			item.setAttribute('data-tap', i);
		});
		this.handleChildClassName(this.index);
		this.handleMoveEvent();
	}

	// 子元素加类
	handleChildClassName = (index) => {
		this._wrap.childNodes.forEach(e => {
			if (e.nodeType === 1) {
				if (parseInt(e.getAttribute('data-tap')) === index) {
					e.className = e.className.replace(/J-whell/, '');
					e.className += ' J-whell';
					this.handleMoveEvent();
				} else {
					e.className = e.className.replace(/\s+J-whell/, '');
				}
			}
		});
	}

	// 移动事件
	handleMoveEvent = () => {
		document.querySelector('.J-whell').addEventListener(this.mousewheel, this.handleMouseWhell);
	}

	// 滚轮事件
	handleMouseWhell = (e) => {
		this.startTime = this.endTime;

		this.endTime = new Date().getTime();

		let delta = (e.wheelDeltaY && (e.wheelDeltaY > 0 ? 1 : -1)) ||
			(e.detail && (e.detailY > 0 ? -1 : 1));

		if (this.target !== e.currentTarget) {
			this.target = e.currentTarget;
			if (delta < 0) {
				this.next();
				this.flag = delta;
			} else {
				this.last();
				this.flag = delta;
			};
		} else {
			if (this.endTime - this.startTime <= 300) {
				if (delta < 0 && delta != this.flag) {
					this.next();
					this.flag = delta;
				} else if (delta > 0 && delta != this.flag) {
					this.last();
					this.flag = delta;
				};
			}
		}
	}

	handleWrapScroll = (index) => {
		this._wrap.style.cssText = `transform: translate3d(0, -${index * this.warpH}px, 0); transition: transform .5s`;
		this.handleChildClassName(index);
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
