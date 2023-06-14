<script setup lang="ts">
import { useWeatherStore, type City } from '@/stores/weather';
import { computed } from 'vue';
import { RouterLink } from "vue-router";
import AutoInput from '@/components/AutoInput.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';

const weatherStore = useWeatherStore();

const cityName = computed(
  (): City =>{
    return weatherStore.selectedCity;
  }
);

</script>

<template>
  <main class="ms-3">
    <section class ="d-flex">
      <AutoInput/>

      <RouterLink v-bind:to="{name: 'CityList'}" class="ms-5 text-decoration-none lhLink">
        Choose from city list
      </RouterLink>

    </section>
    <WeatherInfo class="mt-3"/>
  </main>
</template>

<style scoped>

.lhLink{
  line-height: 5rem;
}

label{
  display: block;
}

</style>

