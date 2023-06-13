<script setup lang="ts">
import { type WeatherList } from '@/stores/weather';

defineProps<WeatherList>();

</script>

<template>

  <ul>
    <li class="card-title">{{ date }}</li>
    <li class="text-muted mt-2">{{ weatherState }}</li>
    <li><img v-bind:src = "Icon"></li>
    <li class="small text-muted mt-2">気温</li>
    <li>最高 {{maxTemp}}℃</li>
    <li>最低 {{minTemp}}℃</li>
    <li class="small text-muted mt-2">湿度</li>
    <li>{{humidity}}%</li>
    <li class="small text-muted mt-2">風速</li>
    <li>{{windSpeed}}mph</li>
  </ul>

</template>

<style scoped>

ul{
  width : 10rem;
  list-style : none;
  text-align: center;
  border :green 1px solid;
  padding-left: 0px;
  display: inline-block;
  margin-right: 0.2rem;
}

.card-title{
  font-weight:bold;
}

</style>