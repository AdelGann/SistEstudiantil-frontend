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
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Column {
  Header: string;
  Field: string;
}
interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: Column[];
  pageSize?: number;
  caption?: string;
  onRowButtonClick?: (rowData: any) => void;
}

export const Datatable: React.FC<DataTableProps> = ({
  data,
  columns,
  pageSize = 10,
  caption,
  onRowButtonClick,
}) => {
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
            {onRowButtonClick && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={column.Field}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[10px]"
                >
                  {row[column.Field]}
                </TableCell>
              ))}
              {onRowButtonClick && (
                <TableCell>
                  <Button onClick={() => onRowButtonClick(row)}>Action</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
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
