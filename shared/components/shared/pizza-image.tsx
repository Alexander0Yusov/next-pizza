import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  size: 20 | 30 | 40;
  imageUrl: string;
  className?: string;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div
      className={cn(
        "flex flex-1 w-full relative justify-center items-center",
        className
      )}
    >
      <img
        className={cn(
          "relative left-1 top-1 duration-300 transition-all z-10",
          {
            "w-[300px] h-[300px]": size === 20,
            "w-[400px] h-[400px]": size === 30,
            "w-[500px] h-[500px]": size === 40,
          }
        )}
        src={imageUrl}
        alt="Logo"
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};
