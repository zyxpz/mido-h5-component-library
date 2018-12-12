import expect from 'expect';
import { findData } from '../../../main';

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

describe('findData', () => {
	it('调用', () => {
		expect(findData(data, path));
	});
});