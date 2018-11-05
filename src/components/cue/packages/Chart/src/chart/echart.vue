<script>
    import dom from "./base.vue"
    import {registerTheme} from './echart-themes';

    var Echarts = require('echarts');

    registerTheme(Echarts);

    const ACTION_EVENTS = [
        "legendselectchanged",
        "legendselected",
        "legendunselected",
        "datazoom",
        "datarangeselected",
        "timelinechanged",
        "timelineplaychanged",
        "restore",
        "dataviewchanged",
        "magictypechanged",
        "geoselectchanged",
        "geoselected",
        "geounselected",
        "pieselectchanged",
        "pieselected",
        "pieunselected",
        "mapselectchanged",
        "mapselected",
        "mapunselected",
        "axisareaselected",
        "focusnodeadjacency",
        "unfocusnodeadjacency",
        "brush",
        "brushselected"
    ];

    const MOUSE_EVENTS = [
        "click",
        "dblclick",
        "mouseover",
        "mouseout",
        "mousedown",
        "mouseup",
        "globalout"
    ];

    export default {
        mixins: [dom],
        watch: {
            options: {
                deep: true,
                // immediate: true,
                handler(options){
                    if(!this.chart){
                        if(Object.keys(options).length > 0){
                            this.init()
                        }
                    }
                    else{
                        if(Object.keys(options).length > 0){
                            this.chart.setOption(options, true);
                        }
                        else{
                            this.chart.clear();
                        }
                    }
                }
            },
            group(group){
                this.chart.group = group;
            },
            theme(){
                this.dispose();
                this.init();
            }
        },
        methods: {
            _callMethod(method, ...args){
                if(!this.chart){
                    return;
                }
                return this.chart[method](...args);
            },
            // 初始化chart
            init(){
                if(this.chart){
                    return;
                }
                let $el = $(this.$el).children("div.hd-chart")[0];

                let chart = Echarts.init($el, this.theme || "default",
                    this.options);
                this.chart = chart;
                if(this.group){
                    chart.group = this.group;
                }

                try{
                    this.options && "series" in this.options &&
                    chart.setOption(this.options, true);
                }
                catch(e){

                }

                ACTION_EVENTS.forEach((event) => {
                    chart.on(event, (params) => {
                        this.$emit(event, params);
                    });
                });
                MOUSE_EVENTS.forEach((event) => {
                    chart.on(event, (params) => {
                        this.$emit(event, params);
                    });
                });
            },
            // 销毁chart
            dispose(){
                this._callMethod("dispose");
                this.chart = null;
            },
            resize(){
                this._callMethod("resize");
            },
            clear(){
                this._callMethod("clear");
            },
            mergeOptions(options){
                this._callMethod("setOption", options);
            },
            dispatchAction(payload){
                this._callMethod("dispatchAction", payload);
            },
            convertToPixel(finder, value){
                return this._callMethod("convertToPixel", finder, value);
            },
            convertFromPixel(finder, value){
                return this._callMethod("convertFromPixel", finder, value);
            },
            containPixel(finder, value){
                return this._callMethod("containPixel", finder, value);
            },
            showLoading(type, options){
                this._callMethod("showLoading", type, options);
            },
            hideLoading(){
                this._callMethod("hideLoading")
            },
            getDataURL(options){
                return this._callMethod("getDataURL", options);
            },
            getConnectedDataURL(options){
                return this._callMethod("getConnectedDataURL", options);
            },
            connect(group){
                if(typeof group != "string"){
                    group = group.map((chart) => chart.chart);
                }
                Echarts.connect(group);
            },
            disconnect(group){
                Echarts.disConnect(group);
            },
            registerMap(...args){
                Echarts.registerMap(...args);
            },
            registerTheme(...args){
                Echarts.registerTheme(...args);
            },
            download(ev, url, name){
                let link = document.createElement('a');
                link.download = name;
                link.href = url;
                link.click();
            },
            exports(ev){
                let src = this.chart.getDataURL({
                    type: 'png',
                    excludeComponents: ['toolbox']
                });
                if(src){
                    this.download(ev, src,
                        this.options.title.text || "echarts图表");
                }
            }
        },
        components: {}
    }
</script>
