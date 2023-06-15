<script setup lang="ts">
  import { computed, ref } from 'vue'
  import cities from '@/assets/cities.json'
  import { useWeatherStore } from '@/stores/weather';

  const weatherStore = useWeatherStore();

  let searchTerm = ref('');
  let selectedCity = ref('');
  let searchFlag = ref(true);

  const searchCities = computed(() => {

    if(searchTerm.value === '' || !searchFlag.value){
      searchFlag.value = true;
      return [];
    }

    let matches = 0;

    return cities.filter (city => {
      if(
        city.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        && city.country.toLowerCase() === 'jp'
        && matches < 100
      ) {
        matches++;
        return city;
      }
    })
  });

  const selectCity = (city) => {
      selectedCity.value = city.name;
      searchTerm.value = city.name;
      searchFlag.value = false;

      weatherStore.prepareCityName(city);
  }

</script>

<template>
  <div>
    <label for = "search" class ="form-label fw-bold">
      Or type the name of city to search
    </label>
    <input
      type = "text"
      id = "search"
      placeholder="City name"
      class = "form-control"
      autocomplete="off"
      v-model="searchTerm"
      >

    <div v-if="searchCities.length" >
      <p class ="my-1">Showing {{ searchCities.length }} of {{ cities.length }} results</p>
      <ul class = "list-group resultList">
        <li
          v-for="city in searchCities"
              :key="city.name"
              v-on:click = "selectCity(city)"
              class="list-group-item  list-group-item-action"
          >
          {{ city.name }}</li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
  .form-control{
    width : 20rem;
  }
  .resultList{
    width: 21rem;
    height: 20rem;
    overflow: auto;
    z-index : 1000;
  }

  ul > li:hover {
    background-color:#a9ceec ;
  }

  label{
    display: block;
  }

</style>