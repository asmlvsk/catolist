"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@nextui-org/react";

export default function SearchAnime() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");

  const handleOptionChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?search=${selectedValue}`);
  };

  const handleSearch = () => {
    if (selectedValue) {
      router.push(`${pathname}?search=${selectedValue}`);
    }
  };

  useEffect(() => {
    if (search) {
      setSelectedValue(search);
    }
  }, []);

  const handleClearSearch = () => {
    setSelectedValue("");
    router.push(`${pathname}`);
  };

  return (
    <form
      onSubmit={handleOptionChange}
      className="mt-10 w-1/2 max-md:w-full max-md:px-4"
    >
      <Input
        type="text"
        placeholder="Search for title"
        labelPlacement="outside"
        startContent={
          <div onClick={handleSearch} className="cursor-pointer">
            <MagnifyingGlassIcon
              width={30}
              height={30}
              className="text-default-400 pointer-events-none flex-shrink-0"
            />
          </div>
        }
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        isClearable
        onClear={handleClearSearch}
      />
    </form>
  );
}
