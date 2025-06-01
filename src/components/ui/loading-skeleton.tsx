import { Skeleton } from "./skeleton";

function MakeSkeleton(){
    return(
        <div className="space-y-6">
            <div className="grid gap-6">
                <Skeleton className="h-[300px] w-full rouded-lg" />
                <Skeleton className="h-[300px] w-full rouded-lg" />
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-[300px] w-full rouded-lg" />
                    <Skeleton className="h-[300px] w-full rouded-lg" />
                </div>
            </div>
        </div>
    );
}

export default MakeSkeleton; 