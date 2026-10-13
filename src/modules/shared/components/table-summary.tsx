import type { ReactElement } from "react";

export interface TableSummaryProps {
  totalRows: number;
  startRow: number;
  endRow: number;
  label: string;
}

export const TableSummary = ({
  totalRows,
  startRow,
  endRow,
  label,
}: TableSummaryProps): ReactElement => (
  <p className="text-sm text-white">
    Mostrando {totalRows === 0 ? "0" : `${startRow}-${endRow}`} de{" "}
    {totalRows} {label}
  </p>
);