import { LoadingProduct } from "@/app/components/Product";
import React from "react";

function LoadingFile() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3 mt-4">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    </div>
  );
}

export default LoadingFile;
