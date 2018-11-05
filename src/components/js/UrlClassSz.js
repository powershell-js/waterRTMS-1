export default{
    /**
     * 阀门状态的图标
     */
    valveStatusImageSource:'../../../static/assets/valve_change.png',
    /**
     * 阀门全关的图标
     */
    valveCloseSource:'../../../static/assets/valve_closed.png',
    /**
     * 阀门半开的图标
     */
    valvePartCloseSource:'../../../static/assets/valve_partclosed.png',
    /**
     * 地图上最大值的图标
     */
    maxSource:'../../../static/assets/colored-pins-blue.png',
    /**
     * 地图上最小值的图标
     */
    minSource:'../../../static/assets/colored-pins-red.png',
    /**
     * 本地arcgisAPI
     */
    arcgisAPIUrlHost:'192.168.1.177:8010',
    /**
     * 服务器接口地址
     */
    axiosUrl:"http://10.200.6.71:8010/Service1.svc/Rest/",
    /**
     * 本地接口地址
     */
    axiosUrlLocalHost:'http://localhost:17458/Service1.svc/Rest/',
    /**
     * 日常调度接口
     */
    axiosUrlRC:"http://10.200.6.71:8185/Service1.svc/",

    /**
     * 应急调度接口
     */
    axiosUrl2:"http://10.200.6.71:8186/Service1.svc/",
     /**
     * 应急调度接口
     */
    axiosUrlYJ:"http://10.200.6.71:8186/Service1.svc/",

    /**
     * 计划调度接口
     */
    axiosUrlJH:"http://10.200.6.71:8187/Service1.svc/",
     /**
     * 预案管理接口
     */
    axiosUrYA:"http://10.200.6.71:8189/Service1.svc/",

    /**
     * 地形图接口
     */
    reliefMapNight:'http://10.200.6.57:6080/arcgis/rest/services/SSEQ_TYFW/Basemap_jsy/MapServer',

    /**
     * 地形图接口
     */
    reliefMap:'http://10.200.6.57:6080/arcgis/rest/services/SSEQ_TYFW/Basemap_dem/MapServer',

    /**
     * 管道结果服务
     */
    pipeResultUrl:'http://10.200.6.71:8888/ArcGis/rest/services/PipeResult_sz/MapServer/0',//查询的服务
    /**
     * 节点结果服务
     */
    junctionResultUrl:'http://10.200.6.71:8888/ArcGis/rest/services/JunctionResult_sz/MapServer/0',//查询的服务

     /**
     * 基础管网服务
     */
    baseMapUrl:'http://10.200.6.71:8888/ArcGis/rest/services/ModelPipe_sz_BaseMap/MapServer/',//10.200.6.71
    /**
     * 用户数据服务
     */
    customerUrl:'http://10.200.6.71:8888/ArcGis/rest/services/CustomerMeter_sz/MapServer/0',
    /**
     * 几何服务
     */
    geometryService:'http://10.200.6.71:8888/ArcGis/rest/services/Geometry/GeometryServer'

}