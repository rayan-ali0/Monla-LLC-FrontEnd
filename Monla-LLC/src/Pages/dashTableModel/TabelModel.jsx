
import React, { useState, useEffect } from "react";
import  styles from '../dashTableModel/tablemodel.module.css'
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../../CustomHook/GetData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModelForm from '../dashTableModel/modelform';
import ModelAddForm from '../dashTableModel/modelAddForm';

export default function ModelsTable() {
  const [rows, setRows] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModelFormOpen, setIsModelFormOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);  // State for Add Form
  const [allBrands, setAllBrands] = useState([]);


  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/model/allmodel');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching models:', error.response.data);
    }
  };

  const fetchAllBrands = async () => {
    try {
      const response = await axios.get('http://localhost:5000/brand/readBrand');
      setAllBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error.response.data);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchAllBrands();
  }, []);


    const handleEditClick = (model) => {
    setSelectedModel(model);
    setIsModelFormOpen(true);
  };

  const handleDeleteClick = async (modelId) => {
    try {
      await axios.delete(`http://localhost:5000/model/${modelId}`);
      // Update the rows state or make a new API call to fetch updated data
      fetchModels();
    } catch (error) {
      console.error('Error deleting model:', error.response.data);
    }
  };

  // Open the Add Form
  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  // Close the Add Form
  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

const columns = [
      { field: '_id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Name', width: 150, editable: true },
      {
        field: 'brandName',
        headerName: 'Brand',
        width: 150,
        editable: true,
        valueGetter: (params) => params.row.brandId ? params.row.brandId.brand : '',
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
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
    <div
      style={{
        width: "90%",
        float: "left",
        margin: "auto",
        height: "650px",
        marginBottom: "7rem",
     
      }}
    >
      <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}>
        Diet plans
      </h1>
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1rem",
          width: "7rem",
          height: "2.5rem",
          backgroundColor:"blue",
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
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          color: "#0a213d",
          // border:"none",
          paddingTop: "1rem",
          border: "1px solid white",
          padding:"20px",
          borderRadius:"10px",
        //   borderRadius: "17px",
          "& .MuiDataGrid-root": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeader": {
            // Background color of column headers
            color: "white",
            fontFamily: "Outfit",
            fontSize: "19px",
            // Text color of column headers
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ccc", // Border between cells
            color: "white",
            fontSize: "17px",
            // Text color of cells
          },
          "& .MuiTablePagination-root": {
            color: "white", // Text color of pagination
          },
          "& .MuiDataGrid-toolbar": {
            color: "white",
            backgroundColor: "white", // Background color of the toolbar
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            // color: 'blue',
          },
          "& .MuiButtonBase-root": {
            color: "white", // Text color for buttons in the toolbar
          },
          "& .MuiPaginationItem-icon": {
            color: "white", // Color of pagination icons
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          "& .MuiDataGrid-row , & .MuiDataGrid-cell": {
            maxHeight: "80px !important",
            height: "80px !important",
          },
        }}
      />
 {isModelFormOpen && <ModelForm model={selectedModel} onClose={() => setIsModelFormOpen(false)} allBrands={allBrands} />}
      {isAddFormOpen && <ModelAddForm onClose={handleAddFormClose} allBrands={allBrands} />}
      <ToastContainer />
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};
