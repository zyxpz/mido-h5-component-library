import './index.less';

export default class Picker {
	constructor(opts) {
		this.wrap = opts.wrap;
		this.value = opts.value || [];
		this.defaultValue = opts.defaultValue || '';
		this.onChange = opts.onChange || function loop() {};

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

		this.setTransform(this.content.style, `translate3d(0,${-this.scrollY}px,0)`);
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

		this.handleOnChange();
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

	select() {
		const value = this.defaultValue;
		this.content.childNodes.forEach((item, i) => {
			if (item.getAttribute('data-value') === value) {
				if (i < 0 || i >= this.content.childNodes.length) {
					return;
				}
				this.scrollTo(0, i * item.offsetHeight);
			}
		});
	}

	eventListener() {
		this.wrap.addEventListener('touchstart', (e) => this.touchStart(e.touches[0].pageY));
		this.wrap.addEventListener('touchmove', (e) => this.touchMove(e.touches[0].pageY));
		this.wrap.addEventListener('touchend', () => this.touchEnd());
	}

	handleOnChange() {
		this.content.childNodes.forEach(item => {
			if (this.scrollY / item.getBoundingClientRect().height === Number(item.getAttribute('data-tap'))) {
				this.onChange(item.getAttribute('data-value'));
			}
		});
	}

	render() {
		const div = document.createElement('div');
		div.className = 'mido-picker J-mido-picker';
		div.innerHTML =
			`
          <div class="mido-picker-mask J-mido-picker-mask"></div>
          <div class="mido-picker-indicator J-mido-picker-indicator"></div>
          <div class="mido-picker-content J-mido-picker-content"></div>
    `;

		this.wrap.appendChild(div);

		const rootHei = document.querySelector('.J-mido-picker').getBoundingClientRect().height;

		const mask = document.querySelector('.J-mido-picker-mask');

		const indicator = document.querySelector('.J-mido-picker-indicator');

		const content = document.querySelector('.J-mido-picker-content');

		this.content = content;

		this.value.forEach((item, i) => {
			content.innerHTML += `<li class="mido-picker-content-li" data-tap="${i}" data-value="${item}">${item}</li>`;
		});

		const itemHei = content.children[0].getBoundingClientRect().height;

		let num = Math.floor(rootHei / itemHei);

		if (num % 2 === 0) {
			num--;
		}
		num--;
		num /= 2;

		content.style.padding = `${num * itemHei}px 0`;

		mask.style.backgroundSize = `100% ${num * itemHei}px`;

		indicator.style.top = `${num * itemHei}px`;


		this.select();

		this.eventListener();
	}
}
