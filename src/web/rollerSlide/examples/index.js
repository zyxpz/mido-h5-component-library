import { RollerSlide } from '../../../main';

import './index.less';

const rollerSlide = new RollerSlide({
	wrap: document.querySelector('.wrap')
});

rollerSlide.init();
