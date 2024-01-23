import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import YearForm from '../YearTable/yeartableedit';
import YearAddForm from '../YearTable/yeartableadd';
import styles from '../YearTable/tableyear.module.css';


export default function YearsTable() {
  const [rows, setRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [allModels, setAllModels] = useState([]);
  const [isYearFormOpen, setIsYearFormOpen] = useState(false);

  const fetchYears = async () => {
    try {
      const response = await axios.get('http://localhost:5000/year/allyear');
      console.log('Fetched years:', response.data);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching years:', error.response.data);
    }
  };
  
  const fetchAllModels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/model/allmodel');
      console.log('Fetched models:', response.data);
      setAllModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error.response.data);
    }
  };
  

  useEffect(() => {
    fetchYears();
    fetchAllModels();
  }, []);

  const handleEditClick = (year) => {
    setSelectedYear(year);
    setIsYearFormOpen(true);
  };

  const handleDeleteClick = async (yearId) => {
    try {
      await axios.delete(`http://localhost:5000/year/${yearId}`);
      fetchYears();
    } catch (error) {
      console.error('Error deleting year:', error.response.data);
    }
  };

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex:1 },
    { field: 'value', headerName: 'Value', flex:1, editable: true },
    {
      field: 'modelName',
      headerName: 'Model Name',
      flex:1   ,
         editable: true,
      valueGetter: (params) => params.row.modelId ? params.row.modelId.name : '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1   ,   renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <div onClick={() => handleEditClick(params.row)} style={{ cursor: "pointer" }}>
            <EditIcon />
          </div>
          <div onClick={() => handleDeleteClick(params.row._id)} style={{ cursor: "pointer" }}>
            <DeleteIcon />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "90%", float: "left", margin: "auto", height: "650px", marginBottom: "7rem" }}>
      <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}>Diet plans</h1>
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1rem",
          width: "7rem",
          height: "2.5rem",
          backgroundColor: "white",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        onClick={handleAddClick}
      >
        Add
      </button>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        components={{ Toolbar: CustomToolbar }}
        sx={{
          color: "white",
          paddingTop: "1rem",
          border: "1px solid white",
          padding: "20px",
          borderRadius: "10px",
        }}
      />
      {isYearFormOpen && <YearForm year={selectedYear} onClose={() => setIsYearFormOpen(false)} allModels={allModels} />}
      {isAddFormOpen && <YearAddForm onClose={handleAddFormClose} allModels={allModels} />}
      <ToastContainer />
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};
