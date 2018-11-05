<template>
    <div class="handleClose">
        <div class="moni clearfix">
            <div style="float:left;height:40px;line-height:40px;" class="fontEd">爆管事件应急处置</div>
            <el-button type="success" class="mnfx" @click="mnfxClick">模拟分析</el-button>
            <el-button type="success" class="mnfx" style="margin-right:20px;" @click="gfssClick">关阀搜索</el-button>
        </div>
        <div class="detail-info">
            <div class="info-list">
                <div class="closeSearch" :class="{'active':cur==='gfss'}" @click="gfssClick">关阀搜索</div>
                <div class="mockAnalyze" :class="{'active':cur==='mnfx'}" @click="mnfxClick">模拟分析</div>
            </div>
            <div class="info-content">
                <closeSearchList v-show="cur === 'gfss'" ref="choseSearch"></closeSearchList>
                <mockAnalyzeList v-show="cur === 'mnfx'" ref="mockAnalyze"></mockAnalyzeList>
            </div>
        </div>
    </div>
</template>
<script>

import closeSearchList from './closeSearchList.vue';
import mockAnalyzeList from './mockAnalyzeList.vue';
export default {
  data() {
    return {
        cur:'gfss',
    };
  },
  methods:{
      mnfxClick(){
          this.cur = 'mnfx';
          this.ajaxMNFXData();
      },
      gfssClick(){
          this.cur = 'gfss';
         this.ajaxGFSSData();
      },
      ajaxMNFXData(){
            this.$refs.mockAnalyze.ajaxMockData();

      },
      ajaxGFSSData(){
         this.$refs.choseSearch.gbfmClick();
      }
  },
  components:{closeSearchList,mockAnalyzeList}
};
</script>
<style lang="less" scoped>
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.fontEd {
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
}
.handleClose {
  height: calc(~"100% - 70px");
}
.moni {
  height: 40px;
  padding: 0 20px;
  .mnfx {
    float: right;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    height: 26px;
    margin-top: 7px;
  }
}
.detail-info{
    border-top:1px solid #d1d1da;
    height:calc(~"100% - 40px");
    .info-list{
        box-sizing: border-box;

        width: 122px;
        float:left;
        border-right:1px solid #d1d1da;
        height: 100%;
        >div{
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            border-bottom:1px solid #d1d1da;
            line-height: 46px;
            text-align: center;
            font-size: 12px;
            color:#6e7b8b;
            cursor: pointer;
            &.active{
               background: #c2e086;
            }
        }
        .closeSearch{
            // margin-bottom: 20px;
        }
    }
    .info-content{
        box-sizing: border-box;
        height: 100%;
        padding-left:122px;

    }
}
</style>
