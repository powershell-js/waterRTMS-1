<template>
         <div id="map"  class="map"></div>  
</template>

<script>
import manager from './js/methods_manager'
export default {
    
    name: 'MyTdt',
    data () {
        return {
            maoObj:{}
        }
    },
    mounted () {
        this.loadArcgis ()
    },
    methods: {
        loadArcgis:manager.loadArcgis,
        loading:manager.loading,
        initMap:manager.initMap
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
   #map {
    line-height:30px;
    background-color:#eeeeee;
    height:100vh;
    width:50vw;
    float:right;
    padding:5px;	      
}
</style>
