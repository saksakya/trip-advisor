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
  <main class = "ms-3">
    <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink v-bind:to="{name: 'TopPage'}" class="text-decoration-none">Top</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">CityList</li>
      </ol>
    </nav>

    <h4>Major city list</h4>
      <section>
        <ul class = "list-group text-decoration-none resultList">
          <li
            v-for = "[id, city] in cityList"
            v-bind:key = "id"
            class="list-group-item  list-group-item-action">
            <RouterLink v-bind:to="{name: 'WeatherCity',params:{id:id}}" class="text-decoration-none link-dark d-block">
              {{ city.name }}
            </RouterLink>
          </li>
        </ul>
    </section>
  </main>
</template>

<style scoped>
.resultList{
  width: 16rem;
}

ul > li:hover {
  background-color:#a9ceec ;
}

</style>
