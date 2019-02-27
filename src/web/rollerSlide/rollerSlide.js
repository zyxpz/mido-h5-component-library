export default class RollerSlide {
	constructor(opts) {
		this._wrap = opts.wrap;

		this.index = 0;
    
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
		this.handleAnimationEnd();
	}

	// 监听动画是否结束
	handleAnimationEnd = () => {
		this._wrap.addEventListener('transitionend', () => {
			const timmer = setTimeout(() => {
				console.log('setTimeout');
				this.handleMoveEvent();
				clearTimeout(timmer);
			}, 800);

		});
	}


	// 滚轮事件
	handleMouseWhell = (e) => {

		// if (e.stopPropagation) e.stopPropagation();
		// else e.cancelBubble = true;
		// if (e.preventDefault) e.preventDefault();
		// else e.returnValue = false;
		console.log(this.lastChild - 1);
		if (this.index !== (0 || this.lastChild - 1)  ) {
			console.log('remove');
			this._wrap.removeEventListener(this.mousewheel, this.handleMouseWhell);
		}


		let delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) ||
			(e.detail && (e.detail > 0 ? -1 : 1));


		if (delta === 1) {
			// 向上滚动
			this.last();
		} else if (delta === -1) {
			// 向下滚动
			this.next();
		}

	}

	handleWrapScroll = (index) => {
		console.log(index);
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
