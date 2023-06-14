<script setup lang="ts">
import { useWeatherStore, type City } from '@/stores/weather';
import { computed } from 'vue';
import { RouterLink } from "vue-router";


const weatherStore = useWeatherStore();
weatherStore.prepareCityList();

const cityList = computed(
  (): Map<string,City> =>{
    return weatherStore.cityList;
  }
);

</script>

<template>
  <section>
    <h2>City List</h2>
    <ul class = "list-group ms-3 text-decoration-none resultList">
      <li
        v-for = "[id, city] in cityList"
        v-bind:key = "id"
        class="list-group-item  list-group-item-action">
        <RouterLink v-bind:to="{name: 'WeatherCity',params:{id:id}}" class="text-decoration-none link-dark d-block">
          {{ city.name }}の天気
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.resultList{
  width: 16rem;
}

ul > li:hover {
  background-color:#a9ceec ;
}

</style>
