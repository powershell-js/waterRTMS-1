<template>
    <div id="div" class="myCircleClass">
        <span :style="{width:widthSpan+'px'}"></span>
        <div class="OnlyClass">
            <canvas  id="canvas" :width="diameter" :height="diameter" ></canvas>
            <td>模型精度</td>
        </div>
        <span :style="{width:widthSpan+'px'}"></span>
        <div class="OnlyClass">
            <canvas  id="canvas1" :width="diameter" :height="diameter" ></canvas>
            <td>压力误差>2m</td>
        </div>
        <span :style="{width:widthSpan+'px'}"></span>
        <div class="OnlyClass">
            <canvas  id="canvas2" :width="diameter" :height="diameter" ></canvas>
            <td>压力误差1-2m</td>
        </div>
        <span :style="{width:widthSpan+'px'}"></span>
        <div class="OnlyClass">
            <canvas  id="canvas3" :width="diameter" :height="diameter" ></canvas>
            <td>{{label}}</td>
        </div>
        <span :style="{width:widthSpan+'px'}"></span>
        <div class="OnlyClass">
            <canvas  id="canvas4" :width="diameter" :height="diameter" ></canvas>
            <td>大管道流量精度</td>
        </div>
        <span :style="{width:widthSpan+'px'}"></span>
        <div class="OnlyClass">
            <canvas  id="canvas5" :width="diameter" :height="diameter" ></canvas>
            <td>小管道流量精度</td>
        </div>
        <span :style="{width:widthSpan+'px'}"></span>
    </div>
</template>
<script>
export default {
    props:{
        widthObject:{type:Object,default: () => { 
     return {widthSpan:1}
    }},
    },
    mounted(){
        this.widthSpan = this.widthObject.widthSpan;
        this.DrawAll();
        window.addEventListener('event_name',this.myEventListener)
    },
    watch:{
        widthObject:function(){
            this.widthSpan = widthObject.widthSpan;
            console.log("宽度")
            console.log(this.widthSpan)
        }
    },
    data(){
        return{
            label:'压力误差<1m',
            allRoundColor:"#ededef",//整个环形的颜色
            ringWidth:10,//环的宽度
            ratioRoundColor:"#5d77e6",//占比环形的颜色
            ratio:0.555,//占比
            ratioTextFont:"bold 16px Arial",//环中间的文字的样式
            ratioTextColor:"#333",//环中间文字的颜色
            ratioFixed:1,//占比数字保留的位数
            diameter:80,//环的直径(大小)
            centerX:0,//中心点的X坐标
            centerY:0,//中心点的Y坐标
            ratios:[0.555,0.444,0.333,0.222,0.111,0],
            widthSpan:0,
            
        }
        
    },
    methods:{
        DrawAll(){
            var context = this.GetContext("canvas");
            this.drawFrame(this.ratios[0],context,this.diameter,this.ratioFixed);
            var context = this.GetContext("canvas1");
            this.drawFrame(this.ratios[1],context,this.diameter,this.ratioFixed);
            var context = this.GetContext("canvas2");
            this.drawFrame(this.ratios[2],context,this.diameter,this.ratioFixed);
            var context = this.GetContext("canvas3");
            this.drawFrame(this.ratios[3],context,this.diameter,this.ratioFixed);
            var context = this.GetContext("canvas4");
            this.drawFrame(this.ratios[4],context,this.diameter,this.ratioFixed);
            var context = this.GetContext("canvas5");
            this.drawFrame(this.ratios[5],context,this.diameter,this.ratioFixed);
        },

         myEventListener(event){
             var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="AccuracyFollowingReturn"){
                  this.ratios = dataTemp.slice(0);
                  this.DrawAll();
              }
              else if(typeTemp=="AccuracyFollowingInit")
              {
                  this.widthSpan = dataTemp; 
              }
        },
        GetContext(elementId){
            var draw = document.getElementById(elementId);
            if(!draw.getContext){
                return false;
            }
            var context=draw.getContext('2d');
            this.centerX=draw.width/2;
            this.centerY=draw.height/2;
            context.lineCap="butt";  //square 平角的帽
            return context;
        },

    //绘制整个的圆
    blueCircle(context){
        context.save();//save() 方法保存当前图像状态的一份拷贝
        context.strokeStyle = this.allRoundColor; //设置描边样式
        context.lineWidth = this.ringWidth; //设置线宽
        context.beginPath();//路径开始           
        //context.arc(centerX, centerY, 100 , -Math.PI/2, -Math.PI/2 +n*rad, false); 
        //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.arc(this.centerX,this.centerY,this.centerX-5,0,2*Math.PI,false);
        /*context.moveTo(210,55);
        context.arc(55,55,20,0,2*Math.PI,false);*/
        context.stroke();
        context.closePath(); //路径结束 
        context.restore();//save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。这就允许您临时地改变图像状态，然后，通过调用 restore() 来恢复以前的值。
    }, 
    //绘制占比的圆
    redCircle(context,n){
            context.save();
            context.strokeStyle = this.ratioRoundColor; //设置描边样式
            context.lineWidth = this.ringWidth; //设置线宽
            context.beginPath();
            context.arc(this.centerX, this.centerY, this.centerX-5 ,  -Math.PI /2, (n * 3.6 - 90) * Math.PI / 180, false);
            context.stroke();
            context.closePath();
            context.restore();
    },
     //百分比文字绘制
    text(context,n,m){
            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
            //context.strokeStyle = "#F00"; //设置描边样式
            //context.fillStyle='#f00';//文字颜色
            context.beginPath();
            context.font = this.ratioTextFont; //设置字体大小和字体
            context.fillStyle=this.ratioTextColor;
            context.textAlign='center';//文本程度对齐方法
            context.textBaseline='middle';//文本垂曲标的目的，基线位置
            //绘制字体，并且指定位置
            context.fillText(n.toFixed(m)+"%", this.centerX, this.centerY);
            context.stroke(); //ִ执行绘制
            context.closePath();
            context.restore();
    },
    //绘制环形统计图(占比,画笔,直径,占比数字的保留小数位数)
    drawFrame(angle,context,diameterTemp,ratioFixedTemp){
            context.clearRect(0, 0, diameterTemp, diameterTemp);
            this.blueCircle(context);
            this.redCircle(context,angle*100);
            this.text(context,angle*100,ratioFixedTemp);
    },
    }
}
</script>
<style scoped>
.myCircleClass{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    /* justify-content: space-between; */
    width: 100%
}
.OnlyClass{
  text-align: center;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

