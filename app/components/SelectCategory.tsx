"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { CategoryItems } from "../lib/categories";
import { useState } from "react";

function SelectCategory() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
      <input type="hidden" name="category" value={selectedCat || ""} />
      {CategoryItems.map((item) => (
        <div key={item.id}>
          <Card
            className={
              selectedCat === item.name
                ? "border-primary border-2"
                : "border-2 border-primary/10"
            }
            onClick={() => {
              setSelectedCat(item.name);
            }}
          >
            <CardHeader>
              {item.image}
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
