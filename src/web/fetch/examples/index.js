import { fetch } from '../../../main';

fetch({
	url: 'http://localhost:9001/some/path.json',
	data: {
		m: 1,
		x: 2,
		l: 3
	},
	type: "get"
})
	.then((d) => {
		console.log(d);
	})
	.catch((e) => {
		console.log(e);
	});