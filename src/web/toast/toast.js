import toastTpl from './toast.atpl';
import toasInnertTpl from './toastInner.atpl';
import 'mido-less-general/lib/index.js';

function loop() {};

const toast = {
	init: function(opts) {
		this.event(opts);
	},
	show: function(opts) {
		const {
			wrap = '',
			tpl = '',
			type = '',
			img = '',
			text = '',
		} = opts;
		const toastWrap = $('.J-toast-wrap');

		// 没有传模板用默认模板
		if (!tpl) {
			let imgClass = '', toastText = '';
			console.log(type, 'type');
			switch (type) {
				case 'reqOk':
					imgClass = 'icon-chenggong';
					toastText = text ? text : '数据请求成功';
					break;
				case 'reqFail':
					imgClass = 'icon-shibai';
					toastText = text ? text : '数据请求失败';
					break;
				default:
					imgClass = 'loading-icon';
					toastText = text ? text : '加载中';
					break;
			}
			opts.imgClass = imgClass;
			opts.toastText = toastText;
			opts.tpl = `${toasInnertTpl(opts)}`;
		}

		if (toastWrap.length) {
			toastWrap.html(toastTpl(opts));
		} else {
			wrap.append(toastTpl(opts));
		}
		this.init(opts);
	},

	event: function(opts) {
		const {
			autoDisappear = true,
			time = 2000,
		} = opts;
		const self = this;

		// 提示是否会自动消失
		if (autoDisappear) {
			setTimeout(() => {
				self.hide(opts);
			}, time);
		}
	},

	hide: function(opts) {
		const {
			closeToast = loop,
		} = opts;
		const toastWrap = $('.J-toast-wrap');
		toastWrap.remove();
		closeToast();
	}
};

export default toast;