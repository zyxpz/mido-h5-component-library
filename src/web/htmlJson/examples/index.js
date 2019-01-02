import {
	htmlJson
} from '../../../main';

const obj = {
	a: 'Hello',
	b: 'World'
};

document.querySelector('.J-content').innerHTML = htmlJson(obj);
