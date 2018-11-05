import urlClass from './UrlClass'
import axios from 'axios'
import global from './Global'
import PictureProperty from '@/components/js/PipeBurst/PictureProperty'
class Methods {
    DropPlanTable(tableNameTemp) {
        if (tableNameTemp != "") {
            axios.get(urlClass.axiosUrl + "DropPlanTable" + "/" + tableNameTemp)
                .then(function (response) {
                })
        }
    }
    /**
     * 在外部js中调用该方法(测试)
     * @param {*} layer GraphicLayer
     */
    AddGraphic(layer) {
        var point = new esri.geometry.Point(498766.6875, 321263.46875, new esri.SpatialReference({ wkid: global.spatialReference }));
        var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol('../../../static/assets/dingwei_03.png', 98, 98);
        var gra1 = new esri.Graphic(point, pictureMarkerSymbol);
        layer.add(gra1)
    }


    /**
     * 获取画图所在的等级
     * @param {*} min 最小值
     * @param {*} max 最大值
     * @param {*} value 属性值
     * @param {*} selectTypeMain 专题图类型
     * @param {*} isCompare 是否是在进行时间对比
     * @param {*} EventTypeMain 事件类型
     */
    GetLevel(min, max, value, levelTemp, indexTemp, selectTypeMain, isCompare, EventTypeMain) {
        var returnObject = new Object();
        var limitsTemp = new Array();
        var temp = (max - min) / Number(levelTemp);
        var result;
        var maxTemp;
        var minTemp;
        for (var i = 1; i <= levelTemp; i++) {
            value = Math.abs(value);
            maxTemp = i * temp + min;
            minTemp = (i - 1) * temp + min;
            if (value >= minTemp && value <= maxTemp) {
                result = i;
            }
            if ((selectTypeMain == "PressureChange" || isCompare || EventTypeMain == "PlanTempCalculate"||EventTypeMain == "Diffusion") && indexTemp == 0) {

                limitsTemp.push(minTemp.toFixed(2));
            }
        }
        if ((selectTypeMain == "PressureChange" || isCompare || EventTypeMain == "PlanTempCalculate"||EventTypeMain == "Diffusion") && indexTemp == 0)
            limitsTemp.push(maxTemp.toFixed(2));
        returnObject.result = result;
        returnObject.limitsTemp = limitsTemp;
        return returnObject;
    }


    /**
     * 画点
     * @param {*} width 尺寸
     * @param {*} color 颜色
     * @param {*} point 位置
     */
    DrawPointGraphic(width, color, point,attribute=null) {
        var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
        markerSymbol.setOutline(null);//边框 
        markerSymbol.setSize(width);//大小
        markerSymbol.setColor(new esri.Color(color));//颜色
        var gra1 = new esri.Graphic(point, markerSymbol,attribute);
        return gra1;
    }


    DrawHeatMap(featureLayer,dataPoint,map){
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
          featureLayer = new esri.layers.FeatureLayer(featureCollection, {
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            opacity: 1
          });
      
          var heatmapRenderer = new esri.renderer.HeatmapRenderer({
            colors: ["rgba(255, 0, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"],
            blurRadius: 8,
            maxPixelIntensity: 230,
            minPixelIntensity: 10
          });
          featureLayer.setRenderer(heatmapRenderer);
          console.log(dataPoint)
          for(var i=0;i<dataPoint.length;i++)
          {
             var point = new esri.geometry.Point(Number(dataPoint[i].X), Number(dataPoint[i].Y), 
                 new esri.SpatialReference({wkid: global.spatialReference}));
              featureLayer.add(new esri.Graphic(point));
          }
          map.addLayer(featureLayer);
          return featureLayer;
    }

