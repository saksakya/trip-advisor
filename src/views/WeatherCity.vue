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

