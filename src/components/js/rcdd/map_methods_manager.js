/**
 * Created by W on 2018-06-28 22:06.
 */

import esriLoader from 'esri-loader';
import tileInfo from '../tdt_data';
import store from '@/store/store'
import Vue from 'vue'
import { plugins } from 'handsontable';
import drawClass from '@/components/js/DrawClass'
import drawClassPipeBurst from '@/components/js/PipeBurst/DrawClassPipeBurst'
import drawClassWarningEvent from '@/components/js/rcdd/DrawClassWarningEvent'
import urlClass from '../UrlClass'
import global from '../Global'
import WindowsEvent from '../WindowsEvent';
import PictureProperty from '@/components/js/PipeBurst/PictureProperty';

var mapObjMy;
class Methods {
    loadArcgis() {// 该方法用于加载 arcgis 依赖的js,css 等
        esriLoader.loadScript({ // 加载js
            //url: 'http://' + location.host + '/static/dojo/dojo.js',
            //url: 'http://112.64.170.158:8011/library/3.25/',
            //url: 'https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/init.js',
            //url:'http://192.168.1.177:8081/library/3.25/3.25/init.js',
            url:'http://112.64.170.158:8011/library/3.25/3.25/init.js',
            dojoConfig: {
                async: true
            },
        });
        // 加载css
        //esriLoader.loadCss('http://' + location.host + '/static/esri/css/esri.css');
        esriLoader.loadCss('http://112.64.170.158:8011/library/3.25/3.25/esri/css/esri.css');
        esriLoader.loadCss('http://112.64.170.158:8011/library/3.25/3.25/dijit/themes/tundra/tundra.css');
        /* esriLoader.loadCss('https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/esri/css/esri.css');
        esriLoader.loadCss('https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/dijit/themes/tundra/tundra.css'); */
        // 加载模块
        esriLoader.loadModules([
            'esri/map',
            'esri/layers/TiledMapServiceLayer',
            'esri/SpatialReference',
            'esri/geometry/Extent',
            'esri/layers/TileInfo',
            'esri/geometry/Point',
            'esri/geometry/Polygon',
            'esri/geometry/Circle',
            'esri/layers/ArcGISDynamicMapServiceLayer',
            'esri/symbols/PictureMarkerSymbol',
            'esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/SimpleLineSymbol',
            'esri/symbols/SimpleFillSymbol',
            'esri/graphic',
            'esri/layers/GraphicsLayer',
            'esri/Color',
            "esri/layers/FeatureLayer",
            "esri/renderers/HeatmapRenderer",            
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/symbols/CartographicLineSymbol",
            "esri/tasks/IdentifyParameters",
            "esri/tasks/IdentifyTask",
            'esri/geometry/Geometry',
            'esri/symbols/TextSymbol',
            'esri/symbols/Font',
            'esri/tasks/GeometryService',
            "esri/lang", 
            "esri/config",
            "esri/tasks/BufferParameters",
            "dijit/TooltipDialog", 
            "dijit/popup",
            "dojo/dom-style",
            "dojo/domReady!"
        ], {
                // url: 'http://' + location.host + '/static/dojo/dojo.js'
                url:'http://112.64.170.158:8011/library/3.25/3.25/init.js'
                //url:'https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/init.js',
                //url:'http://192.168.1.177:8081/library/3.25/3.25/init.js'
            })
            .then(this.loading)
            .then(obj => {
                this.initMap(obj);
            })
            .catch((err) => {
                console.trace(err.message);
            });
    }

