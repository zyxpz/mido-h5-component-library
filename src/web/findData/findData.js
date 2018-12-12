let returnFindData;

const findData = (obj, path) => {
	const props = path.split('.');
	Object.keys(obj).forEach((e) => {
		props.forEach((pe) => {
			if (/\[.*\]/.test(pe)) {
				const listNum = pe.match(/\[([\s\S]+)\]/)[1];
				const listName = pe.replace(pe.match(/\[([\s\S]+)\]/)[0], '');
				if (e === listName) {
					findData(obj[e][listNum], props.slice(1).toString().replace(/,/gi, '.'));
					obj = obj[e][listNum];
					path = props.slice(1).toString().replace(/,/gi, '.');
				}
			} else if (e === pe) {
				returnFindData = obj[pe];
				findData(obj[pe], props.slice(1).toString().replace(/,/gi, '.'));
			} else {
				return undefined;
			}
		});
	});
	return returnFindData;
};

export default findData;
