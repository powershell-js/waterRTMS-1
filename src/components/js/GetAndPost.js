import urlClass from './UrlClass'
import axios from 'axios'

class Methods {


    /**
     * 调用后台接口删除表
     * @param {*} tableNameTemp 表名
     */
    DropPlanTable(tableNameTemp){
        if(tableNameTemp!="")
        {
            axios.get(urlClass.axiosUrl+"DropPlanTable"+"/"+tableNameTemp)
            .then(function(response){
            })
        }
    }

}
export default new Methods()