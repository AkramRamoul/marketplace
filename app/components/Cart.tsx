"use client";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";

function Cart() {
  const [ismounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { items } = useCart();

  const numItems = items.length;
  const total = items.reduce((total, { product }) => total + product.price, 0);
  const fee = 1;
  return (
    <Sheet>
      <SheetTrigger asChild className="group -m-2 flex items-center p-2">
        <div className="flex items-center">
          <ShoppingCart
            className="w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {ismounted ? numItems : 0}
          </span>
        </div>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart({numItems})</SheetTitle>
        </SheetHeader>
        {numItems > 0 ? (
          <>
            <div className="flex w-full flex-col pr-2">
              <ScrollArea className="overflow-y-auto max-h-[400px] w-full">
                <div className="space-y-3 py-4 pr-4">
                  {items.map(({ product }) => (
                    <CartItem
                      key={product.id}
                      images={product.images}
                      price={product.price}
                      name={product.name}
                      smallDescription={product.smallDescription}
                      id={product.id}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(total + fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 w-60 h-60 text-muted-foreground">
              <Image
                aria-hidden="true"
                src="/empty-cart.png"
                alt="empty cart"
                fill
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="text-md font-semibold">Your Cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products/all"
                className={buttonVariants({
                  className: "text-sm text-muted-foreground",
                  variant: "link",
                  size: "sm",
                })}
              >
                Add some products to your cart
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
