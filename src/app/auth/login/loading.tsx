import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

export default function Loading() {
  return (
    <div className="flex justify-center h-screen bg-nav items-center">
      <div className="text-4xl text-green-400 flex-col gap-8 font-mono font-bold flex items-center justify-center">
        <Trefoil
          size="100"
          stroke="4"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color="white"
        />
      </div>
    </div>
  );
}
