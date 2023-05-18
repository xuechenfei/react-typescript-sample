import { SortOrder } from "../../enum/Table";

export interface TableColumn {
  key: string;
  label: string;
  width?: number;
  render?: (value: number | string) => string;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
  defaultSortColumn?: string;
  defaultSortOrder?: SortOrder;
  fixedLeftColumns?: number;
  fixedRightColumns?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  scrollX?: number;
}
