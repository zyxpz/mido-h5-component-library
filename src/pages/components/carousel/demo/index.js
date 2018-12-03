import Carousel from '../carousel';

const carousel = new Carousel({
	warp: 'w1',
	main: 'm1',
	play: true,
	point: true,
	touch: true,
});

carousel.init();

const carousel2 = new Carousel({
	warp: 'w2',
	main: 'm2',
	play: true,
	horizontal: true,
	point: true,
	touch: true,
	pointEleRender(currentIndex) {
		return `<span data-tap="${currentIndex}">${currentIndex}</span>`;
	},
	onSwitch(currentIndex) {
		console.log(currentIndex);
	}
});

carousel2.init();