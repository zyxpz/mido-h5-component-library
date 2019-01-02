import { getUrlData, htmlJson  } from '../../../main';

const data = getUrlData();


document.querySelector('.J-content').innerHTML = htmlJson(data);