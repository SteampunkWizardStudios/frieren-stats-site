"use client";

import { cn, getPositionBorder, getPositionText } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, utils, type SlotItemMapArray, type Swapy } from "swapy";

type Character = {
  id: string;
  title: string;
};

const initialItems: Character[] = [
  { id: "frieren", title: "Frieren" },
  { id: "fern", title: "Fern" },
  { id: "stark", title: "Stark" },
  { id: "himmel", title: "Himmel" },
  { id: "eisen", title: "Eisen" },
  { id: "heiter", title: "Heiter" },
  { id: "ubel", title: "Übel" },
  { id: "land", title: "Land" },
  { id: "sense", title: "Sense" },
  { id: "serie", title: "Serie" },
];

export default function TierList() {
  const [items, _setItems] = useState<Character[]>(initialItems);
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(items, "id")
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(items, "id", slotItemMap),
    [items, slotItemMap]
  );

  const swapyRef = useRef<Swapy | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      utils.dynamicSwapy(
        swapyRef.current,
        items,
        "id",
        slotItemMap,
        setSlotItemMap
      ),
    [items] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      autoScrollOnDrag: true,
    });

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray);
    });

    swapyRef.current.onSwapEnd((event) => {
      console.log("Swap ended", event.slotItemMap.asArray);
    });

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-row gap-4" ref={containerRef}>
      {slottedItems.map(({ itemId, item }, index) => (
        <div className="slot" key={index} data-swapy-slot={index + 1}>
          {item && (
            <div data-swapy-item={itemId} key={itemId}>
              <Character image="sense.webp" />
              {item.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Character({ image }: { image: string }) {
  return (
    <div className="relative size-24 border-purple-600 border-2">
      <Image src={`/characters/${image}`} alt={image} fill objectFit="cover" />
    </div>
  );
}
