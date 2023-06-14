import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import TopPage from "@/views/TopPage.vue";
import CityList from "@/views/CityList.vue";

const routeSettings: RouteRecordRaw[] = [
  {
    path:"/",
    name:"TopPage",
    component:TopPage
  },
  {
    path:"/citylist",
    name:"CityList",
    component:CityList
  },
 {
    path:"/cityList/:id",
    name:"WeatherCity",
    component:() =>{
      return import("@/views/WeatherCity.vue");
    },
    props:true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
})

export default router