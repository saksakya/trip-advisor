import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import searchPlace from "@/views/searchPlace.vue";

const routeSettings: RouteRecordRaw[] = [
  {
    path:"/",
    name:"searchPlace",
    component:searchPlace
  },
 {
    path:"/weatherInfo/:id",
    name:"WeatherInfo",
    component:() =>{
      return import("@/views/WeatherInfo.vue");
    },
    props:true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
})

export default router