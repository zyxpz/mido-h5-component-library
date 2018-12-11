const fs = require('fs-extra');

let path = process.env.NODE_LIB || 'dist';

console.log('ts-path:', path);

const contents = {
	"compilerOptions": {
		"module": "commonjs",
		"target": "es5",
		"sourceMap": path === 'lib' ? false : true,
		"declaration": true,
		"composite": true,
		"outDir": `./${path}/`,
		"rootDir": "",
	},
	"exclude": [
		"node_modules"
	],
	"include": [
		"src/**/*"
	],
	"references": [{
		"path": ""
	}]
};

fs.outputFileSync('./tsconfig.json', JSON.stringify(contents));