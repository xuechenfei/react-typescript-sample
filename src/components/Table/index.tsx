import React, { useState, useEffect, CSSProperties } from "react";
import { SortOrder } from "../../enum/Table";
import Pagination from "../Pagination";
import { TableColumn, TableProps } from "./type";

const stickyStyle: CSSProperties = {
  background: "#eee",
  position: "sticky",
  zIndex: 1,
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  defaultSortColumn,
  defaultSortOrder = SortOrder.Ascending,
  fixedLeftColumns = 0,
  fixedRightColumns = 0,
  pageSize = 10,
  pageSizeOptions,
  scrollX = 1600,
}) => {
  const [sortColumn, setSortColumn] = useState<string>(defaultSortColumn || "");
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tablePageSize, setTablePageSize] = useState<number>(pageSize);

  useEffect(() => {
    if (fixedLeftColumns + fixedRightColumns > columns.length) {
      throw new Error("fixedLeftColumns 或 fixedRightColumns设置异常");
    }
  }, [fixedLeftColumns, fixedRightColumns, columns.length]);

  // 对数据进行排序
  const sortedData = [...data].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) {
        return sortOrder === SortOrder.Ascending ? -1 : 1;
      } else {
        return sortOrder === SortOrder.Ascending ? 1 : -1;
      }
    }
    return 0;
  });

  // 分页处理
  const pageCount = Math.ceil(data.length / tablePageSize);
  const startIndex = (currentPage - 1) * tablePageSize;
  const endIndex = startIndex + tablePageSize;
  const pageData = sortedData.slice(startIndex, endIndex);

  // 切换排序规则
  const toggleSortOrder = (columnKey: string) => {
    const { Ascending, Descending } = SortOrder;
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === Ascending ? Descending : Ascending);
    } else {
      setSortColumn(columnKey);
      setSortOrder(defaultSortOrder);
    }

    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPage(1);
    setTablePageSize(size);
  };

  const setColStyle = (index: number) => {
    const column = columns[index];
    const styleAttr: CSSProperties = {
      textAlign: "center",
      borderTop: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
    };
    if (column.width) styleAttr.width = column.width;

    // 计算sticky的left值
    const calcTotalLeftWidth = () => {
      let totalWidth = 0;
      for (let i = 0; i < index; i++) {
        totalWidth += columns[i]?.width || 0;
      }
      return totalWidth;
    };

    // 计算sticky的right值
    const calcTotalRightWidth = () => {
      let totalWidth = 0;
      for (let i = index + 1; i < columns.length; i++) {
        totalWidth += columns[i]?.width || 0;
      }
      return totalWidth;
    };

    if (index < fixedLeftColumns) {
      return { left: calcTotalLeftWidth(), ...styleAttr, ...stickyStyle };
    } else if (index > columns.length - fixedRightColumns - 1) {
      return { right: calcTotalRightWidth(), ...styleAttr, ...stickyStyle };
    }

    return styleAttr;
  };

  const calcColWidth = (columns: TableColumn[]) => {
    let definedWidth = 0;
    let undefinedCount = 0;
    columns.forEach(({ width }) => {
      if (width) {
        definedWidth += width;
      } else {
        undefinedCount++;
      }
    });
    columns.forEach(({ width }, index) => {
      if (!width)
        columns[index].width = (scrollX - definedWidth) / undefinedCount;
    });
  };
  calcColWidth(columns);

  return (
    <>
      <div style={{ overflow: "auto hidden" }}>
        <table
          style={{
            width: scrollX,
            tableLayout: "fixed",
            borderCollapse: "collapse",
            borderSpacing: 0,
          }}
        >
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  onClick={() => toggleSortOrder(column.key)}
                  key={column.key}
                  style={setColStyle(index)}
                >
                  <span>
                    {column.label}
                    {sortColumn === column.key && (
                      <span>
                        {sortOrder === SortOrder.Ascending ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} style={setColStyle(columnIndex)}>
                    {!!column.render
                      ? column.render(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={tablePageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={pageSizeOptions}
      />
    </>
  );
};

export default Table;
