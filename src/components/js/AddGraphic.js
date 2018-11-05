class Methods {
    addGraphic(obj) { // 初始化地图,并设置中心点等
        this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
        let map = new this.mapObj.Map('map', { logo: false });// 创建地图实例
        //var pt = new this.mapObj.Point(502640.7108, 328464.4444); // 设置中心点
        //map.centerAndZoom(pt, 4); // 设置中心点和缩放级别;
        let img = new TDT('img') // 影像
        //let cia = new TDT('cia');//路网
        map.addLayer(img) // 将图层添加到map对象
        //map.addLayer(cia)
        var dynamicMapServiceLayer = new this.mapObj.ArcGISDynamicMapServiceLayer('http://121.40.242.176/ArcGIS/rest/services/ModelPipe_sxquan_BaseMap/MapServer/');
        map.addLayer(dynamicMapServiceLayer, 1);

        var gl = new this.mapObj.GraphicsLayer();
        map.addLayer(gl);
        //alert(gl.visible);

        var point = new this.mapObj.Point(502640.7108, 328464.4444, new this.mapObj.SpatialReference({ wkid: 102113 }));

        var pictureMarkerSymbol = new this.mapObj.PictureMarkerSymbol('../../../static/assets/dingwei_03.png', 98, 98);
        var simpleMarkerSymbol = new this.mapObj.SimpleMarkerSymbol().setStyle(
            this.mapObj.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new this.mapObj.Color([255, 0, 0, 0.5]));

        var gra;
        map.on("click", function (e) {
            /* var radius = map.extent.getWidth() / 10;
            var circle = new this.mapObj.Circle({
                center: e.mapPoint,
                radius: 2000
            }); */
            gra = new esri.Graphic(e.mapPoint, pictureMarkerSymbol);
            gl.add(gra);
        });

        gra = new this.mapObj.Graphic(point, pictureMarkerSymbol);

        gl.add(gra);
    }
}

export default new Methods()