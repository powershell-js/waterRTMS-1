
<template>
    <div id="map">
    </div>
</template>
  <style>
    #map {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
  <script>
    import * as esriLoader from 'esri-loader';
    export default{
        mounted(){
          
	       this.createMap()
         
       },
       methods: {

            createMap: function () {
                esriLoader.dojoRequire([
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
                'esri/Color'
            ],(InfoTemplate, FeatureLayer, Map, HeatmapRenderer)=>{
            // --------------------------------------------------------------------
            // Formatting functions for attribute values in the InfoWindow
            // Data is not what you expect, turn your dirty data into
            // readable stuff in the infowindow
            // --------------------------------------------------------------------
            var map = new Map("map", {
            basemap: "gray",
            center: [-119.11, 36.65],
            zoom: 7,
            minZoom: 7,
            maxZoom: 9
            });

            var serviceURL = "//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/2012_CA_NHTSA/FeatureServer/0";
            var heatmapFeatureLayerOptions = {
            mode: FeatureLayer.MODE_SNAPSHOT,
            outFields: [
                "atmcond",
                "numfatal",
                "conszone",
                "age",
                "alcres",
                "sex"
            ]
            };
            var heatmapFeatureLayer = new FeatureLayer(serviceURL, heatmapFeatureLayerOptions);
            var heatmapRenderer = new HeatmapRenderer();
            heatmapFeatureLayer.setRenderer(heatmapRenderer);
            map.addLayer(heatmapFeatureLayer);
        });
            }
        } 
    }

  </script>




