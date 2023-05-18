// import React, { useState } from "react";
import React, { useState } from "react";
import "./App.css";

import Table from "./components/Table";
import { SortOrder } from "./enum";
import { TableColumn } from "./components/Table/type";

// 测试pre-commit....
function App() {
  const [fixedLeftColumns, setFixedLeftColumns] = useState<number>(0);
  const [fixedRightColumns, setFixedRightColumns] = useState<number>(0);

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
    { key: "id", label: "ID", width: 100 },
    { key: "name", label: "Name" },
    {
      key: "age",
      label: "Age",
      render: (age) => {
        return `${age} years old`;
      },
    },
    { key: "department", label: "department", width: 200 },
  ];
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Table
        data={data}
        columns={columns}
        fixedLeftColumns={fixedLeftColumns}
        fixedRightColumns={fixedRightColumns}
        defaultSortColumn="id"
        defaultSortOrder={SortOrder.Ascending}
        scrollX={1500}
      />
      <div style={{ marginTop: 50 }}>
        <label>
          fixedLeftColumns:
          <input
            type="number"
            name="username"
            value={fixedLeftColumns}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value);
              setFixedLeftColumns(value);
            }}
          />
        </label>

        <label>
          fixedRightColumns:
          <input
            type="number"
            name="password"
            value={fixedRightColumns}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value);
              setFixedRightColumns(value);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
