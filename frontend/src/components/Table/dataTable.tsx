import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { Bodyprops } from "./body";

interface Faculty {
  id: string;
  faculty_name: string;
  faculty_code: string;
}

interface Department {
  id: string;
  faculty_code: string;
  department_name: string;
  department_code: string;
}

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
    field: "information",
    headerName: "Information",
    description: "Information from question.",
    sortable: false,
    type: "number",
    width: 200,
  },
];


// function createData(id: number, firstname: string, lastname: string, email: string, faculty: string , department:string,year:string) {
//   return { id, firstname, lastname,email,faculty,department,year };
// }

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


interface Subject {
  Post_id:string;
  Username:string;
  Name:string;
  Surname:string;
  Email:string;
  Faculty:string;
  Department:string;
  Year:string;
}

interface ParamType {
  postId: string;
}

function DataTable({ user, setUser }: Bodyprops): JSX.Element {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const param = useParams<ParamType>();
  useEffect(() => {
    axios
      .get(`/csv/DataCSV/${param.postId}`)
      .then((response) => {
        setSubjects(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [param.postId]);
  console.log(subjects);

  useEffect(() => {
    axios.get("http://localhost:3000/dropdowns/faculties").then((response) => {
      setFaculties(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/dropdowns/alldepartment`)
      .then((response) => {
        setDepartments(response.data);
      });
  }, []);

  console.log(departments);
  const facultyCodeToFacultyName = (facultyCode:string) => {
    const facultyName = faculties.find(({faculty_code})=>faculty_code===facultyCode)?.faculty_name 
    return facultyName
  }

  const departmentCodeToDepartmentName = (departmentCode:string) => {
    const departmentName = departments.find(({department_code})=>department_code===departmentCode)?.department_name 
    return departmentName
  }


  const r = subjects.map((subject,i)=>{
      //return createData(  i+1 , subject.Name, subject.Surname ,subject.Email, subject.Faculty, subject.Department, subject.Year );
      return {id : i+1 , firstName : subject.Name, lastName: subject.Surname ,email: subject.Email,faculty: facultyCodeToFacultyName(subject.Faculty),department: departmentCodeToDepartmentName(subject.Department),year: subject.Year}
    }) 
  ;

 
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={r}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default DataTable;
