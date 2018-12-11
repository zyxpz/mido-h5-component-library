import expect from 'expect';

import {
	Carousel
} from '../../../main';

describe('carousel', () => {
	it('创建', () => {
		expect(new Carousel({
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
		}));
	});
});
