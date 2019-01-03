# toast提示

```vim
import { toast } from 'mido-h5-cp';

toast.show({
  wrap: '', // 需要出现提示的容器
  width: '', // 提示的宽度
  height: '', // 提示的高度
  top: '', // 提示框的上方位置
  left: '', // 提示框的左方位置
  backgroundColor: '', // 提示框的颜色
  radius: '', // 提示框的圆角，默认没有
  autoDisappear: false, // 是否一段时间后消失
  time: 1000, // 提示框消失的时间
  type: '', // 默认的提示类型 reqOk  请求成功  reqFail 请求失败 默认是加载中
  img: '',// 未传入模板，默认模板自定义的图片
  text: '', // 未传入模板，默认模板自定义文字
  closeToast: function() {} // 关闭toast的回调函数
  tpl: 传入的模板({需要传的参数}), //需要传的模板， 不传的话默认为原始，直接在外层传入需要的图片或文字
})
toast.hide() // 关闭模板
```
## [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/toast/Basic)
