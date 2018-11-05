import Vue from 'vue'
import Router from 'vue-router'
import ArcgisTdt from '@/components/ArcgisTdt'
import Analysis from '@/components/Analysis'
import Diffusion from '@/components/Diffusion'
import ForecastWaring from '@/components/ForecastWaring'
import AccuracyFollowing from '@/components/AccuracyFollowing'
import MyTdt from '@/components/MyTdt'
import calculateResultScreenComponent from '@/components/CalculateResultScreen.vue'
import BurstPipe from '@/components/PipeBurst/index.vue'
import SupplyPathNew from '@/components/SupplyPathNew/index.vue'
import DiffusionNew from '@/components/DiffusionNew/index.vue'
import emergencyDispatch from '@/components/emergencyDispatch/index.vue'
Vue.use(Router)

export default new Router({
    routes: [
           {
            path: '/ztdata/RunningState',
            name: 'ArcgisTdt',
            component: ArcgisTdt 
        },
        {
            path: '/ztdata/SupplyPath',
            name: 'Analysis',
            component: Analysis 
        },
        {
            path: '/ztdata/Diffusion',
            name: 'Diffusion',
            component: Diffusion 
        },
        {
            path: '/ztdata/ForecastWaring',
            name: 'ForecastWaring',
            component: ForecastWaring 
        },
        {
            path: '/ztdata/AccuracyFollowing',
            name: 'AccuracyFollowing',
            component: AccuracyFollowing 
        },
        {
            path: '/ztdata/BurstPipe',
            name: 'BurstPipe',
            component: BurstPipe 
        },
        {
            path: '/ztdata/SupplyPathNew',
            name: 'SupplyPathNew',
            component: SupplyPathNew 
        },
        {
            path: '/ztdata/DiffusionNew',
            name: 'DiffusionNew',
            component: DiffusionNew 
        },
        {
            path: '/ztdata/Emergencydispatch',
            name: 'emergencyDispatch',
            component: emergencyDispatch
        },
        {
            path: '/ztdata/rcdd',
            name: 'Rcdd',
            component: () => import('@/components/Rcdd/index')
        },
        {
            path: '/ztdata/plandispatch',
            name: 'PlanDispatch',
            component: () => import('@/components/planDispatch/index')
        },
        {
            path: '/ztdata/planManagement',
            name: 'PlanManagement',
            component: () => import('@/components/PlanManagement/index')
        }

/* ,{
            path: '/plandispatch',
            name: 'PlanDispatch',
            component: () => import('@/components/planDispatch/index')
        } */
    ]
})
