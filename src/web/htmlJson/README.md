## htmlJson
- json对象以对象形式在html展示

```js
import { htmlJson } from 'mido-h5-cp';

const json = {
	a: 'Hello', b: 'World'
};

const jsonData = htmlJson(json);

console.log(jsonData);
```

- [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/htmlJson/Basic)