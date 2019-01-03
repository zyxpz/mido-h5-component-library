## resizer(未完成)

```vim
import { 
	Resizer
} from 'mido-h5-cp';

const resize = new Resizer({
	wrap: 'line',
	resize(x) {
		const leftWrap = document.querySelector('.left');
		const leftWidth = leftWrap.scrollWidth;
		console.log(leftWidth, 'leftWidth');
		leftWrap.style.cssText = `width: ${leftWidth + x}px;`;
	}
});

resize.init();
```

## [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/resizer/Basic)