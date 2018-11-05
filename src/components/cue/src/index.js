import "./utils/lib";
import "./plugins";
import Chart from '../packages/Chart/index.js';
import Egrid from '../packages/Egrid/index.js';
import Hgrid from '../packages/Hgrid/index.js';
import Report from '../packages/Report/index.js';
import EReport from '../packages/EReport/index.js';
import Form from '../packages/Form/index.js';
import Crud from '../packages/Crud/index.js';
import Wrapper from '../packages/Wrapper/index.js';
import Scrolltable from '../packages/Scrolltable/index.js';
import Headers from '../packages/Header/index.js';
import logo from '../packages/Logo/index.js';
import {HdHMenu, HdMenu} from '../packages/Menu/index.js';
import {HdAliMenu} from '../packages/AliMenu/index.js';
import ScrollPane from '../packages/ScrollPane/index.js';
import ElementUI from 'element-ui';

const components = [Chart, Egrid, Hgrid, Report, EReport, Form, Crud, Wrapper, Scrolltable, Headers, logo, HdMenu, HdHMenu, HdAliMenu, ScrollPane];

const install = function(Vue, opts = {}){
    // 加载Element-ui
    if(!Vue.prototype.$ELEMENT){
        Vue.use(ElementUI, {size: "mini"});
    }

    if(install.installed){
        return;
    }
    components.map(component => {
        Vue.component(component.name, component);
    });
};

if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
}

// module.exports = {
//   version: '0.1.0',
//   install,
//   Menu
// };

export default {
    version: '0.1.0',
    install,
    Chart,
    Egrid,
    Hgrid,
    Report,
    EReport,
    Crud,
    Wrapper,
    Headers,
    logo,
    HdMenu,
    HdHMenu,
    Scrolltable
};
