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
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">Top</li>
    </ol>

    <section class="d-flex">
      <div>
        <p class="mb-0"><RouterLink v-bind:to="{name: 'CityList'}" class="text-decoration-none">
            Choose from city list
          </RouterLink></p>
        <AutoInput/>
      </div>

      <div class = "ms-5 fw-bold lead">
        <p>Ask AI for travel plans</p>
      </div>

    </section>

    <WeatherInfo class="mt-3"/>
  </main>
</template>

<style scoped>

label{
  display: block;
}

</style>

