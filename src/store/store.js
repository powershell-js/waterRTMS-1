import Vue from 'vue'
import Vuex from 'vuex'
import msgBoxComponent from '../components/MyPopUpWindow.vue'
import emergencyDispatch from './emergencyDispatch.js';
Vue.use(Vuex)
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        emergencyDispatch
    },
    state: {
      count: 0
    },
    mutations: {
      showMsgbox(){
       msgbox({
            title:'温馨提示',
            cancel:'取消',
            content:'这里是消息弹出内容',
            confirm:'确定按钮',
            className:'pop-custom'
        }).then(()=>{
            console.log("我点击了确定按钮")
        }).catch((err)=>{
            console.log("error");
        })
        },
        msgBox:(options={}) => {
            let msgBoxConstructor = Vue.extend(msgBoxComponent);
            let instance= new msgBoxConstructor({
                el: document.createElement('div')
            });
            document.body.appendChild(instance.$el);
            // 将单个 confirm instance 的配置合并到默认值中
            Object.assign(instance.$data, options);
            return new Promise((resolve, reject)=>{
                instance.show = true;
                let successBtn = instance.successBtn;
                let cancelBtn = instance.cancelBtn;
                instance.successBtn = () => {
                  resolve();
                  successBtn();
                }
                instance.cancelBtn = () => {
                  reject();
                  cancelBtn();
                }
            });
        }
        
    },
    actions:{

    }
  })
export default store
