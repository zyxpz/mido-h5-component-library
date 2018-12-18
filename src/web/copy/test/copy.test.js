const expect = require('expect');
const { copy } = require('../../../../lib/main');

describe('copy', () => {
	it('调用', () => {
		expect(copy({
			copyWrap: 'J-content',
			dataType: 'value'
		}));
	});
});