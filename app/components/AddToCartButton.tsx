"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Product, useCart } from "@/hooks/use-cart";

function AddToCartButton({ product }: { product: Product }) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  const handleAddToCart = () => {
    addItem(product);
    setIsSuccess(true);
  };

  return (
    <Button
      size="lg"
      className="mt-10 w-full"
      onClick={handleAddToCart}
      disabled={isSuccess}
    >
      {isSuccess ? "Added!" : "Add to Cart"}
    </Button>
  );
}

export default AddToCartButton;
