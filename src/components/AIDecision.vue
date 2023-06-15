<script setup lang="ts">
import { useWeatherStore, type City, type WeatherList } from '@/stores/weather';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Configuration, OpenAIApi } from "openai";
import { computed, ref, watch } from "vue";

  const weatherStore = useWeatherStore();

  //openAI設定
  const configuration = new Configuration({
      organization: "org-21JSjSbPhJ6PWsCEmDAhGO8L",
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // type Message = {
  //   role : "user" | "system" | "assistant",
  //   content : string
  // };

  const answer = ref<string>();
  const resultFlag = ref(false);
  const loadingFlag = ref(false);

  const question = computed(
    () : string =>{
      const placeName = weatherStore.selectedCity.name;
      const weatherList = weatherStore.weatherList;
      let weather;

      weatherList.forEach((value,key) => {
        const hour = Number(format(new Date(key),'HH',{locale: ja }));
        if(hour === 9){
          weather = value.weatherState;
        }
      });

      if(weather == null){
        return '';
      } else {
        return `Tell me your travel plan for ${placeName} in Japan on a ${weather}`;
      }
    }
  )

  watch(question, async() =>{
    loadingFlag.value = true;

    const response = await openai.createChatCompletion({
      model : "gpt-3.5-turbo",
      messages : [{
        role: "user",
        content: question.value
      }],
    });
    answer.value = response.data.choices[0].message?.content;

    loadingFlag.value = false;
    resultFlag.value = true;

    console.log(question.value);
    console.log(answer.value);
  });

</script>

<template>
  <p v-if = "loadingFlag" class="ms-5 mt-3">
    <span class="spinner-border  spinner-border-sm mt-3" role="status"></span>
    <span><strong class=" ms-1">Generating answers...</strong></span>
  </p>
  <div v-else-if = "resultFlag" class = "ms-3 me-3 point-box">
    <div class=" lead fw-bold point-title">Suggestion from AI</div>
    <span class="test">{{ answer }}</span>
  </div>

</template>

<style scoped>
.point-box {
  position: relative;
  border: 0.15rem solid #555555; /* 枠の太さ・種類・色 */
  border-radius: 0.4rem; /* 枠の丸み */
  padding: 1rem 1rem;
}

.point-title {
  position: absolute;
  padding: 0 0.5em;
  left: 2rem;
  top: -1rem; /* タイトルの位置を調整 */
  color: #555555;
  background-color: #ffffff;
}
.test{
  white-space: pre-wrap;
  word-wrap:break-word;
}

</style>