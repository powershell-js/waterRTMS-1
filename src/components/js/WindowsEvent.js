/**
 * 事件触发类
 */
class Methods{
    /**
     * 触发window的监听事件
     * @param {*} typeTemp 事件类型
     * @param {*} dataTemp 数据
     */
    MyDispatchEvent(typeTemp,dataTemp){
        var myEventTemp = new CustomEvent('event_name',{
            detail: { type: 'This is title!'},
            });
            myEventTemp.detail.type = typeTemp;
            myEventTemp.detail.data = dataTemp;
            if(window.dispatchEvent){
            window.dispatchEvent(myEventTemp);
            }else{
                window.fireEvent(myEventTemp);
            }
    }

}
export default new Methods() 