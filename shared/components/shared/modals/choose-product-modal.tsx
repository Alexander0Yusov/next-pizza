"use client";

import React from "react";

import { cn } from "@/shared/lib/utils";
import { DialogContent, Dialog } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductForm } from "..";
import { ProductWithRelations } from "@/@types/prizma";
import { Description, DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <Description className="hidden" />
        <DialogTitle className="hidden" />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
