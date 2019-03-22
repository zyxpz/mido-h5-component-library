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
		this.moveX = 0;
		this.moveY = 0;
		this.tagStyle = {};
		this.listBorder = 0;
		this.init();
	}
	event() {
		this.tabClick();
		this.tabTouchmove();
	}
	init() {
		this.vertical = (this.direction !== 'top' && this.direction !== 'bottom') || false;
		this.width = this.wrap.width();
		this.horizontal = !this.vertical;
		this.styleSetting();
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

		// 动画设置
		this.contentWrap = this.wrap.find('.J-list-content');
		this.tapContent = this.wrap.find('.J-tap-content');
		const tapLists = this.tapContent.children();
		const lists = this.contentWrap.children();
		this.tabSlide = this.wrap.find('.J-tap-slide');

		// tab样式处理
		tapLists.addClass('tap-wrap-common');
		this.tapContent.css({
			...this.listBorder
		});
		$(tapLists[0]).css({
			...this.tagStyle
		});
		tapLists.css({
			'height': this.tabHeight,
			'width ': this.tabWidth,
		});

		// 内容区样式处理
		// let contentStyle = '';
		// contentStyle = this.horizontal?
		if (this.horizontal) {
			this.tapContent.css({
				'width': tapLists.length * tapLists.width()
			});
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
			this.tapContent.css({
				'height': tapLists.length * tapLists.height()
			});
			this.contentWrap.css({
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
	styleSetting() {
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
				break;
		}
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
					that.tabAnimation(that.tapContent, moveNum, true);
					e.stopPropagation();
				}
				that.animation(that.contentWrap, that.width * id, true);
			} else {
				moveNum = -(id - 1) * tabHeight;
				if (id > 0 && id !== tabList.length - 1) {
					that.tabAnimation(that.tapContent, moveNum);
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
		const minMoveY = -this.tapContent.height() + this.height;
		const minMoveX = -this.tapContent.width() + this.width;
		this.tapContent.on('touchstart', (e) => {

			// 开始移动，记下移动位置
			startPosX = e.touches[0].pageX;
			startPosY = e.touches[0].pageY;
		}).on('touchmove', function (e) {

			// 移动过程中的操作
			endPosX = e.touches[0].pageX;
			endPosY = e.touches[0].pageY;
			let posLeft = that.tapContent.css('left');
			posLeft = parseInt(posLeft);
			let posTop = that.tapContent.css('top');
			posTop = parseInt(posTop);

			// 计算当前移动的位置
			that.moveX = posLeft + (endPosX - startPosX);
			that.moveY = posTop + (endPosY - startPosY);
			console.log(posLeft, endPosX - startPosX, '000');
			// 计算移动的区域范围
			if (that.horizontal && that.moveX <= 0 && that.moveX >= minMoveX) {
				that.tabAnimation(that.tapContent, that.moveX, true);
			}
			if (that.vertical && that.moveY <= 0 && that.moveY >= minMoveY) {
				that.tabAnimation(that.tapContent, that.moveY);
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
	tabAnimation(animationWrap, istance, horizontal) {
		const time = this.tabIsAnimation ? this.time : 0;
		// 横向移动时的位置
		if (horizontal) {
			animationWrap.css({
				'left': istance,
				'top': 0,
				// 'transition': `left ${time}s`
			});
		} else {
			// 纵向向移动时的位置
			animationWrap.css({
				'left': 0,
				'top': istance,
				// 'transition': `top ${time}s`
			});
		}
	}
	// contentStyleHandel() {
	// 	this.tapContent.css({
	// 		'width': tapLists.length * tapLists.width()
	// 	});
	// 	this.contentWrap.css({
	// 		'width': this.width * lists.length
	// 	});
	// 	lists.forEach(item => {
	// 		$(item).css({
	// 			'width': this.width
	// 		});
	// 	});
	// }
}