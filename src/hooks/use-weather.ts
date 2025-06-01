import { useQuery } from '@tanstack/react-query';
import type { Coordinates } from './../API/types';
import { weatherAPI } from '@/API/weather';

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", "current", coords] as const,
    forecast: (coords: Coordinates) => ["weather", "forecast", coords] as const,
    location: (coords: Coordinates) => ["weather", "location", coords] as const,
    search: (query: string) => ["weather", "location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function userForecastQuery(coordinates:Coordinates|null){
   return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates??{lat:0,lon:0}),
        queryFn:()=>coordinates?weatherAPI.getForecast(coordinates):null,
        enabled: !!coordinates,
    })
}
export function useReverseGeocodeQuery(coordinates:Coordinates|null){
   return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates??{lat:0,lon:0}),
        queryFn:()=>coordinates?weatherAPI.reversegeocode(coordinates):null,
        enabled: !!coordinates,
    })
}
export function useLocationSearch(query:string){
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn:()=>weatherAPI.searchLocation(query),
        enabled: query.length>=3,
    })
}