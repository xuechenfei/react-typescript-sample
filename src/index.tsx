import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Table from "./components/Table";
import { SortOrder } from "./enum";
import { TableColumn } from "./components/Table/type";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const data = [];

const generateRandomData = (count: number) => {
  const randomData = [];
  const names = ["John", "Jane", "Michael", "Emily", "William", "Sophia"];
  const departments = ["HR", "Finance", "IT", "Sales", "Marketing"];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAge = Math.floor(Math.random() * 50) + 10;
    const randomDepartment =
      departments[Math.floor(Math.random() * departments.length)];

    randomData.push({
      id,
      name: randomName,
      age: randomAge,
      department: randomDepartment,
    });
  }

  return randomData;
};

const randomData = generateRandomData(105);
data.push(...randomData);
console.log(data);

const columns: TableColumn[] = [
  { key: "id", label: "ID", width: 100, },
  { key: "name", label: "Name" },
  {
    key: "age",
    label: "Age",
    render: (age) => {
      return `${age} years old`;
    }
  },
  { key: "department", label: "department", width: 200 },
];
root.render(
  <React.StrictMode>
    <Table
      data={data}
      columns={columns}
      fixedLeftColumns={2}
      fixedRightColumns={1}
      defaultSortColumn="id"
      defaultSortOrder={SortOrder.Ascending}
      scrollX={1500}
    />
  </React.StrictMode>
);
