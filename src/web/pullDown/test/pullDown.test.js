const expect = require('expect');
const { PullDown } = require('../../../../lib/main');

describe('PullDown', () => {
	it('调用', () => {
		expect(new PullDown());
	});
});