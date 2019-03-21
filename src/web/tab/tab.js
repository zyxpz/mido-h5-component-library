import tabTpl from './tab.atpl';
import tabInnerTpl from './innerTab.atpl';

function loop() { };

export default class Tab {
	constructor(opts) {
		this.wrap = opts.wrap || '';
		this.tabColor = opts.tabColor || '#ccc';
		this.borderColor = opts.borderColor || '#0B71BA';
		this.size = opts.size || '14px';
		this.borderSize = opts.borderSize || '';
		this.direction = opts.direction || '';
		this.data = opts.data || '';
		this.onTabClick = opts.onTabClick || loop;
		this.tagColor = opts.tagColor || '#0B71BA';
		this.renderTab = opts.renderTab || '';
		this.contentDom = opts.renderContent || '';
		this.contentWrap = '';
		this.time = opts.time || 0.3,
		this.height = opts.height || 200;
		this.padding = opts.padding || '';
		this.tabSwipeable = opts.tabSwipeable || false;
		this.istanceToChangeTab = opts.istanceToChangeTab || '';
		this.init();
	}
	event() {
		this.tabClick();
		this.tabTouchmove();
	}
	init() {
		this.horizontal = (this.direction !== 'top' && this.direction !== 'bottom') || false;
		this.width = this.wrap.width();
		// this.vertical = this.direction !== 'top' && this.direction !== 'bottom' || false;

		// tab标签或者底部内容模板设置
		const tabListDom = this.renderTab || `${tabInnerTpl({ data: this.data, isTab: true, tagColor: this.tagColor })}`;
		const contentDom = this.contentDom || `${tabInnerTpl({ data: this.data, isList: true })}`;
		// tab边框设置
		this.borderSet = this.borderSize ? `${this.borderSetting()}: ${this.borderSize} solid ${this.borderColor};color: ${this.tagColor};padding: ${this.padding}` : `color: ${this.tagColor};padding: ${this.padding}`;
		// tab自定义样式处理
		const customizeStyle = {};
		if (this.padding) {
			customizeStyle.padding = this.padding;
		} else if (this.istanceToChangeTab) {
			customizeStyle.width = this.this.istanceToChangeTab;
		}

		// 模板渲染
		this.wrap.html(tabTpl({
			size: this.size,
			direction: this.direction,
			color: this.tabColor,
			tabListDom,
			contentDom,
		}));

		// 动画设置
		this.contentWrap = this.wrap.find('.J-list-content');
		this.tapContent = this.wrap.find('.J-tap-content');
		const tapLists = this.tapContent.children();
		const lists = this.contentWrap.children();
		this.tabSlide = this.wrap.find('.J-tap-slide');
		tapLists.addClass('tap-wrap-common');
		tapLists[0].style = `${this.borderSet}`;
		if (this.padding) {
			tapLists.css({
				...customizeStyle,
			});
		}
		this.tapContent.css({
			'width': tapLists.length * tapLists.width()
		});

		if (this.direction === 'top' || this.direction === 'bottom') {
			this.contentWrap.css({
				'width': this.width * lists.length
			});
			lists.forEach(item => {
				$(item).css({
					'width': this.width
				});
			});
		} else {
			this.wrap.find('.J-wrap').css({
				'height': this.height
			});
			this.contentWrap.css({
				'display': 'block',
				'height': this.height * lists.length,
			});
			lists.forEach(item => {
				$(item).css({
					'height': this.height,
					'overflow-y': 'scroll',
					'-webkit-overflow-scrolling': 'touch'
				});
			});
		}
		this.event();
	}
	borderSetting() {
		let borderSet = 'border-bottom';
		switch (this.direction) {
			case 'bottom':
				borderSet = 'border-top';
				break;
			case 'left':
				borderSet = 'border-right';
				break;
			case 'right':
				borderSet = 'border-left';
				break;
			default:
				borderSet = 'border-bottom';
				break;
		}
		return borderSet;
	}
	// tab标签点击
	tabClick(e) {
		const that = this;
		const tabList = this.tapContent.children();
		const lists = this.contentWrap.children();
		const tabWidth = tabList.width();
		const tabHeight = tabList.height();
		// tab点击
		tabList.on('tap', function (e) {
			const $target = $(e.currentTarget);
			const id = $target.data('id');
			let moveNum = '';
			$target.siblings().css({
				'color': that.color,
				'border': 0,
			});
			$target[0].style = `${that.borderSet}`;
			if (that.direction && (that.direction === 'top' || that.direction === 'bottom')) {
				moveNum = (id - 1) * tabWidth;
				if (id > 0 && id !== tabList.length - 1 && that.tabSwipeable) {
					that.animation(that.tapContent, moveNum, true);
					e.stopPropagation();
				}
				that.animation(that.contentWrap, that.width * id, true);
			} else {
				moveNum = (id - 1) * tabHeight;
				that.animation(that.tapContent, moveNum);
				that.animation(that.contentWrap, that.height * id);
			}
		});
	}
	tabTouchmove() {
		const that = this;
		this.tabSlide.on('touchstart', (e) => {
			// e.stopPropagation();
			console.log('888');
			// e.preventDefault();
			// that.tapContent.css({
			// 	'transform': `translate3d(0, 0, 0)`,
			// });
		});
	}
	animation(animationWrap, istance, horizontal) {
		if (horizontal) {
			animationWrap.css({
				'transform': `translate3d(-${istance}px, 0, 0)`,
				'transition': `transform ${this.time}s`
			});
		} else {
			animationWrap.css({
				'transform': `translate3d(0,-${istance}px, 0)`,
				'transition': `transform ${this.time}s`
			});
		}
	}
}