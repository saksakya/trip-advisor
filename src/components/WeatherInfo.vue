<script setup lang="ts">
import { useWeatherStore, type City, type WeatherList } from '@/stores/weather';
import { computed } from 'vue';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import DailyWeather from '@/components/DailyWeather.vue';
import HourlyWeather from '@/components/HourlyWeather.vue';

interface showWeather {
  daily : Map <string,WeatherList>;
  hourly : Map <string,WeatherList>;
}

const weatherStore = useWeatherStore();

const isLoading = computed(
  () : boolean => {
    return weatherStore.isLoading;
  }
);

const selectedCity = computed(
  () : City => {
    //weatherStore.recieveWeatherInfo();
    return weatherStore.selectedCity;
  }
);

//デイリー情報、時間情報予報を入手
const weatherList = computed(
  () : showWeather => {

    let newList = {
      daily : new Map <string,WeatherList>,
      hourly : new Map <string,WeatherList>
    }

    let hourNum = 1;
    let flag1 = false;
    let hourFlag = false;

    const list = weatherStore.weatherList;

    list.forEach((value,key) => {
      const hour = Number(format(new Date(key),'HH',{locale: ja }));
      let nowHour = Number(format(new Date(),'HH',{locale: ja }));

      if (nowHour > 21) nowHour = 0;
      if(flag1) hourFlag = true; //flag1が立った次の週から取得開始
      if(hour <= nowHour ) flag1 = true;

       //現在時刻以降24時間の時間情報も入手
      if(hourFlag && 0 < hourNum && hourNum < 9){
        hourNum ++;
        const time = format(new Date(key),'HH時',{locale: ja });
        newList.hourly.set(time,value);
      }

      //日次は毎日9:00時点の天気情報を入手
      if(hour === 9){
        const date = format(new Date(key),'M月dd日(E)',{locale: ja });
        newList.daily.set(date,value);
        //console.log(value);
      }
    });
    //console.log(newList)
    return newList;
  }
);

</script>

<template>

  <p v-if="isLoading">データ取得中…</p>
  <section v-else>

    <h4>{{ selectedCity.name }}, Japan Weather</h4>
    <div>
      <HourlyWeather
        v-for = "[id,weather] in weatherList.hourly"
        v-bind = "weather"
        v-bind:date = "id"
      />
    </div>
    <div>
      <DailyWeather
        v-for = "[id,weather] in weatherList.daily"
        v-bind = "weather"
        v-bind:date = "id"
      />
    </div>
  </section>

</template>

<style scoped>

</style>