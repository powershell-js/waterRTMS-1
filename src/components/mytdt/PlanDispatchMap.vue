<template>
    <div class="map1">
        <div id="map2" class="map1"></div>  
    </div>
</template>
<script>
import manager from '../js/PlanDispatch/map_methods_manager'
export default {
    name:"map2",
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
.map1{
    width: 100%;
    height: 100%; 
    background-color:#eeeeee;
}
</style>


