// 引入 axios
import axios from 'axios'
import urlClass from '@/components/js/UrlClass'
export default {

  APILIST1(state) {
     axios.post(urlClass.axiosUrlYA+'GetWaterquantity', JSON.stringify(state.object))
       .then(function (res) {
         console.log(res)
         state.apilist1data=res
         alert("请求后台数据成功了：APILIST1")
       })
       .catch(function (err) {
         console.log(err)

       })
  },
   APILIST2(state) {
     axios.post(urlClass.axiosUrlYA+'GetTotalNumber', JSON.stringify(state.object))
       .then(function (res) {
     /*     console.log(res) */
     state.apilist2data = res
         alert("请求后台数据成功了：APILIST2")
       })
       .catch(function (err) {
         console.log(err)

       })
   },
 APILIST3(state) {
   axios.post(urlClass.axiosUrlYA+'GetPressurePoint', JSON.stringify(state.object))
     .then(function (res) {
       /*     console.log(res) */
       state.apilist3data = res
       alert("请求后台数据成功了：APILIST3")
     })
     .catch(function (err) {
       console.log(err)

     })
 },
}