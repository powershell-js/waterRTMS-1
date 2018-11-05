<template>
  <div class="sys-name" :style="{backgroundColor:backgroundColor}">
      <a v-bind:href="urls">
          <img class="hd-logo" v-bind:src="logo">
      </a>
      <span class="custom-name" :style="{'line-height': maxH + 'px'}">
          {{sysname}}
      </span>
  </div>
</template>
<script type="text/babel">
    export default {
        name:'HdLogo',
        props:{
            sysname:String,
            url:String,
            backgroundColor:{
                type:String,
                default:'transparent'
            },
            logo:String,
            fontColor:{
                type:String,
                default:'#fff'
            },
            maxH:{
                type:Number,
                default:50
            }
        },
        data() {
            return{
            }
        },
        computed:{
            urls:function(){
                if(this.url) return this.url
            }
        }
    }
</script>

