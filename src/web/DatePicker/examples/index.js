import('../../../main')
	.then(({ Picker }) => {
		const picker = new Picker({
			mode: 'time'
		});
    
		picker.init();
	});