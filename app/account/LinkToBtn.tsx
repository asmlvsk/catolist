"use client";

import { Snippet } from "@nextui-org/react";

export default function LinkToBtn({ link }: { link: string }) {
  return (
    <>
      <Snippet size="lg" className="" symbol="">
        <p className="max-md:w-[400px] max-sm:w-[150px] overflow-ellipsis whitespace-nowrap overflow-hidden">
          {link}
        </p>
      </Snippet>
    </>
  );
}
