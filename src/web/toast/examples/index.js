import { toast } from '../../../main';
import toastTpl from '../toastInner.atpl';
import './index.less';

document.querySelector('.J-btn').addEventListener('click', () => {
	toast.show({
		wrap: $('.wrap'),
		backgroundColor: 'rgba(0,0,0,0.70)',
		time: 3000,
		autoDisappear: false,
		// img: 'https://gw.alipayobjects.com/zos/rmsportal/rgqxIVvpQwzJlnhuesSP.png',
		type: 'reqFail',
		radius: '10px',
		// tpl: toastTpl({
		// 	img: 'https://gw.alipayobjects.com/zos/rmsportal/wgqeFYasRNiVLEpNMGDn.png',
		// 	text: '当前数据请求成功'
		// }),
	});
});
