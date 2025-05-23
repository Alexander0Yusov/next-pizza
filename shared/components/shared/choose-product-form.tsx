import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit?: VoidFunction;
  loading?: boolean;
  className?: string;
}

// Форма выбора продукта
export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  onSubmit,
  loading,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <div
        className={cn(
          "flex flex-1 w-full relative justify-center items-center",
          className
        )}
      >
        <img
          className={cn(
            "relative left-2 top-2 duration-300 transition-all z-10 w-[350px] h-[350px]"
          )}
          src={imageUrl}
          alt={name}
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} $
        </Button>
      </div>
    </div>
  );
};
