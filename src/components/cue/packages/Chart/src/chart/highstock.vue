<!--此chart是highstock-->
<script>
    import dom from "./base.vue";

    const Highcharts = require("highcharts/highstock");
    require("highcharts/modules/exporting")(Highcharts);

    Highcharts.setOptions({
        global: {useUTC: false},
        lang: {rangeSelectorZoom: "缩放"},
        credits: {enabled: false},
        //colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        //colors: ['#fe623b', '#1e9cff', '#15cf3c', '#fe6854', '#62cb4e', '#5a9cdc', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        colors: [
            "#fe9f29", "#fe8463", "#37c5ff", "#2adbe3", "#fb59c0",
            "#fece26", "#f45200", "#15c115", "#4aa6b5", "#19cd85",
            "#2178b5", "#b34775", "#959595", "#5983fb", "#59fbd3"
        ],
        chart: {
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            plotBackgroundColor: "rgba(0,0,0,0)",
            plotShadow: false,
            plotBorderWidth: 0
        },
        xAxis: {
            gridLineWidth: 0, tickLength: 0,
            lineColor: "#eee", lineWidth: 1,
            labels: {
                style: {color: "#777"}
            },
            crosshair: {color: "#909090", width: 1}
        },
        yAxis: {
            gridLineWidth: 1, gridLineColor: "#eee",
            lineWidth: 0, tickLength: 0,
            labels: {
                style: {
                    color: "#777",
                }
            },
            title: {
                align: "high", rotation: 0, offset: 0, y: -10,
                style: {color: "#777"}
            },
            crosshair: false
        },
        labels: {
            style: {
                color: "#eee"
            }
        },
        tooltip: {
            axisPointer: {
                lineStyle: {color: "#909090", width: 1},
                crossStyle: {color: "#909090", width: 1}
            },
            backgroundColor: "rgba(0,0,0, 0.7)",
            borderWidth: 0, shadow: false, style: {color: "#FFF"}
        },
        navigation: {
            buttonOptions: {
                theme: {
                    stroke: "#CCCCCC"
                }
            }
        }
    });

    export default {
        mixins: [dom],
        watch: {
            options: {
                deep: true,
                handler(_options){
                    this.$nextTick(()=>{
                        this.init();
                    });
                }
            }
        },
        methods: {
            // 初始化chart
            init(){
                if(this.chart){
                    return;
                }
                let $el = $(this.$el).children("div.hd-chart")[0];
                let opt = {...this.options};
                this.chart = Highcharts.stockChart($el, opt);
            },
            //导出
            exports(){
                this.chart.exportChart({
                    type: "image/png",
                    filename: this.chart.title.textStr
                });
            },
            resize(){
                if(this.chart){
                    let $el = $(this.$el);
                    this.chart.setSize($el.width(), $el.height, false);
                }
            }
        },
        components: {}
    };
</script>
