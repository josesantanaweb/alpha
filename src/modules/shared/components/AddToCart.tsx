"use client";
import { Button } from "@/modules/shared/components/ui";
import { FavoriteButton } from "./FavoriteButton";

interface AddToCartProps {
  perfumeId: string;
}

export const AddToCart = ({ perfumeId }: AddToCartProps) => {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex items-center gap-3 md:max-w-md bg-surface p-4">
      <FavoriteButton perfumeId={perfumeId} />
      <Button>Agregar al carrito</Button>
    </div>
  );
};
