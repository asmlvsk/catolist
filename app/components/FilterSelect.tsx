"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

type Props = {
  items: Array<SelectType>;
  label: string;
  param: string;
};

const FilterSelect = ({ items, label, param }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parameter = searchParams?.get(param);
  const [selectedValue, setSelectedValue] = useState<string | null>(parameter);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    if (e.target.value === "") {
      router.push(pathname + "?" + createQueryString(param, ""));
    }
    router.push(pathname + "?" + createQueryString(param, e.target.value));
  };

  useEffect(() => {
    if (parameter) {
      setSelectedValue(parameter);
    }
  }, []);

  return (
    <Select
      label={label}
      size="sm"
      onChange={handleOptionChange}
      selectedKeys={[(selectedValue as string) || ""]}
      placeholder={`Select a ${label}`}
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FilterSelect;
