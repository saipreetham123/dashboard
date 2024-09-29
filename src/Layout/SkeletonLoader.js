import { Skeleton } from '../shadcn/skeleton';

export function SkeletonCard() {
  return (
    <div className="skeleton-container flex justify-center items-center min-h-screen"> {/* Center and fill the screen */}
      <div className="flex flex-col space-y-3 p-4 rounded-lg "> {/* Add padding and background */}
        <Skeleton className="h-[625px] w-[1250px] rounded-xl animate-pulse" /> {/* Add animation */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[550px] animate-pulse" /> {/* Add animation */}
          <Skeleton className="h-4 w-[300px] animate-pulse" /> {/* Add animation */}
        </div>
      </div>
    </div>
  );
}