import urlClass from '@/components/js/UrlClass'
import axios from 'axios'
import global from '@/components/js/Global'
import drawClass from '@/components/js/DrawClass'
import PictureProperty from './PictureProperty';
import WindowsEvent from "@/components/js/WindowsEvent";
class Methods {
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
            if (EventTypeMain == "Diffusion")
                changeData = Number(obj.PassTime);
            else
                changeData = Number(obj.Change);
            returnObject = this.GetLevel(Number(min), Number(max), changeData, Number(levelTemp),
                i, selectTypeMain, isCompare, EventTypeMain);

            var level = returnObject.result;
            if (i == 0) {
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

    DrawCloseValveBufferArea(allData,map,layer,geometryService) {

        var points = new Array();
        var minx = 0,miny = 0,maxx = 0,maxy = 0;
        console.log(layer);
        if (allData.ListPipe.length > 0){
            minx = allData.ListPipe[0].Coordinate[0].X;
            maxx = allData.ListPipe[0].Coordinate[0].X;
            miny = allData.ListPipe[0].Coordinate[0].Y;
            maxy = allData.ListPipe[0].Coordinate[0].Y;
        }
        for (var i = 0; i < allData.ListPipe.length; i++) {
            for (var j = 0; j < allData.ListPipe[i].Coordinate.length; j++) {
                var point = new esri.geometry.Point(allData.ListPipe[i].Coordinate[j].X, allData.ListPipe[i].Coordinate[j].Y, new esri.SpatialReference({ wkid: global.spatialReference }));
                points.push(point);
                if (minx > allData.ListPipe[i].Coordinate[j].X){
                    minx = allData.ListPipe[i].Coordinate[j].X;
                }
                else if (maxx < allData.ListPipe[i].Coordinate[j].X) {
                    maxx = allData.ListPipe[i].Coordinate[j].X;
                }
                if (miny > allData.ListPipe[i].Coordinate[j].Y) {
                    miny = allData.ListPipe[i].Coordinate[j].Y;
                }
                else if (maxy > allData.ListPipe[i].Coordinate[j].Y) {
                    maxy = allData.ListPipe[i].Coordinate[j].Y;
                }
            }
        }
/*         for (var i = 0; i < allData.ListReleasedPipes.length; i++) {
            for (var j = 0; j < allData.ListReleasedPipes[i].Coordinate.length; j++) {
                if (minx > allData.ListReleasedPipes[i].Coordinate[j].X) {
                    minx = allData.ListReleasedPipes[i].Coordinate[j].X;
                }
                else if (maxx < allData.ListReleasedPipes[i].Coordinate[j].X) {
                    maxx = allData.ListReleasedPipes[i].Coordinate[j].X;
                }
                if (miny > allData.ListReleasedPipes[i].Coordinate[j].Y) {
                    miny = allData.ListReleasedPipes[i].Coordinate[j].Y;
                }
                else if (maxy > allData.ListReleasedPipes[i].Coordinate[j].Y) {
                    maxy = allData.ListReleasedPipes[i].Coordinate[j].Y;
                }
            }
        } */

        var extsize_x = (maxx - minx);
        var extsize_y = (maxy - miny);
        map.setExtent(new esri.geometry.Extent(Number(minx) - Number(extsize_x), Number(miny) - Number(extsize_y), Number(maxx) + Number(extsize_x), Number(maxy) + Number(extsize_y), new esri.SpatialReference({ wkid: global.spatialReference })));

        var thiss = this;
        var layers = layer;

        geometryService.convexHull(points, function (result) {
            /* var symbol;
            switch (result.type) {
                case "point":
                    symbol = new esri.symbol.SimpleMarkerSymbol();
                    break;
                case "polyline":
                    symbol = new esri.symbol.SimpleLineSymbol();
                    break;
                case "polygon":
                    symbol = new esri.symbol.SimpleFillSymbol();
                    break;
            }
            layer.add(new esri.Graphic(result, symbol)); */            
            
            var params = new esri.tasks.BufferParameters();
            params.geometries = [result];
            params.bufferSpatialReference = new esri.SpatialReference({ wkid: global.spatialReference });
            params.outSpatialReference = new esri.SpatialReference({ wkid: global.spatialReference });
            params.distances = [10];
            params.unit = [esri.tasks.GeometryService.UNIT_METER];
            geometryService.buffer(params, function showBuffer(bufferResult) {
                var symbol = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(
                        esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new esri.Color([255, 0, 0, 0]), 2
                    ),
                    new esri.Color([255, 180, 0, 0.5])
                );
                for (var k = 0; k < bufferResult.length;k++)
                {
                    var graphic = new esri.Graphic(bufferResult[k], symbol);
                    layers.add(graphic);
                    //layers._map.setExtent();
                }
            }, thiss.showBufferError)

        }, function (error) {
            console.log("An error occured during convex hull calculation");
        });
    }

    

