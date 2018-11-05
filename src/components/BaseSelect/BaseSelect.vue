<template>
    <!--   <div class="selection-show" @click="toggleDrop">
        <span>{{ selections[nowIndex].label }}</span>
        <div class="arrow"></div>
      </div> -->
      <!-- <div class="selection-list" v-if="isDrop">
        <select v-for="item in selections" :key="item.index" @click="chooseSelection(index)">
          {{ item.label }}
        </select>
          <li :style="{listStyle:'none'}" :key="item.index" v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li> 
      </div> -->
     <!--  <select v-on:change="chooseSelection" class="selectClass">
        <span style="{width:'12px'}"></span>
          <option :key="item.label"  v-for="item in selections" class="optionClass" >{{item.label}}</option>
      </select> -->
       <el-select v-model="value" v-on:change="chooseSelection"><!--v-on:change="chooseSelection"-->
          <el-option
            v-for="item in selections"
            :key="item.label"
            :value="item.index"
            :label="item.label">
          </el-option>
      </el-select>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        index: 0
      }]
    },
    initLabel:'',
    selectValue:Object,
  },
  mounted(){
    this.value = this.initLabel;
  },
  data () {
    return {
      isDrop: false,
      nowIndex: 0 ,
      value:''
    }
  },
  methods: {
    toggleDrop () {
      this.isDrop = !this.isDrop
    },
    chooseSelection (valueMy) {
      this.nowIndex = valueMy
      this.selectValue.label = this.selections[this.nowIndex].label
      this.selectValue.value = this.selections[this.nowIndex].value 
      this.$emit('change', this.selections[this.nowIndex])
    }
  }
}
</script>
<style>
.selectClass{
  height: 28px;
  background: #fff;
  border: 1px solid #cbd5dd;
  border-radius: 2px;
}
.optionClass{
  height: 28px;
  background: #f5f7fa;
}
</style>
