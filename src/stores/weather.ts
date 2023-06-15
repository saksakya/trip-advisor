import { defineStore } from 'pinia'

export interface City{
  name : string;
  q : string;
  lang : string;
}

export interface WeatherList{
  date : string;
  maxTemp : number;
  minTemp : number;
  windSpeed : number;
  weatherState : string;
  humidity : number;
  Icon : string;
}

interface State{
  cityList : Map <string, City>;
  selectedCity : City;
  isLoading : boolean;
  weatherList : Map <string, WeatherList>;
}

export const useWeatherStore = defineStore({
  id : "weather",
  state: () : State => {
    return{
      cityList : new Map <string, City>(),
      selectedCity:{
        name:"Tokyo",
        q:"Tokyo",
        lang:"en"
      },
      isLoading : true,
      weatherList: new Map <string,WeatherList>()
    };
  },
  getters:{

  },
  actions:{
    prepareCityList(){
      this.cityList.set("Sapporo",
      {
        name : "Sapporo",
        q : "Sapporo",
        lang : "en"
      });
      this.cityList.set("Sendai",
      {
        name : "Sendai",
        q : "Sendai",
        lang : "en"
      });
      this.cityList.set("Tokyo",
      {
        name : "Tokyo",
        q : "Tokyo",
        lang : "en"
      });
      this.cityList.set("Osaka",
      {
        name : "Osaka",
        q : "Osaka",
        lang : "en"
      });
      this.cityList.set("Nagoya",
      {
        name : "Nagoya",
        q : "Nagoya",
        lang : "en"
      });
      this.cityList.set("Shizuoka",
      {
        name : "Shizuoka",
        q : "shizuoka",
        lang : "en"
      });
      this.cityList.set("Hiroshima",
      {
        name : "Hiroshima",
        q : "Hiroshima",
        lang : "en"
      });
      this.cityList.set("Fukuoka",
      {
        name : "Fukuoka",
        q : "Fukuoka",
        lang : "en"
      });

    },
    prepareCityFromID(id:string){
      this.selectedCity = this.cityList.get(id) as City;
      this.recieveWeatherInfo();
    },

    prepareCityName(city){
      this.selectedCity = {
        name : city.name,
        q : city.name,
        lang : "en"
      }
      this.recieveWeatherInfo();
    },

    async recieveWeatherInfo(){

      const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/forecast";
      const formerIconURL = "https://openweathermap.org/img/wn/"
      const latterIconURL = "@2x.png"

      const params:{
        lang:string,
        q:string,
        appId:string
      } =
      {
        lang:this.selectedCity.lang,
        q:this.selectedCity.q,
        appId:import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }

      const queryParams = new URLSearchParams(params);
      const urlFull = `${weatherInfoUrl}?${queryParams}`;
      const response = await fetch(urlFull);
      const weatherInfoJSON = await response.json();
      const weatherArray = weatherInfoJSON.list

      const calTemp =  (kelvin : string) : number => {
        const temp = Math.trunc((Number(kelvin)-273.15)*10) / 10;
        return temp;
      }
      //console.log(weatherArray[0]);
      //JSONデータから必要なデータを取り出し
      for(let i = 0; i < weatherArray.length; i++){
        this.weatherList.set(weatherArray[i].dt_txt,{
            date : weatherArray[i].dt_txt,
            maxTemp : calTemp(weatherArray[i].main.temp_max),
            minTemp :  calTemp(weatherArray[i].main.temp_min),
            windSpeed : Number(weatherArray[i].wind.speed),
            weatherState : weatherArray[i].weather[0].description,
            humidity :Number(weatherArray[i].main.humidity),
            Icon : `${formerIconURL}${weatherArray[i].weather[0].icon}${latterIconURL}`
          });
      }
      this.isLoading = false;
    }
  }
});