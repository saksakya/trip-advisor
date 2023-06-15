<script setup lang="ts">
import { useWeatherStore, type City } from '@/stores/weather';
import { computed } from 'vue';
import { RouterLink } from "vue-router";
import WeatherInfo from '@/components/WeatherInfo.vue';

type Props = {
  id : string;
}
const props = defineProps<Props>();

const weatherStore = useWeatherStore();
weatherStore.prepareCityFromID(props.id);

// const cityName = computed(
//   (): City =>{
//     return weatherStore.selectedCity;
//   }
// );

</script>

<template>
  <main class="ms-3">

    <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink v-bind:to="{name: 'TopPage'}" class="text-decoration-none">Top</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink v-bind:to="{name: 'CityList'}" class="text-decoration-none">CityList</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">{{ props.id }}</li>
      </ol>
    </nav>

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