    showBufferError(error)
    {
        //console.log(error);
    }

    /**
     * 画停水管道与阀门的信息
     * @param {*} allData 
     * @param {*} layer 
     */
    DrawCloseValve(allData,layer) {
        console.log(allData);
        var ListPipe = allData.ListPipe;
        /* object.ListValve = allData.ListValve;
        object.ListUser = allData.ListUser;
        object.TitleArr = allData.TitleArr;
        //object.FoundOpenValves = result.FoundOpenValves;
        object.CloseValvesList = allData.CloseValvesList;
        object.TitleArr = allData.TitleArr;
        object.ClosedCheckValvesData = allData.ClosedCheckValvesData;
        object.OpenValvesList = allData.OpenValvesList; */

        var widthTemp = 5;
        //停水管道
        for (var i = 0; i < allData.ListPipe.length; i++) {
            var line = this.GetLine(allData.ListPipe[i].Coordinate);
            var gra1 = drawClass.DrawLineGraphic(widthTemp, '#FD5318', line);
            layer.add(gra1)
        }
        //通水管道
        for (var i = 0; i < allData.ListReleasedPipes.length; i++) {
            var line = this.GetLine(allData.ListReleasedPipes[i].Coordinate);
            var gra1 = drawClass.DrawLineGraphic(widthTemp, '#52B22C', line);
            layer.add(gra1)
        }
        //关闭阀门
        for (var i = 0; i < allData.ListValve.length; i++) {
            allData.ListValve[i].GraphicType = 'Valve';
            var gra1 = drawClass.CreatePictureGraphic(PictureProperty.closeValve, new esri.geometry.Point(allData.ListValve[i].X, allData.ListValve[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), allData.ListValve[i]);
            layer.add(gra1)
        }
        //止回阀
        for (var i = 0; i < allData.ClosedCheckValvesData.length; i++) {
            var gra1 = drawClass.CreatePictureGraphic(PictureProperty.checkValve, new esri.geometry.Point(allData.ClosedCheckValvesData[i].X, allData.ClosedCheckValvesData[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), allData.ClosedCheckValvesData[i]);
            layer.add(gra1)
        }
        //需打开阀门
        for (var i = 0; i < allData.OpenValvesList.length; i++) {
            allData.OpenValvesList[i].GraphicType = 'OpenValve';
            var gra1 = drawClass.CreatePictureGraphic(PictureProperty.openValve, new esri.geometry.Point(allData.OpenValvesList[i].X, allData.OpenValvesList[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), allData.OpenValvesList[i]);
            layer.add(gra1)
        }
        //需关闭已关闭阀门
        for (var i = 0; i < allData.CloseValvesList.length; i++) {
            var gra1 = drawClass.CreatePictureGraphic(PictureProperty.closedValve, new esri.geometry.Point(allData.CloseValvesList[i].X, allData.CloseValvesList[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), allData.CloseValvesList[i]);
            layer.add(gra1)
        }
        

        WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
    }

    GetLine(PipeCoordinates) {
        var pathClose = new Array();
        for (var j = 0; j < PipeCoordinates.length; j++) {
            var objTemp = PipeCoordinates[j];
            var pathTemp = new Array();
            pathTemp.push(objTemp.X)
            pathTemp.push(objTemp.Y)
            pathClose.push(pathTemp);
        }
        var pathMain = new Array();
        pathMain.push(pathClose);
        var line = new esri.geometry.Polyline({
            "paths": [],
            "spatialReference": { "wkid": global.spatialReference }
        });
        line.paths = pathMain;

        return line;
    }
}
export default new Methods()