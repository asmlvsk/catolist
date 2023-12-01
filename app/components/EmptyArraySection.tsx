import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

type Props = {
  linkTo: string;
  emptyTitle?: string;
  emptySubtitle?: string;
  icon?: React.ReactNode;
};

export const EmptyArraySection = ({
  linkTo,
  emptyTitle,
  emptySubtitle,
  icon,
}: Props) => {
  return (
    <div className="flex flex-col justify-center brightness-50 items-center h-[70vh]">
      <h2>{emptyTitle}</h2>
      <span>{emptySubtitle}</span>
      <Link href={linkTo}>{icon}</Link>
    </div>
  );
};
