import { 
	Resizer
} from '../../../main';

import './index.less';

const resize = new Resizer({
	wrap: 'line',
	resize(x) {
		const leftWrap = document.querySelector('.left');
		const leftWidth = leftWrap.scrollWidth;
		leftWrap.style.cssText = `width: ${leftWidth + x}px;`;
	}
});

resize.init();