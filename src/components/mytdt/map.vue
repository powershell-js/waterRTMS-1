<template>
    <div>
        <div id="map" class="map"></div>  
    </div>
</template>
<script>
import manager from './../js/methods_manager'
export default {
    name:"map",
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
        initMap:manager.initMap, 
    } 
}
</script>
<style scoped>
#map{
    width: 100%;;
     height: 100%; 
    background-color:#eeeeee;
}
</style>