    loading([// 注意 这里的参数是数组,该方法用于自定义TiledMapServiceLayer加载天地图;
        Map,
        TiledMapServiceLayer,
        SpatialReference,
        Extent,
        TileInfo,
        Point,
        Polygon,
        Circle,
        ArcGISDynamicMapServiceLayer,
        PictureMarkerSymbol,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        Graphic,
        GraphicsLayer,
        Color,
        FeatureLayer,
        HeatmapRenderer,
        Query,
        QueryTask,
        CartographicLineSymbol,
        IdentifyParameters,
        IdentifyTask,
        Geometry,
        TextSymbol,
        Font,
        GeometryService,
        lang,
        esriConfig,
        BufferParameters, 
         TooltipDialog, popup, domStyle
    ]) {
        dojo.declare('TDT', TiledMapServiceLayer, {

            constructor(maptype) {
                this._maptype = maptype;
                this.spatialReference = new SpatialReference({ wkid: 102113 });
                this.initialExtent = (this.fullExtent = drawClass.GetMapInitExtent(global.initExtent))//new Extent(380083.27864125, 252673.3739848, 605825.77522175, 400526.3930992,
                //this.spatialReference));

                var tileInfo1 = tileInfo.tileInfo;
                for (var i = 0; i < tileInfo.tileInfo.lods.length; i++) {
                    tileInfo1.lods[i].resolution *= 0.869725407161398;
                }
                this.tileInfo = new TileInfo(tileInfo1);
                this.loaded = true;
                this.onLoad(this);
            },

            getTileUrl(level, row, col) {
                return 'http://112.64.170.158:8098/Service1.svc/Rest/GMService/' + col + '/' + row + '/' + level + '/1';
            }
        });
        return { // return 之后才能使用链式调用
            Map,
            TiledMapServiceLayer,
            SpatialReference,
            Extent,
            TileInfo,
            Point,
            Polygon,
            Circle,
            ArcGISDynamicMapServiceLayer,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            Graphic,
            GraphicsLayer,
            Color,
            FeatureLayer,
            HeatmapRenderer,
            Query,
            QueryTask,
            CartographicLineSymbol,
            IdentifyParameters,
            IdentifyTask,
            Geometry,
            TextSymbol,
            Font,
            GeometryService,
            lang,
            esriConfig,
            BufferParameters, 
            TooltipDialog,
            popup, 
            domStyle,
            TDT
        };
    }


    initMap(obj) { // 初始化地图,并设置中心点等
        this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
        mapObjMy = obj;
        let map = new this.mapObj.Map('map2', { logo: false });// 创建地图实例
        let img = new TDT('img') // 影像
        map.addLayer(img) // 将图层添加到map对象
        /* var reliefMap = new this.mapObj.ArcGISDynamicMapServiceLayer(urlClass.reliefMap);
        map.addLayer(reliefMap);  */
        var initExtent = drawClass.GetMapInitExtent(global.initExtent)//new esri.geometry.Extent(380083.27864125, 252673.3739848, 605825.77522175, 400526.3930992,
        map.setExtent(initExtent);
        //new this.mapObj.SpatialReference({ wkid: 102113 }));
        var gl = new this.mapObj.GraphicsLayer();

        //esriConfig.defaults.io.proxyUrl = "http://112.64.170.158:8888/proxy.ashx";
        //esriConfig.defaults.io.alwaysUseProxy = false;

        var warningEventLayer = new this.mapObj.GraphicsLayer();

        map.addLayer(warningEventLayer);

        //var geometryService = new esri.tasks.GeometryService(urlClass.geometryService);

        var point = new this.mapObj.Point(498766.6875, 321263.46875, new this.mapObj.SpatialReference({ wkid: 102113 }));
        var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol('../../../static/assets/dingwei_03.png', 98, 98);
        var simpleMarkerSymbol = new this.mapObj.SimpleMarkerSymbol().setStyle(
            this.mapObj.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new this.mapObj.Color([0, 255, 0, 0.5]));

        var dynamicMapServiceLayer = new this.mapObj.ArcGISDynamicMapServiceLayer(urlClass.baseMapUrl);
        map.addLayer(dynamicMapServiceLayer);
   
        var hour = 0;//结果时间
        var field = 'Result_Flow_' + hour;//查询的字段

        function myAlert(content, title) {
            alert(content, title, {
                confirmButtonText: '确定',
            });
        }


        window.addEventListener('event_name', function (event) {
            var typeMy = event.detail.type;

            if (typeMy == "Rcdd_WarningEventDraw"){
                warningEventLayer.clear();
                var drawData = event.detail.data;
                console.log(drawData);
                drawClassWarningEvent.DrawWarningEvent(drawData, warningEventLayer);
            }
        });

    }

}

export default new Methods()
