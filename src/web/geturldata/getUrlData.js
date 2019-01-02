export default (url = '') => {
	let [dUrl, dItem] = [url, ''];
	const o = {};
	let urlLen = dUrl.length;
	if (dUrl) {
		try {
			dUrl = new URL(dUrl);
			dUrl = dUrl.search;
		} catch (error) {
			if (dUrl.indexOf('#') > 0) {
				urlLen = dUrl.indexOf('#');
			}
			dUrl = dUrl.substring(dUrl.indexOf('?'), urlLen);
		}
	} else {
		dUrl = location.search;
	}
	dUrl.slice(1).split('&').forEach(item => {
		let eachItem = item;
		eachItem = eachItem.split('=');
		if (eachItem[0] != null && eachItem[1] != null) {
			try {
				dItem = decodeURI(eachItem[1]);
			} catch (e) {
				dItem = '';
			}
			o[eachItem[0]] = dItem;
		}
	});
	return o;
};