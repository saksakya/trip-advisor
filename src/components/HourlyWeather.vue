<script setup lang="ts">
import { type WeatherList } from '@/stores/weather';

defineProps<WeatherList>();

</script>

<template>

  <ul>
    <li>{{ date }}</li>
    <li><img v-bind:src = "Icon"></li>
    <li>{{ Math.trunc((maxTemp+minTemp)/2) }}℃</li>
  </ul>

</template>

<style scoped>

ul{
  width : 5rem;
  list-style : none;
  text-align: center;
  padding-left: 0px;
  display: inline-block;
  margin-right: 1.5rem;
}

</style>