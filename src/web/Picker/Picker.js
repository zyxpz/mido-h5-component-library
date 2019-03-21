const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default class Picker {
	constructor(opts) {
		this.wrap = opts.wrap;

		this.startY = 0;
		this.moveing = false;
		this.lastY = 0;
		this.scrollY = -1;
	}

	init() {
		this.render();
	}

	setTransform(dom, value) {
		dom.transform = value;
		dom.webkitTransform = value;
	}

	setTransition(dom, value) {
		dom.transition = value;
		dom.webkitTransition = value;
	}

	touchStart(y) {
		this.moveing = true;

		this.startY = y;

		this.lastY = this.scrollY;
	}

	touchMove(y) {
		if (!this.moveing) {
			return;
		}

		this.scrollY = this.lastY - y + this.startY;

		this.content.style.cssText = `transform: translate3d(0,${-this.scrollY}px,0);`;
	}

	touchEnd() {
		this.moveing = false;

		let targetY = this.scrollY;

		const height = (this.content.children.length - 1) * this.content.children[0].offsetHeight;

		if (targetY % this.content.children[0].offsetHeight !== 0) {
			targetY = Math.round(targetY / this.content.children[0].offsetHeight) * this.content.children[0].offsetHeight;
		}

		if (targetY < 0) {
			targetY = 0;
		} else if (targetY > height) {
			targetY = height;
		}
		this.scrollTo(0, targetY, .3);
	}

	scrollTo = (_x, y, time = .3) => {
		if (this.scrollY !== y) {
			this.scrollY = y;
			this.setTransition(this.content.style, `cubic-bezier(0,0,0.2,1.15) ${time}s`);
			this.setTransform(this.content.style, `translate3d(0,${-y}px,0)`);
			setTimeout(() => {
				if (this.content) {
					this.setTransition(this.content.style, '');
				}
			}, +time * 1000);
		}
	};

	render() {
		const div = document.createElement('div');
		div.innerHTML =
			`
        <div class="mido-picker">
          <div class="mido-picker-mask"></div>
          <div class="mido-picker-indicator"></div>
          <div class="mido-picker-content J-mido-picker-content"></div>
        </div>
    `;

		this.wrap.appendChild(div);

		const content = document.querySelector('.J-mido-picker-content');

		this.content = content;

		arr.forEach((item, i) => {
			content.innerHTML += `<li class="mido-picker-content-li" data-tap=${i}>${item}</li>`;
		});

		this.wrap.addEventListener('touchstart', (e) => this.touchStart(e.touches[0].pageY));
		this.wrap.addEventListener('touchmove', (e) => this.touchMove(e.touches[0].pageY));
		this.wrap.addEventListener('touchend', () => {
			this.touchEnd();
		});
	}
}
