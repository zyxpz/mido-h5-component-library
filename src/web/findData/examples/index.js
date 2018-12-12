import './index.less';
import { findData } from '../../../main';

const path = 'a[0].b.c[0].d.e';


const data = {
	a: [
		{
			b: {
				c: [
					{
						d: {
							e: "tmc1"
						}
					}
				]
			}
		}, {
			a1: {
				b: 'tmc2'
			}
		}
	]
};

const dataWrap = document.querySelector('.J-find-data');

const dataInput = document.querySelector('.J-data-input');

const dataShow = document.querySelector('.J-data-show');

dataWrap.value = JSON.stringify(data);

dataInput.value = path;

document.querySelector('.J-data-btn').addEventListener('click', () => {
	const data = JSON.parse(dataWrap.value);
	const path = dataInput.value;
	const show = JSON.stringify(findData(data, path));
	dataShow.innerText = show;
	dataShow.style.color = 'red';
});