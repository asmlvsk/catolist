"use client";
import { ranks } from "@/app/lib/ranks";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

type Props = {
  setRank: React.Dispatch<
    React.SetStateAction<"D" | "C" | "B" | "A" | "S" | null>
  >;
};

export default function CardSelectRank({ setRank }: Props) {
  const handleTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      setRank(null);
    } else {
      setRank(e.target.value as TierEnum | null);
    }
  };
  return (
    <Select
      label="Select a rank"
      className="max-w-xs"
      variant="bordered"
      onChange={handleTierChange}
    >
      {ranks.map((rank) => (
        <SelectItem key={rank.value} value={rank.value}>
          {rank.label}
        </SelectItem>
      ))}
    </Select>
  );
}
