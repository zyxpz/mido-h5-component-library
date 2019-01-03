import './index.less';

const loop = () => {

};

export default class Resizer {
	constructor(opts) {
		this.opts = opts;

		this.resize = opts.resize || loop;

		this.startTime = null;

		this.endTime = null;
	}

	init() {
		this.handleFindEl();
	}

	handleFindEl() {
		this.wrap = document.querySelector(`.${this.opts.wrap}`);
		this.handleEvent();
	}

	getTimeNow = () => {
		const nowDate = new Date();

		return nowDate.getTime();
	}

	// 长按
	handleLongMouseDown = (e) => {
		this.startTime = this.getTimeNow();
		const timmer = setInterval(() => {
			this.endTime = this.getTimeNow();
			if (this.endTime - this.startTime > 200) {
				clearInterval(timmer);
				document.body.addEventListener('mousemove', this.handeleMouseMove);
				document.body.addEventListener('mouseup', this.handleMouseUp);
				this.startPageX = e.pageX;
			}
		}, 100);
	}

	handleEvent = () => {
		this.wrap.addEventListener('mousedown', this.handleMouseDown);
	}

	handleMouseDown = (e) => {
		this.wrap.addEventListener('mousemove', this.handeleWrapMouseMove);
		document.body.addEventListener('mousemove', this.handeleMouseMove);
		document.body.addEventListener('mouseup', this.handleMouseUp);

		// e.currentTarget.className += ' resizing';

		this.startPageX = e.pageX;
	}
  
  handeleWrapMouseMove = (e) => {
  	this.startPageX = e.pageX;
  }

	handeleMouseMove = (e) => {
		this.movePageX = e.pageX - this.startPageX;
		if (this.movePageX < 20) {
			this.resize(this.movePageX);
		}
    
		// if (this.movePageX > -20) {
		// 	this.resize(this.movePageX);
		// }
		
	}

	handleMouseUp = (e) => {
		// this.wrap.className.replace(/resizing/, '');
		this.handleRemoveEvent();
	}

	handleRemoveEvent = () => {
		this.wrap.removeEventListener('mousemove', this.handeleMouseMove);
		document.body.removeEventListener('mouseup', this.handleMouseUp);
		document.body.removeEventListener('mousemove', this.handeleMouseMove);
	}
}
