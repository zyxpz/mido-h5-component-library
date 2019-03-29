import toastTpl from './toast.atpl';
import toasInnertTpl from './toastInner.atpl';
import 'mido-less-general/lib/index.js';
import './index.less';

function loop() { };

const toast = {
	closeToast: loop,
	init: function (opts) {
		this.event(opts);
	},
	show: function (opts) {
		const {
			wrap = '',
			tpl = '',
			type = '',
			img = '',
			text = '',
			closeToast = loop,
		} = opts;
		this.closeToast = closeToast;
		const toastWrap = $('.J-toast-wrap');

		// 没有传模板用默认模板
		if (!tpl) {
			let imgClass = '', toastText = '';
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

		if (!toastWrap.length) {
			wrap.append(toastTpl(opts));
		} else {
			return;
		}
		this.init(opts);
	},

	event: function (opts) {
		const self = this;
		const {
			autoDisappear = true,
			time = 2000,
			wrap = '',
		} = opts;
		wrap.on('click', '.J-toast-wrap', () => {
			self.hide();
		});

		// 提示是否会自动消失
		if (autoDisappear) {
			setTimeout(() => {
				self.hide();
			}, time);
		}
	},

	hide: function () {
		const toastWrap = $('.J-toast-wrap');
		toastWrap.remove();
		this.closeToast();
	}
};

export default toast;
