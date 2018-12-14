export default (opts) => {

	let xhr = '';

	let {
		url,
		data = {},
		type = 'GET',
		timeout = 3000,
		dataType = '',
		header = {},
		callback = ''
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
		let userData = '';

		Object.keys(data).forEach((it, i) => {
			if (i === 0 && Object.keys(data).length !== 1) {
				userData += `?${it}=${data[it]}&`;
			} else if (i === 0 && Object.keys(data).length === 1) {
				userData += `?${it}=${data[it]}`;
			} else if (i === Object.keys(data).length - 1) {
				userData += `${it}=${data[it]}`;
				if (dataType === 'jsonp') {
					userData += `&callback=${callback}`;
				}
			} else {
				userData += `${it}=${data[it]}&`;
			}
		});
		
		switch (type) {
			case 'GET':
			case 'get':
			// jsonp跨域
				if (dataType === 'jsonp') {
					let script = document.createElement("script");
					window[callback] = callback;
					window[callback] = function () {
						resolve(arguments[0]);
					};
					script.src = `${url}${userData}`;
					document.head.appendChild(script);
					return false;
				}
				xhr.open('GET', `${url}${userData}`, true);
				xhr.timeout = timeout;
				setHeader(xhr, header);
				xhr.send(null);
				xhr.onreadystatechange = onreadyChange(xhr, resolve, reject);
				xhr.ontimeout = function () {
					reject('请求超时');
				};
				break;
			case 'POST':
			case 'post':
				xhr.open('POST', opts.url, false);
				// xhr.timeout = timeout;
				xhr.send(JSON.stringify(data));
				xhr.onreadystatechange = onreadyChange(xhr, resolve, reject);
				break;
		}
	});
};

// 返回数据
function onreadyChange(xhr, resolve, reject) {
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
}

function setHeader(xhr, headerData) {
	for (const key in headerData) {
		if (Object.hasOwnProperty.call(headerData, key)) {
			xhr.setRequestHeader(key, headerData[key]);
		}
	}

}
