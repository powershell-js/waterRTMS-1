<template>
    <div class="scroll-table" ref="scroll_table" style="margin:0 12px">
            <table class="header-table" ref="header_table" cellspacing=0 cellpadding=0>
                <colgroup >
                    <col v-for="(s,x) in columns" :key="x" :width="s.width">
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(s,x) in columns" :key="x" v-html="s.title"></th>
                    </tr>
                </thead>
            </table>
            <div  v-bar ref="table_height" @mouseover="stopTimer" @mouseout="startTimer">
                <div ref="falgDom">
                    <table ref = "table" class="body-table" cellspacing=0 cellpadding=0 style=" border-collapse:collapse">
                        <colgroup >
                            <col v-for="(s,x) in columns" :key="x" :width="s.width">
                        </colgroup>
                        <tbody>
                            <tr class="top" :style="{height:top+'px'}"></tr>
                            <tr v-for="(item,index) in dataList" :key="index" :style="trStyle" class="hover" @click="rowClick(item,index)" :class="active==index ? activeClass : ''" @dblclick="dbRowClick(item,index)">
                                <td v-for="(s,x) in columns" :key="x" :style="{textAlign:s.align||'center'}" class="cell" v-html="s.format?transform(dataList[index],s.format,s):dataList[index][s.field]"></td>
                            </tr>
                            <tr class="bottom" :style="{height:bottom+'px'}"></tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
