const fs = require('fs-extra');

let path = process.env.NODE_LIB || 'dist';

console.log('ts-path:', path);

const contents = {
	"compilerOptions": {
		"module": "commonjs",
		"target": "es5",
		"sourceMap": true,
		"declaration": true,
		"composite": true,
		"outDir": `./${path}/`
	},
	"exclude": [
		"node_modules"
	],
	"files": [
		"./src/web/pullDown/pullDown.ts"
	],
	"references": [{
		"path": ""
	}]
};

fs.outputFileSync('./tsconfig.json', JSON.stringify(contents));