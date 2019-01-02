const loop = () => {

};

export default class Resizer {
	constructor(opts) {
		this.opts = opts;
    
		this.resize = opts.resize || loop;
	}

	init() {
		this.handleFindEl();
	}

	handleFindEl() {
		this.wrap = document.querySelector(`.${this.opts.wrap}`);
		this.handleEvent();
	}
  
	handleEvent = () => {
		this.wrap.addEventListener('mousedown', this.handleMouseDown);
		this.wrap.addEventListener('mouseup', this.handleMouseUp);    
	}

	handleMouseDown = (e) => {
		// console.log(e, 'MouseDown');
		this.wrap.addEventListener('mousemove', this.handeleMouseMove);
		this.wrap.addEventListener('mouseleave', this.handleMouseUp);
    
		this.startPageX = e.pageX;
	}
  
	handeleMouseMove = (e) => {
		// console.log(e, 'MouseMove');
		this.movePageX = e.pageX - this.startPageX;
		this.resize(this.movePageX);
	}
  
	handleMouseUp = (e) => {
		console.log(e, 'MouseUp');
		// this.handleRemoveEvent();
	}
  
	handleMouseLeave = (e) => {
		// console.log(e, 'mouseleave');
		// this.handleRemoveEvent();
	}
  
	handleRemoveEvent = () => {
		console.log('removeEvent');
		this.wrap.removeEventListener('mousemove', this.handeleMouseMove);
		this.wrap.removeEventListener('mouseleave', this.handeleMouseMove);
	}
}
