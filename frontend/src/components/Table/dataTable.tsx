import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "#", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "faculty",
    headerName: "Faculty",
    width: 150,
    editable: true,
  },
  {
    field: "department",
    headerName: "Department",
    width: 170,
    editable: true,
  },
  {
    field: "year",
    headerName: "Year",
    type: "number",
    width: 130,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
  {
    field: "information",
    headerName: "Information",
    description: "Information from question.",
    sortable: false,
    type: "number",
    width: 170,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    email: "abc@gmail.com",
    faculty: "engineering",
    department: "computer",
    year: 1,
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
