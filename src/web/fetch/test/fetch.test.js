const expect = require('expect');
const { fetch } = require('../../../../lib/main');
 
describe('fetch', () => {
	console.log('test');
	it('调用', () => {
		expect(fetch({
			url: 'http://localhost:9001/some/get.json',
			data: {
				get: 1,
				t: 2,
				c: 3
			},
			type: 'get',
			timeout: 3000,
			header: {},
		})
			.then((d) => {
				console.log(d);
				document.querySelector('.J-show-get').innerHTML = JSON.stringify(d);
			})
			.catch((e) => {
				console.log(e);
			}));
	});
});