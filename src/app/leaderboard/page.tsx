"use client";

import { cn, getPositionBorder, getPositionText } from "@/lib/utils";
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

export default function LeaderboardPage() {
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
	// TODO: Investigate the warning above
  );

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      autoScrollOnDrag: true,
      // dragAxis: "y",
    });

    swapyRef.current.onSwap((event) => {
      setSlotItemMap(event.newSlotItemMap.asArray);
    });

    swapyRef.current.onSwapEnd((event) => {
      // This is where u can do something with the new order
      console.log("Swap ended", event.slotItemMap.asArray);
    });

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <div
      className="max-w-lg w-full flex flex-col gap-2 mx-auto"
      ref={containerRef}
    >
      <div className="items">
        {slottedItems.map(({ itemId, item }, index) => (
          <div className="slot" key={index} data-swapy-slot={index + 1}>
            {item && (
              <div
                className={cn(
                  "flex items-center justify-center font-bold text-lg bg-background border-[3px] p-4 rounded-md w-full h-full relative cursor-grab hover:cursor-grab active:cursor-grabbing",
                  getPositionBorder(index + 1) // Apply border color based on position
                )}
                data-swapy-item={itemId}
                key={itemId}
              >
                {/* Number Label */}
                <div
                  className={cn(
                    "absolute left-6 font-semibold text-xl",
                    getPositionText(index + 1) // Apply text color based on position
                  )}
                >
                  #{index + 1}
                </div>
                {/* Card Content */}
                <div className="flex flex-row">
                  {/* Add character image here if u want */}
                  <div className="text-center text-foreground">
                    {item.title}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