</template>
<script>
    export default {
        name:'ScrollTable',
        props:{
            speed:{
                type:Number,
                default:50
            },
            scrolling:{
                type:Boolean,
                default:true
            },
            columns:{
                type:Array,
                default:function(){
                    return []
                }
            },
            data:{
                type:Array,
                default:function(){
                    return []
                }
            },
            itemHeight:{
                type:Number,
                default:30
            },
            activeClass:{
                type:String,
                default:'currentRow'
            },
            bindings: Object
        },
        computed:{
            trStyle:function(){
                let style;
                style={
                    height:this.itemHeight+'px',
                    lineHeight:this.itemHeight+'px'
                }
                return style;
            },
            bottom:function(){
                let height,total = this.data.length;
                height = (total - this.state.renderLastItemId) * this.itemHeight;
                return height;
            },
            top:function(){
                let height = this.state.renderFirstItemId * this.itemHeight;
                return height;
            },
            dataList:function(){
                let self = this,[...data] = this.data;
                let dataList = data.slice(self.state.renderFirstItemId,self.state.renderLastItemId)
                
                return dataList;
            },
            tableHeight:function(){
                return this.itemHeight*this.data.length;
            }
        },
        components:{
            
        },
        watch:{
            scrollTop:{
                handler: function (n, o) {
                    this.renderList(n)
                },
                deep:true
            },
            scrolling:{
                handler:function(n){
                    let self = this;
                    if(n){
                        self.$nextTick(()=>{
                            self.timer = setInterval(()=>{
                                if(self.$refs.falgDom.scrollTop == 0){
                                    self.flag = true;
                                }
                                if(self.$refs.falgDom.scrollTop+self.$refs.falgDom.clientHeight == self.$refs.falgDom.scrollHeight){
                                    self.flag = false;
                                }
                                if(self.flag){
                                    self.$refs.falgDom.scrollTop+=1;
                                }else{
                                    self.$refs.falgDom.scrollTop=0;
                                }
                            },self.speed);
                        })
                    }
                },
                deep:true,
                immediate:true
            },
            top:{
                handler:function(n,o){
                    this.$refs.falgDom.scrollTop -=(n-o);
                },
                deep:true
            },
            data:{
                handler:function(n){
                    if(n&&this.timer){
                        clearInterval(this.timer);
                        this.timer = null;
                        this.$refs.falgDom.scrollTop = 0;
                        this.startTimer();
                    }
                }
            }
        },
        data(){
            return {
                padding:90,
                scrollTop:0,
                active:null,
                flag:true,
                state:{
                    visibleFirstItemId:0,
                    visibleLastItemId: 10,
                    renderFirstItemId: 0,
                    renderLastItemId: 100,
                }
            }
        },
        methods:{
            onScroll(){
                this.scrollTop = this.$refs.falgDom.scrollTop;
            },
            _needRender(){
                if(this._scrollOver() >= (this.state.visibleLastItemId + this.padding - 20)){
                    return true
                }
                if(this._scrollOver() <= (this.state.visibleFirstItemId - this.padding + 20)){
                    return true
                }
                return false
            },
            _scrollOver(){
                return Math.floor(this.scrollTop / this.itemHeight)
            },
            renderList(){
                if(this._needRender()){
                    this.state.visibleFirstItemId = this._visibleFirstItemId();
                    this.state.visibleLastItemId = this._visibleLastItemId();
                    this.state.renderFirstItemId = this._renderFirstItemId();
                    this.state.renderLastItemId = this._renderLastItemId();
                }
            },
            _visibleFirstItemId(){
                return Math.floor(this.scrollTop / this.itemHeight)
            },
            _visibleLastItemId(){
                return this._visibleFirstItemId() + this._itemsPerTable()
            },
            _itemsPerTable (){
                let height =  this.$refs.table_height.offsetHeight;
                return Math.floor(parseInt(height) / this.itemHeight)
            },
            _renderFirstItemId(){
                if(( this._visibleFirstItemId() - this.padding) > 0 ){
                    return this._visibleFirstItemId() - this.padding
                }else{
                    return 0
                }
            },
            _renderLastItemId(){
                let total = this.data.length;
                if(( this._visibleFirstItemId() + this.padding) < total){
                    return this._visibleFirstItemId() + this.padding
                }else{
                    return total
                }
            },
            stopTimer(){
                let self = this;
                if(this.timer){
                    clearInterval(self.timer);
                    this.timer = null;
                }
            },
            startTimer(){
                let self = this;
                if(!self.timer&&self.scrolling){
                    self.timer = setInterval(()=>{
                        self.$nextTick(()=>{
                            if(self.$refs.falgDom.scrollTop == 0){
                                self.flag = true;
                            }
                            if(self.$refs.falgDom.scrollTop+self.$refs.falgDom.clientHeight == self.$refs.falgDom.scrollHeight){
                                self.flag = false;
                            }
                            if(self.flag){
                                self.$refs.falgDom.scrollTop+=1;
                            }else{
                                self.$refs.falgDom.scrollTop=0;
                            }
                        })
                    },self.speed);
                }
            },
            transform(data,format,col){
                let self = this,value;
                if(typeof format == 'function'){
                    value = col.format(data[col.field],data);
                    value = value == null ? "" : value;
                    return value;
                }else if(typeof format == 'number'){
                    value = Vue.filter("NUMBER")(data[col.field], col.format);
                    return value;
                }else if(typeof format == 'string'){
                    if (col.type == "date") {
                        value = Vue.filter("DATE")(data[col.field], col.format);
                    } else if (col.type == "number") {
                        value = Vue.filter("NUMBER")(data[col.field], col.format);
                    } else {
                        value = Vue.filter("CODE")(
                            data[col.field],
                            col.format,
                            null,
                            self.bindings || {}
                        );
                    }
                    return value;
                }
            },
            rowClick(row,index){
                this.active = index;
                this.$emit('row-click',row);
            },
            dbRowClick(row,index){
                this.active = index;
                this.$emit('db-row-click',row);
            }
        },
        beforeDestroy(){
            this.$refs.falgDom.removeEventListener('scroll',self.onScroll);
        },
        destroyed(){
            clearInterval(this.timer);
            this.timer = null;
        },
        mounted(){
            let self = this;
            this.$nextTick(()=>{
                this.$refs.table_height.style.height = `calc(100% - ${$('.header-table').eq(0).height()}px)`
                this.$refs.falgDom.addEventListener('scroll',self.onScroll);
                let height =  this.$refs.table_height.offsetHeight;
                this.state.visibleLastItemId =  Math.floor(parseInt(height) / this.itemHeight);
            })

        }
    }
</script>
