import('../../../main')
	.then(({ DatePicker }) => {
		const picker = new DatePicker({
			mode: 'time'
		});
    
		picker.init();
	});