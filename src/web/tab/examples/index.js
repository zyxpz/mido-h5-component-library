

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
		title: '第四列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	},
	{
		title: '第五列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	},
	{
		title: '第六列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第7列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第8列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第9列',
		list: [
			{
				content: '第三列第一个'
			}
		]
	}, {
		title: '第10列',
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
		direction: 'left', // tab所处的方向
		data, // 传进的数据
		size: '14px', // 字体大小
		tabListBorder: '1px solid #ddd', // tab列表边框
		tabBorder: '2px solid blue', // 点击后tab的边框
		time: 0.5, // 动画时间
		tabColor: '#ccc', // tab字体颜色
		height: 375, // tab高度,一般是横向分的时候设置
		// tabHeight: '125px', // 设置tab高度
		// tabWidth: '60px', // 设置tab宽度
		tabHeight: 60, // 设置tab高度
		tabWidth: 125, // 设置tab宽度
		useOnPan: true, // 是否使用手动拖动
		tabIsAnimation: true, // tab切换动画
		isAnimation: true, // 主要内容区动画
		tagColor: 'red', // 点击后字体颜色
		// renderTab: tabInnerTpl({ data, isTab: true }), // 被替换的tab 
		// renderContent: '<div>content</div>', // tab里面的内容
		onTabClick: function (id) {
			// 此处可以传入后续的操作和tab里面的模板
			console.log(id, '000');
		}
	});
});