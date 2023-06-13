<script setup lang="ts">
import { useWeatherStore, type City } from '@/stores/weather';
import { computed } from 'vue';
import { RouterLink } from "vue-router";
import AutoInput from '@/components/AutoInput.vue';

const weatherStore = useWeatherStore();
weatherStore.prepareCityList();

const cityList = computed(
  (): Map<string,City> =>{
    return weatherStore.cityList;
  }
);

</script>

<template>
  <AutoInput/>
  <section>
    <ul>
      <li
        v-for = "[id, city] in cityList"
        v-bind:key = "id">
        <RouterLink v-bind:to="{name: 'WeatherInfo',params:{id:id}}">
          {{ city.name }}の天気
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>



  label{
    display: block;
  }

</style>

