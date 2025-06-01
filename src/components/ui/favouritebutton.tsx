import { Weatherdata } from "@/API/types"
import { useFavourites } from "@/hooks/use-favourite"
import { Button } from "./button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface favouritebuttonProps{
    data:Weatherdata
}

const Favouritebutton = ({data}:favouritebuttonProps) => {
    const {addToFavourites,isFavourite,removeFavourite}= useFavourites();
    const isCurrentlyFavourite = isFavourite(data.coord.lat,data.coord.lon);

    const handleFavourite = ()=>{
        if(isCurrentlyFavourite){
            removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favourites`)
        }
        else{
            addToFavourites.mutate({
                name:data.name,
                lat:data.coord.lat,
                lon:data.coord.lon,
                country:data.sys.country,
                AddedAt: Date.now()
            });
            toast.success(`Added ${data.name} to favourites`)
        }
    }
  return (
    <Button variant={isCurrentlyFavourite ? "default":"outline"} size={"icon"} className={isCurrentlyFavourite ? "bg-yellow-500 hover:bg-yellow-600":""} onClick={handleFavourite}>
        <Star className={`h-4 w-4 ${isCurrentlyFavourite?"fill current":""}`}/>
    </Button>
  )
}

export default Favouritebutton