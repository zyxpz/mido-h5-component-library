const childProcess = require('child_process');
let devWorker = childProcess.fork('./config/webpack.dev.config.js');
const mockWorker = childProcess.fork('./config/mock.config.js');

// devWorker

mockWorker.send('mockInit');

mockWorker.on('message', (msg) => {

	devWorker.send('mockchang');

	devWorker.on('close', (code) => {
		devWorker = childProcess.fork('./config/webpack.dev.config.js');
	});

	devWorker.kill();
});

