const fs = require('fs-extra');

fs.access('./config/user.config.js', fs.constants.F_OK, (err) => {
	if (err) {
		let port = '';

		process.stdout.write('port: ');

		// process.stdin.pipe(process.stdout);

		process.stdin.on('data', (chunk) => {

			// 输入
			port = Number(chunk);

			if (isNaN(port)) {
				console.log('端口号为数字。');
				return false;
			}

			let contents = '';

			// 输出
			contents = `
  const obj = {port: ${port}};
  
  module.exports = obj;
  `;
			fs.outputFileSync('./config/user.config.js', contents);

			process.exit(0);
		});
	} else {
		process.exit(0);
	}
});
