<template>
  <div class="hd-wrapper" :style="warpperStyle">
      <header v-if="title!=''">
          <slot name="head">
              <h3 class="title">{{title}}</h3>
          </slot>
      </header>
      <slot></slot> 
      <slot name="foot"></slot>
      <div class="angle-content" v-if="angle">
          <span class="left-top angle"></span>
          <span class="right-top angle"></span>
          <span class="left-bottom angle"></span>
          <span class="right-bottom angle"></span>
      </div>   
  </div>
</template>
<script>
    export default {
        name:'HdWrapper',
        props:{
            title:{
                type:String,
                default:""
            },
            height:{
                default:"100%"
            },
            width:{
                default:"100%"
            },
            background:{
                default:"rgba(27,27,27,.5)"
            },
            angle:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return{

            }
        },
        computed:{
            warpperStyle:function(){
                let style = {
                    height:typeof(this.height) == "number"?this.height+'px':this.height,
                    width:typeof(this.width) == "number"?this.width+'px':this.width,
                    background:this.background
                }
                return style;
            }
        }
    }
</script>