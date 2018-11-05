import Vue from 'vue'
import msgBoxComponent from '../MyPopUpWindow.vue'
import calculateResultScreenComponent from '../CalculateResultScreen.vue'
import timeCompare from '../TimeCompare.vue'
import timeCompareMaxWindow from '../TimeCompareMaxWindow.vue'

let msgBox = (options={}) => {
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

let calculateResultScreen = (options={}) => {
    let msgBoxConstructor = Vue.extend(calculateResultScreenComponent);
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

let timeCompareWindow = (options={}) => {
    let msgBoxConstructor = Vue.extend(timeCompare);
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

let timeComparemaxWindow = (options={}) => {
    let msgBoxConstructor = Vue.extend(timeCompareMaxWindow);
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

export default function(Vue) {
    // //添加全局API
    Vue.prototype.$msgbox = msgBox
    Vue.prototype.$calculateResultScreen = calculateResultScreen
    Vue.prototype.$timeCompareWindow = timeCompareWindow
    Vue.prototype.$timeComparemaxWindow = timeComparemaxWindow
} 