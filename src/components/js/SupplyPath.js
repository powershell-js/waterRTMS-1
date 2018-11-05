
import axios from 'axios'
import drawClass from '@/components/js/DrawClass'
import global from '@/components/js/Global'
import WindowsEvent from './WindowsEvent';
class Methods{

    FindSupplyPath(tempUrl,paraMeter,urlTemp,layer,LocationMarkerSymbol,map,greenMarkerSymbol){
        var self = this;
        axios.post(
            tempUrl,
            JSON.stringify(paraMeter),
            {headers: {'Content-Type':'application/json;'}}
        )   
         .then(function(respone){
            self.FindSupplyPathReturn(respone,urlTemp,layer,LocationMarkerSymbol,map,greenMarkerSymbol)
         }) 
    }
    FindSupplyPathReturn(respone,urlTemp,layer,LocationMarkerSymbol,map,greenMarkerSymbol){
        var result = respone.data;
        var pipeResult = result.PipeResult.slice(0);
        var nodeResult = result.NodeResult.slice(0);
        var nodeTypeResult = result.NodeTypeResult.slice(0);
        var nodeHGL = result.NodeHGL.slice(0);
        var nodeHGL2 = result.NodeHGL2.slice(0);
        var pipeSlop = result.PipeSlop.slice(0);
        var nodeElev = result.NodeElev.slice(0);
        var nodeElev = result.NodeElev.slice(0);
        var pipeInfoData = result.PipeInfoData.slice(0);
        var sourceName = result.SourceName;
        var coordiante = result.PipeCoordinates.slice(0);
        var minX = Number(coordiante[0].Coordinate[0].X);
        var maxX = Number(coordiante[0].Coordinate[0].Y);
        var minY = Number(coordiante[0].Coordinate[0].X);
        var maxY = Number(coordiante[0].Coordinate[0].Y);
        var sourcePoint;
        for(var i=0;i<coordiante.length;i++)
        {
            var linePath = new Array();
            var path = new Array();
            var pipe = coordiante[i];
            for(var j=0;j<pipe.Coordinate.length;j++)
            {
                var array = new Array();
                var point = pipe.Coordinate[j];
                array.push(point.X);
                array.push(point.Y);
                path.push(array);
                if(i==coordiante.length-1&&j==pipe.Coordinate.length-1)
                {
                    sourcePoint = new esri.geometry.Point(Number(point.X), Number(point.Y), new esri.SpatialReference({ wkid: global.spatialReference }));
                }
                if(minX>Number(point.X))
                minX = Number(point.X)
                if(maxX<Number(point.X))
                maxX = Number(point.X)
                if(minY>Number(point.Y))
                minY = Number(point.Y)
                if(maxY<Number(point.Y))
                maxY = Number(point.Y)
                //var pointPosition = esri.geometry.Point(point.X,point.Y,new esri.SpatialReference({ wkid: global.spatialReference }));  
                //var gra1 = new esri.Graphic(pointPosition, greenMarkerSymbol);
                //layer.add(gra1);
            }
            
            linePath.push(path)
            var line = new esri.geometry.Polyline({
                "paths":[],
                "spatialReference": { "wkid": global.spatialReference }
            });
            line.paths = linePath;
            var gra1 = drawClass.DrawLineGraphic(5,'#ff7f00',line);
            layer.add(gra1);
        }
        this.PositionSourceName(sourcePoint,LocationMarkerSymbol,layer,sourceName)
        map.setExtent(new esri.geometry.Extent(minX-10000, minY-10000, maxX+10000,maxY+10000,
            new esri.SpatialReference({ wkid: global.spatialReference })));
        //this.SupplyPathQuery(pipeResult,urlTemp,layer);
        WindowsEvent.MyDispatchEvent("FindPathReturn",result);
    }


    PositionSourceName(geometry,LocationMarkerSymbol,supplyPathLayer,sourceName){
        var gra1 = new esri.Graphic(geometry, LocationMarkerSymbol);
        supplyPathLayer.add(gra1);
        var textSymbol = new esri.symbol.TextSymbol(sourceName)
        var font  = new esri.symbol.Font();
        font.setSize("12pt");
        font.setWeight(esri.symbol.Font.WEIGHT_BOLD);
        textSymbol.setColor(new esri.Color("#ffffff"));
        var gra1 = new esri.Graphic(geometry, textSymbol);
        supplyPathLayer.add(gra1);
    }

    SupplyPathQuery(pipeResult,urlTemp,layer){
        var self = this;
        var where = "";
        where = "ElementId = "+String(pipeResult[0])
        for(var i=1;i<20;i++){
            where += " OR ElementId = "+String(pipeResult[i])
        }
        console.log(pipeResult.length)
        var query = new esri.tasks.Query();
        query.geometry = drawClass.GetMapInitExtent(global.initExtent);
        query.where = where;
        query.returnGeometry = true;
        query.outSpatialReference = new esri.SpatialReference({ wkid: global.spatialReference });
        query.outFields = ["ElementId","HMIGeometryScaledLength"];
        console.log(query)
        var queryTask = new esri.tasks.QueryTask(urlTemp);
        queryTask.execute(query,function(re){
            self.SupplyPathDraw(re,layer);
        })
            
    }

    SupplyPathDraw(re,layer){
        var features = re.features;
        for(var i=0;i<features.length;i++)
        {
            var feature = re.features[i];
            var gra1 = drawClass.DrawLineGraphic(5,'#ff7f00',feature.geometry);
            layer.add(gra1);
        }
    }
}
export default new Methods();