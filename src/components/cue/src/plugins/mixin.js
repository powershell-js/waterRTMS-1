import Vue from 'vue';
import { BindRecords,Bind } from "./binding";
import { NumberFormat,DateFormat,ShortTime,TimeSpan,PercentFormat,colwidth} from "../utils/util.js";
const uuid = require('uuid');
Vue.mixin({
    props:{
        args:{
            type:Object,
            default(){
                return {}
            }
        }/*,
        componentState:{
            type:Boolean,
            default:true
        }*/
    },
    data() {
        return {
            componentState:true
        }
    },
    methods:{
        BindRecords:BindRecords,
        Bind: Bind,
        NumberFormat:NumberFormat,
        PercentFormat:PercentFormat,
        DateFormat:DateFormat,
        ShortTime:ShortTime,
        TimeSpan:TimeSpan,
        colwidth:colwidth,
        uuid:uuid,
        ArgToArray(v){
            if(v==undefined) return [];
            //type  string,null,array
            if (v && typeof v == "string") {
                return v.split(",");
            }
            return []
        },
        GetParams(){
            var q=$.extend(true,{},this.$route.query||{});
            $.each(q,function(k,v){
                if(Array.isArray(v)){
                    q[k]=v.join(",");
                }
            });
            var p=$.extend(true,{},this.$route.params||{});
            var a=$.extend(true,{},this.args||{});
            return $.extend(true,{},a,p,q);
        }
    }
});