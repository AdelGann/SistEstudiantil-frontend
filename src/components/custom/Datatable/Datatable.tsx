import { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface Column {
  Header: string;
  Field: string;
}
interface DataTableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  columns: Column[];
  pageSize?: number;
  caption?: string;
  Render?: (rowData: T, rowIndex: string | number) => ReactNode;
}

export const Datatable = <T,>({
  data,
  columns,
  pageSize = 10,
  caption,
  Render,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const total = data.length;

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= Math.ceil(total / pageSize)) {
      setCurrentPage(page);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  return (
    <div className="space-y-4">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.Field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.Header}
              </TableHead>
            ))}
            {Render && (
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {paginatedData.map(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              row: any,
              rowIndex: number,
            ) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.Field}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[10px]"
                  >
                    {row[column.Field]}
                  </TableCell>
                ))}
                <TableCell className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[5px]">
                  {Render && Render(row, rowIndex)}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          isActive={currentPage === 1}
        />
        <PaginationContent>
          {Array.from({ length: Math.ceil(total / pageSize) }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          isActive={currentPage === Math.ceil(total / pageSize)}
        />
      </Pagination>
    </div>
  );
};
