const  copy = (opts) => {
	const {
		copyWrap = '',
		dataType = 'value'
	} = opts;
	try {
		// create
		let input = document.createElement('input');

		input.value = document.querySelector(`.${copyWrap}`)[dataType];
		
		document.body.appendChild(input);

		// copy
		input.select();
		document.execCommand("Copy");

		// remove
		document.body.removeChild(input);
	} catch (error) {
		console.log(`coyp file -> ${error}`);
	}
};

export default copy;