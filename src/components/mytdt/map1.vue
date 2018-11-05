<template>
    <div>
        <div id="map1" class="map1"></div>  
    </div>
</template>
<script>
import manager from './../js/methods_manager1'
export default {
    name:"map1",
    data () {
        return {
            maoObj1:{}
        }
    },
    mounted () {
        this.loadArcgis1 ()
    },
    methods: {
        loadArcgis1:manager.loadArcgis1,
        loading1:manager.loading1,
        initMap1:manager.initMap1
    } 
}
</script>
<style scoped>
#map1{
     width:100%;
     height: 100%;
    background-color:#eeeeee;
}
</style>


