"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
}
function CartItem({ images, name, price, smallDescription, id }: iAppProps) {
  const { removeItem } = useCart();
  const image = images[0];
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
          <Image
            src={image}
            alt="Product Image"
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="flex flex-col self-start">
          <span className="line-clamp-1 text-sm font-medium mb-1">{name}</span>
          <span className="text-xs line-clamp-1 capitalize text-muted-foreground">
            {smallDescription}
          </span>
          <div className="mt-4 text-xs text-muted-foreground border-none">
            <Button
              variant="ghost"
              size={"sm"}
              onClick={() => removeItem(id)}
              className="flex items-center gap-0.5 hover:bg-transparent hover:text-destructive"
            >
              <X className="w-3 h-3" />
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-1 font-medium">
        <span className="ml-auto line-clamp-1 text-sm">
          {formatPrice(price)}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
