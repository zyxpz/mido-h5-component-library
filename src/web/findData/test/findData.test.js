const expect = require('expect');
const { findData } = require('../../../../lib/main');

describe('findData', () => {
	const path = 'a[0].b.c[0].d.e';


	const data = {
		"a": [{
			"b": {
				"c": [{
					"d": {
						"e": "tmc1"
					}
				}]
			}
		}, {
			"a1": {
				"b": "tmc2"
			}
		}]
	};
	it('调用', () => {
		expect(findData(data, path));
	});
});