    /**
     * 画线
     * @param {*} width 宽度
     * @param {*} color 颜色
     * @param {*} geometry 坐标信息SimpleLineSymbol  .SimpleLineSymbol.STYLE_SOLID
     */
    DrawLineGraphic(width, color, geometry) {
        var markerSymbol = new esri.symbol.CartographicLineSymbol(esri.symbol.CartographicLineSymbol.STYLE_SOLID);
        markerSymbol.setWidth(width);//大小
        markerSymbol.setColor(new esri.Color(color));//颜色
        markerSymbol.setCap(esri.symbol.CartographicLineSymbol.CAP_ROUND);//结束的地方为圆形
        var gra1 = new esri.Graphic(geometry, markerSymbol);
        return gra1;
    }


    DrawAccuracyMonitor(data,layer,map,mapObj,dialog){
        dialog.startup();
        for(var i=0;i<data.length;i++){
            var obj = Object.assign({},data[i])//data[i]
            var point = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: global.spatialReference }));
            var level = obj.Level;
            var gra1;
            if(level=="-1")
            {
                gra1 = this.DrawPointGraphic(12,"#ff0000",point,obj)
                layer.add(gra1)
                gra1 = this.DrawPointGraphic(9,"#ffff00",point,obj)
                
            }
            else if(level=="1")
            {
                gra1 = this.DrawPointGraphic(12,"#0000ff",point,obj)
            }
            else if(level=="2")
            {
                gra1 = this.DrawPointGraphic(12,"#00ff00",point,obj)
            }
            else if(level=="3")
            {
                gra1 = this.DrawPointGraphic(12,"#ff0000",point,obj)
            }
            layer.add(gra1)
        }
        layer.on("mouse-out", closeDialog);
        layer.on("mouse-over", function(evt){
            var obj = evt.graphic.attributes;
              var t = "<b>"+obj.Name+"</b><hr><b>实测值: </b>"+obj.MonitorValue+"<br>"
            + "<b>模拟值: </b>"+obj.CalValue+"<br>"
            + "<b>差值: </b>"+obj.DelValue+"<br>"; 
            dialog.setContent(t);
            mapObj.domStyle.set(dialog.domNode, "opacity", 0.85);
            mapObj.popup.open({
                popup: dialog,
                x: evt.pageX,
                y: evt.pageY
            });
        })
        
        function closeDialog() {
            mapObj.popup.close(dialog);
          }
    }

    DrawPressureControlNode(data,layer,map,mapObj,dialog){
        dialog.startup();
        var listDataTemp = data.pressPointList;
        var listDataTempCtr = data.pressCtrlList;
        for(var i=0;i<listDataTemp.length;i++)
        {
            var obj = listDataTemp[i];
            var pointTemp = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: global.spatialReference }));
            var picture = '';
            if(listDataTempCtr.indexOf(obj)>=0)
            {
                picture = Object.assign({},PictureProperty.redNodePin) ;//在控制点列表中为红色标记
            }
            else
                picture = Object.assign({},PictureProperty.blueNodePin);//不在控制点列表中为蓝色标记
            var gra1 = this.CreatePictureGraphic(picture,pointTemp,obj)
            layer.add(gra1);
        }
            
        layer.on("mouse-out", closeDialog);
        layer.on("mouse-over", function(evt){
            var obj = evt.graphic.attributes;
              var t = "<b>名称:"+obj.PressureName+"</b><hr><b>压力(MPa): </b>"+obj.CtPressure+"<br>"
            + "<b>控制压力(MPa): </b>"+obj.CroPressure+"<br>";
            dialog.setContent(t);
            mapObj.domStyle.set(dialog.domNode, "opacity", 0.85);
            mapObj.popup.open({
                popup: dialog,
                x: evt.pageX,
                y: evt.pageY
            });
        })
        
        function closeDialog() {
            mapObj.popup.close(dialog);
          }
    }

    /**
     * 绘制三角形
     * @param {*} pProperty 
     * @param {*} angle 
     * @param {*} geometry 
     * @param {*} attributes 
     */
    CreateSVGGraphic(pProperty,angle, geometry, attributes = null) {
        var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
        markerSymbol.setPath(pProperty.iconPath);
        markerSymbol.setColor(pProperty.color);
        markerSymbol.setSize(pProperty.size)
        markerSymbol.setAngle(angle);
        markerSymbol.setOutline(null);
        var gra1 = new esri.Graphic(geometry, markerSymbol, attributes);
        return gra1;
    }

    /**
    * 节点画图的主函数
    * @param {*} re 查询返回的对象
    * @param {*} limits 分级
    * @param {*} colors 颜色分级
    * @param {*} widths 线的宽度
    * @param {*} typeTemp 类型
    * @param {*} isDisplaysTemp 是否显示的数组
    * @param {*} layer 需要画图的图层(GraphicLayer)
    */
    DrawJunctionMain(re, limits, colors, widths, typeTemp, isDisplaysTemp, layer, field) {
        var result = new Array();
        for (var i = 0; i < re.features.length; i++) {
            var feature = re.features[i];
            var attribute = feature.attributes[field];
            if (true) {
                for (var j = 0; j < limits.length; j++) {
                    if (j == 0) {
                        if (attribute < limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawPointGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1)
                        }
                    }
                    else if (j == limits.length - 1) {
                        if (attribute > limits[j] && isDisplaysTemp[isDisplaysTemp.length - 1]) {
                            var gra1 = this.DrawPointGraphic(widths[widths.length - 1], colors[colors.length - 1], feature.geometry);
                            layer.add(gra1)
                        }
                        else if (attribute > limits[j - 1] && attribute < limits[j] && isDisplaysTemp[isDisplaysTemp.length - 2]) {
                            var gra1 = this.DrawPointGraphic(widths[widths.length - 2], colors[colors.length - 2], feature.geometry);
                            layer.add(gra1)
                        }
                    }
                    else {
                        if (attribute > limits[j - 1] && attribute < limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawPointGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1)
                        }
                    }
                }
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
    * @param {*} isDisplaysTemp 是否显示的数组
    * @param {*} layer 需要画图的图层(GraphicLayer)
    * @param {*} field 字段
    */
    DrawPipeMain(re, limits, colors, widths, typeTemp, isDisplaysTemp, layer, field) {
        for (var i = 0; i < re.features.length; i++) {
            var feature = re.features[i];
            var attribute = feature.attributes[field];
            if (true) {
                for (var j = 0; j < limits.length; j++) {
                    if (j == 0) {
                        if (attribute < limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                    else if (j == limits.length - 1) {
                        if (attribute > limits[j] && isDisplaysTemp[isDisplaysTemp.length - 1]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 1], colors[colors.length - 1], feature.geometry);
                            layer.add(gra1);
                        }
                        else if (attribute > limits[j - 1] && attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 2], colors[colors.length - 2], feature.geometry);
                            layer.add(gra1);
                        }
                        else if (attribute = '' && isDisplaysTemp[isDisplaysTemp.length - 1]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 1], colors[colors.length - 1], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                    else {
                        if (attribute > limits[j - 1] && attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                }
            }
        }
    }

    /**
     * 绘制管龄主函数
     * @param {*} re 查询返回的对象
     * @param {*} limits 分级
     * @param {*} colors 颜色分级
     * @param {*} widths 线的宽度
     * @param {*} typeTemp 类型
     * @param {*} isDisplaysTemp 是否显示的数组
     * @param {*} layer 需要画图的图层(GraphicLayer)
     * @param {*} field 字段
     */
    DrawPipeMainPipeAge(re, limits, colors, widths, typeTemp, isDisplaysTemp, layer, field) {
        for (var i = 0; i < re.features.length; i++) {
            var feature = re.features[i];
            var attribute = feature.attributes[field];
            if (true) {
                for (var j = 0; j < limits.length; j++) {
                    if (j == 0) {
                        if (attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                    else if (j == limits.length - 1) {
                        if (attribute==null && isDisplaysTemp[isDisplaysTemp.length - 1]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 1], colors[colors.length - 1], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                    else if (j == limits.length - 2) {
                        if (attribute > limits[j] && isDisplaysTemp[isDisplaysTemp.length - 2]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 2], colors[colors.length - 2], feature.geometry);
                            layer.add(gra1);
                        }
                        else if (attribute > limits[j - 1] && attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 3], colors[colors.length - 3], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                    else {
                        if (attribute > limits[j - 1] && attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                }
            }

        }
    }

    /**
     * 绘制管道物理量
     * @param {*} geometry 坐标信息
     * @param {*} attribute 物理量的属性值
     * @param {*} limits 分级信息
     * @param {*} colors 颜色信息
     * @param {*} widths 宽度信息
     * @param {*} isDisplaysTemp 是否显示的数组
     * @param {*} layer 需要画图的图层(GraphicLayer)
     */
    DrawMainPipePhysicalMain(geometry, attribute, limits, colors, widths, isDisplaysTemp, layer) {
        for (var j = 0; j < limits.length; j++) {
            if (attribute == limits[j] && isDisplaysTemp[j]) {
                var gra1 = this.DrawLineGraphic(widths[j], colors[j], geometry);
                layer.add(gra1);
            }
        }
    }

    /**
     * 创建一个图片的graphic
     * @param {*} pProperty 
     * @param {*} geometry 
     */
    CreatePictureGraphic(pProperty, geometry, attributes = null){
        var markerSymbol = new esri.symbol.PictureMarkerSymbol(pProperty.url, pProperty.width, pProperty.height);
        markerSymbol.setOffset(pProperty.xoffset, pProperty.yoffset);
        markerSymbol.setAngle(pProperty.angle);
        if (pProperty.color != '') markerSymbol.setColor(pProperty.color);
        var gra1 = new esri.Graphic(geometry, markerSymbol, attributes);
        return gra1;
    }

    /**
     * 绘制供水分界线对比图中供水分界线变化的管道
     * @param {*} changeData 供水分界线变化的管道信息
     * @param {*} limits 分级信息
     * @param {*} colors 颜色信息
     * @param {*} widths 宽度信息
     * @param {*} isDisplaysTemp 是否绘制数组
     * @param {*} layer 需要画图的图层(GraphicLayer)
     */
    DrawSupplyAreaCompare(changeData, limits, colors, widths, isDisplaysTemp, layer) {
        for (var i = 0; i < changeData.length; i++) {
            var feature = changeData[i];
            var attribute = feature.SupplyAreaIdO;
            var path = new Array();
            for (var j = 0; j < feature.Coordinate.length; j++) {
                var objTemp = feature.Coordinate[j];
                var pathTemp = new Array();
                pathTemp.push(objTemp.X)
                pathTemp.push(objTemp.Y)
                path.push(pathTemp);
            }
            var pathMain = new Array();
            pathMain.push(path);
            var line = new esri.geometry.Polyline({
                "paths": [],
                "spatialReference": { "wkid": global.spatialReference }
            });
            line.paths = pathMain;
            this.DrawMainPipePhysicalMain(line, attribute, limits, colors, widths, isDisplaysTemp, layer);
        }
    }

    /**
         * 管道基础属性画图的主函数
         * @param {*} re 查询返回的对象
         * @param {*} limits 分级
         * @param {*} colors 颜色分级
         * @param {*} widths 线的宽度
         * @param {*} typeTemp 类型
         * @param {*} isDisplaysTemp 是否绘制 数组
         * @param {*} layer 需要画图的图层(GraphicLayer)
         * @param {*} field 字段名
         */
    DrawPipePhysicalMain(re, limits, colors, widths, typeTemp, isDisplaysTemp, layer, field) {
        for (var i = 0; i < re.features.length; i++) {
            var feature = re.features[i];
            var attribute = feature.attributes[field];
            this.DrawMainPipePhysicalMain(feature.geometry, attribute, limits, colors, widths, isDisplaysTemp, layer);
        }
    }

    /**
     * 压力波动绘图主函数
     * @param {*} min 压力波动最小值
     * @param {*} max 压力波动最大值
     * @param {*} allData 后台返回压力波动的数据
     * @param {*} levelTemp 所分等级数
     * @param {*} colorTemp 颜色信息
     * @param {*} isDisplaysTemp 是否绘制 数组
     * @param {*} layer 需要画图的图层(GraphicLayer)
     * @param {*} isCompare 是否是对比
     * @param {*} selectTypeMain 图层类型
     * @param {*} EventTypeMain 事件类型
     * @param {*} drawBig 是否绘制结果增大的值
     * @param {*} drawSmall 是否绘制结果减小的值
     * @param {return} limitsTemp 分级信息(返回值)
     */
    DrawPressureChange(min, max, allData, levelTemp, colorTemp, isDisplaysTemp, layer, isCompare, selectTypeMain, EventTypeMain, drawBig, drawSmall) {
        var limitsTemp = new Array();
        for (var i = 0; i < allData.length; i++) {
            var obj = allData[i];
            var Plusminus = 0;
            if (isCompare)
                Plusminus = obj.Plusminus;
            var returnObject = new Object();
            returnObject = this.GetLevel(Number(min), Number(max), Number(obj.Change), Number(levelTemp), i, selectTypeMain, isCompare, EventTypeMain);
            if (i == 0)
                limitsTemp = returnObject.limitsTemp;
            var level = returnObject.result;
            if (isDisplaysTemp[level - 1]) {
                var point = esri.geometry.Point(obj.X,obj.Y,new esri.SpatialReference({ wkid: global.spatialReference }));
                var widthTemp = 0;
                var isDrawTemp = false;
                if (isCompare) {
                    if (Plusminus == "0" && drawSmall) {
                        widthTemp = 4;
                        isDrawTemp = true;
                    }
                    else if (Plusminus == "1" && drawBig) {
                        widthTemp = 6;
                        isDrawTemp = true;
                    }
                }
                else {
                    widthTemp = 6;
                    isDrawTemp = true;
                }
                if (isDrawTemp) {
                    var gra1 = this.DrawPointGraphic(widthTemp, colorTemp[level - 1], point);
                    layer.add(gra1);
                }
            }
        }
        return limitsTemp;
    }


    /**
   * 绘制管道结果变化之
   * @param {*} min 管道结果变化最小值
   * @param {*} max 管道结果变化最大值
   * @param {*} allData 后台返回管道结果变化的数据
   * @param {*} levelTemp 所分等级数
   * @param {*} colorTemp 颜色信息
   * @param {*} isDisplaysTemp 是否绘制 数组
   * @param {*} layer 需要画图的图层(GraphicLayer)
   * @param {*} isCompare 是否是对比
   * @param {*} selectTypeMain 图层类型
   * @param {*} EventTypeMain 事件类型
   * @param {*} drawBig 是否绘制结果增大的值
   * @param {*} drawSmall 是否绘制结果减小的值
   * @return {*} limitsTemp 分级信息(返回值)
   */
    DrawPipeFlowChange(min, max, allData, levelTemp, colorTemp, isDisplaysTemp, layer, isCompare, selectTypeMain, EventTypeMain, drawBig, drawSmall) {
        var limitsTemp = new Array();
        for (var i = 0; i < allData.length; i++) {
            var obj = allData[i];
            var returnObject = new Object();
            var changeData = 0;
            if(EventTypeMain=="Diffusion")
            changeData = Number(obj.PassTime);
            else
            changeData = Number(obj.Change);
            returnObject = this.GetLevel(Number(min), Number(max), changeData, Number(levelTemp), 
                                i,selectTypeMain,isCompare,EventTypeMain);
            
            var level = returnObject.result;
            if (i == 0)
            {
                limitsTemp = returnObject.limitsTemp;
            }
            var path = new Array();
            var Plusminus = obj.Plusminus;
            for (var j = 0; j < obj.Coordinate.length; j++) {
                var objTemp = obj.Coordinate[j];
                var pathTemp = new Array();
                pathTemp.push(objTemp.X)
                pathTemp.push(objTemp.Y)
                path.push(pathTemp);
            }
            var pathMain = new Array();
            pathMain.push(path);
            var line = new esri.geometry.Polyline({
                "paths": [],
                "spatialReference": { "wkid": global.spatialReference }
            });
            line.paths = pathMain;
            var widthTemp = 0;
            var isDrawTemp = false;
            if (isDisplaysTemp[level - 1]) {
                if (isCompare) {
                    if (Plusminus == "0" && drawSmall) {
                        widthTemp = 4;
                        isDrawTemp = true;
                    }
                    else if (Plusminus == "1" && drawBig) {
                        widthTemp = 6;
                        isDrawTemp = true;
                    }
                }
                else {
                    widthTemp = 6;
                    isDrawTemp = true;
                }
                if (isDrawTemp) {
                    console.log("画图")
                    var gra1 = this.DrawLineGraphic(widthTemp, colorTemp[level - 1], line);
                    layer.add(gra1)
                }
            }
        }
        return limitsTemp;
    }

    /**
     * 在地图上标记指针
     * @param {*} pointTemp 扎针的位置
     * @param {*} imgSource 图片的路径
     * @param {*} layer 添加的图层
     * @param {*} width 图片宽度
     * @param {*} height 图片高度
     */
    PositionPointer(pointTemp, imgSource, layer, width, height) {
        layer.clear();
        var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(imgSource, width, height);
        var gra1 = new esri.Graphic(pointTemp, pictureMarkerSymbol);
        layer.add(gra1);
        layer.setVisibility(false);
    }

    /**
     * 向图层上添加单个阀门状态的图标
     * @param {*} pointTemp 地图上位置
     * @param {*} statusTemp 阀门状态
     * @param {*} layer 图层
     */
    DrawOneValveAttriute(pointTemp, statusTemp, layer) {
        var imageSource = "";
        if (statusTemp == "0")
            imageSource = urlClass.valveCloseSource;
        else
            imageSource = urlClass.valvePartCloseSource;
        var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(imageSource, 13, 13);
        var gra1 = new esri.Graphic(pointTemp, pictureMarkerSymbol);
        layer.add(gra1);
    }

    /**
     * 添加所有阀门状态的图标到阀门上
     * @param {*} allValveAtttibute 所有的阀门状态信息
     * @param {*} layer 图层
     */
    DrawValveAttribute(allValveAtttibute, layer) {
        layer.clear();
        for (var i = 0; i < allValveAtttibute.length; i++) {
            var obj = new Object();
            obj = allValveAtttibute[i];
            var statusTemp = obj.State;
            var pointTemp = esri.geometry.Point(obj.X, obj.Y, new esri.SpatialReference({ wkid: global.spatialReference }));
            this.DrawOneValveAttriute(pointTemp, statusTemp, layer);
        }
    }

    /**
     * 调后台接口获取所有阀门的状态
     */
    ValveAttributeFunction() {
        axios.get(urlClass.axiosUrl + "GetAllValveStates")
            .then(function (response) {
                DrawValveAttribute(response.data);
            });
    }

    /**
     * 获取地图的初始坐标范围
     * @param {*} extentObject 
     */
    GetMapInitExtent(extentObject) {
        var initExtent = new esri.geometry.Extent(extentObject.minX, extentObject.minY, extentObject.maxX, extentObject.maxY,
            new esri.SpatialReference({ wkid: global.spatialReference }));
        return initExtent;
    }

    /**
     * 返回当前需要画图时的地图的范围
     * @param {*} map 地图
     * @return {*} mapExtentTemp 地图范围
     */
    GetDrawMapExtent(map) {
        var mapExtentTemp;
        if (map.getScale() <= global.myScale[1]) {
            mapExtentTemp = map.extent;
        }
        else {
            mapExtentTemp = this.GetMapInitExtent(global.initExtent);
        }
        return mapExtentTemp;
    }

    /**
    * 24小时管道流向变化的绘图主函数
    * @param {*} re 查询返回的对象
    * @param {*} limits 分级
    * @param {*} colors 颜色分级
    * @param {*} widths 线的宽度
    * @param {*} fieldTemp 流向变化字段
    * @param {*} fieldTemp1 流量字段
    * @param {*} isDisplaysTemp 是否显示数组
    * @param {*} layer 添加的图层
    */
    DrawPipeDirectionChangeMain(re, limits, colors, widths, fieldTemp, fieldTemp1, isDisplaysTemp, layer) {
        for (var i = 0; i < re.features.length; i++) {
            var feature = re.features[i];
            var count = 0;
            var sum = 0;
            for (var j = 0; j < 24; j++) {
                count += (feature.attributes[fieldTemp + j]);
                sum += Math.abs((feature.attributes[fieldTemp1 + j]));
            }
            if (sum < 0.0024) {
                continue;
            }
            var attribute = count;
            if (true) {
                for (var j = 0; j < limits.length; j++) {
                    if (j == 0) {
                        if (attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[j], colors[j], feature.geometry)//new esri.Graphic(feature.geometry, markerSymbol);  
                            layer.add(gra1);
                        }
                    }
                    else if (j == limits.length - 1) {
                        if (attribute > limits[j] && isDisplaysTemp[isDisplaysTemp.length - 1]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 1], colors[colors.length - 1], feature.geometry);
                            layer.add(gra1);
                        }
                        else if (attribute > limits[j - 1] && attribute <= limits[j] && isDisplaysTemp[isDisplaysTemp.length - 2]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 2], colors[colors.length - 2], feature.geometry);
                            layer.add(gra1);
                        }
                        else if (attribute = '' && isDisplaysTemp[isDisplaysTemp.length - 1]) {
                            var gra1 = this.DrawLineGraphic(widths[widths.length - 1], colors[colors.length - 1], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                    else {
                        if (attribute > limits[j - 1] && attribute <= limits[j] && isDisplaysTemp[j]) {
                            var gra1 = this.DrawLineGraphic(widths[j], colors[j], feature.geometry);
                            layer.add(gra1);
                        }
                    }
                }
            }

        }
    }


    /**
         * 获取查询条件中的查询字段
         * @param {*} typeTemp 元素类型(管道或者节点)
         */
         GetWhereType(typeTemp){
            if(typeTemp=='junction')
            return "MaxDiameter";
            else if(typeTemp=='pipe')
            return 'Physical_PipeDiameter';//return "Physical_PipeDiameter";
        }

        /**
         * 获取一般查询的条件
         * @param {*} typeTemp 元素类型(管道或者节点)
         */
        GetWhere(typeTemp,map){
            var whereTemp = "";
            for(var i=0;i<global.myScale.length;i++)
            {
                if(i==0)
                {
                    if(map.getScale()<=global.myScale[i])
                    {
                        whereTemp = '1=1';
                    }
                }
                else if(i==global.myScale.length-1)
                {
                    if(map.getScale()>global.myScale[i])
                    {
                        whereTemp = this.GetWhereType(typeTemp);
                        whereTemp+=('>='+global.myDiameter[i]);
                    }
                    else if(map.getScale()>global.myScale[i-1]&&map.getScale()<=global.myScale[i])
                    {
                        whereTemp = this.GetWhereType(typeTemp);
                        whereTemp+=('>='+global.myDiameter[i-1]);
                    }
                }
                else
                {
                    if(map.getScale()>global.myScale[i-1]&&map.getScale()<=global.myScale[i])
                    {
                        whereTemp = this.GetWhereType(typeTemp);
                        whereTemp+=('>='+global.myDiameter[i-1]);
                    }
                }
            }
            return whereTemp;
        }

    /**
    * 绘制管道
    * @param {*} re 查询返回的对象  
    * @param {*} selectTypeMain 专题图类型
    * @param {*} isDisplays 是否显示数组
    */
    pipeFlow(re, selectTypeMain, isDisplays, field, layer) {
        var returnIsDisplays = new Array();
        if (selectTypeMain == 'Flow') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeFlowIsDisplay.slice(0)
            this.DrawPipeMain(re, global.pipeFlowLimit, global.pipeFlowColor, global.pipeFlowWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'Velocity') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeVelocityIsDisplay.slice(0)//pipeVelocityIsDisplay.slice(0);
            this.DrawPipeMain(re, global.pipeVelocityLimit, global.pipeVelocityColor, global.pipeVelocityWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'Slop') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeSlopIsDisplay.slice(0)//pipeSlopIsDisplay.slice(0);
            this.DrawPipeMain(re, global.pipeSlopLimit, global.pipeSlopColor, global.pipeSlopWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'PipeAge') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeAgeIsDisplay.slice(0)//pipeAgeIsDisplay.slice(0);
            this.DrawPipeMainPipeAge(re, global.pipeAgeLimit, global.pipeAgeColor, global.pipeAgeWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'Diameter') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeSlopIsDisplay.slice(0)//pipeSlopIsDisplay.slice(0);
            this.DrawPipeMain(re, global.pipeDiameterLimit, global.pipeDiameterColor, global.pipeDiameterWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'SupplyArea') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeSupplyAreaIsDisplay.slice(0)//pipeSupplyAreaIsDisplay.slice(0);
            this.DrawPipePhysicalMain(re, global.pipeSupplyAreaLimit, global.pipeSupplyAreaColor, global.pipeSupplyAreaWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'Material') {
            if (isDisplays.length == 0)
                isDisplays = global.pipeMaterialIsDisplay.slice(0)//pipeMaterialIsDisplay.slice(0);
            this.DrawPipePhysicalMain(re, global.pipeMaterialLimit, global.pipeMaterialColor, global.pipeMaterialWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'Age') {
            if (isDisplays.length == 0)
                isDisplays = global.ageIsDisplay.slice(0)//ageIsDisplay.slice(0);
            this.DrawPipeMain(re, global.ageLimit, global.ageColor, global.ageWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == "FlowChangeCount") {
            if (isDisplays.length == 0)
                isDisplays = global.directionChangeCountIsDisplay.slice(0)//directionChangeCountIsDisplay.slice(0);
            this.DrawPipeDirectionChangeMain(re, global.directionChangeLimit, global.directionChangeColor, global.directionChangeWidth, 'Direction_Change_', 'Result_Flow_', isDisplays, layer);
        }
        else if (selectTypeMain == "PipeStatus") {
            if (isDisplays.length == 0)
                isDisplays = global.pipeStopWaterIsDisplay.slice(0)//pipeStopWaterIsDisplay.slice(0);
            this.DrawPipePhysicalMain(re, global.pipeStopWaterLimit, global.pipeStopWaterColor, global.pipeStopWaterWidth, 'pipe', isDisplays, layer, field);
        }
        else if (selectTypeMain == "SupplyAreaCompare") {
            if (isDisplays.length == 0)
                isDisplays = global.pipeSupplyAreaIsDisplay.slice(0)//pipeSupplyAreaIsDisplay.slice(0);
            this.DrawPipePhysicalMain(re, global.pipeSupplyAreaLimit, global.pipeSupplyAreaColor, global.pipeSupplyCompareAreaWidth, 'pipe', isDisplays, layer, field);
        }
        returnIsDisplays = isDisplays.slice(0);
        return returnIsDisplays;

    }


    /**
   * 节点绘制
   * @param {*} re 查询返回对象 
   */
    JunctionPressure(re, selectTypeMain, isDisplays, layer, field) {
        if (selectTypeMain == 'Pressure') {
            if (isDisplays.length == 0)
                isDisplays = global.pressureIsDisplay.slice(0)
            this.DrawJunctionMain(re, global.pressureLimit, global.pressureColor, global.pressureWidth, 'junction', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'HydraulicGrade') {
            if (isDisplays.length == 0)
                isDisplays = global.headIsDisplay.slice(0)
            this.DrawJunctionMain(re, global.headLimit, global.headColor, global.headWidth, 'junction', isDisplays, layer, field);
        }
        else if (selectTypeMain == 'Demand') {
            if (isDisplays.length == 0)
                isDisplays = global.demandIsDisplay.slice(0)
            this.DrawJunctionMain(re, global.demandLimit, global.demandColor, global.demandWidth, 'junction', isDisplays, layer, field);
        }
    }
}
export default new Methods()