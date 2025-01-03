"use client";

import { useState, useEffect } from "react";
import { FavoriteColor } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ColorsPage() {
  const [colors, setColors] = useState<FavoriteColor[]>([]);
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    fetch("/api/colors")
      .then((res) => res.json())
      .then((data) => setColors(data));
  }, []);

  const addColor = async () => {
    const res = await fetch("/api/colors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: newColor }),
    });
    const data = await res.json();
    setColors([...colors, data]);
    setNewColor("");
  };

  const removeColor = async (id: number) => {
    await fetch("/api/colors", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setColors(colors.filter((color) => color.id !== id));
  };

  return (
    <div>
      <h1>Colors</h1>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            {color.color}{" "}
            <button
              className="text-red-500"
              onClick={() => removeColor(color.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          className="max-w-96"
          type="text"
          placeholder="Add a new color"
          onChange={(e) => setNewColor(e.target.value)}
          value={newColor}
        />
        <Button onClick={addColor}>Add Color</Button>
      </div>
    </div>
  );
}
