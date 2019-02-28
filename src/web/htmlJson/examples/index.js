import('../../../main')
	.then(({ htmlJson }) => {
		const obj = {
			a: 'Hello',
			b: 'World'
		};

		document.querySelector('.J-content').innerHTML = htmlJson(obj);
	});


