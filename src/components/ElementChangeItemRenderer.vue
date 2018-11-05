<template>
  <span v-on:click="mySelect">
    <span>
        <label>{{item.type}}</label>
        <label>ID</label>
        <label>{{item.ElementId}}</label>
        <span v-for="itemTemp in item.ChangeData" :key="itemTemp.label">
          <label>{{itemTemp.label}}</label>
          <label>{{itemTemp.originalData}}</label>
          <label>变为</label>
           <label>{{itemTemp.changeData}}</label>
           <span class="space"></span>
        </span>
    </span>
   <!--   <span v-show="item.layerId==this.myLayerId.EN_JUNCTION">
        <label>节点ID</label>
        <label>{{item.ElementId}}</label>
    </span>
     <span v-show="item.layerId==this.myLayerId.EN_TCV">
        <label>阀门ID</label>
        <label>{{item.ElementId}}</label>
    </span> -->
  </span>  
</template>

<script>
import Global from '@/components/js/Global'
export default {
     props: {
    item: {
      type: Object,
      default: {
        label: 'test',
        value: 0,
        elementId:0,
      }
    },
  },
  data(){
    return{
      myLayerId:Global.layerId
    }
  },
  methods: {
    mySelect:function(event) {
        this.$emit('selectItem', this.item);
      }
  }
}
</script>
<style scoped>
.space{
  width: 5px
}
</style>


