/**
 * Created by W on 2018-06-28 22:06.
 */

import esriLoader from 'esri-loader';
import tileInfo from './tdt_data';
import axios from "axios";
import BaseSelect from '@/components/BaseSelect/BaseSelect'
import myWindowIndex from '@/components/js/myWindowIndex'
import store from '@/store/store'
import Vue from 'vue'
import myAlert from '@/components/js/myAlert'
import { plugins } from 'handsontable';
import drawClass from '@/components/js/DrawClass'
import urlClass from './UrlClass'
import global from './Global'
import getAndPost from '@/components/js/GetAndPost'

var mapObjMy;
class Methods {
    loadArcgis() {// 该方法用于加载 arcgis 依赖的js,css 等
        esriLoader.loadScript({ // 加载js
            //url: 'http://' + location.host + '/static/dojo/dojo.js',
             url: 'https://js.arcgis.com/3.25/',
            dojoConfig: {
                async: true
            },
        });
        // 加载css
        //esriLoader.loadCss('http://' + location.host + '/static/esri/css/esri.css');
        esriLoader.loadCss('https://js.arcgis.com/3.25/esri/css/esri.css');
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
            "dojo/domReady!",
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/symbols/CartographicLineSymbol",
            "esri/tasks/IdentifyParameters",
            "esri/tasks/IdentifyTask",
            'esri/geometry/Geometry',
            'esri/symbols/TextSymbol',
            'esri/symbols/Font'
        ], {
               // url: 'http://' + location.host + '/static/dojo/dojo.js'
                url: 'https://js.arcgis.com/3.25/'
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
        Query,
        QueryTask,
        CartographicLineSymbol,
        IdentifyParameters,
        IdentifyTask,
        Geometry,
        TextSymbol,
        Font
    ]) {
        dojo.declare('TDT', TiledMapServiceLayer, {

            constructor(maptype) {
                this._maptype = maptype;
                this.spatialReference = new SpatialReference({ wkid: 102113 });
                console.log(global.initExtent)
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
            Query,
            QueryTask,
            CartographicLineSymbol,
            IdentifyParameters,
            IdentifyTask,
            Geometry,
            TextSymbol,
            Font,
            TDT
        };
    }
    

    initMap(obj) { // 初始化地图,并设置中心点等
         this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
         mapObjMy = obj;
        let map = new this.mapObj.Map('map', { logo: false });// 创建地图实例
        let img = new TDT('img') // 影像
        map.addLayer(img) // 将图层添加到map对象
        var initExtent = drawClass.GetMapInitExtent(global.initExtent)//new esri.geometry.Extent(380083.27864125, 252673.3739848, 605825.77522175, 400526.3930992,
            //new this.mapObj.SpatialReference({ wkid: 102113 }));
        var gl = new this.mapObj.GraphicsLayer();
        var valveAttributeLayer = new this.mapObj.GraphicsLayer();
        var compareResultLayer = new this.mapObj.GraphicsLayer(); 
        var planCalResultFlowLayer = new this.mapObj.GraphicsLayer(); 
        var planCalResultVelocityLayer = new this.mapObj.GraphicsLayer(); 
        var MaxLayer = new this.mapObj.GraphicsLayer();
        var MinLayer = new this.mapObj.GraphicsLayer();
        var LocationGraphicsLayer = new this.mapObj.GraphicsLayer();
        var mapClickgl = new this.mapObj.GraphicsLayer();
        map.addLayer(gl);
        map.addLayer(LocationGraphicsLayer);
        map.addLayer(valveAttributeLayer);
        map.addLayer(MaxLayer);
        map.addLayer(MinLayer);
        map.addLayer(compareResultLayer);
        map.addLayer(planCalResultFlowLayer);
        map.addLayer(planCalResultVelocityLayer);

        //drawClass.AddGraphic(gl);//调用外部js中的方法
        //console.log(urlClass.urlClass.axiosUrl)
        var point = new this.mapObj.Point(498766.6875, 321263.46875, new this.mapObj.SpatialReference({ wkid: 102113 }));
        var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol('../../../static/assets/dingwei_03.png', 98, 98);
        var simpleMarkerSymbol = new this.mapObj.SimpleMarkerSymbol().setStyle(
            this.mapObj.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new this.mapObj.Color([0, 255, 0, 0.5]));

        var valveStatusImageSource = '../../../static/assets/valve_change.png';
        var valveCloseSource = '../../../static/assets/valve_closed.png';
        var valvePartCloseSource = '../../../static/assets/valve_partclosed.png';
        var maxSource = '../../../static/assets/colored-pins-blue.png';
        var minSource = '../../../static/assets/colored-pins-red.png';
        /**
         * 基础管网服务
         */
        //var urlClass.baseMapUrl = 'http://112.64.170.158:8888/ArcGIS/rest/services/ModelPipe_sxquan_BaseMapNew/MapServer';
        /**
         * 用户数据服务
         */
        var customerUrl = 'http://112.64.170.158:8888/ArcGIS/rest/services/CustomerMeter_sxquanNew/MapServer/0';
        var dynamicMapServiceLayer = new this.mapObj.ArcGISDynamicMapServiceLayer(urlClass.baseMapUrl);
        map.addLayer(dynamicMapServiceLayer); 
        var pipeLayerId = 8;
        var hour = 0;//结果时间
        var field = 'Result_Flow_'+hour;//查询的字段
        
        var gra;
        var identifyTask;
        var isMapClick = false;
         map.on("click", function (e) {
             if(isMapClick)
                myIdentify(e);
            else
            myAlert('请先点击查询按钮','提示');
            
        }); 


        function myAlert(content,title) {
            alert(content, title, {
           confirmButtonText: '确定',
         });
          }

        map.infoWindow.on('hide',MyHideInfoWindow);//infowindow关闭事件
        var clickMapPoint;
        /**
         * Identify查询初始化
         * @param {*} e 地图点击事件对象
         */
        function myIdentify(e){
            clickMapPoint = new esri.geometry.Point(e.mapPoint.x,e.mapPoint.y,map.spatialReference);
            IdentifyMain(e.mapPoint,'mapClick');
        }


        function IdentifyMain(pointTemp,typeTemp){
            var idenrifyParams = new esri.tasks.IdentifyParameters();
            idenrifyParams.returnGeometry = true;
            idenrifyParams.width = map.width;
            idenrifyParams.height = map.height;
            idenrifyParams.geometry = pointTemp;
            idenrifyParams.tolerance = 2;
            idenrifyParams.mapExtent = map.extent;
            idenrifyParams.spatialReference = map.spatialReference;
            identifyTask = new esri.tasks.IdentifyTask(urlClass.baseMapUrl);
            identifyTask.execute(idenrifyParams,myResultFunction);
        }

        /**
         * 减压阀
         */
        var EN_PRVALVE = "0";
         /**
         * 流量阀
         */
        var EN_FCVALVE = "1";
         /**
         * 止回阀
         */
        var EN_CVALVE = "2";
         /**
         * 水泵
         */
        var EN_PUMP = "3";
         /**
         * 水池
         */
        var EN_TANK = "4";
         /**
         * 消火栓
         */
        var EN_HYDRANT = "5";
         /**
         * 阀门
         */
        var EN_VALVE = "6";
         /**
         * 节点
         */
        var EN_JUNCTION = "7";
         /**
         * 管道
         */
        var EN_PIPE = "8";
        var EN_PIPE_1 = "9";
        var EN_PIPE_2 = "10";
        /**
         * 管道开关状态
         */
        var pipeState = [
            {label:"开",value:0},
            {label:"关",value:1}
        ];
        /**
         * 管道属性
         * displayName:显示字段
         * fieldName:数据查询字段
         * type:数据查询类型
         * rounding:是否保留小数
         * displayType:显示字段类型
         * changeData:修改后数据
         * id:显示组件的ID
         * originalData:原始数据
         */
        var pipeAttribute =  [
            {displayName:"流量",fieldName:"Result_Flow_",type:"result",unit:"m³/h",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"流速",fieldName:"Result_Velocity_",type:"result",unit:"m/s",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"水头损失",fieldName:"Result_Headloss_",type:"result",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"地址",fieldName:"位置",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',changeData:'',id:'',originalData:""},
            {displayName:"分公司",fieldName:"分公司",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',changeData:'',id:'',originalData:""},
            {displayName:"管径",fieldName:"Physical_PipeDiameter",type:"attribute",unit:"mm",rounding:true,displayType:"input",changeData:'',id:'',originalData:""},
            {displayName:"管材",fieldName:"Physical_PipeMaterial",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"管长",fieldName:"HMIGeometryScaledLength",type:"attribute",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"阻力系数",fieldName:"Physical_HazenWilliamsC",type:"attribute",unit:"",rounding:true,displayType:"input",changeData:'',id:'',originalData:""},
            {displayName:"状态",fieldName:"PipeStatus",type:"attribute",unit:"",rounding:false,displayType:"combox",changeData:'',id:'',originalData:""},
            {displayName:"管龄",fieldName:"PipeAge",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"安装年代",fieldName:"埋设时间",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"今日流向变化",fieldName:"Direction_Change_",type:"result",unit:"次",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"模型ID",fieldName:"ElementId",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"GIS编号",fieldName:"Label",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"起始节点",fieldName:"StartNodeID",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"终止节点",fieldName:"EndNodeID",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""}
        ];

        /**
         * 节点属性
         */
        var junctionAttribute =  [
            {displayName:"水压标高",fieldName:"Result_HydraulicGrade_",type:"result",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"压力",fieldName:"Result_Pressure_",type:"result",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"流量",fieldName:"Result_Demand_",type:"result",unit:"m³/h",rounding:true,displayType:"input",changeData:'',id:'',originalData:""},
            {displayName:"压力同比",fieldName:"Pressure_Change",type:"result",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"地址",fieldName:"位置",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"分公司",fieldName:"分公司",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"地面高程",fieldName:"Physical_NodeElevation",type:"attribute",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"模型ID",fieldName:"ElementId",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"GIS编号",fieldName:"Label",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
        ];

         /**
         * 阀门属性
         */
        var tcvAttribute =  [
            {displayName:"水压标高",fieldName:"Result_FromHead_",type:"result",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"压力",fieldName:"Result_FromPressure_",type:"result",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"阀门编号",fieldName:"阀门编号",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"地址",fieldName:"位置",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"分公司",fieldName:"分公司",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"埋深",fieldName:"Physical_NodeElevation",type:"attribute",unit:"m",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"口径",fieldName:"Physical_ValveDiameter",type:"attribute",unit:"mm",rounding:true,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"开关状态",fieldName:"ValveSetting",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"开度",fieldName:"InitialSettingsRelativeClosure",type:"attribute",unit:"%",rounding:false,displayType:"input",changeData:'',id:'',originalData:""},
            {displayName:"安装年代",fieldName:"埋设时间",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"模型ID",fieldName:"ElementId",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
            {displayName:"GIS编号",fieldName:"Label",type:"attribute",unit:"",rounding:false,displayType:"label",changeData:'',id:'',originalData:""},
        ];

        /**
         * 创建组件属性的标签
         * @param {*} displayName 组件属性标签名称 
         */
        function CreateLabelTitle(displayName){
            var star = document.createElement("div"); 
            star.style = "display:inline;width:250px";
            var o1 = document.createElement('span');
            o1.textContent = displayName;
            o1.style = "float:left;text-align:right;display:block;width:110px; float:left;font-family:'SimSun';font-size: 12px;";
            star.appendChild(o1);
            var o = document.createElement('span');
            o.style = 'padding-left:10px;';
            star.appendChild(o);
            return star;
        }

        function CheckChangeData(changeDataTemp,ChangeDatas){
            var i = 0;
            for(i=0;i<ChangeDatas.length;i++)
            {
                if(ChangeDatas[i].changeData==changeDataTemp)
                return i;
            }
            return -1;
        }

        function CheckChangeFieldName(fieldName,fieldNames){
            for(var i=0;i<fieldNames.length;i++)
            {
                if(fieldName==fieldNames[i])
                return true;
            }
            return false;
        }
        function CheckChangeFieldNameIndex(fieldName,fieldNames){
            for(var i=0;i<fieldNames.length;i++)
            {
                if(fieldName==fieldNames[i])
                return i;
            }
            return -1;
        }

        /**
         * 创建组件属性中可修改属性的输入框
         * @param {*} attributesTemp 组件的某个属性对象
         * @param {*} i 该属性在组件所有属性数组中的索引
         * @param {*} attribute 属性显示的值
         * @param {*} type 组件类型(用于后面获取修改哪类组件的值)
         */
        function CreateInput(attributesTemp,i,attribute,type,elementIdTemp){
            var o1 = document.createElement('input');
            o1.setAttribute('class','el-input__inner');
            o1.style = 'width:70px;height:28px'
            var index = CheckElement(allElementChangeData,elementIdTemp);
            if(index==-1)
            {
                attributesTemp[i].changeData = attribute;
                o1.value = attribute;
            }
            else
            {
                var isChangeTemp = CheckChangeFieldName(attributesTemp[i].fieldName,allElementChangeData[index].fieldName);
                if(isChangeTemp)
                {
                    var indexChange = CheckChangeFieldNameIndex(attributesTemp[i].fieldName,allElementChangeData[index].fieldName);
                    if(indexChange!=-1)
                    {
                        attributesTemp[i].changeData = allElementChangeData[index].ChangeData[indexChange].changeData;
                        o1.value = attributesTemp[i].changeData;
                        o1.style = "background:#4DC86F;width:70px;height:28px";
                    }
                    else
                    {
                        attributesTemp[i].changeData = attribute;
                        o1.value = attribute;
                    }
                }
                else
                {
                    attributesTemp[i].changeData = attribute;
                    o1.value = attribute;
                }
            }
            attributesTemp[i].originalData = attribute;
            o1.addEventListener('input',myInputChange);
            o1.id = (type+':'+i);
            return o1;
        }
        /**
         * 创建组件属性中可修改属性的下拉框
         * @param {*} arrayTemp 下拉框的数据源
         * @param {*} attribute 下拉框默认显示的值
         */
        function CreateSelect(arrayTemp,attribute,attributesTemp,i,typeTemp,elementIdTemp){
            var o = document.createElement('select');
            o.style = 'width:50px;'
            o.setAttribute('class','el-select el-select--mini');
            for(var j=0;j<arrayTemp.length;j++)
            {
                var item = document.createElement('option');
                item.value = arrayTemp[j].value;
                item.textContent = arrayTemp[j].label;
                o.appendChild(item);
            }
            var statusTemp = (attribute=='0'?"开":"关");
            var index = CheckElement(allElementChangeData,elementIdTemp);
            if(index==-1)
            {
                attributesTemp[i].changeData = statusTemp;
                o.value = attribute;
            }
            else
            {
                var isChangeTemp = CheckChangeFieldName(attributesTemp[i].fieldName,allElementChangeData[index].fieldName);
                if(isChangeTemp)
                {
                    var indexChange = CheckChangeFieldNameIndex(attributesTemp[i].fieldName,allElementChangeData[index].fieldName);
                    if(indexChange!=-1)
                    {
                        attributesTemp[i].changeData = allElementChangeData[index].ChangeData[indexChange].changeData;
                        o.value = (attributesTemp[i].changeData=="开"?"0":"1");
                        o.style = "background:#4DC86F;width:50px;";
                    }
                    else
                    {
                        attributesTemp[i].changeData = attribute;
                        o1.value = attribute;
                    }
                }
            }
            attributesTemp[i].originalData = statusTemp;
            o.id = (typeTemp+':'+i);
            o.addEventListener('change',mySelectChange);
            return o;
        }
        /**
         * 创建组件属性的单位
         * @param {*} textTemp 需要显示的单位
         */
        function CreateLabelUnit(textTemp){
            var o = document.createElement('span');
            o.textContent = textTemp;
            return o;
        }
        /**
         * 创建组件属性框中的按钮
         * @param {*} labelTemp 按钮显示值
         */
        function CreateBtn(labelTemp,idTemp){
            var btn = document.createElement('input');
            //var btn = document.createElement('button');
            btn.type = 'button';
            btn.style['height']='28px';
            btn.value = labelTemp;
            btn.id = idTemp;
            if(labelTemp=="确定")
            btn.setAttribute('class','el-button el-button--success el-button--mini')
            else if(labelTemp=="取消")
            btn.setAttribute('class','el-button el-button--primary el-button--mini')
            btn.addEventListener('click',BtnClick);
            return btn;
        }

        /**
         * 获取infowindow显示内容
         * @param {*} attributesTemp 需要显示的所有属性
         * @param {*} featureTemp 服务中查询出来的基础属性
         * @param {*} resultTemp 结果属性(从后台服务中获取)
         * @param {*} type 组件类型
         */
        function GetAttribute(attributesTemp,featureTemp,resultTemp,type){
            var content;
            var count = 0;
            var elementIdTemp = featureTemp.attributes.ElementId;
            var starMain = document.createElement("div");
            for(var i=0;i<attributesTemp.length;i++)
            {
                var star = document.createElement("div"); 
                var obj = attributesTemp[i];
                var attribute = featureTemp.attributes[obj.fieldName];
                if(obj.type=="attribute")
                {
                    if(obj.fieldName=="PipeStatus")
                        ;
                    else if(obj.fieldName=="ValveSetting")
                    {
                        attribute=(attribute==2?"关":"开");
                    }
                    else if(obj.fieldName=="InitialSettingsRelativeClosure")
                    {
                        attribute = (1-attribute)*100;
                    }
                  
                    if(obj.rounding)
                        attribute = parseFloat(attribute).toFixed(2);
                    star = CreateLabelTitle(obj.displayName);
                    star.style = "display:inline";
                    if(obj.displayType=="label")
                    {
                        var o = document.createElement('span');
                        o.textContent = attribute;
                        o.style = "font-family:'Arial';font-size: 12px;"
                        star.appendChild(o);
                        attributesTemp[i].originalData = attribute;
                    }
                    else if(obj.displayType=="input")
                    {
                        var o1 = CreateInput(attributesTemp,i,attribute,type,elementIdTemp);
                        star.appendChild(o1);
                    }
                    else if(obj.displayType=="combox")//需要修改
                    {
                        var o = CreateSelect(pipeState,attribute,attributesTemp,i,'pipe',elementIdTemp);
                        star.appendChild(o);
                    }
                }
                else
                {
                    var roundingTempData = "";
                    if(obj.fieldName=="Direction_Change_")
                    {
                        resultTemp[count] = parseInt(resultTemp[count]).toFixed(0);
                    }
                    if(obj.rounding)
                    {
                        roundingTempData = resultTemp[count];
                        resultTemp[count] = parseFloat(resultTemp[count]).toFixed(1);
                    }
                    star = CreateLabelTitle(obj.displayName);
                    
                    if(obj.displayType=="label")
                    {
                        var divTemp = document.createElement('div');
                        divTemp.style = "display:inline";
                        o = document.createElement('span');
                        o.textContent = resultTemp[count];
                        o.title = roundingTempData;
                        o.style = "font-family:'Arial';font-size: 12px;"
                        divTemp.appendChild(o);
                        if(tableNameMain!=""&&resultTemp.length>(count+4))
                        {
                            roundingTempData = resultTemp[count+4];
                            resultTemp[count+4] = Number(resultTemp[count+4]).toFixed(1);
                            o = document.createElement('span');
                            o.textContent = "("+resultTemp[count+4]+")";
                            o.title = roundingTempData;
                            o.style = "color:#70991f;font-family:'Arial';font-size: 12px;"
                            divTemp.appendChild(o);
                        }
                        star.appendChild(divTemp);
                    }
                    else if(obj.displayType=="input")
                    {
                        var o1 = CreateInput(attributesTemp,i,resultTemp[count],type,elementIdTemp);
                        star.appendChild(o1);
                    }
                    count++;
                }
                var o = CreateLabelUnit(obj.unit);
                star.appendChild(o);
                o = document.createElement('div');
                o.style = 'height:7px;width:110px'
                star.appendChild(o);
                starMain.appendChild(star);
            }
            var btnStar = document.createElement("div"); 
            btnStar.style = "text-align:center;";
            var sure = CreateBtn('确定','sure');
            btnStar.appendChild(sure);
            var o = document.createElement('span');
            o.style = 'padding-left:20px;';
            btnStar.appendChild(o);
            var cancel =  CreateBtn('取消','cancel');
            btnStar.appendChild(cancel);
            starMain.appendChild(btnStar);
            //starMain.style = "width:285px";
            content = starMain;
            return content;
        }

        /**
         * 输入框内容变化事件
         * @param {*} event 事件的对象
         */
        function myInputChange(event){
            //alert(event)
            var idTemp = String(event.target.id);
            var typeTemp = idTemp.split(':')[0];
            var indexTemp = idTemp.split(':')[1];
            var tempChangeData = "";
            var tempOriginalData = "";
            if(typeTemp=="pipe")
            {
                pipeAttribute[indexTemp].changeData = event.target.value;
                tempChangeData = pipeAttribute[indexTemp].changeData;
                tempOriginalData = pipeAttribute[indexTemp].originalData;
            }
            else if(typeTemp=="junction")
            {
                junctionAttribute[indexTemp].changeData = event.target.value;
                tempChangeData = junctionAttribute[indexTemp].changeData;
                tempOriginalData = junctionAttribute[indexTemp].originalData;
            }
            else if(typeTemp=="tcv")
            {
                tcvAttribute[indexTemp].changeData = event.target.value;
                tempChangeData = tcvAttribute[indexTemp].changeData;
                tempOriginalData = tcvAttribute[indexTemp].originalData;
            }
            var tempInput = event.target;
            if(Number(tempChangeData)!=Number(tempOriginalData))
            {
                tempInput.style = "background:#4DC86F;width:70px;height:28px";
            }
            else
            {
                tempInput.style = "width:70px;height:28px";
            }
        }

        /**
         * 下拉框内容变化事件
         * @param {*} event 事件对象
         */
        function mySelectChange(event){
            var idTemp = String(event.target.id);
            var typeTemp = idTemp.split(':')[0];
            var indexTemp = idTemp.split(':')[1];
            var tempChangeData;
            var tempOriginalData;
            if(typeTemp=="pipe")
            {
                pipeAttribute[indexTemp].changeData = (String(event.target.value)=='0'?"开":"关");
                tempChangeData = pipeAttribute[indexTemp].changeData;
                tempOriginalData = pipeAttribute[indexTemp].originalData;
            }
            var tempSelect = event.target;
            if(String(tempChangeData)!=String(tempOriginalData))
            {
                tempSelect.style = "background:#4DC86F;width:50px;";
            }
            else
            {
                tempSelect.style = "width:50px;";
            }
        }
        /**
         * 获取组件的修改属性
         * @param {*} attributesTemp 组件属性集合
         */
        function GetChangeAttribute(attributesTemp){
            var selectElement = new Object;
            selectElement.ChangeData = new Array;
            selectElement.fieldName = new Array;
            for(var i=0;i<attributesTemp.length;i++)
            {
                var itemTemp = attributesTemp[i];
                if(itemTemp.displayType=="input")
                {
                    if(Number(itemTemp.originalData)!=Number(itemTemp.changeData))
                    {
                        var item = new Object;
                        item.originalData = itemTemp.originalData;
                        item.changeData = itemTemp.changeData;
                        item.label = itemTemp.displayName;
                        selectElement[itemTemp.fieldName] = itemTemp.changeData;
                        selectElement[itemTemp.fieldName+"O"] = itemTemp.originalData;
                        selectElement.fieldName.push(itemTemp.fieldName);
                        selectElement.ChangeData.push(item);
                    }
                }
                else if(itemTemp.displayType=="combox")
                {
                    if(String(itemTemp.originalData)!=String(itemTemp.changeData))
                    {
                        var item = new Object;
                        item.originalData = itemTemp.originalData;
                        item.changeData = itemTemp.changeData;
                        item.label = itemTemp.displayName;
                        selectElement[itemTemp.fieldName] = itemTemp.changeData;
                        selectElement[itemTemp.fieldName+"O"] = itemTemp.originalData;
                        selectElement.fieldName.push(itemTemp.fieldName);
                        selectElement.ChangeData.push(item);
                    }
                }
                else if(itemTemp.fieldName=="ElementId")
                {
                    selectElement[itemTemp.fieldName] = itemTemp.originalData;
                }
            }
            
            return selectElement;
        }

        /**
         * 判断元素属性是否发生改变
         * @param {*} attributesTemp 元素属性列表
         */
        function JudgeAttributeChange(attributesTemp){
            var returnResult = false;
            for(var i=0;i<attributesTemp.length;i++)
            {
                var itemTemp = attributesTemp[i];
                if(itemTemp.displayType=="input")
                {
                    if(Number(itemTemp.changeData)!=Number(itemTemp.originalData))
                    {
                        returnResult = true;
                        break;
                    }
                }
                else if(itemTemp.displayType=="combox")
                {
                    if(String(itemTemp.changeData)!=String(itemTemp.originalData))
                    {
                        returnResult = true;
                        break;
                    }
                }
            }
            return returnResult;
        }

        /**
         * 图上查询窗口中按钮的点击事件
         * @param {*} event 事件的对象
         */
        function BtnClick(event){
            var myEvent = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEvent.detail.type = event.target.id;
                if(event.target.id=="cancel")
                {
                    map.infoWindow.hide();
                    return;
                }
                var selectElement = new Object;
                var isChange = false;
                var typeTemp = "";
                if(mySelectLayerId==EN_PIPE||mySelectLayerId==EN_PIPE_1||mySelectLayerId==EN_PIPE_2)
                {
                    isChange = JudgeAttributeChange(pipeAttribute);
                    if(isChange)
                    {
                        selectElement = GetChangeAttribute(pipeAttribute);
                        selectElement.LayerId = EN_PIPE;
                        typeTemp = "管道";
                    }
                }
                else if(mySelectLayerId==EN_JUNCTION)
                {
                    isChange = JudgeAttributeChange(junctionAttribute);
                    if(isChange)
                    {
                        selectElement = GetChangeAttribute(junctionAttribute);
                        selectElement.LayerId = EN_JUNCTION;
                        typeTemp = "节点";
                    }
                }
                else if(mySelectLayerId==EN_VALVE)
                {
                    isChange = JudgeAttributeChange(tcvAttribute);
                    if(isChange)
                    {
                        selectElement = GetChangeAttribute(tcvAttribute);
                        selectElement.LayerId = EN_VALVE;
                        typeTemp = "阀门";
                    }
                }
                if(isChange)
                {
                    selectElement.type = typeTemp;
                    selectElement.point = new esri.geometry.Point(clickMapPoint.x,clickMapPoint.y,map.spatialReference);
                    myEvent.detail.data = selectElement;
                    if(window.dispatchEvent){
                     window.dispatchEvent(myEvent);
                     }else{
                         window.fireEvent(myEvent);
                     } 
                     map.infoWindow.hide();
                     var indexTemp = CheckElement(allElementChangeData,selectElement.ElementId); 
                    if(indexTemp!=-1)
                    {
                        allElementChangeData.splice(indexTemp,1);
                    }
                    allElementChangeData.push(selectElement)
                }
                else
                {
                    alert("请先修改属性");
                    /* myAlert.alert("请先修改属性"); */
                }
               
        }

        var allElementChangeData = new Array();
        function CheckElement(allData,elementIdTemp){
            var returnIndex = -1;
            for(var i=0;i<allData.length;i++)
            {
                var itemTemp = allData[i];
                if(itemTemp.ElementId==elementIdTemp)
                {
                    returnIndex = i;
                    break;
                }
            }
            return returnIndex;
        }
        function popup() { 
            $(".esriPopup .titlePane").css({ 'background-color':'#f5f5f5', 'color':'#000000','height':'20px' }) 
            $(".esriPopup .contentPane").css({ 'background-color':'#ffffff', 'color':'#000000' }) 
            //$(".esriPopup .actionsPane").css({ 'background-color':'rgba(64,64,64,0.8)' }) 
        }
        /**
         * 将管道结果接口返回数据拆分
         * @param {*} objTemp 结果
         */
        function GetPipeResult(objTemp){
            objTemp = objTemp[0];
            var array =  new Array();
            array.push(objTemp.Flow);
            array.push(objTemp.Velocity);
            array.push(objTemp.Headloss);
            array.push(objTemp.DirectionChange);

            if(objTemp.FlowCalculate!=null)
                array.push(Number(objTemp.FlowCalculate));
            if(objTemp.VelocityCalculate!=null)
                array.push(Number(objTemp.VelocityCalculate));
            if(objTemp.HeadlossCalculate!=null)
                array.push(Number(objTemp.HeadlossCalculate));
            return array;
        }
        /**
         * 将节点结果接口返回数据拆分
         * @param {*} objTemp 结果
         */
        function GetJunctionResult(objTemp){
            objTemp = objTemp[0];
            var array =  new Array();
            array.push(objTemp.Head);
            array.push(objTemp.Pressure);
            array.push(objTemp.Demand);
            array.push(objTemp.PressureChange);

            if(objTemp.HeadCalculate!=null)
                array.push(Number(objTemp.HeadCalculate));
            if(objTemp.PressureCalculate!=null)
                array.push(Number(objTemp.PressureCalculate));
            if(objTemp.DemandCalculate!=null)
                array.push(Number(objTemp.DemandCalculate));
            return array;
        }
        /**
         *  将阀门结果接口返回数据拆分
         * @param {*} objTemp 结果
         */
        function GetTcvResult(objTemp){
            objTemp = objTemp[0];
            var array =  new Array();
            array.push(objTemp.Head);
            array.push(objTemp.Pressure);
            return array;
        }

        /**
         * infoWindow窗口隐藏响应事件
         * @param {*} event 事件的对象
         */
        function MyHideInfoWindow(event){
            mapClickgl.clear();
        }
        var mySelectLayerId = '';
        /**
         * 根据查询结果中的layerId调用不同的后台接口
         * @param {*} feature 查询返回对象
         */
        function MyJudgeLayerId(feature){
            mapClickgl.clear();
            var layerId = String(feature.layerId);
            mySelectLayerId = layerId;
            var featureTemp = feature.feature;
            var title = "";
            var point = new esri.geometry.Point();
            var Content = "";
            switch(layerId)
            {
                //管道
                case EN_PIPE_1:
                case EN_PIPE_2:
                case EN_PIPE:
                title = "管道属性";
                var resultTemp;
                var getUrl = "";
                if(tableNameMain=="")
                getUrl = urlClass.axiosUrl+'Pipeline/'+featureTemp.attributes.ElementId+'/'+timeMyMain+'/'+"Result_Pipe"+'/'+"NAN"+'/'+"NAN"+'/'+"NAN";
                else
                getUrl = urlClass.axiosUrl+'Pipeline/'+featureTemp.attributes.ElementId+'/'+timeMyMain+'/'+(tableNameMain+"pipe")+'/'+"NAN"+'/'+"NAN"+'/'+"NAN";
                axios.get(getUrl)
                .then(function(response){
                    var objTemp = response.data;
                    resultTemp = GetPipeResult(objTemp);
                    Content = GetAttribute(pipeAttribute,featureTemp,resultTemp,"pipe");
                    map.addLayer(mapClickgl);
                    map.infoWindow.setTitle(title);
                    map.infoWindow.setContent(Content);
                    map.infoWindow.show(point);
                })
                break;
                //节点
                case EN_JUNCTION:
                title = "节点属性";
                var resultTemp;
                if(tableNameMain=="")
                    getUrl = urlClass.axiosUrl+'NodeSelect/'+featureTemp.attributes.ElementId+'/'+timeMyMain+'/'+"Result_Junction"+'/'+"NAN"+'/'+"NAN"+'/'+"NAN";
                else
                    getUrl = urlClass.axiosUrl+'NodeSelect/'+featureTemp.attributes.ElementId+'/'+timeMyMain+'/'+(tableNameMain+"junction")+'/'+"NAN"+'/'+"NAN"+'/'+"NAN";
                axios.get(getUrl)
                .then(function(response){
                    var objTemp = response.data;
                    resultTemp = GetJunctionResult(objTemp);
                    Content = GetAttribute(junctionAttribute,featureTemp,resultTemp,"junction");
                    map.addLayer(mapClickgl);
                    map.infoWindow.setTitle(title);
                    map.infoWindow.setContent(Content);
                    map.infoWindow.show(point)
                })
                break;
                 //阀门
                 case EN_VALVE:
                 title = "阀门属性";
                 var resultTemp;
                 axios.get(urlClass.axiosUrl+'TcvSelect/'+featureTemp.attributes.ElementId+'/'+timeMyMain)
                 .then(function(response){
                     var objTemp = response.data;
                     resultTemp = GetTcvResult(objTemp);
                     Content = GetAttribute(tcvAttribute,featureTemp,resultTemp,"tcv");
                     map.addLayer(mapClickgl);
                     map.infoWindow.setTitle(title);
                     map.infoWindow.setContent(Content);
                     map.infoWindow.show(point)
                 })
                 break;
                //减压阀
                case EN_PRVALVE:
                title = "减压阀属性";
                break;
                //流量阀
                case EN_FCVALVE:
                title = "流量阀属性";
                break;
                //消火栓
                case EN_HYDRANT:
                title = "消火栓属性";
                break;
                //止回阀
                case EN_CVALVE:
                title = "止回阀属性";
                break;
            }
            if(layerId==EN_PIPE_1||layerId==EN_PIPE_2||layerId==EN_PIPE)
            {
                var path = (featureTemp.geometry).paths[0];
                var x = (path[0][0]+path[1][0])/2;
                var y = (path[0][1]+path[1][1])/2;
                point = new esri.geometry.Point(x,y,map.spatialReference);

                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                markerSymbol.setWidth(4);//大小
                markerSymbol.setColor(new esri.Color("#ff0000"));//颜色
                var gra1 = new esri.Graphic(featureTemp.geometry, markerSymbol);  
                mapClickgl.add(gra1);  
            }
            else
            {
                point = new esri.geometry.Point(featureTemp.geometry.x,featureTemp.geometry.y,map.spatialReference);
                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                markerSymbol.setOutline(null);//边框 
                markerSymbol.setSize(10);//大小
                markerSymbol.setColor(new esri.Color("#ff0000"));//颜色
                var gra1 = new esri.Graphic(featureTemp.geometry, markerSymbol);  
                mapClickgl.add(gra1);   
            }
            popup();
           
        }

        /**
         * identify查询成功返回函数
         * @param {*} results 返回结果的对象
         */
        function myResultFunction(results){
            var feature;
            map.infoWindow.hide();
            if (results.length > 0) {
                {
                    feature = results[0];
                    MyJudgeLayerId(feature);
                }
            }

        }
        /**
         * identify查询失败返回函数
         * @param {*} error 错误信息 
         * @param {*} clickGraphic 
         */
        function myFaultFunction(error,clickGraphic = null){
			alert(error)
		}

        var isDraw = false;
        /**
         * 地图监听范围改变事件
         */
        map.on("extent-change",function(e){
            if(myEventType=="updateTime"||myEventType=="changeLayer"||selectTypeMain=="SupplyAreaCompare")
            {
                var whereTemp = GetWhere(layerType);
                //if(whereTemp!=drawLayerWhere||(whereTemp.indexOf(String(myDiameter[0]))!=-1)||whereTemp=="1=1")
                //if(map.extent!=initExtent)
                {
                    if(isCompare&&selectTypeMain!="SupplyAreaCompare")
                    {
                        return;
                    }
                    if(selectTypeMain!="SupplyAreaCompare")
                    {
                        if(map.getScale()<=myScale[1])
                        {
                            gl.clear();
                            compareResultLayer.clear();
                            SelectChange(selectTypeMain,timeMyMain,map.extent);
                            isDraw = true;
                        }
                        else
                        {
                            if(isDraw)
                            {
                                gl.clear();
                                compareResultLayer.clear();
                                SelectChange(selectTypeMain,timeMyMain,initExtent);
                                isDraw = false;
                            }
                        }
                    }
                    else
                    {
                        if(map.getScale()<=myScale[1])
                        {
                            gl.clear();
                            SelectChange(selectTypeMain,timeMyMain,map.extent);
                            isDraw = true;
                        }
                        else
                        {
                            if(isDraw)
                            {
                                gl.clear();
                                SelectChange(selectTypeMain,timeMyMain,initExtent);
                                isDraw = false;
                            }
                        }
                        DrawSupplyAreaCompare(supplyAreaCompareData,pipeSupplyAreaLimit,pipeSupplyAreaColor,pipeSupplyAreaWidth,isDisplays);
                    }
                   
                }
                //LegendDisplayMain(selectTypeMain,timeMyMain);
            }
            
        });
       
        var axiosUrl  = 'http://localhost:17458/Service1.svc/Rest/';
        ///////////////////压力/////////////////////////////////////////
        var pressureLimit = global.pressureLimit;
        var pressureColor = global.pressureColor;
        var pressureWidth = global.pressureWidth;
        var pressureIsDisplay = global.pressureIsDisplay;
        ///////////////////管道流量/////////////////////////////////////////
        var pipeFlowLimit = global.pipeFlowLimit;
        var pipeFlowColor = global.pipeFlowColor;
        var pipeFlowWidth = global.pipeFlowWidth;
        var pipeFlowIsDisplay = global.pipeFlowIsDisplay;
        ///////////////////管道流速/////////////////////////////////////////
        var pipeVelocityLimit = global.pipeVelocityLimit;
        var pipeVelocityColor = global.pipeVelocityColor;
        var pipeVelocityWidth = global.pipeVelocityWidth;
        var pipeVelocityIsDisplay = global.pipeVelocityIsDisplay;
         ///////////////////水压标高/////////////////////////////////////////
         var headLimit = [33,34,35,36,38];
         var headColor = ["#0808ff","#399eff","#73ffd6","#e7ff4a","#ffa600","#ff0000"];
         var headWidth = [3,3.5,4,4.5,5,5.5];
         var headIsDisplay = [true,true,true,true,true,true];
          ///////////////////水力坡度/////////////////////////////////////////
        var pipeSlopLimit = global.pipeSlopLimit;
        var pipeSlopColor = global.pipeSlopColor;
        var pipeSlopWidth = global.pipeSlopWidth;
        var pipeSlopIsDisplay = global.pipeSlopIsDisplay;
         ///////////////////节点流量/////////////////////////////////////////
         var demandLimit = [2.5,10,50,100];
         var demandColor = ["#bdebff","#0071ff","#00ff00","#ff8200","#ff0000"];
         var demandWidth = [3,4,6,9,12];
         var demandIsDisplay = [true,true,true,true,true];
          ///////////////////供水分界线/////////////////////////////////////////
        var pipeSupplyAreaLimit = global.pipeSupplyAreaLimit;
        var pipeSupplyAreaColor = global.pipeSupplyAreaColor;
        var pipeSupplyAreaWidth = global.pipeSupplyAreaWidth;
        var pipeSupplyCompareAreaWidth = global.pipeSupplyCompareAreaWidth;
        var pipeSupplyAreaIsDisplay = global.pipeSupplyAreaIsDisplay;
        var pipeSupplyAreaLabels = global.pipeSupplyAreaLabels;
         ///////////////////管龄/////////////////////////////////////////
         var pipeAgeLimit = [5,10,15,20,25,30,'未知'];
         var pipeAgeColor = ["#00ffc6","#EEEE00","#005de7","#73aa00","#FF7F00","#EE00EE","#ff0000","#000000"];
         var pipeAgeWidth = [2,3,4,5,6,7,8,9,10,1.5];
         var pipeAgeIsDisplay = [true,true,true,true,true,true,true,true,true,true];
          ///////////////////管径分类/////////////////////////////////////////
        var pipeDiameterLimit = global.pipeDiameterLimit;
        var pipeDiameterColor = global.pipeDiameterColor;
        var pipeDiameterWidth = global.pipeDiameterWidth;
        var pipeDiameterIsDisplay = global.pipeDiameterIsDisplay;
         ///////////////////管材分类/////////////////////////////////////////
         var pipeMaterialLimit = ['','Ductile Iron','HDPE','HOBAS','PE','PPR','UPVC','玻纹管','不锈钢','不锈钢复合','镀锌','复合管','钢','钢复','钢塑','铝塑','球/钢','球墨','石棉','双壁波纹管','铸','塑料','无缝钢管','铸铁','自应力'];
         var pipeMaterialColor = ["#A524AA","#A52484","#18388C","#847D42","#632CA5","#31A239","#94457B","#6B9E4A",'#31A2FF','#942C39','#8C5542','#A5AA39','#FF5500','#00FFC6','#4AAEB5','#AD5D21','#0071FF','#29A25A','#29AFF','#29FFFF','#FFA25A','#F9A25F','#2FF25A','#2FAFFA','#2FA2FF'];
         var pipeMaterialWidth = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];
         var pipeMaterialIsDisplay = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
        ///////////////////水龄/////////////////////////////////////////
        var ageLimit = global.ageLimit;
        var ageColor = global.ageColor;
        var ageWidth = global.ageWidth;
        var ageIsDisplay = global.ageIsDisplay;
        ////////////////////压力波动////////////////////////////////////////////
        var pressureChangColor = global.pressureChangColor
        var pressureChangLimit = global.pressureChangLimit
        var pressureChangeIsDisplay = global.pressureChangeIsDisplay;
        ///////////////////流向变化次数/////////////////////////////////////////
        var directionChangeLimit = global.directionChangeLimit;
        var directionChangeColor = global.directionChangeColor;
        var directionChangeWidth = global.directionChangeWidth;
        var directionChangeIsDisplay = global.directionChangeIsDisplay;
         ///////////////////停水管道/////////////////////////////////////////
         var pipeStopWaterLimit = [1];
         var pipeStopWaterColor = ["#FF0000"];
         var pipeStopWaterWidth = [3];
         var pipeStopWaterIsDisplay = [true];
         ////////////////////模拟计算////////////////////////////////////////
         var planCalPipeFlowIsDisplay = [true,true,true,true,true];
         var planCalPipeVelocityIsDisplay = [true,true,true,true,true];
        /**
         * 地图比例尺分类
         */
        var myScale = global.myScale;
        /**
         * 管道管径的分类
         */
        var myDiameter = global.myDiameter;
        var where = 'Physical_PipeDiameter >= 300';//查询条件
        var query = new esri.tasks.Query();
        query.where = where;
        query.returnGeometry = true;
        query.outFields = ["ElementId",field];
        query.outSpatialReference = map.SpatialReference;
        var typeMyMain = '';
        var timeMyMain = '0';
        var timeMyMain1 = '0';
        var timeMyMain2 = '0';
        var selectTypeMain = '';
        var myEventType = "";
        var layerType = '';
        var isCompare = false;
        var EventTypeMain = "";
        var tableNameMain = "";
        var planResultLimitMain = new Object();

        function DropPlanTable(tableNameTemp){
            if(tableNameTemp!="")
            {
                axios.get(urlClass.axiosUrl+"DropPlanTable"+"/"+tableNameTemp)
                .then(function(response){
                })
            }
        }

        /**
         * 返回当前需要画图时的地图的范围
         */
        function GetDrawMapExtent(){
            var mapExtentTemp;
            if(map.getScale()<=myScale[1])
            {
                mapExtentTemp = map.extent;
            }
            else
            {
                mapExtentTemp = initExtent;
            }
            return mapExtentTemp;
        }

        var planCalResultMain = new Object();
        window.addEventListener('event_name',function(event){
                LocationGraphicsLayer.clear();
                var typeMy = event.detail.type;
                var typeSelectMain = event.detail.eventType;
                isAllDisplay = false;
                
                if(typeSelectMain=="updateTime"||typeSelectMain=="changeLayer")
                {
                    itemType = "";
                    planResultLimitMain = new Object();
                    tableNameMain = "";
                    EventTypeMain = "";
                    isCompare = false;
                    isDisplays = new Array();
                    myEventType = typeSelectMain;
                    selectTypeMain = typeMyMain = typeMy;
                    startDate = event.detail.startDate;
                    endDate = event.detail.endDate;
    
                    var timeMy =  event.detail.time;
                    timeMyMain = timeMy;
                    gl.clear();
                    compareResultLayer.clear();
                    maxMain = "";
                    minMain = "";
                    SelectChange(typeMy,timeMy,initExtent);
                    LegendDisplayMain(typeMy,timeMy)
                    if(typeSelectMain=="updateTime")
                    {
                       var selectType = event.detail.typeSelect;
                       selectTypeMain = selectType;
                       if(selectTypeMain!="PressureChange"&&selectTypeMain!="FlowChangeCount"&&selectTypeMain!="Diameter"&&selectTypeMain!="Material"&&selectTypeMain!="PipeAge")
                        {
                            /* var mapExtentTemp;
                            if(map.getScale()<=myScale[1])
                                mapExtentTemp = map.extent;
                            else
                                mapExtentTemp = initExtent; */
                            var extentTemp = GetDrawMapExtent();
                            maxMain = "";
                            minMain = "";
                            SelectChange(selectType,timeMy,extentTemp);
                            LegendDisplayMain(selectType,timeMy)
                        }
                      
                    }
                }
                else if(typeMy=="PlanTempCalculate")
                {
                    myEventType = typeMy;
                    isDisplays = new Array();
                    EventTypeMain = typeMy;
                    compareResultLayer.clear();
                    var planResultLimit = event.detail.data;
                    planCalResultMain = Object.assign({},planResultLimit);
                    tableNameMain = planResultLimit.TableName;
                    planResultLimitMain = Object.assign({},planResultLimit);//对象的深度拷贝
                    var planTempCalPressure = DrawPlanTempCalNode(planResultLimit.MinPressure,planResultLimit.MaxPressure,planResultLimit.NodePressure,planResultLimit.levelMy,pressureChangColor);
                    pressureChangLimit = planTempCalPressure.slice(0)
                    
                    planCalPipeFlowIsDisplays = planCalPipeFlowIsDisplay.slice(0);
                    var planTempCalFlowLimitTemp = DrawPlanTempCalPipeFlow(planResultLimit.MinFlow,planResultLimit.MaxFlow,planResultLimit.PipeFlow,planResultLimit.levelMy,pressureChangColor,"flow");
                    planTempCalFlowLimit = planTempCalFlowLimitTemp.slice(0)
                   
                    planCalPipeVelocityIsDisplays = planCalPipeVelocityIsDisplay.slice(0);
                    var planTempCalVelocityLimitTemp = DrawPlanTempCalPipeFlow(planResultLimit.MinStrength,planResultLimit.MaxStrength,planResultLimit.PipeStrength,planResultLimit.levelMy,pressureChangColor,"velocity");
                    planTempCalVelocityLimit = planTempCalVelocityLimitTemp.slice(0)
                    planCalResultVelocityLayer.setVisibility(false);
                    LegendMainPlanTempCalPipe();
                }
                else if(typeMy=="PlanCalTemp")
                {
                    tableNameMain = event.detail.data;
                }
                else if(typeMy=="ElementItemClick")
                {
                    var temp = event.detail.data.point;
                    var pointTemp = new esri.geometry.Point(temp.x,temp.y,map.spatialReference);
                    IdentifyMain(pointTemp,'');
                    map.centerAt(pointTemp)
                }
                else if(typeMy=="PlanTempWindowClose")//关闭方案模拟窗口
                {
                    allElementChangeData = new Array();
                    tableNameMain = "";
                    itemType = "";
                    maxMain = "";
                    minMain = "";
                    compareResultLayer.clear();
                    gl.clear();
                    planCalResultVelocityLayer.clear();
                    planCalResultFlowLayer.clear();
                    getAndPost.DropPlanTable(tableNameMain);
                    BaseMapLegend();
                }
                else if(typeMy=="CompareWindowClose")
                {
                    isCompare = false;
                    if(isCompare)
                    {
                        isDisplays = new Array();
                        maxMain = "";
                        minMain = "";
                        compareResultLayer.clear();
                        gl.clear();
                      /*   var mapExtentTemp;
                        if(map.getScale()<=myScale[1])
                            mapExtentTemp = map.extent;
                        else
                            mapExtentTemp = initExtent; */
                        var extentTemp = GetDrawMapExtent();
                        if(selectTypeMain=="SupplyAreaCompare")
                        selectTypeMain = "SupplyArea";
                        SelectChange(selectTypeMain,timeMyMain,extentTemp);
                        LegendDisplayMain(selectTypeMain,timeMyMain)
                    }
                }
                else if(typeMy=="TimeCompareDraw")
                {
                    isUpAndDown = false;
                    compareData = new Object();
                    isCompare = true;
                    maxMain = "";
                    minMain = "";
                    compareResultLayer.clear();
                    var max = event.detail.max;
                    var min = event.detail.min;
                    var time1 = event.detail.time1;
                    var time2 = event.detail.time2;
                    timeMyMain1 = time1;
                    timeMyMain2 = time2;
                    var level = event.detail.level;
                    var field = "Result_"+selectTypeMain+"_";
                    compareData.time1 = time1;
                    compareData.time2 = time2;
                    compareData.min = min;
                    compareData.max = max;
                    compareData.field = field;
                    compareData.level = level;
                    GetTimeCompareData(time1,time2,min,max,field,level);
                }
                else if(typeMy=="TimeCompareSupplyArea")
                {
                    isCompare = true;
                    var timeTemp = event.detail.data;
                    timeMyMain = timeTemp.time2;
                    timeMyMain1 = timeTemp.time1;
                    timeMyMain2 = timeTemp.time2;
                    selectTypeMain = "SupplyAreaCompare"
                    var extentTemp = GetDrawMapExtent();
                    SelectChange(selectTypeMain,timeMyMain,extentTemp);
                    LegendDisplayMain(selectTypeMain,timeMyMain)
                }
                else if(typeMy=="TimeCompareSupplyAreaO")
                {
                    gl.clear();
                    var dataTemp = event.detail.data;
                    supplyAreaCompareData = dataTemp;
                    if(isDisplays.length==0)
                    isDisplays = pipeSupplyAreaIsDisplay.slice(0);
                    DrawSupplyAreaCompare(dataTemp,pipeSupplyAreaLimit,pipeSupplyAreaColor,pipeSupplyAreaWidth,isDisplays);
                }
                else if(typeMy=="legendItemDisplay")
                {
                   var obj = event.detail.data;
                   if(obj.itemType=="calNode"||obj.itemType=="")
                   {
                    isDisplays[Number(obj.index)] = Boolean(obj.isDisplay);
                    compareResultLayer.clear();
                   }
                   gl.clear();
                   if((!isCompare||selectTypeMain=="SupplyAreaCompare")&&tableNameMain=="")
                   {
                        var extentTemp = GetDrawMapExtent();
                        SelectChange(selectTypeMain,timeMyMain,extentTemp);
                   }
                   else if(isCompare)
                   GetTimeCompareData(compareData.time1,compareData.time2,compareData.min,compareData.max,compareData.field,compareData.level);
                   else if(tableNameMain!="")
                   {
                       if(obj.itemType=="calNode")
                       {
                        var limitsTemp = new Array()
                        limitsTemp = DrawPlanTempCalNode(planResultLimitMain.MinPressure,planResultLimitMain.MaxPressure,planResultLimitMain.NodePressure,planResultLimitMain.levelMy,pressureChangColor);
                        pressureChangLimit = limitsTemp.slice(0)
                       }
                       else if(obj.itemType=="flow")
                       {
                            planCalResultFlowLayer.clear();
                            planCalPipeFlowIsDisplays[Number(obj.index)] = Boolean(obj.isDisplay);
                            DrawPlanTempCalPipeFlow(planCalResultMain.MinFlow,planCalResultMain.MaxFlow,planCalResultMain.PipeFlow,planCalResultMain.levelMy,pressureChangColor,"flow");
                       }
                       else if(obj.itemType=="velocity")
                       {
                            planCalResultVelocityLayer.clear();
                            planCalPipeVelocityIsDisplays[Number(obj.index)] = Boolean(obj.isDisplay);
                            DrawPlanTempCalPipeFlow(planCalResultMain.MinStrength,planCalResultMain.MaxStrength,planCalResultMain.PipeStrength,planCalResultMain.levelMy,pressureChangColor,"velocity");
                       }
                   }
                   
                }
                else if(typeMy=="legendAllDisplay")
                {
                    var isDisplay = Boolean(event.detail.data);
                    allLegendDisplay = isDisplay;
                    isAllDisplay = true;
                    gl.clear();
                    compareResultLayer.clear();
                    if(isDisplay)
                    {
                        if(!isCompare||selectTypeMain=="SupplyAreaCompare")
                        {
                            if(selectTypeMain=="SupplyAreaCompare")
                            {
                                DrawSupplyAreaCompare(supplyAreaCompareData,pipeSupplyAreaLimit,pipeSupplyAreaColor,pipeSupplyAreaWidth,isDisplays);
                            }
                            var extentTemp = GetDrawMapExtent();
                            SelectChange(selectTypeMain,timeMyMain,extentTemp);
                        }
                        else
                        GetTimeCompareData(compareData.time1,compareData.time2,compareData.min,compareData.max,compareData.field,compareData.level);
                    }
                    //LegendDisplayMain(selectTypeMain,timeMyMain);
                    UpdateLegendData(legendAllDataTemp,allLegendDisplay)
                }
                else if(typeMy=="legendLocation")
                {
                    var itemDataTemp = event.detail.data;
                    var supplyAreaLabel = '';
                    if(selectTypeMain=="SupplyArea"||selectTypeMain=="PipeAge"||selectTypeMain=="SupplyCompare")
                        supplyAreaLabel = itemDataTemp.labelDisplayContent;
                    else 
                        supplyAreaLabel = 'NAN';
                    legendItemRenderData = itemDataTemp;
                    legdneSupplyAreaLabel = supplyAreaLabel;
                    if(itemDataTemp.itemType==""||itemDataTemp.itemType=="calNode")
                    {
                        if(itemDataTemp.itemType=="calNode")
                        layerType = "junction";
                        GetLegendLocationData(itemDataTemp,"100",tableNameMain,supplyAreaLabel)
                    }
                    else{
                        layerType = "pipe";
                        GetLegendCalPipeLocationData(itemDataTemp,"100",tableNameMain,itemDataTemp.itemType)
                    }
                }
                else if(typeMy=="legendUser")
                {
                    var itemDataTemp = event.detail.data;
                    legendItemRenderData = itemDataTemp;
                    if(itemDataTemp.itemType==""||itemDataTemp.itemType=="calNode")
                    {
                        if(itemDataTemp.itemType=="calNode")
                        layerType = "junction";
                        GetLegendCustomerData(itemDataTemp,'100',tableNameMain)
                    }
                    else{
                        layerType = "pipe";
                        GetLegendCalPipeCustomerData(itemDataTemp,'100',tableNameMain,itemDataTemp.itemType)
                    }
                }
                else if(typeMy=="Location")
                {
                    var countTemp = event.detail.data;
                    //GetLegendLocationData(legendItemRenderData,countTemp,tableNameMain,legdneSupplyAreaLabel)
                    if(legendItemRenderData.itemType=="")
                        GetLegendLocationData(legendItemRenderData,countTemp,tableNameMain,legdneSupplyAreaLabel)
                    else{
                        GetLegendCalPipeLocationData(legendItemRenderData,countTemp,tableNameMain,legendItemRenderData.itemType)
                    }
                }
                else if(typeMy=="Customer")
                {
                    var countTemp = event.detail.data;
                    //GetLegendCustomerData(legendItemRenderData,countTemp,tableNameMain)
                    if(itemDataTemp.itemType=="")
                        GetLegendCustomerData(legendItemRenderData,countTemp,tableNameMain)
                    else
                        GetLegendCalPipeCustomerData(legendItemRenderData,countTemp,tableNameMain,legendItemRenderData.itemType)
                }
                else if(typeMy=="tableItemClickLocation")
                {
                    var urlTemp = '';
                    var itemData = event.detail.data;
                    var elementIdTemp = itemData.ElementId;
                    locationType = itemData.mainType;
                    if(locationType=="Customer")
                        locationQueryUrlType = locationType
                    else 
                    {
                        locationQueryUrlType = itemData.tableType;
                    }
                    if(locationQueryUrlType=="Customer")
                    urlTemp = customerUrl;
                    else if(locationQueryUrlType=="junction")
                    urlTemp = urlClass.junctionResultUrl//urlClass.baseMapUrl+EN_PIPE_2;
                    else if(locationQueryUrlType=="pipe")
                    urlTemp = urlClass.pipeResultUrl//urlClass.baseMapUrl+EN_JUNCTION;
                    var whereTemp = "ElementId = "+elementIdTemp;
                    TableItemClickLocation(whereTemp,urlTemp)
                }
                else if(typeMy == "ValveAttribute")
                {
                    var valveAttributeIsDisplay = Boolean(event.detail.data);
                    if(!valveAttributeIsDisplay)
                    {
                        valveAttributeLayer.clear();
                    }
                    else
                    {
                        ValveAttributeFunction();
                    }
                }
                else if(typeMy=="MaxShow")
                {
                    var maxIsShow = Boolean(event.detail.data);
                    MaxLayer.setVisibility(maxIsShow);
                }
                else if(typeMy=="MinShow")
                {
                    var maxIsShow = Boolean(event.detail.data);
                    MinLayer.setVisibility(maxIsShow);
                }
                else if(typeMy=="MapClick")
                {
                    isMapClick = Boolean(event.detail.data);
                }
                else if(typeMy=="UpCheckClick")
                {
                    isUpAndDown = true;
                    drawBig = Boolean(event.detail.data);
                    GetTimeCompareData(compareData.time1,compareData.time2,compareData.min,compareData.max,compareData.field,compareData.level);
                }
                else if(typeMy=="DownCheckClick")
                {
                    isUpAndDown = true;
                    drawSmall = Boolean(event.detail.data);
                    GetTimeCompareData(compareData.time1,compareData.time2,compareData.min,compareData.max,compareData.field,compareData.level);
                }
                else if(typeMy=="PlanCalPipelegendSelect")
                {
                    var legendSelectIndex = event.detail.data;
                    if(legendSelectIndex==0)
                    {
                        planCalResultFlowLayer.setVisibility(true);
                        planCalResultVelocityLayer.setVisibility(false);
                    }
                    else if(legendSelectIndex==1)
                    {
                        planCalResultFlowLayer.setVisibility(false);
                        planCalResultVelocityLayer.setVisibility(true);
                    }
                }
        }); 
        var itemType = "";
        var isUpAndDown = false;
        var drawBig = true;
        var drawSmall = true;
        var compareData = new Object();
        var supplyAreaCompareData = new Array();
        function ValveAttributeFunction(){
            axios.get(urlClass.axiosUrl+"GetAllValveStates")
            .then(function(response){
                DrawValveAttribute(response.data);
            });
        }

        function DrawValveAttribute(allValveAtttibute){
            valveAttributeLayer.clear();
            for(var i=0;i<allValveAtttibute.length;i++)
            {
                var obj = new Object();
                obj = allValveAtttibute[i];
                var statusTemp = obj.State;
                var pointTemp = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: 102113 }));
                DrawOneValveAttriute(pointTemp,statusTemp);
            }
        }
        var maxMain = "";
        var minMain = "";
        function GetBaseMax(typeTemp,timeTemp,fieldTemp,tableNameTemp){
            axios.get(urlClass.axiosUrl+"GetBaseMax/"+timeTemp+"/"+typeTemp+"/"+fieldTemp+"/"+tableNameTemp)
            .then(function(response){
                var objArray = response.data;
                if(objArray.length>=1)
                {
                    var obj = objArray[0];
                    var pointTemp = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: 102113 }));
                    PositionMax(pointTemp,obj.Max);
                    maxMain = obj.Max;
                    maxMain = Number(maxMain).toFixed(2);
                    if(objArray.length>1)
                    {
                        var obj = objArray[1];
                        var pointTemp = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: 102113 }));
                        PositionMin(pointTemp,obj.Max);
                        minMain = obj.Max;
                        minMain = Number(minMain).toFixed(2);
                    }
                    LegendMain(typeMain,fieldMain);
                }
                
            });
        }

        function PositionMax(pointTemp,maxTemp){
            MaxLayer.clear();
            var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol(maxSource, 20, 41);
            var gra1 = new esri.Graphic(pointTemp, pictureMarkerSymbol);  
            MaxLayer.add(gra1); 
            MaxLayer.setVisibility(false);
        }
        function PositionMin(pointTemp,maxTemp){
            MinLayer.clear();
            var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol(minSource, 20, 41);
            var gra1 = new esri.Graphic(pointTemp, pictureMarkerSymbol);  
            MinLayer.add(gra1); 
            MinLayer.setVisibility(false);
        }

        function DrawOneValveAttriute(pointTemp,statusTemp){
            var imageSource = "";
            if(statusTemp=="0")
                imageSource = valveCloseSource;
            else
                imageSource = valvePartCloseSource;
            var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol(imageSource, 13, 13);
            var gra1 = new esri.Graphic(pointTemp, pictureMarkerSymbol);  
            valveAttributeLayer.add(gra1); 
            /* var textSymbol = new esri.symbol.TextSymbol("123343234",new esri.symbol.Font("12pt"),new esri.Color([0,0,0]));
            var gra2 = new esri.Graphic(pointTemp, textSymbol);
            valveAttributeLayer.add(gra2);  */
        }

        var locationQueryUrlType = '';
        var locationType = '';
        var legendItemRenderData = new Object();
        var legdneSupplyAreaLabel = '';

        function GetLegendCustomerData(itemDataTemp,top,tableName){
            var parameterTemp = new Object();
            if(selectTypeMain!="PipeAge")
                parameterTemp.Where = itemDataTemp.labelDisplayContent;
            else
                parameterTemp.Where = itemDataTemp.labelId;
            parameterTemp.Time = timeMyMain;
            parameterTemp.Field = selectTypeMain;
            parameterTemp.Top = top;
            parameterTemp.TableName = tableName;
            var tempUrl = "";
            if(tableNameMain=="")
            tempUrl = urlClass.axiosUrl+'GetLegendUserData';
            else
            tempUrl = urlClass.axiosUrl+'GetLegendCalUserData';
            axios.post(
                tempUrl,
                JSON.stringify(parameterTemp),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(GetLegendCustomerDataReturn) 
        }
        function GetLegendCalPipeCustomerData(itemDataTemp,top,tableName,fieldTemp){
            var parameterTemp = new Object();
            parameterTemp.Where = itemDataTemp.labelDisplayContent;
            parameterTemp.Field = fieldTemp;
            parameterTemp.Top = top;
            parameterTemp.TableName = tableName;
            tempUrl = urlClass.axiosUrl+'GetLegendCalPipeUserData';
            axios.post(
                tempUrl,
                JSON.stringify(parameterTemp),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(GetLegendCustomerDataReturn) 
        }
        function GetLegendCustomerDataReturn(response){
            var obj = response.data;
            var tableData = obj.ListData;
            var mytableDate = new Object();
            mytableDate.listData = tableData;
            mytableDate.numberCount = obj.Count;
            mytableDate.tableName='customerTable';
            mytableDate.labelType = '用户数量';
            mytableDate.mainType = "Customer";
            MyDispatchEvent('LegendCustomerGet',mytableDate);
        }
        var legendSelect = "";
        function GetLegendCalPipeLocationData(itemDataTemp,top,tableName,fieldTemp){
            legendSelect = 'pipe';
            var parameterTemp = new Object();
            parameterTemp.Where = itemDataTemp.labelDisplayContent;
            parameterTemp.Field = fieldTemp;
            parameterTemp.Top = top;
            parameterTemp.TableName = tableName;
            var postUrl = "";
            postUrl = urlClass.axiosUrl+'GetLegendCalPipeLocationData';
            axios.post(
                postUrl,
                JSON.stringify(parameterTemp),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(GetLegendLocationDataReturn) 
        }
        function GetLegendLocationData(itemDataTemp,top,tableName,supplyAreaLabelTemp){
            var parameterTemp = new Object();
            if(supplyAreaLabelTemp!='NAN')
            {
                parameterTemp.Where = itemDataTemp.labelId;
            }
            else 
            {
                parameterTemp.Where = itemDataTemp.labelDisplayContent;
                supplyAreaLabelTemp = "";
            }
            parameterTemp.Time = timeMyMain;
            parameterTemp.Field = (selectTypeMain=="SupplyAreaCompare"?"SupplyArea":selectTypeMain);
            parameterTemp.Top = top;
            parameterTemp.TableName = tableName;
            parameterTemp.SupplyAreaLabel = supplyAreaLabelTemp;
            parameterTemp.Time1 = timeMyMain1;
            parameterTemp.Time2 = timeMyMain2;
            parameterTemp.isCompare = isCompare;
            var postUrl = "";
            if(isCompare)
                postUrl = urlClass.axiosUrl+'GetCompareLegendLocationData';
            else if(EventTypeMain!="PlanTempCalculate")
                postUrl = urlClass.axiosUrl+'GetLegendLocationData';
            else if(EventTypeMain=="PlanTempCalculate")
                postUrl = urlClass.axiosUrl+'GetLegendCalLocationData';
            axios.post(
                postUrl,
                JSON.stringify(parameterTemp),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(GetLegendLocationDataReturn) 
        }

        function GetLegendLocationDataReturn(response){
            var obj = response.data;
            var tableData = obj.LegendInfo;
            
            var mytableData = new Object();
            mytableData.tableType = layerType;
            mytableData.listData = tableData;
            mytableData.numberCount = obj.Count;
            mytableData.tableName='attributeTable';
            mytableData.labelType = layerType=='pipe'?'管道数量':'节点数量';
            mytableData.mainType = "Location";
            mytableData.isCompare = isCompare?'compare':'';
            MyDispatchEvent('LegendLocationGet',mytableData);
        }

        function MyDispatchEvent(typeTemp,dataTemp){
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = typeTemp;
                myEventTemp.detail.data = dataTemp;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
        }

        var allLegendDisplay = true;
        var isAllDisplay = false;
        function GetTimeCompareData(time1,time2,min,max,field,level){
            var parameter = {
                Time1:time1,
                Time2:time2,
                Min:min,
                Max:max,
                Field:field
            }
            var urlTempPost = "";
            var isPipe = false;
            if(selectTypeMain=="Flow"||selectTypeMain=="Velocity"||selectTypeMain=="Slop"||selectTypeMain=="Age")
            {
                urlTempPost = urlClass.axiosUrl+"TimeCompareDataPipe";
                isPipe = true;
            }   
            else if(selectTypeMain=="Pressure"||selectTypeMain=="HydraulicGrade"||selectTypeMain=="Demand")
            {
                urlTempPost = urlClass.axiosUrl+"TimeCompareDataNode";
                isPipe = false;
            }    
            axios.post(
                urlTempPost,
                JSON.stringify(parameter),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(function(response){
                 gl.clear();
                 compareResultLayer.clear();
                 var limitsTemp;
                if(isPipe)
                limitsTemp = DrawPlanTempCalPipeFlow(min,max,response.data,level,pressureChangColor,"");
                else
                limitsTemp = DrawPlanTempCalNode(min,max,response.data,level,pressureChangColor);
                pressureChangLimit = limitsTemp.slice(0)
                if(!isUpAndDown)
                LegendDisplayMain(selectTypeMain,timeMyMain);    
                
            }) 
        }

        /**
         * 临时方案模拟计算绘制节点压力变化函数
         * @param {*} min 
         * @param {*} max 
         * @param {*} allData 
         * @param {*} levelTemp 
         * @param {*} colorTemp 
         */
        function DrawPlanTempCalNode(min,max,allData,levelTemp,colorTemp){
            if(isDisplays.length==0)
            isDisplays = pressureChangeIsDisplay.slice(0)
            var limitsTemp = DrawPressureChange(min,max,allData,levelTemp,colorTemp,isDisplays);
            return limitsTemp;
        }

        /**
         * 临时方案模拟计算绘制管道流量变化函数
         * @param {*} min 
         * @param {*} max 
         * @param {*} allData 
         * @param {*} levelTemp 
         * @param {*} colorTemp 
         */
        function DrawPlanTempCalPipeFlow(min,max,allData,levelTemp,colorTemp,typeTemp){
            if(isDisplays.length==0)
            isDisplays = pressureChangeIsDisplay.slice(0)
            var limitsTemp = DrawPipeFlowChange(min,max,allData,levelTemp,colorTemp,typeTemp,isDisplays)
            return limitsTemp;
        }


        /**
         * 临时方案模拟计算绘制管道流速变化函数
         * @param {*} min 
         * @param {*} max 
         * @param {*} allData 
         * @param {*} levelTemp 
         * @param {*} colorTemp 
         */
        function DrawPlanTempCalPipeStrength(min,max,allData,levelTemp,colorTemp){
            DrawPipeFlowChange(min,max,allData,levelTemp,colorTemp)
        }

        /**
         * 临时方案模拟计算绘制管道流向变化函数
         */
        function DrwaPlanTempCalPipeDirection()
        {
            
        }

        /**
         * 起始时间
         */
        var startDate;
        /**
         * 终止时间
         */
        var endDate;
        var typeMain = "";
        var fieldMain = "";
        var compreType = "";

        function LegendDisplayMain(typeTemp,timeTemp){
            maxMain = "";
            minMain = "";
            MaxLayer.setVisibility(false);
            MinLayer.setVisibility(false);
            if(typeTemp=="Flow"||typeTemp=="Velocity"||typeTemp=="Slop"||typeTemp=="Age"||typeTemp=="SupplyArea"||typeTemp=="SupplyAreaCompare")
            {
                if(typeTemp=="SupplyAreaCompare")
                {
                    field = 'Result_SupplyArea_'+timeTemp;
                }
                else
                    field = 'Result_'+typeTemp+'_'+timeTemp;
                where = GetWhere('pipe');
                typeMain = typeTemp;
                if(typeTemp!="SupplyAreaCompare")
                fieldMain = 'Result_'+typeTemp+'_';
                else
                fieldMain = 'Result_SupplyArea_';
                if(typeTemp!="SupplyAreaCompare"&&typeTemp!="SupplyArea"&&!isCompare)
                {
                    GetBaseMax(layerType,timeMyMain,selectTypeMain,"NAN");
                }
                else
                {
                    LegendMain(typeMain,fieldMain);
                }
                    
            }
            else if(typeTemp=="Pressure"||typeTemp=='HydraulicGrade'||typeTemp=="Demand")
            {
                field = 'Result_'+typeTemp+'_'+timeTemp;
                where = GetWhere('junction');
                //LegendMain(typeTemp,'Result_'+typeTemp+'_');
                typeMain = typeTemp;
                fieldMain = 'Result_'+typeTemp+'_';
                if(isCompare)
                LegendMain(typeMain,fieldMain);
                else
                GetBaseMax(layerType,timeMyMain,selectTypeMain,"NAN");
                
            }
            else if(typeTemp=="Diameter"||typeTemp=="Material")
            {
                field = 'Physical_Pipe'+typeTemp;
                where = GetWhere('pipe');
                LegendMain(typeTemp,field);
            }
            else if(typeTemp=="PipeAge")
            {
                where = GetWhere('pipe');
                LegendMain(typeTemp,typeTemp);
            }
            else if(typeTemp=="PressureChange")
            {
                where = GetPressureChangeWhere();
                console.log(where)
                LegendMain(typeTemp,typeTemp);
            }
            else if(typeTemp=="FlowChangeCount")
            {
                where = GetWhere('pipe');
                LegendMain(typeTemp,typeTemp);
            }
            else if(typeTemp=="baseMap"||typeTemp=="ValveUpdate"||typeTemp=="PipeStatus")
            {
                BaseMapLegend();
            }
        }

        function BaseMapLegend()
        {
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "LegendDisplay";
            var legendList = new Array(); 
            var legendAllData = new Object(); 
            legendAllData.title = '基础管网';
            legendAllData.legendName = '';
            legendAllData.listData = [];
            legendAllData.type = 'baseMap'
            myEventTemp.detail.data = legendAllData;
            if(window.dispatchEvent){
            window.dispatchEvent(myEventTemp);
                }else{
                    window.fireEvent(myEventTemp);
                }
        }
        var drawLayerWhere = '';
        /**
         * 专题图或者时间切换函数
         * @param {*} typeTemp 专题图类型
         * @param {*} timeTemp 时间
         */
        function SelectChange(typeTemp,timeTemp,extentTemp){
            //if(map.getScale()<=myScale[1])
            {
                if(typeTemp=="baseMap")
                {
                    gl.clear();  
                    compareResultLayer.clear();
                    layerType = '';                  
                }
                else if(typeTemp=="Flow"||typeTemp=="Velocity"||typeTemp=="Slop"||typeTemp=="Age"||typeTemp=="SupplyArea"||typeTemp=="SupplyAreaCompare")
                {
                    layerType='pipe';
                    if(typeTemp=="SupplyAreaCompare")
                    field = 'Result_SupplyArea'+'_'+timeTemp;
                    else
                        field = 'Result_'+typeTemp+'_'+timeTemp;
                    where = GetWhere('pipe');
                    drawPipe(field,where,urlClass.pipeResultUrl,extentTemp);
                    //LegendMain(typeTemp,'Result_'+typeTemp+'_');
                }
                else if(typeTemp=="Pressure"||typeTemp=='HydraulicGrade'||typeTemp=="Demand")
                {
                    layerType='junction';
                    field = 'Result_'+typeTemp+'_'+timeTemp;
                    where = GetWhere('junction');
                    drawJunctionPressure(field,where,urlClass.junctionResultUrl,extentTemp);
                    //LegendMain(typeTemp,'Result_'+typeTemp+'_');
                }
                else if(typeTemp=="Diameter"||typeTemp=="Material")
                {
                    layerType='pipe';
                    field = 'Physical_Pipe'+typeTemp;
                    where = GetWhere('pipe');
                    drawPipe(field,where,urlClass.baseMapUrl+'/'+pipeLayerId,extentTemp);
                    //LegendMain(typeTemp,field);
                }
                else if(typeTemp=="PipeAge")
                {
                    layerType='pipe';
                    field = 'pipeAge';
                    where = GetWhere('pipe');
                    drawPipe(field,where,urlClass.baseMapUrl+'/'+pipeLayerId,extentTemp);
                    //LegendMain(typeTemp,typeTemp);
                }
                else if(typeTemp=="PressureChange")
                {
                    layerType='junction';
                    where = GetPressureChangeWhere();
                    GetPressureChangeData(where);
                    //LegendMain(typeTemp,typeTemp);
                }
                else if(typeTemp=="FlowChangeCount")
                {
                    layerType='pipe';
                    where = GetWhere('pipe');
                    drawPipeDirectionChange(field,where,urlClass.pipeResultUrl,extentTemp);
                }
                else if(typeTemp=="PipeStatus")
                {
                    field = 'Result_Status_'+timeTemp;
                    where = GetWhere('pipe');
                    drawPipe(field,where,urlClass.pipeResultUrl,extentTemp);
                }
                else if(typeTemp=="ValveUpdate")
                {
                    GetValveUpdate((startDate).year,(startDate).month,(startDate).date,(endDate).year,(endDate).month,(endDate).date);
                }
                drawLayerWhere = where;
            }
        }
        /**
         * 从后台服务中获取阀门动态的信息
         * @param {*} startYear 起始年份
         * @param {*} startMonth 起始月份
         * @param {*} startDay 起始天数
         * @param {*} endYear 终止年份
         * @param {*} endMonth 终止月份
         * @param {*} endDay 终止天数
         */
        function GetValveUpdate(startYear,startMonth,startDay,endYear,endMonth,endDay){
            axios.get(urlClass.axiosUrl+'GetStatusChangeValve/'+startYear+'/'+startMonth+'/'+startDay+'/'+endYear+'/'+endMonth+'/'+endDay)
            .then(function(response){
                var objTemp = response.data;
                DrawValveUpdate(objTemp);
            })
        }
        /**
         * 绘制阀门动态的图标
         * @param {*} allData 查询返回的阀门动态的所有数据
         */
        function DrawValveUpdate(allData){
            for(var i=0;i<allData.length;i++)
           {
               var obj = allData[i];
               var point = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: 102113 }));
               var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol('../../../static/assets/valve_change.png', 13, 13);
               var gra1 = new esri.Graphic(point, pictureMarkerSymbol);  
               gl.add(gra1);  
           }
        }

        /**
         * 获取查询条件中的查询字段
         * @param {*} typeTemp 元素类型(管道或者节点)
         */
        function GetWhereType(typeTemp){
            if(typeTemp=='junction')
            return "MaxDiameter";
            else if(typeTemp=='pipe')
            return 'Physical_PipeDiameter';//return "Physical_PipeDiameter";
        }

        /**
         * 获取一般查询的条件
         * @param {*} typeTemp 元素类型(管道或者节点)
         */
        function GetWhere(typeTemp){
            var whereTemp = "";
            for(var i=0;i<myScale.length;i++)
            {
                if(i==0)
                {
                    if(map.getScale()<=myScale[i])
                    {
                        whereTemp = '1=1';
                    }
                }
                else if(i==myScale.length-1)
                {
                    if(map.getScale()>myScale[i])
                    {
                        whereTemp = GetWhereType(typeTemp);
                        whereTemp+=('>='+myDiameter[i]);
                    }
                    else if(map.getScale()>myScale[i-1]&&map.getScale()<=myScale[i])
                    {
                        whereTemp = GetWhereType(typeTemp);
                        whereTemp+=('>='+myDiameter[i-1]);
                    }
                }
                else
                {
                    if(map.getScale()>myScale[i-1]&&map.getScale()<=myScale[i])
                    {
                        whereTemp = GetWhereType(typeTemp);
                        whereTemp+=('>='+myDiameter[i-1]);
                    }
                }
            }
            return whereTemp;
        }

        /**
         * 获取查询压力波动的条件
         */
        function GetPressureChangeWhere(){
            var whereTemp = "";
            for(var i=0;i<myScale.length;i++)
            {
                if(i==0)
                {
                    if(map.getScale()<=myScale[i])
                    {
                        whereTemp = 'NAN';
                    }
                }
                else if(i==myScale.length-1)
                {
                    if(map.getScale()>myScale[i])
                    {
                        whereTemp = myDiameter[i];
                    }
                    else if(map.getScale()>myScale[i-1]&&map.getScale()<=myScale[i])
                    {
                        whereTemp = myDiameter[i-1];
                    }
                }
                else
                {
                    if(map.getScale()>myScale[i-1]&&map.getScale()<=myScale[i])
                    {
                        whereTemp=myDiameter[i-1];
                    }
                }
            }
            return whereTemp;
        }

        /**
         *查询节点函数 
         * @param {*} fieldMy 属性字段 
         * @param {*} whereMy 查询条件
         * @param {*} urlTemp 查询服务地址
         */
        function drawJunctionPressure(fieldMy,whereMy,urlTemp,extentTemp){
            query.geometry = extentTemp;
            query.where = whereMy;
            query.outFields = ["ElementId",fieldMy];
            field = fieldMy;
            var queryTask = new esri.tasks.QueryTask(urlTemp);
            queryTask.execute(query,JunctionPressure);
        }
        var LocationMarkerSymbol = new mapObjMy.PictureMarkerSymbol('../../../static/assets/colored-pins-red.png', 20, 41);
       /**
        *查询窗口下方表格中单行元素的定位信息 
         * @param {*} whereMy 查询条件
         * @param {*} urlTemp 查询服务地址
        */
        function TableItemClickLocation(whereMy,urlTemp){
            query.geometry = initExtent;
            query.where = whereMy;
            query.outFields = ["ElementId"];
            var queryTask = new esri.tasks.QueryTask(urlTemp);
            queryTask.execute(query,SelectLocationInfo);
        }
       
        /**
         * 查询窗口下方表格中单行元素的定位信息(返回结果)
         * @param {*} re 查询返回参数
         */
        function SelectLocationInfo(re){
            for(var i=0;i<re.features.length;i++)
            {
                var feature = re.features[i];
                var geometeyTemp = feature.geometry;
                if(locationQueryUrlType=="junction"||locationQueryUrlType=="Customer")
                {
                    PositionMy(geometeyTemp);
                }
                else if(locationQueryUrlType=="pipe")
                {
                    var path = geometeyTemp.paths;
                    var points = path[0];
                    var point1 = points[0];
                    var point2 = points[1];
                    var x = Math.abs(Number(point1[0])+Number(point2[0]))/2;
                    var y = Math.abs(Number(point1[1])+Number(point2[1]))/2;
                    var point = esri.geometry.Point(x,y,new esri.SpatialReference({ wkid: 102113 })); 
                    PositionMy(point);
                }
            }
        }

        /**
         * 往对应的坐标处扎针
         * @param {*} geometry 坐标
         */
        function PositionMy(geometry){
            LocationGraphicsLayer.clear();
            var gra1 = new esri.Graphic(geometry, LocationMarkerSymbol);
            LocationGraphicsLayer.add(gra1);
            var point = geometry;
            map.centerAt(point); 

        }

         /**
          * 查询管道函数
          * @param {*} fieldMy 属性字段 
          * @param {*} whereMy 查询条件
          * @param {*} urlTemp 查询服务地址
          */
         function drawPipe(fieldMy,whereMy,urlTemp,extentTemp){
            query.geometry = extentTemp;
            query.where = whereMy;
            query.outFields = ["ElementId",fieldMy];
            field = fieldMy;
            var queryTask = new esri.tasks.QueryTask(urlTemp);
            queryTask.execute(query,DrawPipe);
        }

        function DrawPipe(re){
            var isDisplayTemp = drawClass.pipeFlow(re,selectTypeMain,isDisplays,field,gl);
            if(isDisplays.length==0)
            isDisplays = isDisplayTemp.slice(0);
        }

        /**
         * 查询管道24小时流向变化函数
         * @param {*} fieldMy 属性字段
         * @param {*} whereMy 查询条件
         * @param {*} urlTemp 查询服务地址
         */
        function drawPipeDirectionChange(fieldMy,whereMy,urlTemp,extentTemp){
            query.geometry = extentTemp;
            query.where = whereMy;
            var fieldTemp = new Array();
            for(var i=0;i<24;i++)
            {
                var fieldTempOnly = "Direction_Change_" + i.toString();
                fieldTemp.push(fieldTempOnly);
                fieldTempOnly = "Result_Flow_"+i.toString();
                fieldTemp.push(fieldTempOnly);
            }
            query.outFields = fieldTemp;
            field = fieldMy;
            var queryTask = new esri.tasks.QueryTask(urlTemp);
            queryTask.execute(query,pipeFlow);
        }


         /**
          * 管道基础属性画图的主函数
          * @param {*} re 查询返回的对象
          * @param {*} limits 分级
          * @param {*} colors 颜色分级
          * @param {*} widths 线的宽度
          * @param {*} typeTemp 类型
          */
         function DrawPipePhysicalMain(re,limits,colors,widths,typeTemp,isDisplaysTemp){
            for(var i=0;i<re.features.length;i++){
                var feature = re.features[i];
                var attribute = feature.attributes[field];
                DrawMainPipePhysicalMain(feature.geometry,attribute,limits,colors,widths,i,isDisplaysTemp);
            }
        }

        function DrawSupplyAreaCompare(changeData,limits,colors,widths,isDisplaysTemp){
            for(var i=0;i<changeData.length;i++){
                var feature = changeData[i];
                var attribute = feature.SupplyAreaIdO;
                var path = new Array();
                var pointTemp;
                for(var j=0;j<feature.Coordinate.length;j++)
                {
                    var objTemp = feature.Coordinate[j];
                    var pathTemp = new Array();
                    pathTemp.push(objTemp.X)
                    pathTemp.push(objTemp.Y)
                    path.push(pathTemp);
                    pointTemp = point;
                }
                var pathMain = new Array();
                pathMain.push(path);
                var line = new esri.geometry.Polyline({
                    "paths":[],
                    "spatialReference": { "wkid": 102113 }
                });
                line.paths = pathMain;
                DrawMainPipePhysicalMain(line,attribute,limits,colors,widths,i,isDisplaysTemp);
            }
        }

        function DrawMainPipePhysicalMain(geometry,attribute,limits,colors,widths,i,isDisplaysTemp){
            for(var j=0;j<limits.length;j++)
            {
                if(attribute==limits[j]&&isDisplaysTemp[j])
                {
                    var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                    markerSymbol.setWidth(widths[j]);//大小
                    markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                    var gra1 = new esri.Graphic(geometry, markerSymbol);  
                    gl.add(gra1);                            
                }
            }
        }

        /**
         * 管道画图的主函数
         * @param {*} re 查询返回的对象
         * @param {*} limits 分级
         * @param {*} colors 颜色分级
         * @param {*} widths 线的宽度
         * @param {*} typeTemp 类型
         */
        function DrawPipeMain(re,limits,colors,widths,typeTemp,isDisplaysTemp){
            for(var i=0;i<re.features.length;i++){
                var feature = re.features[i];
                var attribute = feature.attributes[field];
                if(true)
                {
                    for(var j=0;j<limits.length;j++)
                    {
                        if(j==0)
                        {
                            if(attribute<limits[j]&&isDisplaysTemp[j])
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);                            
                            }
                        } 
                        else if(j==limits.length-1)
                        {
                            if(attribute>limits[j] &&isDisplaysTemp[isDisplaysTemp.length-1])
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-1]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-1]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);                            
                            }
                            else if(attribute>limits[j-1]&&attribute<limits[j] &&isDisplaysTemp[j])    
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-2]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-2]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            }
                            else if(attribute='' &&isDisplaysTemp[isDisplaysTemp.length-1]) 
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-1]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-1]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            }
                        } 
                        else
                        {
                            if(attribute>limits[j-1]&&attribute<limits[j] &&isDisplaysTemp[j])    
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);  
                            }                    
                        }              
                    }
                }
                
            }
        }

        function DrawPipeMainPipeAge(re,limits,colors,widths,typeTemp,isDisplaysTemp){
            for(var i=0;i<re.features.length;i++){
                var feature = re.features[i];
                var attribute = feature.attributes[field];
                if(true)
                {
                    for(var j=0;j<limits.length;j++)
                    {
                        if(j==0)
                        {
                            if(attribute<limits[j]&&isDisplaysTemp[j])
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);     
                            }
                        } 
                        else if(j==limits.length-1)
                        {
                            if(attribute='' &&isDisplaysTemp[isDisplaysTemp.length-1]) 
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-1]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-1]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            }
                        } 
                        else if(j==limits.length-2)
                        {
                            if(attribute>limits[j] &&isDisplaysTemp[isDisplaysTemp.length-2])
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-2]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-2]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);                            
                            }
                            else if(attribute>limits[j-1]&&attribute<limits[j] &&isDisplaysTemp[j])    
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-3]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-3]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            }
                        }
                        else
                        {
                            if(attribute>limits[j-1]&&attribute<limits[j] &&isDisplaysTemp[j])    
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);  
                            }                    
                        }              
                    }
                }
                
            }
        }
        /**
         * 节点画图的主函数
         * @param {*} re 查询返回的对象
         * @param {*} limits 分级
         * @param {*} colors 颜色分级
         * @param {*} widths 线的宽度
         * @param {*} typeTemp 类型
         */
        function DrawJunctionMain(re,limits,colors,widths,typeTemp,isDisplaysTemp){
            for(var i=0;i<re.features.length;i++){
                var feature = re.features[i];
                var attribute = feature.attributes[field];
                if(true)
                {
                    for(var j=0;j<limits.length;j++)
                    {
                        if(j==0)
                        {
                            if(attribute<limits[j]&&isDisplaysTemp[j])
                            {
                                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                                markerSymbol.setOutline(null);//边框 
                                markerSymbol.setSize(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1); 
                            }
                        } 
                        else if(j==limits.length-1)
                        {
                            if(attribute>limits[j]&&isDisplaysTemp[isDisplaysTemp.length-1])
                            {
                                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                                markerSymbol.setOutline(null);//边框 
                                markerSymbol.setSize(widths[widths.length-1]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-1]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);                            
                            }
                            else if(attribute>limits[j-1]&&attribute<limits[j]&&isDisplaysTemp[isDisplaysTemp.length-2])    
                            {
                                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                                markerSymbol.setOutline(null);//边框 
                                markerSymbol.setSize(widths[widths.length-2]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-2]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            } 
                        } 
                        else
                        {
                            if(attribute>limits[j-1]&&attribute<limits[j]&&isDisplaysTemp[j])    
                            {
                                var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                                markerSymbol.setOutline(null);//边框 
                                markerSymbol.setSize(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);  
                            }                    
                        }              
                    }
                }
                
            }
        }

        /**
         * 24小时管道流向变化的绘图主函数
         * @param {*} re 查询返回的对象
         * @param {*} limits 分级
         * @param {*} colors 颜色分级
         * @param {*} widths 线的宽度
         * @param {*} fieldTemp 流向变化字段
         * @param {*} fieldTemp1 流量字段
         */
        function DrawPipeDirectionChangeMain(re,limits,colors,widths,fieldTemp,fieldTemp1,isDisplaysTemp){
            for(var i=0;i<re.features.length;i++){
                var feature = re.features[i];
                var count = 0;
                var sum = 0;
                for(var j=0;j<24;j++)
                {
                    count+=(feature.attributes[fieldTemp+j]);
                    sum +=Math.abs((feature.attributes[fieldTemp1+j]));
                }
                if(sum<0.0024)
                {
                    continue;
                }
                var attribute = count;
                if(true)
                {
                    for(var j=0;j<limits.length;j++)
                    {
                        if(j==0)
                        {
                            if(attribute<limits[j]&&isDisplaysTemp[j])
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);                            
                            }
                        } 
                        else if(j==limits.length-1)
                        {
                            if(attribute>limits[j]&&isDisplaysTemp[isDisplaysTemp.length-1])
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-1]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-1]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);                            
                            }
                            else if(attribute>limits[j-1]&&attribute<limits[j]&&isDisplaysTemp[isDisplaysTemp.length-2])    
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-2]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-2]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            }
                            else if(attribute=''&&isDisplaysTemp[isDisplaysTemp.length-1]) 
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[widths.length-1]);//大小
                                markerSymbol.setColor(new esri.Color(colors[colors.length-1]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);
                            }
                        } 
                        else
                        {
                            if(attribute>limits[j-1]&&attribute<limits[j]&&isDisplaysTemp[j])    
                            {
                                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                                markerSymbol.setWidth(widths[j]);//大小
                                markerSymbol.setColor(new esri.Color(colors[j]));//颜色
                                var gra1 = new esri.Graphic(feature.geometry, markerSymbol);  
                                gl.add(gra1);  
                            }                    
                        }              
                    }
                }
                
            }
        }



        function GetLegendPIpeLengthData(legendData){
            var urlTemp = urlClass.axiosUrl+"LegendGetPipeLength";
            axios.post(
                urlTemp,
                JSON.stringify(legendData),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(GetLegendPipeLengthDataReturn)
        }

        var legendPipeLengthData;

        var allPipeLength = 0;
        var allPipeLengthPipe = 0;
        function GetLegendDisplayData(legendPipeLengthData,type){
            var obj = new Object();
            var legendList = new Array();
            var allPipeLengthTemp = 0;
            for(var i=0;i<legendPipeLengthData.length;i++)
            {
                var temp = legendPipeLengthData[i];
                var legendItem = new Object();
                legendItem.color = colorLegend[i];
                legendItem.labelDisplayContent = temp.Label;
                legendItem.pipeLengthContent = (Number(temp.PipeLength)).toFixed(2);
                legendItem.ratioContent = temp.Ratio;
                legendItem.isDisplay = isDisplays[i];
                legendItem.itemType = itemType;
                legendItem.index = i;
                legendItem.labelId = labelsAll[i].labelId;
                if(i==legendPipeLengthData.length-1)
                    legendItem.lineDisplay = false;
                else  
                    legendItem.lineDisplay = true;
                legendList.push(legendItem);
                allPipeLengthTemp+=Number(temp.PipeLength);
            } 
            obj.legendList = legendList;
            obj.AllPipelength = allPipeLengthTemp;
            return obj;
        }
        var legendAllDataTemp = new Object();
        function GetLegendPipeLengthDataReturn(response){
            legendPipeLengthData = response.data;
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "LegendDisplay";
            var legendList = new Array(); 
            var legendAllData = new Object(); 
            var tempObj = new Object();
            
            tempObj = GetLegendDisplayData(legendPipeLengthData,selectTypeMain) 
            legendList = tempObj.legendList;
            allPipeLength = tempObj.AllPipelength;
            legendAllData.title = titleName;
            legendAllData.legendName = legendName;
            legendAllData.allIsDisplay = allLegendDisplay;//图例控制是否全部显示
            legendAllData.listData = legendList;
            legendAllData.allPipeLength = Number(allPipeLength).toFixed(2);
            legendAllData.maxValue = maxMain;
            legendAllData.minValue = minMain;
            legendAllData.maxCheckedIsDisplay = maxMain!=""?true:false;
            legendAllData.minCheckedIsDisplay = minMain!=""?true:false;
            legendAllData.maxChecked = false;
            legendAllData.minChecked = false;
            legendAllData.isCompareType = isCompare?compreType:"";
            legendAllData.compareUpCheck = true;
            legendAllData.compareDownCheck = true;

            //模拟计算管道图例的数据
            legendAllData.listDataPipe = planCalTempFlowLegendList;
            legendAllData.allPipeLengthPipe = Number(allPipeLengthPipe).toFixed(2);
            legendAllData.legendNamePipe = "流量变化(m³/h)";

            legendAllData.listDataPipeVelocity = planCalTempVelocityLegendList;
            legendAllData.allPipeVelocityLengthPipe = Number(allPipeLengthPipeVelocity).toFixed(2);
            legendAllData.legendNameVelocity = "流速变化(m/s)";

            if(EventTypeMain=="PlanTempCalculate")
                legendAllData.type="planCal";
            else
                legendAllData.type="";
            legendAllDataTemp = legendAllData;
            myEventTemp.detail.data = legendAllData;
            console.log(legendAllData)
            if(window.dispatchEvent){
            window.dispatchEvent(myEventTemp);
                }else{
                    window.fireEvent(myEventTemp);
                }
        }

        function UpdateLegendData(initData,allIsDisplayTemp)
        {
            var listDataTemp = initData.listData;
            var returnListTemp = new Array();
            for(var i=0;i<listDataTemp.length;i++)
            {
                var temp = listDataTemp[i];
                temp.isDisplay = allIsDisplayTemp;
                returnListTemp.push(temp);
                isDisplays[i] = allIsDisplayTemp;
            }
            initData.listData = returnListTemp;
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "LegendDisplay";
                myEventTemp.detail.data = initData;
                if(window.dispatchEvent){
                    window.dispatchEvent(myEventTemp);
                        }else{
                            window.fireEvent(myEventTemp);
                        }
        }

        function GetLegendLabelsMain(type,limitsMyTemp,labelsParameter){
            var labels = new Array();
            if(isCompare&&selectTypeMain!="SupplyAreaCompare")
            {
                labels = GetLegendPressureChangeLabels(limitsMyTemp)
            }
            else if(type=="Flow"||type=="Velocity"||type=="Slop"||type=="Age"||type=="Pressure"||type=="HydraulicGrade"||type=="Demand"||type=="Diameter"||type=="FlowChangeCount")
                labels = GetLegendLabels(limitsMyTemp)
            else if(type=="SupplyArea"||type=="Material"||type=="SupplyAreaCompare")
                labels = GetLegendLabelsPhysical(limitsMyTemp,labelsParameter)
            else if(type=="PressureChange"||type=="PlanCalTemp")
                labels = GetLegendPressureChangeLabels(limitsMyTemp)
            else if(type=="PipeAge")
                labels = GetLegendLabelsPipeAge(limitsMyTemp)
            return labels;
        }

        var titleName = "";
        var legendName = "";
        var colorLegend = new Array();
        var isDisplays = new Array();
        var planCalPipeFlowIsDisplays = new Array();
        var planCalPipeVelocityIsDisplays = new Array();
        var labelsAll = new Array();
        function GetLegendLabels(limits){
            var labels = new Array();
            for(var i=0;i<limits.length;i++)
            {
                var labelTemp = "";
                if(i==0)
                    labelTemp = ("<"+String(limits[i]));
                else
                    labelTemp = (String(limits[i-1])+"-"+String(limits[i]));
                var obj = new Object();
                obj.Label = labelTemp;
                obj.LabelId = labelTemp;
                labels.push(obj);
            }
            var labelTemp =  (">"+String(limits[limits.length-1]));
            var obj = new Object();
            obj.Label = labelTemp;
            obj.LabelId = labelTemp;
            labels.push(obj);
            return labels;
        }

        function GetLegendLabelsPipeAge(limits){
            var labels = new Array();
            for(var i=0;i<limits.length-1;i++)
            {
                var labelTemp = "";
                if(i==0)
                    labelTemp = ("<"+String(limits[i]));
                else
                    labelTemp = (String(limits[i-1])+"-"+String(limits[i]));
                var obj = new Object();
                obj.Label = labelTemp;
                obj.LabelId = labelTemp;
                labels.push(obj);
            }
            var labelTemp =  (">"+String(limits[limits.length-2]));
            var obj = new Object();
            obj.Label = labelTemp;
            obj.LabelId = labelTemp;
            labels.push(obj);
            var labelTemp1 =  (String(limits[limits.length-1]));
            var obj1 = new Object();
            obj1.Label = labelTemp1;
            obj1.LabelId = "";
            labels.push(obj1);
            return labels;
        }

        function GetLegendPressureChangeLabels(limits){
           
            var labels = new Array();
            for(var i=0;i<limits.length-1;i++)
            {
                var labelTemp = "";
                labelTemp = (String(limits[i])+"-"+String(limits[i+1]));
                var obj = new Object();
                obj.Label = labelTemp;
                obj.LabelId = labelTemp;
                labels.push(obj);
            }
            return labels;
        }

        function GetLegendLabelsPhysical(limits,labelsParameter){
            var labels = new Array();
            for(var i=0;i<limits.length;i++)
            {
                var labelTemp = "";
                labelTemp = String(limits[i]);
                var obj = new Object();
                obj.Label = labelsParameter[i];
                obj.LabelId = labelTemp;
                labels.push(obj);
            }
            return labels;
        }

        function ClassifyFunction(type){
            var tempLimit = new Array();
            var labelTemp = new Array();
            if(type=="Flow")
            {
                labelTemp = pipeFlowLimit;
                tempLimit = pipeFlowLimit;
                colorLegend = pipeFlowColor;
                if(isDisplays.length==0)
                isDisplays = pipeFlowIsDisplay.slice(0)
                titleName = "管道流量";
                legendName = "流量分级(m³/h)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays =pressureChangeIsDisplay.slice(0)
                    titleName = "流量对比";
                    legendName = "流量变化(m³/h)";
                    compreType = "ComparePipe";
                }
                
            }
            else if(type=="Velocity")//typeTemp=="Velocity"||typeTemp=="Slop"||typeTemp=="Age"||typeTemp=="SupplyArea"
            {
                labelTemp = pipeVelocityLimit;
                tempLimit = pipeVelocityLimit;
                colorLegend = pipeVelocityColor;
                if(isDisplays.length==0)
                isDisplays = pipeVelocityIsDisplay.slice(0);
                titleName = "管道流速";
                legendName = "流速分级(m/s)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays = pressureChangeIsDisplay.slice(0)
                    titleName = "流速对比";
                    legendName = "流速变化(m/h)";
                    compreType = "ComparePipe";
                }
            }
            else if(type=="Slop")
            {
                labelTemp = pipeSlopLimit;
                tempLimit = pipeSlopLimit;
                colorLegend = pipeSlopColor;
                if(isDisplays.length==0)
                isDisplays = pipeSlopIsDisplay.slice(0);
                titleName = "管道水力坡度";
                legendName = "水力坡度分级(1/1000)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays = pressureChangeIsDisplay.slice(0)
                    titleName = "水力坡度对比";
                    legendName = "水力坡度变化(1/1000)";
                    compreType = "ComparePipe";
                }
            }
            else if(type=="Age")
            {
                labelTemp = ageLimit;
                tempLimit = ageLimit;
                colorLegend = ageColor;
                if(isDisplays.length==0)
                isDisplays = ageIsDisplay.slice(0);
                titleName = "管道水龄";
                legendName = "水龄分级(m/s)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays = pressureChangeIsDisplay.slice(0)
                    titleName = "水龄对比";
                    legendName = "水龄变化(1/1000)";
                    compreType = "ComparePipe";
                }
            }
            else if(type=="SupplyArea"||type=="SupplyAreaCompare")
            {
                labelTemp = pipeSupplyAreaLabels;
                tempLimit = pipeSupplyAreaLimit;
                colorLegend = pipeSupplyAreaColor;
                if(isDisplays.length==0)
                isDisplays = pipeSupplyAreaIsDisplay.slice(0);
                titleName = "供水分界线";
                legendName = "供水区域";
                if(isCompare)
                {
                    labelTemp = pipeSupplyAreaLabels;
                    tempLimit = pipeSupplyAreaLimit;
                    colorLegend = pipeSupplyAreaColor;
                    titleName = "供水区域对比";
                    legendName = "供水区域";
                    compreType = "CompareSupplyArea";
                    if(isDisplays.length==0)
                    isDisplays = pipeSupplyAreaIsDisplay.slice(0);
                }
            }
            else if(type=="Pressure")
            {
                labelTemp = pressureLimit;
                tempLimit = pressureLimit;
                colorLegend = pressureColor;
                if(isDisplays.length==0)
                isDisplays = pressureIsDisplay.slice(0)
                titleName = "节点压力";
                legendName = "压力分级(m)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays = pressureChangeIsDisplay.slice(0)
                    titleName = "压力对比";
                    legendName = "压力变化(m)";
                    compreType = "CompareNode";
                }
            }
            else if(type=="HydraulicGrade")
            {
                labelTemp = headLimit;
                tempLimit = headLimit;
                colorLegend = headColor;
                if(isDisplays.length==0)
                isDisplays = headIsDisplay.slice(0)
                titleName = "水压标高";
                legendName = "水压标高分级(m)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays = pressureChangeIsDisplay.slice(0)
                    titleName = "水压标高对比";
                    legendName = "水力坡度变化(m)";
                    compreType = "CompareNode";
                }
            }
            else if(type=="Demand")
            {
                labelTemp = demandLimit;
                tempLimit = demandLimit;
                colorLegend = demandColor;
                if(isDisplays.length==0)
                isDisplays = demandIsDisplay.slice(0)
                titleName = "节点流量";
                legendName = "节点流量(m³/s)";
                if(isCompare)
                {
                    labelTemp = pressureChangLimit;
                    tempLimit = pressureChangLimit;
                    colorLegend = pressureChangColor;
                    if(isDisplays.length==0)
                    isDisplays = pressureChangeIsDisplay.slice(0)
                    titleName = "节点流量对比";
                    legendName = "流量变化(m³/s)";
                    compreType = "CompareNode";
                }
            }
            else if(type=="Diameter")
            {
                labelTemp = pipeDiameterLimit;
                tempLimit = pipeDiameterLimit;
                colorLegend = pipeDiameterColor;
                if(isDisplays.length==0)
                isDisplays = pipeDiameterIsDisplay.slice(0)
                titleName = "管径";
                legendName = "管径分级(mm)";
            }
            else if(type=="Material")
            {
                labelTemp = pipeMaterialLimit;
                tempLimit = pipeMaterialLimit;
                colorLegend = pipeMaterialColor;
                if(isDisplays.length==0)
                isDisplays = pipeMaterialIsDisplay.slice(0);
                titleName = "管材";
                legendName = "管材分级";
            }
            else if(type=="PipeAge")
            {
                labelTemp = pipeAgeLimit;
                tempLimit = pipeAgeLimit;
                colorLegend = pipeAgeColor;
                if(isDisplays.length==0)
                isDisplays = pipeAgeIsDisplay.slice(0);
                titleName = "管龄";
                legendName = "管龄分级(年)";
            }
            else if(type=="PressureChange")
            {
                labelTemp = pressureChangLimit;
                tempLimit = pressureChangLimit;
                colorLegend = pressureChangColor;
                if(isDisplays.length==0)
                isDisplays = pressureChangeIsDisplay.slice(0)
                titleName = "24小时压力波动";
                legendName = "压力变化(m)";
            }
            else if(type=="FlowChangeCount")
            {
                labelTemp = directionChangeLimit;
                tempLimit = directionChangeLimit;
                if(isDisplays.length==0)
                isDisplays = directionChangeIsDisplay.slice(0)
                titleName = "24小时流向变化次数";
                legendName = "流向变化次数(次)";
            }
            else if(type=="PlanCalTemp")
            {
                labelTemp = pressureChangLimit;
                tempLimit = pressureChangLimit;
                colorLegend = pressureChangColor;
                if(isDisplays.length==0)
                isDisplays = pressureChangeIsDisplay.slice(0)
                titleName = "模拟计算";
                legendName = "压力变化(m)";
            }
            if(!allLegendDisplay)
            {
                isDisplays = new Array();
                for(var i=0;i<colorLegend.length;i++)
                {
                    isDisplays.push(false);
                }
            }
            else if(isAllDisplay&&allLegendDisplay)
            {
                isDisplays = new Array();
                for(var i=0;i<colorLegend.length;i++)
                {
                    isDisplays.push(true);
                }
            }
            var object = new Object();
            object.labelId = tempLimit;
            object.labels = labelTemp;
            return object;
        }
        function ClassifyLabelsFunction(type){
            var labels = new Array();
            if(type=="SupplyArea")
            {
                labels = pipeSupplyAreaLabels;
            }
            else if(type=="Flow")
            {
                labels = pipeFlowLimit;
            }
            else if(type=="Velocity")
            {
                labels = pipeVelocityLimit;
            }
            else if(type=="Slop")
            {
                labels = pipeSlopLimit;
            }
            else if(type=="Age")
            {
                labels = ageLimit;
            }
            return labels;
        }

        function LegendMain(type,fieldTemp){
            var legendData = {
            }
            var labels = new Array();
            var tempLimit = new Array();
            var labelsParameter = new Array();
            var object = new Object();
            object = ClassifyFunction(type);
            tempLimit = object.labelId;
            labelsParameter = object.labels;//ClassifyLabelsFunction(type);
            labels = GetLegendLabelsMain(type,tempLimit,labelsParameter)
            labelsAll = labels;
            legendData.ListLegend = labels;
            legendData.Type =  isCompare?compreType:type;
            legendData.Big = "true";
            legendData.Small = "true";
            legendData.Field = EventTypeMain=="PlanTempCalculate"?"PlanCalTemp":fieldTemp;
            legendData.Time1 = isCompare?timeMyMain1:timeMyMain;
            legendData.Time2 = isCompare?timeMyMain2:"";
            legendData.PlanId = "";
            legendData.TableName = tableNameMain;
            console.log(legendData)
            GetLegendPIpeLengthData(legendData);
        }

        /**
         * 模拟计算管道的图例
         */
        function LegendMainPlanTempCalPipe()
        {
            colorLegend = pressureChangColor;
            if(isDisplays.length==0)
            isDisplays = pressureChangeIsDisplay.slice(0)
            //legendNamePipe = "流量变化(m³/h)";
            var legendData = new Object();
            var flowLimit = GetLegendPressureChangeLabels(planTempCalFlowLimit);
            var velocityLimit = GetLegendPressureChangeLabels(planTempCalVelocityLimit);
            labelsAll = flowLimit.slice(0);
            legendData.ListLegendFlow = flowLimit;
            legendData.ListLegendVelocity = velocityLimit;
            legendData.Field = 'cal';
            legendData.FlowBig = true;
            legendData.FlowSmall = true;
            legendData.VelocityBig = true;
            legendData.VelocitySmall = true;
            legendData.TableName = tableNameMain;
            GetLegendCalPipeLengthData(legendData)

        }

        function GetLegendCalPipeLengthData(legendData){
            var urlTemp = urlClass.axiosUrl+"LegendGetCalPipeLength";
            axios.post(
                urlTemp,
                JSON.stringify(legendData),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(GetLegendCalPipeLengthDataReturn)
        }

        var planCalTempFlowLegendList = new Array();
        var planCalTempVelocityLegendList = new Array();
        var allPipeLengthPipeVelocity = 0;
        function GetLegendCalPipeLengthDataReturn(respone){
            var data = respone.data;
            var flowLegendList = data.ListLegendFlow;
            var velocityLegendList = data.ListLegendVelocity;
            var objTemp = new Object();
            itemType = 'flow';
            objTemp = GetLegendDisplayData(flowLegendList,selectTypeMain) 
            var objTempVelocity = new Object();
            itemType = 'velocity';
            objTempVelocity = GetLegendDisplayData(velocityLegendList,selectTypeMain) 
            planCalTempFlowLegendList = objTemp.legendList;
            allPipeLengthPipe = objTemp.AllPipelength;
            allPipeLengthPipeVelocity = objTempVelocity.AllPipelength;
            planCalTempVelocityLegendList = objTempVelocity.legendList;
            itemType = 'calNode';
            LegendMain("PlanCalTemp","");
        }
        /**
         * 绘制管道
         * @param {*} re 查询返回的对象  
         */
        function pipeFlow(re) {
            if(selectTypeMain=='Flow')
            {
                //isDisplays = (pipeFlowIsDisplay);
                if(isDisplays.length==0)
                isDisplays = global.pipeFlowIsDisplay.slice(0)
                DrawPipeMain(re,pipeFlowLimit,pipeFlowColor,pipeFlowWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='Velocity')
            {
                if(isDisplays.length==0)
                isDisplays = pipeVelocityIsDisplay.slice(0)//pipeVelocityIsDisplay.slice(0);
                DrawPipeMain(re,pipeVelocityLimit,pipeVelocityColor,pipeVelocityWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='Slop')
            {
                if(isDisplays.length==0)
                isDisplays = pipeSlopIsDisplay.slice(0)//pipeSlopIsDisplay.slice(0);
                DrawPipeMain(re,pipeSlopLimit,pipeSlopColor,pipeSlopWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='PipeAge')
            {
                if(isDisplays.length==0)
                isDisplays = pipeAgeIsDisplay.slice(0)//pipeAgeIsDisplay.slice(0);
                DrawPipeMainPipeAge(re,pipeAgeLimit,pipeAgeColor,pipeAgeWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='Diameter')
            {
                if(isDisplays.length==0)
                isDisplays = pipeSlopIsDisplay.slice(0)//pipeSlopIsDisplay.slice(0);
                DrawPipeMain(re,pipeDiameterLimit,pipeDiameterColor,pipeDiameterWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='SupplyArea')
            {
                if(isDisplays.length==0)
                isDisplays = pipeSupplyAreaIsDisplay.slice(0)//pipeSupplyAreaIsDisplay.slice(0);
                DrawPipePhysicalMain(re,pipeSupplyAreaLimit,pipeSupplyAreaColor,pipeSupplyAreaWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='Material')
            {
                if(isDisplays.length==0)
                isDisplays = pipeMaterialIsDisplay.slice(0)//pipeMaterialIsDisplay.slice(0);
                DrawPipePhysicalMain(re,pipeMaterialLimit,pipeMaterialColor,pipeMaterialWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=='Age')
            {
                if(isDisplays.length==0)
                isDisplays = ageIsDisplay.slice(0)//ageIsDisplay.slice(0);
                DrawPipeMain(re,ageLimit,ageColor,ageWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=="FlowChangeCount")
            {
                if(isDisplays.length==0)
                isDisplays = directionChangeCountIsDisplay.slice(0)//directionChangeCountIsDisplay.slice(0);
                DrawPipeDirectionChangeMain(re,directionChangeLimit,directionChangeColor,directionChangeWidth,'Direction_Change_','Result_Flow_',isDisplays);
            }
            else if(selectTypeMain=="PipeStatus")
            {
                if(isDisplays.length==0)
                isDisplays = pipeStopWaterIsDisplay.slice(0)//pipeStopWaterIsDisplay.slice(0);
                DrawPipePhysicalMain(re,pipeStopWaterLimit,pipeStopWaterColor,pipeStopWaterWidth,'pipe',isDisplays);
            }
            else if(selectTypeMain=="SupplyAreaCompare")
            {
                if(isDisplays.length==0)
                isDisplays = pipeSupplyAreaIsDisplay.slice(0)//pipeSupplyAreaIsDisplay.slice(0);
                DrawPipePhysicalMain(re,pipeSupplyAreaLimit,pipeSupplyAreaColor,pipeSupplyCompareAreaWidth,'pipe',isDisplays);
            }
                
        }
        /**
         * 节点绘制
         * @param {*} re 查询返回对象 
         */
        function JunctionPressure(re) {
            if(selectTypeMain=='Pressure')
            {
                if(isDisplays.length==0)
                isDisplays = pressureIsDisplay.slice(0)
                DrawJunctionMain(re,pressureLimit,pressureColor,pressureWidth,'junction',isDisplays);
            }
            else if(selectTypeMain=='HydraulicGrade')
            {
                if(isDisplays.length==0)
                isDisplays = headIsDisplay.slice(0)
                DrawJunctionMain(re,headLimit,headColor,headWidth,'junction',isDisplays);
            }
            else if(selectTypeMain=='Demand')
            {
                if(isDisplays.length==0)
                isDisplays = demandIsDisplay.slice(0)
                DrawJunctionMain(re,demandLimit,demandColor,demandWidth,'junction',isDisplays);
            }
        }

        /**
         * 压力波动绘图
         * @param {*} whereTemp 调用后台接口的函数名称 
         */
        function GetPressureChangeData(whereTemp){
            isUpAndDown = false;
            var extentTemp = map.extent;
          /*   axios.get(urlClass.axiosUrl+'GetPressureChangeData/'+whereTemp+'/'+extentTemp.xmin+'/'+extentTemp.ymin+'/'+extentTemp.xmax+'/'+extentTemp.ymax)
            .then(function(response){
                var objTemp = response.data;
                var obj = objTemp[0];
                DrawPressureChange(obj.ChangeMin,obj.ChangeMax,obj.List,pressureChangeLevel,pressureChangColor);
            }) */
            var parameter = new Object();
            parameter.MaxDiameter = whereTemp;
            parameter.MinX = extentTemp.xmin;
            parameter.MinY = extentTemp.ymin;
            parameter.MaxX = extentTemp.xmax;
            parameter.MaxY = extentTemp.ymax;
            axios.post(
                urlClass.axiosUrl+'GetPressureChangeData',
                JSON.stringify(parameter),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(function(response){
                var objTemp = response.data;
                var obj = objTemp[0];
                if(isDisplays.length==0)
                isDisplays = pressureChangeIsDisplay.slice(0);
                var limitTemp = DrawPressureChange(obj.ChangeMin,obj.ChangeMax,obj.List,pressureChangeLevel,pressureChangColor,isDisplays);
                pressureChangLimit = limitTemp.slice(0)
                LegendDisplayMain(selectTypeMain,timeMyMain);
            }) 
        }

        var pressureChangeLevel = 5;
        /**
         * 压力波动绘图主函数
         * @param {*} min 压力波动最小值
         * @param {*} max 压力波动最大值
         * @param {*} allData 后台返回压力波动的数据
         */
        function DrawPressureChange(min,max,allData,levelTemp,colorTemp,isDisplaysTemp){
            //pressureChangLimit = new Array();
            var limitsTemp = new Array();
           for(var i=0;i<allData.length;i++)
           {
               var obj = allData[i];
               var Plusminus = 0;
               if(isCompare)
                Plusminus = obj.Plusminus;
                var returnObject = new Object();
               returnObject = GetLevel(Number(min),Number(max),Number(obj.Change),Number(levelTemp),i);
               if(i==0)
               limitsTemp = returnObject.limitsTemp;
               var level = returnObject.result;
              
               if(isDisplaysTemp[level-1])
               {
                    var point = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: 102113 }));
                    var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
                    markerSymbol.setOutline(null);//边框 
                    var widthTemp = 0;
                    var isDrawTemp = false;
                    if(isCompare)
                    {
                        if(Plusminus=="0"&&drawSmall)
                        {
                            widthTemp = 4;
                            isDrawTemp = true;
                        }
                        else if(Plusminus=="1"&&drawBig)
                        {
                            widthTemp = 6;
                            isDrawTemp = true;
                        }
                    }
                    else
                    {
                        widthTemp = 6;
                        isDrawTemp = true;
                    }
                    if(isDrawTemp)
                    {
                        markerSymbol.setSize(widthTemp);//大小
                        markerSymbol.setColor(new esri.Color(colorTemp[level-1]));//颜色
                        var gra1 = new esri.Graphic(point, markerSymbol);  
                        compareResultLayer.add(gra1);  
                        
                    }
               }
           }
           return limitsTemp;
        }
        /**
         * 模拟计算管道流量变化的区间值
         */
        var planTempCalFlowLimit = new Array();
        /**
         * 模拟计算管道流速变化的区间值
         */
        var planTempCalVelocityLimit = new Array();
        /**
         * 选择绘制模拟计算的管道的类型(流量或者流速)
         */
        var planTempCalDrawPipeType = "";
        function DrawPipeFlowChange(min,max,allData,levelTemp,colorTemp,typeTemp,isDisplaysTemp){
            //pressureChangLimit = new Array();
            var limitsTemp = new Array();
            for(var i=0;i<allData.length;i++)
            {
                var obj = allData[i];
                //var level = GetLevel(Number(min),Number(max),Number(obj.Flow),Number(levelTemp),i,limitsTemp);
                var returnObject = new Object();
                returnObject = GetLevel(Number(min),Number(max),Number(obj.Change),Number(levelTemp),i);
                var level = returnObject.result;
                if(i==0)
                limitsTemp = returnObject.limitsTemp;
                var path = new Array();
                var pointTemp;
                var Plusminus = obj.Plusminus;
                for(var j=0;j<obj.Coordinate.length;j++)
                {
                    var objTemp = obj.Coordinate[j];
                    var pathTemp = new Array();
                    pathTemp.push(objTemp.X)
                    pathTemp.push(objTemp.Y)
                    path.push(pathTemp);
                    pointTemp = point;
                }
                var pathMain = new Array();
                pathMain.push(path);
                var line = new esri.geometry.Polyline({
                    "paths":[],
                    "spatialReference": { "wkid": 102113 }
                });
                line.paths = pathMain;
                var markerSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
                var widthTemp = 0;
                var isDrawTemp = false;
                if(isCompare)
                {
                    if(Plusminus=="0"&&drawSmall)
                    {
                        widthTemp = 4;
                        isDrawTemp = true;
                    }
                    else if(Plusminus=="1"&&drawBig)
                    {
                        widthTemp = 6;
                        isDrawTemp = true;
                    }
                }
                else
                {
                    widthTemp = 6;
                    isDrawTemp = true;
                }
                if(isDrawTemp)
                {
                    markerSymbol.setWidth(widthTemp);//大小
                    markerSymbol.setColor(new esri.Color(colorTemp[level-1]));//颜色
                    var gra1 = new esri.Graphic(line, markerSymbol); 
                    if(typeTemp==""&&isDisplaysTemp[level-1]) 
                    {
                        compareResultLayer.add(gra1);  
                    }
                    else if(typeTemp=="flow"&&planCalPipeFlowIsDisplays[level-1])
                        planCalResultFlowLayer.add(gra1);
                    else if(typeTemp=="velocity"&&planCalPipeVelocityIsDisplays[level-1])
                        planCalResultVelocityLayer.add(gra1);
                }
               
            }
            return limitsTemp;
         }
         var myCount = 0;
        /**
         * 获取画图所在的等级
         * @param {*} min 最小值
         * @param {*} max 最大值
         * @param {*} value 属性值
         */
        function GetLevel(min,max,value,levelTemp,indexTemp){
            var returnObject = new Object();
            var limitsTemp = new Array();
            var temp = (max-min)/Number(levelTemp);
            var result;
            var maxTemp;
            var minTemp;
            for(var i=1;i<=levelTemp;i++)
            {
                value = Math.abs(value);
                maxTemp = i*temp+min;
                minTemp = (i-1)*temp+min;
                if(value>=minTemp&&value<=maxTemp)
                {
                    result = i;
                }
                if((selectTypeMain=="PressureChange"||isCompare||EventTypeMain=="PlanTempCalculate")&&indexTemp==0)
                {

                    limitsTemp.push(minTemp.toFixed(2));
                }
            }
            if((selectTypeMain=="PressureChange"||isCompare||EventTypeMain=="PlanTempCalculate")&&indexTemp==0)
            limitsTemp.push(maxTemp.toFixed(2));
            returnObject.result = result;
            returnObject.limitsTemp = limitsTemp;
            return returnObject;
        }

        /* var xmlDom=createXMLDom();
        xmlDom.load("MyConfig.xml");
        //获得根节点
        var root=xmlDom.documentElement;
        var data="";
        var legend=root.getElementsByTagName("legend");
        var flow=legend.getElementsByTagName("flow");
        var len=flow.length;
        for(var i=0;i<len;i++) {
        
        }
        alert(len);

        function createXMLDom(){
            if (window.ActiveXObject) 
             var xmldoc=new ActiveXObject("Microsoft.XMLDOM");
            else
             if (document.implementation&&document.implementation.createDocument)
              var xmldoc=document.implementation.createDocument("","doc",null);
            xmldoc.async = false;
            //为了和FireFox一至，这里不能改为False;
            xmldoc.preserveWhiteSpace=true;
            return xmldoc;
          }
 */
        
     }

}

export default new Methods()
