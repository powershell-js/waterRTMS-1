<template>
    <div>
        <div id="mapTemp"></div>  
    </div>
</template>
<script>
import manager from './../js/methods_managerEmergencyDispath'
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
#mapTemp{
    width: 100%;
     height: 100%; 
    background-color:#eeeeee;
}
</style>


