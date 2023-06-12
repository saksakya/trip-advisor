<script setup lang="ts">
import { useWeatherStore, type City, type WeatherList } from '@/stores/weather';
import { RouterLink } from "vue-router";
import { computed } from 'vue';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import DailyWeather from '@/components/DailyWeather.vue';

type Props = {
  id : string;
}

const props = defineProps<Props>();

const weatherStore = useWeatherStore();
weatherStore.recieveWeatherInfo(props.id);

const isLoading = computed(
  () : boolean => {
    return weatherStore.isLoading;
  }
);

const selectedCity = computed(
  () : City => {
    return weatherStore.selectedCity;
  }
);

//毎日9:00分時点の予報を入手
const weatherList = computed(
  () : Map<string,WeatherList> => {

    let newList = new Map <string,WeatherList>;
    const list = weatherStore.weatherList;

    list.forEach((value,key) => {
      const hour = format(new Date(key),'HH',{locale: ja });

      if(hour === "09"){
        const date = format(new Date(key),'M月dd日(E)',{locale: ja });
        newList.set(date,value);
        //console.log(value);
      }
    });

    return newList;
  }
);

</script>

<template>
  <p v-if="isLoading">データ取得中…</p>
  <section v-else>
    <h2>{{ selectedCity.name }}の天気</h2>
    <DailyWeather
      v-for = "[id,weather] in weatherList"
      v-bind = "weather"
      v-bind:date = "id"
    />
  </section>
  <p>リストに<RouterLink v-bind:to="{name:'CityList'}">戻る</RouterLink></p>
</template>

<style scoped>



</style>