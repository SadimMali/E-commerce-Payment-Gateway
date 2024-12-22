"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { useRouter } from "next/navigation";

export function AppPagination({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const pageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());

    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={
            !hasPrev ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }
          aria-disabled={hasPrev}
          onClick={() => hasPrev && pageChange(page - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <PaginationItem
                key={pageIndex}
                onClick={() => pageChange(pageIndex)}
              >
                <PaginationLink href="#" isActive={page === pageIndex}>
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>
            );
          }
        )}
        <PaginationItem>
        </PaginationItem>
        <PaginationItem
          className={
            !hasNext ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }
          onClick={() => hasNext && pageChange(page + 1)}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
