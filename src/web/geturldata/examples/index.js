import('../../../main')
	.then(({ getUrlData, htmlJson }) => {

		const data = getUrlData();


		document.querySelector('.J-content').innerHTML = htmlJson(data);

	});
