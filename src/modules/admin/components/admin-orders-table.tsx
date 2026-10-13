"use client";

import { type ReactElement } from "react";
import Image from "next/image";
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  Checkbox,
  TablePagination,
  TableSummary,
} from "@/modules/shared/components";
import { formatDate } from "@/modules/shared/utils";
import type { AdminOrderRow } from "@/modules/admin/types";
import { OrderStatusBadge } from "@/modules/orders/components";
import { AdminRowActions } from "./admin-row-actions";

export interface AdminOrdersTableProps {
  orders: AdminOrderRow[];
  onDeleteSelected?: (ids: string[]) => void;
}

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
});

const helper = createColumnHelper<typeof features, AdminOrderRow>();

const columns = helper.columns([
  helper.display({
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Seleccionar todos los pedidos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Seleccionar ${row.getValue("name")}`}
      />
    ),
  }),
  helper.accessor("id", {
    header: "ID Pedido",
    cell: ({ getValue }) => (
      <span className="text-sm text-white">
        #{getValue().slice(0, 8).toUpperCase()}
      </span>
    ),
  }),
  helper.accessor("name", {
    header: "Pedido",
    cell: ({ row }) => {
      const { image, name, itemCount } = row.original;
      const extraCount = itemCount - 1;
      return (
        <div className="flex items-center gap-3">
          {image && (
            <div className="border-stroke relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/20 blur-sm" />
              </div>
              <div className="w-3">
                <Image
                  src={image}
                  alt={name}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <p className="max-w-25 truncate text-sm font-semibold text-white">
              {name}
            </p>
            {extraCount > 0 && (
              <p className="text-body text-sm">+{extraCount} más</p>
            )}
          </div>
        </div>
      );
    },
  }),
  helper.accessor("contactName", {
    header: "Cliente",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3">
        <div className="text-surface flex h-9 w-9 items-center justify-center rounded-full bg-white font-semibold">
          {getValue().charAt(0).toUpperCase()}
        </div>
        <span className="max-w-45 truncate text-sm font-semibold text-white">
          {getValue()}
        </span>
      </div>
    ),
  }),
  helper.accessor("createdAt", {
    header: "Fecha",
    cell: ({ getValue }) => (
      <span className="text-sm font-semibold text-white">
        {formatDate(getValue())}
      </span>
    ),
  }),
  helper.display({
    id: "payment",
    header: "Pago",
    cell: () => (
      <span className="flex w-fit items-center gap-1 px-2 py-1 text-sm font-semibold text-emerald-400">
        Pagado
      </span>
    ),
  }),
  helper.accessor("status", {
    header: "Estado",
    cell: ({ getValue }) => <OrderStatusBadge status={getValue()} />,
  }),
  helper.display({
    id: "actions",
    header: "Acción",
    cell: ({ row }) => <AdminRowActions order={row.original} />,
  }),
]);

export const AdminOrdersTable = ({
  orders,
}: AdminOrdersTableProps): ReactElement => {
  const table = useTable({
    features,
    columns,
    data: orders,
    globalFilterFn: "includesString",
    getColumnCanGlobalFilter: (column) =>
      column.id === "name" || column.id === "contactName",
  });

  const { pageIndex, pageSize } = table.state.pagination;
  const totalRows = table.getRowCount();
  const pageCount = table.getPageCount();
  const pageRows = table.getPaginatedRowModel().rows;
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min(pageIndex * pageSize + pageRows.length, totalRows);

  return (
    <section className="flex min-h-full flex-col gap-10">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-white">Órdenes</h1>
        <p className="text-body text-sm">
          AURA <span className="mx-1">/</span> Lista de ordenes
        </p>
      </div>

      <div className="border-stroke w-full rounded-sm border">
        <table className="w-full min-w-225 text-left">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr
                key={group.id}
                className="border-stroke bg-surface border-b text-sm font-medium text-white"
              >
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className={
                      header.column.id === "selection"
                        ? "w-11 px-4 py-2.5"
                        : header.column.id === "image"
                          ? "w-12 px-2 py-2.5"
                          : header.column.id === "actions"
                            ? "px-4 py-2.5 text-right"
                            : "px-3 py-2.5"
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                className="border-stroke border-b last:border-0 hover:bg-white/3"
              >
                {row.getAllCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      cell.column.id === "selection"
                        ? "px-4 py-3"
                        : cell.column.id === "image"
                          ? "px-2 py-2"
                          : cell.column.id === "actions"
                            ? "px-4 py-3"
                            : "px-3 py-3"
                    }
                  >
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="text-body px-4 py-12 text-center text-sm"
                >
                  No se encontraron órdenes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <TableSummary
          totalRows={totalRows}
          startRow={startRow}
          endRow={endRow}
          label="órdenes"
        />
        <TablePagination
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={table.getPageOptions()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPrevious={() => table.previousPage()}
          onNext={() => table.nextPage()}
          onPageChange={(page) => table.setPageIndex(page)}
        />
      </div>
    </section>
  );
};
