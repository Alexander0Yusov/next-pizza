"use client";
import React from "react";
import { CountButton, CountButtonProps } from "./count-button";
import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { Ingredient } from "@prisma/client";
import * as CartItem from "./cart-item-details";
import { X } from "lucide-react";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  ingredients?: Ingredient[];
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  onClickCountButton,
  onClickRemove,
  disabled,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <div className="flex flex-1 gap-5 items-center">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <CartItem.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hpver:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
