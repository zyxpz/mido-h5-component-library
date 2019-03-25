import tabTpl from './tab.atpl';
import tabInnerTpl from './innerTab.atpl';

function loop() { };

export default class Tab {
	constructor(opts) {
		this.wrap = opts.wrap || '';
		this.tabColor = opts.tabColor || '#ccc';
		this.size = opts.size || '14px';
		this.tabBorder = opts.tabBorder || 0;
		this.tabListBorder = opts.tabListBorder || 0;
		this.direction = opts.direction || '';
		this.data = opts.data || '';
		this.onTabClick = opts.onTabClick || loop;
		this.tagColor = opts.tagColor || '#0B71BA';
		this.renderTab = opts.renderTab || '';
		this.contentDom = opts.renderContent || '';
		this.contentWrap = '';
		this.time = opts.time || 0.3,
		this.height = opts.height || 200;
		this.tabHeight = opts.tabHeight || '';
		this.tabSwipeable = opts.tabSwipeable || false;
		this.tabWidth = opts.tabWidth || '';
		this.isAnimation = opts.isAnimation || false;
		this.tabIsAnimation = opts.tabIsAnimation || false;
		this.lastX = 0;
		this.lastY = 0;
		this.moveX = 0;
		this.moveY = 0;
		this.tagStyle = {};
		this.listBorder = 0;
		this.horizontal = false;
		this.vertical = false;
		this.init();
	}
	event() {
		this.tabClick();
		this.tabTouchmove();
	}
	init() {
		if (this.direction && this.direction !== 'top' && this.direction !== 'bottom') {
			this.vertical = true;
		}
		this.width = this.wrap.width();
		this.horizontal = !this.vertical;
		// tab标签或者底部内容模板设置
		const tabListDom = this.renderTab || `${tabInnerTpl({ data: this.data, isTab: true, tagColor: this.tagColor })}`;
		const contentDom = this.contentDom || `${tabInnerTpl({ data: this.data, isList: true })}`;

		// 模板渲染
		this.wrap.html(tabTpl({
			size: this.size,
			direction: this.direction,
			color: this.tabColor,
			tabListDom,
			contentDom,
		}));
		this.contentWrap = this.wrap.find('.J-list-content');
		this.tapContent = this.wrap.find('.J-tap-content');
		this.tapLists = this.tapContent.children();
		this.lists = this.contentWrap.children();
		this.tabSlide = this.wrap.find('.J-tap-slide');
		// 样式设置
		this.borderStyleSetting();
		this.contentStyleHandel();
		this.event();
	}
	// border变化设置
	borderStyleSetting() {
		this.tagStyle = {
			'color': this.tagColor,
		};
		switch (this.direction) {
			case 'bottom':
				this.listBorder = {
					'border-top': this.tabListBorder,
				};
				this.tagStyle = {
					...this.tagStyle,
					'border-top': this.tabBorder,
				};
				break;
			case 'left':
				this.listBorder = {
					'border-right': this.tabListBorder,
				};
				this.tagStyle = {
					...this.tagStyle,
					'border-right': this.tabBorder,
				};
				break;
			case 'right':
				this.listBorder = {
					'border-left': this.tabListBorder,
				};
				this.tagStyle = {
					...this.tagStyle,
					'border-left': this.tabBorder,
				};
				break;
			default:
				this.listBorder = {
					'border-bottom': this.tabListBorder,
				};
				this.tagStyle = {
					...this.tagStyle,
					'border-bottom': this.tabBorder,
				};
				// this.tabSlide.css({
				// 	...this.listBorder
				// });
				break;
		}
	}
	// tab标签点击
	tabClick(e) {
		const that = this;
		const tabList = this.tapContent.children();
		const tabWidth = tabList.width();
		const tabHeight = tabList.height();
		// tab点击
		tabList.on('tap', function (e) {
			const $target = $(e.currentTarget);
			const id = $target.data('id');
			let moveNum = '';
			// tab样式设置
			$target.css({
				...that.tagStyle
			});
			$target.siblings().css({
				'color': that.color,
				'border': 0,
			});
			// tab切换，内容区切换
			if (that.horizontal) {
				moveNum = -(id - 1) * tabWidth;
				if (id > 0 && id !== tabList.length - 1) {
					that.tabAnimation(that.tapContent, moveNum, true, true);
					e.stopPropagation();
				}
				that.animation(that.contentWrap, that.width * id, true);
			} else {
				moveNum = -(id - 1) * tabHeight;
				if (id > 0 && id !== tabList.length - 1) {
					that.tabAnimation(that.tapContent, moveNum, false, true);
				}
				that.animation(that.contentWrap, that.height * id);

			}
		});
	}
	// tab拖动函数
	tabTouchmove() {
		const that = this;
		let startPosX = 0,
			startPosY = 0,
			endPosX = 0,
			endPosY = 0;
		// 计算最小移动区域
		const maxMoveY = this.tapContent.height() - this.height;
		const maxMoveX = this.tapContent.width() - this.width;
		this.tapContent.on('touchstart', (e) => {
			that.lastX = that.moveX;
			that.lastY = that.moveY;
			// 开始移动，记下移动位置
			startPosX = e.touches[0].pageX;
			startPosY = e.touches[0].pageY;
		}).on('touchmove', function (e) {
			this.tabIsAnimation = false;
			// 移动过程中的操作
			endPosX = e.touches[0].pageX;
			endPosY = e.touches[0].pageY;

			// 计算当前移动的位置
			that.moveX = that.lastX + startPosX - endPosX;
			that.moveY = that.lastY + startPosY - endPosY;

			// 计算移动的区域范围
			if (that.horizontal && that.moveX >= 0 && that.moveX <= maxMoveX) {
				that.tabAnimation(that.tapContent, -that.moveX, true, false);
			}
			if (that.vertical && that.moveY >= 0 && that.moveY <= maxMoveY) {
				that.tabAnimation(that.tapContent, -that.moveY, false, false);
			}
		});
	}
	// 主要内容区切换函数
	animation(animationWrap, istance, horizontal) {
		const time = this.isAnimation ? this.time : 0;
		// 横向移动时的动画
		if (horizontal) {
			animationWrap.css({
				'transform': `translate3d(-${istance}px, 0, 0)`,
				'transition': `transform ${time}s`
			});
		} else {
			// 纵向向移动时的动画
			animationWrap.css({
				'transform': `translate3d(0,-${istance}px, 0)`,
				'transition': `transform ${time}s`
			});
		}
	}
	// tab切换函数
	tabAnimation(animationWrap, istance, horizontal, isTab) {
		const time = this.tabIsAnimation && isTab ? this.time : 0;
		// 横向移动时的位置
		if (horizontal) {
			animationWrap.css({
				'left': istance,
				'top': 0,
				'transition': `left ${time}s`
			});
		} else {
			// 纵向向移动时的位置
			animationWrap.css({
				'left': 0,
				'top': istance,
				'transition': `top ${time}s`
			});
		}
	}
	// 初始化样式处理
	contentStyleHandel() {
		const listContent = this.wrap.find('J-list-content');
		this.tapLists.addClass('tap-wrap-common');
		this.tapLists.css({
			'height': this.tabHeight,
			'width ': this.tabWidth,
		});
		this.tapContent.css({
			...this.listBorder
		});
		const tapStyle = this.horizontal ? { 'width': this.tapLists.length * this.tapLists.width() } : { 'height': this.tapLists.length * this.tapLists.height() };
		const contentStyle = this.horizontal ? { 'width': this.width * this.lists.length } : { 'height': this.height * this.lists.length };
		const itemStyle = this.horizontal ? { 'width': this.width } : {
			'height': this.height,
			'overflow-y': 'scroll',
			'-webkit-overflow-scrolling': 'touch'
		};
		if (this.vertical) {
			this.wrap.find('.J-wrap').css({
				'height': this.height,
			});
		}
		$(this.tapLists[0]).css({
			...this.tagStyle
		});

		this.tapContent.css({
			...tapStyle
		});
		this.contentWrap.css({
			...contentStyle
		});
		this.lists.forEach(item => {
			$(item).css({
				...itemStyle
			});
		});
	}
}