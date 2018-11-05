import urlClass from '@/components/js/UrlClass'
import axios from 'axios'
import global from '@/components/js/Global'
import drawClass from '@/components/js/DrawClass'
import PictureProperty from './PictureProperty';
import WindowsEvent from "@/components/js/WindowsEvent";
class Methods {
    /**
    * 画报警信息
    * @param {*} eventData
    * @param {*} layer 
    */
    DrawWarningEvent(eventData, layer) {
        //流量点
        var symbolPressureBackground = new esri.symbol.SimpleMarkerSymbol().setStyle(
            esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new esri.Color([64, 224, 208, 0.3])).setOutline(
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([64, 224, 208, 1]), 2)).setSize("30");
        var symbolPressureCenter = new esri.symbol.SimpleMarkerSymbol().setStyle(
            esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
            new esri.Color([64, 224, 208, 1])).setOutline(
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([64, 224, 208, 1]), 1)).setSize("6");
        //压力点
        var symbolFlowBackground = new esri.symbol.SimpleMarkerSymbol().setStyle(
            esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
            new esri.Color([0, 120, 255, 0.3])).setOutline(
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 120, 255, 1]), 2)).setSize("30");
        var symbolFlowCenter = new esri.symbol.SimpleMarkerSymbol().setStyle(
            esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new esri.Color([0, 120, 255, 1])).setOutline(
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 120, 255, 1]), 1)).setSize("6");
        //定位点
        var symbolLocate = new esri.symbol.SimpleMarkerSymbol().setStyle(
            esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new esri.Color([255, 0, 0, 1])).setOutline(
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 0, 0, 1]), 1.5)).setSize("10");
        var wFlowPoints = eventData.FlowPoints;
        var wPressurePoints = eventData.PressurePoints;
        var coordinates = eventData.Coordinates;

        var widthTemp = 5;
        
        //流量点
        for (var i = 0; i < wFlowPoints.length; i++) {
            var graBackground = new esri.Graphic(new esri.geometry.Point(wFlowPoints[i].X, wFlowPoints[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), symbolFlowBackground, wFlowPoints[i]);
            var graCenter = new esri.Graphic(new esri.geometry.Point(wFlowPoints[i].X, wFlowPoints[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), symbolFlowCenter, wFlowPoints[i]);
            layer.add(graBackground);
            layer.add(graCenter);
        }
        //压力点
        for (var i = 0; i < wPressurePoints.length; i++) {
            var graBackground = new esri.Graphic(new esri.geometry.Point(wPressurePoints[i].X, wPressurePoints[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), symbolPressureBackground, wPressurePoints[i]);
            var graCenter = new esri.Graphic(new esri.geometry.Point(wPressurePoints[i].X, wPressurePoints[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), symbolPressureCenter, wPressurePoints[i]);
            layer.add(graBackground);
            layer.add(graCenter);
        }
        //定位点
        for (var i = 0; i < coordinates.length; i++) {
            var gra1 = new esri.Graphic(new esri.geometry.Point(coordinates[i].X, coordinates[i].Y, new esri.SpatialReference({ wkid: global.spatialReference })), symbolLocate);
            layer.add(gra1)
        }

        //WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
    }
}
export default new Methods()