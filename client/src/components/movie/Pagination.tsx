"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number;
  totalPage: number;
};

export function MoviePagePagination({ currentPage, totalPage }: Props) {
  const router = useRouter();
  return (
    <Pagination
      isCompact
      color="primary"
      showControls
      total={totalPage}
      initialPage={currentPage}
      siblings={5}
      onChange={(page) => router.push(`/movies?page=${page}`)}
    />
  );
}
