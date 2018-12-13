const loop = () => {

};

export default (opts) => {

	let xhr = '';

	let {
		url,
		data = {},
		type = 'GET',
		timeout = 3000,
		dataType = ''
	} = opts;

	if (window.XMLHttpRequest) { // code for all new browsers
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // code for IE5 and IE6
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if (!url) {
		console.log('没有请求地址');
		return false;
	}

	return new Promise((resolve, reject) => {
		switch (type) {
			case 'GET':
			case 'get':
				let userData = '';
				Object.keys(data).forEach((it, i) => {
					if (i === 0) {
						userData += `?${it}=${data[it]}&`;
					} else if (i === Object.keys(data).length - 1) {
						userData += `${it}=${data[it]}`;
					} else {
						userData += `${it}=${data[it]}&`;
					}
				});
				xhr.open('GET', `${url}${userData}`, true);
				// xhr.setRequestHeader('Content-Type', 'text/xml');
				// xhr.getResponseHeader('Content-Type');
				xhr.send(null);
				xhr.timeout = timeout;
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							try {
								resolve(JSON.parse(xhr.responseText));
							} catch (error) {
								console.log(error);
							}
						} else {
							try {
								reject(JSON.parse(xhr.responseText));
							} catch (error) {
								console.log(error);
							}
						}
					}
				};
				xhr.ontimeout = function () {
					reject('请求超时');
				};
				break;
			case 'POST':
			case 'post':
				xhr.open('POST', opts.url, false);
				xhr.send(JSON.stringify(data));
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							try {
								resolve(JSON.parse(xhr.responseText));
							} catch (error) {
								console.log(error);
							}
						} else {
							try {
								reject(JSON.parse(xhr.responseText));
							} catch (error) {
								console.log(error);
							}
						}
					}
				};
				break;
		}
	});
	


};
