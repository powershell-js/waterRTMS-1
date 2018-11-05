/**
 * Created by W on 2018-06-28 22:06.
 */
import esriLoader from 'esri-loader';
import tileInfo from './tdt_data';
import urlClass from './UrlClass'
import global from './Global'
import drawClass from '@/components/js/DrawClass'
import axios from 'axios'

class Methods {
    loadArcgis1() {// 该方法用于加载 arcgis 依赖的js,css 等
        esriLoader.loadScript({ // 加载js
            //url: 'http://' + location.host + '/static/dojo/dojo.js',
             url: 'http://112.64.170.158:8011/library/3.25/3.25/init.js',
             //url: 'https://js.arcgis.com/3.25/',
            dojoConfig: {
                async: true
            },
        });
        // 加载css
        //esriLoader.loadCss('http://' + location.host + '/static/esri/css/esri.css');
        //esriLoader1.loadCss('https://js.arcgis.com/3.25/esri/css/esri.css');
        esriLoader.loadCss('http://112.64.170.158:8011/library/3.25/3.25/esri/css/esri.css');
        esriLoader.loadCss('http://112.64.170.158:8011/library/3.25/3.25/dijit/themes/tundra/tundra.css');
        // 加载模块
        esriLoader.loadModules([
            'esri/map',
            'esri/layers/TiledMapServiceLayer',           
            'esri/SpatialReference',
            'esri/geometry/Extent',
            'esri/layers/TileInfo',
            'esri/geometry/Point',
            'esri/geometry/Circle',
            'esri/layers/ArcGISDynamicMapServiceLayer',
            'esri/symbols/PictureMarkerSymbol',
            'esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/SimpleLineSymbol',
            'esri/graphic',
            'esri/layers/GraphicsLayer',
            'esri/Color',
            "esri/layers/FeatureLayer",
            "esri/renderers/HeatmapRenderer",
        ], {
               // url: 'http://' + location.host + '/static/dojo/dojo.js'
                url: 'http://112.64.170.158:8011/library/3.25/3.25/init.js'
                //url: 'https://js.arcgis.com/3.25/'
            })
            .then(this.loading1)
            .then(obj1 => {
                this.initMap1(obj1);
            })
            .catch((err) => {
                console.trace(err.message);
            });
    }

    loading1([// 注意 这里的参数是数组,该方法用于自定义TiledMapServiceLayer加载天地图;
        Map,
        TiledMapServiceLayer,
        SpatialReference,
        Extent,
        TileInfo,
        Point,
        Circle,
        ArcGISDynamicMapServiceLayer,
        PictureMarkerSymbol,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        Graphic,
        GraphicsLayer,
        Color,
        FeatureLayer,
        HeatmapRenderer,
    ]) {
        dojo.declare('TDT', TiledMapServiceLayer, {

            constructor(maptype1) {
                this._maptype = Object.assign({},maptype1);
                this.spatialReference = new SpatialReference({ wkid: global.spatialReference });
                this.initialExtent = (this.fullExtent = new Extent(380083.27864125, 252673.3739848, 605825.77522175, 400526.3930992,
                    this.spatialReference));
                
                var tileInfo2 = Object.assign({},tileInfo.tileInfo);
                for (var i = 0; i < tileInfo.tileInfo.lods.length; i++) {
                    tileInfo2.lods[i].resolution *= 0.869725407161398;
                } 
                console.log(this) 
                this.tileInfo = new TileInfo(tileInfo2);
                this.loaded = true;
                this.onLoad(this);
            },

              getTileUrl(level, row, col) {
                return 'http://121.40.242.176:8098/Service1.svc/Rest/GMService/' + col + '/' + row + '/' + level + '/1/amap';
            }  
        });
        return { // return 之后才能使用链式调用
            Map,
            TiledMapServiceLayer,
            SpatialReference,
            Extent,
            TileInfo,
            Point,
            Circle,
            ArcGISDynamicMapServiceLayer,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            Graphic,
            GraphicsLayer,
            Color,
            FeatureLayer,
            HeatmapRenderer,
            TDT
        };
    }


    initMap1(obj) { // 初始化地图,并设置中心点等
        this.mapObj1 = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
        var map1 = new this.mapObj1.Map('map1', { logo: false });// 创建地图实例
        var img = new TDT('img1') // 影像
        map1.addLayer(img)
        var initExtent = drawClass.GetMapInitExtent(global.initExtent)
        map1.setExtent(initExtent);
        var dynamicMapServiceLayer = new this.mapObj1.ArcGISDynamicMapServiceLayer(urlClass.baseMapUrl);
        map1.addLayer(dynamicMapServiceLayer); 
        //drawClass.DrawHeatMap(map1);
        var gl = new this.mapObj1.GraphicsLayer();
        var point = new this.mapObj1.Point(498766.6875, 321263.46875, new esri.SpatialReference({ wkid: global.spatialReference }));
        var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol('../../../static/assets/dingwei_03.png', 98, 98);
        var graphic = new esri.Graphic(point,pictureMarkerSymbol) 
        //gl.add(graphic)
        map1.addLayer(gl)

        var layerDefinition = {
            "geometryType": "esriGeometryPoint",
            "fields": [{
              "name": "ID",
              "type": "esriFieldTypeInteger",
              "alias": "ID"
            }]
          }
          var featureCollection = {
            layerDefinition: layerDefinition,
            featureSet: null
          };
          var featureLayer = new esri.layers.FeatureLayer(featureCollection, {
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            opacity: 1
          });
      
          var heatmapRenderer = new esri.renderer.HeatmapRenderer({
            colors: ["rgba(255, 0, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"],
            blurRadius: 8,
            maxPixelIntensity: 300,
            minPixelIntensity: 10
          });
          featureLayer.setRenderer(heatmapRenderer);
          map1.addLayer(featureLayer);
         
            var parameterTemp = '';
       /*    axios.post(
            urlClass.axiosUrlLocalHost+"GetPoint",
            JSON.stringify(parameterTemp),
            {headers: {'Content-Type':'application/json;'}}
        )   
         .then(function(respone){
             var points = respone.data;
             console.log(points)
             for(var i=0;i<points.length;i++)
             {
                var point = new esri.geometry.Point(Number(points[i].X), Number(points[i].Y), 
                    new esri.SpatialReference({wkid: global.spatialReference}));
                 featureLayer.add(new esri.Graphic(point));
             }
         })  */
    }
}

export default new Methods()
