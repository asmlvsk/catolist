"use client";

import React from "react";
import { Pagination } from "@nextui-org/react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { JikanAnimeData, JikanPagination } from "../types/jikanAPITypes";

type Props = {
  data: JikanAnimeData[];
  pagination: JikanPagination;
};

export default function CustomPagination({ list }: { list: Props }) {
  const router = useRouter();
  const pathname = usePathname();

  const animePath = pathname === "/anime";

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as ReadonlyURLSearchParams);
  const page = searchParams?.get("page") ?? "1";
  const total = Math.ceil(
    list.pagination.items!.total / list.pagination.items!.per_page
  );

  const handlePageChange = (newPage: number) => {
    params.set("page", newPage.toString());
    const newQuery = params.toString();
    router.push(`${animePath ? "/anime" : "/manga"}?${newQuery}`);
  };
  return (
    <Pagination
      disableCursorAnimation
      showControls
      page={Number(page)}
      total={total}
      onChange={handlePageChange}
      radius="full"
      className="gap-2"
      variant="light"
    />
  );
}
