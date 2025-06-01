import { API_CONFIG } from "./config"
import type { Coordinates, Forecastdata, GeocodingResponse, Weatherdata } from "./types";

class WeatherAPI{
    private createUrl(endpoint:string,params:Record<string,string|number>){
        const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params,
        })
        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchData<T>(url:string):Promise<T>{
        const response = await fetch(url);

        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Weather API error: ${errorText}`);
        }

        return response.json();
    }
    async getCurrentWeather({lat,lon}:Coordinates):Promise<Weatherdata>{
        const url=this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        })
        return this.fetchData<Weatherdata>(url);
    }
    async getForecast({lat,lon}:Coordinates):Promise<Forecastdata>{
        const url=this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        })
        return this.fetchData<Forecastdata>(url);
    }
    async reversegeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url=this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limits:1,
        })
        return this.fetchData<GeocodingResponse[]>(url);
    }
    async searchLocation(query:string):Promise<GeocodingResponse[]>{
        const url= this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q:query,
            limit:"5",
        });
        return this.fetchData<GeocodingResponse[]>(url)
    }
}

export const weatherAPI=new WeatherAPI();