

import './index.less';
import tabInnerTpl from '../innerTab.atpl';

const data = [
	{
		title: '第一列',
		list: [
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第er个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			},
			{
				content: '第一列第一个'
			}
		]
	},
	{
		title: '第二列',
		list: [
			{
				content: '第er列第一个'
			},
			{
				content: '第一列第一个'
			},
		]
	},
	{
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	},
	{
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	},
	{
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	},
	{
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第三列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}
];
import('../../../main').then(({ Tab }) => {
	const tab = new Tab({
		wrap: $('.content'), // 需要添加的元素
		direction: 'top', // tab所处的方向
		data, // 传进的数据
		borderColor: 'blue', // 边框颜色
		size: '14px', // 字体大小
		borderSize: '2px', // 边框大小
		time: 0.5, // 动画时间
		tabColor: '#ccc', // tab字体颜色
		height: 200, // tab在两边的时候的设置高度
		padding: '15px 15px', // 设置tab两边高度
		istanceToChangeTab: '30%', // 滑动切换宽度
		useOnPan: true, // 是否使用手动拖动
		tabSwipeable: true, // 是否tab可滑动切换
		tagColor: 'red', // 点击后字体颜色
		// renderTab: tabInnerTpl({ data, isTab: true }), // 被替换的tab 
		// renderContent: '<div>content</div>', // tab里面的内容
		onTabClick: function (id) {
			// 此处可以传入后续的操作和tab里面的模板
			console.log(id, '000');
		}
	});
});