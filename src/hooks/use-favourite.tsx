import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface favouriteCity{
    id:string;
    name:string;
    lat:number;
    lon:number;
    country:string;
    state?:string;
    AddedAt:number;
}

export function useFavourites(){
    const [Favourites,setFavourites] = useLocalStorage<favouriteCity[]>("favourites",[])

    const favouriteQuery = useQuery({
        queryKey: ["favourites"],
        queryFn: () => Favourites,
        initialData: Favourites,
        staleTime:Infinity
    })

    const queryClinet=useQueryClient();

    const addToFavourites=useMutation({
       mutationFn:async(city:Omit<favouriteCity,"id"|"addedAt">)=>{
        const newFavourite:favouriteCity = {
            ...city,
            id:`${city.lat}-${city.lon}`,
            AddedAt:Date.now(),
        }
        const exists = Favourites.some((fav)=>fav.id === newFavourite.id)
            if(exists){
                return Favourites;
            }
            const newFavourites = [...Favourites,newFavourite].slice(0,10);

            setFavourites(newFavourites)
            return newFavourites
       }, 
       onSuccess:()=>{
            queryClinet.invalidateQueries({
                queryKey:["Favourites"]
            })
       }
    });
    const removeFavourite = useMutation({
        mutationFn:async(cityID:string)=>{
            const newFavourite = Favourites.filter((city)=>city.id !== cityID);
            setFavourites(newFavourite)
            return newFavourite;
        },
        onSuccess:()=>{
            queryClinet.invalidateQueries({
                queryKey:["Favourites"]
            })
       }
    })
    return {
        Favourites:favouriteQuery.data,
        addToFavourites,
        removeFavourite,
        isFavourite:(lat:number,lon:number)=>
            Favourites.some((city)=>city.lat === lat && city.lon === lon),
    };
}